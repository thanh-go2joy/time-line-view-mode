<template>
<sa-section>
  <div class="tracking-booking-block" v-loading="ui.isLoading">
    <div class="tracking-booking-block__date-search">
      <div class="is-text" >
        <p style="width:85px">{{ $t('page.bookingTracking.dateFrom') }}</p>
      </div>
      <div class="is-change-date">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          popper-class="custom-date-range"
          range-separator="-"
          :start-placeholder="$t('page.hotelStatusTracking.startDate')"
          :end-placeholder="$t('page.hotelStatusTracking.endDate')"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :clearable="false"
        />
      </div>
      <el-button type="primary" class="el-button mr-2 el-button--primary" @click="searchTracking()"><i class="el-icon-search"></i> search</el-button>
      <div class="tracking-booking-block__policy">
      <div class="style-cicle-question">
        <div class="tooltip" style="opacity: 1; z-index: 1009">
          <span class="question-cicle-i"
            > <i class="el-icon-question"></i></span>
          <div class="tooltiptext">
            <div class="row" style="display:flex">
              <div class="col-sm-6">
                <div class="custom-title-tag-div">
                  Accumulation: The accumulation of the hotel status changed
                </div>
                <div class="custom-margin-left-70">
                  <b>xx</b> <b class="custom-text-color-green">(+yy)</b>: The
                  accumulation of the hotel status changed from in the past to
                  end date
                </div>
                <div class="custom-margin-left-70">
                  <b>xx</b>: The accumulation of the hotel status changed from
                  in the past to start date
                </div>
                <div class="custom-margin-left-70">
                  <span class="custom-text-color-green"
                    ><b>+yy</b>: Total of the number of hotel added in this
                    hotel status according to the period time</span
                  >
                </div>
              </div>
              <div class="col-sm-6">
                <div class="custom-title-tag-div">
                  Actual Amount: The actual amount of the hotel status changed
                </div>
                <div class="custom-margin-left-70">
                  <b>xx</b> (<b class="custom-text-color-green">+yy</b
                  >/<b>-zz</b>): The actual amount of the hotel status changed
                  according to end date
                </div>
                <div class="custom-margin-left-70">
                  <b>xx</b>: The actual amount of the hotel status changed
                  according to start date
                </div>
                <div class="custom-margin-left-70">
                  <span class="custom-text-color-green"
                    ><b>+yy</b>: Total of the number of hotel added in this
                    hotel status according to the period time</span
                  >
                </div>
                <div class="custom-margin-left-70">
                  <span class="custom-text-color-red"
                    ><b>-zz</b>: Total of the number of hotel removed in this
                    hotel status according to the period time</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>

    <div class="tracking-booking-block__content-table">
      <!-- Start row -->
      <div v-if="region">
        <div class="content-table">
          <!-- START HEADER -->
          <div class="style-top" style="width: 100%; margin-top: -40px">
            <!-- START HEADER -->
            <div>
              <aside
                class="post-sidebar"
                style="
                  z-index: 1004;
                  padding-top: 60px;
                  left: auto !important;
                  width: 100% !important;
                  top: 0px;
                "
              >
                <div class="post-sidebar-inner">
                  <div class="pos_abs-hotel-status">
                    <button
                      type="button"
                      style="font-size: 20px"
                      class="btn btn-area btn-total-hotel-status"
                    >
                      {{ $t("page.hotelStatusTracking.region") }}
                    </button>
                  </div>
                  <!-- Start Vùng-->
                  <div
                    id="tracking-hotel-scroll-first"
                    style="overflow-x: auto; overflow: hidden"
                  >
                    <div class="pd-width-hotel-status">
                      <div class="scroll-table">
                        <table class="avoid-clicks body-status-tracking">
                          <tbody>
                            <tr>
                              <td
                                class="text-center-tracking custom-size-w-300"
                                colspan="2"
                              >
                                {{ $t("page.hotelStatusTracking.total1234") }}
                              </td>
                              <td
                                class="text-center-tracking custom-size-w-300"
                                colspan="2"
                              >
                                {{ $t("page.hotelStatusTracking.waiting") }}
                              </td>
                              <td
                                class="text-center-tracking custom-size-w-300"
                                colspan="2"
                              >
                                {{ $t("page.hotelStatusTracking.contracted") }}
                              </td>
                              <td
                                class="text-center-tracking custom-size-w-300"
                                colspan="2"
                              >
                                {{ $t("page.hotelStatusTracking.suspended") }}
                              </td>
                              <td
                                class="text-center-tracking custom-size-w-300"
                                colspan="2"
                              >
                                {{ $t("page.hotelStatusTracking.terminated") }}
                              </td>
                              <td
                                class="text-center-tracking custom-size-w-300"
                                colspan="2"
                              >
                                {{ $t("page.hotelStatusTracking.displayed") }}
                              </td>
                              <td
                                class="text-center-tracking custom-size-w-300"
                                colspan="2"
                              >
                                {{ $t("page.hotelStatusTracking.trial") }}
                              </td>
                            </tr>
                            <tr>
                              <td class="custom-size-w-150">
                                {{
                                  $t("page.hotelStatusTracking.accumulation")
                                }}
                              </td>
                              <td class="custom-size-w-150">
                                {{
                                  $t("page.hotelStatusTracking.actual_amount")
                                }}
                              </td>
                              <td class="custom-size-w-150">
                                {{
                                  $t("page.hotelStatusTracking.accumulation")
                                }}
                              </td>
                              <td class="custom-size-w-150">
                                {{
                                  $t("page.hotelStatusTracking.actual_amount")
                                }}
                              </td>
                              <td class="custom-size-w-150">
                                {{
                                  $t("page.hotelStatusTracking.accumulation")
                                }}
                              </td>
                              <td class="custom-size-w-150">
                                {{
                                  $t("page.hotelStatusTracking.actual_amount")
                                }}
                              </td>
                              <td class="custom-size-w-150">
                                {{
                                  $t("page.hotelStatusTracking.accumulation")
                                }}
                              </td>
                              <td class="custom-size-w-150">
                                {{
                                  $t("page.hotelStatusTracking.actual_amount")
                                }}
                              </td>
                              <td class="custom-size-w-150">
                                {{
                                  $t("page.hotelStatusTracking.accumulation")
                                }}
                              </td>
                              <td class="custom-size-w-150">
                                {{
                                  $t("page.hotelStatusTracking.actual_amount")
                                }}
                              </td>
                              <td class="custom-size-w-150">
                                {{
                                  $t("page.hotelStatusTracking.accumulation")
                                }}
                              </td>
                              <td class="custom-size-w-150">
                                {{
                                  $t("page.hotelStatusTracking.actual_amount")
                                }}
                              </td>
                              <td class="custom-size-w-150">
                                {{
                                  $t("page.hotelStatusTracking.accumulation")
                                }}
                              </td>
                              <td class="custom-size-w-150">
                                {{
                                  $t("page.hotelStatusTracking.actual_amount")
                                }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <!-- End Vùng-->

                    <!-- Start Tổng công-->
                    <div style="width: 100%">
                      <div class="pos_abs-hotel-status">
                        <button
                          type="button"
                          style="font-size: 18px; width: 160px; height: 80px"
                          class="btn_action tbn-child btn btn-blue"
                        >
                          <span v-if="getLocalize === 'vi'">{{
                            region.name
                          }}</span>
                          <span v-else>{{ region.nameEn }}</span>
                        </button>
                        <button
                          type="button"
                          style="
                            font-size: 11px;
                            height: 40px;
                            width: 120px;
                            pointer-events: none;
                          "
                          class="tbn-child btn"
                        >
                          {{ $t("page.hotelStatusTracking.start_date") }}
                        </button>
                        <button
                          type="button"
                          style="
                            font-size: 11px;
                            height: 40px;
                            width: 120px;
                            pointer-events: none;
                          "
                          class="tbn-child btn"
                        >
                          {{ dateRange[0] }}
                        </button>
                        <button
                          type="button"
                          style="
                            font-size: 11px;
                            height: 40px;
                            width: 120px;
                            pointer-events: none;
                          "
                          class="tbn-child btn"
                        >
                          {{ $t("page.hotelStatusTracking.end_date") }}
                        </button>
                        <button
                          type="button"
                          style="
                            font-size: 11px;
                            height: 40px;
                            width: 120px;
                            pointer-events: none;
                          "
                          class="tbn-child btn"
                        >
                          {{ dateRange[1] }}
                        </button>
                      </div>
                      <div class="pd-width-hotel-status">
                        <div class="scroll-table">
                          <table class="avoid-clicks body-status-tracking">
                            <tbody>
                              <tr>
                                <!-- totalMain-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.totalMain.accumulationStartDate
                                  }}</span>
                                </td>
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.totalMain.actualAmountStartDate
                                  }}</span>
                                </td>
                                <!-- waiting-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.waiting.accumulationStartDate
                                  }}</span>
                                </td>
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.waiting.actualAmountStartDate
                                  }}</span>
                                </td>
                                <!-- contracted-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.contracted.accumulationStartDate
                                  }}</span>
                                </td>
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.contracted.actualAmountStartDate
                                  }}</span>
                                </td>
                                <!-- suspended-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.suspended.accumulationStartDate
                                  }}</span>
                                </td>
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.suspended.actualAmountStartDate
                                  }}</span>
                                </td>
                                <!-- terminated-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.terminated.accumulationStartDate
                                  }}</span>
                                </td>
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.terminated.actualAmountStartDate
                                  }}</span>
                                </td>
                                <!-- displayed-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.displayed.accumulationStartDate
                                  }}</span>
                                </td>
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.displayed.actualAmountStartDate
                                  }}</span>
                                </td>
                                <!-- trial-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.trial.accumulationStartDate
                                  }}</span>
                                </td>
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.trial.actualAmountStartDate
                                  }}</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div class="pd-width-hotel-status">
                        <div class="scroll-table">
                          <table class="avoid-clicks body-status-tracking">
                            <tbody>
                              <tr>
                                <!-- totalMain-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.totalMain.accumulationEndDate
                                  }}</span>
                                  (
                                  <span class="custom-text-color-green">
                                    <span
                                      class="export-data"
                                      @click="
                                        exportDataRow(
                                          region.trackingSn,
                                          region.trackingType,
                                          0,
                                          6
                                        )
                                      "
                                      v-if="
                                        region.totalMain
                                          .accumulationEndDatePlus > 0
                                      "
                                    >
                                      +{{
                                        region.totalMain.accumulationEndDatePlus
                                      }}</span
                                    >
                                    <span v-else>
                                      {{
                                        region.totalMain.accumulationEndDatePlus
                                      }}</span
                                    >
                                  </span>
                                  )
                                </td>
                                <td class="custom-size-w-150">
                                  <span
                                    >{{ region.totalMain.actualAmountEndDate }}
                                  </span>
                                  (
                                  <span
                                    v-if="
                                      region.totalMain.actualAmountEndDatePlus >
                                      0
                                    "
                                  >
                                    <span
                                      class="
                                        custom-text-color-green
                                        export-data
                                      "
                                      @click="
                                        exportDataRow(
                                          region.trackingSn,
                                          region.trackingType,
                                          0,
                                          7
                                        )
                                      "
                                      >+{{
                                        region.totalMain.actualAmountEndDatePlus
                                      }}
                                    </span>
                                  </span>
                                  <span v-else>
                                    {{
                                      region.totalMain.actualAmountEndDatePlus
                                    }}
                                  </span>
                                  /
                                  <span class="custom-text-color-red">
                                    <span
                                      v-if="
                                        region.totalMain
                                          .actualAmountEndDateMinus > 0
                                      "
                                    >
                                      <span
                                        class="export-data"
                                        @click="
                                          exportDataRow(
                                            region.trackingSn,
                                            region.trackingType,
                                            0,
                                            5
                                          )
                                        "
                                        >-{{
                                          region.totalMain
                                            .actualAmountEndDateMinus
                                        }}
                                      </span>
                                    </span>
                                    <span v-else>
                                      {{
                                        region.totalMain
                                          .actualAmountEndDateMinus
                                      }}
                                    </span>
                                  </span>
                                  )
                                </td>
                                <!-- waiting-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.waiting.accumulationEndDate
                                  }}</span>
                                  (
                                  <span class="custom-text-color-green">
                                    <span
                                      class="export-data"
                                      @click="
                                        exportDataRow(
                                          region.trackingSn,
                                          region.trackingType,
                                          1,
                                          6
                                        )
                                      "
                                      v-if="
                                        region.waiting.accumulationEndDatePlus >
                                        0
                                      "
                                    >
                                      +{{
                                        region.waiting.accumulationEndDatePlus
                                      }}</span
                                    >
                                    <span v-else>
                                      {{
                                        region.waiting.accumulationEndDatePlus
                                      }}</span
                                    >
                                  </span>
                                  )
                                </td>
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.waiting.actualAmountEndDate
                                  }}</span>
                                  (
                                  <span
                                    v-if="
                                      region.waiting.actualAmountEndDatePlus > 0
                                    "
                                  >
                                    <span
                                      class="
                                        custom-text-color-green
                                        export-data
                                      "
                                      @click="
                                        exportDataRow(
                                          region.trackingSn,
                                          region.trackingType,
                                          1,
                                          7
                                        )
                                      "
                                      >+{{
                                        region.waiting.actualAmountEndDatePlus
                                      }}
                                    </span>
                                  </span>
                                  <span v-else>
                                    {{ region.waiting.actualAmountEndDatePlus }}
                                  </span>
                                  /
                                  <span class="custom-text-color-red">
                                    <span
                                      v-if="
                                        region.waiting
                                          .actualAmountEndDateMinus > 0
                                      "
                                    >
                                      <span
                                        class="export-data"
                                        @click="
                                          exportDataRow(
                                            region.trackingSn,
                                            region.trackingType,
                                            1,
                                            5
                                          )
                                        "
                                        >-{{
                                          region.waiting
                                            .actualAmountEndDateMinus
                                        }}
                                      </span>
                                    </span>
                                    <span v-else>
                                      {{
                                        region.waiting.actualAmountEndDateMinus
                                      }}
                                    </span>
                                  </span>
                                  )
                                </td>
                                <!-- contracted-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.contracted.accumulationEndDate
                                  }}</span>
                                  (
                                  <span class="custom-text-color-green">
                                    <span
                                      class="export-data"
                                      @click="
                                        exportDataRow(
                                          region.trackingSn,
                                          region.trackingType,
                                          3,
                                          6
                                        )
                                      "
                                      v-if="
                                        region.contracted
                                          .accumulationEndDatePlus > 0
                                      "
                                    >
                                      +{{
                                        region.contracted
                                          .accumulationEndDatePlus
                                      }}</span
                                    >
                                    <span v-else>
                                      {{
                                        region.contracted
                                          .accumulationEndDatePlus
                                      }}</span
                                    >
                                  </span>
                                  )
                                </td>
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.contracted.actualAmountEndDate
                                  }}</span>
                                  (
                                  <span
                                    v-if="
                                      region.contracted
                                        .actualAmountEndDatePlus > 0
                                    "
                                  >
                                    <span
                                      class="
                                        custom-text-color-green
                                        export-data
                                      "
                                      @click="
                                        exportDataRow(
                                          region.trackingSn,
                                          region.trackingType,
                                          3,
                                          7
                                        )
                                      "
                                      >+{{
                                        region.contracted
                                          .actualAmountEndDatePlus
                                      }}
                                    </span>
                                  </span>
                                  <span v-else>
                                    {{
                                      region.contracted.actualAmountEndDatePlus
                                    }}
                                  </span>
                                  /
                                  <span class="custom-text-color-red">
                                    <span
                                      v-if="
                                        region.contracted
                                          .actualAmountEndDateMinus > 0
                                      "
                                    >
                                      <span
                                        class="export-data"
                                        @click="
                                          exportDataRow(
                                            region.trackingSn,
                                            region.trackingType,
                                            3,
                                            5
                                          )
                                        "
                                        >-{{
                                          region.contracted
                                            .actualAmountEndDateMinus
                                        }}
                                      </span>
                                    </span>
                                    <span v-else>
                                      {{
                                        region.contracted
                                          .actualAmountEndDateMinus
                                      }}
                                    </span>
                                  </span>
                                  )
                                </td>
                                <!-- suspended-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.suspended.accumulationEndDate
                                  }}</span>
                                  (
                                  <span class="custom-text-color-green">
                                    <span
                                      class="export-data"
                                      @click="
                                        exportDataRow(
                                          region.trackingSn,
                                          region.trackingType,
                                          6,
                                          6
                                        )
                                      "
                                      v-if="
                                        region.suspended
                                          .accumulationEndDatePlus > 0
                                      "
                                    >
                                      +{{
                                        region.suspended.accumulationEndDatePlus
                                      }}</span
                                    >
                                    <span v-else>
                                      {{
                                        region.suspended.accumulationEndDatePlus
                                      }}</span
                                    >
                                  </span>
                                  )
                                </td>
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.suspended.actualAmountEndDate
                                  }}</span>
                                  (
                                  <span
                                    v-if="
                                      region.suspended.actualAmountEndDatePlus >
                                      0
                                    "
                                  >
                                    <span
                                      class="
                                        custom-text-color-green
                                        export-data
                                      "
                                      @click="
                                        exportDataRow(
                                          region.trackingSn,
                                          region.trackingType,
                                          6,
                                          7
                                        )
                                      "
                                      >+{{
                                        region.suspended.actualAmountEndDatePlus
                                      }}
                                    </span>
                                  </span>
                                  <span v-else>
                                    {{
                                      region.suspended.actualAmountEndDatePlus
                                    }}
                                  </span>
                                  /
                                  <span class="custom-text-color-red">
                                    <span
                                      v-if="
                                        region.suspended
                                          .actualAmountEndDateMinus > 0
                                      "
                                    >
                                      <span
                                        class="export-data"
                                        @click="
                                          exportDataRow(
                                            region.trackingSn,
                                            region.trackingType,
                                            6,
                                            5
                                          )
                                        "
                                        >-{{
                                          region.suspended
                                            .actualAmountEndDateMinus
                                        }}
                                      </span>
                                    </span>
                                    <span v-else>
                                      {{
                                        region.suspended
                                          .actualAmountEndDateMinus
                                      }}
                                    </span>
                                  </span>
                                  )
                                </td>
                                <!-- terminated-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.terminated.accumulationEndDate
                                  }}</span>
                                  (
                                  <span class="custom-text-color-green">
                                    <span
                                      class="export-data"
                                      @click="
                                        exportDataRow(
                                          region.trackingSn,
                                          region.trackingType,
                                          5,
                                          6
                                        )
                                      "
                                      v-if="
                                        region.terminated
                                          .accumulationEndDatePlus > 0
                                      "
                                    >
                                      +{{
                                        region.terminated
                                          .accumulationEndDatePlus
                                      }}</span
                                    >
                                    <span v-else>
                                      {{
                                        region.terminated
                                          .accumulationEndDatePlus
                                      }}</span
                                    >
                                  </span>
                                  )
                                </td>
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.terminated.actualAmountEndDate
                                  }}</span>
                                  (
                                  <span
                                    v-if="
                                      region.terminated
                                        .actualAmountEndDatePlus > 0
                                    "
                                  >
                                    <span
                                      class="
                                        custom-text-color-green
                                        export-data
                                      "
                                      @click="
                                        exportDataRow(
                                          region.trackingSn,
                                          region.trackingType,
                                          5,
                                          7
                                        )
                                      "
                                      >+{{
                                        region.terminated
                                          .actualAmountEndDatePlus
                                      }}
                                    </span>
                                  </span>
                                  <span v-else>
                                    {{
                                      region.terminated.actualAmountEndDatePlus
                                    }}
                                  </span>
                                  /
                                  <span class="custom-text-color-red">
                                    <span
                                      v-if="
                                        region.terminated
                                          .actualAmountEndDateMinus > 0
                                      "
                                    >
                                      <span
                                        class="export-data"
                                        @click="
                                          exportDataRow(
                                            region.trackingSn,
                                            region.trackingType,
                                            5,
                                            5
                                          )
                                        "
                                        >-{{
                                          region.terminated
                                            .actualAmountEndDateMinus
                                        }}
                                      </span>
                                    </span>
                                    <span v-else>
                                      {{
                                        region.terminated
                                          .actualAmountEndDateMinus
                                      }}
                                    </span>
                                  </span>
                                  )
                                </td>
                                <!-- displayed-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.displayed.accumulationEndDate
                                  }}</span>
                                  (
                                  <span class="custom-text-color-green">
                                    <span
                                      class="export-data"
                                      @click="
                                        exportDataRow(
                                          region.trackingSn,
                                          region.trackingType,
                                          2,
                                          6
                                        )
                                      "
                                      v-if="
                                        region.displayed
                                          .accumulationEndDatePlus > 0
                                      "
                                    >
                                      +{{
                                        region.displayed.accumulationEndDatePlus
                                      }}</span
                                    >
                                    <span v-else>
                                      {{
                                        region.displayed.accumulationEndDatePlus
                                      }}</span
                                    >
                                  </span>
                                  )
                                </td>
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.displayed.actualAmountEndDate
                                  }}</span>
                                  (
                                  <span
                                    v-if="
                                      region.displayed.actualAmountEndDatePlus >
                                      0
                                    "
                                  >
                                    <span
                                      class="
                                        custom-text-color-green
                                        export-data
                                      "
                                      @click="
                                        exportDataRow(
                                          region.trackingSn,
                                          region.trackingType,
                                          2,
                                          7
                                        )
                                      "
                                      >+{{
                                        region.displayed.actualAmountEndDatePlus
                                      }}
                                    </span>
                                  </span>
                                  <span v-else>
                                    {{
                                      region.displayed.actualAmountEndDatePlus
                                    }}
                                  </span>
                                  /
                                  <span class="custom-text-color-red">
                                    <span
                                      v-if="
                                        region.displayed
                                          .actualAmountEndDateMinus > 0
                                      "
                                    >
                                      <span
                                        class="export-data"
                                        @click="
                                          exportDataRow(
                                            region.trackingSn,
                                            region.trackingType,
                                            2,
                                            5
                                          )
                                        "
                                        >-{{
                                          region.displayed
                                            .actualAmountEndDateMinus
                                        }}
                                      </span>
                                    </span>
                                    <span v-else>
                                      {{
                                        region.displayed
                                          .actualAmountEndDateMinus
                                      }}
                                    </span>
                                  </span>
                                  )
                                </td>
                                <!-- trial-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.trial.accumulationEndDate
                                  }}</span>
                                  (
                                  <span class="custom-text-color-green">
                                    <span
                                      class="export-data"
                                      @click="
                                        exportDataRow(
                                          region.trackingSn,
                                          region.trackingType,
                                          4,
                                          6
                                        )
                                      "
                                      v-if="
                                        region.trial.accumulationEndDatePlus > 0
                                      "
                                    >
                                      +{{
                                        region.trial.accumulationEndDatePlus
                                      }}</span
                                    >
                                    <span v-else>
                                      {{
                                        region.trial.accumulationEndDatePlus
                                      }}</span
                                    >
                                  </span>
                                  )
                                </td>
                                <td class="custom-size-w-150">
                                  <span>{{
                                    region.trial.actualAmountEndDate
                                  }}</span>
                                  (
                                  <span
                                    v-if="
                                      region.trial.actualAmountEndDatePlus > 0
                                    "
                                  >
                                    <span
                                      class="
                                        custom-text-color-green
                                        export-data
                                      "
                                      @click="
                                        exportDataRow(
                                          region.trackingSn,
                                          region.trackingType,
                                          4,
                                          7
                                        )
                                      "
                                      >+{{
                                        region.trial.actualAmountEndDatePlus
                                      }}
                                    </span>
                                  </span>
                                  <span v-else>
                                    {{ region.trial.actualAmountEndDatePlus }}
                                  </span>
                                  /
                                  <span class="custom-text-color-red">
                                    <span
                                      v-if="
                                        region.trial.actualAmountEndDateMinus >
                                        0
                                      "
                                    >
                                      <span
                                        class="export-data"
                                        @click="
                                          exportDataRow(
                                            region.trackingSn,
                                            region.trackingType,
                                            4,
                                            5
                                          )
                                        "
                                        >-{{
                                          region.trial.actualAmountEndDateMinus
                                        }}
                                      </span>
                                    </span>
                                    <span v-else>
                                      {{
                                        region.trial.actualAmountEndDateMinus
                                      }}
                                    </span>
                                  </span>
                                  )
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            <!-- END HEADER -->
            <div id="tracking-hotel-scroll-second" class="style-width">
              <div
                style="width: 100%"
                v-for="(dataRegion, index) in regionTotal"
                :key="index"
              >
                <div class="pos_abs-hotel-status">
                  <button
                    type="button"
                    @click="activeCollapse(`dataRegion${index}`, dataRegion, 0)"
                    style="font-size: 18px; width: 160px; height: 80px"
                    class="btn_action tbn-child btn btn-blue collapsed"
                  >
                    <span v-if="getLocalize === 'vi'">{{
                      dataRegion.name
                    }}</span>
                    <span v-else>{{ dataRegion.name }}</span>
                  </button>
                  <button
                    type="button"
                    style="
                      font-size: 11px;
                      height: 40px;
                      width: 120px;
                      pointer-events: none;
                    "
                    class="tbn-child btn"
                  >
                    {{ $t("page.hotelStatusTracking.start_date") }}
                  </button>
                  <button
                    type="button"
                    style="
                      font-size: 11px;
                      height: 40px;
                      width: 120px;
                      pointer-events: none;
                    "
                    class="tbn-child btn"
                  >
                    {{ dateRange[0] }}
                  </button>
                  <button
                    type="button"
                    style="
                      font-size: 11px;
                      height: 40px;
                      width: 120px;
                      pointer-events: none;
                    "
                    class="tbn-child btn"
                  >
                    {{ $t("page.hotelStatusTracking.end_date") }}
                  </button>
                  <button
                    type="button"
                    style="
                      font-size: 11px;
                      height: 40px;
                      width: 120px;
                      pointer-events: none;
                    "
                    class="tbn-child btn"
                  >
                    {{ dateRange[1] }}
                  </button>
                </div>
                <div class="pd-width-hotel-status">
                  <div class="scroll-table">
                    <table class="avoid-clicks body-status-tracking">
                      <tbody>
                        <tr>
                          <!-- totalMain-->
                          <td class="custom-size-w-150">
                            <span>{{
                              dataRegion.totalMain.accumulationStartDate
                            }}</span>
                          </td>
                          <td class="custom-size-w-150">
                            <span>{{
                              dataRegion.totalMain.actualAmountStartDate
                            }}</span>
                          </td>
                          <!-- waiting-->
                          <td class="custom-size-w-150">
                            <span>{{
                              dataRegion.waiting.accumulationStartDate
                            }}</span>
                          </td>
                          <td class="custom-size-w-150">
                            <span>{{
                              dataRegion.waiting.actualAmountStartDate
                            }}</span>
                          </td>
                          <!-- contracted-->
                          <td class="custom-size-w-150">
                            <span>{{
                              dataRegion.contracted.accumulationStartDate
                            }}</span>
                          </td>
                          <td class="custom-size-w-150">
                            <span>{{
                              dataRegion.contracted.actualAmountStartDate
                            }}</span>
                          </td>
                          <!-- suspended-->
                          <td class="custom-size-w-150">
                            <span>{{
                              dataRegion.suspended.accumulationStartDate
                            }}</span>
                          </td>
                          <td class="custom-size-w-150">
                            <span>{{
                              dataRegion.suspended.actualAmountStartDate
                            }}</span>
                          </td>
                          <!-- terminated-->
                          <td class="custom-size-w-150">
                            <span>{{
                              dataRegion.terminated.accumulationStartDate
                            }}</span>
                          </td>
                          <td class="custom-size-w-150">
                            <span>{{
                              dataRegion.terminated.actualAmountStartDate
                            }}</span>
                          </td>
                          <!-- displayed-->
                          <td class="custom-size-w-150">
                            <span>{{
                              dataRegion.displayed.accumulationStartDate
                            }}</span>
                          </td>
                          <td class="custom-size-w-150">
                            <span>{{
                              dataRegion.displayed.actualAmountStartDate
                            }}</span>
                          </td>
                          <!-- trial-->
                          <td class="custom-size-w-150">
                            <span>{{
                              dataRegion.trial.accumulationStartDate
                            }}</span>
                          </td>
                          <td class="custom-size-w-150">
                            <span>{{
                              dataRegion.trial.actualAmountStartDate
                            }}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="pd-width-hotel-status">
                  <div class="scroll-table">
                    <table class="avoid-clicks body-status-tracking">
                      <tbody>
                        <tr>
                          <!-- totalMain-->

                          <td class="custom-size-w-150">
                            <span>{{
                              dataRegion.totalMain.accumulationEndDate
                            }}</span>
                            (
                            <span class="custom-text-color-green">
                              <span
                                class="export-data"
                                @click="
                                  exportDataRow(
                                    dataRegion.trackingSn,
                                    dataRegion.trackingType,
                                    0,
                                    6
                                  )
                                "
                                v-if="
                                  dataRegion.totalMain.accumulationEndDatePlus >
                                  0
                                "
                              >
                                +{{
                                  dataRegion.totalMain.accumulationEndDatePlus
                                }}</span
                              >
                              <span v-else>
                                {{
                                  dataRegion.totalMain.accumulationEndDatePlus
                                }}</span
                              >
                            </span>
                            )
                          </td>
                          <td class="custom-size-w-150">
                            <span
                              >{{ dataRegion.totalMain.actualAmountEndDate }}
                            </span>
                            (
                            <span
                              v-if="
                                dataRegion.totalMain.actualAmountEndDatePlus > 0
                              "
                            >
                              <span
                                class="custom-text-color-green export-data"
                                @click="
                                  exportDataRow(
                                    dataRegion.trackingSn,
                                    dataRegion.trackingType,
                                    0,
                                    7
                                  )
                                "
                                >+{{
                                  dataRegion.totalMain.actualAmountEndDatePlus
                                }}
                              </span>
                            </span>
                            <span v-else>
                              {{ dataRegion.totalMain.actualAmountEndDatePlus }}
                            </span>
                            /
                            <span class="custom-text-color-red">
                              <span
                                v-if="
                                  dataRegion.totalMain
                                    .actualAmountEndDateMinus > 0
                                "
                              >
                                <span
                                  class="export-data"
                                  @click="
                                    exportDataRow(
                                      dataRegion.trackingSn,
                                      dataRegion.trackingType,
                                      0,
                                      5
                                    )
                                  "
                                  >-{{
                                    dataRegion.totalMain
                                      .actualAmountEndDateMinus
                                  }}
                                </span>
                              </span>
                              <span v-else>
                                {{
                                  dataRegion.totalMain.actualAmountEndDateMinus
                                }}
                              </span>
                            </span>
                            )
                          </td>

                          <!-- waiting-->

                          <td class="custom-size-w-150">
                            <span>{{
                              dataRegion.waiting.accumulationEndDate
                            }}</span>
                            (
                            <span class="custom-text-color-green">
                              <span
                                class="export-data"
                                @click="
                                  exportDataRow(
                                    dataRegion.trackingSn,
                                    dataRegion.trackingType,
                                    1,
                                    6
                                  )
                                "
                                v-if="
                                  dataRegion.waiting.accumulationEndDatePlus > 0
                                "
                              >
                                +{{
                                  dataRegion.waiting.accumulationEndDatePlus
                                }}</span
                              >
                              <span v-else>
                                {{
                                  dataRegion.waiting.accumulationEndDatePlus
                                }}</span
                              >
                            </span>
                            )
                          </td>
                          <td class="custom-size-w-150">
                            <span
                              >{{ dataRegion.waiting.actualAmountEndDate }}
                            </span>
                            (
                            <span
                              v-if="
                                dataRegion.waiting.actualAmountEndDatePlus > 0
                              "
                            >
                              <span
                                class="custom-text-color-green export-data"
                                @click="
                                  exportDataRow(
                                    dataRegion.trackingSn,
                                    dataRegion.trackingType,
                                    1,
                                    7
                                  )
                                "
                                >+{{
                                  dataRegion.waiting.actualAmountEndDatePlus
                                }}
                              </span>
                            </span>
                            <span v-else>
                              {{ dataRegion.waiting.actualAmountEndDatePlus }}
                            </span>
                            /
                            <span class="custom-text-color-red">
                              <span
                                v-if="
                                  dataRegion.waiting.actualAmountEndDateMinus >
                                  0
                                "
                              >
                                <span
                                  class="export-data"
                                  @click="
                                    exportDataRow(
                                      dataRegion.trackingSn,
                                      dataRegion.trackingType,
                                      1,
                                      5
                                    )
                                  "
                                  >-{{
                                    dataRegion.waiting.actualAmountEndDateMinus
                                  }}
                                </span>
                              </span>
                              <span v-else>
                                {{
                                  dataRegion.waiting.actualAmountEndDateMinus
                                }}
                              </span>
                            </span>
                            )
                          </td>
                          <!-- contracted-->

                          <td class="custom-size-w-150">
                            <span>{{
                              dataRegion.contracted.accumulationEndDate
                            }}</span>
                            (
                            <span class="custom-text-color-green">
                              <span
                                class="export-data"
                                @click="
                                  exportDataRow(
                                    dataRegion.trackingSn,
                                    dataRegion.trackingType,
                                    3,
                                    6
                                  )
                                "
                                v-if="
                                  dataRegion.contracted
                                    .accumulationEndDatePlus > 0
                                "
                              >
                                +{{
                                  dataRegion.contracted.accumulationEndDatePlus
                                }}</span
                              >
                              <span v-else>
                                {{
                                  dataRegion.contracted.accumulationEndDatePlus
                                }}</span
                              >
                            </span>
                            )
                          </td>
                          <td class="custom-size-w-150">
                            <span
                              >{{ dataRegion.contracted.actualAmountEndDate }}
                            </span>
                            (
                            <span
                              v-if="
                                dataRegion.contracted.actualAmountEndDatePlus >
                                0
                              "
                            >
                              <span
                                class="custom-text-color-green export-data"
                                @click="
                                  exportDataRow(
                                    dataRegion.trackingSn,
                                    dataRegion.trackingType,
                                    3,
                                    7
                                  )
                                "
                                >+{{
                                  dataRegion.contracted.actualAmountEndDatePlus
                                }}
                              </span>
                            </span>
                            <span v-else>
                              {{
                                dataRegion.contracted.actualAmountEndDatePlus
                              }}
                            </span>
                            /
                            <span class="custom-text-color-red">
                              <span
                                v-if="
                                  dataRegion.contracted
                                    .actualAmountEndDateMinus > 0
                                "
                              >
                                <span
                                  class="export-data"
                                  @click="
                                    exportDataRow(
                                      dataRegion.trackingSn,
                                      dataRegion.trackingType,
                                      3,
                                      5
                                    )
                                  "
                                  >-{{
                                    dataRegion.contracted
                                      .actualAmountEndDateMinus
                                  }}
                                </span>
                              </span>
                              <span v-else>
                                {{
                                  dataRegion.contracted.actualAmountEndDateMinus
                                }}
                              </span>
                            </span>
                            )
                          </td>
                          <!-- suspended-->
                          <td class="custom-size-w-150">
                            <span>{{
                              dataRegion.suspended.accumulationEndDate
                            }}</span>
                            (
                            <span class="custom-text-color-green">
                              <span
                                class="export-data"
                                @click="
                                  exportDataRow(
                                    dataRegion.trackingSn,
                                    dataRegion.trackingType,
                                    6,
                                    6
                                  )
                                "
                                v-if="
                                  dataRegion.suspended.accumulationEndDatePlus >
                                  0
                                "
                              >
                                +{{
                                  dataRegion.suspended.accumulationEndDatePlus
                                }}</span
                              >
                              <span v-else>
                                {{
                                  dataRegion.suspended.accumulationEndDatePlus
                                }}</span
                              >
                            </span>
                            )
                          </td>
                          <td class="custom-size-w-150">
                            <span
                              >{{ dataRegion.suspended.actualAmountEndDate }}
                            </span>
                            (
                            <span
                              v-if="
                                dataRegion.suspended.actualAmountEndDatePlus > 0
                              "
                            >
                              <span
                                class="custom-text-color-green export-data"
                                @click="
                                  exportDataRow(
                                    dataRegion.trackingSn,
                                    dataRegion.trackingType,
                                    6,
                                    7
                                  )
                                "
                                >+{{
                                  dataRegion.suspended.actualAmountEndDatePlus
                                }}
                              </span>
                            </span>
                            <span v-else>
                              {{ dataRegion.suspended.actualAmountEndDatePlus }}
                            </span>
                            /
                            <span class="custom-text-color-red">
                              <span
                                v-if="
                                  dataRegion.suspended
                                    .actualAmountEndDateMinus > 0
                                "
                              >
                                <span
                                  class="export-data"
                                  @click="
                                    exportDataRow(
                                      dataRegion.trackingSn,
                                      dataRegion.trackingType,
                                      6,
                                      5
                                    )
                                  "
                                  >-{{
                                    dataRegion.suspended
                                      .actualAmountEndDateMinus
                                  }}
                                </span>
                              </span>
                              <span v-else>
                                {{
                                  dataRegion.suspended.actualAmountEndDateMinus
                                }}
                              </span>
                            </span>
                            )
                          </td>
                          <!-- terminated-->

                          <td class="custom-size-w-150">
                            <span>{{
                              dataRegion.terminated.accumulationEndDate
                            }}</span>
                            (
                            <span class="custom-text-color-green">
                              <span
                                class="export-data"
                                @click="
                                  exportDataRow(
                                    dataRegion.trackingSn,
                                    dataRegion.trackingType,
                                    5,
                                    6
                                  )
                                "
                                v-if="
                                  dataRegion.terminated
                                    .accumulationEndDatePlus > 0
                                "
                              >
                                +{{
                                  dataRegion.terminated.accumulationEndDatePlus
                                }}</span
                              >
                              <span v-else>
                                {{
                                  dataRegion.terminated.accumulationEndDatePlus
                                }}</span
                              >
                            </span>
                            )
                          </td>
                          <td class="custom-size-w-150">
                            <span
                              >{{ dataRegion.terminated.actualAmountEndDate }}
                            </span>
                            (
                            <span
                              v-if="
                                dataRegion.terminated.actualAmountEndDatePlus >
                                0
                              "
                            >
                              <span
                                class="custom-text-color-green export-data"
                                @click="
                                  exportDataRow(
                                    dataRegion.trackingSn,
                                    dataRegion.trackingType,
                                    5,
                                    7
                                  )
                                "
                                >+{{
                                  dataRegion.terminated.actualAmountEndDatePlus
                                }}
                              </span>
                            </span>
                            <span v-else>
                              {{
                                dataRegion.terminated.actualAmountEndDatePlus
                              }}
                            </span>
                            /
                            <span class="custom-text-color-red">
                              <span
                                v-if="
                                  dataRegion.terminated
                                    .actualAmountEndDateMinus > 0
                                "
                              >
                                <span
                                  class="export-data"
                                  @click="
                                    exportDataRow(
                                      dataRegion.trackingSn,
                                      dataRegion.trackingType,
                                      5,
                                      5
                                    )
                                  "
                                  >-{{
                                    dataRegion.terminated
                                      .actualAmountEndDateMinus
                                  }}
                                </span>
                              </span>
                              <span v-else>
                                {{
                                  dataRegion.terminated.actualAmountEndDateMinus
                                }}
                              </span>
                            </span>
                            )
                          </td>
                          <!-- displayed-->
                          <td class="custom-size-w-150">
                            <span>{{
                              dataRegion.displayed.accumulationEndDate
                            }}</span>
                            (
                            <span class="custom-text-color-green">
                              <span
                                class="export-data"
                                @click="
                                  exportDataRow(
                                    dataRegion.trackingSn,
                                    dataRegion.trackingType,
                                    2,
                                    6
                                  )
                                "
                                v-if="
                                  dataRegion.displayed.accumulationEndDatePlus >
                                  0
                                "
                              >
                                +{{
                                  dataRegion.displayed.accumulationEndDatePlus
                                }}</span
                              >
                              <span v-else>
                                {{
                                  dataRegion.displayed.accumulationEndDatePlus
                                }}</span
                              >
                            </span>
                            )
                          </td>
                          <td class="custom-size-w-150">
                            <span
                              >{{ dataRegion.displayed.actualAmountEndDate }}
                            </span>
                            (
                            <span
                              v-if="
                                dataRegion.displayed.actualAmountEndDatePlus > 0
                              "
                            >
                              <span
                                class="custom-text-color-green export-data"
                                @click="
                                  exportDataRow(
                                    dataRegion.trackingSn,
                                    dataRegion.trackingType,
                                    2,
                                    7
                                  )
                                "
                                >+{{
                                  dataRegion.displayed.actualAmountEndDatePlus
                                }}
                              </span>
                            </span>
                            <span v-else>
                              {{ dataRegion.displayed.actualAmountEndDatePlus }}
                            </span>
                            /
                            <span class="custom-text-color-red">
                              <span
                                v-if="
                                  dataRegion.displayed
                                    .actualAmountEndDateMinus > 0
                                "
                              >
                                <span
                                  class="export-data"
                                  @click="
                                    exportDataRow(
                                      dataRegion.trackingSn,
                                      dataRegion.trackingType,
                                      2,
                                      5
                                    )
                                  "
                                  >-{{
                                    dataRegion.displayed
                                      .actualAmountEndDateMinus
                                  }}
                                </span>
                              </span>
                              <span v-else>
                                {{
                                  dataRegion.displayed.actualAmountEndDateMinus
                                }}
                              </span>
                            </span>
                            )
                          </td>
                          <!-- trial-->

                          <td class="custom-size-w-150">
                            <span>{{
                              dataRegion.trial.accumulationEndDate
                            }}</span>
                            (
                            <span class="custom-text-color-green">
                              <span
                                class="export-data"
                                @click="
                                  exportDataRow(
                                    dataRegion.trackingSn,
                                    dataRegion.trackingType,
                                    4,
                                    6
                                  )
                                "
                                v-if="
                                  dataRegion.trial.accumulationEndDatePlus > 0
                                "
                              >
                                +{{
                                  dataRegion.trial.accumulationEndDatePlus
                                }}</span
                              >
                              <span v-else>
                                {{
                                  dataRegion.trial.accumulationEndDatePlus
                                }}</span
                              >
                            </span>
                            )
                          </td>
                          <td class="custom-size-w-150">
                            <span
                              >{{ dataRegion.trial.actualAmountEndDate }}
                            </span>
                            (
                            <span
                              v-if="
                                dataRegion.trial.actualAmountEndDatePlus > 0
                              "
                            >
                              <span
                                class="custom-text-color-green export-data"
                                @click="
                                  exportDataRow(
                                    dataRegion.trackingSn,
                                    dataRegion.trackingType,
                                    4,
                                    7
                                  )
                                "
                                >+{{ dataRegion.trial.actualAmountEndDatePlus }}
                              </span>
                            </span>
                            <span v-else>
                              {{ dataRegion.trial.actualAmountEndDatePlus }}
                            </span>
                            /
                            <span class="custom-text-color-red">
                              <span
                                v-if="
                                  dataRegion.trial.actualAmountEndDateMinus > 0
                                "
                              >
                                <span
                                  class="export-data"
                                  @click="
                                    exportDataRow(
                                      dataRegion.trackingSn,
                                      region.trackingType,
                                      4,
                                      5
                                    )
                                  "
                                  >-{{
                                    dataRegion.trial.actualAmountEndDateMinus
                                  }}
                                </span>
                              </span>
                              <span v-else>
                                {{ dataRegion.trial.actualAmountEndDateMinus }}
                              </span>
                            </span>
                            )
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div
                  v-if="(dataRegion && dataRegion.provinces) || !ui.isLoading"
                  class="collapsible"
                  :class="`dataRegion${index}`"
                >
                  <!-- Ajax -->
                  <div
                    v-for="(province, index) in dataRegion.provinces"
                    :key="index"
                  >
                    <div v-if="province || loading == false">
                      <div class="pos_abs-hotel-status">
                        <button
                          @click="
                            activeCollapse(
                              `dataProvide11${index}${province.trackingSn}`,
                              province,
                              1
                            )
                          "
                          type="button"
                          style="font-size: 16px; width: 160px; height: 80px"
                          class="btn_action tbn-child btn btn-info collapsed"
                        >
                          {{ province.name }}
                        </button>
                        <button
                          type="button"
                          style="
                            font-size: 11px;
                            height: 40px;
                            width: 120px;
                            pointer-events: none;
                          "
                          class="tbn-child btn"
                        >
                          {{ $t("page.hotelStatusTracking.start_date") }}
                        </button>
                        <button
                          type="button"
                          style="
                            font-size: 11px;
                            height: 40px;
                            width: 120px;
                            pointer-events: none;
                          "
                          class="tbn-child btn"
                        >
                          {{ dateRange[0] }}
                        </button>
                        <button
                          type="button"
                          style="
                            font-size: 11px;
                            height: 40px;
                            width: 120px;
                            pointer-events: none;
                          "
                          class="tbn-child btn"
                        >
                          {{ $t("page.hotelStatusTracking.end_date") }}
                        </button>
                        <button
                          type="button"
                          style="
                            font-size: 11px;
                            height: 40px;
                            width: 120px;
                            pointer-events: none;
                          "
                          class="tbn-child btn"
                        >
                          {{ dateRange[1] }}
                        </button>
                      </div>
                      <div class="pd-width-hotel-status">
                        <div class="scroll-table">
                          <table class="avoid-clicks body-status-tracking">
                            <tbody>
                              <tr>
                                <!-- totalMain-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    province.totalMain.accumulationStartDate
                                  }}</span>
                                </td>
                                <td class="custom-size-w-150">
                                  <span>{{
                                    province.totalMain.actualAmountStartDate
                                  }}</span>
                                </td>
                                <!-- waiting-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    province.waiting.accumulationStartDate
                                  }}</span>
                                </td>
                                <td class="custom-size-w-150">
                                  <span>{{
                                    province.waiting.actualAmountStartDate
                                  }}</span>
                                </td>
                                <!-- contracted-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    province.contracted.accumulationStartDate
                                  }}</span>
                                </td>
                                <td class="custom-size-w-150">
                                  <span>{{
                                    province.contracted.actualAmountStartDate
                                  }}</span>
                                </td>
                                <!-- suspended-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    province.suspended.accumulationStartDate
                                  }}</span>
                                </td>
                                <td class="custom-size-w-150">
                                  <span>{{
                                    province.suspended.actualAmountStartDate
                                  }}</span>
                                </td>
                                <!-- terminated-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    province.terminated.accumulationStartDate
                                  }}</span>
                                </td>
                                <td class="custom-size-w-150">
                                  <span>{{
                                    province.terminated.actualAmountStartDate
                                  }}</span>
                                </td>
                                <!-- displayed-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    province.displayed.accumulationStartDate
                                  }}</span>
                                </td>
                                <td class="custom-size-w-150">
                                  <span>{{
                                    province.displayed.actualAmountStartDate
                                  }}</span>
                                </td>
                                <!-- trial-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    province.trial.accumulationStartDate
                                  }}</span>
                                </td>
                                <td class="custom-size-w-150">
                                  <span>{{
                                    province.trial.actualAmountStartDate
                                  }}</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div class="pd-width-hotel-status">
                        <div class="scroll-table">
                          <table class="avoid-clicks body-status-tracking">
                            <tbody>
                              <tr>
                                <!-- totalMain-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    province.totalMain.accumulationEndDate
                                  }}</span>
                                  (
                                  <span class="custom-text-color-green">
                                    <span
                                      class="export-data"
                                      @click="
                                        exportDataRow(
                                          province.trackingSn,
                                          province.trackingType,
                                          0,
                                          6
                                        )
                                      "
                                      v-if="
                                        province.totalMain
                                          .accumulationEndDatePlus > 0
                                      "
                                    >
                                      +{{
                                        province.totalMain
                                          .accumulationEndDatePlus
                                      }}</span
                                    >
                                    <span v-else>
                                      {{
                                        province.totalMain
                                          .accumulationEndDatePlus
                                      }}</span
                                    >
                                  </span>
                                  )
                                </td>
                                <td class="custom-size-w-150">
                                  <span
                                    >{{
                                      province.totalMain.actualAmountEndDate
                                    }}
                                  </span>
                                  (
                                  <span
                                    v-if="
                                      province.totalMain
                                        .actualAmountEndDatePlus > 0
                                    "
                                  >
                                    <span
                                      class="
                                        custom-text-color-green
                                        export-data
                                      "
                                      @click="
                                        exportDataRow(
                                          province.trackingSn,
                                          province.trackingType,
                                          0,
                                          7
                                        )
                                      "
                                      >+{{
                                        province.totalMain
                                          .actualAmountEndDatePlus
                                      }}
                                    </span>
                                  </span>
                                  <span v-else>
                                    {{
                                      province.totalMain.actualAmountEndDatePlus
                                    }}
                                  </span>
                                  /
                                  <span class="custom-text-color-red">
                                    <span
                                      v-if="
                                        province.totalMain
                                          .actualAmountEndDateMinus > 0
                                      "
                                    >
                                      <span
                                        class="export-data"
                                        @click="
                                          exportDataRow(
                                            province.trackingSn,
                                            province.trackingType,
                                            0,
                                            5
                                          )
                                        "
                                        >-{{
                                          province.totalMain
                                            .actualAmountEndDateMinus
                                        }}
                                      </span>
                                    </span>
                                    <span v-else>
                                      {{
                                        province.totalMain
                                          .actualAmountEndDateMinus
                                      }}
                                    </span>
                                  </span>
                                  )
                                </td>

                                <!-- waiting-->

                                <td class="custom-size-w-150">
                                  <span>{{
                                    province.waiting.accumulationEndDate
                                  }}</span>
                                  (
                                  <span class="custom-text-color-green">
                                    <span
                                      class="export-data"
                                      @click="
                                        exportDataRow(
                                          province.trackingSn,
                                          province.trackingType,
                                          1,
                                          6
                                        )
                                      "
                                      v-if="
                                        province.waiting
                                          .accumulationEndDatePlus > 0
                                      "
                                    >
                                      +{{
                                        province.waiting.accumulationEndDatePlus
                                      }}</span
                                    >
                                    <span v-else>
                                      {{
                                        province.waiting.accumulationEndDatePlus
                                      }}</span
                                    >
                                  </span>
                                  )
                                </td>
                                <td class="custom-size-w-150">
                                  <span
                                    >{{ province.waiting.actualAmountEndDate }}
                                  </span>
                                  (
                                  <span
                                    v-if="
                                      province.waiting.actualAmountEndDatePlus >
                                      0
                                    "
                                  >
                                    <span
                                      class="
                                        custom-text-color-green
                                        export-data
                                      "
                                      @click="
                                        exportDataRow(
                                          province.trackingSn,
                                          province.trackingType,
                                          1,
                                          7
                                        )
                                      "
                                      >+{{
                                        province.waiting.actualAmountEndDatePlus
                                      }}
                                    </span>
                                  </span>
                                  <span v-else>
                                    {{
                                      province.waiting.actualAmountEndDatePlus
                                    }}
                                  </span>
                                  /
                                  <span class="custom-text-color-red">
                                    <span
                                      v-if="
                                        province.waiting
                                          .actualAmountEndDateMinus > 0
                                      "
                                    >
                                      <span
                                        class="export-data"
                                        @click="
                                          exportDataRow(
                                            province.trackingSn,
                                            province.trackingType,
                                            1,
                                            5
                                          )
                                        "
                                        >-{{
                                          province.waiting
                                            .actualAmountEndDateMinus
                                        }}
                                      </span>
                                    </span>
                                    <span v-else>
                                      {{
                                        province.waiting
                                          .actualAmountEndDateMinus
                                      }}
                                    </span>
                                  </span>
                                  )
                                </td>
                                <!-- contracted-->

                                <td class="custom-size-w-150">
                                  <span>{{
                                    province.contracted.accumulationEndDate
                                  }}</span>
                                  (
                                  <span class="custom-text-color-green">
                                    <span
                                      class="export-data"
                                      @click="
                                        exportDataRow(
                                          province.trackingSn,
                                          province.trackingType,
                                          3,
                                          6
                                        )
                                      "
                                      v-if="
                                        province.contracted
                                          .accumulationEndDatePlus > 0
                                      "
                                    >
                                      +{{
                                        province.contracted
                                          .accumulationEndDatePlus
                                      }}</span
                                    >
                                    <span v-else>
                                      {{
                                        province.contracted
                                          .accumulationEndDatePlus
                                      }}</span
                                    >
                                  </span>
                                  )
                                </td>
                                <td class="custom-size-w-150">
                                  <span
                                    >{{
                                      province.contracted.actualAmountEndDate
                                    }}
                                  </span>
                                  (
                                  <span
                                    v-if="
                                      province.contracted
                                        .actualAmountEndDatePlus > 0
                                    "
                                  >
                                    <span
                                      class="
                                        custom-text-color-green
                                        export-data
                                      "
                                      @click="
                                        exportDataRow(
                                          province.trackingSn,
                                          province.trackingType,
                                          3,
                                          7
                                        )
                                      "
                                      >+{{
                                        province.contracted
                                          .actualAmountEndDatePlus
                                      }}
                                    </span>
                                  </span>
                                  <span v-else>
                                    {{
                                      province.contracted
                                        .actualAmountEndDatePlus
                                    }}
                                  </span>
                                  /
                                  <span class="custom-text-color-red">
                                    <span
                                      v-if="
                                        province.contracted
                                          .actualAmountEndDateMinus > 0
                                      "
                                    >
                                      <span
                                        class="export-data"
                                        @click="
                                          exportDataRow(
                                            province.trackingSn,
                                            province.trackingType,
                                            3,
                                            5
                                          )
                                        "
                                        >-{{
                                          province.contracted
                                            .actualAmountEndDateMinus
                                        }}
                                      </span>
                                    </span>
                                    <span v-else>
                                      {{
                                        province.contracted
                                          .actualAmountEndDateMinus
                                      }}
                                    </span>
                                  </span>
                                  )
                                </td>
                                <!-- suspended-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    province.suspended.accumulationEndDate
                                  }}</span>
                                  (
                                  <span class="custom-text-color-green">
                                    <span
                                      class="export-data"
                                      @click="
                                        exportDataRow(
                                          province.trackingSn,
                                          province.trackingType,
                                          6,
                                          6
                                        )
                                      "
                                      v-if="
                                        province.suspended
                                          .accumulationEndDatePlus > 0
                                      "
                                    >
                                      +{{
                                        province.suspended
                                          .accumulationEndDatePlus
                                      }}</span
                                    >
                                    <span v-else>
                                      {{
                                        province.suspended
                                          .accumulationEndDatePlus
                                      }}</span
                                    >
                                  </span>
                                  )
                                </td>
                                <td class="custom-size-w-150">
                                  <span
                                    >{{
                                      province.suspended.actualAmountEndDate
                                    }}
                                  </span>
                                  (
                                  <span
                                    v-if="
                                      province.suspended
                                        .actualAmountEndDatePlus > 0
                                    "
                                  >
                                    <span
                                      class="
                                        custom-text-color-green
                                        export-data
                                      "
                                      @click="
                                        exportDataRow(
                                          province.trackingSn,
                                          province.trackingType,
                                          6,
                                          7
                                        )
                                      "
                                      >+{{
                                        province.suspended
                                          .actualAmountEndDatePlus
                                      }}
                                    </span>
                                  </span>
                                  <span v-else>
                                    {{
                                      province.suspended.actualAmountEndDatePlus
                                    }}
                                  </span>
                                  /
                                  <span class="custom-text-color-red">
                                    <span
                                      v-if="
                                        province.suspended
                                          .actualAmountEndDateMinus > 0
                                      "
                                    >
                                      <span
                                        class="export-data"
                                        @click="
                                          exportDataRow(
                                            province.trackingSn,
                                            province.trackingType,
                                            6,
                                            5
                                          )
                                        "
                                        >-{{
                                          province.suspended
                                            .actualAmountEndDateMinus
                                        }}
                                      </span>
                                    </span>
                                    <span v-else>
                                      {{
                                        province.suspended
                                          .actualAmountEndDateMinus
                                      }}
                                    </span>
                                  </span>
                                  )
                                </td>
                                <!-- terminated-->

                                <td class="custom-size-w-150">
                                  <span>{{
                                    province.terminated.accumulationEndDate
                                  }}</span>
                                  (
                                  <span class="custom-text-color-green">
                                    <span
                                      class="export-data"
                                      @click="
                                        exportDataRow(
                                          province.trackingSn,
                                          province.trackingType,
                                          5,
                                          6
                                        )
                                      "
                                      v-if="
                                        province.terminated
                                          .accumulationEndDatePlus > 0
                                      "
                                    >
                                      +{{
                                        province.terminated
                                          .accumulationEndDatePlus
                                      }}</span
                                    >
                                    <span v-else>
                                      {{
                                        province.terminated
                                          .accumulationEndDatePlus
                                      }}</span
                                    >
                                  </span>
                                  )
                                </td>
                                <td class="custom-size-w-150">
                                  <span
                                    >{{
                                      province.terminated.actualAmountEndDate
                                    }}
                                  </span>
                                  (
                                  <span
                                    v-if="
                                      province.terminated
                                        .actualAmountEndDatePlus > 0
                                    "
                                  >
                                    <span
                                      class="
                                        custom-text-color-green
                                        export-data
                                      "
                                      @click="
                                        exportDataRow(
                                          province.trackingSn,
                                          province.trackingType,
                                          5,
                                          7
                                        )
                                      "
                                      >+{{
                                        province.terminated
                                          .actualAmountEndDatePlus
                                      }}
                                    </span>
                                  </span>
                                  <span v-else>
                                    {{
                                      province.terminated
                                        .actualAmountEndDatePlus
                                    }}
                                  </span>
                                  /
                                  <span class="custom-text-color-red">
                                    <span
                                      v-if="
                                        province.terminated
                                          .actualAmountEndDateMinus > 0
                                      "
                                    >
                                      <span
                                        class="export-data"
                                        @click="
                                          exportDataRow(
                                            province.trackingSn,
                                            province.trackingType,
                                            5,
                                            5
                                          )
                                        "
                                        >-{{
                                          province.terminated
                                            .actualAmountEndDateMinus
                                        }}
                                      </span>
                                    </span>
                                    <span v-else>
                                      {{
                                        province.terminated
                                          .actualAmountEndDateMinus
                                      }}
                                    </span>
                                  </span>
                                  )
                                </td>
                                <!-- displayed-->
                                <td class="custom-size-w-150">
                                  <span>{{
                                    province.displayed.accumulationEndDate
                                  }}</span>
                                  (
                                  <span class="custom-text-color-green">
                                    <span
                                      class="export-data"
                                      @click="
                                        exportDataRow(
                                          province.trackingSn,
                                          province.trackingType,
                                          2,
                                          6
                                        )
                                      "
                                      v-if="
                                        province.displayed
                                          .accumulationEndDatePlus > 0
                                      "
                                    >
                                      +{{
                                        province.displayed
                                          .accumulationEndDatePlus
                                      }}</span
                                    >
                                    <span v-else>
                                      {{
                                        province.displayed
                                          .accumulationEndDatePlus
                                      }}</span
                                    >
                                  </span>
                                  )
                                </td>
                                <td class="custom-size-w-150">
                                  <span
                                    >{{
                                      province.displayed.actualAmountEndDate
                                    }}
                                  </span>
                                  (
                                  <span
                                    v-if="
                                      province.displayed
                                        .actualAmountEndDatePlus > 0
                                    "
                                  >
                                    <span
                                      class="
                                        custom-text-color-green
                                        export-data
                                      "
                                      @click="
                                        exportDataRow(
                                          province.trackingSn,
                                          province.trackingType,
                                          2,
                                          7
                                        )
                                      "
                                      >+{{
                                        province.displayed
                                          .actualAmountEndDatePlus
                                      }}
                                    </span>
                                  </span>
                                  <span v-else>
                                    {{
                                      province.displayed.actualAmountEndDatePlus
                                    }}
                                  </span>
                                  /
                                  <span class="custom-text-color-red">
                                    <span
                                      v-if="
                                        province.displayed
                                          .actualAmountEndDateMinus > 0
                                      "
                                    >
                                      <span
                                        class="export-data"
                                        @click="
                                          exportDataRow(
                                            province.trackingSn,
                                            province.trackingType,
                                            2,
                                            5
                                          )
                                        "
                                        >-{{
                                          province.displayed
                                            .actualAmountEndDateMinus
                                        }}
                                      </span>
                                    </span>
                                    <span v-else>
                                      {{
                                        province.displayed
                                          .actualAmountEndDateMinus
                                      }}
                                    </span>
                                  </span>
                                  )
                                </td>
                                <!-- trial-->

                                <td class="custom-size-w-150">
                                  <span>{{
                                    province.trial.accumulationEndDate
                                  }}</span>
                                  (
                                  <span class="custom-text-color-green">
                                    <span
                                      class="export-data"
                                      @click="
                                        exportDataRow(
                                          province.trackingSn,
                                          province.trackingType,
                                          4,
                                          6
                                        )
                                      "
                                      v-if="
                                        province.trial.accumulationEndDatePlus >
                                        0
                                      "
                                    >
                                      +{{
                                        province.trial.accumulationEndDatePlus
                                      }}</span
                                    >
                                    <span v-else>
                                      {{
                                        province.trial.accumulationEndDatePlus
                                      }}</span
                                    >
                                  </span>
                                  )
                                </td>
                                <td class="custom-size-w-150">
                                  <span
                                    >{{ province.trial.actualAmountEndDate }}
                                  </span>
                                  (
                                  <span
                                    v-if="
                                      province.trial.actualAmountEndDatePlus > 0
                                    "
                                  >
                                    <span
                                      class="
                                        custom-text-color-green
                                        export-data
                                      "
                                      @click="
                                        exportDataRow(
                                          province.trackingSn,
                                          province.trackingType,
                                          4,
                                          7
                                        )
                                      "
                                      >+{{
                                        province.trial.actualAmountEndDatePlus
                                      }}
                                    </span>
                                  </span>
                                  <span v-else>
                                    {{ province.trial.actualAmountEndDatePlus }}
                                  </span>
                                  /
                                  <span class="custom-text-color-red">
                                    <span
                                      v-if="
                                        province.trial
                                          .actualAmountEndDateMinus > 0
                                      "
                                    >
                                      <span
                                        class="export-data"
                                        @click="
                                          exportDataRow(
                                            province.trackingSn,
                                            region.trackingType,
                                            4,
                                            5
                                          )
                                        "
                                        >-{{
                                          province.trial
                                            .actualAmountEndDateMinus
                                        }}
                                      </span>
                                    </span>
                                    <span v-else>
                                      {{
                                        province.trial.actualAmountEndDateMinus
                                      }}
                                    </span>
                                  </span>
                                  )
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div
                        class="collapsible"
                        :class="`dataProvide11${index}${province.trackingSn}`"
                      >
                        <!-- Ajax -->
                        <div id="ajax_list_data_1_1" style="">
                          <input
                            class="headerIdClass"
                            id="showHeaderId"
                            type="hidden"
                            value="false"
                          />
                          <div
                            v-for="(district, index) in province.districts"
                            :key="index"
                          >
                            <div class="pos_abs-hotel-status">
                              <button
                                type="button"
                                style="
                                  font-size: 14px;
                                  width: 160px;
                                  height: 80px;
                                "
                                class="btn_action tbn-child btn btn-warning"
                                data-toggle="collapse"
                                :href="`#loadhotel` + index"
                              >
                                {{ district.name }}
                              </button>
                              <button
                                type="button"
                                style="
                                  font-size: 11px;
                                  height: 40px;
                                  width: 120px;
                                  pointer-events: none;
                                "
                                class="tbn-child btn"
                              >
                                {{ $t("page.hotelStatusTracking.start_date") }}
                              </button>
                              <button
                                type="button"
                                style="
                                  font-size: 11px;
                                  height: 40px;
                                  width: 120px;
                                  pointer-events: none;
                                "
                                class="tbn-child btn"
                              >
                                {{ dateRange[0] }}
                              </button>
                              <button
                                type="button"
                                style="
                                  font-size: 11px;
                                  height: 40px;
                                  width: 120px;
                                  pointer-events: none;
                                "
                                class="tbn-child btn"
                              >
                                {{ $t("page.hotelStatusTracking.end_date") }}
                              </button>
                              <button
                                type="button"
                                style="
                                  font-size: 11px;
                                  height: 40px;
                                  width: 120px;
                                  pointer-events: none;
                                "
                                class="tbn-child btn"
                              >
                                {{ dateRange[1] }}
                              </button>
                            </div>
                            <div class="pd-width-hotel-status">
                              <div class="scroll-table">
                                <table
                                  class="avoid-clicks body-status-tracking"
                                >
                                  <tbody>
                                    <tr>
                                      <!-- totalMain-->
                                      <td class="custom-size-w-150">
                                        <span>{{
                                          district.totalMain
                                            .accumulationStartDate
                                        }}</span>
                                      </td>
                                      <td class="custom-size-w-150">
                                        <span>{{
                                          district.totalMain
                                            .actualAmountStartDate
                                        }}</span>
                                      </td>
                                      <!-- waiting-->
                                      <td class="custom-size-w-150">
                                        <span>{{
                                          district.waiting.accumulationStartDate
                                        }}</span>
                                      </td>
                                      <td class="custom-size-w-150">
                                        <span>{{
                                          district.waiting.actualAmountStartDate
                                        }}</span>
                                      </td>
                                      <!-- contracted-->
                                      <td class="custom-size-w-150">
                                        <span>{{
                                          district.contracted
                                            .accumulationStartDate
                                        }}</span>
                                      </td>
                                      <td class="custom-size-w-150">
                                        <span>{{
                                          district.contracted
                                            .actualAmountStartDate
                                        }}</span>
                                      </td>
                                      <!-- suspended-->
                                      <td class="custom-size-w-150">
                                        <span>{{
                                          district.suspended
                                            .accumulationStartDate
                                        }}</span>
                                      </td>
                                      <td class="custom-size-w-150">
                                        <span>{{
                                          district.suspended
                                            .actualAmountStartDate
                                        }}</span>
                                      </td>
                                      <!-- terminated-->
                                      <td class="custom-size-w-150">
                                        <span>{{
                                          district.terminated
                                            .accumulationStartDate
                                        }}</span>
                                      </td>
                                      <td class="custom-size-w-150">
                                        <span>{{
                                          district.terminated
                                            .actualAmountStartDate
                                        }}</span>
                                      </td>
                                      <!-- displayed-->
                                      <td class="custom-size-w-150">
                                        <span>{{
                                          district.displayed
                                            .accumulationStartDate
                                        }}</span>
                                      </td>
                                      <td class="custom-size-w-150">
                                        <span>{{
                                          district.displayed
                                            .actualAmountStartDate
                                        }}</span>
                                      </td>
                                      <!-- trial-->
                                      <td class="custom-size-w-150">
                                        <span>{{
                                          district.trial.accumulationStartDate
                                        }}</span>
                                      </td>
                                      <td class="custom-size-w-150">
                                        <span>{{
                                          district.trial.actualAmountStartDate
                                        }}</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div class="pd-width-hotel-status">
                              <div class="scroll-table">
                                <table
                                  class="avoid-clicks body-status-tracking"
                                >
                                  <tbody>
                                    <tr>
                                      <!-- totalMain-->
                                      <td class="custom-size-w-150">
                                        <span>{{
                                          district.totalMain.accumulationEndDate
                                        }}</span>
                                        (
                                        <span class="custom-text-color-green">
                                          <span
                                            class="export-data"
                                            @click="
                                              exportDataRow(
                                                district.trackingSn,
                                                district.trackingType,
                                                0,
                                                6
                                              )
                                            "
                                            v-if="
                                              district.totalMain
                                                .accumulationEndDatePlus > 0
                                            "
                                          >
                                            +{{
                                              district.totalMain
                                                .accumulationEndDatePlus
                                            }}</span
                                          >
                                          <span v-else>
                                            {{
                                              district.totalMain
                                                .accumulationEndDatePlus
                                            }}</span
                                          >
                                        </span>
                                        )
                                      </td>
                                      <td class="custom-size-w-150">
                                        <span
                                          >{{
                                            district.totalMain
                                              .actualAmountEndDate
                                          }}
                                        </span>
                                        (
                                        <span
                                          v-if="
                                            district.totalMain
                                              .actualAmountEndDatePlus > 0
                                          "
                                        >
                                          <span
                                            class="
                                              custom-text-color-green
                                              export-data
                                            "
                                            @click="
                                              exportDataRow(
                                                district.trackingSn,
                                                district.trackingType,
                                                0,
                                                7
                                              )
                                            "
                                            >+{{
                                              district.totalMain
                                                .actualAmountEndDatePlus
                                            }}
                                          </span>
                                        </span>
                                        <span v-else>
                                          {{
                                            district.totalMain
                                              .actualAmountEndDatePlus
                                          }}
                                        </span>
                                        /
                                        <span class="custom-text-color-red">
                                          <span
                                            v-if="
                                              district.totalMain
                                                .actualAmountEndDateMinus > 0
                                            "
                                          >
                                            <span
                                              class="export-data"
                                              @click="
                                                exportDataRow(
                                                  district.trackingSn,
                                                  district.trackingType,
                                                  0,
                                                  5
                                                )
                                              "
                                              >-{{
                                                district.totalMain
                                                  .actualAmountEndDateMinus
                                              }}
                                            </span>
                                          </span>
                                          <span v-else>
                                            {{
                                              district.totalMain
                                                .actualAmountEndDateMinus
                                            }}
                                          </span>
                                        </span>
                                        )
                                      </td>

                                      <!-- waiting-->

                                      <td class="custom-size-w-150">
                                        <span>{{
                                          district.waiting.accumulationEndDate
                                        }}</span>
                                        (
                                        <span class="custom-text-color-green">
                                          <span
                                            class="export-data"
                                            @click="
                                              exportDataRow(
                                                district.trackingSn,
                                                district.trackingType,
                                                1,
                                                6
                                              )
                                            "
                                            v-if="
                                              district.waiting
                                                .accumulationEndDatePlus > 0
                                            "
                                          >
                                            +{{
                                              district.waiting
                                                .accumulationEndDatePlus
                                            }}</span
                                          >
                                          <span v-else>
                                            {{
                                              district.waiting
                                                .accumulationEndDatePlus
                                            }}</span
                                          >
                                        </span>
                                        )
                                      </td>
                                      <td class="custom-size-w-150">
                                        <span
                                          >{{
                                            district.waiting.actualAmountEndDate
                                          }}
                                        </span>
                                        (
                                        <span
                                          v-if="
                                            district.waiting
                                              .actualAmountEndDatePlus > 0
                                          "
                                        >
                                          <span
                                            class="
                                              custom-text-color-green
                                              export-data
                                            "
                                            @click="
                                              exportDataRow(
                                                district.trackingSn,
                                                district.trackingType,
                                                1,
                                                7
                                              )
                                            "
                                            >+{{
                                              district.waiting
                                                .actualAmountEndDatePlus
                                            }}
                                          </span>
                                        </span>
                                        <span v-else>
                                          {{
                                            district.waiting
                                              .actualAmountEndDatePlus
                                          }}
                                        </span>
                                        /
                                        <span class="custom-text-color-red">
                                          <span
                                            v-if="
                                              district.waiting
                                                .actualAmountEndDateMinus > 0
                                            "
                                          >
                                            <span
                                              class="export-data"
                                              @click="
                                                exportDataRow(
                                                  district.trackingSn,
                                                  district.trackingType,
                                                  1,
                                                  5
                                                )
                                              "
                                              >-{{
                                                district.waiting
                                                  .actualAmountEndDateMinus
                                              }}
                                            </span>
                                          </span>
                                          <span v-else>
                                            {{
                                              district.waiting
                                                .actualAmountEndDateMinus
                                            }}
                                          </span>
                                        </span>
                                        )
                                      </td>
                                      <!-- contracted-->

                                      <td class="custom-size-w-150">
                                        <span>{{
                                          district.contracted
                                            .accumulationEndDate
                                        }}</span>
                                        (
                                        <span class="custom-text-color-green">
                                          <span
                                            class="export-data"
                                            @click="
                                              exportDataRow(
                                                district.trackingSn,
                                                district.trackingType,
                                                3,
                                                6
                                              )
                                            "
                                            v-if="
                                              district.contracted
                                                .accumulationEndDatePlus > 0
                                            "
                                          >
                                            +{{
                                              district.contracted
                                                .accumulationEndDatePlus
                                            }}</span
                                          >
                                          <span v-else>
                                            {{
                                              district.contracted
                                                .accumulationEndDatePlus
                                            }}</span
                                          >
                                        </span>
                                        )
                                      </td>
                                      <td class="custom-size-w-150">
                                        <span
                                          >{{
                                            district.contracted
                                              .actualAmountEndDate
                                          }}
                                        </span>
                                        (
                                        <span
                                          v-if="
                                            district.contracted
                                              .actualAmountEndDatePlus > 0
                                          "
                                        >
                                          <span
                                            class="
                                              custom-text-color-green
                                              export-data
                                            "
                                            @click="
                                              exportDataRow(
                                                district.trackingSn,
                                                district.trackingType,
                                                3,
                                                7
                                              )
                                            "
                                            >+{{
                                              district.contracted
                                                .actualAmountEndDatePlus
                                            }}
                                          </span>
                                        </span>
                                        <span v-else>
                                          {{
                                            district.contracted
                                              .actualAmountEndDatePlus
                                          }}
                                        </span>
                                        /
                                        <span class="custom-text-color-red">
                                          <span
                                            v-if="
                                              district.contracted
                                                .actualAmountEndDateMinus > 0
                                            "
                                          >
                                            <span
                                              class="export-data"
                                              @click="
                                                exportDataRow(
                                                  district.trackingSn,
                                                  district.trackingType,
                                                  3,
                                                  5
                                                )
                                              "
                                              >-{{
                                                district.contracted
                                                  .actualAmountEndDateMinus
                                              }}
                                            </span>
                                          </span>
                                          <span v-else>
                                            {{
                                              district.contracted
                                                .actualAmountEndDateMinus
                                            }}
                                          </span>
                                        </span>
                                        )
                                      </td>
                                      <!-- suspended-->
                                      <td class="custom-size-w-150">
                                        <span>{{
                                          district.suspended.accumulationEndDate
                                        }}</span>
                                        (
                                        <span class="custom-text-color-green">
                                          <span
                                            class="export-data"
                                            @click="
                                              exportDataRow(
                                                district.trackingSn,
                                                district.trackingType,
                                                6,
                                                6
                                              )
                                            "
                                            v-if="
                                              district.suspended
                                                .accumulationEndDatePlus > 0
                                            "
                                          >
                                            +{{
                                              district.suspended
                                                .accumulationEndDatePlus
                                            }}</span
                                          >
                                          <span v-else>
                                            {{
                                              district.suspended
                                                .accumulationEndDatePlus
                                            }}</span
                                          >
                                        </span>
                                        )
                                      </td>
                                      <td class="custom-size-w-150">
                                        <span
                                          >{{
                                            district.suspended
                                              .actualAmountEndDate
                                          }}
                                        </span>
                                        (
                                        <span
                                          v-if="
                                            district.suspended
                                              .actualAmountEndDatePlus > 0
                                          "
                                        >
                                          <span
                                            class="
                                              custom-text-color-green
                                              export-data
                                            "
                                            @click="
                                              exportDataRow(
                                                district.trackingSn,
                                                district.trackingType,
                                                6,
                                                7
                                              )
                                            "
                                            >+{{
                                              district.suspended
                                                .actualAmountEndDatePlus
                                            }}
                                          </span>
                                        </span>
                                        <span v-else>
                                          {{
                                            district.suspended
                                              .actualAmountEndDatePlus
                                          }}
                                        </span>
                                        /
                                        <span class="custom-text-color-red">
                                          <span
                                            v-if="
                                              district.suspended
                                                .actualAmountEndDateMinus > 0
                                            "
                                          >
                                            <span
                                              class="export-data"
                                              @click="
                                                exportDataRow(
                                                  district.trackingSn,
                                                  district.trackingType,
                                                  6,
                                                  5
                                                )
                                              "
                                              >-{{
                                                district.suspended
                                                  .actualAmountEndDateMinus
                                              }}
                                            </span>
                                          </span>
                                          <span v-else>
                                            {{
                                              district.suspended
                                                .actualAmountEndDateMinus
                                            }}
                                          </span>
                                        </span>
                                        )
                                      </td>
                                      <!-- terminated-->

                                      <td class="custom-size-w-150">
                                        <span>{{
                                          district.terminated
                                            .accumulationEndDate
                                        }}</span>
                                        (
                                        <span class="custom-text-color-green">
                                          <span
                                            class="export-data"
                                            @click="
                                              exportDataRow(
                                                district.trackingSn,
                                                district.trackingType,
                                                5,
                                                6
                                              )
                                            "
                                            v-if="
                                              district.terminated
                                                .accumulationEndDatePlus > 0
                                            "
                                          >
                                            +{{
                                              district.terminated
                                                .accumulationEndDatePlus
                                            }}</span
                                          >
                                          <span v-else>
                                            {{
                                              district.terminated
                                                .accumulationEndDatePlus
                                            }}</span
                                          >
                                        </span>
                                        )
                                      </td>
                                      <td class="custom-size-w-150">
                                        <span
                                          >{{
                                            district.terminated
                                              .actualAmountEndDate
                                          }}
                                        </span>
                                        (
                                        <span
                                          v-if="
                                            district.terminated
                                              .actualAmountEndDatePlus > 0
                                          "
                                        >
                                          <span
                                            class="
                                              custom-text-color-green
                                              export-data
                                            "
                                            @click="
                                              exportDataRow(
                                                district.trackingSn,
                                                district.trackingType,
                                                5,
                                                7
                                              )
                                            "
                                            >+{{
                                              district.terminated
                                                .actualAmountEndDatePlus
                                            }}
                                          </span>
                                        </span>
                                        <span v-else>
                                          {{
                                            district.terminated
                                              .actualAmountEndDatePlus
                                          }}
                                        </span>
                                        /
                                        <span class="custom-text-color-red">
                                          <span
                                            v-if="
                                              district.terminated
                                                .actualAmountEndDateMinus > 0
                                            "
                                          >
                                            <span
                                              class="export-data"
                                              @click="
                                                exportDataRow(
                                                  district.trackingSn,
                                                  district.trackingType,
                                                  5,
                                                  5
                                                )
                                              "
                                              >-{{
                                                district.terminated
                                                  .actualAmountEndDateMinus
                                              }}
                                            </span>
                                          </span>
                                          <span v-else>
                                            {{
                                              district.terminated
                                                .actualAmountEndDateMinus
                                            }}
                                          </span>
                                        </span>
                                        )
                                      </td>
                                      <!-- displayed-->
                                      <td class="custom-size-w-150">
                                        <span>{{
                                          district.displayed.accumulationEndDate
                                        }}</span>
                                        (
                                        <span class="custom-text-color-green">
                                          <span
                                            class="export-data"
                                            @click="
                                              exportDataRow(
                                                district.trackingSn,
                                                district.trackingType,
                                                2,
                                                6
                                              )
                                            "
                                            v-if="
                                              district.displayed
                                                .accumulationEndDatePlus > 0
                                            "
                                          >
                                            +{{
                                              district.displayed
                                                .accumulationEndDatePlus
                                            }}</span
                                          >
                                          <span v-else>
                                            {{
                                              district.displayed
                                                .accumulationEndDatePlus
                                            }}</span
                                          >
                                        </span>
                                        )
                                      </td>
                                      <td class="custom-size-w-150">
                                        <span
                                          >{{
                                            district.displayed
                                              .actualAmountEndDate
                                          }}
                                        </span>
                                        (
                                        <span
                                          v-if="
                                            district.displayed
                                              .actualAmountEndDatePlus > 0
                                          "
                                        >
                                          <span
                                            class="
                                              custom-text-color-green
                                              export-data
                                            "
                                            @click="
                                              exportDataRow(
                                                district.trackingSn,
                                                district.trackingType,
                                                2,
                                                7
                                              )
                                            "
                                            >+{{
                                              district.displayed
                                                .actualAmountEndDatePlus
                                            }}
                                          </span>
                                        </span>
                                        <span v-else>
                                          {{
                                            district.displayed
                                              .actualAmountEndDatePlus
                                          }}
                                        </span>
                                        /
                                        <span class="custom-text-color-red">
                                          <span
                                            v-if="
                                              district.displayed
                                                .actualAmountEndDateMinus > 0
                                            "
                                          >
                                            <span
                                              class="export-data"
                                              @click="
                                                exportDataRow(
                                                  district.trackingSn,
                                                  district.trackingType,
                                                  2,
                                                  5
                                                )
                                              "
                                              >-{{
                                                district.displayed
                                                  .actualAmountEndDateMinus
                                              }}
                                            </span>
                                          </span>
                                          <span v-else>
                                            {{
                                              district.displayed
                                                .actualAmountEndDateMinus
                                            }}
                                          </span>
                                        </span>
                                        )
                                      </td>
                                      <!-- trial-->

                                      <td class="custom-size-w-150">
                                        <span>{{
                                          district.trial.accumulationEndDate
                                        }}</span>
                                        (
                                        <span class="custom-text-color-green">
                                          <span
                                            class="export-data"
                                            @click="
                                              exportDataRow(
                                                district.trackingSn,
                                                district.trackingType,
                                                4,
                                                6
                                              )
                                            "
                                            v-if="
                                              district.trial
                                                .accumulationEndDatePlus > 0
                                            "
                                          >
                                            +{{
                                              district.trial
                                                .accumulationEndDatePlus
                                            }}</span
                                          >
                                          <span v-else>
                                            {{
                                              district.trial
                                                .accumulationEndDatePlus
                                            }}</span
                                          >
                                        </span>
                                        )
                                      </td>
                                      <td class="custom-size-w-150">
                                        <span
                                          >{{
                                            district.trial.actualAmountEndDate
                                          }}
                                        </span>
                                        (
                                        <span
                                          v-if="
                                            district.trial
                                              .actualAmountEndDatePlus > 0
                                          "
                                        >
                                          <span
                                            class="
                                              custom-text-color-green
                                              export-data
                                            "
                                            @click="
                                              exportDataRow(
                                                district.trackingSn,
                                                district.trackingType,
                                                4,
                                                7
                                              )
                                            "
                                            >+{{
                                              district.trial
                                                .actualAmountEndDatePlus
                                            }}
                                          </span>
                                        </span>
                                        <span v-else>
                                          {{
                                            district.trial
                                              .actualAmountEndDatePlus
                                          }}
                                        </span>
                                        /
                                        <span class="custom-text-color-red">
                                          <span
                                            v-if="
                                              district.trial
                                                .actualAmountEndDateMinus > 0
                                            "
                                          >
                                            <span
                                              class="export-data"
                                              @click="
                                                exportDataRow(
                                                  district.trackingSn,
                                                  region.trackingType,
                                                  4,
                                                  5
                                                )
                                              "
                                              >-{{
                                                district.trial
                                                  .actualAmountEndDateMinus
                                              }}
                                            </span>
                                          </span>
                                          <span v-else>
                                            {{
                                              district.trial
                                                .actualAmountEndDateMinus
                                            }}
                                          </span>
                                        </span>
                                        )
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- End Ajax -->
                      </div>
                    </div>
                  </div>
                  <!-- End Ajax -->
                </div>
              </div>
            </div>
            <!-- </div> -->
          </div>
          <!-- </div> -->
        </div>
        <!-- -->
      </div>
      <div v-else-if="region == null">
        <div class="card m-b-30" style="text-align: center; padding: 20px">
          <h2><i class="el-icon-loading"></i></h2>
          <h2>{{ $t("loading") }} ...</h2>
        </div>
      </div>
      <div v-if="!loading && Object.keys(region).length == 0">
        <div class="" style="text-align: center; padding: 20px">
          <p>{{ $t("no_data") }}</p>
        </div>
      </div>
      <!-- End col -->
    </div>
  </div>
