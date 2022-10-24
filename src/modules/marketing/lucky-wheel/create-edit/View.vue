<template>
  <sa-section>
    <el-form
      label-width="250px"
      :model="formData"
      ref="luckyWheelForm"
      hide-required-asterisk
      label-position="left"
      class="form"
      v-loading="ui.loadingDetails"
    >
      <el-form-item
        prop="coupon"
        :label="$t('page.lucky-wheel.coupon')"
      >
        <el-select
          v-model="formData.couponSn"
          filterable
          clearable
          remote
          :loading="ui.couponLoading"
          :remote-method="searchSuggestionsCoupon"
        >
          <el-option
              v-for="(item, index) in coupons"
              :key="index"
              :label="$t(item.title)"
              :value="item.sn"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        prop="content"
        :label="$t('page.lucky-wheel.content')"
      >
        <el-input
          v-model="formData.text"
        />
      </el-form-item>
      <el-form-item
        prop="images"
        :label="$t('page.lucky-wheel.images')"
      >
          <img
            style="width: 100px; height: 100px"
            :src="srcImage"
            class="image"
          >
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
              <i v-show="formData.displayType === 9">(690x1000)</i>
              <i v-show="formData.displayType === 10">(270x200)</i>
              <i v-show="formData.displayType === 11">(570x600)</i>
            </label>
          </image-uploader>
          <thumbnail-dialog
            :width="setRatioThumbnail.width"
            :height="setRatioThumbnail.height"
            ref="thumbnailDialog"
            :visible="ui.thumbnailDialogVisible"
            @result="resultThumbnail"
            @close="ui.thumbnailDialogVisible = false"
          />
      </el-form-item>
      <el-form-item
        prop="listCouponOneDayOrigin"
        :label="$t('page.lucky-wheel.listCouponOneDayOrigin')"
      >
        <el-input-number
          v-model="formData.limitCouponOneDayOrigin"
          :min="0"
          type="number"
        />
      </el-form-item>
      <el-form-item
        prop="percentOrigin"
        :label="$t('page.lucky-wheel.percentOrigin')"
      >
        <el-input-number
          :min="1"
          :max="100"
          v-model="formData.percentOrigin"
        />
      </el-form-item>
      <el-form-item
        prop="display"
        :label="$t('page.lucky-wheel.display')"
      >
        <el-checkbox
          v-model="formData.status"
          :true-label="1"
          :false-label="0"
        />
      </el-form-item>
      <el-form-item style="float: right">
        <el-button
         @click="$router.push({name: 'luckyWheel'})"
        >
          {{ $t('button.back') }}
        </el-button>
        <el-button
          type="success"
          @click="onSubmit"
        >
          {{ $t(`button.${isCreate}`) }}
        </el-button>
      </el-form-item>
    </el-form>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import ImageUploader from '@/components/globals/ImageUploader.vue'
import ThumbnailDialog from '@/components/globals//thumbnail-dialog'
import { uploadFileZip } from '@/api/uploadFileZip'
import { fetchLuckyWheelDetail, fetchCoupon, createLuckyWheelDetail, editLuckyWheelDetail } from './api'
import { debounce } from '@/utils/helpers'
import { repStatus } from '@/utils/const'

const timeDebounce = 500
export default {
  name: 'lucyWeelCreateEdit',
  components: {
    SaSection,
    ImageUploader,
    ThumbnailDialog
  },
  data () {
    return {
      formData: {
        couponSn: null,
        fileName: '',
        limitCouponOneDayOrigin: 0,
        percentOrigin: 1,
        text: '',
        status: 1
      },
      coupons: [],
      srcImage: '',
      image: {},
      sn: this.$route.params.sn,
      ui: {
        loadingDetails: false,
        thumbnailDialogVisible: false,
        couponLoading: false
      },
      hasImage: false,
      setRatioThumbnail: {
        width: 345,
        height: 345
      }
    }
  },
  created () {
    this.sn && this.fetchLuckyWheelDetail(this.sn)
    this.fetchCoupon()
  },
  computed: {
    isCreate () {
      return this.sn ? 'update' : 'create'
    }
  },
  methods: {
    setImage (file) {
      this.hasImage = true
      this.$refs.thumbnailDialog.setup({ file: file })
      this.ui.thumbnailDialogVisible = true
    },
    resultThumbnail (result) {
      this.image = result
      this.formData.fileName = result.name
      this.srcImage = URL.createObjectURL(result)
    },
    async uploadFileZip (preSigned, filePath) {
      try {
        await uploadFileZip(preSigned, filePath)
      } catch (error) {
        this.ui.loadingDetails = false
        return false
      } finally {
        const message = this.$t(`message.${this.isCreate}Success`)
        this.$message({
          type: 'success',
          message: message
        })
        this.ui.loadingDetails = false
        this.$router.go(-1)
      }
    },
    searchSuggestionsCoupon: debounce(function (keySearch) {
      this.fetchCoupon({
        limit: 10,
        keyword: keySearch
      })
    }, timeDebounce),
    async fetchLuckyWheelDetail (sn) {
      this.ui.loadingDetails = true
      try {
        const { data } = await fetchLuckyWheelDetail({ sn: sn })
        this.formData = data.data
        this.srcImage = this.formatImage(data.data.imagePath)
      } catch (error) {
        return false
      } finally {
        this.ui.loadingDetails = false
      }
    },
    async fetchCoupon (params) {
      this.ui.couponLoading = true
      try {
        const { data } = await fetchCoupon(params)
        this.coupons = data.data.suggestionCoupon
      } catch (error) {
        return false
      } finally {
        this.ui.couponLoading = false
      }
    },
    async onSubmit () {
      this.ui.loadingDetails = true
      try {
        const { data } = this.sn
          ? await editLuckyWheelDetail({ sn: this.sn, ...this.formData })
          : await createLuckyWheelDetail(this.formData)
        if (data?.code === repStatus.sussess) {
          this.uploadFileZip(data.data?.preSignedUrl?.pre_signed, this.image)
        } else if (data?.code === repStatus.failed) {
          this.ui.loadingDetails = false
        }
      } catch (error) {
        return false
      } finally {
      }
    }
  }
}
</script>
