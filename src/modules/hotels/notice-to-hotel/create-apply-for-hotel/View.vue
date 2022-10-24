<template>
<sa-section>
  <div class="apply-hotel-notice-segment" v-loading="ui.loadingNoticeToHotelList">

      <!-- Start Contentbar-->
      <div class="apply-hotel-notice-segment__filter">
          <div class="apply-hotel-notice-segment__filter--select">
            <el-select
              v-model="filter.applyTarget"
              @change="changeTypeApplyHotel"
            >
              <el-option
                v-for="(item, index) in ui.typeApply"
                :key="index"
                :label="$t(item.key)"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="apply-hotel-notice-segment__filter--select">
            <el-select
              :disabled='filter.applyTarget !== 4 ? true : false'
              v-model="filter.provinceSn"
              @change="changeProvinceApplyHotel"
            >
              <el-option
                v-for="(item, index) in ui.dataProvince"
                :key="index"
                :label="getLocalize === 'en' && item.nameEn ? item.nameEn : item.name "
                :value="item.sn"
              >
              </el-option>
            </el-select>
          </div>
          <div class="apply-hotel-notice-segment__filter--select">
            <el-select
              v-model="filter.districtSn"
              @change="changeDistrictApplyHotel"
              :disabled='filter.applyTarget !== 4 || filter.provinceSn === -1 ? true : false'
            >
              <el-option
                v-for="(item, index) in ui.dataDistrict"
                :key="index"
                :label="getLocalize === 'en' && item.nameEn ? item.nameEn : item.name "
                :value="item.sn"
              >
              </el-option>
            </el-select>
          </div>
          <div class="apply-hotel-notice-segment__filter--input">
              <el-select
                :disabled='filter.applyTarget !== 4 ? true : false'
                v-model="queryHotel.keyword"
                v-loading="ui.loadingSuggestionsHotel"
                element-loading-spinner="el-icon-loading"
                :placeholder="$t('page.noticeApplyHotel.hotel_name')"
                remote
                filterable
                @change="changeApplyHotel"
                :remote-method="searchSuggestionsHotels"
                prefix-icon="el-icon-search"
                clearable
              >
                <ElOption
                  v-for="(item, index) in ui.listSuggestionsHotels"
                  :key="index"
                  :label="`${item.name}`"
                  :value="item.sn"
                  style="font-size: 13px; color: #4a5d6e;"
                />
              </el-select>
          </div>
          <div class="apply-hotel-notice-segment__filter--btn">
              <el-button
                :disabled="filter.applyTarget !== 4 ? true : false"
                type="primary"
                icon="el-icon-plus"
                plain
                @click="addDataApplyingHotelFaq"
              >
                {{ $t('button.add') }}
              </el-button>
          </div>
          <div class="apply-hotel-notice-segment__filter--btn-group">
            <el-button
              class="btn btn-primary-rgba"
              icon="el-icon-menu"
              plain
              @click="listDataApplyingHotelFaq"
            >
              {{ $t('button.list') }}
            </el-button>
            <el-button
              class="btn btn-primary-rgba"
              icon="el-icon-plus"
              plain
              @click="saveDataApplyingHotelFaq"
            >
              {{ $t('button.save') }}
            </el-button>
          </div>
      </div>
      <el-table
        :data="tableData"
        class="apply-hotel-notice-segment__table"
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
        <el-table-column :label="$t('page.noticeApplyHotel.code')" min-width="100">
          <template slot-scope="scope">
            <span> {{ scope.row.code }}</span>
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
        <el-table-column :label="$t('page.noticeApplyHotel.operations')" align="center" min-width="50">
          <template slot-scope="scope">
            <el-popover placement="left" trigger="click">
              <i slot="reference" class="operations el-icon-more" />
              <div style="padding: 8px 12px;">
                <el-button
                  type="danger"
                  plain
                  size="small"
                  icon="el-icon-delete"
                  @click="onDeleteHotelApply(scope.row.sn)"
                >
                  {{ $t('button.delete')}}
                </el-button>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="apply-hotel-notice-segment__footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pagination.currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pagination.perPage" layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        />
      </div>
  </div>
</sa-section>
</template>

