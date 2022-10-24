<template>
  <sa-section v-if="$route.fullPath === '/hotel/sadmin/pgpb'" class="pgpb">
   <div class="pgpb__total">
      <b>{{ $t('page.pgpb.totalPay') }}: <span>{{ totalPay }}</span></b>
      <b>{{ $t('page.pgpb.totalNotPay') }}: <span>{{ totalNotPay }}</span></b>
    </div>
    <div class="pgpb__header">
      <div class="pgpb__header--search">
        <div>
          <el-select
            :loading="ui.isLoadingSales"
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
              :value="item.name"
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
        v-if="hasPermission('sasale', 'pExport')"
          type="success"
          plain
          @click="onExport"
          icon="el-icon-download"
        >
          {{ $t('button.export') }}
        </el-button>
      </div>
      <div class="pgpb__header--add">
        <el-button v-if="hasPermission('sasale', 'pModify')"
          type="warning"
          plain
          @click="handleCreate"
          icon="el-icon-plus"
        >
          {{ $t('button.add') }}
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
        :label="$t('page.pgpb.name')"
        min-width="80"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
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
        :label="$t('page.pgpb.code')"
        min-width="100"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.code }}</p>
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
        :label="$t('page.pgpb.email')"
        min-width="100"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.email }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.pgpb.birthday')"
        min-width="100"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.birthday }}</p>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.pgpb.address')"
        min-width="100"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.address }}</p>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.pgpb.totalOfIntroduction')"
        min-width="100"
      >
        <template slot-scope="scope">
          <router-link v-if="scope.row.totalInvite > 0" :to="{ path: '/hotel/sadmin/pgpb-total-of-introduction', query: { sn: scope.row.sn, startDate: filter.startDate, endDate: filter.endDate } }">
            <span>{{ scope.row.totalInvite }}</span>
            (
              <span class="text-danger">{{ scope.row.totalPay }}</span> +
              <span>{{ scope.row.totalNotPay }}</span>
            )
          </router-link>
          <p v-else>0</p>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.pgpb.hotelName')"
        min-width="100"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'hotelDisplayDetails', params: { sn: scope.row.hotelSn } }">
              {{ scope.row.hotelName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.operations')"
        align="center"
        min-width="100"
      >
        <template slot-scope="scope">
          <el-popover
            placement="left"
            trigger="click"
          >
            <i slot="reference" class="operations el-icon-more" />
            <div class="p-8-12">
            <el-button
              v-if="hasPermission('sasale', 'pModify')"
              type="success"
              plain
              size="small"
              @click="handleEdit(scope.row)"
              icon="el-icon-edit"
            >
              {{$t('button.edit')}}
            </el-button>

            <el-button
              v-if="hasPermission('sasale', 'pDelete') && scope.row.allTotalInvite == 0"
              type="danger"
              plain
              size="small"
              @click="handleDelete(scope.row)"
            >
              {{$t('button.delete')}}
            </el-button>
          </div>
          </el-popover>
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
  <router-view v-else />
</template>
<script>
import { debounce } from '@/utils/helpers'
import SaSection from '@/components/globals/SaSection.vue'
import { fetchPgpbs, exportPgpbs, deletePgpb } from './api'
const timeDebounce = 500

export default {
  name: 'Pgpb',
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
        keyword: '',
        startDate: '',
        endDate: ''
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
    async fetchPgpbs (keyword) {
      this.ui.isLoading = true
      try {
        this.filter.keyword = keyword
        const { data } = await fetchPgpbs(this.filter)
        this.listPgpbs = data.data.saleInfo
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
        this.filter.keyword = keyword
        const { data } = await fetchPgpbs(this.filter)
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
    handleCreate () {
      this.$router.push({ name: 'pgpbCreate' })
    },
    handleEdit (data) {
      this.$router.push({ name: 'pgpbEdit', params: { sn: data.sn } })
    },
    async handleDelete (data) {
      try {
        this.$confirm(`${this.$t('message.areYouSure')}`, `${this.$t('message.warning')}`, {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(async () => {
          await deletePgpb(data.sn)
          this.$message({
            type: 'success',
            message: this.$t('message.deleteSuccess')
          })
          this.fetchPgpbs()
        }).catch(error => {
          this.$message({
            type: 'info',
            message: error
          })
        })
      } catch (error) {
        return false
      }
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
  .operations {
    cursor: pointer;
    transform: rotate(90deg);
    &:hover {
      color: #ff6400;
    }
    @media (max-width: 1200px) {
        color: green;
    }
  }
  .p-8-12 {
    padding: 8px 12px;
  }
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
      &--add {
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
