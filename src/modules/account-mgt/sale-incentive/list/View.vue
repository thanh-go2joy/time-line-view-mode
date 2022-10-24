<template>
  <sa-section>
    <template slot="header">
      <el-button
        type="warning"
        plain
        icon="el-icon-plus"
        style="float: right;"
        @click="$router.push({ name: 'SaleIncentiveHistoryCreate' })"
      >
        {{ $t('button.add') }}
      </el-button>
    </template>
    <el-table
      v-loading="ui.loading"
      :data="saleIncentiveHistories"
    >
      <el-table-column
        type="index"
        label="#"
      />
      <el-table-column
        prop="incentiveDate"
        :label="$t('page.saleIncentive.incentive_date')"
      >
      </el-table-column>
      <el-table-column
        prop="createdBy"
        :label="$t('page.saleIncentive.created_by')"
      >
        <template slot-scope="scope">
          {{ scope.row.createdBy.fullName }}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        :label="$t('page.saleIncentive.status')"
      >
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? 'Done' : 'Not yet' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        :label="$t('page.saleIncentive.created_time')"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="confirmTime"
        :label="$t('page.saleIncentive.confirmed_time')"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.confirmTime) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.firstBooking.operations')"
      >
        <template slot-scope="scope">
          <router-link
            :to="{ name: 'SaleIncentiveHistoryDetails', params: { sn: scope.row.sn }, query: { incentiveDate: scope.row.incentiveDate } }"
          >
            {{ $t('page.saleIncentive.details') }}
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagination.perPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </template>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { debounce } from '@/utils/helpers'
import { fetchSaleIncentiveHistories } from './api'
const timeDebounce = 500
export default {
  components: { SaSection },
  name: 'SaleIncentiveHistory',
  data: (vm) => {
    return {
      saleIncentiveHistories: [],
      filter: {},
      ui: {
        loading: false
      },
      pagination: {
        total: 0,
        perPage: 1
      }
    }
  },
  created () {
    this.fetchSaleIncentiveHistories()
  },
  methods: {
    handleSearch: debounce(function () {
      this.fetchSaleIncentiveHistories()
    }, timeDebounce),
    async fetchSaleIncentiveHistories () {
      try {
        this.ui.loading = true
        const { data } = await fetchSaleIncentiveHistories(this.filter)
        this.saleIncentiveHistories = data.data.saleIncentiveHistories
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    // pagination event
    handleSizeChange (value) {
      this.query.limit = value
      this.fetchFirstBookings(this.query)
    },
    handleCurrentChange (value) {
      this.query.page = value
      this.fetchFirstBookings(this.query)
    }
  }
}
</script>
