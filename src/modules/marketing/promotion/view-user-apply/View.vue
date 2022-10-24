<template>
  <sa-section>
    <div class="user-apply__filters">
      <el-form
        :inline="true"
        :model="filter"
        class="demo-form-inline float-left"
      >
        <el-form-item>
          <el-select
            v-model="filter.type"
            element-loading-spinner="el-icon-loading"
            prefix-icon="el-icon-search"
            :placeholder="$t('page.hotelDisplay.hotelName')"
            @change="listUserlApply"
          >
            <el-option
              v-for="(item, index) in type"
              :key="index"
              :label="$t(item.name)"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="success"
            icon="el-icon-download"
            plain
            @click="onExport"
          >
            {{ $t('button.export') }}
          </el-button>
        </el-form-item>
      </el-form>
      <div class="float-right"></div>
    </div>
    <div class="user-apply__table">
      <el-table :data="data" v-loading="ui.isTableLoading">
        <el-table-column label="#" type="index" />
        <el-table-column
          :label="$t('page.promotion.nickName')"
          :min-width="150"
        >
          <template slot-scope="scope">
            <router-link
              :to="{
                name: 'UsersDetail',
                query: { sn: scope.row.appUserSn }
              }"
            >
              {{ scope.row.userNickname }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.gender')" :min-width="100">
          <template slot-scope="scope">
            <p>
              {{ getGender(scope.row.gender) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.birthday')"
          :min-width="140"
        >
          <template slot-scope="scope">
            <p>
              {{ scope.row.birthday }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.mobile')" :min-width="100">
          <template slot-scope="scope">
            <p>
              {{ scope.row.mobile }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.applyTime')"
          :min-width="160"
        >
          <template slot-scope="scope">
            <p>
              {{ scope.row.appliedTime }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.hotelName')"
          :min-width="180"
        >
          <template slot-scope="scope">
            <router-link
              :to="{
                name: 'HotelDisplayDetail',
                query: { sn: scope.row.hotelSn }
              }"
            >
              {{ scope.row.hotelName }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.stayAtHotelTime')"
          :min-width="160"
        >
          <template slot-scope="scope">
            <p>
              {{ scope.row.usedTime }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.couponIssuedTime')"
          :min-width="160"
        >
          <template slot-scope="scope">
            <p>
              {{ formatDate(scope.row.couponIssuedTime) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.usedTime')"
          :min-width="160"
        >
          <template slot-scope="scope">
            <p>
              {{ scope.row.usedTime }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.couponStartEnd')"
          :min-width="160"
        >
          <template slot-scope="scope">
            <p>
              {{ formatDate(scope.row.couponStart) }}
              {{ formatDate(scope.row.couponEnd) }}
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
import { listUserApply, onExportUserApply } from './api'
export default {
  name: 'UserlApply',
  components: { SaSection },
  data () {
    return {
      filter: {
        limit: 10,
        page: 1,
        type: Number(this.$route.params.type)
      },
      pagination: {},
      ui: {
        isTableLoading: false
      },
      data: [],
      type: [
        { name: 'page.promotion.applied', value: 1 },
        { name: 'page.promotion.hadCoupon', value: 2 },
        { name: 'page.promotion.usedCoupon', value: 3 }
      ]
    }
  },
  created () {
    this.listUserlApply()
  },
  methods: {
    async listUserlApply () {
      this.ui.isTableLoading = true
      try {
        const { data } = await listUserApply(
          this.$route.params.sn,
          this.filter
        )
        this.data = data.data.userApplieds
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    async onExport () {
      try {
        await onExportUserApply({
          promotionSn: this.$route.params.sn,
          type: this.filter.type
        })
        this.$message({
          type: 'success',
          message: this.$t('message.exportSuccess')
        })
      } catch (error) {
        return false
      }
    },
    onSizeChange (size) {
      this.filter.limit = size
      this.listUserlApply()
    },
    onCurrentChange (currentPage) {
      this.filter.page = currentPage
      this.listUserlApply()
    },
    getGender (status) {
      switch (status) {
        case 1:
          return this.$t('page.promotion.waiting')
        case 2:
          return this.$t('page.promotion.displayed')
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
