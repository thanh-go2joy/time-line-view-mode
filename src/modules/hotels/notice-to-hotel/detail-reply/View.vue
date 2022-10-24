<template>
<sa-section>
    <div class="notice-detail-segment" v-loading="ui.isLoadingNoticeDetail">
        <div class="notice-detail-segment__content">
          <!-- Start Contentbar-->
          <div class="notice-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.detail-reply.message_type')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ getLabelTypeNotice(dataDetailNotice.type) }}</p>
            </div>
          </div>
          <div class="notice-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.detail-reply.allow_to_reply')}}</p>
            </div>
            <div class="product-detail-content">
                <p v-if="dataDetailNotice.answer === 1">{{ $t('page.detail-reply.answer1')}}</p>
                <p v-else>{{ $t('page.detail-reply.answer0') }}</p>
            </div>
          </div>
          <div class="notice-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.detail-reply.create_staff')}}</p>
            </div>
            <div class="product-detail-content">
                <span>{{ dataDetailNotice.staffName }}</span>
            </div>
          </div>

          <div class="notice-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.detail-reply.create_time')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ formatDate(dataDetailNotice.createTime) }}</p>
            </div>
          </div>
          <div class="notice-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.detail-reply.last_update')}}</p>
            </div>
            <div class="product-detail-content">
                <span>{{ formatDate(dataDetailNotice.lastUpdate) }}</span>
            </div>
          </div>
          <div class="notice-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.detail-reply.topic')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ dataDetailNotice.title }}</p>
            </div>
          </div>
          <div class="notice-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.detail-reply.brief_detail')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ dataDetailNotice.shortContent }}</p>
            </div>
          </div>
          <div class="notice-detail-segment__content--line-end">
            <div class="product-detail-title">
                <p>{{ $t('page.detail-reply.detail')}}</p>
            </div>
            <div class="product-detail-content">
                <p v-html="dataDetailNotice.content"></p>
            </div>
          </div>
          <!-- Etart Contentbar-->
        </div>
        <div class="notice-detail-segment__content-q-and-a">
          <div class="title">
            <span>
            {{ $t('page.detail-reply.content_qa')}}
            </span>
          </div>
          <div class="message-content">
            <div class="message-item" v-for=" (mess,index) in messageReplied" :key="index">
              <p class="content-message">{{mess.content}}</p><br>
              <span class="time-right">
                <b>{{ mess.replyName }}</b>
                {{ mess.lastUpdate }}
              </span>
            </div>
          </div>
          <div class="form-text">
            <div class="is-input">
              <el-input type="textarea" v-model="contentReply" rows="5" placeholder=""></el-input>
            </div>
            <div class="is-button">
              <el-button type="success" size="large" @click="onDoneNotice">
                  {{$t('button.done')}}
              </el-button>
              <el-button type="primary" size="large"  @click="onReplyNotice">
                  {{ $t('button.reply')}}
              </el-button>
            </div>
          </div>
        </div>
    </div>
</sa-section>
</template>

<script>
import { repStatus } from '@/utils/const'
import {
  getNoticeDetail,
  getContentReply,
  onReplyNotice,
  onDoneNotice
} from './api'
import SaSection from '@/components/globals/SaSection'
export default {
  name: 'DetailNotice',
  components: {
    SaSection
  },
  data: () => {
    return {
      ui: {
        isLoadingNoticeDetail: true
      },
      dataDetailNotice: {

      },
      contentReply: '',
      messageReplied: {},
      dataRes: null
    }
  },
  async created () {
    await this.getDataNoticeDetail()
    this.getContentReply()
  },
  methods: {
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
    async getContentReply () {
      this.ui.isLoadingNoticeDetail = true
      const faqHotelSn = this.$route.params.faqHotelSn
      try {
        const { data } = await getContentReply(faqHotelSn)
        this.messageReplied = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingNoticeDetail = false
      }
    },
    async onDoneNotice () {
      this.ui.isLoadingNoticeDetail = true
      const formData = {
        faqInformationSn: this.$route.params.id,
        faqHotelSn: this.$route.params.faqHotelSn,
        hotelSn: this.$route.params.hotelSn,
        content: 'done',
        finish: 0
      }
      try {
        const { data } = await onDoneNotice(formData)
        this.dataRes = data
        this.$message({
          type: 'success',
          message: `${this.$t('page.noticeDetail.message_sent_success')}`
        })
        this.$router.go(-1)
      } catch (error) {
        this.$message({
          type: 'success',
          message: `${this.$t('page.noticeDetail.message_sent_error')}`
        })
        return false
      } finally {
        this.ui.isLoadingNoticeDetail = false
      }
    },
    async onReplyNotice () {
      this.ui.isLoadingNoticeDetail = true
      const formData = {
        faqInformationSn: this.$route.params.id,
        faqHotelSn: this.$route.params.faqHotelSn,
        hotelSn: this.$route.params.hotelSn,
        content: this.contentReply,
        finish: 1
      }
      try {
        const { data } = await onReplyNotice(formData)
        if (data?.code === repStatus.sussess) {
          this.$message({
            type: 'success',
            message: `${this.$t('page.noticeDetail.message_reply_success')}`
          })
          this.contentReply = ''
        }
      } catch (error) {
        this.$message({
          type: 'success',
          message: `${this.$t('page.noticeDetail.message_sent_error')}`
        })
        return false
      } finally {
        this.getContentReply()
        this.ui.isLoadingNoticeDetail = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.notice-detail-segment {
    min-height: calc(100vh - 220px);
    background-color: #ffffff;
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
                grid-template-columns: 1fr 3fr;
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
                grid-template-columns: 1fr 3fr;
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
    &__content-q-and-a {
      width: 100%;
      .title {
          background-color: #ff6500;
          min-height: 40px;
          line-height: 40px;
          color: #fff;
          text-align: center;
          font-weight: bold;
          text-align: left;
          margin: 10px 0;
          span {
            padding-left: 10px;
          }
      }
      .message-item {
          width: 52%;
          float: left;
          border: 2px solid #dedede;
          background-color: #dff0d8;
          border-radius: 5px;
          padding: 25px;
          margin: 10px 0;
        .content-message {
          text-align: left;
        }
        .time-right {
          float: right;
          color: #aaa;
          b {
            font-weight: 700;
          }
        }
      }
      .form-text {
        width: 52%;
        .is-input {
          padding:10px 0;
        }
        .is-button {
          float: right;
        }
      }
    }
}
</style>
