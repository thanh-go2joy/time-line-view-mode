<template>
  <sa-section >
    <div class="hotel-group-detail-segment" v-loading="ui.isLoadingHotelGroupDetail">
      <!-- Start Contentbar-->
      <div class="hotel-group-detail-segment__content--line">
          <div class="product-detail-title">
              <p>{{ $t('page.hotelGroupDetail.namegroup')}}</p>
          </div>
          <div class="product-detail-content">
              <p>{{ dataDetailHotelGroup.name }}</p>
          </div>
      </div>
      <div class="hotel-group-detail-segment__content--line">
          <div class="product-detail-title">
              <p>{{ $t('page.hotelGroupDetail.ownerinformation')}}</p>
          </div>
          <div class="product-detail-content">
              <p>{{ dataDetailHotelGroup.ownerName }} / {{ dataDetailHotelGroup.ownerTel }} / {{ dataDetailHotelGroup.ownerEmail }}</p>
          </div>
      </div>
      <div class="hotel-group-detail-segment__content--line">
          <div class="product-detail-title">
              <p>{{ $t('page.hotelGroupDetail.companyinformation')}}</p>
          </div>
          <div class="product-detail-content">
              <p>{{ dataDetailHotelGroup.companyName }} / {{ dataDetailHotelGroup.bln }} / {{ dataDetailHotelGroup.companyTel }} / {{ dataDetailHotelGroup.companyEmail }}</p>
          </div>
      </div>
      <div class="hotel-group-detail-segment__content--line">
          <div class="product-detail-title">
              <p>{{ $t('page.hotelGroupDetail.totalHotel')}}</p>
          </div>
          <div class="product-detail-content">
              <p>{{ pagination.total }}</p>
          </div>
      </div>
      <br>
      <el-table :data="tableData" class="hotel-group-detail-segment__table">
          <el-table-column type="index" label="#" min-width="20" />
          <el-table-column :label="$t('page.hotelGroupEdit.table_hotel_name')" min-width="100">
              <template slot-scope="scope">
                  <router-link :to="{ name: 'hotelDisplayDetails', params: { sn: scope.row.sn }}">
                      {{ scope.row.name }}
                  </router-link>
              </template>
          </el-table-column>
          <el-table-column :label="$t('page.hotelGroupEdit.table_status')" min-width="100">
              <template slot-scope="scope">
                  <span> {{ setHotelStatus(scope.row.hotelStatus) }}</span>
              </template>
          </el-table-column>
          <el-table-column :label="$t('page.hotelGroupEdit.table_phone')" min-width="100">
              <template slot-scope="scope">
                  <span> {{ scope.row.phone }}</span>
              </template>
          </el-table-column>
          <el-table-column :label="$t('page.hotelGroupEdit.table_address')" min-width="100">
              <template slot-scope="scope">
                  <span> {{ scope.row.address }}</span>
              </template>
          </el-table-column>
          <el-table-column :label="$t('page.hotelGroupEdit.table_commission')" min-width="100">
              <template slot-scope="scope">
                  <span> {{ scope.row.commission }} <span v-if="scope.row.commission !== 0">%</span></span>
              </template>
          </el-table-column>
      </el-table>
      <template slot="footer">
        <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[10, 20, 30, 40, 50]"
              :current-page.sync="query.page"
              :page-size="pagination.perPage"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.total">
            </el-pagination>
        <div class="hotel-group-detail-segment__button">
          <el-button type="info" size="large" @click="$router.go(-1)">
              {{ $t('button.back')}}
          </el-button>
        </div>
      </template>
      <!-- Etart Contentbar-->
    </div>
  </sa-section>
</template>

<script>
import {
  getDataHotelGroupById,
  getListHotelForHotelGroupById
} from './api'
import SaSection from '@/components/globals/SaSection'
export default {
  name: 'editHotelGroup',
  components: {
    SaSection
  },
  data: () => {
    return {
      ui: {
        isLoadingHotelGroupDetail: true
      },
      dataDetailHotelGroup: {
        bln: '',
        companyAddress: '',
        companyEmail: '',
        companyName: '',
        companyTel: '',
        name: '',
        ownerEmail: '',
        ownerName: '',
        ownerTel: ''
      },
      query: {
        limit: 10,
        page: 1
      },
      dataRes: {},
      tableData: [],
      pagination: {}
    }
  },
  created () {
    this.getHotelGroupById()
    this.getListHotelForHotelGroupById()
  },
  methods: {
    async getHotelGroupById () {
      const id = this.$route.params.id
      this.ui.isLoadingHotelGroupDetail = true
      try {
        const {
          data
        } = await getDataHotelGroupById(id)
        this.dataDetailHotelGroup = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotelGroupDetail = false
      }
    }, // getListReview
    async getListHotelForHotelGroupById () {
      const id = this.$route.params.id
      this.ui.isLoadingHotelGroupDetail = true
      try {
        const {
          data
        } = await getListHotelForHotelGroupById(id, this.query)
        this.tableData = data.data.hotels
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotelGroupDetail = false
      }
    }, // getListReview
    setHotelStatus (value) {
      if (!value) {
        return ''
      }
      switch (value) {
        case 1:
          return this.$t('option.hotelStatus.waiting')
        case 2:
          return this.$t('option.hotelStatus.displayed')
        case 3:
          return this.$t('option.hotelStatus.contracted')
        case 4:
          return this.$t('option.hotelStatus.trial')
        case 5:
          return this.$t('option.hotelStatus.terminated')
        case 6:
          return this.$t('option.hotelStatus.suspended')
        default:
          return ''
      }
    },
    handleSizeChange (value) {
      // this.pagination.perPage = value
      this.query.limit = value
      this.getListHotelForHotelGroupById(this.query)
    },
    handleCurrentChange (value) {
      // this.pagination.currentPage = value
      this.query.page = value
      this.getListHotelForHotelGroupById(this.query)
    }
  }
}
</script>

<style lang="scss" scoped>
.hotel-group-detail-segment {
  min-height: calc(100vh - 220px);
  background-color: #ffffff;
  &__content {
    border: none;
    border-radius: 3px;
    &--line {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr;
      padding: 16px 16px 16px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
      align-items: center;
      @media (min-width: 640px) {
        grid-template-columns: 1fr 3fr;
      }
      justify-content: center;
      align-items: center;
      text-align: left;
    }
    &--title {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr;
      padding: 5px 0;
      .style-title-list {
        color: #409eff;
        font-weight: bold;
        border-top: 1px solid #8a98ac;
        border-bottom: 1px solid #8a98ac;
        padding: 15px 0;
      }
    }

    &--line-end {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr;
      padding: 16px 16px 16px 0;
      align-items: center;

      @media (min-width: 640px) {
          grid-template-columns: 1fr 3fr;
      }

      justify-content: center;
      align-items: center;
      text-align: left;
    }
    &--title {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr;
      padding: 5px 0;

      .style-title-list {
          color: #409eff;
          font-weight: bold;
          border-top: 1px solid #8a98ac;
          border-bottom: 1px solid #8a98ac;
          padding: 15px 0;
      }
    }
  }
  &__button {
    display: flex;
    ;
    justify-content: flex-end;
  }
}
</style>
