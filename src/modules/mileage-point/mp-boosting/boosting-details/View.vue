<template>
  <sa-section>
    <el-table
      v-loading="ui.loading"
      :data="mileageRewards"
    >
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column
        prop="hotelName"
        :label="$t('page.MpBoosting.hotelName')"
      >
      </el-table-column>
      <el-table-column
        prop="bookingNo"
        :label="$t('page.MpBoosting.bookingNo')"
      >
      </el-table-column>
      <el-table-column
        :label="$t('page.MpBoosting.nickName')"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'userDetails', params: { sn: scope.row.sn } }">
            {{ scope.row.nickName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="roomTypeName"
        :label="$t('page.MpBoosting.roomType')"
      >
      </el-table-column>
      <el-table-column
        :label="$t('page.MpBoosting.bookingType')"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.type === 1">{{ $t('page.MpBoosting.hourly') }}</span>
          <span v-if="scope.row.type === 2">{{ $t('page.MpBoosting.overnight') }}</span>
          <span v-if="scope.row.type === 3">{{ $t('page.MpBoosting.daily') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="checkInDatePlan"
        :label="$t('page.MpBoosting.stayAtHotelTime')"
      >
      </el-table-column>
      <el-table-column
        prop="amountFromUser"
        :label="$t('page.MpBoosting.amount')"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.amountFromUser) }} VND
        </template>
      </el-table-column>
      <el-table-column
        prop="paymentProvider"
        :label="$t('page.MpBoosting.payment')"
      >
      </el-table-column>
      <el-table-column
        prop="numOfPoint"
        :label="$t('page.MpBoosting.numberOfPoints')"
      >
      </el-table-column>
      <el-table-column
        prop="expiredDate"
        :label="$t('page.MpBoosting.expireTime')"
      >
      </el-table-column>
      <el-table-column
        prop="startTime"
        :label="$t('page.MpBoosting.createTime')"
      >
      </el-table-column>
    </el-table>
  </sa-section>
</template>
<script>
import { getMileageRewardDetails } from './api'
import SaSection from '@/components/globals/SaSection.vue'
export default {
  components: { SaSection },
  name: 'MpBoosting',
  data: (vm) => {
    return {
      filter: {
        page: 1,
        limit: 1000000
      },
      ui: {
        loading: false
      },
      pagination: {
        perPage: 1,
        total: 0
      },
      mileageRewards: []
    }
  },
  created () {
    this.getMileageRewardDetails()
  },
  methods: {
    async getMileageRewardDetails () {
      try {
        this.ui.loading = true
        const { data } = await getMileageRewardDetails(this.$route.params.sn, this.filter)
        this.mileageRewards = data.mileageRewards
        this.pagination = data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.getMileageRewardDetails()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.getMileageRewardDetails()
    }
  }
}
</script>
