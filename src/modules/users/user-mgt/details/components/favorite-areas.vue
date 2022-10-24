<template>
  <div class="favorite-area">
    <el-table
      :data="favoriteAreas.areas"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="20"
      />
      <el-table-column
        prop="provinceName"
        :label="$t('page.userMgt.provinceName')"
        min-width="380"
      />
      <el-table-column
        prop="districtName"
        :label="$t('page.userMgt.districtName')"
        min-width="150"
      />
      <el-table-column
        prop="totalHotel"
        :label="$t('page.userMgt.totalHotel')"
        min-width="150"
      />
      <el-table-column
        prop="totalContracted"
        :label="$t('page.userMgt.totalContracted')"
        min-width="150"
      />
      <el-table-column
        :label="$t('page.userMgt.lastUpdate')"
        min-width="150"
      >
      <template slot-scope="scope">
        {{ formatDate(scope.row.lastUpdate) }}
      </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="favoriteAreas.meta"
      @size-change="changePageSize"
      @current-change="changeCurrentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="favoriteAreas.meta.perPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="favoriteAreas.meta.total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'FavoriteAreass',
  props: {
    favoriteAreas: {
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
.favorite-area {
  .el-pagination {
    margin-top: 24px;
  }
}
</style>
