<template>
  <el-dialog
    :id="id"
    class="extra-fee-dialog"
    :title="$t('page.extraFee.name')"
    :visible.sync="extraFeeModalVisible"
    top="12px"
    width="80%"
  >
    <div class="customs-edit-extra-fee">
      <el-row>
        <el-col :span="4">
          <p>{{ $t("page.extraFee.hotel_name") }}</p>
        </el-col>
        <el-col :span="20">
          <el-input v-model="extraFee.hotelName" disabled />
        </el-col>
      </el-row>  <!-- hotel name -->
      <el-row>
        <el-col :span="4">
          <p>{{ $t("page.extraFee.name_short_name") }}</p>
        </el-col>
        <el-col :span="15">
          <el-input disabled type="text" v-model="extraFee.name" />
        </el-col>
        <el-col :span="5">
          <el-input disabled type="text" v-model="extraFee.shortName" />
        </el-col>
      </el-row> <!-- name/short name -->
      <el-row>
        <el-col :span="4">
          <p>{{ $t("page.extraFee.num_of_room") }}</p>
        </el-col>
        <el-col :span="6">
          <el-input disabled type="text" v-model="extraFee.numOfRoomHotel" />
        </el-col>
      </el-row>  <!-- num of room -->
      <el-row>
        <el-col :span="4">
          <p>
            {{ $t("page.extraFee.start_end") }}
            <span v-if="typeApply === 1" style="color:red;">(*)</span>
          </p>
        </el-col>
        <el-col :span="20">
          <el-date-picker
            v-model="startDateExtraFee"
            :disabled="typeApply === 2"
            :picker-options="datePickerOptions"
            type="date"
            @change="onChangeStartDate"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
          ~
          <el-date-picker
            v-model="endDateExtraFee"
            :disabled="typeApply === 2"
            :picker-options="dateEndPickerOptions"
            type="date"
            @change="onChangeEndDate"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
          <el-radio
            class="date-type disable-label"
            @change="onChageDayApply"
            v-model="typeApply"
            :label="1"
          ></el-radio>
        </el-col>
      </el-row> <!-- start/end -->
      <el-row>
        <el-col :span="4">
          <p>
            {{ $t("page.extraFee.days_apply")
            }}<span v-if="typeApply === 1" style="color:red;">(*)</span>
          </p>
        </el-col>
        <el-col :span="20">
          <el-row>
            <el-col :span="3">
              <el-checkbox
                :disabled="typeApply === 2 || disabled.monday === 1"
                :true-label="1"
                :false-label="0"
                v-model="extraFee.monday"
              >
                {{ $t('page.extraFee.monday')}}
              </el-checkbox>
            </el-col>
            <el-col :span="3">
              <el-checkbox
                :disabled="typeApply === 2 || disabled.tuesday === 1"
                :true-label="1"
                :false-label="0"
                v-model="extraFee.tuesday"
              >
                {{ $t('page.extraFee.tuesday')}}
              </el-checkbox>
            </el-col>
            <el-col :span="3">
              <el-checkbox
                :disabled="typeApply === 2 || disabled.wednesday === 1"
                :true-label="1"
                :false-label="0"
                v-model="extraFee.wednesday"
              >
                {{ $t('page.extraFee.wednesday')}}
              </el-checkbox>
            </el-col>
            <el-col :span="3">
              <el-checkbox
                :disabled="typeApply === 2 || disabled.thursday === 1"
                :true-label="1"
                :false-label="0"
                v-model="extraFee.thursday"
              >
                {{ $t('page.extraFee.thursday')}}
              </el-checkbox>
            </el-col>
            <el-col :span="3">
              <el-checkbox
                :disabled="typeApply === 2 || disabled.friday === 1"
                :true-label="1"
                :false-label="0"
                v-model="extraFee.friday"
              >
                {{ $t('page.extraFee.friday')}}
              </el-checkbox>
            </el-col>
            <el-col :span="3">
              <el-checkbox
                :disabled="typeApply === 2 || disabled.saturday === 1"
                :true-label="1"
                :false-label="0"
                v-model="extraFee.saturday"
              >
                {{ $t('page.extraFee.saturday')}}
              </el-checkbox>
            </el-col>
            <el-col :span="3">
              <el-checkbox
                :disabled="typeApply === 2 || disabled.sunday === 1"
                :true-label="1"
                :false-label="0"
                v-model="extraFee.sunday"
              >
                {{ $t('page.extraFee.sunday')}}
              </el-checkbox>
            </el-col>
          </el-row>
        </el-col>
      </el-row> <!-- day apply -->
      <el-row>
        <el-col :span="4">
          <p>
            {{ $t("page.extraFee.special_date")
            }}<span v-if="typeApply === 2" style="color:red;">(*)</span>
          </p>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            :disabled="typeApply === 1"
            v-model="extraFee.specialDate"
            popper-class="disable-time-picker"
            :picker-options="datePickerOptions"
            @change="onChangeSpecialDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
          <el-radio
            class="date-type disable-label"
            @change="onChageDayApply"
            v-model="typeApply"
            :label="2"
          ></el-radio>
        </el-col>
      </el-row> <!-- special date picker -->
      <el-row>
        <el-col :span="4">
          <p>
            {{ $t("page.extraFee.special_date")
            }}<span v-if="typeApply === 2" style="color:red;">(*)</span>
          </p>
        </el-col>
        <el-col :span="20">
          <el-tag
            :class="typeApply === 1 ? 'disabled' : ' '"
            class="tag-custom"
            :isDisabled="true"
            v-for="tag in specialDateExtraFee"
            :key="tag"
            type="success"
            :disable-transitions="false"
            closable
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
        </el-col>
      </el-row> <!-- special date tag -->
      <el-row>
        <el-col :span="4">
          <p>{{ $t("page.extraFee.first_hours_price") }}</p>
        </el-col>
        <el-col :span="3">
          <p>{{ $t("page.extraFee.num_of_hours") }}</p>
        </el-col>
        <el-col :span="2">
          <el-input
            disabled
            type="text"
            v-model="extraFee.firstHours"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <p>{{ $t("page.extraFee.price") }}</p>
        </el-col>
        <el-col :span="4">
          <el-input
            disabled
            type="text"
            v-model="extraFee.firstHoursOrigin"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <p>{{ $t("page.extraFee.after_extra_fee") }}</p>
        </el-col>
        <el-col :span="3">
          <el-input
            :disabled="extraFee.firstHoursOrigin === 0"
            type="text"
            v-model="extraFee.priceFirstHours"
            @change="onChangeInput('firstHours', 'after')"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-input
            :disabled="extraFee.firstHoursOrigin === 0"
            class="custom-width"
            max="300"
            type="text"
            v-model="firstHoursPer"
            @change="onChangeInput('firstHours', 'per')"
          ></el-input
          >%
        </el-col>
      </el-row> <!-- first hour price-->
      <el-row>
        <el-col :span="4">
          <p>{{ $t("page.extraFee.plus_hours_price") }}</p>
        </el-col>
        <el-col :span="3">
          <p>{{ $t("page.extraFee.num_of_hours") }}</p>
        </el-col>
        <el-col :span="2">
          <el-input
            disabled
            type="text"
            v-model="extraFee.additionalHours"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <p>{{ $t("page.extraFee.price") }}</p>
        </el-col>
        <el-col :span="4">
          <el-input
            disabled
            type="text"
            v-model="extraFee.additionalOrigin"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <p>{{ $t("page.extraFee.after_extra_fee") }}</p>
        </el-col>
        <el-col :span="3">
          <el-input
            :disabled="extraFee.additionalOrigin === 0"
            type="text"
            v-model="extraFee.priceAdditionalHours"
            @change="onChangeInput('additional', 'after')"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-input
            :disabled="extraFee.additionalOrigin === 0"
            class="custom-width"
            max="300"
            type="text"
            v-model="additionalPer"
            @change="onChangeInput('additional', 'per')"
          ></el-input
          >%
        </el-col>
      </el-row> <!-- plus  hour price-->
      <el-row>
        <el-col :span="4">
          <p>{{ $t("page.extraFee.overnight_price") }}</p>
        </el-col>
        <el-col :span="3">
          <p>{{ $t("page.extraFee.price") }}</p>
        </el-col>
        <el-col :span="2">
          <el-input
            type="text"
            disabled
            v-model="extraFee.overnightOrigin"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <p>{{ $t("page.extraFee.after_extra_fee") }}</p>
        </el-col>
        <el-col :span="4">
          <el-input
            :disabled="extraFee.overnightOrigin === 0"
            type="text"
            v-model="extraFee.priceOvernight"
            @change="onChangeInput('overnight', 'after')"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-input
            :disabled="extraFee.overnightOrigin === 0"
            class="custom-width"
            type="text"
            v-model="overnightPer"
            @change="onChangeInput('overnight', 'per')"
          ></el-input
          >%
        </el-col>
      </el-row> <!-- overnight price -->
      <el-row>
        <el-col :span="4">
          <p>{{ $t("page.extraFee.one_day_price") }}</p>
        </el-col>
        <el-col :span="3">
          <p>{{ $t("page.extraFee.price") }}</p>
        </el-col>
        <el-col :span="2">
          <el-input
            type="text"
            disabled
            v-model="extraFee.oneDayOrigin"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <p>{{ $t("page.extraFee.after_extra_fee") }}</p>
        </el-col>
        <el-col :span="4">
          <el-input
            :disabled="extraFee.oneDayOrigin === 0"
            type="text"
            v-model="extraFee.priceOneDay"
            @change="onChangeInput('oneDay', 'after')"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-input
            :disabled="extraFee.oneDayOrigin === 0"
            class="custom-width"
            type="text"
            v-model="oneDayPer"
            @change="onChangeInput('oneDay', 'per')"
          ></el-input
          >%
        </el-col>
      </el-row> <!-- one day price -->
      <div class="bt-create center">
        <el-button type="primary" @click="onCreteExtraFee()">
          {{ $t("page.calendar.create") }}
        </el-button>
      </div>
      <div
        :style="
          `${
            tableData && tableData.length > 0 ? 'max-height: 140px' : ''
          }; overflow-y: scroll;`
        "
      >
        <el-table
          :data="tableData"
          v-loading="loadingExtraFee"
        >
          <el-table-column
            label="#"
            type="index"
          />
          <el-table-column
            :label="$t('page.detailRoomType.extra_fee.booking_type')"
            :min-width="160"
          >
            <template slot-scope="scope">
                <span
                  v-for="type in getBookingType(scope.row,'extraFee')"
                  :key="type"

                >
                  {{ $t(`${type}`) }}<br>
                </span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.detailRoomType.extra_fee.origin')"
            :min-width="160"
          >
            <template slot-scope="scope">
              <span
                v-show="scope.row.firstHoursOrigin < scope.row.priceFirstHours"
              >
                  {{ scope.row.firstHoursOrigin }}<br>
              </span>
              <span
                v-show="scope.row.overnightOrigin < scope.row.priceOvernight"
              >
                  {{ scope.row.overnightOrigin }}<br>
              </span>
              <span
                v-show="scope.row.oneDayOrigin < scope.row.priceOneDay"
              >
                  {{ scope.row.oneDayOrigin }}<br>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.detailRoomType.extra_fee.name')"
            :min-width="160"
          >
            <template slot-scope="scope">
              <span
                v-show="scope.row.firstHoursOrigin < scope.row.priceFirstHours"
              >
                  {{ scope.row.priceFirstHours }}<br>
              </span>
              <span
                v-show="scope.row.overnightOrigin < scope.row.priceOvernight"
              >
                  {{ scope.row.priceOvernight }}<br>
              </span>
              <span
                v-show="scope.row.oneDayOrigin < scope.row.priceOneDay"
              >
                  {{ scope.row.priceOneDay }}<br>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.detailRoomType.extra_fee.start_end')"
            :min-width="180"
          >
            <template slot-scope="scope">
              {{ `${formatDate(scope.row.startDate,false)} ~ ${formatDate(scope.row.endDate,false)}` }}

            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.detailRoomType.extra_fee.days_apply')"
            :min-width="160"
          >
            <template slot-scope="scope">
              <span
                v-for="date in getDaysOfWeek(scope.row)"
                :key="date">
                {{  $t('page.extraFee.'+date) }}
              </span>

            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.detailRoomType.extra_fee.special_date')"
            :min-width="160"
          >
            <template slot-scope="scope">
              <span
                v-for="(p,index) in scope.row.specialDate"
                :key="'1'+index"
                :class="'custom-p-'+index"
                style="margin-right: 10px;"
              >{{p}}</span>
            </template>
          </el-table-column>
          <el-table-column
              :min-width="160"
            >
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  size="small"
                  plain
                  @click="onDelete(scope.row.sn)"
                  icon="el-icon-delete"
                >
                  {{ $t("page.calendar.delete") }}
                </el-button>
              </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer center" style="margin-top: 14px">
        <el-button type="success" @click="onSave">
          {{ $t("page.calendar.save") }}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { getRoomType, listExtraFee, onCheckDayApply } from '@/api/roomType'
