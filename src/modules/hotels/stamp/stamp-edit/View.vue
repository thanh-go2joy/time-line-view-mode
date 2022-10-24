<template>
  <sa-section class="stamp">
    <el-form v-loading="ui.isLoading" :model="form" :rules="rules" ref="form">
      <div class="stamp__form">
        <el-form-item :label="$t('page.stamp.hotelName')" required>
          <el-input disabled :placeholder="$t('page.stamp.hotelName')" :value="form.hotelName" type="text"></el-input>
        </el-form-item>
      </div>
      <div class="stamp__form">
        <el-form-item :label="$t('page.stamp.stampsToRedeem')" required>
          <div class="stamp__row">
            <div class="stamp__row--margin">
            <el-form-item>
              <el-select
              v-model="form.numToRedeem"
              :placeholder="$t('page.stamp.stampsToRedeem')"
              >
                <el-option
                  v-for="item in stampToRedeemOptions"
                  :key="item.value"
                  :label="item.key"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            </div>
          </div>
        </el-form-item>
      </div>
      <div class="stamp__form">
        <el-form-item :label="$t('page.stamp.redeemValue')" required>
          <div class="stamp__row">
            <div class="stamp__row--margin">
              <el-form-item>
                <el-select
                class="d-unset"
                v-model="form.redeemType"
                :placeholder="$t('page.stamp.redeemValue')"
                >
                  <el-option
                      v-for="item in redeemValueOptions"
                    :key="item.value"
                    :label="$t(`${item.key}`)"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div v-if="form.redeemType == 2" class="stamp__row--margin">
              <el-form-item>
                <el-currency-input
                  :min="0"
                  :max="100"
                  :fixed="0"
                  @change="form.redeemValue = formatEvenPercent(form.redeemValue)"
                  v-model="form.redeemValue"
                >
                  <i slot="append">%</i>
                </el-currency-input>

              </el-form-item>
            </div>
            <div class="stamp__row--margin">
              <el-form-item>
                <el-currency-input
                  :min="0"
                  :fixed="0"
                  @change="form.maxRedeem = formatEvenPrice(form.maxRedeem)"
                  v-model="form.maxRedeem"
                >
                  <i slot="append">VND</i>
                </el-currency-input>

              </el-form-item>
            </div>
          </div>
        </el-form-item>
      </div>
      <div class="stamp__form">
        <el-form-item :label="$t('page.stamp.canRedeemForBooking')" required>
          <el-checkbox :true-label="1" :false-label="0" v-model="form.redeemHourly">{{ $t('option.roomType.hourly') }}</el-checkbox>
          <el-checkbox :true-label="1" :false-label="0" v-model="form.redeemOvernight">{{ $t('option.roomType.overnight') }}</el-checkbox>
          <el-checkbox :true-label="1" :false-label="0" v-model="form.redeemDaily">{{ $t('option.roomType.daily') }}</el-checkbox>
        </el-form-item>
      </div>
      <div class="stamp__form">
        <el-form-item :label="$t('page.stamp.integrateWithFlashSale')">
          <el-checkbox :true-label="1" :false-label="0" v-model="form.flashSaleEarn">{{ $t('page.stamp.canEarnStamp') }}</el-checkbox>
        </el-form-item>
      </div>
      <div class="stamp__form">
        <el-form-item v-if="!isEndDate" :label="$t('page.stamp.status')">
          <div class="stamp__form--flex">
            <label>{{ $t('page.stamp.available') }}</label>
            <el-date-picker type="date" :picker-options="pickerOptions" :placeholder="$t('page.stamp.endDate')" v-model="form.endDate"></el-date-picker>
            <el-button type="danger" :loading="ui.isDisabling" size="large" icon="el-icon-lock" @click="updateStatus(2)">
              {{ $t('button.disable')}}
            </el-button>
          </div>
        </el-form-item>
        <el-form-item v-else :label="$t('page.stamp.status')">
          <div class="stamp__form--flex">
            <label>{{ $t('page.stamp.endDate') }}</label>
            <el-date-picker disabled type="date" :placeholder="$t('page.stamp.endDate')" :value="form.endDate"></el-date-picker>
            <el-button type="success" :loading="ui.isEnabling" size="large" icon="el-icon-unlock" @click="updateStatus(1)">
              {{ $t('button.enable')}}
            </el-button>
          </div>
        </el-form-item>
      </div>
      <div class="stamp__button">
        <el-button type="info" size="large" @click="$router.go(-1)">
            {{ $t('button.back')}}
        </el-button>
        <el-button type="success" :loading="ui.isSubmiting" size="large" @click="preHandleBeforeSubmit">
            {{ $t('button.edit')}}
        </el-button>
      </div>
    </el-form>
  </sa-section>
