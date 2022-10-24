<template>
  <sa-section>
    <template slot="header">
      <div>
        <el-input
          :placeholder="$t('placeholder.search')"
          v-model="filter.keyword"
          prefix-icon="el-icon-search"
          @input="handleSearch"
          style="width: 250px;"
          clearable
        />
        <el-select
          v-model="filter.category"
          style="margin: 0 16px; width: 250px;"
        >
          <el-option
            v-for="item in ui.categoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          v-model="filter.incentiveDate"
          @change="fetchSaleIncentiveHistoryDetails"
          :disabled="$route.query.type === 'details'"
        />
      </div>
    </template>
    <SaleIncentiveDetailTable
      v-loading="ui.loading"
      :saleIncentives="saleIncentives"
    />
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
import { fetchSaleIncentiveStaffs } from '../api'
import SaleIncentiveDetailTable from '../components/sale-incentive-details-table.vue'
import SaSection from '@/components/globals/SaSection.vue'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
export default {
  components: {
    SaSection,
    SaleIncentiveDetailTable
  },
  name: 'DetailsOfStaff',
  data: () => {
    return {
      filter: {
        staffSn: '',
        page: 1,
        limit: 10,
        keyword: '',
        incentiveDate: '',
        category: 0
      },
      ui: {
        loading: false,
        categoryOptions: [
          { label: 'All category', value: 0 },
          { label: 'New contract', value: 1 },
          { label: 'Stamp', value: 2 },
          { label: 'Hotel own promotion', value: 3 },
          { label: 'Co-promotion', value: 4 },
          { label: 'New hotel check in amount', value: 5 }
        ]
      },
      pagination: {
        perPage: 1,
        total: 0
      },
      saleIncentives: []
    }
  },
  created () {
    this.filter.incentiveDate = this.$route.query.incentiveDate ? this.formatDate(this.$route.query.incentiveDate, false) : this.formatDate(new Date(), false)
    this.filter.staffSn = this.$route.params.sn
    this.filter.keyword = this.$route.query.staffName || ''
    this.fetchSaleIncentiveHistoryDetails()
  },
  methods: {
    handleSearch: debounce(function () {
      this.fetchSaleIncentiveHistoryDetails()
    }, timeDebounce),
    async fetchSaleIncentiveHistoryDetails () {
      try {
        this.ui.loading = true
        const { data } = await fetchSaleIncentiveStaffs(this.filter)
        this.saleIncentives = data.data.saleIncentives
        const statistics = data.data.statistics
        statistics.total = true
        this.saleIncentives.unshift(statistics)
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchSaleIncentiveHistoryDetails()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchSaleIncentiveHistoryDetails()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