</sa-section>
</template>

<script>
import ScrollMagic from 'scrollmagic'
import { debounce } from '@/utils/helpers'
import SaSection from '@/components/globals/SaSection'
import {
  getHotelStatusTrackingRegion,
  exportDataHotelStatusTracking
} from './api'
const timeDebounce = 500
export default {
  name: 'BookingTracking',
  components: {
    SaSection
  },
  data (vm) {
    return {
      ui: {
        isLoading: true
      },
      loading: true,
      dateFrom: '',
      dateTo: '',
      region: null,
      regionTotalRes: [],
      provinces: [],
      district: [],
      dateRange: [],
      lang: '',
      count: 1,
      filter: {
        limit: 10,
        page: 1,
        dateFrom: '',
        dateTo: ''
      }
    }
  },
  async created () {
    this.getFromToDate()
    this.dateRange = [this.dateFrom, this.dateTo]
    await this.getDataFirst()
    this.doubleScroll()
  },
  watch: {
    dateRange (value) {
      if (!value) {
        delete this.filter.dateFrom
        delete this.filter.dateTo
      } else {
        this.filter.dateFrom = value[0]
        this.filter.dateTo = value[1]
      }
    }
  },
  computed: {
    regionTotal () {
      return this.regionTotalRes
    },
    getLocalize () {
      return this._i18n.locale
    }
  },

  methods: {
    getFromToDate () {
      const date = new Date()
      if (date.getDate() > 1) {
        this.dateTo = this.formatDate(
          new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1),
          false
        )
        date.setDate(1)
        this.dateFrom = this.formatDate(
          new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          false
        )
      } else if (date.getDate() === 1) {
        this.dateTo = this.formatDate(
          new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1),
          false
        )
        date.setDate(1)
        this.dateFrom = this.formatDate(
          new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()),
          false
        )
      }
    },
    searchTracking: debounce(function (keySearch) {
      this.getDataFirst()
    }, timeDebounce),

    async getDataFirst () {
      this.ui.isLoading = true
      const params = {
        trackingType: 0,
        trackingSn: 0,
        startDate: this.dateRange[0],
        endDate: this.dateRange[1]
      }
      try {
        const { data } = await getHotelStatusTrackingRegion(params)
        const dataRes = data.data
        this.region = dataRes[0]
        if (dataRes.length > 1) {
          this.regionTotalRes = dataRes.slice(1)
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    }, // getDataRegion
    getDataTable (dataTable, number) {
      if (!number && number !== 0) {
        return
      }
      if (number === 0) {
        this.getDataRegion(dataTable)
      } else if (number === 1) {
        this.getDataProvince(dataTable)
      } else if (number === 2) {
      }
    }, // getDataTable
    async getDataRegion (dataRegion) {
      if (!dataRegion) {
        return
      }
      this.ui.isLoading = true
      const params = {
        trackingType: dataRegion.trackingType,
        trackingSn: dataRegion.trackingSn,
        startDate: this.dateRange[0],
        endDate: this.dateRange[1]
      }
      try {
        const { data } = await getHotelStatusTrackingRegion(params)
        dataRegion.provinces = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
      return dataRegion
    }, // getDataRegion
    async getDataProvince (dataProvince) {
      if (!dataProvince) {
        return
      }
      this.ui.isLoading = true
      const params = {
        trackingType: dataProvince.trackingType,
        trackingSn: dataProvince.trackingSn,
        startDate: this.dateRange[0],
        endDate: this.dateRange[1]
      }
      try {
        const { data } = await getHotelStatusTrackingRegion(params)
        dataProvince.districts = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
      return dataProvince
    }, // getDataProvince

    async activeCollapse (className, dataTable, number) {
      if (!className) {
        return
      }
      var classColl = document.getElementsByClassName(className)[0]
      if (classColl.style.display === 'block') {
        classColl.style.display = 'none'
      } else {
        this.getDataTable(dataTable, number)
        classColl.style.display = 'block'
      }
    }, // activeCollapse

    doubleScroll () {
      const x = document.getElementById('tracking-hotel-scroll-first')
      const y = document.getElementById('tracking-hotel-scroll-second')
      y.addEventListener('scroll', function (e) {
        x.scrollLeft = y.scrollLeft
      })
      var elem = document.getElementsByClassName('post-sidebar')
      const postSidebar = elem[0]
      const scoll1 = document.getElementById('tracking-hotel-scroll-first')
      if (
        postSidebar &&
        !postSidebar.parentNode.classList.contains('scrollmagic-pin-spacer')
      ) {
        const controller = new ScrollMagic.Controller()
        const scene = new ScrollMagic.Scene({
          triggerElement: postSidebar,
          triggerHook: 0,
          duration: 0
        }).addTo(controller)
        if (window.matchMedia('(min-width: 768px)').matches) {
          scene.setPin(postSidebar, {
            pushFollowers: false
          })
        }
        scoll1.style.width = window.getComputedStyle(
          document.getElementById('tracking-hotel-scroll-second')
        ).width
      }
    },
    async exportDataRow (trackingSn, trackingType, hotelStatus, hotelTrackingType) {
      try {
        await this.$confirm(
        `${this.$t('message.messageAlert')}`, `${this.$t('message.warning')}`, {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        try {
          const params = {
            trackingType: trackingType,
            trackingSn: trackingSn,
            startDate: this.dateRange[0],
            endDate: this.dateRange[1],
            hotelStatus: hotelStatus,
            hotelTrackingType: hotelTrackingType
          }
          await exportDataHotelStatusTracking(params)
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
button {
  cursor: pointer;
}

.collapsible {
  width: 100%;
  // display: none;
}

.custom-size-w-300 {
  width: 300px;
}

.custom-size-w-150 {
  width: 150px;
}

.custom-title-tag-div {
  margin: 0 30px;
}

.custom-margin-left-70 {
  text-align: left;
  margin: 0 30px;
}

/*css for button*/
.custom-btn-w-h-s {
  font-size: 14px;
  width: 160px;
  height: 80px;
}

.custom-style-button {
  font-size: 18px;
  width: 160px;
  height: 80px;
}

.btn-blue {
  background-color: #65b951;
  color: white;
}

.tbn-child {
  border: 1px solid #ccc;
}

.btn-blue:hover {
  color: white;
}

.btn-area {
  background-color: #427fed;
  color: white;
}

.btn-area:hover {
  color: white;
}

/*custom text-color*/
.custom-text-color-red {
  color: #fe1616;
}

.custom-text-color-green {
  color: #38761d;
}

.style-tracking-padding-right {
  padding-left: 15px;
}

/*custom tabke in status tracking*/
.text-center-tracking {
  background-color: #427fed;
  font-size: 15px;
  font-weight: bold;
  color: #fff;
  border: 1px solid #00328c;
}

.body-status-tracking tbody tr td {
  text-align: center;
  height: 40px;
  border: 1px solid #427fed;
  font-weight: 700;
  vertical-align: middle;
}

.scroll-table table {
  table-layout: fixed;
}

.pos_abs-hotel-status {
  width: 400px;
  position: absolute;
  float: left;
  background: #ffffff;
}

.scroll-table table {
  width: 100%;
}

.scrollmagic-pin-spacer {
  z-index: 990;
}

.pd-width-hotel-status {
  padding-left: 410px;
  width: 2000px;
}

.btn-total-hotel-status {
  width: 100%;
  height: 80px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 22px;
  border: none;
}

.tbn-child {
  height: 40px;
  font-weight: bold;
  font-size: 20px;
  text-transform: uppercase;
  float: left;
}

.btn-title {
  font-size: 12px;
  float: right;
  pointer-events: none;
}

.post {
  padding: 50px;
}

.post p + p {
  margin-top: 30px;
}

.post-desc {
  margin-top: 30px;
}

.post-details {
  background: whitesmoke;
}

.post-details,
.post-sidebar-inner {
  padding: 30px;
}

.post-sidebar {
  margin-top: 20px;
  top: 0 !important;
}

.post-sidebar-inner {
  background: #aad7a3;
}

.post-sidebar div {
  font-weight: bold;
  background: #fbfbfb;
}

.post-sidebar div + div {
  margin-top: 0px;
}

.post-sidebar a {
  font-weight: normal;
  color: black;
  text-decoration: none;
}

.post-details,
.post-sidebar-inner {
  padding: 0px 0 0 0 !important;
}

table.info {
  margin: 0;
}

td {
  word-wrap: break-word !important;
}

#tracking-hotel-scroll-first {
  margin: 0;
}

.well {
  padding: 0 !important;
  margin-bottom: 0;
}

#tracking-hotel-scroll-second {
  overflow: auto;
}

.menu-icon {
  font-size: 10px !important;
}

.page-sidebar {
  width: 210px;
}

.page-sidebar:before {
  width: 205px;
}

.page-sidebar .sidebar-menu {
  margin-left: 2px;
}

.page-sidebar .sidebar-menu a {
  padding: 0;
}

.page-sidebar .sidebar-menu .submenu > li > a {
  padding-left: 30px;
}

.hotel-status-booking ::-webkit-scrollbar {
  width: 12px;
}

.hotel-status-booking ::-webkit-scrollbar-thumb {
  width: 12px;
  background: #c1c1c1;
}

.hotel-status-booking ::-webkit-scrollbar-thumb:hover {
  width: 12px;
  background: #999999;
}

.tracking .btn-success {
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
}

.tracking .btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.tracking .btn-danger {
  color: #fff;
  background-color: #c9302c;
  border-color: #ac2925;
}

.tracking .btn-info {
  color: #ffffff;
  background-color: #00b8d4;
  border-color: #00b8d4;
  box-shadow: none;
}

.tracking .btn-warning {
  color: #ffffff;
  background-color: #e69700;
  border-color: #e69700;
  box-shadow: none;
}

.tracking .btn_action:focus {
  box-shadow: unset !important;
}

table {
  border-collapse: collapse !important;
}

.btn-tracking-detail {
  color: #444;
  background-color: #fff;
  border-color: #ccc;
}

.tracking-block-top {
  visibility: hidden;
  display: none;
  z-index: 991;
}

.show-tracking-block-top {
  opacity: 1 !important;
  visibility: visible !important;
  display: block !important;
}

.export-data {
  cursor: pointer;
  text-decoration: none;
}

.export-data:hover {
  color: blue;
  text-decoration: underline;
}

.style-cicle-question {
  width: 100%;
}

.question-cicle-i {
  float: right;
  font-size: 24px;
  color: red;
}

.question-cicle-i:hover {
  font-size: 24px;
  color: red;
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  text-align: center;
  width: 125vh;
  background-color: #f2f2f2;
  color: #39393a;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 991;
  top: 100%;
  left: -117vh;
  margin-left: -30px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

.padding-top-70 {
  padding-top: 60px;
}
.btn-info {
  color: #ffffff;
  background-color: #00b8d4;
  border-color: #00b8d4;
  box-shadow: none;
  &:hover {
    background-color: #00a2bb;
    border-color: #00a2bb;
  }
}
.btn-warning {
  color: #ffffff;
  background-color: #ffa800;
  border-color: #ffa800;
  box-shadow: none;
  &:hover {
    color: #ffffff;
    background-color: #e69700;
    border-color: #e69700;
  }
}
.tracking-booking-block {
  min-height: calc(100vh - 150px);
  background-color: #ffffff;
  // padding: 30px;

  &__date-search {
    display: flex;
    align-items: center;
    gap: 15px;
    @media only screen and (max-width: 480px) {
        display:block !important;
      }
  }

  &__policy {
    display: grid;
    // grid-template-columns: 1fr 1fr 1fr;
    padding: 20px 15px;
    width: 100%;
    text-align: right;
  }

  &__content-table {
    .content-table {
      width: 100%;

      &__post-sidebar {
        .post-sidebar-inner {
          background: #ffffff;
          width: 100%;
          padding: 0px 0 0 0 !important;

          #block-scroll-first {
            margin: 0;
            margin-left: 0px;
            overflow-x: auto;
            overflow: hidden;

            .pd-width {
              padding-left: 250px;
              width: 2000px;
            }
          }
        }
      }
    }
  }
}
</style>
