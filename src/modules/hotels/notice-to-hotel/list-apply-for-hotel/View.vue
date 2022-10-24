<template>
<sa-section>
  <div class="dashboard-block">
    <div
      class="list-apply-hotel-notice-segment"
      v-loading="ui.loadingNoticeToHotelList"
    >
      <el-table
        :data="tableData"
        class="list-apply-hotel-notice-segment__table"
      >
          <el-table-column type="index" label="#" min-width="20" />
          <el-table-column :label="$t('page.noticeApplyHotel.hotel_name')" min-width="80">
            <template slot-scope="scope">
              <div>
                <router-link :to="{ name: 'hotelDisplayDetails', params: { sn: scope.row.sn }}">
                  <span>{{ scope.row.name }}</span>
                </router-link>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('page.noticeApplyHotel.status')" min-width="100">
            <template slot-scope="scope">
              <span> {{ getLabelStatusHotel(scope.row.hotelStatus) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('page.noticeApplyHotel.phone')" min-width="100">
            <template slot-scope="scope">
              <span> {{ scope.row.phone }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('page.noticeApplyHotel.address')" min-width="100">
            <template slot-scope="scope">
              <span> {{ scope.row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('page.noticeApplyHotel.create_time')" min-width="100">
            <template slot-scope="scope">
              <span> {{ formatDate(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('page.noticeApplyHotel.last_update')" min-width="100">
            <template slot-scope="scope">
              <span> {{ formatDate(scope.row.lastUpdate) }}</span>
            </template>
          </el-table-column>
      </el-table>
      <div class="list-apply-hotel-notice-segment__footer">
        <el-pagination
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pagination.perPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <div class="list-apply-hotel-notice-segment__button">
        <el-button type="success" @click="onDirectList" icon="el-icon-s-unfold" >
          {{ $t('button.list')}}
        </el-button>
      </div>
    </div>
  </div>
</sa-section>
</template>

<script>
// @ is an alias to /src
import {
  loadApplyingHotelFaq
} from './api'
import SaSection from '@/components/globals/SaSection'
export default {
  name: 'ApplyNoticeToHotel',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        loadingNoticeToHotelList: true
      },
      pagination: {},
      query: {
        limit: 10,
        page: 1,
        faqInformationSn: this.$route.query && this.$route.query.id ? this.$route.query.id : ''
      },
      tableData: [],
      dataRes: null

    }
  },
  async created () {
    this.ui.loadingNoticeToHotelList = false
    this.onLoadListHotel(this.query)
  },
  computed: {
    getLocalize () {
      return this._i18n.locale
    }
  },
  methods: {

    // on load list hotel apply
    async onLoadListHotel (query) {
      this.ui.loadingNoticeToHotelList = true
      try {
        const {
          data
        } = await loadApplyingHotelFaq(query)
        this.dataRes = data.data
        this.tableData = this.dataRes.hotels
        this.pagination = this.dataRes.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loadingNoticeToHotelList = false
      }
    },

    // pagination handleSize
    handleSizeChange (value) {
      this.query.limit = value
      this.onLoadListHotel(this.query)
    },
    // pagination handlePage
    handleCurrentChange (value) {
      this.query.page = value
      this.onLoadListHotel(this.query)
    },
    // Get status hotel
    getLabelStatusHotel (status) {
      if (!status) {
        return ''
      }
      switch (status) {
        case 1:
          return this.$t('page.collection.waiting')
        case 2:
          return this.$t('page.collection.displayed')
        case 3:
          return this.$t('page.collection.contracted')
        case 4:
          return this.$t('page.collection.trial')
        case 5:
          return this.$t('page.collection.terminated')
        case 6:
          return this.$t('page.collection.suspended')
        default:
          return ''
      }
    },

    onDirectList () {
      this.$router.push('/hotel/sadmin/notice-to-hotel')
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

.el-table th,
.el-table .custom-style-background {
    background-color: #fce5e5 !important;
}

.list-apply-hotel-notice-segment {
    min-height: calc(100vh - 150px);
    background-color: #ffffff;
    // padding: 30px;

    &__table--image-error {
        display: grid;
        grid-template-columns: 1fr 1fr;

        .block {
            width: 100px;
            height: 100px;

            .el-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .text-name {
            display: flex;
            justify-content: center;
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
        margin-top: 30px;
    }

    &__filter {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        align-items: center;
        margin-bottom: 24px;

        &--input {
                width: 200px;
        }

        &--btn {
            button {
                float: left;
            }

        }
        &--btn-group{
          float: right;
          .btn-primary-rgba {
                background-color: #f387001a;
                border: none;
                color: #ff6400;
            }
            .btn-primary-rgba:hover {
                background-color: #ff6400;
                border: none;
                color: #ffffff;
            }
        }
        &--select{
          padding-right: 15px;
        }
    }
    &__button {
      padding: 15px 0;
      button {
        float: right;
      }
    }
}

@media (max-width: 1200px) {
    .operations {
        color: green;
    }
}
</style>
