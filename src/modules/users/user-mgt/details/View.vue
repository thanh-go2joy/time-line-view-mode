<template>
  <div
    class="user-details"
  >
    <sa-section v-loading="ui.loadingUserDetails">
      <div class="user-details__info">
        <CardItem
          v-for="(value, label, index) in userDetails"
          :key="index"
          :value="value"
          :label="label"
        />
      </div>
    </sa-section>
    <sa-section
      :title="$t('page.userMgt.favorite_area')"
      v-loading="ui.loadingFavoriteArea"
    >
      <FavoriteAreas
        :favoriteAreas="favoriteAreas"
        @size-change="(value) => { changePageSize(value, 'FavoriteAreas') }"
        @current-change="(value) => { changeCurrentPage(value, 'FavoriteAreas') }"
      />
    </sa-section>
    <sa-section
      :title="$t('page.userMgt.favorite_hotel')"
      v-loading="ui.loadingFavoriteArea"
    >
      <FavoriteHotels
        :favoriteHotels="favoriteHotels"
        @size-change="(value) => { changePageSize(value, 'FavoriteHotels') }"
        @current-change="(value) => { changeCurrentPage(value, 'FavoriteHotels') }"
      />
    </sa-section>
    <sa-section
      :title="$t('page.userMgt.booking_history')"
      v-loading="ui.loadingBookingHistories"
    >
      <BookingHistories
        :bookingHistories="bookingHistories"
        @size-change="(value) => { changePageSize(value, 'BookingHistories') }"
        @current-change="(value) => { changeCurrentPage(value, 'BookingHistories') }"
      />
    </sa-section>
    <sa-section
      :title="$t('page.userMgt.coupon')"
      v-loading="ui.loadingCoupons"
    >
      <Coupons
        :coupons="coupons"
        @size-change="(value) => { changePageSize(value, 'Coupons') }"
        @current-change="(value) => { changeCurrentPage(value, 'Coupons') }"
      />
    </sa-section>
    <sa-section
      :title="$t('page.userMgt.stamp')"
      v-loading="ui.loadingUserStamps"
    >
      <UserStamps
        :userStamps="userStamps"
        @size-change="(value) => { changePageSize(value, 'UserStamps') }"
        @current-change="(value) => { changeCurrentPage(value, 'UserStamps') }"
      />
    </sa-section>
  </div>
