<template>
  <sa-section>
    <div class="user-apply__table">
      <el-table :data="data" v-loading="isTableLoading">
        <el-table-column label="#" type="index" />
        <el-table-column :label="$t('page.promotion.mobileSn')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ scope.row.deviceSn }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.appUserSn')"
          :min-width="85"
        >
          <template slot-scope="scope">
            <p>
              {{ scope.row.appUserSn }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.os')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ getOs(scope.row.os) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.mobileRegisterTime')"
          :min-width="85"
        >
          <template slot-scope="scope">
            <p>
              {{ scope.row.deviceRegisterTime }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.nickName')" :min-width="85">
          <template slot-scope="scope">
            <router-link
              :to="{name: 'userDetails', params: { sn: scope.row.appUserSn }}"
            >
              {{ scope.row.nickName }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.gender')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ getGender(scope.row.gender) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.birthday')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ scope.row.birthday }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.email')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ scope.row.email }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.mobile')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ scope.row.mobile }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.loginBy')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ getLoginBy(scope.row.viaApp) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.effectivePoint')"
          :min-width="85"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.mileageAmount }}</p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.registerTime')"
          :min-width="85"
        >
          <template slot-scope="scope">
            <p>
              {{ scope.row.registerTime }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.openApp')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ scope.row.numOpenApp }}
            </p>
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

import { listMobile } from './api'
export default {
  name: 'UserlApply',
  components: { SaSection },
  data () {
    return {
      filter: {
        page: 1,
        limit: 10
      },
      data: [],
      isTableLoading: false,
      pagination: {}
    }
  },
  computed: {
  },
  created () {
    this.listMobile()
  },
  methods: {
    async listMobile () {
      this.isTableLoading = true
      try {
        const { data } = await listMobile(
          this.$route.params.sn,
          this.filter
        )
        this.data = data.data.users
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.isTableLoading = false
      }
    },
    onSizeChange (size) {
      this.filter.limit = size
      this.listMobile()
    },
    onCurrentChange (currentPage) {
      this.filter.page = currentPage
      this.listMobile()
    },
    getGender (status) {
      switch (status) {
        case 1:
          return this.$t('gender.male')
        case 2:
          return this.$t('gender.female')
      }
    },
    getLoginBy (value) {
      switch (value) {
        case 1:
          return 'Manual'
        case 2:
          return 'Facebook'
        case 3:
          return 'Google'
        case 4:
          return 'Apple'
        default:
          return 'Undefine'
      }
    },
    getOs (os) {
      return os === 1 ? 'IOS' : 'Android'
    }
  }
}
</script>
<style lang="scss" scoped></style>
