<template>
  <el-form
    ref="articleForm"
    v-loading="ui.loading"
    :model="formData"
    :rules="rules"
    label-width="12%"
    class="article-form"
    hide-required-asterisk
  >
    <el-form-item
      prop="title"
      :label="$t('page.article.title')"
    >
      <el-input
        v-model="formData.title"
        :placeholder="$t('page.article.title')"
        class="article-form__title"
        @input="setSlug"
      >
      </el-input>
    </el-form-item>
    <el-form-item
      prop="slug"
      label="Slug"
    >
      <el-input
        v-model="formData.slug"
        placeholder="Slug"
      >
      </el-input>
    </el-form-item>
    <el-form-item
      prop="srcImage"
      :label="$t('page.article.image')"
    >
      <div class="article-form__image">
        <el-input
          v-model="formData.imagePath"
          style="display: none;"
        >
        </el-input>
        <div class="article-form__image--wrapper">
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
      </div>
    </el-form-item>
    <el-form-item
      prop="subContent"
      :label="$t('page.article.summary')"
    >
      <el-input
        v-model="formData.subContent"
        :placeholder="$t('page.article.summary')"
        type="textarea"
      >
      </el-input>
    </el-form-item>
    <el-form-item
      prop="keyword"
      :label="$t('page.article.keyword')"
    >
      <el-select
        v-model="formData.keyword"
        multiple
        filterable
        allow-create
        default-first-option
        style="width: 100%;"
      >
        <!-- <el-option></el-option> -->
      </el-select>
    </el-form-item>
    <el-form-item
      prop="author"
      :label="$t('page.article.author')"
    >
      <el-input
        v-model="formData.author"
        :placeholder="$t('page.article.author')"
      >
      </el-input>
    </el-form-item>
    <el-form-item
      prop="categorySn"
      :label="$t('page.article.category')"
    >
      <el-select
        v-model="formData.categorySn"
        :placeholder="$t('page.article.category')"
      >
        <el-option
          v-for="(item, index) in categories"
          :key="index"
          :label="item.name"
          :value="item.sn"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      prop="schedulePosting"
      :label="$t('page.article.schedulePosting')"
    >
      <el-date-picker
        v-model="formData.schedulePosting"
        type="datetime"
        format="yyyy-MM-dd HH:mm"
        value-format="yyyy-MM-dd HH:mm">
      </el-date-picker>
    </el-form-item>
    <el-form-item
      :label="$t('page.article.display')"
    >
      <el-checkbox
        v-model="formData.display"
        @change="changeDisplay"
      />
    </el-form-item>
    <el-form-item
      prop="schema"
      :label="$t('page.article.schema')"
    >
      <el-input
        v-model="formData.schema"
        type="textarea"
        rows="5"
        :placeholder="$t('page.article.schema')"
      >
      </el-input>
    </el-form-item>
    <el-form-item
      prop="content"
      :label="$t('page.article.content')"
    >
       <el-input
        v-model="formData.content"
        style="display: none;"
      />
      <Tinymce
        v-model="formData.content"
        :height="650"
      />
    </el-form-item>
    <el-form-item>
      <div style="display: flex; justify-content: end;">
        <el-button
          type="success"
          @click="submitForm"
        >
          {{ $t('button.save') }}
        </el-button>
        <el-button
          type="info"
          @click="$router.go(-1)"
        >
          {{ $t('button.back') }}
        </el-button>
      </div>
    </el-form-item>
  </el-form>
