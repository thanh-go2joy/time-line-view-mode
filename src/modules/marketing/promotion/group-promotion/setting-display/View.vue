<template>
  <sa-section v-loading="ui.isCallApi">
    <el-tabs v-model="activeTab" v-loading="ui.isLoading">
      <el-tab-pane name="setting-display" disabled>
        <div class="group-promotion__table">
          <table v-if="!ui.isTableLoading" class="table-components data-table">
            <thead>
              <tr>
                <th class="table-head"></th>
                <th class="table-head">
                  {{ $t('page.group-promotion.groupName') }}
                </th>
                <th class="table-head">
                  {{ $t('page.group-promotion.promotionList') }}
                </th>
                <th class="table-head">
                  {{ $t('page.group-promotion.displayArea') }}
                </th>
                <th class="table-head">{{ $t('page.group-promotion.status') }}</th>
                <th class="table-head">
                  {{ $t('page.group-promotion.lastUpdate') }}
                </th>
              </tr>
            </thead>
            <draggableComponent
              v-model="data"
              tag="tbody"
              @change="changePosition"
              class="draggable"
            >
              <tr v-for="(dataRow, index) in data" :key="index + 1">
                <td>
                  <i class="el-icon-menu"></i>
                </td>
                <td>
                  <p>
                    {{ dataRow.title }}
                  </p>
                </td>
                <td>
                  <el-link
                    @click="onGotoApply(dataRow.sn)"
                  >
                    <p>
                        <span v-if="dataRow.numOfPromotion > 0">
                          ({{ dataRow.numOfPromotion }}) {{$t('breadcrumb.promotion')}}
                        </span>
                    </p>
                  </el-link>
                  <!-- <router-link
                    :to="{ name: 'applyForPromotion', params: { sn: dataRow.sn } }"
                  >
                    ({{ dataRow.numOfPromotion }}) promotion
                  </router-link> -->
                </td>
                <td>
                  <el-popover
                    placement="bottom"
                    trigger="click"
                    popper-class="checkbox-select"
                    :disabled="dataRow.listProvinceName.length === 0"
                  >
                    <el-button plain slot="reference" class="province-button">
                      <p>
                        {{ dataRow.listProvinceName.length }}
                        {{ $t('placeholder.provinceSelected') }}
                      </p>
                    </el-button>
                    <ul class="province-list">
                      <li
                        v-for="(item, index) in dataRow.listProvinceName"
                        :key="index"
                        class="province-item"
                      >
                        {{ item }}
                      </li>
                    </ul>
                  </el-popover>
                </td>
                <td>
                  <p>
                    {{ getStatus(dataRow.status) }}
                  </p>
                </td>
                <td>
                  <p>
                    {{ formatDate(dataRow.lastUpdate) }}
                  </p>
                </td>
              </tr>
            </draggableComponent>
          </table>
          <div v-else>
            <div class="" style="text-align: center; padding: 20px">
              <h2><i class="el-icon-loading"></i></h2>
              <h2>loading ...</h2>
            </div>
          </div>
          <el-pagination
            @size-change="onSizeChange"
            @current-change="onCurrentChange"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pagination.perPage"
            :current-page="filter.page"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane name="apply-for-promotion">
        <apply-for-promotion
           :propFilter="statistics"
            :dataApply="dataApply"
            :provinceApply="provinces"
            :isPreView="true"
            @onCallChangeTab="onCallChangeTab"
            @reloadData="reloadData"
        />
      </el-tab-pane>
    </el-tabs>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { listGroupPromotion, sortGroupHotel, getFilterPromotionApply } from './api'
import draggableComponent from '@/utils/draggable.js'
import applyForPromotion from '@/modules/marketing/promotion/group-promotion/apply-for-promo/View.vue'
import { fetchProvinces } from '@/api/province'

