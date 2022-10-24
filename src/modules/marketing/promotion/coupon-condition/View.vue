<template>
  <el-tabs type="border-card" v-model="activeTab" v-loading="ui.isLoading">
    <el-tab-pane name="coupon">
      <!-- condition to use coupon-->
      <el-row>
        <el-col :span="6">
          <p class="coupon-condition-label">
            {{ $t('page.coupon-condition.conditionCoupon') }}
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>{{ $t('page.coupon-condition.justUseCouponAt') }}</p>
        </el-col>
        <el-col :span="18">
          <el-checkbox
            :true-label="1"
            :false-label="0"
            v-model="useCondition.monday"
            :label="$t('daysOfWeek.monday')"
          />
          <el-checkbox
            :true-label="1"
            :false-label="0"
            v-model="useCondition.tuesday"
            :label="$t('daysOfWeek.tuesday')"
          />
          <el-checkbox
            :true-label="1"
            :false-label="0"
            v-model="useCondition.wednesday"
            :label="$t('daysOfWeek.wednesday')"
          />
          <el-checkbox
            :true-label="1"
            :false-label="0"
            v-model="useCondition.thursday"
            :label="$t('daysOfWeek.thursday')"
          />
          <el-checkbox
            :true-label="1"
            :false-label="0"
            v-model="useCondition.friday"
            :label="$t('daysOfWeek.friday')"
          />
          <el-checkbox
            :true-label="1"
            :false-label="0"
            v-model="useCondition.saturday"
            :label="$t('daysOfWeek.saturday')"
          />
          <el-checkbox
            :true-label="1"
            :false-label="0"
            v-model="useCondition.sunday"
            :label="$t('daysOfWeek.sunday')"
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>{{ $t('page.coupon-condition.justUseFor') }}</p>
        </el-col>
        <el-col :span="18">
          <el-select
            class="wd-200"
            v-model="useCondition.numHours"
            element-loading-spinner="el-icon-loading"
            prefix-icon="el-icon-search"
          >
            <el-option
              v-for="(item, index) in ui.selectCategory"
              :key="index"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
          <el-checkbox
            class="mr-12"
            :true-label="1"
            :false-label="0"
            v-model="useCondition.hourly"
            :label="$t('page.coupon-condition.hourly')"
          />
          <el-time-select
            v-model="useCondition.startTime"
            class="wd-150 mr-12"
            :picker-options="{
              start: '00:00',
              step: '01:00',
              end: '23:00'
            }"
            placeholder="start time"
          >
          </el-time-select>
          <el-time-select
            v-model="useCondition.endTime"
            class="wd-150 mr-12"
            :picker-options="{
              start: '00:00',
              step: '01:00',
              end: '23:00'
            }"
            placeholder="end time"
          >
          </el-time-select>
          <el-checkbox
            class="mr-12"
            :true-label="1"
            :false-label="0"
            v-model="useCondition.overnight"
            :label="$t('page.coupon-condition.overnight')"
          />
          <el-select
            class="wd-200"
            v-model="useCondition.numHours"
            element-loading-spinner="el-icon-loading"
            prefix-icon="el-icon-search"
          >
            <el-option
              v-for="(item, index) in ui.selectCategory"
              :key="index"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
          <el-checkbox
            class="mr-12"
            :true-label="1"
            :false-label="0"
            v-model="useCondition.daily"
            :label="$t('page.coupon-condition.daily')"
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>
            {{ $t('page.coupon-condition.hotelMaxOneDay') }}/{{
              $t('page.coupon-condition.maxOneHotel')
            }}
          </p>
        </el-col>
        <el-col :span="18">
          <el-row>
            <el-col :span="5" class="pd-l-0">
              <el-input class="wd-200" v-model="useCondition.maxOneDay" />
            </el-col>
            <el-col :span="5">
              <el-input class="wd-200" v-model="useCondition.maxOneHotel" />
            </el-col>
            <el-col :span="14">
              <p>{{ $t('page.coupon-condition.noLimit') }}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>{{ $t('page.coupon-condition.minBookingMoney') }}</p>
        </el-col>
        <el-col :span="18">
          <el-row>
            <el-col :span="5" class="pd-l-0">
              <el-input class="wd-200" v-model="useCondition.minMoney" />
            </el-col>
            <el-col :span="19" style="margin: auto 0">VND</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>
            {{ $t('page.coupon-condition.paymentWhenUseCoupon') }}
          </p>
        </el-col>
        <el-col :span="18">
          <sa-select-check
            class="select-check"
            v-model="useCondition.paymentMethod"
            :model-check-all="checkAllPaymentMethod"
            label="value"
            keyValue="key"
            :options="ui.checkboxSelectType"
            @changeCheckAll="handleCheckAllPaymentMethod"
            @input="handleCheckedPaymentMethod"
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>{{ $t('page.coupon-condition.couponMemo') }}</p>
        </el-col>
        <el-col :span="18">
          <el-input v-model="useCondition.memo" type="textarea" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>{{ $t('page.coupon-condition.apply') }}</p>
        </el-col>
        <el-col :span="18">
          <p>
            {{ $t('page.coupon-condition.' + useApplyTypeHotel) }}
            <el-link
              @click="goToHotelApply(1)"
            >
              {{ $t('page.coupon-condition.applyToHotel') }}
            </el-link>
          </p>
        </el-col>
      </el-row>
      <!-- issue coupon condition -->
      <el-row>
        <el-col :span="6">
          <p class="coupon-condition-label">
            {{ $t('page.coupon-condition.issueCouponCondition') }}
          </p>
        </el-col>
      </el-row>
      <div v-if="promotionType == 1 || promotionType == 4 || promotionType == 10">
        <el-row>
          <el-col :span="6">
            <p>{{ $t('page.coupon-condition.applyForUser') }}</p>
          </el-col>
          <el-col :span="18">
            <p>
              {{ $t('option.applyUserType.' + applyTypeUser) }}
              <el-link
                @click="goToUserApply(10, 1)"
              >
                {{ $t('page.coupon-condition.applyToUser') }}
              </el-link>
            </p>
          </el-col>
        </el-row>
        <el-row v-if="promotionType == 10">
          <el-col :span="6">
            <p>{{ $t('page.coupon-condition.voucherCodeFor') }}</p>
          </el-col>
          <el-col :span="18">
            <el-select
              class="wd-200"
              v-model="voucherCondition.type"
              element-loading-spinner="el-icon-loading"
              prefix-icon="el-icon-search"
            >
              <el-option
                v-for="(item, index) in ui.selectTypeVoucher"
                :key="index"
                :label="item.key"
                :value="item.value"
              />
            </el-select>
            <el-input
              style="width: 150px"
              class="mr-lr-12"
              :maxlength="12"
              :minlength="6"
              v-if="voucherCondition.type == 2"
              v-model="voucherCondition.code"
            />
            <input
              type="file"
              v-if="voucherCondition.type == 1"
              class="mr-lr-12"
              @input="handleFileUpload"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>{{ $t('page.coupon-condition.couponMemo') }}</p>
          </el-col>
          <el-col :span="18">
            <el-input v-model="couponForUserGroup.content" type="textarea">
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div v-else-if="promotionType == 5">
        <el-row>
          <el-col :span="6">
            <p>{{ $t('page.coupon-condition.justUseCouponAt') }}</p>
          </el-col>
          <el-col :span="18">
            <el-checkbox
              :true-label="1"
              :false-label="0"
              v-model="issueCondition.monday"
              :label="$t('daysOfWeek.monday')"
            />
            <el-checkbox
              :true-label="1"
              :false-label="0"
              v-model="issueCondition.tuesday"
              :label="$t('daysOfWeek.tuesday')"
            />
            <el-checkbox
              :true-label="1"
              :false-label="0"
              v-model="issueCondition.wednesday"
              :label="$t('daysOfWeek.wednesday')"
            />
            <el-checkbox
              :true-label="1"
              :false-label="0"
              v-model="issueCondition.thursday"
              :label="$t('daysOfWeek.thursday')"
            />
            <el-checkbox
              :true-label="1"
              :false-label="0"
              v-model="issueCondition.friday"
              :label="$t('daysOfWeek.friday')"
            />
            <el-checkbox
              :true-label="1"
              :false-label="0"
              v-model="issueCondition.saturday"
              :label="$t('daysOfWeek.saturday')"
            />
            <el-checkbox
              :true-label="1"
              :false-label="0"
              v-model="issueCondition.sunday"
              :label="$t('daysOfWeek.sunday')"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>{{ $t('page.coupon-condition.bookingType') }}</p>
          </el-col>
          <el-col :span="18">
            <el-select
              class="wd-200"
              v-model="issueCondition.numHours"
              element-loading-spinner="el-icon-loading"
              prefix-icon="el-icon-search"
            >
              <el-option
                v-for="(item, index) in ui.selectCategory"
                :key="index"
                :label="item.key"
                :value="item.value"
              />
            </el-select>
            <el-checkbox
              class="mr-12"
              :true-label="1"
              :false-label="0"
              v-model="issueCondition.hourly"
              :label="$t('page.coupon-condition.hourly')"
            />
            <el-time-select
              v-model="issueCondition.hourlyStartTime"
              class="wd-150 mr-12"
              :picker-options="{
                start: '00:00',
                step: '01:00',
                end: '23:00'
              }"
              placeholder="start time"
            >
            </el-time-select>
            <el-time-select
              v-model="issueCondition.hourlyEndTime"
              class="wd-150 mr-12"
              :picker-options="{
                start: '00:00',
                step: '01:00',
                end: '23:00'
              }"
              placeholder="end time"
            >
            </el-time-select>
            <el-checkbox
              class="mr-12"
              :true-label="1"
              :false-label="0"
              v-model="issueCondition.overnight"
              :label="$t('page.coupon-condition.overnight')"
            />
            <el-select
              class="wd-200"
              v-model="issueCondition.numHours"
              element-loading-spinner="el-icon-loading"
              prefix-icon="el-icon-search"
            >
              <el-option
                v-for="(item, index) in ui.selectCategory"
                :key="index"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
            <el-checkbox
              class="mr-12"
              :true-label="1"
              :false-label="0"
              v-model="issueCondition.daily"
              :label="$t('page.coupon-condition.daily')"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>{{ $t('page.coupon-condition.payment') }}</p>
          </el-col>
          <el-col :span="18">
            <el-row>
              <el-col :span="8">
                <el-checkbox
                  :true-label="1"
                  :false-label="0"
                  v-model="issueCondition.payInAdvance"
                  :label="$t('page.coupon-condition.payInAdvance')"
                />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>{{ $t('page.coupon-condition.bookingTime') }}</p>
          </el-col>
          <el-col :span="18" class="pd-l-0">
            <el-time-select
              v-model="issueCondition.startTime"
              class="wd-150 mr-12"
              :picker-options="{
                start: '00:00',
                step: '01:00',
                end: '23:00'
              }"
              placeholder="start time"
            >
            </el-time-select>
            <el-time-select
              v-model="issueCondition.endTime"
              class="wd-150 mr-12"
              :picker-options="{
                start: '00:00',
                step: '01:00',
                end: '23:00'
              }"
              placeholder="end time"
            >
            </el-time-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>{{ $t('page.coupon-condition.name') }}</p>
          </el-col>
          <el-col :span="18">
            <el-select
              class="wd-200"
              v-model="issueCondition.coupon"
              element-loading-spinner="el-icon-loading"
              prefix-icon="el-icon-search"
            >
              <el-option
                v-for="(item, index) in ui.coupon"
                :key="index"
                :label="item.key"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>{{ $t('page.coupon-condition.applyForUser') }}</p>
          </el-col>
          <el-col :span="18">
            <el-select
              class="wd-200"
              v-model="issueCondition.applyToUser"
              element-loading-spinner="el-icon-loading"
              prefix-icon="el-icon-search"
            >
              <el-option
                v-for="(item, index) in ui.applyForUserTypeCoupon"
                :key="index"
                :label="item.key"
                :value="item.value"
              />
            </el-select>
            <el-date-picker
              v-if="issueCondition.applyToUser == 1"
              v-model="issueCondition.signupFrom"
              class="wd-200 mr-lr-12"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            />
            <el-date-picker
              v-if="issueCondition.applyToUser == 1"
              v-model="issueCondition.signupTo"
              class="wd-200 mr-lr-12"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            />
            <el-select
              v-if="
                issueCondition.applyToUser == 2 || issueCondition.applyToUser == 3
              "
              class="wd-200 mr-lr-12"
              v-model="issueCondition.numCheckin"
              element-loading-spinner="el-icon-loading"
              prefix-icon="el-icon-search"
            >
              <el-option
                v-for="(item, index) in 100"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>{{ $t('page.coupon-condition.apply') }}</p>
          </el-col>
          <el-col :span="18">
            <p>
              {{ $t('page.coupon-condition.' + issueApplyTypeHotel) }}
              <el-link
                @click="goToHotelApply(2)"
              >
                {{ $t('page.coupon-condition.applyToHotel') }}
              </el-link>
            </p>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row>
          <el-col :span="6">
            <p>{{ $t('page.coupon-condition.applyForUser') }}</p>
          </el-col>
          <el-col :span="18">
            <el-select
              class="wd-200"
              v-model="issueCondition.applyToUser"
              element-loading-spinner="el-icon-loading"
              prefix-icon="el-icon-search"
            >
              <el-option
                v-for="(item, index) in ui.addUserTypeCoupon"
                :key="index"
                :label="item.key"
                :value="item.value"
              />
            </el-select>
            <el-select
              v-if="
                issueCondition.applyToUser == 2 || issueCondition.applyToUser == 3
              "
              class="wd-200 mr-lr-12"
              v-model="issueCondition.numCheckIn"
              element-loading-spinner="el-icon-loading"
              prefix-icon="el-icon-search"
            >
              <el-option
                v-for="(item, index) in 100"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
            <el-date-picker
              v-if="issueCondition.applyToUser == 1"
              v-model="issueCondition.signupFrom"
              type="date"
              class="wd-200 mr-lr-12"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            />
            <el-date-picker
              v-if="issueCondition.applyToUser == 1"
              v-model="issueCondition.signupTo"
              class="wd-200 mr-lr-12"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            />
          </el-col>
        </el-row>
      </div>
      <div class="dialog-footer float-right">
        <router-link
          class="el-button el-button--default"
          :to="{
            name: 'editPromotion',
            params: { sn: this.$route.params.promotionSn }
          }"
        >
          {{ $t('button.back') }}
        </router-link>
        <el-button type="success" size="large" @click="onCreateCouponCondition">
          <i class="feather icon-save mr-2" />
          {{ $t('button.save') }}
        </el-button>
      </div>
    </el-tab-pane>
    <el-tab-pane
      v-if="useCondition"
      name="hotel-apply-coupon"
    >
      <apply-for-hotel
        :propFilter="statisticsHotel"
        :propData="dataApplyHotel"
        :propPagination="paginationHotel"
        @onChangePage="onChangePageHotel"
        @onCallChangeTab="onCallChangeTabHotel"
        @reloadData="reloadDataHotel"
        @reloadPagination="reloadPaginationHotel"
      />
    </el-tab-pane>
    <el-tab-pane
      v-if="promotionType == 5"
      name="hotel-apply-issue"
    >
      <apply-for-hotel
        :propFilter="statisticsHotel"
        :propData="dataApplyHotel"
        :propPagination="paginationHotel"
        @onChangePage="onChangePageHotel"
        @onCallChangeTab="onCallChangeTabHotel"
        @reloadData="reloadDataHotel"
        @reloadPagination="reloadPaginationHotel"
      />
    </el-tab-pane>
    <el-tab-pane
      v-if="promotionType == 1 || promotionType == 4 || promotionType == 10"
      name="user-apply"
    >
      <apply-for-user
        :propFilter="statisticsUser"
        :propData="dataApplyUser"
        :propPagination="paginationUser"
        @onChangePage="onChangePageUser"
        @onCallChangeTab="onCallChangeTabUser"
        @reloadData="reloadDataUser"
        @reloadPagination="reloadPaginationUser"
      />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import {
  getCouponCondition,
  onCreateCouponCondition,
  onSaveVoucher,
  listHotelApply,
  listUserApply
} from './api'
import SaSelectCheck from '@/components/globals/SaSelectCheck.vue'
import ApplyForHotel from '@/modules/marketing/promotion/apply-for-hotel/View.vue'
import ApplyForUser from '@/modules/marketing/promotion/apply-for-user/View.vue'
import { fetchDistricts } from '@/api/province'
const allPaymentMethod = [0, 10, 11, 20, 3, 60, 41, 42, 50]

