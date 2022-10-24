<template>
<sa-section>
    <div class="product-detail-segment"  v-loading="isLoadingProductDetail">
        <div class="product-detail-segment__content">
          <!-- Start Contentbar-->
          <div class="product-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.productDetail.hotel')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ dataHotel.name }}</p>
            </div>
          </div>
          <div class="product-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.productDetail.product_name')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ dataDetailProduct.name }}</p>
            </div>
          </div>
          <div class="product-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.productDetail.product_name_en')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ dataDetailProduct.nameEn }}</p>
            </div>
          </div>
          <div class="product-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.productDetail.product_type_name')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ hotelProductType.name }}</p>
            </div>
          </div>
          <div class="product-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.productDetail.product_type_name_en')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ hotelProductType.nameEn }}</p>
            </div>
          </div>
          <div class="product-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.productDetail.product_type_name_en')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ dataDetailProduct.price }} &nbsp;VND</p>
            </div>
          </div>
          <div class="product-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.productDetail.prepare_before_1_day')}}</p>
            </div>
            <div class="product-detail-content">
                <span v-if="dataDetailProduct.prepare == 1">✓</span>
                <span v-else> </span>
            </div>
          </div>
          <div class="product-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.productDetail.description')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ dataDetailProduct.description }}</p>
            </div>
          </div>
          <div class="product-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.productDetail.status')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ getStatus(dataDetailProduct.status) }}</p>
            </div>
          </div>
          <div class="product-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.productDetail.create_staff')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ createStaff.fullName }}&nbsp;&nbsp;   {{ formatDate(dataDetailProduct.createTime) }}</p>
            </div>
          </div>
          <div class="product-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.productDetail.last_update')}}</p>
            </div>
            <div class="product-detail-content">
                <p> {{ formatDate(dataDetailProduct.lastUpdate) }}</p>
            </div>
          </div>
          <div class="product-detail-segment__content--line-end">
            <div class="product-detail-title">
                <p>{{ $t('page.productDetail.image')}}</p>
            </div>
            <div class="product-detail-content">
            <div id="preview">
                <img v-if="dataDetailProduct.imagePath" :src="this.formatImage(dataDetailProduct.imagePath)" />
            </div>
          </div>
          </div>
          <!-- Etart Contentbar-->
        </div>
        <div class="product-detail-segment__button">
          <el-button type="info" size="large" @click="$router.go(-1)">
              {{ $t('button.back')}}
          </el-button>
        </div>
    </div>
</sa-section>
</template>

<script>
import { getProductDetail } from './api'
import SaSection from '@/components/globals/SaSection.vue'
export default {
  name: 'EditProduct',
  components: {
    SaSection
  },
  data: () => {
    return {
      ui: {
        isLoadingProductDetail: true
      },
      dataDetailProduct: {

      },
      dataHotel: {

      },
      hotelProductType: {

      },
      createStaff: {

      }
    }
  },
  async created () {
    await this.getDataProductDetail()
  },
  methods: {
    async getDataProductDetail () {
      const id = this.$route.params.id
      try {
        const { data } = await getProductDetail(id)
        this.dataDetailProduct = data.data
        this.dataHotel = this.dataDetailProduct.hotel
        this.hotelProductType = this.dataDetailProduct.hotelProductType
        this.createStaff = this.dataDetailProduct.createStaff
      } catch (error) {
        return false
      } finally {
        this.isLoadingProductDetail = false
      }
    }, // getDataHotelStaffDetail
    getStatus (value) {
      if (!value) {
        return ''
      }
      switch (value) {
        case 0:
          return `${this.$t('option.status.deleted')}`
        case 1:
          return `${this.$t('option.status.active')}`
        case 2:
          return `${this.$t('option.status.expired')}`
        case 3:
          return `${this.$t('option.status.temp')}`
        case 4:
          return `${this.$t('option.status.draft')}`
        case 5:
          return `${this.$t('option.status.wait_confirm')}`
        default:
      };
    } // getStatus
  }
}
</script>
<style lang="scss" scoped>
.product-detail-segment {
    min-height: calc(100vh - 220px);
    background-color: #ffffff;
    &__content {
        border: none;
        border-radius: 3px;
        &--line {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            padding: 16px 16px 16px 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.125);
            align-items: center;
            @media (min-width: 640px) {
                grid-template-columns: 1fr 3fr;
            }

            justify-content: center;
            align-items: center;
            text-align: left;

        }
        &--title {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            padding: 5px 0;

            .style-title-list {
                color: #409eff;
                font-weight: bold;
                border-top: 1px solid #8a98ac;
                border-bottom: 1px solid #8a98ac;
                padding: 15px 0;
            }
        }
        &--line-end {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            padding: 16px 16px 16px 0;
            align-items: center;
            @media (min-width: 640px) {
                grid-template-columns: 1fr 3fr;
            }

            justify-content: center;
            align-items: center;
            text-align: left;

        }
        &--title {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            padding: 5px 0;

            .style-title-list {
                color: #409eff;
                font-weight: bold;
                border-top: 1px solid #8a98ac;
                border-bottom: 1px solid #8a98ac;
                padding: 15px 0;
            }
        }
    }
    &__button {
        display: flex;;
        justify-content: flex-end;
    }
}
</style>