</template>
<script>
import Tinymce from '@/components/globals/Tinymce/index.vue'
import { uploadFileZip } from '@/api/uploadFileZip'
import ThumbnailDialog from '@/components/globals//thumbnail-dialog'
import ImageUploader from '@/components/globals/ImageUploader.vue'
import { updateArticle, fetchCategories, createArticle } from '../api'
export default {
  name: 'ArticleForm',
  components: {
    ThumbnailDialog,
    ImageUploader,
    Tinymce
  },
  props: {
    article: {
      type: Object,
      default: () => {}
    },
    action: {
      type: String,
      default: '',
      validator: (value) => (['edit', 'create'].indexOf(value) !== -1)
    }
  },
  created () {
    this.fetchCategories()
  },
  data: (vm) => {
    return {
      ui: {
        loading: false,
        loadingCategory: false,
        thumbnailDialogVisible: false
      },
      imageSrc: '',
      formData: {
        title: '',
        slug: '',
        imagePath: '',
        author: '',
        categorySn: '',
        content: '',
        subContent: '',
        keyword: [],
        schema: '',
        // schedulePosting: '',
        display: false
      },
      handleImage: {
        hasImage: false,
        image: '',
        fileName: '',
        srcImage: '',
        file: '',
        imageUrl: ''
      },
      categories: [],
      // validate
      rules: {
        title: [
          { required: true, message: vm.$t('page.article.requiredTitle'), trigger: 'blur' }
        ],
        slug: [
          { required: true, message: vm.$t('page.article.requiredSlug'), trigger: ['blur', 'change'] }
        ],
        author: [
          { required: true, message: vm.$t('page.article.requiredAuthor'), trigger: 'blur' }
        ],
        categorySn: [
          { required: true, message: vm.$t('page.article.requiredCategory'), trigger: 'change' }
        ],
        imagePath: [
          { required: true, message: vm.$t('page.article.requiredImage'), trigger: ['blur', 'change'] }
        ],
        content: [
          { required: true, message: vm.$t('page.article.requiredContent'), trigger: ['blur', 'change'] }
        ],
        subContent: [
          { required: true, message: vm.$t('page.article.requiredSummary'), trigger: 'blur' }
        ]
      }
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
  watch: {
    article () {
      if (!this.article) {
        return false
      }
      this.formData = {
        ...this.article
      }
      if (!this.article.schedulePosting) {
        this.formData.schedulePosting = ''
      }
      this.formData.imagePath = this.formatImage(this.formData.imagePath)
      this.formData.display = this.article.display === 1
    }

  },
  methods: {
    setSlug (value) {
      this.formData.slug = this.sanitizeTitle(value)
    },
    sanitizeTitle (title) {
      let slug = ''
      // Change to lower case
      const titleLower = title.toLowerCase()
      // Letter "e"
      slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e')
      // Letter "a"
      slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a')
      // Letter "o"
      slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o')
      // Letter "u"
      slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u')
      // Letter "d"
      slug = slug.replace(/đ/gi, 'd')
      // Trim the last whitespace
      slug = slug.replace(/\s*$/g, '')
      // Change whitespace to "-"
      slug = slug.replace(/\s+/g, '-')

      return slug
    },
    async fetchCategories () {
      this.ui.loadingCategory = true
      try {
        const { data } = await fetchCategories()
        this.categories = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loadingCategory = false
      }
    },
    changeDisplay () {
      if (this.formData.schedulePosting && this.formData.display) {
        this.formData.schedulePosting = this.formatDate(new Date())
      }
    },
    setImage (file) {
      this.handleImage.hasImage = true
      this.$refs.thumbnailDialog.setup({ file: file })
      this.ui.thumbnailDialogVisible = true
    },
    resultThumbnail (result) {
      this.handleImage.fileName = result.name
      this.handleImage.image = result
      this.handleImage.srcImage = URL.createObjectURL(result)
      this.formData.imagePath = result
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
    submitForm () {
      this.$refs.articleForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        this.ui.loading = true
        try {
          this.formData.schedulePosting = this.formatDate(this.formData.schedulePosting)
          const formData = Object.keys(this.formData).reduce((formData, key) => {
            if (key === 'keyword') {
              if (!this.formData.keyword || this.formData.keyword.length === 0) {
                formData.append('keyword[]', '')
              } else {
                this.formData.keyword.forEach(val => {
                  formData.append(`${key}[]`, val)
                })
              }
            } else if (this.imageSrc && key === 'imagePath') {
              formData.append('image', this.handleImage.image)
            } else if (key === 'display') {
              formData.append(key, Number(this.formData[key]))
            } else if (key === 'schema' && !this.formData[key]) {
              formData.append(key, '')
            } else {
              formData.append(key, this.formData[key])
            }
            return formData
          }, new FormData())
          let message = ''
          if (this.action === 'edit') {
            await updateArticle(this.formData.sn, formData)
            message = this.$t('message.updateSuccess')
          } else if (this.action === 'create') {
            await createArticle(formData)
            message = this.$t('message.createSuccess')
          }
          this.$message({
            type: 'success',
            message: message
          })
          this.$router.push({ name: 'article' })
        } catch (error) {
          return false
        } finally {
          this.ui.loading = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.article-form:deep {
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
  .el-dialog {
    @media (max-width: 480px) {
      width: 75% !important;
    }
  }

}
.article-form {
  :deep(.el-form-item__label) {
    text-align: left;
  }
  &__title.el-input {
    font-size: 30px;
    font-weight: 600;
    :deep(.el-input__inner) {
      text-align: center;
      height: 60px;
    }
  }
  &__image {
    text-align: center;
    &--wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      img {
        width: 200px;
        height: 150px;
        object-fit: contain;
      }
    }
  }
}
</style>
