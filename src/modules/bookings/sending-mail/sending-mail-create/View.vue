<template>
  <sa-section v-if="$route.fullPath === '/hotel/sadmin/sending-mail-create'" class="sendingMail">
    <div class="sendingMail__header">
      <div class="sendingMail__header--search">
        <div class="pr-5">
          <el-select
            :loading="ui.isLoadingHotels"
            v-model="filter.hotelSn"
            element-loading-spinner="el-icon-loading"
            remote
            filterable
            clearable
            :placeholder="$t('placeholder.keyword')"
            :remote-method="reloadHotels"
            @change="fetchSendingMails"
            >
            <el-option
                v-for="(item, index) in hotels"
                :key="index"
                :label="`${item.name} - ${item.code}`"
                :value="item.sn"
            >
            </el-option>
          </el-select>
        </div>
        <div class="pr-5">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
          popper-class="custom-date-range"
            align="right"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :clearable="false"
            :start-placeholder="$t('placeholder.from')"
            :end-placeholder="$t('placeholder.to')">
          </el-date-picker>
        </div>
        <el-button
          type="primary"
          plain
          @click="sendMail"
          icon="el-icon-position"
        >
          {{ $t('button.sendMail') }}
        </el-button>
      </div>
    </div>
      <!-- -- el table -- -->
      <el-table
      v-loading="ui.isLoading"
      :data="listSendingMails"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="20"
      />
      <el-table-column
        :label="$t('page.sendingMail.hotelName')"
        min-width="180"
      >
        <template slot-scope="scope">
          <router-link
            :to="{ name: 'hotelDisplayDetails', params: { sn: scope.row.hotelSn }}"
          >
            {{ scope.row.hotelName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.sendingMail.code')"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.hotelCode }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.sendingMail.theBalance')"
        min-width="140"
      >
        <template slot-scope="scope">
            {{ scope.row.theBalance }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.sendingMail.currentDebtOtherDebt')"
        min-width="200"
      >
        <template slot-scope="scope">
          <p>{{ formatMoney(scope.row.currentDebt) }}</p>
          <p>{{ formatMoney(scope.row.otherDebt) }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.sendingMail.periodDebt')"
        min-width="140"
      >
        <template slot-scope="scope">
            {{ scope.row.periodDebt }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.sendingMail.expectedPayAmount')"
        min-width="160"
      >
        <template slot-scope="scope">
          <p>{{ formatMoney(scope.row.estimatedPaymentAmount) }}</p>
          <p>{{ formatMoney(scope.row.payAmount) }}</p>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer" class="paginate">
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
  <router-view v-else />
</template>
<script>
import { debounce } from '@/utils/helpers'
import SaSection from '@/components/globals/SaSection.vue'
import { fetchSendingMails, fetchHotels, sendMails } from './api'
import { repStatus } from '@/utils/const'
const timeDebounce = 500
const today = new Date()

export default {
  name: 'SendingMailCreate',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        isLoading: false,
        isLoadingHotels: false
      },
      listSendingMails: [],
      filter: {
        limit: 10,
        page: 1,
        hotelSn: '',
        dateFrom: this.formatDate(today, false),
        dateTo: this.formatDate(today, false)
      },
      pagination: {},
      hotels: []
    }
  },
  created () {
    this.fetchSendingMails()
    this.fetchHotels()
  },

  computed: {
    dateRange: {
      get () {
        return [this.filter.dateFrom, this.filter.dateTo]
      },
      set (val) {
        this.filter.dateFrom = val[0]
        this.filter.dateTo = val[1]
        this.fetchSendingMails()
      }
    }
  },
  watch: {
    dateRange (value) {
      if (!value) {
        delete this.filter.startDate
        delete this.filter.endDate
      } else {
        this.filter.dateFrom = value[0]
        this.filter.dateTo = value[1]
      }
    }
  },
  methods: {
    async fetchSendingMails () {
      this.ui.isLoading = true
      try {
        const { data } = await fetchSendingMails(this.filter)
        this.listSendingMails = data.data.sendMailList
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    async fetchHotels (keyword) {
      this.ui.isLoadingHotels = true
      try {
        const { data } = await fetchHotels({ keyword: keyword })
        this.hotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotels = false
      }
    },
    reloadHotels: debounce(function (keyword) {
      this.fetchHotels(keyword)
    }, timeDebounce),
    async sendMail () {
      try {
        const params = {
          hotelSn: this.filter.hotelSn,
          startDate: this.filter.dateFrom,
          endDate: this.filter.dateTo
        }
        const { data } = await sendMails(params)
        if (data?.code === repStatus.sussess) {
          this.$message({
            type: 'success',
            message: this.$t('message.sendSuccess')
          })
        }
      } catch (error) {
        return false
      }
    },
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchSendingMails()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchSendingMails()
    }
  }
}
</script>

<style lang="scss" scoped>
    .pr-5 {
      padding-right: 1em;
    }
    .sendingMail {
        &__button {
          text-align: right;
          margin: 10px;
        }
        &__wrap {
            a {
                color: #409eff;
                text-decoration: none;
            }
        }

        &__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2em;

          &--search {
            display: flex;
          }
        }
    }

    .paginate {
      margin-top: 2em;
    }
</style>
