<template>
  <sa-section>
    <div class="hotel-introduce-signup__filters">
      <el-form :inline="true" :model="filter" class="demo-form-inline float-left">
        <div class="is-change-date">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            popper-class="custom-date-range"
            range-separator="-"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            style="margin-right: 12px"
            :start-placeholder="$t('page.firstBooking.startDate')" :end-placeholder="$t('page.firstBooking.endDate')"
            :clearable="false"
          />
          <el-button type="primary" class="el-button mr-2 el-button--primary" @click="searchHotelIntroduceSign()"><i class="el-icon-search"></i> search</el-button>
        </div>
      </el-form>
      <div class="float-right">
        <el-button type="success" icon="el-icon-download" plain  @click="onExportHotelIntroductSignup">
            {{ $t('button.hotelIntroductSignup') }}
          </el-button>
          <el-button type="success" icon="el-icon-download" plain  @click="onExportHotelAmenityPack">
            {{ $t('button.hotelAmenityPack') }}
          </el-button>
      </div>
    </div>
    <div class="hotel-introduce-signup__table">
      <el-table
        :data="data"
        v-loading="ui.isTableLoading"
      >
        <el-table-column label="#" type="index" :index="indexMethod"/>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.hotel_name')"
          :min-width="100"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.hotelName">
              {{ scope.row.hotelName }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.number_of_signup')"
          :min-width="100"
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'numberOfSignup', query: { hotelSn: scope.row.hotelSn,type: 1 }}">
                <span>{{ scope.row.numSignup }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.checkin_by_register')"
          :min-width="100"
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'checkinByRegister', query: { hotelSn: scope.row.hotelSn,type: 2 }}">
                <span>{{ scope.row.numCheckin }}</span>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagination.perPage"
        :current-page="filter.page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      />
    </div>
  </sa-section>
</template>
<script>
import saSection from '@/components/globals/SaSection.vue'
import {
  getTrackingTotal,
  exportDataHotelIntroductSignup,
  exportDataHotelAmenityPack
} from './api'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
export default {
  name: 'hotelIntroduceSignup',
  components: {
    saSection
  },
  data (vm) {
    return {
      filter: {
        limit: 10,
        page: 1,
        startDate: '',
        endDate: ''
      },
      pagination: {},
      ui: {
        isTableLoading: false
      },
      hotels: [],
      data: [],
      dateRange: []
    }
  },

  created () {
    this.dateRange = [this.filter.startDate, this.filter.endDate]
    this.getDataHotelIntroduceSignup()
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
      this.getDataHotelIntroduceSignup()
    }
  },
  methods: {
    async getDataHotelIntroduceSignup () {
      this.ui.isTableLoading = true
      this.filter.startDate = this.dateRange[0]
      this.filter.endDate = this.dateRange[1]
      try {
        const { data } = await getTrackingTotal(this.filter)
        this.data = data.data.hotelIntroduces
        this.data.unshift(data.data.statistics)
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    searchHotelIntroduceSign: debounce(function () {
      this.getDataHotelIntroduceSignup(this.filter)
    }, timeDebounce),
    onSizeChange (size) {
      this.filter.limit = size
      if (
        Math.ceil(this.pagination.total / size) < this.pagination.currentPage
      ) {
        this.pagination.currentPage = Math.ceil(this.pagination.total / size)
      } // when curent page is larger than total page
      this.getDataHotelIntroduceSignup(this.filter)
    },
    onCurrentChange (currentPage) {
      this.filter.page = currentPage
      this.getDataHotelIntroduceSignup(this.filter)
    },
    indexMethod (index) {
      if (index === 0) {
        return ''
      } else {
        return index
      }
    },
    async onExportHotelIntroductSignup () {
      try {
        await this.$confirm(
        `${this.$t('message.messageAlert')}`, `${this.$t('message.warning')}`, {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        try {
          const params = {
            startDate: this.dateRange[0],
            endDate: this.dateRange[1]
          }
          await exportDataHotelIntroductSignup(params)
          const message = this.$t('message.exportSuccess')
          this.$message({
            type: 'success',
            message: message
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
    async onExportHotelAmenityPack () {
      try {
        await this.$confirm(
        `${this.$t('message.messageAlert')}`, `${this.$t('message.warning')}`, {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        try {
          const params = {
            startDate: this.dateRange[0],
            endDate: this.dateRange[1]
          }
          await exportDataHotelAmenityPack(params)
          const message = this.$t('message.exportSuccess')
          this.$message({
            type: 'success',
            message: message
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
    }
  }
}
</script>

<style lang="scss" scoped>
.operations{
    padding: 8px 12px;
    display: flex;
    white-space: break-spaces;
}
.el-button {
  @media only screen and (max-width: 480px) {
    margin: 6px 0;
  }
}
</style>
