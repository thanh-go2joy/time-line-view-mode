<template>
    <div class="banner">
      <sa-section
        v-loading="ui.isLoading"
      >
      <div class="banner__info">
        <div class="card-item" v-for="(item, index) in ui.form" :key="index">
          <p class="card-item__label">
            {{ $t(`page.banner.${item}`) }}
          </p>
          <p v-if="item ==='status'" class="card-item__value">
            {{ bannerDetails[item] === 0 ? $t('option.status.disable') : $t('option.status.active') }}
          </p>
          <!-- ------------------- -->
          <div v-else-if="item === 'targetType'" class="card-item__value">
            <p v-if="bannerDetails[item] === TARGET_TYPE.PROMOTION_GROUP">
              <span>{{ $t('option.targetType.promotionGroup') }}</span>
              <router-link
              :to="{ name: 'groupPromotion', params: { sn: bannerDetails.targetSn } }">
                {{ bannerDetails.targetName }}
              </router-link>
            </p>
            <p v-else-if="bannerDetails[item] === TARGET_TYPE.PROMOTION_EVENT">
              <span>{{ $t('option.targetType.promotion') }}</span>
              <router-link
              :to="{ name: 'promotionDetails', params: { promotionSn: bannerDetails.targetSn } }">
                {{ bannerDetails.targetName }}
              </router-link>
            </p>
            <p v-else-if="bannerDetails[item] === TARGET_TYPE.HOTEL">
              <span>{{ $t('option.targetType.hotel') }}</span>
              <router-link
              :to="{ name: 'hotelDisplayDetails', params: { sn: bannerDetails.targetSn } }">
                {{ bannerDetails.targetName }}
              </router-link>
            </p>
            <p v-else-if="bannerDetails[item] === TARGET_TYPE.NOTICE">
              <span>{{ $t('option.targetType.notice') }}</span>
              <router-link
              :to="{ name: 'noticeDetails', params: { sn: bannerDetails.targetSn } }">
                {{ bannerDetails.targetName }}
              </router-link>
            </p>
            <p v-else-if="bannerDetails[item] === TARGET_TYPE.LINK_OUT_APP || bannerDetails[item] === TARGET_TYPE.DISTRICT">
              <span v-if="bannerDetails[item] === TARGET_TYPE.DISTRICT">{{ $t("option.targetType.district") }}</span>
              {{ bannerDetails[item] === TARGET_TYPE.LINK_OUT_APP ? bannerDetails.targetInfo : bannerDetails.targetName }}
            </p>
            <p v-else>{{ getTargetType }}</p>
          </div>
          <!-- --------------------- -->
          <p v-else-if="item ==='listProvince'" class="card-item__value">
            <el-tag class="mr-mt-1" v-for="(province, index) in bannerDetails[item]" :key="index">
              {{province.name}}
            </el-tag>
          </p>
          <p v-else-if="item ==='imagePath'" class="card-item__value">
            <el-image
            :src="formatImage(bannerDetails[item])"
            fit="scale-down"></el-image>
          </p>
          <p v-else class="card-item__value">
            {{ bannerDetails[item] }}
          </p>
        </div>
      </div>
    </sa-section>
  </div>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { TARGET_TYPE } from '@/utils/const'
import { getBannerDetails } from './api'
export default {
  name: 'BannerDetails',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        isLoading: false,
        form: [
          'title',
          'targetType',
          'status',
          'listProvince',
          'lastUpdate',
          'imagePath'
        ]
      },
      bannerDetails: {},
      TARGET_TYPE: TARGET_TYPE
    }
  },
  created () {
    this.getBannerDetails()
  },
  computed: {
    getTargetType () {
      if (this.bannerDetails.targetType === TARGET_TYPE.LINK_IN_APP) return `${this.$t('option.targetType.linkInApp')}`
      else if (this.bannerDetails.targetType === TARGET_TYPE.MILEAGE_POINT) return `${this.$t('option.targetType.mileagePoint')}`
      else if (this.bannerDetails.targetType === TARGET_TYPE.COUPON) return `${this.$t('option.targetType.coupon')}`
      else if (this.bannerDetails.targetType === TARGET_TYPE.DIRECT_DISCOUNT) return `${this.$t('option.targetType.directDiscount')}`
      else if (this.bannerDetails.targetType === TARGET_TYPE.INVITE_FRIEND) return `${this.$t('option.targetType.inviteFriend')}`
      else if (this.bannerDetails.targetType === TARGET_TYPE.AMENITY_PACK) return `${this.$t('option.targetType.amenityPack')}`
      else if (this.bannerDetails.targetType === TARGET_TYPE.HOTEL_GO2CHOICE) return `${this.$t('option.targetType.hotelGo2Choice')}`
      else return ''
    }
  },
  methods: {
    async getBannerDetails () {
      this.ui.isLoading = true
      try {
        const { data } = await getBannerDetails(this.$route.params.sn)
        this.bannerDetails = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .mr-mt-1 {
    margin-right: 10px;
    margin-top: 10px;
  }
  .card-item {
    padding: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    display: flex;
    align-items: center;
    &__label {
      width: 30%;
      font-weight: 600;
    }
    &__value {
      width: 70%;
    }

    @media (max-width: 640px) {
      display: block;
      &__label {
        width: 100%;
      }
      &__value {
        width: 100%;
      }
    }
  }
</style>
