<template>
  <sa-section>
    <div class="hote-debt-mgt__filters">
      <el-form :inline="true" :model="filter" class="demo-form-inline float-left">
        <el-form-item>
          <el-select
            :loading="ui.isLoadingHotel"
            v-model="ui.hotel"
            value-key="sn"
            element-loading-spinner="el-icon-loading"
            remote
            filterable
            prefix-icon="el-icon-search"
            clearable
            :placeholder="$t('page.hotelDisplay.hotelName')"
            :remote-method="searchSuggestionsHotels"
            @change="listHotetDebt"
          >
            <el-option
                v-for="(item, index) in hotels"
                :key="index"
                :label="`${item.name} - ${item.address}`"
                :value="{sn: item.sn,status: item.hotelStatus}"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-download" plain  @click="onExport">
            {{ $t('button.export') }}
          </el-button>
        </el-form-item>
      </el-form>
      <div class="float-right">
        <router-link
          class="el-button el-button--danger is-plain"
          :to="{name: 'hotelDebtCreate', query: {createType: 'debt'}}"
        >
          <i class="el-icon-plus" />
          {{ $t('page.hotelDebt.new_hotel_debt') }}
        </router-link>
        <router-link
          class="el-button el-button--danger is-plain"
          :to="{name: 'hotelDebtCreate', query: {createType: 'paid'}}"
        >
          <i class="el-icon-plus" />
          {{ $t('page.hotelDebt.new_hotel_paid') }}
        </router-link>
      </div>
    </div>
    <div class="hote-debt-mgt__table">
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
            <p v-if="scope.$index !== 0">
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
        <el-table-column
          :label="$t('page.hotelDebt.create_time')"
          :min-width="100"
        >
          <template slot-scope="scope">
            <p v-if="scope.$index !== 0">
              {{ formatMoney(scope.row.createTime) }}
            </p>
          </template>
        </el-table-column>
          <el-table-column
          :label="$t('page.hotelDebt.operation')"
          :min-width="100"
        >
          <template slot-scope="scope">
            <router-link
              v-if="scope.$index !== 0"
              :to="{name: 'hotelDebtDetailList', params: {sn: scope.row.hotelSn}}"
            >
              {{ $t('button.detail') }}
            </router-link>
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
import { listHotetDebt, onExportHotetDebt } from './api'
import { fetchSuggestionsHotels } from '@/api/hotels'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
const today = new Date()
export default {
  name: 'HotelDebt',
  components: {
    saSection
  },
  data () {
    return {
      filter: {
        limit: 10,
        page: 1,
        startDate: this.formatDate(
          new Date(today.getFullYear(), today.getMonth(), 1),
          false
        ),
        endDate: this.formatDate(
          new Date(today.getFullYear(), today.getMonth() + 1, 0),
          false
        )
      },
      pagination: {},
      ui: {
        isTableLoading: false,
        isLoadingHotel: false,
        hotel: {}
      },
      hotels: [],
      data: []
    }
  },
  computed: {
    dateRange: {
      get () {
        return [this.filter.startDate, this.filter.endDate]
      },
      set (val) {
        this.filter.startDate = val[0]
        this.filter.endDate = val[1]
      }
    }
  },
  created () {
    this.listHotetDebt()
  },

  methods: {
    async listHotetDebt () {
      this.ui.isTableLoading = true
      try {
        if (this.ui.hotel?.status === -1) {
          this.filter.hotelGroupSn = this.ui.hotel?.sn
        } else {
          this.filter.hotelSn = this.ui.hotel?.sn
        }
        const params = {
          ...this.filter
        }
        const { data } = await listHotetDebt(params)
        this.data = data.data.hotelDebts
        this.data.unshift(data.data.statistics)
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    searchSuggestionsHotels: debounce(function (keyword) {
      this.listSuggestionsHotels({
        limit: 10,
        keyword: keyword
      })
    }, timeDebounce),
    async listSuggestionsHotels (params) {
      this.ui.isLoadingHotel = true
      try {
        const { data } = await fetchSuggestionsHotels(params)
        this.hotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotel = false
      }
    },
    async onExport () {
      try {
        if (this.ui.hotel?.status === -1) {
          this.filter.hotelGroupSn = this.ui.hotel?.sn
        } else {
          this.filter.hotelSn = this.ui.hotel?.sn
        }
        const formData = {
          ...this.filter
        }
        await onExportHotetDebt(formData)
        this.$message({
          type: 'success',
          message: this.$t('message.exportSuccess')
        })
      } catch (error) {
        return false
      }
    },
    onSizeChange (size) {
      this.filter.limit = size
      if (
        Math.ceil(this.pagination.total / size) < this.pagination.currentPage
      ) {
        this.pagination.currentPage = Math.ceil(this.pagination.total / size)
      } // when curent page is larger than total page
      this.listHotetDebt()
    },
    onCurrentChange (currentPage) {
      this.filter.page = currentPage
      this.listHotetDebt()
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
.operations{
    padding: 8px 12px;
    display: flex;
    white-space: break-spaces;
}
</style>
