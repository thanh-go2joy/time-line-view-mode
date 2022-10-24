<template>
  <div class="detail-room-type">
    <div class="detail-room-type__button">
      <el-button
        type="info"
        size="large"
        @click="$router.push({name: 'roomType', query: {sn: hotelSn}})"
      >
        {{ $t("button.back") }}
      </el-button>
    </div>
    <sa-section v-loading="ui.isLoading">
      <div class="detail-room-type__basic">
        <el-row>
          <el-col :md="6">
              <p class="bold">{{ $t("page.detailRoomType.hotel_name") }}</p>
          </el-col>
          <el-col :md="18">
              <p v-html="content.hotelName"> </p>
          </el-col>
        </el-row>  <!-- hotel name -->
        <el-row>
            <el-col :md="6">
                <p class="bold">{{ $t("page.detailRoomType.name_short_name") }}</p>
            </el-col>
            <el-col :md="18">
                <p type="text" v-html="content.name+'/'+content.shortName"></p>
            </el-col>
        </el-row>  <!-- short name -->
        <el-row>
            <el-col :md="6">
                <p class="bold">{{ $t("page.detailRoomType.num_of_room") }}</p>
            </el-col>
            <el-col :md="18">
                <p type="text" v-html="content.numOfRoomHotel"></p>
            </el-col>
        </el-row>  <!-- num of room -->
        <el-row>
            <el-col :md="6">
                <p class="bold">{{ $t('page.detailRoomType.first_hours_price')}}/{{ $t('page.detailRoomType.max_num_hour')}}</p>
            </el-col>
            <el-col :md="18">
                <p type="text"  v-html="`${content.firstHours}h - ${formatMoney(this.content.firstHoursOrigin)}/${content.maxNumHour}`"></p>
            </el-col>
        </el-row>   <!-- first hour -->
        <el-row>
            <el-col :md="6">
                <p class="bold">{{ $t('page.detailRoomType.plus_hour_price')}}</p>
            </el-col>
            <el-col :md="18">
                <p type="text"  v-html="`${content.additionalHours}h - ${formatMoney(this.content.additionalOrigin)}`"></p>
            </el-col>
        </el-row>  <!-- plus hour -->
        <el-row>
            <el-col :md="6">
                <p class="bold">{{ $t('page.detailRoomType.overnight_price')}}</p>
            </el-col>
            <el-col :md="18">
                <p type="text"  v-html="`${formatMoney(this.content.overnightOrigin)}`"></p>
            </el-col>
        </el-row>  <!-- overnight -->
        <el-row>
            <el-col :md="6">
                <p class="bold">{{ $t('page.detailRoomType.one_day_price')}}</p>
            </el-col>
            <el-col :md="18">
                <p type="text"  v-html="`${formatMoney(this.content.oneDayOrigin)}`"></p>
            </el-col>
        </el-row>  <!-- one day -->
        <el-row>
            <el-col :md="6">
                <p class="bold">{{ $t('page.detailRoomType.square')}}/{{ $t('page.detailRoomType.bed_type')}}/{{ $t('page.detailRoomType.view')}}</p>
            </el-col>
            <el-col :md="18">
                <p disabled type="text" v-html="content.square+'<md>m<sup>2</sup></md> / ' +bedType+ ' / '+ getViews(content.views)"></p>
            </el-col>
        </el-row>  <!-- utility -->
        <el-row>
          <el-col :md="6">
            <p class="bold">{{ $t('page.detailRoomType.memo') }}</p>
          </el-col>
          <el-col :md="18">
            <p disabled type="text" v-html="content.memo"></p>
          </el-col> <!-- memo -->
        </el-row>
        <el-row>
            <el-col :md="6">
                <p class="bold">{{ $t('page.detailRoomType.facilities') }}</p>
            </el-col>
            <el-col :md="18">
              <el-col
                v-for="(faci,index) in content.facilities"
                :key="index"
                :md="content.facilities.length"
              >
                  <el-image
                    class="img-responsive-icon-faci"
                    :src="formatImage(faci.imagePath)"
                  />
                  <p class="style-text-alight-center-faci">{{ faci[nameLang] }}</p>
              </el-col>
            </el-col>
        </el-row> <!-- facilities -->
      </div>
    </sa-section>
    <sa-section>
      <div class="detail-room-type__special-offer detail-room-item">
          <p class="header-content-bar">{{ $t('page.detailRoomType.special_offer.name')}}</p>
          <div class="special-offer" v-if="content.giftDescription">
              <el-row>
                  <el-col :md="6">
                      <p class="bold">{{ $t('page.detailRoomType.special_offer.description')}}/{{ $t('page.detailRoomType.special_offer.end_date')}}</p>
                  </el-col>
                  <el-col :md="18">
                      <p v-html="content.giftDescription+' / '+content.endProDate"></p>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :md="6">
                      <p class="bold">{{ $t('page.detailRoomType.special_offer.gift_image')}}</p>
                  </el-col>
                  <el-col :md="18">
                      <div
                          id="preview"
                          v-if="content.giftImages"
                      >
                          <img

                              :src="formatImage(content.giftImages.imagePath)"
                          />
                      </div>
                  </el-col>
              </el-row>
          </div><!-- description/end date -->
          <div v-else class="" style="text-align: center;padding: 20px;">
              <p>{{$t('no_data')}}</p>
          </div>
      </div> <!-- special offer -->
    </sa-section>
    <sa-section>
      <div class="detail-room-type__flash-sale detail-room-item">
          <p class="header-content-bar">{{ $t('page.detailRoomType.flash_sale.name')}}</p>
          <div class="flash-sale" v-if="content.flashSale != 0">
              <el-row>
                  <el-col :md="6">
                      <p class="bold">{{ $t('page.detailRoomType.flash_sale.name_flash_sale')}}</p>
                  </el-col>
                  <el-col :md="18">
                      <p v-html="flashSaleInfo.name"> </p>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :md="6">
                      <p class="bold">{{ $t('page.detailRoomType.flash_sale.sale_start')}}</p>
                  </el-col>
                  <el-col :md="18">
                      <p v-html="flashSaleInfo.startDate"> </p>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :md="6">
                      <p class="bold">{{ $t('page.detailRoomType.flash_sale.quantity')}}</p>
                  </el-col>
                  <el-col :md="18">
                      <p v-html="flashSaleInfo.numOfRoom"> </p>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :md="6">
                      <p class="bold">{{ $t('page.detailRoomType.flash_sale.flash_sale_price')}}</p>
                  </el-col>
                  <el-col :md="18">
                      <p v-html="formatMoney(this.flashSaleInfo.priceFlashSale)"> </p>
                  </el-col>
              </el-row>
          </div>
          <div v-else class="" style="text-align: center;padding: 20px;">
              <p>{{$t('no_data')}}</p>
          </div>
      </div> <!-- flash-sale -->
    </sa-section>
    <sa-section>
      <div class="detail-room-type__promotion detail-room-item">
        <el-row>
          <p class="header-content-bar">{{ $t('page.detailRoomType.extra_fee.name')}}</p>
          <el-table
            :data="tableDataExtraFee"
            v-loading="ui.isLoadingExtraFee"
          >
            <el-table-column
              label="#"
              type="index"
            />
            <el-table-column
              :label="$t('page.detailRoomType.extra_fee.booking_type')"
              :min-width="160"
            >
              <template slot-scope="scope">
                <md
                  v-for="type in getBookingType(scope.row,'extraFee')"
                  :key="type"
                >
                  {{ $t(`${type}`) }}<br>
                </md>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('page.detailRoomType.extra_fee.origin')"
              :min-width="160"
            >
              <template slot-scope="scope">
                <md
                  v-show="scope.row.firstHoursOrigin < scope.row.priceFirstHours"
                >
                    {{ formatMoney(scope.row.firstHoursOrigin) }}<br>
                </md>
                <md
                  v-show="scope.row.overnightOrigin < scope.row.priceOvernight"
                >
                    {{  formatMoney(scope.row.overnightOrigin) }}<br>
                </md>
                <md
                  v-show="scope.row.oneDayOrigin < scope.row.priceOneDay"
                >
                    {{  formatMoney(scope.row.oneDayOrigin) }}<br>
                </md>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('page.detailRoomType.extra_fee.name')"
              :min-width="160"
            >
              <template slot-scope="scope">
                <md
                  v-show="scope.row.firstHoursOrigin < scope.row.priceFirstHours"
                >
                    {{ formatMoney(scope.row.priceFirstHours) }}<br>
                </md>
                <md
                  v-show="scope.row.overnightOrigin < scope.row.priceOvernight"
                >
                    {{formatMoney( scope.row.priceOvernight) }}<br>
                </md>
                <md
                  v-show="scope.row.oneDayOrigin < scope.row.priceOneDay"
                >
                    {{ formatMoney(scope.row.priceOneDay) }}<br>
                </md>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('page.detailRoomType.extra_fee.start_end')"
              :min-width="200"
            >
              <template slot-scope="scope">
                {{ `${formatDate(scope.row.startDate,false)} ~ ${formatDate(scope.row.endDate,false)}` }}
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('page.detailRoomType.extra_fee.days_apply')"
              :min-width="200"
            >
              <template slot-scope="scope">
                <md
                  v-for="date in getDaysOfWeek(scope.row)"
                  :key="date">
                  <p>{{ $t(`daysOfWeek.${date}`) }}</p>
                </md>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('page.detailRoomType.extra_fee.special_date')"
              :min-width="160"
            >
              <template slot-scope="scope">
                <md
                  v-for="(p,index) in scope.row.specialDate"
                  :key="'1'+index"
                  :class="'custom-p-'+index"
                  style="margin-right: 10px;"
                >{{p}}</md>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row>
          <p class="header-content-bar">{{ $t('page.detailRoomType.direct_discount.name')}}</p>
          <el-table
              :data="tableDataDirectDiscount"
              v-loading="ui.isLoadingDirectDiscount"
            >
              <el-table-column
                label="#"
                type="index"
              />
              <el-table-column
                :label="$t('page.detailRoomType.direct_discount.booking_type')"
                :min-width="160"
              >
                <template slot-scope="scope">
                    <md
                      v-for="type in getBookingType(scope.row,'directDiscount')"
                      :key="type"

                    >
                      {{ $t(`${type}`) }}<br>
                    </md>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('page.detailRoomType.direct_discount.origin')"
                :min-width="160"
              >
                <template slot-scope="scope">
                  <md
                    v-show="scope.row.firstHoursOrigin > scope.row.priceFirstHours"
                  >
                    {{ formatMoney(scope.row.firstHoursOrigin) }}<br>
                  </md>
                  <md
                    v-show="scope.row.overnightOrigin > scope.row.priceOvernight"
                  >
                    {{ formatMoney(scope.row.overnightOrigin) }}<br>
                  </md>
                  <md
                    v-show="scope.row.oneDayOrigin > scope.row.priceOneDay"
                  >
                    {{ formatMoney(scope.row.oneDayOrigin) }}<br>
                  </md>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('page.detailRoomType.direct_discount.name')"
                :min-width="160"
              >
                <template slot-scope="scope">
                  <md
                    v-show="scope.row.firstHoursOrigin > scope.row.priceFirstHours"
                  >
                    {{ formatMoney(scope.row.priceFirstHours) }}<br>
                  </md>
                  <md
                    v-show="scope.row.overnightOrigin > scope.row.priceOvernight"
                  >
                    {{ formatMoney(scope.row.priceOvernight) }}<br>
                  </md>
                  <md
                    v-show="scope.row.oneDayOrigin > scope.row.priceOneDay"
                  >
                    {{ formatMoney(scope.row.priceOneDay) }}<br>
                  </md>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('page.detailRoomType.direct_discount.start_end')"
                :min-width="200"
              >
                <template slot-scope="scope">
                  {{ `${formatDate(scope.row.startDate,false)} ~ ${formatDate(scope.row.endDate,false)}` }}

                </template>
              </el-table-column>
              <el-table-column
                :label="$t('page.detailRoomType.direct_discount.days_apply')"
                :min-width="200"
              >
                <template slot-scope="scope">
                  <md
                    v-for="date in getDaysOfWeek(scope.row)"
                    :key="date">
                      <p>{{ $t(`daysOfWeek.${date}`) }}</p>
                  </md>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('page.detailRoomType.direct_discount.special_date')"
                :min-width="160"
              >
                <template slot-scope="scope">
                  <md
                    v-for="(p,index) in scope.row.specialDate"
                    :key="'1'+index"
                    :class="'custom-p-'+index"
                    style="margin-right: 10px;"
                  >{{p}}</md>
                </template>
              </el-table-column>
          </el-table>
        </el-row>
      </div> <!-- extra fee and direct discount -->
      <div>
      </div>
    </sa-section>
    <!-- ----- start lock room ----- -->
    <sa-section v-loading="ui.isLoaddingLockRoomHistory">
      <div class="detail-room-type__lock-room detail-room-item">
        <p class="header-content-bar">{{ $t('page.detailRoomType.lockRoomHistory')}}</p>
          <el-table
            :data="tableDataLockRoomHistory">
            <el-table-column
              align="center"
              prop="roomTypeName"
              :label="$t('page.detailRoomType.roomType')"
              :formatter="formatterRoomTypeName"
              :min-width="200">
            </el-table-column>

            <el-table-column :label="$t('page.detailRoomType.dateRange')" align="center">
              <el-table-column
              prop="startDate"
              :label="$t('page.detailRoomType.startDate')"
              :min-width="200">
              </el-table-column>
              <el-table-column
              prop="endDate"
              :label="$t('page.detailRoomType.endDate')"
              :min-width="200">
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="lockType"
              :label="$t('page.detailRoomType.bookingType')"
              :formatter="formatterRoomLockType"
              :min-width="200">
            </el-table-column>
            <el-table-column :label="$t('page.detailRoomType.dateRange')" align="center">
              <el-table-column
              prop="startTime"
              :label="$t('page.detailRoomType.startTime')"
              :min-width="200">
              </el-table-column>
              <el-table-column
              prop="endTime"
              :label="$t('page.detailRoomType.endTime')"
              :min-width="200">
              </el-table-column>
            </el-table-column>
          </el-table>
      </div> <!-- flash-sale -->
    </sa-section>
    <!-- -------- end lock room -------- -->
    <!-- ----- start gallery images ----- -->
    <sa-section>
      <div class="detail-room-type__images-room detail-room-item">
        <div v-if="content?.roomTypeImages?.length && content?.roomTypeImages?.length > 0" class="gallery-hotel">
            <vueper-slides
              ref="vueperslides1"
              :touchable="false"
              fade
              :autoplay="false"
              :bullets="false"
              @slide="$refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })"
              fixed-height="600px">
              <vueper-slide
                v-for="(slide, i) in content?.roomTypeImages"
                :key="i"
                :image="formatImage(slide.imagePath)">
              </vueper-slide>
            </vueper-slides>
            <vueper-slides
              class="no-shadow thumbnails"
              ref="vueperslides2"
              @slide="$refs.vueperslides1.goToSlide($event.currentSlide.index, { emit: false })"
              :visible-slides="content?.roomTypeImages?.length"
              fixed-height="75px"
              :bullets="false"
              :touchable="false"
              :gap="1"
              :arrows="false">
              <vueper-slide
                v-for="(slide, i) in content?.roomTypeImages"
                :key="i"
                :image="formatImage(slide.imagePath)"
                @click.native="$refs.vueperslides2.goToSlide(i)">
              </vueper-slide>
            </vueper-slides>
        </div>
      </div>
    </sa-section>
    <!-- ----- end gallery images ----- -->
  </div>
