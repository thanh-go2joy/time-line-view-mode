<template>
<sa-section >
    <div class="product-type-create-segment" v-loading="isLoading">
        <!-- Start Contentbar-->
        <el-form ref="dataCreatelProductType" :model="dataCreatelProductType" :rules="rules" label-position="left" label-width="25%" class="product-type-create-segment__form">
            <el-form-item :label="$t('page.productTypeAdd.product_type_name')" prop="name">
                <el-input :placeholder="$t('page.productTypeAdd.product_type_name')" v-model="dataCreatelProductType.name" />
            </el-form-item>
            <el-form-item :label="$t('page.productTypeAdd.product_type_nameEn')" prop="nameEn">
                <el-input :placeholder="$t('page.productTypeAdd.product_type_nameEn')" v-model="dataCreatelProductType.nameEn" />
            </el-form-item>
            <el-form-item :label="$t('page.productTypeAdd.image')" prop="srcImage">
                <div class="product-type-create-segment__form--image">
                    <div class="image-upload">
                      <img
                        v-if="dataCreatelProductType.imagePath && !handleImage.srcImage"
                        :src="formatImage(dataCreatelProductType.imagePath)"
                      />
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
                    class="choose-file"
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
            <el-form-item class="btn-action" >
                <el-button type="info" size="large" @click="$router.go(-1)">
                    {{$t('button.back')}}
                </el-button>
                <el-button type="success" size="large" @click="checkValidate('dataCreatelProductType')">
                    <i class="feather icon-save mr-2" />
                    {{$t('button.create')}}
                </el-button>
            </el-form-item>
        </el-form>
        <!-- Etart Contentbar-->
    </div>
</sa-section>
</template>

<script>
import {
  createProductType
} from './api'
import SaSection from '@/components/globals/SaSection.vue'
import { uploadFileZip } from '@/api/uploadFileZip'
import ThumbnailDialog from '@/components/globals//thumbnail-dialog'
import ImageUploader from '@/components/globals/ImageUploader.vue'
export default {
  name: 'CreateProductType',
  components: {
    SaSection,
    ThumbnailDialog,
    ImageUploader
  },
  data: (vm) => {
    return {
      isLoading: true,
      dataCreatelProductType: {
        name: '',
        nameEn: '',
        srcImage: ''
      },
      ui: {
        thumbnailDialogVisible: false
      },

      handleImage: {
        hasImage: false,
        image: '',
        fileName: '',
        srcImage: '',
        file: '',
        imageUrl: ''
      },
      formData: {
      },
      rules: {
        name: [{ required: true, pattern: '[a-zA-Z0-9]+', message: vm.$t('page.productTypeAdd.requiredName'), trigger: 'blur' }],
        srcImage: [{ required: true, message: vm.$t('page.productTypeAdd.requiredImage'), trigger: 'blur' }]

      },
      dataRes: {}
    }
  },
  created () {
    this.isLoading = false
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
      this.dataCreatelProductType.srcImage = URL.createObjectURL(result)
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
    checkValidate (dataCreatelProductType) {
      this.$refs[dataCreatelProductType].validate((valid) => {
        if (valid) {
          this.createProductType()
        } else {
          return false
        }
      })
    },
    async createProductType () {
      this.isLoading = true

      const formData = new FormData()
      if (this.handleImage.image) {
        formData.append('image', this.handleImage.image)
      }
      formData.append('name', this.dataCreatelProductType.name)
      formData.append('nameEn', this.dataCreatelProductType.nameEn)

      try {
        const { data } = await createProductType(formData)
        this.dataRes = data
        if (data.code === 1) {
          this.$message({
            type: 'success',
            message: `${this.$t('message.createSuccess')}`
          })
          this.$router.go(-1)
        }
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    }, // createProductType

    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!')
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style lang="scss" scoped>
.product-type-create-segment:deep {
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
  .product-type-create-segment__form--image {
    @media (max-width: 480px) {
      display: revert !important;
      padding-top: 45px;
    }
  }
  .btn-action {
    text-align: right;
    @media (max-width: 480px) {
      float: right;
      width: 190px;
    }
  }
}
.product-type-create-segment {
    min-height: calc(100vh - 220px);
    background-color: #ffffff;
    @media (max-width: 480px) {
      min-height: calc(100vh - 120px) !important;
    }
    &__form {
        &--image {
            display: grid;
            grid-template-columns: 1fr 2fr;
            height: 150px;

            .image-upload{
              border: 1px dashed #d9d9d9;
              width:200px;
              height: 200px;

              img {
                width: 100%;
                height: 100%;
              }
            }
        .choose-file {
              @media (max-width: 480px) {
                margin-top: 25px !important;
              }
            }
        }
        .el-button {
          @media (max-width: 480px) {
            margin-top: 90px;
          }
        }
    }

    &__button {
        padding: 15px;

        &--content {
            display: flex;
            justify-content: flex-end;
        }
    }

    .style-color-red {
        color: red;
    }
}
</style>
