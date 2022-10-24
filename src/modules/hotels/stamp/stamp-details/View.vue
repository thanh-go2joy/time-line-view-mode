<template>
    <div class="stamp">
      <sa-section
        v-loading="ui.isLoading"
      >
      <div>
        <div class="stamp__info">
          <div class="card-item" v-for="(value, label, index) in ui.form" :key="index">
            <p class="card-item__label">
              {{ $t(`page.stamp.${label}`) }}
            </p>
            <p v-if="label === 'canRedeemForBooking'" class="card-item__value">
              <el-checkbox v-for="(val, lab, ind) in value" :key="ind" disabled :true-label="1" :false-label="0" :value="val">{{ $t(`option.roomType.${lab}`) }}</el-checkbox>
            </p>
            <div v-else-if="label == 'numberOfUsers'">
              <router-link :to="{ name: 'stampDetailTotalUser', params: { sn: hotelSn } }">
                {{ value.numUserJoin }}
              </router-link>
              (
                <span v-for="(span,index) in value.reportUserList"
                :key="index">
                    <router-link :to="{ name: 'stampDetailTotalUser', params: { sn: hotelSn, stampSn: index+1 } }">
                      {{ span }}
                    </router-link>
                </span>
                )
            </div>
            <p v-else-if="label === 'flashSaleEarn'" class="card-item__value">
              <el-checkbox disabled :true-label="1" :false-label="0" :value="value">{{ $t('page.stamp.canEarnStamp') }}</el-checkbox>
            </p>

            <p v-else-if="label === 'totalRedeem'" class="card-item__value">
              <router-link :to="{ name: 'stampDetailTotalUser', params: { sn: hotelSn } }">
                  {{ value }}
              </router-link>
            </p>

            <p v-else class="card-item__value">
              {{ value }}
            </p>
          </div>
        </div>
      </div>
    </sa-section>
  </div>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { getStampDetails } from './api'
export default {
  name: 'StampDetails',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        isLoading: false,
        form: {},
        hotelSn: ''
      }
    }
  },
  created () {
    this.getStampDetails()
  },
  methods: {
    async getStampDetails () {
      this.ui.isLoading = true
      try {
        const { data } = await getStampDetails(this.$route.params.sn)
        this.ui.form = {
          hotelName: data.data.hotelName,
          numToRedeem: data.data.numToRedeem,
          redeemValue: data.data.redeemType === 1 ? `${this.formatMoney(data.data.maxRedeem)} VNĐ` : `${this.formatMoney(data.data.redeemValue)} % - ${this.formatMoney(data.data.maxRedeem)} VND`,
          numberOfUsers: {
            sn: data.data.sn,
            numUserJoin: data.data.numUserJoin,
            reportUserList: data.data.reportUserList
          },
          totalRedeem: data.data.totalRedeem,
          numStampActive: data.data.numStampActive,
          numStampExpire: data.data.numStampExpire,
          flashSaleEarn: data.data.flashSaleEarn,
          canRedeemForBooking: {
            hourly: data.data.redeemHourly,
            overnight: data.data.redeemOvernight,
            daily: data.data.redeemDaily
          },
          startDate: data.data.startDate,
          lastUpdate: this.formatDate(data.data.lastUpdate, false),
          status: data.data.status2 === 1 && !data.data.endDate ? this.$t('option.status.available') : `${this.$t('option.status.end')} ${data.data.endDate}`
        }
        this.hotelSn = data.data.hotelSn
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
  .stamp {
    &__info {
      display: grid;
      grid-template-columns: 49% 49%;
      grid-column-gap: 2%;

      @media (max-width: 640px) {
        display: block;
      }
    }
  }
  .card-item {
    padding: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    display: flex;
    align-items: center;
    &__label {
      width: 50%;
      font-weight: 600;
    }
    &__value {
      width: 50%;
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
