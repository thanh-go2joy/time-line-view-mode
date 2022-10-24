<template>
  <sa-section>
    <div class="device-mgt__filter">
        <el-form :inline="true" :model="filter" class="demo-form-inline">
          <el-form-item>
            <el-input
              v-model="filter.keyword"
              :placeholder="$t('placeholder.keyword')"
              clearable
              prefix-icon="el-icon-search"
              @input="listDevice"
            />
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="dateRange"
              type="daterange"
          popper-class="custom-date-range"
              range-separator="-"
              :start-placeholder="$t('placeholder.startDate')"
              :end-placeholder="$t('placeholder.endDate')"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              @input="listDevice"
            />
          </el-form-item>
        </el-form>
    </div>
    <div class="device-mgt__table">
      <el-table
        :data="data"
        v-loading="loadingDevices"
      >
        <el-table-column
          label="#"
          type="index"
        />
        <el-table-column
          :label="$t('page.deviceMgt.mobile_user_id')"
          :min-width="200"
        >
          <template slot-scope="scope">
            {{ scope.row.deviceCode }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.deviceMgt.app_user_nickName')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <el-link
              type="primary"
              v-if="scope.row.userLogin && scope.row.userLogin.nickName"
              :href="`/hotel/sadmin/user-details/${scope.row.userLogin.sn}`"
            >
              {{ scope.row.userLogin.nickName }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.deviceMgt.first_app_user_nickName')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <el-link
              type="primary"
              v-if="scope.row.userLogin && scope.row.userLogin.nickName"
              :href="`/hotel/sadmin/user-details/${scope.row.firstSignup.sn}`"
            >
              {{ scope.row.userLogin.nickName }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.deviceMgt.device_code')"
          :min-width="100"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.os === 1 ? 'IOS' : 'Android' }}
            </span>
            |
            <span>
              {{ scope.row.osVersion }}
            </span>
            |
            <span>
              {{ scope.row.phoneModel }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.deviceMgt.push_notification')"
          :min-width="100"
        >
          <template slot-scope="scope">
            <p>
              {{ scope.row.pushNotification  === 1 ? '✔' : '✘' }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.deviceMgt.last_open_app')"
          :min-width="260"
        >
          <template slot-scope="scope">
            <p>
              {{ scope.row.address }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.deviceMgt.app_version')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <p>
              {{ scope.row.appVersion }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.deviceMgt.install')"
          :min-width="65"
        >
          <template slot-scope="scope">
            <p>
              {{ scope.row.status === 1 ? '✔' : ' ' }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.deviceMgt.register_province')"
          :min-width="100"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.province.name">
              {{ scope.row.province.name }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.deviceMgt.source')"
          :min-width="100"
        >
          <template slot-scope="scope">
            <p>
              {{ scope.row.source }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.deviceMgt.res_time')"
          :min-width="110"
        >
          <template slot-scope="scope">
            <p>
              {{ formatDate(scope.row.registerTime) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.deviceMgt.last_update')"
          :min-width="110"
        >
          <template slot-scope="scope">
            <p>
              {{ formatDate(scope.row.lastUpdate) }}
            </p>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
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
import saSection from '@/components/globals/SaSection.vue'
import { listDevice } from './api'

export default {
  name: 'DeviceMgt',
  components: {
    saSection
  },
  data: () => {
    return {
      pagination: {},
      filter: {
        limit: 10,
        page: 1,
        keyword: '',
        startDate: '',
        endDate: ''
      },
      data: [],
      loadingDevices: false
    }
  },
  computed: {
    dateRange: {
      get () {
        return [this.filter.startDate, this.filter.endDate]
      },
      set (val) {
        if (val) {
          this.filter.startDate = val?.length >= 1 ? val[0] : val
          this.filter.endDate = val?.length >= 1 ? val[1] : val
        } else {
          this.filter.startDate = ''
          this.filter.endDate = ''
        }
      }
    }
  },
  created () {
    this.listDevice()
  },
  watch: {

  },
  methods: {
    async listDevice () {
      this.loadingDevices = true
      try {
        const { data } = await listDevice(this.filter)
        this.data = data.data.mobileDevices
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.loadingDevices = false
      }
    },
    onSizeChange (size) {
      this.filter.limit = size
      this.listDevice()
    },
    onCurrentChange (currentPage) {
      this.filter.page = currentPage
      this.listDevice()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
