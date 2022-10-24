<template>
  <sa-section>
    <template slot="header" class="hote-debt-mgt__filters">
      <el-form
        :inline="true"
        :model="filter"
        class="demo-form-inline float-left"
      >
        <el-form-item>
          <el-select
            v-model="filter.type"
            element-loading-spinner="el-icon-loading"
            prefix-icon="el-icon-search"
            :placeholder="$t('page.hotelDisplay.hotelName')"
            @change="listPromotion"
          >
            <el-option
              v-for="(item, index) in promotionType"
              :key="index"
              :label="$t(item.name)"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filter.keyword" clearable @change="listPromotion"/>
        </el-form-item>
      </el-form>
      <div class="float-right">
        <router-link
          class="el-button el-button--primary is-plain"
          :to="{ name: 'groupPromotion' }"
        >
          <img class="icon" src="@/assets/images/svg/user-group.svg" alt="">
          {{ $t('page.promotion.promotionGroup') }}
        </router-link>
        <router-link
          class="el-button el-button--danger is-plain"
          :to="{ name: 'createPromotion' }"
        >
          <i class="el-icon-plus" />
          {{ $t('button.add') }}
        </router-link>
      </div>
    </template>
    <div class="hote-debt-mgt__table">
      <el-table :data="data" v-loading="ui.isTableLoading">
        <el-table-column label="#" type="index" />
        <el-table-column :label="$t('page.promotion.title')" :min-width="85">
          <template slot-scope="scope">
            <router-link
              :to="{
                name: 'promotionDetails',
                params: {
                  promotionSn: scope.row.sn,
                  couponSn: scope.row.couponSn
                }
              }"
            >
              {{ scope.row.title }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.code')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ scope.row.code }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.type')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ getPromotionType(scope.row.type) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.discount')" :min-width="85">
          <template slot-scope="scope">
            <div
              v-html="
                getDiscountType({
                  discountType: scope.row.discountType,
                  discount: scope.row.discount
                })
              "
            />
            <img
              v-if="scope.row.discountType === 3"
              src="@/assets/images/svg/gifts.svg"
              style="width: 20px; height: 20px"
              class="icon-tick"
            />
            <img
              v-if="scope.row.discountType === 4"
              src="@/assets/images/svg/clock.svg"
              style="width: 20px; height: 20px"
              class="icon-tick"
            />
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.applyStartEnd')"
          :min-width="90"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.applyStart }}</p><p>{{ scope.row.applyEnd }}</p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.applyStartEnd')"
          :min-width="90"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.numActiveDay === 0">
              <p>{{ scope.row.couponStart }}</p>
              <p>{{ scope.row.couponEnd }}</p>
            </div>
            <div v-else>
              {{ scope.row.numActiveDay }}
              {{ $t('page.promotion.couponContent') }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.type')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ getStatus(scope.row.status) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.totalHotelApplied')"
          :min-width="85"
        >
          <template slot-scope="scope">
            <router-link
              :class="scope.row.totalHotelApplied === 0 ? 'link-disabled' : ''"
              :to="{
                name: 'hotelApply',
                params: { sn: scope.row.sn }
              }"
            >
              {{ scope.row.totalHotelApplied }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.totalUserApplied')"
          :min-width="85"
        >
          <template slot-scope="scope">
            <router-link
              :class="scope.row.totalUserApplied === 0 ? 'link-disabled' : ''"
              :to="{
                name: 'userApply',
                params: { sn: scope.row.sn, type: 1 }
              }"
            >
              {{ scope.row.totalUserApplied }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.totalCouponApplied')"
          :min-width="85"
        >
          <template slot-scope="scope">
            <router-link
              :class="scope.row.totalCoupon === 0 ? 'link-disabled' : ''"
              :to="{
                name: 'userApply',
                params: { sn: scope.row.sn, type: 2 }
              }"
            >
              {{ scope.row.totalCouponIssued }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.total_consumed_applied')"
          :min-width="85"
        >
          <template slot-scope="scope">
            <router-link
              :class="
                scope.row.totalConsumedCoupon === 0 ? 'link-disabled' : ''
              "
              :to="{
                name: 'userApply',
                params: { sn: scope.row.sn, type: 3 }
              }"
            >
              {{ scope.row.totalConsumedCoupon }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.totalDiscount')"
          :min-width="85"
        >
          <template slot-scope="scope">
            <p>
              {{ formatMoney(scope.row.totalDiscount) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.userMgt.operations')"
          :min-width="90"
        >
          <template slot-scope="scope">
            <el-popover
                placement="left"
                trigger="click"
              >
                <i slot="reference" class="operations el-icon-more" />
                <div class="operations">
                  <router-link
                    class="el-button el-button--success white-color"
                    v-if="scope.row.pending !== 1 || scope.row.status !== 2 || scope.row.status !== 5"
                    :to="{ name: 'editPromotion', params: { promotionSn: scope.row.sn } }"
                  >
                    {{ $t('button.edit') }}
                  </router-link>
                  <router-link
                    class="el-button el-button--primary white-color"
                    :to="{ name: 'editPromotion', params: { promotionSn: scope.row.sn }, query: {page: 'copy'} }"
                  >
                    {{ $t('button.copy') }}
                  </router-link>
                  <router-link
                    v-if="scope.row.status === 1 || scope.row.type === 9 || scope.row.type === 10"
                    class="button-link"
                    :to="{ name: 'notificationCreate' }"
                  >
                    {{ $t('button.donate') }}
                  </router-link>
                  <router-link
                    class="button-link"
                    v-if="scope.row.type === 2"
                    :to="{ name: 'chooseWinner', params: {sn: scope.row.sn}}"
                  >
                    {{ $t('button.chooseWinner') }}
                  </router-link>
                </div>
            </el-popover>
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
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { listPromotion } from './api'

export default {
  name: 'Promotion',
  components: { SaSection },
  data () {
    return {
      filter: {
        limit: 10,
        page: 1,
        keyword: '',
        type: 1
      },
      pagination: {},
      ui: {
        isTableLoading: false
      },
      data: []
    }
  },
  computed: {
    promotionType () {
      return [
        { name: 'page.promotion.apply', value: 1 },
        { name: 'page.promotion.event', value: 2 },
        { name: 'page.promotion.inviteFriend', value: 3 },
        { name: 'page.promotion.gift', value: 4 },
        { name: 'page.promotion.booking', value: 5 },
        { name: 'page.promotion.signUp', value: 7 },
        { name: 'page.promotion.birthday', value: 8 },
        { name: 'page.promotion.payment', value: 9 },
        { name: 'page.promotion.voucherCode', value: 10 }
      ]
    }
  },
  created () {
    this.listPromotion()
  },
  methods: {
    async listPromotion () {
      this.ui.isTableLoading = true
      try {
        const { data } = await listPromotion(this.filter)
        this.data = data.data.promotions
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    onSizeChange (size) {
      this.filter.limit = size
      this.listPromotion()
    },
    onCurrentChange (currentPage) {
      this.filter.page = currentPage
      this.listPromotion()
    },
    getPromotionType (type) {
      switch (type) {
        case 0:
          return this.$t('page.promotion.all')
        case 1:
          return this.$t('page.promotion.apply')
        case 2:
          return this.$t('page.promotion.event')
        case 3:
          return this.$t('page.promotion.inviteFriend')
        case 4:
          return this.$t('page.promotion.gift')
        case 5:
          return this.$t('page.promotion.booking')
        case 6:
          return this.$t('page.promotion.report_new_hotel')
        case 7:
          return this.$t('page.promotion.sign_up')
        case 8:
          return this.$t('page.promotion.birthday')
        case 9:
          return this.$t('page.promotion.payment')
        case 10:
          return this.$t('page.promotion.voucher_code')
        default:
          break
      }
    },
    getDiscountType (json) {
      switch (json.discountType) {
        case 1:
          return this.formatMoney(json.discount) + ' VND'
        case 2:
          return json.discount + ' %'
        case 5:
          return '<span class="bold" style="font-weight: bold">ĐG</span> ' + this.formatMoney(json.discount)
      }
    },
    getStatus (status) {
      switch (status) {
        case 0:
          return this.$t('page.promotion.deleted')
        case 1:
          return this.$t('page.promotion.active')
        case 2:
          return this.$t('page.promotion.expired')
        case 3:
          return this.$t('page.promotion.not_yet')
        case 4:
          return this.$t('page.promotion.draft')
        case 5:
          return this.$t('page.promotion.wait_confirm')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.button-link {
  margin: 0px 12px;
}
.icon {
  height: 14px;
  width: 14px;
}
.white-color {
  color: white !important;
}
</style>
