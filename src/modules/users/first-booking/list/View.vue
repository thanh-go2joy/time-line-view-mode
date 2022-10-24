<template>
  <sa-section
    class="first-bookings"
  >
    <template name="header">
      <p
        class="first-bookings__header"
      >
        <span>
          {{  $t('page.firstBooking.totalWillCall') }}:&nbsp;
        </span>
        <i v-if="ui.loading" class="el-icon-loading"></i>
        <router-link
          v-else
          :to="{ name: 'firstBooking', query: { status: 0 }}"
        >
          {{  statistics.totalWillCall  }}
        </router-link>
        &nbsp;
        -
        &nbsp;
        <span>
          {{ $t('page.firstBooking.totalCalled') }}:&nbsp;
        </span>
        <i v-if="ui.loading" class="el-icon-loading"></i>
        <router-link
          v-else
          :to="{ name: 'firstBooking', query: { status: 1 }}"
        >
          {{ statistics.totalCalled }}
        </router-link>
      </p>
      <div class="first-bookings__filter">
        <el-input
          v-model="query.keyword"
          :placeholder="$t('page.firstBooking.phoneNumber')"
          @input="handleSearch"
          prefix-icon="el-icon-search"
        />
       <el-date-picker
          v-model="dateRange"
          type="daterange"
          popper-class="custom-date-range"
          range-separator="-"
          :start-placeholder="$t('page.firstBooking.startDate')"
          :end-placeholder="$t('page.firstBooking.endDate')"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
      </div>
    </template>
    <el-table
      v-loading="ui.loading"
      :data="firstBooking.userFirstBookings"
    >
      <el-table-column
        type="index"
        label="#"
      />
      <el-table-column
        :label="$t('page.firstBooking.nickName')"
        :min-width="120"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'firstBookingDetails', params: { sn: scope.row.appUser.sn }}">
            {{ scope.row.appUser.nickName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.firstBooking.mobile')"
        :min-width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.appUser.mobile }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.firstBooking.registerProvince')"
      >
        <template slot-scope="scope">
          {{ scope.row.appUser.firstProvince.name }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.firstBooking.bookingNo')"
        :min-width="120"
      >
        <template slot-scope="scope">
          <p>
            <router-link :to="{ name: 'firstBookingDetails', params: { sn: scope.row.userBooking.sn } }">
              {{ scope.row.userBooking.bookingNo }}
            </router-link>
          </p>
          <p>{{ formatDate(scope.row.userBooking.createTime) }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.firstBooking.hotel')"
        :min-width="120"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'hotelDisplayDetails', params: { sn: scope.row.hotel.sn } }">{{ scope.row.hotel.name }}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.firstBooking.operations')"
        :min-width="120"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.staff.sn && scope.row.createTime">
            <p>
              {{ scope.row.staff.fullName }}
            </p>
            <p>
              {{ formatDate(scope.row.createTime) }}
            </p>
          </div>
          <el-button
            v-else
            plain
            type="success"
            @click="handleDone(scope.row)"
            icon="el-icon-edit"
            size="small"
          >
            {{ $t('page.firstBooking.done') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="firstBooking.meta.perPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="firstBooking.meta.total">
      </el-pagination>
    </template>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { fetchFirstBookings, updateFirstBooking, fetchStatisticsFirstBookings } from './api'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
export default {
  name: 'FirstBookings',
  components: { SaSection },
  data: () => {
    return {
      ui: {
        loading: false
      },
      query: {
        limit: 10,
        startDate: '',
        endDate: '',
        keyword: '',
        status: ''
      },
      dateRange: '',
      firstBooking: {
        meta: {},
        userFirstBookings: []
      },
      statistics: {}
    }
  },
  created () {
    this.query.status = this.$route.query.status || -1
    this.fetchFirstBookings()
    this.fetchStatisticsFirstBookings()
  },
  watch: {
    dateRange (value) {
      if (!value) {
        delete this.query.startDate
        delete this.query.endDate
      } else {
        this.query.startDate = value[0]
        this.query.endDate = value[1]
      }
      this.fetchFirstBookings(this.query)
    },
    '$route.query.status' (value) {
      this.query.status = value
      this.fetchFirstBookings()
    }
  },
  methods: {
    async fetchFirstBookings () {
      this.ui.loading = true
      try {
        const { data } = await fetchFirstBookings(this.query)
        this.firstBooking = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    async fetchStatisticsFirstBookings () {
      this.ui.loading = true
      try {
        const { data } = await fetchStatisticsFirstBookings()
        this.statistics = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    async handleDone (row) {
      try {
        await this.$confirm(
          `${this.$t('page.firstBooking.messageAlert')}`,
          `${this.$t('page.firstBooking.messageWarning')}`,
          {
            confirmButtonText: `${this.$t('page.firstBooking.ok')}`,
            cancelButtonText: `${this.$t('page.firstBooking.cancel')}`,
            type: 'info'
          }
        )
        try {
          await updateFirstBooking({ appUserSn: row.appUser.sn })
          this.fetchFirstBookings()
        } catch (error) {
          return false
        }
      } catch (error) {
        this.$message({
          type: 'error',
          message: error.toString()
        })
      }
    },
    handleSearch: debounce(function () {
      this.query.page = 1
      this.fetchFirstBookings(this.query)
    }, timeDebounce),
    // pagination event
    handleSizeChange (value) {
      this.query.limit = value
      this.fetchFirstBookings(this.query)
    },
    handleCurrentChange (value) {
      this.query.page = value
      this.fetchFirstBookings(this.query)
    }
  }
}
</script>
<style lang="scss" scoped>
.first-bookings {
  &__header {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    i {
      color: #409eff;
      margin: 0 8px;
    }
  }
  &__filter {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    .el-input {
      width: 250px;
    }
    .el-date-editor {
      margin: 0 12px;
    }
  }
}
</style>
