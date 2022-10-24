<template>
  <sa-section class="sms">
    <el-form
      v-loading="ui.loading"
      ref="smsForm"
      :model="formData"
      :rules="rules"
      label-width="350px"
      class="sms-form"
      hide-required-asterisk
    >
      <el-form-item
        :label="$t('page.sms.sender_type')"
      >
        <el-select
          v-model="formData.smsType"
          style="margin-right: 16px;"
        >
          <ElOption
            v-for="(item, index) in ui.senderOptions"
            :key="index"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
        <el-select
          v-model="formData.type"
        >
          <ElOption
            v-for="(item, index) in ui.typeOptions"
            :key="index"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        prop="content"
        :label="$t('page.sms.content')"
      >
        <el-input
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 15 }"
          v-model="formData.content"
        >
        </el-input>
        <p>{{ formData.content.length }}/160 - {{ Math.floor(formData.content.length / 160) + 1 }} SMS</p>
      </el-form-item>
      <el-form-item
        :label="$t('page.sms.send_to')"
      >
        <el-select
          v-model="formData.sendTo"
          @change="changeSendTo"
        >
          <ElOption
            v-for="(item, index) in ui.sendToOptions"
            :key="index"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-show="formData.sendTo === 2"
        :label="$t('page.sms.area')"
      >
        <el-select
          v-if="formData.sendTo === 2"
          v-model="formData.provinceSn"
          style="margin-right: 16px;"
          :class="{ 'select-loading': ui.provincesLoading }"
          placeholder=""
          :disabled="ui.provincesLoading"
          @change="fetchDistricts"
        >
          <ElOption
            v-for="(item, index) in provinceOptions"
            :key="index"
            :label="item.name"
            :value="item.sn"
          />
        </el-select>
        <el-select
          v-if="formData.sendTo === 2"
          v-model="formData.districtSn"
          :loading="ui.districtsLoading"
          :class="{ 'select-loading': ui.districtsLoading }"
          placeholder=""
          :disabled="ui.districtsLoading"
        >
          <ElOption
            v-for="(item, index) in districtOptions"
            :key="index"
            :label="item.name"
            :value="item.sn"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-show="formData.sendTo === 3"
        :label="$t('page.sms.select_hotel')"
      >
        <el-select
          v-if="formData.sendTo === 3"
          :loading="ui.suggestionsHotelsLoading"
          :placeholder="$t('page.sms.hotelName')"
          prefix-icon="el-icon-search"
          v-model="formData.hotelList"
          multiple
          filterable
          remote
          clearable
          allow-create
          :remote-method="searchSuggestionsHotels"
          @change="changeHotelSuggestion"
          default-first-option>
          <el-option
            v-for="(item) in suggestionsHotels"
            :key="item.sn"
            :label="item.name"
            :value="item.sn"
            style="font-size: 13px; color: #4a5d6e;"
            class="hotel__option">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-show="formData.sendTo === 4"
        :label="$t('page.sms.number_list')"
      >
        <el-select
          v-if="formData.sendTo === 4"
          v-model="formData.numberList"
          multiple
          filterable
          allow-create
          default-first-option
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        v-show="formData.sendTo === 5"
        :label="$t('page.sms.user_list')"
      >
        <el-select
          v-model="formData.userList"
          :loading="ui.userLoading"
          :placeholder="$t('page.sms.user_list')"
          remote
          filterable
          :remote-method="searchUsers"
          prefix-icon="el-icon-search"
          clearable
          multiple
          :popper-append-to-body="false"
        >
          <ElOption
            v-for="(item, index) in userOptions"
            :key="index"
            :label="item.nickName"
            :value="item.sn"
            style="font-size: 13px; color: #4a5d6e;"
            class="hotel__option"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-show="formData.sendTo === 7"
        :label="$t('page.sms.excelFile')"
      >
        <upload-file
          accept=".xlsx, .xls, .csv"
          @change="handleImportFile"
        >
          {{ $t('page.sms.importFile') }}
        </upload-file>
      </el-form-item>
      <el-form-item
        :label="$t('page.sms.send_schedule')"
      >
        <el-date-picker
          v-model="formData.scheduleTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm"
          :picker-options="pickerOptionsSendSchedule"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        style="text-align: right;"
      >
        <el-button
          type="info"
          @click="$router.go(-1)"
        >
          {{ $t('button.back') }}
        </el-button>
        <el-button
          type="success"
          @click="submitForm"
          icon="el-icon-plus"
        >
          {{ $t('button.send') }}
        </el-button>
      </el-form-item>
    </el-form>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { listHotels, fetchSuggestionsHotels } from '@/api/hotels'
