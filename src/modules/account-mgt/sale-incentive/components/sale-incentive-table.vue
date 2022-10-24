<template>
  <el-table
    :data="data"
    :cell-class-name="setCLassIndexColumn"
  >
    <el-table-column
      label="#"
      type="index"
      min-width="20"
      :index="setIndex"
    />
    <el-table-column
      :label="$t('page.saleIncentive.staff_name')"
    >
      <template slot-scope="scope">
        <router-link
          v-if="!scope.row.total"
          :to="{
            name: 'DetailsOfStaff',
            params: { sn: scope.row.staff.sn },
            query: { incentiveDate: incentiveDate, staffName: scope.row.staff.fullName, type: pageName }
          }"
        >
          {{ scope.row.staff.fullName }}
        </router-link>
      </template>
    </el-table-column>
    <el-table-column
      prop="incentive"
      :label="$t('page.saleIncentive.incentive')"
    >
    </el-table-column>
    <el-table-column
      prop="pit"
      :label="$t('page.saleIncentive.pit')"
    >
    </el-table-column>
    †
    <el-table-column
      :label="$t('page.saleIncentive.income')"
    >
      <template slot-scope="scope">
        <router-link
          v-if="scope.row.total"
          :to="{
            name: 'AccountSaleIncentiveDetail',
            query: {
              incentiveDate: incentiveDate,
              category: 'income',
              type: pageName
            }
          }"
        >
          {{ formatMoney(scope.row.income) }}
        </router-link>
        <span v-else>{{ formatMoney(scope.row.income) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="newContract"
      :label="$t('page.saleIncentive.new_contract')"
    >
      <template slot-scope="scope">
        <router-link
          v-if="scope.row.total"
          :to="{
            name: 'AccountSaleIncentiveDetail',
            query: {
              incentiveDate: incentiveDate,
              category: 'newContract',
              type: pageName
            }
          }"
        >
          {{ formatMoney(scope.row.newContract) }}
        </router-link>
        <span v-else>{{ formatMoney(scope.row.newContract) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="stamp"
      :label="$t('page.saleIncentive.stamp')"
    >
      <template slot-scope="scope">
        <router-link
          v-if="scope.row.total"
          :to="{
            name: 'AccountSaleIncentiveDetail',
            query: {
              incentiveDate: incentiveDate,
              category: 'stamp',
              type: pageName
            }
          }"
        >
          {{ formatMoney(scope.row.stamp) }}
        </router-link>
        <span v-else>{{ formatMoney(scope.row.stamp) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="hotelOwnPromotion"
      :label="$t('page.saleIncentive.hotel_promotion')"
    >
      <template slot-scope="scope">
        <router-link
          v-if="scope.row.total"
          :to="{
            name: 'AccountSaleIncentiveDetail',
            query: {
              incentiveDate: incentiveDate,
              category: 'hotelOwnPromotion',
              type: pageName
            }
          }"
        >
          {{ formatMoney(scope.row.hotelOwnPromotion) }}
        </router-link>
        <span v-else>{{ formatMoney(scope.row.hotelOwnPromotion) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="coPromotion"
      :label="$t('page.saleIncentive.co_promotion')"
    >
      <template slot-scope="scope">
        <router-link
          v-if="scope.row.total"
          :to="{
            name: 'AccountSaleIncentiveDetail',
            query: {
              incentiveDate: incentiveDate,
              category: 'coPromotion',
              type: pageName
            }
          }"
        >
          {{ formatMoney(scope.row.coPromotion) }}
        </router-link>
        <span v-else>{{ formatMoney(scope.row.coPromotion) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="newHotelCheckInAmount"
      :label="$t('page.saleIncentive.new_hotel_checkin_amount')"
    >
      <template slot-scope="scope">
        <router-link
          v-if="scope.row.total"
          :to="{
            name: 'AccountSaleIncentiveDetail',
            query: {
              incentiveDate: incentiveDate,
              category: 'newHotelCheckInAmount',
              type: pageName
            }
          }"
        >
          {{ formatMoney(scope.row.newHotelCheckInAmount) }}
        </router-link>
        <span v-else>{{ formatMoney(scope.row.newHotelCheckInAmount) }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'SalaIncentiveTable',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    pageName: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      incentiveDate: ''
    }
  },
  created () {
    this.incentiveDate = this.$route.query.incentiveDate ? this.formatDate(this.$route.query.incentiveDate, false) : this.formatDate(new Date(), false)
  },
  methods: {
    setCLassIndexColumn ({ row, column }) {
      if (row.total === true && column.type === 'index') {
        return 'hidden-index-column'
      }
    },
    setIndex (index) {
      return index
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .hidden-index-column {
  div {
    display: none;
  }
}
</style>
