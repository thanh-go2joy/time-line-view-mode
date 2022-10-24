<template>
<sa-section >
  <div class="hotel-staff-edit-segment" v-loading="ui.isLoadingHotelStaffEdit">
    <!-- Start Contentbar-->
    <el-form
    ref="dataForm"
    :model="dataHotelStaffDetail"
    :rules="rules"
    hide-required-asterisk
    label-position="left"
    label-width="25%"
    class="hotel-staff-edit-segment__form">
        <el-form-item :label="$t('page.hotelStaffEdit.hotel_name')" prop="hotelName">
            <ElInput :placeholder="$t('page.hotelStaffEdit.hotel_name')" :disabled="true" v-model="dataHotelStaffDetail.hotelName" />
        </el-form-item>
        <el-form-item :label="$t('page.hotelStaffEdit.user_id')" prop="userId">
            <ElInput :placeholder="$t('page.hotelStaffEdit.user_id')" v-model="dataHotelStaffDetail.userId" />
        </el-form-item>
        <el-form-item :label="$t('page.hotelStaffEdit.full_name')" prop="fullName">
            <ElInput :placeholder="$t('page.hotelStaffEdit.full_name')" v-model="dataHotelStaffDetail.fullName" />
        </el-form-item>
        <el-form-item :label="$t('page.hotelStaffEdit.role')" prop="role">
            <el-select v-model="roleSn" placeholder="Select" @change="checkRole(roleSn)">
              <el-option
                v-for="item in optionsRole"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item :label="$t('page.hotelStaffEdit.mobile')" prop="mobile">
            <ElInput :placeholder="$t('page.hotelStaffEdit.mobile')" v-model="dataHotelStaffDetail.mobile" />
        </el-form-item>
        <el-form-item :label="$t('page.hotelStaffEdit.receive_sms')">
            <el-checkbox :true-label="trueCheck" :false-label="falseCheck" v-model="dataHotelStaffDetail.receiveSms"></el-checkbox>
        </el-form-item>
        <el-form-item :label="$t('page.hotelStaffEdit.email')" prop="email">
            <ElInput :placeholder="$t('page.hotelStaffEdit.email')" v-model="dataHotelStaffDetail.email" />
        </el-form-item>
        <el-form-item :label="$t('page.hotelStaffEdit.debt_reconciliation_email')" prop="debtEmail">
            <ElInput :placeholder="$t('page.hotelStaffEdit.debt_reconciliation_email')" v-model="dataHotelStaffDetail.debtEmail" />
        </el-form-item>
        <el-form-item :label="$t('page.hotelStaffEdit.address')" prop="address">
            <ElInput :placeholder="$t('page.hotelStaffEdit.address')" v-model="dataHotelStaffDetail.address" />
        </el-form-item>
        <el-form-item :label="$t('page.hotelStaffEdit.memo')">
            <ElInput :placeholder="$t('page.hotelStaffEdit.memo')" type="textarea"   :rows="4" v-model="dataHotelStaffDetail.memo" />
        </el-form-item>
        <el-form-item :label="$t('page.hotelStaffEdit.password')" prop="password">
            <ElInput show-password autocomplete="new-password" :placeholder="$t('page.hotelStaffEdit.password')" type="text" v-model="dataHotelStaffDetail.password" />
        </el-form-item>
        <el-form-item :label="$t('page.hotelStaffEdit.confirm_password')" prop="rePassword">
            <ElInput show-password autocomplete="new-password"  :placeholder="$t('page.hotelStaffEdit.confirm_password')" type="text" v-model="dataHotelStaffDetail.rePassword" />
        </el-form-item>
        <el-form-item style="text-align: right;">
            <el-button type="info" size="large" @click="$router.go(-1)">
                {{$t('button.back')}}
            </el-button>
            <el-button type="success" size="large" @click="updateHotelStaffById()">
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
import md5 from 'md5'
import SaSection from '@/components/globals/SaSection'
import {
  getStaffDetail,
  updateStaffById
} from './api'
export default {
  name: 'EditStaffHotelMgt',
  components: { SaSection },
  data (vm) {
    const validatePassConfirm = (rule, value, callback) => {
      if (!value && !vm.dataHotelStaffDetail.password) {
        callback()
      } else if (vm.dataHotelStaffDetail.password && !value) {
        callback(new Error(vm.$t('page.hotelStaffEdit.requirePass')))
      } else if (value && value !== vm.dataHotelStaffDetail.password) {
        callback(new Error(vm.$t('page.hotelStaffEdit.validatePassConfirm')))
      } else if (!value && vm.dataHotelStaffDetail.password) {
        callback(new Error(vm.$t('page.hotelStaffEdit.requirePassConfirm')))
      } else {
        callback()
      }
    }
    return {
      ui: {
        isLoadingHotelStaffEdit: true
      },
      dataHotelStaffDetail: {
        role: {
          sn: ''
        },
        staffSn: ''
      },
      roleSn: '',
      roleStaff: {},
      rules: {
        hotelName: [{ required: true, message: vm.$t('page.hotelStaffEdit.requiredHotelName'), trigger: 'blur' }],
        userId: [{ required: true, message: vm.$t('page.hotelStaffEdit.requiredUserId'), trigger: 'blur' }],
        fullName: [{ required: true, message: vm.$t('page.hotelStaffEdit.requiredFullName'), trigger: 'blur' }],
        role: [{ required: true, message: vm.$t('page.hotelStaffEdit.requiredRole'), trigger: 'change' }],
        email: [{ required: true, message: vm.$t('page.hotelStaffEdit.requiredEmail'), trigger: 'blur' }],
        mobile: [{ required: true, message: vm.$t('page.hotelStaffEdit.requiredMobile'), trigger: 'blur' }],
        debtEmail: [{ required: true, message: vm.$t('page.hotelStaffEdit.requiredDebtEmail'), trigger: 'blur' }],
        password: [{ required: true, message: vm.$t('page.hotelStaffEdit.requiredPassword'), trigger: 'blur' }],
        rePassword: [
          { required: true, validator: validatePassConfirm, trigger: 'blur' }
        ]

      },
      optionsRole: [
        {
          name: this.$t('page.hotelStaffEdit.admin_ks'),
          value: 4
        },
        {
          name: this.$t('page.hotelStaffEdit.manager'),
          value: 5
        },
        {
          name: this.$t('page.hotelStaffEdit.reception'),
          value: 7
        }
      ],
      id: this.$route.params.id ? this.$route.params.id : '',
      trueCheck: 1,
      falseCheck: 0

    }
  },
  created () {
    this.getDataHotelStaffById()
  },
  methods: {
    async getDataHotelStaffById () {
      this.ui.isLoadingHotelStaffEdit = true
      try {
        const { data } = await getStaffDetail(this.id)
        this.dataHotelStaffDetail = data.data
        this.roleSn = this.dataHotelStaffDetail.role.sn
        this.dataHotelStaffDetail.staffSn = this.dataHotelStaffDetail.sn
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotelStaffEdit = false
      }
    }, // getDataHotelStaffById
    checkRole (role) {
      this.roleSn = role
    },
    async updateHotelStaffById () {
      this.$refs.dataForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        try {
          this.ui.isLoadingHotelStaffEdit = true

          this.dataHotelStaffDetail.roleSn = this.roleSn
          this.dataHotelStaffDetail.password = this.dataHotelStaffDetail.password ? md5(this.dataHotelStaffDetail.password).toString() : null
          const { data } = await updateStaffById(this.dataHotelStaffDetail.hotelSn, this.dataHotelStaffDetail)
          this.dataHotelStaffDetail.password = ''
          this.dataHotelStaffDetail.rePassword = ''
          if (data.code === 1) {
            this.$message({
              type: 'success',
              message: `${this.$t('message.updateSuccess')}`
            })
            this.$router.push({ name: 'hotel_staff_mgt', params: { hotelSn: this.dataHotelStaffDetail.hotelSn } })
          }
        } catch (error) {
          this.$message({
            type: 'error',
            message: error.response ? error.response.data.message : error
          })
          return false
        } finally {
          this.ui.isLoadingHotelStaffEdit = false
        }
      })
    } // updateProfile
  }
}
</script>
<style lang="scss" scoped>
.hotel-staff-edit-segment:deep {
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
.hotel-staff-edit-segment{
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
            .hotel-staff-edit-title{
                margin: 5px 15px;
            }
            .hotel-staff-edit-content{
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
