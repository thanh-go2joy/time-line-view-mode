<template>
  <sa-section>
    <div class="cash-flow-detail__filter">
      <el-form :inline="true" :model="filter" class="demo-form-inline">
        <el-form-item>
          <el-select
            v-model="filter.deviceType"
          >
            <el-option
              v-for="(item, index) in ui.deviceTypeOptions"
              :key="index"
              :label="item.key"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            :loading="ui.isLoadingHotel"
            v-model="filter.hotelSn"
            element-loading-spinner="el-icon-loading"
            remote
            filterable
            :placeholder="$t('page.hotelDisplay.hotelName')"
            :remote-method="searchSuggestionsHotels"
          >
            <el-option
              v-for="(item) in hotels"
              :key="item.sn"
              :label="`${item.name} - ${item.address}`"
              :value="item.sn"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
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
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" plain @click="getCashFlow">
            {{ $t('button.search') }}
          </el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col
          :span="4"
        >
          <p>{{ $t('page.cashFlowReport.paid_in_advance') }}</p>
        </el-col>
        <el-col
          :span="20"
        >
          <el-input type="text" disabled="disabled" :value="formatMoney(headerContent.prepayAmount)"></el-input>
        </el-col>
        <el-col
          :span="4"
        >
          <p>{{ $t('page.cashFlowReport.balance') }}</p>
        </el-col>
        <el-col
          :span="20"
        >
          <el-input type="text" disabled="disabled" :value="formatMoney(headerContent.hotelRefund)"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="cash-flow-detail__table">
      <div>
        <el-table :data="data" v-loading="ui.isTableLoading">
          <el-table-column label="#" type="index" :index="indexMethod"/>
          <el-table-column
            :label="$t('page.cashFlowReport.device_type')"
            :min-width="105"
          >
            <template slot-scope="scope">
              <p>
                {{ getDeviceType(scope.row.deviceType) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :min-width="100"
            :label="$t('page.cashFlowReport.booking_time')"
          >
            <template slot-scope="scope">
              <p>
                {{ formatDate(scope.row.createTime) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.cashFlowReport.booking_info')"
            :min-width="140"
          >
            <template slot-scope="scope">
              <p>
                {{ scope.row.bookingNo }}
              </p>
              <p>
                {{ scope.row.mobile}}
              </p>
              <router-link :to="{name: 'detailRoomType', query: { sn: scope.row.roomTypeSn }}">
                {{ scope.row.roomTypeName}}
              </router-link>
              <p>
                {{ getBookingType(scope.row.type)}}:{{ scope.row.checkInDatePlan }}
                <span v-if="scope.row.type === 3">{{ scope.row.endDate }}</span>
              </p>
              <p v-if="scope.row.type === 1">
                {{ formatTime(scope.row.startTime) }} ~ {{ formatTime(scope.row.endTime) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :min-width="120"
            :label="$t('page.cashFlowReport.coupon')"
          >
            <template slot-scope="scope">
              <router-link :to="{name: 'detailPromotion', query: { sn: scope.row.promotionSn }}">
                {{ scope.row.couponName}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            :min-width="120"
          >
            <template slot="header">
                <p> {{ this.$t('page.cashFlowReport.total_amount') }} </p>
                <p class="blue-color"> {{ this.$t('page.cashFlowReport.room_amount') }} </p>
                <p class="purple-color"> {{ this.$t('page.cashFlowReport.extra_fee') }} </p>
                <p class="green-color"> {{ this.$t('page.cashFlowReport.product_amount') }} </p>
            </template>
            <template slot-scope="scope">
              <p>
                {{ formatMoney(scope.row.totalAmount) }}
              </p>
              <p class="blue-color">
                {{ formatMoney(scope.row.roomTypeAmount) }}
              </p>
              <p class="purple-color">
                {{ formatMoney(scope.row.extraFee) }}
              </p>
              <p class="green-color">
                {{ formatMoney(scope.row.productValue) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :min-width="120"
          >
            <template slot="header">
                <p> {{ this.$t('page.cashFlowReport.g2j_discount') }} </p>
                <p class="blue-color"> {{ this.$t('page.cashFlowReport.coupon') }} </p>
                <p class="purple-color"> {{ this.$t('page.cashFlowReport.mileage_point') }} </p>
                <p class="green-color"> {{ this.$t('page.cashFlowReport.other_discount') }} </p>
            </template>
            <template slot-scope="scope">
              <p>
                {{ formatMoney(scope.row.totalGo2joyDiscount) }}
              </p>
              <p class="blue-color">
                {{ formatMoney(scope.row.go2joyDiscount) }}
              </p>
              <p class="purple-color">
                {{ formatMoney(scope.row.mileagePoint) }}
              </p>
              <p class="green-color">
                {{ formatMoney(scope.row.promotionDiscount) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :min-width="120"
          >
            <template slot="header">
              <p> {{ this.$t('page.cashFlowReport.hotel_discount') }} </p>
              <p> {{ this.$t('page.cashFlowReport.coupon') }} </p>
              <p> {{ this.$t('page.cashFlowReport.flash_sale') }} </p>
              <p> {{ this.$t('page.cashFlowReport.redeem_stamp') }} </p>
              <p> {{ this.$t('page.cashFlowReport.direct_discount') }} </p>
            </template>
            <template slot-scope="scope">
              <p>
                {{ formatMoney(scope.row.totalHotelDiscount) }}
              </p>
              <p>
                {{ formatMoney(scope.row.hotelDiscount) }}
              </p>
              <p>
                {{ formatMoney(scope.row.fsHotelDiscount) }}
              </p>
              <p>
                {{ formatMoney(scope.row.redeemValue) }}
              </p>
              <p>
                {{ formatMoney(scope.row.directDiscount) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :min-width="120"
            :label="$t('page.cashFlowReport.user_pay')"
          >
            <template slot-scope="scope">
              <p>
                {{ formatMoney(scope.row.amountFromUser) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :min-width="120"
            :label="$t('page.cashFlowReport.commission')"
          >
            <template slot-scope="scope">
              <p>
                {{ formatMoney(scope.row.totalCommissionAmount) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :min-width="120"
          >
            <template slot="header">
              <p> {{ this.$t('page.cashFlowReport.balance') }} </p>
              <p> {{ this.$t('page.cashFlowReport.receivable') }} </p>
              <p> {{ this.$t('page.cashFlowReport.payable') }} </p>
            </template>
            <template slot-scope="scope">
              <p>
                {{ formatMoney(scope.row.hotelRefund) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :min-width="100"
            :label="$t('page.cashFlowReport.paid_in_advance')"
          >
            <template slot-scope="scope">
              <p>
                {{ formatMoney(scope.row.prepayAmount) }}
              </p>
            </template>
          </el-table-column>
        </el-table>
        <template slot="footer">
          <el-pagination
            @size-change="onSizeChange"
            @current-change="onCurrentChange"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pagination.perPage"
            :current-page="filter.page"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
          />
        </template>
      </div>
    </div>
  </sa-section>
</template>
<script>
import saSection from '@/components/globals/SaSection.vue'
import { getCashFlow } from './api'
import { fetchSuggestionsHotels } from '@/api/hotels'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
export default {
  name: 'CashFlowReportDetail',
  components: {
    saSection
  },
  data () {
    return {
      filter: {
        limit: 10,
        page: 1,
        hotelSn: Number(this.$route.params.sn),
        startDate: this.$route.params.startDate,
        endDate: this.$route.params.endDate,
        deviceType: Number(this.$route.params.deviceType)
      },
      pagination: {},
      ui: {
        isTableLoading: false,
        isLoadingHotel: false,
        hotel: {},
        deviceTypeOptions: [
          { key: this.$t('page.bookingReport.allDevice'), value: 0 },
          { key: this.$t('page.bookingReport.app'), value: 1 },
          { key: this.$t('page.bookingReport.web'), value: 2 }
        ]
      },
      hotels: [],
      data: [],
      headerContent: {}
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
  created () {
    const params = { limit: 10, justHotel: 1, hotelSn: this.filter.hotelSn }
    this.getCashFlow()
    this.listSuggestionsHotels(params)
  },

  methods: {
    async getCashFlow () {
      this.ui.isTableLoading = true
      try {
        const params = {
          ...this.filter
        }
        const { data } = await getCashFlow(this.$route.params.sn, params)
        if (data.data?.bookingReportDetails.length > 0) {
          this.data = data.data.bookingReportDetails
          this.data.unshift(data.data.statistics)
          this.pagination = data.data.meta
          this.headerContent = data.data.statistics
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    searchSuggestionsHotels: debounce(function (keyword) {
      this.listSuggestionsHotels({
        limit: 10,
        justHotel: 1,
        keyword: keyword
      })
    }, timeDebounce),
    async listSuggestionsHotels (params) {
      this.ui.isLoadingHotel = true
      try {
        const { data } = await fetchSuggestionsHotels(params)
        this.hotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotel = false
      }
    },
    onSizeChange (size) {
      this.filter.limit = size
      if (
        Math.ceil(this.pagination.total / size) < this.pagination.currentPage
      ) {
        this.pagination.currentPage = Math.ceil(this.pagination.total / size)
      } // when curent page is larger than total page
      this.getCashFlow()
    },
    onCurrentChange (currentPage) {
      this.filter.page = currentPage
      this.getCashFlow()
    },
    indexMethod (index) {
      if (index === 0) {
        return ''
      } else {
        return index
      }
    },
    getDeviceType (type) {
      switch (type) {
        case 0:
          return this.$t('page.bookingReport.allDevice')
        case 1:
          return this.$t('page.bookingReport.app')
        case 2:
          return this.$t('page.bookingReport.web')
      }
    },
    getBookingType (type) {
      switch (type) {
        case 1:
          return this.$t('option.roomType.hourly')
        case 2:
          return this.$t('option.roomType.overnight')
        case 3:
          return this.$t('option.roomType.daily')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.blue-color{
  color: blue;
}
.purple-color{
  color: #800080;
}
.green-color{
  color: #008080;
}
</style>
