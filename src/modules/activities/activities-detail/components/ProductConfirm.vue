<template>
<div v-if="dataProductDetail">
    <div class="product-activities-detail-segment__content--line">
        <div class="product-activities-detail-title">
            <p>{{$t('page.activitiesProduct.hotel')}}</p>
        </div>
        <div class="product-activities-detail-content">
            <p>{{ hotel.name }}</p>
        </div>
    </div>
    <div class="product-activities-detail-segment__content--line">
        <div class="product-activities-detail-title">
            <p>{{ $t('page.activitiesProduct.product_name')}}</p>
        </div>
        <div class="product-activities-detail-content">
            <p>{{ dataProductDetail.name }}</p>
        </div>
    </div>
    <div class="product-activities-detail-segment__content--line">
        <div class="product-activities-detail-title">
            <p>{{ $t('page.activitiesProduct.product_name_en')}}</p>
        </div>
        <div class="product-activities-detail-content">
            <p>{{ dataProductDetail.nameEn }}</p>
        </div>
    </div>
    <div class="product-activities-detail-segment__content--line">
        <div class="product-activities-detail-title">
            <p>{{ $t('page.activitiesProduct.product_type_name')}}</p>
        </div>
        <div class="product-activities-detail-content">
            <p>{{ hotelProductType.name }}</p>
        </div>
    </div>
    <div class="product-activities-detail-segment__content--line">
        <div class="product-activities-detail-title">
            <p>{{ $t('page.activitiesProduct.product_type_name_en')}}</p>
        </div>
        <div class="product-activities-detail-content">
            <p>{{ hotelProductType.nameEn }}</p>
        </div>
    </div>
    <div class="product-activities-detail-segment__content--line">
        <div class="product-activities-detail-title">
            <p>{{ $t('page.activitiesProduct.price')}}</p>
        </div>
        <div class="product-activities-detail-content">
            <p>{{ new Number(dataProductDetail.price).toLocaleString('en-GB') }} VND</p>
        </div>
    </div>
    <div class="product-activities-detail-segment__content--line">
        <div class="product-activities-detail-title">
            <p>{{ $t('page.activitiesProduct.prepare_before_1_day')}}</p>
        </div>
        <div class="product-activities-detail-content">
            <p>
                <span v-if="dataProductDetail.prepare == 1">
                    ✓
                </span>
                <span v-else> </span></p>
        </div>
    </div>
    <div class="product-activities-detail-segment__content--line">
        <div class="product-activities-detail-title">
            <p>{{ $t('page.activitiesProduct.description')}}</p>
        </div>
        <div class="product-activities-detail-content">
            <p>{{ dataProductDetail.description }}</p>
        </div>
    </div>
    <div class="product-activities-detail-segment__content--line">
        <div class="product-activities-detail-title">
            <p>{{ $t('page.activitiesProduct.status')}}</p>
        </div>
        <div class="product-activities-detail-content">
            <p v-if="dataProductDetail.status == 1">{{$t('option.status.active')}}</p>
            <p v-if="dataProductDetail.status == 5">{{$t('option.status.wait_confirm')}}</p>
        </div>
    </div>
    <div class="product-activities-detail-segment__content--line">
        <div class="product-activities-detail-title">
            <p>{{ $t('page.activitiesProduct.create_staff')}}</p>
        </div>
        <div class="product-activities-detail-content">
            <p>{{ createStaff.fullName }}</p>
        </div>
    </div>
    <div class="product-activities-detail-segment__content--line">
        <div class="product-activities-detail-title">
            <p>{{ $t('page.activitiesProduct.last_update')}}</p>
        </div>
        <div class="product-activities-detail-content">
            <p>{{ formatDate(dataProductDetail.lastUpdate) }}</p>
        </div>
    </div>
    <div class="product-activities-detail-segment__content--line">
        <div class="product-activities-detail-title">
            <p>{{ $t('page.activitiesProduct.image')}}</p>
        </div>
        <div class="product-activities-detail-content">
            <img width="50%" height="auto" :src="imageSrc" />
        </div>
    </div>
</div>

</template>

<script>
import {
  getProductActivitiDetail
} from '../api'
export default {
  name: 'ProductConfirm',
  props: {
    targetSN: Number
  },

  data () {
    return {
      dataProductDetail: [],
      isLoading: true,
      imageSrc: '',
      hotel: {},
      hotelProductType: [],
      createStaff: {}

    }
  },
  created () {
    this.getProductContent(this.idProduct)
  },
  computed: {
    idProduct () {
      return this.targetSN
    }
  },
  methods: {
    async getProductContent (id) {
      this.isLoading = true
      try {
        const data = await getProductActivitiDetail(id)
        this.dataProductDetail = data.data.data
        this.imageSrc = this.formatImage(data.data.data.imagePath)
        this.hotelProductType = data.data.data.hotelProductType
        this.createStaff = data.data.data.createStaff
        this.hotel = data.data.data.hotel
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    } // getPromotionContent

  }
}
</script>

<style lang="scss" scoped>
.product-activities-detail-segment {
    min-height: calc(100vh - 150px);
    background-color: #ffffff;
    &__content {
        border: none;
        border-radius: 3px;
        &--line {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            border-bottom: 1px solid rgba(0, 0, 0, 0.125);
            @media (min-width: 640px) {
                grid-template-columns: 1fr 3fr;
            }

            justify-content: center;
            align-items: center;
            text-align: left;

            .is-danger {
                padding: 5px 0;
                width: 100%;
                color: red;
            }

            .product-activities-detail-title {
                height: 100%;
                margin: 0 15px;

                p {
                    padding: 5px 0;
                }
            }

            .product-activities-detail-content {
                margin: 5px 0;

                &__input-select {
                    width: 100%;
                }
            }
        }
        &--input {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            padding: 5px 0;
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
