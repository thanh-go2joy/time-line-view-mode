<template>
  <el-form
    class="boosting-form"
    ref="MpBoostingRef"
    v-loading="ui.loading"
    :model="formData"
    :rules="rules"
    label-width="16%"
    hide-required-asterisk
  >
    <el-form-item
      prop="name"
      :label="$t('page.MpBoosting.mileageName')"
    >
      <el-input v-model="formData.name"></el-input>
    </el-form-item>
    <el-form-item
      prop="numPoint"
      :label="$t('page.MpBoosting.numberOfPoints')"
    >
      <div class="boosting-form--flex">
        <el-input v-model="formData.numPoint" style="flex: 1; margin-right: 16px;"></el-input>
        <span>/1000 VND</span>
      </div>
    </el-form-item>
    <el-form-item
      :label="$t('page.MpBoosting.startDate/endDate')"
    >
      <div class="boosting-form--flex">
        <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          v-model="formData.startDate"
          style="margin-right: 16px;"
        />
        <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          v-model="formData.endDate"
        />
      </div>
    </el-form-item>
    <el-form-item
      :label="$t('page.MpBoosting.numberOfPoints')"
    >
      <div class="boosting-form--flex">
        <el-checkbox
          v-model="formData.hourly"
          border
          :true-label=1
          :false-label=0
        >
          {{ $t('page.MpBoosting.hourly') }}
        </el-checkbox>
        <el-checkbox
          v-model="formData.overnight"
          border
          :true-label=1
          :false-label=0
        >
          {{ $t('page.MpBoosting.overnight') }}
        </el-checkbox>
        <el-checkbox
          v-model="formData.daily"
          border
          :true-label=1
          :false-label=0
        >
          {{ $t('page.MpBoosting.daily') }}
        </el-checkbox>
      </div>
    </el-form-item>
    <el-form-item
      :label="$t('page.MpBoosting.applyDays')"
    >
      <div class="boosting-form--flex">
        <el-checkbox
          v-model="formData.monday"
          border
          :true-label=1
          :false-label=0
        >
          {{ $t('page.MpBoosting.monday') }}
        </el-checkbox>
        <el-checkbox
          v-model="formData.tuesday"
          border
          :true-label=1
          :false-label=0
        >
          {{ $t('page.MpBoosting.tuesday') }}
        </el-checkbox>
        <el-checkbox
          v-model="formData.wednesday"
          border
          :true-label=1
          :false-label=0
        >
          {{ $t('page.MpBoosting.wednesday') }}
        </el-checkbox>
        <el-checkbox
          v-model="formData.thursday"
          border
          :true-label=1
          :false-label=0
        >
          {{ $t('page.MpBoosting.thursday') }}
        </el-checkbox>
        <el-checkbox
          v-model="formData.friday"
          border
          :true-label=1
          :false-label=0
        >
          {{ $t('page.MpBoosting.friday') }}
        </el-checkbox>
        <el-checkbox
          v-model="formData.saturday"
          border
          :true-label=1
          :false-label=0
        >
          {{ $t('page.MpBoosting.saturday') }}
        </el-checkbox>
        <el-checkbox
          v-model="formData.sunday"
          border
          :true-label=1
          :false-label=0
        >
          {{ $t('page.MpBoosting.sunday') }}
        </el-checkbox>
      </div>
    </el-form-item>
    <el-form-item
      :label="$t('page.MpBoosting.roomType')"
    >
      <div class="boosting-form--flex">
        <el-checkbox
          v-model="formData.normalRoom"
          border
          :true-label=1
          :false-label=0
        >
          {{ $t('page.MpBoosting.normalRoom') }}
        </el-checkbox>
        <el-checkbox
          v-model="formData.flashsaleRoom"
          border
          :true-label=1
          :false-label=0
        >
          {{ $t('page.MpBoosting.flashsaleRoom') }}
        </el-checkbox>
      </div>
    </el-form-item>
    <el-form-item
      prop="minFee"
      :label="$t('page.MpBoosting.minFee')"
    >
      <div class="boosting-form--flex">
        <el-input v-model="formData.minFee"></el-input>
        <span style="margin-left: 16px;">VND</span>
      </div>
    </el-form-item>
    <el-form-item
      prop="combinePromotion"
      :label="$t('page.MpBoosting.combinePromotion')"
    >
      <el-checkbox
        v-model="formData.combinePromotion"
        border
        :true-label=1
        :false-label=0
      >
      </el-checkbox>
    </el-form-item>
    <el-form-item
      prop="payment"
      :label="$t('page.MpBoosting.combinePromotion')"
    >
      <el-checkbox
        v-model="formData.payAtHotel"
        border
        :true-label=1
        :false-label=0
      >
        {{ $t('page.MpBoosting.payAtHotel')}}
      </el-checkbox>
      <el-checkbox
        v-model="formData.zaloCredit"
        border
        :true-label=1
        :false-label=0
      >
        {{ $t('page.MpBoosting.zaloCredit')}}
      </el-checkbox>
      <el-checkbox
        v-model="formData.zaloDebit"
        border
        :true-label=1
        :false-label=0
      >
        {{ $t('page.MpBoosting.zaloDebit')}}
      </el-checkbox>
      <el-checkbox
        v-model="formData.payAtStore"
        border
        :true-label=1
        :false-label=0
      >
        {{ $t('page.MpBoosting.payAtStore')}}
      </el-checkbox>
    </el-form-item>
    <el-form-item
      style="text-align: right;"
    >
      <el-button type="info" @click="$router.go(-1)">
        {{ $t('button.back') }}
      </el-button>
      <el-button type="success" @click="submitForm">
        {{ page === 'create' ? $t('button.create') : $t('button.edit') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getMileageRewardDetails, updateMileageReward } from '../boosting-edit/api'
import { createMileageReward } from '../boosting-create/api'
import { repStatus } from '@/utils/const'
export default {
  name: 'MpBoostingForm',
  props: {
    page: {
      type: String,
      default: ''
    }
  },
  data: (vm) => {
    return {
      ui: {
        loading: false
      },
      rules: {
        name: [
          { required: true, message: vm.$t('page.MpBoosting.requiredName'), trigger: 'blur' }
        ],
        numPoint: [
          { required: true, message: vm.$t('page.MpBoosting.requiredNumPoint'), trigger: 'blur' }
        ],
        minFee: [
          { required: true, message: vm.$t('page.MpBoosting.requiredMinFee'), trigger: 'blur' }
        ]
      },
      formData: {}
    }
  },
  created () {
    if (this.page === 'create') {
      this.formData = {
        combinePromotion: 1,
        daily: 1,
        flashsaleRoom: 1,
        friday: 1,
        hourly: 1,
        minFee: 0,
        monday: 1,
        name: '',
        normalRoom: 1,
        numPoint: '',
        overnight: 1,
        payAtHotel: 1,
        payAtStore: 1,
        saturday: 1,
        startDate: this.formatDate(new Date(), false),
        endDate: this.formatDate(new Date(), false),
        sunday: 1,
        thursday: 1,
        tuesday: 1,
        wednesday: 1,
        zaloCredit: 1,
        zaloDebit: 1
      }
    } else if (this.page === 'edit') {
      this.getMileageRewardDetails()
    }
  },
  methods: {
    async getMileageRewardDetails () {
      try {
        this.ui.loading = true
        const { data } = await getMileageRewardDetails(this.$route.params.sn)
        this.formData = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    async submitForm () {
      this.$refs.MpBoostingRef.validate(async (valid) => {
        if (!valid) {
          return false
        }
        try {
          let message = ''
          if (this.page === 'create') {
            const { data } = await createMileageReward(this.formData)

            if (data?.code === repStatus.sussess) {
              message = this.$t('message.createSuccess')
              this.$message({
                type: 'success',
                message: message
              })
              this.$router.go(-1)
            }
          } else if (this.page === 'edit') {
            const { data } = await updateMileageReward(this.$route.params.sn, this.formData)

            if (data?.code === repStatus.sussess) {
              message = this.$t('message.updateSuccess')
              this.$message({
                type: 'success',
                message: message
              })
              this.$router.go(-1)
            }
          }
        } catch (error) {
          this.$message({
            type: 'error',
            message: error.response ? error.response.data.message : error
          })
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.boosting-form {
  :deep(.el-form-item__label) {
    text-align: left;
  }
  &--flex {
    display: flex;
    align-items: center;
  }
}
.boosting-form :deep {
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
  .boosting-form--flex {
    @media (max-width: 480px) {
      display: revert !important;
    }
  }
  .el-checkbox {
    @media (max-width: 480px) {
      margin-left: 0 !important;
    }
  }

}
</style>
