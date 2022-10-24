<template>
  <sa-section v-loading="ui.isCallAPI">
    <template slot="header">
      <el-form
        :inline="true"
        :model="filter"
        class="demo-form-inline float-left"
      >
        <el-form-item>
          <el-select v-model="filter.applyTarget">
            <el-option
              v-for="(item, index) in ui.applyHotelType"
              :key="index"
              :label="$t(item.key)"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            :disabled="isDisabledExport"
            v-model="filter.provinceSn"
            v-loading="ui.loadingProvince"
            element-loading-spinner="el-icon-loading"
            :placeholder="$t('page.collection.province')"
            @change="listDistricts"
          >
            <el-option
              v-for="(item, index) in provinces"
              :key="index"
              :label="item.name"
              :value="item.sn"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            :disabled="isDisabledExport"
            v-model="filter.districtSn"
            v-loading="ui.loadingDistrict"
            element-loading-spinner="el-icon-loading"
            :placeholder="$t('page.collection.district')"
          >
            <el-option
              v-for="(item, index) in districts"
              :key="index"
              :label="item.name"
              :value="item.sn"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            :disabled="isDisabledExport"
            :loading="ui.isLoadingHotel"
            v-model="ui.hotel"
            value-key="sn"
            element-loading-spinner="el-icon-loading"
            remote
            filterable
            prefix-icon="el-icon-search"
            clearable
            :placeholder="$t('page.hotelDisplay.hotelName')"
            :remote-method="searchSuggestionsHotels"
          >
            <el-option
                v-for="(item, index) in hotels"
                :key="index"
                :label="item.name"
                :value="{sn: item.sn,status: item.hotelStatus}"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            :disabled="isDisabledExport"
            :icon="'el-icon-plus'"
            type="primary"
            plain
            v-on:click="addHotelApply"
          >
            {{ $t('button.add') }}
          </el-button>
        </el-form-item>
        <el-form-item>
          <upload-file
            accept=".xlsx, .xls, .csv"
            :isDisabled="isDisabledExport"
            @change="onImportApplyHotel"
          />
        </el-form-item>
      </el-form>
      <div class="float-right">
        <el-button :loading="ui.isCallAPI" @click="onGetBack">
          {{ $t('button.back') }}
        </el-button>
        <el-button :loading="ui.isCallAPI" @click="onSave">
          <i class="el-icon-plus" />
          {{ $t('button.save') }}
        </el-button>
      </div>
    </template>
    <el-table :data="data" v-loading="ui.isTableLoading">
      <el-table-column label="#" type="index" />
      <el-table-column :label="$t('page.promotion.name')" :min-width="280">
        <template slot-scope="scope">
          <router-link
            :to="{
              name: 'HotelDisplayDetail',
              query: { sn: scope.row.hotelSn }
            }"
          >
            {{ scope.row.name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column :label="$t('page.promotion.code')" :min-width="180">
        <template slot-scope="scope">
          <p>
            {{ scope.row.code }}
          </p>
        </template>
      </el-table-column>
      <el-table-column :label="$t('page.promotion.status')" :min-width="140">
        <template slot-scope="scope">
          <p>
            {{ getStatus(scope.row.hotelStatus) }}
          </p>
        </template>
      </el-table-column>
      <el-table-column :label="$t('page.promotion.phone')" :min-width="180">
        <template slot-scope="scope">
          <p>
            {{ scope.row.phone }}
          </p>
        </template>
      </el-table-column>
      <el-table-column :label="$t('page.promotion.address')" :min-width="260">
        <template slot-scope="scope">
          <p>
            {{ scope.row.address }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.promotion.createTime')"
        :min-width="150"
      >
        <template slot-scope="scope">
          <p>
            {{ formatDate(scope.row.createTime) }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.promotion.createTime')"
        :min-width="150"
      >
        <template slot-scope="scope">
          <p>
            {{ formatDate(scope.row.createTime) }}
          </p>
        </template>
      </el-table-column>
      <el-table-column :label="$t('page.userMgt.operations')" :min-width="90">
        <template slot-scope="scope">
          <el-button type="danger" plain @click="onDelete(scope.row.sn)">
            {{ $t('button.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
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
import SaSection from '@/components/globals/SaSection.vue'
import { addHotelApply, onImportApplyHotel, removeHotelApply, onSaveHotelApply, onClearHotelApply, onCheckRoomTypeByCoupon } from './api'
import { fetchProvinces, fetchDistricts } from '@/api/province'
import { fetchSuggestionsHotels } from '@/api/hotels'
import UploadFile from '@/components/globals/UploadFile'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
export default {
  name: 'HotelApply',
  components: {
    SaSection,
    UploadFile
  },
  props: {
    propFilter: {
      type: Object,
      default: () => {}
    },
    propData: {
      type: Array,
      default: () => []
    },
    propPagination: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      districts: [{ name: this.$t('page.collection.all'), sn: -1 }],
      hotels: [],
      ui: {
        isTableLoading: false,
        loadingProvince: false,
        loadingDistrict: false,
        isCallAPI: false,
        hotel: {},
        applyHotelType: [
          { key: 'page.promotion.applyAllHotel', value: 1 },
          { key: 'page.promotion.applyAllHotelExcept', value: 2 },
          { key: 'page.promotion.onlyApply', value: 3 }
        ]
      },
      provinces: []
    }
  },
  computed: {
    ApplyType () {
      let applyType
      switch (localStorage.getItem('ApplyType')) {
        case '1':
          applyType = this.$t('page.promotion.applyAllHotel')
          break
        case '2':
          applyType = this.$t('page.promotion.applyAllHotelExcept')
          break
        case '3':
          applyType = this.$t('page.promotion.onlyApply')
          break
        default:
          applyType = this.$t('page.promotion.applyAllHotel')
          break
      }
      return applyType
    },
    data: {
      get () {
        return this.propData
      },
      set (val) {
        this.$emit('reloadData', val)
      }
    },
    pagination: {
      get () {
        return this.propPagination
      },
      set (val) {
        this.$emit('reloadPagination', val)
      }
    },
    filter () {
      return this.propFilter
    },
    isDisabledExport () {
      if (this.filter.applyTarget === 1) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.listProvinces()
  },
  methods: {
    async onDelete (sn) {
      this.$confirm(
        this.$t('message.messageAlert'),
        this.$t('message.messageWarning'),
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
        .then(async () => {
          try {
            const { data } = await removeHotelApply(this.$route.params.couponSn, { hotelSn: sn, limit: this.filter.limit, page: this.filter.page })
            if (data.code === 1) {
              this.data = data.data.hotels
              this.pagination = data.data.meta
              this.$message({
                type: 'success',
                message: this.$t('message.deleteSuccess')
              })
            }
          } catch (error) {
            return false
          }
        })
        .catch((error) => {
          this.$message({
            type: 'info',
            message: error
          })
        })
    },
    async onGetBack () {
      try {
        this.ui.isCallAPI = true
        const { data } = await onClearHotelApply(this.$route.params.couponSn)
        if (data.code === 1) {
          this.$emit('onCallChangeTab', this.filter.applyTarget, this.filter.type)
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isCallAPI = false
      }
    },
    async onSave () {
      try {
        this.ui.isCallAPI = true
        const { data } = await onSaveHotelApply(this.$route.params.couponSn, { applyTarget: this.filter.applyTarget, type: this.filter.type })
        if (data.code === 1) {
          await this.checkRoomTypeByCoupon()
        }
      } catch (error) {
        return false
      }
    },
    async checkRoomTypeByCoupon () {
      try {
        const { data } = await onCheckRoomTypeByCoupon(this.$route.params.couponSn, { type: this.filter.type })
        if (data.code === 1) {
          if (data.data.roomTypeSnList.length > 0) {
            this.$router.push({
              name: 'applyForHotelRoom',
              params: {
                couponSn: this.$route.params.couponSn,
                promotionSn: this.$route.params.promotionSn
              }
            })
          } else {
            this.$emit('onCallChangeTab', this.filter.applyTarget, this.filter.type)
          }
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isCallAPI = false
      }
    },
    searchSuggestionsHotels: debounce(function (keyword) {
      this.listSuggestionsHotels({
        limit: 10,
        keyword: keyword
      })
    }, timeDebounce),
    async listSuggestionsHotels (params) {
      this.ui.isLoadingHotel = true
      try {
        const { data } = await fetchSuggestionsHotels(params)
        this.hotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotel = false
      }
    },
    async listProvinces () {
      this.ui.loadingProvince = true
      try {
        this.provinces = [{ name: this.$t('page.collection.all'), sn: -1 }]
        const { data } = await fetchProvinces({ limit: 100, status: 1 })
        this.provinces = [...this.provinces, ...data.data.provinces]
      } catch (error) {
        return false
      } finally {
        this.ui.loadingProvince = false
      }
    },
    async listDistricts () {
      this.ui.loadingDistrict = true
      try {
        this.districts = [{ name: this.$t('page.collection.all'), sn: -1 }]
        if (this.filter.province !== -1) {
          const { data } = await fetchDistricts({
            limit: 100,
            status: 1,
            provinceSn: this.filter.provinceSn
          })
          this.districts = [...this.districts, ...data.data.districts]
        }
      } catch (error) {
        return false
      } finally {
        this.ui.loadingDistrict = false
      }
    },
    async addHotelApply () {
      try {
        this.ui.isTableLoading = true
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
        const { data } = await addHotelApply(this.$route.params.couponSn, params)
        if (data.data.hotels?.length > 0) {
          this.data = data.data.hotels
          this.filter.provinceSn = -1
          this.filter.districtSn = -1
        }
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    async onImportApplyHotel (file) {
      try {
        this.ui.isTableLoading = true
        const formData = new FormData()
        formData.append('file', file)
        formData.append('type', this.filter.type)
        formData.append('applyTarget', this.filter.applyTarget)
        formData.append('limit', this.filter.limit)
        const { data } = await onImportApplyHotel(this.$route.params.couponSn, formData)
        if (data.data.hotels?.length > 0) {
          this.data = data.data.hotels
          this.filter.provinceSn = -1
          this.filter.districtSn = -1
        }
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    onSizeChange (size) {
      this.$emit('onChangePage', { limit: size, page: this.filter.page, type: this.filter.type })
    },
    onCurrentChange (currentPage) {
      this.$emit('onChangePage', { limit: this.filter.size, page: currentPage, type: this.filter.type })
    },
    getStatus (status) {
      switch (status) {
        case 1:
          return this.$t('page.promotion.waiting')
        case 2:
          return this.$t('page.promotion.displayed')
        case 3:
          return this.$t('page.promotion.contracted')
        case 4:
          return this.$t('page.promotion.trial')
        case 5:
          return this.$t('page.promotion.terminated')
        case 6:
          return this.$t('page.promotion.suspended')
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
