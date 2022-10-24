<template>
  <sa-section>
    <div class="review-hotel-debt___operation float-right">
        <router-link
          class="el-button el-button--danger is-plain"
          :to="{name: 'hotelDebt'}"
        >
          {{ $t('button.list') }}
        </router-link>
    </div>
    <div
      class="review-hotel-debt__table"
    >
      <el-table
      :data="data"
      v-loading="ui.isTableLoading"
      >
        <el-table-column label="#" type="index" :index="indexMethod"/>
        <el-table-column
          :label="$t('page.hotelDebt.hotel_name')"
          :min-width="100"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.hotel">
              {{ scope.row.hotel.name }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelDebt.current_debt')"
          :min-width="100"
        >
          <template slot-scope="scope">
            <p v-if="scope.$index !== 0">
              {{ formatMoney(scope.row.currentDebt) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelDebt.period_debt')"
          :min-width="100"
        >
          <template slot-scope="scope">
            <p v-if="scope.$index !== 0">
              {{ formatMoney(scope.row.periodDebt) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelDebt.period_debt_time')"
          :min-width="200"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.startDate">
              {{ scope.row.startDate }} ~
              {{ scope.row.endDate }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelDebt.pay_date')"
          :min-width="100"
        >
          <template slot-scope="scope">
            <p>
              {{ scope.row.payDate }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelDebt.other_debt')"
          :min-width="100"
        >
          <template slot-scope="scope">
            <p v-if="scope.$index !== 0">
              {{ formatMoney(scope.row.otherDebt) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelDebt.pay_amount')"
          :min-width="100"
        >
          <template slot-scope="scope">
            <p  v-if="scope.$index !== 0">
              {{ formatMoney(scope.row.payAmount) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelDebt.balance')"
          :min-width="100"
        >
          <template slot-scope="scope">
            <p>
              {{ formatMoney(scope.row.balance) }}
            </p>
          </template>
        </el-table-column>
      </el-table>
      <template slot="footer">
        <el-pagination
          @size-change="onSizeChange"
          @current-change="onCurrentChange"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pagination.perPage"
          :current-page="filter.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        />
      </template>
    </div>
  </sa-section>
</template>
<script>
import saSection from '@/components/globals/SaSection.vue'
import { listReviewHoteldebt } from './api'

export default {
  name: 'ReviewHotelDebt',
  components: {
    saSection
  },
  data () {
    return {
      data: [],
      pagination: {},
      filter: {
        page: 1,
        limit: 10
      },
      ui: {
        isTableLoading: false
      }
    }
  },
  computed: {
  },
  created () {
    this.listReviewHoteldebt()
  },

  methods: {
    async listReviewHoteldebt () {
      try {
        this.ui.isTableLoading = true
        const formData = new FormData()
        formData.append('hotelSnList', JSON.stringify(this.$route.query.array_hotel))
        const { data } = await listReviewHoteldebt(formData)
        if (data.data.hotelDebts.length > 0) {
          this.data = data.data.hotelDebts
          this.data.unshift(data.data.statistics)
        }
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    onSizeChange (size) {
      this.filter.limit = size
      this.listReviewHoteldebt()
    },
    onCurrentChange (currentPage) {
      this.filter.page = currentPage
      this.listReviewHoteldebt()
    },
    indexMethod (index) {
      if (index === 0) {
        return ''
      } else {
        return index
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
