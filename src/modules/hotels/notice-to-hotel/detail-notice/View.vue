<template>
<sa-section>
    <div class="notice-detail-segment" v-loading="ui.isLoadingNoticeDetail">
        <div class="notice-detail-segment__content">
          <!-- Start Contentbar-->
          <div class="notice-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.noticeDetail.message_type')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ getLabelTypeNotice(dataDetailNotice.type) }}</p>
            </div>
          </div>
          <div class="notice-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.noticeDetail.allow_to_reply')}}</p>
            </div>
            <div class="product-detail-content">
                <p v-if="dataDetailNotice.answer === 1">{{ $t('page.noticeDetail.answer1')}}</p>
                <p v-else>{{ $t('page.noticeDetail.answer0') }}</p>
            </div>
          </div>
          <div class="notice-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.noticeDetail.create_staff')}}</p>
            </div>
            <div class="product-detail-content">
                <span>{{ dataDetailNotice.staffName }}</span>
            </div>
          </div>

          <div class="notice-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.noticeDetail.create_time')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ formatDate(dataDetailNotice.createTime) }}</p>
            </div>
          </div>
          <div class="notice-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.noticeDetail.last_update')}}</p>
            </div>
            <div class="product-detail-content">
                <span>{{ formatDate(dataDetailNotice.lastUpdate) }}</span>
            </div>
          </div>
          <div class="notice-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.noticeDetail.topic')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ dataDetailNotice.title }}</p>
            </div>
          </div>
          <div class="notice-detail-segment__content--line">
            <div class="product-detail-title">
                <p>{{ $t('page.noticeDetail.brief_detail')}}</p>
            </div>
            <div class="product-detail-content">
                <p>{{ dataDetailNotice.shortContent }}</p>
            </div>
          </div>
          <div class="notice-detail-segment__content--line-end">
            <div class="product-detail-title">
                <p>{{ $t('page.noticeDetail.detail')}}</p>
            </div>
            <div class="product-detail-content">
                <p v-html="dataDetailNotice.content"></p>
            </div>
          </div>
          <!-- Etart Contentbar-->
        </div>
        <div class="notice-detail-segment__button">
          <el-button type="info" size="large" @click="$router.go(-1)">
              {{ $t('button.back')}}
          </el-button>
        </div>
    </div>
</sa-section>
</template>

<script>
import { getNoticeDetail } from './api'
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

      }

    }
  },
  async created () {
    await this.getDataNoticeDetail()
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
}
</style>
