<template>
<sa-section>
    <div class="product-type-edit-segment"  v-loading="isLoading">
      <!-- Start Contentbar-->
      <el-form
      ref="dataForm"
      :model="dataDetailProductType"
      :rules="rules"
      label-position="left"
      label-width="25%"
      class="product-type-edit-segment__form">
          <el-form-item :label="$t('page.productTypeAdd.product_type_name')" prop="name">
              <ElInput :placeholder="$t('page.productTypeAdd.product_type_name')" v-model="dataDetailProductType.name" />
          </el-form-item>
          <el-form-item :label="$t('page.productTypeAdd.product_type_nameEn')">
              <el-input :placeholder="$t('page.productTypeAdd.product_type_nameEn')" v-model="dataDetailProductType.nameEn" />
          </el-form-item>
          <el-form-item :label="$t('page.productTypeAdd.image')" prop="imagePath">
              <div class="product-type-edit-segment__form--image">
                  <div class="image">
                      <img
                        v-if="dataDetailProductType.imagePath && !handleImage.srcImage"
                        :src="formatImage(dataDetailProductType.imagePath)"
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
          <el-form-item  prop="imagePath">
              <el-input  style="display:none" v-model="dataDetailProductType.imagePath" ></el-input>
          </el-form-item>
          <el-form-item class="btn-action">
              <el-button type="info" size="large" @click="$router.go(-1)">
                  {{$t('button.back')}}
              </el-button>
              <el-button type="success" size="large" @click="editProductType()">
                  <i class="feather icon-save mr-2" />
                  {{$t('button.edit')}}
              </el-button>
          </el-form-item>
      </el-form>
      <!-- Etart Contentbar-->
    </div>
</sa-section>
</template>

<script>
import { getProductTypeDetail, updateProductTypeDetail } from './api'
import SaSection from '@/components/globals/SaSection.vue'
// import UploadFile from '@/components/globals/UploadFile'
import { uploadFileZip } from '@/api/uploadFileZip'
import ThumbnailDialog from '@/components/globals//thumbnail-dialog'
import ImageUploader from '@/components/globals/ImageUploader.vue'
export default {
  name: 'EditProduct',
  components: {
    SaSection,
    ThumbnailDialog,
    ImageUploader
    // UploadFile
  },
  data: (vm) => {
    return {
      isLoading: true,
      dataDetailProductType: {
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
        name: [{ required: true, message: vm.$t('page.productTypeEdit.requiredName'), trigger: 'blur' }],
        imagePath: [{ required: true, message: vm.$t('page.productTypeEdit.image'), trigger: 'blur' }]
      }
    }
  },
  async created () {
    await this.getDataProductDetail()
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
      this.dataDetailProductType.imagePath = URL.createObjectURL(result)
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
    async getDataProductDetail () {
      const id = this.$route.params.id
      this.isLoading = true
      try {
        const { data } = await getProductTypeDetail(id)
        this.dataDetailProductType = data.data
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    }, // getDataHotelStaffDetail

    async editProductType () {
      this.$refs.dataForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        try {
          this.isLoading = true
          const id = this.$route.params.id
          const formData = new FormData()
          if (this.handleImage.image) {
            formData.append('image', this.handleImage.image)
          }
          formData.append('name', this.dataDetailProductType.name)
          formData.append('nameEn', this.dataDetailProductType.nameEn)

          const { data } = await updateProductTypeDetail(id, formData)
          if (data.code === 1) {
            this.$message({
              type: 'success',
              message: `${this.$t('message.updateSuccess')}`
            })
            this.$router.go(-1)
          }
        } catch (error) {
          return false
        } finally {
          this.isLoading = false
        }
      })
    } // updateProductType
  }
}
</script>

<style lang="scss" scoped>
.product-type-edit-segment:deep {
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
  .product-type-edit-segment__form--image {
    @media (max-width: 480px) {
      display: revert !important;
      padding-top: 45px;
    }
  }
  .btn-action {
    text-align: right;
    @media (max-width: 480px) {
      float: right;
      width: 170px;
    }
  }
}
.product-type-edit-segment {
    min-height: calc(100vh - 220px);
    background-color: #ffffff;
    &__form {
        &--image {
            display: grid;
            grid-template-columns: 1fr 2fr;
            height: 150px;

            .image {
                width: 200px;
                border: 1px solid rgba(0, 0, 0, .125);
                height: 150px;

                img {
                    width: 100%;
                    object-fit: cover;
                    height: 100%;
                    border-style: none;
                }
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
