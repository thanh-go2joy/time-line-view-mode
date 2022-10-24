<template>
  <sa-section class="hotel-display">
    <template slot="header" class="hotel-display__header">
      <el-form
        :inline="true"
        :model="filter"
      >
        <el-form-item>
          <sa-select-check
            v-model="hotelStatusSelected"
            :isCheckAll="false"
            :options="ui.tableList"
            @input="handleCheckedStatus"
            translate
          />
        </el-form-item>
        <el-form-item>
          <el-select
            :loading="ui.isLoadingStaffs"
            v-model="filter.staffSn"
            element-loading-spinner="el-icon-loading"
            remote
            filterable
            clearable
            :placeholder="$t('page.hotelDisplay.staffInCharge')"
            :remote-method="onReloadStaffs"
            @change="fetchHotelDisplays"
            >
            <el-option
              v-for="(item, index) in staffs"
              :key="index"
              :label="`${item.fullName} - ${item.mobile} - ${item.role.name}`"
              :value="item.sn"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            :loading="ui.isLoadingHotels"
            v-model="hotelSelected"
            element-loading-spinner="el-icon-loading"
            remote
            filterable
            clearable
            :placeholder="$t('page.hotelDisplay.hotelName')"
            :remote-method="onReloadHotels"
            value-key="sn"
          >
            <el-option
              v-for="(item, index) in hotels"
              :key="index"
              :label="`${item.name} - ${item.address}`"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="filter.style"
            @change="fetchHotelDisplays"
          >
            <el-option
            v-for="item in ui.style"
            :key="item.value"
            :label="$t(item.key)"
            :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select
            v-model="filter.roomStatus"
            @change="fetchHotelDisplays"
          >
            <el-option
            v-for="item in ui.roomTypes"
            :key="item.value"
            :label="$t(item.key)"
            :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button
            type="success"
            plain
            icon="el-icon-download"
            @click="onExport"
          >
            {{ $t('button.export') }}
          </el-button>
        </el-form-item>
      </el-form>
      <div v-if="hasPermission('sahotel', 'pCreate')" class="hotel-display__header--add">
        <el-button
          type="warning"
          plain
          @click="onCreate"
          icon="el-icon-plus"
        >
          {{ $t('button.add') }}
        </el-button>
      </div>
    </template>
      <!-- -- el table -- -->
    <el-table
      v-loading="ui.isLoading"
      :data="listHotelDisplays"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="20"
      />
      <el-table-column
        :label="$t('page.hotelDisplay.groupName')"
      min-width="100"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'hotel_group_detail', params: { id: scope.row.hotelGroupSn } }">
            {{ scope.row.hotelGroup ? scope.row.hotelGroup.name: ''  }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.hotelDisplay.hotelName')"
        min-width="150"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'hotelDisplayDetails', params: { sn: scope.row.sn } }">
            {{ scope.row.name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.hotelDisplay.code')"
        min-width="150"
      >
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.hotelDisplay.status')"
        min-width="100"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.hotelStatus === 1">{{$t('option.hotelStatus.waiting')}}</p>
          <p v-else-if="scope.row.hotelStatus === 2">{{$t('option.hotelStatus.displayed')}}</p>
          <p v-else-if="scope.row.hotelStatus === 3">{{$t('option.hotelStatus.contracted')}}</p>
          <p v-else-if="scope.row.hotelStatus === 4">{{$t('option.hotelStatus.trial')}}</p>
          <p v-else-if="scope.row.hotelStatus === 5">{{$t('option.hotelStatus.terminated')}}</p>
          <p v-else-if="scope.row.hotelStatus === 6">{{$t('option.hotelStatus.suspended')}}</p>
          <p v-else></p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.hotelDisplay.totalView')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.totalView }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.hotelDisplay.checkinCheckoutTime')"
        min-width="150"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.hotelStatus === 1 || scope.row.hotelStatus === 2"></p>
          <p v-else>
            {{ scope.row.setting.checkInTime ? `${scope.row.setting.checkInTime}h` : '' }} ~ {{ scope.row.setting.checkoutTime ? `${scope.row.setting.checkoutTime}h` : '' }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.hotelDisplay.startEndOvernight')"
        min-width="120"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.hotelStatus === 1 || scope.row.hotelStatus === 2"></p>
          <p v-else>
            {{scope.row.setting.overStartTime ? `${scope.row.setting.overStartTime}h` : ''}} ~ {{scope.row.setting.overEndTime ? `${scope.row.setting.overEndTime}h` : ''}}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.hotelDisplay.payment')"
        min-width="120"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.hotelStatus === 4">{{$t('option.paymentsHotel.payHotel')}}</p>
          <p v-else-if="scope.row.hotelStatus === 3">
            <span v-if="scope.row.setting.payment === '1'">{{$t('option.paymentsHotel.both')}}</span>
            <span v-else-if="scope.row.setting.payment === '2'">{{$t('option.paymentsHotel.payHotel')}}</span>
            <span v-else-if="scope.row.setting.payment === '3'">{{$t('option.paymentsHotel.payOnline')}}</span>
            <span v-else></span>
          </p>
          <p v-else></p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.hotelDisplay.staffInCharge')"
        min-width="180"
      >
        <template slot-scope="scope" v-if="scope.row.origin !== 2">
          <p>BIC: {{ scope.row.bizInCharge.fullName || '' }}</p>
          <p>SIC: {{ scope.row.saleInCharge.fullName || '' }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.operations')"
        align="center"
        min-width="80"
      >
        <template slot-scope="scope">
          <el-popover
            placement="left"
            trigger="click"
            v-if="(hasPermission('sahotel', 'pModify') && scope.row.origin !== 2) ||
            (hasPermission('sastaff', 'pView') && scope.row.origin !== 2 && (scope.row.hotelStatus === 3 || scope.row.hotelStatus === 4)) ||
            (hasPermission('saroomtype', 'pCreate') && scope.row.origin !== 2 && (scope.row.hotelStatus === 3 || scope.row.hotelStatus === 4))
            "
          >
            <i slot="reference" class="operations el-icon-more" />
            <div class="p-8-12">
              <el-button
                v-if="hasPermission('sahotel', 'pModify') && scope.row.origin !== 2"
                type="success"
                size="small"
                plain
                @click="onEdit(scope.row)"
                icon="el-icon-edit"
              >
                {{$t('button.edit')}}
              </el-button>
              <el-button
                v-if="hasPermission('sastaff', 'pView') && scope.row.origin !== 2 && (scope.row.hotelStatus === 3 || scope.row.hotelStatus === 4)"
                type="primary"
                plain
                size="small"
                @click="onDirectAccount(scope.row)"
              >
                {{$t('button.account')}}
              </el-button>
              <el-button
                v-if="hasPermission('saroomtype', 'pCreate') && scope.row.origin !== 2 && (scope.row.hotelStatus === 3 || scope.row.hotelStatus === 4)"
                type="primary"
                plain
                size="small"
                @click="onDirectCreateRoomHotel(scope.row)"
              >
                {{$t('button.createRoomHotel')}}
              </el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagination.perPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </template>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import SaSelectCheck from '@/components/globals/SaSelectCheck.vue'
import { fetchHotelDisplays, exportHotelInfoLists } from './api'
import { fetchStaffs } from '@/api/staff'
import { statusOptionsV2, typeOptionsV2, roomTypes } from '@/utils/const'
import { fetchSuggestionsHotels } from '@/api/hotels'
import { debounce, scrollToTop } from '@/utils/helpers'
const timeDebounce = 500

export default {
  name: 'HotelDisplay',
  components: {
    SaSection,
    SaSelectCheck
  },
  data () {
    return {
      ui: {
        isLoading: false,
        isLoadingStaffs: false,
        isLoadingHotels: false,
        tableList: statusOptionsV2,
        style: typeOptionsV2,
        roomTypes: roomTypes
      },
      listHotelDisplays: [],
      filter: {
        limit: 10,
        page: 1,
        staffSn: '',
        style: 0,
        roomStatus: -1
      },
      pagination: {},
      staffs: [],
      hotels: [],
      checkList: [],
      hotelSelected: null,
      hotelStatusSelected: [1, 2, 3, 4, 5, 6]
    }
  },
  created () {
    this.fetchStaffs()
    this.fetchHotels()
    this.fetchHotelDisplays()
  },
  watch: {
    hotelSelected (value) {
      if (value) {
        this.filter[value.hotelStatus === -1 ? 'hotelGroupSn' : 'hotelSn'] = value.sn
      } else {
        delete this.filter.hotelGroupSn
        delete this.filter.hotelSn
      }
      this.fetchHotelDisplays()
    }
  },
  methods: {
    handleCheckedStatus (value) {
      this.filter.hotelStatus = `[${value}]`
      this.fetchHotelDisplays()
    },
    async fetchStaffs (keyword) {
      this.ui.isLoadingStaffs = true
      try {
        const params = { keyword: keyword || '' }
        const { data } = await fetchStaffs(params)
        this.staffs = data.data.staffs
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingStaffs = false
      }
    },
    onReloadStaffs: debounce(function (keyword) {
      this.fetchStaffs(keyword)
    }, timeDebounce),
    async fetchHotels (keyword) {
      this.ui.isLoadingHotels = true
      try {
        const params = { keyword: keyword || '', hotelStatus: 0 }
        const { data } = await fetchSuggestionsHotels(params)
        this.hotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotels = false
      }
    },
    onReloadHotels: debounce(function (keyword) {
      this.fetchHotels(keyword)
    }, timeDebounce),
    async fetchHotelDisplays () {
      this.ui.isLoading = true
      try {
        const { data } = await fetchHotelDisplays(this.filter)
        this.listHotelDisplays = data.data.hotels
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        scrollToTop('.section__header')
        this.ui.isLoading = false
      }
    },
    async onExport () {
      try {
        await exportHotelInfoLists({ hotelStatus: `[${this.filter.hotelStatus}]` })
        this.$message({
          type: 'success',
          message: this.$t('message.exportSuccess')
        })
      } catch (error) {
        return false
      }
    },
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchHotelDisplays(this.filter)
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchHotelDisplays(this.filter)
    },

    onCreate () {
      this.$router.push({ name: 'hotelDisplayCreate' })
    },
    onEdit (data) {
      this.$router.push({ name: 'hotelDisplayEdit', params: { sn: data.sn } })
    },
    onDirectAccount (data) {
      this.$router.push({ name: 'hotel_staff_mgt', params: { hotelSn: data.sn } })
    },
    onDirectCreateRoomHotel (data) {
      this.$router.push({ name: 'room_type', params: { hotelSn: data.sn } })
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
    @media (max-width: 1200px) {
        color: green;
    }
  }
  .p-8-12 {
    padding: 8px 12px;
  }
  .hotel-display {
    &__header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      &--search {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
      }
    }
  }
  .hotel-display {
    :deep(.section__header) {
        display: flex;
        justify-content: space-between;
        gap: 1em;
        @media (max-width: 640px) {
          display: block;
          .el-form-item {
            width: 100%;
            .el-form-item__content {
                width: 100%;
              .el-select, button  {
                width: 100%;
              }
            }
          }

        }
      }
  }
</style>
