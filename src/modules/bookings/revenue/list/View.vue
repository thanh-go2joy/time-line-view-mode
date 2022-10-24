<template>
  <sa-section
    class="revenue-report"
  >
    <template slot="header">
      <div class="revenue-report__header">
        <sa-select-check
          v-model="filters.hotelStatus"
          class="select-check"
          :indeterminate="checkBox.isIndeterminateStatus"
          :model-check-all="checkBox.checkAllStatus"
          :options="ui.hotelStatusOptions"
          translate
          @changeCheckAll="handleCheckAllStatus"
          @input="handleCheckedStatus"
        />
        <el-select
          v-model="filters.originHotel"
          @change="fetchRevenues"
          style="margin: 0 16px;"
        >
          <el-option
            v-for="(item, index) in ui.originHotelOptions"
            :key="index"
            :label="$t(item.label)"
            :value="item.value"
            style="font-size: 13px; color: #4a5d6e;"
          />
        </el-select>
        <el-select
          v-model="filters.provinceSn"
          :placeholder="$t('page.settings.province')"
          :loading="ui.provincesLoading"
          @change="fetchRevenues"
        >
          <el-option
            v-for="(item, index) in provinces"
            :key="index"
            :label="index !== 0 ? item.name : $t(item.name)"
            :value="item.sn"
            style="font-size: 13px; color: #4a5d6e;"
          />
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
          :popper-append-to-body="false"
          style="margin: 0 16px;"
        >
          <el-option
            v-for="(item, index) in listSuggestionsHotels"
            :key="index"
            :label="item.name"
            :value="item"
            style="font-size: 13px; color: #4a5d6e;"
            class="hotel__option"
          >
            {{ item.name }} <br> {{ item.address }}
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
          plain
          @click="handleExportFile"
          icon="el-icon-download"
          style="margin: 0 16px;"
          :loading="ui.exportLoading"
        >
          {{ $t('button.export') }}
        </el-button>
        <upload-file
          accept=".xlsx, .xls, .csv"
          @change="handleImportFile"
        >
          {{ $t('page.sms.importFile') }}
        </upload-file>
      </div>
    </template>
    <el-table
      v-loading="ui.loading"
      :data="revenues"
      :cell-class-name="setCLassIndexColumn"
    >
      <el-table-column
        type="index"
        label="#"
        :index="setIndex"
        min-width="20"
      />
      <el-table-column
        min-width="120"
        :label="$t('page.revenueReport.hotelName')"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'revenueReportDetails', params: { sn: scope.row.hotelSn } }">
            {{ scope.row.hotelName }}
          </router-link>
          <p>
            {{ scope.row.hotelCode }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="companyCode"
        min-width="120"
        :label="$t('page.revenueReport.companyCode')"
      >
      </el-table-column>
      <el-table-column
        prop="totalTransaction"
        min-width="120"
        :label="$t('page.revenueReport.totalTransaction')"
      >
      </el-table-column>
      <el-table-column min-width="120">
        <template slot="header">
          <p>{{ $t('page.revenueReport.productAmount') }}</p>
          <p>{{ $t('page.revenueReport.extraFee') }}</p>
        </template>
        <template slot-scope="scope">
          <p>
            {{ formatMoney(scope.row.productAmount) }}
          </p>
          <p>
            {{ formatMoney(scope.row.extraFee) }}
          </p>
        </template>
      </el-table-column>
      <el-table-column min-width="120">
        <template slot="header">
          <p><span style="color: #f56c6c">(1)</span>{{ $t('page.revenueReport.totalAmount') }}</p>
        </template>
        <template slot-scope="scope">
          <p>
            {{ formatMoney(scope.row.totalAmount) }}
          </p>
         </template>
      </el-table-column>
      <el-table-column min-width="120">
        <template slot="header">
          <p><span style="color: #f56c6c">(2)</span>{{ $t('page.revenueReport.go2joyDiscount') }}</p>
          <p><span style="color: #f56c6c">(3)</span>{{ $t('page.revenueReport.hotelDiscount') }}</p>
        </template>
        <template slot-scope="scope">
          <p>
            {{ formatMoney(scope.row.go2joyDiscount) }}
          </p>
          <p>
            {{ formatMoney(scope.row.hotelDiscount) }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="userPay"
        min-width="120"
      >
        <template slot="header">
          <p><span style="color: #f56c6c">(4)</span>{{ $t('page.revenueReport.userPay') }}</p>
          <p style="color: #f56c6c">(1)-(2)-(3)</p>
        </template>
        <template slot-scope="scope">
          <p>
            {{ formatMoney(scope.row.userPay) }}
          </p>
         </template>
      </el-table-column>
      <el-table-column min-width="120">
        <template slot="header">
          <p><span style="color: #f56c6c">(5)</span>{{ $t('page.revenueReport.paidInAdvance') }}</p>
        </template>
        <template slot-scope="scope">
          <p>
            {{ formatMoney(scope.row.paidInAdvance) }}
          </p>
         </template>
      </el-table-column>
      <el-table-column min-width="120">
        <template slot="header">
          <p><span style="color: #f56c6c">(6)</span>{{ $t('page.revenueReport.commission') }}</p>
        </template>
         <template slot-scope="scope">
          <p>
            {{ formatMoney(scope.row.commission) }}
          </p>
         </template>
      </el-table-column>
      <el-table-column min-width="120">
        <template slot="header">
          <p>{{ $t('page.revenueReport.balance') }}</p>
          <p>{{ $t('page.revenueReport.receivable') }}</p>
          <p>{{ $t('page.revenueReport.payable') }}</p>
          <p><span style="color: #f56c6c">(6)-(2)-(5)</span></p>
        </template>
        <template slot-scope="scope">
          <p>
            {{ formatMoney(scope.row.balance) }}
          </p>
         </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.revenueReport.operations')"
        min-width="140"
      >
         <template slot-scope="scope">
          <el-button
            v-if="!scope.row.total"
            type="success"
            plain
            icon="el-icon-download"
            @click="handleExportFileRow(scope.row.hotelSn)"
          >
            {{ $t('button.export') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagination.perPage"
        :current-page="filters.page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </template>
  </sa-section>
</template>
<script>
import SaSelectCheck from '@/components/globals/SaSelectCheck.vue'
import SaSection from '@/components/globals/SaSection.vue'
import { fetchRevenues, updateCompanyCode, exportRevenues, exportRevenuesInternal } from './api'
import { debounce } from '@/utils/helpers'
import { fetchSuggestionsHotels } from '@/api/hotels'
import { fetchProvinces } from '@/api/province'
import UploadFile from '@/components/globals/UploadFile.vue'
const timeDebounce = 500
const allHotelStatus = [3, 4, 5, 6]
export default {
  name: 'RevenueReport',
  components: {
    SaSection,
    SaSelectCheck,
    UploadFile
  },
  data: (vm) => {
    return {
      ui: {
        loading: false,
        exportLoading: false,
        hotelsLoading: false,
        provincesLoading: false,
        originHotelOptions: [
          { label: 'page.revenueReport.allInventory', value: 0 },
          { label: 'page.revenueReport.Go2Joy', value: 1 },
          { label: 'page.revenueReport.Agoda', value: 2 }
        ],
        hotelStatusOptions: [
          { key: 'page.revenueReport.contracted', value: 3 },
          { key: 'page.revenueReport.trial', value: 4 },
          { key: 'page.revenueReport.terminated', value: 5 },
          { key: 'page.revenueReport.suspended', value: 6 }
        ]
      },
      pagination: {
        perPage: 1,
        total: 0
      },
      filters: {
        originHotel: 0,
        hotelStatus: allHotelStatus,
        provinceSn: '',
        startDate: vm.formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1), false),
        endDate: vm.formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), false),
        limit: 10,
        page: 1
      },
      hotelSelected: '',
      checkBox: {
        isIndeterminateStatus: false,
        checkAllStatus: true
      },
      provinces: [],
      revenues: [],
      listSuggestionsHotels: []
    }
  },
  created () {
    this.fetchRevenues()
    this.fetchProvinces()
    this.fetchSuggestionsHotels({ limit: 10 })
  },
  watch: {
    hotelSelected (value) {
      if (this.filters.hotelGroupSn) {
        delete this.filters.hotelGroupSn
      } else if (this.filters.hotelSn) {
        delete this.filters.hotelSn
      }
      if (value) {
        this.filters[value.hotelStatus === -1 ? 'hotelGroupSn' : 'hotelSn'] = value.sn
      }
      this.fetchRevenues()
    }
  },
  computed: {
    dateRange: {
      get () {
        return [this.filters.startDate, this.filters.endDate]
      },
      set (val) {
        this.filters.startDate = val[0]
        this.filters.endDate = val[1]
      }
    }
  },
  methods: {
    searchSuggestionsHotels: debounce(function (keySearch) {
      this.fetchSuggestionsHotels({
        limit: 10,
        keyword: keySearch
      })
    }, timeDebounce),
    async fetchRevenues () {
      try {
        this.ui.loading = true
        const formData = {
          ...this.filters
        }
        formData.hotelStatus = JSON.stringify(formData.hotelStatus)
        const { data } = await fetchRevenues(formData)
        const statistics = data.data.statistics
        statistics.total = true
        this.pagination = data.data.meta
        this.revenues = data.data.revenues
        this.revenues.unshift(statistics)
        this.paginations = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    async fetchProvinces () {
      try {
        this.ui.provincesLoading = true
        const { data } = await fetchProvinces({ limit: 100, status: 1 })
        this.provinces = [{ name: 'page.revenueReport.all', sn: '' }, ...data.data.provinces]
      } catch (error) {
        return false
      } finally {
        this.ui.provincesLoading = false
      }
    },
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
    async handleExportFileRow (hotelSn) {
      try {
        const params = {
          hotelSn: hotelSn,
          ...this.filters
        }
        await exportRevenuesInternal(params)
        const message = this.$t('message.exportSuccess')
        this.$message({
          type: 'success',
          message: message
        })
      } catch (error) {
        return false
      }
    },
    async handleExportFile () {
      this.ui.exportLoading = true
      try {
        const formData = {
          ...this.filters
        }
        formData.hotelStatus = JSON.stringify(formData.hotelStatus)
        await exportRevenues(formData)
        const message = this.$t('message.exportSuccess')
        this.$message({
          type: 'success',
          message: message
        })
      } catch (error) {
        return false
      } finally {
        this.ui.exportLoading = false
      }
    },
    async handleImportFile (file) {
      this.ui.loading = true
      try {
        const formData = new FormData()
        formData.append('file', file)
        await updateCompanyCode(formData)
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    handleCheckAllStatus (val) {
      this.checkBox.checkAllStatus = val
      this.filters.hotelStatus = val ? allHotelStatus : []
      this.checkBox.isIndeterminateStatus = false
      this.fetchRevenues()
    },
    handleCheckedStatus: debounce(function (value) {
      this.checkBox.checkAllStatus = value.length === this.ui.hotelStatusOptions.length
      this.checkBox.isIndeterminateStatus = value.length > 0 && value.length < this.ui.hotelStatusOptions.length
      this.fetchRevenues()
    }, 1000),
    // pagination event
    handleSizeChange (value) {
      this.filters.limit = value
      this.fetchRevenues()
    },
    handleCurrentChange (value) {
      this.filters.page = value
      this.fetchRevenues()
    },
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
.revenue-report {
  .hotel__option {
    height: auto;
  }
  &__header {
    display: flex;
    align-items: center;
  }
  :deep(.upload-file__label) {
    padding: 11px 20px;
  }
}
::v-deep .hidden-index-column {
  div {
    display: none;
  }
}
</style>
