<template>
  <sa-section class="banner" v-loading="ui.isLoading">
    <el-form :model="form" :rules="rules" ref="form">
      <div class="banner__form">
        <el-form-item :label="$t('page.banner.choose_display_in_app_web')" prop="type" required>
          <el-radio v-model="form.type" :label="1">App</el-radio>
          <el-radio v-model="form.type" :label="2">Website</el-radio>
        </el-form-item>
      </div>

      <div class="banner__form">
        <el-form-item :label="$t('page.banner.title')" prop="title" required>
          <el-input :placeholder="$t('page.banner.title')" v-model="form.title" type="text"></el-input>
        </el-form-item>
      </div>
      <div class="banner__form" v-show="form.type !== 3">
        <el-form-item :label="$t('page.banner.linkItem')" required>
          <div class="banner__row">
            <div class="banner__row--margin">
              <el-form-item>
                <el-select
                v-model="form.targetType"
                >
                  <el-option
                    v-for="(item, index) in ui.linkItemOptions"
                    :key="index"
                    :label="$t(`${item.key}`)"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="banner__row--margin">
              <el-form-item v-show="form.targetType === 1" prop="targetSn">
                <el-select
                :placeholder="$t('option.targetType.promotion')"
                v-loading="ui.isLoadingPromotions"
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
                    :value="item.sn"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-show="form.targetType === 2" prop="targetSn">
                <el-select
                :placeholder="$t('option.targetType.hotel')"
                v-loading="ui.isLoadingHotels"
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
                    :value="item.sn"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-show="form.targetType === 3" prop="targetSn">
                <el-select
                :placeholder="$t('option.targetType.notice')"
                v-loading="ui.isLoadingNotices"
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
                    :value="item.sn"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-show="form.targetType === 4 || form.targetType === 61" prop="targetInfo">
                <el-input :placeholder="$t('option.targetType.link')" v-model="form.targetInfo" type="text"></el-input>
              </el-form-item>
              <el-form-item v-show="form.targetType === 5" prop="provinceSelected">
                <el-select
                :placeholder="$t('page.banner.chooseProvince')"
                v-loading="ui.loadingProvinces"
                v-model="provinceSelected"
                filterable
                >
                  <el-option
                    v-for="(item, index) in provinces"
                    :key="index"
                    :label="item.name"
                    :value="item.sn"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-show="form.targetType === 10" prop="targetSn">
                <el-select
                :placeholder="$t('option.targetType.promotionGroup')"
                v-loading="ui.isLoadingPromotionGroups"
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
                    :value="item.sn"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div v-if="form.targetType === 5" class="banner__row--margin">
              <el-form-item prop="targetSn">
                <el-select
                :placeholder="$t('page.banner.chooseDistrict')"
                v-loading="ui.loadingDistricts"
                v-model="form.targetSn"
                filterable
                >
                  <el-option
                    v-for="(item, index) in districts"
                    :key="index"
                    :label="item.name"
                    :value="item.sn"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
      </div>
      <div class="banner__form">
        <el-form-item :label="$t('page.banner.display')" required>
          <el-checkbox :true-label="1" :false-label="0" v-model="form.display"></el-checkbox>
        </el-form-item>
      </div>
      <div class="banner__form" v-show="form.type !== 3">
        <el-form-item :label="$t('page.banner.stopAt')">
          <el-form-item>
            <el-date-picker type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            :placeholder="$t('page.banner.stopAt')"
            v-model="form.endDate"
            :clearable="false"
            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-form-item>
      </div>
      <div class="banner__form">
        <el-form-item :label="$t('page.banner.listProvince')" required>
          <el-form-item >
          <SaSelectCheck
            class="select-check"
            v-model="form.listProvinceSn"
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
      <div class="banner__form">
        <el-form-item :label="$t('page.banner.image')" required>
          <div class="banner__row">
            <img
            v-if="srcImage"
            :src="srcImage"
            class="image">

            <image-uploader
            class="image-uploader"
            :preview="false"
            :className="['fileinput', { 'fileinput--loaded': hasImage }]"
            capture="environment"
            :debug="1"
            doNotResize="gif"
            :autoRotate="true"
            outputFormat="verbose"
            @input="setImage"
          >
            <label for="fileInput" slot="upload-label">
              <i v-show="form.type === 1">(1000x690)</i>
              <i v-show="form.type === 2">(570x265)</i>
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
          </div>
        </el-form-item>
      </div>
      <div class="banner__button">
        <el-button type="info" size="large" @click="$router.go(-1)">
            {{ $t('button.back')}}
        </el-button>
        <el-button type="success" :loading="ui.isSubmiting" size="large" @click="preHandleBeforeSubmit">
            {{ $t('button.update')}}
        </el-button>
      </div>
    </el-form>
  </sa-section>
</template>
<script>
import { debounce, scrollToTop } from '@/utils/helpers'
import SaSection from '@/components/globals/SaSection.vue'
import SaSelectCheck from '@/components/globals/SaSelectCheck.vue'
import { updateBanner } from './api'
import { targetTypeV2 } from '@/utils/const'
import { fetchPromotionGroups } from '@/api/promotion'
import { fetchSuggestionsHotels } from '@/api/hotels'
import { fetchNotices } from '@/api/notices'
import { fetchProvinces, fetchDistricts } from '@/api/province'
import { getBannerDetails } from '../banner-details/api'
import { listPromotion } from '../../promotion/list/api'
import ThumbnailDialog from '@/components/globals/thumbnail-dialog'
import { uploadFileZip } from '@/api/uploadFileZip'
import ImageUploader from '@/components/globals/ImageUploader.vue'

