<template>
  <sa-section class="stamp">
    <el-form :model="form" :rules="rules" ref="form">
      <div class="stamp__form">
        <el-form-item :label="$t('page.stamp.hotelName')" prop="hotelSn" required>
          <el-select
            :loading="ui.isLoadingHotels"
            v-model="form.hotelSn"
            element-loading-spinner="el-icon-loading"
            remote
            filterable
            :placeholder="$t('page.stamp.hotelName')"
            :remote-method="reloadHotels"
            >
            <el-option
                v-for="(item, index) in hotels"
                :key="index"
                :label="`${item.name} - ${item.address}`"
                :value="item.sn"
            >
            </el-option>
          </el-select>
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
                  clearable
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
                  clearable
                >
                  <i slot="append">VND</i>
                </el-currency-input>

              </el-form-item>
            </div>
          </div>
        </el-form-item>
      </div>
      <div class="stamp__form">
        <el-form-item :label="$t('page.stamp.startDate')" prop="startDate" required>
          <el-date-picker class="w-100" type="date" :placeholder="$t('page.stamp.startDate')" v-model="form.startDate"></el-date-picker>
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
      <div class="stamp__button">
        <el-button type="info" size="large" @click="$router.go(-1)">
            {{ $t('button.back')}}
        </el-button>
        <el-button type="success" :loading="ui.isSubmiting" size="large" @click="preHandleBeforeSubmit">
            {{ $t('button.create')}}
        </el-button>
      </div>
    </el-form>
  </sa-section>
</template>
<script>
import { debounce, scrollToTop } from '@/utils/helpers'
import SaSection from '@/components/globals/SaSection.vue'
import { createStamp } from './api'
import { fetchSuggestionsHotels } from '@/api/hotels'
import ElCurrencyInput from '@/components/globals/elCurrencyInput'

const timeDebounce = 500

export default {
  name: 'CreateStamp',
  components: {
    SaSection,
    ElCurrencyInput
  },
  data () {
    return {
      form: {
        hotelSn: '',
        flashSaleEarn: '',
        maxRedeem: 10000,
        numToRedeem: 1,
        redeemDaily: 1,
        redeemHourly: 1,
        redeemOvernight: 1,
        redeemType: 1,
        redeemValue: 100,
        startDate: new Date()
      },
      rules: {
        hotelSn: [
          { required: true, message: this.$t('page.stamp.requiredHotelName'), trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: this.$t('page.stamp.requiredStartDate'), trigger: 'change' }
        ]
      },
      ui: {
        isSubmiting: false,
        isLoadingHotels: false
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
    this.fetchSuggestionsHotels()
  },
  methods: {
    async fetchSuggestionsHotels (keyword) {
      this.ui.isLoadingHotels = true
      try {
        const params = { keyword: keyword || '', justHotel: 1 }
        const { data } = await fetchSuggestionsHotels(params)
        this.hotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotels = false
      }
    },
    reloadHotels: debounce(function (keyword) {
      this.fetchSuggestionsHotels(keyword)
    }, timeDebounce),
    preHandleBeforeSubmit () {
      this.form.startDate = this.formatDate(this.form.startDate, false)
      this.$refs.form.validate((valid) => {
        if (!valid) {
          scrollToTop('.el-form-item__error')
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

        const { data } = await createStamp(formData)
        if (data.code === 1) {
          const message = this.$t('message.createSuccess')
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
          display: unset;
        }
      }
      .el-form-item__content {
        @media (min-width: 640px) {
          flex: 3;
        }
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
