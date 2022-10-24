<template>
<sa-section>
  <div class="dashboard-block" v-loading="ui.loadingFacilityList">
      <div class="hotel-facility-mgt-segment" >
          <!-- Start Contentbar-->
          <div class="hotel-facility-mgt-segment__filter">
            <div class="hotel-facility-mgt-segment__filter--input">
              <el-input
                :placeholder="$t(`page.facilityList.placeholder`)"
                v-model="query.keyword"
                clearable
                prefix-icon="el-icon-search"
                @input="handleSearch"
              />
            </div>
            <div class="hotel-facility-mgt-segment__filter--btn">
              <el-button type="warning" icon="el-icon-plus" @click="onDirectAdd" plain>{{ $t('button.add') }}</el-button>
            </div>
          </div>
          <el-table
            :data="tableData"
            class="hotel-facility-mgt-segment__table"
          >
            <el-table-column
              type="index"
              label="#"
              min-width="200"
            />
            <el-table-column
              :label="$t('page.facilityList.name')"
              min-width="200"
            >
              <template slot-scope="scope">
                <div>
                  <div class="hotel-facility-mgt-segment__table--image-error">
                    <div class="block">
                      <el-image :src="formatImage(scope.row.imagePath)"></el-image>
                    </div>
                    <div class="text-name">
                      <span style="float:left;">{{ scope.row.name }}</span>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('page.facilityList.facility_name_en')"
              min-width="100"
            >
              <template slot-scope="scope">
                <span> {{ scope.row.nameEn }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('page.facilityList.createstaff')"
              min-width="100"
            >
              <template slot-scope="scope">
                <router-link
                  :to="{ name: 'hotel_staff_detail', params: { id: getStaffSn(scope.row.createStaff) }}">
                <span> {{ getCreatestaff(scope.row.createStaff) }}</span>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('page.facilityList.lastupdate')"
              min-width="100"
            >
              <template slot-scope="scope">
                <span> {{ formatDate(scope.row.lastUpdate) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('page.facilityList.operations')"
              min-width="50"
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
                      @click="onEditHotelFacility(scope.row.sn)"
                    >
                      {{ $t('button.edit')}}
                    </el-button>
                    <el-button
                      type="danger"
                      plain
                      size="small"
                      icon="el-icon-delete"
                      @click="onDeleteFacility(scope.row.sn)"
                    >
                      {{ $t('button.delete')}}
                    </el-button>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <div class="hotel-facility-mgt-segment__footer">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="query.page"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="pagination.perPage"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.total">
            </el-pagination>
          </div>
          </div>
  </div>
</sa-section>
</template>

<script>
import { debounce } from '@/utils/helpers'
import SaSection from '@/components/globals/SaSection'
import {
  getFacilityList,
  deleteFacility
} from './api'
const timeDebounce = 500
export default {
  name: 'HotelFacilityMgt',
  components: { SaSection },
  data () {
    return {
      ui: {
        loadingFacilityList: false
      },
      pagination: {},
      query: {
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
    await this.getHotelFacilityList(this.query)
  },
  computed: {
    getLocalize () {
      return this._i18n.locale
    }
  },
  methods: {
    async getHotelFacilityList (params) {
      this.ui.loadingFacilityList = true
      try {
        const { data } = await getFacilityList(params)
        this.tableData = data.data.facilities
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loadingFacilityList = false
      }
    }, // getListReview
    handleSearch: debounce(function () {
      this.query.page = 1
      this.getHotelFacilityList(this.query)
    }, timeDebounce), // handleSearch
    getCreatestaff (item) {
      if (!item) {
        return ''
      } else {
        return item.fullName
      }
    },
    getStaffSn (item) {
      if (!item) {
        return ''
      } else {
        return item.sn
      }
    },
    onEditHotelFacility (id) {
      this.$router.push({ name: 'facility_edit', params: { id: id } })
    },
    onDirectAdd () {
      this.$router.push({ name: 'facility_create' })
    },
    handleSizeChange (value) {
      // this.pagination.perPage = value
      this.query.limit = value
      this.getHotelFacilityList(this.query)
    },
    handleCurrentChange (value) {
      // this.pagination.currentPage = value
      this.query.page = value
      this.getHotelFacilityList(this.query)
    },
    async onDeleteFacility (id) {
      this.$confirm(`${this.$t('message.areYouSure')}`, `${this.$t('button.delete')}`, {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        this.ui.loadingActivities = true
        try {
          await deleteFacility(id)
          this.$message({
            type: 'success',
            message: `${this.$t('message.deleteSuccess')}`
          })
          this.getHotelFacilityList(this.query)
        } catch (error) {
          return false
        } finally {
          this.ui.loadingActivities = false
        }
      }).catch(error => {
        this.ui.loadingActivities = false
        this.$message({
          type: 'error',
          message: error.response ? error.response.data.message : error
        })
      })
    } // onWithdrawActivities

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
.hotel-facility-mgt-segment{
    min-height: calc(100vh - 150px );
    background-color: #ffffff;
    padding: 30px;
  &__table--image-error{
    display: grid;
    grid-template-columns: 1fr 1fr;
    .block{
      width: 100px;
      height: 100px;
      .el-image{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .text-name{
      display: flex;
      justify-content:flex-start;
      align-items: center;
      vertical-align: middle;
    }
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
      @media (max-width: 480px) {
        padding: 12px 0;
      }
    }
    @media (max-width: 480px) {
      display: block;
    }
  }
}

@media (max-width: 1200px) {
  .operations {
    color: green;
  }
}

</style>
