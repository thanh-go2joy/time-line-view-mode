<template>
<sa-section>
    <div class="notice-to-hotel-create-segment"  v-loading="ui.isLoadingNoticeToHotelCreate">
      <!-- Start Contentbar-->
      <el-form ref="dataCreatelNoticeToHotel"
      :model="dataCreatelNoticeToHotel"
      hide-required-asterisk
      :rules="rules"
      label-position="left"
      label-width="25%"
      class="notice-to-hotel-create-segment__form">
          <el-form-item :label="$t('page.detail-reply.message_type')" prop="type">
              <el-select v-model="dataCreatelNoticeToHotel.type" placeholder="Select">
                <el-option
                  v-for="item in ui.typeNoticeToHotel"
                  :key="item.value"
                  :label="$t(item.key)"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item :label="$t('page.detail-reply.allow_to_reply')" >
              <el-checkbox :true-label="trueCheck" :false-label="falseCheck" v-model="dataCreatelNoticeToHotel.answer"></el-checkbox>
          </el-form-item>
          <el-form-item :label="$t('page.detail-reply.apply_for_hotel')" prop="hotelList">
              <template>
                <p>
                  <span class="style-padding-text" v-if="applyTarget">{{ getLabelApplyHotel(applyHotelString,applyTarget) }}</span>
                  <span v-if="applyTarget === 4"> ({{ totalHotel }}) </span>
                  <router-link :to="{ name: 'create_apply_for_hotel', query: { applyTarget: applyTarget !== 0 ? applyTarget : 1,layoutType: 1 }}">
                    <span>{{ $t('page.detail-reply.hotel_list') }}</span>
                  </router-link>
                </p>
              </template>
          </el-form-item>
          <el-form-item :label="$t('page.detail-reply.topic')" prop="title">
              <el-input
              v-model="dataCreatelNoticeToHotel.title"
              :placeholder="$t('page.detail-reply.topic')" ></el-input>
          </el-form-item>
          <el-form-item :label="$t('page.detail-reply.brief_detail')">
              <el-input
              type="textarea"
              :rows="3"
              :placeholder="$t('page.detail-reply.brief_detail')"
              v-model="dataCreatelNoticeToHotel.shortContent" ></el-input>
          </el-form-item>
          <el-form-item :label="$t('page.detail-reply.detail')">
              <Tinymce v-model="dataCreatelNoticeToHotel.content" />
          </el-form-item>

          <el-form-item style="text-align: right;">
              <el-button type="info" size="large" @click="$router.go(-1)">
                  {{$t('button.back')}}
              </el-button>
              <el-button type="success" size="large" @click="addNoticeToHotel('dataCreatelNoticeToHotel')">
                  <i class="feather icon-save mr-2" />
                  {{$t('button.add')}}
              </el-button>
          </el-form-item>
      </el-form>
      <!-- Etart Contentbar-->
    </div>
</sa-section>
</template>

