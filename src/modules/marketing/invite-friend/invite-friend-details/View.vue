<template>
    <div class="invite-friend">
      <sa-section
        v-loading="ui.isLoading"
      >
      <div class="invite-friend__info">
        <div class="card-item" v-for="(value, label, index) in ui.form" :key="index">
          <p class="card-item__label">
            {{ $t(`page.inviteFriend.${label}`) }}
          </p>
          <div v-if="label === 'guidelinesVn' || label === 'guidelinesEn' || label === 'memo'" class="card-item__value">
            <p v-html="value"></p>
          </div>
          <div v-else-if="label === 'status'" class="card-item__value">
            <p v-if="value === 1">{{ $t('option.status.active') }}</p>
            <p v-else-if="value === 2">{{ $t('option.status.expired') }}</p>
            <p v-else-if="value === 3">{{ $t('option.status.temp') }}</p>
            <p v-else-if="value === 4">{{ $t('option.status.draft') }}</p>
            <p v-else-if="value === 5">{{ $t('option.status.wait_confirm') }}</p>
          </div>
          <div v-else-if="label === 'createBy'" class="card-item__value card-item__flex">
            <p v-if="value.manual">✔ Manual</p>
            <p v-if="value.facebook">✔ Facebook</p>
            <p v-if="value.google">✔ Google</p>
            <p v-if="value.apple">✔ Apple</p>
          </div>
          <p v-else class="card-item__value">
            {{ value }}
          </p>
        </div>
      </div>
      <div class="invite-friend__button">
        <el-button
            @click="$router.go(-1)"
            icon="el-icon-refresh-left"
            type="info"
            plain
        >
            {{ $t('button.back') }}
        </el-button>
        <el-button
            @click="sendRequestActivity"
            icon="el-icon-position"
            type="primary"
            plain
            :loading="ui.isSubmiting"
        >
            {{ $t('button.sendRequest') }}
        </el-button>
      </div>
    </sa-section>
  </div>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { getInviteFriendDetails, sendRequestActivity } from './api'
export default {
  name: 'InviteFriendDetails',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        isLoading: false,
        isSubmiting: false,
        form: {}
      }
    }
  },
  created () {
    this.getInviteFriendDetails()
  },

  methods: {
    async getInviteFriendDetails () {
      this.ui.isLoading = true
      try {
        const { data } = await getInviteFriendDetails(this.$route.params.sn)
        this.ui.form = {
          title: data.data.title,
          typeOfInvitation: data.data.typeApply === 0 ? 'Signed Up' : 'Checked-in',
          status: data.data.status,
          startEndDate: `${this.formatDate(data.data.startDate, false)} ~ ${this.formatDate(data.data.endDate, false)}`,
          inviteeInviter: `${data.data.inviteeAmout} / ${data.data.inviterAmout}`,
          dailyBudget: data.data.dailyBugget ? `${this.formatMoney(data.data.dailyBugget)} VNĐ` : this.$t('page.inviteFriend.unlimited'),
          createBy: data.data,
          via: data.data.link ? '✔' : this.$t('option.all'),
          guidelinesVn: data.data.guideline,
          guidelinesEn: data.data.guidelineEn,
          SMSContent: data.data.memo
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    async sendRequestActivity () {
      this.ui.isSubmiting = true
      try {
        const params = {
          targetSn: this.$route.params.sn,
          type: 2
        }
        const { data } = await sendRequestActivity(params)
        if (data.code === 1) {
          this.$message({
            type: 'success',
            message: `${this.$t('message.sendSuccess')}`
          })
          this.$router.push({ name: 'inviteFriend' })
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
  .card-item {
    padding: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    display: flex;
    align-items: center;
    &__label {
      width: 30%;
      font-weight: 600;
    }
    &__value {
      width: 70%;
    }

    &__flex {
      display: flex;
      align-items: center;
      gap: 0.5em;
      flex-wrap: wrap;
    }

    @media (max-width: 640px) {
      display: block;
      &__label {
        width: 100%;
      }
      &__value {
        width: 100%;
      }
    }
  }

  .invite-friend {
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
  }
</style>
