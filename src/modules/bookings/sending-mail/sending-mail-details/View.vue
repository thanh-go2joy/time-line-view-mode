<template>
  <sa-section class="sendingMail">
  <div class="sendingMail__header">
      <div class="sendingMail__header--info">
        <p>{{ dateFromTo }}</p>
      </div>
      <div class="sendingMail__header--add">
        <el-button
          type="warning"
          plain
          @click="reSendPaymentMail"
          icon="el-icon-plus"
        >
          {{ $t('button.resend') }}
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
        :label="$t('page.sendingMail.hotelName')"
        min-width="180"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'hotelDisplayDetails', params: { sn: scope.row.hotelSn } }">
            {{ scope.row.name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.sendingMail.code')"
        min-width="140"
      >
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.sendingMail.address')"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.sendingMail.status')"
        min-width="100"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.status === 0">{{ $t('option.sendingStatus.notSendYet') }}</p>
          <p v-else-if="scope.row.status === 1">{{ $t('option.sendingStatus.error') }}</p>
          <p v-else-if="scope.row.status === 2">{{ $t('option.sendingStatus.ok') }}</p>
          <p v-else-if="scope.row.status === 3">{{ $t('option.sendingStatus.dontSend') }}</p>
          <p v-else></p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.sendingMail.currentDebt')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.currentDebt) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.sendingMail.otherDebt')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.otherDebt) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.sendingMail.periodDebt')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.periodDebt) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.sendingMail.expectedPayAmount')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.payAmount) }}
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
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { fetchSendingMailDetails, reSendPaymentMail } from './api'

export default {
  name: 'SendingMailDetails',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        isLoading: false
      },
      listSendingMails: [],
      dateFromTo: '',
      filter: {
        limit: 10,
        page: 1
      },
      pagination: {}
    }
  },
  created () {
    this.fetchSendingMailDetails()
  },
  methods: {
    async fetchSendingMailDetails () {
      this.ui.isLoading = true
      try {
        const { data } = await fetchSendingMailDetails(this.$route.params.sn, this.filter)
        this.listSendingMails = data.data.HotelPaymentMailDetails
        this.dateFromTo = data.data.additionalData
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
      this.fetchSendingMailDetails()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchSendingMailDetails()
    },
    async reSendPaymentMail () {
      try {
        await reSendPaymentMail({ hotelPaymentMailSn: this.$route.params.sn })
        this.$message({
          type: 'success',
          message: this.$t('message.sendSuccess')
        })
      } catch (error) {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .sendingMail {
      &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2em;
        gap: 1em;
      }
  }
  .paginate {
    margin-top: 2em;
  }
</style>