</template>
<script>
import {
  getUserDetails,
  fetchBookingHistories,
  fetchUserStamps,
  fetchCoupons,
  fetchFavoriteAreas,
  fetchFavoriteHotels
} from './api'
import SaSection from '@/components/globals/SaSection.vue'
import CardItem from './components/card-item.vue'
import BookingHistories from './components/booking-histories.vue'
import UserStamps from './components/user-stamps.vue'
import FavoriteAreas from './components/favorite-areas.vue'
import FavoriteHotels from './components/favorite-hotels.vue'
import Coupons from './components/coupons.vue'
import mixins from '../mixins'
export default {
  name: 'UserDetails',
  components: {
    SaSection,
    CardItem,
    BookingHistories,
    UserStamps,
    Coupons,
    FavoriteAreas,
    FavoriteHotels
  },
  mixins: [mixins],
  data: (vm) => {
    return {
      userDetails: {},
      userStamps: {},
      bookingHistories: {},
      coupons: {},
      favoriteAreas: {},
      favoriteHotels: {},
      ui: {
        loadingUserStamps: false,
        loadingUserDetails: false,
        loadingBookingHistories: false,
        loadingCoupons: false,
        loadingFavoriteArea: false,
        loadingFavoriteHotel: false,
        displayItemDetails: [
          'nickName',
          'userId',
          'birthday',
          'email',
          'viaApp',
          'registerTime',
          'numOpenApp',
          'memberId',
          'gender',
          'mobile',
          'address',
          'lastUpdate',
          'mobileDevice',
          'login',
          'lastOpenAddress',
          'lastOpenApp'
        ],
        giftboxSrc: require('@/assets/images/svg/gifts.svg'),
        clockSrc: require('@/assets/images/svg/clock.svg')
      },
      queryCoupons: {
        limit: 10
      },
      queryUserStamps: {
        limit: 10,
        appUserSn: vm.$route.params.sn
      },
      queryFavoriteAreas: {
        limit: 10
      },
      queryFavoriteHotels: {
        limit: 10
      },
      queryBookingHistories: {
        limit: 10,
        appUserSn: vm.$route.params.sn
      }
    }
  },
  created () {
    this.getUserDetails()
    this.fetchBookingHistories()
    this.fetchUserStamps()
    this.fetchCoupons()
    this.fetchFavoriteAreas()
    this.fetchFavoriteHotels()
  },
  methods: {
    async fetchFavoriteHotels () {
      this.ui.loadingFavoriteHotel = true
      try {
        const { data } = await fetchFavoriteHotels(this.$route.params.sn, this.queryFavoriteHotels)
        this.favoriteHotels = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loadingFavoriteHotel = false
      }
    },
    async fetchFavoriteAreas () {
      this.ui.loadingFavoriteArea = true
      try {
        const { data } = await fetchFavoriteAreas(this.$route.params.sn, this.queryFavoriteAreas)
        this.favoriteAreas = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loadingFavoriteArea = false
      }
    },
    async fetchCoupons () {
      this.ui.loadingCoupons = true
      try {
        const { data } = await fetchCoupons(this.$route.params.sn, this.queryCoupons)
        this.coupons = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loadingCoupons = false
      }
    },
    async fetchUserStamps () {
      this.ui.loadingUserStamps = true
      try {
        const { data } = await fetchUserStamps(this.queryUserStamps)
        this.userStamps = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loadingUserStamps = false
      }
    },
    async getUserDetails () {
      this.ui.loadingUserDetails = true
      try {
        const { data } = await getUserDetails(this.$route.params.sn)
        // this.userDetails = data.data
        this.ui.displayItemDetails.forEach(keyName => {
          switch (keyName) {
            case 'gender':
              if (data.data[keyName] === 1) {
                this.userDetails[keyName] = this.$t('page.userMgt.male')
              } else if (data.data[keyName] === 2) {
                this.userDetails[keyName] = this.$t('page.userMgt.female')
              } else {
                this.userDetails[keyName] = this.$t('page.userMgt.gender_none')
              }
              break
            case 'login':
              this.userDetails[keyName] = data.data[keyName] ? this.$t('page.userMgt.loging') : this.$t('page.userMgt.logouted')
              break
            case 'viaApp':
              this.userDetails[keyName] = this.setLoginBy(data.data.viaApp)
              break
            case 'lastUpdate':
            case 'registerTime':
              this.userDetails[keyName] = this.formatDate(data.data[keyName])
              break
            default:
              this.userDetails[keyName] = data.data[keyName]
              break
          }
        })
      } catch (error) {
        return false
      } finally {
        this.ui.loadingUserDetails = false
      }
    },
    async fetchBookingHistories () {
      this.ui.loadingBookingHistories = true
      try {
        const { data } = await fetchBookingHistories(this.queryBookingHistories)
        this.bookingHistories = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loadingBookingHistories = false
      }
    },
    changePageSize (value, tableName) {
      switch (tableName) {
        case 'BookingHistories':
          this.queryBookingHistories.limit = value
          this.fetchBookingHistories()
          break
        case 'Coupons':
          this.queryCoupons.limit = value
          this.fetchCoupons()
          break
        case 'FavoriteAreas':
          this.queryFavoriteAreas.limit = value
          this.fetchFavoriteAreas()
          break
        case 'UserStamps':
          this.queryUserStamps.limit = value
          this.fetchUserStamps()
          break
        case 'FavoriteHotels':
          this.queryFavoriteHotels.limit = value
          this.fetchFavoriteHotels()
          break
        default:
          break
      }
    },
    changeCurrentPage (value, tableName) {
      switch (tableName) {
        case 'BookingHistories':
          this.queryBookingHistories.page = value
          this.fetchBookingHistories()
          break
        case 'Coupons':
          this.queryCoupons.page = value
          this.fetchCoupons()
          break
        case 'FavoriteAreas':
          this.queryFavoriteAreas.page = value
          this.fetchFavoriteAreas()
          break
        case 'UserStamps':
          this.queryUserStamps.page = value
          this.fetchUserStamps()
          break
        case 'FavoriteHotels':
          this.queryFavoriteHotels.page = value
          this.fetchFavoriteHotels()
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.user-details {
  &__info {
    display: grid;
    grid-template-columns: 49% 49%;
    grid-column-gap: 2%;
  }
  .text-danger {
    color: #ff6400;
    margin-left: 4px;
  }
}
</style>
