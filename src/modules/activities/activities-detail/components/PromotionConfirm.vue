<template>
<div class="promotion-activities-detail-segment">
    <div class="promotion-activities-detail-segment__content--line">
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.title')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <p>{{ dataPromotionDetail.title }}</p>
        </div>
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.totalHotelApplied')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <p>{{ dataPromotionDetail.totalHotelApplied+' / '+dataPromotionDetail.totalApplyHotel }}</p>
        </div>
    </div>
    <div class="promotion-activities-detail-segment__content--line">
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.code')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <p>{{ dataPromotionDetail.code }}</p>
        </div>
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.totalUserApplied')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <p>{{ dataPromotionDetail.totalUserApplied }}</p>
        </div>
    </div>
    <div class="promotion-activities-detail-segment__content--line">
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.type')}}/{{ $t('page.activitiesPromotion.num_of_coupon')}}/{{ $t('page.activitiesPromotion.max_num_of_coupon')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <p>
                {{ getType(dataPromotionDetail.type) +' / ' + dataPromotionDetail.numOfCoupon+' / '+dataPromotionDetail.maxNumCoupon }}
            </p>
        </div>
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.totalCouponApplied')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <p>{{ dataPromotionDetail.totalCouponIssued }}</p>
        </div>
    </div>
    <div class="promotion-activities-detail-segment__content--line">
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.applyStartEnd')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <p>{{ dataPromotionDetail.applyStart+' ~ '+dataPromotionDetail.applyEnd }}</p>
        </div>
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.total_consumed_coupon')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <p>{{ dataPromotionDetail.totalConsumedCoupon }}</p>
        </div>
    </div>
    <div class="promotion-activities-detail-segment__content--line">
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.couponStartEnd')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <p>{{ dataPromotionDetail.couponStart?dataPromotionDetail.couponStart: ' ' }} ~ {{ dataPromotionDetail.couponEnd?dataPromotionDetail.couponEnd: ' ' }} </p>
        </div>
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.total_go2joy_discount')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <p>{{ dataPromotionDetail.totalGo2joyDiscount }}</p>
        </div>
    </div>
    <div class="promotion-activities-detail-segment__content--line">
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.go2joy_discount') }}/{{ $t('page.activitiesPromotion.hotel_discount')}}/{{ $t('page.activitiesPromotion.sponsor_discount')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <p v-if="dataPromotionDetail.discountType == 3 || dataPromotionDetail.discountType == 4">{{getTypeDiscount(dataPromotionDetail.discountType)}}</p>
            <p v-else v-html=" `${dataPromotionDetail.discountType == 5 ? dataPromotionDetail.discount+' <b>VND</b>' : ''}  `+
              ` ${dataPromotionDetail.go2joyDiscount}${dataPromotionDetail.discountType == 2 || dataPromotionDetail.discountType == 5 ? '<b>%</b>': ''}`+
              ` / ${dataPromotionDetail.hotelDiscount}${dataPromotionDetail.discountType == 2 || dataPromotionDetail.discountType == 5 ? '<b>%</b>': ''}`+
              ` / ${dataPromotionDetail.sponsorDiscount}${dataPromotionDetail.discountType == 2 || dataPromotionDetail.discountType ==5 ? '<b>%</b>': ''}` ">
            </p>
        </div>
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.total_hotel_discount')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <p>{{ dataPromotionDetail.totalHotelDiscount }}</p>
        </div>
    </div>
    <div class="promotion-activities-detail-segment__content--line">
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.status')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <p>{{ getStatus(dataPromotionDetail.status) }}</p>
        </div>
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.total_sponsor_discount')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <p>{{ dataPromotionDetail.totalSponsorDiscount }}</p>
        </div>
    </div>
    <div class="promotion-activities-detail-segment__content--line">
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.discount')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <p v-if="dataPromotionDetail.discountType == 3 || dataPromotionDetail.discountType == 4 || dataPromotionDetail.discountType == 5">{{getTypeDiscount(dataPromotionDetail.discountType)}}</p>
            <p v-else>{{ dataPromotionDetail.discount}} <span v-if="dataPromotionDetail.discountType == 2"><b>%</b> ({{ dataPromotionDetail.maxDiscount }})</span> </p>
        </div>
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.totalDiscount')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <p>{{ dataPromotionDetail.totalDiscount }}</p>
        </div>
    </div>
    <div class="promotion-activities-detail-segment__content--line">
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.last_update')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <p>{{ `${contentActivities.requestStaffName ? contentActivities.requestStaffName : ''}`+' '+formatDate(contentActivities.lastUpdate, false) }}</p>
        </div>
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.create_time')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <p>{{formatDate(dataPromotionDetail.createTime)}}</p>
        </div>
    </div>
    <div class="promotion-activities-detail-segment__content--line1">
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.coupon_condition_name')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <div class="promotion-activities-detail-content__line">
                <p class="promotion-activities-detail-content__line--title">{{ $t('page.activitiesPromotion.coupon_condition_condition_to_use_coupon')}}</p>
            </div>
            <div class="promotion-activities-detail-content__line">
                <span v-for="value in getDaysOfWeek(dataPromotionDetail.useCondition)" v-bind:key="value" style="float: left;">
                    {{$t('option.dateOfWeek.'+value)}}&nbsp;&nbsp;&nbsp;</span>
            </div>
            <div class="promotion-activities-detail-content__line">
                <p class="promotion-activities-detail-content__line--title">{{ $t('page.activitiesPromotion.coupon_condition_just_use_for')}}</p>
            </div>
            <div class="promotion-activities-detail-content__line">
                <p v-for="value in getJustForUse(useCondition)" v-bind:key="value">
                    {{$t('option.roomType.'+value)}} &nbsp;&nbsp;<span v-if="useCondition.startTime != null"> {{ formatHoursMinutes(useCondition.startTime) }} ~ {{ formatHoursMinutes(useCondition.endTime) }} </span><span v-if="useCondition.numHours != 0"> ({{ useCondition.numHours }} H)&nbsp;&nbsp;&nbsp;</span></p>
            </div>
            <div class="promotion-activities-detail-content__line">
                <p class="promotion-activities-detail-content__line--title">{{ $t('page.activitiesPromotion.coupon_condition_max_coupon_per_day')}}</p>
            </div>
            <div class="promotion-activities-detail-content__line">
                <p> {{ useCondition.maxOneDay }}, &nbsp;&nbsp;<span class="promotion-activities-detail-content__line--title"> {{ $t('page.activitiesPromotion.coupon_condition_max_coupon_per_hotel')}} </span> {{ useCondition.maxOneHotel }} </p>
            </div>
            <div class="promotion-activities-detail-content__line">
                <p class="promotion-activities-detail-content__line--title">{{ $t('page.activitiesPromotion.coupon_condition_min_booking_money')}} </p>
            </div>
            <div class="promotion-activities-detail-content__line">
                <p> {{ useCondition.minMoney }} VND</p>
            </div>
            <div class="promotion-activities-detail-content__line">
                <p class="promotion-activities-detail-content__line--title">{{ $t('page.activitiesPromotion.coupon_condition_payment_when_use_coupon')}} </p>
            </div>
            <div class="promotion-activities-detail-content__line">
                <span v-for="value in getPayment(useCondition.paymentMethod)" v-bind:key="value" style="float: left;">
                    {{$t('option.paymentsHotel.'+value)}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>
            <div class="promotion-activities-detail-content__line">
                <p class="promotion-activities-detail-content__line--title">{{ $t('page.activitiesPromotion.coupon_condition_coupon_memo')}}</p>
            </div>
            <div class="promotion-activities-detail-content__line">
                <p v-html="useCondition.couponMemo"></p>
            </div>
            <div class="promotion-activities-detail-content__line">
                <p class="promotion-activities-detail-content__line--title">{{ $t('page.activitiesPromotion.coupon_condition_apply')}}</p>
            </div>
            <div class="promotion-activities-detail-content__line">
                <span>
                    {{ getTextApplyHotel(useCondition.applyTarget) }}
                </span>
                <span v-if="useCondition.applyTarget != 1"><a href="" @click="onDirectListHotel(issueCondition.couponSn)">{{ $t('page.activitiesPromotion.list_hotel') }}</a></span>
            </div>
        </div>
    </div>
    <div class="promotion-activities-detail-segment__content--line1">
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.issue_coupon_condition_name')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <div class="promotion-activities-detail-content__line">
                <p class="promotion-activities-detail-content__line--title">{{ $t('page.activitiesPromotion.issue_coupon_condition_apply')}}</p>
            </div>
            <div class="promotion-activities-detail-content__line">
                <span>{{ getTextApplyUser(couponForUserGroup.type) }}</span>
                <span v-if="couponForUserGroup.type != 1 && couponForUserGroup.typeDetail == 1">
                    <a @click="onDirectUserList(couponForUserGroup.couponSn)" href="">{{ $t('page.activitiesPromotion.user_list') }}</a></span>
            </div>

            <div class="promotion-activities-detail-content__line">
                <p class="promotion-activities-detail-content__line--title">{{ $t('page.activitiesPromotion.issue_coupon_condition_content_of_validation')}}</p>
            </div>
            <div class="promotion-activities-detail-content__line">
                <span>{{ getTextCouponForUser(couponForUserGroup.typeDetail, couponForUserGroup.startDate, couponForUserGroup.endDate) }}</span>
            </div>
        </div>
    </div>
    <div class="promotion-activities-detail-segment__content--line1">
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.room_apply_list')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <div class="promotion-activities-detail-content__line">
                <div style="float:left;display:flex" v-if="roomApplyInfo">
                    <el-checkbox v-if="roomApplyInfo.normal === true" v-model="roomApplyInfo.normal" disabled>{{ $t('option.room.normal')}} </el-checkbox>

                    <el-checkbox v-if="roomApplyInfo.flashsale === true" v-model="roomApplyInfo.flashsale" disabled>{{ $t('option.room.flash_sale')}} </el-checkbox>
                </div>
                <div v-if="roomTypeList != null">
                    <span v-for="(room,index) in roomTypeList" :key="index">
                        <el-checkbox v-model="checkRoom" disabled>{{ room }}</el-checkbox>
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div class="promotion-activities-detail-segment__content--line3">
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.content_vn')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <div class="promotion-activities-detail-content__line">
                <div v-html="dataPromotionDetail.content"></div>
            </div>
        </div>
    </div>
    <div class="promotion-activities-detail-segment__content--line3">
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.content_en')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <div class="promotion-activities-detail-content__line">
                <p v-html="dataPromotionDetail.contentEn"> </p>
            </div>
        </div>
    </div>
    <div class="promotion-activities-detail-segment__content--line3">
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.content_2')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <div class="promotion-activities-detail-content__line">
                <p v-if="dataPromotionDetail.content2 != null || dataPromotionDetail.content2 != undefined"><span v-html="dataPromotionDetail.content2? dataPromotionDetail.content2: ''"></span> </p>
                <p v-else> </p>
            </div>
        </div>
    </div>
    <div class="promotion-activities-detail-segment__content--line3">
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.memo')}}</p>
        </div>
        <div class="promotion-activities-detail-content">
            <div class="promotion-activities-detail-content__line">
                <p v-html="dataPromotionDetail.memo"> </p>
            </div>
        </div>
    </div>
    <div class="promotion-activities-detail-segment__content--line4">
        <div class="promotion-activities-detail-title">
            <p>{{ $t('page.activitiesPromotion.image_of_list')}}</p>
        </div>
        <div class="promotion-activities-detail-image">
          <div class="promotion-activities-detail-content">
            <div id="preview">
                <img v-if="imageSrc" :src="imageSrc" />
            </div>
          </div>
          <div class="promotion-activities-detail-title">
              <p>{{ $t('page.activitiesPromotion.image_of_detail')}}</p>
          </div>
          <div class="promotion-activities-detail-content">
              <div id="preview">
                  <img v-if="imageSrc1" :src="imageSrc1" />
              </div>
          </div>
        </div>
    </div>
</div>

</template>

<script>
import {
  getPromotionActivitiDetail
} from './../api'
export default {
  name: 'PromotionConfirm',
  props: {
    targetSN: Number,
    content: [Array, Object]
  },

  data () {
    return {
      imgSrc: [],
      applyList: false,
      promotion: {},
      useCondition: {},
      issueCondition: {},
      couponForUserGroup: {},
      roomApplyInfo: {},
      imageSrc: '',
      imageSrc1: '',
      checkRoom: true,
      roomTypeList: {},
      dataPromotionDetail: []

    }
  },
  created () {
    this.getPromotionContent(this.idPromotion)
  },
  computed: {
    idPromotion () {
      return this.targetSN
    },
    contentActivities () {
      return this.content
    }
  },
  methods: {
    async getPromotionContent (id) {
      this.isLoading = true
      try {
        const data = await getPromotionActivitiDetail(id)
        if (data) {
          this.imgSrc = this.promotion.imageList
          this.dataPromotionDetail = data.data.data
          this.applyList = this.promotion.applyStatus === 1
          this.loading = false
          this.useCondition = this.dataPromotionDetail.useCondition
          this.issueCondition = this.dataPromotionDetail.issueCondition
          this.couponForUserGroup = this.dataPromotionDetail.couponForUserGroup
          this.roomApplyInfo = this.dataPromotionDetail.roomApplyInfo
          this.roomTypeList = this.dataPromotionDetail.roomTypeList
          this.imageSrc = this.formatImage(this.dataPromotionDetail.imageList[0].imagePath)
          this.imageSrc1 = this.formatImage(this.dataPromotionDetail.imageList[1].imagePath)
        } else {
          this.dataPromotionDetail = null
          this.useCondition = null
          this.issueCondition = null
          this.loading = false
        }
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    }, // getPromotionContent

    onDirectListHotel (couponSn) {
      // direct hotel list
    }, // onDirectListHotel

    getStatus (value) {
      if (!value) {
        return ' '
      }
      switch (value) {
        case 0:
          return this.$t('option.status.deleted')
        case 1:
          return this.$t('option.status.active')
        case 2:
          return this.$t('option.status.expired')
        case 3:
          return this.$t('option.status.temp')
        case 4:
          return this.$t('option.status.draft')
        case 5:
          return this.$t('option.status.wait_confirm')
        default:
          return ''
      };
    }, // getStatus

    getType (value) {
      if (!value) {
        return ''
      }
      switch (value) {
        case 0:
          return this.$t('option.typePromotion.all')
        case 1:
          return this.$t('option.typePromotion.apply')
        case 2:
          return this.$t('option.typePromotion.event')
        case 3:
          return this.$t('option.typePromotion.invite_friend')
        case 4:
          return this.$t('option.typePromotion.gift')
        case 5:
          return this.$t('option.typePromotion.booking')
        case 6:
          return this.$t('option.typePromotion.report_new_hotel')
        case 7:
          return this.$t('option.typePromotion.sign_up')
        case 8:
          return this.$t('option.typePromotion.birthday')
        case 9:
          return this.$t('option.typePromotion.payment')
        default:
          return ''
      };
    }, // getType

    getDaysOfWeek (obj) {
      if (!obj) {
        return ''
      }
      const arrDaysOfWeek = []
      for (const property in obj) {
        switch (property) {
          case 'monday':
            if (obj[property] === 1) {
              arrDaysOfWeek.push('monday')
            }
            break
          case 'tuesday':
            if (obj[property] === 1) {
              arrDaysOfWeek.push('tuesday')
            }
            break
          case 'wednesday':
            if (obj[property] === 1) {
              arrDaysOfWeek.push('wednesday')
            }
            break
          case 'thursday':
            if (obj[property] === 1) {
              arrDaysOfWeek.push('thursday')
            }
            break
          case 'friday':
            if (obj[property] === 1) {
              arrDaysOfWeek.push('friday')
            }
            break
          case 'saturday':
            if (obj[property] === 1) {
              arrDaysOfWeek.push('saturday')
            }
            break
          case 'sunday':
            if (obj[property] === 1) {
              arrDaysOfWeek.push('sunday')
            }
            break
        }
      }
      return arrDaysOfWeek
    }, // getDaysOfWeek

    getPayment (obj) {
      if (!obj) {
        return ''
      }
      const arrPayment = []
      obj.forEach((value, index) => {
        if (!value && value !== 0) {
          return ''
        }
        switch (Number(value)) {
          case 0:
            return arrPayment.push('payHotel')
          case 10:
            return arrPayment.push('momo')
          case 11:
            return arrPayment.push('credit')
          case 20:
            return arrPayment.push('debit')
          case 3:
            return arrPayment.push('payoo')
          case 60:
            return arrPayment.push('zalo')
        }
      })
      return arrPayment
    }, // getPayment

    getStatusDiscount (discount, discountType, maxDiscount) {
      if (!discountType) {
        return ''
      }
      switch (discountType) {
        case 1:
          return discount
        case 2:
          return maxDiscount ? maxDiscount > 0 : discount
        case 3:
          return this.$t('option.discountType.gift')
        case 4:
          return this.$t('option.discountType.discountHours')
        case 5:
          return this.$t('option.discountType.samePrice')
      }
    }, // getStatusDiscount

    getJustForUse (obj) {
      if (!obj) {
        return ''
      }
      obj = Object.values(obj)
      const arrJustForUse = []
      obj.forEach((value, index) => {
        if (!value) {
          return ''
        }
        switch (index) {
          case 3:
            if (value === 1) {
              arrJustForUse.push('hourly')
            }
            break
          case 4:
            if (value === 1) {
              arrJustForUse.push('overnight')
            }
            break
          case 5:
            if (value === 1) {
              arrJustForUse.push('daily')
            }
            break
        }
      })
      return arrJustForUse
    }, // getJustForUse

    onDirectUserList (couponSn) {
      // direct apply for user
      // this.$router.push(`/hotel/sadmin/apply-for-user?sn=${couponSn}&page=coupon-condition`)
    }, // onDirectUserList

    getTypeDiscount (val) {
      if (!val) {
        return ''
      }
      switch (val) {
        case 3:
          return this.$t('option.discountType.gift')
        case 4:
          return this.$t('option.discountType.discountHours')
        case 5:
          return this.$t('option.discountType.samePrice')
      }
    }, // getTypeDiscount

    formatHoursMinutes (time) {
      if (!time) {
        return ''
      }
      const format = time.split(':')
      return `${format[0]}:${format[1]}`
    }, // formatHoursMinutes

    getTextApplyHotel (applyTarget) {
      if (!applyTarget) {
        return ''
      }
      switch (applyTarget) {
        case 1:
          return this.$t('option.applyHotelType.applyAllHotel')
        case 2:
          return this.$t('option.applyHotelType.applyAllHotelExcept')
        case 3:
          return this.$t('option.applyHotelType.onlyApply')
        default:
          return ' '
      }
    }, // getTextApplyHotel

    getTextApplyUser (type) {
      if (!type) {
        return ''
      }
      switch (type) {
        case 1:
          return this.$t('option.applyUserType.applyAllUser')
        case 2:
          return this.$t('option.applyUserType.applyAllUserExcept')
        case 3:
          return this.$t('option.applyUserType.onlyApply')
        default:
          return ' '
      }
    }, // getTextApplyUser

    getTextCouponForUser (type, startDate, endDate) {
      if (!type) {
        return ''
      }
      switch (type) {
        case 2:
          return this.$t('page.activitiesPromotion.exel_file')
        case 3:
          return this.$t('page.activitiesPromotion.num_checkin')
        case 4:
          return `${this.formatDate(startDate)} ~ ${this.formatDate(endDate)}`
        default:
          return ' '
      }
    } //
  }
}
</script>

<style lang="scss" scoped>
.promotion-activities-detail-segment {
    min-height: calc(100vh - 150px);
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

            .promotion-activities-detail-title {
                background-color: #F0F0F0;
                height: 100%;

                p {
                    padding: 5px 15px;
                }
            }

            .promotion-activities-detail-content {
                margin: 0px 15px;
                &__input-select {
                    width: 100%;
                }
            }
        }

        &--line1 {
            width: 100%;

            grid-template-columns: 1fr;
            border-bottom: 1px solid rgba(0, 0, 0, 0.125);
            @media (min-width: 640px) {
              display: flow-root;
                grid-template-columns: 1fr 1fr;
            }

            @media (min-width: 1024px) {
              display: grid;
                grid-template-columns: 1fr 3fr;
            }

            justify-content: center;
            align-items: center;
            text-align: left;

            .promotion-activities-detail-title {
                background-color: #F0F0F0;
                height: 100%;
                p {
                    padding: 5px 15px;
                }
            }

            .promotion-activities-detail-content {
                margin: 0px 15px;
                grid-template-columns: 1fr 1fr;
                &__line {
                  display: flow-root;
                    @media (min-width: 640px) {
                      display: flex;
                    }

                    &--title {
                        font-weight: bold;
                    }
                }
            }
        }
        &--line2 {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            border-bottom: 1px solid rgba(0, 0, 0, 0.125);
            @media (min-width: 640px) {
                grid-template-columns: 1fr 1fr;
            }

            @media (min-width: 1024px) {
                grid-template-columns: 1fr 1fr 1fr 1fr;
            }

            justify-content: center;
            align-items: center;
            text-align: left;

            .promotion-activities-detail-title {
                background-color: #F0F0F0;
                height: 100%;

                p {
                    padding: 5px 15px;
                }
            }

            .promotion-activities-detail-content {
                margin: 5px 15px;
                display: grid;
                grid-template-columns: 1fr 1fr;

                @media (min-width: 640px) {
                    grid-template-columns: 1fr 3fr;
                }

                @media (min-width: 1024px) {
                    grid-template-columns: 1fr 3fr;
                }

                &__line {
                    display: flex;

                    &--title {
                        font-weight: bold;
                    }
                }
            }
        }
        &--line3 {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            border-bottom: 1px solid rgba(0, 0, 0, 0.125);
            @media (min-width: 640px) {
                grid-template-columns: 1fr ;
            }

            @media (min-width: 1024px) {
                grid-template-columns: 1fr 3fr;
            }

            justify-content: center;
            align-items: center;
            text-align: left;

            .promotion-activities-detail-title {
                background-color: #F0F0F0;
                height: 100%;

                p {
                    padding: 5px 15px;
                }
            }

            .promotion-activities-detail-content {
                margin: 5px 15px;
                display: grid;
                grid-template-columns: 1fr;

                &__line {
                    display: flex;

                    &--title {
                        font-weight: bold;
                    }
                }
            }
        }
        &--line4 {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            border-bottom: 1px solid rgba(0, 0, 0, 0.125);
            @media (min-width: 640px) {
                grid-template-columns: 1fr 3fr;
            }

            @media (min-width: 1024px) {
                grid-template-columns: 1fr 3fr;
            }

            justify-content: center;
            align-items: center;
            text-align: left;
            .promotion-activities-detail-image{
              display: grid;
              grid-template-columns: 1fr;

              @media (min-width: 640px) {
                  grid-template-columns: 1fr;
              }

              @media (min-width: 1024px) {
                  grid-template-columns: 1fr 1fr 1fr;
              }
              .promotion-activities-detail-title {
                background-color: #F0F0F0;
                height: 100%;
                p {
                    padding: 5px 15px;
                }
            }

            .promotion-activities-detail-content {
                margin: 5px 15px;
                display: grid;
                grid-template-columns: 1fr;

                &__line {
                    display: flex;

                    &--title {
                        font-weight: bold;
                    }
                }
            }
            }
            .promotion-activities-detail-title {
                background-color: #F0F0F0;
                height: 100%;

                p {
                    padding: 5px 15px;
                }
            }

            .promotion-activities-detail-content {
                margin: 5px 15px;
                display: grid;
                grid-template-columns: 1fr;

                &__line {
                    display: flex;

                    &--title {
                        font-weight: bold;
                    }
                }
            }

        }
        &--input {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            padding: 5px 15px;
        }

        &--title {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            padding: 5px 15px;

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
