<template>
  <sa-section class="search-booking">
    <template slot="header">
      <div>
        <el-select
          v-model="filter.type"
          @change="changeType"
        >
          <el-option
            v-for="item in ui.types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input
          v-if="filter.type === 0"
          v-model="filter.bookingNo"
          :placeholder="$t('page.bookingReport.booking_no_placeholder')"
          clearable
          prefix-icon="el-icon-search"
          style="width: 250px; margin-left: 16px;"
          @input="handleSearchBookingDetails"
        />
      </div>
    </template>
    <el-table
      v-loading="ui.loadingBookingDetails"
      :data="bookingDetails"
    >
      <el-table-column
        type="index"
        label="#"
      />
      <el-table-column
        prop="hotelName"
        :label="$t('page.bookingReport.hotel_name')"
        min-width="100"
      />
      <el-table-column
        prop="hotelCode"
        :label="$t('page.bookingReport.code')"
        min-width="60"
      />
      <el-table-column
        :label="$t('page.bookingReport.booking_no')"
        min-width="50"
      >
        <template slot-scope="scope">
          <p>
            <router-link
              :to="`/hotel/sadmin/booking-detail/${scope.row.userBookingSn}`"
            >
              {{ scope.row.bookingNo }}
            </router-link>
            <img
              v-if="scope.row.bookingStatus === 2 && scope.row.infoTransfer"
              :src="ui.dangerSrc"
              alt="go2jot_danger"
              style="width: 15px; height: 15px;"
            >
          </p>
          <p>{{ formatDate(scope.row.createTime) }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.bookingReport.device_type')"
        min-width="50"
      >
        <template slot-scope="scope">
          {{ scope.row.deviceType === 1 ? 'App' : 'Web' }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="50"
        :label="$t('page.bookingReport.user_info')"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'usersDetails', params: { sn: scope.row.appUserSn } }">
            {{ scope.row.appUserNickName }}
          </router-link>
          <p>
            {{ scope.row.mobile }}
          </p>
          <p>
            <img v-if="scope.row.giftDescription" :src="ui.giftboxSrc" alt="giftbox">
          </p>
          <p>
            <img v-if="scope.row.bonusHour > 0" :src="ui.clockSrc" alt="clock">
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.bookingReport.room_type')"
        min-width="80"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'detailRoomType', params: { sn: scope.row.roomTypeSn } }">
            {{ scope.row.roomTypeName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.bookingReport.booking_type')"
        min-width="50"
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
        :label="$t('page.bookingReport.stay_at_hotel_time')"
        min-width="60"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.checkInDatePlan }}</p>
          <p v-if="scope.row.type === 1">
            {{ formatTime(scope.row.startTime) }} <span v-if="scope.row.endTime">~ {{ formatTime(scope.row.endTime) }} </span>
          </p>
          <p v-else-if="scope.row.type === 3">
            {{ scope.row.endDate }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.bookingReport.booking_status')"
        min-width="50"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.bookingStatus === 1">
            {{ $t('page.bookingReport.confirmed') }}
          </div>
          <div v-else-if="scope.row.bookingStatus === 2">
            {{ $t("page.bookingReport.check_in") }}:
            <b class="text-danger">
              {{ setViaObject(scope.row.viaObject) }}
            </b>
            <p>
              {{ formatDate(scope.row.checkInTime) }}
            </p>
          </div>
          <div v-else-if="scope.row.bookingStatus === 3">
            {{ $t("page.bookingReport.cancel") }}:
            <b class="text-danger">
              {{ setViaObject(scope.row.viaObject) }}
            </b>
            <p>
              {{ formatDate(scope.row.checkInTime) }}
            </p>
          </div>
          <div v-else-if="scope.row.bookingStatus === 4">
            {{ $t("page.bookingReport.no_show") }}:
            <b v-if="scope.row.viaObject === 5" class="text-danger">
              L
            </b>
            <p>
              {{ formatDate(scope.row.checkInTime) }}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        min-width="50"
        :label="$t('page.bookingReport.room_amount')"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.roomTypeAmount) }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="50"
        :label="$t('page.bookingReport.product_amount')"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.productValue) }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="50"
        :label="$t('page.bookingReport.total_promotion')"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.totalAmount) }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="50"
        :label="$t('page.bookingReport.go2j_promotion')"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.totalGo2joyDiscount) }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="50"
        :label="$t('page.bookingReport.hotel_promotion')"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.totalHotelDiscount) }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="50"
        :label="$t('page.bookingReport.user_pay')"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.amountFromUser) }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="50"
        :label="$t('page.bookingReport.paid_in_advance')"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.refunded > 0">
            <p class="text-danger">
              <del>{{ formatMoney(scope.row.prepayAmount) }}</del>
            </p>
            <p v-if="scope.row.prepayAmount > 0">
              ({{ setPaymentProvider(scope.row.paymentProvider) }})
            </p>
          </div>
          <div v-else-if="scope.row.refunded === 0">
            <p v-if="scope.row.prepayAmount > 0">
              {{ formatMoney(scope.row.prepayAmount) }}
            </p>
            <p>
              ({{ setPaymentProvider(scope.row.paymentProvider) }})
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        min-width="30"
        :label="$t('page.userMgt.operations')"
        align="center"
      >
        <template slot-scope="scope">
          <el-popover
            placement="left"
            trigger="click"
          >
            <i slot="reference" class="operations el-icon-more" />
            <div style="padding: 8px 12px;">
              <el-button
                type="success"
                plain
                size="small"
                icon="el-icon-edit"
                @click="onDirectEdit(scope.row.sn)"
              >
                {{ $t('button.edit') }}
              </el-button>
              <el-button
                type="danger"
                plain
                size="small"
                icon="el-icon-delete"
                @click="deleteUser(scope.row.sn)"
              >
                {{ $t('button.delete') }}
              </el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <template
      slot="footer"
      class="search-booking__footer"
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
import { fetchBookingDetail } from './api'
import SaSection from '@/components/globals/SaSection.vue'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
export default {
  name: 'SearchByBookingNo',
  components: { SaSection },
  data: (vm) => {
    return {
      bookingDetails: [],
      ui: {
        types: [
          { label: vm.$t('page.bookingReport.booking_no_placeholder'), value: 0 },
          { label: vm.$t('page.bookingReport.canceled_booking'), value: 1 }
        ],
        dangerSrc: require('@/assets/images/svg/danger.png'),
        giftboxSrc: require('@/assets/images/svg/gifts.svg'),
        clockSrc: require('@/assets/images/svg/clock.svg'),
        loadingBookingDetails: false
      },
      pagination: {},
      filter: {
        limit: 10,
        page: 1,
        type: 0,
        bookingNo: ''
      }
    }
  },
  created () {
    this.filter.type = Number(this.$route.query.type) || 0
    this.fetchBookingDetails()
  },
  methods: {
    setViaObject (value) {
      switch (value) {
        case 2:
          return 'H'
        case 3:
          return 'G'
        case 4:
          return 'HL'
        case 5:
          return 'L'
        default:
          return ''
      }
    },
    setPaymentProvider (value) {
      switch (value) {
        case 1:
          return this.$t('payment.zalo')
        case 2:
          return this.$t('payment.pos')
        case 3:
          return this.$t('payment.momo')
        case 10:
          return this.$t('payment.credit')
        case 11:
          return this.$t('payment.debit')
        case 20:
          return this.$t('payment.payoo')
        case 60:
          return this.$t('payment.zalo')
        case 41:
          return this.$t('payment.creditCardVnpt')
        case 42:
          return this.$t('payment.atmCardVnpt')
        default:
          return ''
      }
    },
    changeType () {
      this.$router.push({ name: 'searchByBookingNo', query: { type: this.filter.type } })
    },
    handleSearchBookingDetails: debounce(function () {
      this.fetchBookingDetails()
    }, timeDebounce),
    async fetchBookingDetails () {
      this.ui.loadingBookingDetails = true
      try {
        const { data } = await fetchBookingDetail(this.filter)
        this.bookingDetails = data.data.bookingDetails
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loadingBookingDetails = false
      }
    },
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchBookingDetails()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchBookingDetails()
    }
  }
}
</script>
<style lang="scss" scoped>
.search-booking {
  &__footer {
    margin-top: 30px;
  }
}
.text-danger {
  color: red;
}
</style>
