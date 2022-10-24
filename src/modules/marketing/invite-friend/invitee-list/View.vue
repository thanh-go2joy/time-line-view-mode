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
        <template slot-scope="scope">
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
        :label="$t('page.inviteFriend.stayAtHotelTime')"
        min-width="150"
      >
        <template slot-scope="scope">
          {{ scope.row.checkInDatePlan }}
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
import { fetchInvitees } from './api'

export default {
  name: 'InviteeReport',
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
        page: 1,
        inviterUserSn: this.$route.params.inviterUserSn
      },
      pagination: {}
    }
  },
  created () {
    this.fetchInvitees()
  },
  methods: {
    async fetchInvitees () {
      this.ui.isLoading = true
      try {
        const { data } = await fetchInvitees(this.$route.params.sn, this.filter)
        this.listInviteFriends = data.data.inviteeHistoryList
        this.pagination = data.data.meta
        return false
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchInvitees()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchInvitees()
    }
  }
}
</script>
