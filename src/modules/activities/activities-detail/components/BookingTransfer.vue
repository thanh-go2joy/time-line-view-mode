<template>
<div class="booking-transfer-activities-detail-segment">
  <div class="booking-transfer-activities-detail-segment-content">
    <div v-if="dataBookingTransferDetail">
      <div class="booking-transfer-activities-detail-segment-content__content--line">
          <div class="booking-transfer-activities-detail-title">
              <p>{{$t('page.activitiesBookingTransfer.hotel_name')}}</p>
          </div>
          <div class="booking-transfer-activities-detail-content">
              <p>{{ dataUserBookingNew.hotelName }}</p>
          </div>
          <div class="booking-transfer-activities-detail-title">
              <p>{{$t('page.activitiesBookingTransfer.status')}}</p>
          </div>
          <div class="booking-transfer-activities-detail-content">
              <p v-if="dataUserBookingNew.bookingStatus === 4 && dataUserBookingNew.viaObject === 5">{{ $t(getStatusBookingTransfer(5)) }}</p>
              <p v-else>{{ $t(getStatusBookingTransfer(dataUserBookingNew.bookingStatus)) }}</p>
              <!-- <p><span v-if="dataUserBookingNew.bookingStatus === 4 || dataUserBookingNew.viaObject === 5">
                  <span style="color:red" v-html="getLabelBookingStatusViaObject(dataUserBookingNew.viaObject)"></span>
                </span>
                <span v-if="dataUserBookingNew.bookingStatus === 2 || dataUserBookingNew.bookingStatus === 3">
                  <span style="color:red" v-html="getLabelBookingStatusViaObject(dataUserBookingNew.viaObject)"></span>
                </span></p> -->
          </div>
      </div>
      <div class="booking-transfer-activities-detail-segment-content__content--line">
          <div class="booking-transfer-activities-detail-title">
              <p>{{$t('page.activitiesBookingTransfer.room_type')}}</p>
          </div>
          <div class="booking-transfer-activities-detail-content">
              <p >{{ dataUserBookingNew.roomTypeName }}</p>
          </div>
          <div class="booking-transfer-activities-detail-title">
              <p>{{$t('page.activitiesBookingTransfer.confirmed_by')}}</p>
          </div>
          <div class="booking-transfer-activities-detail-content">
              <p v-if="dataBookingTransferDetail.status === 1 || dataBookingTransferDetail.status === 2">{{ $t(getconfirmByBookingTransfer(dataUserBookingNew.viaObject)) }}</p>
              <p v-else> </p>
          </div>
      </div>
      <div class="booking-transfer-activities-detail-segment-content__content--line">
          <div class="booking-transfer-activities-detail-title">
              <p>{{$t('page.activitiesBookingTransfer.booking_type')}}</p>
          </div>
          <div class="booking-transfer-activities-detail-content">
              <p >{{ $t(getBookingTypeBookingTransfer(dataUserBookingNew.type)) }}</p>
          </div>
          <div class="booking-transfer-activities-detail-title">
              <p>{{$t('page.activitiesBookingTransfer.remove_coupon')}}</p>
          </div>
          <div class="booking-transfer-activities-detail-content">
            <!-- Default is 'No' -->
              <p >{{$t('page.activitiesBookingTransfer.booking_status_no')}}</p>
          </div>
      </div>
      <div class="booking-transfer-activities-detail-segment-content__content--line" v-if="dataUserBookingNew.type === 1">
          <div class="booking-transfer-activities-detail-title">
              <p>{{$t('page.activitiesBookingTransfer.stay_at_hotel_time')}}</p>
          </div>
          <div class="booking-transfer-activities-detail-content">
              <p >{{ dataUserBookingNew.checkInDatePlan }}</p>
          </div>
      </div>
      <div class="booking-transfer-activities-detail-segment-content__content--line" v-if="dataUserBookingNew.type === 1">
        <div class="booking-transfer-activities-detail-title">
              <p>{{$t('page.activitiesBookingTransfer.time_from')}}</p>
          </div>
          <div class="booking-transfer-activities-detail-content">
            <span >{{ dataUserBookingNew.startTime }}</span>
          </div>
          <div class="booking-transfer-activities-detail-title">
              <p>{{$t('page.activitiesBookingTransfer.date_to')}}</p>
          </div>
          <div class="booking-transfer-activities-detail-content">
            <p >{{ dataUserBookingNew.endTime }}</p>
          </div>
      </div>
      <div class="booking-transfer-activities-detail-segment-content__content--line" v-if="dataUserBookingNew.type === 2 || dataUserBookingNew.type === 3">
          <div class="booking-transfer-activities-detail-title">
              <p>{{$t('page.activitiesBookingTransfer.date_from')}}</p>
          </div>
          <div class="booking-transfer-activities-detail-content">
              <p >{{ dataUserBookingNew.checkInDatePlan }}</p>
          </div>
          <div class="booking-transfer-activities-detail-title">
              <p>{{$t('page.activitiesBookingTransfer.date_to')}}</p>
          </div>
          <div class="booking-transfer-activities-detail-content">
            <p >{{ dataUserBookingNew.endDate }}</p>
          </div>
      </div>
      <div class="booking-transfer-activities-detail-segment-content__content--line" >
          <div class="booking-transfer-activities-detail-title">
              <p>{{$t('page.activitiesBookingTransfer.payment_method')}}</p>
          </div>
          <div class="booking-transfer-activities-detail-content">
              <p >{{ getPaymentMethodBookingTransfer(dataUserBookingNew.paymentProvider) }}</p>
          </div>
          <div class="booking-transfer-activities-detail-title">
              <p>{{$t('page.activitiesBookingTransfer.commission')}}</p>
          </div>
          <div class="booking-transfer-activities-detail-content">
            <p >{{ getConmissionBookingTransfer(dataBookingTransferDetail.commission) }}</p>
          </div>
      </div>
      <div class="booking-transfer-activities-detail-segment-content__content--line" >
          <div class="booking-transfer-activities-detail-title">
              <el-radio disabled v-model="dataBookingTransferDetail.typeCalculate" :label="1">
                    <b>{{ $t('page.activitiesBookingTransfer.automatically_update_booking_amount')}}</b>
              </el-radio>
          </div>
          <div class="booking-transfer-activities-detail-title">
              <el-radio disabled v-model="dataBookingTransferDetail.typeCalculate" :label="2">
                    <b>{{ $t('page.activitiesBookingTransfer.manually_update_booking_amount')}}</b>
              </el-radio>
          </div>

      </div>
      <div class="booking-transfer-activities-detail-segment-content__content--line" >
          <div class="booking-transfer-activities-detail-title">
              <p>{{$t('page.activitiesBookingTransfer.room_amount')}}</p>
          </div>
          <div class="booking-transfer-activities-detail-content">
              <p >{{ dataBookingTransferDetail.roomAmount }}</p>
          </div>
          <div class="booking-transfer-activities-detail-title">
              <p>{{$t('page.activitiesBookingTransfer.product_amount')}}</p>
          </div>
          <div class="booking-transfer-activities-detail-content">
            <p >{{ dataBookingTransferDetail.productAmount }}</p>
          </div>
      </div>
      <div class="booking-transfer-activities-detail-segment-content__content--line" >
          <div class="booking-transfer-activities-detail-title">
              <p>{{$t('page.activitiesBookingTransfer.total_amount')}}</p>
          </div>
          <div class="booking-transfer-activities-detail-content">
              <p >{{ dataBookingTransferDetail.totalAmount }}</p>
          </div>
          <div class="booking-transfer-activities-detail-title">
              <p>{{$t('page.activitiesBookingTransfer.go2joy_discount')}}</p>
          </div>
          <div class="booking-transfer-activities-detail-content">
            <div  class="tooltip" >{{ getTotalGo2joyDiscount() }} <span class="question-cicle-i"><i class="el-icon-info"></i></span>
              <div class="tooltiptext">
                  <div class="tooltip-left">
                    <p>{{$t('page.activitiesBookingTransfer.coupon')}}</p>
                  </div>
                  <div class="tooltip-right">
                    <p>{{ dataBookingTransferDetail.g2jDiscount }}</p>
                  </div>
                  <div class="tooltip-left">
                    <p>{{$t('page.activitiesBookingTransfer.mileage_point')}}</p>
                  </div>
                  <div class="tooltip-right">
                    <p>{{ dataBookingTransferDetail.mileagePoint }}</p>
                  </div>
                  <div class="tooltip-left">
                    <p>{{$t('page.activitiesBookingTransfer.other_discount')}}</p>
                  </div>
                  <div class="tooltip-right">
                    <p>{{ dataBookingTransferDetail.promotionDiscount }}</p>
                  </div>
              </div>
            </div>

          </div>
      </div>
      <div class="booking-transfer-activities-detail-segment-content__content--line" >
          <div class="booking-transfer-activities-detail-title">
              <p>{{$t('page.activitiesBookingTransfer.hotel_discount')}}</p>
          </div>
          <div class="booking-transfer-activities-detail-content">
            <div  class="tooltip" >{{ getTotalHotelDiscount() }}<span class="question-cicle-i"><i class="el-icon-info"></i></span>
              <div class="tooltiptext">
                  <div class="tooltip-left">
                    <p>{{$t('page.activitiesBookingTransfer.coupon')}}</p>
                  </div>
                  <div class="tooltip-right">
                    <p>{{ dataBookingTransferDetail.hotelDiscount }}</p>
                  </div>
                  <div class="tooltip-left">
                    <p>{{$t('page.activitiesBookingTransfer.flase_sale')}}</p>
                  </div>
                  <div class="tooltip-right">
                    <p>{{ dataBookingTransferDetail.fsHotelDiscount }}</p>
                  </div>
                  <div class="tooltip-left">
                    <p>{{$t('page.activitiesBookingTransfer.redeem_stamp')}}</p>
                  </div>
                  <div class="tooltip-right">
                    <p>{{ dataBookingTransferDetail.redeemValue }}</p>
                  </div>
                  <div class="tooltip-left">
                    <p>{{$t('page.activitiesBookingTransfer.direct_discount')}}</p>
                  </div>
                  <div class="tooltip-right">
                    <p>{{ dataBookingTransferDetail.directDiscount }}</p>
                  </div>
              </div>
            </div>

          </div>
      </div>
      <div class="booking-transfer-activities-detail-segment-content__content--line" >
          <div class="booking-transfer-activities-detail-title">
              <p>{{$t('page.activitiesBookingTransfer.users_pay')}}</p>
          </div>
          <div class="booking-transfer-activities-detail-content">
              <p >{{ dataBookingTransferDetail.userPay }}</p>
          </div>
          <div class="booking-transfer-activities-detail-title">
              <p>{{$t('page.activitiesBookingTransfer.paid_in_advance')}}</p>
          </div>
          <div class="booking-transfer-activities-detail-content">
            <p >{{ dataBookingTransferDetail.paidInAdvance }}</p>
          </div>
      </div>
    </div>
  </div>
  <div class="booking-transfer-table" v-if="tableData">
    <el-table
      v-loading="ui.loadingBookingTransfer"
      :data="tableData"
      :span-method="arraySpanMethod"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="20"
      />
      <el-table-column
        :label="$t('page.activitiesBookingTransfer.table_hotel_name')"
        min-width="100"
      >
      <template slot-scope="scope">
        <p v-if="getLocalize === 'vi' && scope.row.hotelName === 'bookingOrigin'">
          <span>Booking nguyên bản</span>
        </p>
        <p v-else-if="getLocalize === 'en' && scope.row.hotelName === 'bookingOrigin'">
          <span>Booking Origin</span>
        </p>
        <p v-else>{{ scope.row.hotelName }}</p>

      </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.activitiesBookingTransfer.table_code')"
        min-width="100"
      >
      <template slot-scope="scope">
        {{ scope.row.code }}
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.activitiesBookingTransfer.table_booking_no')"
        min-width="100"
      >
      <template slot-scope="scope">
        <p>
          <router-link
              :to="`/hotel/sadmin/booking-detail/${dataBookingTransferDetail.userBookingSn}`"
            >
            {{ scope.row.bookingNo }}
          </router-link>
          <img v-if="scope.row.bookingStatus === 2 && scope.row.infoTransfer !== null" src="@/assets/images/logo/danger.png" style="width: 15px;height: 15px;" alt="danger" :title="scope.row.infoTransfer" class="icon-tick"> <span>{{ scope.row.createTime }}</span>
        </p>
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.activitiesBookingTransfer.table_device_type')"
        min-width="100"
      >
      <template slot-scope="scope">
        {{ getLabelDeviceType(scope.row.deviceType) }}
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.activitiesBookingTransfer.table_user_info')"
        min-width="100"
      >
      <template slot-scope="scope">
        <router-link
              :to="{name: 'userDetails', params: { sn: scope.row.appUserSn }}"
            >
            {{ scope.row.appUserNickName }}
          </router-link>
          <span v-if="scope.row.mobile">/ {{ scope.row.mobile }}</span>
          <img v-if="scope.row.giftDescription" class="icon-tick" src="@/assets/images/svg/gifts.svg" style="width: 15px;height: 15px;"  :alt="scope.row.giftDescription" :title="scope.row.giftDescription">
          <img v-if="scope.row.bonusHour" class="icon-tick" src="@/assets/images/svg/clock.svg" style="width: 15px;height: 15px;"  :alt="scope.row.bonusHour" :title="scope.row.bonusHour">
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.activitiesBookingTransfer.table_room_type')"
        min-width="100"
      >
      <template slot-scope="scope">
        <router-link :to="{name: 'detailRoomType', query: { sn: scope.row.roomTypeSn }}">
          {{ scope.row.roomTypeName }}
        </router-link>
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.activitiesBookingTransfer.table_coupon')"
        min-width="100"
      >
      <template slot-scope="scope">
        <div v-if="scope.row.couponName">
          <div  v-if="scope.row.couponPromotionSn != null">
            <router-link
            :to="{ name: 'promotion_detail', params: { id: scope.row.couponPromotionSn }}"
          >
            {{ scope.row.couponName }}
            <br>
            <span>{{ formatMoney(scope.row.discount) }}</span> <span>{{ scope.row.discountType }}</span>
          </router-link>
          </div>
          <div v-else-if="scope.row.couponPromotionSn == null">
            <span>{{ scope.row.couponName }}</span>
            <span>{{ `(` + formatMoney(scope.row.discount ) + scope.row.discountType + `)`}}</span>
          </div>
        </div>

      </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.activitiesBookingTransfer.table_booking_type')"
        min-width="100"
      >
      <template slot-scope="scope">
        {{ getRoomTypeBookingTransfer(scope.row.type) }}
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.activitiesBookingTransfer.table_stay_at_hotel_time')"
        min-width="100"
      >
      <template slot-scope="scope">
        <span>{{ formatDate(scope.row.checkInDatePlan) }}</span> <br>
        <span v-if="scope.row.type === 1">
          <span v-if="scope.row.startTime">{{ scope.row.startTime }}</span>
          <span v-if=" scope.row.startTime">{{ `~` + scope.row.endTime }}</span>
        </span>
        <span v-else-if="scope.row.type === 3">
          {{ scope.row.endDate }}
        </span>
        <span v-else></span>
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.activitiesBookingTransfer.table_booking_status')"
        min-width="100"
      >
      <template slot-scope="scope">
        <p>{{ getStatusBookingTransfer(scope.row.bookingStatus)}}
          <span v-if="scope.row.bookingStatus === 4 || scope.row.viaObject === 5">
            {{ getLabelBookingStatusViaObject(scope.row.viaObject) }}
          </span>
          <span v-if="scope.row.bookingStatus === 2 || scope.row.bookingStatus === 3" style="color:red" v-html="getLabelBookingStatusViaObject(scope.row.viaObject)">

          </span>
        </p>
        <p v-if="scope.row.checkInTime">{{ formatDate(scope.row.checkInTime) }}</p>
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.activitiesBookingTransfer.table_room_amount')"
        min-width="100"
      >
      <template slot-scope="scope">
        <p>{{ formatMoney(scope.row.roomTypeAmount) }} <span v-if="scope.row.extraFee"><i class="fas fa-angle-double-up"></i></span></p>
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.activitiesBookingTransfer.table_product_amount')"
        min-width="100"
      >
      <template slot-scope="scope">
        <p >{{ formatMoney(scope.row.productValue) }}</p>
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.activitiesBookingTransfer.table_total_amount')"
        min-width="100"
      >
      <template slot-scope="scope">
        <p>{{ formatMoney(scope.row.totalAmount) }}</p>
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.activitiesBookingTransfer.table_go2j_discount')"
        min-width="100"
      >
      <template slot-scope="scope">
        <p>{{ formatMoney(scope.row.go2joyDiscount) }}</p>
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.activitiesBookingTransfer.table_hotel_discount')"
        min-width="100"
      >
      <template slot-scope="scope">
        <p>{{ formatMoney(scope.row.totalHotelDiscount) }}</p>
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.activitiesBookingTransfer.table_user_pay')"
        min-width="100"
      >
      <template slot-scope="scope">
        <p>{{ formatMoney(scope.row.amountFromUser) }}</p>
      </template>
      </el-table-column>
      <el-table-column
            :label="$t('page.activitiesBookingTransfer.table_paid_in_advance')"
            min-width="100"
          >
          <template slot-scope="scope">
            <div v-if="scope.row.refunded > 0">
              <p v-if="scope.row.prepayAmount > 0">
                <span>
                <del>{{ formatMoney(scope.row.prepayAmount) }}</del>
                </span>
                <br>
                <span v-if="scope.row.paymentProvider === 0"></span>
                <span v-else>{{ getPaymentMethodBookingTransfer(scope.row.paymentProvider) }}</span>
              </p>
              <p v-else>
                <span>{{  formatMoney(scope.row.prepayAmount) }}</span>
              </p>
            </div>
            <div v-else>
              <span>{{ formatMoney(scope.row.prepayAmount) }}</span>
              <br>
              <span v-if="scope.row.paymentProvider === 0"></span>
                <span v-else>{{ getPaymentMethodBookingTransfer(scope.row.paymentProvider) }}</span>
            </div>
          </template>
          </el-table-column>
    </el-table>
  </div>
