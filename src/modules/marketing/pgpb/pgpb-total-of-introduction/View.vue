<template>
  <sa-section class="pgpb">
    <div class="pgpb__total">
      <b>{{ $t('page.pgpb.totalPay') }}: <span>{{ totalPay }}</span></b>
      <b>{{ $t('page.pgpb.totalNotPay') }}: <span>{{ totalNotPay }}</span></b>
    </div>
    <div class="pgpb__header">
      <div class="pgpb__header--search">
        <div>
          <el-select
            v-loading="ui.isLoadingSales"
            v-model="filter.keyword"
            element-loading-spinner="el-icon-loading"
            remote
            filterable
            clearable
            :placeholder="$t('page.pgpb.saleInfomation')"
            :remote-method="reloadSaleOptions"
            @change="reloadPgpbs"
            >
            <el-option
              v-for="(item, index) in saleOptions"
              :key="index"
              :label="`${item.name} - ${item.mobile}`"
              :value="item.sn"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <el-date-picker
            v-model="dateRange"
            type="daterange"
          popper-class="custom-date-range"
            align="right"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :start-placeholder="$t('placeholder.startDate')"
            :end-placeholder="$t('placeholder.endDate')">
          </el-date-picker>
        </div>
        <el-button
          type="success"
          plain
          @click="onExport"
          icon="el-icon-download"
        >
          {{ $t('button.export') }}
        </el-button>
      </div>
    </div>
    <el-table
      v-loading="ui.isLoading"
      :data="listPgpbs"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="20"
      />
      <el-table-column
        :label="$t('page.pgpb.nickName')"
        min-width="80"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'userDetails', params: { sn: scope.row.sn } }">
            {{ scope.row.nickName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.pgpb.mobile')"
        min-width="100"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.mobile }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.pgpb.email')"
        min-width="100"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.email }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.pgpb.gender')"
        min-width="100"
      >
        <template slot-scope="scope">
         <p>{{ scope.row.gender === 1 ? $t('gender.male') : $t('gender.female') }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.pgpb.loginBy')"
        min-width="100"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.viaApp === 1">Manual</p>
          <p v-else-if="scope.row.viaApp === 2">Facebook</p>
          <p v-else-if="scope.row.viaApp === 3">Google</p>
          <p v-else-if="scope.row.viaApp === 4">Apple</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.pgpb.registerTime')"
        min-width="100"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.lastUpdate }}</p>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.pgpb.registerAddress')"
        min-width="100"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.registerAddress }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.pgpb.mobileId')"
        min-width="100"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.mobileUserId }}</p>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.pgpb.os')"
        min-width="100"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.os === 1">Ios</p>
          <p v-else>Android</p>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.pgpb.pay')"
        min-width="100"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.pay === 0">{{ $t('option.no') }}</p>
          <p v-else>{{ $t('option.yes') }}</p>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginate">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagination.perPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>
  </sa-section>
</template>
<script>
import { debounce } from '@/utils/helpers'
import SaSection from '@/components/globals/SaSection.vue'
import { fetchSales, fetchPgpbs, exportPgpbs } from './api'
const timeDebounce = 500

export default {
  name: 'PgpbTotalOfIntroduction',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        isLoading: false,
        isLoadingSales: false
      },
      listPgpbs: [],
      filter: {
        limit: 10,
        page: 1,
        keyword: this.$route.query.sn ? this.$route.query.sn : '',
        startDate: this.$route.query.startDate ? this.$route.query.startDate : '',
        endDate: this.$route.query.endDate ? this.$route.query.endDate : '',
        saleInfoSn: this.$route.query.sn ? this.$route.query.sn : ''
      },
      pagination: {},
      saleOptions: [],
      totalPay: 0,
      totalNotPay: 0
    }
  },
  created () {
    this.fetchPgpbs()
    this.fetchSales()
  },
  computed: {
    dateRange: {
      get () {
        return [this.filter.startDate, this.filter.endDate]
      },
      set (val) {
        if (!val) {
          this.filter.startDate = this.filter.endDate = ''
        } else {
          this.filter.startDate = val[0]
          this.filter.endDate = val[1]
        }
      }
    }
  },
  watch: {
    dateRange (value) {
      if (!value) {
        delete this.filter.startDate
        delete this.filter.endDate
      } else {
        this.filter.startDate = value[0]
        this.filter.endDate = value[1]
      }
      this.fetchPgpbs()
    }
  },
  methods: {
    async fetchPgpbs () {
      this.ui.isLoading = true
      try {
        const { data } = await fetchPgpbs(this.$route.query.sn, this.filter)
        this.listPgpbs = data.data.saleInviteList
        this.pagination = data.data.meta
        this.totalPay = data.data.statistics.totalPay
        this.totalNotPay = data.data.statistics.totalNotPay
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    async fetchSales (keyword) {
      this.ui.isLoadingSales = true
      try {
        this.filter.keyword = keyword || Number(this.$route.query.sn)
        const { data } = await fetchSales({ keyword: typeof this.filter.keyword !== 'number' ? this.filter.keyword : '' })
        this.saleOptions = data.data.saleInfo
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingSales = false
      }
    },
    reloadPgpbs: debounce(function (keyword) {
      this.filter.page = 1
      this.fetchPgpbs(keyword)
    }, timeDebounce),
    reloadSaleOptions: debounce(function (keyword) {
      this.fetchSales(keyword)
    }, timeDebounce),
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchPgpbs()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchPgpbs()
    },
    async onExport () {
      try {
        await exportPgpbs(this.filter)
        this.$message({
          type: 'success',
          message: this.$t('message.exportSuccess')
        })
      } catch (error) {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .text-danger {
    color: red;
  }
  .pgpb {
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
    &__total {
      display: flex;
      align-items: center;
      gap: 1em;
      flex-wrap: wrap;
      margin-bottom: 1em;
      b {
        font-weight: bold;
      }
      span {
        color: red;
      }
    }
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1em;
      margin-bottom: 2em;
      &--search {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
      }
    }
    .el-button {
      margin-left: unset;
    }
  }
  .paginate {
    margin-top: 2em;
  }
</style>
