<template>
  <sa-section class="staff">
    <template slot="header">
      <el-form
      :inline="true"
      :model="filter"
      class="demo-form-inline float-left"
    >
      <el-form-item>
        <el-input
          :placeholder="$t(`page.staffs.inputUserId`)"
          v-model="filter.keyword"
          clearable
          prefix-icon="el-icon-search"
          @input="handleSearch"
        />
      </el-form-item>
    </el-form>
      <el-button
        plain
        type="warning"
        icon="el-icon-plus"
        style="float: right;"
        @click="$router.push({ name: 'go2joyStaffCreate' })"
      >
        {{ $t('button.add') }}
      </el-button>
    </template>
    <el-table
      v-loading="ui.loading"
      :data="staffs"
    >
      <el-table-column
        label="#"
        type="index"
      >
      </el-table-column>
      <el-table-column
        :label="$t('page.staffs.fullName')"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'go2joyStaffDetails', params: { sn: scope.row.sn } }">
            {{ scope.row.fullName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="userId"
        :label="$t('page.staffs.userId')"
      >

      </el-table-column>
      <el-table-column
        :label="$t('page.staffs.role')"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.role.sn === 1">
            {{ scope.row.role.name }}
          </span>
          <router-link v-else :to="{ name: 'permission', query: { roleSn: scope.row.role.sn } }">
            {{ scope.row.role.name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="mobile"
        :label="$t('page.staffs.mobile')"
      >

      </el-table-column>
      <el-table-column
        prop="email"
        :label="$t('page.staffs.email')"
      >

      </el-table-column>
      <el-table-column
        prop="region"
        :label="$t('page.staffs.region')"
      >
        <template slot-scope="scope">
          <span>
            <span
              v-for="(item, index) in scope.row.regionsMgt"
              :key="index"
            >
              {{ setRegion(item) }}<span v-if="(index < scope.row.regionsMgt.length - 1)">, </span>
            </span>
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('page.staffs.enable')">
        <template slot-scope="scope">
          <el-checkbox
            v-if="scope.row.role.sn !== 1"
            :value="Boolean(scope.row.status)"
            @change="handleChangeStatus(scope.$index, scope.row.status)"
          >
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.staffs.operations')"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.role.sn !== 1 && hasPermission('sasuperstaff', 'pModify')"
            size="small"
            type="success"
            plain
            @click="$router.push({ name: 'go2joyStaffEdit', params: { sn: scope.row.sn } })"
            icon="el-icon-edit"
          >
            {{ $t('button.edit') }}
          </el-button>
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
import { debounce } from '@/utils/helpers'
import SaSection from '@/components/globals/SaSection.vue'
import { fetchStaffs } from '@/api/staff'
import { updateStatus } from './api'
const timeDebounce = 500
export default {
  name: 'StaffMgt',
  components: { SaSection },
  data: () => {
    return {
      ui: {
        loading: false
      },
      pagination: {
        perPage: 1,
        total: 0
      },
      filter: {
        limit: 10,
        filter: 1,
        page: 1,
        keyword: ''
      },
      staffs: []
    }
  },
  created () {
    this.fetchStaffs()
  },
  methods: {
    async fetchStaffs () {
      this.ui.loading = true
      try {
        const { data } = await fetchStaffs(this.filter)
        this.staffs = data.data.staffs
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    setRegion (region) {
      switch (region) {
        case 1:
          return this.$t('page.staffs.south')
        case 2:
          return this.$t('page.staffs.north')
        case 3:
          return this.$t('page.staffs.middle')
        default:
          return ''
      }
    },
    async handleChangeStatus (rowIndex, val) {
      this.staffs[rowIndex].status = !val
      try {
        await updateStatus(this.staffs[rowIndex].sn)
        const message = this.$t('message.updateSuccess')
        this.$message({
          type: 'success',
          message: message
        })
        this.fetchStaffs()
      } catch (error) {
        return false
      }
    },
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchStaffs()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchStaffs()
    },
    handleSearch: debounce(function () {
      this.filter.page = 1
      this.fetchStaffs(this.filter)
    }, timeDebounce) // handleSearch
  }
}
</script>
