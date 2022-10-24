<template>
  <sa-section>
    <template slot="header" class="mar-tb-12">
      <el-button
        type="warning"
        plain
        @click="onOpenExportModal"
      >
        <img
          src="@/assets/images/svg/fs-report.svg"
          style="width: 20pxheight: 20px"
          alt="clock"
          class="icon-tick"
        />
        {{ $t("page.calendar.fs_report") }}
      </el-button>
      <el-button
        type="warning"
        plain
        @click="$router.push({path: 'setting-fs'})"
      >
        <img
          src="@/assets/images/svg/fs-setting.svg"
          style="width: 20pxheight: 20px"
          alt="clock"
          class="icon-tick"
        />
        {{ $t("page.calendar.fs_setting") }}
      </el-button>
      <el-button
        type="warning"
        plain
        @click="$router.push({
          name: 'createRoomType',
          query: {
            sn: sn
          }
        })"
      >
        <img
          src="@/assets/images/svg/add.svg"
          style="width: 20pxheight: 20px"
          alt="clock"
          class="icon-tick"
        />
        {{ $t("page.calendar.add") }}
      </el-button>
    </template>
    <div>
      <div class="float-left">
        <el-select
          v-model="sn"
          remote
          clearable
          filterable
          style="min-width: 250px; margin-right: 12px"
          prefix-icon="el-icon-search"
          element-loading-spinner="el-icon-loading"
          :placeholder="$t('page.collection.hotelSuggestion')"
          :loading="isLoadingHotel"
          :remote-method="reloadFilterData"
          @change="onSearch"
        >
          <el-option
            v-for="(item, index) in selectKeyword"
            :key="index"
            :label="`${item.name} - ${item.address}`"
            :value="item.sn"
            style="font-size: 13px; color: #4a5d6e;"
          />
        </el-select>
      </div>
      <div class="float-right">
        <label class="custom-button" style="margin: 10px">
          <div class="custom-icon flash-sale-icon">
            <img
              src="@/assets/images/svg/flash-sale.svg"
              alt="clock"
              class="icon-tick"
            />
          </div>
          {{ $t("page.calendar.flash_sale") }}
        </label>
        <label class="custom-button" style="margin: 10px">
          <div class="custom-icon extra-fee-icon">
            <img
              src="@/assets/images/svg/extra-fee.svg"
              alt="clock"
              class="icon-tick"
            />
          </div>
          {{ $t("page.calendar.extra_fee") }}
        </label>
        <label class="custom-button" style="margin: 10px">
          <div class="custom-icon direct-discount-icon">
            <img
              src="@/assets/images/svg/direct-discount.svg"
              alt="clock"
              Only
              apply
              Useclass="icon-tick"
            />
          </div>
          {{ $t("page.calendar.direct_discount") }}
        </label>
      </div>
    </div>
    <div class="clearfix"></div>
    <div v-loading="isLoading">
      <full-calendar
        :options="calendarConfig"
        ref="fullCalendar"
        :key="counter"
      />
      <el-pagination
        @size-change="changePageSize"
        @current-change="changeCurrentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        :current-page="paginationCurrentPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalItems"
      />
    </div>
    <flash-sale-export-modal
      :id="`flashSaleExport-${roomId}`"
      ref="flashSaleExportModal"
    />
    <room-setting-modal
      :id="`roomSetting-${roomId}`"
      :origin="origin"
      class="hide-out-click"
      ref="roomSettingModal"
      @switchClick="handleSwitchClick"
      @openChildModal="handleChildClick"
    />
    <confirm-modal
      :id="`confirmModal-${hotelId}`"
      ref="confirmModal"
      @reloadRoom="reloadRoom"
    />
    <extra-fee-modal
      :id="`extraFee-${roomId}`"
      ref="extraFeeModal"
      @reloadRoom="reloadRoom"
    />
    <direct-discount-modal
      :id="`directDiscount-${roomId}`"
      ref="directDiscountModal"
      @reloadRoom="reloadRoom"
    />
  </sa-section>
</template>

<script>
import { listRoomType, getRoomType, onCancelFlashSale, onBlockRoomType, onDeleteRoomType } from './api'
import { fetchSuggestionsHotels } from '@/api/hotels'
import saSection from '@/components/globals/SaSection.vue'

import { debounce } from '@/utils/helpers'

/** FullCalendar library **/
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import resourceDayGridPlugin from '@fullcalendar/resource-daygrid'

