<template>
  <sa-section
    v-loading="loading"
  >
    <div v-if="user && user.appUser" class="reply">
      <el-row>
        <el-col class="custom-col" :md="12" :sm="24">
          <el-row>
            <el-col :span="4">
              <p>{{ $t("page.replyCounselingMgt.nickname") }}</p>
            </el-col>
            <el-col :span="20">
              <el-input type="text" disabled="disabled" :value="user.appUser.nickName"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <p>{{ $t("page.replyCounselingMgt.user_id") }}</p>
            </el-col>
            <el-col :span="20">
              <el-input type="text" disabled="disabled" :value="user.appUser.email"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <p>{{ $t("page.replyCounselingMgt.birthday") }}</p>
            </el-col>
            <el-col :span="20">
              <el-input type="text" disabled="disabled" :value="user.appUser.birthday"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <p>{{ $t("page.replyCounselingMgt.email") }}</p>
            </el-col>
            <el-col :span="20">
              <el-input type="text" disabled="disabled" :value="user.appUser.email"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <p>{{ $t("page.replyCounselingMgt.login_by") }}</p>
            </el-col>
            <el-col :span="20">
              <el-input type="text" disabled="disabled" :value="loginBy"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <p>{{ $t("page.replyCounselingMgt.res_time") }}</p>
            </el-col>
            <el-col :span="20">
              <el-input type="text" disabled="disabled" :value="this.formatDate(user.createTime)"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <p>{{ $t("page.replyCounselingMgt.last_open_app") }}</p>
            </el-col>
            <el-col :span="20">
              <el-input type="text" disabled="disabled" :value="user.appUser.mobileDevice.address"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="custom-col" :md="12" :sm="24">
          <el-row>
            <el-col :span="4">
              <p>{{ $t("page.replyCounselingMgt.member_id") }}</p>
            </el-col>
            <el-col :span="20">
              <el-input type="text" disabled="disabled" :value="user.appUser.memberId"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <p>{{ $t("page.replyCounselingMgt.gender") }}</p>
            </el-col>
            <el-col :span="20">
              <el-input type="text" disabled="disabled" :value="gender"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <p>{{ $t("page.replyCounselingMgt.mobile") }}</p>
            </el-col>
            <el-col :span="20">
              <el-input type="text" disabled="disabled" :value="user.appUser.mobile"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <p>{{ $t("page.replyCounselingMgt.address") }}</p>
            </el-col>
            <el-col :span="20">
              <el-input type="text" disabled="disabled" :value="user.appUser.address"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <p>{{ $t("page.replyCounselingMgt.last_update") }}</p>
            </el-col>
            <el-col :span="20">
              <el-input type="text" disabled="disabled" :value="this.formatDate(user.lastUpdate)"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <p>{{ $t("page.replyCounselingMgt.device_code") }}</p>
            </el-col>
            <el-col :span="20">
              <el-input type="text" disabled="disabled" :value="deviceCode"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <p>{{ $t("page.replyCounselingMgt.status") }}</p>
            </el-col>
            <el-col :span="20">
              <el-input type="text" disabled="disabled" :value="status"></el-input>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <div>
        <h2 class="text-Q-A" >{{ $t('page.replyCounselingMgt.content')}}</h2>
        <div tyle="display: block;" >
          <div
            class="scroll-replay"
            ref="replyBlock"
          >
            <div
              v-for="(counseling,index) in counselings.counselingDetails"
              :key="index"
            >
              <div class="content-box"  v-if="counseling.replyStaff.sn == null">
                <p class="content">{{ counseling.content }}</p>
                <p class="create-time">
                  <span class="bold">{{counseling.appUser ? counseling.appUser.nickName : ' '}}</span>
                  {{formatDate(counseling.lastUpdate)}}
                </p>
              </div>
              <div
                v-if="counseling.replyStaff.sn !== null"
                class="reply-box"
                style="margin-left: 50%"
              >
                <p class="content">{{ counseling.content}}</p>
                <p class="create-time">
                  <span class="bold">{{counseling ? counseling.replyStaff.fullName : ' '}}</span>
                  {{formatDate(counseling.lastUpdate)}}
                </p>
              </div>
            </div>
          </div>
          <el-form
            class="reply-button"
            ref="replyForm"
            :rules="formRules"
            :model="reply"
          >
            <el-form-item
              prop="content"
            >
              <textarea rows="3" style="width: 100%;" v-model="reply.content"></textarea>
            </el-form-item>
            <el-form-item
              class="float-right"
            >
              <el-button  type="success" size="large" @click="onDone">
                  {{$t('button.done')}}
              </el-button>
              <el-button  type="primary" size="large" @click="onReply">
                  {{$t('button.reply')}}
              </el-button>
              <el-button  type="info" size="large" @click="$router.go(-1)">
                  {{$t('button.back')}}
              </el-button>
              </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div v-else>
        <div style="text-align: center;padding: 20px;">
          <p>{{$t('no_data')}}</p>
        </div>
    </div>
  </sa-section>
