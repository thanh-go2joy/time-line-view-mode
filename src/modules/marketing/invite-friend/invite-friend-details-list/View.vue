<template>
  <sa-section>
    <!-- -- el table -- -->
    <el-table
      v-loading="ui.isLoading"
      :data="listInviteFriends"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="20"
        :index="indexMethod"
      />
      <el-table-column
        :label="$t('page.inviteFriend.nickName')"
        min-width="100"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'userDetails', params: { sn: scope.row.sn } }">
            {{ scope.row.nickName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.inviteFriend.mobile')"
        min-width="100"
      >
        <template slot-scope="scope" v-if="scope.$index">
          (+{{ scope.row.countryCode }}) {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.inviteFriend.registerProvince')"
        min-width="140"
      >
        <template slot-scope="scope">
          {{ scope.row.provinceName }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.inviteFriend.loginBy')"
        min-width="120"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.viaApp == 1">Manual</p>
          <p v-else-if="scope.row.viaApp == 2">Facebook</p>
          <p v-else-if="scope.row.viaApp == 3">Google</p>
          <p v-else-if="scope.row.viaApp == 4">Apple</p>
          <p v-else></p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.inviteFriend.registerTime')"
        min-width="120"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.registerTime) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.inviteFriend.openApp')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.numOpenApp }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.inviteFriend.totalInvitee')"
        min-width="120"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'inviteeList', params: { sn: $route.params.sn, inviterUserSn: scope.$index ? scope.row.sn : null } }">
            {{ scope.row.totalInvitee }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.inviteFriend.inviterAmount')"
        min-width="120"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.inviterAmount) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.inviteFriend.inviteeAmount')"
        min-width="180"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.inviteeAmount) }}
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
import { fetchInviteFriends } from './api'
import { scrollToTop } from '@/utils/helpers'

export default {
  name: 'InviterReport',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        isLoading: false,
        dataAccount: {}
      },
      listInviteFriends: [],
      filter: {
        limit: 10,
        page: 1
      },
      pagination: {}
    }
  },
  created () {
    this.fetchInviteFriends()
  },
  methods: {
    async fetchInviteFriends () {
      this.ui.isLoading = true
      try {
        const { data } = await fetchInviteFriends(this.$route.params.sn, this.filter)
        if (data.data.meta.total > 0) {
          this.listInviteFriends = data.data.inviterHistoryList
          this.pagination = data.data.meta
          const firstRow = [{ ...data.data.statistics, sn: 0 }]
          this.listInviteFriends = firstRow.concat(this.listInviteFriends)
        }
        return false
      } catch (error) {
        return false
      } finally {
        scrollToTop('.inviteFriend')
        this.ui.isLoading = false
      }
    },
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchInviteFriends()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchInviteFriends()
    },
    indexMethod (index) {
      return index === 0 ? '' : index
    }
  }
}
</script>
