<template>
  <sa-section class="collection-edit">
    <el-form
      ref="formConllectionDetails"
      v-loading="ui.loading"
      :model="collectionDetails"
      :rules="rules"
      label-position="left"
      label-width="20%"
      class="collection-edit__form"
      hide-required-asterisk
    >

    <el-form-item
        :label="$t('page.collection.choose_display_in_app_web')"
      >
        <el-radio v-model="collectionDetails.type" :label="1" @change="onChangeType">App</el-radio>
        <el-radio v-model="collectionDetails.type" :label="2" @change="onChangeType">Website</el-radio>
      </el-form-item>

      <el-form-item
        :label="$t('page.collection.title')"
        prop="title"
      >
        <ElInput placeholder="Title 1" v-model="collectionDetails.title" />
      </el-form-item>
      <el-form-item
        :label="$t('page.collection.description')"
      >
        <ElInput :placeholder="$t('page.collection.description')" v-model="collectionDetails.description" />
      </el-form-item>
      <el-form-item :label="$t('page.collection.display')">
        <div class="collection-edit--flex">
          <ElCheckbox
            v-model="collectionDetails.display"
            border
          />
          <el-form-item
            prop="displayType"
          >
            <el-select
              v-model="collectionDetails.displayType"
            >
              <ElOption
                v-for="(item, index) in displayTypeOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
                :disabled="collectionDetails.type == 1 ? item.disabledApp : item.disabledWeb"
              />
            </el-select>
          </el-form-item>
          <el-select
            v-if="collectionDetails.displayType == 9"
            v-model="collectionDetails.displayCategory"
            class="browser-default custom-select"
            :placeholder="$t('page.collection.go2jSpecial')"
          >
            <ElOption
              v-for="(item, index) in iconOptions"
              :key="index"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </div>
      </el-form-item>

      <el-form-item
      v-if="collectionDetails.displayType === 10"
        :label="$t('page.collection.subTitle')"
        prop="subTitle" required
      >
        <ElInput :placeholder="$t('page.collection.subTitle')" v-model="collectionDetails.subTitle" />
      </el-form-item>

      <el-form-item
        v-if="collectionDetails.displayType === 2 || collectionDetails.displayType === 4 || collectionDetails.displayType === 9 || collectionDetails.displayType === 10 || collectionDetails.displayType === 11"
        :label="$t(`page.collection.${collectionDetails.displayType == 9 ? 'icon' : 'image'}`)"
      >
        <div
          class="collection-edit__image"
        >
          <img
            v-if="collectionDetails.imagePath && !formData.srcImage"
            :src="formatImage(collectionDetails.imagePath)"
          />
          <img
            v-if="formData.srcImage"
            :src="formData.srcImage"
          />
        </div>
          <image-uploader
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
              <i v-show="collectionDetails.displayType === 9">(1000x690)</i>
              <i v-show="collectionDetails.displayType === 10">(270x200)</i>
              <i v-show="collectionDetails.displayType === 11">(570x600)</i>
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
      </el-form-item>

      <el-form-item :label="$t('page.collection.hotelList')">
        <el-radio-group
          v-model="formData.displayRadio"
        >
          <ElRadio
            v-for="(item, index) in ui.checkBoxDisplays"
            :key="index"
            :label="item"
            class="radio-item"
          >
            {{$t(`page.collection.${item}`)}}
          </ElRadio>
          <el-radio
            v-if="collectionDetails.displayType == 1 || collectionDetails.displayType == 3 || collectionDetails.displayType == 5 || collectionDetails.displayType == 6 || collectionDetails.displayType == 7 || collectionDetails.displayType == 8"
            label="promotionSuggestion"
            style="width:170px">
            {{$t('page.collection.promotionSuggestion')}}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="formData.displayRadio === 'promotionSuggestion'"
        :label="$t('page.collection.promotionGroup')"
      >
        <el-select
          v-model="collectionDetails.targetSn"
          v-loading="ui.loadingPromotion"
          element-loading-spinner="el-icon-loading"
          remote
          filterable
          :remote-method="searchRemotePromotions"
          style="min-width: 350px;"
        >
          <ElOption
            v-for="(item, index) in listPromotionGroups"
            :key="index"
            :label="item.title"
            :value="item.sn"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="formData.displayRadio === 'promotionSuggestion'"
        :label="$t('page.collection.chooseProvince')"
      >
        <el-select
          v-model="collectionDetails.displayProvince"
          v-loading="ui.loadingProvinces"
          element-loading-spinner="el-icon-loading"
          style="min-width: 350px;"
        >
          <ElOption
            v-for="(item, index) in listProvinces"
            :key="index"
            :label="item.name"
            :value="item.sn"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="Slug"
        prop="slug"
      >
        <el-input
          v-model="collectionDetails.slug"
          placeholder="Slug"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="Full link"
      >
        <div class="full-link">
          <el-popover
            placement="bottom"
            trigger="hover"
            :content="contentCopy"
            width="50"
            height="50"
            @after-leave="hidePopoverCopy"
            :append-to-body="false"
            class="full-link__popover"
          >
            <el-button
              plain
              icon="el-icon-document-copy"
              class="full-link__copy"
              @click="handleCopyLink"
              slot="reference"
            >
            </el-button>
          </el-popover>
          <el-input
            v-model="fullLink"
            class="full-link__input"
            disabled
          >
          </el-input>
          <el-button
            type="primary"
            @click="getFullLink"
            class="full-link__get"
          >
            {{ $t('page.collection.getLink') }}
          </el-button>
        </div>
      </el-form-item>
      <div class="collection-edit__button">
        <el-button type="info" size="large" @click="$router.go(-1)">
            {{$t('button.back')}}
        </el-button>
        <el-button type="success" :loading="ui.isSubmiting" size="large" @click="handleEditCollection">
            {{$t('button.edit')}}
        </el-button>
      </div>
    </el-form>
  </sa-section>
