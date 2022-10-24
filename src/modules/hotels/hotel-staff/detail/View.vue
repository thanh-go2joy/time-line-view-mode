<template>
<sa-section>
    <div class="hotel-staff-detail-segment" v-loading="ui.isLoadingHotelStaffDetail">
        <div class="hotel-staff-detail-segment__content">
          <!-- Start Contentbar-->
          <div class="hotel-staff-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.hotelStaffEdit.hotel_name')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ dataDetailHotelStaff.hotelName }}</p>
            </div>
          </div>
          <div class="hotel-staff-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.hotelStaffEdit.full_name')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ dataDetailHotelStaff.fullName }}</p>
            </div>
          </div>
          <div class="hotel-staff-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.hotelStaffEdit.status')}}</p>
            </div>
            <div class="product-detail-content">
                <span v-if="dataDetailHotelStaff.status === 1">✓</span>
                <span v-else> </span>
            </div>
          </div>

          <div class="hotel-staff-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.hotelStaffEdit.user_id')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ dataDetailHotelStaff.userId }}</p>
            </div>
          </div>
          <div class="hotel-staff-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.hotelStaffEdit.mobile')}}</p>
            </div>
            <div class="product-detail-content">
                <span>{{ dataDetailHotelStaff.mobile }}</span>
            </div>
          </div>
          <div class="hotel-staff-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.hotelStaffEdit.email')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ dataDetailHotelStaff.email }}</p>
            </div>
          </div>
          <div class="hotel-staff-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.hotelStaffEdit.debt_reconciliation_email')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ dataDetailHotelStaff.debtEmail }}</p>
            </div>
          </div>
          <div class="hotel-staff-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.hotelStaffEdit.memo')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ dataDetailHotelStaff.memo }}</p>
            </div>
          </div>
          <!-- Etart Contentbar-->
        </div>
        <div class="hotel-staff-detail-segment__button">
          <el-button type="info" size="large" @click="$router.go(-1)">
              {{ $t('button.back')}}
          </el-button>
        </div>
    </div>
</sa-section>
</template>

<script>
import { getHotelStaffDetail } from './api'
import SaSection from '@/components/globals/SaSection'
export default {
  name: 'DetailHotelStaff',
  components: {
    SaSection
  },
  data: () => {
    return {
      ui: {
        isLoadingHotelStaffDetail: true
      },
      dataDetailHotelStaff: {

      }

    }
  },
  async created () {
    await this.getDataHotelStaffDetail()
  },
  methods: {
    async getDataHotelStaffDetail () {
      this.ui.isLoadingHotelStaffDetail = true
      const id = this.$route.params.id
      try {
        const { data } = await getHotelStaffDetail(id)
        this.dataDetailHotelStaff = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotelStaffDetail = false
      }
    } // getDataHotelStaffDetail
  }
}
</script>
<style lang="scss" scoped>
.hotel-staff-detail-segment {
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
