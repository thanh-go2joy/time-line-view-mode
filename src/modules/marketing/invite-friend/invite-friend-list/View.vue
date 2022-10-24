<template>
  <sa-section v-if="$route.fullPath === '/hotel/sadmin/invite-friend'" class="invite-friend">
    <template slot="header">
      <div class="invite-friend__header">
        <div class="invite-friend__header--account">
          <div>
            {{ $t('page.inviteFriend.account') }}
          </div>
          <div>
            {{ ui.dataAccount.balance_avaiable }}
          </div>
        </div>
        <div class="invite-friend__header--add">
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
      :data="listInviteFriends"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="20"
      />
      <el-table-column
        :label="$t('page.inviteFriend.title')"
        min-width="150"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'inviteFriendDetails', params: { sn: scope.row.sn } }">
              {{ scope.row.title }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.inviteFriend.typeOfInvitation')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.typeApply === 1 ? 'Checked-in' : 'Sign Up' }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.inviteFriend.dailyBudget')"
        min-width="125"
      >
        <template slot-scope="scope">
          {{ scope.row.dailyBugget ? formatMoney(scope.row.dailyBugget) : $t('page.inviteFriend.unlimited') }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.inviteFriend.inviteeAmount')"
        min-width="120"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.inviteeAmout) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.inviteFriend.inviterAmount')"
        min-width="120"
      >
        <template slot-scope="scope">
          {{ formatMoney(scope.row.inviterAmout) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.inviteFriend.startEndDate')"
        min-width="200"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.startDate, false) }} ~ {{ formatDate(scope.row.endDate, false) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.inviteFriend.createTime')"
        min-width="150"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.inviteFriend.lastUpdate')"
        min-width="150"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.lastUpdate) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.inviteFriend.operations')"
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
              v-if="hasPermission('sainvitefriend', 'pModify') && scope.row.status === 1"
              type="danger"
              size="small"
              plain
              @click="stopInviteFriend()"
            >
              {{$t('button.stop')}}
            </el-button>
            <el-button
              v-if="hasPermission('sainvitefriend', 'pModify') &&
              (scope.row.status === 0 ||
              scope.row.status === 2 ||
              scope.row.status === 3||
              scope.row.status === 4 ||
              scope.row.status === 5)"
              type="default"
              size="small"
              plain
              disabled
            >
              <p v-if="scope.row.status === 0">{{ $t('option.status.deleted') }}</p>
              <p v-else-if="scope.row.status === 2">{{ $t('option.status.expired') }}</p>
              <p v-else-if="scope.row.status === 3">{{ $t('option.status.not_yet') }}</p>
              <p v-else-if="scope.row.status === 4">{{ $t('option.status.draft') }}</p>
              <p v-else-if="scope.row.status === 5">{{ $t('option.status.wait_confirm') }}</p>
              <p v-else></p>
            </el-button>
            <el-button
              v-if="hasPermission('sainvitefriend', 'pModify') && scope.row.status === 4"
              type="success"
              plain
              size="small"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
            >
              {{$t('button.edit')}}
            </el-button>
            <el-button
              type="primary"
              plain
              size="small"
              @click="handleDetails(scope.row)"
            >
              {{$t('button.detail')}}
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
import SaSection from '@/components/globals/SaSection.vue'
import { fetchInviteFriends, fetchFindVnptBalance, stopInviteFriend } from './api'
import { scrollToTop } from '@/utils/helpers'

export default {
  name: 'InviteFriend',
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
    this.fetchFindVnptBalance()
  },
  methods: {
    async fetchInviteFriends () {
      this.ui.isLoading = true
      try {
        const { data } = await fetchInviteFriends(this.filter)
        this.listInviteFriends = data.data.inviteFriendList
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        scrollToTop('.section__header')
        this.ui.isLoading = false
      }
    },
    async fetchFindVnptBalance () {
      try {
        const { data } = await fetchFindVnptBalance()
        this.ui.dataAccount = data.data
      } catch (error) {
        return false
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
    handleCreate () {
      this.$router.push({ name: 'inviteFriendCreate' })
    },
    handleEdit (data) {
      this.$router.push({ name: 'inviteFriendEdit', params: { sn: data.sn } })
    },
    handleDetails (data) {
      this.$router.push({ name: 'inviteFriendDetailsList', params: { sn: data.sn } })
    },
    async stopInviteFriend () {
      try {
        await stopInviteFriend()
      } catch (error) {
        return false
      } finally {
        this.fetchInviteFriends()
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
  .invite-friend {
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
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1em;
      &--add {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
      }
      &--account {
        display: flex;
        gap: 2em;
        flex-wrap: wrap;
      }
    }
    .el-button {
      margin-left: unset;
    }
  }
</style>
