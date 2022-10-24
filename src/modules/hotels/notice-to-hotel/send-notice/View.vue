<template>
  <sa-section>
      <div class="send-notice-segment" v-loading="ui.isLoadingNoticeDetail">
          <div class="send-notice-segment__title">
            <p>Send Message</p>
          </div>
          <div class="send-notice-segment__content">
            <!-- Start Contentbar-->
            <div class="send-notice-segment__content--line">
              <div class="product-detail-title">
                  <p>{{ $t('page.sendNotice.inform_hotel_by')}}</p>
              </div>
              <div class="product-detail-content-check">
                  <el-checkbox @change="checkDisable" v-model="emailChecked" :label="$t('page.sendNotice.email')" border></el-checkbox>
                  <el-checkbox @change="checkDisable" v-model="partnerChecked" :label="$t('page.sendNotice.go2joy_partner_app')" border></el-checkbox>
              </div>
            </div>
            <div class="send-notice-segment__content--line">
              <div class="product-detail-title">
                  <p>{{ $t('page.sendNotice.message_type')}}</p>
              </div>
              <div class="product-detail-content">
                  <p>{{ getLabelTypeNotice(dataDetailNotice.type) }}</p>
              </div>
            </div>
            <div class="send-notice-segment__content--line">
              <div class="product-detail-title">
                  <p>{{ $t('page.sendNotice.allow_to_reply')}}</p>
              </div>
              <div class="product-detail-content">
                  <p v-if="dataDetailNotice.answer === 1">{{ $t('page.sendNotice.answer1')}}</p>
                  <p v-else>{{ $t('page.sendNotice.answer0') }}</p>
              </div>
            </div>
            <div class="send-notice-segment__content--line">
              <div class="product-detail-title">
                  <p>{{ $t('page.sendNotice.allow_to_reply')}}</p>
              </div>
              <div class="product-detail-content">
                <p>
                  <span class="style-padding-text">{{ getLabelApplyHotel(dataDetailNotice.applyTarget) }} </span>
                  <span v-if="applyTarget === 4">({{ dataDetailNotice.totalHotel }}) </span>
                  <router-link :to="{ name: 'list_apply_for_hotel', query: { limit: 10,id: dataDetailNotice.sn }}">
                    <span>{{ $t('page.sendNotice.list_hotel') }}</span>
                  </router-link>
                </p>
              </div>
            </div>

            <div class="send-notice-segment__content--line">
              <div class="product-detail-title">
                  <p>{{ $t('page.sendNotice.topic')}}</p>
              </div>
              <div class="product-detail-content">
                  <p>{{ dataDetailNotice.title }}</p>
              </div>
            </div>
            <div class="send-notice-segment__content--line">
              <div class="product-detail-title">
                  <p>{{ $t('page.sendNotice.brief_detail')}}</p>
              </div>
              <div class="product-detail-content">
                  <p>{{ dataDetailNotice.shortContent }}</p>
              </div>
            </div>
            <div class="send-notice-segment__content--line">
              <div class="product-detail-title">
                  <p>{{ $t('page.sendNotice.detail')}}</p>
              </div>
              <div class="product-detail-content">
                  <p v-html="dataDetailNotice.content"></p>
              </div>
            </div>
            <div class="send-notice-segment__content--line">
              <div class="product-detail-title">
                  <p>{{ $t('page.sendNotice.create_staff')}}</p>
              </div>
              <div class="product-detail-content">
                  <span>{{ dataDetailNotice.staffName }}</span>
              </div>
            </div>

            <div class="send-notice-segment__content--line">
              <div class="product-detail-title">
                  <p>{{ $t('page.sendNotice.create_time')}}</p>
              </div>
              <div class="product-detail-content">
                  <p>{{ formatDate(dataDetailNotice.createTime) }}</p>
              </div>
            </div>
            <div class="send-notice-segment__content--line-end">
              <div class="product-detail-title">
                  <p>{{ $t('page.sendNotice.last_update')}}</p>
              </div>
              <div class="product-detail-content">
                  <span>{{ formatDate(dataDetailNotice.lastUpdate) }}</span>
              </div>
            </div>
            <!-- Etart Contentbar-->
          </div>
          <div class="send-notice-segment__button">
            <el-button type="success" @click="onSendNotice" :disabled="checkDisplay" icon="el-icon-position" v-if="hasPermission('safaq', 'pModify')">
                {{ $t('button.send')}}
            </el-button>
            <el-button type="primary" @click="onDirectList" icon="el-icon-s-unfold" >
                {{ $t('button.list')}}
            </el-button>
          </div>
      </div>
  </sa-section>
</template>

