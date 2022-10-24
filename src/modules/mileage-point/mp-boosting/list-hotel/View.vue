<template>
  <sa-section>
    <template slot="header">
      <div>
        <el-select
          v-model="filter.targetApply"
        >
          <ElOption
            v-for="(item, index) in ui.targetApplyOptions"
            :key="index"
            :label="$t(item.name)"
            :value="item.value"
            style="font-size: 13px; color: #4a5d6e;"
          />
        </el-select>
        <el-select
          v-if="filter.targetApply !== 4"
          v-model="filter.hotelSn"
          :loading="ui.hotelsLoading"
          :placeholder="$t('page.bookingReport.hotel_name')"
          remote
          filterable
          :remote-method="searchSuggestionsHotels"
          prefix-icon="el-icon-search"
          clearable
          value-key="sn"
          style="margin: 0 16px; width: 300px;"
        >
          <el-option
            v-for="(item, index) in listSuggestionsHotels"
            :key="index"
            :label="item.name"
            :value="item.sn"
            style="font-size: 13px; color: #4a5d6e;"
            class="hotel__option"
          >
            {{ item.name }} <br> {{ item.address }}
          </el-option>
        </el-select>
        <el-select
          v-else
          v-model="filter.provinceSn"
          v-loading="ui.loadingProvince"
          :placeholder="$t('page.collection.province')"
          style="margin: 0 16px;"
        >
          <el-option
            v-for="(item, index) in provinces"
            :key="index"
            :label="item.name"
            :value="item.sn"
          />
        </el-select>
        <el-button
          plain
          icon="el-icon-plus"
          @click="applyingMileageTarget"
        >
          {{ $t('button.add') }}
        </el-button>
        <el-button
          type="success"
          @click="saveApplyingMileageTarget"
        >
          {{ $t('button.save') }}
        </el-button>
        <el-button
          type="info"
          @click="$router.go(-1)"
        >
          {{ $t('button.back') }}
        </el-button>
      </div>
    </template>
    <div
      v-loading="ui.loading"
    >
      <el-table
        v-if="this.filter.targetApply !== 4"
        :data="hotels"
      >
        <el-table-column
          :label="$t('page.MpBoosting.hotel_name')"
          min-width="150"
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'hotelDisplayDetails', params: { sn: scope.row.hotelSn } }">
              {{ scope.row.hotelName }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.MpBoosting.status')"
          min-width="100"
        >
          <template slot-scope="scope">
            <p>{{ setStatus(scope.row.hotelStatus) }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone" :label="$t('page.MpBoosting.phone')"
          min-width="100"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          :label="$t('page.MpBoosting.address')"
          min-width="300"
        >
        </el-table-column>
        <el-table-column
          :label="$t('page.MpBoosting.last_update')"
          min-width="130"
        >
          <template slot-scope="scope">
            <p>{{ formatDate(scope.row.createTime) }}</p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.MpBoosting.last_update')"
          min-width="130"
        >
          <template slot-scope="scope">
            <p>{{ formatDate(scope.row.lastUpdate) }}</p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.staffs.operations')"
          min-width="90"
        >
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="small"
              plain
              icon="el-icon-delete"
              @click="removeApplyingMileageTarget(scope.row, 'hotel')"
            >
              {{$t('button.delete')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-else
        :data="hotels"
      >
        <el-table-column
          :label="$t('page.MpBoosting.area_code')"
        >
          <template slot-scope="scope">
            <p style="color: #007bff">{{ scope.row.provinceName }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="iosTotalAccess"
          :label="$t('page.MpBoosting.ios_total_access')"
        >
        </el-table-column>
        <el-table-column
          prop="androidTotalAccess"
          :label="$t('page.MpBoosting.android_total_access')"
        >
        </el-table-column>
        <el-table-column
          prop="lastUpdate"
          :label="$t('page.MpBoosting.last_update')"
        >
        </el-table-column>
        <el-table-column
          :label="$t('page.staffs.operations')"
        >
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="small"
              plain
              icon="el-icon-delete"
              @click="removeApplyingMileageTarget(scope.row, 'province')"
            >
              {{$t('button.delete')}}
            </el-button>
          </template>
        </el-table-column>
        </el-table>
    </div>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { fetchSuggestionsHotels } from '@/api/hotels'
import {
  fetchListHotelsBoosting,
  applyingMileageTarget,
  saveApplyingMileageTarget,
  removeApplyingMileageTarget
} from './api'
import { fetchProvinces } from '@/api/province'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
export default {
  name: 'ListHotelBoosting',
  components: { SaSection },
  data: (vm) => {
    return {
      filter: {
        targetApply: '',
        hotelSn: '',
        provinceSn: '',
        mileageRewardSn: vm.$route.params.sn
      },
      ui: {
        loadingHotels: false,
        loading: false,
        provincesLoading: false,
        targetApplyOptions: [{
          name: 'page.MpBoosting.allHotel',
          value: 1
        }, {
          name: 'page.MpBoosting.allHotelReject',
          value: 2
        }, {
          name: 'page.MpBoosting.justApply',
          value: 3
        }, {
          name: 'page.MpBoosting.specifyProvince',
          value: 4
        }]
      },
      listSuggestionsHotels: [],
      hotels: [],
      provinces: []
    }
  },
  created () {
    this.fetchSuggestionsHotels({ limit: 10, justHotel: 1 })
    this.fetchListHotelsBoosting()
    this.fetchProvinces()
  },
  methods: {
    searchSuggestionsHotels: debounce(function (keySearch) {
      this.fetchSuggestionsHotels({
        limit: 10,
        justHotel: 1,
        keyword: keySearch
      })
    }, timeDebounce),
    async fetchListHotelsBoosting () {
      this.ui.loading = true
      try {
        const { data } = await fetchListHotelsBoosting({
          mileageRewardSn: this.filter.mileageRewardSn,
          limit: 1000
        })
        this.hotels = data.data.mileageTargets
        this.filter.targetApply = data.data.additionalData.targetApply
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    async fetchProvinces () {
      this.ui.provincesLoading = true
      try {
        const { data } = await fetchProvinces({ limit: 100, status: 1 })
        this.provinces = data.data.provinces
      } catch (error) {
        return false
      } finally {
        this.ui.provincesLoading = false
      }
    },
    async applyingMileageTarget () {
      this.ui.loading = true
      if (!this.filter.hotelSn) {
        this.$message({
          type: 'error',
          message: 'Please choose hotel'
        })
        this.ui.loading = false
        return
      }
      try {
        const { data } = await applyingMileageTarget(this.filter)
        this.hotels = data.data.mileageTargets
        this.filter.targetApply = data.data.additionalData.targetApply
        const message = this.$t('message.addSuccess')
        this.$message({
          type: 'success',
          message: message
        })
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    async saveApplyingMileageTarget () {
      this.ui.loading = true
      try {
        await saveApplyingMileageTarget(this.filter)
        const message = this.$t('message.saveSuccess')
        this.$message({
          type: 'success',
          message: message
        })
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    async fetchSuggestionsHotels (params) {
      this.ui.loadingHotels = true
      try {
        const { data } = await fetchSuggestionsHotels(params)
        this.listSuggestionsHotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.loadingHotels = false
      }
    },
    async removeApplyingMileageTarget (row, action) {
      this.ui.loading = true
      try {
        const formData = {
          ...this.filter,
          hotelSn: action === 'hotel' ? row.hotelSn : '',
          provinceSn: action === 'province' ? row.provinceSn : ''
        }
        const { data } = await removeApplyingMileageTarget(formData)
        this.hotels = data.data.mileageTargets
        const message = this.$t('message.deleteSuccess')
        this.$message({
          type: 'success',
          message: message
        })
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    setStatus (value) {
      switch (value) {
        case 1:
          return this.$t('page.MpBoosting.waiting')
        case 2:
          return this.$t('page.MpBoosting.displayed')
        case 3:
          return this.$t('page.MpBoosting.contracted')
        case 4:
          return this.$t('page.MpBoosting.trial')
        case 5:
          return this.$t('page.MpBoosting.terminated')
        case 6:
          return this.$t('page.MpBoosting.suspended')
        default:
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.hotel__option {
  height: auto;
}
</style>