export default {
  name: 'GroupPromotion',
  components: {
    SaSection,
    draggableComponent,
    applyForPromotion
  },
  data () {
    return {
      filter: {
        limit: 10,
        page: 1
      },
      pagination: {},
      ui: {
        isTableLoading: false,
        isCallApi: false
      },
      data: [],
      provinces: [],
      activeTab: 'setting-display',
      statistics: {},
      dataApply: {
        promotions: [],
        meta: {
          total: 0
        }
      }
    }
  },
  created () {
    this.listGroupPromotion()
  },
  methods: {
    async listGroupPromotion () {
      this.ui.isTableLoading = true
      try {
        const { data } = await listGroupPromotion(this.filter)
        this.data = data.data.promotionGroups
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    async listProvinces () {
      this.ui.provincesLoading = true
      try {
        const { data } = await fetchProvinces({ limit: 100, status: 1 })
        this.provinces = data.data.provinces
        this.ui.provinceOptions = await data.data.provinces.reduce(
          function async (preValue, curValue) {
            return preValue.concat(curValue.sn)
          },
          []
        )
        this.provinceSelected = [...this.ui.provinceOptions]
      } catch (error) {
        return false
      } finally {
        this.ui.provincesLoading = false
      }
    },
    async onGotoApply (sn) {
      try {
        this.ui.isCallApi = true
        const { data } = await getFilterPromotionApply({ promotionGroupSn: sn })
        if (data.code === 1) {
          this.activeTab = 'apply-for-promotion'
          this.$delete(data.data.statistics, 'promotionGroupSn')
          this.statistics = data.data.statistics
          this.dataApply = data.data
        }
      } catch (error) {
        this.ui.isCallApi = false
        return false
      } finally {
        this.ui.isCallApi = false
      }
    },
    onCallChangeTab (applyTarget, numApply) {
      this.statistics.applyTarget = applyTarget
      this.data.numOfPromotion = numApply
      this.activeTab = 'setting-display'
    },
    reloadData (data) {
      this.dataApply = data
    },
    async changePosition (e) {
      if (!e.moved) {
        return false
      }
      const promotionGroupSn1 = this.data.find((item, index) => index === e.moved.oldIndex)
      const promotionGroupSn2 = this.data.find((item, index) => index === e.moved.newIndex)
      const dataJson = {
        promotionGroupSn1: promotionGroupSn1.sn,
        promotionGroupSn2: promotionGroupSn2.sn
      }
      try {
        await sortGroupHotel(dataJson)
        this.$message({
          type: 'success',
          message: this.$t('page.collection.editSuccess')
        })
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    onSizeChange (size) {
      this.filter.limit = size
      this.listGroupPromotion()
    },
    onCurrentChange (currentPage) {
      this.filter.page = currentPage
      this.listGroupPromotion()
    },
    getStatus (status) {
      switch (status) {
        case 1:
          return this.$t('page.promotion.active')
        case 2:
          return this.$t('page.promotion.expired')
      }
    },
    rowContentStyle ({ row, rowIndex }) {
      if (row.status === 2) {
        return 'group-expired'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.draggable {
  tr {
    cursor: pointer;
  }
  tr:hover {
    td {
      background-color: #f5f7fa;
    }
  }
  .firstColumn {
    width: 2%;
  }
  .type,
  .display,
  .displayType,
  .lastUpdate,
  .operations {
    width: 12%;
  }
  .title {
    width: 38%;
  }
  td,
  th {
    padding: 12px 8px;
    transition: background-color 0.25s ease;
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
    color: #606266;
  }
}
.province-button {
  display: block;
}
.checkbox-select {
  display: block;
  padding: 6px 12px;
  .province-list {
    overflow: auto;
    height: 100%;
    max-height: 200px;
    &::-webkit-scrollbar {
      width: 4px;
      background-color: #f5f5f5;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(216, 216, 216, 0.62);
      border-radius: 10px;
      border: 1px solid rgba(216, 216, 216, 0.62);
    }
    .province-item {
      padding: 12px;
    }
  }
}
#tab-apply-for-promotion,
#tab-list{
  display: none;
}
</style>