import { fetchProvinces, fetchDistricts } from '@/api/province'
import { debounce } from '@/utils/helpers'
import { listUsers } from '@/modules/users/counseling-mgt/create/api'
import { createSMS } from './api'
import UploadFile from '@/components/globals/UploadFile.vue'
const timeDebounce = 500
export default {
  name: 'SmsList',
  components: { SaSection, UploadFile },
  data: (vm) => {
    return {
      ui: {
        districtsLoading: false,
        provincesLoading: false,
        suggestionsHotelsLoading: false,
        loading: false,
        userLoading: false,
        typeOptions: [
          { label: vm.$t('page.sms.custom_care'), value: 1 },
          { label: vm.$t('page.sms.marketing'), value: 2 }
        ],
        senderOptions: [
          { label: vm.$t('page.sms.go2joy'), value: 3 },
          { label: vm.$t('page.sms.phone'), value: 5 },
          { label: vm.$t('page.sms.random_number'), value: 2 }
        ],
        sendToOptions: [
          { label: vm.$t('page.sms.all'), value: 1 },
          { label: vm.$t('page.sms.specific_area'), value: 2 },
          { label: vm.$t('page.sms.specific_hotel'), value: 3 },
          { label: vm.$t('page.sms.specific_number'), value: 4 },
          { label: vm.$t('page.sms.specific_user'), value: 5 },
          { label: vm.$t('page.sms.import_from_excel_file'), value: 7 }
        ]
      },
      formData: {
        type: 1,
        smsType: 3,
        content: '',
        sendTo: 1,
        hotelList: []
      },
      rules: {
        content: [
          { required: true, message: vm.$t('page.article.requiredContent'), trigger: 'blur' }
        ]
      },
      suggestionsHotels: [],
      userOptions: [],
      districtOptions: [{ name: vm.$t('page.settings.all'), sn: '-1' }],
      provinceOptions: [],
      pickerOptionsSendSchedule: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  created () {
  },
  methods: {
    searchUsers: debounce(function (keyword) {
      this.fetchUsers({ limit: 10, keyword: keyword })
    }, timeDebounce),
    searchSuggestionsHotels: debounce(function (keySearch) {
      this.fetchSuggestionsHotels({
        limit: 10,
        justHotel: 1,
        hotelStatus: 0,
        keyword: keySearch
      })
    }, timeDebounce),
    async fetchSuggestionsHotels (params) {
      this.ui.suggestionsHotelsLoading = true
      try {
        const { data } = await fetchSuggestionsHotels(params)
        this.suggestionsHotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.suggestionsHotelsLoading = false
      }
    },
    async fetchProvinces () {
      try {
        this.ui.provincesLoading = true
        const { data } = await fetchProvinces({ limit: 100, status: 1 })
        this.provinceOptions = [{ name: this.$t('page.settings.all'), sn: '-1' }, ...data.data.provinces]
      } catch (error) {
        return false
      } finally {
        this.ui.provincesLoading = false
      }
    },
    async fetchDistricts () {
      try {
        this.ui.districtsLoading = true
        const { data } = await fetchDistricts({ limit: 100, provinceSn: this.formData.provinceSn })
        this.districtOptions = [{ name: this.$t('page.settings.all'), sn: '-1' }, ...data.data.districts]
      } catch (error) {
        return false
      } finally {
        this.ui.districtsLoading = false
      }
    },
    changeSendTo () {
      switch (this.formData.sendTo) {
        case 2:
          this.fetchProvinces()
          this.formData.provinceSn = '-1'
          this.formData.districtSn = '-1'
          break
        case 3:
          this.formData.provinceSn = ''
          this.formData.districtSn = ''
          this.districtOptions = []
          this.provinceOptions = []
          this.fetchSuggestionsHotels({
            justHotel: 1,
            hotelStatus: 0
          })
          break
        case 4:
          this.formData.provinceSn = ''
          this.formData.districtSn = ''
          break
        case 5:
          this.formData.provinceSn = ''
          this.formData.districtSn = ''
          this.fetchUsers({ limit: 10 })
          break
        default:
          break
      }
    },
    async fetchHotels () {
      this.ui.hotelLoading = true
      try {
        const { data } = await listHotels({ limit: 10 })
        this.hotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.hotelLoading = false
      }
    },
    handleImportFile (file) {
      this.formData.file = file
    },
    async fetchUsers (params) {
      this.ui.userLoading = true
      try {
        const { data } = await listUsers(params)
        this.userOptions = data.data.appUsers
      } catch (error) {
        return false
      } finally {
        this.ui.userLoading = false
      }
    },
    async submitForm () {
      this.$refs.smsForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        this.ui.loading = true
        try {
          this.formData.schedulePosting = this.formatDate(this.formData.schedulePosting)
          const formData = Object.keys(this.formData).reduce((formData, key) => {
            if (key === 'numberList') {
              if (!this.formData[key] || this.formData[key].length === 0) {
                formData.append(`${key}[]`, '')
              } else {
                this.formData[key].forEach(val => {
                  formData.append(`${key}[]`, val)
                })
              }
            } else if (key === 'hotelList' || key === 'userList') {
              formData.append(`${key}`, JSON.stringify(this.formData[key]))
            } else {
              formData.append(key, this.formData[key])
            }
            return formData
          }, new FormData())
          let message = ''
          await createSMS(formData)
          message = this.$t('message.createSuccess')
          this.$message({
            type: 'success',
            message: message
          })
          this.$router.push({ name: 'sms' })
        } catch (error) {
          return false
        } finally {
          this.ui.loading = false
        }
      })
    },
    changeHotelSuggestion (value) {
      console.log('value :>> ', value)
    }
  }
}
</script>
<style lang="scss" scoped>
.sms-form:deep {
  display: block;
  .el-form-item__content[style] {
    @media (max-width: 480px) {
        margin-left: unset !important;
    }
  }
  .el-form-item__label {
    @media (max-width: 480px) {
      text-align: unset !important;
      width: 100% !important;
    }
  }
}
.sms-form {
  :deep(.el-form-item__label) {
    text-align: left;
  }
  .hotel__option {
    height: auto;
  }
  .select-loading {
    position: relative;
    &::after {
      content: "";
      background: #F5F7FA;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
    }
    &::before {
      content: "\e6cf";
      position: absolute;
      top: 1px;
      left: 8px;
      z-index: 11;
      font-family: element-icons!important;
      animation: rotating 2s linear infinite;
    }
  }
}
</style>
