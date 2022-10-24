<template>
<div v-if="dataInviteFriendDetail">
    <div class="invite-friend-activities-detail-segment__content--line">
        <div class="invite-friend-activities-detail-title">
            <p>{{ $t('page.activitiesInviteFriend.title')}}</p>
        </div>
        <div class="invite-friend-activities-detail-content">
            <p>{{ dataInviteFriendDetail.title }}</p>
        </div>
    </div>
    <div class="invite-friend-activities-detail-segment__content--line">
        <div class="invite-friend-activities-detail-title">
            <p>{{ $t('page.activitiesInviteFriend.type_of_invitation')}}</p>
        </div>
        <div class="invite-friend-activities-detail-content">
            <p>{{ getTypeApply(dataInviteFriendDetail.typeApply) }}</p>
        </div>
    </div>
    <div class="invite-friend-activities-detail-segment__content--line">
        <div class="invite-friend-activities-detail-title">
            <p>{{ $t('page.activitiesInviteFriend.status')}}</p>
        </div>
        <div class="invite-friend-activities-detail-content">
            <p>{{getStatus(dataInviteFriendDetail.status)}}</p>
        </div>
    </div>
    <div class="invite-friend-activities-detail-segment__content--line">
        <div class="invite-friend-activities-detail-title">
            <p>{{ $t('page.activitiesInviteFriend.start_end_date')}}</p>
        </div>
        <div class="invite-friend-activities-detail-content">
            <p>{{ formatDate(dataInviteFriendDetail.startDate) + ' ~ ' + formatDate(dataInviteFriendDetail.endDate) }}</p>
        </div>
    </div>
    <div class="invite-friend-activities-detail-segment__content--line">
        <div class="invite-friend-activities-detail-title">
            <p>{{ $t('page.activitiesInviteFriend.invitee_inviter')}}</p>
        </div>
        <div class="invite-friend-activities-detail-content">
            <p>{{new Number(dataInviteFriendDetail.inviteeAmout).toLocaleString('en-GB')+' / '+ new Number(dataInviteFriendDetail.inviterAmout).toLocaleString('en-GB')}}</p>
        </div>
    </div>
    <div class="invite-friend-activities-detail-segment__content--line">
        <div class="invite-friend-activities-detail-title">
            <p>{{ $t('page.activitiesInviteFriend.daily_budget')}}</p>
        </div>
        <div class="invite-friend-activities-detail-content">
            <p>{{new Number(dataInviteFriendDetail.dailyBugget).toLocaleString('en-GB')}} VND</p>
        </div>
    </div>
    <div class="invite-friend-activities-detail-segment__content--line">
        <div class="invite-friend-activities-detail-title">
            <p>{{ $t('page.activitiesInviteFriend.create_by')}}</p>
        </div>
        <div class="invite-friend-activities-detail-content">
            <p>{{getCreateBy([dataInviteFriendDetail.manual,dataInviteFriendDetail.facebook,dataInviteFriendDetail.google,dataInviteFriendDetail.apple])}}</p>
        </div>
    </div>
    <div class="invite-friend-activities-detail-segment__content--line">
        <div class="invite-friend-activities-detail-title">
            <p>{{ $t('page.activitiesInviteFriend.via')}}</p>
        </div>
        <div class="invite-friend-activities-detail-content">
            <p>{{dataInviteFriendDetail.link ? '✔ '+'Link' : `${this.$t('option.all')}`}}</p>
        </div>
    </div>
    <div class="invite-friend-activities-detail-segment__content--line">
        <div class="invite-friend-activities-detail-title">
            <p>{{ $t('page.activitiesInviteFriend.guidelines_vn')}}</p>
        </div>
        <div class="invite-friend-activities-detail-content">
            <p v-html="dataInviteFriendDetail.guideline"></p>
        </div>
    </div>
    <div class="invite-friend-activities-detail-segment__content--line">
        <div class="invite-friend-activities-detail-title">
            <p>{{ $t('page.activitiesInviteFriend.sms_content')}}</p>
        </div>
        <div class="invite-friend-activities-detail-content">
            <div v-html="dataInviteFriendDetail.memo"></div>
        </div>
    </div>
</div>

</template>

<script>
import {
  getInviteFriendActivitiDetail
} from '../api'
export default {
  name: 'InviteFriendConfirm',
  props: {
    targetSN: Number
  },

  data () {
    return {
      dataInviteFriendDetail: [],
      isLoading: true

    }
  },
  created () {
    this.getInviteFriendContent(this.idInviteFriend)
  },
  computed: {
    idInviteFriend () {
      return this.targetSN
    }
  },
  methods: {
    async getInviteFriendContent (id) {
      this.isLoading = true
      try {
        const data = await getInviteFriendActivitiDetail(id)
        this.dataInviteFriendDetail = data.data.data
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    }, // getPromotionContent

    getTypeApply (typeApply) {
      if (!typeApply && typeApply !== 0) {
        return ''
      }
      switch (typeApply) {
        case 0:
          return this.$t('page.activitiesInviteFriend.signup')
        case 1:
          return this.$t('page.activitiesInviteFriend.checkin')
        default:
          return ''
      }
    },

    getCreateBy (arr) {
      if (!arr) {
        return ''
      }
      let createByReturn = ''
      arr.forEach((value, index) => {
        if (!value) {
          return ''
        }
        switch (index) {
          case 0:
            value && (createByReturn = createByReturn + ' ✔ Manual ')
            break
          case 1:
            value && (createByReturn = createByReturn + ' ✔ Facebook ')
            break
          case 2:
            value && (createByReturn = createByReturn + ' ✔ Google ')
            break
          case 3:
            value && (createByReturn = createByReturn + ' ✔ Apple ')
            break
        }
      })
      return createByReturn
    },

    getStatus (status) {
      if (!status) {
        return ''
      }
      switch (status) {
        case 1:
          return this.$t('option.status.active')
        case 2:
          return this.$t('option.status.expired')
        case 3:
          return this.$t('option.status.temp')
        case 4:
          return this.$t('option.status.draft')
        case 5:
          return this.$t('option.status.wait_confirm')
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.invite-friend-activities-detail-segment {
    min-height: calc(100vh - 150px);
    background-color: #ffffff;

    &__content {
        border: none;
        border-radius: 3px;

        &--line {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;

            @media (min-width: 640px) {
                grid-template-columns: 1fr 3fr;
            }

            justify-content: center;
            align-items: center;
            text-align: left;

            .is-danger {
                padding: 5px 0;
                width: 100%;
                color: red;
            }

            .invite-friend-activities-detail-title {
                height: 100%;
                margin: 0 15px;

                p {
                    padding: 5px 15px;
                }
            }

            .invite-friend-activities-detail-content {
                margin: 5px 15px;

                &__input-select {
                    width: 100%;
                }
            }
        }
        &--input {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            padding: 5px 15px;
        }

        &--title {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            padding: 5px 15px;

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
