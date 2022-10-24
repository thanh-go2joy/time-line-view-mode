<template>
  <sa-section class="mp-booting-list">
    <template slot="header">
      <el-form
        :inline="true"
        :model="filter"
        class="demo-form-inline float-left"
      >
        <el-input
          :placeholder="$t('placeholder.search')"
          v-model="filter.keyword"
          prefix-icon="el-icon-search"
          @input="handleSearch"
          style="width: 250px; margin-right: 16px;padding-bottom: 12px;"
          clearable
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
          style="margin-bottom: 12px;"
          :clearable="false"
          @change="changeDateRange"
        />
      </el-form>
      <el-button
        plain
        type="warning"
        icon="el-icon-plus"
        style="float: right"
        @click="$router.push({ name: 'mpBoostingCreate' })"
      >
        {{ $t('button.add') }}
      </el-button>
    </template>
    <el-table
      v-loading="ui.loading"
      :data="mileageRewards"
    >
      <el-table-column type="index" label="#" min-width="20">
      </el-table-column>
      <el-table-column
        :label="$t('page.MpBoosting.mileageName')"
        min-width="80"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'mpBoostingDetails', params: { sn: scope.row.sn } }">
            {{ scope.row.name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="numPoint"
        :label="$t('page.MpBoosting.numberOfPoints')"
        min-width="100"
      />
      <el-table-column
        :label="$t('page.MpBoosting.period')"
        min-width="120"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.startDate">{{ scope.row.startDate }}</span><br />
          <span v-if="scope.row.endDate">~{{ scope.row.endDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.MpBoosting.bookingType')"
        min-width="100"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.overnight === 1" style="display: flex; align-items: center;">
            <span style="margin-right: 4px;">✔</span>
            <span>{{ $t('page.MpBoosting.overnight') }}</span>
          </p>
          <p v-if="scope.row.daily === 1" style="display: flex; align-items: center;">
            <span style="margin-right: 4px;">✔</span>
            <span>{{ $t('page.MpBoosting.daily') }}</span>
          </p>
          <p v-if="scope.row.hourly === 1" style="display: flex; align-items: center;">
            <span style="margin-right: 4px;">✔</span>
            <span>{{ $t('page.MpBoosting.hourly') }}</span>
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.MpBoosting.applyDays')"
        min-width="200"
      >
        <template slot-scope="scope">
          <div
            v-for="(day, index) in ui.week"
            :key="index"
          >
            <p v-if="scope.row[day] === 1" style="display: flex; align-items: center;">
              <span style="margin-right: 4px;">✔</span>
              <span>{{ $t(`page.MpBoosting.${day}`) }}</span>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.MpBoosting.roomType')"
        min-width="100"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.normalRoom === 1" style="display: flex; align-items: center;">
            <span style="margin-right: 4px;">✔</span>
            <span>{{ $t('page.MpBoosting.normalRoom') }}</span>
          </p>
          <p v-if="scope.row.flashsaleRoom === 1" style="display: flex; align-items: center;">
            <span style="margin-right: 4px;">✔</span>
            <span>{{ $t('page.MpBoosting.flashsaleRoom') }}</span>
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.MpBoosting.minFee')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.minFee) }} VND
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.MpBoosting.combinePromotion')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.combinePromotion === 1 ? $t('page.MpBoosting.yes') : $t('page.MpBoosting.no')}}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.MpBoosting.payment')"
        min-width="200"
      >
        <template slot-scope="scope">
          <div
            v-for="(pay, index) in ui.payments"
            :key="index"
          >
            <p v-if="scope.row[pay] === 1" style="display: flex; align-items: center;">
              <span style="margin-right: 4px;">✔</span>
              <span>{{ $t(`page.MpBoosting.${pay}`) }}</span>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.activities.operations')"
        min-width="100"
      >
        <template slot-scope="scope">
          <div style="margin-bottom: 8px;">
            <el-button
              type="success"
              plain
              size="small"
              icon="el-icon-edit"
              @click="$router.push({ name: 'mpBoostingEdit', params: { sn: scope.row.sn } })"
              style="margin-right: 16px;"
            >
              {{ $t('button.edit')}}
            </el-button>
          </div>
          <div style="margin-bottom: 8px;">
            <el-button
              v-if="scope.row.status === 0"
              type="success"
              plain
              size="small"
              icon="el-icon-video-play"
              @click="handlePlayMileageReward(scope.row.sn, scope.row.$index)"
              style="margin-right: 16px;"
            >
              {{ $t('button.play')}}
            </el-button>
            <el-button
              v-if="scope.row.status === 1"
              type="danger"
              plain
              size="small"
              icon="el-icon-video-pause"
              @click="handleStopMileageReward(scope.row.sn, scope.row.$index)"
              style="margin-right: 16px;"
            >
              {{ $t('button.stop')}}
            </el-button>
          </div>
            <div>
              <router-link :to="{ name: 'mpListHotelBoostingMgt', params: { sn: scope.row.sn } }">
                {{ $t(`page.MpBoosting.hotelList`) }}
              </router-link>
            </div>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagination.perPage"
        :current-page="filter.page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </template>
  </sa-section>
</template>
<script>
import { fetchMileageRewards, updateMileageRewardsStatus } from './api'
import SaSection from '@/components/globals/SaSection.vue'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
export default {
  components: { SaSection },
  name: 'MpBoosting',
  data: (vm) => {
    return {
      filter: {
        page: 1,
        limit: 10,
        keyword: '',
        dateFrom: '',
        dateTo: ''
      },
      ui: {
        loading: false,
        payments: ['payAtHotel', 'zaloCredit', 'zaloDebit', 'payAtStore'],
        week: ['monday', 'tuesday', 'wednesday', 'friday', 'thursday', 'saturday', 'sunday']
      },
      pagination: {
        perPage: 1,
        total: 0
      },
      popover: [],
      mileageRewards: []
    }
  },
  computed: {
    dateRange: {
      get () {
        return [this.filter.dateFrom, this.filter.dateTo]
      },
      set (val) {
        this.filter.dateFrom = val[0]
        this.filter.dateTo = val[1]
        this.fetchMileageRewards()
      }

    }
  },
  created () {
    this.fetchMileageRewards()
  },
  methods: {
    handleSearch: debounce(function () {
      this.filter.page = 1
      this.fetchMileageRewards()
    }, timeDebounce),
    changeDateRange () {
      this.filter.page = 1
      this.fetchMileageRewards()
    },
    async fetchMileageRewards () {
      try {
        this.ui.loading = true
        const { data } = await fetchMileageRewards(this.filter)
        this.mileageRewards = data.data.mileageRewards
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    async handleStopMileageReward (sn, index) {
      try {
        this.ui.loading = true
        this.popover[index] = false
        await updateMileageRewardsStatus(sn, { status: 0 })
        this.fetchMileageRewards()
      } catch (error) {
        return false
      }
    },
    async handlePlayMileageReward (sn, index) {
      try {
        this.ui.loading = true
        this.popover[index] = false
        await updateMileageRewardsStatus(sn, { status: 1 })
        this.fetchMileageRewards()
      } catch (error) {
        return false
      }
    },
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchMileageRewards()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchMileageRewards()
    }
  }
}
</script>
<style lang="scss" scoped>
.mp-booting-list:deep {
.el-input__prefix, .el-input__suffix {
  height: auto !important;
}
}

.operations {
  cursor: pointer;
  transform: rotate(90deg);
  &:hover {
    color: #ff6400;
  }
}
</style>
