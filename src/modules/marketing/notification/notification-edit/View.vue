<template>
  <sa-section class="notification" v-loading="ui.isLoading">
    <el-form :model="form" :rules="rules" ref="form">
      <div class="notification__form">
        <el-form-item :label="$t('page.notification.type')" required>
          <el-form-item>
            <el-select
            v-model="notificationType"
            >
              <el-option
                v-for="(item, index) in ui.notificationTypeOptions"
                :key="index"
                :label="$t(`${item.key}`)"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
      </div>
      <div class="notification__form" v-show="form.type != 3">
        <el-form-item :label="$t('page.notification.targetType')" required>
          <div class="notification__row">
            <div class="notification__row--margin">
              <el-form-item>
                <el-select
                v-model="form.targetType"
                >
                  <el-option
                    v-for="(item, index) in targetTypeOptions"
                    :key="index"
                    :label="$t(`${item.key}`)"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="notification__row--margin">
              <el-form-item v-show="form.targetType == 2" prop="targetSn">
                <el-select
                :placeholder="$t('option.targetType.promotion')"
                :loading="ui.isLoadingPromotions"
                v-model="targetSnSelected"
                filterable
                remote
                :remote-method="reloadPromotions"
                value-key="sn"
                >
                  <el-option
                    v-for="(item, index) in promotions"
                    :key="index"
                    :label="item.title"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-show="form.targetType == 4" prop="targetSn">
                <el-select
                :placeholder="$t('option.targetType.hotel')"
                :loading="ui.isLoadingHotels"
                v-model="targetSnSelected"
                filterable
                remote
                :remote-method="reloadSuggestionsHotels"
                value-key="sn"
                >
                  <el-option
                    v-for="(item, index) in hotels"
                    :key="index"
                    :label="item.name"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-show="form.targetType == 1" prop="targetSn">
                <el-select
                :placeholder="$t('option.targetType.notice')"
                :loading="ui.isLoadingNotices"
                v-model="targetSnSelected"
                filterable
                remote
                :remote-method="reloadNotices"
                value-key="sn"
                >
                  <el-option
                    v-for="(item, index) in notices"
                    :key="index"
                    :label="item.title"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-show="form.targetType == 5" prop="targetSn">
                <el-select
                :placeholder="$t('option.targetType.faq')"
                :loading="ui.isLoadingFaqs"
                v-model="targetSnSelected"
                filterable
                remote
                :remote-method="reloadFaqs"
                value-key="sn"
                >
                  <el-option
                    v-for="(item, index) in faqs"
                    :key="index"
                    :label="item.title"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-show="form.targetType == 11" prop="targetSn">
                <el-select
                :placeholder="$t('option.targetType.promotionGroup')"
                :loading="ui.isLoadingPromotionGroups"
                v-model="targetSnSelected"
                filterable
                remote
                :remote-method="reloadPromotionGroups"
                value-key="sn"
                >
                  <el-option
                    v-for="(item, index) in promotionGroups"
                    :key="index"
                    :label="item.title"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
      </div>
      <div class="notification__form">
        <el-form-item :label="$t('page.notification.title')" prop="title" required>
          <el-input :placeholder="$t('page.notification.title')" v-model="form.title" type="text"></el-input>
        </el-form-item>
      </div>
      <div class="notification__form">
        <el-form-item :label="$t('page.notification.subTitle')">
          <el-input
            type="textarea"
            :rows="5"
            :placeholder="$t('page.notification.subTitle')"
            v-model="form.subTitle">
          </el-input>
        </el-form-item>
      </div>
      <div class="notification__form">
        <el-form-item :label="$t('page.notification.titleIcon')">
          <div class="notification__row">
            <div v-if="srcImage" class="notification__row--margin">
              <el-form-item>
                <img style="width: 60px; height: 60px"
                :src="srcImage"
                class="image">
              </el-form-item>
            </div>
            <div class="notification__row--margin">
              <el-form-item>
                <upload-file
                  :showFileName="false"
                  accept="image/png, image/jpeg"
                  @change="handleUploadImage"
                >
                  {{ $t('button.chooseFile')}}
                </upload-file>
              </el-form-item>
            </div>
            <div v-if="srcImage" class="notification__row--margin">
              <el-form-item>
                <el-button type="danger" icon="el-icon-delete" @click="handleRemoveImage">{{$t('button.delete')}}</el-button>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
      </div>
      <div class="notification__form" v-show="form.type != 3">
        <el-form-item :label="$t('page.notification.sendTo')">
          <div class="notification__row">
            <div class="notification__row--margin">
              <el-form-item>
                <el-select
                v-model="form.sendTo"
                >
                  <el-option
                    v-for="(item, index) in sentToOptions"
                    :key="index"
                    :label="$t(`${item.key}`)"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div v-show="form.sendTo == 1" class="notification__row--margin">
              <el-form-item>
                {{ $t('page.notification.filterByLocation') }}
              </el-form-item>
            </div>
            <div v-show="form.sendTo == 1" class="notification__row--margin">
              <el-form-item>
                <el-select
                v-model="form.openApp"
                >
                  <el-option
                    v-for="(item, index) in ui.locationOptions"
                    :key="index"
                    :label="$t(`${item.key}`)"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div v-show="form.sendTo == 9" class="notification__row--margin">
              <el-form-item>
                <el-select
                :loading="ui.loadingCrms"
                v-model="form.crmFilterSn"
                filterable
                clearable
                :placeholder="$t('option.status.crmFilter')"
                remote
                :remote-method="reloadCrms"
                >
                  <el-option
                    v-for="(item, index) in crms"
                    :key="index"
                    :label="item.title"
                    :value="item.sn"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
      </div>
      <div v-show="form.sendTo == 8 && form.type != 3" class="notification__form">
        <el-form-item :label="$t('page.notification.PleaseChooseExcelFile')" required>
          <div class="notification__row">
            <div v-if="originalFileName" class="notification__row--margin">
              <el-form-item>
                <p>{{ originalFileName }}</p>
              </el-form-item>
            </div>
            <div class="notification__row--margin">
              <el-form-item>
                <upload-file
                  class="w-100"
                  accept=".xlsx, .xls, .csv"
                  @change="handleUploadExcel"
                >
                  {{ $t('button.chooseFile')}}
                </upload-file>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
      </div>
      <div v-show="form.openApp == 1 && form.sendTo == 1 && form.type != 3" class="notification__form">
        <el-form-item :label="$t('page.notification.ChooseArea')" required>
          <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item >
            <SaSelectCheck
              class="select-check"
              v-model="form.provinceList"
              :indeterminate="checkBox.isIndeterminateProvinces"
              :model-check-all="checkBox.checkAllProvinces"
              :isCheckAll="true"
              label="sn"
              keyValue="name"
              :options="provinces"
              @changeCheckAll="handleCheckAllChangeProvinces"
              @input="checkBoxFilterProvinces"
              :loadingButton="ui.loadingProvinces"
            />
            </el-form-item>
          </el-col>
        </el-form-item>
      </div>
      <div class="notification__form" v-show="form.type != 3">
        <el-form-item :label="$t('page.notification.schedule')" required>
          <el-form-item prop="sendTimeSchedule">
            <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :placeholder="$t('page.notification.schedule')" v-model="form.sendTimeSchedule"></el-date-picker>
          </el-form-item>
        </el-form-item>
      </div>
      <div class="notification__button">
        <el-button type="info" size="large" @click="$router.go(-1)">
            {{ $t('button.back')}}
        </el-button>
        <el-button type="success" :loading="ui.isSubmiting" size="large" @click="preHandleBeforeSubmit">
            {{ $t('button.continue')}}
        </el-button>
      </div>
    </el-form>
  </sa-section>
