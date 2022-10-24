<template>
  <div class="popup-direct-discount">
    <el-dialog :title="$t('page.directDiscount.name')" :visible.sync="ui.openPopupDirectDiscount" width="80vw">
      <el-form :model="form" v-loading="ui.isLoading">
          <div class="popup-direct-discount__row">
            <el-form-item :label="$t('page.extraFee.hotel_name')">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <el-form-item>
                    <el-input disabled :placeholder="$t('page.directDiscount.hotel_name')" v-model="form.hotelName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </div>

          <div class="popup-direct-discount__row">
            <el-form-item :label="$t('page.directDiscount.name_short_name')">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                  <el-form-item>
                    <el-input disabled :placeholder="$t('page.directDiscount.room_name')" v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                  <el-form-item>
                    <el-input disabled :placeholder="$t('page.directDiscount.short_name')" v-model="form.shortName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </div>

          <div class="popup-direct-discount__row">
            <el-form-item :label="$t('page.directDiscount.num_of_room')">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4">
                  <el-form-item>
                    <el-input-number disabled :controls="false" v-model="form.numOfRoomHotel" :min="1" :max="10" :placeholder="$t('page.directDiscount.num_of_room')"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </div>

          <div class="popup-direct-discount__row">
            <el-form-item :label="$t('page.directDiscount.start_end')" :required="typeApply == 1">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <el-form-item>
                    <el-date-picker
                      :disabled="typeApply !== 1"
                      class="popup-direct-discount__date-picker"
                      :picker-options="datePickerOptions"
                      v-model="startEndExtraFee"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      type="daterange"
                      @change="onChangeSpecialDate"
                      range-separator="~"
                      :start-placeholder="$t('page.directDiscount.start_date')"
                      :end-placeholder="$t('page.directDiscount.end_date')"
                      align="right">
                    </el-date-picker>
                    <el-radio style="margin-left: 1em" class="disable-label" v-model="typeApply" :label="1"></el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </div>

          <div class="popup-direct-discount__row">
            <el-form-item :label="$t('page.directDiscount.days_apply')" :required="typeApply == 1">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <el-form-item>
                    <el-checkbox-group v-model="checkDayList" :disabled="typeApply !== 1">
                      <el-checkbox :disabled="disabled.monday === 1 ? true : false" label="monday">{{ $t('page.directDiscount.monday') }}</el-checkbox>
                      <el-checkbox :disabled="disabled.tuesday === 1 ? true : false" label="tuesday">{{ $t('page.directDiscount.tuesday') }}</el-checkbox>
                      <el-checkbox :disabled="disabled.wednesday === 1 ? true : false" label="wednesday">{{ $t('page.directDiscount.wednesday') }}</el-checkbox>
                      <el-checkbox :disabled="disabled.thursday === 1 ? true : false" label="thursday">{{ $t('page.directDiscount.thursday') }}</el-checkbox>
                      <el-checkbox :disabled="disabled.friday === 1 ? true : false" label="friday">{{ $t('page.directDiscount.friday') }}</el-checkbox>
                      <el-checkbox :disabled="disabled.saturday === 1 ? true : false" label="saturday">{{ $t('page.directDiscount.saturday') }}</el-checkbox>
                      <el-checkbox :disabled="disabled.sunday === 1? true : false" label="sunday">{{ $t('page.directDiscount.sunday') }}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </div>

          <div class="popup-direct-discount__row">
            <el-form-item :label="$t('page.directDiscount.special_date')" :required="typeApply == 2">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <el-form-item>
                    <el-date-picker
                      :disabled="typeApply !== 2"
                      class="popup-direct-discount__date-picker"
                      :picker-options="datePickerOptions"
                      v-model="specialDateExtraFee"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      @change="onChangeSpecialDate"
                      :placeholder="$t('page.directDiscount.special_date')">
                    </el-date-picker>
                    <el-radio style="margin-left: 1em" class="disable-label" v-model="typeApply" :label="2"></el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </div>

          <div class="popup-direct-discount__row">
            <el-form-item :label="$t('page.directDiscount.special_date')" :required="typeApply == 2">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <el-form-item>
                    <div style="border: 1px solid #E4E7ED; min-height: 40px">
                      <el-tag
                      :disabled="typeApply !== 2"
                      style="margin: 0 4px"
                      v-for="(item, index) in specialDate"
                      :key="index"
                      closable
                      @close="handleRemoveSpecialDate(item)">
                      {{ item }}
                      </el-tag>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </div>

          <div class="popup-direct-discount__row">
            <el-form-item :label="$t('page.directDiscount.first_hours_price')">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="2" :lg="3" :xl="2">{{ $t('page.directDiscount.num_of_hours') }}</el-col>
                <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3">
                  <el-form-item>
                    <el-input disabled :placeholder="$t('page.directDiscount.num_of_hours')" v-model="form.firstHours"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="4" :lg="5" :xl="4">
                  <el-form-item :label="$t('page.directDiscount.price')">
                    <el-input disabled :placeholder="$t('page.directDiscount.price')" :value="formatMoney(form.firstHoursOrigin)"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="24" :md="5" :lg="3" :xl="3">{{ $t('page.directDiscount.direct_discount_price') }}</el-col>
                <el-col :xs="17" :sm="12" :md="3" :lg="4" :xl="3">
                  <el-form-item>
                    <el-input :disabled="form.firstHoursOrigin === 0" v-model="priceFirstHours" @change="onChangeFirstHoursInputAfterExtra" :placeholder="$t('page.directDiscount.direct_discount_price')">
                      <i slot="suffix">VND</i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="7" :sm="12" :md="2" :lg="2" :xl="2">
                  <el-form-item>
                    <el-input :disabled="form.firstHoursOrigin === 0" v-model="percent.firstHoursPer" @change="onChangeFirstHoursInputPer">
                      <i slot="suffix">%</i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </div>

          <div class="popup-direct-discount__row">
            <el-form-item :label="$t('page.directDiscount.plus_hours_price')">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="2" :lg="3" :xl="2">{{ $t('page.extraFee.num_of_hours') }}</el-col>
                <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3">
                  <el-form-item>
                      <el-input disabled :placeholder="$t('page.directDiscount.num_of_hours')" v-model="form.additionalHours"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="4" :lg="5" :xl="4">
                  <el-form-item prop="name" :label="$t('page.directDiscount.price')">
                    <el-input disabled :placeholder="$t('page.directDiscount.price')" :value="formatMoney(form.additionalOrigin)"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="24" :md="5" :lg="3" :xl="3">{{ $t('page.directDiscount.direct_discount_price') }}</el-col>
                <el-col :xs="17" :sm="12" :md="3" :lg="4" :xl="3">
                  <el-form-item>
                    <el-input :disabled="form.additionalOrigin === 0" v-model="priceAdditionalHours" @change="onChangeAddHoursInputAfterExtra" :placeholder="$t('page.directDiscount.direct_discount_price')">
                      <i slot="suffix">VND</i>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="7" :sm="12" :md="2" :lg="2" :xl="2">
                  <el-form-item>
                    <el-input :disabled="form.additionalOrigin === 0" v-model="percent.additionalPer" @change="onChangeAddHoursInputPer">
                      <i slot="suffix">%</i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </div>

          <div class="popup-direct-discount__row">
            <el-form-item :label="$t('page.directDiscount.overnight_price')">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="4" :lg="5" :xl="4">
                  <el-form-item prop="name" :label="$t('page.directDiscount.price')">
                    <el-input disabled :placeholder="$t('page.directDiscount.price')" :value="formatMoney(form.overnightOrigin)"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="24" :md="5" :lg="3" :xl="3">{{ $t('page.directDiscount.direct_discount_price') }}</el-col>
                <el-col :xs="17" :sm="12" :md="3" :lg="4" :xl="3">
                  <el-form-item>
                    <el-input :disabled="form.overnightOrigin === 0" v-model="priceOvernight" @change="onChangeOvernightInputAfterExtra" :placeholder="$t('page.directDiscount.direct_discount_price')">
                      <i slot="suffix">VND</i>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="7" :sm="12" :md="2" :lg="2" :xl="2">
                  <el-form-item>
                    <el-input :disabled="form.overnightOrigin == 0" v-model="percent.overnightPer" @change="onChangeOvernightInputPer">
                      <i slot="suffix">%</i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </div>

          <div class="popup-direct-discount__row">
            <el-form-item :label="$t('page.directDiscount.one_day_price')">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="4" :lg="5" :xl="4">
                  <el-form-item prop="name" :label="$t('page.directDiscount.price')">
                      <el-input disabled :placeholder="$t('page.directDiscount.price')" :value="formatMoney(form.oneDayOrigin)"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="24" :md="5" :lg="3" :xl="3">{{ $t('page.directDiscount.direct_discount_price') }}</el-col>
                <el-col :xs="17" :sm="12" :md="3" :lg="4" :xl="3">
                  <el-form-item>
                    <el-input :disabled="form.oneDayOrigin === 0" v-model="priceOneDay" @change="onChangeOneDayInputAfterExtra" :placeholder="$t('page.directDiscount.direct_discount_price')">
                      <i slot="suffix">VND</i>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="7" :sm="12" :md="2" :lg="2" :xl="2">
                  <el-form-item>
                    <el-input class="custom-w" :disabled="form.oneDayOrigin == 0" v-model="percent.oneDayPer" @change="onChangeOneDayInputPer">
                      <i slot="suffix">%</i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </div>
      </el-form>

      <div class="popup-direct-discount__button">
        <el-button :loading="ui.isSubmitting" type="primary" @click="onCreteDirectDiscount">{{ $t('page.calendar.createSchedule')}}</el-button>
      </div>

      <!-- ======================================= table ======================================== -->
      <el-table
          v-loading="ui.isLoadingDirectDiscount"
          :data="tableData"
          max-height="520"
          style="width: 100%">
          <el-table-column
              type="index"
              label="#"
              :min-width="2"
          />
          <el-table-column
              :label="$t('page.directDiscount.booking_type')"
              :min-width="120"
          >
              <template slot-scope="scope">
                <p v-if="scope.row.firstHoursOrigin > scope.row.priceFirstHours">
                  {{ $t('option.roomType.hourly') }}
                </p>
                <p v-if="scope.row.overnightOrigin > scope.row.priceOvernight">
                  {{ $t('option.roomType.overnight') }}
                </p>
                <p v-if="scope.row.oneDayOrigin > scope.row.priceOneDay">
                  {{ $t('option.roomType.daily') }}
                </p>
              </template>
          </el-table-column>
          <el-table-column
              :label="$t('page.directDiscount.origin') + ' (VND)'"
              :min-width="120"
          >
              <template slot-scope="scope">
                  <p v-if="scope.row.firstHoursOrigin > scope.row.priceFirstHours">
                      {{ formatMoney(scope.row.firstHoursOrigin) }}
                  </p>
                  <p v-if="scope.row.overnightOrigin > scope.row.priceOvernight">
                      {{ formatMoney(scope.row.overnightOrigin) }}
                  </p>
                  <p v-if="scope.row.oneDayOrigin > scope.row.priceOneDay">
                      {{ formatMoney(scope.row.oneDayOrigin) }}
                  </p>
              </template>
          </el-table-column>
          <el-table-column
              :label="$t('page.directDiscount.name') + ' (VND)'"
              :min-width="130"
          >
              <template slot-scope="scope">
                  <p v-if="scope.row.firstHoursOrigin > scope.row.priceFirstHours">
                      {{ formatMoney(scope.row.priceFirstHours) }}
                  </p>
                  <p v-if="scope.row.overnightOrigin > scope.row.priceOvernight">
                      {{ formatMoney(scope.row.priceOvernight) }}
                  </p>
                  <p v-if="scope.row.oneDayOrigin > scope.row.priceOneDay">
                      {{ formatMoney(scope.row.priceOneDay) }}
                  </p>
              </template>
          </el-table-column>
          <el-table-column
              :label="$t('page.directDiscount.start_end')"
              :min-width="200"
          >
              <template slot-scope="scope">
                  {{ scope.row.startDate ? `${formatDate(scope.row.startDate,false)} ~ ${formatDate(scope.row.endDate,false)}` : '' }}
              </template>
          </el-table-column>
          <el-table-column
              :label="$t('page.directDiscount.days_apply')"
              :min-width="180"
          >
              <template slot-scope="scope">
                  <p v-if="scope.row.monday">{{ $t('page.directDiscount.monday') }}</p>
                  <p v-if="scope.row.tuesday">{{ $t('page.directDiscount.tuesday') }}</p>
                  <p v-if="scope.row.wednesday">{{ $t('page.directDiscount.wednesday') }}</p>
                  <p v-if="scope.row.thursday">{{ $t('page.directDiscount.thursday') }}</p>
                  <p v-if="scope.row.friday">{{ $t('page.directDiscount.friday') }}</p>
                  <p v-if="scope.row.saturday">{{ $t('page.directDiscount.saturday') }}</p>
                  <p v-if="scope.row.sunday">{{ $t('page.directDiscount.sunday') }}</p>
              </template>
          </el-table-column>
          <el-table-column
              :label="$t('page.directDiscount.special_date')"
              :min-width="200"
          >
              <template slot-scope="scope">
                  <p v-for="(item, index) in scope.row.specialDate" :key="index">{{ item }}</p>
              </template>
          </el-table-column>
          <el-table-column
            :min-width="100">
            <template slot-scope="scope">
              <el-button
                :loading="ui.isLoadingDelete"
                type="danger"
                size="small"
                plain
                @click="onDelete(scope.row.sn)"
                icon="el-icon-delete"
              >
                {{ $t('button.delete') }}
              </el-button>
            </template>
            </el-table-column>
      </el-table>

      <div slot="footer" class="popup-direct-discount__button">
        <el-button type="success" @click="ui.openPopupDirectDiscount = false">{{ $t('button.save') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoomType, listDirectDiscount, onCheckDayApply } from '@/api/roomType'
import { onCreateDirectDiscount, onDeleteDirectDiscount } from './api'

export default {
  name: 'PopupDirectDiscount',
  data (vm) {
    return {
      roomSn: null,
      form: {},
      disabled: {},
      ui: {
        openPopupDirectDiscount: false,
        isLoading: false,
        isLoadingDirectDiscount: false,
        isLoadingDelete: false,
        isSubmitting: false
      },
      // support field
      percent: {
        firstHoursPer: 0,
        additionalPer: 0,
        overnightPer: 0,
        oneDayPer: 0
      },
      // end support field

      datePickerOptions: {
        disabledDate (date) {
          return date < new Date(Date.now() - 8.64e7)
        }
      },

      checkDayList: [],
      specialDate: [],
      tableData: [],
      tableRows: [
        {
          prop: 'number'
        },
        {
          prop: 'bookingType'
        },
        {
          prop: 'origin'
        },
        {
          prop: 'price'
        },
        {
          prop: 'startEndDate'
        },
        {
          prop: 'dayApply'
        },
        {
          prop: 'specialDate'
        },
        {
          prop: 'totalReview'
        },
        {
          prop: 'lastComment'
        }
      ],
      rules: {
        additionalHours: [
          { required: true, message: vm.$t('room_type.this_field_is_required'), trigger: ['blur'] }
        ],
        endDate: [
          { required: true, message: vm.$t('room_type.this_field_is_required'), trigger: ['blur'] }
        ],
        firstHours: [
          { required: true, message: vm.$t('room_type.this_field_is_required'), trigger: ['blur'] }
        ],
        priceAdditionalHours: [
          { required: true, message: vm.$t('room_type.this_field_is_required'), trigger: ['blur'] }
        ],
        priceFirstHours: [
          { required: true, message: vm.$t('room_type.this_field_is_required'), trigger: ['blur'] }
        ],
        priceOneDay: [
          { required: true, message: vm.$t('room_type.this_field_is_required'), trigger: ['change'] }
        ],
        priceOvernight: [
          { required: true, message: vm.$t('room_type.this_field_is_required'), trigger: ['change'] }
        ],
        specialDate: [
          { required: true, message: vm.$t('room_type.this_field_is_required'), trigger: ['change'] }
        ],
        startDate: [
          { required: true, message: vm.$t('room_type.this_field_is_required'), trigger: ['change'] }
        ],
        type: [
          { required: true, message: vm.$t('room_type.this_field_is_required'), trigger: ['change'] }
        ],
        typeApply: [
          { required: true, message: vm.$t('room_type.this_field_is_required'), trigger: ['change'] }
        ]
      },
      startEndExtraFee: '',
      typeApply: 1,
      specialDateExtraFee: '' // ngày chọn đặt biệt
    }
  },

  computed: {
    priceFirstHours: {
      get () {
        return this.formatMoney(this.form.priceFirstHours)
      },
      set (val) {
        this.form.priceFirstHours = val.split('.').join('')
      }
    },
    priceAdditionalHours: {
      get () {
        return this.formatMoney(this.form.priceAdditionalHours)
      },
      set (val) {
        this.form.priceAdditionalHours = val.split('.').join('')
      }
    },
    priceOvernight: {
      get () {
        return this.formatMoney(this.form.priceOvernight)
      },
      set (val) {
        this.form.priceOvernight = val.split('.').join('')
      }
    },
    priceOneDay: {
      get () {
        return this.formatMoney(this.form.priceOneDay)
      },
      set (val) {
        this.form.priceOneDay = val.split('.').join('')
      }
    }
  },

  watch: {
    typeApply () {
      this.onResetDay()
    }
  },

  methods: {
    open (roomSn) {
      this.ui.openPopupDirectDiscount = true
      this.roomSn = roomSn
      this.getRoomDetail(roomSn)
      this.getListDirectDiscount(roomSn)

      this.onResetDay()
    },
    async getRoomDetail (roomSn) {
      this.ui.isLoading = true
      try {
        const { data } = await getRoomType(roomSn)
        if (data) {
          this.form = data.data
        }
      } catch (error) {
        this.$message({
          type: 'error',
          message: error.response ? error.response.data.message : error
        })
      } finally {
        this.ui.isLoading = false
      }
    },
    async getListDirectDiscount (roomSn) {
      this.ui.isLoadingDirectDiscount = true
      try {
        const { data } = await listDirectDiscount(roomSn)
        if (data) {
          this.tableData = data.data
        }
      } catch (error) {
        this.$message({
          type: 'error',
          message: error.response ? error.response.data.message : error
        })
      } finally {
        this.ui.isLoadingDirectDiscount = false
      }
    },
    async checkDayApply (val) {
      try {
        const params = {
          type: 1,
          typeApply: this.typeApply,
          startDate: this.typeApply === 1 ? this.startEndExtraFee[0] : '',
          endDate: this.typeApply === 1 ? this.startEndExtraFee[1] : '',
          specialDate: this.typeApply === 2 ? val : []
        }
        const { data } = await onCheckDayApply(this.roomSn, params)
        if (data && this.typeApply === 1) {
          this.disabled = data.data
          // this.returnDataDayOfWeek();
          this.checkDayList = []
        } else if (data && this.typeApply === 2) {
          // this.specialDateExtraFee = val;
          this.specialDate.push(val)
        }

        this.$message({
          type: 'success',
          message: `${this.$t('page.directDiscount.checkSuccess')}`
        })
      } catch (error) {
        this.$message({
          type: 'error',
          message: error.response ? error.response.data.message[0].message : error
        })
      }
    },
    onChangeSpecialDate (data) {
      data && this.checkDayApply(data)
    },
    onChangeFirstHoursInputAfterExtra () {
      if (this.form.firstHoursOrigin > this.form.priceFirstHours) {

      } else {
        const firstHoursPer = Math.ceil((this.form.priceFirstHours - this.form.firstHoursOrigin) * 100 / this.form.firstHoursOrigin)
        this.percent.firstHoursPer = firstHoursPer > 0 ? firstHoursPer : 0

        if (this.percent.firstHoursPer > 500) {
          this.form.priceFirstHours = this.form.firstHoursOrigin
          this.percent.firstHoursPer = 0
        }
      }
    },
    onChangeFirstHoursInputPer (firstHoursPer) {
      if (firstHoursPer > 500 || firstHoursPer < 1) {
        this.firstHoursPer = 0
        this.form.priceFirstHours = this.form.firstHoursOrigin
      } else {
        this.form.priceFirstHours = Math.ceil(this.form.firstHoursOrigin + (this.form.firstHoursOrigin * this.percent.firstHoursPer / 100))
      }
    },
    onChangeAddHoursInputAfterExtra () {
      if (this.form.additionalOrigin > this.form.priceAdditionalHours) {

      } else {
        const additionalPer = Math.ceil((this.form.priceAdditionalHours - this.form.additionalOrigin) * 100 / this.form.additionalOrigin)
        this.percent.additionalPer = additionalPer > 0 ? additionalPer : 0

        if (this.percent.additionalPer > 500) {
          this.form.priceAdditionalHours = this.form.additionalOrigin
          this.percent.additionalPer = 0
        }
      }
    },
    onChangeAddHoursInputPer (additionalPer) {
      if (additionalPer > 500 || additionalPer < 1) {
        this.percent.additionalPer = 0
        this.form.priceAdditionalHours = this.form.additionalOrigin
      } else {
        this.form.priceAdditionalHours = Math.ceil(this.form.additionalOrigin + (this.form.additionalOrigin * this.percent.additionalPer / 100))
      }
    },
    onChangeOvernightInputAfterExtra () {
      if (this.form.overnightOrigin > this.form.priceOvernight) {

      } else {
        const overnightPer = Math.ceil((this.form.priceOvernight - this.form.overnightOrigin) * 100 / this.form.overnightOrigin)
        this.percent.overnightPer = overnightPer > 0 ? overnightPer : 0

        if (this.percent.overnightPer > 500) {
          this.form.priceOvernight = this.form.overnightOrigin
          this.percent.overnightPer = 0
        }
      }
    },
    onChangeOvernightInputPer (overnightPer) {
      if (overnightPer > 500 || overnightPer < 1) {
        this.percent.overnightPer = 0
        this.form.priceOvernight = this.form.overnightOrigin
      } else {
        this.form.priceOvernight = Math.ceil(this.form.overnightOrigin + (this.form.overnightOrigin * this.percent.overnightPer / 100))
      }
    },
    onChangeOneDayInputAfterExtra () {
      if (this.form.oneDayOrigin > this.form.priceOneDay) {

      } else {
        const oneDayPer = Math.ceil((this.form.priceOneDay - this.form.oneDayOrigin) * 100 / this.form.oneDayOrigin)
        this.percent.oneDayPer = oneDayPer > 0 ? oneDayPer : 0

        if (this.percent.oneDayPer > 500) {
          this.form.priceOneDay = this.form.oneDayOrigin
          this.percent.oneDayPer = 0
        }
      }
    },
    onChangeOneDayInputPer (oneDayPer) {
      if (oneDayPer > 500 || oneDayPer < 1) {
        this.percent.oneDayPer = 0
        this.form.priceOneDay = this.form.oneDayOrigin
      } else {
        this.form.priceOneDay = Math.ceil(this.form.oneDayOrigin + (this.form.oneDayOrigin * this.percent.oneDayPer / 100))
      }
    },
    async onCreteDirectDiscount () {
      this.ui.isSubmitting = true
      try {
        const formData = Object.keys(this.form).reduce((formData, key) => {
          formData.append(key, this.form[key])
          return formData
        }, new FormData())

        this.checkDayList.forEach(element => {
          formData.append(element, 1)
        })

        await onCreateDirectDiscount(this.form.sn, formData)
        this.$message({
          type: 'success',
          message: `${this.$t('room_type.message.success')}`
        })
      } catch (error) {
        this.$message({
          type: 'error',
          message: error.response ? error.response.data.message : error
        })
      } finally {
        this.ui.isSubmitting = false
      }
    },
    async onDelete (sn) {
      this.ui.isLoadingDelete = true
      try {
        const { data } = await onDeleteDirectDiscount(sn)
        if (data) {
          // this.$emit('reloadRoom');
          this.getListDirectDiscount(this.form.sn)
        }
        this.$message({
          type: 'success',
          message: `${this.$t('room_type.message.success')}`
        })
      } catch (error) {
        this.$message({
          type: 'error',
          message: error.response ? error.response.data.message : error
        })
      } finally {
        this.ui.isLoadingDelete = false
      }
    },
    async onResetDay () {
      this.specialDate = []
      this.checkDayList = []
      this.startEndExtraFee = ''
      this.specialDateExtraFee = ''
      this.disabled = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-direct-discount {
  :deep(.el-dialog__wrapper) {
    overflow: hidden;
    .el-dialog {
      margin-top: 10px !important;
      @media (max-width: 768px) {
        width: 90vw !important;
      }
    }
    .el-dialog__body {
      height: calc(100vh - 144px);
      overflow-y: scroll;
    }
    ::-webkit-scrollbar {
        width: 1px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 30px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 30px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
  }
// ======
  &__row {
    :deep(.el-form-item) {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      flex-wrap: wrap;
      @media (max-width: 768px) {
        display: block;
      }
    }
    :deep(.el-form-item__label) {
      text-align: left;
      flex: 3;
    }
    :deep(.el-form-item__content) {
      flex: 12;
    }
    :deep(.el-form-item__error) {
      position: unset;
    }
  }
  &__button {
    text-align: center;
  }
}
.el-col {
  padding: unset;
}
.el-form-item {
  margin-bottom: 1vh;
}

.w-100 {
  width: 100%;
}
</style>
