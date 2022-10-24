<template>
  <sa-section>
    <div class="hote-debt-detail-list-mgt__filter">
      <el-form :inline="true" :model="filter" class="demo-form-inline float-left">
        <el-form-item>
          <p>{{ hotelName }}</p>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-download" plain  @click="onExport">
            {{ $t('button.export') }}
          </el-button>
        </el-form-item>
      </el-form>
      <div class="float-right">
        <router-link
          class="el-button el-button--danger is-plain"
          :to="{name: 'hotelDebtCreate', query: {createType: 'debt'}}"
        >
          <i class="el-icon-plus" />
          {{ $t('page.hotelDebt.new_hotel_debt') }}
        </router-link>
        <router-link
          class="el-button el-button--danger is-plain"
          :to="{name: 'hotelDebtCreate', query: {createType: 'paid'}}"
        >
          <i class="el-icon-plus" />
          {{ $t('page.hotelDebt.new_hotel_paid') }}
        </router-link>
      </div>
    </div>
    <div class="hote-debt-detail-list-mgt__table">
      <div>
        <el-table
          :data="data"
          v-loading="ui.isTableLoading"
        >
          <el-table-column label="#" type="index" :index="indexMethod"/>
          <el-table-column
            :label="$t('page.hotelDebt.current_debt')"
            :min-width="100"
          >
            <template slot-scope="scope">
              <p v-if="scope.$index !== 0">
                {{ formatMoney(scope.row.currentDebt) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.hotelDebt.period_debt')"
            :min-width="100"
          >
            <template slot-scope="scope">
              <p v-if="scope.$index !== 0">
                {{ formatMoney(scope.row.periodDebt) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.hotelDebt.period_debt_time')"
            :min-width="200"
          >
            <template slot-scope="scope">
              <p v-if="scope.row.startDate">
                {{ scope.row.startDate }} ~
                {{ scope.row.endDate }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.hotelDebt.pay_date')"
            :min-width="100"
          >
            <template slot-scope="scope">
              <p>
                {{ scope.row.payDate }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.hotelDebt.other_debt')"
            :min-width="100"
          >
            <template slot-scope="scope">
              <p>
                {{ formatMoney(scope.row.otherDebt) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.hotelDebt.pay_amount')"
            :min-width="100"
          >
            <template slot-scope="scope">
              <p>
                {{ formatMoney(scope.row.payAmount) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.hotelDebt.balance')"
            :min-width="100"
          >
            <template slot-scope="scope">
              <p  v-if="scope.$index !== 0">
                {{ formatMoney(scope.row.balance) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.hotelDebt.create_time')"
            :min-width="100"
          >
            <template slot-scope="scope">
              <p v-if="scope.$index !== 0">
                {{ formatMoney(scope.row.createTime) }}
              </p>
            </template>
          </el-table-column>
            <el-table-column
            :label="$t('page.hotelDebt.create_time')"
            :min-width="100"
          >
            <template slot-scope="scope">
              <el-popover
                placement="left"
                trigger="click"
                v-if="scope.$index !== 0"
              >
                <i slot="reference" class="operations el-icon-more" />
                <div class="operations">
                  <router-link
                      v-if="scope.$index !== 0"
                      :to="{name: 'hotelDebtDetail', params: {sn: scope.row.sn}}"
                      style="margin: auto"
                  >
                    {{ $t('button.detail') }}
                  </router-link>
                  <router-link
                      v-if="scope.$index !== 0"
                      :to="{name: 'hotelDebtEdit', params: {sn: scope.row.sn}}"
                      class="el-button el-button--success el-button--small is-plain"
                  >
                    {{ $t('button.edit') }}
                  </router-link>
                  <el-button
                    type="danger"
                    plain
                    size="small"
                    @click="onDelete(scope.row.sn)"
                  >
                    {{ $t('button.delete') }}
                  </el-button>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <template slot="footer">
          <el-pagination
            @size-change="onSizeChange"
            @current-change="onCurrentChange"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pagination.perPage"
            :current-page="filter.page"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
          />
        </template>
      </div>
    </div>
  </sa-section>
</template>
<script>
import saSection from '@/components/globals/SaSection.vue'
import { listHotetDebt, onExportHotetDebt } from './api'
export default {
  name: 'HotelDebtDetailList',
  components: {
    saSection
  },
  data () {
    return {
      filter: {
        limit: 10,
        page: 1,
        hotelSn: Number(this.$route.params.sn)
      },
      pagination: {},
      ui: {
        isTableLoading: false
      },
      hotelName: '',
      data: []
    }
  },
  computed: {
  },
  created () {
    this.listHotetDebt()
  },

  methods: {
    async listHotetDebt () {
      this.ui.isTableLoading = true
      try {
        const params = {
          ...this.filter
        }
        const { data } = await listHotetDebt(params)
        this.data = data.data.hotelDebts
        this.hotelName = this.data[0].hotel.name
        this.data.unshift(data.data.statistics)
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    async onExport () {
      try {
        const formData = {
          ...this.filter
        }
        await onExportHotetDebt(formData)
        this.$message({
          type: 'success',
          message: this.$t('message.exportSuccess')
        })
      } catch (error) {
        return false
      }
    },
    onEdit () {

    },
    onDelete () {

    },
    onSizeChange (size) {
      this.filter.limit = size
      if (
        Math.ceil(this.pagination.total / size) < this.pagination.currentPage
      ) {
        this.pagination.currentPage = Math.ceil(this.pagination.total / size)
      } // when curent page is larger than total page
      this.listHotetDebt()
    },
    onCurrentChange (currentPage) {
      this.filter.page = currentPage
      this.listHotetDebt()
    },
    indexMethod (index) {
      if (index === 0) {
        return ''
      } else {
        return index
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.operations{
    padding: 8px 12px;
    display: flex;
    white-space: break-spaces;
}
</style>
