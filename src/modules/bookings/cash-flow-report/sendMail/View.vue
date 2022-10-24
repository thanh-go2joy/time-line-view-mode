<template>
  <sa-section>
    <div class="send-mail__filter">
      <el-form :inline="true" :model="filter" class="demo-form-inline">
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
          >
            <el-option
              v-for="(item, index) in hotels"
              :key="index"
              :label="`${item.name} - ${item.address}`"
              :value="{ sn: item.sn, status: item.hotelStatus }"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="dateRange"
            type="daterange"
          popper-class="custom-date-range"
            range-separator="-"
            :start-placeholder="$t('page.firstBooking.startDate')"
            :end-placeholder="$t('page.firstBooking.endDate')"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :clearable="false"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="default"
            icon="el-icon-search"
            plain
            @click="listSendMail"
          >
            {{ $t('button.search') }}
          </el-button>
          <el-button
            type="default"
            icon="el-icon-s-promotion"
            plain
            @click="onSendMail"
          >
            {{ $t('button.sendMail') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="send-mail__table">
      <div>
        <el-table :data="data" v-loading="ui.isTableLoading">
          <el-table-column label="#" type="index" />
          <el-table-column
            :label="$t('page.cashFlowReport.hotel_name')"
            :min-width="100"
          >
            <template slot-scope="scope">
              <router-link
                :to="{
                  name: 'hotelDisplayDetails',
                  params: { sn: scope.row.hotelSn }
                }"
              >
                {{ scope.row.hotelName }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            :min-width="100"
            :label="$t('page.cashFlowReport.code')"
          >
            <template slot-scope="scope">
              <p>
                {{ scope.row.hotelCode }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :min-width="100"
          >
            <template slot="header">
                <p> {{ this.$t('page.cashFlowReport.balance') }} </p>
                <p> {{ this.$t('page.cashFlowReport.receivable') }} </p>
                <p> {{ this.$t('page.cashFlowReport.payable') }} </p>
            </template>
            <template slot-scope="scope">
              <p>
                {{ formatMoney(scope.row.theBalance) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :min-width="100"
          >
            <template slot="header">
                <p> {{ this.$t('page.cashFlowReport.current_debt') }} </p>
                <p> {{ this.$t('page.cashFlowReport.other_debt') }} </p>
            </template>
            <template slot-scope="scope">
              <p>
                {{ formatMoney(scope.row.currentDebt) }}
              </p>
              <p>
                {{ formatMoney(scope.row.otherDebt) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :min-width="100"
            :label="$t('page.cashFlowReport.period_debt')"
          >
            <template slot-scope="scope">
              <p>
                {{ formatMoney(scope.row.periodDebt) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :min-width="120"
          >
            <template slot="header">
              <p> {{ this.$t('page.cashFlowReport.expected_pay') }} </p>
              <p> {{ this.$t('page.cashFlowReport.pay_amount') }} </p>
            </template>
            <template slot-scope="scope">
              <p>
                {{ formatMoney(scope.row.estimatedPaymentAmount) }}
              </p>
              <p>
                {{ formatMoney(scope.row.payAmount) }}
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
    </div>
  </sa-section>
</template>
<script>
import saSection from '@/components/globals/SaSection.vue'
import { listSendMail, onSendMail } from './api'
import { fetchSuggestionsHotels } from '@/api/hotels'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
export default {
  name: 'SendMail',
  components: {
    saSection
  },
  data () {
    return {
      filter: {
        limit: 10,
        page: 1,
        hotelSn: '',
        dateFrom: this.$route.params.startDate,
        dateTo: this.$route.params.endDate
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
        return [this.filter.dateFrom, this.filter.dateTo]
      },
      set (val) {
        this.filter.dateFrom = val[0]
        this.filter.dateTo = val[1]
      }
    }
  },
  created () {
    const params = { limit: 10, justHotel: 1 }
    this.listSendMail()
    this.listSuggestionsHotels(params)
  },

  methods: {
    async listSendMail () {
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
        const { data } = await listSendMail(params)
        if (data.data?.sendMailList.length > 0) {
          this.data = data.data.sendMailList
          this.pagination = data.data.meta
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    searchSuggestionsHotels: debounce(function (keyword) {
      this.listSuggestionsHotels({
        limit: 10,
        justHotel: 1,
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
    async onSendMail () {
      try {
        await onSendMail(this.filter)
      } catch (error) {
        return false
      }
    },
    onSizeChange (size) {
      this.filter.limit = size
      this.listSendMail()
    },
    onCurrentChange (currentPage) {
      this.filter.page = currentPage
      this.listSendMail()
    }
  }
}
</script>

<style lang="scss" scoped>
.blue-color {
  color: blue;
}
.purple-color {
  color: #800080;
}
.green-color {
  color: #008080;
}
</style>
