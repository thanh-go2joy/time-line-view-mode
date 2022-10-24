<template>
  <sa-section class="brp-hotels">
    <div class="brp-hotels__filter">
      <el-select
          v-model="filter.deviceType"
          @change="changeFilter"
        >
        <el-option
          v-for="(item, index) in ui.deviceTypeOptions"
          :key="index"
          :label="item.key"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="filter.hotelSn"
        :loading="ui.loading"
        :placeholder="$t('page.bookingReport.hotel_name')"
        remote
        filterable
        :remote-method="searchSuggestionsHotels"
        prefix-icon="el-icon-search"
        clearable
        @change="changeFilter"
      >
        <ElOption
          v-for="(item, index) in listSuggestionsHotels"
          :key="index"
          :label="`${item.name} - ${item.address}`"
          :value="item.sn"
          style="font-size: 13px; color: #4a5d6e;"
        />
      </el-select>
      <el-select
        v-model="filter.type"
        @change="changeFilter"
      >
        <el-option
          v-for="(item, index) in ui.timeTypeOptions"
          :key="index"
          :label="item.key"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="filter.bookingStatus"
        @change="fetchUserBookingHotels"
      >
        <el-option
          v-for="(item, index) in ui.bookingStatusOptions"
          :key="index"
          :label="item.key"
          :value="item.value"
        >
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
      <el-button
        type="success"
        icon="el-icon-download"
        plain
        :disabled="isDisabledExport"
        @click="exportBookingReports"
      >
        {{ $t('button.export') }}
      </el-button>
    </div>
    <el-table
      v-loading="ui.loading"
      :data="listHotels"
    >
      <el-table-column
        type="index"
        label="#"
      />
      <el-table-column
        prop="hotelName"
        :label="$t('page.bookingReport.hotel_name')"
        min-width="100"
      />
      <el-table-column
        prop="code"
        :label="$t('page.bookingReport.code')"
        min-width="60"
      />
      <el-table-column
        :label="$t('page.bookingReport.booking_no')"
        min-width="50"
      >
        <template slot-scope="scope">
          <p>
            <router-link
              :to="{ name: 'firstBookingDetails', params: { sn: scope.row.sn}}"
            >
              {{ scope.row.bookingNo }}
            </router-link>
            <img
              v-if="scope.row.bookingStatus === 2 && scope.row.infoTransfer"
              :src="ui.dangerSrc"
              alt="go2jot_danger"
              style="width: 15px; height: 15px;"
            >
          </p>
          <p>{{ formatDate(scope.row.createTime) }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.bookingReport.device_type')"
        min-width="50"
      >
        <template slot-scope="scope">
          {{ scope.row.deviceType === 1 ? 'App' : 'Web' }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="50"
        :label="$t('page.bookingReport.user_info')"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'userDetails', params: { sn: scope.row.appUserSn } }">
            {{ scope.row.appUserNickName }}
          </router-link>
          <p>
            {{ scope.row.mobile }}
          </p>
          <p>
            <img v-if="scope.row.giftDescription" :src="ui.giftboxSrc" alt="giftbox">
          </p>
          <p>
            <img v-if="scope.row.bonusHour > 0" :src="ui.clockSrc" alt="clock">
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.bookingReport.room_type')"
        min-width="80"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'detailRoomType', params: { sn: scope.row.roomTypeSn } }">
            {{ scope.row.roomTypeName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.bookingReport.coupon')"
        min-width="80"
      >
        <template slot-scope="scope">
          <div style="display: flex; align-items: center;">
            <router-link
              v-if="scope.row.couponPromotionSn"
              :to="{
                name: 'promotionDetails',
                params: {
                  promotionSn: scope.row.sn,
                  couponSn: scope.row.couponSn
                }
              }"
            >
              {{ scope.row.couponName }}
              <span>({{ formatMoney(scope.row.discount) }})</span>
              <span
                v-if="scope.row.discountType === 2"
                style="margin-left: 2px;"
              >
                %
              </span>
              <span
                v-if="scope.row.discountType === 5"
                style="margin-left: 2px;"
              >
                {{ $t('page.bookingReport.discountType') }}
              </span>
            </router-link>
            <p v-else>
              <span v-if="scope.row.discount > 0">({{ formatMoney(scope.row.discount) }})</span>
              <span
                v-if="scope.row.discountType === 2"
                style="margin-left: 2px;"
              >
                %
              </span>
              <span
                v-if="scope.row.discountType === 5"
                style="margin-left: 2px;"
              >
                {{ $t('page.bookingReport.discountType') }}
              </span>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.bookingReport.booking_type')"
        min-width="50"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.type === 1">
            {{ $t("page.bookingReport.hours") }}
          </p>
          <p v-else-if="scope.row.type === 2">
            {{ $t("page.bookingReport.overnight") }}
          </p>
          <p v-else-if="scope.row.type === 3">
            {{ $t("page.bookingReport.daily") }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.bookingReport.stay_at_hotel_time')"
        min-width="60"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.checkInDatePlan }}</p>
          <p v-if="scope.row.type === 1">
            {{ formatTime(scope.row.startTime) }} <span v-if="scope.row.endTime">~ {{ formatTime(scope.row.endTime) }} </span>
          </p>
          <p v-else-if="scope.row.type === 3">
            {{ scope.row.endDate }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.bookingReport.booking_status')"
        min-width="50"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.bookingStatus === 1">
            {{ $t('page.bookingReport.confirmed') }}
          </div>
          <div v-else-if="scope.row.bookingStatus === 2">
            {{ $t("page.bookingReport.check_in") }}:
            <b class="text-danger">
              {{ setViaObject(scope.row.viaObject) }}
            </b>
            <p>
              {{ formatDate(scope.row.checkInTime) }}
            </p>
          </div>
          <div v-else-if="scope.row.bookingStatus === 3">
            {{ $t("page.bookingReport.cancel") }}:
            <b class="text-danger">
              {{ setViaObject(scope.row.viaObject) }}
            </b>
            <p>
              {{ formatDate(scope.row.checkInTime) }}
            </p>
          </div>
          <div v-else-if="scope.row.bookingStatus === 4">
            {{ $t("page.bookingReport.no_show") }}:
            <b v-if="scope.row.viaObject === 5" class="text-danger">
              L
            </b>
            <p>
              {{ formatDate(scope.row.checkInTime) }}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        min-width="50"
        :label="$t('page.bookingReport.room_amount')"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.roomTypeAmount) }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="50"
        :label="$t('page.bookingReport.product_amount')"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.productValue) }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="50"
        :label="$t('page.bookingReport.total_promotion')"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.totalAmount) }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="50"
        :label="$t('page.bookingReport.go2j_promotion')"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.totalGo2joyDiscount) }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="50"
        :label="$t('page.bookingReport.hotel_promotion')"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.totalHotelDiscount) }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="50"
        :label="$t('page.bookingReport.user_pay')"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.amountFromUser) }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="50"
        :label="$t('page.bookingReport.paid_in_advance')"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.refunded > 0">
            <p class="text-danger">
              <del>{{ formatMoney(scope.row.prepayAmount) }}</del>
            </p>
            <p v-if="setPaymentProvider(scope.row.paymentProvider)">
              ({{ setPaymentProvider(scope.row.paymentProvider) }})
            </p>
          </div>
          <div v-else-if="scope.row.refunded === 0">
            <p>
              {{ formatMoney(scope.row.prepayAmount) }}
            </p>
            <p v-if="setPaymentProvider(scope.row.paymentProvider)">
              ({{ setPaymentProvider(scope.row.paymentProvider) }})
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        min-width="30"
        :label="$t('page.userMgt.operations')"
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
                v-if="isShowConfirmButton(scope.row)"
                type="success"
                plain
                size="small"
                icon="el-icon-edit"
                @click="updateBookingReport(scope.row.sn, 'confirm')"
              >
                {{ $t('button.confirm') }}
              </el-button>
              <el-button
                v-if="isShowTransferButton(scope.row)"
                type="primary"
                plain
                size="small"
                @click="onDirectBookingTransfer(scope.row.sn)"
              >
                {{ $t('page.bookingReport.transfer') }}
              </el-button>
              <el-button
                v-if="isShowCancelButton(scope.row)"
                type="danger"
                plain
                size="small"
                @click="updateBookingReport(scope.row.sn, 'cancel')"
              >
                {{ $t('button.cancel') }}
              </el-button>
              <el-button
                v-if="isShowRefundButton(scope.row)"
                type="success"
                plain
                size="small"
                icon="el-icon-edit"
                @click="updateBookingReport(scope.row.sn, 'refund')"
              >
                {{ $t('page.bookingReport.refund') }}
              </el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <template
      slot="footer"
      class="brp-hotels__footer"
    >
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
import { fetchUserBookingHotels, cancelUserBooking, confirmUserBooking, refundUserBooking } from './api'
import { fetchSuggestionsHotels } from '@/api/hotels'
import { exportBookingReports } from '../list/api'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
const today = new Date()
export default {
  components: { SaSection },
  name: 'BookingReportHotels',
  data: (vm) => {
    return {
      isDisabledExport: false,
      pagination: {},
      // data from APIs
      listHotels: [],
      listSuggestionsHotels: [],
      // ui
      ui: {
        loading: false,
        deviceTypeOptions: [
          { key: vm.$t('page.bookingReport.allDevice'), value: 0 },
          { key: vm.$t('page.bookingReport.app'), value: 1 },
          { key: vm.$t('page.bookingReport.web'), value: 2 }
        ],
        timeTypeOptions: [
          { key: vm.$t('page.bookingReport.time_at_hotel'), value: 1 },
          { key: vm.$t('page.bookingReport.check_in_time'), value: 2 }
        ],
        bookingStatusOptions: [
          { key: vm.$t('page.bookingReport.all'), value: 0 },
          { key: vm.$t('page.bookingReport.confirmed'), value: 1 },
          { key: vm.$t('page.bookingReport.check_in'), value: 2 },
          { key: vm.$t('page.bookingReport.cancel'), value: 3 },
          { key: vm.$t('page.bookingReport.no_show'), value: 4 },
          { key: vm.$t('page.bookingReport.payment_fail'), value: 5 }
        ]
      },
      // filter
      filter: {
        deviceType: 0,
        startDate: vm.formatDate(today, false),
        endDate: vm.formatDate(today, false),
        bookingStatus: 0,
        type: 1,
        limit: 10,
        page: 1,
        hotelSn: null
      }
    }
  },
  created () {
    this.filter.deviceType = Number(this.$route.query.deviceType) || 0
    this.filter.startDate = this.$route.query.startDate || 0
    this.filter.endDate = this.$route.query.startDate || 0
    this.filter.hotelSn = Number(this.$route.query.hotelSn) || null
    this.filter.type = Number(this.$route.query.type) || 0
    this.filter.provinceSn = this.$route.query.provinceSn ? `[${this.$route.query.provinceSn}]` : ''
    this.fetchSuggestionsHotels({ limit: 10, justHotel: 1, hotelStatus: 0, hotelSn: this.filter.hotelSn })
    this.fetchUserBookingHotels()
  },
  watch: {
    dateRange: function () {
      this.setQueryRouter()
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
  methods: {
    // show UI
    isShowConfirmButton (row) {
      if (this.hasPermission('sabooking', 'pModify') && row.bookingStatus !== 3 && row.bookingStatus !== 2 && row.bookingStatus !== 1 && row.bookingStatus !== 0) {
        return true
      }
      return false
    },
    isShowTransferButton (row) {
      if (
        row.refunded === 0 &&
        this.hasPermission('sabooking', 'pSpecial') &&
        this.hasPermission('sabooking', 'pModify')
      ) {
        return true
      }
      return false
    },
    isShowCancelButton (row) {
      if (this.hasPermission('sabooking', 'pModify') && row.bookingStatus !== 4 && row.bookingStatus !== 3 && row.bookingStatus !== 1 && row.bookingStatus !== 0) {
        return true
      }
      return false
    },
    isShowRefundButton (row) {
      if (row.bookingStatus === 3 && row.refunded === 0 && row.prepayAmount > 0 && row.paymentProvider !== 20) {
        return true
      }
      return false
    },
    setViaObject (value) {
      switch (value) {
        case 2:
          return 'H'
        case 3:
          return 'G'
        case 4:
          return 'HL'
        case 5:
          return 'L'
        default:
          return ''
      }
    },
    setPaymentProvider (value) {
      switch (value) {
        case 1:
          return this.$t('payment.zalo')
        case 2:
          return this.$t('payment.pos')
        case 3:
          return this.$t('payment.momo')
        case 10:
          return this.$t('payment.credit')
        case 11:
          return this.$t('payment.debit')
        case 20:
          return this.$t('payment.payoo')
        case 60:
          return this.$t('payment.zalo')
        case 41:
          return this.$t('payment.creditCardVnpt')
        case 42:
          return this.$t('payment.atmCardVnpt')
        default:
          return ''
      }
    },
    // set query router when user change filter
    changeFilter () {
      this.setQueryRouter()
    },
    setQueryRouter () {
      this.$router.push({
        name: 'bookingReportHotels',
        query: {
          hotelSn: this.filter.hotelSn,
          deviceType: this.filter.deviceType,
          startDate: this.filter.startDate,
          endDate: this.filter.endDate,
          type: this.filter.type
        }
      })
      this.fetchUserBookingHotels()
    },
    // APIs Data
    async updateBookingReport (sn, action) {
      try {
        await this.$confirm(`${this.$t('message.areYouSure')}`, `${this.$t('message.warning')}`, {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        try {
          let mess = ''
          if (action === 'confirm') {
            await confirmUserBooking(sn)
            mess = this.$t('page.bookingReport.confirmSuccess')
          } else if (action === 'refund') {
            await refundUserBooking(sn)
            mess = this.$t('page.bookingReport.refundSuccess')
          } else if (action === 'cancel') {
            await cancelUserBooking(sn)
            mess = this.$t('page.bookingReport.deleteSuccess')
          }
          this.fetchUserBookingHotels()
          this.$message({
            type: 'success',
            message: mess
          })
        } catch (error) {
          return false
        }
      } catch (error) {
        this.$message({
          type: 'info',
          message: error
        })
      }
    },
    searchSuggestionsHotels: debounce(function (keySearch) {
      this.fetchSuggestionsHotels({
        limit: 10,
        justHotel: 1,
        hotelStatus: 0,
        keyword: keySearch
      })
    }, timeDebounce),
    async fetchSuggestionsHotels (params) {
      this.ui.loading = true
      try {
        const { data } = await fetchSuggestionsHotels(params)
        this.listSuggestionsHotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    async fetchUserBookingHotels () {
      this.ui.loading = true
      try {
        const { data } = await fetchUserBookingHotels(this.filter)
        this.listHotels = data.data.bookingDetails
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    async exportBookingReports () {
      try {
        const params = {
          ...this.filter
        }
        delete params.page
        delete params.limit
        if (!params.hotelSn) {
          params.hotelSn = ''
        }
        if (!params.provinceSn) {
          params.provinceSn = -1
        }
        await exportBookingReports(params)
        const mess = this.$t('page.bookingReport.exportSuccess')
        this.$message({
          type: 'success',
          message: mess
        })
      } catch (error) {
        return false
      }
    },
    onDirectBookingTransfer (sn) {
      this.$router.push({ name: 'bookingTransfer', params: { sn: sn } })
    },
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchUserBookingHotels()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchUserBookingHotels()
    }
  }
}
</script>
<style lang="scss" scoped>
.brp-hotels {
  &__filter {
    .el-select, .el-date-editor, .el-button {
      margin-right: 12px;
      margin-left: 0;
      margin-bottom: 12px;
    }
  }
  &__footer {
    margin-top: 30px;
  }
  .operations {
    cursor: pointer;
    transform: rotate(90deg);
    &:hover {
      color: #ff6400;
    }
  }
}
</style>
