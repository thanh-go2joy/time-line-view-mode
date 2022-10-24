<template>
  <el-form
    ref="categoryForm"
    :model="formData"
    v-loading="ui.loading"
    :rules="rules"
    label-width="12%"
    hide-required-asterisk
    class="category-form"
  >
    <el-form-item
      prop="name"
      :label="$t('page.article.categoryName')"
    >
      <el-input v-model="formData.name"></el-input>
    </el-form-item>
    <el-form-item
      prop="hashTag"
      :label="$t('page.article.hashtag')"
    >
      <el-input v-model="formData.hashTag"></el-input>
    </el-form-item>
    <el-form-item
      :label="$t('page.article.image')"
      prop="imageFile"
    >
      <div
        class="category-form__image"
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
        :loading="ui.submitLoading"
      >
        {{ $t('button.save') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getCategoryDetails, updateCategory } from '../edit/api'
import { uploadFileZip } from '@/api/uploadFileZip'
import ThumbnailDialog from '@/components/globals//thumbnail-dialog'
import ImageUploader from '@/components/globals/ImageUploader.vue'
import { createCategory } from '../create/api'
export default {
  name: 'ArticleCategoryForm',
  components: {
    ThumbnailDialog,
    ImageUploader
  },
  props: {
    page: {
      type: String,
      default: ''
    }
  },
  data: (vm) => {
    return {
      ui: {
        loading: false,
        submitLoading: false,
        thumbnailDialogVisible: false
      },
      srcImage: '',
      formData: {
        name: '',
        hashTag: ''
      },
      handleImage: {
        hasImage: false,
        image: '',
        fileName: '',
        srcImage: '',
        file: '',
        imageUrl: ''
      },
      rules: {
        name: [
          { required: true, message: vm.$t('page.article.requiredCategoryName'), trigger: 'blur' }
        ],
        hashTag: [
          { required: true, message: vm.$t('page.article.requiredHashtag'), trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (this.page === 'edit') {
      this.getCategoryDetails()
    }
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
    async getCategoryDetails () {
      this.ui.loading = true
      try {
        const params = { categorySn: this.$route.params.sn }
        const { data } = await getCategoryDetails(params)
        this.formData = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    submitForm () {
      this.$refs.categoryForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        if (this.page === 'edit') {
          this.updateCategory()
        } else if (this.page === 'create') {
          this.createCategory()
        }
      })
    },
    async createCategory () {
      this.ui.submitLoading = true
      try {
        const formData = new FormData()
        formData.append('imageFile', this.handleImage.image)
        formData.append('name', this.formData.name)
        formData.append('hashTag', this.formData.hashTag)
        await createCategory(formData)
        const message = this.$t('message.createSuccess')
        this.$message({
          type: 'success',
          message: message
        })
        this.$router.push({ name: 'articleCategory' })
      } catch (error) {
        return false
      } finally {
        this.ui.submitLoading = false
      }
    },
    async updateCategory () {
      this.ui.submitLoading = true
      try {
        const formData = new FormData()
        formData.append('imageFile', this.handleImage.image)
        formData.append('name', this.formData.name)
        formData.append('hashTag', this.formData.hashTag)
        await updateCategory(this.$route.params.sn, formData)
        const message = this.$t('message.updateSuccess')
        this.$message({
          type: 'success',
          message: message
        })
        this.$router.push({ name: 'articleCategory' })
      } catch (error) {
        return false
      } finally {
        this.ui.submitLoading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.category-form {
  :deep(.el-form-item__label) {
    text-align: left;
  }
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
  .el-dialog {
    @media (max-width: 480px) {
      width: 75% !important;
    }
  }
  &__image {
    border: 1px solid #ccc;
    text-align: center;
    height: 190px;
    width: 420px;
    margin-bottom: 16px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

}
</style>
