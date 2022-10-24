<template>
<sa-section>
    <div class="notice-to-hotel-edit-segment" v-loading="ui.isLoadingNoticeToHotelCreate">
      <!-- Start Contentbar-->
      <el-form ref="dataEditNoticeToHotel"
      :model="dataEditNoticeToHotel"
      hide-required-asterisk
      :rules="rules"
      label-position="left"
      label-width="25%"
      class="notice-to-hotel-edit-segment__form">
          <el-form-item :label="$t('page.noticeDetail.message_type')" prop="type">
              <el-select v-model="dataEditNoticeToHotel.type" placeholder="Select">
                <el-option
                  v-for="item in ui.typeNoticeToHotel"
                  :key="item.value"
                  :label="$t(item.key)"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item :label="$t('page.noticeDetail.allow_to_reply')" >
              <el-checkbox :true-label="trueCheck" :false-label="falseCheck" v-model="dataEditNoticeToHotel.answer"></el-checkbox>
          </el-form-item>
          <el-form-item :label="$t('page.noticeDetail.apply_for_hotel')" prop="hotelList">
              <template>
                <p >
                  <span class="style-padding-text">{{ getLabelApplyHotel(dataEditNoticeToHotel.applyTarget) }}</span>
                  <span v-if="applyTarget == 4 && dataEditNoticeToHotel.totalHotel"> ({{ totalHotelApply }}) </span>
                  <router-link :to="{ name: 'create_apply_for_hotel', query: { applyTarget: applyTarget,faqInformationSn: dataEditNoticeToHotel.sn,layoutType: 2 }}">
                    <span>{{ $t('page.noticeDetail.hotel_list') }}</span>
                  </router-link>
                </p>
              </template>
          </el-form-item>
          <el-form-item :label="$t('page.noticeDetail.topic')" prop="title">
              <el-input
              v-model="dataEditNoticeToHotel.title"
              :placeholder="$t('page.noticeDetail.topic')" ></el-input>
          </el-form-item>
          <el-form-item :label="$t('page.noticeDetail.brief_detail')">
              <el-input
              type="textarea"
              :rows="3"
              :placeholder="$t('page.noticeDetail.brief_detail')"
              v-model="dataEditNoticeToHotel.shortContent" ></el-input>
          </el-form-item>
          <el-form-item :label="$t('page.noticeDetail.detail')">
              <Tinymce v-model="dataEditNoticeToHotel.content" />
          </el-form-item>

          <el-form-item style="text-align: right;">
              <el-button type="info" size="large" @click="$router.go(-1)">
                  {{$t('button.back')}}
              </el-button>
              <el-button type="success" size="large" @click="updateNoticeToHotel('dataEditNoticeToHotel')">
                  <i class="feather icon-save mr-2" />
                  {{$t('button.edit')}}
              </el-button>
          </el-form-item>
      </el-form>
      <!-- Etart Contentbar-->
    </div>
</sa-section>
</template>

<script>
import {
  getNoticeToHotelById,
  updateNoticeToHotelById,
  resetApplyingHotelFaq,
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
      dataEditNoticeToHotel: {
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
      additionalData: {},
      id: 0
    }
  },
  async created () {
    this.ui.isLoadingNoticeToHotelCreate = false
    await this.getDataNoticeToHotel()

    this.onLoadListHotel()
  },
  computed: {
    totalHotelApply () {
      return this.dataEditNoticeToHotel.totalHotel
    }
  },
  methods: {
    async getDataNoticeToHotel () {
      const id = this.$route.params.id
      this.ui.isLoadingNoticeToHotelCreate = true
      try {
        const {
          data
        } = await getNoticeToHotelById(id)
        this.dataEditNoticeToHotel = data.data
        this.applyTarget = this.$route.query.applyTarget ? this.$route.query.applyTarget : this.dataEditNoticeToHotel.applyTarget
        this.id = this.dataEditNoticeToHotel.sn
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingNoticeToHotelCreate = false
      }
    },

    async updateNoticeToHotel () {
      this.$refs.dataEditNoticeToHotel.validate(async (valid) => {
        if (!valid) {
          return false
        }
        try {
          this.ui.isLoadingNoticeToHotelCreate = true
          try {
            await updateNoticeToHotelById(this.id, this.dataEditNoticeToHotel)
            this.$message({
              type: 'success',
              message: `${this.$t('message.updateSuccess')}`
            })
            this.$router.push({ name: 'send_notice_to_hotel', query: { applyTarget: this.applyTarget } })
          } catch (error) {
            return false
          } finally {
            this.ui.isLoadingNoticeToHotelCreate = false
          }
        } catch (error) {
          return false
        }
      })
    }, // updateNoticeToHotel

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
      try {
        const {
          data
        } = await loadApplyingHotelFaq(this.id)
        const dataRes = data.data
        this.applyTarget =
          this.$route.query.applyTarget
            ? this.$route.query.applyTarget
            : this.dataEditNoticeToHotel.applyTarget

        this.dataEditNoticeToHotel.totalHotel = dataRes.meta.total
        this.dataEditNoticeToHotel.hotelList = []
        dataRes.hotels.forEach((obj, index) => {
          this.dataEditNoticeToHotel.hotelList.push(obj.sn)
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
.notice-to-hotel-edit-segment:deep {
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
.notice-to-hotel-edit-segment {
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
