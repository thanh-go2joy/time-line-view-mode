<template>
<div class="dashboard-block">
  <div class="profile-segment">
    <!-- Start Breadcrumbbar -->

    <!-- End Breadcrumbbar -->

    <!-- Start Contentbar-->
    <div class="profile-segment__content" v-if="!isLoading">
        <div>
            <div class="profile-segment__content--line">
                <div class="profile-title">
                    <p>{{ $t('page.profile.userID')}}</p>
                </div>
                <div class="profile-content" >
                    <el-input v-model="dataProfile.userId" disabled> user id</el-input>
                </div>
            </div>
            <div class="profile-segment__content--line">
                <div class="profile-title">
                    {{ $t('page.profile.full_name')}} <span class="style-color-red">(*)</span>
                </div>
                <div class="profile-content">
                    <el-input
                    :placeholder="$t('page.profile.full_name')"
                    type="text"
                    v-model="dataProfile.fullName"></el-input>
                </div>
            </div>
            <div class="profile-segment__content--line">
                <div class="profile-title">
                    {{ $t('page.profile.mobile')}} <span class="style-color-red">(*)</span>
                </div>
                <div class="profile-content">
                    <el-input
                    :placeholder="$t('page.profile.mobile')"
                    type="text"
                    v-model="dataProfile.mobile"></el-input>
                </div>
            </div>
            <div class="profile-segment__content--line">
                <div class="profile-title">
                    {{ $t('page.profile.address')}}
                </div>
                <div class="profile-content">
                    <el-input :placeholder="$t('page.profile.address')" type="text" v-model="dataProfile.address"></el-input>
                </div>
            </div>
            <div class="profile-segment__content--line">
                <div class="profile-title">
                    {{ $t('page.profile.email')}}
                </div>
                <div class="profile-content">
                    <el-input
                    :placeholder="$t('page.profile.email')"
                    type="text"
                    v-model="dataProfile.email"></el-input>
                </div>
            </div>
            <div class="profile-segment__content--line">
                <div class="profile-title">
                    {{ $t('page.profile.memo')}}
                </div>
                <div class="profile-content">
                    <el-input type="textarea" :rows="5" v-model="dataProfile.memo"></el-input>
                </div>
            </div>
            <div class="profile-segment__content--line">
                <div class="profile-title">
                    <p>{{ $t('page.profile.current_password')}}</p>
                </div>
                <div class="profile-content">
                    <el-input show-password autocomplete="new-password" :placeholder="$t('page.profile.current_password')" type="text" v-model="curPassword"></el-input>
                </div>
            </div>
            <div class="profile-segment__content--line">
                <div class="profile-title">
                    <p>{{ $t('page.profile.new_password')}}</p>
                </div>
                <div class="profile-content">
                    <el-input show-password autocomplete="new-password" :placeholder="$t('page.profile.new_password')" name="Confirm Password" type="text" v-model="newPassword"></el-input>
                    <!-- <div v-if="newPassword" class="is-danger" >
                        <span>{{ $t('page.profile.password_required') }}</span>
                    </div> -->
                </div>
            </div>
            <div class="profile-segment__content--line">
              <div class="profile-title">
                  <p>{{ $t('page.profile.confirm_new_password')}}</p>
              </div>
              <div class="profile-content">
                  <el-input show-password autocomplete="new-password" :placeholder="$t('page.profile.confirm_new_password')" name="Confirm Password" type="text" v-model="confirmPassword"></el-input>
                  <div v-if="passwordRequired" class="is-danger" >
                      <span>{{ $t('page.profile.password_required') }}</span>
                  </div>
              </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="card m-b-30" style="text-align: center;padding: 20px;">
            <h2><i class="el-icon-loading"></i></h2>
            <h2> loading ...</h2>
        </div>
    </div>
    <div v-if="!isLoading" class="profile-segment__button">
        <div class="profile-segment__button--content">
            <el-button type="info" icon="el-icon-refresh-left" size="large" @click="$router.go(-1)">
                {{$t('button.back')}}
            </el-button>
            <el-button type="success" icon="el-icon-edit" size="large" @click="updateProfileUser()">
                {{$t('button.edit')}}
            </el-button>
        </div>
    </div>
    <!-- Etart Contentbar-->

  </div>
</div>
</template>

<script>
import md5 from 'md5'
import { getProfile, updateProfile } from './api'
import EventBus from '@/plugins/eventBus'
import { repStatus } from '@/utils/const'

export default {
  name: 'EditStaffHotelMgt',
  components: {},
  data () {
    return {
      isLoading: false,
      dataProfile: [],
      optionListHotelName: [],
      isHotelGroup: false,
      getHotelName: 'hotel 123',
      curPassword: null,
      newPassword: null,
      confirmPassword: null,
      passwordRequired: false

    }
  },
  created () {
    this.getProfileUser()
  },
  methods: {
    async getProfileUser () {
      this.isLoading = true
      try {
        const data = await getProfile()
        this.dataProfile = data.data.data
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    }, // getProfile

    async updateProfileUser () {
      this.isLoading = true
      const params = {
        userId: this.dataProfile.userId,
        fullName: this.dataProfile.fullName,
        mobile: this.dataProfile.mobile,
        address: this.dataProfile.address,
        email: this.dataProfile.email,
        memo: this.dataProfile.memo,
        curPassword: this.curPassword !== null ? md5(this.curPassword).toString() : null,
        password: this.newPassword !== null ? md5(this.newPassword).toString() : null,
        confirmPassword: this.confirmPassword !== null ? md5(this.confirmPassword).toString() : null,
        // default value
        numOfRecord: 100
      }
      try {
        const { data } = await updateProfile(params)
        if (data?.code === repStatus.sussess) {
          const expiry = JSON.parse(localStorage.getItem('profile') || '{}')?.expiry
          const value = JSON.parse(localStorage.getItem('profile') || '{}')?.value
          value.fullName = this.dataProfile.fullName
          value.mobile = this.dataProfile.mobile
          value.gender = this.dataProfile.gender
          const item = {
            value: value,
            expiry: expiry
          }
          this.$message({
            type: 'success',
            message: this.$t('message.updateSuccess')
          })
          this.curPassword = ''
          this.newPassword = ''
          this.confirmPassword = ''
          localStorage.setItem('profile', JSON.stringify(item))
          EventBus.$emit('changeProfileInfo')
        }
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    } // updateProfile
  }
}
</script>
<style lang="scss" scoped>
.profile-segment{
    min-height: calc(100vh - 150px );
    background-color: #ffffff;
    &__content {
        border: none;
        border-radius: 3px;
        &--line{
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            @media (min-width: 640px) {
                grid-template-columns: 1fr 2fr;
            }
            justify-content: center;
            align-items: center;
            text-align: left;
            .is-danger{
                padding: 5px 0;
                width: 100%;
                color: red;
            }
            .profile-title{
                margin: 5px 15px;
            }
            .profile-content{
                margin: 5px 15px;
                &__input-select{
                    width: 100%;
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
}
</style>