const timeDebounce = 500
const today = new Date()
const currentTime = Date.now()
export default {
  name: 'BannerEdit',
  components: {
    SaSection,
    SaSelectCheck,
    ThumbnailDialog,
    ImageUploader
  },
  data () {
    return {
      form: {
        type: 1,
        title: '',
        targetType: null,
        targetSn: '',
        targetInfo: '',
        display: 1,
        listProvinceSn: [],
        endDate: this.formatDate(today, false)
      },
      image: '',
      rules: {
        title: [
          { required: true, message: this.$t('page.banner.requiredTitle'), trigger: 'blur' }
        ]
      },
      ui: {
        isLoading: false,
        isSubmiting: false,
        isLoadingPromotions: false,
        isLoadingHotels: false,
        isLoadingNotices: false,
        isLoadingPromotionGroups: false,
        loadingProvinces: false,
        loadingDistricts: false,
        provinceOptions: [],
        linkItemOptions: targetTypeV2.filter(item => item.value !== 7),
        thumbnailDialogVisible: false
      },
      checkBox: {
        checkAllProvinces: false,
        isIndeterminateProvinces: true
      },
      pickerOptions: {
        disabledDate: this.disabledDate
      },
      promotions: [],
      hotels: [],
      notices: [],
      provinces: [],
      districts: [],
      promotionGroups: [],
      provinceSelected: '',
      targetSnSelected: null,
      srcImage: '',
      flagTargetType: '',
      hasImage: false
    }
  },
  created () {
    this.fetchProvinces()

    this.getBannerDetails()
  },
  computed: {
    setRatioThumbnail () {
      if (this.form.type === 2) {
        return {
          width: 570,
          height: 265
        }
      } else {
        return {
          width: 500, // 1000
          height: 345 // 690
        }
      }
    }
  },
  watch: {
    'form.targetType' (targetType) {
      if (targetType !== this.flagTargetType) {
        this.targetSnSelected = null
        this.form.targetSn = ''
      }
      switch (targetType) {
        case 1:
          this.fetchPromotions(this.form.targetName)
          break
        case 2:
          this.fetchSuggestionsHotels(this.form.targetName)
          break
        case 3:
          this.fetchNotices(this.form.targetName)
          break
        case 10:
          this.fetchPromotionGroups(this.form.targetName)
          break
        default:
          break
      }
    },
    targetSnSelected (value) {
      this.form.targetSn = value || this.form.targetSn ? this.form.targetSn : ''
    },
    provinceSelected () {
      this.fetchDistricts()
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
      } catch (error) {
        return false
      } finally {}
    },

    disabledDate (time) {
      return time.getTime() < currentTime - 8.64e7
    },
    handleCheckAllChangeProvinces (val) {
      this.form.listProvinceSn = val ? this.ui.provinceOptions : []
      this.checkBox.isIndeterminateProvinces = false
      this.checkBox.checkAllProvinces = !!val
    },
    checkBoxFilterProvinces () {
      this.checkBox.checkAllProvinces = this.form.listProvinceSn.length === this.provinces.length
      this.checkBox.isIndeterminateProvinces = this.form.listProvinceSn.length > 0 && this.form.listProvinceSn.length < this.provinces.length
    },
    async fetchPromotions (keyword) {
      this.ui.isLoadingPromotions = true
      try {
        const params = { keyword: keyword, limit: 10, type: 1 }
        const { data } = await listPromotion(params)
        this.promotions = data.data.promotions
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
        const params = { limit: 100 }
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
    async fetchDistricts () {
      this.ui.loadingDistricts = true
      try {
        const params = { limit: 100, provinceSn: this.provinceSelected }
        const { data } = await fetchDistricts(params)
        this.districts = data.data.districts
      } catch (error) {
        return false
      } finally {
        this.ui.loadingDistricts = false
      }
    },

    async getBannerDetails () {
      this.ui.isLoading = true
      this.ui.isLoadingHotels = true
      try {
        const { data } = await getBannerDetails(this.$route.params.sn)
        this.provinceSelected = data.data.provinceSn
        this.flagTargetType = data.data.targetType
        this.srcImage = this.formatImage(data.data.imagePath)
        this.targetSnSelected = data.data.targetSn ? data.data.targetSn : ''

        this.form = {
          type: data.data.type,
          title: data.data.title,
          targetType: data.data.targetType,
          targetSn: data.data.targetSn,
          targetName: data.data.targetName || '',
          targetInfo: data.data.targetInfo || '',
          display: data.data.display,
          listProvinceSn: data.data.listProvinceSn,
          endDate: data.data.endDate,
          fileName: ''
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
        this.ui.isLoadingHotels = false
      }
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
      const self = this
      this.ui.isSubmiting = true
      try {
        const formData = Object.keys(this.form).reduce((formData, key) => {
          if (key === 'listProvinceSn') {
            formData.append(key, `[${this.form[key]}]`)
          } else {
            formData.append(key, this.form[key])
          }
          return formData
        }, new FormData())

        const { data } = await updateBanner(this.$route.params.sn, formData)
        if (data && this.image) {
          await this.uploadFileZip(data.data?.preSignedUrl?.pre_signed, this.image)
        }
        const message = this.$t('message.updateSuccess')
        this.$message({
          type: 'success',
          message: message
        })
        this.$router.go(-1)
      } catch (error) {
        this.ui.isSubmiting = false
        self.$message({
          type: 'error',
          message: error.response ? error.response.data.message[0].message : error
        })
        return false
      } finally {
        this.ui.isSubmiting = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .banner {
    :deep(.banner__form) {
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
        align-items: center;
        gap: 0 2em;
        flex-wrap: wrap;
      }
      img {
        width: 16em;
        height: 100px;
        object-fit: contain;
        border: 1px solid #DCDFE6;
        width: 100%;
        @media (min-width: 640px) {
          width: auto;
        }
      }
      .image-uploader {
        text-align: center;
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
