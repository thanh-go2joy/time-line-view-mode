<template>
  <div class="booking-histories">
    <el-table
      :data="bookingHistories.userBookingHistories"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="20"
      />
      <el-table-column
        :label="$t('page.userMgt.hotelName')"
        min-width="100"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'hotelDisplayDetails', params: { sn: scope.row.hotelSn } }">
            {{ scope.row.hotelName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="bookingNo"
        :label="$t('page.userMgt.bookingNo')"
         min-width="50"
      />
      <el-table-column
        prop="roomTypeName"
        :label="$t('page.userMgt.roomTypeName')"
        min-width="100"
      />
      <el-table-column
        :label="$t('page.userMgt.couponName')"
        min-width="100"
      >
        <template slot-scope="scope">
          <img
            v-if="scope.row.giftDescription"
            :src="giftboxSrc"
            style="width: 20px; height: 20px;"
            alt="giftbox"
          >
          <img
            v-if="scope.row.bonusHour"
            :src="clockSrc" style="width: 20px ;height: 20px;"
            alt="giftbox"
          >
          <p v-if="scope.row.couponName">{{ scope.row.couponName }}</p>
          <p v-if="scope.row.discount">{{ formatMoney(scope.row.discount) }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.type')"
        min-width="60"
      >
        <template slot-scope="scope">
          {{ setType(scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.createTime')"
        min-width="80"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.checkInDatePlan')"
        min-width="80"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.checkInDatePlan !== 0">
            {{ formatDate(scope.row.checkInDatePlan) }}
          </p>
          <p v-if="scope.row.startTime && scope.row.startTime">{{ scope.row.startTime }} ~ {{ scope.row.endTime }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.checkInTime')"
        min-width="80"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.bookingStatus !== 3 && scope.row.bookingStatus !== 4">
            {{ formatDate(scope.row.checkInTime) }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.bookingStatus')"
        min-width="90"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.bookingStatus === 1">
            {{ $t('page.userMgt.reserved') }}
            <b class='text-danger'>{{ setBookingStatusText(scope.row.viaObject) }}</b>
          </div>
          <div v-else-if="scope.row.bookingStatus === 2">
            {{ $t('page.userMgt.check_in') }}
            <b class='text-danger'>{{ setBookingStatusText(scope.row.viaObject) }}</b>
          </div>
          <div v-else-if="scope.row.bookingStatus === 3">
            {{ $t('page.userMgt.cancel') }}
            <span v-if="scope.row.checkInTime">{{ formatDate(scope.row.checkInTime) }}</span>
            <b class='text-danger'>{{ setBookingStatusText(scope.row.viaObject) }}</b>
          </div>
          <div v-else>
            {{ $t('page.userMgt.no_show') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="totalAmount"
        :label="$t('page.userMgt.totalAmount')"
        min-width="80"
      />
      <el-table-column
        :label="$t('page.userMgt.amountFromUser')"
        min-width="70"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.amountFromUser">
            {{ formatMoney(scope.row.amountFromUser) }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.prepayAmount')"
        min-width="70"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.refunded > 0">
            <span class="text-danger"> {{ formatMoney(scope.row.prepayAmount) }}</span>
          </p>
          <p v-else-if="scope.row.refunded === 0">
            {{ formatMoney(scope.row.prepayAmount) }}
          </p>
          <p v-if="scope.row.paymentProvider !== 0">
            {{ setPaymentProvider(scope.row) }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="refunded"
        :label="$t('page.userMgt.refunded')"
        min-width="50"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.refunded) }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="bookingHistories.meta"
      @size-change="changePageSize"
      @current-change="changeCurrentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="bookingHistories.meta.perPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="bookingHistories.meta.total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'BookingHistoriesTable',
  props: {
    bookingHistories: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    setPaymentProvider (row) {
      switch (row.paymentProvider) {
        case 1:
          return 'ZaloPay'
        case 2:
          if (row.prepayAmount <= 0) {
            return ''
          }
          return row.paymentCode !== null ? 'Pay@Store' : 'Payoo online'
        case 3:
          return 'Momo'
        case 10:
          return this.$t('page.userMgt.creditCard')
        case 11:
          return this.$t('page.userMgt.debitCard')
      }
    },
    setBookingStatusText (value) {
      if (value === 2) {
        return 'H'
      } else if (value === 3) {
        return 'G'
      } else if (value === 5) {
        return 'L'
      }
      return ''
    },
    setType (value) {
      switch (value) {
        case 1:
          return this.$t('page.userMgt.hours')
        case 2:
          return this.$t('page.userMgt.overnight')
        case 3:
          return this.$t('page.userMgt.daily')
        default:
          return ''
      }
    },
    // pagination events
    changePageSize (value) {
      this.$emit('size-change', value)
    },
    changeCurrentPage (value) {
      this.$emit('current-change', value)
    }
  }
}
</script>
<style lang="scss" scoped>
.booking-histories {
  .el-pagination {
    margin-top: 24px;
  }
}
</style>
