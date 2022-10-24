<template>
  <sa-section
      class="notification"
      v-loading="ui.isLoading"
    >
    <div class="notification__info">
      <div class="card-item" v-for="(value, label, index) in ui.form" :key="index">
        <p class="card-item__label">
          {{ $t(`page.notification.${label}`) }}
        </p>
        <div v-if="label === 'type'" class="card-item__value">
          <p v-if="value == 1">{{ $t('option.status.normal')}}</p>
          <p v-else-if="value == 2">{{ $t('option.status.donateCoupon')}}</p>
          <p v-else-if="value == 3">{{ $t('option.status.remindCoupon')}}</p>
          <p v-else></p>
        </div>
        <div v-else-if="label === 'title'" class="card-item__value card-item__flex">
          {{ value.title }}
          <el-image
          v-if="value.imagePath"
          style="width: 30px; height: 30px;margin-left: 1em;"
          :src="formatImage(value.imagePath)"
          :fit="fit"></el-image>
        </div>
        <div v-else-if="label === 'createStaff'" class="card-item__value">
          <router-link
          :to="{ name: 'hotelDisplayDetails', params: { sn: value.createStaffSn }}">
            {{value.fullName}}
          </router-link>
        </div>
        <div v-else-if="label === 'targetType'" class="card-item__value">
          <router-link
          v-if="value.type != 3 && (value.targetType == TARGET_TYPE_V2.NOTICE || value.targetType == TARGET_TYPE_V2.PROMOTION || value.targetType == TARGET_TYPE_V2.HOTEL)"
          :to="{ name: value.targetType === TARGET_TYPE_V2.PROMOTION ? 'promotionDetails' : 'hotelDisplayDetails', params: { sn: value.targetSn }}">
            {{ getTargetType(value.targetType) }}
          </router-link>
          <p v-else-if="value.type == 3">N/A</p>
          <p v-else>
            <el-link disabled v-html="getTargetType(value.targetType)"></el-link>
          </p>
        </div>
        <div v-else-if="label === 'sendTo'" class="card-item__value">
          <div v-if="value.type != 3">
            <p v-if="value.sendTo === 1">{{ $t("option.status.allUser") }}</p>
            <p v-else-if="value.sendTo === 2">{{ $t("option.status.go2joy") }}</p>
            <p v-else-if="value.sendTo === 3">{{ $t("option.status.allPartner") }}</p>
            <p v-else-if="value.sendTo === 4">{{ $t("option.status.booking") }}</p>
            <p v-else-if="value.sendTo === 5">{{ $t("option.status.hotel") }}</p>
            <p v-else-if="value.sendTo === 6">{{ $t("option.status.allTrailPartner") }}</p>
            <p v-else-if="value.sendTo === 7">{{ $t("option.status.allContractPartner") }}</p>
            <p v-else-if="value.sendTo === 8">
              <el-link :underline="false" :href="formatImage(value.filePath)" type="primary">{{ value.originalFileName }}</el-link>
            </p>
            <p v-else-if="value.sendTo === 9">{{ $t("option.status.crmFilter") }}</p>
            <p v-else></p>
          </div>
          <div v-else>N/A</div>
        </div>
        <div v-else-if="label === 'filterByLocation'" class="card-item__value">
          <div v-if="value.sendTo == 1">
            <p v-if="value.openApp == 1">{{ $t('page.notification.lastOpenApp')}}</p>
            <p v-if="value.provinceNameList">
              <el-tag class="mr-mt-1" v-for="(province, index) in value.provinceNameList" :key="index">
                {{province.name}}
              </el-tag>
            </p>
            <p v-if="value.districtNameList">
              <el-tag type="info" class="mr-mt-1" v-for="(district, index) in value.districtNameList" :key="index">
                {{district.name}}
              </el-tag>
            </p>
          </div>
        </div>
        <div v-else-if="label === 'schedule'" class="card-item__value">
          <p v-if="value.type != 3 && value.sendTimeSchedule">{{formatDate(value.sendTimeSchedule)}}</p>
          <p v-else-if="value.type == 3">N/A</p>
          <p v-else>{{ $t('page.notification.rightNow') }}</p>
        </div>
        <div v-else-if="label === 'content'" class="card-item__value">
          <router-link
          v-if="value.targetType == 1 || value.targetType == 2 || value.targetType == 4"
          :to="{ name: value.targetType === 2 ? 'hotelDisplayDetails' : 'hotelDisplayDetails', params: { sn: value.targetSn }}">
            {{ getTargetType(value.targetType) }}
          </router-link>
        </div>
        <p v-else class="card-item__value">
          {{ value }}
        </p>
      </div>
      <div class="notification__button" v-if="$route.params.type == 'resend'">
        <el-button type="info" size="large" @click="$router.go(-1)">
            {{ $t('button.back')}}
        </el-button>
        <el-button type="success" :loading="ui.isSubmiting" icon="el-icon-position" size="large" @click="sendNotificationDetails">
            {{ $t('button.send')}}
        </el-button>
      </div>
    </div>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { TARGET_TYPE_V2 } from '@/utils/const'