/** Modal for Room Setting **/
import ConfirmModal from './component/confirm-modal'
import RoomSettingModal from './component/room-setting-modal'
import FlashSaleExportModal from './component/flash-sale-export-modal'
import ExtraFeeModal from './component/extra-fee-modal'
import DirectDiscountModal from './component/direct-discount-modal'
const timeDebounce = 500
export default {
  name: 'HotelRoomType',
  components: {
    FullCalendar,
    ConfirmModal,
    RoomSettingModal,
    FlashSaleExportModal,
    ExtraFeeModal,
    DirectDiscountModal,
    saSection
  },
  data () {
    return {
      sn: this.$route.query.sn ? Number(this.$route.query.sn) : '',
      counter: 0,
      resources: [],
      events: [],
      data: [],
      selectHotel: [],
      rowHeight: 180,
      roomId: 0,
      hotelId: 0,
      args: {},
      selectKeyword: [],
      keyword: '',
      soldOutCheck: false,
      totalItems: 0,
      pageSizes: [10, 15, 20],
      pageSize: 10,
      isLoading: false,
      isLoadingHotel: false,
      currentPage: 1,
      paginationCurrentPage: 1,
      fullCalendar: {
        slotLabelFormat: [
          { day: '2-digit', weekday: 'short' },
          {
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: false,
            meridiem: 'short'
          }
        ]
      },
      origin: 0
    }
  },
  watch: {},
  created () {
    this.listBookingSchedule(10, 1, this.sn)
    this.sn && this.listHotel()
  },
  updated () {
    this.setLockRoom()
  },
  computed: {
    calendarConfig () {
      return {
        ...this.calendarOptions,
        ...this.eventHandlers
      }
    },
    eventHandlers () {
      return {
        eventClick: this.handleEventClick,
        resourceLabelDidMount: this.resourceLabelDidMount,
        eventDidMount: this.eventDidMount,
        windowResize: this.windowResize
        // select:                 this.handleDateSelect,
        // eventsSet:             this.handleEvents,
        // resourceChange:        this.handleResources,
      }
    },
    calendarOptions () {
      return {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          resourceTimelinePlugin,
          resourceTimeGridPlugin,
          resourceDayGridPlugin
        ],
        headerToolbar: {
          left: 'timeGridToday,timeGridThreeDay',
          center: 'prev,title,next',
          right:
            'resourceTimeline1Month,resourceTimeline2Month,resourceTimeline3Month'
        },
        views: {
          resourceTimeline1Month: {
            type: 'resourceTimelineMonth',
            duration: { months: 1 },
            slotLabelFormat: [
              { month: 'long' }, // top level of text
              { day: '2-digit', weekday: 'short' } // lower level of text
            ],
            buttonText: `${this.$t('page.calendar.one_month')}`
          },
          resourceTimeline2Month: {
            type: 'resourceTimelineMonth',
            duration: { months: 2 },
            slotLabelFormat: [
              { month: 'long' }, // top level of text
              { day: '2-digit', weekday: 'short' } // lower level of text
            ],
            buttonText: `${this.$t('page.calendar.two_months')}`
          },
          resourceTimeline3Month: {
            type: 'resourceTimelineMonth',
            duration: { months: 3 },
            slotLabelFormat: [
              { month: 'long' }, // top level of text
              { day: '2-digit', weekday: 'short' } // lower level of text
            ],
            buttonText: `${this.$t(
              'page.calendar.three_months'
            )}`
          },
          timeGridToday: {
            type: 'resourceTimeline',
            duration: { days: 1 },
            slotLabelFormat: this.fullCalendar.slotLabelFormat,
            buttonText: `${this.$t('page.calendar.day')}`
          },
          timeGridThreeDay: {
            type: 'resourceTimeline',
            duration: { days: 3 },
            buttonText: `${this.$t('page.calendar.three_days')}`,
            slotLabelFormat: this.fullCalendar.slotLabelFormat
          }
        },
        initialView: 'timeGridToday',
        resourceAreaColumns: [
          {
            group: true,
            field: 'hotelSn',
            cellClassNames: 'hotel-name',
            headerContent: `${this.$t(
              'page.calendar.hotel_name'
            )}`
          },
          {
            field: 'sn',
            cellClassNames: 'room-name',
            headerContent: `${this.$t(
              'page.calendar.room_type'
            )}`
          },
          {
            field: 'sn',
            cellClassNames: 'room-price',
            headerContent: `${this.$t(
              'page.calendar.room_price'
            )}`
          }
        ],
        omitZeroMinute: `${this.$t('omitZeroMinute')}`,
        locale: `${this.$t('lang')}`,
        aspectRatio: 2.5,
        resourceAreaWidth: window.innerWidth > 812 ? 530 : 300,
        editable: false,
        selectable: true,
        selectMirror: true,
        eventOrder: 'color',
        dayMaxEvents: true,
        weekends: true,
        nowIndicator: true,
        selectOverlap: false,
        eventOverlap: false,
        expandRows: true,
        events: this.events,
        resources: this.resources
      }
    }
  },
  methods: {
    windowResize () {
      this.forceRerender()
    },

    onOpenExportModal () {
      this.$refs.flashSaleExportModal.open()
    },

    async listBookingSchedule (limit = 10, currentPage = 1, sn) {
      this.isLoading = true
      try {
        const params = {
          limit: limit,
          page: currentPage
        }
        if (sn) {
          params.hotelSn = sn
        }
        const { data } = await listRoomType(params)
        this.data = data.data.hotels
        this.totalItems = data.data.meta.total
        await this.addLeftContentBookingSchedule(this.data)
        this.counter += 1
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    },

    async getRoomBooking (id) {
      this.isLoading = true
      this.$refs.roomSettingModal.closeRoomSettingModal()
      try {
        const { data } = await getRoomType(id)
        this.reRenderCalendarResources(data.data)
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    },

    async listHotel (keyword = '') {
      this.isLoadingHotel = true
      try {
        const params = {
          limit: 10
        }
        if (this.sn !== ' ' && !keyword) {
          params.hotelSn = this.sn
          params.justHotel = 1
        } else if (keyword) {
          params.keyword = keyword
          params.justHotel = 1
        }
        const { data } = await fetchSuggestionsHotels(params)
        this.selectKeyword = []
        if (data.data.hotels && data.data.hotels.length > 0) {
          this.selectKeyword = data.data.hotels
        }
      } catch (error) {
        return false
      } finally {
        this.isLoadingHotel = false
      }
    },

    reloadFilterData: debounce(function (keySearch) {
      this.listHotel(keySearch)
    }, timeDebounce),

    async onSearch () {
      await this.listBookingSchedule(this.pageSize, 1, this.sn)
    },

    changeCurrentPage  (page) {
      this.listBookingSchedule(this.pageSize, page, this.sn)
    },

    changePageSize  (limit) {
      this.pageSize = limit
      this.currentPage = this.paginationCurrentPage = 1
      this.listBookingSchedule(limit, this.currentPage, this.sn)
    },

    handleEventClick (args) {
      switch (args.event.textColor) {
        case 'extra-fee':
          this.$refs.extraFeeModal.open(args.event.extendedProps.roomSn)
          break
        case 'direct-discount':
          this.$refs.directDiscountModal.open(args.event.extendedProps.roomSn)
          break
      }
    },

    handleChildClick  (roomId, e) {
      switch (e) {
        case 'extra_fee':
          this.$refs.extraFeeModal.open(roomId)
          break
        case 'direct_discount':
          this.$refs.directDiscountModal.open(roomId)
          break
        case 'edit':
          this.$router.push({
            name: 'editRoomType',
            params: {
              sn: roomId
            },
            query: {
              hotelSn: this.sn
            }
          })
          break
        case 'view':
          this.$router.push({
            name: 'detailRoomType',
            params: {
              sn: roomId,
              hotelSn: this.sn
            },
            query: {
              hotelSn: this.sn
            }
          })
          break
        case 'delete':
          this.deleteRoomType(roomId)
          break
      }
    },

    deleteRoomType (id) {
      this.$confirm(
        this.$t('message.messageAlert'),
        this.$t('message.messageWarning'),
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
        .then(async () => {
          try {
            await onDeleteRoomType(id)
            await this.listBookingSchedule(this.pageSize, this.currentPage, this.sn)
            this.$message({
              type: 'success',
              message: this.$t('message.deleteSuccess')
            })
          } catch (error) {
            return false
          }
        })
        .catch(error => {
          this.$message({
            type: 'info',
            message: error
          })
        })
    },

    async handleSwitchClick (arg) {
      if (arg.applyFlashSale === 1) {
        this.$confirm(
          this.$t('page.calendar.contentFlashSale'),
          this.$t('page.calendar.headerFlashSale'),
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(async () => {
          await this.cancelFlashSale(arg)
        }).catch(error => {
          this.$message({
            type: 'info',
            message: error
          })
        })
      } else {
        this.onBlockRoomType(arg)
      }
    },

    async cancelFlashSale (arg) {
      try {
        const { data } = await onCancelFlashSale(arg.sn)
        if (data) {
          await this.soldOut(arg)
        }
      } catch (error) {
        return false
      }
    },

    async onBlockRoomType (arg) {
      try {
        const { data } = await onBlockRoomType(arg.sn)
        if (data) {
          this.getRoomBooking(arg.sn)
          this.$message({
            type: 'success',
            message: this.$t('message.success')
          })
        }
      } catch (error) {
        return false
      }
    },

    handleOpenRoomSettingModal (args) {
      this.$refs.roomSettingModal.openRoomSettingModal(args)
    },

    async forceRerender () {
      await this.listBookingSchedule(10, 1, this.sn)
      setTimeout(() => (this.counter += 1), 500)
    },

    addLeftContentBookingSchedule (newValue) {
      const hotelsList = newValue
      this.resources = []
      this.events = []
      let sortOrder = 0 // sort hotel and room like data return
      hotelsList.forEach(hotel => {
        hotel.roomTypeList.forEach(room => {
          room.numNotConfirmed = hotel.numNotConfirmed
          room.id = sortOrder += 1
          this.resources.push(room)
          if (room.directDiscountList && room.directDiscountList.length > 0) {
            room.directDiscountList.forEach(discount => {
              // format time
              const startTimeHourly = this.formatTimeForCalendar(discount.startTimeHourly)
              const endTimeHourly = this.formatTimeForCalendar(discount.endTimeHourly)
              const startTimeOvernight = this.formatTimeForCalendar(discount.startTimeOvernight)
              const endTimeOvernight = this.formatTimeForCalendar(discount.endTimeOvernight)
              const startTimeDaily = this.formatTimeForCalendar(discount.startTimeDaily)
              const endTimeDaily = this.formatTimeForCalendar(discount.endTimeDaily)
              // push event
              if (discount.priceFirstHours < room.firstHoursOrigin) {
                if (discount.specialDate && discount.specialDate.length > 0) {
                  discount.specialDate.forEach((val, index) => {
                    const hourly = {}
                    hourly.roomSn = room.sn
                    hourly.id = discount.sn
                    hourly.title =
                      'Theo giờ: ' +
                      discount.firstHours +
                      'h - ' +
                      this.formatMoney(discount.priceFirstHours)
                    hourly.start =
                      discount.specialDate[index] +
                      'T' +
                      startTimeHourly +
                      ':00+07:00'
                    hourly.end =
                      discount.specialDate[index] + 'T' + '24:00' + ':00+07:00'
                    hourly.allDay = false
                    hourly.editable = false
                    hourly.resourceId = hourly.groupId = room.id
                    hourly.textColor = 'direct-discount'
                    this.events.push(hourly)
                  })
                } else {
                  discount.displayCalendar.length > 0 &&
                    discount.displayCalendar.forEach((val, index) => {
                      const hourly = {}
                      hourly.roomSn = room.sn
                      hourly.id = discount.sn
                      hourly.title =
                        'Theo giờ: ' +
                        discount.firstHours +
                        'h - ' +
                        this.formatMoney(discount.priceFirstHours)
                      hourly.start =
                        val.startDate + 'T' + startTimeHourly + ':00+07:00'
                      hourly.end =
                        val.endDate + 'T' + endTimeHourly + ':00+07:00'
                      hourly.allDay = false
                      hourly.editable = false
                      hourly.resourceId = hourly.groupId = room.id
                      hourly.textColor = 'direct-discount'
                      this.events.push(hourly)
                    })
                }
              }
              if (discount.priceAdditionalHours < room.additionalOrigin) {
                if (discount.specialDate && discount.specialDate.length > 0) {
                  discount.specialDate.forEach((val, index) => {
                    const additionalHours = {}
                    additionalHours.roomSn = room.sn
                    additionalHours.id = discount.sn
                    additionalHours.title =
                      'Giờ thêm: ' +
                      discount.additionalHours +
                      'h - ' +
                      this.formatMoney(discount.priceAdditionalHours)
                    additionalHours.start =
                      discount.specialDate[index] +
                      'T' +
                      startTimeHourly +
                      ':00+07:00'
                    additionalHours.end =
                      discount.specialDate[index] + 'T' + '24:00' + ':00+07:00'
                    additionalHours.allDay = false
                    additionalHours.editable = false
                    additionalHours.resourceId = additionalHours.groupId =
                      room.id
                    additionalHours.textColor = 'direct-discount'
                    this.events.push(additionalHours)
                  })
                } else {
                  discount.displayCalendar.length > 0 &&
                    discount.displayCalendar.forEach((val, index) => {
                      const additionalHours = {}
                      additionalHours.roomSn = room.sn
                      additionalHours.id = discount.sn
                      additionalHours.title =
                        'Giờ thêm: ' +
                        discount.additionalHours +
                        'h - ' +
                        this.formatMoney(discount.priceAdditionalHours)
                      additionalHours.start =
                        val.startDate + 'T' + startTimeHourly + ':00+07:00'
                      additionalHours.end =
                        val.endDate + 'T' + endTimeHourly + ':00+07:00'
                      additionalHours.allDay = false
                      additionalHours.editable = false
                      additionalHours.resourceId = additionalHours.groupId =
                        room.id
                      additionalHours.textColor = 'direct-discount'
                      this.events.push(additionalHours)
                    })
                }
              }
              if (discount.priceOvernight < room.overnightOrigin) {
                if (discount.specialDate && discount.specialDate.length > 0) {
                  discount.specialDate.forEach((val, index) => {
                    const endDate =
                      endTimeDaily < startTimeDaily
                        ? this.getAfterBeforeDate(
                          discount.specialDate[index],
                          false,
                          true
                        )
                        : discount.specialDate[index]
                    const overnight = {}
                    overnight.roomSn = room.sn
                    overnight.id = discount.sn
                    overnight.title =
                      'Qua đêm: ' + this.formatMoney(discount.priceOvernight)
                    overnight.start =
                      discount.specialDate[index] +
                      'T' +
                      startTimeOvernight +
                      ':00+07:00'
                    overnight.end = endDate + 'T' + '24:00' + ':00+07:00'
                    overnight.allDay = false
                    overnight.editable = false
                    overnight.resourceId = overnight.groupId = room.id
                    overnight.textColor = 'direct-discount'
                    this.events.push(overnight)
                  })
                } else {
                  (discount.displayCalendar && discount.displayCalendar.length > 0) &&
                    discount.displayCalendar.forEach((val, index) => {
                      const endDate =
                        endTimeDaily < startTimeDaily
                          ? this.getAfterBeforeDate(val.endDate, false, true)
                          : val.endDate
                      const overnight = {}
                      overnight.roomSn = room.sn
                      overnight.id = discount.sn
                      overnight.title =
                        'Qua đêm: ' + this.formatMoney(discount.priceOvernight)
                      overnight.start =
                        val.startDate + 'T' + startTimeOvernight + ':00+07:00'
                      overnight.end = endDate + 'T' + endTimeOvernight + ':00+07:00'
                      overnight.allDay = false
                      overnight.editable = false
                      overnight.resourceId = overnight.groupId = room.id
                      overnight.textColor = 'direct-discount'
                      this.events.push(overnight)
                    })
                }
              }
              if (discount.priceOneDay < room.oneDayOrigin) {
                if (discount.specialDate && discount.specialDate.length > 0) {
                  discount.specialDate.forEach((val, index) => {
                    const endDate =
                      endTimeDaily < startTimeDaily
                        ? this.getAfterBeforeDate(
                          discount.specialDate[index],
                          false,
                          true
                        )
                        : discount.specialDate[index]
                    const daily = {}
                    daily.roomSn = room.sn
                    daily.id = discount.sn
                    daily.title =
                      'Nhiều ngày: ' + this.formatMoney(discount.priceOneDay)
                    daily.start =
                      discount.specialDate[index] +
                      'T' +
                      startTimeDaily +
                      ':00+07:00'
                    daily.end = endDate + 'T' + '24:00' + ':00+07:00'
                    daily.allDay = false
                    daily.editable = false
                    daily.resourceId = daily.groupId = room.id
                    daily.textColor = 'direct-discount'
                    this.events.push(daily)
                  })
                } else {
                  discount.displayCalendar.length > 0 &&
                    discount.displayCalendar.forEach((val, index) => {
                      const endDate =
                        endTimeDaily < startTimeDaily
                          ? this.getAfterBeforeDate(val.endDate, false, true)
                          : val.endDate
                      const daily = {}
                      daily.roomSn = room.sn
                      daily.id = discount.sn
                      daily.title =
                        'Nhiều ngày: ' + this.formatMoney(discount.priceOneDay)
                      daily.start =
                        val.startDate + 'T' + startTimeDaily + ':00+07:00'
                      daily.end = endDate + 'T' + endTimeDaily + ':00+07:00'
                      daily.allDay = false
                      daily.editable = false
                      daily.resourceId = daily.groupId = room.id
                      daily.textColor = 'direct-discount'
                      this.events.push(daily)
                    })
                }
              }
            })
          }
          if (room.extraFeeList.length > 0) {
            room.extraFeeList.forEach(extraFee => {
              const startTimeHourly = this.formatTimeForCalendar(
                extraFee.startTimeHourly
              )
              const endTimeHourly = this.formatTimeForCalendar(
                extraFee.endTimeHourly
              )
              const startTimeOvernight = this.formatTimeForCalendar(
                extraFee.startTimeOvernight
              )
              const endTimeOvernight = this.formatTimeForCalendar(
                extraFee.endTimeOvernight
              )
              const startTimeDaily = this.formatTimeForCalendar(
                extraFee.startTimeDaily
              )
              const endTimeDaily = this.formatTimeForCalendar(
                extraFee.endTimeDaily
              )
              if (extraFee.priceFirstHours > room.firstHoursOrigin) {
                if (extraFee.specialDate && extraFee.specialDate.length > 0) {
                  extraFee.specialDate.forEach((val, index) => {
                    const hourly = {}
                    hourly.roomSn = room.sn
                    hourly.id = extraFee.sn
                    hourly.title =
                      'Theo giờ: ' +
                      extraFee.firstHours +
                      'h - ' +
                      this.formatMoney(extraFee.priceFirstHours)
                    hourly.start =
                      extraFee.specialDate[index] +
                      'T' +
                      startTimeHourly +
                      ':00+07:00'
                    hourly.end =
                      extraFee.specialDate[index] + 'T' + '24:00' + ':00+07:00'
                    hourly.allDay = false
                    hourly.editable = false
                    hourly.resourceId = hourly.groupId = room.id
                    hourly.textColor = 'extra-fee'
                    this.events.push(hourly)
                  })
                } else {
                  extraFee.displayCalendar.length > 0 &&
                    extraFee.displayCalendar.forEach((val, index) => {
                      const hourly = {}
                      hourly.roomSn = room.sn
                      hourly.id = extraFee.sn
                      hourly.title =
                        'Theo giờ: ' +
                        extraFee.additionalHours +
                        'h - ' +
                        this.formatMoney(extraFee.priceFirstHours)
                      hourly.start =
                        val.startDate + 'T' + startTimeHourly + ':00+07:00'
                      hourly.end =
                        val.endDate + 'T' + endTimeHourly + ':00+07:00'
                      hourly.allDay = false
                      hourly.editable = false
                      hourly.resourceId = hourly.groupId = room.id
                      hourly.textColor = 'extra-fee'
                      this.events.push(hourly)
                    })
                }
              }
              if (extraFee.priceAdditionalHours > room.additionalOrigin) {
                if (extraFee.specialDate && extraFee.specialDate.length > 0) {
                  extraFee.specialDate.forEach((val, index) => {
                    const additionalHours = {}
                    additionalHours.roomSn = room.sn
                    additionalHours.id = extraFee.sn
                    additionalHours.title =
                      'Giờ thêm: ' +
                      extraFee.additionalHours +
                      'h - ' +
                      this.formatMoney(extraFee.priceAdditionalHours)
                    additionalHours.start =
                      extraFee.specialDate[index] +
                      'T' +
                      startTimeHourly +
                      ':00+07:00'
                    additionalHours.end =
                      extraFee.specialDate[index] + 'T' + '24:00' + ':00+07:00'
                    additionalHours.allDay = false
                    additionalHours.editable = false
                    additionalHours.resourceId = additionalHours.groupId =
                      room.id
                    additionalHours.textColor = 'extra-fee'
                    this.events.push(additionalHours)
                  })
                } else {
                  extraFee.displayCalendar.length > 0 &&
                    extraFee.displayCalendar.forEach((val, index) => {
                      const additionalHours = {}
                      additionalHours.roomSn = room.sn
                      additionalHours.id = extraFee.sn
                      additionalHours.title =
                        'Giờ thêm: ' +
                        extraFee.additionalHours +
                        'h - ' +
                        this.formatMoney(extraFee.priceAdditionalHours)
                      additionalHours.start =
                        val.startDate + 'T' + startTimeHourly + ':00+07:00'
                      additionalHours.end =
                        val.endDate + 'T' + endTimeHourly + ':00+07:00'
                      additionalHours.allDay = false
                      additionalHours.editable = false
                      additionalHours.resourceId = additionalHours.groupId =
                        room.id
                      additionalHours.textColor = 'extra-fee'
                      this.events.push(additionalHours)
                    })
                }
              }
              if (extraFee.priceOvernight > room.overnightOrigin) {
                if (extraFee.specialDate && extraFee.specialDate.length > 0) {
                  extraFee.specialDate.forEach((val, index) => {
                    const endDate =
                      endTimeDaily < startTimeDaily
                        ? this.getAfterBeforeDate(
                          extraFee.specialDate[index],
                          false,
                          true
                        )
                        : extraFee.specialDate[index]
                    const overnight = {}
                    overnight.roomSn = room.sn
                    overnight.id = extraFee.sn
                    overnight.title =
                      'Qua đêm: ' + this.formatMoney(extraFee.priceOvernight)
                    overnight.start =
                      extraFee.specialDate[index] +
                      'T' +
                      startTimeOvernight +
                      ':00+07:00'
                    overnight.end = endDate + 'T' + '24:00' + ':00+07:00'
                    overnight.allDay = false
                    overnight.editable = false
                    overnight.resourceId = overnight.groupId = room.id
                    overnight.textColor = 'extra-fee'
                    this.events.push(overnight)
                  })
                } else {
                  extraFee.displayCalendar.length > 0 &&
                    extraFee.displayCalendar.forEach((val, index) => {
                      const endDate =
                        endTimeDaily < startTimeDaily
                          ? this.getAfterBeforeDate(val.endDate, false, true)
                          : val.endDate
                      const overnight = {}
                      overnight.roomSn = room.sn
                      overnight.id = extraFee.sn
                      overnight.title =
                        'Qua đêm: ' + this.formatMoney(extraFee.priceOvernight)
                      overnight.start =
                        val.startDate + 'T' + startTimeOvernight + ':00+07:00'
                      overnight.end =
                        endDate + 'T' + endTimeOvernight + ':00+07:00'
                      overnight.allDay = false
                      overnight.editable = false
                      overnight.resourceId = overnight.groupId = room.id
                      overnight.textColor = 'extra-fee'
                      this.events.push(overnight)
                    })
                }
              }
              if (extraFee.priceOneDay > room.oneDayOrigin) {
                if (extraFee.specialDate && extraFee.specialDate.length > 0) {
                  extraFee.specialDate.forEach((val, index) => {
                    const endDate =
                      endTimeDaily < startTimeDaily
                        ? this.getAfterBeforeDate(
                          extraFee.specialDate[index],
                          false,
                          true
                        )
                        : extraFee.specialDate[index]
                    const daily = {}
                    daily.roomSn = room.sn
                    daily.id = extraFee.sn
                    daily.title =
                      'Nhiều ngày: ' + this.formatMoney(extraFee.priceOneDay)
                    daily.start =
                      extraFee.specialDate[index] +
                      'T' +
                      startTimeDaily +
                      ':00+07:00'
                    daily.end = endDate + 'T' + '24:00' + ':00+07:00'
                    daily.allDay = false
                    daily.editable = false
                    daily.resourceId = daily.groupId = room.id
                    daily.textColor = 'extra-fee'
                    this.events.push(daily)
                  })
                } else {
                  extraFee.displayCalendar.length > 0 &&
                    extraFee.displayCalendar.forEach((val, index) => {
                      const endDate =
                        endTimeDaily < startTimeDaily
                          ? this.getAfterBeforeDate(val.endDate, false, true)
                          : val.endDate
                      const daily = {}
                      daily.roomSn = room.sn
                      daily.id = extraFee.sn
                      daily.title =
                        'Nhiều ngày: ' + this.formatMoney(extraFee.priceOneDay)
                      daily.start =
                        val.startDate + 'T' + startTimeDaily + ':00+07:00'
                      daily.end = endDate + 'T' + endTimeDaily + ':00+07:00'
                      daily.allDay = false
                      daily.editable = false
                      daily.resourceId = daily.groupId = room.id
                      daily.textColor = 'extra-fee'
                      this.events.push(daily)
                    })
                }
              }
            })
          }
          if (
            room.flashSale === 1 &&
            room.priceFlashSale < room.overnightOrigin
          ) {
            const flashSale = {}
            flashSale.title = `${room.bookCount}/${room.numOfRoom} - ${
              room.priceFlashSale ? this.formatMoney(room.priceFlashSale) : 0
            }`
            flashSale.start =
              this.formatDate(room.startDateFlashSale, false) +
              'T' +
              this.formatTimeByDate(room.startDateFlashSale) +
              ':00+07:00'
            flashSale.end =
              this.formatDate(room.startDateFlashSale, false) +
              'T24:00:00+07:00'
            flashSale.allDay = false
            flashSale.editable = false
            flashSale.resourceId = flashSale.groupId = room.id
            flashSale.textColor = 'flash-sale'
            this.events.push(flashSale)
          }
        })
      })
    },

    eventDidMount (arg) {
      this.setCalendarEvents(arg)
      // Format Calendar events after change calendar view
      const calendarBtn = [...this.$el.getElementsByClassName('fc-button')]
      calendarBtn.forEach(btn => {
        btn.addEventListener('click', () => {
          this.setCalendarEvents(arg)
        })
      })
    },

    resourceLabelDidMount (arg) {
      this.setCalendarRowHeight()
      this.setCalendarResources(arg)
      // Set Room Type Col clickable
      const resource = arg.resource
      const roomId = resource.extendedProps.sn
      arg.el.addEventListener('click', () => {
        // let id                = arg.el.getAttribute('data-resource-id')
        const status = arg.el.getAttribute('data-status')
        const allowExtrafee = arg.el.getAttribute('data-allow-extraFee')
        const hotelSn = arg.el.getAttribute('data-hotel-sn')
        const applyFlashSale = arg.el.getAttribute('data-hotel-apply-flash')
        this.roomId = roomId
        this.args = {
          sn: roomId,
          status: status,
          allowExtrafee: allowExtrafee,
          hotelSn: hotelSn,
          applyFlashSale: applyFlashSale
        }
        this.origin = resource.extendedProps.origin
        this.handleOpenRoomSettingModal(this.args)
      })
    },

    setCalendarEvents (arg) {
      switch (arg.event.textColor) {
        case 'extra-fee':
          arg.el.classList.add('extra-fee')
          arg.el.classList.add('extra-fee-background')
          break
        case 'direct-discount':
          arg.el.classList.add('direct-discount')
          arg.el.classList.add('direct-discount-background')
          break
        case 'flash-sale':
          arg.el.classList.add('flash-sale')
          arg.el.classList.add('flash-sale-background')
          break
      }
    },

    reRenderCalendarResources (arg) {
      const roomName = arg.name
      const roomId = arg.sn
      const allRooms = [...this.$el.getElementsByClassName('room-name')]
      allRooms.forEach((room, index) => {
        if (room.innerText.includes(roomId)) {
          room.setAttribute('data-status', arg.status)
          room.setAttribute('data-allow-extraFee', arg.allowExtraFee)
          room.setAttribute('data-hotel-sn', arg.hotelSn)
          room.setAttribute('data-hotel-apply-flash', arg.applyFlashSale)
          room.childNodes[0].childNodes[0].childNodes[1].innerHTML = `
            <div class="float-on-top">
                <div>
                    <p class="break-down-hotel-name-calendar">${roomName}</p>
                    ${
                      arg.bonusHour > 0
                        ? '<div alt="clock" class="icon-tick clock"></div>'
                        : arg.hasGift === 1
                        ? '<div alt="giftbox" class="icon-tick giftbox"></div>'
                        : ' '
                    }
                </div>
                <div class='lock-room ${
                  arg.notConfirmed > 0 ? 'wait-lock' : ' '
                }'>
                    ${
                      arg.lockWeenkend === true
                        ? '<p class="break-down-room-type-calendar"> <i class="el-icon-lock red-icon"></i>' +
                          arg.displayLockWeek +
                          '<p>'
                        : ''
                    }
                    ${
                      arg.lockSpecial === true
                        ? '<p class="break-down-room-type-calendar"> <i class="el-icon-lock red-icon"></i>' +
                          arg.displayLockSpecial +
                          '<p>'
                        : ''
                    }
                </div>
                ${
                  arg.status === 2
                    ? '<div class="lock-room">' +
                      '<p> <i class="el-icon-lock red-icon"></i>' +
                      this.$t(
                        'page.calendar.is_lock_room'
                      ) +
                      '<p>' +
                      '</div>'
                    : ' '
                }
                <div class='dropdown mt-2'>
                    <button class='btn btn-secondary dropdown-toggle font-size-sm btn-room-setting' type='button'>
                        Cài đặt phòng
                    </button>

                </div>
            </div>
            <div class='float-hide'>${roomId}</div>
          `
        }
      })
    },

    setCalendarResources (arg) {
      const resource = arg.resource
      const roomObject = resource.extendedProps
      const roomName = roomObject.name
      const roomStatus = roomObject.status
      const roomId = roomObject.sn
      const hotelName = roomObject.hotelName
      const hotelId = roomObject.hotelSn
      const numNotConfirmed = roomObject.numNotConfirmed
      const allRooms = [...this.$el.getElementsByClassName('room-name')]
      const allRoomsPrice = [...this.$el.getElementsByClassName('room-price')]
      const allHotel = [
        ...this.$el.getElementsByClassName(
          'fc-datagrid-cell-cushion fc-sticky'
        ),
        ...this.$el.getElementsByClassName('fc-datagrid-cell-main')
      ]
      // set content for room type
      allRooms.forEach((room, index) => {
        if (Number(room.innerText) === Number(roomId)) {
          room.setAttribute('data-status', roomStatus)
          room.setAttribute('data-allow-extraFee', roomObject.allowExtraFee)
          room.setAttribute('data-hotel-sn', hotelId)
          room.setAttribute(
            'data-hotel-apply-flash',
            roomObject.applyFlashSale
          )
          room.childNodes[0].childNodes[0].childNodes[1].innerHTML = `
            <div class='float-on-top'>
                <div>
                    <p class='break-down-hotel-name-calendar'>${roomName}</p>
                    ${
                      roomObject.bonusHour > 0
                        ? '<div alt="clock" class="icon-tick clock"></div>'
                        : roomObject.hasGift === 1
                        ? '<div alt="giftbox" class="icon-tick giftbox"></div>'
                        : ' '
                    }
                </div>
                <div class="lock-room ${
                  roomObject.notConfirmed > 0
                    ? 'wait-lock'
                    : ' '
                }">
                    ${
                      arg.resource.extendedProps.lockWeenkend ===
                      true
                        ? '<p class="break-down-room-type-calendar"> <i class="el-icon-lock red-icon"></i>' +
                          arg.resource.extendedProps
                            .displayLockWeek +
                          '<p>'
                        : ''
                    }
                    ${
                      arg.resource.extendedProps.lockSpecial ===
                      true
                        ? '<p class="break-down-room-type-calendar"> <i class="el-icon-lock red-icon"></i>' +
                          arg.resource.extendedProps
                            .displayLockSpecial +
                          '<p>'
                        : ''
                    }
                </div>
                ${
                  roomObject.status === 2
                    ? '<div class="lock-room">' +
                      '<p> <i class="el-icon-lock red-icon"></i>' +
                      this.$t(
                        'page.calendar.is_lock_room'
                      ) +
                      '<p>' +
                      '</div>'
                    : ' '
                }
                <div>
                    <button class="btn-room-setting" type="button">
                        Cài đặt phòng
                    </button>

                </div>
            </div>
            <div class="float-hide">${roomId}</div>
          `
        }
      })
      // set content for room price
      allRoomsPrice.forEach((roomPrice, index) => {
        if (Number(roomPrice.innerText) === Number(roomId)) {
          roomPrice.childNodes[0].childNodes[0].childNodes[0].innerHTML = `
            <div class="float-on-top">
                <div class="room-price-item">
                    <div class="light-text">${this.$t(
                      'hours'
                    )}:</div>
                    <div class="room-price-content">${
                      roomObject.firstHours
                    }h - ${this.formatMoney(
            roomObject.firstHoursOrigin
          )}</div>
            </div>
            <div class="room-price-item">
                <div class="light-text">${this.$t(
                  'additional'
                )}:</div>
                <div class="room-price-content">${
                  roomObject.additionalHours
                }h - ${this.formatMoney(
            roomObject.additionalOrigin
          )}</div>
              </div>
              <div class="room-price-item">
                  <div class="light-text">${this.$t(
                    'overnight'
                  )}:</div>
                  <div class="room-price-content">${this.formatMoney(
                    roomObject.overnightOrigin
                  )}</div>
              </div>
              <div class="room-price-item">
                  <div class="light-text">${this.$t(
                    'daily'
                  )}:</div>
                  <div class="room-price-content">${this.formatMoney(
                    roomObject.oneDayOrigin
                  )}</div>
              </div>
          </div>
          <div class="float-hide"></div>
        `
        }
      })
      // set content for hotel name
      allHotel.forEach((hotel, index) => {
        if (Number(hotel.innerText) === Number(hotelId)) {
          hotel.innerHTML = `
            <div class="float-on-top" data-resource-id="${
              roomObject.hotelSn
            }" >
                <p class="break-down-hotel-name-calendar">${hotelName}</p>
                ${
                  numNotConfirmed > 0
                    ? '<button class="popup-lock-room" data-id="' +
                      roomObject.hotelSn +
                      '" data-name=" ' +
                      roomObject.hotelName +
                      '"><i class="el-icon-message-solid"></i> <p class="popup-lock-room-content">' +
                      this.$t('page.calendar.popup') +
                      '</p></button>'
                    : ''
                }
            </div>
            <div class='float-hide'></div>
        `
        }
      })
    },

    reloadRoom () {
      this.forceRerender()
    },

    formatTimeForCalendar (time) {
      let formattedTime
      if (time.split(':')[0].length === 1) {
        formattedTime = '0' + time
      } else {
        formattedTime = time
      }
      return formattedTime
    },

    setCalendarRowHeight () {
      const allRooms = [
        ...this.$el.getElementsByClassName('fc-datagrid-cell fc-resource')
      ]
      const elementCalendarRows = [
        ...this.$el.getElementsByClassName('fc-timeline-lane fc-resource')
      ]

      allRooms.forEach(room => {
        room.height = this.rowHeight + 'px'
      })
      elementCalendarRows.forEach(room => {
        room.height = this.rowHeight + 'px'
      })
    },

    setLockRoom () {
      const lockRoomButton = Array.from(
        this.$el.querySelectorAll('.popup-lock-room')
      )
      lockRoomButton.forEach(btn => {
        btn.classList.add('active-button-lock-room')
        btn.addEventListener('click', () => {
          this.hotelId = btn.dataset.id
          this.$refs.confirmModal.open(btn.dataset.id, btn.dataset.name)
        })
      })
    }
  }
}
</script>

<style lang="scss">
.clearfix{
    margin: 10px 0;
    &::after {
        display: block;
        clear: both;
        content: "";
    }
}
/*
---------------------------------
    : Custom - Calender css :
---------------------------------
*/
.fc-toolbar {
    h2{
        margin: 0;
        font-size: 18px;
        color: #282828;
    }
    .fc-state-active {
        z-index: 4;
        background-color: #0080ff;
        border-color: #0080ff;
        color: #ffffff;
    }
    .ui-state-active {
        z-index: 4;
        background-color: #0080ff;
        border-color: #0080ff;
        color: #ffffff;
    }
    .fc-left {
        margin-bottom: 10px;
    }
    .fc-center {
        margin-bottom: 10px;
    }
    .fc-right {
        margin-bottom: 10px;
    }
}
.fc-button {
    background: #d4d8de;
    border: 1px solid darken(#d4d8de, 5%);
    color: #282828;
    outline: 0;
    box-shadow: none;
    text-transform: capitalize;
    height: auto !important;
    padding: 6px 15px !important;
}
 .fc-state-hover {
    background: darken(#d4d8de, 5%);
    border: 1px solid darken(#d4d8de, 5%);
}
.fc-state-default.fc-corner-left {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}
.fc-state-default.fc-corner-right {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
}
.fc-widget-header {
    background-color: lighten(#d4d8de, 5%);
    border: 1px solid darken(#d4d8de, 5%);
}
.fc th.fc-widget-header {
    padding: 12px 0;
    font-size: 14px;
    line-height: 20px;
    text-transform: uppercase;
}
.fc-unthemed {
    .fc-content {
        border-color: rgba(0,0,0,0.03);
    }
    .fc-divider {
        border-color: rgba(0,0,0,0.03);
    }
    .fc-popover {
        border-color: rgba(0,0,0,0.03);
    }
    .fc-row {
        border-color: rgba(0,0,0,0.03);
    }
    tbody {
        border-color: rgba(0,0,0,0.03);
    }
    td {
        border-color: rgba(0,0,0,0.03);
    }
    th {
        border-color: rgba(0,0,0,0.03);
    }
    thead {
        border-color: rgba(0,0,0,0.03);
    }
}
.fc-event {
    background-color: #0080ff;
    color: #ffffff !important;
    border: none;
    border-radius: 3px;
    text-align: center;
    font-size: 14px;
    margin: 5px 0;
    padding: 5px 5px;
    cursor: move;
}
/*
---------------------------------
    : Custom - room type Calender css :
---------------------------------
*/
/***** Modal *****/
.fc {
    font-size: 14px !important;
}
.fc-license-message {
    display: none;
}
.fc-button {
    background-color: #fef3e5 !important;
    color: #ff6400 !important;
    outline: none !important;
    border: none !important;
    &:hover {
        background-color: #ff6400 !important;
        color: #fff !important;
    }
}
.fc-button-active {
    background-color: #ff6400 !important;
    color: #fff !important;
}
.fc-toolbar-chunk {
    div {
        display: flex;
    }
}
.fc-prev-button {
    margin-right: 1.5rem !important;
    background-color: #fff !important;
    color: #111 !important;
    &:hover {
        background-color: #fff !important;
        color: #111 !important;
        transform: scale(1.5);
    }
}
.fc-next-button {
    margin-left: 1.5rem !important;
    background-color: #fff !important;
    color: #111 !important;
    &:hover {
        background-color: #fff !important;
        color: #111 !important;
        transform: scale(1.5);
    }
}
.fc-scroller {
    &:nth-child(1) {
        &::-webkit-scrollbar {
            -webkit-appearance: none !important;
            height: 8px;
            width: 8px;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            margin: 5px 0;
            background-color: rgba(0, 0, 0, .5);
            box-shadow: 0 0 1px rgba(255, 255, 255, .5);
            &:hover {
                width: 12px;
                background: #999999;
            }
        }
    }
}
.fc-timeline-slot-frame {
    border-bottom: 1px solid #ddd;
    color: #111;
    font-weight: bold;
}
.fc-datagrid-cell-frame {
    color: #111;
    font-weight: bold;
}
.fc-datagrid-cell.fc-resource {
    >.fc-datagrid-cell-frame {
        min-height: 100%;
    }
}
.font-size-sm {
    font-size: 10px;
}
.dropdown-priority {
    z-index: 9998;
}
.custom-dropdown {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.18) !important;
    border: 1px solid rgb(168, 168, 168);
    min-width: 5rem;
}
.dropdown-item {
    color: black !important;
}
.light-text {
    font-weight: 400;
}
.white-background {
    background: #fff !important;
    border: 1px solid #fff !important;
    border-radius: 100px !important;
}
.customs-edit-flash-sale {
    .el-time-spinner__item {
        &:after {
            content: ":00";
        }
    }
    .el-time-panel {
        width: 104px !important;
    }
}
.extra-fee-background {
    background: rgb(238, 250, 253) !important;
    border: 1px solid rgb(48, 148, 247) !important;
    border-radius: 100px !important;
}
.extra-fee {
    .fc-event-title {
        &:after {
            content: url('../../../../assets/images/svg/extra-fee.svg');
            margin: 0px 10px;
        }
    }
}
.direct-discount-background {
    background: #fffbef !important;
    border: 1px solid #ffd249 !important;
    border-radius: 100px !important;
}
.direct-discount {
    .fc-event-title {
        &:after {
            content: url('../../../../assets/images/svg/direct-discount.svg');
            margin: 0px 10px;
        }
    }
    .fc-event-title.fc-sticky {
        color: #ffd249 !important;
    }
}

.flash-sale-background {
    background: #fef0f0 !important;
    border: 1px solid #f45c39 !important;
    border-radius: 100px !important;
}
.flash-sale {
    .fc-event-title {
        &:after {
            content: url('../../../../assets/images/svg/flash-sale.svg');
            margin: 0px 10px;
        }
    }
    .fc-event-title.fc-sticky {
        color: #f45c39 !important;
    }
}
.fc-h-event {
    .fc-event-main {
        color: rgb(48, 148, 247) !important;
    }
}
.btn-room-setting {
    background: rgb(243, 243, 243);
    border: 1px solid rgb(203, 203, 203);
    color: #111;
    padding: 8px;
}
.fc-event {
    margin: 7px 0 !important;
}
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}
.hide {
    display: none !important;
}
.row-setting-modal {
    cursor: pointer;
    padding: 0.2rem;
    &:hover {
        background: rgb(204, 204, 204);
    }
}
.custom-width {
    width: 84% !important;
}
.custom-lable-header {
    text-align: center;
    font-size: large;
    color: #ff6400;
    font-weight: 500;
}
.flash-sale-icon {
    border: 1px solid #fef0f0;
    background-color: #fef0f0;
}
.extra-fee-icon {
    border: 1px solid #fffbef;
    background-color: rgb(238, 250, 253);
}
.direct-discount-icon {
    border: 1px solid #fffbef;
    background-color: #fffbef;
}
.fc-event-title-container {
    text-align: left;
    margin-left: 10px;
}
.fc-event-time {
    display: none;
}
.lock-room {
    font-size: 10px;
    background-color: #f9f9f9;
}
.lock-icon {
    color: red;
    float: left;
    margin-right: 10px;
}
.wait-lock {
    background-color: #fef6f6;
}
.break-down-room-type-calendar {
    width: 159px;
    white-space: break-spaces;
}
span.fc-datagrid-cell-main {
    position: relative;
    display: block,
}
.float-on-top {
    z-index: 1001;
    position: absolute;
    display: block;
    width: 100%;
    top: 0
}
.float-hide {
    display: inline-block;
    width: 100%;
    background-color: #fff;
    z-index: 1000;
    position: absolute;
    height: 169px;
    top: 0;
    left: 0;
    color: #fff;
}
.break-down-hotel-name-calendar {
    width: 100%;
    white-space: break-spaces;
    padding-right: 10px;
}
.hotel-name {
    .break-down-hotel-name-calendar {
      display: block;
      white-space: break-spaces;
      height: 100%;
    }
    .fc-datagrid-cell-main {
      white-space: break-spaces;
      height: 100%;
    }
}
.fc-datagrid-cell-cushion.fc-scrollgrid-sync-inner,
.fc-datagrid-cell-cushion{
    height: 100% !important;
}
a.fc-timeline-slot-cushion{
  color: black;
}
.custom-slider.fit-image {
    max-width: 300px;
    height: 150px;
    object-fit: scale-down;
    margin: auto !important;
}
.room-setting{
    padding: 8px;
    border: 1px solid rgb(203, 203, 203);
    border-radius: 3px;
    font-size: 10px;
    &:hover {
        background-color: #ff6400;
        border-color: #ff6400;
        color: #fff
    }
}
.room-price-item{
    display: flex;
    justify-content: space-between;
    .light-text {
        font-weight: 400;
    }
}

.custom-icon{
    width: 25px;
    border-radius: 16%;
    box-shadow: 0 0 black;
    height: 25px;
    display: inline-block;
    text-align: center;
    img{
        vertical-align: middle;
        border-style: none;
    }
}

.flash-sale-icon{
    border: 1px solid #fef0f0;
    background-color: #fef0f0;
}
.extra-fee-icon{
    border: 1px solid #fffbef;
    background-color: rgb(238, 250, 253);
}
.direct-discount-icon{
    border: 1px solid #fffbef;
    background-color: #fffbef;
}
.float-left{
    float: left;
}
.float-right{
    float: right;
}
.popup-lock-room-content {
    width: 140px;
    white-space: break-spaces;
}
.popup-lock-room{
    background-color: #fef2e6;
    border: 1px solid #d6381e;
    padding: 9px 0;
    margin: 8px 8px;
    border-radius: 5px;
}
.popup-lock-room i{
    color: red;
}
.red-icon{
  color: red;
}
.center,
.el-dialog__header{
  text-align: center;
}
.clock{
  &:after {
    background-image: url('../../../../assets/images/svg/clock.svg');
    background-size: 20px 20px;
    display: inline-block;
    width: 20px;
    height: 20px;
    content:"";
    background-repeat: no-repeat;
  }

}
.giftbox {
  &:after {
    background-image: url('../../../../assets/images/svg/gifts.svg');
    background-size: 20px 20px;
    display: inline-block;
    width: 20px;
    height: 20px;
    content:"";
    background-repeat: no-repeat;
  }
}
.mar-tb-12 {
  margin: 12px 0;
}
@media (min-width: 992px) {
    .modal-roomSetting {
        max-width: 13%;
    }
}
</style>
