<template>
  <sa-section v-if="$route.fullPath === '/hotel/sadmin/mp-user-mgt'" class="mp-user">
    <div class="mp-user__header">
      <div class="mp-user__header--search">
        <div>
          <el-select
            :loading="ui.isLoadingMpSearch"
            v-model="filter.keyword"
            element-loading-spinner="el-icon-loading"
            remote
            filterable
            clearable
            :placeholder="$t('breadcrumb.keyword')"
            :remote-method="reloadMpOptions"
            @change="searchMpUsers"
            >
            <el-option
              v-for="(item, index) in MpUserOptions"
              :key="index"
              :label="`${item.nickName}-${item.mobile}-${item.gender === 1 ? $t('gender.male') : $t('gender.female')}-${item.email}`"
              :value="item.nickName"
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
            @change="changeDateRange"
            :end-placeholder="$t('placeholder.endDate')">

          </el-date-picker>
        </div>
      </div>
    </div>
    <!-- -- el table -- -->
    <el-table
      v-loading="ui.isLoading"
      :data="listMpUsers"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="20"
      />
      <el-table-column
        :label="$t('page.mileagePoint.nickName')"
        min-width="180"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'pointListMgt', params: { sn: scope.row.sn } }">
              {{ scope.row.nickName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.mileagePoint.email')"
        min-width="150"
      >
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.mileagePoint.mobile')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.mileagePoint.effectivePoint')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.mileageEarned }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.mileagePoint.earnedPoint')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.mileageAmount }}
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.mileagePoint.usedPoint')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.mileageUsed }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.mileagePoint.expiredPoint')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.mileageExpired }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.mileagePoint.earnedFirstTime')"
        min-width="150"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.mileageFirstTime) }}
        </template>
      </el-table-column>
    </el-table>
    <div class="paginate">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40, 50]"
        :current-page="filter.page"
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
import { fetchMpUsers, fetchSuggestionsAppUsers } from './api'
const timeDebounce = 500

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
        page: 1,
        keyword: '',
        dateFrom: '',
        dateTo: ''
      },
      pagination: {},
      MpUserOptions: []
    }
  },
  computed: {
    dateRange: {
      get () {
        return [this.filter.dateFrom, this.filter.dateTo]
      },
      set (val) {
        if (!val) {
          this.filter.dateFrom = this.filter.dateTo = ''
        } else {
          this.filter.dateFrom = val[0]
          this.filter.dateTo = val[1]
        }
      }
    }
  },
  watch: {
    dateRange (value) {
      if (!value) {
        delete this.filter.dateFrom
        delete this.filter.dateTo
      } else {
        this.filter.dateFrom = value[0]
        this.filter.dateTo = value[1]
      }
    }
  },
  created () {
    this.fetchMpUsers()
    this.fetchSuggestionsAppUsers()
  },
  methods: {
    async fetchMpUsers () {
      this.ui.isLoading = true
      try {
        const { data } = await fetchMpUsers(this.filter)
        this.listMpUsers = data.data.appUserList
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    async fetchSuggestionsAppUsers (keyword) {
      this.ui.isLoadingMpSearch = true
      try {
        this.filter.keyword = keyword
        const { data } = await fetchSuggestionsAppUsers(this.filter)
        this.MpUserOptions = data.data.appUsers
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingMpSearch = false
      }
    },
    changeDateRange () {
      this.filter.page = 1
      this.fetchMpUsers()
    },
    searchMpUsers: debounce(function () {
      this.filter.page = 1
      this.fetchMpUsers()
    }, timeDebounce),
    reloadMpOptions: debounce(function (keyword) {
      this.fetchSuggestionsAppUsers(keyword)
    }, timeDebounce),
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchMpUsers()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchMpUsers()
    }
  }
}
</script>

<style lang="scss" scoped>
  .mp-user {
      &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2em;
        gap: 1em;

        &--search {
          display: flex;
          align-items: center;
          gap: 1em;
          flex-wrap: wrap;
        }
      }
  }
  .paginate {
    margin-top: 2em;
  }
</style>
