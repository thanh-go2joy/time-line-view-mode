<template>
  <sa-section class="popup">
    <template slot="header">
      <div class="popup__header">
        <div class="popup__header--search">
          <div class="mb-1em w-100">
            <el-input :placeholder="$t('breadcrumb.keyword')"
            prefix-icon="el-icon-search"
            v-model="filter.keyword"
            clearable
            @input="searchPopups"
            ></el-input>
          </div>
          <div>
            <el-select
            class="w-100"
            :loading="ui.isLoadingProvinces"
            element-loading-spinner="el-icon-loading"
            @change="fetchPopups"
            v-model="filter.provinceSn">
              <el-option
              v-for="(item, index) in provinces"
              :key="index"
              :label="item.name"
              :value="item.sn">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="popup__header--add">
          <el-button
            type="warning"
            plain
            @click="handleSetting"
            icon="el-icon-setting"
          >
            {{ $t('button.settingOfDisplay') }}
          </el-button>
          <el-button
            type="warning"
            plain
            @click="handleCreate"
            icon="el-icon-plus"
          >
            {{ $t('button.add') }}
          </el-button>
        </div>
      </div>
    </template>
    <el-table
      v-loading="ui.isLoading"
      :data="listPopups"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="20"
      />
      <el-table-column
        :label="$t('page.popup.title')"
        min-width="200"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'popupDetails', params: { sn: scope.row.sn } }">
              {{ scope.row.title }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.popup.image')"
        min-width="150"
      >
        <template slot-scope="scope">
          <el-image
          style="max-width: 100px"
          :src="formatImage(scope.row.imagePath)"
          fit="scale-down"></el-image>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.popup.linkedName')"
        min-width="150"
      >
        <template slot-scope="scope">
          <router-link
            v-if="scope.row.targetType === 1 && scope.row.targetInfo"
            :to="{
                name: 'promotionDetails',
                params: {
                  promotionSn: scope.row.sn,
                  couponSn: scope.row.couponSn
                }
              }"
          >
            {{ scope.row.targetName }}
          </router-link>
          <router-link v-else-if="scope.row.targetType === 2 && scope.row.targetSn" :to="{ name: 'hotelDisplayDetails', params: { sn: scope.row.targetSn } }">
            {{ scope.row.targetName }}
          </router-link>
          <router-link v-else-if="scope.row.targetType === 3 && scope.row.targetSn" :to="{ name: 'noticeDetails', params: { sn: scope.row.targetSn } }">
            {{ scope.row.targetName }}
          </router-link>
          <a v-else-if="scope.row.targetType === 4" :href="scope.row.targetInfo">
            {{ scope.row.targetInfo }}
          </a>
        </template>
      </el-table-column>
            <el-table-column
        :label="$t('page.popup.linkedType')"
        min-width="150"
      >
        <template slot-scope="scope">
          {{ getTargetType(scope.row.targetType) }}
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.popup.disableCondition')"
        min-width="150"
      >
        <template slot-scope="scope">
          <p>
            <span class="bold">{{ $t('page.popup.maxView') }}</span>: {{ scope.row.maxView === 0 ? $t('page.popup.noViewLimit') :  scope.row.maxView }}
          </p>
          <p>
            <span class="bold">{{ $t('page.popup.stopAt') }}</span>: {{ scope.row.endDate }}
          </p>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.popup.totalOfViews')"
        min-width="150"
      >
        <template slot-scope="scope">
          {{ scope.row.totalViews }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.popup.totalClicks')"
        min-width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.totalClicks }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.popup.status')"
        min-width="100"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.display === 1">{{ $t('option.status.active') }}</p>
          <p v-else>{{ $t('option.status.disable') }}</p>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.userMgt.operations')"
        align="center"
        min-width="100"
      >
        <template slot-scope="scope">
          <el-button
              v-if="hasPermission('sapopup', 'pModify')"
              type="success"
              size="small"
              plain
              @click="handleEdit(scope.row)"
              icon="el-icon-edit"
            >
              {{$t('button.edit')}}
            </el-button>
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
import { TARGET_TYPE } from '@/utils/const'
import { debounce, scrollToTop } from '@/utils/helpers'
import SaSection from '@/components/globals/SaSection.vue'
import { fetchProvinces } from '@/api/province'
import { fetchPopups } from './api'
const timeDebounce = 500

