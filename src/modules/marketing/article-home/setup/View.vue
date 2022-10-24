<template>
  <sa-section class="setup">
    <el-form
      label-position="left"
      label-width="15%"
      v-loading="ui.loading"
    >
      <el-form-item
        v-if="Number($route.params.sn) === 1"
        :label="$t('page.article.image')"
        prop="imageFile"
      >
        <div
          v-if="Number($route.params.sn) === 1"
          class="setup__image"
        >
          <img v-if="formData.imagePath && !handleImage.srcImage"
          :src="formatImage(formData.imagePath)">
          <img
            v-if="handleImage.srcImage"
            :src="handleImage.srcImage"
          />
        </div>
        <image-uploader
          :preview="false"
          :className="['fileinput', { 'fileinput--loaded': handleImage.hasImage }]"
          capture="environment"
          :debug="1"
          doNotResize="gif"
          :autoRotate="true"
          outputFormat="verbose"
          @input="setImage"
          style="margin: 5px;"
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
        v-if="Number($route.params.sn) !== 1"
        :label="$t('page.article.title')"
      >
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item
        v-if="Number($route.params.sn) !== 1"
        :label="$t('page.article.display')"
      >
        <el-checkbox v-model="formData.display" border></el-checkbox>
      </el-form-item>
      <el-form-item>
        <div style="width: 100%; text-align: right;">
          <el-button
            type="info"
            @click="$router.go(-1)"
          >
            {{ $t('button.back') }}
          </el-button>
          <el-button
            type="success"
            @click="submitForm"
          >
            {{ $t('button.save') }}
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { updateDisplayType, getDisplayTypeDetail } from './api'
import { uploadFileZip } from '@/api/uploadFileZip'
import ThumbnailDialog from '@/components/globals//thumbnail-dialog'
import ImageUploader from '@/components/globals/ImageUploader.vue'
export default {
  name: 'ArticleSetup',
  components: {
    SaSection,
    ThumbnailDialog,
    ImageUploader
  },
  data: () => {
    return {
      ui: {
        loading: false,
        hashtagLoading: false,
        thumbnailDialogVisible: false
      },
      hashtags: [],
      formData: {
        title: '',
        display: false
      },
      handleImage: {
        hasImage: false,
        image: '',
        fileName: '',
        srcImage: '',
        file: '',
        imageUrl: ''
      }
    }
  },
  created () {
    this.getDisplayTypeDetail()
    // this.fetchHashtags()
  },
  computed: {
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
  methods: {
    setImage (file) {
      this.handleImage.hasImage = true
      this.$refs.thumbnailDialog.setup({ file: file })
      this.ui.thumbnailDialogVisible = true
    },
    resultThumbnail (result) {
      this.handleImage.fileName = result.name
      this.handleImage.image = result
      this.handleImage.srcImage = URL.createObjectURL(result)
    },
    async uploadFileZip (preSigned, filePath) {
      try {
        await uploadFileZip(preSigned, filePath)
        const message = this.$t('page.collection.editSuccess')
        this.$message({
          type: 'success',
          message: message
        })
      } catch (error) {
        return false
      } finally {}
    },
    async getDisplayTypeDetail () {
      try {
        this.ui.loading = true
        const { data } = await getDisplayTypeDetail({ displayTypeSn: this.$route.params.sn })
        this.formData = data.data
        this.formData.display = data.data.display === 1
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    async submitForm () {
      try {
        let formData
        if (Number(this.$route.params.sn) === 1) {
          formData = new FormData()
          formData.append('displayTypeSn', this.formData.sn)
          formData.append('imageFile', this.handleImage.image)
        } else {
          formData = {
            title: this.formData.title,
            hashTagSn: this.formData.hashTagSn,
            display: Number(this.formData.display),
            displayTypeSn: this.formData.sn
          }
        }
        await updateDisplayType(formData)
        this.$message({
          type: 'success',
          message: `${this.$t('message.updateSuccess')}`
        })
        this.$router.push({ name: 'articleHome' })
      } catch (error) {
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.setup:deep {
  .el-dialog {
    @media (max-width: 480px) {
        width: 75% !important;
      }
    }
  &__image {
    border: 1px solid #ccc;
    text-align: center;
    height: 160px;
    width: 350px;
    margin-bottom: 16px;
    @media (max-width: 480px) {
      width: 250px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
