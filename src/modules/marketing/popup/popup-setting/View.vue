<template>
  <sa-section class="popup">
    <template slot="header">
      <div class="popup__header">
        <div class="popup__header--search">
          <div class="popup__header--filter">
            <b>{{ $t('page.popup.typesofdisplay') }}</b>
            <el-select
            element-loading-spinner="el-icon-loading"
            v-model="filter.displayType">
              <el-option
              v-for="(item, index) in typeOptions"
              :key="index"
              :label="$t(`${item.key}`)"
              :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class="popup__header--filter">
            <b>{{ $t('page.popup.numOfDisplay') }}</b>
              <el-input-number :controls="false" v-model="filter.maxViewDay" :min="0"></el-input-number>
              <span>{{ $t('page.popup.perDecivePerDate') }}</span>
          </div>

          <div v-if="filter.displayType === 3" class="popup__header--filter">
            <b>{{ $t('page.popup.numOfCustomDisplay') }}</b>
              <el-input-number :controls="false" v-model="filter.bothNumOfCustom" :min="0"></el-input-number>
          </div>

        </div>
        <div class="popup__header--add">
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

    <table
      v-loading="ui.isLoading"
      class="table-components data-table"
      >
      <thead>
        <th class="table-head" v-for="(item, index) in ui.tableColumns" :key="index">
          <p v-if="item.prop === 'firstColumn'"></p>
          <p v-else :class="{ 'align-center': item.prop === 'operations' || item.prop === 'display' }">{{ $t(`${item.label}`) }}</p>
        </th>
      </thead>
      <draggableComponent
        v-model="listPopupSettingDisplays"
        tag="tbody"
        @change="swapPopup"
        class="draggable"
      >
        <tr v-for="(dataRow, index) in listPopupSettingDisplays"
          :key="index + 1"
        >
          <td
            v-for="(item, index) in ui.tableColumns"
            :key="index"
          >
            <div v-if="item.prop === 'firstColumn'" style="width: 100%; height: 100%; cursor: pointer;">
              <i class="el-icon-menu"></i>
            </div>
            <div v-if="item.prop=== 'title'">
              <router-link :to="{ name: 'popupDetails', params: { sn: dataRow.sn } }">
                {{ dataRow.title }}
              </router-link>
            </div>
            <div v-else-if="item.prop=== 'imagePath'">
                <el-image
                style="width: 100px; height: 100px"
                :src="formatImage(dataRow.imagePath)"
                fit="scale-down"></el-image>
            </div>
            <div v-else-if="item.prop=== 'targetType'">
                {{ getTargetType(dataRow.targetType) }}
            </div>
            <div v-else-if="item.prop=== 'maxView'">
              <p>
                <b>{{ $t('page.popup.maxView') }}</b>: {{ dataRow.maxView === 0 ? $t('page.popup.noViewLimit') :  dataRow.maxView }}
              </p>
              <p>
                <b>{{ $t('page.popup.stopAt') }}</b>: {{dataRow.endDate }}
              </p>
            </div>
            <div v-else-if="item.prop=== 'display'">
              <p v-if="dataRow.display === 1">{{ $t('option.status.active') }}</p>
              <p v-else>{{ $t('option.status.disable') }}</p>
            </div>
            <p v-else>{{ dataRow[item.prop] }}</p>
          </td>
        </tr>
      </draggableComponent>
    </table>

  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { TARGET_TYPE } from '@/utils/const'
import { fetchPopupSettingDisplays, updatePopupSettingDisplay, swapPopup } from './api'
import draggableComponent from '@/utils/draggable.js'

export default {
  name: 'PopupSetting',
  components: {
    SaSection,
    draggableComponent
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
            label: 'page.popup.title'
          },
          {
            prop: 'imagePath',
            label: 'page.popup.image'
          },
          {
            prop: 'targetName',
            label: 'page.popup.linkedName'
          },
          {
            prop: 'targetType',
            label: 'page.popup.linkedType'
          },
          {
            prop: 'maxView',
            label: 'page.popup.disableCondition'
          },
          {
            prop: 'totalViews',
            label: 'page.popup.totalOfViews'
          },
          {
            prop: 'totalClicks',
            label: 'page.popup.totalClicks'
          },
          {
            prop: 'display',
            label: 'page.popup.status'
          }
        ]
      },
      listPopupSettingDisplays: [],
      filter: {
        bothNumOfCustom: 0,
        displayType: 1,
        maxViewDay: 0
      },
      pagination: {},
      typeOptions: [
        { value: 1, key: 'page.popup.random' },
        { value: 2, key: 'page.popup.custom' },
        { value: 3, key: 'page.popup.both' }
      ]
    }
  },
  created () {
    this.fetchPopupSettingDisplays()
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
    async fetchPopupSettingDisplays () {
      this.ui.isLoading = true
      try {
        const { data } = await fetchPopupSettingDisplays()
        this.listPopupSettingDisplays = data.data.popups
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
        await updatePopupSettingDisplay(this.filter)
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
    async swapPopup (e) {
      if (!e.moved) {
        return false
      }
      const params = {
        positionBefore: e.moved.oldIndex,
        positionAfter: e.moved.newIndex
      }
      try {
        await swapPopup(params)
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
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2em;
      gap: 1em;
      flex-wrap: wrap;
      &--search {
        display: flex;
        align-items: center;
        gap: 1em;
        flex-wrap: wrap;
      }
      &--filter {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }
    }
  }
</style>
