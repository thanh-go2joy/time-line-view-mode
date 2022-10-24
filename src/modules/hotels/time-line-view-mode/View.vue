<template>
  <sa-section v-loading="ui.isLoading" class="time-line-view-mode">
    <template slot="header">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="10" :md="4" :lg="6" :xl="5">
          <el-select
          class="w-100"
          :loading="ui.isLoadingHotels"
          v-model="filter.hotelSn"
          element-loading-spinner="el-icon-loading"
          remote
          filterable
          clearable
          :placeholder="$t('page.hotelDisplay.hotelName')"
          :remote-method="onReloadHotels"
          @change="getRoomTypes"
          value-key="sn"
        >
            <el-option
                v-for="(item, index) in hotelSuggestions"
                :key="index"
                :label="item.name"
                :value="item.sn"
                style="font-size: 13px; color: #4a5d6e;"
              >
                <div class="time-line-view-mode__filter--text-line time-line-view-mode__filter--text-distance">
                  <p>{{ item.name }}</p>
                  <p class="time-line-view-mode__filter--text-size text-grey">{{ item.address }}</p>
                </div>
            </el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="14" :md="20" :lg="18" :xl="19" class="text-right">
          <el-button class="text-bold" type="text" style="color: #f45c39" disabled>
              <img src="@/assets/images/svg/flash-sale.svg" alt="flash-sale">
              <span style="margin-left: 5px;">{{ $t('page.calendar.flash_sale')}}</span>
          </el-button>
          <el-button class="text-bold" type="text" icon="el-icon-top" style="color: #409EFF" disabled>{{ $t('page.calendar.extra_fee')}}</el-button>
          <el-button class="text-bold" type="text" icon="el-icon-bottom" style="color: #E6A23C" disabled>{{ $t('page.calendar.direct_discount')}}</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="8" :md="6" :lg="6" :xl="6" class="text-position">
          <el-radio-group @change="changeConfigTimeLine" v-model="timeValue">
          <el-radio-button label="day">{{ $t('page.calendar.day') }}</el-radio-button>
          <el-radio-button label="day-3">{{ $t('page.calendar.three_days') }}</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :xs="24" :sm="10" :md="10" :lg="12" :xl="12">
          <el-row type="flex" justify="center">
            <el-button icon="el-icon-arrow-left" @click="preDate" circle></el-button>
            <el-date-picker
              class="px-sm"
              v-model="dateValue"
              type="date"
              @change="changeDate"
              :placeholder="$t('page.calendar.pick_a_day')">
            </el-date-picker>
            <el-button icon="el-icon-arrow-right" @click="nextDate" circle></el-button>
          </el-row>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="6" class="text-right">
            <el-radio-group @change="changeConfigTimeLine" v-model="timeValue">
            <el-radio-button label="month">{{ $t('page.calendar.one_month') }}</el-radio-button>
            <el-radio-button label="month-2">{{ $t('page.calendar.two_months') }}</el-radio-button>
            <el-radio-button label="month-3">{{ $t('page.calendar.three_months') }}</el-radio-button>
            </el-radio-group>
        </el-col>
      </el-row>
    </template>

    <!-- // calendar -->
    <div id="demo-resource-grouping-time-line" class="md-switching-timeline-view-cont md-resource-header-template md-timeline-height md-switching-timeline-view-cont time-line-view-mode__calendar"></div>
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

    <!-- ------------------ start popup ----------------- -->
    <popup-setting ref="settingModal" @openChildModal="openChildModal"/>
    <popup-extra-fee ref="extraFeeModal" />
    <popup-direct-discount ref="directDiscountModal" />
    <!-- ------------------ end popup ----------------- -->
  </sa-section>
</template>

<style lang="scss" scoped>
.time-line-view-mode {
  &__filter {
    &--text-line {
      line-height: 24px;
    }
    &--text-distance {
      padding: 4px 0;
    }
    &--text-size {
      font-size: 13px
    }
  }
}
.el-col {
  padding: 6px 10px;
}
.w-100 {
  width: 100% !important;
}
.el-select-dropdown__item {
  height: auto;
}
</style>

