<template>
  <sa-section>
    <template slot="header">
      <el-select
        v-model="filter.roleSn"
        :placeholder="$t('page.permission.roleName')"
        :loading="ui.roleLoading"
        @change="changeRoleFilter"
      >
        <el-option
          v-for="(item, index) in roles"
          :key="index"
          :value="item.sn"
          :label="item.name"
        />
      </el-select>
    </template>
    <el-table
      :data="permissions"
      v-loading="ui.permisstionLoading"
    >
      <el-table-column type="index" label="#" />
      <el-table-column
        prop="name"
        :label="$t('page.permission.functionName')"
      >
        <template slot-scope="scope">
          <span v-if="pageGourps[scope.$index]">{{ pageGourps[scope.$index].name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in ui.displayCheckbox"
        :key="index"
        :label="$t(`page.permission.${item.label}`)"
      >
        <template slot-scope="scope">
          <el-checkbox
            :disabled="!hasPermission('sapermission', 'pModify')"
            v-if="pageGourps[scope.$index][item.prop] === 1"
            v-model="scope.row[item.value]"
            :true-label=1
            :false-label=0
            @change="changeItemSelect(item.value, scope.row[item.value], scope.row.sn)"
          />
        </template>
      </el-table-column>
    </el-table>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { fetchRoles } from '@/api/role'
import { fetchPermissions, fetchPageGroups, updatePermission } from './api'
export default {
  name: 'PermissionDetails',
  components: { SaSection },
  data: (vm) => {
    return {
      ui: {
        roleLoading: false,
        permisstionLoading: false,
        displayCheckbox: [{
          label: 'areaRestriction',
          prop: 'pAreaRestriction',
          value: 'pAreaRestriction'
        }, {
          label: 'view',
          prop: 'hasView',
          value: 'pView'
        }, {
          label: 'create',
          prop: 'hasCreate',
          value: 'pCreate'
        }, {
          label: 'delete',
          prop: 'hasDelete',
          value: 'pDelete'
        }, {
          label: 'export',
          prop: 'hasExport',
          value: 'pExport'
        }, {
          label: 'special',
          prop: 'hasSpecial',
          value: 'pSpecial'
        }]
      },
      filter: {
        roleSn: ''
      },
      roles: [],
      pageGourps: [],
      permissions: [],
      tableData: []
    }
  },
  async created () {
    this.fetchRoles()
    await this.fetchPageGroups()
    this.fetchPermissions()
  },
  methods: {
    async fetchPageGroups () {
      this.ui.roleLoading = true
      try {
        const { data } = await fetchPageGroups({ type: 2 })
        this.pageGourps = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.roleLoading = false
      }
    },
    async fetchPermissions () {
      this.ui.permisstionLoading = true
      try {
        const { data } = await fetchPermissions(this.filter)
        this.permissions = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.permisstionLoading = false
      }
    },
    async fetchRoles () {
      this.ui.roleLoading = true
      try {
        const { data } = await fetchRoles({ filter: 1 })
        this.roles = data.data
        this.filter.roleSn = this.$route.query.roleSn ? Number(this.$route.query.roleSn) : 2
      } catch (error) {
        return false
      } finally {
        this.ui.roleLoading = false
      }
    },
    changeRoleFilter () {
      this.$router.push({ name: 'permission', query: { roleSn: this.filter.roleSn } })
      this.fetchPermissions()
    },
    async changeItemSelect (item, value, sn) {
      this.ui.permisstionLoading = true
      try {
        const formData = {
          permission: [{
            op: 'replace',
            path: item,
            value: value ? 1 : 0
          }]
        }
        await updatePermission(formData, sn)
        this.fetchPermissions()
      } catch (error) {
        return false
      } finally {
        this.ui.permisstionLoading = false
      }
    }
  }
}
</script>
