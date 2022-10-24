<template>
  <sa-section>
    <template slot="header" class="activities-segment__filter">
      <el-form
        :inline="true"
        :model="filter"
        class="demo-form-inline float-left"
      >
        <el-form-item>
          <el-input
            :placeholder="$t(`page.activities.placeholder`)"
            v-model="filter.keyword"
            clearable
            prefix-icon="el-icon-search"
            @input="handleSearch"
          />
        </el-form-item>
        <el-form-item>
          <el-select
          v-model="filter.type"
          @change="changeType"
          placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="$t(`page.activities.${item.label}`)"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </template>
    <el-table
      v-loading="ui.loadingActivities"
      :data="tableData"
      class="activities-segment__table"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="20"
      />
      <el-table-column
        :label="$t('page.activities.title')"
        min-width="100"
      >
        <template slot-scope="scope">
          <router-link
            :to="{ name: 'activities_detail', params: { id: scope.row.sn }}"
          >
            {{ scope.row.title }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.activities.type')"
        min-width="80"
      >
        <template slot-scope="scope">
          <span>
            {{ getTypeActivities(scope.row.type) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.activities.request_by')"
        min-width="80"
      >
        <template slot-scope="scope">
          <span >{{ scope.row.requestStaffName }}</span>&ensp;
          <span >{{ formatDate(scope.row.requestTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.activities.last_confirm_staff')"
        min-width="80"
      >
        <template slot-scope="scope">
          <span> {{ scope.row.confirmStaffName }}</span>&ensp;
          <span >{{ scope.row.confirmTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.activities.status')"
        min-width="80"
      >
        <template slot-scope="scope">
          <span>{{ getStatusActivities(scope.row.status) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.activities.operations')"
        align="center"
        min-width="50"
      >
        <template slot-scope="scope">
          <el-popover
            placement="left"
            trigger="click" v-if="scope.row.status === 1 && scope.row.allowConfirm === 1 && scope.row.ignoreConfirm == 0"
          >
            <i slot="reference" class="operations el-icon-more" />
            <div style="padding: 8px 12px;">
              <el-button
                v-if="scope.row.status === 1 && scope.row.allowConfirm === 1 && scope.row.ignoreConfirm == 0"
                type="success"
                plain
                size="small"
                icon="el-icon-edit"
                @click="onConfirmActivities(scope.row.sn)"
              >
                {{ $t('page.activities.confirm')}}
              </el-button>
              <el-button v-if="scope.row.status === 1 && scope.row.allowConfirm === 1 && scope.row.ignoreConfirm == 0"
                type="danger"
                plain
                size="small"
                icon="el-icon-delete"
                @click="onWithdrawActivities(scope.row.sn)"
              >
                {{ $t('page.activities.delete')}}
              </el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer" class="activities-segment__footer">
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
// @ is an alias to /src
import { debounce } from '@/utils/helpers'
import { fetchActivities, postConfirmActivitiList, postWithdrawActivitiList } from './api'
import SaSection from '@/components/globals/SaSection.vue'

const timeDebounce = 500
export default {
  name: 'ActivitiesMgt',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        loadingActivities: false
      },
      pagination: {},
      filter: {
        limit: 10,
        page: 1,
        keyword: '',
        type: 0
      },
      options: [
        { label: 'all_types', value: 0 },
        { label: 'transfer_booking', value: 4 },
        { label: 'promotion', value: 1 },
        { label: 'product', value: 3 },
        { label: 'invite_friend', value: 2 }],
      tableData: []
    }
  },
  created () {
    this.fetchActivities(this.filter)
  },
  methods: {
    async fetchActivities (params) {
      this.ui.loadingActivities = true
      try {
        const { data } = await fetchActivities(params)
        this.tableData = data.data.activities
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loadingActivities = false
      }
    }, // getListReview
    handleSearch: debounce(function () {
      this.fetchActivities(this.filter)
    }, timeDebounce),
    getTypeActivities (type) {
      switch (type) {
        case 0:
          return this.$t('page.activities.all_types')
        case 1:
          return this.$t('page.activities.promotion')
        case 2:
          return this.$t('page.activities.invite_friend')
        case 3:
          return this.$t('page.activities.product')
        case 4:
          return this.$t('page.activities.transfer_booking')
        default:
          return ''
      }
    }, // getTypeActivities

    getStatusActivities (status) {
      switch (status) {
        case 1:
          return this.$t('page.activities.waiting')
        case 2:
          return this.$t('page.activities.confirmed')
        case 3:
          return this.$t('page.activities.rejected')
        default:
          return ''
      }
    }, // getStatusActivities

    async onConfirmActivities (id) {
      this.$confirm(`${this.$t('page.activities.confirm_message_alert')}`, `${this.$t('page.activities.confirmed')}`, {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        this.ui.loadingActivities = true
        try {
          await postConfirmActivitiList(id)
          this.$message({
            type: 'success',
            message: `${this.$t('page.activities.confirm_success')}`
          })
          this.fetchActivities(this.filter)
        } catch (error) {
          return false
        } finally {
          this.ui.loadingActivities = false
        }
      }).catch(error => {
        this.ui.loadingActivities = false
        this.$message({
          type: 'error',
          message: error.response ? error.response.data.message : error
        })
      })
    }, // onConfirmActivities

    async onWithdrawActivities (id) {
      this.$confirm(`${this.$t('page.activities.withdrawn_message_alert')}`, `${this.$t('page.activities.withdrawn')}`, {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        this.ui.loadingActivities = true
        try {
          await postWithdrawActivitiList(id)
          this.$message({
            type: 'success',
            message: `${this.$t('page.activities.withdrawn_success')}`
          })
          this.fetchActivities(this.filter)
        } catch (error) {
          return false
        } finally {
          this.ui.loadingActivities = false
        }
      }).catch(error => {
        this.ui.loadingActivities = false
        this.$message({
          type: 'error',
          message: error.response ? error.response.data.message : error
        })
      })
    }, // onWithdrawActivities
    handleSizeChange (value) {
      // this.pagination.perPage = value
      this.filter.limit = value
      this.fetchActivities(this.filter)
    },
    changeType (value) {
      this.filter.type = value
      this.fetchActivities(this.filter)
    },
    handleCurrentChange (value) {
      // this.pagination.currentPage = value
      this.filter.page = value
      this.fetchActivities(this.filter)
    },
    tableRowClassName ({ row, rowIndex }) {
      if ((row.status === 2 || row.status === 1) && row.seen === 0) {
        return 'custom-style-background-fce5e5'
      } else {
        return ''
      }
    }
  }
}
</script>
<style>
.custom-style-background-fce5e5{
  background-color: #fce5e5 !important;
}
</style>
<style lang="scss" scoped>
.operations {
  cursor: pointer;
  transform: rotate(90deg);
  &:hover {
    color: #ff6400;
  }
}

.activities-segment{
    min-height: calc(100vh - 150px );
    background-color: #ffffff;
    padding: 30px;

  .el-table {
    td {
      font-size: 12px;
    }

  }
  &__header {
    margin-bottom: 20px;
    &--red {
      color: #F56C6C;
    }
  }
  &__footer {
    margin-top: 30px  ;
  }
  &__filter {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    .el-input {
      width: 300px;
    }
    .el-input--suffix {
      margin: 0 12px;
    }
  }
}

@media (max-width: 1200px) {
  .operations {
    color: green;
  }
}
</style>
