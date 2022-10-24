<template>
  <sa-section class="banner">
    <template slot="header">
      <div class="banner__header">
        <div class="banner__header--search">
          <b>{{ $t('page.banner.typesofdisplay') }}</b>
          <el-select
            element-loading-spinner="el-icon-loading"
            v-model="displayType">
            <el-option
            v-for="(item, index) in typeOptions"
            :key="index"
            :label="$t(`${item.key}`)"
            :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="banner__header--add">
          <el-button
            type="warning"
            plain
            @click="handleSave"
          >
            {{ $t('button.save') }}
          </el-button>
          <el-button
            type="warning"
            plain
            @click="$router.go(-1)"
          >
            {{ $t('button.back') }}
          </el-button>
        </div>
      </div>
    </template>
    <el-table-draggable handle="td">
      <el-table
        row-key="sn"
        v-loading="ui.isLoading"
        :data="listBannerSettingDisplays"
      >
        <el-table-column
          min-width="50"
        >
          <i class="el-icon-menu"></i>
        </el-table-column>

        <el-table-column
          :label="$t('page.banner.title')"
          min-width="200"
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'bannerDetails', params: { sn: scope.row.sn } }">
              {{ scope.row.title }}
            </router-link>
          </template>
        </el-table-column>

        <el-table-column
        :label="$t('page.banner.image')"
          min-width="200"
        >
          <template slot-scope="scope">
            <el-image
              style="max-width: 100px"
              :src="formatImage(scope.row.imagePath)"
              fit="scale-down"></el-image>
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('page.banner.linkedName')"
          min-width="200"
        >
          <template slot-scope="scope">
            {{ scope.row.targetName }}
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('page.banner.totalClicks')"
          min-width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.totalClicks }}
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('page.banner.linkedType')"
          min-width="150"
        >
          <template slot-scope="scope">
            {{ getTargetType(scope.row.targetType) }}
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('page.banner.status')"
          min-width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.display === 1 ? $t('option.status.active') : $t('option.status.disable') }}
          </template>
        </el-table-column>

      </el-table>
    </el-table-draggable>

  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { fetchBannerSettingDisplays, updateBannerSettingDisplay, swapBanner } from './api'
import ElTableDraggable from 'el-table-draggable'
import { TARGET_TYPE } from '@/utils/const'

export default {
  name: 'BannerSetting',
  components: {
    SaSection,
    ElTableDraggable
  },
  data () {
    return {
      ui: {
        isLoading: false,
        isSubmiting: false,
        tableColumns: [
          {
            prop: 'firstColumn'
          },
          {
            prop: 'title',
            label: 'page.banner.title'
          },
          {
            prop: 'imagePath',
            label: 'page.banner.image'
          },
          {
            prop: 'targetName',
            label: 'page.banner.linkedName'
          },
          {
            prop: 'totalClicks',
            label: 'page.banner.totalClicks'
          },
          {
            prop: 'targetType',
            label: 'page.banner.linkedType'
          },
          {
            prop: 'display',
            label: 'page.banner.status'
          }
        ]
      },
      listBannerSettingDisplays: [],
      filter: {
        limit: 10,
        page: 1
      },
      displayType: 1,
      pagination: {},
      typeOptions: [
        { value: 1, key: 'page.banner.random' },
        { value: 2, key: 'page.banner.custom' }
      ]
    }
  },
  created () {
    this.fetchBannerSettingDisplays()
  },
  methods: {
    getTargetType (targetType) {
      if (targetType === TARGET_TYPE.PROMOTION_EVENT) return `${this.$t('option.targetType.promotion')}`
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
    async fetchBannerSettingDisplays () {
      this.ui.isLoading = true
      try {
        const { data } = await fetchBannerSettingDisplays(this.filter)
        this.listBannerSettingDisplays = data.data.banners
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    async handleSave () {
      this.ui.isSubmiting = true
      try {
        await updateBannerSettingDisplay({ displayType: this.displayType })
        const message = this.$t('message.sendSuccess')
        this.$message({
          type: 'success',
          message: message
        })
        this.$router.go(-1)
      } catch (error) {
        return false
      } finally {
        this.ui.isSubmiting = false
      }
    },
    async swapBanner (e) {
      if (!e.moved) {
        return false
      }
      const params = {
        positionBefore: e.moved.oldIndex,
        positionAfter: e.moved.newIndex
      }
      try {
        await swapBanner(params)
        const message = this.$t('message.updateSuccess')
        this.$message({
          type: 'success',
          message: message
        })
      } catch (error) {
        return false
      } finally {}
    }
  }
}
</script>

<style lang="scss" scoped>
  b {
    font-weight: bold;
  }
  .banner {
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
        align-items: center;
        gap: 1em;
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
