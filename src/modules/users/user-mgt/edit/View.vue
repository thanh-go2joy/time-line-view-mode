<template>
  <sa-section>
    <el-form
      class="user-edit"
      label-width="150px"
      v-loading="ui.loading"
      label-position="left"
      :rules="formRules"
      ref="userEditForm"
      :model="userDetails"
      hide-required-asterisk
    >
      <el-form-item
        :label="$t('page.userMgt.user_id')"
      >
        <el-input disabled type="text" v-model="userDetails.email" />
      </el-form-item>
      <el-form-item
        :label="$t('page.userMgt.nickName')"
        prop="nickName"
      >
        <el-input
          type="text"
          v-model="userDetails.nickName"
        />
      </el-form-item>
      <el-form-item
        :label="$t('page.userMgt.gender')"
      >
        <el-radio-group v-model="userDetails.gender">
          <el-radio :label="0">{{ $t('page.userMgt.gender_none')}}</el-radio>
          <el-radio :label="1">{{ $t('page.userMgt.male')}}</el-radio>
          <el-radio :label="2">{{ $t('page.userMgt.female')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        :label="$t('page.userMgt.birthday')"
        prop="birthday"
      >
        <el-date-picker
          v-model="userDetails.birthday"
          type="date"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        :label="$t('page.userMgt.email')"
        prop="email"
      >
        <el-input type="text" :placeholder="$t('page.userMgt.email')" v-model="userDetails.email"></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('page.userMgt.mobile')"
        prop="mobile"
      >
        <el-input
          type="text"
          v-model="userDetails.countryCode"
          style="width:80px; margin-right: 6px;"
          class="countryCode"
          prefix-icon="el-icon-plus"
        >
        </el-input>
        <el-input
          type="text"
          :placeholder="$t('page.userMgt.mobile')"
          v-model="userDetails.mobile"
          style="width: 148px;"
          prop="address"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        prop="address"
        :label="$t('page.userMgt.address')"
      >
        <el-input type="text" :placeholder="$t('page.userMgt.address')" v-model="userDetails.address"></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('page.userMgt.password')"
      >
        <el-input type="password" :placeholder="$t('page.userMgt.password')" v-model="userDetails.password"></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('page.userMgt.re_password')"
        prop="re_password"
      >
        <el-input type="password" :placeholder="$t('page.userMgt.re_password')" style="height: 85%;" v-model="userDetails.re_password"></el-input>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="info" @click="$router.go(-1)">
          {{$t('page.userMgt.back')}}
        </el-button>
        <el-button type="success" @click="updateUser">
          <i class="feather icon-save mr-2" />
          {{$t('page.userMgt.save')}}
        </el-button>
      </el-form-item>
    </el-form>
  </sa-section>
</template>
<script>
import { getUserDetails } from '../details/api'
import { updateUser } from './api'
import SaSection from '@/components/globals/SaSection.vue'
import { repStatus } from '@/utils/const'

export default {
  name: 'UserEdit',
  components: {
    SaSection
  },
  data: (vm) => {
    const validatePassConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(vm.$t('page.userMgt.requirePass')))
      } else if (value !== vm.userDetails.password) {
        callback(new Error(vm.$t('page.userMgt.validatePassConfirm')))
      } else if (!value && vm.userDetails.password) {
        callback(new Error(vm.$t('page.userMgt.requirePassConfirm')))
      } else {
        callback()
      }
    }
    return {
      userDetails: {},
      ui: {
        loading: false
      },
      formRules: {
        nickName: [
          { required: true, message: vm.$t('page.userMgt.requireNickname'), trigger: 'blur' }
        ],
        email: [
          { required: true, message: vm.$t('page.userMgt.requireEmail'), trigger: 'blur' },
          { type: 'email', message: vm.$t('page.userMgt.requireEmail'), trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: vm.$t('page.userMgt.requireMobile'), trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: vm.$t('page.userMgt.requireBirthday'), trigger: 'blur' }
        ],
        address: [
          { required: true, message: vm.$t('page.userMgt.requireAddress'), trigger: 'blur' }
        ],
        re_password: [
          { validator: validatePassConfirm, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserDetails()
  },
  methods: {
    async getUserDetails () {
      this.ui.loading = true
      try {
        const { data } = await getUserDetails(this.$route.params.sn)
        this.userDetails = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    updateUser () {
      this.$refs.userEditForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        try {
          this.ui.loading = true
          const { data } = await updateUser(this.userDetails)
          if (data?.code === repStatus.sussess) {
            const message = this.$t('page.userMgt.editSuccess')
            this.$message({
              type: 'success',
              message: message
            })
            this.$router.push({ name: 'userMgt' })
          } else if (data?.code === repStatus.failed) {
            this.ui.loading = false
          }
        } catch (error) {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
