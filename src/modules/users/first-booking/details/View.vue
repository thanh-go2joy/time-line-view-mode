<template>
  <sa-section
    class="firs-booking"
    v-loading="ui.loading"
  >
    <div
      v-for="(label, index) in ui.displayItemDetails"
      :key="index"
      class="firs-booking__item"
    >
      <span class="firs-booking__item--left">
        {{ $t(`page.firstBooking.${label}`) }}
      </span>
      <div class="firs-booking__item--right">
        <div v-if="label==='userInfo'">
          {{ firstBookingDetails.appUserNickName }} / {{ firstBookingDetails.mobile }}
        </div>
        <div v-else-if="label==='coupon'">
          <router-link
            v-if="firstBookingDetails.discount > 0"
            :to="{ name: 'detail_promotion', params: { sn: firstBookingDetails.couponPromotionSn}}"
          >
            {{ firstBookingDetails.couponName }}
            ({{ formatMoney(firstBookingDetails.discount) }}
            <b v-if="firstBookingDetails.discountType == 2">
              %
            </b>
            <b v-if="firstBookingDetails.discountType == 5">
              {{$t('page.firstBooking.samePrice')}}
            </b>)
          </router-link>
        </div>
        <div v-else-if="label==='stayAtHotelTime'">
          <span v-if="firstBookingDetails.type == 1">
          {{ $t('page.firstBooking.hours') }}
          {{ formatDate(firstBookingDetails.checkInDatePlan, false) }}
          {{ formatTime(firstBookingDetails.startTime) }}
          <span v-if="firstBookingDetails.endTime != null || firstBookingDetails.endTime != ''">
            ~ {{ formatTime(firstBookingDetails.endTime) }}
          </span>
          </span>
          <span v-else-if="firstBookingDetails.type == 2">
            {{ $t('page.firstBooking.overnight') }} {{ formatDate(firstBookingDetails.checkInDatePlan, false) }}
          </span>
          <span v-else-if="firstBookingDetails.type == 3">
            {{ $t('page.firstBooking.daily') }} {{ formatDate(firstBookingDetails.checkInDatePlan, false) }}~ {{ formatDate(firstBookingDetails.endDate, false) }}
            <span> ~ {{ formatDate(firstBookingDetails.endDate, false) }} </span>
          </span>
        </div>
        <div v-else-if="label==='bookingStatus'">
          <span v-if="firstBookingDetails.bookingStatus == 1">
            {{ $t('page.firstBooking.confirmed') }}
          </span>
          <span v-else-if="firstBookingDetails.bookingStatus == 2">
            {{ $t('page.firstBooking.checkIn') }}
            <b class="text-danger">{{ setViaObject(firstBookingDetails.viaObject) }}</b>
          </span>
          <span v-else-if="firstBookingDetails.bookingStatus == 3">
            {{ $t('page.firstBooking.cancel') }}
            <b class="text-danger">{{ setViaObject(firstBookingDetails.viaObject) }}</b>
          </span>
          <span v-else-if="firstBookingDetails.bookingStatus == 4">
            {{ $t('page.firstBooking.noShow') }}
            <span v-if="firstBookingDetails.viaObject == 5" class="text-danger bold">L</span>
          </span>
          <span v-if="firstBookingDetails.checkInTime">
            {{ formatDate(firstBookingDetails.checkInTime) }}
          </span>
        </div>
        <div
          v-else-if="label==='roomAmount'"
          class="flex"
        >
          <span>
            {{ $t('page.firstBooking.extraFee') }}: {{ formatMoney(firstBookingDetails.extraFee) }}
          </span>
          <span class="text-primary">
            {{ formatMoney(firstBookingDetails.totalAmount - firstBookingDetails.productValue) }}
          </span>
        </div>
        <div
          v-else-if="label==='productAmount'"
          :class="firstBookingDetails.hotelProductList ? 'flex' :  'align-right'"
        >
          <div v-for="product in firstBookingDetails.hotelProductList" :key="product.name">
            <div v-if="lang === 'vi'">
              {{ product.name }}: {{ product.num }} x {{ product.price }}
            </div>
            <div v-else-if="lang === 'en'">
              {{ product.nameEn }}: {{ product.num }} x {{ product.price }}
            </div>
          </div>
          <div class="text-primary">
            {{ formatMoney(firstBookingDetails.productValue) }}
          </div>
        </div>
        <div
          v-else-if="label==='g2jDiscount'"
          class="flex"
        >
          <div>
            <p>
              {{ $t('page.firstBooking.coupon') }}: {{ formatMoney(firstBookingDetails.go2joyDiscount) }}
            </p>
            <p>
              {{ $t('page.firstBooking.mileagePoint') }}: {{ formatMoney(firstBookingDetails.mileagePoint) }}
            </p>
            <p>
              {{ $t('page.firstBooking.otherDiscount') }}: {{ formatMoney(firstBookingDetails.promotionDiscount) }}
            </p>
          </div>
          <div class="text-primary">
            {{ formatMoney(firstBookingDetails.go2joyDiscount + firstBookingDetails.mileagePoint + firstBookingDetails.promotionDiscount + firstBookingDetails.fsGo2joyDiscount) }}
          </div>
        </div>
        <div
          v-else-if="label==='hotelDiscount'"
          class="flex"
        >
          <div>
            <p>
              {{ $t('page.firstBooking.coupon') }}: {{ formatMoney(firstBookingDetails.hotelDiscount) }}
            </p>
            <p>
              {{ $t('page.firstBooking.flashSale') }}: {{ formatMoney(firstBookingDetails.fsHotelDiscount) }}
            </p>
            <p>
              {{ $t('page.firstBooking.redeemStamp') }}: {{ formatMoney(firstBookingDetails.redeemValue) }}
            </p>
            <p>
              {{ $t('page.firstBooking.directDiscount') }}: {{ formatMoney(firstBookingDetails.directDiscount) }}
            </p>
          </div>
          <div class="text-primary">
            {{ formatMoney(firstBookingDetails.hotelDiscount + firstBookingDetails.fsHotelDiscount + firstBookingDetails.redeemValue + firstBookingDetails.directDiscount) }}
          </div>
        </div>
        <div
          v-else-if="label==='amountFromUser' || label==='prepayAmount' || label==='totalAmount'"
          class="align-right"
          :class="label==='totalAmount' ? 'text-primary' : 'text-red'"
        >
          {{ formatMoney(firstBookingDetails[label]) }}
        </div>
        <div v-else>
          {{ firstBookingDetails[label] }}
        </div>
      </div>
    </div>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { getFirstBookingDetails } from './api'