<script>
// @ is an alias to /src
import {
  debounce
} from '@/utils/helpers.js'
import { fetchProvinces, fetchDistricts } from '@/api/province'
import SaSection from '@/components/globals/SaSection'
import { fetchSuggestionsHotels } from '@/api/hotels'
import {
  removeApplyingHotelFaq,
  // getHotelList,
  loadApplyingHotelFaq,
  // onImportApplyHotel,
  addApplyingHotelFaq,
  saveApplyingHotelFaq
// resetApplyingHotelFaq
} from './api'
const timeDebounce = 500
export default {
  name: 'ApplyNoticeToHotel',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        loadingNoticeToHotelList: true,
        loadingSuggestionsHotel: false,
        typeApply: [
          { key: 'option.applyHotelOption.all_hotel', value: 1 },
          { key: 'option.applyHotelOption.all_contracted', value: 2 },
          { key: 'option.applyHotelOption.all_trial', value: 3 },
          { key: 'option.applyHotelOption.just_apply', value: 4 }
        ],
        dataProvince: [
          {
            sn: -1,
            name: 'Tất cả',
            nameEn: 'All'
          }
        ],
        dataDistrict: [
          {
            sn: -1,
            name: 'Tất cả',
            nameEn: 'All'
          }
        ],
        listSuggestionsHotels: []

      },
      pagination: {},
      queryHotel: {
        limit: 10,
        justHotel: 1,
        keyword: ''
      },
      queryTable: {
        limit: 10,
        page: 1
      },
      queryAddHotelApply: {
        applyTarget: '',
        provinceSn: '',
        districtSn: '',
        hotelSn: '',
        faqInformationSn: '',
        limit: 10,
        page: 1
      },
      filter: {
        applyTarget: this.$route.query.applyTarget ? this.$route.query.applyTarget : 1,
        provinceSn: '',
        districtSn: '',
        suggestionsHotel: '',
        faqInformationSn: this.$route.query && this.$route.query.faqInformationSn ? this.$route.query.faqInformationSn : '',
        limit: 10
      },
      dataChangeAll: {
        sn: -1,
        name: 'Tất cả',
        nameEn: 'All'
      },
      tableData: [],
      activeValue: 1,
      inactiveValue: 0,
      dataRes: {},
      additionalData: {

      }

    }
  },
  async created () {
    this.ui.loadingNoticeToHotelList = false
    await this.onLoadListHotel(this.queryAddHotelApply)
  },
  computed: {
    getLocalize () {
      return this._i18n.locale
    }
  },
  methods: {
    async getDataProvinces () {
      this.ui.loadingNoticeToHotelList = true
      try {
        const {
          data
        } = await fetchProvinces({ limit: 70, status: 1 })
        this.ui.dataProvince = data.data.provinces
        this.ui.dataProvince.unshift(this.dataChangeAll)
      } catch (error) {
        return false
      } finally {
        this.ui.loadingNoticeToHotelList = false
      }
    }, // getDataProvinces

    async getDataDistricts () {
      this.ui.loadingNoticeToHotelList = true
      if (!this.filter.provinceSn || this.filter.provinceSn === -1) {
        return
      }
      try {
        const { data } = await fetchDistricts({ limit: 70, status: 1, provinceSn: this.filter.provinceSn ?? -1 })
        this.ui.dataDistrict = data.data.districts
        this.ui.dataDistrict.unshift(this.dataChangeAll)
      } catch (error) {
        return false
      } finally {
        this.ui.loadingNoticeToHotelList = false
      }
    }, // getDataDistricts

    async fetchSuggestionsHotels () {
      this.ui.loadingSuggestionsHotel = true
      try {
        const { data } = await fetchSuggestionsHotels(this.queryHotel)
        this.ui.listSuggestionsHotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.loadingSuggestionsHotel = false
      }
    }, // fetchSuggestionsHotels

    searchSuggestionsHotels: debounce(function (value) {
      this.queryHotel.keyword = value
      this.fetchSuggestionsHotels(this.queryHotel)
    }, timeDebounce), // handleSearch

    // Change search hotel Apply
    changeTypeApplyHotel (value) {
      this.filter.applyTarget = value
      if (this.filter.applyTarget === 4) {
        this.getDataProvinces()
        this.fetchSuggestionsHotels()
      }
    },

    changeProvinceApplyHotel (value) {
      this.filter.provinceSn = value
      if (this.filter.provinceSn !== -1) {
        this.filter.districtSn = -1
        this.getDataDistricts()
      }
    },

    changeDistrictApplyHotel (value) {
      this.filter.districtSn = value
    },

    changeApplyHotel (value) {
      this.filter.suggestionsHotel = value
    },

    // on load list hotel apply
    async onLoadListHotel (queryAddHotelApply) {
      this.ui.loadingNoticeToHotelList = true
      var layout = this.$route.query.layoutType
      this.filter.applyTarget = this.$route.query && this.$route.query.applyTarget ? Number(this.$route.query.applyTarget) : 1
      try {
        if (layout === 1) {
          const {
            data
          } = await loadApplyingHotelFaq(queryAddHotelApply)
          this.filter = data.data.additionalData

          this.tableData = data.data.hotels
          this.pagination = data.data.meta
          await Promise.all([
            this.getDataProvinces(),
            this.getDataDistricts(),
            this.fetchSuggestionsHotels()
          ])
        } else {
          const {
            data
          } = await loadApplyingHotelFaq({ faqInformationSn: this.filter.faqInformationSn ? this.filter.faqInformationSn : '' })
          this.filter = data.data.additionalData
          this.filter.faqInformationSn = this.$route.query.faqInformationSn ? this.$route.query.faqInformationSn : ''
          this.filter.applyTarget = this.$route.query.applyTarget ? Number(this.$route.query.applyTarget) : 1
          this.tableData = data.data.hotels
          this.pagination = data.data.meta
          await Promise.all([
            this.getDataProvinces(),
            this.getDataDistricts(),
            this.fetchSuggestionsHotels()
          ])
        }
      } catch (error) {
        return false
      } finally {
        this.ui.loadingNoticeToHotelList = false
      }
    },
    // Action add Hotel
    async addDataApplyingHotelFaq () {
      this.ui.loadingNoticeToHotelList = true
      if (this.filter.suggestionsHotel) {
        this.queryAddHotelApply = {
          applyTarget: this.filter.applyTarget,
          hotelSn: this.filter.suggestionsHotel
        }
      } else {
        this.queryAddHotelApply = {
          applyTarget: this.filter.applyTarget,
          provinceSn: this.filter.provinceSn,
          districtSn: this.filter.districtSn
        }
      }
      try {
        const { data } = await addApplyingHotelFaq(this.queryAddHotelApply)
        this.dataRes = data

        // this.onLoadListHotel()
        this.tableData = data.data.hotels
        this.pagination = data.data.meta
        this.filter.suggestionsHotel = 0
      } catch (error) {
        return false
      } finally {
        this.ui.loadingNoticeToHotelList = false
      }
    },
    // Action save Hotel
    async saveDataApplyingHotelFaq () {
      this.ui.loadingNoticeToHotelList = true
      try {
        const { data } =
        await saveApplyingHotelFaq({ applyTarget: this.filter.applyTarget })
        this.dataRes = data
        this.$message({
          type: 'success',
          message: `${this.$t('message.saveSuccess')}`
        })
        const query = {
          ...this.$route.query, ...this.filter
        }
        var layout = this.$route.query.layoutType
        if (layout === 1) {
          const query = {
            applyTarget: this.filter.applyTarget,
            layoutType: 1,
            faqInformationSn: ''
          }
          this.$router.push({ name: 'notice_to_hotel_create', query })
        } else if (layout === 2) {
          this.$router.push({ name: 'notice_edit', params: { id: this.filter.faqInformationSn }, query })
        } else {
          this.$router.go(-1)
        }
      } catch (error) {
        return false
      } finally {
        this.ui.loadingNoticeToHotelList = false
      }
    },
    // back to list notice to hotel
    listDataApplyingHotelFaq () {
      this.$router.push({ name: 'notice_to_hotel' })
    },
    // pagination handleSize
    handleSizeChange (value) {
      this.pagination.limit = value
      this.onLoadListHotel(this.pagination)
    },
    // pagination handlePage
    handleCurrentChange (value) {
      this.pagination.page = value
      this.onLoadListHotel(this.pagination)
    },
    // Action delete Hotel
    async onDeleteHotelApply (id) {
      this.ui.loadingNoticeToHotelList = true
      try {
        const { data } = await removeApplyingHotelFaq({ hotelSn: id })
        this.tableData = data.data.hotels
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loadingNoticeToHotelList = false
      }
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

.apply-hotel-notice-segment {
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
        display: flex;
        // grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        align-items: center;
        margin-bottom: 24px;

        &--input {
                width: 200px;
        }

        &--btn {
          padding: 0 5px;
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
}

@media (max-width: 1200px) {
    .operations {
        color: green;
    }
}
</style>
