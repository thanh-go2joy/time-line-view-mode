<template>
  <sa-section class="sms">
    <template slot="header">
      <div class="sms__header">
        <div class="sms__header--item">
          <div class="sms__header--left">Email</div>
          <div>{{ smsAccount.email }}</div>
        </div>
         <div class="sms__header--item">
          <div class="sms__header--left">{{ $t('page.sms.account') }}</div>
          <div style="display: flex; align-items: center;">
            <p style="margin-right: 8px;">{{ formatMoney(smsAccount.balance) }}</p>
            <p>{{ smsAccount.currency }}</p>
          </div>
        </div>
      </div>
      <el-button
        plain
        type="warning"
        icon="el-icon-plus"
        @click="$router.push({ name: 'smsCreate' })"
        style="float:right"
      >
        {{ $t('button.add') }}
      </el-button>
    </template>
    <el-table
      v-loading="ui.loading"
      :data="listSms"
    >
      <el-table-column
        label="#"
        type="index"
        min-width="20"
      >
      </el-table-column>
      <el-table-column
        :label="$t('page.sms.sms_type')"
        min-width="60"
      >
        <template slot-scope="scope">
          {{ scope.row.type === 1 ? $t('page.sms.custom_care') : $t('page.sms.marketing') }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.sms.sender')"
        min-width="100"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.smsType === 2">{{ $t('page.sms.random_number') }}</span>
          <span v-else-if="scope.row.smsType === 3">{{ $t('page.sms.go2joy') }}</span>
          <span v-else>{{ $t('page.sms.phone') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        :label="$t('page.sms.content')"
        min-width="30"
      />
      <el-table-column
        prop="createStaff"
        :label="$t('page.sms.create_staff')"
        min-width="80"
      >
        <template slot-scope="scope">
          {{ scope.row.createStaff.fullName }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.sms.create_time')"
        min-width="80"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.sms.send_to')"
        min-width="100"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.sendTo === 1">{{ $t('page.sms.all') }}</span>
          <span v-else-if="scope.row.sendTo === 6">{{ $t('page.sms.all_user') }}</span>
          <span v-else>
            <span v-if="scope.row.sendToContent.numberList">
              {{ scope.row.sendToContent.numberList }}
            </span>
            <span v-if="scope.row.sendToContent.provinceName">
              {{ scope.row.sendToContent.provinceName }}
            </span>
            <span v-if="scope.row.sendToContent.districtName">
              - {{ scope.row.sendToContent.districtName }}
            </span>
            <span v-if="scope.row.sendToContent.hotelList">
              <router-link
                v-for="(item, index) in scope.row.sendToContent.hotelList"
                :key="index"
                :to="{ name: 'userDetails', params: { sn: item.sn  } }"
              >
                {{ item.name }}
                <span v-if="(index < scope.row.sendToContent.hotelList.length - 1)">, </span>
              </router-link>
            </span>
            <span v-if="scope.row.sendToContent.appUserList">
              <router-link
                v-for="(item, index) in scope.row.sendToContent.appUserList"
                :key="index"
                :to="{ name: 'userDetails', params: { sn: item.sn  } }"
              >
                {{ item.nickName }}
                <span v-if="(index < scope.row.sendToContent.appUserList.length - 1)">, </span>
              </router-link>
            </span>
            <span v-if="scope.row.sendToContent.originalFileName">
              <a
                :href="formatImage(scope.row.sendToContent.filePath)"
                target="_blank"
              >
                {{ scope.row.sendToContent.originalFileName }}
              </a>
            </span>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="numOfSMS"
        :label="$t('page.sms.num_of_sms')"
        min-width="80"
      />
      <el-table-column
        prop="totalPrice"
        :label="$t('page.sms.total_price')"
        min-width="80"
      />
      <el-table-column
        :label="$t('page.sms.send_schedule')"
        min-width="80"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.scheduleTime) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.sms.send_time')"
        min-width="80"
      >
        <template slot-scope="scope">
          {{ scope.row.sendTime ? formatDate(scope.row.sendTime) : '' }}
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
import SaSection from '@/components/globals/SaSection.vue'
import { fetchSms } from './api'
export default {
  name: 'SmsList',
  components: { SaSection },
  data: () => {
    return {
      ui: {
        loading: false
      },
      smsAccount: {},
      pagination: {
        total: 0,
        perPage: 1
      },
      listSms: [],
      filter: {
        page: 1,
        limit: 10
      }
    }
  },
  created () {
    this.fetchSms()
  },
  methods: {
    async fetchSms () {
      this.ui.loading = true
      try {
        const { data } = await fetchSms(this.filter)
        this.listSms = data.data.sendSMS
        this.smsAccount = data.data.additionalData.smsAccount
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchSms()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchSms()
    }
  }
}
</script>
<style lang="scss" scoped>
.sms {
  &__header {
    color: #606266;
    display: inline-block;
    margin-bottom: 8px;
    &--item {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 10px 0px;
    }
    &--left {
      width: 200px;
      font-weight: 600;
    }
  }
}
</style>
