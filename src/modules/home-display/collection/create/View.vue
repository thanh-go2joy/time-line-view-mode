<template>
  <sa-section class="collection-create">
    <el-form
      ref="formConllectionDetails"
      v-loading="ui.loading"
      :model="formData"
      :rules="rules"
      label-position="left"
      label-width="20%"
      class="collection-create__form"
      hide-required-asterisk
    >
      <el-form-item
        :label="$t('page.collection.choose_display_in_app_web')"
      >
        <el-radio v-model="formData.type" :label="1" @change="onChangeType">App</el-radio>
        <el-radio v-model="formData.type" :label="2" @change="onChangeType">Website</el-radio>
      </el-form-item>

      <el-form-item
        :label="$t('page.collection.title')"
        prop="title"
      >
        <ElInput :placeholder="$t('page.collection.title1')" v-model="formData.title" />
      </el-form-item>

      <el-form-item
        :label="$t('page.collection.description')"
      >
        <ElInput :placeholder="$t('page.collection.description')" v-model="formData.description" />
      </el-form-item>

      <el-form-item
        :label="$t('page.collection.display')"
        class="is-required is-no-asterisk"
      >

        <div class="collection-create--flex">
          <ElCheckbox
            v-model="formData.display"
            border
            :true-label="1" :false-label="0"
          />
          <el-form-item
            prop="displayType"
          >
            <el-select
              class="w-100"
              v-model="formData.displayType"
            >
              <ElOption
                v-for="(item, index) in displayTypeOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
                :disabled="formData.type == 1 ? item.disabledApp : item.disabledWeb"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="formData.displayType === 9"
            :prop="formData.displayType === 9 ? 'displayCategory' : ''"
          >
            <el-select
              v-if="formData.displayType === 9"
              v-model="formData.displayCategory"
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
          </el-form-item>
        </div>
      </el-form-item>

      <el-form-item
      v-if="formData.displayType === 10"
        :label="$t('page.collection.subTitle')"
        prop="subTitle" required
      >
        <ElInput :placeholder="$t('page.collection.subTitle')" v-model="formData.subTitle" />
      </el-form-item>

      <el-form-item
        v-if="formData.displayType === 2 || formData.displayType === 4 || formData.displayType === 9 || formData.displayType === 10 || formData.displayType === 11"
        :label="$t(`page.collection.${formData.displayType == 9 ? 'icon' : 'image'}`)"
      >
        <div
          class="collection-create__image"
        >
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
              <i v-show="formData.displayType === 9">(1000x690)</i>
              <i v-show="formData.displayType === 10">(270x200)</i>
              <i v-show="formData.displayType === 11">(570x600)</i>
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
      <el-form-item
        :label="$t('page.collection.hotelList')"
        prop="displayRadio"
      >
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
            v-if="formData.displayType === 1 || formData.displayType === 3 || formData.displayType === 5 || formData.displayType === 6 || formData.displayType === 7 || formData.displayType === 8"
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
          v-model="formData.targetSn"
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
          v-model="formData.displayProvince"
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
          v-model="formData.slug"
          placeholder="Slug"
        >
        </el-input>
      </el-form-item>
      <div class="collection-create__button">
        <el-button type="info" size="large" @click="$router.go(-1)">
            {{$t('button.back')}}
        </el-button>
        <el-button type="success" :loading="ui.isSubmiting" size="large" @click="handleCreateCollection">
            {{$t('button.create')}}
        </el-button>
      </div>
    </el-form>
  </sa-section>