</template>
<script>
import { getRoomType, listExtraFee, listDirectDiscount, listLockRoomHistory } from '@/api/roomType'
import saSection from '@/components/globals/SaSection.vue'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  name: 'DetailRoomTypeMgt',
  components: {
    saSection,
    VueperSlides,
    VueperSlide
  },
  data () {
    return {
      sn: this.$route.params.sn,
      hotelSn: this.$route.query.hotelSn,
      content: [],
      flashSaleInfo: [],
      views: [],
      tableDataExtraFee: [],
      tableDataDirectDiscount: [],
      tableData: {},
      settings: {
        arrows: true,
        dots: true
      },
      ui: {
        isLoading: false,
        isLoadingExtraFee: false,
        isLoadingDirectDiscount: false,
        isLoaddingLockRoomHistory: false
      },
      tableDataLockRoomHistory: []
    }
  },
  computed: {
    bedType: {
      get: function () {
        switch (this.content.bedType) {
          case 0:
            return this.$t('page.detailRoomType.bed_types.not_select')
          case 1:
            return this.$t('page.detailRoomType.bed_types.single')
          case 2:
            return this.$t('page.detailRoomType.bed_types.double')
          case 3:
            return this.$t('page.detailRoomType.bed_types.twin')
          case 4:
            return this.$t('page.detailRoomType.bed_types.triple')
          case 5:
            return this.$t('page.detailRoomType.bed_types.2_double')
          default:
            return ''
        }
      },
      set: function (data) {
        this.content.bedType = data
      }
    },
    nameLang () {
      return this.$t('lang') === 'vi' ? 'name' : 'nameEn'
    }
  },
  async created () {
    await this.getRoomType()

    this.getExtraFee()
    this.getDirectDiscount()
    this.getHistoryLockDateHotel()
  },
  methods: {
    async getRoomType () {
      this.ui.isLoading = true
      try {
        const { data } = await getRoomType(this.sn)
        this.content = data.data
        this.bedType = this.content.bedType
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },

    async getExtraFee () {
      this.ui.isLoadingExtraFee = true
      try {
        const { data } = await listExtraFee(this.sn)
        this.tableDataExtraFee = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingExtraFee = false
      }
    },

    async getDirectDiscount () {
      this.ui.isLoadingDirectDiscount = true
      try {
        const { data } = await listDirectDiscount(this.sn)
        this.tableDataDirectDiscount = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingDirectDiscount = false
      }
    },

    async getHistoryLockDateHotel () {
      this.ui.isLoaddingLockRoomHistory = true
      try {
        const { data } = await listLockRoomHistory(this.content?.hotelSn, this.sn)
        this.tableDataLockRoomHistory = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.isLoaddingLockRoomHistory = false
      }
    },

    getDaysOfWeek (data) {
      const arrayDay = []
      if (data.monday === 1) {
        arrayDay.push('monday')
      }
      if (data.tuesday === 1) {
        arrayDay.push('tuesday')
      }
      if (data.wednesday === 1) {
        arrayDay.push('wednesday')
      }
      if (data.thursday === 1) {
        arrayDay.push('thursday')
      }
      if (data.friday === 1) {
        arrayDay.push('friday')
      }
      if (data.saturday === 1) {
        arrayDay.push('saturday')
      }
      if (data.sunday === 1) {
        arrayDay.push('sunday')
      }
      return arrayDay
    },

    getViews (view) {
      return view && view.length > 0 ? view.map((item) => ` ${item.name}`) : ''
    },

    getBookingType (data, type) {
      const bookingType = []
      switch (type) {
        case 'extraFee':
          if (data.firstHoursOrigin < data.priceFirstHours) {
            bookingType.push('option.roomType.hourly')
          }
          if (data.overnightOrigin < data.priceOvernight) {
            bookingType.push('option.roomType.overnight')
          }
          if (data.oneDayOrigin < data.priceOneDay) {
            bookingType.push('option.roomType.daily')
          }
          return bookingType
        case 'directDiscount':
          if (data.firstHoursOrigin > data.priceFirstHours) {
            bookingType.push('option.roomType.hourly')
          }
          if (data.overnightOrigin > data.priceOvernight) {
            bookingType.push('option.roomType.overnight')
          }
          if (data.oneDayOrigin > data.priceOneDay) {
            bookingType.push('option.roomType.daily')
          }
          return bookingType
      }
    },

    formatterRoomLockType (row) {
      switch (row.lockType) {
        case 0:
          return this.$t('page.detailRoomType.allBookingTypes')
        case 1:
          return this.$t('page.detailRoomType.hours')
        case 2:
          return this.$t('page.detailRoomType.overnight')
        case 3:
          return this.$t('page.detailRoomType.daily')
      }
    },
    formatterRoomTypeName (row) {
      return row.roomTypeName || this.$t('page.detailRoomType.allRoomTypes')
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-room-type {
  &__basic {
    .el-row {
      padding: 16px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    }
  }
}
// ==============================================
  .detail-room-type {
    &__button {
      z-index: 100;
      display: flex;
      justify-content: flex-end;

      position: fixed;
      bottom: 0;
      right: 0;
      background: white;
      width: 100%;
      padding-bottom: 1em;
      padding-right: 1em;

      button {
        margin-top: 1em;
      }
    }
  }
  .detail-room-item {
    padding: 10px 0;
  }
  .img-responsive-icon-faci{
      height: 40px;
      width: 40px
  }
  .style-text-alight-center-faci{
      font-size: small;
  }
  .header-content-bar{
      font-weight: 500;
      color: #000;
      font-size: 22px;
      padding: 10px;
      text-transform: uppercase;
      text-align: left
  }
  /// // gallery images
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
</style>
