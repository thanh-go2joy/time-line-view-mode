<template>
  <sa-section class="stamp">
    <template slot="header">
      <div class="stamp__header">
        <div class="stamp__header--search">
          <div class="w-100">
            <el-select
              :loading="ui.isLoadingHotels"
              v-model="filter.hotelSn"
              element-loading-spinner="el-icon-loading"
              remote
              filterable
              clearable
              :placeholder="$t('page.stamp.hotelName')"
              :remote-method="reloadHotels"
              @change="fetchHotelStamps"
              >
              <el-option
                  v-for="(item, index) in hotels"
                  :key="index"
                  :label="`${item.name} - ${item.address}`"
                  :value="item.sn"
              >
              </el-option>
            </el-select>
          </div>
          <div class="w-100">
            <el-select
              :loading="ui.isLoadingUsers"
              v-model="filter.appUserSn"
              element-loading-spinner="el-icon-loading"
              remote
              filterable
              clearable
              :placeholder="$t('page.stamp.inputUserNicknameOrPhoneNumber')"
              :remote-method="reloadUsers"
              @change="fetchHotelStamps"
              >
              <el-option
                  v-for="(item, index) in users"
                  :key="index"
                  :label="`${item.nickName} - ${item.mobile} - ${item.email}`"
                  :value="item.sn"
              >
              </el-option>
            </el-select>
          </div>
          <div class="stamp__header--flex w-100">
            <b>{{ $t('page.stamp.numberOfStamp') }}</b>
            <SaSelectCheck
              :isCheckAll="false"
              v-model="filter.stamp"
              :indeterminate="checkBox.isIndeterminate"
              :model-check-all="checkBox.checkAllStamp"
              :options="ui.stampOptions"
              @changeCheckAll="handleCheckAllChange"
              @input="checkBoxFilterStamp"
            />
          </div>
          <div class="stamp__header--flex w-100">
            <b>{{ $t('page.stamp.totalRedemption') }}</b>
            <SaSelectCheck
              :isCheckAll="false"
              v-model="filter.totalRedeem"
              :options="redemptions"
              @input="checkBoxFilterRedeem"
              :loadingButton="ui.isLoadingRedemption"
            />
          </div>
        </div>
      </div>
    </template>
    <el-table
      v-loading="ui.isLoading"
      :data="listStamps"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="2"
      />
      <el-table-column
        :label="$t('page.stamp.hotelName')"
        min-width="130"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'stampDetails', params: { sn: scope.row.registerStampSn } }">
              {{ scope.row.hotelName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.stamp.nickName')"
        min-width="110"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'userDetails', params: { sn: scope.row.appUserSn } }">
            {{ scope.row.nickName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.stamp.mobile')"
        min-width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.stamp.effectiveStamps')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.numStampActive }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.stamp.stampsToRedeem')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.numToRedeem }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.stamp.numberOfExpiredStamps')"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.numStampExpire }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.stamp.totalRedemption')"
        min-width="100"
      >
        <template slot-scope="scope">
        {{ scope.row.totalRedeem }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.stamp.startDateOfCollecting')"
        min-width="110"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.startJoinTime, false) }}
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
import { debounce, scrollToTop } from '@/utils/helpers'
import { fetchRegisterStampsAvailable, fetchHotelStamps } from './api'
import { fetchSuggestionsHotels } from '@/api/hotels'
import { fetchSuggestionsUsers } from '@/api/users'
const timeDebounce = 500
export default {
  name: 'DetailTotalUserStamp',
  components: {
    SaSection,
    SaSelectCheck
  },
  data () {
    return {
      ui: {
        isLoading: false,
        isLoadingHotels: false,
        isLoadingUsers: false,
        isLoadingRedemption: false,
        stampOptions: [
          { value: 0, key: '0' },
          { value: 1, key: '1' },
          { value: 2, key: '2' },
          { value: 3, key: '3' },
          { value: 4, key: '4' },
          { value: 5, key: '5' },
          { value: 6, key: '6' },
          { value: 7, key: '7' },
          { value: 8, key: '8' },
          { value: 9, key: '9' },
          { value: 10, key: '10' }
        ]
      },
      listStamps: [],
      filter: {
        limit: 10,
        page: 1,
        appUserSn: '',
        hotelSn: this.$route.params.sn,
        stamp: this.$route.params.stampSn ? [Number(this.$route.params.stampSn)] : [],
        totalRedeem: []
      },
      checkBox: {
        checkAllStamp: false,
        isIndeterminate: true
      },
      pagination: {},
      hotels: [],
      users: [],
      redemptions: []
    }
  },
  created () {
    this.fetchRegisterStampsAvailable()
    this.fetchHotels('', this.$route.params.sn)
    this.fetchUSers()
    this.checkBoxFilterStamp()
    this.fetchHotelStamps()
  },
  methods: {
    handleCheckAllChange (val) {
      this.filter.stamp = val ? this.ui.stampOptions : []
      this.checkBox.isIndeterminate = false
      this.fetchHotelStamps()
    },
    checkBoxFilterStamp () {
      this.checkBox.checkAllStamp = this.filter.stamp.length === this.ui.stampOptions.length
      this.checkBox.isIndeterminate = this.filter.stamp.length > 0 && this.filter.stamp.length < this.ui.stampOptions.length
      if (this.checkBox.isIndeterminate) {
        this.fetchHotelStamps()
      }
    },
    checkBoxFilterRedeem (val) {
      this.filter.totalRedeem = val
      this.fetchHotelStamps()
    },
    async fetchHotels (keyword = '', hotelSn = '') {
      this.ui.isLoadingHotels = true
      try {
        const params = { keyword: keyword || '', justHotel: 1, hotelSn: hotelSn }
        const { data } = await fetchSuggestionsHotels(params)
        this.hotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotels = false
      }
    },
    reloadHotels: debounce(function (keyword) {
      this.fetchHotels(keyword)
    }, timeDebounce),
    async fetchUSers (keyword) {
      this.ui.isLoadingUsers = true
      try {
        const params = { keyword: keyword || '' }
        const { data } = await fetchSuggestionsUsers(params)
        this.users = data.data.appUsers
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingUsers = false
      }
    },
    reloadUsers: debounce(function (keyword) {
      this.fetchUSers(keyword)
    }, timeDebounce),
    async fetchRegisterStampsAvailable () {
      this.ui.isLoadingRedemption = true
      try {
        const { data } = await fetchRegisterStampsAvailable({ hotelSn: this.$route.params.sn || '' })
        const redemptions = data.data
        data.data.find(item => {
          this.redemptions.push({ value: item, key: `${item}` })
        })
        if (redemptions && redemptions.length > 0) {
          this.checkBoxFilterRedeem(redemptions)
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingRedemption = false
      }
    },
    async fetchHotelStamps () {
      this.ui.isLoading = true
      try {
        const formData = { ...this.filter }
        formData.totalRedeem = JSON.stringify(formData.totalRedeem)
        formData.stamp = JSON.stringify(formData.stamp)
        const { data } = await fetchHotelStamps(formData)
        this.listStamps = data.data.registerStampDetails
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        scrollToTop('.section__header')
        this.ui.isLoading = false
      }
    },
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchHotelStamps()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchHotelStamps()
    }
  }
}
</script>

<style lang="scss" scoped>
  .stamp {
    &__button {
      text-align: right;
      margin: 10px;
    }
    &__wrap {
      a {
        color: #409eff;
        text-decoration: none;
      }
    }
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1em;
      &--search {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
      }
      &--flex {
        display: flex;
        gap: 1em;
        align-items: center;
      }
    }
    .el-button {
      margin-left: unset;
    }

    @media (max-width: 768px) {
      .w-100, .el-select {
        width: 100%;
      }
    }
  }
</style>
