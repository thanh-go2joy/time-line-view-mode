<template>
<sa-section>
    <div class="facility-create-segment" v-loading="ui.isLoadingFacilityCreate">
      <!-- Start Contentbar-->
      <el-form ref="dataCreatelFacility" :model="dataCreatelFacility" :rules="rules" label-position="left" label-width="25%" class="facility-create-segment__form">
          <el-form-item :label="$t('page.facilityAdd.facility_name_vn')" prop="name">
              <el-input :placeholder="$t('page.facilityAdd.facility_name_vn')" v-model="dataCreatelFacility.name" />
          </el-form-item>
          <el-form-item :label="$t('page.facilityAdd.facility_name_en')" prop="nameEn">
              <el-input :placeholder="$t('page.facilityAdd.facility_name_en')" v-model="dataCreatelFacility.nameEn" />
          </el-form-item>
          <el-form-item :label="$t('page.facilityAdd.image')" prop="srcImage">
            <el-input  style="display:none" v-model="formData.srcImage" ></el-input>

          </el-form-item>
          <img
                    v-if="image"
                    :src="image"
                    v-show="false"
                  />
          <el-form-item >
              <div class="facility-create-segment__form--image">

                  <div class="image-upload">
                    <img
                    v-if="dataCreatelFacility.srcImage"
                    :src="dataCreatelFacility.srcImage"
                  />
                  </div>
                  <image-uploader
                    :preview="false"
                    :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                    capture="environment"
                    :debug="1"
                    doNotResize="gif"
                    style="margin: 20px;"
                    :autoRotate="true"
                    outputFormat="verbose"
                    @input="setImage"
                  >
                    <label for="fileInput" slot="upload-label">
                      <i v-show="formData.displayType === 9">(690x1000)</i>
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
          <el-form-item style="text-align: right;">
              <el-button type="info" size="large" @click="$router.go(-1)">
                  {{$t('button.back')}}
              </el-button>
              <el-button type="success" size="large" @click="checkValidate('dataCreatelFacility')">
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
  createFacility
} from './api'
import SaSection from '@/components/globals/SaSection'
import ThumbnailDialog from '@/components/globals//thumbnail-dialog'
import ImageUploader from '@/components/globals/ImageUploader.vue'
import { uploadFileZip } from '@/api/uploadFileZip'
export default {
  name: 'CreateFacility',
  components: {
    SaSection,
    ThumbnailDialog,
    ImageUploader
  },
  data: (vm) => {
    return {
      hasImage: false,
      image: '',
      ui: {
        isLoadingFacilityCreate: true,
        loading: false,
        thumbnailDialogVisible: false,
        isSubmiting: false
      },
      dataCreatelFacility: {
        name: '',
        nameEn: '',
        srcImage: ''
      },
      file: '',
      rules: {
        name: [{ required: true, message: vm.$t('page.facilityAdd.requiredName'), trigger: 'blur' }],
        nameEn: [{ required: true, message: vm.$t('page.facilityAdd.requiredNameEn'), trigger: 'blur' }],
        srcImage: [{ required: true, message: vm.$t('page.facilityAdd.requiredImage'), trigger: 'blur' }]

      },
      formData: {},
      setRatioThumbnail () {
        switch (this.formData.displayType) {
          case 9:
            return {
              width: 345 * 2,
              height: 500 * 2
            }
          case 10:
            return {
              width: 135 * 2,
              height: 100 * 2
            }
          case 11:
            return {
              width: 285 * 2,
              height: 300 * 2
            }
          default:
            return {
              width: 228 * 2,
              height: 182 * 2
            }
        }
      },
      dataRes: {}
    }
  },
  created () {
    this.ui.isLoadingFacilityCreate = false
  },
  methods: {
    setImage (file) {
      this.hasImage = true
      this.$refs.thumbnailDialog.setup({ file: file })
      this.ui.thumbnailDialogVisible = true
    },

    resultThumbnail (result) {
      this.formData.fileName = result.name
      this.file = result
      this.image = result
      this.formData.srcImage = URL.createObjectURL(result)
      this.dataCreatelFacility.srcImage = URL.createObjectURL(result)
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

    checkValidate (dataCreatelFacility) {
      this.$refs[dataCreatelFacility].validate((valid) => {
        if (valid) {
          this.createFacility()
        } else {
          return false
        }
      })
    },

    async createFacility () {
      this.ui.isLoadingFacilityCreate = true
      const formData = new FormData()
      console.log('this.file :>> ', this.file)
      if (this.dataCreatelFacility.srcImage) {
        formData.append('image', this.file)
      }
      formData.append('name', this.dataCreatelFacility.name)
      formData.append('nameEn', this.dataCreatelFacility.nameEn)
      formData.append('status', 1)

      try {
        const { data } = await createFacility(formData)
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
        this.ui.isLoadingFacilityCreate = false
      }
    }, // createFacility

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
.facility-create-segment:deep {
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
  .facility-create-segment__form--image {
    @media (max-width: 480px) {
      display: revert !important;
    }
  }
}
.facility-create-segment {
    min-height: calc(100vh - 220px);
    background-color: #ffffff;
    @media (max-width: 480px) {
      min-height: calc(100vh - 120px) !important;
    }
    &__form {
        &--image {
            display: grid;
            grid-template-columns: 1fr 2fr;
            .image-upload{
              border: 1px dashed #d9d9d9;
              width:200px;
              height: 200px;
              margin: 20px;
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
