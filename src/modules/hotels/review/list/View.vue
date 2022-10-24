<template>
  <sa-section>
    <template slot="header" class="review-mgt__filter">
      <p class="statistics" v-if="data && data.length > 0">
        <a
          class="el-link el-link--default is-underline"
          href="review/detail"
        >
          {{$t('page.reviewMgt.label_header')}}
        </a>&nbsp;
        <span> {{statistics.averageMark}} ( {{statistics.averageMarkFacility}} / {{statistics.averageMarkClean}} / {{statistics.averageMarkService}} ) / {{statistics.numOfHotelReviewed}} /  {{statistics.numOfReview}}</span>
      </p>
      <el-form :inline="true" :model="filter" class="demo-form-inline">
          <el-form-item>
            <el-select
                :loading="ui.isHotelsLoading"
                v-model="ui.hotel"
                value-key="sn"
                element-loading-spinner="el-icon-loading"
                remote
                filterable
                prefix-icon="el-icon-search"
                clearable
                :placeholder="$t('page.hotelDisplay.hotelName')"
                :remote-method="onReloadHotels"
                @input="ChangelistReview"
              >
                <el-option
                    v-for="(item, index) in hotels"
                    :key="index"
                    :label="`${item.name} - ${item.address}`"
                    :value="{sn: item.sn,status: item.hotelStatus}"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
                <sa-select-check
                  class="select-check"
                  v-model="filter.type"
                  :model-check-all="checkAll"
                  :options="checkboxSelectType"
                  :isCheckAll="true"
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
              @input="listReview"
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
            <el-select
              v-model="filter.provinceSn"
              element-loading-spinner="el-icon-loading"
              remote
              @input="listReview"
            >
              <el-option
                  v-for="(item, index) in provinces"
                  :key="index"
                  :label="`${item.name}`"
                  :value="item.sn"
              >
              </el-option>
            </el-select>
          </el-form-item>
      </el-form>
    </template>
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
          :label="$t('page.reviewMgt.hotel_name')"
          :min-width="220"
        >
          <template slot-scope="scope">
            <el-link
              type="primary"
              :href="`/hotel/sadmin/review/detail?sn=${scope.row.hotel.sn}`"
            >
              {{ scope.row.hotel.name }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.reviewMgt.hotel_status')"
          :min-width="120"
        >
          <template slot-scope="scope">
            {{ getHotelStatus(scope.row.hotel.hotelStatus) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.reviewMgt.address')"
          :min-width="220"
        >
          <template slot-scope="scope">
            {{ scope.row.hotel.address }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.reviewMgt.average_rating')"
          :min-width="160"
        >
          <template slot-scope="scope">
            {{ `${scope.row.hotel.averageMark} ( ${scope.row.hotel.averageMarkFacility} / ${scope.row.hotel.averageMarkClean} / ${scope.row.hotel.averageMarkService} )` }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.reviewMgt.number_of_review')"
          :min-width="160"
        >
          <template slot-scope="scope">
            {{ `${scope.row.hotel.totalReview} ( ${scope.row.numOfHotelReply} )` }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.reviewMgt.num_of_review_like')"
          :min-width="90"
        >
          <template slot-scope="scope">
            {{ scope.row.numOfLike }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.reviewMgt.last_review')"
          :min-width="160"
        >
          <template slot-scope="scope">
            {{ scope.row.hotel.lastComment }}
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
        :total="pagination.total"
      />
    </div>
  </sa-section>
</template>
<script>
import saSection from '@/components/globals/SaSection.vue'
import { listReview } from './api'
import { fetchProvinces } from '@/api/province'
import { fetchSuggestionsHotels } from '@/api/hotels'
import saSelectCheck from '@/components/globals/SaSelectCheck.vue'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
const allType = [0, 1, 2, 3, 4, 5]

export default {
  name: 'ReviewMgt',
  components: {
    saSection,
    saSelectCheck
  },
  data () {
    return {
      pagination: {},
      filter: {
        limit: 10,
        page: 1,
        keyword: '',
        type: [0, 1, 2, 3, 4, 5],
        category: 1,
        provinceSn: ''
      },
      ui: {
        isHotelsLoading: false,
        isReviewLoading: false,
        hotel: {}
      },
      data: [],
      hotels: [],
      provinces: [],
      checkAll: true,
      statistics: {
        averageMark: 0,
        averageMarkService: 0,
        averageMarkFacility: 0,
        averageMarkClean: 0,
        numOfHotelReviewed: 0,
        numOfReview: 0
      },
      checkboxSelectType: [
        { key: 'page.ratings.from_4_to_5', value: 4 },
        { key: 'page.ratings.from_3_to_less_than_4', value: 3 },
        { key: 'page.ratings.from_2_to_less_than_3', value: 2 },
        { key: 'page.ratings.from_1_to_less_than_2', value: 1 },
        { key: 'page.ratings.under_1', value: 0 }
      ]
    }
  },
  computed: {
    selectCategory () {
      return [
        { name: this.$t('page.sortBy.newest_to_oldest'), value: 1 },
        { name: this.$t('page.sortBy.oldest_to_newest'), value: 2 },
        { name: this.$t('page.sortBy.hotel_name_a_z'), value: 7 },
        { name: this.$t('page.sortBy.hotel_name_z_a'), value: 8 },
        { name: this.$t('page.sortBy.highest_to_lowest_rating'), value: 3 },
        { name: this.$t('page.sortBy.lowest_to_highest_rating'), value: 4 },
        { name: this.$t('page.sortBy.most_to_least_review'), value: 5 },
        { name: this.$t('page.sortBy.least_to_most_review'), value: 6 }
      ]
    }
  },
  created () {
    this.getProvides()
    this.listReview(this.filter)
    this.getSuggestions()
  },

  methods: {
    async getSuggestions (keyword) {
      try {
        this.ui.isHotelsLoading = true
        this.hotels = []
        const params = { limit: 10, justHotel: 0, keyword: keyword }
        const { data } = await fetchSuggestionsHotels(params)
        this.hotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.isHotelsLoading = false
      }
    },
    onReloadHotels: debounce(function (keyword) {
      this.filter.page = 1
      this.getSuggestions(keyword)
    }, timeDebounce),
    async getProvides (keyword) {
      try {
        const params = { limit: 100, status: 1 }
        const { data } = await fetchProvinces(params)
        this.provinces = [{ name: this.$t('option.all'), sn: -1 }, ...data.data.provinces]
      } catch (error) {
        return false
      }
    },
    async listReview () {
      this.ui.isReviewLoading = true
      try {
        if (this.ui.hotel?.status === -1) {
          this.$delete(this.filter, 'hotelSn')
          this.filter.hotelGroupSn = this.ui.hotel?.sn
        } else {
          this.$delete(this.filter, 'hotelGroupSn')
          this.filter.hotelSn = this.ui.hotel?.sn
        }
        const params = {
          ...this.filter
        }
        params.type = JSON.stringify(params.type)
        const { data } = await listReview(params)
        this.data = data.data.hotelReviews
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
    ChangelistReview () {
      this.filter.page = 1
      this.listReview()
    },
    onSizeChange (size) {
      this.filter.limit = size
      this.listReview()
    },
    onCurrentChange (currentPage) {
      this.filter.page = currentPage
      this.listReview()
    },
    handleCheckAll (val) {
      this.filter.page = 1
      this.checkAll = val
      this.filter.type = val ? allType : []
      this.listReview()
    },
    handleChecked (arr) {
      this.filter.page = 1
      this.checkAll = arr.length === allType.length
      this.listReview()
    },
    getHotelStatus (status) {
      switch (status) {
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
          return 'N/A'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.statistics {
  margin-bottom: 8px;
  a {
    color: #409eff;
    font-weight: bold;
  }
  span {
    color: orange;
    display: inline-flex;
    vertical-align: middle;
    font-weight: bold;
  }
}
</style>
