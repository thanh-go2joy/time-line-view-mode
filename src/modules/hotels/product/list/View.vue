<template>
<sa-section>
  <div class="dashboard-block">
    <div class="product-segment"  v-loading="ui.loadingProduct">
      <div class="product-segment__filter" >
        <el-input
          :placeholder="$t(`page.product.placeholder`)"
          v-model="query.keyword"
          clearable
          prefix-icon="el-icon-search"
          @input="handleSearch"
        />
        <el-select
          v-model="query.productTypeSn"
          @change="fetchProductType"
          placeholder="Select"
        >
          <el-option
            v-for="item in optionProductType"
            :key="item.sn"
            :label="getLocalize === 'vi'? item.name : item.nameEn"
            :value="item.sn"
          />
        </el-select>
      </div>
      <div
        v-for="(item,index) in tableData"
        :key="index"
      >
        <div class="product-segment__hotel-name">
          <p>{{ item.hotelName }}</p>
        </div>
        <el-table
          :row-class-name="rowContentStyle"
          :data="item.hotelProductList"
          class="product-segment__table"
        >
          <el-table-column
            type="index"
            label="#"
            min-width="2"
          />
          <el-table-column
            :label="$t('page.product.product_name')"
            min-width="10"
          >
            <template slot-scope="scope">
              <router-link
                :to="{ name: 'product_detail', params: { id: scope.row.sn }}"
              >
              {{ scope.row.name }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.product.product_type_name')"
            min-width="8"
          >
            <template slot-scope="scope">
              <span> {{ scope.row.productTypeName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.product.price')"
            min-width="4"
          >
            <template slot-scope="scope">
              <span> {{ formatMoney(scope.row.price) }} VND</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.product.prepare_before_1_day')"
            min-width="3"
          >
            <template slot-scope="scope">
              <p v-if="scope.row.prepare == 1">✓</p>
              <p v-else> </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.product.last_update')"
            min-width="4"
          >
            <template slot-scope="scope">
              <p>{{ formatDate(scope.row.lastUpdate) }}</p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.product.status')"
            min-width="4"
          >
            <template slot-scope="scope">
              <p>{{ getStatus(scope.row.status) }}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="product-segment__footer">
        <el-pagination
          :page-sizes="[10, 20, 30, 40, 50]"
          :current-page.sync="query.page"
          :page-size="pagination.perPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</sa-section>
</template>

<script>
// @ is an alias to /src
import { debounce } from '@/utils/helpers'
import { getProductList, getProductTypeList } from './api'
import SaSection from '@/components/globals/SaSection.vue'
const timeDebounce = 500
export default {
  name: 'ProductMgt',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        loadingProduct: true
      },
      pagination: {},
      query: {
        limit: 10,
        page: 1,
        keyword: '',
        productTypeSn: this.$route.params.filter ?? ''
      },
      queryProductType: {
        limit: 100
      },
      optionProductType: {},
      tableData: []
    }
  },
  async created () {
    await this.getProductTypeList(this.queryProductType)
    await this.getProductList(this.query)
  },
  computed: {
    getLocalize () {
      return this._i18n.locale
    }
  },
  methods: {
    async getProductTypeList (params) {
      this.ui.loadingProduct = true
      try {
        const { data } = await getProductTypeList(params)
        if (data.data.hotelProductTypes.length > 0) {
          this.optionProductType = data.data.hotelProductTypes
          const arrayAll = {
            name: 'Tất cả danh mục',
            nameEn: 'All categories',
            sn: ''
          }
          this.optionProductType.unshift(arrayAll)
        }
      } catch (error) {
        return false
      } finally {
        this.ui.loadingProduct = false
      }
    }, // getProductTypeList

    async getProductList (params) {
      this.ui.loadingProduct = true
      try {
        const { data } = await getProductList(params)
        this.tableData = data.data.hotelProducts
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loadingProduct = false
      }
    }, // getProductList

    handleSearch: debounce(function () {
      this.query.page = 1
      this.getProductList(this.query)
    }, timeDebounce), // handleSearch
    fetchProductType (value) {
      this.query.page = 1
      this.query.productTypeSn = value
      this.getProductList(this.query)
    },
    handleSizeChange (value) {
      // this.pagination.perPage = value
      this.query.limit = value
      this.getProductList(this.query)
    }, // handleSizeChange

    handleCurrentChange (value) {
      // this.pagination.currentPage = value
      if (!value) {
        return
      }
      this.query.page = value
      this.getProductList(this.query)
    }, // handleCurrentChange

    getStatus (value) {
      if (!value) {
        return ''
      }
      switch (value) {
        case 0:
          return `${this.$t('option.status.deleted')}`
        case 1:
          return `${this.$t('option.status.active')}`
        case 2:
          return `${this.$t('option.status.expired')}`
        case 3:
          return `${this.$t('option.status.temp')}`
        case 4:
          return `${this.$t('option.status.draft')}`
        case 5:
          return `${this.$t('option.status.wait_confirm')}`
        default:
      };
    }, // getStatus

    rowContentStyle ({ row }) {
      if (row.productTypeStatus !== 1) {
        return 'style-background-lightgrey'
      } else {
        return ''
      }
    }

  }
}
</script>
<style lang="scss">
.style-background-lightgrey {
    background-color: lightgrey !important;
}
</style>
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
.product-segment{
    min-height: calc(100vh - 150px );
    background-color: #ffffff;
    padding: 30px;
  &__hotel-name{
    background-color: rgb(93, 178, 255);
    width:100%;
    padding:10px;
    font-weight: bold;
    color: black;
    float: left;
  }
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
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    .el-input {
      width: 300px;
    }
    .el-input--suffix {
      margin-right: 12px;
    }
  }
}

@media (max-width: 1200px) {
  .operations {
    color: green;
  }
}
</style>
