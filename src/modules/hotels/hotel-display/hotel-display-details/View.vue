<template>
  <sa-section
    v-loading="ui.isLoading"
    class="collection-details"
  >
    <div class="hotels">
      <div class="hotels__button">
        <el-button
          @click="$router.go(-1)"
          icon="el-icon-refresh-left"
          type="primary"
          plain
        >
          {{ $t('button.back') }}
        </el-button>
      </div>
      <div>
        <div class="detail">
          <div class="detail__left">
            <div class="detail__left--gray">
              <p>{{$t('page.hotelDisplay.hotelNameCodeGroupName')}}</p>
            </div>
            <div class="detail__left--white">
              <p>{{form.name }} | ({{form.code }}) | <b>{{ hotelGroup }}</b></p>
            </div>
          </div>
          <div class="detail__right">
            <div class="detail__right--gray">
              <p>{{$t('page.hotelDisplay.totalReview')}}</p>
            </div>
            <div class="detail__right--white">
              <p>{{ form.totalReview }}</p>
            </div>
          </div>
        </div>
        <div class="detail">
          <div class="detail__left">
            <div class="detail__left--gray">
              <p>{{$t('page.hotelDisplay.phone')}}</p>
            </div>
            <div class="detail__left--white">
              <p >{{form.areaCode}}{{ form.phone }}</p>
            </div>
          </div>
          <div class="detail__right">
            <div class="detail__right--gray">
              <p>{{$t('page.hotelDisplay.averageMark')}}</p>
            </div>
            <div class="detail__right--white">
              <p>
                <el-rate
                    v-model="form.averageMark"
                    disabled>
                </el-rate>
              </p>
            </div>
          </div>
        </div>
        <div  class="detail">
          <div class="detail__left">
            <div class="detail__left--gray">
              <p>{{$t('page.hotelDisplay.promotionHotNew')}}</p>
            </div>
            <div class="detail__left--white">
              <p v-if="form.origin !== 2">
                <span v-if="form.hasPromotion === 1">{{$t('option.yes')}}</span>
                <span v-if="form.hasPromotion === 0">{{$t('option.no')}}</span> / <span v-if="form.hotHotel === 1">{{$t('option.yes')}}</span>
                <span v-if="form.hotHotel === 0">{{$t('option.no')}}</span> / <span v-if="form.newHotel === 1">{{$t('option.yes')}}</span>
                <span v-if="form.newHotel === 0">{{$t('option.no')}}</span>
              </p>
            </div>
          </div>
          <div class="detail__right">
            <div class="detail__right--gray">
              <p>{{$t('page.hotelDisplay.totalLike')}}</p>
            </div>
            <div class="detail__right--white">
              <p>{{ form.totalFavorite }}</p>
            </div>
          </div>
        </div>
        <div class="detail">
          <div class="detail__left">
            <div class="detail__left--gray">
              <p>{{$t('page.hotelDisplay.overnightTimeDailyTime')}}</p>
            </div>
            <div class="detail__left--white">
              <p v-if="form.origin !== 2" type="text">
                  {{ setting.overnightTimeFrom ? `${setting.overnightTimeFrom.split('.')[0] }h  ~` : '' }} {{ setting.overnightTimeTo ? `${setting.overnightTimeTo.split('.')[0]}h` : '' }} / {{ setting.dailyTimeFrom ? `${setting.dailyTimeFrom.split('.')[0]}h ~` : '' }} {{ setting.dailyTimeTo ? `${setting.dailyTimeTo.split('.')[0]}h` : '' }}
              </p>
              <p v-else type="text">/ {{ setting.dailyTimeFrom ? `${setting.dailyTimeFrom.split('.')[0]}h ~` : '' }} {{ setting.dailyTimeTo ? `${setting.dailyTimeTo.split('.')[0]}h` : '' }}</p>
            </div>
          </div>
          <div class="detail__right">
            <div class="detail__right--gray">
              <p>{{$t('page.hotelDisplay.status')}}</p>
            </div>
            <div class="detail__right--white detail__right--flex">
              <p v-if="form.hotelStatus === 1">{{$t('option.hotelStatus.waiting')}}</p>
              <p v-else-if="form.hotelStatus === 2">{{$t('option.hotelStatus.displayed')}}</p>
              <p v-else-if="form.hotelStatus === 3">{{$t('option.hotelStatus.contracted')}}</p>
              <p v-else-if="form.hotelStatus === 4">{{$t('option.hotelStatus.trial')}}</p>
              <p v-else-if="form.hotelStatus === 5">{{$t('option.hotelStatus.terminated')}}</p>
              <p v-else-if="form.hotelStatus === 6">{{$t('option.hotelStatus.suspended')}}</p>
              <p v-if="form.origin !== 2">({{ form.commission }}%)</p>
            </div>
          </div>
        </div>
        <div class="detail">
          <div class="detail__left">
            <div class="detail__left--gray">
              <p>{{$t('page.hotelDisplay.bookingNotificationBy')}}</p>
            </div>
            <div class="detail__left--white detail__left--flex">
              <p v-if="setting.receiveSms == 1"><i class="el-icon-check"></i> {{$t('option.bookingNotificationBy.sms')}}</p>
              <p v-if="setting.receiveEmail == 1"><i class="el-icon-check"></i> {{$t('option.bookingNotificationBy.email')}}</p>
              <p v-if="setting.receiveNotify == 1"><i class="el-icon-check"></i> {{$t('option.bookingNotificationBy.go2joyParterApp')}}</p>
            </div>
          </div>
          <div class="detail__right">
            <div class="detail__right--gray">
              <p>{{$t('page.hotelDisplay.contractEndContractDate')}}</p>
            </div>
            <div class="detail__right--white">
              <p>
                <span v-if="form.contractDate !== null">
                  {{(form.contractDate)}}
                </span>
                <span v-if="form.endContractDate !== null">
                  / {{(form.endContractDate)}}
                </span>
                <span v-if="form.contractId !== null">
                  | {{ form.contractId }}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="detail">
          <div class="detail__left">
            <div class="detail__left--gray">
              <p>{{$t('page.hotelDisplay.payment')}}</p>
            </div>
            <div v-if="form.origin !== 2" class="detail__left--white">
              <p v-if="form.hotelStatus === 4">{{$t('option.payments.atHotel')}}</p>
              <p v-else-if="setting.paymentOption == 1 && (form.hotelStatus === 3)">{{$t('option.payments.both')}}</p>
              <p v-else-if="setting.paymentOption == 2 && (form.hotelStatus === 3)">{{$t('option.payments.atHotel')}}</p>
              <p v-else-if="setting.paymentOption == 3 && (form.hotelStatus === 3)">{{$t('option.payments.online')}}</p>
              <p v-else></p>
            </div>
            <div v-else class="detail__left--white">
              {{$t('page.hotelDisplay.payInAdvance')}}
            </div>
          </div>
          <div class="detail__right">
            <div class="detail__right--gray">
              <p>{{$t('page.hotelDisplay.hotelType')}}</p>
            </div>
            <div class="detail__right--white">
              <p v-if="form.style === 0">---</p>
              <p v-if="form.style === 1">{{$t('option.hotelTypes.couples')}}</p>
              <p v-if="form.style === 2">{{$t('option.hotelTypes.travel')}}</p>
              <p v-if="form.style === 3">{{$t('option.hotelTypes.couplesAndTravel')}}</p>
              <p v-if="form.style === 4">{{$t('option.hotelTypes.quarantine')}}</p>
            </div>
          </div>
        </div>
        <div class="detail">
          <div class="detail__left">
            <div class="detail__left--gray">
              <p>{{$t('page.hotelDisplay.provinceDistrict')}}</p>
            </div>
            <div class="detail__left--white">
              <p>{{ province }} / {{ district }}</p>
            </div>
          </div>
          <div class="detail__right">
            <div class="detail__right--gray">
              <p>{{$t('page.hotelDisplay.roomAvailable')}}</p>
            </div>
            <div class="detail__right--white">
              <p type="text">{{ form.roomAvailable === 1 ? `${this.$t('option.hotelStatus.hotelAvailable')}` : `${this.$t('option.hotelStatus.hotelUnAvailable')}`}}</p>
            </div>
          </div>
        </div>
        <div class="detail">
          <div class="detail__left">
            <div class="detail__left--gray">
              <p>{{$t('page.hotelDisplay.address')}}</p>
            </div>
            <div class="detail__left--white">
              <p>{{ form.address }}</p>
            </div>
          </div>
          <div class="detail__right">
            <div class="detail__right--gray">
              <p>{{$t('page.hotelDisplay.totalView')}}</p>
            </div>
            <div class="detail__right--white">
              <p>{{ form.totalView }}</p>
            </div>
          </div>
        </div>
        <div class="detail">
          <div class="detail__left">
            <div class="detail__left--gray">
              <p>{{$t('page.hotelDisplay.createStaff')}}</p>
            </div>
            <div class="detail__left--white">
              <p>{{ createStaff }}</p>
            </div>
          </div>
          <div class="detail__right">
            <div class="detail__right--gray">
              <p>{{$t('page.hotelDisplay.staffInCharge')}}</p>
            </div>
            <div class="detail__right--white">
              <p>BIC: {{ bizInCharge }}: SIC: {{ saleInCharge }}</p>
            </div>
          </div>
        </div>
        <div class="detail">
          <div class="detail__left">
            <div class="detail__left--gray">
              <p>{{$t('page.hotelDisplay.top')}}</p>
            </div>
            <div class="detail__left--white">
              <p><span v-if="form.top === 1"></span></p>
            </div>
          </div>
          <div class="detail__right">
            <div class="detail__right--gray">
              <p>{{$t('page.hotelDisplay.display')}}</p>
            </div>
            <div class="detail__right--white">
              <p v-if="form.display === 1"><i class="el-icon-check"></i> </p>
            </div>
          </div>
        </div>
        <!-- Area straight  content -->
        <div class="content">
          <div class="content__left">
            <p>{{$t('page.hotelDisplay.hashTag')}}</p>
          </div>
          <div class="content__right">
            <div v-if="form.hashtags">
              <el-tag
                  class="content__right--margin"
                  v-for="(item, index) in form.hashtags"
                  :key="index"
                  :type="item.type">
                  {{item.name}}
              </el-tag>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="content__left">
            <p>{{$t('page.hotelDisplay.holdingCompany')}}</p>
          </div>
          <div class="content__right">
            <p>{{ form.taxId }} | {{ form.businessLicense }} | {{ form.companyName }} | {{ form.companyAddress }}</p>
          </div>
        </div>
        <div class="content">
          <div class="content__left">
            <p>{{$t('page.hotelDisplay.legalRepresentative')}}</p>
          </div>
          <div class="content__right">
            <p>{{ form.repName }} | {{ form.repPosition }} | {{ form.repTel }} | {{ form.repEmail }}</p>
          </div>
        </div>
        <div class="content">
          <div class="content__left">
            <p>{{$t('page.hotelDisplay.extraFee')}}</p>
          </div>
          <div class="content__right">
            <p v-if="form.allowExtraFee === 1">
              <i class="el-icon-check"></i>
              {{ $t('page.hotelDisplay.extraFee') }}
              <i class="el-icon-top text-danger"></i>
            </p>
          </div>
        </div>
        <div class="content">
          <div class="content__left">
            <p>{{$t('page.hotelDisplay.vietnameseDescription')}}</p>
          </div>
          <div class="content__right">
            <p v-html="form.description"></p>
          </div>
        </div>
        <div class="content">
          <div class="content__left">
            <p>{{$t('page.hotelDisplay.englishDescription')}}</p>
          </div>
          <div class="content__right">
            <p v-html="form.enDescription"></p>
          </div>
        </div>
        <div v-if="form.style === 4" class="content">
          <div class="content__left">
            <p>{{$t('page.hotelDisplay.hotelPolicyVietnamese')}}</p>
          </div>
          <div class="content__right">
            <p v-html="form.policy"></p>
          </div>
        </div>
        <div v-if="form.style === 4" class="content">
          <div class="content__left">
            <p>{{$t('page.hotelDisplay.hotelPolicyEnglish')}}</p>
          </div>
          <div class="content__right">
            <p v-html="form.policyEn"></p>
          </div>
        </div>
      </div>
      <div>
        <div v-if="hotelImages.length && hotelImages.length > 0" class="gallery-hotel">
          <vueper-slides
            ref="vueperslides1"
            :touchable="false"
            fade
            :autoplay="false"
            :bullets="false"
            @slide="$refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })"
            fixed-height="600px">
            <vueper-slide
              v-for="(slide, i) in hotelImages"
              :key="i"
              :image="formatImage(slide.imagePath)">
            </vueper-slide>
          </vueper-slides>
          <vueper-slides
            :style="{ maxWidth: maxWidth + '%' }"
            class="no-shadow thumbnails"
            ref="vueperslides2"
            @slide="$refs.vueperslides1.goToSlide($event.currentSlide.index, { emit: false })"
            :visible-slides="hotelImages.length"
            fixed-height="75px"
            :bullets="false"
            :touchable="false"
            :gap="1"
            :arrows="false">
            <vueper-slide
              v-for="(slide, i) in hotelImages"
              :key="i"
              :image="formatImage(slide.imagePath)"
              @click.native="$refs.vueperslides2.goToSlide(i)">
            </vueper-slide>
          </vueper-slides>
        </div>
        <!-- show image group info -->
        <div class="group gallery-hotel" v-for="(group,index) in groupHotels" :key="index">
          <div class="group__title">{{group.name}}</div>
          <div class="group__detail">
            <ul>
              <li>{{ $t('page.hotelDisplay.firstHoursPrice') }}: 1H {{formatMoney(group.priceFirstHours)}}</li>
              <li>{{ $t('page.hotelDisplay.plusHoursPrice') }}: 1H {{formatMoney(group.priceAdditionalHours)}}</li>
              <li>{{ $t('page.hotelDisplay.overnightPrice') }}: {{formatMoney(group.priceOvernight)}}</li>
              <li>{{ $t('page.hotelDisplay.oneDayPrice') }}: {{formatMoney(group.priceOneDay)}}</li>
              <li>{{ $t('page.hotelDisplay.memo') }}: {{group.memo}}</li>
            </ul>
          </div>
          <div>
            <vueper-slides
              :ref="'vueperslidesGroupImage'+index"
              :touchable="false"
              fade
              :autoplay="false"
              :bullets="false"
              @slide="$refs[`vueperslidesGroupThumb${index}`][0].goToSlide($event.currentSlide.index, { emit: false })"
              fixed-height="600px">
              <vueper-slide
                class="custome-slider-main"
                  v-for="(slide, i) in group.roomTypeImages"
                  :key="i"
                  :image="formatImage(slide.imagePath)">
              </vueper-slide>
            </vueper-slides>
            <vueper-slides
              v-if="group.roomTypeImages && group.roomTypeImages.length > 0"
              :style="{ maxWidth: group.roomTypeImages.length*10 + '%' }"
              class="no-shadow thumbnails"
              :ref="'vueperslidesGroupThumb'+index"
              @slide="$refs[`vueperslidesGroupImage${index}`][0].goToSlide($event.currentSlide.index, { emit: false })"
              :visible-slides="group.roomTypeImages.length"
              fixed-height="75px"
              :bullets="false"
              :touchable="false"
              :gap="1"
              :arrows="false">
              <vueper-slide
                  class="custome-slider-main"
                  v-for="(slide, i) in group.roomTypeImages"
                  :key="i"
                  :image="formatImage(slide.imagePath)"
                  @click.native="$refs[`vueperslidesGroupImage${index}`][0].goToSlide(i)">
              </vueper-slide>
            </vueper-slides>
          </div>
        </div>
        <!-- end show image group info -->
        <div class="group">
            <div class="group__title">QR Code</div>
            <vue-qrcode class="custome-positon-center" :value="$route.params.sn" :options="{ width: 200 }"></vue-qrcode>
        </div>
      </div>
    </div>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { getHotelDisplayDetails } from './api'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import VueQrcode from '@chenfengyuan/vue-qrcode'
