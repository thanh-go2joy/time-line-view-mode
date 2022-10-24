<template>
  <el-dialog
    :id="id"
    class="direct-discount-dialog"
    :title="$t('page.directDiscount.name')"
    :visible.sync="directDiscountModalVisible"
    top="12px"
    width="80%"
  >
    <div class="customs-edit-direct-discount">
      <el-row>
        <el-col :span="4">
          <p>{{ $t("page.directDiscount.hotel_name") }}</p>
        </el-col>
        <el-col :span="20">
          <el-input v-model="directDiscount.hotelName" disabled />
        </el-col>
      </el-row> <!-- hotel name -->
      <el-row>
        <el-col :span="4">
          <p>{{ $t("page.directDiscount.name_short_name") }}</p>
        </el-col>
        <el-col :span="15">
          <el-input disabled type="text" v-model="directDiscount.name" />
        </el-col>
        <el-col :span="5">
          <el-input disabled type="text" v-model="directDiscount.shortName" />
        </el-col>
      </el-row> <!-- name/short name -->
      <el-row>
        <el-col :span="4">
          <p>{{ $t("page.directDiscount.num_of_room") }}</p>
        </el-col>
        <el-col :span="6">
          <el-input disabled type="text" v-model="directDiscount.numOfRoomHotel" />
        </el-col>
      </el-row> <!-- num of room -->
      <el-row>
        <el-col :span="4">
          <p>
            {{ $t("page.directDiscount.start_end") }}
            <span v-if="typeApply == 1" style="color:red;">(*)</span>
          </p>
        </el-col>
        <el-col :span="20">
          <el-date-picker
            v-model="startDateDirectDiscount"
            :disabled="typeApply == 2"
            :picker-options="datePickerOptions"
            type="date"
            @change="onChangeStartDate"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
          ~
          <el-date-picker
            v-model="endDateDirectDiscount"
            :disabled="typeApply == 2"
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
            {{ $t("page.directDiscount.days_apply")
            }}<span v-if="typeApply == 1" style="color:red;">(*)</span>
          </p>
        </el-col>
        <el-col :span="20">
          <el-row>
            <el-col :span="3">
              <el-checkbox
                :disabled="typeApply === 2 || disabled.monday === 1"
                :true-label="1"
                :false-label="0"
                v-model="directDiscount.monday"
              >
                {{ $t('page.directDiscount.monday')}}
              </el-checkbox>
            </el-col>
            <el-col :span="3">
              <el-checkbox
                :disabled="typeApply === 2 || disabled.tuesday === 1"
                :true-label="1"
                :false-label="0"
                v-model="directDiscount.tuesday"
              >
                {{ $t('page.directDiscount.tuesday')}}
              </el-checkbox>
            </el-col>
            <el-col :span="3">
              <el-checkbox
                :disabled="typeApply === 2 || disabled.wednesday === 1"
                :true-label="1"
                :false-label="0"
                v-model="directDiscount.wednesday"
              >
                {{ $t('page.directDiscount.wednesday')}}
              </el-checkbox>
            </el-col>
            <el-col :span="3">
              <el-checkbox
                :disabled="typeApply === 2 || disabled.thursday === 1"
                :true-label="1"
                :false-label="0"
                v-model="directDiscount.thursday"
              >
                {{ $t('page.directDiscount.thursday')}}
              </el-checkbox>
            </el-col>
            <el-col :span="3">
              <el-checkbox
                :disabled="typeApply === 2 || disabled.friday === 1"
                :true-label="1"
                :false-label="0"
                v-model="directDiscount.friday"
              >
                {{ $t('page.directDiscount.friday')}}
              </el-checkbox>
            </el-col>
            <el-col :span="3">
              <el-checkbox
                :disabled="typeApply === 2 || disabled.saturday === 1"
                :true-label="1"
                :false-label="0"
                v-model="directDiscount.saturday"
              >
                {{ $t('page.directDiscount.saturday')}}
              </el-checkbox>
            </el-col>
            <el-col :span="3">
              <el-checkbox
                :disabled="typeApply === 2 || disabled.sunday === 1"
                :true-label="1"
                :false-label="0"
                v-model="directDiscount.sunday"
              >
                {{ $t('page.directDiscount.sunday')}}
              </el-checkbox>
            </el-col>
          </el-row>
        </el-col>
      </el-row> <!-- day apply -->
      <el-row>
        <el-col :span="4">
          <p>
            {{ $t("page.directDiscount.special_date")
            }}<span v-if="typeApply == 2" style="color:red;">(*)</span>
          </p>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            :disabled="typeApply === 1"
            v-model="directDiscount.specialDate"
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
            {{ $t("page.directDiscount.special_date")
            }}<span v-if="typeApply == 2" style="color:red;">(*)</span>
          </p>
        </el-col>
        <el-col :span="20">
          <el-tag
            :class="typeApply === 1 ? 'disabled' : ' '"
            class="tag-custom"
            :isDisabled="true"
            v-for="tag in specialDateDirectDiscount"
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
          <p>{{ $t("page.directDiscount.first_hours_price") }}</p>
        </el-col>
        <el-col :span="3">
          <p>{{ $t("page.directDiscount.num_of_hours") }}</p>
        </el-col>
        <el-col :span="2">
          <el-input
            disabled
            type="text"
            v-model="directDiscount.firstHours"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <p>{{ $t("page.directDiscount.price") }}</p>
        </el-col>
        <el-col :span="4">
          <el-input
            disabled
            type="text"
            v-model="directDiscount.firstHoursOrigin"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <p>{{ $t("page.directDiscount.direct_discount_price") }}</p>
        </el-col>
        <el-col :span="3">
          <el-input
            :disabled="directDiscount.firstHoursOrigin == 0"
            type="text"
            v-model="directDiscount.priceFirstHours"
            @change="onChangeInput('firstHours', 'after')"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-input
            :disabled="directDiscount.firstHoursOrigin == 0"
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
          <p>{{ $t("page.directDiscount.plus_hours_price") }}</p>
        </el-col>
        <el-col :span="3">
          <p>{{ $t("page.directDiscount.num_of_hours") }}</p>
        </el-col>
        <el-col :span="2">
          <el-input
            disabled
            type="text"
            v-model="directDiscount.additionalHours"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <p>{{ $t("page.directDiscount.price") }}</p>
        </el-col>
        <el-col :span="4">
          <el-input
            disabled
            type="text"
            v-model="directDiscount.additionalOrigin"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <p>{{ $t("page.directDiscount.direct_discount_price") }}</p>
        </el-col>
        <el-col :span="3">
          <el-input
            :disabled="directDiscount.additionalOrigin == 0"
            type="text"
            v-model="directDiscount.priceAdditionalHours"
            @change="onChangeInput('additional', 'after')"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-input
            :disabled="directDiscount.additionalOrigin == 0"
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
          <p>{{ $t("page.directDiscount.overnight_price") }}</p>
        </el-col>
        <el-col :span="3">
          <p>{{ $t("page.directDiscount.price") }}</p>
        </el-col>
        <el-col :span="2">
          <el-input
            type="text"
            disabled
            v-model="directDiscount.overnightOrigin"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <p>{{ $t("page.directDiscount.direct_discount_price") }}</p>
        </el-col>
        <el-col :span="4">
          <el-input
            :disabled="directDiscount.overnightOrigin == 0"
            type="text"
            v-model="directDiscount.priceOvernight"
            @change="onChangeInput('overnight', 'after')"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-input
            :disabled="directDiscount.overnightOrigin == 0"
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
          <p>{{ $t("page.directDiscount.one_day_price") }}</p>
        </el-col>
        <el-col :span="3">
          <p>{{ $t("page.directDiscount.price") }}</p>
        </el-col>
        <el-col :span="2">
          <el-input
            type="text"
            disabled
            v-model="directDiscount.oneDayOrigin"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <p>{{ $t("page.directDiscount.direct_discount_price") }}</p>
        </el-col>
        <el-col :span="4">
          <el-input
            :disabled="directDiscount.oneDayOrigin == 0"
            type="text"
            v-model="directDiscount.priceOneDay"
            @change="onChangeInput('oneDay', 'after')"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-input
            :disabled="directDiscount.oneDayOrigin == 0"
            class="custom-width"
            type="text"
            v-model="oneDayPer"
            @change="onChangeInput('oneDay', 'per')"
          ></el-input
          >%
        </el-col>
      </el-row> <!-- one day price -->
      <div class="bt-create center">
        <el-button type="primary" @click="onCreteDirectDiscount()">
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
            v-loading="loadingDirectDiscount"
          >
            <el-table-column
              label="#"
              type="index"
            />
            <el-table-column
              :label="$t('page.directDiscount.booking_type')"
              :min-width="160"
            >
              <template slot-scope="scope">
                  <span
                    v-for="type in getBookingType(scope.row,'directDiscount')"
                    :key="type"

                  >
                    {{ $t(`${type}`) }}<br>
                  </span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('page.directDiscount.origin')"
              :min-width="160"
            >
              <template slot-scope="scope">
                <span
                  v-show="scope.row.firstHoursOrigin > scope.row.priceFirstHours"
                >
                  {{ scope.row.firstHoursOrigin }}<br>
                </span>
                <span
                  v-show="scope.row.overnightOrigin > scope.row.priceOvernight"
                >
                  {{ scope.row.overnightOrigin }}<br>
                </span>
                <span
                  v-show="scope.row.oneDayOrigin > scope.row.priceOneDay"
                >
                  {{ scope.row.oneDayOrigin }}<br>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('page.directDiscount.name')"
              :min-width="160"
            >
              <template slot-scope="scope">
                <span
                  v-show="scope.row.firstHoursOrigin > scope.row.priceFirstHours"
                >
                  {{ scope.row.priceFirstHours }}<br>
                </span>
                <span
                  v-show="scope.row.overnightOrigin > scope.row.priceOvernight"
                >
                  {{ scope.row.priceOvernight }}<br>
                </span>
                <span
                  v-show="scope.row.oneDayOrigin > scope.row.priceOneDay"
                >
                  {{ scope.row.priceOneDay }}<br>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('page.detailRoomType.direct_discount.start_end')"
              :min-width="180"
            >
              <template slot-scope="scope">
                {{ `${formatDate(scope.row.startDate,false)} ~ ${formatDate(scope.row.endDate,false)}` }}

              </template>
            </el-table-column>
            <el-table-column
              :label="$t('page.detailRoomType.direct_discount.days_apply')"
              :min-width="160"
            >
              <template slot-scope="scope">
                <span
                  v-for="date in getDaysOfWeek(scope.row)"
                  :key="date">
                    {{  $t('page.directDiscount.'+date) }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('page.detailRoomType.direct_discount.special_date')"
              :min-width="160"
            >
              <template slot-scope="scope">
                <span
                  v-for="(p,index) in scope.row.specialDate"
                  :key="'1'+index"
                  :class="'custom-p-'+index"
                  style="margin-right: 10px;"
                >{{ $t(p) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :min-width="160"
            >
              <el-button
                  type="danger"
                  size="small"
                  plain
                  @click="onDelete(row.dataRow.sn)"
                  icon="el-icon-delete"
                >
                  {{ $t("page.calendar.delete") }}
                </el-button>
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
import { getRoomType, listDirectDiscount, onCheckDayApply } from '@/api/roomType'
import { onCreateDirectDiscount, onDeleteDirectDiscount } from './api'

export default {
  data () {
    return {
      directDiscountModalVisible: false,
      data: null,
      sn: 0,
      directDiscount: {},
      startDateDirectDiscount: '',
      endDateDirectDiscount: '',
      firstHoursPer: 0,
      additionalPer: 0,
      overnightPer: 0,
      oneDayPer: 0,
      specialDateDirectDiscount: [],
      isError: null,
      selectHotel: [],
      datePickerOptions: { disabledDate: this.disabledDueDate },
      dateEndPickerOptions: { disabledDate: this.disabledDueDate },
      loadingDirectDiscount: false,
      disabled: {},
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

    onSave () {
      this.clearDataAfterCreate()
      this.onChageDayApply()
      this.onClose()
    },

    handleClose (tag) {
      this.specialDateDirectDiscount.splice(this.specialDateDirectDiscount.indexOf(tag), 1)
    },
    async onDelete (id) {
      try {
        await onDeleteDirectDiscount(id)
        this.$emit('reloadRoom')
        this.getDirectDiscount()
        this.$message({
          type: 'success',
          message: `${this.$t('page.directDiscount.success')}`
        })
      } catch (error) {
        return false
      } finally {
        this.loadingDirectDiscount = false
      }
    },

    checkValue (col, type) {
      switch (col) {
        case 'firstHours':
          if (
            (Number(this.firstHoursPer) > 99 ||
              Number(this.firstHoursPer) < 1) &&
            type === 'per'
          ) {
            this.firstHoursPer = 0
            this.directDiscount.priceFirstHours = this.directDiscount.firstHoursOrigin
            return false
          } else if (
            Number(this.directDiscount.firstHoursOrigin) <
              Number(this.directDiscount.priceFirstHours) &&
            type === 'after'
          ) {
            this.directDiscount.priceFirstHours = this.directDiscount.firstHoursOrigin
            return false
          } else {
            return true
          }
        case 'additional':
          if (
            (Number(this.additionalPer) > 99 ||
              Number(this.additionalPer) < 1) &&
            type === 'per'
          ) {
            this.additionalPer = 0
            this.directDiscount.priceAdditionalHours = this.directDiscount.additionalOrigin
            return false
          } else if (
            Number(this.directDiscount.additionalOrigin) <
              Number(this.directDiscount.priceAdditionalHours) &&
            type === 'after'
          ) {
            this.directDiscount.priceAdditionalHours = this.directDiscount.additionalOrigin
            return false
          } else {
            return true
          }
        case 'overnight':
          if (
            (Number(this.overnightPer) > 99 || Number(this.overnightPer) < 1) &&
            type === 'per'
          ) {
            this.overnightPer = 0
            this.directDiscount.priceOvernight = this.directDiscount.overnightOrigin

            return false
          } else if (
            Number(this.directDiscount.overnightOrigin) <
              Number(this.directDiscount.priceOvernight) &&
            type === 'after'
          ) {
            this.directDiscount.priceOvernight = this.directDiscount.overnightOrigin
            return false
          } else {
            return true
          }
        case 'oneDay':
          if (
            (Number(this.oneDayPer) > 99 || Number(this.oneDayPer) < 1) &&
            type === 'per'
          ) {
            this.oneDayPer = 0
            this.directDiscount.priceOneDay = this.directDiscount.oneDayOrigin
            return false
          } else if (
            Number(this.directDiscount.oneDayOrigin) <
              Number(this.directDiscount.priceOneDay) &&
            type === 'after'
          ) {
            this.directDiscount.priceOneDay = this.directDiscount.oneDayOrigin
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
                100 -
                  (this.directDiscount.priceFirstHours * 100) /
                    this.directDiscount.firstHoursOrigin
              )
              if (this.firstHoursPer > 99) {
                this.directDiscount.priceFirstHours = this.directDiscount.firstHoursOrigin
                this.firstHoursPer = 0
              }
            } else {
              this.directDiscount.priceFirstHours = Math.ceil(
                ((100 - this.firstHoursPer) *
                  this.directDiscount.firstHoursOrigin) /
                  100
              )
            }
            break
          case 'additional':
            if (type === 'after') {
              this.additionalPer = Math.ceil(
                100 -
                  (this.directDiscount.priceAdditionalHours * 100) /
                    this.directDiscount.additionalOrigin
              )
              if (this.additionalPer > 99) {
                this.directDiscount.priceAdditionalHours = this.directDiscount.additionalOrigin
                this.additionalPer = 0
              }
            } else {
              this.directDiscount.priceAdditionalHours = Math.ceil(
                ((100 - this.additionalPer) *
                  this.directDiscount.additionalOrigin) /
                  100
              )
            }
            break
          case 'overnight':
            if (type === 'after') {
              this.overnightPer = Math.ceil(
                100 -
                  (this.directDiscount.priceOvernight * 100) /
                    this.directDiscount.overnightOrigin
              )
              if (this.overnightPer > 99) {
                this.directDiscount.priceOvernight = this.directDiscount.overnightOrigin
                this.overnightPer = 0
              }
            } else {
              this.directDiscount.priceOvernight = Math.ceil(
                ((100 - this.overnightPer) *
                  this.directDiscount.overnightOrigin) /
                  100
              )
            }
            break
          case 'oneDay':
            if (type === 'after') {
              this.oneDayPer = Math.ceil(
                100 -
                  (this.directDiscount.priceOneDay * 100) /
                    this.directDiscount.oneDayOrigin
              )
              if (this.oneDayPer > 99) {
                this.directDiscount.priceOneDay = this.directDiscount.oneDayOrigin
                this.oneDayPer = 0
              }
            } else {
              this.directDiscount.priceOneDay = Math.ceil(
                ((100 - this.oneDayPer) * this.directDiscount.oneDayOrigin) /
                  100
              )
            }
            break
        }
      }
    },

    async onCreteDirectDiscount () {
      if (
        this.firstHoursPer > 0 ||
        this.additionalPer > 0 ||
        this.overnightPer > 0 ||
        this.oneDayPer > 0
      ) {
        try {
          const data = {
            startDate: this.typeApply === 1 ? this.startDateDirectDiscount : null,
            endDate: this.typeApply === 1 ? this.endDateDirectDiscount : null,
            specialDate: this.typeApply === 2 ? this.specialDateDirectDiscount : [],
            monday: this.directDiscount.monday === true ? 1 : 0,
            tuesday: this.directDiscount.tuesday === true ? 1 : 0,
            wednesday: this.directDiscount.wednesday === true ? 1 : 0,
            thursday: this.directDiscount.thursday === true ? 1 : 0,
            friday: this.directDiscount.friday === true ? 1 : 0,
            saturday: this.directDiscount.saturday === true ? 1 : 0,
            sunday: this.directDiscount.sunday === true ? 1 : 0,
            firstHours: this.directDiscount.firstHours,
            additionalHours: this.directDiscount.additionalHours,
            priceFirstHours: this.directDiscount.priceFirstHours,
            priceAdditionalHours: this.directDiscount.priceAdditionalHours,
            priceOvernight: this.directDiscount.priceOvernight,
            priceOneDay: this.directDiscount.priceOneDay,
            type: 2,
            typeApply: this.typeApply
          }
          const createDirectDiscount = await onCreateDirectDiscount(this.sn, data)
          if (createDirectDiscount) {
            this.getDirectDiscount()
            this.onChageDayApply()
            this.clearDataAfterCreate()
            this.$message({
              type: 'success',
              message: `${this.$t('page.directDiscount.createSuccess')}`
            })
            this.$emit('reloadRoom')
          }
        } catch (error) {
          return false
        }
      } else {
        this.$message({
          type: 'error',
          message: `${this.$t('page.directDiscount.requireDirectDiscount')}`
        })
      }
    },

    async getRooms () {
      try {
        const { data } = await getRoomType(this.sn)
        this.directDiscount = data.data
        this.directDiscount.priceFirstHours = this.directDiscount.firstHoursOrigin
        this.directDiscount.priceAdditionalHours = this.directDiscount.additionalOrigin
        this.directDiscount.priceOvernight = this.directDiscount.overnightOrigin
        this.directDiscount.priceOneDay = this.directDiscount.oneDayOrigin
        this.getDirectDiscount()
      } catch (error) {
        return false
      }
    },

    async getDirectDiscount () {
      try {
        const { data } = await listDirectDiscount(this.sn)
        if (data.data && data.data.length > 0) {
          this.tableData = data.data
        } else {
          this.tableData = []
        }
      } catch (error) {
        return false
      } finally {
        this.loadingDirectDiscount = false
      }
    },

    async checkDayApply (val) {
      try {
        const params = {
          type: 2,
          typeApply: this.typeApply,
          startDate: this.typeApply === 1 ? this.startDateDirectDiscount : '',
          endDate: this.typeApply === 1 ? this.endDateDirectDiscount : '',
          specialDate: this.typeApply === 2 ? val : []
        }
        const { data } = await onCheckDayApply(this.sn, params)
        if (data.data && this.typeApply === 1) {
          this.disabled = data.data
          this.returnDataDayOfWeek()
        } else if (data && this.typeApply === 2) {
          this.specialDateDirectDiscount.push(val)
        }
        this.$message({
          type: 'success',
          message: `${this.$t('page.directDiscount.checkSuccess')}`
        })
      } catch (error) {
        return false
      } finally {
        this.loadingDirectDiscount = false
      }
    },

    onChangeStartDate (data) {
      this.dateEndPickerOptions = {
        disabledDate (date) {
          return date < new Date(data)
        }
      }
      if (this.endDateDirectDiscount && this.startDateDirectDiscount) {
        this.checkDayApply()
      }
    },

    onChangeEndDate () {
      if (this.endDateDirectDiscount && this.startDateDirectDiscount) {
        this.checkDayApply()
      }
    },

    async onChangeSpecialDate (data) {
      data && await this.checkDayApply(data)
      this.directDiscount.specialDate = ''
    },

    returnDataDayOfWeek () {
      this.directDiscount.monday = 0
      this.directDiscount.tuesday = 0
      this.directDiscount.wednesday = 0
      this.directDiscount.thursday = 0
      this.directDiscount.friday = 0
      this.directDiscount.saturday = 0
      this.directDiscount.sunday = 0
    },

    clearDataAfterCreate () {
      this.firstHoursPer = 0
      this.directDiscount.priceFirstHours = this.directDiscount.firstHoursOrigin
      this.additionalPer = 0
      this.directDiscount.priceAdditionalHours = this.directDiscount.additionalOrigin
      this.overnightPer = 0
      this.directDiscount.priceOvernight = this.directDiscount.overnightOrigin
      this.oneDayPer = 0
      this.directDiscount.priceOneDay = this.directDiscount.oneDayOrigin
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
      if (data.firstHoursOrigin > data.priceFirstHours) {
        bookingType.push('option.roomType.hourly')
      }
      if (data.overnightOrigin > data.priceOvernight) {
        bookingType.push('option.roomType.overnight')
      }
      if (data.oneDayOrigin > data.priceOneDay) {
        bookingType.push('option.roomType.daily')
      }
      return bookingType
    },

    onChageDayApply () {
      this.specialDateDirectDiscount = []
      this.startDateDirectDiscount = ''
      this.endDateDirectDiscount = ''
      this.directDiscount.monday = 0
      this.directDiscount.tuesday = 0
      this.directDiscount.wednesday = 0
      this.directDiscount.thursday = 0
      this.directDiscount.friday = 0
      this.directDiscount.saturday = 0
      this.directDiscount.sunday = 0
      this.disabled.monday = 0
      this.disabled.tuesday = 0
      this.disabled.wednesday = 0
      this.disabled.thursday = 0
      this.disabled.friday = 0
      this.disabled.saturday = 0
      this.disabled.sunday = 0
    },

    reset () {
      this.data = {}
    },

    open (data) {
      this.directDiscountModalVisible = true
      this.reset()
      this.sn = data || data
      this.getRooms()
      this.onChageDayApply()
    },

    onClose () {
      this.directDiscountModalVisible = false
      this.clearDataAfterCreate()
    }
  }
}
</script>
<style lang="scss">
.date-type {
  margin-left: 10px
}
.bt-create {
  margin: 12px 0;
}

</style>
