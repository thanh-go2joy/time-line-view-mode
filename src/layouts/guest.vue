<template>
  <div class="login">
    <img src="https://sa.go2joy.vn/assets/images/authentication/authentication-bg.svg" width="100%"/>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="showSignIn">
      <div v-if="!isVerify">
        <div class="login__logo">
          <img src="@/assets/images/logo/logo.png" width="70%">
        </div>
        <div class="login__title">
            <p>Sign In</p>
        </div>
        <div class="login__form">
            <el-input v-model="formData.userId"></el-input>
            <el-input show-password v-model="formData.password"></el-input>
        </div>
        <div class="login__forget">
          <el-checkbox class="login__forget--color" v-model="formData.remember">Remember Me</el-checkbox>
        </div>
        <div class="login__button">
          <el-button
            type="danger"
            @click="onSignIn"
            :loading="isLoading"
          >
            Sign In
          </el-button>
        </div>
      </div>
      <div v-else>
        <div class="login__logo" style="text-align: center">
          <img src="@/assets/images/logo/logo.png" width="70%">
        </div>
         <div class="login__title center" style="text-align: center">
            <p>Input OTP code to continue</p>
        </div>
        <div class="login__form">
          <el-input
            type="password"
            class="form-control"
            placeholder="OTP code"
            v-model="otpCode"
            required
          />
        </div>
        <div class="login__button">
          <el-button
            type="danger"
            @click="onVerify"
            :loading="isLoading"
          >
            Continue
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import md5 from 'md5'
import { setLocalStorageWithExpiry } from '@/utils/localStorage'
import { signIn, verifyOTP } from '@/api/auth'
export default {
  name: 'GuestLayout',
  data () {
    return {
      formData: {
        userId: '',
        password: '',
        remember: false
      },
      otpCode: '',
      showSignIn: true,
      isLoading: false,
      isVerify: false
    }
  },
  methods: {
    async onSignIn () {
      this.isLoading = true
      try {
        const { data } = await signIn({
          userId: this.formData.userId,
          password: md5(this.formData.password),
          remember: Number(this.formData.remember)
        })
        if (data.code === 1) {
          this.setExpiry(data)
        } else if (data.code === 17) {
          this.isVerify = true
        }
      } catch (error) {
        this.isLoading = false
        return false
      } finally {
        this.isLoading = false
      }
    },
    async onVerify () {
      this.isLoading = true
      try {
        const { data } = await verifyOTP({
          userId: this.formData.userId,
          code: this.otpCode,
          remember: this.remember ? 1 : 0
        })
        if (data.code === 1) {
          this.setExpiry(data)
        } else if (data.code === 17) {
          this.isVerify = true
        }
      } catch (error) {
        this.isLoading = false
        return false
      } finally {
        this.isLoading = false
      }
    },
    async setExpiry (data) {
      console.log('data')
      const ttl = this.formData.remember ? 60 * 60 * 24 * 90 * 1000 : 60 * 60 * 24 * 1000
      await setLocalStorageWithExpiry('access_token', data.data.accessToken, ttl)
      setLocalStorageWithExpiry('profile', data.data.profile, ttl)
      localStorage.getItem('page-back') ? this.$router.push(localStorage.getItem('page-back')) : this.$router.push('/hotel/sadmin/dashboard')
      this.$emit('changeLayout')
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  :deep(.el-dialog__header) {
    display: none;
  }
  :deep(.el-dialog__body) {
    padding: 20px;
  }
  :deep(.el-icon-close) {
      display: none;
  }
  :deep(.el-dialog) {
    position: relative;
    margin: 0 auto 50px;
    border-radius: 2px;
    box-sizing: border-box;
    width: 90%;
    @media (min-width: 640px) {
      width: 30%;
    }
  }
  :deep(.el-link) {
    color: #ff6400;
  }
  :deep(.el-link:hover) {
    color: #ff6400;
  }
  :deep(.login__logo) {
    width: 60%;
    object-fit: scale-down;
    margin: 0 auto;
  }
  :deep(.login__title) {
    color: #ff6400;
    font-size: 22px;
  }
  :deep(.login__form) {
    .el-input {
      padding: 6px 0;
    }
    input:focus {
      border-color: red;
    }
  }
  :deep(.el-button.is-loading) {
    padding: 12px 20px;
  }
  .login__forget {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    &--color:hover {
        color: #ff6400;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: #ff6400;
        border-color: #ff6400;
    }
    .el-checkbox__input.is-checked+.el-checkbox__label {
        color: #ff6400
    }
  }
  :deep(.login__button) {
    padding: 10px 0;
    button {
        width: 100%;
        background: #ff6400;
    }
    button:hover {
        background: #ff6400;
    }
    button:focus {
        background: #ff6400;
    }
    p {
        padding: 12px;
    }
  }
}
</style>
