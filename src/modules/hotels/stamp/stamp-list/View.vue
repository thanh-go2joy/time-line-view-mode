<template>
  <sa-section class="stamp">
    <template slot="header">
      <div class="stamp__header">
        <div class="stamp__header--search">
          <div class="w-100">
            <el-select
              class="w-100"
              :loading="ui.isLoadingHotels"
              v-model="filter.hotelSn"
              element-loading-spinner="el-icon-loading"
              remote
              filterable
              clearable
              :placeholder="$t('page.hotelDisplay.hotelName')"
              :remote-method="reloadHotels"
              @change="fetchStamps"
              >
              <el-option
                  v-for="(item, index) in hotels"
                  :key="index"
                  :label="`${item.name} - ${item.address}`"
                  :value="item.sn"
              >
              </el-option>
            </el-select>
          </div>
          <el-button
            class="w-100"
            type="success"
            plain
            @click="handleExport"
            icon="el-icon-download"
          >
            {{ $t('button.export') }}
          </el-button>
        </div>
        <div class="stamp__header--add">
          <el-button
            type="warning"
            plain
            @click="handleCreate"
            icon="el-icon-plus"
          >
            {{ $t('button.add') }}
          </el-button>
        </div>
      </div>
    </template>
    <!-- -- el table -- -->
    <el-table
      v-loading="ui.isLoading"
      :data="listStamps"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="20"
      />
      <el-table-column
        :label="$t('page.stamp.hotelName')"
        min-width="150"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'stampDetails', params: { sn: scope.row.sn } }">
              {{ scope.row.hotelName }}
          </router-link>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.stamp.stampsToRedeem')"
        min-width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.numToRedeem }}
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.stamp.redeemValue')"
        min-width="160"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.redeemType != 1">{{ `${scope.row.redeemValue}% - ${formatMoney(scope.row.maxRedeem)} VNĐ` }}</p>
          <p v-else>{{ `${formatMoney(scope.row.redeemValue)} VNĐ` }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.stamp.numberOfUsers')"
        min-width="200"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'stampDetailTotalUser', params: { sn: scope.row.hotelSn } }">
            {{ scope.row.numUserJoin }}
          </router-link>
            (
            <span v-for="(span,index) in scope.row.reportUserList"
            :key="index">
                <router-link :to="{ name: 'stampDetailTotalUser', params: { sn: scope.row.hotelSn, stampSn: index+1 } }">
                  {{ span }}
                </router-link>
            </span>
            )
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.stamp.totalRedemption')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.totalRedeem }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.stamp.startDate')"
        min-width="120"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.startDate, false) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.stamp.lastUpdate')"
        min-width="110"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.lastUpdate, false) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.stamp.status')"
        min-width="100"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.status2 != 1">{{$t('page.stamp.ended')}}</p>
          <p v-else>{{ $t('page.stamp.available') }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.stamp.endDate')"
        min-width="120"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.endDate, false) }}
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
              v-if="hasPermission('sastamp', 'pModify') && scope.row.status2 !== 0"
              type="success"
              size="small"
              plain
              @click="handleEdit(scope.row)"
              icon="el-icon-edit"
            >
              {{$t('button.edit')}}
            </el-button>

            <el-button
              v-if="hasPermission('sastamp', 'pExport')"
              type="primary"
              plain
              size="small"
              icon="el-icon-download"
              @click="handleExportPerData(scope.row)"
            >
              {{$t('button.export')}}
            </el-button>
          </div>
          </el-popover>
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
import { fetchStamps, exportStamps } from './api'
import { fetchSuggestionsHotels } from '@/api/hotels'
import { debounce, scrollToTop } from '@/utils/helpers'
const timeDebounce = 500

export default {
  name: 'stamp',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        isLoading: false,
        isLoadingHotels: false
      },
      listStamps: [],
      filter: {
        limit: 10,
        page: 1,
        hotelSn: ''
      },
      pagination: {},
      hotels: []
    }
  },
  created () {
    this.getHotels()
    this.fetchStamps()
  },
  methods: {
    async getHotels (keyword) {
      this.ui.isLoadingHotels = true
      try {
        const params = { keyword: keyword || '', justHotel: 1 }
        const { data } = await fetchSuggestionsHotels(params)
        this.hotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotels = false
      }
    },
    reloadHotels: debounce(function (keyword) {
      this.getHotels(keyword)
    }, timeDebounce),
    async fetchStamps () {
      this.ui.isLoading = true
      try {
        const { data } = await fetchStamps(this.filter)
        this.listStamps = data.data.registerStamps
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        scrollToTop('.section__header')
        this.ui.isLoading = false
      }
    },
    async handleExport () {
      try {
        await exportStamps()
        this.$message({
          type: 'success',
          message: this.$t('message.exportSuccess')
        })
      } catch (error) {
        return false
      }
    },
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchStamps()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchStamps()
    },

    handleCreate () {
      this.$router.push({ name: 'stampCreate' })
    },
    handleEdit (data) {
      this.$router.push({ name: 'stampEdit', params: { sn: data.sn } })
    },
    async handleExportPerData (data) {
      try {
        await exportStamps({ hotelSn: data.hotelSn })
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
  .stamp {
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
      flex-wrap: wrap;
      gap: 1em;
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
      &--account {
        display: flex;
        gap: 2em;
        flex-wrap: wrap;
      }
    }
    .el-button {
      margin-left: unset;
    }

    @media (max-width: 768px) {
      .w-100 {
        width: 100%;
      }
    }
  }
</style>
