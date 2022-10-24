<template>
  <div class="favorite-hotels">
    <el-table
      :data="favoriteHotels.hotels"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="20"
      />
      <el-table-column
        :label="$t('page.userMgt.name')"
        min-width="200"
      >
        <template slot-scope="scope">
          <router-link
            :to="{ name: 'hotelDisplayDetails', params: { sn: scope.row.sn } }"
          >
            {{ scope.row.name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        :label="$t('page.userMgt.phone')"
        min-width="100"
      />
      <el-table-column
        prop="address"
        :label="$t('page.userMgt.address')"
        min-width="200"
      />
      <el-table-column
        prop="totalReview"
        :label="$t('page.userMgt.totalReview')"
        min-width="100"
      />
      <el-table-column
        prop="totalFavorite"
        :label="$t('page.userMgt.totalFavorite')"
        min-width="100"
      />
      <el-table-column
        :label="$t('page.userMgt.averageMark')"
        min-width="180"
      >
      <template slot-scope="scope">
        <el-rate
          :value="scope.row.averageMark"
          :colors="['#ff6400', '#ff6400', '#ff6400']"
          disabled
          disabled-void-color='#2c3e50'
        />
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.lastUpdate')"
        min-width="100"
      >
      <template slot-scope="scope">
        {{ formatDate(scope.row.lastUpdate) }}
      </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="favoriteHotels.meta"
      @size-change="changePageSize"
      @current-change="changeCurrentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="favoriteHotels.meta.perPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="favoriteHotels.meta.total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'FavoriteHotels',
  props: {
    favoriteHotels: {
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
.favorite-hotels {
  .el-pagination {
    margin-top: 24px;
  }
}

</style>