<style lang="scss">
// start scroll left - right
@supports (overflow:clip) {
  .md-switching-timeline-view-cont.mbsc-ltr .mbsc-schedule-event-inner {
    left: 16vw;
    vertical-align: unset;
    @media (max-width: 640px) {
      left: 42vw;
    }
  }
  .md-switching-timeline-view-cont.mbsc-rtl .mbsc-schedule-event-inner {
    right: 205px;
  }
}
// end scroll left - right
.mbsc-ios.mbsc-schedule-event {
  height: auto !important;
  &:focus,
  &:hover {
    .md-timeline-template-event-cont {
      color: #ff6400;
    }
  }
}
.md-timeline-template .mbsc-schedule-event.mbsc-ltr {
    height: auto !important;
}
.md-timeline-template-event {
    border: 1px solid transparent;
    margin: 2px 0;
}
.md-timeline-template-event-cont {
  font-size: 14px;
  max-height: 2em;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: bold;
}
.mbsc-timeline-event-start .md-timeline-template-event,
.mbsc-timeline-event-start .md-timeline-template-event-cont,
.mbsc-timeline-event-start .md-timeline-template-event-cont .mbsc-icon {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  text-align: left;
}
.mbsc-timeline-event-end .md-timeline-template-event,
.mbsc-timeline-event-end .md-timeline-template-event-cont,
.mbsc-timeline-event-end .md-timeline-template-event-cont .mbsc-icon {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  text-align: left;
}
.md-timeline-template-event-cont {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
.md-timeline-template-event-cont .mbsc-icon:before {
  color: #fff;
  font-size: 18px;
}
.md-timeline-template-title {
  color: #666;
}
// .md-timeline-template .mbsc-timeline-column,
// .md-timeline-template .mbsc-timeline-header-column {
//   min-width: 100px;
// }
// .md-timeline-template .mbsc-timeline-resource,
// .md-timeline-template .mbsc-timeline-row {
//   min-height: 100px;
// }
// .mbsc-timeline-parent {
//   height: 58px !important;
//   // min-height: 58px !important;
// }
// end test
// .md-resource-header-template .mbsc-timeline-resource,
// .md-resource-header-template .mbsc-timeline-row {
//   // min-height: 306px;
//   height: 386px;
//   padding-left: unset !important;
// }
.md-resource-header-template .mbsc-timeline-resource-col {
  @media (min-width: 1024px) {
      width: 16vw !important;
  }
  @media only screen and (min-width: 740px) and (max-width: 1023px) {
      width: 30vw !important;
  }
  @media (max-width: 739px) {
      width: 44vw !important;
  }
}
// // custom rows
.md-resource-header-template-price {
  margin: 1em 0;
}
.md-resource-header-template-rooms {
  position: relative;
}
.mbsc-calendar-controls {
  display: none; // ẩn controls today & show time
}
.time-line-view-mode {
  .text-position {
    text-align: left;
    @media (max-width: 640px) {
      text-align: center;
    }
  }
  .text-right {
    text-align: right;
    @media (max-width: 640px) {
      text-align: center;
    }
  }
  .w-100 {
    width: 100%;
  }
  .text-bold {
    font-weight: bold;
    padding: 0;
    i {
      font-weight: bold;
    }
  }
  .px-sm {
    margin: 0 6px;
  }
  // ::-webkit-scrollbar {
  //     width: 4px;
  //     height: 4px;
  // }
  // /* Track */
  // ::-webkit-scrollbar {
  //   -webkit-appearance: none;
  //   width: 8px;
  // }
  // ::-webkit-scrollbar-track {
  //     box-shadow: inset 0 0 5px grey;
  //     border-radius: 30px;
  // }
  // /* Handle */
  // ::-webkit-scrollbar-thumb {
  //     background: #888;
  //     border-radius: 30px;
  // }
  // /* Handle on hover */
  // ::-webkit-scrollbar-thumb:hover {
  //     background: #555;
  // }

  ////////////////////@at-root
  &__calendar {
    max-height: 70vh;
    // width: auto;
      /* custome input type switch */
    .switch {
      position: relative;
      display: inline-block;
      width: 34px;
      height: 16px;
      input {
        opacity: 0;
        width: 0;
        height: 0;
        &:focus + .slider {
            box-shadow: 0 0 1px #2196F3;
        }
        &:checked + .slider:before {
            -webkit-transform: translateX(17px);
            -ms-transform: translateX(17px);
            transform: translateX(17px);
        }
        &:checked + .slider {
            background-color: #2196F3;
        }
    }
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
        &:before {
            position: absolute;
            content: "";
            height: 10px;
            width: 10px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
        }
        &.round {
            border-radius: 34px;
            &:before {
                border-radius: 50%;
            }
        }
      }
    }
    .custom-flex {
      display: flex;
      align-items: center;
      gap: 1em;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 0.5em;
    }
    .font-normal {
        font-weight: normal;
    }
    // custome  tooltip
    .slice-tooltip {
      display: -webkit-box;
      height: 100%;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: 14px;

      max-width: 16vw !important;
      @media (min-width: 1920px) {
        max-width: 14vw !important;
      }

      [data-title]:hover:after {
        opacity: 1;
        transition: all 0.1s ease 0.5s;
        visibility: visible;
      }
      [data-title]:after {
        content: attr(data-title);

        background-color: white;
        position: absolute;
        left: 0;
        top: 0;
        visibility: hidden;

        width: 100%;
        box-sizing: border-box;
        font-weight: normal;
        font-size: 12px;

        padding: 0.8em;
        border: 1px solid #C2C5CC;
        border-radius: 6px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
      }
    }
    select {
      cursor: pointer;
    }
    select:disabled {
      cursor: unset;
    }
  }
}