</div>

</template>

<script>
import {
  getBookingtransferActivitiDetail
} from '../api'
export default {
  name: 'ProductConfirm',
  props: {
    targetSN: Number
  },

  data () {
    return {
      dataBookingTransferDetail: [],
      isLoading: true,
      dataUserBookingNew: [],
      dataUserBookingold: [],
      tableData: [],
      ui: {
        loadingBookingTransfer: false
      },
      dataOrigin: {
        hotelName: 'bookingOrigin'
      }
    }
  },
  async created () {
    await this.getBookingTransferContent()
  },
  computed: {
    idBookingTransfer () {
      return this.targetSN
    },
    getLocalize () {
      return this._i18n.locale
    }
  },
  methods: {
    async getBookingTransferContent () {
      const params = {
        userBookingTransferSn: this.idBookingTransfer
      }
      this.isLoading = true
      try {
        const data = await getBookingtransferActivitiDetail(params)

        this.dataBookingTransferDetail = data.data.data
        this.dataUserBookingNew = this.dataBookingTransferDetail.userBookingNew
        this.dataUserBookingOld = this.dataBookingTransferDetail.userBookingOld
        this.tableData = [{ ...this.dataUserBookingNew }, { ...this.dataOrigin }, { ...this.dataUserBookingOld }]
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    }, // getPromotionContent

    getStatusBookingTransfer (bookingStatus) {
      if (!bookingStatus) {
        return ''
      }

      switch (bookingStatus) {
        case 0:
          return this.$t('option.bookingStatus.all')
        case 1:
          return this.$t('option.bookingStatus.confirmed')
        case 2:
          return this.$t('option.bookingStatus.check_in')
        case 3:
          return this.$t('option.bookingStatus.cancel')
        case 4:
          return this.$t('option.bookingStatus.no_show')
        case 5:
          return this.$t('option.bookingStatus.payment_fail')
        default:
          return ''
      }
    },
    getRoomTypeBookingTransfer (roomType) {
      if (!roomType) {
        return ''
      }
      switch (roomType) {
        case 1:
          return this.$t('option.roomType.hourly')
        case 2:
          return this.$t('option.roomType.overnight')
        case 3:
          return this.$t('option.roomType.daily')
        default:
          return ''
      }
    },

    getconfirmByBookingTransfer (confirmBy) {
      if (!confirmBy) {
        return ''
      }
      switch (confirmBy) {
        case 1:
          return this.$t('option.confirmedBy.user')
        case 2:
          return this.$t('option.confirmedBy.hotel')
        case 3:
          return this.$t('option.confirmedBy.go2joy')
        case 4:
          return this.$t('option.confirmedBy.hotel_late')
        case 5:
          return this.$t('option.confirmedBy.location')
        default:
          return ''
      }
    },
    getBookingTypeBookingTransfer (type) {
      if (!type) {
        return ''
      }
      switch (type) {
        case 1:
          return this.$t('option.roomType.hourly')
        case 2:
          return this.$t('option.roomType.overnight')
        case 3:
          return this.$t('option.roomType.daily')
        default:
          return ''
      }
    },
    getPaymentMethodBookingTransfer (paymentMethod) {
      if (!paymentMethod && paymentMethod !== 0) {
        return ''
      }
      switch (paymentMethod) {
        case 0:
          return this.$t('option.paymentsHotel.payHotel')
        case 1:
          return this.$t('option.paymentsHotel.zalo')
        case 2:
          return this.$t('option.paymentsHotel.pos')
        case 3:
          return this.$t('option.paymentsHotel.momo')
        case 10:
          return this.$t('option.paymentsHotel.credit')
        case 11:
          return this.$t('option.paymentsHotel.debit')
        case 20:
          return this.$t('option.paymentsHotel.payoo')
        case 41:
          return this.$t('option.paymentsHotel.creditCardVnpt')
        case 42:
          return this.$t('option.paymentsHotel.atmCardVnpt')
        default:
          return ''
      }
    },
    getConmissionBookingTransfer (conmission) {
      if (!conmission && conmission !== 0) {
        return ''
      } else {
        return conmission + '%'
      }
    },
    getTotalGo2joyDiscount () {
      return Number(this.dataBookingTransferDetail.g2jDiscount) + Number(this.dataBookingTransferDetail.mileagePoint) + Number(this.dataBookingTransferDetail.promotionDiscount)
    },
    getTotalHotelDiscount () {
      return Number(this.dataBookingTransferDetail.hotelDiscount) + Number(this.dataBookingTransferDetail.fsHotelDiscount) + Number(this.dataBookingTransferDetail.redeemValue) + Number(this.dataBookingTransferDetail.directDiscount)
    },
    getLabelDeviceType (deviceType) {
      if (!deviceType) {
        return ' '
      }
      switch (deviceType) {
        case 1:
          return 'App'
        case 2:
          return 'Web'
        default:
          return ''
      }
    },
    getLabelBookingStatusViaObject (viaObject) {
      if (!viaObject) {
        return ''
      }
      switch (viaObject) {
        case 1:
          return ' ' + '<br>'
        case 2:
          return 'H' + '<br>'
        case 3:
          return 'G' + '<br>'
        case 4:
          return 'HL+\'<br>\''
        case 5:
          return 'L' + '<br>'
      }
    },
    arraySpanMethod ({ rowIndex, columnIndex }) {
      if (rowIndex === 1) {
        if (columnIndex === 2) {
          return [1, 20]
        }
      }
    },
    tableRowClassName ({ rowIndex }) {
      if (rowIndex === 1) {
        return 'custom-style-font-bold'
      } else {
        return ''
      }
    }

  }
}
</script>
<style>
.custom-style-font-bold{
  font-weight: 700;
}
</style>
<style lang="scss" scoped>

.booking-transfer-activities-detail-segment-content {
    background-color: #ffffff;
    &__content {
        border: none;
        border-radius: 3px;
        &--line {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            border-bottom: 1px solid rgba(0, 0, 0, 0.125);
            @media (min-width: 640px) {
                grid-template-columns: 1fr;
            }
            @media (min-width: 768px) {
                grid-template-columns: 1fr 1fr;
            }
            @media (min-width: 1024px) {
                grid-template-columns: 1fr 1fr 1fr 1fr;
            }
            justify-content: center;
            align-items: center;
            text-align: left;

            .is-danger {
                padding: 5px 0;
                width: 100%;
                color: red;
            }

            .booking-transfer-activities-detail-title {
                height: 100%;
                margin: 0 15px;

                p {
                    padding: 5px 0;
                }
            }

            .booking-transfer-activities-detail-content {
                margin: 5px 0;

                &__input-select {
                    width: 100%;
                }
                .tooltip {
                  position: relative;
                  display: inline-block;
                  .tooltiptext{
                    display: grid;
                    grid-template-columns: 1fr 1fr;

                    .tooltip-left{
                      float: left;
                      text-align: left;
                      padding: 5px;
                    }
                  }
                }

                /* Tooltip text */
                .tooltip .tooltiptext {
                  visibility: hidden;
                  width: 250px;
                  background-color: #fff;
                  color: black;
                  text-align: center;
                  border: 1px solid rgba(0, 0, 0, 0.125);
                  padding: 5px 0;
                  border-radius: 6px;
                  top: -5px;
                  right: 105%;
                  /* Position the tooltip text - see examples below! */
                  position: absolute;
                  z-index: 1;
                }

                /* Show the tooltip text when you mouse over the tooltip container */
                .tooltip:hover .tooltiptext {
                  visibility: visible;
                }
            }
        }
        &--input {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            padding: 5px 0;
        }

        &--title {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            padding: 5px 0;

            .style-title-list {
                color: #409eff;
                font-weight: bold;
                border-top: 1px solid #8a98ac;
                border-bottom: 1px solid #8a98ac;
                padding: 15px 0;
            }
        }
    }

    &__button {
        padding: 15px;

        &--content {
            display: flex;
            justify-content: flex-end;
        }
    }

    .style-color-red {
        color: red;
    }
}
</style>