</template>
<script>
import { addCollection } from './api'
import { fetchPromotionGroups } from '@/api/promotion'
import { fetchProvinces } from '@/api/province'
import { uploadFileZip } from '@/api/uploadFileZip'
import { debounce, scrollToTop } from '@/utils/helpers'
import SaSection from '@/components/globals/SaSection.vue'
import ThumbnailDialog from '@/components/globals//thumbnail-dialog'
import ImageUploader from '@/components/globals/ImageUploader.vue'
// declare const
const timeDebounce = 500
export default {
  name: 'CollectionCreate',
  components: {
    SaSection,
    ThumbnailDialog,
    ImageUploader
  },
  data: (vm) => {
    return {
      // data fetch APIs.
      listProvinces: [],
      listPromotionGroups: [],
      // form input
      formData: {
        subTitle: '',
        type: 1,
        displayRadio: '',
        srcImage: '',
        title: '',
        displayType: 1,
        display: 1,
        flashSale: '',
        promotion: '',
        directDiscount: '',
        amenityPackHotel: '',
        loveHotel: '',
        travelHotel: '',
        hotHotel: '',
        newHotel: '',
        stamp: '',
        image36: '',
        hotelReview: '',
        hotelSearched: '',
        hotelBooked: '',
        hotelFavorite: '',
        hotelSuggestion: '',
        promotionSuggestion: '',
        g2jCertified: '',
        isTet: '',
        quarantine: '',
        displayProvince: '',
        displayCategory: '',
        status: '',
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
          'isTet',
          'hotelSuggestion',
          'quarantine'
        ],
        loadingPromotion: false,
        loadingProvinces: false,
        loading: false,
        thumbnailDialogVisible: false,
        isSubmiting: false
      },
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
      switch (this.formData.displayType) {
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
  watch: {
    // Example: selected = hotHotel and user change to hotelBooked => oldValue = 'hotelBooked' and newValue = 'hotelBooked'
    'formData.displayRadio': function (newValue, oldValue) {
      if (oldValue) {
        // this.collectionDetails.hotHotel = 0
        this.formData[oldValue] = 0
      }
      // this.formData.hotelBooked = 1x`
      this.formData[newValue] = 1
      // user select promotionSuggestion and not fetch (fetchProvinces + fetchPromotionGroups) yet.
      if (this.listProvinces.length === 0 && newValue === 'promotionSuggestion') {
        this.fetchProvinces()
      }
      if (this.listPromotionGroups.length === 0 && newValue === 'promotionSuggestion') {
        this.fetchPromotionGroups({ limit: 100, keyword: '' })
      }
    },
    'formData.displayType': function () {
      this.formData.displayCategory = 1
    }
  },
  methods: {
    setImage (file) {
      this.hasImage = true
      this.$refs.thumbnailDialog.setup({ file: file })
      this.ui.thumbnailDialogVisible = true
    },
    resultThumbnail (result) {
      this.formData.fileName = result.name
      this.image = result
      this.formData.srcImage = URL.createObjectURL(result)
    },

    async uploadFileZip (preSigned, filePath) {
      try {
        await uploadFileZip(preSigned, filePath)
        const message = this.$t('page.collection.editSuccess')
        this.$message({
          type: 'success',
          message: message
        })
        this.$router.push({ name: 'collection' })
      } catch (error) {
        return false
      } finally {}
    },

    onChangeType (val) {
      if (val === 2) {
        this.formData.displayType = 10
      } else {
        this.formData.displayType = 1
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
    // submit form
    handleCreateCollection () {
      const self = this
      this.$refs.formConllectionDetails.validate(async (valid) => {
        if (!valid) {
          scrollToTop('.el-form-item__error')
          return false
        }
        this.formData.status = 1
        if (!this.formData.targetSn) {
          delete this.formData.targetSn
        }
        try {
          this.ui.isSubmiting = true
          // append from object to FormData()
          const formData = Object.keys(this.formData).reduce((formData, key) => {
            formData.append(key, this.formData[key])
            return formData
          }, new FormData())

          const { data } = await addCollection(formData)
          if (data.code === 1 && this.image) {
            await this.uploadFileZip(data.data?.preSignedUrl?.pre_signed, this.image)
          } else {
            this.$router.push({ name: 'collection' })
          }
          this.ui.isSubmiting = false
        } catch (error) {
          this.ui.isSubmiting = false
          self.$message({
            type: 'error',
            message: error.response ? error.response.data.message[0].message : error
          })
          return false
        }
      })
    },
    // set selected for radio
    setRadioValue () {
      let result = ''
      if (this.formData) {
        if (this.formData.promotionSuggestion === 1) {
          return 'promotionSuggestion'
        }
        this.ui.checkBoxDisplays.forEach(element => {
          if (this.formData[element] === 1) {
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
.collection-create {
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

:deep(.collection-create) {
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
