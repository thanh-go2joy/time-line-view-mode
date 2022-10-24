<template>
  <div class="user-stamps">
    <el-table
      :data="userStamps.stamps"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="20"
      />
      <el-table-column
        prop="hotelName"
        :label="$t('page.userMgt.hotelName')"
        min-width="250"
      />
      <el-table-column
        prop="numStampActiveRedeem"
        :label="$t('page.userMgt.numStampActiveRedeem')"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.numStampActive }}/{{ scope.row.numToRedeem }}
        </template>
      </el-table-column>
      <el-table-column
        prop="numStampExpire"
        :label="$t('page.userMgt.numStampExpire')"
        min-width="160"
      />
      <el-table-column
        :label="$t('page.userMgt.totalRedeem')"
        min-width="160"
      >
      <template slot-scope="scope">
        {{ scope.row.totalRedeem }}
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.startJoinTime')"
        min-width="250"
      >
      <template slot-scope="scope">
        {{ formatDate(scope.row.startJoinTime, false) }}
      </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="userStamps.meta"
      @size-change="changePageSize"
      @current-change="changeCurrentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="userStamps.meta.perPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="userStamps.meta.total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'UserStamps',
  props: {
    userStamps: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
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
.user-stamps {
  .el-pagination {
    margin-top: 24px;
  }
}
</style>