import { onCreateExtraFee, onDeleteExtraFee } from './api'

export default {
  data () {
    return {
      extraFeeModalVisible: false,
      data: null,
      sn: 0,
      extraFee: {},
      endDateExtraFee: '',
      startDateExtraFee: '',
      firstHoursPer: 0,
      additionalPer: 0,
      overnightPer: 0,
      oneDayPer: 0,
      disabled: {},
      specialDateExtraFee: [],
      isError: null,
      selectHotel: [],
      datePickerOptions: { disabledDate: this.disabledDueDate },
      dateEndPickerOptions: { disabledDate: this.disabledDueDate },
      loadingExtraFee: false,
      typeApply: 1,
      tableData: []
    }
  },
  created () {
    this.reset()
  },
  watch: {},
  components: {
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  computed: {},
  methods: {
    disabledDueDate (date) {
      return date < new Date(Date.now() - 8.64e7)
    },

    async onDelete (id) {
      this.loadingExtraFee = true
      try {
        await onDeleteExtraFee(id)
        await this.$emit('reloadRoom')
        await this.getExtraFee()
        this.$message({
          type: 'success',
          message: `${this.$t('page.extraFee.success')}`
        })
      } catch (error) {
        return false
      } finally {
        this.loadingExtraFee = false
      }
    },

    onSave () {
      this.clearDataAfterCreate()
      this.onChageDayApply()
      this.onClose()
    },

    handleClose (tag) {
      this.specialDateExtraFee.splice(this.specialDateExtraFee.indexOf(tag), 1)
    },

    checkValue (col, type) {
      switch (col) {
        case 'firstHours':
          if (
            (Number(this.firstHoursPer) > 500 ||
              Number(this.firstHoursPer) < 1) &&
            type === 'per'
          ) {
            this.firstHoursPer = 0
            this.extraFee.priceFirstHours = this.extraFee.firstHoursOrigin
            return false
          } else if (
            Number(this.extraFee.firstHoursOrigin) >
              Number(this.extraFee.priceFirstHours) &&
            type === 'after'
          ) {
            this.extraFee.priceFirstHours = this.extraFee.firstHoursOrigin
            return false
          } else {
            return true
          }
        case 'additional':
          if (
            (Number(this.additionalPer) > 500 ||
              Number(this.additionalPer) < 1) &&
            type === 'per'
          ) {
            this.additionalPer = 0
            this.extraFee.priceAdditionalHours = this.extraFee.additionalOrigin
            return false
          } else if (
            Number(this.extraFee.additionalOrigin) >
              Number(this.extraFee.priceAdditionalHours) &&
            type === 'after'
          ) {
            this.extraFee.priceAdditionalHours = this.extraFee.additionalOrigin
            return false
          } else {
            return true
          }
        case 'overnight':
          if (
            (Number(this.overnightPer) > 500 ||
              Number(this.overnightPer) < 1) &&
            type === 'per'
          ) {
            this.overnightPer = 0
            this.extraFee.priceOvernight = this.extraFee.overnightOrigin
            return false
          } else if (
            Number(this.extraFee.overnightOrigin) >
              Number(this.extraFee.priceOvernight) &&
            type === 'after'
          ) {
            this.extraFee.priceOvernight = this.extraFee.overnightOrigin
            return false
          } else {
            return true
          }
        case 'oneDay':
          if (
            (Number(this.oneDayPer) > 500 || Number(this.oneDayPer) < 1) &&
            type === 'per'
          ) {
            this.oneDayPer = 0
            this.extraFee.priceOneDay = this.extraFee.oneDayOrigin
            return false
          } else if (
            Number(this.extraFee.oneDayOrigin) >
              Number(this.extraFee.priceOneDay) &&
            type === 'after'
          ) {
            this.extraFee.priceOneDay = this.extraFee.oneDayOrigin
            return false
          } else {
            return true
          }
      }
    },

    onChangeInput (col, type) {
      const check = this.checkValue(col, type)
      if (check === true) {
        switch (col) {
          case 'firstHours':
            if (type === 'after') {
              this.firstHoursPer = Math.ceil(
                ((this.extraFee.priceFirstHours -
                  this.extraFee.firstHoursOrigin) *
                  100) /
                  this.extraFee.firstHoursOrigin
              )
              if (this.firstHoursPer > 500) {
                this.extraFee.priceFirstHours = this.extraFee.firstHoursOrigin
                this.firstHoursPer = 0
              }
            } else {
              this.extraFee.priceFirstHours = Math.ceil(
                this.extraFee.firstHoursOrigin +
                  (this.extraFee.firstHoursOrigin * this.firstHoursPer) / 100
              )
            }
            break
          case 'additional':
            if (type === 'after') {
              this.additionalPer = Math.ceil(
                ((this.extraFee.priceAdditionalHours -
                  this.extraFee.additionalOrigin) *
                  100) /
                  this.extraFee.additionalOrigin
              )
              if (this.additionalPer > 500) {
                this.extraFee.priceAdditionalHours = this.extraFee.additionalOrigin
                this.additionalPer = 0
              }
            } else {
              this.extraFee.priceAdditionalHours = Math.ceil(
                this.extraFee.additionalOrigin +
                  (this.extraFee.additionalOrigin * this.additionalPer) / 100
              )
            }
            break
          case 'overnight':
            if (type === 'after') {
              this.overnightPer = Math.ceil(
                ((this.extraFee.priceOvernight -
                  this.extraFee.overnightOrigin) *
                  100) /
                  this.extraFee.overnightOrigin
              )
              if (this.overnightPer > 500) {
                this.extraFee.priceOvernight = this.extraFee.overnightOrigin
                this.overnightPer = 0
              }
            } else {
              this.extraFee.priceOvernight = Math.ceil(
                this.extraFee.overnightOrigin +
                  (this.extraFee.overnightOrigin * this.overnightPer) / 100
              )
            }
            break
          case 'oneDay':
            if (type === 'after') {
              this.oneDayPer = Math.ceil(
                ((this.extraFee.priceOneDay - this.extraFee.oneDayOrigin) *
                  100) /
                  this.extraFee.oneDayOrigin
              )
              if (this.oneDayPer > 500) {
                this.extraFee.priceOneDay = this.extraFee.oneDayOrigin
                this.oneDayPer = 0
              }
            } else {
              this.extraFee.priceOneDay = Math.ceil(
                this.extraFee.oneDayOrigin +
                  (this.extraFee.oneDayOrigin * this.oneDayPer) / 100
              )
            }
            break
        }
      }
    },

    async onCreteExtraFee () {
      if (
        this.firstHoursPer > 0 ||
        this.additionalPer > 0 ||
        this.overnightPer > 0 ||
        this.oneDayPer > 0
      ) {
        try {
          const data = {
            startDate: this.typeApply === 1 ? this.startDateExtraFee : null,
            endDate: this.typeApply === 1 ? this.endDateExtraFee : null,
            specialDate: this.typeApply === 2 ? this.specialDateExtraFee : [],
            monday: this.extraFee.monday === true ? 1 : 0,
            tuesday: this.extraFee.tuesday === true ? 1 : 0,
            wednesday: this.extraFee.wednesday === true ? 1 : 0,
            thursday: this.extraFee.thursday === true ? 1 : 0,
            friday: this.extraFee.friday === true ? 1 : 0,
            saturday: this.extraFee.saturday === true ? 1 : 0,
            sunday: this.extraFee.sunday === true ? 1 : 0,
            firstHours: this.extraFee.firstHours,
            additionalHours: this.extraFee.additionalHours,
            priceFirstHours: this.extraFee.priceFirstHours,
            priceAdditionalHours: this.extraFee.priceAdditionalHours,
            priceOvernight: this.extraFee.priceOvernight,
            priceOneDay: this.extraFee.priceOneDay,
            type: 2,
            typeApply: this.typeApply
          }
          const createExtraFee = await onCreateExtraFee(this.sn, data)
          if (createExtraFee) {
            this.getExtraFee()
            this.onChageDayApply()
            this.clearDataAfterCreate()
            this.$message({
              type: 'success',
              message: `${this.$t('page.extraFee.createSuccess')}`
            })
            this.$emit('reloadRoom')
          }
        } catch (error) {
          return false
        }
      } else {
        this.$message({
          type: 'error',
          message: `${this.$t('page.extraFee.requireExtraFee')}`
        })
      }
    },

    async getRoom () {
      try {
        const { data } = await getRoomType(this.sn)
        this.extraFee = data.data
        this.extraFee.priceFirstHours = this.extraFee.firstHoursOrigin
        this.extraFee.priceAdditionalHours = this.extraFee.additionalOrigin
        this.extraFee.priceOvernight = this.extraFee.overnightOrigin
        this.extraFee.priceOneDay = this.extraFee.oneDayOrigin
        this.getExtraFee()
      } catch (error) {
        return false
      }
    },

    async getExtraFee () {
      try {
        const { data } = await listExtraFee(this.sn)
        if (data.data && data.data.length > 0) {
          this.tableData = data.data
        } else {
          this.tableData = []
        }
      } catch (error) {
        return false
      } finally {
        this.loadingExtraFee = false
      }
    },

    async checkDayApply (val) {
      try {
        const params = {
          type: 2,
          typeApply: this.typeApply,
          startDate: this.typeApply === 1 ? this.startDateExtraFee : '',
          endDate: this.typeApply === 1 ? this.endDateExtraFee : '',
          specialDate: this.typeApply === 2 ? val : []
        }
        const { data } = await onCheckDayApply(this.sn, params)
        if (data.data && this.typeApply === 1) {
          this.disabled = data.data
          this.returnDataDayOfWeek()
        } else if (data && this.typeApply === 2) {
          this.specialDateExtraFee.push(val)
        }
        this.$message({
          type: 'success',
          message: `${this.$t('page.extraFee.checkSuccess')}`
        })
      } catch (error) {
        return false
      } finally {
        this.loadingExtraFee = false
      }
    },

    onChangeStartDate (data) {
      this.dateEndPickerOptions = {
        disabledDate (date) {
          return date < new Date(data)
        }
      }
      if (this.endDateExtraFee && this.startDateExtraFee) {
        this.checkDayApply()
      }
    },

    onChangeEndDate () {
      if (this.endDateExtraFee && this.startDateExtraFee) {
        this.checkDayApply()
      }
    },

    onChangeSpecialDate (data) {
      data && this.checkDayApply(data)
      this.extraFee.specialDate = ''
    },

    returnDataDayOfWeek () {
      this.extraFee.monday = 0
      this.extraFee.tuesday = 0
      this.extraFee.wednesday = 0
      this.extraFee.thursday = 0
      this.extraFee.friday = 0
      this.extraFee.saturday = 0
      this.extraFee.sunday = 0
    },

    clearDataAfterCreate () {
      this.firstHoursPer = 0
      this.extraFee.priceFirstHours = this.extraFee.firstHoursOrigin
      this.additionalPer = 0
      this.extraFee.priceAdditionalHours = this.extraFee.additionalOrigin
      this.overnightPer = 0
      this.extraFee.priceOvernight = this.extraFee.overnightOrigin
      this.oneDayPer = 0
      this.extraFee.priceOneDay = this.extraFee.oneDayOrigin
    },

    getDaysOfWeek (data) {
      const arrayDay = []
      if (data.monday === 1) {
        arrayDay.push('monday')
      }
      if (data.tuesday === 1) {
        arrayDay.push('tuesday')
      }
      if (data.wednesday === 1) {
        arrayDay.push('wednesday')
      }
      if (data.thursday === 1) {
        arrayDay.push('thursday')
      }
      if (data.friday === 1) {
        arrayDay.push('friday')
      }
      if (data.saturday === 1) {
        arrayDay.push('saturday')
      }
      if (data.sunday === 1) {
        arrayDay.push('sunday')
      }
      return arrayDay
    },

    getBookingType (data) {
      const bookingType = []
      if (data.firstHoursOrigin < data.priceFirstHours) {
        bookingType.push('option.hourly')
      }
      if (data.overnightOrigin < data.priceOvernight) {
        bookingType.push('option.overnight')
      }
      if (data.oneDayOrigin < data.priceOneDay) {
        bookingType.push('option.daily')
      }
      return bookingType
    },

    reset () {
      this.data = {}
    },

    onChageDayApply () {
      this.specialDateExtraFee = []
      this.startDateExtraFee = ''
      this.endDateExtraFee = ''
      this.extraFee.monday = 0
      this.extraFee.tuesday = 0
      this.extraFee.wednesday = 0
      this.extraFee.thursday = 0
      this.extraFee.friday = 0
      this.extraFee.saturday = 0
      this.extraFee.sunday = 0
      this.disabled.monday = 0
      this.disabled.tuesday = 0
      this.disabled.wednesday = 0
      this.disabled.thursday = 0
      this.disabled.friday = 0
      this.disabled.saturday = 0
      this.disabled.sunday = 0
    },

    open (data) {
      this.extraFeeModalVisible = true
      this.loadingExtraFee = true
      this.sn = data || data
      this.reset()
      this.clearDataAfterCreate()
      this.onChageDayApply()
      this.getRoom()
    },

    onClose () {
      this.extraFeeModalVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.date-type {
  margin-left: 10px;
}
.bt-create {
  margin: 12px 0;
}

</style>