</template>

<script>
import SaSection from '@/components/globals/SaSection.vue'
import { updateStamp, getStampDetails, updateStatus } from './api'
import ElCurrencyInput from '@/components/globals/elCurrencyInput'

export default {
  name: 'EditStamp',
  components: {
    SaSection,
    ElCurrencyInput
  },
  data () {
    return {
      form: {
        hotelName: '',
        hotelSn: '',
        flashSaleEarn: '',
        maxRedeem: 10000,
        numToRedeem: 1,
        redeemDaily: 1,
        redeemHourly: 1,
        redeemOvernight: 1,
        redeemType: 1,
        redeemValue: 0,
        endDate: '',
        status2: ''
      },
      isEndDate: false,
      pickerOptions: {
        disabledDate: this.disabledDate
      },
      rules: {
        endDate: [
          { required: true, message: this.$t('page.stamp.requiredStartDate'), trigger: 'change' }
        ]
      },
      ui: {
        isSubmiting: false,
        isLoading: true,
        isDisabling: false,
        isEnabling: false
      },
      hotels: [],
      stampToRedeemOptions: [
        { value: 1, key: '1' },
        { value: 2, key: '2' },
        { value: 3, key: '3' },
        { value: 4, key: '4' },
        { value: 5, key: '5' },
        { value: 6, key: '6' },
        { value: 7, key: '7' },
        { value: 8, key: '8' },
        { value: 9, key: '9' },
        { value: 10, key: '10' }
      ],
      redeemValueOptions: [
        { value: 1, key: 'page.stamp.money' },
        { value: 2, key: 'page.stamp.percentage' }
      ]
    }
  },
  created () {
    this.getStampDetails()
  },

  methods: {
    disabledDate (time) {
      const one = 29 * 24 * 3600 * 1000
      const onMonth = Date.now() + one
      return time < onMonth
    },
    async getStampDetails () {
      try {
        const { data } = await getStampDetails(this.$route.params.sn)
        this.isEndDate = !!data.data.endDate
        this.form = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },

    async updateStatus (status2) {
      try {
        this.ui.isDisabling = status2 === 2
        this.ui.isEnabling = status2 !== 2
        const params = {
          endDate: status2 === 2 ? this.formatDate(this.form.endDate, false) : '',
          status2: status2
        }
        const { data } = await updateStatus(this.$route.params.sn, params)
        if (data.code === 1) {
          this.form.endDate = params.endDate ? params.endDate : ''
          this.isEndDate = !!params.endDate
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isDisabling = false
        this.ui.isEnabling = false
      }
    },

    preHandleBeforeSubmit () {
      // first handle before submit
      this.form.redeemValue = this.form.redeemType !== 2 ? this.form.maxRedeem : this.form.redeemValue
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false
        }
        this.submit()
      })
    },

    async submit () {
      this.ui.isSubmiting = true

      try {
        const formData = Object.keys(this.form).reduce((formData, key) => {
          formData.append(key, this.form[key])
          return formData
        }, new FormData())

        const { data } = await updateStamp(this.$route.params.sn, formData)
        if (data.code === 1) {
          const message = this.$t('message.updateSuccess')
          this.$message({
            type: 'success',
            message: message
          })
          this.$router.go(-1)
        }
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
  .stamp {
    :deep(.stamp__form) {
        margin: 1em 0;
        .el-form-item {
          margin-bottom: 1em;
          display: grid;
          @media (min-width: 640px) {
            display: flex;
            flex-wrap: wrap;
            margin: 6px 0;
          }
        }
        .el-form-item__label {
          text-align: left;
          @media (min-width: 640px) {
            flex: 1;
          }
        }
        .el-form-item__content {
          @media (min-width: 640px) {
            flex: 3;
          }
        }
        .el-form-item__error {
          margin-top: 0.5em;
          position: unset;
        }
    }
    &__row {
      @media (min-width: 640px) {
        display: flex;
        align-items: center;
        gap: 0 2em;
        flex-wrap: wrap;
      }
      &--margin {
        margin: 1em 0;
      }
    }
    &__content {
      clear: both;
    }
    &__button {
      display: flex;;
      justify-content: flex-end;
      margin-top: 2em;

      @media (max-width: 640px) {
        z-index: 1;
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
    .stamp__form--flex {
      display: flex;
      gap: 2em;
      flex-wrap: wrap;
    }
  }
  .el-select {
    width: 100%;
  }
  @media (max-width: 768px) {
    .w-100 {
      width: 100%;
    }
  }
</style>
