<template>
<sa-section>
  <div class="dashboard-block">
    <div class="activities-detail-segment">
      <div class="activities-detail-segment__content" v-if="!isLoading">
        <div>
          <div class="activities-detail-segment__content--line">
            <div class="activities-detail-title">
              <p>{{ $t('page.activitiesDetail.title')}}</p>
            </div>
            <div class="activities-detail-content" >
              <p>{{ dataActivities.title }}</p>
            </div>
            <div class="activities-detail-title">
              <p>{{ $t('page.activitiesDetail.request_by')}}</p>
            </div>
            <div class="activities-detail-content" >
              <p>
                {{ dataActivities.requestStaffName }} {{ this.formatDate(dataActivities.lastUpdate) }}
              </p>
            </div>
          </div>
          <div class="activities-detail-segment__content--line">
            <div class="activities-detail-title">
                  <p>{{ $t('page.activitiesDetail.type')}}</p>
              </div>
              <div class="activities-detail-content" >
                  <p>{{ getActivitiesDetailType(dataActivities.type) }}</p>
              </div>
              <div class="activities-detail-title">
                  <p>{{ $t('page.activitiesDetail.status')}}</p>
              </div>
              <div class="activities-detail-content style-flex" >
                  <div>{{ getActivitiesDetailStatus(dataActivities.status) }} &nbsp; </div>
                  <div>
                      <p v-if="dataActivities.type === 1">
                        <router-link
                        :to="{
                          name: 'promotionDetails',
                          params: {
                            promotionSn: dataPromotion.sn,
                            couponSn: dataPromotion.couponSn
                          }
                        }"
                      >
                          <span class="style-color-link">{{ $t('page.activitiesDetail.root_page')}}</span>
                        </router-link>
                      </p>
                      <p v-else-if="dataActivities.type === 2">

                          <router-link :to="{ name: 'inviteFriendDetails', params: { sn: dataActivities.targetSn } }">
                          <span class="style-color-link">{{ $t('page.activitiesDetail.root_page')}}</span>
                        </router-link>
                      </p>
                      <p v-else-if="dataActivities.type === 3">
                        <router-link :to="{ name: 'product_detail', params: { id: dataActivities.targetSn }}">
                          <span class="style-color-link">{{ $t('page.activitiesDetail.root_page')}}</span>
                        </router-link>
                      </p>
                      <p v-else />
                  </div>
              </div>
          </div>
          <div class="activities-detail-segment__content--input">
            <el-input
              :placeholder="$t('page.activitiesDetail.reason_to_confirm')"
              v-model="confirm"
              type="text"
            />
          </div>
        </div>
        <div>
            <div class="activities-detail-segment__content--title">
                <p class="style-title-list">{{$t('page.activitiesDetail.confirm_staff_list')}}</p>
            </div>
            <div class="activities-detail-segment__content--title">
              <div class="activities-detail-table-user">
                <div class="activities-detail-table-user__account-sale-level">
                  <p class="activities-detail-table-user__account-sale-level--name">
                    {{$t('page.activitiesDetail.level1')}}
                  </p>
                </div>
                <div class="activities-detail-table-user__confirm">
                  <p v-if="allConfirm === 0" class="activities-detail-table-user__confirm--title">
                    {{$t('page.activitiesDetail.single_confirm')}}
                  </p>
                  <p v-if="allConfirm === 1" class="activities-detail-table-user__confirm--title">
                    {{$t('page.activitiesDetail.all_confirm')}}
                  </p>
                </div>
              </div>
              <el-table
                :data="tableData"
                class="hotel-group-mgt-segment__table"
              >
                <el-table-column
                  type="index"
                  label="#"
                  min-width="20"
                />
                <el-table-column
                  :label="$t('page.activitiesDetail.staff_name')"
                  min-width="100"
                >
                  <template slot-scope="scope">
                    <router-link
                      :to="{ name: 'go2joyStaffDetails', params: { sn: scope.row.staffSn }}"
                    >
                    {{ scope.row.staffName }}
                    </router-link>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('page.activitiesDetail.role')"
                  min-width="100"
                >
                  <template slot-scope="scope">
                    <span> {{ scope.row.roleName }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('page.activitiesDetail.enable')"
                  min-width="100"
                >
                  <template slot-scope="scope">
                    <span >{{ scope.row.status === 1 ? '✓' : '' }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('page.activitiesDetail.confirm_permission')"
                  min-width="100"
                >
                  <template slot-scope="scope">
                    <span >{{ scope.row.allowConfirm === 1 ? '✓' : '' }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('page.activitiesDetail.confirmed_cancel')"
                  min-width="100"
                >
                  <template slot-scope="scope">
                    <span v-html="getLabelLastUpdate (scope.row.lastUpdate, scope.row.seen, scope.row.confirmed)"></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
        </div>
        <div>
          <div class="activities-detail-segment__content--title">
            <p class="style-title-list">{{$t('page.activitiesDetail.confirm_content')}}</p>
          </div>
          <div>
              <promotion-confirm
                :targetSN="Number(dataActivities.targetSn)"
                :content="dataActivities"
                v-if="dataActivities.type === 1"
              />
              <product-confirm
                :targetSN="Number(dataActivities.targetSn)"
                v-if="dataActivities.type === 3"
              />
              <invite-friend-confirm
                :targetSN="Number(dataActivities.targetSn)"
                v-if="dataActivities.type === 2"
              />
              <booking-transfer
                :targetSN="Number(dataActivities.targetSn)"
                v-if="dataActivities.type === 4"
              />
          </div>
        </div>
      </div>
      <div v-else>
          <div class="card m-b-30" style="text-align: center;padding: 20px;">
              <h2><i class="el-icon-loading" /></h2>
              <h2> loading ...</h2>
          </div>
      </div>
      <div v-if="!isLoading" class="activities-detail-segment__button">
          <div class="activities-detail-segment__button--content">
            <el-button
              v-if="dataActivities.allowConfirm == true && dataActivities.status == 1"
              type="success" size="large"
              @click="onConfirmActivities"
            >
                <i class="feather icon-check"></i>
                {{$t('page.activitiesDetail.confirmed')}}
            </el-button>
            <el-button
              v-if="dataActivities.allowConfirm == true && dataActivities.status == 1"
              type="danger" size="large"
              @click="onWithdrawActivities"
            >
              <i class="feather icon-x" />
              {{$t('page.activitiesDetail.withdrawn')}}
            </el-button>
            <el-button type="info" size="large" @click="$router.go(-1)">
              <i class="feather icon-rotate-ccw" />
              {{$t('page.activitiesDetail.back')}}
            </el-button>
          </div>
      </div>
    </div>
  </div>
</sa-section>
</template>

<script>
import {
  getActivitiDetail, postConfirmActivitiList,
  postWithdrawActivitiList,
  getPromotionActivitiDetail
} from './api'
import PromotionConfirm from './components/PromotionConfirm.vue'
import SaSection from '@/components/globals/SaSection'
import ProductConfirm from './components/ProductConfirm.vue'
import InviteFriendConfirm from './components/InviteFriendConfirm.vue'
import BookingTransfer from './components/BookingTransfer.vue'
export default {
  name: 'ActivitiesDetail',
  components: {
    PromotionConfirm,
    ProductConfirm,
    InviteFriendConfirm,
    BookingTransfer,
    SaSection
  },
  data () {
    return {
      isLoading: false,
      dataActivities: [],
      id: this.$route.params.id ? this.$route.params.id : '',
      confirm: '',
      totalItems: 0,
      filter: {
        size: this.totalItems,
        currentPage: 1
      },
      tableData: [],
      dataPromotion: []
    }
  },
  created () {
    this.getActivitiDetails(this.id)
  },
  methods: {
    async getActivitiDetails (id) {
      this.isLoading = true
      try {
        const data = await getActivitiDetail(id)
        this.dataActivities = data.data.data
        this.getPromotionContent(this.dataActivities.targetSn)
        if (this.dataActivities.deliveryActivityList && this.dataActivities.deliveryActivityList.length > 0) {
          this.tableData = this.dataActivities.deliveryActivityList
          this.allConfirm = this.tableData[0].allConfirm
          this.totalItems = this.dataActivities.deliveryActivityList.length
        } else {
          this.tableData = [null]
          this.totalItems = this.dataActivities.deliveryActivityList.length
        }
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    }, // getActivitiDetails

    onReloadTable (filter, isSearchClick) {
      this.loading = true
      if (!isSearchClick) {
        this.filter.size = filter.size
        this.filter.currentPage = filter.currentPage
      } else {
        this.filter.currentPage = 1
      }
      this.getActivitiDetails(this.id, this.filter)
    }, // onReloadTable

    getActivitiesDetailType (type) {
      switch (type) {
        case 1:
          return this.$t('page.activities.promotion')
        case 2:
          return this.$t('page.activities.invite_friend')
        case 3:
          return this.$t('page.activities.product')
        case 4:
          return this.$t('page.activities.transfer_booking')
      }
    }, // getActivitiesDetailType

    getActivitiesDetailStatus (status) {
      switch (status) {
        case 1:
          return this.$t('page.activities.waiting')
        case 2:
          return this.$t('page.activities.confirmed')
        default:
          return this.$t('page.activities.withdrawn')
      }
    }, // getActivitiesDetailStatus

    async onConfirmActivities () {
      const id = this.dataActivities.sn
      this.$confirm(`${this.$t('page.activities.confirm_message_alert')}`, `${this.$t('page.activities.confirmed')}`, {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        this.loading = true
        try {
          await postConfirmActivitiList(id)
          this.$message({
            type: 'success',
            message: `${this.$t('page.activities.confirm_success')}`
          })
          this.$router.go(-1)
        } catch (error) {
          return false
        } finally {
          this.isLoading = false
        }
      }).catch(error => {
        this.loading = false
        this.$message({
          type: 'error',
          message: error.response ? error.response.data.message : error
        })
      })
    }, // onConfirmActivities

    async onWithdrawActivities () {
      const id = this.dataActivities.sn
      this.$confirm(`${this.$t('page.activities.withdrawn_message_alert')}`, `${this.$t('page.activities.withdrawn')}`, {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        this.loading = true
        try {
          await postWithdrawActivitiList(id)
          this.$message({
            type: 'success',
            message: `${this.$t('page.activities.withdrawn_success')}`
          })
          this.$router.go(-1)
        } catch (error) {
          return false
        } finally {
          this.isLoading = false
        }
      }).catch(error => {
        this.isLoading = false
        this.$message({
          type: 'error',
          message: error.response ? error.response.data.message : error
        })
      })
    }, // onWithdrawActivities

    getLabelLastUpdate (lastUpdate, seen, confirmed) {
      if (!lastUpdate) {
        return ''
      } else if (seen === 1 && confirmed === 0) {
        return `<i class="el-icon-view"></i><span> ${this.formatDate(lastUpdate)} </span>`
      } else if (seen === 1 && confirmed === 1) {
        return `✓ <span> ${this.formatDate(lastUpdate)} </span>`
      }
    },
    async getPromotionContent (id) {
      this.isLoading = true
      try {
        const { data } = await getPromotionActivitiDetail(id)
        this.dataPromotion = data.data
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    } // getPromotionContent

  }
}
</script>
<style lang="scss" scoped>
.activities-detail-segment{
    min-height: calc(100vh - 150px );
    background-color: #ffffff;
    &__content {
        border: none;
        border-radius: 3px;
        padding: 0 16px;
        &--line{
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            border-bottom: 1px solid rgba(0, 0, 0, 0.125);
            @media (min-width: 640px) {
                grid-template-columns: 1fr 1fr;
            }
            @media (min-width: 800px) {
                grid-template-columns: 1fr 1fr 1fr 1fr;
            }
            justify-content: center;
            align-items: center;
            text-align: left;
            .is-danger{
                padding: 5px 0;
                width: 100%;
                color: red;
            }
            .activities-detail-title{
                margin: 5px 0;
            }
            .activities-detail-content{
                margin: 5px 0;
                &__input-select{
                    width: 100%;
                }
                .style-color-link{
                  color: #ff6400;
                }
            }
            .style-flex{
              display: flex;
            }
        }
        &--input{
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            padding: 5px 0;
        }
        &--title{
          width: 100%;
          display: grid;
          grid-template-columns: 1fr;
          padding: 5px 0;
          .style-title-list{
            color: #409eff;
            font-weight: bold;
            border-top: 1px solid #8a98ac;
            border-bottom: 1px solid #8a98ac;
            padding: 15px 0;
          }
          .activities-detail-table-user{
            background-color: #5db2ff;
            padding: 10px;
            font-weight: bold;
            color: black;
            float:left;
            display: grid;
            grid-template-columns: 1fr 1fr;
            &__confirm{
              p{
                float: right;
              }
            }
          }
        }
    }
    &__button{
        padding: 15px;
        &--content{
            display: flex;
            justify-content: flex-end;
        }
    }
    .style-color-red{
        color: red;
    }
    &__table {
        &--search{
            width: 100%;
            display: flex;
            padding: 8px;
        }
        &--direct{
            font-size: 16px;
            color: #409EFF;
            cursor: pointer;
            &:hover{
                text-transform: scale(1.12);
                color: #0a83ff;
            }
        }
    }
}
</style>
