<template>
  <sa-section>
    <div class="hotel-introduce-signup__filters">

      <div >
        <el-select
        v-model="direct"

        @change="directPage"
        style="margin: 0 16px; width: 250px;"
      >
        <el-option
          v-for="page in pages"
          :key="page.value"
          :label="$t(`page.hotelIntroduceSignup.${page.label}`)"
          :value="page.value"
        >
        </el-option>
      </el-select>
      </div>
    </div>
    <div class="hotel-introduce-signup__table">
      <el-table
        :data="data"
        v-loading="ui.isTableLoading"
      >
        <el-table-column type="index" label="#" min-width="20" />
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.nickname')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'userDetails', params: { sn: scope.row.appUserSn }}">
                <span>{{ scope.row.appUserNickName }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.hotel_name')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'hotelDisplayDetails', params: { sn: scope.row.hotelSn }}">
                <span>{{ scope.row.hotelName }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.booking_no')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <span >{{ scope.row.bookingNo }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.room_type')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <span >{{ scope.row.roomTypeName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.coupon')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <span >{{ scope.row.couponName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.type')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.type === 1">
              {{ $t("page.bookingReport.hours") }}
            </p>
            <p v-else-if="scope.row.type === 2">
              {{ $t("page.bookingReport.overnight") }}
            </p>
            <p v-else-if="scope.row.type === 3">
              {{ $t("page.bookingReport.daily") }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.booking_time')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <p>{{ formatDate(scope.row.createTime )}}</p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.check_in_time')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <p>{{ formatDate(scope.row.checkInTime )}}</p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.booking_status')"
          :min-width="80"
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
          :label="$t('page.hotelIntroduceSignup.total_amount')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <span >{{ formatMoney(scope.row.totalAmount) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.user_pay')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <span >{{ formatMoney(scope.row.amountFromUser) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.paid_in_advance')"
          :min-width="60"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.refunded > 0">
            <p v-if="scope.row.prepayAmount > 0">
              <span>
              <del>{{ formatMoney(scope.row.prepayAmount) }}</del>
              </span>
              <br>
              <span v-if="scope.row.paymentProvider === 0"></span>
              <span v-else>{{ getPaymentMethodBookingTransfer(scope.row.paymentProvider) }}</span>
            </p>
            <p v-else>
              <span>{{  formatMoney(scope.row.prepayAmount) }}</span>
            </p>
          </div>
          <div v-else>
            <span>{{ formatMoney(scope.row.prepayAmount) }}</span>
            <br>
            <span v-if="scope.row.paymentProvider === 0"></span>
              <span v-else>{{ getPaymentMethodBookingTransfer(scope.row.paymentProvider) }}</span>
          </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.refund')"
          :min-width="100"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.refunded }}</p>
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
import { getHotelIntroduceSignup } from './api'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
export default {
  name: 'hotelIntroduceSignup',
  components: {
    saSection
  },
  data () {
    return {
      filter: {
        limit: 10,
        page: 1,
        startDate: '',
        endDate: '',
        hotelSn: this.$route.query.hotelSn ? this.$route.query.hotelSn : 0
      },
      direct: 1,
      pagination: {},
      ui: {
        isTableLoading: false
      },
      hotels: [],
      pages: [
        { label: 'number_of_signup', value: 0 },
        { label: 'checkin_by_register', value: 1 }
      ],
      data: []
    }
  },
  computed: {
    dateRange: {
      get () {
        return [this.filter.startDate, this.filter.endDate]
      },
      set (val) {
        this.filter.startDate = val[0]
        this.filter.endDate = val[1]
      }
    }
  },
  created () {
    this.getDataHotelIntroduceSignup()
  },

  methods: {
    async getDataHotelIntroduceSignup () {
      this.ui.isTableLoading = true
      try {
        const { data } = await getHotelIntroduceSignup(this.filter)
        this.data = data.data.userBookingList
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
    getStatus (value) {
      if (!value) {
        return ''
      }
      switch (value) {
        case 0:
          return `${this.$t('option.status.deleted')}`
        case 1:
          return `${this.$t('option.status.active')}`
        case 2:
          return `${this.$t('option.status.expired')}`
        case 3:
          return `${this.$t('option.status.temp')}`
        case 4:
          return `${this.$t('option.status.draft')}`
        case 5:
          return `${this.$t('option.status.wait_confirm')}`
        default:
      };
    }, // getStatus
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
    getPaymentMethodBookingTransfer (paymentMethod) {
      if (!paymentMethod && paymentMethod !== 0) {
        return ''
      }
      switch (paymentMethod) {
        case 0:
          return this.$t('option.paymentsHotel.payHotel')
        case 1:
          return this.$t('option.paymentsHotel.zalo')
        case 2:
          return this.$t('option.paymentsHotel.pos')
        case 3:
          return this.$t('option.paymentsHotel.momo')
        case 10:
          return this.$t('option.paymentsHotel.credit')
        case 11:
          return this.$t('option.paymentsHotel.debit')
        case 20:
          return this.$t('option.paymentsHotel.payoo')
        case 41:
          return this.$t('option.paymentsHotel.creditCardVnpt')
        case 42:
          return this.$t('option.paymentsHotel.atmCardVnpt')
        default:
          return ''
      }
    },
    directPage (value) {
      const query = {
        hotelSn: this.$route.query.hotelSn ? this.$route.query.hotelSn : 0,
        type: 2
      }
      if (value === 0) {
        this.$router.push({ name: 'numberOfSignup', query })
      } else {

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
</style>