export default {
  name: 'HotelDisplayDetails',
  components: {
    SaSection,
    VueperSlides,
    VueperSlide,
    VueQrcode
  },
  data () {
    return {
      ui: {
        isLoading: false
      },
      form: {},
      hotelImages: [],
      groupHotels: [],
      setting: {},
      province: '',
      district: '',
      hotelGroup: '',
      createStaff: '',
      bizInCharge: '',
      saleInCharge: ''
    }
  },
  created () {
    this.getHotelById()
  },
  computed: {
    maxWidth () {
      return this.hotelImages.length * 10
    }
  },
  methods: {
    async getHotelById () {
      this.ui.isLoading = true
      try {
        const { data } = await getHotelDisplayDetails(this.$route.params.sn)
        this.form = data.data
        this.setting = data.data?.setting
        this.hotelImages = data.data?.hotelImages
        this.groupHotels = data.data?.roomTypes

        this.province = data.data?.province?.name
        this.district = data.data?.district?.name
        this.hotelGroup = data.data?.hotelGroup?.name
        this.createStaff = data.data?.createStaff?.fullName
        this.bizInCharge = data.data?.bizInCharge?.fullName
        this.saleInCharge = data.data?.saleInCharge?.fullName
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hotels {
  &__button {
    text-align: right;
    margin-bottom: 10px;
  }
  .detail {
    display: grid;
    grid-template-columns: 49% 49%;
    grid-column-gap: 2%;
    @media (max-width: 640px) {
      display         : block;
    }
    &__left {
      flex        : 1;
      text-align  : left;
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
      padding: 1em 0;

      @media (min-width: 640px) {
        display         : flex;
        justify-items   : center;
        justify-content : flex-start;
      }
      &--gray {
        padding     : 4px 10px;
        flex        : 1;
        font-weight: 600;
      }
      &--white {
        padding : 4px 10px;
        flex    : 1;
      }
      &--flex {
        display: flex;
      }
    }
    &__right {
      flex        : 1;
      text-align  : left;
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
      padding: 1em 0;

      @media (min-width: 640px) {
        display: flex;
      }
      &--gray {
        padding     : 4px 10px;
        flex        : 1;
        font-weight: 600;
      }
      &--white {
        padding : 4px 10px;
        flex    : 1;
      }
      &--flex {
        display: flex;
      }
    }
  }
  .content {
    display: grid;
    grid-template-columns: 23% 75%;
    grid-column-gap: 2%;

    @media (max-width: 640px) {
      display: block;
    }
    padding: 1em 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);

    &__left {
      font-weight: 600;
      p {
        padding: 4px 10px;
      }
    }
    &__right {
      &--margin {
        margin: 0.5em;
      }
      p {
        padding: 4px 10px;
      }
    }
  }
  // gallery images
  .thumbnails {
    margin: auto;
  }
  .thumbnails .vueperslide {
    box-sizing: border-box;
    border: 1px solid #fff;
    transition: 0.3s ease-in-out;
    opacity: 0.7;
    cursor: pointer;
  }
  .thumbnails .vueperslide--active {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
    opacity: 1;
    border-color: #000;
  }
  :deep(.gallery-hotel) {
    margin-top: 30px;
    .vueperslides__arrows {
      color: #ff6400 !important;
    }
    .vueperslide {
      @media (min-width: 640px) {
        width: 50%;
        display: block;
        margin: 0 auto;
      }
    }
  }
  .group {
      margin-top: 30px;
    &__title {
      text-align: left;
      padding: 5px 10px;
      background: rgb(93, 178, 255);
      color: white;
    }

    &__detail {
      text-align: left;
      padding: 5px 20px;

      ul {
          list-style-type: none;
      }
    }
  }
  .custome-positon-center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}
:deep(pre) {
  white-space: pre-wrap;       /* Since CSS 2.1 */
  white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
  white-space: -pre-wrap;      /* Opera 4-6 */
  white-space: -o-pre-wrap;    /* Opera 7 */
  word-wrap: break-word;       /* Internet Explorer 5.5+ */
}
</style>
