<template>
  <sa-section>
    <div class="hote-debt-detail-mgt__table" v-loading.fullscreen.lock="isLoading">
      <div>
        <el-row >
          <el-col :span="4" class="lable-background">
            {{ $t('page.hotelDebt.hotel_name') }}
          </el-col>
          <el-col :span="20">
            <p v-if="data.hotel"> {{ data.hotel.name }} </p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="lable-background">
            {{ $t('page.hotelDebt.period_debt_time') }} / {{ $t('page.hotelDebt.period_debt') }}
          </el-col>
          <el-col :span="20">
            <p> {{ data.startDate }} ~ {{ data.endDate }} / <strong>{{ data.periodDebt}}</strong> </p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="lable-background">
            {{ $t('page.hotelDebt.other_debt') }}
          </el-col>
          <el-col :span="20">
            <p> {{ data.otherDebt }} </p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="lable-background">
            {{ $t('page.hotelDebt.pay_amount') }} / {{ $t('page.hotelDebt.pay_date') }}
          </el-col>
          <el-col :span="20">
            <p> <strong>{{ data.payAmount}}</strong> {{ data.payDate }} </p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="lable-background">
            {{ $t('page.hotelDebt.current_debt') }} / {{ $t('page.hotelDebt.balance') }}
          </el-col>
          <el-col :span="20">
            <p> {{ data.currentDebt }} / {{ data.balance }} </p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="lable-background">
            {{ $t('page.hotelDebt.memo') }}
          </el-col>
          <el-col :span="20">
            <p> {{ data.memo }} </p>
          </el-col>
        </el-row>
      </div>
    </div>
  </sa-section>
</template>
<script>
import saSection from '@/components/globals/SaSection.vue'
import { getHotetDebt } from './api'
export default {
  name: 'HotelDebtDetail',
  components: {
    saSection
  },
  data () {
    return {
      data: [],
      isLoading: false
    }
  },
  computed: {
  },
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
    }
  }
}
</script>

<style lang="scss" scoped>
.hote-debt-detail-mgt{
  .lable-background {
    background-color: #F0F0F0;
  }
  .section {
    padding: 12px;
  }
}

</style>