export default {
  name: 'CouponCondition',
  components: {
    SaSelectCheck,
    ApplyForHotel,
    ApplyForUser
  },
  data () {
    return {
      activeTab: 'coupon',
      ui: {
        isLoading: false,
        selectCategory: [
          { name: ' ', value: 0 },
          { name: '1', value: 1 },
          { name: '2', value: 2 },
          { name: '3', value: 3 },
          { name: '4', value: 4 }
        ],
        checkboxSelectType: [
          {
            key: this.$t('page.coupon-condition.payHotel'),
            value: 0
          },
          {
            key: this.$t('page.coupon-condition.credit'),
            value: 10
          },
          {
            key: this.$t('page.coupon-condition.debit'),
            value: 11
          },
          {
            key: this.$t('page.coupon-condition.payoo'),
            value: 20
          },
          {
            key: this.$t('page.coupon-condition.momo'),
            value: 3
          },
          {
            key: this.$t('page.coupon-condition.zaloPay'),
            value: 60
          },
          {
            key: this.$t('page.coupon-condition.creditCardVnpt'),
            value: 41
          },
          {
            key: this.$t('page.coupon-condition.atmCardVnpt'),
            value: 42
          },
          {
            key: this.$t('page.coupon-condition.shopeePay'),
            value: 50
          }
        ],
        selectTypeVoucher: [
          { key: this.$t('page.coupon-condition.privateCode'), value: 1 },
          { key: this.$t('page.coupon-condition.commonCode'), value: 2 }
        ],
        coupon: [
          { key: this.$t('page.coupon-condition.both'), value: 0 },
          { key: this.$t('page.coupon-condition.notUse'), value: 1 },
          { key: this.$t('page.coupon-condition.use'), value: 2 }
        ],
        applyForUserTypeCoupon: [
          { key: ' ', value: 0 },
          { key: this.$t('page.coupon-condition.signUpPeriod'), value: 1 },
          { key: this.$t('page.coupon-condition.numCheckIn'), value: 2 },
          { key: this.$t('page.coupon-condition.numCheckInKs'), value: 3 }
        ],
        addUserTypeCoupon: [
          { key: ' ', value: 0 },
          { key: this.$t('page.coupon-condition.signUpPeriod'), value: 1 },
          { key: this.$t('page.coupon-condition.numCheckIn'), value: 2 }
        ]
      },
      useCondition: {
        memo: ' ',
        arrCheckbox: [],
        hourly: 0,
        startTime: ' ',
        endTime: ' ',
        overnight: 0,
        daily: 0,
        sunday: 0,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        maxOneDay: 0,
        maxOneHotel: 0,
        numHours: 0,
        numDays: 0,
        minMoney: 0
      },
      issueCondition: {
        hourly: 0,
        hourlyStartTime: ' ',
        hourlyEndTime: ' ',
        startTime: ' ',
        endTime: ' ',
        overnight: 0,
        daily: 0,
        payInAdvance: 0,
        sunday: 0,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        coupon: 0,
        applyToUser: 0,
        signupFrom: this.formatDate(new Date(Date)),
        signupTo: this.formatDate(new Date(Date)),
        numCheckin: 0,
        voucherCode: 0
      },
      couponForUserGroup: {
        type: 1,
        typeDetail: 0,
        numCheckin: 0,
        startDate: ' ',
        endDate: ' ',
        content: ' ',
        userSnList: ' '
      },
      voucherCondition: {},
      promotionType: 1,
      checkAllPaymentMethod: false,
      statisticsHotel: {},
      dataApplyHotel: [],
      paginationHotel: {},
      statisticsUser: {},
      dataApplyUser: [],
      paginationUser: {}
    }
  },
  computed: {
    userApplyQuery () {
      if (
        this.promotionType === 1 ||
        this.promotionType === 4 ||
        this.promotionType === 10
      ) {
        const filter = {
          applyTarget: this.couponForUserGroup.type,
          typeDetail: this.couponForUserGroup.typeDetail
        }
        if (this.couponForUserGroup.typeDetail === 3) {
          filter.numCheckIn = this.couponForUserGroup.numCheckin
        } else if (this.couponForUserGroup.typeDetail === 4) {
          filter.startDate = this.formatDate(
            this.couponForUserGroup.startDate,
            false
          )
          filter.endDate = this.formatDate(
            this.couponForUserGroup.endDate,
            false
          )
        }
        return filter
      } else {
        return {
          applyTarget: this.issueCondition.applyTarget
        }
      }
    },
    applyTypeUser () {
      switch (this.couponForUserGroup.type) {
        case 1:
          return 'applyAllUser'
        case 2:
          return 'applyAllUserExcept'
        case 3:
          return 'onlyApply'
        default:
          return 'applyAllUser'
      }
    },
    useApplyTypeHotel () {
      switch (this.useCondition.applyTarget) {
        case 1:
          return 'applyAllHotel'
        case 2:
          return 'applyAllHotelExcept'
        case 3:
          return 'onlyApply'
        default:
          return 'applyAllHotel'
      }
    },
    issueApplyTypeHotel () {
      switch (this.issueCondition.applyTarget) {
        case 1:
          return 'applyAllHotel'
        case 2:
          return 'applyAllHotelExcept'
        case 3:
          return 'onlyApply'
        default:
          return 'applyAllHotel'
      }
    }
  },
  created () {
    this.getCouponCondition()
  },
  methods: {
    async getCouponCondition () {
      this.ui.isLoading = true
      try {
        const { data } = await getCouponCondition(this.$route.params.couponSn)
        if (data.code === 1) {
          this.useCondition = data.data.useCondition // data Condition to use coupon
          this.issueCondition = data.data.issueCondition // data issue coupon condition
          this.couponForUserGroup = data.data.couponForUserGroup // with type: apply, gift and voucer code
          this.promotionType = data.data.promotionType
          this.checkAllPaymentMethod = this.useCondition.paymentMethod.length === this.ui.checkboxSelectType.length
          if (data.data.promotionType === 10) {
            this.voucherCondition = data.data.voucherCondition
          }
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    async goToHotelApply (type, limit = 10, page = 1) {
      this.ui.isLoading = true
      try {
        const { data } = await listHotelApply(
          this.$route.params.couponSn,
          {
            limit: limit,
            page: page,
            type: type
          }
        )
        this.activeTab = type === 1 ? 'hotel-apply-coupon' : 'hotel-apply-issue'
        this.$delete(data.data.statistics, 'promotionGroupSn')
        this.statisticsHotel = data.data.statistics
        this.statisticsHotel = { ...this.statisticsHotel, type: type, limit: limit, page: page }
        this.paginationHotel = data.data.meta
        this.dataApplyHotel = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    async goToUserApply (limit = 10, page = 1) {
      this.ui.isLoading = true
      try {
        const { data } = await listUserApply(
          this.$route.params.couponSn,
          {
            limit: limit,
            page: page
          }
        )
        this.activeTab = 'user-apply'
        this.statisticsUser = data.data.statistics
        this.dataApplyUser = data.data.users
        this.paginationUser = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    async listDistricts () {
      this.ui.loadingDistrict = true
      try {
        this.districts = [{ name: this.$t('page.collection.all'), sn: -1 }]
        if (this.filter.province !== -1) {
          const { data } = await fetchDistricts({
            limit: 100,
            status: 1,
            provinceSn: this.filter.provinceSn
          })
          this.districts = [...this.districts, ...data.data.districts]
        }
      } catch (error) {
        return false
      } finally {
        this.ui.loadingDistrict = false
      }
    },
    async onCreateCouponCondition () {
      try {
        this.ui.isLoading = true
        let dataJson = {}
        if (this.promotionType === 1 || this.promotionType === 4) {
          dataJson = {
            useCondition: this.useCondition,
            couponForUserGroup: this.couponForUserGroup
          }
        } else {
          dataJson = {
            useCondition: this.useCondition,
            issueCondition: this.issueCondition
          }
        }
        const { data } = await onCreateCouponCondition(
          this.$route.params.couponSn,
          dataJson
        )
        if (data.code === 1) {
          this.promotionType === 10 && this.saveVoucherCode()
          this.promotionType !== 10 && this.onDirectCouponCondition()
        }
      } catch (error) {
        return false
      }
    },
    async saveVoucherCode () {
      try {
        const formData = new FormData()
        formData.append('type', this.voucherCondition.type)
        if (this.voucherCondition.type === 2) {
          formData.append('code', this.voucherCondition.code)
        }
        if (this.voucherCondition.type === 1) {
          formData.append('file', this.voucherCondition.file)
        }

        const { data } = await onSaveVoucher(
          this.$route.params.couponSn,
          formData
        )
        if (data.code === 1) {
          this.onDirectCouponCondition()
        }
      } catch (error) {
        return false
      }
    },
    onDirectCouponCondition () {
      this.$message({
        type: 'success',
        message: this.$t('message.success')
      })
      this.ui.isLoading = true
      this.$router.push({
        name: 'promotionDetails',
        params: {
          promotionSn: this.$route.params.promotionSn,
          couponSn: this.$route.params.couponSn
        },
        query: { sendOption: true }
      })
    },
    onCallChangeTabHotel (applyTarget, type) {
      switch (type) {
        case 1:
          this.useCondition.applyTarget = applyTarget
          break
        case 2:
          this.issueCondition.applyTarget = applyTarget
          break
      }
      this.activeTab = 'coupon'
    },
    onCallChangeTabUser (type) {
      this.couponForUserGroup.type = type
      this.activeTab = 'coupon'
    },
    reloadDataHotel (val) {
      this.dataApplyHotel = val
    },
    reloadDataUser (val) {
      this.dataApplyUser = val
    },
    reloadPaginationHotel (val) {
      this.paginationHotel = val
    },
    reloadPaginationUser (val) {
      this.paginationUser = val
    },
    onChangePageHotel (arg) {
      this.goToHotelApply(arg.type, arg.limit, arg.page)
    },
    onChangePageUser (arg) {
      this.goToUserApply(arg.limit, arg.page)
    },
    handleFileUpload (e) {
      this.voucherCondition.file = e.target.files[0]
    },
    handleCheckAllPaymentMethod (val) {
      this.checkAllPaymentMethod = val
      this.useCondition.paymentMethod = val ? allPaymentMethod : []
    },
    handleCheckedPaymentMethod (val) {
      this.checkAllPaymentMethod = val.length === this.ui.checkboxSelectType.length
    },
    getApplyTypeHotel (type) {
      switch (type) {
        case 1:
          return 'applyAllHotel'
        case 2:
          return 'applyAllHotelExcept'
        case 3:
          return 'onlyApply'
        default:
          return 'applyAllHotel'
      }
    }
  }
}
</script>
<style lang="scss">
.float-right {
  float: right;
}
.wd-200 {
  width: 200px;
}
.wd-150 {
  width: 150px;
}
.mr-12 {
  margin: 12px 8px;
}
.mr-lr-12 {
  margin: 0 8px;
}
.pd-l-0 {
  padding-left: 0px;
}
.coupon-condition-label {
  font-size: 19px;
  font-weight: bold;
  color: blue;
}
.el-tabs__header{
  display: none;
}
</style>