import { getNotificationDetails, sendNotificationDetails } from './api'
export default {
  name: 'NotificationDetails',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        isLoading: false,
        isSubmiting: false,
        form: {}
      },
      TARGET_TYPE_V2: TARGET_TYPE_V2
    }
  },
  created () {
    this.getNotificationDetails()
  },
  methods: {
    async getNotificationDetails () {
      this.ui.isLoading = true
      try {
        const { data } = await getNotificationDetails(this.$route.params.sn)
        this.ui.form = {
          type: data.data.type,
          title: {
            title: data.data.title,
            imagePath: data.data.imagePath
          },
          subTitle: data.data.subTitle,
          createStaff: {
            createStaffSn: data.data.createStaffSn,
            fullName: data.data.fullName
          },
          targetType: {
            type: data.data.type,
            targetType: data.data.targetType,
            targetSn: data.data.targetSn
          },
          sendTo: {
            type: data.data.type,
            sendTo: data.data.sendTo,
            originalFileName: data.data.originalFileName,
            filePath: data.data.filePath
          },
          filterByLocation: {
            openApp: data.data.openApp,
            sendTo: data.data.sendTo,
            provinceNameList: data.data.provinceNameList,
            districtNameList: data.data.districtNameList
          },
          schedule: {
            type: data.data.type,
            sendTimeSchedule: data.data.sendTimeSchedule
          },
          createTime: this.formatDate(data.data.createTime),
          sentTime: this.formatDate(data.data.sendTime),
          content: {
            targetType: data.data.targetType,
            targetSn: data.data.targetSn
          }
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    getTargetType (targetType) {
      if (targetType === TARGET_TYPE_V2.PROMOTION_EVENT) return `${this.$t('option.targetType.notice')}`
      else if (targetType === TARGET_TYPE_V2.PROMOTION) return `${this.$t('option.targetType.promotion')}`
      else if (targetType === TARGET_TYPE_V2.SERVICE_AGREEMENT) return `${this.$t('option.targetType.serviceAgreement')}`
      else if (targetType === TARGET_TYPE_V2.HOTEL) return `${this.$t('option.targetType.hotel')}`
      else if (targetType === TARGET_TYPE_V2.FAQ) return `${this.$t('option.targetType.faq')}`
      else if (targetType === TARGET_TYPE_V2.INVITE_FRIEND) return `${this.$t('option.targetType.inviteFriend')}`
      else if (targetType === TARGET_TYPE_V2.OPEN_APP) return `${this.$t('option.targetType.openApp')}`
      else if (targetType === TARGET_TYPE_V2.MILEAGE_POINT) return `${this.$t('option.targetType.mileagePoint')}`
      else if (targetType === TARGET_TYPE_V2.DIRECT_DISCOUNT) return `${this.$t('option.targetType.directDiscount')}`
      else if (targetType === TARGET_TYPE_V2.SIGN_UP) return `${this.$t('option.targetType.signup')}`
      else if (targetType === TARGET_TYPE_V2.PROMOTION_GROUP) return `${this.$t('option.targetType.promotionGroup')}`
      else if (targetType === TARGET_TYPE_V2.AMENITY_PACK) return `${this.$t('option.targetType.amenityPack')}`
      else if (targetType === TARGET_TYPE_V2.HOTEL_GO2CHOICE) return `${this.$t('option.targetType.hotelGo2Choice')}`
      else return ''
    },
    async sendNotificationDetails () {
      this.ui.isSubmiting = true
      try {
        await sendNotificationDetails(this.$route.params.sn)
        this.$message({
          type: 'success',
          message: `${this.$t('message.sendSuccess')}`
        })
        this.$router.push({ name: 'notification' })
      } catch (error) {
        return false
      } finally {
        this.ui.isSubmiting = false
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
  .notification {
    &__button {
      display: flex;
      justify-content: flex-end;
      margin-top: 1em;
      @media (max-width: 640px) {
        position: fixed;
        bottom: 0;
        right: 0;
        background: white;
        width: 100%;
        padding-bottom: 1em;
        padding-right: 1em;
        button {
          margin-top: 1em;
        }
      }
    }
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
    &__flex {
      align-items: center;
      display: flex;
    }
  }
</style>
