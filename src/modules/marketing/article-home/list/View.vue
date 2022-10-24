<template>
  <sa-section>
    <table
      v-if="!ui.loading"
      class="table-components data-table"
      >
      <thead>
        <th
          class="table-head"
          v-for="(item, index) in ui.tableColumns"
          :key="index"
        >
          <p v-if="item.prop === 'index'"></p>
          <p v-else :class="{ 'align-center': item.prop === 'operations' || item.prop === 'display' }">{{ $t(`${item.label}`) }}</p>
        </th>
      </thead>
      <tr
        v-for="(dataRow, index) in notDraggableData"
        :key="index + 1"
      >
        <td
            v-for="(item, index) in ui.tableColumns"
            :key="index"
          >
            <div v-if="item.prop === 'index'" style="width: 100%; height: 100%; cursor: pointer;">
            </div>
            <router-link
              v-else-if="item.prop === 'title' && dataRow.name !== 'Top image'"
              :to="{ name: dataRow.name }"
            >
              {{ dataRow[item.prop] }}
            </router-link>
            <span
              v-else-if="item.prop === 'title' && dataRow.name === 'Top image'"
            >
              {{ dataRow[item.prop] }}
            </span>
            <p v-else-if="item.prop === 'display'" style="text-align: center;"> {{ dataRow[item.prop] === 1 ? '✔' : '' }}</p>
            <div v-else-if="item.prop === 'operations'" style="text-align: center;">
              <el-popover
                placement="left"
                trigger="click"
              >
                <i slot="reference" class="operations el-icon-more" />
                <div style="padding: 8px 12px;">
                  <el-button
                    type="success"
                    size="small"
                    plain
                    @click="handleSetup(dataRow.sn)"
                    icon="el-icon-edit"
                  >
                    {{$t('button.setup')}}
                  </el-button>
                  <el-button
                    v-if="dataRow.name !== 'Top image'"
                    type="primary"
                    size="small"
                    plain
                    @click="handleManagement(dataRow.name)"
                  >
                    {{$t('button.management')}}
                  </el-button>
                </div>
              </el-popover>
            </div>
            <p v-else-if="item.prop === 'numberOfArticle' && dataRow.name === 'Top image'"></p>
            <p v-else>{{ dataRow[item.prop] }}</p>
          </td>
      </tr>
      <draggableComponent
        v-model="draggableData"
        tag="tbody"
        @change="changePosition"
        class="draggable"
      >
        <tr v-for="(dataRow, index) in draggableData"
          :key="index + 1"
        >
          <td
            v-for="(item, index) in ui.tableColumns"
            :key="index"
          >
            <div v-if="item.prop === 'index'" style="width: 100%; height: 100%; cursor: pointer;">
              <i class="el-icon-menu"></i>
            </div>
            <router-link
              v-else-if="item.prop === 'title'"
              :to="{ name: dataRow.name }"
            >
              {{ dataRow[item.prop] }}
            </router-link>
            <p v-else-if="item.prop === 'display'" style="text-align: center;"> {{ dataRow[item.prop] === 1 ? '✔' : '' }}</p>
            <div
              v-else-if="item.prop === 'operations'"
              style="text-align: center;"
            >
              <el-popover
                placement="left"
                trigger="click"
              >
                <i slot="reference" class="operations el-icon-more" />
                <div style="padding: 8px 12px;">
                  <el-button
                    type="success"
                    size="small"
                    plain
                    @click="handleSetup(dataRow.sn)"
                    icon="el-icon-edit"
                  >
                    {{$t('button.setup')}}
                  </el-button>
                  <el-button
                    v-if="dataRow.name !== 'Top image'"
                    type="primary"
                    size="small"
                    plain
                    @click="handleManagement(dataRow.name)"
                  >
                    {{$t('button.management')}}
                  </el-button>
                </div>
              </el-popover>
            </div>
            <p v-else>{{ dataRow[item.prop] }}</p>
          </td>
        </tr>
      </draggableComponent>
    </table>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import draggableComponent from '@/utils/draggable.js'
import { fetchDisplayTypes, updateIndexDisplayType } from './api'
export default {
  name: 'Article',
  components: {
    draggableComponent,
    SaSection
  },
  data: () => {
    return {
      ui: {
        loading: false,
        tableColumns: [
          {
            prop: 'index'
          },
          {
            prop: 'name',
            label: 'page.article.displayType'
          },
          {
            prop: 'title',
            label: 'page.article.title'
          },
          {
            prop: 'numberOfArticle',
            label: 'page.article.numberOfArticle'
          },
          {
            prop: 'display',
            label: 'page.article.display'
          },
          {
            prop: 'operations',
            label: 'page.article.operations'
          }
        ]
      },
      draggableData: [],
      notDraggableData: [],
      diplayTypes: []
    }
  },
  created () {
    this.fetchDisplayTypes()
  },
  methods: {
    async fetchDisplayTypes () {
      this.ui.loading = true
      try {
        const { data } = await fetchDisplayTypes()
        this.draggableData = data.data
        this.notDraggableData = data.data.slice(0, 2)
        this.draggableData.shift()
        this.draggableData.shift()
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    async changePosition (e) {
      if (!e.moved) {
        return false
      }
      const params = {
        idxFrom: e.moved.oldIndex + 2,
        idxTo: e.moved.newIndex + 2
      }
      try {
        await updateIndexDisplayType(params)
        const message = this.$t('message.updateSuccess')
        this.$message({
          type: 'success',
          message: message
        })
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    handleSetup (sn) {
      this.$router.push({ name: 'articleSetup', params: { sn: sn } })
    },
    handleManagement (routerName) {
      this.$router.push({ name: routerName })
    }
  }
}
</script>
<style lang="scss" scoped>
.align-center {
  text-align: center;
}
.operations {
  cursor: pointer;
  transform: rotate(90deg);
  &:hover {
    color: #ff6400;
  }
}
</style>