<script>
import {
  createNoticeToHotel,
  loadApplyingHotelFaq
} from './api'
import SaSection from '@/components/globals/SaSection'
import Tinymce from '@/components/globals/Tinymce'
export default {
  name: 'CreateHotelGroup',
  components: {
    SaSection, Tinymce
  },
  data: (vm) => {
    return {
      ui: {
        isLoadingNoticeToHotelCreate: true,
        typeNoticeToHotel: [
          { key: 'option.noticeType.function', value: 1 },
          { key: 'option.noticeType.promotion', value: 2 },
          { key: 'option.noticeType.term_policy', value: 3 },
          { key: 'option.noticeType.notification', value: 4 },
          { key: 'option.noticeType.notice_of_no_show', value: 5 },
          { key: 'option.noticeType.notice_of_Checked_in_l', value: 6 }
        ]
      },
      dataCreatelNoticeToHotel: {
        hotelScope: 1,
        hotelList: [],
        type: 1,
        answer: 0,
        content: '',
        shortContent: '',
        title: ''
      },
      totalHotel: '',
      file: '',
      imageUrl: '',
      rules: {
        type: [{ required: true, message: vm.$t('page.noticeDetail.requiredType'), trigger: 'change' }],
        hotelList: [{ required: true, message: vm.$t('page.noticeDetail.requiredHotelList'), trigger: 'blur' }],
        title: [{ required: true, message: vm.$t('page.noticeDetail.requiredTitle'), trigger: 'blur' }]

      },
      dataRes: {},
      trueCheck: 1,
      falseCheck: 0,
      applyHotelString: true,
      applyTarget: 0,
      additionalData: {}
    }
  },
  created () {
    this.ui.isLoadingNoticeToHotelCreate = false
    this.applyTarget = this.$route.query && this.$route.query.applyTarget ? this.$route.query.applyTarget : 0
    // if (this.applyTarget !== 0) {
    this.onLoadListHotel()
    // }
  },
  methods: {
    async addNoticeToHotel () {
      this.$refs.dataCreatelNoticeToHotel.validate(async (valid) => {
        if (!valid) {
          return false
        }
        try {
          this.ui.isLoadingNoticeToHotelCreate = true

          try {
            const formData = new FormData()
            if (this.applyTarget === 1 || this.applyTarget === 2 || this.applyTarget === 3 || this.applyTarget === 4) {
              formData.append('hotelScope', Number(this.applyTarget))
            } else {
              formData.append('hotelScope', Number(1))
            }
            this.dataCreatelNoticeToHotel.hotelList.forEach((obj, index) => {
              formData.append(`hotelList[${index}]`, obj)
            })
            formData.append('type', this.dataCreatelNoticeToHotel.type)
            formData.append('answer', this.dataCreatelNoticeToHotel.answer)
            formData.append('content', this.dataCreatelNoticeToHotel.content)
            formData.append('shortContent', this.dataCreatelNoticeToHotel.shortContent)
            formData.append('title', this.dataCreatelNoticeToHotel.title)
            const { data } = await createNoticeToHotel(formData)
            this.$message({
              type: 'success',
              message: `${this.$t('message.createSuccess')}`
            })
            const id = data.data.sn
            this.$router.push({ name: 'send_notice_to_hotel', params: { id: id } })
          } catch (error) {
            return false
          } finally {
            this.ui.isLoadingNoticeToHotelCreate = false
          }
        } catch (error) {
          return false
        }
      })
    }, // addNoticeToHotel

    getLabelApplyHotel (applyHotelString, applyTarget) {
      if (!applyHotelString || !applyTarget) {
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

    async onLoadListHotel () {
      this.ui.isLoadingNoticeToHotelCreate = true
      try {
        const {
          data
        } = await loadApplyingHotelFaq()
        const dataRes = data.data
        this.applyTarget = dataRes.additionalData.applyTarget
        this.totalHotel = dataRes.meta.total
        if (this.totalHotel === 0) {
          this.applyTarget = 0
        }
        dataRes.hotels.forEach((obj, index) => {
          this.dataCreatelNoticeToHotel.hotelList.push(obj.sn)
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
.notice-to-hotel-create-segment:deep {
  display: block;
  .el-form-item__content[style] {
    @media (max-width: 480px) {
        margin-left: unset !important;
    }
  }
  .el-form-item__label {
    @media (max-width: 480px) {
      text-align: unset !important;
      width: 100% !important;
    }
  }

}
.notice-to-hotel-create-segment {
    min-height: calc(100vh - 220px);
    background-color: #ffffff;

    &__form {
      &--col{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        .form-row-center{
          padding : 0 15px;
        }
      }
      .style-padding-text{
        padding-right: 5px;
      }
      .el-select{
        width: 100%;
      }
    }

    &__button {
        padding: 15px;

        &--content {
            display: flex;
            justify-content: flex-end;
        }
    }

    .style-color-red {
        color: red;
    }
}
</style>
