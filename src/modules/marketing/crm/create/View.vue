<template>
  <sa-section class="create-crm" v-loading="ui.isLoading">
    <template slot="header" class="create-crm__filters">
      <el-form :inline="true">
        <el-form-item>
          <el-select
            v-model="formData.operator"
            element-loading-spinner="el-icon-loading"
            prefix-icon="el-icon-search"
            :placeholder="$t('page.hotelDisplay.hotelName')"
          >
            <el-option
              v-for="(item, index) in ui.operator"
              :key="index"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.title" :placeholder="$t('placeholder.title')"/>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="typeCrmSelected"
            element-loading-spinner="el-icon-loading"
            prefix-icon="el-icon-search"
            value-key="value"
            @change="addCRM"
          >
            <el-option
              v-for="(item, index) in ui.typeCRM"
              :key="index"
              :label="item.name"
              :value="{ value: item.value, name: item.name }"
            />
          </el-select>
        </el-form-item>
        <el-input class="memo-crm" v-model="formData.memo" type="textarea" :placeholder="$t('placeholder.memo')">
        </el-input>
      </el-form>
      <div class="float-right">
        <el-button
          type="success"
          @click="onCreate"
          plain
        >
          <i class="el-icon-right" />
          {{ $t('button.next') }}
        </el-button>
        <router-link
          class="el-button el-button--danger is-plain"
          :to="{ name: 'crm' }"
        >
          <i class="el-icon-refresh-left" />
          {{ $t('button.back') }}
        </router-link>
      </div>
    </template>
    <div class="create-crm__table">
      <table class="crm-table">
        <tr
          v-for="(crm, indexDetail) in formData.detailList"
          :key="indexDetail"
          :class="indexDetail % 2 ? 'even-row' : 'odd-row'"
        >
          <td style="width: 50px">
            {{ formData.operator == 1 ? 'AND' : 'OR' }}
          </td>
          <td style="width: 150px">{{ crm.fieldDisplay }}</td>
          <td style="width: 180px">
            <el-select
              v-if="
                crm.fieldFilterSn == 5 ||
                crm.fieldFilterSn == 7 ||
                crm.fieldFilterSn == 8 ||
                crm.fieldFilterSn == 9 ||
                crm.fieldFilterSn == 10 ||
                crm.fieldFilterSn == 15 ||
                crm.fieldFilterSn == 16 ||
                crm.fieldFilterSn == 17
              "
              v-model="crm.criteriaList[0].operator"
              element-loading-spinner="el-icon-loading"
              prefix-icon="el-icon-search"
            >
              <el-option
                v-for="(item, index) in ui.typeOperators"
                :key="index"
                :label="$t(item.name)"
                :value="item.value"
              />
            </el-select>
            <span
              v-else-if="
                crm.fieldFilterSn != 1 &&
                crm.fieldFilterSn != 4 &&
                crm.fieldFilterSn != 11
              "
            >
              {{ $t('page.crm.equal') }}
            </span>
          </td>
          <td
            v-for="(Length, indexLength) in 5"
            :key="indexLength"
            :class="`criteria-${indexLength}`"
          >
            <div
              v-for="(criteria, indexCriteria) in crm.criteriaList"
              :key="indexCriteria"
            >
              <el-input
                v-model="criteria.value"
                v-if="criteria.type == 0 && indexLength == 0"
                @change="onChangeInput(criteria, $event)"
              >
              </el-input>
              <el-select
                v-if="criteria.type == 1 && indexLength == 0"
                v-model="criteria.value"
                element-loading-spinner="el-icon-loading"
                prefix-icon="el-icon-search"
                value-key="value"
              >
                <el-option
                  v-for="(item, index) in selectData[indexDetail]"
                  :key="index"
                  :label="$t(item.name)"
                  :value="item.value"
                />
              </el-select>
              <div
                v-if="
                  criteria.type == 2 &&
                  indexLength == 1 &&
                  crm.fieldFilterSn == 3
                "
                class="birthday"
              >
                <el-select
                    placeholder="__"
                    v-model="birthDate[indexDetail].date"
                    @change="onChangeBirthday($event, indexDetail, indexCriteria, 'date')"
                  >
                    <el-option
                      v-for="date in 31"
                      :value="date"
                      :key="date"
                      :label="date"
                    >
                    </el-option>
                </el-select>
                <el-select
                  placeholder="__"
                  v-model="birthDate[indexDetail].month"
                  @change="onChangeBirthday($event, indexDetail, indexCriteria, 'month')"
                >
                  <el-option
                    v-for="month in 12"
                    :value="month"
                    :key="month"
                    :label="month"
                  >
                  </el-option>
                </el-select>
                <el-select
                  class="year"
                  placeholder="__"
                  v-model="birthDate[indexDetail].year"
                  @change="onChangeBirthday($event, indexDetail, indexCriteria, 'year')"
                >
                  <el-option
                    v-for="year in yearOptions"
                    :value="year"
                    :key="year"
                    :label="year"
                  >
                  </el-option>
                </el-select>
              </div>
              <el-date-picker
                v-model="criteria.value"
                v-if="
                  criteria.type == 2 &&
                  indexLength == 1 &&
                  crm.fieldFilterSn != 3
                "
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="onDateFromSelect(criteria, $event)"
              >
              </el-date-picker>
              <el-date-picker
                v-model="criteria.value"
                v-if="criteria.type == 3 && indexLength == 2"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="onDateToSelect(criteria, $event)"
              >
              </el-date-picker>
              <sa-select-check
                v-if="criteria.type == 4 && indexLength == 3"
                v-loading="ui.loadingProvince"
                v-model="criteria.value"
                :isCheckAll="true"
                label="sn"
                keyValue="name"
                :model-check-all="checkBox.checkAllProvinces[indexDetail]"
                :options="provinces"
                @changeCheckAll="
                  handleCheckAllProvinces($event, indexDetail, indexCriteria)
                "
                @input="handleCheckedProvinces($event, indexDetail)"
                translate
              />
              <sa-select-check
                v-if="criteria.type == 5 && indexLength == 4"
                v-loading="ui.loadingDistricts[indexDetail]"
                v-model="criteria.value"
                :isCheckAll="true"
                label="sn"
                keyValue="name"
                :model-check-all="checkBox.checkAllDistrict[indexDetail]"
                :options="districts[indexDetail]"
                @changeCheckAll="
                  handleCheckAllDistrict($event, indexDetail, indexCriteria)
                "
                @input="handleCheckedDistrict($event, indexDetail)"
                translate
              />
            </div>
          </td>
          <td style="width: 20px">
            <el-link
              type="danger"
              @click="removeCriteria(indexDetail)"
              icon="el-icon-delete"
            />
          </td>
        </tr>
      </table>
    </div>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { fetchDistricts, onCreate, getCRM } from './api'
