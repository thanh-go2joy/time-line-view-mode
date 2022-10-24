<template>
  <sa-section v-loading="ui.isLoading" class="mp-user">
    <div class="mp-user__header">
      <b>{{ $t('page.mileagePoint.earnedPoint') }}: <span class="text-danger">{{ statistics.mileageEarned }}</span></b>
      <b>{{ $t('page.mileagePoint.usedPoint') }}: <span class="text-danger">{{ statistics.mileageUsed }}</span></b>
      <b>{{ $t('page.mileagePoint.expiredPoint') }}: <span class="text-danger">{{ statistics.mileageExpired }}</span></b>
      <b>{{ $t('page.mileagePoint.effectivePoint') }}: <span class="text-danger">{{ statistics.mileageAmount }}</span></b>
    </div>
    <!-- -- el table -- -->
    <el-table
      :data="listMpUsers"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="20"
      />
      <el-table-column
        :label="$t('page.mileagePoint.mileageName')"
        min-width="180"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'pointListMgt', params: { sn: scope.row.sn } }">
            {{ scope.row.mileageName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.mileagePoint.type')"
        min-width="150"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.type === 1">{{ $t('page.mileagePoint.get') }}</p>
          <p v-else-if="scope.row.type === 2">{{ $t('page.mileagePoint.use') }}</p>
          <p v-else>{{ $t('page.mileagePoint.expired') }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.mileagePoint.hotelName')"
        min-width="100"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'hotelDisplayDetails', params: { sn: scope.row.hotelSn } }">
            {{ scope.row.hotelName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.mileagePoint.bookingNo')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.bookingNo }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.mileagePoint.numberOfPoints')"
        min-width="100"
      >
        <template slot-scope="scope">
          +{{ scope.row.numofPoint }}
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.mileagePoint.amount')"
        min-width="100"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.amount ? `${scope.row.amount} VND` : 0 }} </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.mileagePoint.expireTime')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.expiredDate) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.mileagePoint.createTime')"
        min-width="150"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.createTime) }}
        </template>
      </el-table-column>
    </el-table>
    <div class="paginate">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagination.perPage"
        :current-page="filter.page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { fetchPoints } from './api'

export default {
  name: 'MpUserMgt',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        isLoading: false,
        isLoadingMpSearch: false
      },
      listMpUsers: [],
      filter: {
        limit: 10,
        page: 1
      },
      pagination: {},
      MpUserOptions: [],
      statistics: {}
    }
  },
  created () {
    this.fetchPoints()
  },
  methods: {
    async fetchPoints () {
      this.ui.isLoading = true
      try {
        const { data } = await fetchPoints(this.$route.params.sn, this.filter)
        this.listMpUsers = data.data.mileageHistories
        this.pagination = data.data.meta
        this.statistics = data.data.statistics
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchPoints()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchPoints()
    }
  }
}
</script>

<style lang="scss" scoped>
  b {
    font-weight: bold;
  }
  .mp-user {
      &__header {
        display: flex;
        align-items: center;
        margin-bottom: 2em;
        gap: 2em;
        flex-wrap: wrap;
      }
  }
  .paginate {
    margin-top: 2em;
  }
</style>