export default {
  name: 'FirstBookingDetails',
  components: { SaSection },
  data: () => {
    return {
      firstBookingDetails: {},
      ui: {
        loading: false,
        lang: '',
        displayItemDetails: [
          'bookingNo',
          'userInfo',
          'roomTypeName',
          'coupon',
          'stayAtHotelTime',
          'bookingStatus',
          'roomAmount',
          'productAmount',
          'totalAmount',
          'g2jDiscount',
          'hotelDiscount',
          'amountFromUser',
          'prepayAmount'
        ]
      }
    }
  },
  created () {
    this.getFirstBookingDetails()
  },
  updated () {
    this.lang = localStorage.getItem('lang')
  },
  methods: {
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
      }
    },
    async getFirstBookingDetails () {
      this.ui.loading = true
      try {
        const { data } = await getFirstBookingDetails(this.$route.params.sn)
        this.firstBookingDetails = data.data
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
.firs-booking {
  &__item {
    padding: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    display: flex;
    align-items: center;
    &--left {
      width: 35%;
      font-weight: 600;
    }
    &--right {
      width: 85%;
      .flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .align-right {
        text-align: right;
      }
      .text-primary {
        color: #409eff;
      }
      .text-red {
        color: #ff6400;
      }
    }
  }
}
</style>
