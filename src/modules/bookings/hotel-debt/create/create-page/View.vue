<template>
  <sa-section>
    <el-form
      label-width="250px"
      :model="hotelDebts"
      label-position="left"
      class="form"
    >
      <el-form-item :label="$t('page.hotelDebt.period_debt_time')">
        <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          v-model="hotelDebts.startDate"
        />
        <span class="mar-12">~</span>
        <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          v-model="hotelDebts.endDate"
        />
      </el-form-item>
      <el-form-item :label="$t('breadcrumb.ApplyForHotel')" >
        <p v-if="type === 'debt'">
          {{ ApplyType }}
          <el-link @click="onGoToApplyHotel">{{
            $t('breadcrumb.ApplyForHotel')
          }}</el-link>
        </p>
        <upload-file
          v-else
          accept=".xlsx, .xls, .csv"
          @change="handleExceed"
        />
      </el-form-item>
      <el-form-item class="float-right button-footer">
        <router-link
          class="el-button el-button--info is-plain"
          :to="{name: 'hotelDebt'}"
        >
          {{ $t('button.back') }}
        </router-link>
        <el-button type="success" size="large" @click="onCreateHotelDebt">
          <i class="feather icon-save mr-2" />
          {{ $t('button.save') }}
        </el-button>
      </el-form-item>
    </el-form>
  </sa-section>
</template>
<script>
import saSection from '@/components/globals/SaSection.vue'
import { getHotelApplyPath, onCreateHotelDebt } from './api'
import UploadFile from '@/components/globals/UploadFile'

export default {
  name: 'CreateHotelDebtDetail',
  components: {
    saSection,
    UploadFile
  },
  data () {
    return {
      hotelDebts: {},
      type: this.$route.query.createType,
      ui: {
        isCallAPI: false
      }
    }
  },
  computed: {
    ApplyType () {
      let applyType
      switch (localStorage.getItem('ApplyType')) {
        case '1':
          applyType = this.$t('page.hotelDebt.apply_all_hotel')
          break
        case '2':
          applyType = this.$t('page.hotelDebt.apply_all_hotel_except')
          break
        case '3':
          applyType = this.$t('page.hotelDebt.only_apply')
          break
        default:
          applyType = this.$t('page.hotelDebt.apply_all_hotel')
          break
      }
      return applyType
    }
  },
  created () {},

  methods: {
    async onGoToApplyHotel () {
      try {
        this.ui.isCallAPI = true
        const { data } = await getHotelApplyPath()
        if (data.data.additionalData) {
          this.$router.push({
            name: 'ApplyForHotel',
            query: {
              applyTarget: data.data.additionalData.applyTarget,
              provinceSn: data.data.additionalData.provinceSn,
              districtSn: data.data.additionalData.districtSn,
              keyword: data.data && data.data.additionalData.keyword ? data.data.additionalData.keyword : '',
              page: 'create-hotel-debt',
              typeHotelDebt: this.type
            }
          })
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isCallAPI = false
      }
    },
    async onCreateHotelDebt () {
      try {
        this.ui.isCallAPI = true
        const formData = new FormData()
        formData.append('startDate', this.formatDate(this.hotelDebts.startDate, false))
        formData.append('endDate', this.formatDate(this.hotelDebts.endDate, false))
        if (this.type === 'paid') {
          formData.append('file', this.file)
        }
        const { data } = await onCreateHotelDebt(this.type, formData)
        if (data.code === 1) {
          localStorage.setItem('create_success', '1')
          localStorage.setItem('ApplyType', '1')
          this.$router.push({
            name: 'hotelDebtReview',
            query: {
              array_hotel: data.data.hotelSnList
            }
          })
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isCallAPI = false
      }
    },
    handleExceed (file) {
      this.file = file
    }
  }
}
</script>

<style lang="scss" scoped>
.mar-12 {
  margin: 0 12px;
}
.button-footer {
  margin-bottom: 12px;
}
</style>
