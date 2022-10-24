<template>
  <el-tabs type="border-card" v-loading="ui.isLoading" class="promotion-detail" v-model="activeTab">
    <el-tab-pane name="detail-promotion">
      <div class="align-end">
        <el-button
          v-if="$route.query.sendOption"
          type="warning"
          @click="onSendRequest"
          plain
        >
          {{ $t('button.sendRequest') }}
        </el-button>
        <router-link
          :to="{ name: 'promotion' }"
          class="el-button el-button--default"
        >
          {{ $t('button.list') }}
        </router-link>
        <router-link
          :to="{
            name: 'createNotification',
            params: { targetSn: $route.params.sn },
            query: { argetType: 2 }
          }"
          class="el-button el-button--success is-plain"
        >
          {{ $t('button.sent') }}
        </router-link>
        <router-link
          v-if="$route.query.sendOption"
          :to="{
            name: 'editPromotion',
            params: { promotionSn: $route.params.sn }
          }"
          class="el-button el-button--primary is-plain"
        >
          {{ $t('button.backTo') }}
        </router-link>
      </div>
      <el-row class="is-flex">
        <el-col :span="6" class="background custom-col-6">
          <p>{{ $t('page.promotion.promotionGroup') }}</p>
        </el-col>
        <el-col :span="18" class="border-bottom">
          <div>
            <span
              v-for="(item, index) in promotion.listPromotionGroup"
              :key="index"
            >
              <span
                v-if="
                  index !=
                  Object.keys(promotion.listPromotionGroup).length - 1
                "
                >{{ item.title }},
              </span>
              <span v-else>{{ item.title }}</span>
            </span>
          </div>
        </el-col>
      </el-row>
      <!-- promotion group -->
      <el-row class="is-flex">
        <el-col :span="13" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="11" class="background">
              <p>{{ $t('page.promotion.title') }}</p>
            </el-col>
            <el-col :span="13">
              <p>{{ promotion.title }}</p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="11" class="background">
              <p>{{ $t('page.promotion.totalHotelApplied') }}</p>
            </el-col>
            <el-col :span="13">
              <p>
                <span>
                  {{ promotion.totalHotelApplied }}
                </span>
                /
                <span>
                  {{ promotion.totalApplyHotel }}
                </span>
              </p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- title & total hotel applied -->
      <el-row class="is-flex">
        <el-col :span="13" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="11" class="background">
              <p>{{ $t('page.promotion.code') }}</p>
            </el-col>
            <el-col :span="13">
              <p>{{ promotion.code }}</p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="11" class="background">
              <p>{{ $t('page.promotion.totalUserApplied') }}</p>
            </el-col>
            <el-col :span="13">
              <p>{{ promotion.totalUserApplied }}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- code & total user applied -->
      <el-row class="is-flex">
        <el-col :span="13" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="11" class="background">
              <p>
                {{ $t('page.promotion.type') }}/{{
                  $t('page.promotion.numOfCoupon')
                }}/{{ $t('page.promotion.maxNumOfCoupon') }}
              </p>
            </el-col>
            <el-col :span="13">
              <p>
                {{
                  getType(promotion.type) +
                  ' / ' +
                  promotion.numOfCoupon +
                  ' / ' +
                  promotion.maxNumCoupon
                }}
              </p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="11" class="background">
              <p>{{ $t('page.promotion.totalCouponApplied') }}</p>
            </el-col>
            <el-col :span="13">
              <p>{{ promotion.totalCouponIssued }}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- type/num and max num coupon & total coupon applied -->
      <el-row class="is-flex">
        <el-col :span="13" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="11" class="background">
              <p>{{ $t('page.promotion.applyStartEnd') }}</p>
            </el-col>
            <el-col :span="13">
              <p>{{ promotion.applyStart + ' ~ ' + promotion.applyEnd }}</p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="11" class="background">
              <p>{{ $t('page.promotion.totalConsumedCoupon') }}</p>
            </el-col>
            <el-col :span="13">
              <p>{{ promotion.totalConsumedCoupon }}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- apply start ~ end & total consumed coupon -->
      <el-row class="is-flex">
        <el-col :span="13" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="11" class="background">
              <p>{{ $t('page.promotion.couponStartEnd') }}</p>
            </el-col>
            <el-col :span="13">
              <p v-if="promotion.numActiveDay > 0">
                {{
                  promotion.numActiveDay +
                  ` ${this.$t('page.promotion.couponContent')}`
                }}
              </p>
              <p v-else>
                {{ promotion.couponStart + ' ~ ' + promotion.couponEnd }}
              </p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="11" class="background">
              <p>{{ $t('page.promotion.totalGo2joyDiscount') }}</p>
            </el-col>
            <el-col :span="13">
              <p>{{ promotion.totalGo2joyDiscount }}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- coupon start ~ end & total go2joy discount -->
      <el-row class="is-flex">
        <el-col :span="13" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="11" class="background">
              <p>
                {{ $t('page.promotion.go2joyDiscount') }}/{{
                  $t('page.promotion.hotelDiscount')
                }}/{{ $t('page.promotion.sponsorDiscount') }}
              </p>
            </el-col>
            <el-col :span="13">
              <p
                v-if="
                  promotion.discountType == 3 || promotion.discountType == 4
                "
              >
                {{ getTypeDiscount(promotion.discountType) }}
              </p>
              <p v-else>
                <span v-if="promotion.discountType == 5">
                  {{ formatMoney(promotion.discount) }}
                  <span class="bold">VND</span>
                </span>
                {{ promotion.go2joyDiscount }}
                <span
                  class="bold"
                  v-if="
                    promotion.discountType == 2 || promotion.discountType == 5
                  "
                >
                  %
                </span>
                /
                {{ promotion.hotelDiscount }}
                <span
                  class="bold"
                  v-if="
                    promotion.discountType == 2 || promotion.discountType == 5
                  "
                >
                  %
                </span>
                /
                {{ promotion.sponsorDiscount }}
                <span
                  class="bold"
                  v-if="
                    promotion.discountType == 2 || promotion.discountType == 5
                  "
                >
                  %
                </span>
              </p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="11" class="background">
              <p>{{ $t('page.promotion.totalHotelDiscount') }}</p>
            </el-col>
            <el-col :span="13">
              <p>{{ promotion.totalHotelDiscount }}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- go2joy/hotel/sponsor discount & total hotel discount -->
      <el-row class="is-flex">
        <el-col :span="13" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="11" class="background">
              <p>{{ $t('page.promotion.status') }}</p>
            </el-col>
            <el-col :span="13">
              <p>{{ getStatus(promotion.status) }}</p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="11" class="background">
              <p>{{ $t('page.promotion.totalSponsorDiscount') }}</p>
            </el-col>
            <el-col :span="13">
              <p>{{ promotion.totalSponsorDiscount }}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- status & total sponsor discount -->
      <el-row class="is-flex">
        <el-col :span="13" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="11" class="background">
              <p>{{ $t('page.promotion.discount') }}</p>
            </el-col>
            <el-col :span="13">
              <p
                v-if="
                  promotion.discountType == 3 ||
                  promotion.discountType == 4 ||
                  promotion.discountType == 5
                "
              >
                {{ getTypeDiscount(promotion.discountType) }}
              </p>
              <p v-else>
                {{ promotion.discount }}
                <span v-if="promotion.discountType == 2"
                  ><b class="bold">%</b> ({{ promotion.maxDiscount }})</span
                >
              </p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="11" class="background">
              <p>{{ $t('page.promotion.totalDiscount') }}</p>
            </el-col>
            <el-col :span="13">
              <p>{{ promotion.totalDiscount }}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- discount & total discount -->
      <el-row class="is-flex">
        <el-col :span="13" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="11" class="background">
              <p>{{ $t('page.promotion.lastUpdate') }}</p>
            </el-col>
            <el-col :span="13">
              <p>
                {{
                  `${
                    promotion.lastStaffName == null
                      ? ''
                      : promotion.lastStaffName
                  }` +
                  ' ' +
                  formatDate(promotion.lastUpdate)
                }}
              </p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="11" class="background">
              <p>{{ $t('page.promotion.createTime') }}</p>
            </el-col>
            <el-col :span="13">
              <p>{{ formatDate(promotion.createTime) }}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- last update & create time -->
      <el-row>
        <el-col :span="24" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="6" class="background custom-col-6">
              <p>{{ $t('page.coupon-condition.name') }}</p>
            </el-col>
            <el-col :span="18" class="border-top set-padding-t-b">
              <el-row>
                <el-col :span="5">
                  <p class="bold">
                    {{ $t('page.coupon-condition.conditionToUseCoupon') }}
                  </p>
                </el-col>
                <el-col :span="19">
                  <span
                    v-for="value in getDaysOfWeek(promotion.useCondition)"
                    v-bind:key="value"
                    style="float: left"
                  >
                    {{ $t('daysOfWeek.' + value) }}&nbsp;&nbsp;&nbsp;
                  </span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <p class="bold">
                    {{ $t('page.coupon-condition.justUseFor') }}
                  </p>
                </el-col>
                <el-col :span="19">
                  <p
                    v-for="(value, index) in getJustForUse(
                      promotion.useCondition
                    )"
                    v-bind:key="value"
                    style="float: left"
                  >
                    {{ $t(value) }}&nbsp;
                    <span
                      v-if="
                        (promotion.useCondition.startTime ||
                          promotion.useCondition.endTime) &&
                        index == 0
                      "
                    >
                      {{
                        `${promotion.useCondition.startTime} ~ ${promotion.useCondition.endTime}`
                      }}
                    </span>
                    <span v-if="promotion.useCondition.numHours && index == 0">
                      {{ `(${promotion.useCondition.numHours}h)` }}
                    </span>
                    &nbsp;&nbsp;&nbsp;
                  </p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <p class="bold">
                    {{ $t('page.coupon-condition.maxCouponPerDay') }}
                  </p>
                </el-col>
                <el-col :span="7">
                  <p v-if="promotion.useCondition">
                    {{ promotion.useCondition.maxOneDay }}
                  </p>
                </el-col>
                <el-col :span="5">
                  <p class="bold">
                    {{ $t('page.coupon-condition.maxCouponPerHotel') }}
                  </p>
                </el-col>
                <el-col :span="4" v-if="promotion.useCondition">
                  <p>{{ promotion.useCondition.maxOneHotel }}</p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <p class="bold">
                    {{ $t('page.coupon-condition.minBookingMoney') }}
                  </p>
                </el-col>
                <el-col :span="19" v-if="promotion.useCondition">
                  <p>{{ formatMoney(promotion.useCondition.minMoney) }} VND</p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <p class="bold">
                    {{ $t('page.coupon-condition.paymentWhenUseCoupon') }}
                  </p>
                </el-col>
                <el-col :span="19" v-if="promotion.useCondition">
                  <p
                    v-for="value in getPayment(
                      promotion.useCondition.paymentMethod
                    )"
                    v-bind:key="value"
                    style="float: left"
                  >
                    {{ $t('payment.' + value) }}, &nbsp;
                  </p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <p class="bold">
                    {{ $t('page.coupon-condition.couponMemo') }}
                  </p>
                </el-col>
                <el-col :span="19">
                  <p v-if="promotion.useCondition">
                    {{ promotion.useCondition.memo }}
                  </p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <p class="bold">
                    {{ $t('page.coupon-condition.apply') }}
                  </p>
                </el-col>
                <el-col :span="19">
                  <p v-if="promotion.useCondition">
                    {{
                      $t(getApplyTypeHotel(promotion.useCondition.applyTarget))
                    }}
                    <el-link
                      v-if="promotion.useCondition.applyTarget != 1"
                      @click="goToHotelApply(10, 1)"
                      style="margin: 8px"
                    >
                      {{ $t('page.coupon-condition.applyToHotel') }}
                    </el-link>
                  </p>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- coupon -->
      <el-row>
        <el-col :span="24" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="6" class="background custom-col-6">
              <p>
                {{ $t('page.issue-coupon-condition.name') }}
              </p>
            </el-col>
            <el-col
              :span="18"
              class="border-top set-padding-t-b"
              v-if="
                promotion.type == 1 ||
                promotion.type == 4 ||
                promotion.type == 10
              "
            >
              <el-row>
                <el-col :span="5">
                  <p class="bold">
                    {{ $t('page.issue-coupon-condition.apply') }}
                  </p>
                </el-col>
                <el-col :span="19">
                  <p v-if="promotion.couponForUserGroup">
                    {{
                      $t(getApplyTypeUser(promotion.couponForUserGroup.type))
                    }}
                    <span v-if="promotion.couponForUserGroup.typeDetail == 4">
                      ({{ $t('page.coupon-condition.signUpPeriod') }}:
                      {{
                        this.formatDate(
                          promotion.couponForUserGroup.startDate,
                          false
                        )
                      }}
                      ~
                      {{
                        this.formatDate(
                          promotion.couponForUserGroup.endDate,
                          false
                        )
                      }})
                    </span>
                    <span v-if="promotion.couponForUserGroup.typeDetail == 3">
                      ({{ $t('page.coupon-condition.numCheckIn') }}:
                      {{ promotion.couponForUserGroup.numCheckin }})
                    </span>
                    <span v-if="promotion.couponForUserGroup.typeDetail == 2">
                      ( Excel File:
                      <a
                        :href="`${promotion.couponForUserGroup.filePath}`"
                        target="_blank"
                        class="custom-link-color"
                      >
                        {{ promotion.couponForUserGroup.fileName }}
                      </a>
                      )
                    </span>
                  </p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5" v-if="promotion.type == 10">
                  <p class="bold">
                    {{ $t('page.coupon-condition.voucherCodeFor') }}
                  </p>
                </el-col>
                <el-col :span="19" v-if="promotion.type == 10">
                  <p v-if="promotion.voucherCondition.type == 2">
                    {{ $t('page.voucherCodeType.commonCode') }} :
                    {{ promotion.voucherCondition.code }}
                  </p>
                  <p v-else>
                    {{ $t('page.voucherCodeType.privateCode') }} :
                    <a
                      :href="`${promotion.voucherCondition.filePath}`"
                      target="_blank"
                      class="custom-link-color"
                    >
                      {{ promotion.voucherCondition.fileName }}
                    </a>
                  </p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <p class="bold">
                    {{ $t('page.issue-coupon-condition.memo') }}
                  </p>
                </el-col>
                <el-col :span="19">
                  <p>{{ promotion.couponForUserGroup.content }}</p>
                </el-col>
              </el-row>
            </el-col>
            <el-col
              :span="18"
              class="border-top set-padding-t-b"
              v-else-if="promotion.type == 5"
            >
              <el-row>
                <el-col :span="5">
                  <p class="bold">
                    {{ $t('page.coupon-condition.justUseFor') }}
                  </p>
                </el-col>
                <el-col :span="19">
                  <p
                    v-for="(value, index) in getJustForUse(
                      promotion.issueCondition
                    )"
                    v-bind:key="value"
                    style="float: left"
                  >
                    {{ $t(value) }}&nbsp;
                    <span
                      v-if="
                        (promotion.issueCondition.hourlyStartTime ||
                          promotion.issueCondition.hourlyEndTime) &&
                        index == 0
                      "
                    >
                      {{ promotion.issueCondition.hourlyStartTime }} ~
                      {{ promotion.issueCondition.hourlyEndTime }}
                    </span>
                    &nbsp;&nbsp;&nbsp;
                  </p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <p class="bold">
                    {{ $t('page.coupon-condition.conditionToUseCoupon') }}
                  </p>
                </el-col>
                <el-col :span="19">
                  <p
                    v-for="value in getDaysOfWeek(promotion.issueCondition)"
                    v-bind:key="value"
                    style="float: left"
                  >
                    {{ $t('daysOfWeek.' + value) }}&nbsp;&nbsp;&nbsp;
                  </p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <p class="bold">
                    {{ $t('page.coupon-condition.bookingTime') }}
                  </p>
                </el-col>
                <el-col :span="19">
                  <el-row class="is-flex">
                    <el-col :span="4">
                      <p v-if="promotion.issueCondition.startTime">
                        {{ promotion.issueCondition.startTime }}
                        {{
                          promotion.issueCondition.endTime
                            ? '~' + promotion.issueCondition.endTime
                            : ''
                        }}
                      </p>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <p class="bold">
                    {{ $t('page.coupon-condition.name') }}
                  </p>
                </el-col>
                <el-col :span="19">
                  <p v-if="promotion.issueCondition">
                    {{ getCoupon(promotion.issueCondition.coupon) }}
                  </p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <p
                    class="bold"
                    v-if="
                      promotion.issueCondition &&
                      promotion.issueCondition.applyToUser == 1
                    "
                  >
                    {{ $t('page.issue-coupon-condition.signUpPeriod') }}
                  </p>
                  <p
                    class="bold"
                    v-if="
                      promotion.issueCondition &&
                      promotion.issueCondition.applyToUser == 2
                    "
                  >
                    {{ $t('page.issue-coupon-condition.numCheckIn') }}
                  </p>
                  <p
                    class="bold"
                    v-if="
                      promotion.issueCondition &&
                      promotion.issueCondition.applyToUser == 3
                    "
                  >
                    {{ $t('page.issue-coupon-condition.numCheckInKs') }}
                  </p>
                </el-col>
                <el-col :span="19">
                  <p
                    v-if="
                      promotion.issueCondition &&
                      promotion.issueCondition.applyToUser == 1
                    "
                  >
                    {{ promotion.issueCondition.signupFrom }}
                    {{
                      promotion.issueCondition.signupTo
                        ? ' ~ ' + promotion.issueCondition.signupTo
                        : ' ~ 0'
                    }}
                  </p>
                  <p
                    v-if="
                      promotion.issueCondition &&
                      (promotion.issueCondition.applyToUser == 2 ||
                        promotion.issueCondition.applyToUser == 3)
                    "
                  >
                    {{ promotion.issueCondition.numCheckin }}
                  </p>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="18" class="border-top set-padding-t-b" v-else>
              <el-row>
                <el-col :span="5">
                  <p
                    class="bold"
                    v-if="
                      promotion.issueCondition &&
                      promotion.issueCondition.applyToUser == 1
                    "
                  >
                    {{ $t('page.issue-coupon-condition.signUpPeriod') }}
                  </p>
                  <p
                    class="bold"
                    v-if="
                      promotion.issueCondition &&
                      promotion.issueCondition.applyToUser == 2
                    "
                  >
                    {{ $t('page.issue-coupon-condition.numCheckIn') }}
                  </p>
                  <p
                    class="bold"
                    v-if="
                      promotion.issueCondition &&
                      promotion.issueCondition.applyToUser == 3
                    "
                  >
                    {{ $t('page.issue-coupon-condition.numCheckInKs') }}
                  </p>
                </el-col>
                <el-col :span="19">
                  <p
                    v-if="
                      promotion.issueCondition &&
                      promotion.issueCondition.applyToUser == 1
                    "
                  >
                    {{ promotion.issueCondition.signupFrom }}
                    {{
                      promotion.issueCondition.signupTo
                        ? ' ~ ' + promotion.issueCondition.signupTo
                        : ' ~ 0'
                    }}
                  </p>
                  <p
                    v-if="
                      promotion.issueCondition &&
                      (promotion.issueCondition.applyToUser == 2 ||
                        promotion.issueCondition.applyToUser == 3)
                    "
                  >
                    {{ promotion.issueCondition.numCheckin }}
                  </p>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- issue -->
      <el-row>
        <el-row class="is-flex">
          <el-col :span="6" class="background custom-col-6">
            <p>{{ $t('page.promotion.roomApplyList') }}</p>
          </el-col>
          <el-col
            :span="18"
            class="border-top set-padding-t-b"
            v-if="promotion.roomTypeList && promotion.roomTypeList.length > 0"
          >
            <el-col
              :span="3"
              style="padding: 6px 12px"
              v-for="(room, index) in promotion.roomTypeList"
              :key="index"
            >
              <p>
                <i class="el-icon-success" aria-hidden="true" /> {{ room }}
              </p>
            </el-col>
          </el-col>
          <el-col :span="18" class="border-top" v-else>
            <p>
              <i class="el-icon-success" aria-hidden="true" />
              {{ $t('page.promotion.normalRoom') }}
            </p>
          </el-col>
        </el-row>
      </el-row>
      <!-- room apply list -->
      <el-row class="is-flex">
        <el-col :span="6" class="background custom-col-6">
          <p>{{ $t('page.promotion.contentVn') }}</p>
        </el-col>
        <el-col :span="18" class="border-top" v-html="promotion.content">
        </el-col>
      </el-row>
      <!-- content vn -->
      <el-row class="is-flex">
        <el-col :span="6" class="background custom-col-6">
          <p>{{ $t('page.promotion.contentEn') }}</p>
        </el-col>
        <el-col :span="18" class="border-top" v-html="promotion.contentEn">
        </el-col>
      </el-row>
      <!-- content en -->
      <el-row class="is-flex">
        <el-col :span="6" class="background custom-col-6">
          <p>{{ $t('page.promotion.content2') }}</p>
        </el-col>
        <el-col :span="18" class="border-top set-padding-t-b">
          <div
            class="col-md-12 none-padding-right"
            style="padding: 6px 12px"
            v-html="promotion.content2"
          >
          </div>
        </el-col>
      </el-row>
      <!-- content 2 -->
      <el-row class="is-flex">
        <el-col :span="6" class="background custom-col-6">
          <p>{{ $t('page.promotion.memo') }}</p>
        </el-col>
        <el-col :span="18" class="border-top border-bottom" v-html="promotion.memo">
        </el-col>
      </el-row>
      <!-- memo -->
      <el-row class="is-flex">
        <el-col :span="13" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="11" class="background">
              <p>{{ $t('page.promotion.imageOfList') }}</p>
            </el-col>
            <el-col :span="13">
              <div id="preview">
                <img v-if="imgSrc && imgSrc[0]" :src="imgSrc[0]" />
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11" class="set-padding-0">
          <el-row class="is-flex">
            <el-col :span="11" class="background">
              <p>{{ $t('page.promotion.imageOfDetail') }}</p>
            </el-col>
            <el-col :span="13">
              <div id="preview">
                <img :src="imgSrc[1]" />
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- image list $ detail page image -->
    </el-tab-pane>
    <el-tab-pane
      name="hotel-apply-coupon"
    >
      <apply-for-hotel
        :propFilter="statisticsHotel"
        :propData="dataApplyHotel"
        :propPagination="paginationHotel"
        @onCallChangeTab="onCallChangeTabHotel"
        @onChangePage="onChangePageHotel"
        @reloadData="reloadDataHotel"
        @reloadPagination="reloadPaginationHotel"
      />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { getPromotion, listHotelApply } from './api'
