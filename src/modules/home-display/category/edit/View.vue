<template>
  <sa-section v-loading="ui.isLoading" class="category category-details">

    <el-form :model="form" :rules="rules" ref="form">
      <div class="category__form">
        <el-form-item :label="$t('page.dashboard.title1')" prop="title1" required>
          <el-input :placeholder="$t('page.dashboard.title1')" v-model="form.title1" type="text"></el-input>
        </el-form-item>
      </div>

      <div v-if="$route.params.sn == 4" class="category__form">
        <el-form-item :label="$t('page.dashboard.title2')">
          <el-input :placeholder="$t('page.dashboard.title2')" v-model="form.title2" type="text"></el-input>
        </el-form-item>
      </div>

      <div v-if="$route.params.sn == 4" class="category__form">
        <el-form-item :label="$t('page.dashboard.title3')">
          <el-input :placeholder="$t('page.dashboard.title3')" v-model="form.title3" type="text"></el-input>
        </el-form-item>
      </div>

      <div v-if="$route.params.sn == 4" class="category__form">
        <el-form-item :label="$t('page.dashboard.title3')">
          <el-input :placeholder="$t('page.dashboard.title3')" v-model="form.title3" type="text"></el-input>
        </el-form-item>
      </div>

      <div class="category__form">
        <el-form-item :label="$t('page.dashboard.image')">
          <div class="category__row">
              <img :src="srcImage ? srcImage : formatImage(form.imagePath)" />
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
                (1366x286)
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

      <div class="category__form">
        <el-form-item :label="$t('page.dashboard.display')">
          <el-checkbox v-model="form.display" border />
        </el-form-item>
      </div>

      <div v-if="$route.params.sn == 6" class="validation__form">
        <el-form-item :label="$t('page.dashboard.content')">
          <div class="w-100 d-inline-block">
            <Tinymce v-model="form.content" />
          </div>
        </el-form-item>
      </div>

      <div class="category__button">
        <el-button type="info" size="large" @click="$router.go(-1)">
            {{ $t('button.back')}}
        </el-button>
        <el-button type="success" :loading="ui.isSubmiting" size="large" @click="preHandleBeforeSubmit">
            {{ $t('button.save')}}
        </el-button>
      </div>
    </el-form>
  </sa-section>
</template>
<script>
import { getHomeCategoryDetails, updateHomeCategory } from './api'
import SaSection from '@/components/globals/SaSection.vue'
import Tinymce from '@/components/globals/Tinymce'
import ThumbnailDialog from '@/components/globals/thumbnail-dialog'
import { uploadFileZip } from '@/api/uploadFileZip'
import ImageUploader from '@/components/globals/ImageUploader.vue'
import { scrollToTop } from '@/utils/helpers'

export default {
  name: 'CategoryEdit',
  components: {
    SaSection,
    Tinymce,
    ThumbnailDialog,
    ImageUploader
  },
  data: (vm) => {
    return {
      ui: {
        isLoading: false,
        isSubmiting: false,
        thumbnailDialogVisible: false
      },
      form: {},
      hasImage: false,
      image: '',
      srcImage: '',
      fileName: '',
      rules: {
        title1: [
          { required: true, message: vm.$t('validation.required'), trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getHomeCategoryDetails()
  },
  computed: {
    setRatioThumbnail () {
      return {
        width: 683, // 1366
        height: 143 // 286
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
      this.fileName = result.name
      this.image = result
      this.srcImage = URL.createObjectURL(result)
    },
    async uploadFileZip (preSigned, filePath) {
      try {
        await uploadFileZip(preSigned, filePath)
      } catch (error) {
        return false
      } finally {
        this.$message({
          type: 'success',
          message: `${this.$t('page.dashboard.editSuccess')}`
        })
        this.$router.push('/hotel/sadmin/dashboard')
      }
    },

    async getHomeCategoryDetails () {
      this.ui.isLoading = true
      if (!this.$route.params.sn) {
        return false
      }
      try {
        const { data } = await getHomeCategoryDetails(this.$route.params.sn)
        this.form = data.data
        this.form.display = this.form.display === 1
      } catch {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    preHandleBeforeSubmit () {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          scrollToTop('.el-form-item__error')
          return false
        }
        this.onSubmit()
      })
    },
    async onSubmit () {
      this.ui.isSubmiting = true
      try {
        const formData = {
          ...this.form
        }
        formData.display = Number(formData.display)
        formData.fileName = this.fileName
        const { data } = await updateHomeCategory(formData)

        if (data.code === 1 && this.image) {
          await this.uploadFileZip(data.data?.preSignedUrl?.pre_signed, this.image)
        }
      } catch {
        return false
      } finally {
        this.ui.isSubmiting = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.w-100 {
    width: 100%;
}
.d-inline-block {
  display: inline-block;
}
:deep(.validation__form) {
  .el-form-item__label {
    width: unset !important;
  }
  .el-form-item__content {
    margin-left: unset !important
  }
  @media (min-width: 640px) {
    .el-form-item__content{
      margin-left: 25.5% !important
    }
  }
}
.category {
  :deep(.category__form) {
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
      z-index: 100;
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
</style>
