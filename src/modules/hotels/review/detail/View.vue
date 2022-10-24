<template>
  <sa-section>
    <div class="review-mgt__filter">
      <p class="statistics">
        <span style="color: #263a5b">{{$t('page.reviewMgt.label_header')}}</span>
        <span>{{this.statistics.averageMark}}
            <span v-if="this.statistics.averageMarkFacility > 0">
              ( {{this.statistics.averageMarkFacility}} / {{this.statistics.averageMarkClean}} / {{this.statistics.averageMarkService}} )
            </span>
        </span>
        <span style="color: #263a5b">{{$t('page.reviewMgt.label_header')}}</span>
        <span>{{this.statistics.numOfReview}} ( {{this.statistics.numOfHotelReply}} )</span>
      </p>
      <el-form :inline="true" :model="filter" class="demo-form-inline">
          <el-form-item>
            <el-select
                :loading="ui.isHotelsLoading"
                v-model="filter.hotelSn"
                element-loading-spinner="el-icon-loading"
                remote
                filterable
                :placeholder="$t('page.hotelDisplay.hotelName')"
                :remote-method="onReloadHotels"
                @input="ChangelistReview"
              >
                <el-option
                  v-for="(item) in hotels"
                  :key="item.sn"
                  :label="`${item.name} - ${item.address}`"
                  :value="item.sn"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <sa-select-check
                  class="select-check"
                  v-model="filter.ratings"
                  :model-check-all="checkAll"
                  :isCheckAll="true"
                  :options="checkboxSelectType"
                  @changeCheckAll="handleCheckAll"
                  @input="handleChecked"
                  translate
                />
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="filter.category"
              element-loading-spinner="el-icon-loading"
              remote
              >
              <el-option
                  v-for="(item, index) in selectCategory"
                  :key="index"
                  :label="`${item.name}`"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              plain
              icon="el-icon-download"
              @click="onSearch"
            >
              {{ $t('button.search') }}
            </el-button>
          </el-form-item>
      </el-form>
    </div>
    <div class="review-mgt__table">
      <el-table
        :data="data"
        v-loading="ui.isReviewLoading"
      >
        <el-table-column
          label="#"
          type="index"
        />
        <el-table-column
          :label="$t('page.reviewMgt.average_rating')"
          :min-width="220"
        >
          <template slot-scope="scope">
              {{ scope.row.hotel.name }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.reviewMgt.average_rating')"
          :min-width="120"
        >
          <template slot-scope="scope">
            {{ getAveragerating(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.reviewMgt.review')"
          :min-width="120"
        >
          <template slot-scope="scope">
            {{ scope.row.hotel.comment }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.reviewMgt.reply_content')"
          :min-width="120"
        >
          <template slot-scope="scope">
            {{ scope.row.hotel.hotelReply }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.reviewMgt.num_of_like')"
          :min-width="120"
        >
          <template slot-scope="scope">
            {{ scope.row.hotel.numOfLike ? scope.row.hotel.numOfLike : 0 }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.reviewMgt.user')"
          :min-width="120"
        >
          <template slot-scope="scope">
            <el-link
              type="primary"
              :href="`/hotel/sadmin/user-details/${scope.row.appUser.sn}`"
            >
              {{ scope.row.appUser.nickName }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.reviewMgt.staff')"
          :min-width="100"
        >
          <template slot-scope="scope">
            <el-link
              type="primary"
              :href="`/hotel/sadmin/user-details/${scope.row.staffReply.sn}`"
            >
              {{ scope.row.staffReply.fullName }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.reviewMgt.staff')"
          :min-width="100"
        >
          <template slot-scope="scope">
              {{ scope.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.reviewMgt.staff')"
          :min-width="100"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status == 0"
              type="success"
              plain
              size="small"
              icon="el-icon-edit"
              @click="onShowReview(scope.row.sn)"
            >
              {{ $t('button.show') }}
            </el-button>
            <el-button
              v-if="scope.row.status == 1"
              type="danger"
              plain
              size="small"
              icon="el-icon-delete"
              @click="onHideReview(scope.row.sn)"
            >
              {{ $t('button.hide') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagination.perPage"
        :current-page="filter.page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>
  </sa-section>
</template>
<script>
import saSection from '@/components/globals/SaSection.vue'
import { listReviewDetail, onShowHideReview } from './api'
import { fetchSuggestionsHotels } from '@/api/hotels'
import saSelectCheck from '@/components/globals/SaSelectCheck.vue'
import { debounce } from '@/utils/helpers'
const allType = [10, 9, 8, 7, 6, 5]
const timeDebounce = 500
export default {
  name: 'ReviewMgt',
  components: {
    saSection,
    saSelectCheck
  },
  data () {
    return {
      sn: this.$route.query.sn,
      pagination: {},
      filter: {
        limit: 10,
        page: 1,
        keyword: '',
        ratings: [10, 9, 8, 7, 6, 5],
        sortBy: 1,
        hotelSn: this.$route.query.sn ? Number(this.$route.query.sn) : null,
        category: 1
      },
      data: [],
      hotels: [],
      checkAll: true,
      statistics: {
        averageMark: 0,
        averageMarkService: 0,
        averageMarkFacility: 0,
        averageMarkClean: 0,
        numOfHotelReviewed: 0,
        numOfReview: 0
      },
      ui: {
        isHotelsLoading: false,
        isReviewLoading: false,
        hotel: {}
      },
      checkboxSelectType: [
        { key: 'page.ratings.is_five', value: 10 },
        { key: 'page.ratings.is_four', value: 9 },
        { key: 'page.ratings.is_three', value: 8 },
        { key: 'page.ratings.is_two', value: 7 },
        { key: 'page.ratings.is_one', value: 6 },
        { key: 'page.ratings.is_zero', value: 5 }
      ]
    }
  },
  computed: {
    selectCategory () {
      return [
        { name: this.$t('page.sortBy.newest_to_oldest'), value: 1, status: true },
        { name: this.$t('page.sortBy.oldest_to_newest'), value: 2, status: true },
        { name: this.$t('page.sortBy.hotel_name_a_z'), value: 7, status: true },
        { name: this.$t('page.sortBy.hotel_name_z_a'), value: 8, status: true },
        { name: this.$t('page.sortBy.highest_to_lowest_rating'), value: 3, status: true },
        { name: this.$t('page.sortBy.lowest_to_highest_rating'), value: 4, status: true },
        { name: this.$t('page.sortBy.most_to_least_review'), value: 5, status: true },
        { name: this.$t('page.sortBy.least_to_most_review'), value: 6, status: true }
      ]
    }
  },
  created () {
    const params = { limit: 10, justHotel: 1, hotelSn: this.sn }
    this.getSuggestions(params)
    this.listReviewDetail(this.filter)
  },

  methods: {
    async getSuggestions (params) {
      try {
        const { data } = await fetchSuggestionsHotels(params)
        this.hotels = data.data.hotels
      } catch (error) {
        return false
      }
    },
    onReloadHotels: debounce(function (keyword) {
      const params = { limit: 10, justHotel: 1, keyword: keyword }
      this.getSuggestions(params)
    }, timeDebounce),
    async listReviewDetail (filter) {
      this.ui.isReviewLoading = true
      try {
        const params = {
          ...filter
        }
        params.ratings = JSON.stringify(params.ratings)
        const { data } = await listReviewDetail(params)
        this.data = data.data.hotelReviewDetails
        this.pagination = data.data.meta
        if (data.data.statistics) {
          this.statistics = data.data.statistics
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isReviewLoading = false
      }
    },
    onSearch () {
      this.filter.page = 1
      this.listReviewDetail(this.filter)
    },
    ChangelistReview () {
      this.filter.page = 1
      this.listReviewDetail(this.filter)
    },
    onSizeChange (size) {
      this.filter.limit = size
      if (Math.ceil(this.pagination.total / size) < this.pagination.currentPage) {
        this.pagination.currentPage = Math.ceil(this.pagination.total / size)
      }// when curent page is larger than total page
      this.listReviewDetail(this.filter)
    },
    onCurrentChange (currentPage) {
      this.filter.page = currentPage
      this.listReviewDetail(this.filter)
    },
    async onShowReview (sn) {
      try {
        const json = {
          userReview: [
            {
              op: 'replace',
              path: '/status',
              value: 1
            }
          ]
        }
        await onShowHideReview(sn, json)
      } catch (error) {
        return false
      }
    },
    async onHideReview (sn) {
      try {
        const json = {
          userReview: [
            {
              op: 'replace',
              path: '/status',
              value: 0
            }
          ]
        }
        await onShowHideReview(sn, json)
      } catch (error) {
        return false
      }
    },
    getHotelStatus (status) {
      switch (status) {
        case 1:
          return this.$t('hotel_status.waiting')
        case 2:
          return this.$t('hotel_status.displayed')
        case 3:
          return this.$t('hotel_status.contracted')
        case 4:
          return this.$t('hotel_status.trial')
        case 5:
          return this.$t('hotel_status.terminated')
        case 6:
          return this.$t('hotel_status.suspended')
        default:
          return 'N/A'
      }
    },
    handleCheckAll (val) {
      this.filter.page = 1
      this.checkAll = val
      this.filter.ratings = val ? allType : []
      this.listReviewDetail(this.filter)
    },
    handleChecked (arr) {
      this.filter.page = 1
      this.checkAll = arr.length === allType.length
      this.listReviewDetail(this.filter)
    },
    getAveragerating (mark) {
      if (mark.markFacility > 1) {
        return `${mark.mark} ( ${mark.markFacility} / ${mark.markClean} / ${mark.markService} )`
      } else {
        return `${mark.mark}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.statistics {
  margin-bottom: 22px !important;
  a {
    color: #409eff !important;
    font-weight: bold !important;
  }
  span {
    color: orange !important;
    display: inline-flex !important;
    vertical-align: middle !important;
    font-weight: bold !important;
  }
}
.el-popover .el-checkbox {
    display: block;
    padding: 6px 12px;
  }
  .el-popover .el-checkbox-group {
    overflow: auto;
    height: 100%;
    max-height: 200px;
  }
  .el-popover .el-checkbox-group::-webkit-scrollbar {
    width: 2px;
    background-color: #F5F5F5;
  }
  .el-popover .el-checkbox-group::-webkit-scrollbar-thumb {
    background-color: #000000;
  }
</style>
