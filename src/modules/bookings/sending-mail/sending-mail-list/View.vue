<template>
  <sa-section v-if="$route.fullPath === '/hotel/sadmin/sending-mail'" class="sendingMail">
  <div class="sendingMail__header">
      <div class="sendingMail__header--add">
        <el-button
        v-if="hasPermission('sahoteldebt', 'pModify')"
          type="warning"
          plain
          @click="handleCreate"
          icon="el-icon-plus"
        >
          {{ $t('button.add') }}
        </el-button>
      </div>
    </div>
    <!-- -- el table -- -->
    <el-table
      v-loading="ui.isLoading"
      :data="listSendingMails"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="20"
      />
      <el-table-column
        :label="$t('page.sendingMail.title')"
        min-width="220"
      >
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.sendingMail.createStaff')"
        min-width="220"
      >
        <template slot-scope="scope">
          {{ scope.row.fullName }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.sendingMail.createTime')"
         min-width="220"
      >
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.sendingMail.result')"
         min-width="220"
      >
        <template slot-scope="scope">
          <span class="text-blue">{{ scope.row.totalSendOk }}</span>
          <span> / </span>
          <span class="text-red">{{ scope.row.totalSendError }}</span>
          <span> / </span>
          <span style="text-yellow">{{ scope.row.totalDontSend }}</span>
          <span> / </span>
          <span>{{ scope.row.totalSend }}</span>
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
              v-if="hasPermission('sahoteldebt', 'pView')"
              type="primary"
              size="small"
              plain
              @click="handleDetail(scope.row)"
            >
              {{$t('button.detail')}}
            </el-button>

            <el-button
              v-if="hasPermission('sahoteldebt', 'pExport')"
              type="primary"
              plain
              size="small"
              @click="handleDownload(scope.row)"
            >
              {{$t('button.download')}}
            </el-button>
          </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer" class="paginate">
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
import SaSection from '@/components/globals/SaSection.vue'
import { fetchSendingMails, exportPerSendingMail } from './api'

export default {
  name: 'SendingMail',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        isLoading: false
      },
      listSendingMails: [],
      filter: {
        limit: 10,
        page: 1
      },
      pagination: {}
    }
  },
  created () {
    this.fetchSendingMails()
  },
  methods: {
    async fetchSendingMails () {
      this.ui.isLoading = true
      try {
        const { data } = await fetchSendingMails(this.filter)
        this.listSendingMails = data.data.hotelPaymentMails
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchSendingMails()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchSendingMails()
    },
    handleCreate () {
      this.$router.push({ name: 'sendingMailCreate' })
    },
    handleDetail (data) {
      this.$router.push({ name: 'sendingMailDetails', params: { sn: data.sn } })
    },
    async handleDownload (data) {
      try {
        await exportPerSendingMail({ hotelPaymentMailSn: data.sn })
        this.$message({
          type: 'success',
          message: this.$t('message.downloadSuccess')
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
    .text-blue {
      color: blue;
    }

    .text-red {
      color: red;
    }

    .text-yellow {
      color: #e2b405;
    }

    .sendingMail {
        &__header {
          margin-bottom: 2em;
          &--add {
            text-align: right;
          }
        }
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
    }

    .paginate {
      margin-top: 2em;
    }
</style>