import { fetchProvinces } from '@/api/province'
import SaSelectCheck from '@/components/globals/SaSelectCheck.vue'

export default {
  name: 'crm',
  components: {
    SaSection,
    SaSelectCheck
  },
  data () {
    return {
      filter: {
        limit: 10,
        page: 1
      },
      pagination: {},
      birthDate: [],
      typeCrmSelected: {
        name: '',
        value: 0
      },
      selectData: [],
      yearOptions: [],
      ui: {
        isLoading: false,
        loadingProvince: false,
        loadingDistricts: [],
        operator: [
          { name: 'And', value: 1 },
          { name: 'Or', value: 2 }
        ],
        typeCRM: [
          { name: 'Gender', value: 2 },
          { name: 'First Signup', value: 14 },
          { name: 'Go2Joy State', value: 13 },
          { name: 'Device OS', value: 12 },
          { name: 'Last Open App', value: 11 },
          { name: 'Num Booking', value: 10 },
          { name: 'Num Checkin', value: 9 },
          { name: 'Mileage Amount', value: 8 },
          { name: 'Mileage Earned', value: 7 },
          { name: 'Register Via', value: 6 },
          { name: 'Number open App', value: 5 },
          { name: 'First Sign Up Province', value: 4 },
          { name: 'Birthday', value: 3 },
          { name: 'Register Time', value: 1 },
          { name: 'Number check-in used coupon', value: 15 },
          { name: 'Number Open App/ Number signup month', value: 16 },
          { name: 'Average Check-in/ Month', value: 17 }
        ],
        gender: [
          { name: 'page.crm.male', value: '1' },
          { name: 'page.crm.female', value: '2' }
        ],
        firstSignup: [
          { name: 'page.crm.empty', value: '1' },
          { name: 'page.crm.notEmpty', value: '2' }
        ],
        go2joyState: [
          { name: 'page.crm.uninstall', value: '0' },
          { name: 'page.crm.install', value: '1' }
        ],
        deviceOS: [
          { name: 'IOS', value: '1' },
          { name: 'Android', value: '2' }
        ],
        registerVia: [
          { name: 'Manual', value: '1' },
          { name: 'Facebook', value: '2' },
          { name: 'Google', value: '3' }
        ],
        typeOperators: [
          { name: 'page.crm.equal', value: '0' },
          { name: 'page.crm.greater', value: '1' },
          { name: 'page.crm.greaterEqual', value: '2' },
          { name: 'page.crm.less', value: '3' },
          { name: 'page.crm.lessEqual', value: '4' },
          { name: 'page.crm.notEqual', value: '5' }
        ],
        provinceOptions: [],
        districtOptions: []
      },
      checkBox: {
        checkAllProvinces: [],
        isIndeterminateProvinces: [],
        isIndeterminateDistrict: [],
        checkAllDistrict: []
      },
      districts: [],
      provinces: [],
      formData: {
        title: '',
        memo: '',
        operator: 1,
        detailList: []
      }
    }
  },
  created () {
    this.listProvinces()
    this.setRangeOfYear()
    this.$route.params.sn && this.getCRM()
  },
  methods: {
    async listProvinces () {
      this.ui.loadingProvince = true
      try {
        const { data } = await fetchProvinces({ limit: 100, status: 1 })
        this.provinces = data.data.provinces
      } catch (error) {
        return false
      } finally {
        this.ui.loadingProvince = false
      }
    },
    async listDistricts (proList, index) {
      this.ui.loadingDistricts[index] = true
      try {
        const indexDistrict = this.formData.detailList[index].criteriaList.findIndex(item => item.type === 5)
        if (proList.length === 0) {
          this.formData.detailList[index].criteriaList[indexDistrict].value = []
          return true
        }
        let query = '?limit=100'
        proList.forEach((pro, proIndex) => {
          query += `&provinceSnList[${proIndex}]=${pro}`
        })
        const { data } = await fetchDistricts(query)
        this.districts[index] = data.data.districts
        this.formData.detailList[index].criteriaList[indexDistrict].value = data.data.districts.reduce(function async (preValue, curValue) {
          return preValue.concat(curValue.sn)
        }, [])
      } catch (error) {
        return false
      } finally {
        this.ui.loadingDistricts[index] = false
      }
    },
    async getCRM () {
      this.ui.isLoading = true
      try {
        this.ui.isLoading = true
        const { data } = await getCRM(this.$route.params.sn)
        this.formData = data.data
        this.formData.detailList.forEach((detailList, index) => {
          this.birthDate.push({})
          this.selectData.push(this.addSelectData(detailList.fieldFilterSn))
          detailList.criteriaList.forEach((criteriaList) => {
            if (criteriaList.type === 4) {
              this.handleCheckedProvinces(criteriaList.value, index)
            }
          })
        })
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    handleCheckAllDistrict (val, index, indexCriteria) {
      this.checkBox.checkAllDistrict[index] = val
      this.formData.detailList[index] = val ? this.districts[index] : []
      this.checkBox.isIndeterminateDistrict[index] = false
    },
    handleCheckedDistrict (val, index) {
      this.checkBox.checkAllDistrict[index] = val.length === this.districts[index].length
    },
    resetDistrictSelect (index) {
      this.districts[index] = [] // clear data district
      this.checkBox.checkAllDistrict[index] = true
      this.checkBox.isIndeterminateDistrict[index] = false
    },
    handleCheckAllProvinces (val, index, indexCriteria) {
      this.resetDistrictSelect(index)
      this.checkBox.checkAllProvinces[index] = val
      this.formData.detailList[index].criteriaList[indexCriteria].value = val ? this.provinces.reduce(function async (preValue, curValue) {
        return preValue.concat(curValue.sn)
      }, []) : []
      this.checkBox.isIndeterminateProvinces = true
      this.listDistricts(this.formData.detailList[index].criteriaList[indexCriteria].value, index)
    },
    handleCheckedProvinces (val, index) {
      this.resetDistrictSelect(index)
      this.checkBox.checkAllProvinces[index] = val.length === this.provinces.length
      this.checkBox.isIndeterminateProvinces = val.length > 0 && val.length < this.provinces.length
      if (this.formData.detailList[index].fieldFilterSn !== 4) {
        this.listDistricts(val, index)
      }
    },
    onDateFromSelect (criteria, e) {
      criteria.value = e
    },
    onDateToSelect (criteria, e) {
      criteria.value = e
    },
    onChangeInput (criteria, e) {
      criteria.value = e
    },
    onChangeBirthday (val, index, indexCriteria, type) {
      const arr = this.formData.detailList[index].criteriaList[indexCriteria].value.split('-')
      switch (type) {
        case 'date':
          val >= 10
            ? (arr[2] = val)
            : (arr[2] = '0' + val)
          break
        case 'month':
          val >= 10
            ? (arr[1] = val)
            : (arr[1] = '0' + val)
          break
        case 'year':
          arr[0] = val
          break
      }
      this.formData.detailList[index].criteriaList[indexCriteria].value = arr.join('-')
    },
    async onCreate () {
      try {
        const rawData = {
          title: this.formData.title,
          memo: this.formData.memo,
          operator: this.formData.operator,
          detailList: this.formData.detailList
        }
        const { data } = await onCreate(rawData)
        if (data.code === 1) {
          this.$message({
            type: 'success',
            message: this.$t('message.success')
          })
          this.$router.push({
            name: 'crmDetail',
            params: { sn: data.data.sn },
            query: { page: 'crmCreate' }
          })
        }
      } catch (e) {
        return false
      }
    },
    addCRM () {
      this.birthDate.push({
        date: '',
        month: '',
        years: ''
      })
      this.selectData.push(this.addSelectData(this.typeCrmSelected.value))
      this.formData.detailList.push({
        fieldDisplay: this.typeCrmSelected.name,
        fieldFilterSn: this.typeCrmSelected.value,
        operator: Number(this.formData.operator),
        criteriaList: this.setCriteria()
      })
    },
    setCriteria () {
      switch (this.typeCrmSelected.value) {
        case 1: // Register Time
          return [
            this.addDateFrom(6),
            this.addDateTo(7),
            this.addProvince(8),
            this.addDistrict(8)
          ]
        case 2: // Gender
          return [this.addSelect(0)]
        case 3: // Birthday
          return [
            this.addDateFrom(9),
            this.addProvince(8),
            this.addDistrict(8)
          ]
        case 4: // First Sign Up Province
          return [this.addProvince(8)]
        case 5: // Number open App
          return [
            this.addInput(0),
            this.addDateFrom(6),
            this.addDateTo(7),
            this.addProvince(8),
            this.addDistrict(8)
          ]
        case 6: // Register Via
          return [this.addSelect(0)]
        case 7: // Mileage Earned
          return [this.addInput(0)]
        case 8: // Mileage Amount
          return [this.addInput(0)]
        case 9: // Num Checkin
          return [
            this.addInput(0),
            this.addDateFrom(6),
            this.addDateTo(7),
            this.addProvince(8),
            this.addDistrict(8)
          ]
        case 10: // Num Booking
          return [
            this.addInput(0),
            this.addDateFrom(6),
            this.addDateTo(7),
            this.addProvince(8),
            this.addDistrict(8)
          ]
        case 11: // Last Open App
          return [
            this.addDateFrom(6),
            this.addDateTo(7),
            this.addProvince(8),
            this.addDistrict(8)
          ]
        case 12: // Device OS
          return [this.addSelect(0)]
        case 13: // Go2Joy State
          return [this.addSelect(0)]
        case 14: // First Signup
          return [this.addSelect(0)]
        case 15: // Number check-in used coupon
          return [
            this.addInput(0),
            this.addDateFrom(6),
            this.addDateTo(7),
            this.addProvince(8),
            this.addDistrict(8)
          ]
        case 16: // Number Open App/ Number signup month
          return [this.addInput(0)]
        case 17: // Average Check-in/ Month
          return [
            this.addInput(0),
            this.addDateFrom(6),
            this.addDateTo(7),
            this.addProvince(8),
            this.addDistrict(8)
          ]
      }
    },
    addInput (operator) {
      return {
        type: 0,
        operator: operator,
        value: 0
      }
    },
    addSelect (operator) {
      return {
        type: 1,
        operator: operator,
        value: this.typeCrmSelected.value === 13 ? 0 : 1
      }
    },
    addDateFrom (operator) {
      return {
        type: 2,
        operator: operator,
        value:
          operator !== 9 ? this.formatDate(new Date(), false) : '____-__-__'
      }
    },
    addDateTo (operator) {
      return {
        type: 3,
        operator: operator,
        value: this.formatDate(new Date(), false)
      }
    },
    addProvince (operator) {
      return {
        type: 4,
        operator: operator,
        value: []
      }
    },
    addDistrict (operator) {
      return {
        type: 5,
        operator: operator,
        value: []
      }
    },
    addSelectData (type) {
      switch (type) {
        case 2:
          return this.ui.gender
        case 6:
          return this.ui.registerVia
        case 12:
          return this.ui.deviceOS
        case 13:
          return this.ui.go2joyState
        case 14:
          return this.ui.firstSignup
        default:
          return []
      }
    },
    checkIsProvince (type) {
      if (
        type === 11 ||
        type === 10 ||
        type === 9 ||
        type === 5 ||
        type === 4 ||
        type === 3 ||
        type === 1 ||
        type === 15 ||
        type === 17
      ) {
        return true
      }
      return false
    },
    setRangeOfYear () {
      var oneYearFromNow = new Date()
      // get 6 year after
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 5)
      oneYearFromNow = oneYearFromNow.getUTCFullYear()
      // get 100 year from 6 year before
      this.yearOptions = Array(oneYearFromNow - (oneYearFromNow - 100))
        .fill('')
        .map((v, idx) => oneYearFromNow - idx)
    },
    removeCriteria (index) {
      this.formData.detailList.splice(index, 1)
      this.selectData.splice(index, 1)
    }
  }
}
</script>
<style lang="scss">
.memo-crm {
  width: 75%;
}
.create-crm__filters {
  margin: 10px;
}
.create-crm__table {
  .icon-trash-2 {
    color: red;
  }
}
.create-crm__table{
  .even-row {
    background-color: #fafafa;
  }
  .odd-row {
    background-color: #fff;
  }
  td {
    padding: 8px;
    border: 1px solid #ddd;
  }
  .criteria-0 {
    width: 180px;
  }
  .criteria-1,
  .criteria-2 {
    width: 350px;
  }
  .criteria-3,
  .criteria-4 {
    width: 200px;
  }
  .birthday {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .birthday .el-select {
    width: 70px;
    height: 30px;
  }
  .birthday .el-select.year {
    width: 100px;
  }
}

.crm-table {
  width: 100%;
  display: block;
}
</style>
