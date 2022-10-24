<template>
<sa-section class="hotel-group-mgt-segment" v-loading="ui.loadingHotelGroup">
  <template slot="header" class="hotel-group-mgt-segment__filter">
    <el-form
      :inline="true"
      :model="filter"
      class="demo-form-inline float-left"
    >
      <el-form-item>
        <el-input
          :placeholder="$t(`page.product.placeholder`)"
          v-model="filter.keyword"
          clearable
          prefix-icon="el-icon-search"
          @input="handleSearch"
        />
      </el-form-item>
    </el-form>
    <div style="float: right;">
      <el-button
      type="warning"
      icon="el-icon-plus"
      @click="onDirectAdd"
      plain
    >
      {{ $t('button.add') }}
    </el-button>
    </div>
  </template>
  <el-table
    :data="tableData"
    class="hotel-group-mgt-segment__table"
  >
    <el-table-column
      type="index"
      label="#"
      min-width="20"
    />
    <el-table-column
      :label="$t('page.hotelGroupList.name')"
      min-width="100"
    >
      <template slot-scope="scope">
        <router-link
          :to="{ name: 'hotel_group_detail', params: { id: scope.row.sn }}"
        >
          {{ scope.row.name }}
        </router-link>
      </template>
    </el-table-column>
    <el-table-column
      :label="$t('page.hotelGroupList.ownerName')"
      min-width="100"
    >
      <template slot-scope="scope">
        <span> {{ scope.row.ownerName }}</span>
      </template>
    </el-table-column>
    <el-table-column
      :label="$t('page.hotelGroupList.ownerTel')"
      min-width="100"
    >
      <template slot-scope="scope">
        <span> {{ scope.row.ownerTel }}</span>
      </template>
    </el-table-column>
    <el-table-column
      :label="$t('page.hotelGroupList.ownerEmail')"
      min-width="100"
    >
      <template slot-scope="scope">
        <span> {{ scope.row.ownerEmail }}</span>
      </template>
    </el-table-column>
    <el-table-column
      :label="$t('page.hotelGroupList.companyName')"
      min-width="100"
    >
      <template slot-scope="scope">
        <span> {{ scope.row.companyName }}</span>
      </template>
    </el-table-column>
    <el-table-column
      :label="$t('page.hotelGroupList.bln')"
      min-width="100"
    >
      <template slot-scope="scope">
        <span> {{ scope.row.bln }}</span>
      </template>
    </el-table-column>
    <el-table-column
      :label="$t('page.hotelGroupList.companyAddress')"
      min-width="100"
    >
      <template slot-scope="scope">
        <span> {{ scope.row.companyAddress }}</span>
      </template>
    </el-table-column>
    <el-table-column
      :label="$t('page.hotelGroupList.companyTel')"
      min-width="100"
    >
      <template slot-scope="scope">
        <span> {{ scope.row.companyTel }}</span>
      </template>
    </el-table-column>
    <el-table-column
      :label="$t('page.hotelGroupList.companyEmail')"
      min-width="100"
    >
      <template slot-scope="scope">
        <span> {{ scope.row.companyEmail }}</span>
      </template>
    </el-table-column>
    <el-table-column
      :label="$t('page.hotelGroupList.totalHotel')"
      min-width="100"
    >
      <template slot-scope="scope">
        <span> {{ scope.row.totalHotel }}</span>
      </template>
    </el-table-column>
    <el-table-column
      :label="$t('page.productType.operations')"
      min-width="80"
    >
      <template slot-scope="scope">
        <el-popover
          placement="left"
          trigger="click"
        >
          <i slot="reference" class="operations el-icon-more" />
          <div style="padding: 8px 12px;">
            <el-button
              type="success"
              plain
              size="small"
              icon="el-icon-edit"
              @click="onEditHotelGroup(scope.row.sn)"
            >
              {{ $t('button.edit')}}
            </el-button>
          </div>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
  <div class="hotel-group-mgt-segment__footer">
    <el-pagination
      :current-page.sync="filter.page"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pagination.perPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</sa-section>
</template>

<script>
// @ is an alias to /src
import { debounce } from '@/utils/helpers'
import { fetchHotelGroups } from '@/api/hotels'
import SaSection from '@/components/globals/SaSection.vue'
const timeDebounce = 500
export default {
  name: 'HotelGroupMgt',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        loadingHotelGroup: false
      },
      pagination: {},
      filter: {
        limit: 10,
        page: 1,
        keyword: ''
      },
      tableData: [],
      activeValue: 1,
      inactiveValue: 0
    }
  },
  async created () {
    await this.fetchHotelGroups(this.filter)
  },
  computed: {
    getLocalize () {
      return this._i18n.locale
    }
  },
  methods: {
    async fetchHotelGroups (params) {
      this.ui.loadingHotelGroup = true
      try {
        const { data } = await fetchHotelGroups(params)
        this.tableData = data.data.hotelGroups
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loadingHotelGroup = false
      }
    }, // getListReview
    handleSearch: debounce(function () {
      this.filter.page = 1
      this.fetchHotelGroups(this.filter)
    }, timeDebounce), // handleSearch

    onEditHotelGroup (id) {
      this.$router.push({ name: 'hotel_group_edit', params: { id: id } })
    },
    onDirectAdd () {
      this.$router.push({ name: 'hotel_group_create' })
    },
    onDirectDSKS (id) {
      this.$router.push({ name: 'product_mgt', params: { filter: id } })
    },
    handleSizeChange (value) {
      // this.pagination.perPage = value
      this.filter.limit = value
      this.fetchHotelGroups(this.filter)
    },
    handleCurrentChange (value) {
      // this.pagination.currentPage = value
      this.filter.page = value
      this.fetchHotelGroups(this.filter)
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
}
.el-table th, .el-table .custom-style-background{
  background-color: #fce5e5 !important;
}
.hotel-group-mgt-segment{
  .el-table {
    td {
      font-size: 12px;
    }
  }
  &__header {
    margin-bottom: 20px;
    &--red {
      color: #F56C6C;
    }
  }
  &__footer {
    margin-top: 30px  ;
  }
  &__filter {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    margin-bottom: 24px;
    &--input{
      .el-input {
        width: 250px;
      }
    }
    &--btn{
      button{
        float: right;
      }
    }
  }
}

@media (max-width: 1200px) {
  .operations {
    color: green;
  }
}

</style>
