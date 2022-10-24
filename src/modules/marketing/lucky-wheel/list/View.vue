<template>
  <sa-section
    class="luckyWheel"
    v-loading="ui.loading"
  >
    <template slot="header">
      <el-button
        plain
        type="success"
        icon="el-icon-plus"
        style="float: right;"
        @click="$router.push({ name: 'createEditLuckyWheel' })"
      >
        {{ $t('button.add') }}
      </el-button>
    </template>
    <el-table
      :data="luckyWheel"
    >
      <el-table-column label="#" type="index" />
      <el-table-column
        :label="$t('page.lucky-wheel.coupon')"
        :min-width="85"
      >
        <template slot-scope="scope">
          <p>
            {{ scope.row.couponName }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.lucky-wheel.content')"
        :min-width="85"
      >
        <template slot-scope="scope">
          <p>
            {{ scope.row.text }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.lucky-wheel.images')"
        min-width="50"
      >
        <template slot-scope="scope">
          <el-image
            style="max-width: 100px; max-height: 100px"
            :src="formatImage(scope.row.imagePath)"
            fit="scale-down"
          />
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.lucky-wheel.listCouponOneDayOrigin')"
        :min-width="85"
      >
        <template slot-scope="scope">
          <p>
            {{ scope.row.limitCouponOneDayOrigin }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.lucky-wheel.percentOrigin')"
        :min-width="85"
      >
        <template slot-scope="scope">
          <p>
            {{ scope.row.percentOrigin }} %
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.lucky-wheel.display')"
        :min-width="85"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.status === 1">{{ $t('option.status.active') }}</p>
          <p v-else>{{ $t('option.status.disable') }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.lucky-wheel.createTime')"
        :min-width="85"
      >
        <template slot-scope="scope">
          <p>
            {{ scope.row.createTime }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.lucky-wheel.lastUpdate')"
        :min-width="85"
      >
        <template slot-scope="scope">
          <p>
            {{ scope.row.lastUpdate }}
          </p>
        </template>
      </el-table-column>
       <el-table-column
          :label="$t('page.userMgt.operations')"
          :min-width="90"
        >
          <template slot-scope="scope">
            <router-link
              class="el-button el-button--success white-color"
              :to="{ name: 'createEditLuckyWheel', params: { sn: scope.row.sn } }"
            >
              {{ $t('button.edit') }}
            </router-link>
          </template>
        </el-table-column>
    </el-table>
    <template slot="footer">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="filter.limit"
          :current-page="filter.page"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
    </template>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { fetchLuckyWheel } from './api'
// import { debounce } from '@/utils/helpers'
// const timeDebounce = 500
export default {
  components: { SaSection },
  name: 'luckyWheel',
  data: (vm) => {
    return {
      ui: {
        loading: false
      },
      luckyWheel: [],
      pagination: {},
      filter: {
        page: 1,
        limit: 10
      }
    }
  },
  created () {
    this.fetchLuckyWheel()
  },
  methods: {
    async fetchLuckyWheel () {
      this.ui.loading = true
      try {
        const { data } = await fetchLuckyWheel(this.filter)
        this.luckyWheel = data.data.luckyWheelDetailList
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchLuckyWheel()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchLuckyWheel()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
