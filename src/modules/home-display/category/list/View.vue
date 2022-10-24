<template>
  <sa-section>
    <el-table
      v-loading="ui.loading"
      :data="listHomeCategories"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="20"
      >
      </el-table-column>
      <el-table-column
        :label="$t('page.dashboard.category')"
        min-width="120"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'categoryDetails', params: { sn: scope.row.sn } }">
            {{ $t(ui.categories[`${scope.row.type}`]) }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="title1"
        :label="$t('page.dashboard.title1')"
        min-width="150"
      >
      </el-table-column>
      <el-table-column
        :label="$t('page.dashboard.display')"
        min-width="80"
      >
        <template slot-scope="scope">
          {{ scope.row.display === 1 ? '✔' : '' }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.dashboard.lastUpdate')"
        min-width="140"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.lastUpdate) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.dashboard.operations')"
        min-width="100"
        align="center"
      >
        <template slot-scope="scope">
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
                @click="handleSetup(scope.row.sn)"
                icon="el-icon-edit"
              >
                {{ $t('page.dashboard.setup') }}
              </el-button>
              <el-button
                v-if="isShowManagementButton(scope.row.type)"
                type="primary"
                size="small"
                plain
                @click="handleManagement(scope.row.sn)"
              >
                {{ $t('page.dashboard.management') }}
              </el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </sa-section>
</template>
<script>
import { fetchHomeCategories } from './api'
import SaSection from '@/components/globals/SaSection.vue'
export default {
  name: 'HomeDisplay',
  components: {
    SaSection
  },
  data: () => {
    return {
      listHomeCategories: [],
      ui: {
        loading: false,
        categories: {
          1: 'page.dashboard.notice',
          2: 'page.dashboard.banner',
          3: 'page.dashboard.choose_area',
          4: 'page.dashboard.collection',
          5: 'page.dashboard.voucher_code',
          6: 'page.dashboard.about_us',
          7: 'page.dashboard.article',
          8: 'page.dashboard.coverPhoto'
        },
        tableColumns: [
          {
            prop: 'number'
          },
          {
            prop: 'sn',
            label: 'page.dashboard.category'
          },
          {
            prop: 'title1',
            label: 'page.dashboard.title1'
          },
          {
            prop: 'display',
            label: 'page.dashboard.display'
          },
          {
            prop: 'lastUpdate',
            label: 'page.dashboard.lastUpdate'
          },
          {
            prop: 'operations',
            label: 'page.dashboard.operations'
          }
        ]
      }
    }
  },
  created () {
    this.fetchHomeCategories()
  },
  methods: {
    // events
    handleSetup (sn) {
      this.$router.push({ name: 'categoryEdit', params: { sn: sn } })
    },
    handleManagement (sn) {
      switch (sn) {
        case 2:
          this.$router.push({ name: 'banner' })
          break
        case 4:
          this.$router.push({ name: 'collection' })
          break
        case 7:
          this.$router.push({ name: 'article' })
          break
        default:
          break
      }
    },
    //
    isShowManagementButton (type) {
      return type === 1 || type === 2 || type === 4 || type === 7
    },
    async fetchHomeCategories () {
      this.ui.loading = true
      try {
        const { data } = await fetchHomeCategories()
        this.listHomeCategories = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.operations {
  cursor: pointer;
  transform: rotate(90deg);
  &:hover {
    color: #ff6400;
  }
}
</style>