import { onSendRequest } from '@/api/activities'
import ApplyForHotel from '@/modules/marketing/promotion/apply-for-hotel/View.vue'

export default {
  name: 'PromotionDetails',
  components: {
    ApplyForHotel
  },
  data () {
    return {
      ui: {
        isLoading: false
      },
      promotion: {},
      imgSrc: [],
      activeTab: 'detail-promotion',
      statisticsHotel: {},
      dataApplyHotel: [],
      paginationHotel: {}
    }
  },
  created () {
    this.getPromotion()
  },
  methods: {
    async getPromotion () {
      this.ui.isLoading = true
      try {
        const { data } = await getPromotion(this.$route.params.promotionSn)
        if (data.code === 1) {
          this.promotion = data.data
          this.promotion.imageList.map((value) => {
            this.imgSrc.push(process.env.VUE_APP_IMAGES_URL + value.imagePath)
          })
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    async goToHotelApply (limit = 10, page = 1) {
      this.ui.isLoading = true
      try {
        const { data } = await listHotelApply(
          this.promotion.couponSn,
          {
            limit: limit,
            page: page,
            type: 1
          }
        )
        this.activeTab = 'hotel-apply-coupon'
        this.$delete(data.data.statistics, 'promotionGroupSn')
        this.statisticsHotel = data.data.statistics
        this.statisticsHotel = { ...this.statisticsHotel, type: 1, limit: limit, page: page }
        this.paginationHotel = data.data.meta
        this.dataApplyHotel = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    reloadDataHotel (val) {
      this.dataApplyHotel = val
    },
    reloadPaginationHotel (val) {
      this.paginationHotel = val
    },
    onChangePageHotel (arg) {
      this.goToHotelApply(arg.limit, arg.page)
    },
    onCallChangeTabHotel (applyTarget, type) {
      this.promotion.useCondition.applyTarget = applyTarget
      this.activeTab = 'detail-promotion'
    },
    onReturnList () {
      this.$router.push({ name: 'promotion' })
    },
    onReturnSend () {
      return this.$router.push({
        name: 'createNotification',
        params: { sn: this.$route.params.sn }
      })
    },
    onBackToEdit () {
      this.$router.push({
        name: 'editPromotion',
        params: { sn: this.$route.params.sn, type: 'edit' }
      })
    },
    async onSendRequest () {
      try {
        const formData = new FormData()
        formData.append('targetSn', this.$route.params.promotionSn)
        formData.append('type', 1)
        const { data } = await onSendRequest(formData)
        if (data.code === 1) {
          this.$router.push({
            name: 'promotion'
          })
        }
      } catch (error) {
        return false
      }
    },
    getStatus (value) {
      if (value) {
        switch (value) {
          case 0:
            return this.$t('option.status.deleted')
          case 1:
            return this.$t('option.status.active')
          case 2:
            return this.$t('option.status.expired')
          case 3:
            return this.$t('option.status.temp')
          case 4:
            return this.$t('option.status.draft')
          case 5:
            return this.$t('option.status.waitConfirm')
          default:
            return ''
        }
      }
    },
    getType (value) {
      if (value) {
        switch (value) {
          case 0:
            return this.$t('page.promotion.all')
          case 1:
            return this.$t('page.promotion.apply')
          case 2:
            return this.$t('page.promotion.event')
          case 3:
            return this.$t('page.promotion.inviteFriend')
          case 4:
            return this.$t('page.promotion.gift')
          case 5:
            return this.$t('page.promotion.booking')
          case 6:
            return this.$t('page.promotion.reportNewHotel')
          case 7:
            return this.$t('page.promotion.signUp')
          case 8:
            return this.$t('page.promotion.birthday')
          case 9:
            return this.$t('page.promotion.payment')
          case 10:
            return this.$t('page.promotion.voucherCode')
          default:
            return ''
        }
      }
    },
    getDaysOfWeek (obj) {
      if (obj) {
        const arrDaysOfWeek = []
        for (const property in obj) {
          switch (property) {
            case 'monday':
              if (obj[property] === 1) arrDaysOfWeek.push('monday')
              break
            case 'tuesday':
              if (obj[property] === 1) arrDaysOfWeek.push('tuesday')
              break
            case 'wednesday':
              if (obj[property] === 1) arrDaysOfWeek.push('wednesday')
              break
            case 'thursday':
              if (obj[property] === 1) arrDaysOfWeek.push('thursday')
              break
            case 'friday':
              if (obj[property] === 1) arrDaysOfWeek.push('friday')
              break
            case 'saturday':
              if (obj[property] === 1) arrDaysOfWeek.push('saturday')
              break
            case 'sunday':
              if (obj[property] === 1) arrDaysOfWeek.push('sunday')
              break
          }
        }
        return arrDaysOfWeek
      }
    },
    getCoupon (type) {
      switch (type) {
        case 0:
          return this.$t('page.coupon-condition.both')
        case 1:
          return this.$t('page.coupon-condition.notUse')
        case 2:
          return this.$t('page.coupon-condition.use')
      }
    },
    getPayment (obj) {
      if (obj) {
        const arrPayment = []
        obj.forEach((value, index) => {
          switch (value) {
            case 0:
              arrPayment.push('payHotel')
              break
            case 10:
              arrPayment.push('credit')
              break
            case 11:
              arrPayment.push('debit')
              break
            case 20:
              arrPayment.push('payoo')
              break
            case 3:
              arrPayment.push('momo')
              break
            case 60:
              arrPayment.push('zalo')
              break
            case 41:
              arrPayment.push('creditCardVnpt')
              break
            case 42:
              arrPayment.push('atmCardVnpt')
              break
            case 50:
              arrPayment.push('shopeePay')
              break
          }
        })
        return arrPayment
      }
    },
    getTypeDiscount (val) {
      switch (val) {
        case 3:
          return this.$t('option.discountType.gift')
        case 4:
          return this.$t('option.discountType.discountHours')
        case 5:
          return this.$t('option.discountType.samePrice')
      }
    },
    getApplyTypeUser (type) {
      switch (type) {
        case 1:
          return 'option.applyUserType.applyAllUser'
        case 2:
          return 'option.applyUserType.applyAllUserExcept'
        case 3:
          return 'option.applyUserType.onlyApply'
      }
    },
    getApplyTypeHotel (type) {
      switch (type) {
        case 1:
          return 'option.applyHotelType.applyAllHotel'
        case 2:
          return 'option.applyHotelType.applyAllHotelExcept'
        case 3:
          return 'option.applyHotelType.onlyApply'
      }
    },
    getJustForUse (obj) {
      if (obj) {
        const arrJustForUse = []
        for (const property in obj) {
          switch (property) {
            case 'hourly':
              if (obj[property] === 1) arrJustForUse.push('hours')
              break
            case 'overnight':
              if (obj[property] === 1) arrJustForUse.push('overnight')
              break
            case 'daily':
              if (obj[property] === 1) arrJustForUse.push('daily')
              break
          }
        }
        return arrJustForUse
      }
    }
  }
}
</script>
<style lang="scss">
.promotion-detail {
  padding: 8px;
  .promotion-detail__operation {
    display: block;
  }
  .background {
    background-color: #f0f0f0;
  }
  .set-padding-0 {
    padding: 0;
  }
  .set-padding-t-b {
    padding: 10px 0;
  }
  .border-top {
    border-top: 1px solid #ccc;
  }
  .border-bottom {
    border-bottom: 1px solid #ccc;
  }
  .bold-span {
    span {
      font-weight: bold;
    }
  }
  .custom-col-6 {
    width: 24.9%;
  }
  .is-flex {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    [class*='el-col-'] {
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
    }
  }
  .el-tabs__header{
    display: none;
  }
  .el-tabs__content {
    padding: 10px 0;
  }
  .align-end {
    text-align: end;
  }
}
</style>
