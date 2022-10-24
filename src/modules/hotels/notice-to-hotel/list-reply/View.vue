<template>
<sa-section>
  <div class="dashboard-block" v-loading="ui.loadingReplyNoticeList">
    <div class="notice-to-hotel-list-segment" >
      <div  class="notice-to-hotel-list-segment__filter">
        <div class="notice-to-hotel-list-segment__filter--btn">
          <el-button
            type="success"
            icon="el-icon-menu"
            plain
            @click="onDirectListNotice"
          >
            {{ $t('button.list') }}
          </el-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        class="notice-to-hotel-list-segment__table"
      >
        <el-table-column type="index" label="#" min-width="20" />
        <el-table-column :label="$t('page.noticeHotelList.hotel_name')" min-width="80">
          <template slot-scope="scope">
            <div>
              <router-link :to="{ name: 'hotelDisplayDetails', params: { sn: scope.row.hotelSn } }">
                  <span>{{ scope.row.hotelName }}</span>
              </router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.noticeHotelList.status')" min-width="100">
          <template slot-scope="scope">
            <span> {{ setHotelStatus(scope.row.hotelStatus) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.noticeHotelList.phone')" min-width="100">
          <template slot-scope="scope">
            <span >{{ scope.row.hotelPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.noticeHotelList.address')" min-width="100">
          <template slot-scope="scope">
            <span> {{ scope.row.hotelAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.noticeHotelList.create_time')" min-width="100">
          <template slot-scope="scope">
            <span> {{ formatDate(scope.row.hotelCreateTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.noticeHotelList.last_update')" min-width="100">
          <template slot-scope="scope">
            <span> {{ formatDate(scope.row.lastUpdate) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.noticeList.operations')" align="center" min-width="50">
          <template slot-scope="scope">
            <el-popover placement="left" trigger="click">
              <i slot="reference" class="operations el-icon-more" />
              <div style="padding: 8px 12px;">
                <el-button
                  type="primary"
                  plain
                  size="small"
                  @click="onReplyNoticeToHotelById(scope.row.faqHotelSn,scope.row.hotelSn)"
                >
                  {{ $t('button.reply')}}
                </el-button>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="notice-to-hotel-list-segment__footer">
          <el-pagination
            :current-page.sync="query.page"
            :page-sizes="[10, 20, 30, 40, 50]"
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
import SaSection from '@/components/globals/SaSection'
import {
  getLisReplytNotice
} from './api'
export default {
  name: 'ListReplyNoticeById',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        loadingReplyNoticeList: false

      },
      pagination: {},
      query: {
        limit: 10,
        page: 1,
        keyword: ''
      },
      tableData: [],
      activeValue: 1,
      inactiveValue: 0,
      id: this.$route.params.id,
      checkBox: {
        isIndeterminateStatus: false
      }
    }
  },
  async created () {
    await this.getDataReplyNoticeList(this.id, this.query)
  },
  computed: {
    getLocalize () {
      return this._i18n.locale
    }
  },
  methods: {
    async getDataReplyNoticeList (id, params) {
      this.ui.loadingReplyNoticeList = true
      try {
        const {
          data
        } = await getLisReplytNotice(id, params)

        this.tableData = data.data.hotelApply
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loadingReplyNoticeList = false
      }
    }, // getListReview

    onDirectListNotice () {
      this.$router.push({
        name: 'notice_to_hotel'
      })
    },

    handleSizeChange (value) {
      // this.pagination.perPage = value
      this.query.limit = value
      this.getDataReplyNoticeList(this.id, this.query)
    },

    handleCurrentChange (value) {
      // this.pagination.currentPage = value
      this.query.page = value
      this.getDataReplyNoticeList(this.id, this.query)
    },

    onReplyNoticeToHotelById (faqHotelSn, hotelSn) {
      this.$router.push({ name: 'reply_to_hotel', params: { id: this.id, faqHotelSn: faqHotelSn, hotelSn: hotelSn } })
    }, // onReplyNoticeToHotelById

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
    }

  }
}
</script>
<style>
.custom-style-background-fce5e5{
  background-color: #fce5e5 !important;
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

.el-table th,
.el-table .custom-style-background {
    background-color: #fce5e5 !important;
}

.notice-to-hotel-list-segment {
    min-height: calc(100vh - 150px);
    background-color: #ffffff;
    padding: 30px;

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

        &--btn {
            button {
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
