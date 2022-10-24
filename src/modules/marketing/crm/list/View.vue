<template>
  <sa-section class="crm">
    <template slot="header" class="crm__filters">
      <div class="float-right">
        <router-link
          class="el-button el-button--warning is-plain"
          :to="{ name: 'crmCreate' }"
        >
          <i class="el-icon-plus" />
          {{ $t('button.add') }}
        </router-link>
      </div>
    </template>
    <div class="crm__table">
      <el-table
        :data="data"
        row-key="id"
        align="left"
        :row-class-name="rowContentStyle"
        v-loading="ui.isTableLoading"
      >
        <el-table-column type="index" :min-width="50"> </el-table-column>
        <el-table-column :min-width="120" :label="$t('page.crm.title')">
          <template slot-scope="scope">
            <p>
              <router-link
                class="text-primary"
                :to="{ name: 'crmDetail', params: {sn: scope.row.sn}}"
              >
                {{ scope.row.title }}
              </router-link>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :min-width="150"
          :label="$t('page.crm.createTime')"
        >
          <template slot-scope="scope">
            <p>{{ formatDate(scope.row.createTime) }}</p>
          </template>
        </el-table-column>
        <el-table-column
          :min-width="150"
          :label="$t('page.crm.lastUpdate')"
        >
          <template slot-scope="scope">
            <p>{{ formatDate(scope.row.lastUpdate) }}</p>
          </template>
        </el-table-column>
        <el-table-column
          :min-width="85"
          :label="$t('page.crm.status')"
        >
          <template slot-scope="scope">
            <p>
              {{ getStatus(scope.row.status) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :min-width="730">
          <template slot-scope="scope">
            <router-link
              style="color: #606266;"
              :to="{name: 'mobileList', params: {sn: scope.row.sn}}"
              class="el-button el-button--default is-plain"
              target="_blank"
            >
              <i class="el-icon-document" />
              {{ $t('button.mobileLists') }}
            </router-link>
            <el-button
              @click="onExportCrm(scope.row.sn)"
              size="small"
              v-if="hasPermission('sacrm', 'pView')"
              plain
              :disabled="scope.row.status == 2"
            >
              <i class="el-icon-download" />
              {{ $t('button.report') }}
            </el-button>
            <el-button
              @click="onSendCrm(scope.row.sn)"
              size="small"
              v-if="hasPermission('sanotification', 'pCreate')"
              plain
              :disabled="scope.row.status == 2"
            >
              <i class="el-icon-s-promotion" />
              {{ $t('button.send') }}
            </el-button>
            <router-link
              :to="{ name: 'crmEdit', params: {sn:scope.row.sn } }"
              class="el-button el-button--success is-plain"
              v-if="hasPermission('sacrm', 'pModify')"
              :class="scope.row.status == 2 ? 'disabled' : ''"
            >
              <i class="el-icon-edit-outline" />
              {{ $t('button.edit') }}
            </router-link>
            <router-link
              v-if="hasPermission('sacrm', 'pCreate')"
              :to="{ name: 'crmCreate', params: {sn: scope.row.sn}}"
              class="el-button el-button--primary is-plain"
            >
              <i class="el-icon-document-copy" />
              {{ $t('button.clone') }}
            </router-link>
            <router-link
              v-if="hasPermission('sacrm', 'pSpecial')"
              :class="scope.row.status == 2 ? 'disabled' : ''"
              :to="{name: 'notificationCreate', params: { sn:scope.row.sn }}"
              class="el-button el-button--default is-plain"
            >
              {{ $t('button.donate') }}
            </router-link>
            <el-button
              @click="onDeleteCRM(scope.row.sn)"
              size="small"
              type="danger"
              plain
              :disabled="scope.row.status == 2"
            >
              <i class="el-icon-delete" />
              {{ $t('button.delete') }}
            </el-button>
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
        :total="pagination.total"
      />
    </div>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { listCRM, onExportCRM, onDeleteCRM } from './api'

export default {
  name: 'crm',
  components: { SaSection },
  data () {
    return {
      filter: {
        limit: 10,
        page: 1
      },
      pagination: {},
      ui: {
        isTableLoading: false
      },
      data: []
    }
  },
  computed: {},
  created () {
    this.listCRM()
  },
  methods: {
    async listCRM () {
      this.ui.isTableLoading = true
      try {
        const { data } = await listCRM(this.filter)
        this.data = data.data.crms
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    onSizeChange (size) {
      this.filter.limit = size
      this.listCRM()
    },
    onCurrentChange (currentPage) {
      this.filter.page = currentPage
      this.listCRM()
    },
    async onExportCrm (sn) {
      try {
        const { data } = await onExportCRM({ crmFilterSn: sn })
        if (data.code === 1) {
          this.$message({
            type: 'success',
            message: this.$t('message.success')
          })
        }
      } catch (error) {
        return false
      }
    },
    async onDeleteCRM (sn) {
      this.$confirm(`${this.$t('message.areYouSure')}`, `${this.$t('button.delete')}`, {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        try {
          const { data } = await onDeleteCRM(sn)
          if (data.code === 1) {
            await this.listCRM()
            this.$message({
              type: 'success',
              message: this.$t('message.success')
            })
          }
        } catch (error) {
          return false
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error.response ? error.response.data.message : error
        })
      })
    },
    getStatus (status) {
      switch (status) {
        case 1:
          return this.$t('page.crm.active')
        case 2:
          return this.$t('page.crm.expired')
      }
    },
    rowContentStyle ({ row, rowIndex }) {
      if (row.status !== 1) {
        return 'style-background-lightgrey'
      } else {
        return `customs-content-row-${this.rowIndex}`
      }
    }
  }
}
</script>
<style lang="scss">
.crm .style-background-lightgrey {
    background-color: lightgrey;
}
</style>
