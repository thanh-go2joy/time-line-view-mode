<template>
  <sa-section>
    <div>
      <el-table :data="data" v-loading="ui.isTableLoading">
        <el-table-column label="#" type="index" />
        <el-table-column :label="$t('page.promotion.name')" :min-width="280">
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
        <el-table-column :label="$t('page.promotion.code')" :min-width="180">
          <template slot-scope="scope">
            <p>
              {{ scope.row.hotelCode }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.status')" :min-width="140">
          <template slot-scope="scope">
            <p>
              {{ getStatus(scope.row.hotelStatus) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.phone')" :min-width="180">
          <template slot-scope="scope">
            <p>
              {{ scope.row.phone }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.address')" :min-width="260">
          <template slot-scope="scope">
            <p>
              {{ scope.row.address }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.createTime')"
          :min-width="150"
        >
          <template slot-scope="scope">
            <p>
              {{ formatDate(scope.row.createTime) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.createTime')"
          :min-width="150"
        >
          <template slot-scope="scope">
            <p>
              {{ formatDate(scope.row.createTime) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.userMgt.operations')" :min-width="90">
          <el-button type="danger" plain @click="onDelete">
            {{ $t('button.delete') }}
          </el-button>
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
import { listHotelApply, onDeleteHotelApply } from './api'
export default {
  name: 'HotelApply',
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
  created () {
    this.listHotelApply()
  },
  methods: {
    async listHotelApply () {
      this.ui.isTableLoading = true
      try {
        const { data } = await listHotelApply(
          this.$route.params.sn,
          this.filter
        )
        this.data = data.data.hotelApplieds
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    async onDelete () {
      this.$confirm(
        this.$t('message.messageAlert'),
        this.$t('message.messageWarning'),
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
        .then(async () => {
          try {
            const { data } = await onDeleteHotelApply(this.$route.params.sn)
            if (data.code === 1) {
              this.listHotelApply()
              this.$message({
                type: 'success',
                message: this.$t('message.deleteSuccess')
              })
            }
          } catch (error) {
            return false
          }
        })
        .catch((error) => {
          this.$message({
            type: 'info',
            message: error
          })
        })
    },
    onSizeChange (size) {
      this.filter.limit = size
      this.listHotelApply()
    },
    onCurrentChange (currentPage) {
      this.filter.page = currentPage
      this.listHotelApply()
    },
    getStatus (status) {
      switch (status) {
        case 1:
          return this.$t('page.promotion.waiting')
        case 2:
          return this.$t('page.promotion.displayed')
        case 3:
          return this.$t('page.promotion.contracted')
        case 4:
          return this.$t('page.promotion.trial')
        case 5:
          return this.$t('page.promotion.terminated')
        case 6:
          return this.$t('page.promotion.suspended')
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