<script>
import {
  getNoticeDetail,
  postSendMail,
  resetApplyingHotelFaq,
  loadApplyingHotelFaq
} from './api'
import SaSection from '@/components/globals/SaSection'
export default {
  name: 'SendNotice',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        isLoadingNoticeDetail: true
      },
      dataDetailNotice: {
      },
      applyTarget: Number(this.$route.query.applyTarget) ?? 0,
      emailChecked: true,
      partnerChecked: false,
      checkDisplay: false,
      hotelList: null
    }
  },
  async created () {
    await this.getDataNoticeDetail()
    this.onLoadListHotel()
  },
  methods: {
    getLabelTypeNotice (type) {
      if (!type) {
        return ''
      }
      switch (type) {
        case 1:
          return this.$t('option.noticeType.function')
        case 2:
          return this.$t('option.noticeType.promotion')
        case 3:
          return this.$t('option.noticeType.term_policy')
        case 4:
          return this.$t('option.noticeType.notification')
        case 5:
          return this.$t('option.noticeType.notice_of_no_show')
        case 6:
          return this.$t('option.noticeType.notice_of_Checked_in_l')
        default:
          return ''
      }
    },

    checkDisable () {
      if (this.partnerChecked === false && this.emailChecked === false) {
        this.checkDisplay = true
      } else {
        this.checkDisplay = false
      }
    },

    onDirectList () {
      this.$router.push('/hotel/sadmin/notice-to-hotel')
    },

    getLabelApplyHotel (applyTarget) {
      if (!applyTarget) {
        return ' '
      }
      switch (applyTarget) {
        case 1:
          return this.$t('option.applyHotelOption.all_hotel')
        case 2:
          return this.$t('option.applyHotelOption.all_contracted')
        case 3:
          return this.$t('option.applyHotelOption.all_trial')
        case 4:
          return this.$t('option.applyHotelOption.just_apply')
        default:
          return ''
      }
    },

    async getDataNoticeDetail () {
      this.ui.isLoadingNoticeDetail = true
      const id = this.$route.params.id
      try {
        const { data } = await getNoticeDetail(id)
        this.dataDetailNotice = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingNoticeDetail = false
      }
    }, // getDataNoticeDetail

    async onSendNotice () {
      const self = this
      const id = self.$route.params.id
      if (self.partnerChecked === true && self.emailChecked === false) {
        this.postMail()
        this.$router.push('/hotel/sadmin/notification-create' + `?targetType=5&targetSn=${id}`)
      } else if (self.partnerChecked === true && self.emailChecked === true) {
        this.postMail()
        this.$router.push('/hotel/sadmin/notification-create' + `?targetType=5&targetSn=${id}`)
      } else if (self.partnerChecked === false && self.emailChecked === true) {
        this.postMail()
        this.onDirectList()
      }
    },

    postMail () {
      this.ui.isLoadingNoticeDetail = true
      const formData = {
        hotelStatus: this.applyTarget,
        sendTo: this.hotelList
      }
      const id = this.$route.params.id
      try {
        const { data } = postSendMail(id, formData)
        this.dataRes = data
        this.$message({
          type: 'success',
          message: `${this.$t('page.noticeDetail.message_sent_success')}`
        })
        this.onResetListHotel()
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingNoticeDetail = false
      }
    },

    async onResetListHotel () {
      this.ui.isLoadingNoticeToHotelCreate = true
      try {
        const {
          data
        } = await resetApplyingHotelFaq()
        this.dataRes = data
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingNoticeToHotelCreate = false
      }
    },

    async onLoadListHotel () {
      this.ui.isLoadingNoticeToHotelCreate = true
      const id = this.$route.params.id
      try {
        const {
          data
        } = await loadApplyingHotelFaq(id)

        const dataRes = data.data
        this.applyTarget = dataRes.additionalData.applyTarget
        this.dataDetailNotice.totalHotel = dataRes.meta.total
        const listHotel = dataRes.hotels
        listHotel.map(function (currentValue, index, array) {
          this.hotelList = this.hotelList.push(currentValue.sn)
        })
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingNoticeToHotelCreate = false
      }
    }

  }
}
</script>
<style lang="scss" scoped>
.send-notice-segment {
    min-height: calc(100vh - 220px);
    background-color: #ffffff;
    &__title {
      background-color: #ff6400;
      line-height: 35px;
      p{
        color: #ffffff;
        padding-left: 15px;
        font-size: 16px;
      }
    }
    &__content {
        border: none;
        border-radius: 3px;
        &--line {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            padding: 16px 16px 16px 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.125);
            align-items: center;
            @media (min-width: 640px) {
                grid-template-columns: 2fr 3fr;
            }

            justify-content: center;
            align-items: center;
            text-align: left;

        }
        &--title {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            padding: 5px 0;

            .style-title-list {
                color: #409eff;
                font-weight: bold;
                border-top: 1px solid #8a98ac;
                border-bottom: 1px solid #8a98ac;
                padding: 15px 0;
            }
        }
        &--line-end {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            padding: 16px 16px 16px 0;
            align-items: center;
            @media (min-width: 640px) {
                grid-template-columns: 2fr 3fr;
            }

            justify-content: center;
            align-items: center;
            text-align: left;

        }
        &--title {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            padding: 5px 0;

            .style-title-list {
                color: #409eff;
                font-weight: bold;
                border-top: 1px solid #8a98ac;
                border-bottom: 1px solid #8a98ac;
                padding: 15px 0;
            }
        }
    }
    &__button {
        display: flex;;
        justify-content: flex-end;
    }
}
</style>