</template>
<script>
import { debounce } from '@/utils/helpers'
import SaSection from '@/components/globals/SaSection.vue'
import SaSelectCheck from '@/components/globals/SaSelectCheck.vue'
import { getNotificationDetails } from '../notification-details/api'
import { updateNotification } from './api'
import { targetType, sendToOptionsV2 } from '@/utils/const'
import { fetchPromotions, fetchPromotionGroups, fetchPromotionDetail } from '@/api/promotion'
import { fetchSuggestionsHotels } from '@/api/hotels'
import { fetchNotices } from '@/api/notices'
import { fetchFaqs } from '@/api/faqs'
import { fetchProvinces } from '@/api/province'
import { fetchCrms } from '@/api/crm'
import UploadFile from '@/components/globals/UploadFile'
const timeDebounce = 500

export default {
  name: 'NotificationCreate',
  components: {
    SaSection,
    UploadFile,
    SaSelectCheck
  },
  data () {
    return {
      form: {
        type: 1,
        targetType: 2,
        targetSn: '',
        title: '',
        subTitle: '',
        iconUpload: '',
        sendTimeSchedule: '',
        sendTo: 1,
        atLeastHour: 1,
        intervalDay: 1,
        numSend: 1,
        openApp: 0,
        typeOfDay: '',
        operator: 1,
        numOfBooking: 0,
        crmFilterSn: '',
        appUserSn: '',
        conversion: '',
        uploadFile: '',
        provinceList: [],
        deleteIcon: 0
      },
      rules: {
        title: [
          { required: true, message: this.$t('page.notification.requiredTitle'), trigger: 'blur' }
        ],
        targetSn: [
          { required: true, message: this.$t('page.notification.requiredTargetSn'), trigger: 'blur' }
        ],
        sendTimeSchedule: [
          { required: true, message: this.$t('page.notification.requiredSchedule'), trigger: 'blur' }
        ]
      },
      ui: {
        isLoading: false,
        isSubmiting: false,
        isLoadingPromotions: false,
        isLoadingHotels: false,
        isLoadingNotices: false,
        isLoadingFaqs: false,
        isLoadingPromotionGroups: false,
        loadingProvinces: false,
        loadingCrms: false,
        provinceOptions: [],
        notificationTypeOptions: [
          { key: 'option.status.normal', value: 1 },
          { key: 'option.status.donateCoupon', value: 2 },
          { key: 'option.status.remindCoupon', value: 3 }
        ],
        locationOptions: [
          { key: 'option.status.none', value: 0 },
          { key: 'option.status.lastTimeOpenApp', value: 1 }
        ]
      },
      checkBox: {
        checkAllProvinces: false,
        isIndeterminateProvinces: false
      },
      promotions: [],
      hotels: [],
      notices: [],
      faqs: [],
      promotionGroups: [],
      provinces: [],
      crms: [],
      targetSnSelected: null,
      targetTypeOptions: targetType,
      sentToOptions: sendToOptionsV2,
      totalRedeemSelected: [],
      srcImage: '',
      originalFileName: ''
    }
  },
  created () {
    // this.fetchPromotions()
    this.fetchProvinces()
    this.getNotificationDetails()
  },
  computed: {
    notificationType: {
      get: function () {
        return this.form.type
      },
      set: function (newValue) {
        if (newValue === 2) {
          this.targetTypeOptions = [{ value: 2, key: 'option.targetType.promotion' }]
          this.sentToOptions = [
            { value: 8, key: 'option.status.allImportFromExcelFile' },
            { value: 9, key: 'option.status.crmFilter' },
            { value: 10, key: 'option.status.userInput' }
          ]
          this.form.targetType = 2
          this.form.sendTo = 9
        } else if (newValue === 1) {
          this.targetTypeOptions = targetType
          this.sentToOptions = sendToOptionsV2
          this.form.sendTo = 1
        } else {
          this.form.targetType = ''
        }
        this.form.type = newValue
      }
    }
  },
  watch: {
    'form.targetType' (targetType) {
      const sentToDefaultOptions = [
        { value: 1, key: 'option.status.allUser' },
        { value: 2, key: 'option.status.go2joy' },
        { value: 8, key: 'option.status.allImportFromExcelFile' },
        { value: 9, key: 'option.status.crmFilter' }
      ]
      this.form.targetSn = ''
      switch (targetType) {
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
          this.sentToOptions = sentToDefaultOptions
          break
        case 4:
          this.sentToOptions = sentToDefaultOptions
          this.fetchSuggestionsHotels()
          break
        case 11:
          this.sentToOptions = sentToDefaultOptions
          this.fetchPromotionGroups()
          break
        case 2:
          this.sentToOptions = sendToOptionsV2
          break
        case 1:
          this.sentToOptions = [
            { value: 1, key: 'option.status.allUser' },
            { value: 2, key: 'option.status.go2joy' },
            { value: 7, key: 'option.status.allContractPartner' },
            { value: 8, key: 'option.status.allImportFromExcelFile' },
            { value: 9, key: 'option.status.crmFilter' }
          ]
          this.fetchNotices()
          break
        case 3:
          this.sentToOptions = [
            { value: 1, key: 'option.status.allUser' },
            { value: 2, key: 'option.status.go2joy' }
          ]
          break
        case 5:
          this.sentToOptions = [
            { value: 3, key: 'option.status.allPartner' },
            { value: 6, key: 'option.status.allTrailPartner' },
            { value: 7, key: 'option.status.allContractPartner' }
          ]
          this.fetchFaqs()
          break
        case 14:
          this.sentToOptions = [
            { value: 1, key: 'option.status.allUser' },
            { value: 2, key: 'option.status.go2joy' },
            { value: 3, key: 'option.status.allPartner' },
            { value: 6, key: 'option.status.allTrailPartner' },
            { value: 7, key: 'option.status.allContractPartner' },
            { value: 8, key: 'option.status.allImportFromExcelFile' },
            { value: 9, key: 'option.status.crmFilter' }
          ]
          break
      }
      this.form.sendTo = this.sentToOptions[0].value
    },
    targetSnSelected (value) {
      if (value && (value.title || value.name)) {
        this.form.title = value.title ? value.title : value.name
        this.form.targetSn = value.sn
      }
    },
    'form.sendTo' (newValue) {
      if (newValue === 9) {
        this.fetchCrms()
      }
    }
  },
  methods: {
    handleCheckAllChangeProvinces (val) {
      if (val) {
        this.provinces.find(province => {
          this.form.provinceList.push(province.sn)
          this.form.provinceList = Array.from(new Set(this.form.provinceList))
        })
      } else {
        this.form.provinceList = []
      }
      this.checkBox.isIndeterminateProvinces = false
      this.checkBox.checkAllProvinces = !!val
    },
    checkBoxFilterProvinces () {
      this.checkBox.checkAllProvinces = this.form.provinceList.length === this.provinces.length
      this.checkBox.isIndeterminateProvinces = this.form.provinceList.length > 0 && this.form.provinceList.length < this.provinces.length
    },
    async fetchPromotions (keyword) {
      this.ui.isLoadingPromotions = true
      try {
        const params = { keyword: keyword, limit: 10 }
        let data
        if (this.form.targetType === 2 && !keyword) {
          data = await fetchPromotionDetail(this.form.targetSn)
          this.promotions = [{
            title: data.data?.data?.title,
            sn: data.data?.data?.sn
          }]
        } else {
          data = await fetchPromotions(params)
          this.promotions = data.data?.data?.suggestionPromotion
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingPromotions = false
      }
    },
    reloadPromotions: debounce(function (keyword) {
      this.fetchPromotions(keyword)
    }, timeDebounce),
    async fetchSuggestionsHotels (keyword) {
      this.ui.isLoadingHotels = true
      try {
        const params = { keyword: keyword, limit: 10, justHotel: 1, hotelSn: '' }
        const { data } = await fetchSuggestionsHotels(params)
        this.hotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotels = false
      }
    },
    reloadSuggestionsHotels: debounce(function (keyword) {
      this.fetchSuggestionsHotels(keyword)
    }, timeDebounce),
    async fetchNotices (keyword) {
      this.ui.isLoadingNotices = true
      try {
        const params = { keyword: keyword, limit: 10 }
        const { data } = await fetchNotices(params)
        this.notices = data.data.appNotices
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingNotices = false
      }
    },
    reloadNotices: debounce(function (keyword) {
      this.fetchNotices(keyword)
    }, timeDebounce),
    async fetchFaqs (keyword) {
      this.ui.isLoadingFaqs = true
      try {
        const params = { keyword: keyword, limit: 10 }
        const { data } = await fetchFaqs(params)
        this.faqs = data.data.suggestionFaq
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingFaqs = false
      }
    },
    reloadFaqs: debounce(function (keyword) {
      this.fetchFaqs(keyword)
    }, timeDebounce),
    async fetchPromotionGroups (keyword) {
      this.ui.isLoadingPromotionGroups = true
      try {
        const params = { keyword: keyword, limit: 10 }
        const { data } = await fetchPromotionGroups(params)
        this.promotionGroups = data.data.promotionGroups
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingPromotionGroups = false
      }
    },
    reloadPromotionGroups: debounce(function (keyword) {
      this.fetchPromotionGroups(keyword)
    }, timeDebounce),
    async fetchProvinces () {
      this.ui.loadingProvinces = true
      try {
        const params = { limit: 100, status: 1 }
        const { data } = await fetchProvinces(params)
        this.provinces = data.data.provinces
        this.ui.provinceOptions = await data.data.provinces.reduce(function async (preValue, curValue) {
          return preValue.concat(curValue.sn)
        }, [])
      } catch (error) {
        return false
      } finally {
        this.ui.loadingProvinces = false
      }
    },
    async fetchCrms (keyword) {
      this.ui.loadingCrms = true
      try {
        const params = { keyword: keyword, limit: 100 }
        const { data } = await fetchCrms(params)
        this.crms = data.data.suggestionCrm
      } catch (error) {
        return false
      } finally {
        this.ui.loadingCrms = false
      }
    },
    reloadCrms: debounce(function (keyword) {
      this.fetchCrms(keyword)
    }, timeDebounce),
    handleUploadImage (file) {
      this.form.iconUpload = file
      this.srcImage = URL.createObjectURL(file)
    },
    handleRemoveImage () {
      this.form.iconUpload = this.srcImage = ''
      this.form.deleteIcon = 1
    },
    handleUploadExcel (file) {
      this.form.uploadFile = file
    },
    async getNotificationDetails () {
      this.ui.isLoading = true
      try {
        const { data } = await getNotificationDetails(this.$route.params.sn)
        this.form.type = data.data?.type
        this.targetSnSelected = { sn: data.data?.targetSn }
        this.form.targetSn = data.data?.targetSn
        this.form.title = data.data?.title
        this.form.subTitle = data.data?.subTitle
        this.form.sendTo = data.data?.sendTo
        this.srcImage = data.data?.imagePath ? this.formatImage(data.data?.imagePath) : ''
        this.form.sendTimeSchedule = this.formatDate(data.data?.sendTimeSchedule)
        this.form.crmFilterSn = data.data?.crmFilterSn
        this.form.openApp = data.data?.openApp
        this.originalFileName = data.data?.originalFileName
        this.form.provinceList = data.data?.provinceSnList
        this.form.targetType = data.data?.targetType
        this.checkBoxFilterProvinces()

        if (data.data?.targetType === 2) {
          this.fetchPromotions()
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    preHandleBeforeSubmit () {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false
        }
        this.submit()
      })
    },
    async submit () {
      this.ui.isSubmiting = true
      try {
        const formData = Object.keys(this.form).reduce((formData, key) => {
          formData.append(key, this.form[key])
          return formData
        }, new FormData())

        const { data } = await updateNotification(this.$route.params.sn, formData)
        if (data.code === 1) {
          const message = this.$t('message.updateSuccess')
          this.$message({
            type: 'success',
            message: message
          })
          this.$router.push({ name: 'notificationDetails', params: { sn: this.$route.params.sn, type: 'resend' } })
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isSubmiting = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .notification {
    :deep(.notification__form) {
      margin: 1em 0;
      .el-form-item {
        display: unset;
        margin-bottom: 1em;
        @media (min-width: 640px) {
          display: flex;
          flex-wrap: wrap;
        }
      }
      .el-form-item__label {
        text-align: left;
        @media (min-width: 640px) {
          flex: 1;
        }
      }
      .el-form-item__content {
        @media (min-width: 640px) {
          flex: 3;
        }
      }
      .el-form-item__error {
        margin-top: 0.5em;
        position: unset;
      }
      .datetime {
        width: 100%;
        @media (min-width: 640px) {
          width: 16em;
        }
      }
    }
    &__row {
      @media (min-width: 640px) {
        display: flex;
        gap: 0 2em;
        flex-wrap: wrap;
      }
      img {
        width: 16em !important;
      }
      .upload-file {
        width: 10em;
      }
      &--margin {
        margin: 1em 0;
        @media (min-width: 640px) {
          margin: unset;
        }
      }
    }
    &__button {
      display: flex;;
      justify-content: flex-end;
      margin-top: 2em;
    }
  }
  :deep(.select-check) {
    button {
      width: 100%;
      @media (min-width: 640px) {
        width: 16em;
      }
    }
  }
  .el-select {
    width: 100%;
  }
</style>
