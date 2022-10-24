<template>
  <sa-section
    class="revenue-details"
  >
    <template slot="header">
      <div>
        <el-select
          v-model="hotelSelected"
          :loading="ui.hotelsLoading"
          :placeholder="$t('page.bookingReport.hotel_name')"
          remote
          filterable
          :remote-method="searchSuggestionsHotels"
          prefix-icon="el-icon-search"
          clearable
          value-key="sn"
          :popper-append-to-body="false"
          style="margin-right: 16px;"
        >
          <el-option
            v-for="(item, index) in listSuggestionsHotels"
            :key="index"
            :label="item.name"
            :value="item"
            style="font-size: 13px; color: #4a5d6e;"
            class="hotel__option"
          >
            {{ item.name }} <br> {{ item.address }}
          </el-option>
        </el-select>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          popper-class="custom-date-range"
          range-separator="-"
          :start-placeholder="$t('page.firstBooking.startDate')"
          :end-placeholder="$t('page.firstBooking.endDate')"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :clearable="false"
        />
      </div>
    </template>
    <main v-loading="ui.loading">
      <div class="revenue-details__statistics">
        <div class="revenue-details__statistics--flex">
          <p class="revenue-details__statistics--left">{{ $t('page.revenueReport.paidInAdvance') }}</p>
          <p>{{ formatMoney(statistics.payInAdvance) }}</p>
        </div>
        <div class="revenue-details__statistics--flex">
          <p class="revenue-details__statistics--left">{{ $t('page.revenueReport.balance') }}</p>
          <p>{{ formatMoney(statistics.balance) }}</p>
        </div>
      </div>
      <el-table
        :data="transactions"
      >
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column
          :label="$t('page.revenueReport.bookingTime')"
        >
          <template slot-scope="scope">
            {{ formatDate(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="bookingNo"
          :label="$t('page.revenueReport.bookingId')"
        ></el-table-column>
        <el-table-column
          prop="transactionId"
          :label="$t('page.revenueReport.transactionId')"
        >
        </el-table-column>
        <el-table-column
          :label="$t('page.revenueReport.bookingInfo')"
        >
          <template slot-scope="scope">
            <div v-if="!scope.row.total">
              <p>
                {{ scope.row.mobile }}
              </p>
              <p style="color: #1989fa">{{ scope.row.roomTypeName }}</p>
              <p>
                <span v-if="scope.row.userBookingType === 1">
                  {{ $t('page.revenueReport.hours') }}
                </span>
                <span v-if="scope.row.userBookingType === 2">
                  {{ $t('page.revenueReport.overnight') }}
                </span>
                <span v-if="scope.row.userBookingType === 3">
                  {{ $t('page.revenueReport.daily') }}
                </span>
                : <span>{{ scope.row.checkInDatePlan }}</span>
                <span v-if="scope.row.userBookingType === 1">
                  {{ formatTime(scope.row.startTime) }}  {{ scope.row.endTime ? `~${formatTime(scope.row.endTime)}` : '' }}
                </span>
                <span v-if="scope.row.userBookingType === 3">
                  {{ scope.row.endDate }}
                </span>
              </p>
              {{ formatDate(scope.row.createTime) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <p>{{ $t('page.revenueReport.transactionStatus') }}</p>
            <p style="color: #1989fa">{{ $t('page.revenueReport.transactionTime') }}</p>
          </template>
          <template slot-scope="scope">
            <p v-if="!scope.row.total">
              <span>{{ scope.row.origin === 1 ? scope.row.changeFromCheckInToCancel == 1 ? 'Cancelled' : 'Checked-in' : 'Cancelled' }}</span>
              <span>({{ scope.row.transactionType == 1 ? 'Origin' : 'Transfer' }})</span>
            </p>
            <p style="color: #1989fa">{{ formatDate(scope.row.transactionTime) }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="couponName"
          :label="$t('page.revenueReport.coupon')"
        ></el-table-column>
        <el-table-column>
          <template slot="header">
            <p>{{ $t('page.revenueReport.totalAmount') }}</p>
            <p style="color: #1989fa">{{ $t('page.revenueReport.roomAmount') }}</p>
            <p style="color: #e6a23c">{{ $t('page.revenueReport.extraFee') }}</p>
            <p style="color: #67c23a">{{ $t('page.revenueReport.productAmount') }}</p>
          </template>
          <template slot-scope="scope">
            <p>{{ formatMoney(scope.row.totalAmount) }}</p>
            <p style="color: #1989fa">{{ formatMoney(scope.row.roomAmount) }}</p>
            <p style="color: #e6a23c">{{ formatMoney(scope.row.extraFee) }}</p>
            <p style="color: #67c23a">{{ formatMoney(scope.row.productAmount) }}</p>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <p>{{ $t('page.revenueReport.go2joyDiscount') }}</p>
            <p style="color: #1989fa">{{ $t('page.revenueReport.coupon') }}</p>
            <p style="color: #e6a23c">{{ $t('page.revenueReport.mileagePoint') }}</p>
            <p style="color: #67c23a">{{ $t('page.revenueReport.otherDiscount') }}</p>
          </template>
          <template slot-scope="scope">
            <p>{{ formatMoney(scope.row.go2joyDiscount) }}</p>
            <p style="color: #1989fa">{{ formatMoney(scope.row.go2joyCoupon) }}</p>
            <p style="color: #e6a23c">{{ formatMoney(scope.row.mileagePoint) }}</p>
            <p style="color: #67c23a">{{ formatMoney(scope.row.otherDiscount) }}</p>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <p>{{ $t('page.revenueReport.hotelDiscount') }}</p>
            <p style="color: #1989fa">{{ $t('page.revenueReport.coupon') }}</p>
            <p style="color: #e6a23c">{{ $t('page.revenueReport.flashSale') }}</p>
            <p style="color: #67c23a">{{ $t('page.revenueReport.redeemStamp') }}</p>
            <p style="color: #f56c6c">{{ $t('page.revenueReport.directDiscount') }}</p>
          </template>
          <template slot-scope="scope">
            <p>{{ formatMoney(scope.row.hotelDiscount) }}</p>
            <p style="color: #1989fa">{{ formatMoney(scope.row.hotelCoupon) }}</p>
            <p style="color: #e6a23c">{{ formatMoney(scope.row.flashSale) }}</p>
            <p style="color: #67c23a">{{ formatMoney(scope.row.redeemStamp) }}</p>
            <p style="color: #f56c6c">{{ formatMoney(scope.row.directDiscount) }}</p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.revenueReport.userPay')"
        >
          <template slot-scope="scope">
            <p>{{ formatMoney(scope.row.userPay) }}</p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.revenueReport.commission')"
        >
          <template slot-scope="scope">
            <p>{{ formatMoney(scope.row.commission) }}</p>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <p>{{ $t('page.revenueReport.balance') }}</p>
            <p>{{ $t('page.revenueReport.receivable') }}</p>
            <p>{{ $t('page.revenueReport.payable') }}</p>
          </template>
          <template slot-scope="scope">
            <p>{{ formatMoney(scope.row.balance) }}</p>
          </template>
        </el-table-column>
         <el-table-column
          :label="$t('page.revenueReport.paidInAdvance')"
        >
          <template slot-scope="scope">
            <p>{{ formatMoney(scope.row.payInAdvance) }}</p>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <template slot="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagination.perPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </template>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { fetchSuggestionsHotels } from '@/api/hotels'
import { debounce } from '@/utils/helpers'
import { fetchTransactions } from './api'
const timeDebounce = 500
export default {
  name: 'revenueReportDetails',
  components: { SaSection },
  data: (vm) => {
    return {
      ui: {
        loading: false
      },
      filter: {
        hotelSn: vm.$route.params.sn,
        limit: 10,
        page: 1,
        keyword: '',
        startDate: vm.formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1), false),
        endDate: vm.formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), false)
      },
      pagination: {
        perPage: 1,
        total: 0
      },
      hotelSelected: '',
      statistics: {},
      transactions: [],
      listSuggestionsHotels: []
    }
  },
  computed: {
    dateRange: {
      get () {
        return [this.filter.startDate, this.filter.endDate]
      },
      set (val) {
        this.filter.startDate = val[0]
        this.filter.endDate = val[1]
      }
    }
  },
  watch: {
    hotelSelected (value) {
      if (this.filter.hotelGroupSn) {
        delete this.filter.hotelGroupSn
      } else if (this.filter.hotelSn) {
        delete this.filter.hotelSn
      }
      if (value) {
        this.filter[value.hotelStatus === -1 ? 'hotelGroupSn' : 'hotelSn'] = value.sn
      }
      this.fetchTransactions()
    }
  },
  created () {
    this.fetchTransactions()
    this.fetchSuggestionsHotels({ limit: 10 })
  },
  methods: {
    searchSuggestionsHotels: debounce(function (keySearch) {
      this.fetchSuggestionsHotels({
        limit: 10,
        keyword: keySearch
      })
    }, timeDebounce),
    handleSearch: debounce(function () {
      this.fetchTransactions()
    }, timeDebounce),
    async fetchSuggestionsHotels (params) {
      this.ui.hotelsLoading = true
      try {
        const { data } = await fetchSuggestionsHotels(params)
        this.listSuggestionsHotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.hotelsLoading = false
      }
    },
    async fetchTransactions () {
      try {
        this.ui.loading = true
        const { data } = await fetchTransactions(this.filter)
        this.pagination = data.data.meta
        this.statistics = data.data.statistics
        this.transactions = data.data.transactions
        this.transactions.unshift({ ...data.data.statistics, total: true })
        this.paginations = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchTransactions()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchTransactions()
    }
  }
}
</script>
<style lang="scss" scoped>
.revenue-details__statistics {
  &--flex {
    align-items: center;
    display: flex;
    padding: 16px 0;
    border-bottom: 1px solid #EBEEF5;
  }
  &--left {
    font-weight: 600;
    width: 250px;
  }
}
</style>
