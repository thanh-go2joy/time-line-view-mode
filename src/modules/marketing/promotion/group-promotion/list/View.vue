<template>
  <sa-section>
    <el-tabs
      v-loading="ui.isLoading"
      class="promotion-detail"
      v-model="activeTab"
    >
      <el-tab-pane
        name="list"
      >
        <div class="align-end">
          <div class="group-promotion-operation">
            <router-link
              :to="{name: 'settingGroupPromotion'}"
              class="el-button el-button--danger is-plain"
            >
              <i class="el-icon-setting"/>
              {{ $t('button.settingDisplay') }}
            </router-link>
            <router-link
              :to="{name: 'createGroupPromotion'}"
              class="el-button el-button--danger is-plain"
            >
              <i class="el-icon-plus"/>
              {{ $t('button.add') }}
            </router-link>
          </div>
        </div>
        <div class="group-promotion__table">
        <el-table :data="data" v-loading="ui.isTableLoading" :row-class-name="rowContentStyle">
          <el-table-column label="#" type="index" />
          <el-table-column :label="$t('page.group-promotion.groupName')" :min-width="220">
            <template slot-scope="scope">
              <p>
                {{ scope.row.title }}
              </p>
            </template>
          </el-table-column>
          <el-table-column :label="$t('page.group-promotion.promotionList')" :min-width="150">
            <template slot-scope="scope">
              <el-link
                @click="onGotoApply(scope.row.sn)"
              >
                ({{ scope.row.numOfPromotion }}) promotion
              </el-link>
            </template>
          </el-table-column>
          <el-table-column :label="$t('page.group-promotion.displayArea')" :min-width="150">
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                trigger="click"
                popper-class="checkbox-select"
                :disabled="scope.row.listProvinceName.length === 0"
              >
                <el-button
                  plain
                  slot="reference"
                  class="province-button"
                >
                  <p>
                    {{scope.row.listProvinceName.length}}
                    {{ $t('placeholder.provinceSelected') }}
                  </p>
                </el-button>
                <ul
                  class="province-list"
                >
                  <li
                    v-for="(item, index) in scope.row.listProvinceName"
                    :key="index"
                    class="province-item"
                  >
                    {{item}}
                  </li>
                </ul>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column :label="$t('page.group-promotion.status')" :min-width="150">
            <template slot-scope="scope">
              <p>
                {{ getStatus(scope.row.status) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column :label="$t('page.group-promotion.lastUpdate')" :min-width="150">
            <template slot-scope="scope">
              <p>
                {{ formatDate(scope.row.lastUpdate) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.userMgt.operations')"
            :min-width="90"
          >
            <template slot-scope="scope">
              <router-link
                v-if="scope.row.status === 1"
                :to="{name: 'editGroupPromotion', params: {sn: scope.row.sn}}"
                class="el-button el-button--success el-button--small is-plain"
              >
                {{ $t('button.edit') }}
              </router-link>
            </template>
          </el-table-column>
        </el-table>
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
      <el-tab-pane
        name="apply-for-promotion"
      >
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
import { listGroupPromotion, getFilterPromotionApply } from './api'
import applyForPromotion from '@/modules/marketing/promotion/group-promotion/apply-for-promo/View.vue'
import { fetchProvinces } from '@/api/province'
import SaSection from '@/components/globals/SaSection.vue'

export default {
  name: 'GroupPromotion',
  components: { applyForPromotion, SaSection },
  data () {
    return {
      filter: {
        limit: 10,
        page: 1
      },
      pagination: {},
      ui: {
        isTableLoading: false
      },
      data: [],
      activeTab: 'list',
      provinces: [],
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
    this.listProvinces()
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
        this.ui.isTableLoading = true
        const { data } = await getFilterPromotionApply({ promotionGroupSn: sn })
        if (data.code === 1) {
          this.activeTab = 'apply-for-promotion'
          this.$delete(data.data.statistics, 'promotionGroupSn')
          this.statistics = data.data.statistics
          this.dataApply = data.data
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    onCallChangeTab (applyTarget, numApply) {
      this.statistics.applyTarget = applyTarget
      this.data.numOfPromotion = numApply
      this.activeTab = 'list'
    },
    reloadData (data) {
      this.dataApply = data
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
<style lang="scss">
.group-expired {
  background-color: #fce5e5 !important;
}
.province-button {
  width: 100%;
}
#tab-apply-for-promotion,
#tab-list{
  display: none;
}
.checkbox-select{
  display: block;
  .province-list {
    overflow: auto;
    height: 100%;
    max-height: 200px;
    &::-webkit-scrollbar {
      width: 4px;
      background-color: #F5F5F5;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(216, 216, 216, 0.62);
      border-radius: 10px;
      border: 1px solid rgba(216, 216, 216, 0.62);
    }
    .province-item {
      padding: 12px
    }
  }
}
.align-end {
  text-align: end;
}
.promotion-detail {
  .el-tabs__header {
    margin: 0px;
  }
}
</style>
