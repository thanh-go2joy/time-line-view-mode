<template>
  <sa-section>
    <div
      class="hote-debt-edit-mgt__table"
      v-loading.fullscreen.lock="isLoading"
    >
      <div>
        <el-row>
          <el-col :span="4">
            {{ $t('page.hotelDebt.hotel_name') }}
          </el-col>
          <el-col :span="20">
            <el-input v-if="data.hotel" :value="data.hotel.name" disabled />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            {{ $t('page.hotelDebt.period_debt_time') }} /
            {{ $t('page.hotelDebt.period_debt') }}
          </el-col>
          <el-col :span="20">
            <el-date-picker
              :disabled="data.finalRecord == 0 ? true : false"
              class="float-left-input"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="data.startDate"
            />
            <div class="float-left-input space">~</div>
            <el-date-picker
              :disabled="data.finalRecord == 0 ? true : false"
              class="float-left-input input-margin-right"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="data.endDate"
            />
            <el-input
              class="float-left-input period-debt"
              disabled
              type="text"
              :value="formatMoney(data.periodDebt)"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            {{ $t('page.hotelDebt.other_debt') }}
          </el-col>
          <el-col :span="20">
            <el-input-number
              class="input-number"
              v-model="numOtherDebt"
              controls-position="right"
              @change="handleChangeOtherDebt"
              :step="1000"
            >
            </el-input-number>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            {{ $t('page.hotelDebt.pay_amount') }} /
            {{ $t('page.hotelDebt.pay_date') }}
          </el-col>
          <el-col :span="20">
            <el-input-number
              class="margin-right input-number"
              v-model="numPayAmount"
              controls-position="right"
              @change="handleChangePayAmount"
              :step="1000"
            >
            </el-input-number>
            <el-date-picker
              class=""
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="data.payDate"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            {{ $t('page.hotelDebt.current_debt') }} /
            {{ $t('page.hotelDebt.balance') }}
          </el-col>
          <el-col :span="20">
            <el-input
              class="input-width margin-right"
              disabled
              type="text"
              :value="formatMoney(data.currentDebt)"
            />
            <el-input
              class="input-width"
              type="text"
              disabled
              :value="formatMoney(data.balance)"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            {{ $t('page.hotelDebt.memo') }}
          </el-col>
          <el-col :span="20">
            <el-input type="textarea" v-model="data.memo" />
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="hotel-debt__footer">
      <el-button size="large" @click="onRefeshHotelDebt">
        {{ $t('button.refresh') }}
      </el-button>
      <el-button type="info" size="large" @click="$router.go(-1)">
        {{ $t('button.back') }}
      </el-button>
      <el-button type="success" size="large" @click="onEditHotelDebt">
        <i class="feather icon-save mr-2" />
        {{ $t('button.save') }}
      </el-button>
    </div>
  </sa-section>
</template>
<script>
import saSection from '@/components/globals/SaSection.vue'
import { getHotetDebt, onEditHotetDebt, onRefeshHotetDebt } from './api'
export default {
  name: 'HotelDebtEdit',
  components: {
    saSection
  },
  data () {
    return {
      data: [],
      numPayAmount: '',
      numOtherDebt: '',
      isLoading: false
    }
  },
  computed: {},
  created () {
    this.listHotetDebt()
  },

  methods: {
    async listHotetDebt () {
      this.isLoading = true
      try {
        const { data } = await getHotetDebt(this.$route.params.sn)
        this.data = data.data
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    },
    async onEditHotelDebt () {
      try {
        const { data } = await onEditHotetDebt(this.$route.params.sn, this.data)
        if (data.code === 1) {
          this.$message({
            type: 'success',
            message: `${this.$t('message.success')}`
          })
          this.$router.push({
            name: 'hotelDebtDetailList',
            params: {
              sn: this.data.hotelSn
            }
          })
        }
      } catch (error) {
        return false
      }
    },
    async onRefeshHotelDebt () {
      try {
        const query = {
          hotelSn: this.data.hotelSn,
          startDate: this.data.startDate,
          endDate: this.data.endDate
        }
        const { data } = await onRefeshHotetDebt(query)
        if (data.code === 1) {
          this.data.periodDebt = data.data.periodDebt
          this.data.balance =
            this.data.currentDebt +
            this.data.periodDebt +
            this.data.otherDebt -
            this.data.payAmount
          this.$message({
            type: 'success',
            message: `${this.$t('message.success')}`
          })
        }
      } catch (error) {
        return false
      }
    },
    handleChangeOtherDebt (currentValue) {
      this.data.otherDebt = currentValue
      this.data.balance =
        this.data.periodDebt +
        currentValue +
        this.data.currentDebt -
        this.data.payAmount
    },
    handleChangePayAmount (currentValue) {
      this.data.payAmount = currentValue
      this.data.balance =
        this.data.periodDebt +
        this.data.otherDebt +
        this.data.currentDebt -
        currentValue
    }
  }
}
</script>

<style lang="scss" scoped>
.hote-debt-edit-mgt {
  .lable-background {
    background-color: #f0f0f0;
  }
  .section {
    padding: 12px;
    .float-left-input,
    .float-left-input .el-input__inner {
      float: left;
    }
    .space {
      width: 10px;
      margin: 8px;
    }
    .period-debt {
      width: 140px;
      margin-left: 12px;
    }
    .input-width {
      width: 17%;
    }
    .margin-right {
      margin-right: 28px;
    }
    .input-number {
      width: 17%;
    }
  }
  .hote-debt__footer{
    margin-top: 12px;
    text-align: right;
  }
}
</style>
