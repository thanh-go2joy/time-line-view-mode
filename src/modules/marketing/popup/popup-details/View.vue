<template>
    <div class="popup">
      <sa-section
        v-loading="ui.isLoading"
      >
      <div class="popup__info">
        <div class="card-item" v-for="(item, index) in ui.form" :key="index">
          <p class="card-item__label">
            {{ $t(`page.popup.${item}`) }}
          </p>
          <p v-if="item ==='status'" class="card-item__value">
            {{ bannerDetails[item] === 0 ? $t('option.status.disable') : $t('option.status.active') }}
            /
            {{ bannerDetails.maxView !== 0 ? bannerDetails.maxView : $t('page.popup.noLimit') }}
          </p>
          <div v-else-if="item === 'targetType'" class="card-item__value">
            <p v-if="bannerDetails[item] === TARGET_TYPE.PROMOTION_GROUP">
              <span>{{ $t('option.targetType.promotionGroup') }}</span>
              <router-link
              :to="{ name: 'groupPromotion', params: { sn: bannerDetails.targetSn } }">
                {{ bannerDetails.targetName }}
              </router-link>
            </p>
            <p v-else-if="bannerDetails[item] === TARGET_TYPE.PROMOTION_EVENT">
              <span>{{ $t('option.targetType.promotionEvent') }}</span>
              <router-link
              :to="{ name: 'promotionDetails', params: { promotionSn: bannerDetails.targetSn } }">
                {{ bannerDetails.targetName }}
              </router-link>
            </p>
            <p v-else-if="bannerDetails[item] === TARGET_TYPE.LINK_OUT_APP">
              {{ $t('option.targetType.link') }}
              <a :href="content.targetInfo" >
                {{ bannerDetails.targetInfo }}
              </a>
            </p>
            <p v-else>{{ getTargetType }}</p>
          </div>
          <p v-else-if="item ==='listProvince'" class="card-item__value">
            <el-tag class="mr-mt-1" v-for="(province, index) in bannerDetails[item]" :key="index">
              {{province.name}}
            </el-tag>
          </p>
          <p v-else-if="item ==='lastUpdate'">
            {{ formatDate(bannerDetails[item]) }}
          </p>
          <p v-else-if="item ==='content'" v-html="bannerDetails[item]"></p>
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
import { getPopupDetails } from './api'
export default {
  name: 'PopupDetails',
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
          'content',
          'imagePath'
        ]
      },
      bannerDetails: {},
      TARGET_TYPE: TARGET_TYPE
    }
  },
  created () {
    this.getPopupDetails()
  },
  computed: {
    getTargetType () {
      if (this.bannerDetails.targetType === TARGET_TYPE.HOTEL) return `${this.$t('option.targetType.hotel')}`
      else if (this.bannerDetails.targetType === TARGET_TYPE.NOTICE) return `${this.$t('option.targetType.notice')}`
      else if (this.bannerDetails.targetType === TARGET_TYPE.DISTRICT) return `${this.$t('option.targetType.hotelArea')}`
      else if (this.bannerDetails.targetType === TARGET_TYPE.MILEAGE_POINT) return `${this.$t('option.targetType.mileagePoint')}`
      else if (this.bannerDetails.targetType === TARGET_TYPE.COUPON) return `${this.$t('option.targetType.coupon')}`
      else if (this.bannerDetails.targetType === TARGET_TYPE.DIRECT_DISCOUNT) return `${this.$t('option.targetType.directDiscount')}`
      else if (this.bannerDetails.targetType === TARGET_TYPE.INVITE_FRIEND) return `${this.$t('option.targetType.inviteFriend')}`
      else if (this.bannerDetails.targetType === TARGET_TYPE.AMENITY_PACK) return `${this.$t('option.targetType.amenityPack')}`
      else if (this.bannerDetails.targetType === TARGET_TYPE.HOTEL_GO2CHOICE) return `${this.$t('option.targetType.hotelGo2Choice')}`
      else if (this.bannerDetails.targetType === TARGET_TYPE.HOTEL_TET) return `${this.$t('option.targetType.hotelTet')}`
      else return ''
    }
  },
  methods: {
    async getPopupDetails () {
      this.ui.isLoading = true
      try {
        const { data } = await getPopupDetails(this.$route.params.sn)
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
