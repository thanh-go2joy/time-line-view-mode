<template>
  <div class="coupon">
    <el-table
      :data="coupons.coupons"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="20"
      />
      <el-table-column
        :label="$t('page.userMgt.promotionName')"
        min-width="250"
      >
        <template slot-scope="scope">
          <router-link
            :to="{
              name: 'promotionDetails',
              params: {
                  promotionSn: scope.row.sn,
                  couponSn: scope.row.couponSn
                }
              }"
            >
            {{ scope.row.promotionName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.discount')"
        min-width="160"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.discountType === 1">
            {{ formatMoney(scope.row.discount) }}
          </span>
          <span v-if="scope.row.discountType === 2">
            {{ scope.row.discount }} %
          </span>
          <span v-if="scope.row.discountType === 3">
            <img :src="gifBoxSrc" style="width: 20px; height: 20px;" alt="giftbox">
          </span>
          <span v-if="scope.row.discountType === 4">
            <img :src="clockSrc" style="width: 20px; height: 20px;" alt="clock">
          </span>
          <span v-if="scope.row.discountType === 5">
            DG {{ formatMoney(scope.row.discount) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.issueTime')"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.issueTime) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.effectTime')"
        min-width="160"
      >
      <template slot-scope="scope">
        {{ scope.row.start }} ~ {{ scope.row.end }}
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.used')"
        min-width="250"
      >
      <template slot-scope="scope">
        <span v-if="scope.row.used === 0">{{ $t('page.userMgt.not_yet') }}</span>
        <span v-else-if="scope.row.used === 1">{{ $t('page.userMgt.statusUsed') }}</span>
        <span v-else-if="scope.row.used === 2">{{ $t('page.userMgt.expired') }}</span>
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.usedTime')"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.usedTime) }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="coupons.meta"
      @size-change="changePageSize"
      @current-change="changeCurrentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="coupons.meta.perPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="coupons.meta.total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'CounponTable',
  data: () => {
    return {
      gifBoxSrc: require('@/assets/images/svg/gifts.svg'),
      clockSrc: require('@/assets/images/svg/clock.svg')
    }
  },
  props: {
    coupons: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    // pagination events
    changePageSize (value) {
      this.$emit('size-change', value)
    },
    changeCurrentPage (value) {
      this.$emit('current-change', value)
    }
  }
}
</script>
<style lang="scss" scoped>
.coupon {
  .el-pagination {
    margin-top: 24px;
  }
}
</style>