.is-hiden {
  visibility: hidden !important;
  width: 100% !important;
  pointer-events: none !important;
  cursor: not-allowed;
}
</style>

<script>
import * as mobiscroll from '@mobiscroll/javascript'
import '@mobiscroll/javascript/dist/css/mobiscroll.min.css'

import PopupExtraFee from './popup/extra-fee'
import PopupDirectDiscount from './popup/direct-discount'
import SaSection from '@/components/globals/SaSection.vue'
import PopupSetting from './popup/setting'
import { listRoomType } from './api'
import { fetchSuggestionsHotels } from '@/api/hotels'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500

export default {
  components: {
    SaSection,
    PopupExtraFee,
    PopupDirectDiscount,
    PopupSetting
  },
  data () {
    return {
      ui: {
        isLoadingHotels: false,
        isLoading: false,
        isOpenDetailModal: false,
        isOpenOparationBeforeCreateModal: false,
        isOpenOparationCreatedModal: false,
        isDisableResource: false
      },
      filter: {
        limit: 10,
        page: 1,
        hotelSn: null
      },
      timelineConfig: {
        type: 'day',
        startDay: 1,
        endDay: 5
        // rowHeight: 'equal'
      },
      dateValue: new Date(),
      timeValue: 'day',
      calendar: null,
      // Nạp dữ liệu vào calendar
      total: 0,
      hotels: [],
      resources: [],
      data: [],
      hotelSuggestions: [],
      pagination: {}
    }
  },
  created () {
    this.fetchHotels()
    this.getRoomTypes()
    this.handleInstantLock() // ACTIVE HANDLE LOCK
  },
  computed: {
    getLocalize () {
      return this._i18n.locale
    }
  },
  watch: {
    getLocalize () {
      this.renderTimeLine()
    }
  },
  methods: {
    isHideen (ev) {
      return ev.type === 0 ? 'is-hiden' : ''
    },
    async fetchHotels (keyword) {
      this.ui.isLoadingHotels = true
      try {
        const params = { keyword: keyword || '', hotelStatus: 0 }
        const { data } = await fetchSuggestionsHotels(params)
        this.hotelSuggestions = data.data?.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotels = false
      }
    },
    onReloadHotels: debounce(function (keyword) {
      this.fetchHotels(keyword)
    }, timeDebounce),
    async getRoomTypes () {
      this.ui.isLoading = true
      try {
        const { data } = await listRoomType(this.filter)
        this.pagination = data.data?.meta
        this.hotels = data.data?.hotelList
        this.data = data.data?.additionalData

        // var jjj = []
        // const ttttttt = data.data?.hotelList.map(item => {
        //   item.children.map(it => {
        //     jjj.push(it.id)
        //   })
        // })
        // console.log('ttttttt: ', ttttttt)

        // const newArr = []
        // jjj.map(item => {
        //   newArr.push(
        //     {
        //       end: '2050-10-26 12:00',
        //       resource: item,
        //       start: '2010-10-20 10:00',
        //       title: 'cccccc',
        //       titleEn: 'cccccc',
        //       type: 0
        //     },
        //     {
        //       end: '2050-10-26 12:00',
        //       resource: item,
        //       start: '2010-10-20 10:00',
        //       title: 'cccccc',
        //       titleEn: 'cccccc',
        //       type: 0
        //     },
        //     {
        //       end: '2050-10-26 12:00',
        //       resource: item,
        //       start: '2010-10-20 10:00',
        //       title: 'cccccc',
        //       titleEn: 'cccccc',
        //       type: 0
        //     },
        //     {
        //       end: '2050-10-26 12:00',
        //       resource: item,
        //       start: '2010-10-20 10:00',
        //       title: 'cccccc',
        //       titleEn: 'cccccc',
        //       type: 0
        //     },
        //     {
        //       end: '2050-10-26 12:00',
        //       resource: item,
        //       start: '2010-10-20 10:00',
        //       title: 'cccccc',
        //       titleEn: 'cccccc',
        //       type: 0
        //     },
        //     {
        //       end: '2050-10-26 12:00',
        //       resource: item,
        //       start: '2010-10-20 10:00',
        //       title: 'cccccc',
        //       titleEn: 'cccccc',
        //       type: 0
        //     }
        //   )
        // })

        // this.data = [...data.data?.additionalData, ...newArr]
      } catch (error) {
        return false
      } finally {
        await this.renderTimeLine()
        this.ui.isLoading = false
        // handle add + remove disable when check block room
      }
    },
    handleSizeChange (value) {
      this.filter.limit = value
      this.getRoomTypes()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.getRoomTypes()
    },
    renderTimeLine () {
      const self = this
      mobiscroll.setOptions({
        locale: this._i18n.locale === 'en' ? mobiscroll.localeEn : mobiscroll.localeVi, // Specify language like: locale: mobiscroll.localePl or omit setting to use default
        theme: 'ios', // Specify theme like: theme: 'ios' or omit setting to use default
        themeVariant: 'light' // More info about themeVariant: https://docs.mobiscroll.com/5-15-1/javascript/eventcalendar#opt-themeVariant
      })
      this.calendar = mobiscroll.eventcalendar('#demo-resource-grouping-time-line', {
        view: {
          timeline: this.timelineConfig
          // schedule: this.timelineConfig
        },
        data: this.data,
        resources: this.hotels,
        // invalid: [{
        //   recurring: {
        //     repeat: 'daily'
        //   },
        //   // resource: [this.seedHotels] // disable the parent resources with id gro2 and 'gro3'
        //   resource: [this.seedHotels] // disable the parent resources with id gro2 and 'gro3'
        // }],
        renderResource: function (resource) {
          const numNotConfirmed = ''
          const hotelSn = ''
          const allowExtraFee = ''
          const roomObject = {
            applyFlashSale: 1,
            instantLock: {
              status: true
            }
          }
          return !resource.isParent ? `<div class="md-resource-header-template-cont">
                      <div clzass="md-resource-header-template-name"> 
                          <div class="slice-tooltip">
                              <p data-title="${resource.name}">${resource.name}</p>
                          </div>
                      </div>

                      <div class="md-resource-header-template-price">
                          <div class="custom-flex">
                              <p class="font-normal">${self.$t('option.roomType.hourly')}:</p>
                              <p>${resource.firstHours}h - ${self.formatMoney(resource.firstHoursOrigin)}</p>
                          </div>
                          <div class="custom-flex">
                              <p class="font-normal">${self.$t('option.roomType.additional')}:</p>
                              <p>${resource.additionalHours}h - ${self.formatMoney(resource.additionalOrigin)}</p>
                          </div>
                          <div class="custom-flex">
                              <p class="font-normal">${self.$t('option.roomType.overnight')}:</p>
                              <p>${self.formatMoney(resource.overnightOrigin)}</p>
                          </div> 
                          <div class="custom-flex">
                              <p class="font-normal">${self.$t('option.roomType.daily')}:</p>
                              <p>${self.formatMoney(resource.oneDayOrigin)}</p>
                          </div> 
                      </div>

                      <div class="md-resource-header-template-rooms">
                          <div class="custom-flex">
                              <button ${self.ui.isDisableResource ? 'disabled' : ''} class="custom-setting el-button el-button--default" id="room-setting-${resource.id} test-room-setting" data-sn="${resource.id}" data-hotelSn="${hotelSn}" data-numNotConfirmed="${numNotConfirmed}" data-allowExtraFee="${allowExtraFee}" type="button">
                                  ${self.$t('page.calendar.room_setting')}
                                  <i class="el-icon-caret-bottom"></i>
                              </button>
                          </div>
                          <div class="custom-flex">
                              <p>${self.$t('page.calendar.instant_lock')}</p>
                              <label class="switch">
                                  <input ${self.ui.isDisableResource ? 'disabled' : ''} id="checkbox-${resource.id}" type="checkbox" class="custom-checkbox" data-id="${resource.id}" data-fs="${roomObject.applyFlashSale}" ${roomObject.instantLock.status === 1 ? 'checked' : ''} />
                                  <span class="slider round"></span>
                              </label>
                          </div> 
                          <div class="custom-flex">
                              <div class="slice-tooltip font-normal">
                                  ${self.$t('page.calendar.room_left')}
                                  <span data-title="${self.$t('page.calendar.room_left_content')}">
                                      <i class="el-icon-warning-outline"></i>
                                  </span>
                              </div>

                              <select ${resource.instantLock.status === 0 ? 'disabled' : ''} style="width: 3.5em;" name="custom-select-nroom" data-id="${resource.id}" data-fs="${resource.applyFlashSale}" data-value="${resource.instantLock.numberOfRoomLeft}" class="custom-select-nroom el-input__inner" id="select-${resource.id}">
                                  <option ${resource.instantLock.numberOfRoomLeft === 0 ? 'selected' : ''} value="0">0</option>
                                  <option ${resource.instantLock.numberOfRoomLeft === 1 ? 'selected' : ''} value="1">1</option>
                                  <option ${resource.instantLock.numberOfRoomLeft === 2 ? 'selected' : ''} value="2">2</option>
                                  <option ${resource.instantLock.numberOfRoomLeft === 3 ? 'selected' : ''} value="3">3</option>
                                  <option ${resource.instantLock.numberOfRoomLeft === 4 ? 'selected' : ''} value="4">4</option>
                                  <option ${resource.instantLock.numberOfRoomLeft === 5 ? 'selected' : ''} value="5">5</option>
                                  <option ${resource.instantLock.numberOfRoomLeft === 6 ? 'selected' : ''} value="6">6</option>
                                  <option ${resource.instantLock.numberOfRoomLeft === 7 ? 'selected' : ''} value="7">7</option>
                                  <option ${resource.instantLock.numberOfRoomLeft === 8 ? 'selected' : ''} value="8">8</option>
                                  <option ${resource.instantLock.numberOfRoomLeft === 9 ? 'selected' : ''} value="9">9</option>
                                  <option ${resource.instantLock.numberOfRoomLeft === 10 ? 'selected' : ''} value="10">10</option>
                                  <option ${resource.instantLock.numberOfRoomLeft === 11 ? 'selected' : ''} value="11">11</option>
                                  <option ${resource.instantLock.numberOfRoomLeft === 12 ? 'selected' : ''} value="12">12</option>
                                  <option ${resource.instantLock.numberOfRoomLeft === 13 ? 'selected' : ''} value="13">13</option>
                                  <option ${resource.instantLock.numberOfRoomLeft === 14 ? 'selected' : ''} value="14">14</option>
                                  <option ${resource.instantLock.numberOfRoomLeft === 15 ? 'selected' : ''} value="15">15</option>
                                  <option ${resource.instantLock.numberOfRoomLeft === 16 ? 'selected' : ''} value="16">16</option>
                                  <option ${resource.instantLock.numberOfRoomLeft === 17 ? 'selected' : ''} value="17">17</option>
                                  <option ${resource.instantLock.numberOfRoomLeft === 18 ? 'selected' : ''} value="18">18</option>
                                  <option ${resource.instantLock.numberOfRoomLeft === 19 ? 'selected' : ''} value="19">19</option>
                                  <option ${resource.instantLock.numberOfRoomLeft === 20 ? 'selected' : ''} value="20">20</option>
                              </select>
                          </div> 
                      </div>
                  </div>`
            : `<div class="${parent ? 'md-shift-resource' : ''}">
                      <div class="slice-tooltip">
                          <p data-title="${resource.name}">${resource.name}</p>
                      </div>
                  </div>`
        },
        renderScheduleEvent: function (data) {
          var ev = data.original
          return `<div class="md-timeline-template-event ${self.isHideen(ev)}"
                  style="border-color:
                  ${ev.type === 3 ? '#f45c39' : ev.type === 2 ? 'rgb(48, 148, 247)' : '#ffd249'};
                  background: ${ev.type === 3 ? 'rgb(255 235 240);' : ev.type === 2 ? 'rgb(224 243 255)' : 'rgb(255 250 220);'};
                  color: ${ev.type === 3 ? '#f45c39' : ev.type === 2 ? 'rgb(48, 148, 247)' : '#E6A23C'};
                  ">
                      <div class="md-timeline-template-event-cont mbsc-schedule-event-inner">
                          <span class="mbsc-icon mbsc-font-icon">
                              ${ev.type === 3
                                  ? '<img src="https://staging-ha.go2joy.vn/img/flash-sale.5d7f4261.svg" alt="clock" class="icon-tick">'
                                  : ev.type === 2
                                  ? '<i class="el-icon-top" style="font-weight: bold"></i>'
                                  : '<i class="el-icon-bottom" style="font-weight: bold"></i>'
                              }
                          </span>
                          <span class="md-timeline-template-time">${self.getLocalize === 'vi' ? ev.title : ev.titleEn}</span>
                      </div>
                  </div>`
        },
        onEventClick: function (event) {
          if (event.event.type === 1) {
            self.$refs.directDiscountModal.open(event.event.resource)
          } else if (event.event.type === 2) {
            self.$refs.extraFeeModal.open(event.event.resource)
          } else {
            self.$refs.flashSaleModal.open(event.event.resource)
          }
        }
      })
    },
    preDate () {
      this.dateValue = new Date(new Date(this.dateValue).setDate(this.dateValue.getDate() - 1))
      this.changeDate()
    },
    nextDate () {
      this.dateValue = new Date(new Date(this.dateValue).setDate(this.dateValue.getDate() + 1))
      this.changeDate()
    },
    changeDate () {
      this.calendar.setOptions({
        selectedDate: new Date(this.dateValue)
      })
    },
    changeConfigTimeLine () {
      switch (this.timeValue) {
        case 'month':
          this.timelineConfig = {
            type: 'month',
            size: 1
            // rowHeight: 'equal'
          }
          this.renderTimeLine()
          break
        case 'month-2':
          this.timelineConfig = {
            type: 'month',
            size: 2
            // rowHeight: 'equal'
          }

          this.renderTimeLine()
          break
        case 'month-3':
          this.timelineConfig = {
            type: 'month',
            size: 3
            // rowHeight: 'equal'
          }

          this.renderTimeLine()
          break
        case 'day':
          this.timelineConfig = {
            type: 'day',
            startDay: 1,
            endDay: 5
            // rowHeight: 'equal'
          }
          this.renderTimeLine()
          break
        case 'day-3':
          this.timelineConfig = {
            type: 'day',
            size: 3,
            // rowHeight: 'equal',
            timeCellStep: 240,
            timeLabelStep: 240
          }
          this.renderTimeLine()
          break
      }
    },
    handleInstantLock () {
      const self = this
      document.addEventListener('click', function (e) {
        if (e.target.classList[0] === 'custom-setting') {
          self.mySetting(e)
        } else if (e.target.classList[0] === 'custom-checkbox') {
          self.myCheckbox(e)
        } else if (e.target.classList[0] === 'custom-select-nroom') {
          self.mySelectNumRoom(e)
        }
      })
    },
    mySetting (e) {
      this.$refs.settingModal.open(e.target?.dataset?.sn)
    },
    openChildModal (roomId, type) {
      switch (type) {
        case 'extra_fee':
          this.$refs.extraFeeModal.open(roomId)
          break
        case 'direct_discount':
          this.$refs.directDiscountModal.open(roomId)
          break
        case 'flash_sale':
          // this.$refs.flashSaleModal.open(roomId);
          this.$refs.flashSaleModal.open(11432)
          // await this.checkOpenFlashSale();
          break
      }
    }
  }
}
</script>