</template>
<script>
import saSection from '@/components/globals/SaSection.vue'
import { getCounseling, listQuestionAndAnswer, onReplyCounseling, onDoneCounseling } from './api'
import { repStatus } from '@/utils/const'

export default {
  name: 'UserMgt',
  components: {
    saSection
  },
  data (vm) {
    return {
      loading: true,
      user: {},
      counselings: [],
      reply: {
        content: ''
      },
      sn: this.$route.params.sn,
      formRules: {
        content: [
          { required: true, message: vm.$t('page.createCounselingMgt.requireContent'), trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    loginBy () {
      return this.user.appUser ? (this.user.appUser.viaApp === 1 ? 'Manual' : (this.user.appUser.viaApp === 2 ? 'Facebook' : (this.user.appUser.viaApp === 3 ? 'Google' : 'Apple'))) : ' '
    },
    gender () {
      return this.user.appUser ? this.user.appUser.gender === 1 ? this.$t('gender.male') : this.$t('gender.female') : ' '
    },
    deviceCode () {
      return this.user.appUser ? (this.user.appUser.mobileDevice.os === '1' ? 'IOS' : 'Android') + ' | ' + this.user.appUser.mobileDevice.appVersion + ' | ' + (this.user.appUser.mobileDevice.language === 3 ? 'Vietnamese' : (this.user.appUser.mobileDevice.language === 2 ? 'English' : 'Korean')) + ' | ' + this.user.appUser.mobileDevice.osVersion + ' | ' + this.user.appUser.mobileDevice.phoneModel + ' | ' + this.formatDate(this.user.appUser.mobileDevice.registerTime) : ' '
    },
    status () {
      return this.user.appUser ? this.user.appUser.isLogin === 1 ? this.$t('status.login') : this.$t('status.un_login') : ' '
    }
  },
  created () {
    this.getUser()
  },
  mounted () {
  },
  watch: {

  },
  methods: {
    async getCounselings () {
      try {
        const { data } = await listQuestionAndAnswer(this.sn)
        this.counselings = data.data
      } catch (error) {
        return false
      } finally {
        this.loading = false
      }
    },
    async getUser () {
      try {
        const { data } = await getCounseling(this.sn)
        this.user = data.data
        await this.getCounselings()
      } catch (error) {
        return false
      } finally {
        this.loading = false
      }
    },
    async onReply () {
      this.$refs.replyForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        try {
          const { data } = await onReplyCounseling(this.sn, { content: this.reply.content })
          if (data?.code === repStatus.sussess) {
            this.counselings.counselingDetails.push(data.data)
            this.reply.content = ''
            this.scrollToEnd()
            this.$message({
              type: 'success',
              message: `${this.$t('message.success')}`
            })
          }
        } catch (error) {
          return false
        }
      })
    },
    async onDone () {
      try {
        const dataJson = {
          title: this.user.title,
          readStatus: this.user.readStatus,
          scope: this.user.scope,
          status: this.user.status,
          appUserSn: this.user.appUser.sn,
          qaStatus: 2
        }
        const { data } = await onDoneCounseling(this.sn, dataJson)
        if (data?.code === repStatus.sussess) {
          this.$message({
            type: 'success',
            message: `${this.$t('message.success')}`
          })
          this.$router.push({ name: 'counselingMgt' })
        }
      } catch (error) {
        return false
      }
    },
    scrollToEnd () {
      var container = this.$el.querySelector('.scroll-replay')
      container.scrollTop = container.scrollHeight
    }
  }
}
</script>
<style lang="scss">
.content-box {
  display: inline-block;
  width: 47%;
  background-color: #d9edf7;
}
.text-Q-A {
  margin-bottom: 12px;
  font-weight: bold;
  @media (max-width: 667px) {
    bottom: 308px;
  }
}
.reply-button {
  width: 50%;
  float: right;
  @media (max-width: 667px){
    margin-right: 3px;
    width: 100%;
    float: none;
  }
}
.custom-col {
  padding: 0 !important;
}
.reply-box {
    display: inline-block;
    width: 47%;
    margin-bottom: 10px;
    background-color: #dff0d8;
}
.content {
  margin-bottom: 0;
  padding: 10px 23px;
}
.create-time {
  float: right;
  padding: 0 18px;
  font-size: 12px;
  margin-bottom: 10px;
  @media (max-width: 375px) {
    font-weight: bold;
    font-size: 9px;
  }
}
textarea {
    resize: none;
}
.scroll-replay {
  height: 290px;
  overflow: scroll;
  width: 100%;
  @media (max-width: 667px) {
    margin-top: 12px;
  }
}
p.content {
    text-align: left;
}
.scroll-replay::-webkit-scrollbar {
  -webkit-appearance: none !important;
  height: 6px;
  width: 8px;
}
.scroll-replay::-webkit-scrollbar-thumb {
  border-radius:  10px;
  background-color: rgba(0, 0, 0, .5);
  box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}
.form-background {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  width: 4px;
  cursor: not-allowed;
}
</style>
