<template>
  <sa-section class="booking-rp">
    <template slot="header">
      <div class="booking-rp__filter">
        <SaSelectCheck
          class="select-check"
          v-model="filter.hotelStatus"
          :indeterminate="checkBox.isIndeterminateStatus"
          :model-check-all="checkBox.checkAllStatus"
          :options="ui.statusOptions"
          @changeCheckAll="handleCheckAllStatus"
          @input="handleCheckedStatus"
          translate
        />
        <SaSelectCheck
          class="select-check"
          v-model="filter.provinceSn"
          :indeterminate="checkBox.isIndeterminateProvinces"
          :model-check-all="checkBox.checkAllProvinces"
          label="sn"
          keyValue="name"
          :options="provinces"
          @changeCheckAll="handleCheckAllProvinces"
          @input="handleCheckedProvince"
          :loadingButton="ui.provincesLoading"
        />
        <el-select
          v-model="filter.deviceType"
          @change="fetchBookingReports"
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
          v-model="hotelSelected"
          :loading="ui.hotelsLoading"
          :placeholder="$t('page.bookingReport.hotel_name')"
          remote
          filterable
          :remote-method="searchSuggestionsHotels"
          prefix-icon="el-icon-search"
          clearable
          value-key="sn"
        >
          <ElOption
            v-for="(item, index) in listSuggestionsHotels"
            :key="index"
            :label="`${item.name} - ${item.address}`"
            :value="item"
            style="font-size: 13px; color: #4a5d6e;"
          />
        </el-select>
        <el-select
          v-model="filter.type"
          @change="fetchBookingReports"
        >
          <el-option
            v-for="(item, index) in ui.timeTypeOptions"
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
        <el-button
          icon="el-icon-search"
          plain
          @click="$router.push({ name: 'searchByBookingNo', query: { type: 0 }})"
        >
          {{ $t('page.bookingReport.searchBooking') }}
        </el-button>
      </div>
    </template>
    <el-table
      v-loading="ui.bookingReportsLoading"
      :data="bookingReports"
      :cell-class-name="setCLassIndexColumn"
    >
      <el-table-column
        label="#"
        type="index"
        min-width="20"
        :index="setIndex"
      >
      </el-table-column>
      <el-table-column
        :label="$t('page.bookingReport.hotel_name')"
        min-width="140"
      >
        <template slot-scope="scope">
          <router-link
            v-if="!scope.row.total && scope.row.name && scope.row.hotelSn"
            :to="{ name: 'bookingReportHotels',
              query: {
                hotelSn: scope.row.hotelSn,
                deviceType: filter.deviceType,
                startDate: filter.startDate,
                endDate: filter.endDate,
                type: filter.type
              }
            }"
          >
            {{ scope.row.name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="code"
        :label="$t('page.bookingReport.code')"
        min-width="120"
      />
      <el-table-column
        min-width="70"
        :label="$t('page.bookingReport.total_booking')"
      >
        <template slot-scope="scope">
          <router-link
            v-if="scope.row.total"
             :to="{ name: 'bookingReportHotels',
              query: {
                hotelSn: scope.row.hotelSn,
                deviceType: filter.deviceType,
                startDate: filter.startDate,
                endDate: filter.endDate,
                type: filter.type,
                provinceSn: `${filter.provinceSn}`
              }
            }"
          >
            {{ scope.row.totalBooking }}
          </router-link>
          <span v-else>
            {{ scope.row.totalBooking }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="70"
        :label="$t('page.bookingReport.check_in')"
      >
        <template slot-scope="scope">
          <router-link
            v-if="scope.row.total"
             :to="{ name: 'bookingReportHotels',
              query: {
                hotelSn: scope.row.hotelSn,
                deviceType: filter.deviceType,
                startDate: filter.startDate,
                endDate: filter.endDate,
                type: filter.type,
                provinceSn: `${filter.provinceSn}`
              }
            }"
          >
            {{ scope.row.totalCheckIn }}
          </router-link>
          <span v-else>
            {{ scope.row.totalCheckIn }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="70"
        :label="$t('page.bookingReport.confirmed')"
      >
        <template slot-scope="scope">
          <router-link
            v-if="scope.row.total"
             :to="{ name: 'bookingReportHotels',
              query: {
                hotelSn: scope.row.hotelSn,
                deviceType: filter.deviceType,
                startDate: filter.startDate,
                endDate: filter.endDate,
                type: filter.type,
                provinceSn: `${filter.provinceSn}`
              }
            }"
          >
            {{ scope.row.totalReserved }}
          </router-link>
          <span v-else>
            {{ scope.row.totalReserved }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="70"
        :label="$t('page.bookingReport.go2joy_cancel')"
      >
        <template slot-scope="scope">
          <router-link
            v-if="scope.row.total"
             :to="{ name: 'bookingReportHotels',
              query: {
                hotelSn: scope.row.hotelSn,
                deviceType: filter.deviceType,
                startDate: filter.startDate,
                endDate: filter.endDate,
                type: filter.type,
                provinceSn: `${filter.provinceSn}`
              }
            }"
          >
            {{ scope.row.totalGo2joyCancel }}
          </router-link>
          <span v-else>
            {{ scope.row.totalGo2joyCancel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="70"
        :label="$t('page.bookingReport.hotel_cancel')"
      >
        <template slot-scope="scope">
          <router-link
            v-if="scope.row.total"
             :to="{ name: 'bookingReportHotels',
              query: {
                hotelSn: scope.row.hotelSn,
                deviceType: filter.deviceType,
                startDate: filter.startDate,
                endDate: filter.endDate,
                type: filter.type,
                provinceSn: `${filter.provinceSn}`
              }
            }"
          >
            {{ scope.row.totalHotelCancel }}
          </router-link>
          <span v-else>
            {{ scope.row.totalHotelCancel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="70"
        :label="$t('page.bookingReport.user_cancel')"
      >
        <template slot-scope="scope">
          <router-link
            v-if="scope.row.total"
             :to="{ name: 'bookingReportHotels',
              query: {
                hotelSn: scope.row.hotelSn,
                deviceType: filter.deviceType,
                startDate: filter.startDate,
                endDate: filter.endDate,
                type: filter.type,
                provinceSn: `${filter.provinceSn}`
              }
            }"
          >
            {{ scope.row.totalUserCanceled }}
          </router-link>
          <span v-else>
            {{ scope.row.totalUserCanceled }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="70"

        :label="$t('page.bookingReport.no_show')"
      >
        <template slot-scope="scope">
          <router-link
            v-if="scope.row.total"
             :to="{ name: 'bookingReportHotels',
              query: {
                hotelSn: scope.row.hotelSn,
                deviceType: filter.deviceType,
                startDate: filter.startDate,
                endDate: filter.endDate,
                type: filter.type,
                provinceSn: `${filter.provinceSn}`
              }
            }"
          >
            {{ scope.row.totalExpired }}
          </router-link>
          <span v-else>
            {{ scope.row.totalExpired }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="70"
        :label="$t('page.bookingReport.payment_fail')"
      >
        <template slot-scope="scope">
          <router-link
            v-if="scope.row.total"
             :to="{ name: 'bookingReportHotels',
              query: {
                hotelSn: scope.row.hotelSn,
                deviceType: filter.deviceType,
                startDate: filter.startDate,
                endDate: filter.endDate,
                type: filter.type,
                provinceSn: `${filter.provinceSn}`
              }
            }"
          >
            {{ scope.row.totalPaymentFailed }}
          </router-link>
          <span v-else>
            {{ scope.row.totalPaymentFailed }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <template
      slot="footer"
      class="booking-rp__footer"
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
import SaSelectCheck from '@/components/globals/SaSelectCheck.vue'
import { fetchBookingReports, exportBookingReports } from './api'
import { fetchProvinces } from '@/api/province'
import { fetchSuggestionsHotels } from '@/api/hotels'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
const allHotelStatus = [3, 4, 5, 6]
const today = new Date()
export default {
  components: { SaSection, SaSelectCheck },
  name: 'BookingReport',
  data: (vm) => {
    return {
      provinces: [],
      listSuggestionsHotels: [],
      bookingReports: [],
      statistics: {},
      pagination: {},
      filter: {
        hotelStatus: allHotelStatus,
        deviceType: 0,
        provinceSn: [],
        startDate: vm.formatDate(today, false),
        endDate: vm.formatDate(today, false),
        type: 1,
        limit: 10,
        page: 1
      },
      ui: {
        bookingReportsLoading: false,
        hotelsLoading: false,
        provincesLoading: false,
        provinceOptions: [],
        statusOptions: [
          { key: 'page.bookingReport.contracted', value: 3 },
          { key: 'page.bookingReport.trial', value: 4 },
          { key: 'page.bookingReport.terminated', value: 5 },
          { key: 'page.bookingReport.suspended', value: 6 }
        ],
        deviceTypeOptions: [
          { key: vm.$t('page.bookingReport.allDevice'), value: 0 },
          { key: vm.$t('page.bookingReport.app'), value: 1 },
          { key: vm.$t('page.bookingReport.web'), value: 2 }
        ],
        timeTypeOptions: [
          { key: vm.$t('page.bookingReport.time_at_hotel'), value: 1 },
          { key: vm.$t('page.bookingReport.check_in_time'), value: 2 }
        ]
      },
      checkBox: {
        isIndeterminateStatus: false,
        isIndeterminateProvinces: false,
        checkAllStatus: true,
        checkAllProvinces: true
      },
      hotelSelected: '',
      isDisabledExport: false
    }
  },
  created () {
    this.fetchBookingReports()
    this.fetchProvinces()
    this.fetchSuggestionsHotels({ limit: 10, hotelStatus: 0 })
    this.isDisabledExport = !this.hasPermission('sabooking', 'pExport')
  },
  computed: {
    dateRange: {
      get () {
        return [this.filter.startDate, this.filter.endDate]
      },
      set (val) {
        this.filter.startDate = val[0]
        this.filter.endDate = val[1]
        this.fetchBookingReports()
      }
    }
  },
  watch: {
    dateRange (value) {
      if (!value) {
        delete this.filter.startDate
        delete this.filter.endDate
      } else {
        this.filter.startDate = value[0]
        this.filter.endDate = value[1]
      }
      // this.fetchFirstBookings(this.filter)
    },
    hotelSelected (value) {
      if (this.filter.hotelGroupSn) {
        delete this.filter.hotelGroupSn
      } else if (this.filter.hotelSn) {
        delete this.filter.hotelSn
      }
      if (value) {
        this.filter[value.hotelStatus === -1 ? 'hotelGroupSn' : 'hotelSn'] = value.sn
      }
      this.fetchBookingReports()
    }
  },
  methods: {
    // APIs data
    searchSuggestionsHotels: debounce(function (keySearch) {
      this.fetchSuggestionsHotels({
        limit: 10,
        hotelStatus: 0,
        keyword: keySearch
      })
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
    async fetchProvinces () {
      this.ui.provincesLoading = true
      try {
        const { data } = await fetchProvinces({ limit: 100, status: 1 })
        this.provinces = data.data.provinces
        this.ui.provinceOptions = await data.data.provinces.reduce(function async (preValue, curValue) {
          return preValue.concat(curValue.sn)
        }, [])
        this.filter.provinceSn = [...this.ui.provinceOptions]
      } catch (error) {
        return false
      } finally {
        this.ui.provincesLoading = false
      }
    },
    async fetchBookingReports () {
      this.ui.bookingReportsLoading = true
      try {
        const formData = {
          ...this.filter
        }
        formData.hotelStatus = JSON.stringify(formData.hotelStatus)
        formData.provinceSn = JSON.stringify(formData.provinceSn)
        const { data } = await fetchBookingReports(formData)
        this.bookingReports = data.data.bookingReports
        const totalItem = this.bookingReports.reduce((preValue, curValue) => ({
          totalBooking: preValue.totalBooking + curValue.totalBooking,
          totalCheckined: preValue.totalCheckined + curValue.totalCheckined,
          totalExpired: preValue.totalExpired + curValue.totalExpired,
          totalGo2joyCancel: preValue.totalGo2joyCancel + curValue.totalGo2joyCancel,
          totalHotelCancel: preValue.totalHotelCancel + curValue.totalHotelCancel,
          totalPaymentFailed: preValue.totalPaymentFailed + curValue.totalPaymentFailed,
          totalUserCanceled: preValue.totalUserCanceled + curValue.totalUserCanceled,
          totalReserved: preValue.totalReserved + curValue.totalReserved,
          total: true
        }))
        this.bookingReports.unshift(totalItem)
        this.statistics = data.data.statistics
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.bookingReportsLoading = false
      }
    },
    async exportBookingReports () {
      try {
        this.ui.exportLoading = true
        const formData = {
          ...this.filter
        }
        formData.hotelStatus = JSON.stringify(formData.hotelStatus)
        formData.provinceSn = JSON.stringify(formData.provinceSn)
        delete formData.hotelStatus
        delete formData.limit
        delete formData.page
        formData.hotelSn = formData.hotelGroupSn || 0
        await exportBookingReports(formData)
        this.$message({
          type: 'success',
          message: this.$t('exportButton.export_success')
        })
      } catch (error) {
        return false
      } finally {
        this.ui.exportLoading = false
      }
    },
    // checkbox
    handleCheckAllStatus (val) {
      this.checkBox.checkAllStatus = val
      this.filter.hotelStatus = val ? allHotelStatus : []
      this.checkBox.isIndeterminateStatus = false
      this.fetchBookingReports()
    },
    handleCheckedStatus: debounce(function (value) {
      this.checkBox.checkAllStatus = value.length === this.ui.statusOptions.length
      this.checkBox.isIndeterminateStatus = value.length > 0 && value.length < this.ui.statusOptions.length
      this.fetchBookingReports()
    }, 1000),
    handleCheckAllProvinces (val) {
      this.checkBox.checkAllProvinces = val
      this.filter.provinceSn = val ? this.ui.provinceOptions : []
      this.checkBox.isIndeterminateProvinces = false
      this.fetchBookingReports()
    },
    handleCheckedProvince: debounce(function (value) {
      this.checkBox.checkAllProvinces = value.length === this.ui.provinceOptions.length
      this.checkBox.isIndeterminateProvinces = value.length > 0 && value.length < this.ui.provinceOptions.length
      this.fetchBookingReports()
    }, 1000),
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchBookingReports()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchBookingReports()
    },
    // table
    setCLassIndexColumn ({ row, column }) {
      if (row.total === true && column.type === 'index') {
        return 'hidden-index-column'
      }
    },
    setIndex (index) {
      return index
    }
  }
}
</script>
<style lang="scss" scoped>
.booking-rp {
  &__filter {
    .el-select, .el-date-editor, .el-button, .select-check {
      margin-right: 12px;
      margin-left: 0;
      margin-bottom: 12px;
    }
  }
  &__footer {
    margin-top: 30px;
  }
}
:deep(.hidden-index-column) {
  div {
    display: none;
  }
}
.el-popover .el-checkbox {
  display: block;
  padding: 6px 12px;
}
.el-popover .el-checkbox-group {
  overflow: auto;
  height: 100%;
  max-height: 200px;
}
.el-popover .el-checkbox-group::-webkit-scrollbar {
  width: 2px;
  background-color: #F5F5F5;
}
.el-popover .el-checkbox-group::-webkit-scrollbar-thumb {
  background-color: #000000;
}
</style>