</template>
<script>
import { getCollectionDetails, updateCollectionDetails } from './api'
import { fetchPromotionGroups } from '@/api/promotion'
import { fetchProvinces } from '@/api/province'
import { debounce, scrollToTop } from '@/utils/helpers'
import SaSection from '@/components/globals/SaSection.vue'
import ThumbnailDialog from '@/components/globals//thumbnail-dialog'
import { uploadFileZip } from '@/api/uploadFileZip'
import ImageUploader from '@/components/globals/ImageUploader.vue'

// declare const
const timeDebounce = 500
export default {
  name: 'CollectionEdit',
  components: {
    SaSection,
    ThumbnailDialog,
    ImageUploader
  },
  data: (vm) => {
    return {
      // data fetch APIs.
      collectionDetails: {},
      listProvinces: [],
      listPromotionGroups: [],
      // form input
      formData: {
        displayRadio: '',
        srcImage: '',
        fileName: ''
      },
      image: '',
      rules: {
        title: [
          { required: true, message: vm.$t('page.collection.requiredTitle'), trigger: 'blur' }
        ],
        subTitle: [
          { required: true, message: vm.$t('page.collection.requiredSubTitle'), trigger: 'blur' }
        ],
        displayType: [
          { required: true, message: vm.$t('page.collection.requiredDisplayType'), trigger: 'change' }
        ],
        displayCategory: [
          { required: true, message: vm.$t('page.collection.requiredDisplayCategory'), trigger: 'change' }
        ],
        displayRadio: [
          { required: true, message: vm.$t('page.collection.requiredHotelList'), trigger: ['change', 'blur'] }
        ],
        slug: [
          { required: true, message: vm.$t('page.collection.requiredSlug'), trigger: 'blur' }
        ]
      },
      ui: {
        // name item have to same with data from API collectionDetails
        checkBoxDisplays: [
          'flashSale',
          'promotion',
          'directDiscount',
          'amenityPackHotel',
          'loveHotel',
          'travelHotel',
          'hotHotel',
          'newHotel',
          'stamp',
          'image360',
          'hotelReview',
          'hotSearched',
          'hotelBooked',
          'hotelFavorite',
          'g2jCertified',
          'hotelSuggestion',
          'quarantine'
        ],
        loadingPromotion: false,
        loadingProvinces: false,
        loading: false,
        thumbnailDialogVisible: false,
        isSubmiting: false
      },
      contentCopy: vm.$t('page.collection.copy'),
      fullLink: '',
      hasImage: false
    }
  },
  computed: {
    // translate language before v-bind to element-ui
    displayTypeOptions () {
      return [{
        label: this.$t('page.collection.detail'),
        value: 1,
        disabledWeb: true
      },
      {
        label: this.$t('page.collection.summary'),
        value: 3,
        disabledWeb: true
      },
      {
        label: this.$t('page.collection.collection'),
        value: 2,
        disabledWeb: true
      },
      {
        label: this.$t('page.collection.circle'),
        value: 4,
        disabledWeb: true
      },
      {
        label: this.$t('page.collection.lightSquare'),
        value: 5,
        disabledWeb: true
      },
      {
        label: this.$t('page.collection.darkSquare'),
        value: 6,
        disabledWeb: true
      },
      {
        label: this.$t('page.collection.rectangle1'),
        value: 7,
        disabledWeb: true
      },
      {
        label: this.$t('page.collection.rectangle2'),
        value: 8,
        disabledWeb: true
      },
      {
        label: this.$t('page.collection.icon'),
        value: 9,
        disabledWeb: true
      },
      {
        label: 'Danh mục khách sạn',
        value: 10,
        disabledApp: true
      },
      {
        label: 'Trải nghiệm cùng Go2Joy',
        value: 11,
        disabledApp: true
      }
      ]
    },
    iconOptions () {
      return [{
        label: this.$t('page.collection.location'),
        value: 1
      },
      {
        label: this.$t('page.collection.bookingType'),
        value: 2
      },
      {
        label: this.$t('page.collection.go2jSpecial'),
        value: 3
      },
      {
        label: this.$t('page.collection.hotelType'),
        value: 4
      }]
    },
    setRatioThumbnail () {
      switch (this.collectionDetails.displayType) {
        case 9:
          return {
            width: 500, // 1000
            height: 345 // 690
          }
        case 10:
          return {
            width: 270,
            height: 200
          }
        case 11:
          return {
            width: 570,
            height: 600
          }
        default:
          return {
            width: 456,
            height: 364
          }
      }
    }
  },
  async created () {
    await this.getCollectionDetails()
  },
  watch: {
    // Example: selected = hotHotel and user change to hotelBooked => oldValue = 'hotelBooked' and newValue = 'hotelBooked'
    'formData.displayRadio': function (newValue, oldValue) {
      if (oldValue) {
        // this.collectionDetails.hotHotel = 0
        this.collectionDetails[oldValue] = 0
      }
      // this.collectionDetails.hotelBooked = 1x`
      this.collectionDetails[newValue] = 1
      // user select promotionSuggestion and not fetch (fetchProvinces + fetchPromotionGroups) yet.
      // if olValue null => get data from API(user not change).
      if (this.listProvinces.length === 0 && oldValue && newValue === 'promotionSuggestion') {
        this.fetchProvinces()
      }
      if (this.listPromotionGroups.length === 0 && oldValue && newValue === 'promotionSuggestion') {
        this.fetchPromotionGroups({ limit: 100 })
      }
    },
    'collectionDetails.displayType': function () {
      this.collectionDetails.displayCategory = 1
    }
  },
  methods: {
    setImage (file) {
      this.hasImage = true
      this.$refs.thumbnailDialog.setup({ file: file })
      this.ui.thumbnailDialogVisible = true
    },
    resultThumbnail (result) {
      this.collectionDetails.fileName = result.name
      this.image = result
      this.formData.srcImage = URL.createObjectURL(result)
    },

    async uploadFileZip (preSigned, filePath) {
      try {
        await uploadFileZip(preSigned, filePath)
      } catch (error) {
        return false
      } finally {}
    },

    onChangeType (val) {
      if (val === 2) {
        this.collectionDetails.displayType = 10
      } else {
        this.collectionDetails.displayType = 1
      }
    },
    // debounce
    searchRemotePromotions: debounce(function (keySearch) {
      this.fetchPromotionGroups({
        limit: 100,
        keyword: keySearch
      })
    }, timeDebounce),
    // fetch APIs
    async fetchProvinces () {
      this.ui.loadingProvinces = true
      try {
        this.listProvinces = [{ name: this.$t('page.collection.all'), sn: -1 }]
        const params = { limit: 100, status: 1 }
        const { data } = await fetchProvinces(params)
        this.listProvinces = [...this.listProvinces, ...data.data.provinces]
      } catch (error) {
        return false
      } finally {
        this.ui.loadingProvinces = false
      }
    },
    async fetchPromotionGroups (params) {
      this.ui.loadingPromotion = true
      try {
        const { data } = await fetchPromotionGroups(params)
        this.listPromotionGroups = data.data.promotionGroups
      } catch (error) {
        return false
      } finally {
        this.ui.loadingPromotion = false
      }
    },
    async getCollectionDetails () {
      this.ui.loading = true
      try {
        const { data } = await getCollectionDetails(this.$route.params.sn)
        this.formData.fileName = data.data[0].originalName || '' // catch name image
        this.collectionDetails = { ...data?.data[0], ...this.formData }
        this.collectionDetails.display = this.collectionDetails.display === 1
        this.formData.displayRadio = this.setRadioValue()
        if (!this.collectionDetails.description) {
          this.collectionDetails.description = ''
        }
        if (this.collectionDetails.promotionSuggestion === 1) {
          this.fetchProvinces()
          this.fetchPromotionGroups({ limit: 100 })
        }
        if (!this.collectionDetails.displayCategory) {
          this.collectionDetails.displayCategory = 3
        }
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    // submit form
    handleEditCollection () {
      const self = this
      this.$refs.formConllectionDetails.validate(async (valid) => {
        if (!valid) {
          scrollToTop('.el-form-item__error')
          return false
        }
        this.collectionDetails.status = 1
        if (!this.collectionDetails.targetSn) {
          delete this.collectionDetails.targetSn
        }
        try {
          this.ui.isSubmiting = true
          const formData = Object.keys(this.collectionDetails).reduce((formData, key) => {
            if (key === 'display') {
              formData.append(key, this.collectionDetails[key] === true ? 1 : 0)
            } else {
              formData.append(key, this.collectionDetails[key])
            }
            return formData
          }, new FormData())

          const { data } = await updateCollectionDetails(formData)
          if (data.code === 1 && this.image) {
            await this.uploadFileZip(data.data?.preSignedUrl?.pre_signed, this.image)
          }
          const message = this.$t('page.collection.editSuccess')
          this.$message({
            type: 'success',
            message: message
          })
          if (this.formData.displayRadio === 'hotelSuggestion') {
            this.$router.push({ name: 'selectApplyHotel', params: { sn: this.collectionDetails.sn } })
          } else {
            this.$router.push({ name: 'collection' })
          }
          this.ui.isSubmiting = false
        } catch (error) {
          this.ui.isSubmiting = false
          self.$message({
            type: 'error',
            message: error.response ? error.response.data.error[0].message : error
          })
          return false
        }
      })
    },
    getFullLink () {
      if (this.collectionDetails.slug) {
        this.fullLink = `${process.env.VUE_APP_HOST_WEB_BOOKING}/hotellist/${this.collectionDetails.slug}-1003${this.collectionDetails.sn}`
      } else {
        this.fullLink = `${process.env.VUE_APP_HOST_WEB_BOOKING}/hotellist/1003${this.collectionDetails.sn}`
      }
    },
    hidePopoverCopy () {
      this.contentCopy = this.$t('page.collection.copy')
    },
    handleCopyLink () {
      navigator.clipboard.writeText(this.fullLink)
      this.contentCopy = this.$t('page.collection.copied')
    },
    // set selected for radio
    setRadioValue () {
      let result = ''
      if (this.collectionDetails) {
        if (this.collectionDetails.promotionSuggestion === 1) {
          return 'promotionSuggestion'
        }
        this.ui.checkBoxDisplays.forEach(element => {
          if (this.collectionDetails[element] === 1) {
            result = element
          }
        })
      }
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
.collection-edit {
  &__image {
    img {
      width: 16em;
      height: 100px;
      object-fit: contain;
      border: 1px solid #DCDFE6;
    }
  }
  &--flex {
    display: flex;
    gap: 2em;
    @media (max-width: 640px) {
      display: inline-flex;
    }
  }
  .radio-item {
    width: 150px;
    height: 40px;
    display: inline-flex;
    align-items: center;
  }
  .full-link {
    display: flex;
    align-items: center;

    @media (max-width: 640px) {
      display: unset;
    }
    &__copy {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &__input {
      :deep(.el-input__inner) {
        border-radius: 0;
        border-right: none;
        border-left: none;
      }
      @media (max-width: 640px) {
        width: 54vw;
      }
    }
    &__get {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    :deep(.el-popover) {
      justify-content: center;
      width: auto !important;
      display: flex;
      align-items: center;
      padding: 0 16px;
      min-width: 50px !important;
    }
  }
  &__button {
    z-index: 100;
    display: flex;
    justify-content: flex-end;

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
:deep(.collection-edit) {
  @media (max-width: 640px) {
    .w-100 {
      width: 100%;
    }
    .el-form-item__label {
      width: 100% !important;
    }
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
</style>
