<template>
  <sa-section class="notification">
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
          <div class="notification__form--image">
              <img
                v-if="srcImage"
                :src="srcImage"
                class="image">
              <image-uploader
                class="image-uploader"
                :preview="false"
                capture="environment"
                :debug="1"
                doNotResize="gif"
                :autoRotate="true"
                outputFormat="verbose"
                @input="setImage"
              >
              <label for="fileInput" slot="upload-label">
                (96x96)
              </label>
            </image-uploader>

            <ThumbnailDialog
              :width="setRatioThumbnail.width"
              :height="setRatioThumbnail.height"
              ref="thumbnailDialog"
              :visible="ui.thumbnailDialogVisible"
              @result="resultThumbnail"
              @close="ui.thumbnailDialogVisible = false"
            />
            <el-button v-if="srcImage" type="danger" icon="el-icon-delete" @click="handleRemoveImage">{{$t('button.delete')}}</el-button>
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
        </el-form-item>
      </div>
      <div v-show="form.openApp == 1 && form.sendTo == 1 && form.type != 3" class="notification__form">
        <el-form-item :label="$t('page.notification.ChooseArea')" required>
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
        </el-form-item>
      </div>
      <div class="notification__form" v-show="form.type != 3">
        <el-form-item :label="$t('page.notification.schedule')" required>
          <el-form-item prop="sendTimeSchedule">
            <el-date-picker class="datetime" type="datetime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :placeholder="$t('page.notification.schedule')" v-model="form.sendTimeSchedule"></el-date-picker>
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
import { debounce, scrollToTop } from '@/utils/helpers'
import SaSection from '@/components/globals/SaSection.vue'
import SaSelectCheck from '@/components/globals/SaSelectCheck.vue'
import { createNotification } from './api'
import { targetType, sendToOptionsV2 } from '@/utils/const'
import { fetchPromotions, fetchPromotionGroups } from '@/api/promotion'
import { fetchSuggestionsHotels } from '@/api/hotels'
import { fetchNotices } from '@/api/notices'
import { fetchFaqs } from '@/api/faqs'
import { fetchProvinces } from '@/api/province'
import { fetchCrms } from '@/api/crm'
import UploadFile from '@/components/globals/UploadFile'

import ThumbnailDialog from '@/components/globals//thumbnail-dialog'
import { uploadFileZip } from '@/api/uploadFileZip'
import ImageUploader from '@/components/globals/ImageUploader.vue'

const timeDebounce = 500

export default {
  name: 'NotificationCreate',
  components: {
    SaSection,
    UploadFile,
    SaSelectCheck,
    ThumbnailDialog,
    ImageUploader
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
        provinceList: []
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
        ],
        thumbnailDialogVisible: false
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
      srcImage: ''
    }
  },
  created () {
    if (this.$route.query.targetType) {
      this.form.targetType = Number(this.$route.query.targetType)
    }
    this.fetchPromotions()
    this.fetchProvinces()
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
    },
    setRatioThumbnail () {
      return {
        width: 288, // 96
        height: 288 // 96
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
      if (value) {
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
    setImage (file) {
      this.hasImage = true
      this.$refs.thumbnailDialog.setup({ file: file })
      this.ui.thumbnailDialogVisible = true
    },
    resultThumbnail (result) {
      this.form.fileName = result.name
      this.image = result
      this.srcImage = URL.createObjectURL(result)
    },
    async uploadFileZip (preSigned, filePath) {
      try {
        await uploadFileZip(preSigned, filePath)
        const message = this.$t('message.createSuccess')
        this.$message({
          type: 'success',
          message: message
        })
        this.$router.go(-1)
      } catch (error) {
        return false
      } finally {}
    },
    /// ///////////////////////////////////// ==
    handleCheckAllChangeProvinces (val) {
      this.form.provinceList = val ? this.ui.provinceOptions : []
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
        const { data } = await fetchPromotions(params)
        this.promotions = data.data.suggestionPromotion
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
    },
    handleUploadExcel (file) {
      this.form.uploadFile = file
    },
    preHandleBeforeSubmit () {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          scrollToTop('.el-form-item__error')
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

        const { data } = await createNotification(formData)
        if (data.code === 1) {
          const message = this.$t('message.createSuccess')
          this.$message({
            type: 'success',
            message: message
          })
          this.$router.push({ name: 'notificationDetails', params: { sn: data.data.sn, type: 'resend' } })
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

    .notification__form--image {
      display: flex;
      align-items: center;
      gap: 1em;
      @media (max-width: 640px) {
        display: inline-flex;
        flex-wrap: wrap;
      }

      img {
        width: 16em;
        height: 100px;
        object-fit: contain;
        border: 1px solid #DCDFE6;
      }
    }
    &__row {
      @media (min-width: 640px) {
        display: flex;
        gap: 0 2em;
        flex-wrap: wrap;
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
      display: flex;
      justify-content: flex-end;
      @media (max-width: 640px) {
        position: fixed;
        bottom: 0;
        right: 0;
        background: white;
        width: 100%;
        padding-bottom: 1em;
        padding-right: 1em;
        button {
          margin-top: 1em;
        }
      }
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
