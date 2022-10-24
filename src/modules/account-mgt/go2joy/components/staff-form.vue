<template>
  <el-form
    ref="staffForm"
    v-loading="ui.staffLoading"
    :model="formData"
    :rules="rules"
    label-width="12%"
    class="staff-form"
    hide-required-asterisk
  >
    <el-form-item
      prop="userId"
      :label="$t('page.staffs.userId')"
    >
      <el-input v-model="formData.userId"></el-input>
    </el-form-item>
    <el-form-item
      prop="fullName"
      :label="$t('page.staffs.fullName')"
    >
      <el-input v-model="formData.fullName"></el-input>
    </el-form-item>
    <el-form-item
      prop="roleSn"
      :label="$t('page.staffs.role')"
    >
      <el-select
        v-model="formData.roleSn"
        :loading="ui.roleLoading"
      >
        <ElOption
          v-for="(item, index) in roleOptions"
          :key="index"
          :label="item.name"
          :value="item.sn"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      prop="mobile"
      :label="$t('page.staffs.mobile')"
    >
      <el-input v-model="formData.mobile"></el-input>
    </el-form-item>
    <el-form-item
      prop="email"
      :label="$t('page.staffs.email')"
    >
      <el-input v-model="formData.email"></el-input>
    </el-form-item>
    <el-form-item
      prop="address"
      :label="$t('page.staffs.address')"
    >
      <el-input v-model="formData.address"></el-input>
    </el-form-item>
    <el-form-item
      prop="regionsMgt"
      :label="$t('page.staffs.region')"
    >
      <el-checkbox-group
        v-model="formData.regionsMgt"
      >
        <el-checkbox name="type" :label="1">{{ $t('page.staffs.south')}}</el-checkbox>
        <el-checkbox name="type" :label="2">{{ $t('page.staffs.north')}}</el-checkbox>
        <el-checkbox name="type" :label="3">{{ $t('page.staffs.middle')}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item
      :label="$t('page.staffs.memo')"
    >
      <el-input
        v-model="formData.memo"
        type="textarea"
        rows="4"
      ></el-input>
    </el-form-item>
    <el-form-item
      prop="password"
      :label="$t('page.staffs.password')"
    >
      <el-input autocomplete="new-password" show-password v-model="formData.password" type="password"></el-input>
    </el-form-item>
    <el-form-item
      prop="confirmPassword"
      :label="$t('page.staffs.confirmPassword')"
    >
      <el-input autocomplete="new-password" show-password  v-model="formData.confirmPassword" type="password"></el-input>
    </el-form-item>
    <el-form-item
      style="text-align: right;"
    >
       <el-button
        type="success"
        @click="submitForm"
      >
        {{ $t('button.save') }}
      </el-button>
      <el-button
        type="info"
        @click="$router.go(-1)"
      >
        {{ $t('button.back') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import md5 from 'md5'
import { getStaffDetails, updateStaff } from '../edit/api'
import { createStaff } from '../create/api'
import { fetchRoles } from '@/api/role'
export default {
  name: 'StaffForm',
  props: {
    page: String
  },
  data: (vm) => {
    const validateConfirmPass = (rule, value, callback) => {
      if (value !== vm.formData.password && vm.formData.password) {
        callback(new Error(vm.$t('page.staffs.confirmMatch')))
      } else {
        callback()
      }
    }
    const isVietnamesePhoneNumber = (rule, value, callback) => {
      const isCheck = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(value)
      if (!isCheck) {
        callback(new Error(vm.$t('page.staffs.notMobile')))
      } else {
        callback()
      }
    }
    return {
      ui: {
        staffLoading: false
      },
      roleOptions: [],
      formData: {
        userId: '',
        fullName: '',
        roleSn: '',
        mobile: '',
        email: '',
        regionsMgt: [],
        password: '',
        confirmPassword: '',
        memo: ''
      },
      rules: {
        userId: [
          { required: true, message: vm.$t('page.staffs.requiredUserId'), trigger: 'blur' }
        ],
        fullName: [
          { required: true, message: vm.$t('page.staffs.requiredFullName'), trigger: 'blur' }
        ],
        roleSn: [
          { required: true, message: vm.$t('page.staffs.requiredRole'), trigger: 'change' }
        ],
        mobile: [
          { required: true, message: vm.$t('page.staffs.requiredMobile'), trigger: 'blur' },
          { validator: isVietnamesePhoneNumber }
        ],
        email: [
          { required: true, message: vm.$t('page.staffs.requiredEmail'), trigger: 'blur' },
          { type: 'email', message: '', trigger: ['blur', 'change'] }
        ],
        address: [
          { required: true, message: vm.$t('page.staffs.requiredAddress'), trigger: 'blur' }
        ],
        regionsMgt: [
          { type: 'array', required: true, message: vm.$t('page.staffs.requiredRole'), trigger: 'change' }
        ],
        password: [
          {
            required: true,
            pattern: '[a-zA-Z0-9]+',
            message: vm.$t('page.staffs.requiredPassword'),
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          {
            required: true,
            pattern: '[a-zA-Z0-9]+',
            message: vm.$t('page.staffs.requiredPassword'),
            trigger: 'blur'
          }, { validator: validateConfirmPass }
        ]
      }
    }
  },
  created () {
    this.fetchRoles()
    if (this.page === 'edit') {
      this.getStaffDetails()
    }
  },
  methods: {
    async fetchRoles () {
      this.ui.roleLoading = true
      try {
        const { data } = await fetchRoles({ filter: 1 })
        this.roleOptions = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.roleLoading = false
      }
    },
    async getStaffDetails () {
      this.ui.staffLoading = true
      try {
        const { data } = await getStaffDetails(this.$route.params.sn)
        this.formData = data.data
        this.formData.roleSn = data.data.role.sn
      } catch (error) {
        return false
      } finally {
        this.ui.staffLoading = false
      }
    },
    async submitForm () {
      this.$refs.staffForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        this.ui.staffLoading = true
        try {
          if (this.formData.password) {
            this.formData.password = md5(this.formData.password)
          }
          if (this.formData.confirmPassword) {
            this.formData.confirmPassword = md5(this.formData.confirmPassword)
          }
          this.formData.region = this.formData.regionsMgt
          const { data } = this.page === 'edit' ? await updateStaff(this.formData.sn, this.formData) : await createStaff(this.formData)
          const message = this.page === 'edit' ? this.$t('message.updateSuccess') : this.$t('message.createSuccess')
          if (data.code === 1) {
            this.$message({
              type: 'success',
              message: message
            })
            this.$router.push({ name: 'go2joyStaffs' })
          }
        } catch (e) {
          return false
        } finally {
          this.formData.password = ''
          this.formData.confirmPassword = ''
          this.ui.staffLoading = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.staff-form {
  :deep(.el-form-item__label) {
    text-align: left;
  }
}
.staff-form :deep {
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
</style>
