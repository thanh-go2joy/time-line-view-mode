<template>
  <sa-section
    v-loading="ui.detailLoading"
    class="collection-details"
  >
    <div class="collection-details__content">
      <div class="collection-details__row">
        <div class="collection-details__row--left">
          {{ $t('page.collection.display') }}
        </div>
        <div class="collection-details__row--right">
          <p
            v-if="collectionDetails.display === 1"
            style="margin-right: 12px;"
          >
            ✔
          </p>
          <p style="margin-right: 12px;">
            {{ setDisplayType(collectionDetails.displayType) }}
          </p>
          <p style="margin-right: 12px;">
            {{ collectionDetails.idx }}
          </p>
          <p>{{collectionDetails.lastUpdate}}</p>
        </div>
      </div>
      <div class="collection-details__row">
        <div class="collection-details__row--left">
          {{ $t('page.collection.title') }}
        </div>
        <div class="collection-details__row--right">
          <p>{{collectionDetails.title}}</p>
        </div>
      </div>
      <div
        class="collection-details__row"
      >
        <div class="collection-details__row--left">
          {{ $t('page.collection.image') }}
        </div>
        <div v-if="collectionDetails.imagePath" class="collection-details__row--right">
          <img
            :src="formatImage(collectionDetails.imagePath)"
            style="vertical-align: middle; border-style: none;"
          >
        </div>
      </div>
      <div
        class="collection-details__row hotel-list"
      >
        <div class="collection-details__row--left">
          {{ $t('page.collection.hotelList') }}
        </div>
        <div class="collection-details__row--right">
          <p
            v-for="(item, index) in ui.hotelList"
            :key="index"
            class="hotel-item"
          >
            <span
              v-if="collectionDetails[item] === 1"
              style="margin-right: 4px;"
            >
              ✔
            </span>
            <span :class="{ 'is-active': collectionDetails[item] === 1 }">
              {{ $t(`page.collection.${item}`) }}
            </span>
          </p>
        </div>
      </div>
      <div
        class="collection-details__row"
      >
        <div class="collection-details__row--left">
          {{ $t('page.collection.promotionGroup') }}
        </div>
        <div class="collection-details__row--right">
          {{ collectionDetails.promotionGroup }}
        </div>
      </div>
      <div
        class="collection-details__row"
      >
        <div class="collection-details__row--left">
          {{ $t('page.collection.displayArea') }}
        </div>
        <div class="collection-details__row--right">
          {{ collectionDetails.displayArea }}
        </div>
      </div>
    </div>
    <div v-if="listHotels.length > 0 || listPromotions.length > 0" class="collection-details__table">
      <p class="collection-details__table--title-blue">
        {{ collectionDetails.promotionSuggestion === 0 ?
        $t('page.collection.hotelList') : $t('page.collection.promotionList')}}
      </p>
      <el-table
        v-if="collectionDetails.promotionSuggestion === 0"
        :data="listHotels"
        v-loading="ui.tableLoading"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="#"
          min-width="20"
        />
        <el-table-column
          :label="$t('page.collection.hotelName')"
          min-width="120"
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'hotelDisplayDetails', params: { sn: scope.row.sn } }">
            {{ scope.row.name }}
          </router-link>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.collection.status')"
          min-width="100"
        >
          <template slot-scope="scope">
            {{ setHotelStatus(scope.row.hotelStatus) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          :label="$t('page.collection.phone')"
          min-width="100"
        />
        <el-table-column
          prop="provinceName"
          :label="$t('page.collection.province')"
          min-width="100"
        />
        <el-table-column
          prop="address"
          :label="$t('page.collection.address')"
          min-width="180"
        />
        <el-table-column
          prop="createTime"
          :label="$t('page.collection.createTime')"
          min-width="160"
        >
          <template slot-scope="scope">
            {{ formatDate(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="lastUpdate"
          :label="$t('page.collection.lastUpdate')"
          min-width="160"
        >
        <template slot-scope="scope">
          {{ formatDate(scope.row.lastUpdate) }}
        </template>
        </el-table-column>
      </el-table>
      <el-table
        v-if="collectionDetails.promotionSuggestion === 1"
        :data="listPromotions"
        v-loading="ui.tableLoading"
        style="width: 100%"
      >
        <el-table-column
          prop="title"
          :label="$t('page.collection.promotionName')"
          min-width="100"
        />
        <el-table-column
          prop="code"
          :label="$t('page.collection.code')"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="type"
          :label="$t('page.collection.type')"
          min-width="50"
        >
          <template slot-scope="scope">
            {{ setTypePromotion(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.collection.discount')"
          min-width="100"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.discountType !== 3 && scope.row.discountType !== 4">
              {{ setDiscountPromotion(scope.row.discountType, scope.row.discount) }}
            </span>
            <img
              v-else-if="scope.row.discountType === 3"
              :src="ui.gifboxSrc"
              style="width: 20px;height: 20px;"
              alt="giftbox"
            >
            <img
              v-else-if="scope.row.discountType === 4"
              :src="ui.clockSrc"
              style="width: 20px; height: 20px;"
              alt="giftbox"
            >
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.collection.applyStartEnd')"
          min-width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.applyStart }} ~ {{ scope.row.applyEnd }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.collection.couponStartEnd')"
          min-width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.couponStart }} ~ {{ scope.row.couponEnd }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </sa-section>
</template>
<script>
import { getCollectionDetails } from '../edit/api'
import { fetchHotels, fetchPromotions } from './api'
import SaSection from '@/components/globals/SaSection.vue'
export default {
  name: 'collectionDetails',
  components: {
    SaSection
  },
  data: () => {
    return {
      collectionDetails: {},
      listPromotions: [],
      listHotels: [],
      ui: {
        detailLoading: false,
        tableLoading: false,
        gifboxSrc: require('@/assets/images/svg/gifts.svg'),
        clockSrc: require('@/assets/images/svg/clock.svg'),
        hotelList: [
          'flashSale',
          'promotion',
          'directDiscount',
          'amenityPackHotel',
          'loveHotel',
          'travelHotel',
          'hotHotel',
          'newHotel',
          'stamp',
          'image360',
          'hotelReview',
          'hotSearched',
          'hotelBooked',
          'hotelFavorite',
          'g2jCertified',
          'hotelSuggestion',
          'isTet',
          'quarantine',
          'promotionSuggestion'
        ]
      }
    }
  },
  async created () {
    await this.getCollectionDetails()
  },
  methods: {
    setHotelStatus (value) {
      if (!value) {
        return ''
      }
      switch (value) {
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
    },
    setTypePromotion (value) {
      if (!value) {
        return ''
      }
      switch (value) {
        case 0:
          return this.$t('page.collection.all')
        case 1:
          return this.$t('page.collection.apply')
        case 2:
          return this.$t('page.collection.event')
        case 3:
          return this.$t('page.collection.inviteFriend')
        case 4:
          return this.$t('page.collection.gift')
        case 5:
          return this.$t('page.collection.booking')
        case 6:
          return this.$t('page.collection.reportNewHotel')
        case 7:
          return this.$t('page.collection.signUp')
        case 8:
          return this.$t('page.collection.birthday')
        case 9:
          return this.$t('page.collection.payment')
      }
    },
    setDiscountPromotion (type, value) {
      if (!type) {
        return 'N/A'
      }
      switch (type) {
        case 1:
          return value ? `${value} VND` : 'N/A'
        case 2:
          return value ? `${value} %` : 'N/A'
        case 5:
          return value ? `ĐG ${value}` : 'N/A'
        default:
          return 'N/A'
      }
    },
    setDisplayType (value) {
      if (!value) {
        return ''
      }
      switch (value) {
        case 1:
          return this.$t('page.collection.detail')
        case 2:
          return this.$t('page.collection.collection')
        case 3:
          return this.$t('page.collection.summary')
        case 4:
          return this.$t('page.collection.circle')
        case 5:
          return this.$t('page.collection.lightSquare')
        case 6:
          return this.$t('page.collection.darkSquare')
        case 7:
          return this.$t('page.collection.rectangle1')
        case 8:
          return this.$t('page.collection.rectangle2')
        case 9:
          return this.$t('page.collection.icon')
        default:
          return ''
      }
    },
    async fetchPromotions () {
      this.ui.tableLoading = true
      try {
        const { data } = await fetchPromotions(this.$route.params.sn)
        this.listPromotions = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.tableLoading = false
      }
    },
    async fetchHotels () {
      this.ui.tableLoading = true
      try {
        const { data } = await fetchHotels(this.$route.params.sn)
        this.listHotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.tableLoading = false
      }
    },
    async getCollectionDetails () {
      this.ui.detailLoading = false
      try {
        const { data } = await getCollectionDetails(this.$route.params.sn)
        this.collectionDetails = data.data[0]
        await this.collectionDetails.promotionSuggestion === 1 ? this.fetchPromotions() : this.fetchHotels()
      } catch (error) {
        return false
      } finally {
        this.ui.detailLoading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.collection-details {
  &__row {
    padding: 16px;
    border-bottom: 1px solid rgba(0,0,0,.125);
    display: flex;
    align-items: center;

    &--left {
      width: 30%;
      font-weight: bold;
    }
    &--right.hotel-list {
      margin-bottom: -16px;
    }
    &--right {
      img {
        max-height: 250px;
        max-width: 250px;
      }
      width: 70%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .hotel-item {
        margin-bottom: 16px;
        width: 160px;
      }
      .is-active {
        font-weight: 500;
      }
    }

    @media (max-width: 640px) {
      display: block;
      &--left {
        width: 100%;
      }
      &--right {
        width: 100%;
      }
    }
  }
  &__table {
    margin-top: 60px;
    &--title-blue {
      padding: 12px 24px;
      background-color: #409EFF;
      color: white;
      font-weight: 500;
    }
  }
}
</style>
