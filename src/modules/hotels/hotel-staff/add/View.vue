<template>
<sa-section>
  <div class="hotel-staff-create-segment"  v-loading="ui.isLoadingHotelStaffCreate">
    <!-- Start Contentbar-->
    <el-form
    ref="dataForm"
    :model="dataHotelStaffDetail"
    :rules="rules"
    label-position="left"
    label-width="25%"
    class="hotel-staff-create-segment__form">
        <el-form-item :label="$t('page.hotelStaffEdit.hotel_name')" prop="hotelSn">
            <el-select
            style="width:100%"
              v-model="dataHotelStaffDetail.name"
              filterable
              remote
              reserve-keyword
              default-first-option
              @change="addHotelForTable"
              :remote-method="handleSearch"
              :placeholder="$t('page.hotelGroupEdit.table_hotel_name')">
              <el-option
                v-for="item in selectHotel"
                :key="item.name"
                :label="item.name"
                :value="item"

                >
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item :label="$t('page.hotelStaffEdit.user_id')" prop="userId">
            <ElInput :placeholder="$t('page.hotelStaffEdit.user_id')" v-model="dataHotelStaffDetail.userId" />
        </el-form-item>
        <el-form-item :label="$t('page.hotelStaffEdit.full_name')" prop="fullName">
            <ElInput :placeholder="$t('page.hotelStaffEdit.full_name')" v-model="dataHotelStaffDetail.fullName" />
        </el-form-item>
        <el-form-item :label="$t('page.hotelStaffEdit.role')" prop="roleSn">
            <el-select v-model="dataHotelStaffDetail.roleSn" placeholder="Select">
              <el-option
                v-for="item in optionsRole"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item :label="$t('page.hotelStaffEdit.mobile')" prop="mobile">
            <ElInput type="number" :placeholder="$t('page.hotelStaffEdit.mobile')" v-model="dataHotelStaffDetail.mobile" />
        </el-form-item>
        <el-form-item :label="$t('page.hotelStaffEdit.receive_sms')">
            <el-checkbox :true-label="trueCheck" :false-label="falseCheck" v-model="dataHotelStaffDetail.receiveSms"></el-checkbox>
        </el-form-item>
        <el-form-item :label="$t('page.hotelStaffEdit.email')" prop="email">
            <ElInput type="email" :placeholder="$t('page.hotelStaffEdit.email')" v-model="dataHotelStaffDetail.email" />
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
            <ElInput show-password autocomplete="new-password" :placeholder="$t('page.hotelStaffEdit.confirm_password')" type="text" v-model="dataHotelStaffDetail.rePassword" />
        </el-form-item>
        <el-form-item style="text-align: right;">
            <el-button type="info" size="large" @click="$router.go(-1)">
                {{$t('button.back')}}
            </el-button>
            <el-button type="success" size="large" @click="createHotelStafff()">
                <i class="feather icon-save mr-2" />
                {{$t('button.create')}}
            </el-button>
        </el-form-item>
    </el-form>
    <!-- Etart Contentbar-->
    </div>
</sa-section>
</template>

<script>
import { debounce } from '@/utils/helpers'
import md5 from 'md5'
import SaSection from '@/components/globals/SaSection'
import { fetchSuggestionsHotels } from '@/api/hotels'
import {
  createHotelStaff
} from './api'
const timeDebounce = 500
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
        isLoadingHotelStaffCreate: true
      },
      dataHotelStaffDetail: {
        hotelName: '',
        hotelSn: '',
        userId: '',
        fullName: '',
        roleSn: '',
        mobile: '',
        receiveSms: 0,
        email: '',
        debtEmail: '',
        address: '',
        memo: '',
        password: null,
        rePassword: null
      },
      query: {
        limit: 10,
        page: 1,
        keyword: '',
        justHotel: 1
      },
      selectHotel: [],
      roleStaff: {},
      rules: {
        hotelSn: [{ required: true, message: vm.$t('page.hotelStaffEdit.requiredHotelName'), trigger: 'change' }],
        userId: [{ required: true, message: vm.$t('page.hotelStaffEdit.requiredUserId'), trigger: 'blur' }],
        fullName: [{ required: true, message: vm.$t('page.hotelStaffEdit.requiredFullName'), trigger: 'blur' }],
        roleSn: [{ required: true, message: vm.$t('page.hotelStaffEdit.requiredRole'), trigger: 'change' }],
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
      falseCheck: 0,
      checkPassError: false,
      value: []

    }
  },
  created () {
    this.fetchSuggestionsHotels()
  },
  methods: {
    async fetchSuggestionsHotels () {
      this.ui.isLoadingHotelStaffCreate = true
      try {
        const { data } = await fetchSuggestionsHotels(this.query)
        this.selectHotel = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotelStaffCreate = false
      }
    },
    handleSearch: debounce(function (keyword) {
      this.query.keyword = keyword
      this.fetchSuggestionsHotels(this.query)
    }, timeDebounce),
    addHotelForTable (value) {
      this.dataHotelStaffDetail.hotelSn = value.sn
      this.dataHotelStaffDetail.name = value.name
    },
    async createHotelStafff () {
      this.$refs.dataForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        try {
          this.ui.isLoadingHotelStaffCreate = true
          this.dataHotelStaffDetail.password = this.dataHotelStaffDetail.password ? md5(this.dataHotelStaffDetail.password).toString() : null
          this.dataHotelStaffDetail.confirmPassword = this.dataHotelStaffDetail.rePassword ? md5(this.dataHotelStaffDetail.rePassword).toString() : null
          try {
            const { data } = await createHotelStaff(this.dataHotelStaffDetail.hotelSn, this.dataHotelStaffDetail)
            this.dataHotelStaffDetail.password = ''
            this.dataHotelStaffDetail.rePassword = ''
            if (data.code === 1) {
              this.$message({
                type: 'success',
                message: `${this.$t('message.createSuccess')}`
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
            this.ui.isLoadingHotelStaffCreate = false
          }
        } catch (error) {
          return false
        }
      })
    } // createHotelStafff
  }
}
</script>
<style lang="scss" scoped>
.hotel-staff-create-segment:deep {
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
.hotel-staff-create-segment{
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
