<template>
  <sa-section v-if="$route.fullPath === '/hotel/sadmin/notice'" class="notice">
    <template slot="header">
      <div class="notice__header">
        <div class="notice__header--search">
          <div>
            <el-input :placeholder="$t('breadcrumb.keyword')"
            prefix-icon="el-icon-search"
            v-model="filter.keyword"
            clearable
            @input="searchAppNotices"
            ></el-input>
          </div>
        </div>
        <div v-if="hasPermission('saappnotice', 'pCreate')" class="notice__header--add">
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
      :data="listNotices"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="20"
      />
      <el-table-column
        :label="$t('page.notice.title')"
        min-width="150"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'noticeDetails', params: { sn: scope.row.sn } }">
            {{ scope.row.title }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.notice.homePage')"
        min-width="85"
      >
        <template slot-scope="scope">
          {{ scope.row.homePage === 1 ? '✔' : '' }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.notice.createStaff')"
        min-width="150"
      >
        <template slot-scope="scope">
          {{ scope.row.staffName }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.notice.createTime')"
        min-width="140"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.notice.lastUpdate')"
        min-width="140"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.lastUpdate) }}
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
              v-if="hasPermission('saappnotice', 'pModify')"
              type="success"
              size="small"
              plain
              @click="handleEdit(scope.row)"
              icon="el-icon-edit"
            >
              {{$t('button.edit')}}
            </el-button>

            <el-button
              v-if="hasPermission('saappnotice', 'pCreate')"
              type="primary"
              plain
              size="small"
              @click="handleSend(scope.row)"
            >
              {{$t('button.send')}}
            </el-button>

            <el-button
              v-if="hasPermission('saappnotice', 'pDelete')"
              type="danger"
              plain
              size="small"
              @click="onDelete(scope.row)"
            >
              {{$t('button.delete')}}
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
  <router-view v-else />
</template>
<script>
import { debounce, scrollToTop } from '@/utils/helpers'
import SaSection from '@/components/globals/SaSection.vue'
import { deleteAppNotices } from './api'
import { fetchNotices } from '@/api/notices'
const timeDebounce = 500

export default {
  name: 'Notice',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        isLoading: false
      },
      listNotices: [],
      filter: {
        limit: 10,
        page: 1,
        keyword: ''
      },
      pagination: {}
    }
  },
  created () {
    this.fetchAppNotices()
  },
  methods: {
    async fetchAppNotices () {
      this.ui.isLoading = true
      try {
        const { data } = await fetchNotices(this.filter)
        this.listNotices = data.data.appNotices
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        scrollToTop('.section__header')
        this.ui.isLoading = false
      }
    },
    searchAppNotices: debounce(function () {
      this.fetchAppNotices()
    }, timeDebounce),
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchAppNotices()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchAppNotices()
    },
    handleCreate () {
      this.$router.push({ name: 'noticeCreate' })
    },
    handleEdit (data) {
      this.$router.push({ name: 'noticeEdit', params: { sn: data.sn } })
    },

    handleSend (data) {
      this.$router.push({ name: 'notificationCreate', params: { targetType: 1, targetSn: data.sn } })
    },
    async onDelete (data) {
      try {
        this.$confirm(`${this.$t('message.areYouSure')}`, `${this.$t('message.warning')}`, {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(async () => {
          await deleteAppNotices(data.sn)
          this.$message({
            type: 'success',
            message: this.$t('message.deleteSuccess')
          })
          this.fetchAppNotices(this.filter)
        }).catch(error => {
          this.$message({
            type: 'info',
            message: error
          })
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
  .notice {
      &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1em;
        &--search {
          display: flex;
        }
      }
  }
</style>