export default {
  name: 'Popup',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        isLoading: false,
        isLoadingProvinces: false
      },
      listPopups: [],
      filter: {
        limit: 10,
        page: 1,
        keyword: '',
        status: 1,
        provinceSn: null
      },
      pagination: {},
      provinces: []
    }
  },
  created () {
    this.fetchPopups()
    this.fetchProvinces()
  },
  methods: {
    getTargetType (targetType) {
      if (targetType === TARGET_TYPE.PROMOTION_EVENT) return `${this.$t('option.targetType.promotionEvent')}`
      else if (targetType === TARGET_TYPE.HOTEL) return `${this.$t('option.targetType.hotel')}`
      else if (targetType === TARGET_TYPE.NOTICE) return `${this.$t('option.targetType.notice')}`
      else if (targetType === TARGET_TYPE.LINK_OUT_APP) return `${this.$t('option.targetType.linkOutApp')}`
      else if (targetType === TARGET_TYPE.LINK_IN_APP) return `${this.$t('option.targetType.linkInApp')}`
      else if (targetType === TARGET_TYPE.DISTRICT) return `${this.$t('option.targetType.district')}`
      else if (targetType === TARGET_TYPE.MILEAGE_POINT) return `${this.$t('option.targetType.mileagePoint')}`
      else if (targetType === TARGET_TYPE.COUPON) return `${this.$t('option.targetType.coupon')}`
      else if (targetType === TARGET_TYPE.DIRECT_DISCOUNT) return `${this.$t('option.targetType.directDiscount')}`
      else if (targetType === TARGET_TYPE.INVITE_FRIEND) return `${this.$t('option.targetType.inviteFriend')}`
      else if (targetType === TARGET_TYPE.PROMOTION_GROUP) return `${this.$t('option.targetType.promotionGroup')}`
      else if (targetType === TARGET_TYPE.AMENITY_PACK) return `${this.$t('option.targetType.amenityPack')}`
      else if (targetType === TARGET_TYPE.HOTEL_GO2CHOICE) return `${this.$t('option.targetType.hotelGo2Choice')}`
      else return ''
    },
    async fetchProvinces () {
      this.ui.isLoadingProvinces = true
      try {
        this.provinces = [{ name: this.$t('option.all'), sn: null }]
        const params = { limit: 100, status: 1 }
        const { data } = await fetchProvinces(params)
        this.provinces = [...this.provinces, ...data.data.provinces]
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingProvinces = false
      }
    },
    async fetchPopups () {
      this.ui.isLoading = true
      try {
        const { data } = await fetchPopups(this.filter)
        this.listPopups = data.data.popups
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        scrollToTop('.popup__header')
        this.ui.isLoading = false
      }
    },
    searchPopups: debounce(function () {
      this.fetchPopups()
    }, timeDebounce),
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchPopups()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchPopups()
    },
    handleCreate () {
      this.$router.push({ name: 'popupCreate' })
    },
    handleEdit (data) {
      this.$router.push({ name: 'popupEdit', params: { sn: data.sn } })
    },
    handleSetting () {
      this.$router.push({ name: 'popupSetting' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .bold {
    font-weight: bold;
  }
  .popup {
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
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1em;
      &--search {
        display: flex;
        gap: 1em;
        @media (max-width: 768px) {
          display: inline-block;
          width: 100%;
        }
      }
    }
    @media (max-width: 768px) {
      .mb-1em {
        margin-bottom: 1em;
      }
      .w-100 {
        width: 100%;
      }
    }
  }
</style>
