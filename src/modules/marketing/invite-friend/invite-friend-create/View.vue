<template>
  <sa-section class="invite-friend">
    <el-form :model="form" :rules="rules" ref="form">
      <div class="invite-friend__form">
        <el-form-item :label="$t('page.inviteFriend.title')" prop="title" required>
          <el-input :placeholder="$t('page.inviteFriend.title')" v-model="form.title" type="text"></el-input>
        </el-form-item>
      </div>
      <div class="invite-friend__form">
        <el-form-item :label="$t('page.inviteFriend.startEndDate')" prop="startDate" required>
          <div class="invite-friend__row">
            <div class="invite-friend__row--margin">
              <el-form-item>
                <el-date-picker type="date" :placeholder="$t('page.inviteFriend.startDate')" v-model="form.startDate"></el-date-picker>
              </el-form-item>
            </div>
            <div class="invite-friend__row--margin">
              <el-form-item>
                <el-date-picker type="date" :placeholder="$t('page.inviteFriend.endDate')" v-model="form.endDate"></el-date-picker>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
      </div>
      <div class="invite-friend__form">
        <el-form-item :label="$t('page.inviteFriend.inviteeInviter')" required>
          <div class="invite-friend__row">
            <div class="invite-friend__row--margin">
            <el-form-item>
              <el-select
              v-model="form.inviteeAmount"
              >
                <el-option
                    v-for="item in inviteeInviterOptions"
                  :key="item.value"
                  :label="item.key"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            </div>
            <div class="invite-friend__row--margin">
            <el-form-item>
              <el-select
              v-model="form.inviterAmount"
              >
                <el-option
                    v-for="item in inviteeInviterOptions"
                  :key="item.value"
                  :label="item.key"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            </div>
          </div>
        </el-form-item>
      </div>
      <div class="invite-friend__form">
        <el-form-item :label="$t('page.inviteFriend.dailyBudget')">
          <el-currency-input
            :min="0"
            :fixed="0"
            v-model="form.dailyBudget"
            clearable
          >
            <i slot="append">VND</i>
          </el-currency-input>
        </el-form-item>
      </div>
      <div class="invite-friend__form">
        <el-form-item :label="$t('page.inviteFriend.typeOfInvitation')">
          <div class="invite-friend__row">
            <div class="invite-friend__row--margin">
            <el-form-item>
              <el-select
              v-model="form.typeApply"
              >
                <el-option
                    v-for="item in typesOptions"
                  :key="item.value"
                  :label="item.key"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            </div>
          </div>
        </el-form-item>
      </div>
      <div class="invite-friend__form">
        <el-form-item :label="$t('page.inviteFriend.createBy')" required>
          <div class="block">
            <el-checkbox :true-label="1" :false-label="0" v-model="form.manual">Manual</el-checkbox>
            <el-checkbox :true-label="1" :false-label="0" v-model="form.facebook">Facebook</el-checkbox>
            <el-checkbox :true-label="1" :false-label="0" v-model="form.google">Google</el-checkbox>
            <el-checkbox :true-label="1" :false-label="0" v-model="form.apple">Apple</el-checkbox>
          </div>
        </el-form-item>
      </div>
      <div class="invite-friend__form">
        <el-form-item :label="$t('page.inviteFriend.via')" required>
          <el-checkbox :true-label="1" :false-label="0" v-model="form.link">Link</el-checkbox>
        </el-form-item>
      </div>
      <div class="invite-friend__form">
        <el-form-item :label="$t('page.inviteFriend.guidelinesVn')" prop="guideline" required>
          <div class="invite-friend__content">
            <tinymce v-model="form.guideline" :height="300" />
          </div>
        </el-form-item>
      </div>
      <div class="invite-friend__form">
        <el-form-item :label="$t('page.inviteFriend.guidelinesEn')" prop="guidelineEn" required>
          <div class="invite-friend__content">
            <tinymce v-model="form.guidelineEn" :height="300" />
          </div>
        </el-form-item>
      </div>
      <div class="invite-friend__form">
        <el-form-item :label="$t('page.inviteFriend.SMSContent')">
          <el-input
            type="textarea"
            :rows="5"
            :placeholder="$t('page.inviteFriend.SMSContent')"
            v-model="form.memo">
          </el-input>
        </el-form-item>
      </div>
      <div class="invite-friend__button">
        <el-button type="info" size="large" @click="$router.go(-1)">
          {{ $t('button.back')}}
        </el-button>
        <el-button type="success" :loading="ui.isSubmiting" size="large" @click="preHandleBeforeSubmit">
          {{ $t('button.create')}}
        </el-button>
      </div>
    </el-form>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { createInviteFriend } from './api'
