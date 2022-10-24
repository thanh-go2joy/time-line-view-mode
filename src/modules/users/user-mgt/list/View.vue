<template>
  <sa-section class="user-mgt">
    <template slot="header" class="user-mgt__filter">
       <div
        class="user-mgt__header"
      >
        {{ $t('page.userMgt.static')}}:
        <span class="user-mgt__header--red"> {{ userStatistics.totalAccount }} </span> ( iOS:
        <span class="user-mgt__header--red">{{ userStatistics.totalIOS }} </span>
        <span>[{{ userStatistics.totalIOSDelete }}]</span> - Android:
        <span class="user-mgt__header--red">{{ userStatistics.totalAndroid }} </span>
        <span>[{{ userStatistics.totalAndroidDelete }}]</span>- Web:
        <span class="user-mgt__header--red">{{ userStatistics.totalWeb }} </span>
        <span>[{{ userStatistics.totalWebDelete }}]</span> )
        {{ $t('page.userMgt.mobile_devices')}}:
        <router-link to="/hotel/sadmin/devices">
          {{ deviceStatistics.total }}
        </router-link>
        ({{ $t('page.userMgt.mobile_devices')}} iOS:
        <span class="user-mgt__header--red">{{ deviceStatistics.iOS }}</span> - {{ $t('page.userMgt.mobile_devices')}} Android:
        <span class="user-mgt__header--red">{{ deviceStatistics.android }} </span> - {{ $t('page.userMgt.mobile_devices_open')}} Web:
        <span class="user-mgt__header--red">{{ deviceStatistics.web }}</span>)
      </div>
      <el-form
        :inline="true"
        :model="filter"
        class="demo-form-inline float-left"
      >
        <el-form-item>
          <el-input
            v-model="filter.keyword"
            :placeholder="$t('page.userMgt.keyword')"
            clearable
            prefix-icon="el-icon-search"
            @input="handleSearch"
          />
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="dateRange"
            type="daterange"
          popper-class="custom-date-range"
            range-separator="-"
            :start-placeholder="$t('page.userMgt.startDate')"
            :end-placeholder="$t('page.userMgt.endDate')"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
          <el-button
            type="success"
            plain
            icon="el-icon-download"
            @click="exportUsers"
          >
            {{ $t('button.export') }}
          </el-button>
      </el-form>
    </template>
    <el-table
      v-loading="ui.loadingUsers"
      :data="listUsers"
      class="user-mgt__table"
    >
      <el-table-column
        type="index"
        label="#"
         min-width="50"
      />
      <el-table-column
        :label="$t('page.userMgt.nickName')"
        min-width="120"
      >
        <template slot-scope="scope">
          <router-link
            :to="{ name: 'userDetails', params: { sn: scope.row.sn }}"
          >
            {{ scope.row.nickName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.gender')"
        min-width="80"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.gender === 1">
            {{ $t('page.userMgt.male') }}
          </span>
          <span v-else-if="scope.row.gender === 2">
            {{ $t('page.userMgt.female') }}
          </span>
          <span v-else>
            {{ $t('page.userMgt.gender_none') }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="birthday"
        :label="$t('page.userMgt.birthday')"
        min-width="100"
      />
      <el-table-column
        prop="email"
        :label="$t('page.userMgt.email')"
        min-width="180"
      />
      <el-table-column
        prop="mobile"
        :label="$t('page.userMgt.mobile')"
        min-width="120"
      />
      <el-table-column
        :label="$t('page.userMgt.firstProvinceName')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.firstProvinceName }}
        </template>
      </el-table-column>
      <el-table-column
        prop="source"
        :label="$t('page.userMgt.source')"
        min-width="90"
      />
      <el-table-column
        :label="$t('page.userMgt.viaApp')"
        min-width="90"
      >
        <template slot-scope="scope">
          {{ setLoginBy(scope.row.viaApp) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.point')"
        min-width="80"
      >
        <template slot-scope="scope">
          <router-link
            v-if="scope.row.mileageAmount !== 0"
            :to="{ name: 'pointListMgt', params: { sn: scope.row.mileageAmount }}">
            {{ scope.row.mileageAmount }}
          </router-link>
          <span v-else>
            {{ scope.row.mileageAmount }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.registerTime')"
         min-width="160"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.registerTime) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.numOpenApp')"
         min-width="60"
      >
        <template slot-scope="scope">
          {{ scope.row.numOpenApp }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.lastOpenApp')"
         min-width="160"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.lastOpenApp) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.status')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.status === 1 ?  $t('page.userMgt.yes') : $t('page.userMgt.disable')}}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.operations')"
        align="center"
        min-width="80"
      >
        <template slot-scope="scope">
          <el-popover
            placement="left"
            trigger="click"
          >
            <i slot="reference" class="operations el-icon-more" />
            <div style="padding: 8px 12px;">
              <el-button
                v-if="hasPermission('sauser', 'pModify')"
                type="success"
                plain
                size="small"
                icon="el-icon-edit"
                @click="onDirectEdit(scope.row.sn)"
              >
                {{ $t('page.userMgt.edit') }}
              </el-button>
              <el-button
                v-if="hasPermission('sauser', 'pDelete') && scope.row.status === 1"
                type="danger"
                plain
                size="small"
                icon="el-icon-delete"
                @click="deleteUser(scope.row.sn)"
              >
                {{ $t('page.userMgt.delete') }}
              </el-button>
              <el-button
                v-if="hasPermission('sauser', 'pModify') && scope.row.status !== 1"
                type="primary"
                plain
                size="small"
                @click="openUser(scope.row.sn)"
              >
                {{ $t('page.userMgt.open') }}
              </el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div class="user-mgt__footer">
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
import { fetchUsers, exportUsers, deleteUser, openUser } from './api'
import { debounce } from '@/utils/helpers'
import mixins from '../mixins'
import SaSection from '@/components/globals/SaSection.vue'
import { repStatus } from '@/utils/const'

const timeDebounce = 500
export default {
  components: { SaSection },
  name: 'UserMgt',
  mixins: [mixins],
  data: () => {
    return {
      pagination: {},
      listUsers: [],
      userStatistics: {},
      deviceStatistics: {},
      dateRange: '',
      filter: {
        limit: 10,
        keyword: '',
        startDate: '',
        endDate: ''
      },
      ui: {
        loadingUsers: false
      }
    }
  },
  created () {
    this.fetchUsers()
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
      this.fetchUsers()
    }
  },
  methods: {
    async fetchUsers () {
      this.ui.loadingUsers = true
      try {
        const { data } = await fetchUsers(this.filter)
        this.listUsers = data.data.appUsers
        this.userStatistics = data.data.statistics.userStatistics
        this.deviceStatistics = data.data.statistics.deviceStatistics
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loadingUsers = false
      }
    },
    handleSearch: debounce(function () {
      this.fetchUsers()
    }, timeDebounce),
    async exportUsers () {
      const filter = {
        startDate: this.filter.startDate,
        endDate: this.filter.endDate
      }
      try {
        const { data } = await exportUsers(filter)
        if (data?.code === repStatus.sussess) {
          const message = this.$t('page.userMgt.export_success')
          this.$message({
            type: 'success',
            message: message
          })
        }
      } catch (error) {
        return false
      }
    },
    async openUser (sn) {
      try {
        await this.$confirm(
        `${this.$t('page.userMgt.messageAlert')}`, `${this.$t('page.userMgt.messageWarning')}`, {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        try {
          const params = {
            appUser: [
              {
                op: 'replace',
                path: '/status',
                value: 1
              }
            ]
          }
          const { data } = await openUser(sn, params)
          if (data?.code === repStatus.sussess) {
            const message = this.$t('message.requestSuccess')
            this.$message({
              type: 'success',
              message: message
            })
            this.fetchUsers()
          }
        } catch (error) {
          return false
        }
      } catch (error) {
        this.$message({
          type: 'info',
          message: error
        })
      }
    },
    async deleteUser (sn) {
      try {
        await this.$confirm(
        `${this.$t('page.userMgt.messageAlert')}`, `${this.$t('page.userMgt.messageWarning')}`, {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        try {
          const { data } = await deleteUser(sn)
          if (data?.code === repStatus.sussess) {
            const message = this.$t('page.userMgt.deleteSuccess')
            this.$message({
              type: 'success',
              message: message
            })
            this.fetchUsers()
          }
        } catch (error) {
          return false
        }
      } catch (error) {
        this.$message({
          type: 'info',
          message: error
        })
      }
    },
    onDirectEdit (sn) {
      this.$router.push({ name: 'userEdit', params: { sn: sn } })
    },
    // pagination event
    handleSizeChange (value) {
      // this.pagination.perPage = value
      this.filter.limit = value
      this.fetchUsers()
    },
    handleCurrentChange (value) {
      // this.pagination.currentPage = value
      this.filter.page = value
      this.fetchUsers()
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
}
.user-mgt {
  .el-table {
    td {
      font-size: 12px;
    }
  }
  &__filter {
    display: block;
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
    .el-date-editor {
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
