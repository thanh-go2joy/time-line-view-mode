<template>
  <sa-section>
    <template slot="header">
      <el-form
        :inline="true"
        :model="filter"
        class="demo-form-inline float-left"
      >
        <el-form-item>
          <el-input
            :placeholder="$t('placeholder.search')"
            v-model="filter.keyword"
            prefix-icon="el-icon-search"
            @input="handleSearch"
            style="width: 300px;"
          />
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="filter.incentiveDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="fetchSaleIncentiveHistoryDetails"
          />
        </el-form-item>
        <el-button
          type="success"
          icon="el-icon-download"
          plain
          :loading="ui.exportLoading"
          @click="exportSaleIncentive"
        >
          {{ $t('button.export') }}
        </el-button>
      </el-form>
      <el-button
        type="danger"
        plain
        class="header__save"
        @click="saveSaleIncentiveHistory"
      >
        {{ $t('button.save') }}
      </el-button>
    </template>
    <sale-incentive-table
      v-loading="ui.loading"
      :data="saleIncentiveHistoryDetails"
      pageName="create"
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
import SaSection from '../../../../components/globals/SaSection.vue'
import { fetchSaleIncentiveHistoryDetails, exportsSaleIncentiveHistoryDetails } from '../api'
import { saveSaleIncentiveHistory } from './api'
import SaleIncentiveTable from '../components/sale-incentive-table.vue'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
export default {
  name: 'SaleIncentiveHistoryCreate',
  components: { SaSection, SaleIncentiveTable },
  data: (vm) => {
    return {
      filter: {
        page: 1,
        limit: 10,
        keyword: '',
        incentiveDate: ''
      },
      ui: {
        loading: false,
        exportLoading: false
      },
      pagination: {
        perPage: 1,
        total: 0
      },
      saleIncentiveHistoryDetails: []
    }
  },
  created () {
    this.filter.incentiveDate = this.formatDate(new Date(), false)
    this.fetchSaleIncentiveHistoryDetails()
  },
  methods: {
    handleSearch: debounce(function () {
      this.fetchSaleIncentiveHistoryDetails()
    }, timeDebounce),
    async fetchSaleIncentiveHistoryDetails () {
      try {
        this.ui.loading = true
        const { data } = await fetchSaleIncentiveHistoryDetails(this.filter)
        this.saleIncentiveHistoryDetails = data.data.saleIncentiveHistoryDetails
        const statistics = data.data.statistics
        statistics.total = true
        this.saleIncentiveHistoryDetails.unshift(statistics)
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    async exportSaleIncentive () {
      this.ui.exportLoading = true
      try {
        await exportsSaleIncentiveHistoryDetails({ incentiveDate: this.filter.incentiveDate })
        const message = this.$t('message.exportSuccess')
        this.$message({
          type: 'success',
          message: message
        })
      } catch (error) {
        return false
      } finally {
        this.ui.exportLoading = false
      }
    },
    async saveSaleIncentiveHistory () {
      this.ui.loading = true
      try {
        await saveSaleIncentiveHistory({ incentiveDate: this.filter.incentiveDate })
        const message = this.$t('message.saveSuccess')
        this.$message({
          type: 'success',
          message: message
        })
        this.$router.push({ name: 'SaleIncentiveHistory' })
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
.header__save {
  float: right;
  @media (max-width: 425px) {
    float: left;
  }
}
</style>