import Tinymce from '@/components/globals/Tinymce/index.vue'
import ElCurrencyInput from '@/components/globals/elCurrencyInput'
import { scrollToTop } from '@/utils/helpers'

export default {
  name: 'InviteFriendCreate',
  components: {
    SaSection,
    Tinymce,
    ElCurrencyInput
  },
  data () {
    return {
      form: {
        apple: 1,
        budgetSpent: 0,
        dailyBudget: 0,
        endDate: new Date(),
        facebook: 1,
        google: 1,
        guideline: '',
        guidelineEn: '',
        inviteeAmount: 10000,
        inviterAmount: 10000,
        link: 1,
        manual: 1,
        memo: '',
        startDate: new Date(),
        title: '',
        typeApply: 0
      },
      rules: {
        title: [
          { required: true, message: this.$t('page.inviteFriend.requiredTitle'), trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: this.$t('page.inviteFriend.requiredStartDate'), trigger: 'blur' }
        ],
        endDate: [
          { required: true, message: this.$t('page.inviteFriend.requiredEndDate'), trigger: 'blur' }
        ],
        guideline: [
          { required: true, message: this.$t('page.inviteFriend.requiredGuidelinesVn'), trigger: 'blur' }
        ],
        guidelineEn: [
          { required: true, message: this.$t('page.inviteFriend.requiredGuidelinesEn'), trigger: 'blur' }
        ]
      },
      ui: {
        isSubmiting: false
      },
      hotels: [],
      typesOptions: [
        { value: 0, key: 'Signed Up' },
        { value: 1, key: 'Checked-in' }
      ],
      inviteeInviterOptions: [
        { value: 0, key: '0' },
        { value: 10000, key: '10000' },
        { value: 20000, key: '20000' },
        { value: 30000, key: '30000' },
        { value: 50000, key: '50000' },
        { value: 100000, key: '100000' },
        { value: 200000, key: '200000' },
        { value: 300000, key: '300000' },
        { value: 500000, key: '500000' }
      ]
    }
  },
  methods: {
    preHandleBeforeSubmit () {
      this.form.startDate = this.formatDate(this.form.startDate, false)
      this.form.endDate = this.formatDate(this.form.endDate, false)
      this.$refs.form.validate((valid) => {
        if (!valid) {
          scrollToTop('.el-form-item__error')
          return false
        }
        this.submit()
      })
    },
    async submit () {
      this.ui.isSubmiting = true
      try {
        const formData = Object.keys(this.form).reduce((formData, key) => {
          formData.append(key, this.form[key])
          return formData
        }, new FormData())

        const { data } = await createInviteFriend(formData)
        if (data.code === 1) {
          const message = this.$t('message.createSuccess')
          this.$message({
            type: 'success',
            message: message
          })
          this.$router.push({ name: 'inviteFriendDetails', params: { sn: data.data.sn } })
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isSubmiting = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .invite-friend {
    :deep(.invite-friend__form) {
      margin: 1em 0;
      .el-form-item {
        display: unset;
        margin-bottom: 1em;
        @media (min-width: 640px) {
          display: flex;
          flex-wrap: wrap;
        }
      }
      .el-form-item__label {
        text-align: left;
        @media (min-width: 640px) {
          flex: 1;
        }
      }
      .el-form-item__content {
        @media (min-width: 640px) {
          flex: 3;
        }
      }
      .el-form-item__error {
        margin-top: 0.5em;
        position: unset;
      }
      .datetime {
        width: 100%;
        @media (min-width: 640px) {
          width: 16em;
        }
      }
    }
    &__row {
      @media (min-width: 640px) {
        display: flex;
        align-items: center;
        gap: 0 2em;
        flex-wrap: wrap;
      }
      &--margin {
        margin: 1em 0;
        @media (min-width: 640px) {
          margin: unset;
        }
      }
    }
    &__content {
      clear: both;
    }
    &__button {
      z-index: 100;
      display: flex;
      justify-content: flex-end;

      position: fixed;
      bottom: 0;
      right: 0;
      background: white;
      width: 100%;
      padding-bottom: 1em;
      padding-right: 1em;

      button {
        margin-top: 1em;
      }
    }
    .block {
      display: inline-block;
    }
  }
  :deep(.select-check) {
    button {
      width: 100%;
      @media (min-width: 640px) {
        width: 16em;
      }
    }
  }
  @media (max-width: 640px) {
    .el-date-editor, .el-select {
      width: 100%;
    }
  }
</style>
