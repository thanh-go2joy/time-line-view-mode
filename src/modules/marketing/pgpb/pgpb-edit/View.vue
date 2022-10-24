<template>
  <sa-section class="pgpb" v-loading="ui.isLoading">
    <el-form :model="form" :rules="rules" ref="form">
      <div class="pgpb__form">
        <el-form-item :label="$t('page.pgpb.name')" prop="name" required>
          <el-input :placeholder="$t('page.pgpb.name')" v-model="form.name" type="text"></el-input>
        </el-form-item>
      </div>
      <div class="pgpb__form">
        <el-form-item :label="$t('page.pgpb.mobile')" prop="mobile" required>
          <el-input :placeholder="$t('page.pgpb.mobile')" v-model="form.mobile" type="text"></el-input>
        </el-form-item>
      </div>
      <div class="pgpb__form">
        <el-form-item :label="$t('page.pgpb.gender')">
          <el-radio v-model="form.gender" :label="1">{{ $t('gender.male') }}</el-radio>
          <el-radio v-model="form.gender" :label="2">{{ $t('gender.female') }}</el-radio>
        </el-form-item>
      </div>
      <div class="pgpb__form">
        <el-form-item :label="$t('page.pgpb.birthday')" prop="birthday" required>
          <el-date-picker class="datetime" type="date"
          :picker-options="pickerOptions"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :placeholder="$t('page.pgpb.birthday')"
          v-model="form.birthday"
          :clearable="false"></el-date-picker>
        </el-form-item>
      </div>
      <div class="pgpb__form">
        <el-form-item :label="$t('page.pgpb.email')">
          <el-input :placeholder="$t('page.pgpb.email')" v-model="form.email" type="text"></el-input>
        </el-form-item>
      </div>
        <div class="pgpb__form">
        <el-form-item :label="$t('page.pgpb.address')">
          <el-input :placeholder="$t('page.pgpb.address')" v-model="form.address" type="text"></el-input>
        </el-form-item>
      </div>
      <div class="pgpb__form">
          <el-form-item :label="$t('page.pgpb.hotelEmployee')">
            <el-select
            v-loading="ui.isLoadingHotels"
            v-model="form.hotelSn"
            element-loading-spinner="el-icon-loading"
            remote
            filterable
            clearable
            :placeholder="$t('page.pgpb.hotelEmployee')"
            :remote-method="reloadSuggestionsHotels"
            >
            <el-option
              v-for="(item, index) in hotels"
              :key="index"
              :label="`${item.name} - ${item.address}`"
              :value="item.sn"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="pgpb__button">
        <el-button type="info" size="large" @click="$router.go(-1)">
            {{ $t('button.back')}}
        </el-button>
        <el-button type="success" :loading="ui.isSubmiting" size="large" @click="preHandleBeforeSubmit">
            {{ $t('button.update')}}
        </el-button>
      </div>
    </el-form>
  </sa-section>
</template>
<script>
import { debounce } from '@/utils/helpers'
import SaSection from '@/components/globals/SaSection.vue'
import { getPgpbDetails, updatePgpb } from './api'
import { fetchSuggestionsHotels } from '@/api/hotels'

const timeDebounce = 500
const currentTime = Date.now()
export default {
  name: 'PgpbEdit',
  components: {
    SaSection
  },
  data () {
    return {
      form: {
        address: '',
        birthday: '',
        email: '',
        gender: 1,
        hotelSn: '',
        mobile: '',
        name: '',
        code: ''
      },
      rules: {
        birthday: [
          { required: true, message: this.$t('page.pgpb.requiredBirthday'), trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: this.$t('page.pgpb.requiredMobile'), trigger: 'blur' }
        ],
        name: [
          { required: true, message: this.$t('page.pgpb.requiredName'), trigger: 'blur' }
        ]
      },
      ui: {
        isLoading: false,
        isSubmiting: false,
        isLoadingHotels: false
      },
      pickerOptions: {
        disabledDate: this.disabledDate
      },
      hotels: []
    }
  },
  created () {
    this.getPgpbDetails()
  },
  methods: {
    disabledDate (time) {
      return time.getTime() > currentTime - 8.64e7
    },
    async fetchSuggestionsHotels (keyword) {
      this.ui.isLoadingHotels = true
      try {
        const params = { keyword: keyword, limit: 10, justHotel: 1, hotelSn: this.form.hotelSn ? this.form.hotelSn : '' }
        const { data } = await fetchSuggestionsHotels(params)
        this.hotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotels = false
      }
    },
    reloadSuggestionsHotels: debounce(function (keyword) {
      this.fetchSuggestionsHotels(keyword)
    }, timeDebounce),
    async getPgpbDetails () {
      this.ui.isLoading = true
      try {
        const { data } = await getPgpbDetails(this.$route.params.sn)
        this.form = {
          address: data.data[0].address || '',
          birthday: data.data[0].birthday || '',
          email: data.data[0].email || '',
          gender: data.data[0].gender || '',
          hotelSn: data.data[0].hotelSn || '',
          mobile: data.data[0].mobile || '',
          name: data.data[0].name || '',
          code: data.data[0].code || ''
        }
        this.fetchSuggestionsHotels()
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    preHandleBeforeSubmit () {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false
        }
        this.submit()
      })
    },
    async submit () {
      this.ui.isSubmiting = true
      try {
        const formData = Object.keys(this.form).reduce((formData, key) => {
          formData.append(key, this.form[key])
          return formData
        }, new FormData())

        await updatePgpb(this.$route.params.sn, formData)
        const message = this.$t('message.updateSuccess')
        this.$message({
          type: 'success',
          message: message
        })
        this.$router.go(-1)
      } catch (error) {
        return false
      } finally {
        this.ui.isSubmiting = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .pgpb {
    :deep(.pgpb__form) {
      margin: 1em 0;
      .el-form-item {
        display: unset;
        margin-bottom: 1em;
        @media (min-width: 640px) {
          display: flex;
          flex-wrap: wrap;
        }
      }
      .el-form-item__label {
        text-align: left;
        @media (min-width: 640px) {
          flex: 1;
        }
      }
      .el-form-item__content {
        @media (min-width: 640px) {
          flex: 3;
        }
      }
      .el-form-item__error {
        margin-top: 0.5em;
        position: unset;
      }
      .datetime {
        width: 100%;
        @media (min-width: 640px) {
          width: 16em;
        }
      }
    }
    &__row {
      @media (min-width: 640px) {
        display: flex;
        align-items: center;
        gap: 0 2em;
        flex-wrap: wrap;
      }
      img {
        width: 16em !important;
      }
      .upload-file {
        width: 10em;
      }
      &--margin {
        margin: 1em 0;
      }
    }
    &__button {
      display: flex;;
      justify-content: flex-end;
      margin-top: 2em;
    }
  }
  :deep(.select-check) {
    button {
      width: 100%;
      @media (min-width: 640px) {
        width: 16em;
      }
    }
  }
  .el-select {
    width: 100%;
  }
</style>
