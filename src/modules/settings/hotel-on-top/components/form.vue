<template>
  <el-form
    :model="formData"
    :rules="setRules"
    ref="form"
    hide-required-asterisk
    class="hotel-on-top"
    v-loading="ui.loadingDetails"
  >
    <div class="hotel-on-top__form">
      <el-form-item
        prop="title"
        :label="$t('page.settings.title')"
      >
        <el-input
          v-model.trim="formData.title"
        />
      </el-form-item>
    </div>

    <div class="hotel-on-top__form">
      <el-form-item
        :label="$t('page.settings.typeTop')"
      >
        <el-select
          class="w-100 w-32"
          v-model="formData.type"
          @change="onChangeType"
        >
          <ElOption
            v-for="(item, index) in ui.typeTopOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </div>

    <div class="hotel-on-top__form">
      <el-form-item
        :label="$t('page.settings.province')"
      >
        <el-select
          class="w-100 w-32"
          v-model="formData.provinceSn"
          @change="onChangeProvince"
          :loading="ui.provincesLoading"
          :placeholder="$t('page.settings.province')"
        >
          <ElOption
            v-for="(item, index) in provinces"
            :key="index"
            :label="item.name"
            :value="item.sn"
            :disabled="formData.type === 4 ? item.byDisable : false"
          />
        </el-select>
      </el-form-item>
    </div>
    <div class="hotel-on-top__form">
      <el-form-item
        v-if="formData.type === 1 || formData.type === 4"
        :label="$t('page.settings.district')"
      >
        <el-select
          class="w-100 w-32"
          v-model="formData.districtSn"
          :loading="ui.districtsLoading"
          :placeholder="$t('page.settings.district')"
        >
          <ElOption
            v-for="(item, index) in districts"
            :key="index"
            :label="item.name"
            :value="item.sn"
            :disabled="formData.type === 4 ? item.byDisable : false"
          />
        </el-select>
      </el-form-item>
    </div>

    <div class="hotel-on-top__form">
      <el-form-item
        prop="hashtagSn"
        v-if="formData.type === 2"
        :label="$t('page.settings.hashtag')"
      >
        <el-select
          class="w-100 w-32"
          v-model="formData.hashtag"
          :loading="ui.hashtagLoading"
          :placeholder="$t('page.settings.hashtag')"
          remote
          filterable
          :remote-method="searchSuggestionHashtag"
          clearable
          :popper-append-to-body="false"
        >
          <el-option
            v-for="(item, index) in suggestionHashtags"
            :key="index"
            :label="item.name"
            :value="item.sn"
            style="font-size: 13px; color: #4a5d6e;"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </div>

    <div class="hotel-on-top__form">
      <el-form-item
        v-if="formData.type === 2"
        prop="startDate"
        :label="$t('placeholder.startDate')"
      >
        <el-date-picker
          class="w-100 w-32"
          v-model="formData.startDate"
          type="date"
          :placeholder="$t('placeholder.startDate')"
          :picker-options="pickerOptionsHashtagStartDate"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm"
        >
        </el-date-picker>
      </el-form-item>
    </div>

    <div class="hotel-on-top__form">
      <el-form-item
        v-if="formData.type === 2"
        prop="endDate"
        :label="$t('placeholder.endDate')"
      >
        <el-date-picker
          class="w-100 w-32"
          v-model="formData.endDate"
          type="date"
          :placeholder="$t('placeholder.endDate')"
          :picker-options="pickerOptionsHashtagEndDate"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm"
        >
        </el-date-picker>
      </el-form-item>
    </div>

    <div class="hotel-on-top__form">
      <el-form-item
        v-if="formData.type === 3"
        :label="$t('page.settings.collectionList')"
      >
        <el-select
          class="w-100 w-32"
          v-model="formData.hotelCollectionSn"
          :loading="ui.collectionsLoading"
          remote
          filterable
          :remote-method="searchCollection"
          prefix-icon="el-icon-search"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="(item, index) in hotelCollections"
            :key="index"
            :label="item.title"
            :value="item.sn"
            style="font-size: 13px; color: #4a5d6e;"
            class="hotel__option"
          />
        </el-select>
      </el-form-item>
    </div>

    <div class="hotel-on-top__form">
      <el-form-item
        :label="$t('page.settings.hotel')"
      >
        <el-select
          class="w-100 w-32"
          v-model="formData.targetSn"
          :loading="ui.suggestionsHotelsLoading"
          :placeholder="$t('page.bookingReport.hotel_name')"
          remote
          filterable
          :remote-method="searchSuggestionsHotels"
          prefix-icon="el-icon-search"
          :popper-append-to-body="false"
          @change="changeSuggestionHotel"
        >
          <el-option
            v-for="(item, index) in suggestionsHotels"
            :key="index"
            :label="item.name"
            :value="JSON.stringify(item)"
            style="font-size: 13px; color: #4a5d6e;"
            class="hotel__option"
          >
            {{ item.name }} <br> {{ item.address }}
          </el-option>
        </el-select>
      </el-form-item>
    </div>

    <div class="hotel-on-top__form">
      <div v-if="formData.type !== 2">
        <el-form-item
          v-for="(hotelOnTopDetail, index) in formData.hotelOnTopDetails"
          :key="index"
          :label="`${$t('page.settings.topHotel')} ${index + 1}`"
        >
          <div class="hotel-on-top__item">
            <div class="hotel-on-top__item--flex">
              <el-form-item :prop="`hotelOnTopDetails[${index}].dateTimePicker`">
                <el-date-picker
                  :picker-options="pickerOptionsDate"
                  v-model="formData.hotelOnTopDetails[index].dateTimePicker"
                  type="datetimerange"
                  range-separator="-"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                  :start-placeholder="$t('placeholder.startDate')"
                  :end-placeholder="$t('placeholder.endDate')">
                </el-date-picker>
              </el-form-item>
            </div>

            <div class="hotel-on-top__item--flex">
              <el-input
                disabled
                v-model="hotelOnTopDetail.hotelName"
              ></el-input>
            </div>

            <div class="hotel-on-top__item--flex">
              <el-button
                class="w-100"
                @click="removeTopHotel(index)"
                type="danger"
              >
                {{ $t('button.delete') }}
              </el-button>
            </div>
          </div>
        </el-form-item>
      </div>
    </div>

    <div class="hotel-on-top__form">
      <el-form-item
        v-if="formData.type === 2"
      >
        <el-table
          :data="formData.hotelOnTopDetails"
        >
          <el-table-column
            prop="hotelName"
            :min-width="100"
            :label="$t('page.settings.hotelName')"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            :min-width="150"
            :label="$t('page.settings.address')"
          >
          </el-table-column>
          <el-table-column
            :min-width="100"
            :label="$t('page.settings.operations')"
          >
            <el-button
              @click="formData.hotelOnTopDetails.splice(index, 1)"
              type="danger"
            >
              {{ $t('button.delete') }}
            </el-button>
          </el-table-column>
        </el-table>
      </el-form-item>
    </div>

    <div class="hotel-on-top__button">
      <el-button
          type="info"
          @click="$router.go(-1)"
        >
          {{ $t('button.back') }}
        </el-button>
        <el-button
          :loading="ui.isSubmiting"
          type="success"
          @click="submitForm"
        >
          {{ page === 'edit' ? $t('button.update') : $t('button.create') }}
        </el-button>
    </div>

  </el-form>
</template>
<script>
import { debounce, scrollToTop } from '@/utils/helpers'
import { fetchSuggestionsHotels } from '@/api/hotels'
import { fetchProvinces, fetchDistricts } from '@/api/province'
import { fetchHashtags } from '@/api/hashtag'
import { addHotelOnTop } from '../create/api'
import { fetchHotelOnTopDetails, fetchHotelCollections, updateHotelOntop } from '../edit/api'
const timeDebounce = 500
export default {
  name: 'HotelOnTopForm',
  props: {
    page: {
      type: String,
      default: 'create'
    }
  },
  data: (vm) => {
    return {
      pickerOptionsDate: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      pickerOptionsHashtagStartDate: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      pickerOptionsHashtagEndDate: {
        disabledDate: vm.isDisableHashtagEndDate
      },
      rules: vm.setRules,
      ui: {
        isSubmiting: false,
        suggestionsHotelsLoading: false,
        districtsLoading: false,
        provincesLoading: false,
        loadingDetails: false,
        collectionsLoading: false,
        typeTopOptions: [
          {
            label: vm.$t('page.settings.hotelOnTopByDistrict'),
            value: 1
          },
          {
            label: vm.$t('page.settings.hotelOnTopByDashtag'),
            value: 2
          },
          {
            label: vm.$t('page.settings.hotelOnTopByCollection'),
            value: 3
          },
          {
            label: vm.$t('page.settings.bySearching'),
            value: 4
          }
        ]
      },
      suggestionHashtags: [],
      suggestionsHotels: [],
      hotelCollections: [],
      formData: {
        provinceSn: '',
        districtSn: '',
        type: 1,
        hotelOnTopDetails: [],
        endDate: '',
        startDate: '',
        hashtag: ''
      },
      districts: [{ name: vm.$t('page.settings.all'), sn: '', byDisable: true }],
      provinces: [{ name: vm.$t('page.settings.all'), sn: '', byDisable: true }]
    }
  },
  computed: {
    setRules () {
      const rules = {
        title: [
          { required: true, message: this.$t('page.settings.requireTitle'), trigger: 'blur' }
        ],
        hashtag: [
          { required: true, message: this.$t('page.settings.requireHashtag'), trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: this.$t('page.settings.requireStartDate'), trigger: 'blur' }
        ],
        endDate: [
          { required: true, message: this.$t('page.settings.requireEndDate'), trigger: 'blur' }
        ]
      }
      if (this.formData.hotelOnTopDetails.length > 0) {
        for (let i = 0; i < this.formData.hotelOnTopDetails.length; i++) {
          rules[`hotelOnTopDetails[${i}].dateTimePicker`] = [
            { required: true, message: this.$t('page.settings.requireStartEndDate'), trigger: 'change' }
          ]
        }
      }
      return rules
    }
  },
  async created () {
    await this.fetchProvinces()
    if (this.page === 'edit') {
      this.fetchHotelOnTopDetails()
    }
  },
  methods: {
    onChangeType (type) {
      if (type === 4) {
        this.formData.provinceSn = this.formData.districtSn = null
        this.formData.hotelOnTopDetails = this.formData.hotelOnTopDetails.slice(0, 6)
      } else if (type === 3) {
        this.formData.hotelOnTopDetails = this.formData.hotelOnTopDetails.slice(0, 20)
      } else if (type === 2) {
        this.formData.hotelOnTopDetails = this.formData.hotelOnTopDetails.slice(0, 5)
      } else {
        this.formData.hotelOnTopDetails = this.formData.hotelOnTopDetails.slice(0, 10)
      }
    },
    // fetch data
    searchCollection: debounce(function (keySearch) {
      this.fetchHotelCollections({
        limit: 10,
        keyword: keySearch
      })
    }, timeDebounce),
    searchSuggestionsHotels: debounce(function (keySearch) {
      this.fetchSuggestionsHotels({
        limit: 50,
        justHotel: 1,
        // provinceSn: this.formData.provinceSn,
        // districtSn: this.formData.districtSn,
        keyword: keySearch
      })
    }, timeDebounce),
    searchSuggestionHashtag: debounce(function (keySearch) {
      this.fetchHashtags({
        limit: 10,
        keyword: keySearch
      })
    }, timeDebounce),
    async fetchHotelCollections (params) {
      this.ui.collectionsLoading = true
      try {
        const { data } = await fetchHotelCollections(params)
        this.hotelCollections = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.collectionsLoading = false
      }
    },
    async fetchHashtags (params) {
      this.ui.hashtagLoading = true
      try {
        const { data } = await fetchHashtags(params)
        this.suggestionHashtags = data.data.hashtag
      } catch (error) {
        return false
      } finally {
        this.ui.hashtagLoading = false
      }
    },
    async fetchSuggestionsHotels (params) {
      this.ui.suggestionsHotelsLoading = true
      try {
        const { data } = await fetchSuggestionsHotels(params)
        this.suggestionsHotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.suggestionsHotelsLoading = false
      }
    },
    onChangeProvince (provinceSn) {
      this.formData.districtSn = null
      this.fetchDistricts(provinceSn)
    },
    async fetchDistricts (provinceSn) {
      this.ui.districtsLoading = true
      try {
        const { data } = await fetchDistricts({ limit: 100, provinceSn: provinceSn })
        this.districts = [{ name: this.$t('page.settings.all'), sn: '', byDisable: true }, ...data.data.districts]
      } catch (error) {
        return false
      } finally {
        this.ui.districtsLoading = false
      }
    },
    async fetchProvinces () {
      try {
        this.ui.provincesLoading = true
        const { data } = await fetchProvinces({ limit: 100, status: 1 })
        this.provinces = [...this.provinces, ...data.data.provinces]
      } catch (error) {
        return false
      } finally {
        this.ui.provincesLoading = false
      }
    },
    async fetchHotelOnTopDetails () {
      this.ui.loadingDetails = true
      try {
        const { data } = await fetchHotelOnTopDetails(this.$route.params.sn)

        const hotelOnTopDetails = data.data?.hotelOnTopDetails.map(item => ({ ...item, dateTimePicker: [item.startDate, item.endDate] }))
        this.formData = data.data
        this.formData.hotelOnTopDetails = hotelOnTopDetails

        if (data.data?.type === 3) {
          this.fetchHotelCollections({ hotelCollectionSn: data.data?.hotelCollectionSn })
        } else if (data.data?.type === 1 || data.data?.type === 4) {
          await this.fetchDistricts(data.data?.provinceSn)
        } else if (data.data?.type === 2) {
          this.fetchHashtags({ keyword: this.formData.hashtagName })
          // this.formData.hashtagSn = data.data.hashtag
        }
      } catch (error) {
        return false
      } finally {
        this.ui.loadingDetails = false
      }
    },
    removeTopHotel (index) {
      this.formData.hotelOnTopDetails.splice(index, 1)
    },
    changeSuggestionHotel (value) {
      const data = JSON.parse(value)
      if (this.formData.type === 2) {
        if (this.formData.hotelOnTopDetails.length < 5 && data) {
          this.formData.hotelOnTopDetails.push({
            hotelName: data.name,
            address: data.address,
            hotelSn: data.sn,
            startDate: '',
            endDate: '',
            dateTimePicker: []
          })
        }
      } else if (this.formData.type === 3) {
        if (this.formData.hotelOnTopDetails.length < 20) {
          this.formData.hotelOnTopDetails.push({
            startDate: '',
            endDate: '',
            hotelSn: data.sn,
            hotelName: data.name,
            address: data.address,
            dateTimePicker: []
          })
        }
      } else if (this.formData.type === 4) {
        if (this.formData.hotelOnTopDetails.length < 6) {
          this.formData.hotelOnTopDetails.push({
            startDate: '',
            endDate: '',
            hotelSn: data.sn,
            hotelName: data.name,
            address: data.address,
            dateTimePicker: []
          })
        }
      } else {
        if (this.formData.hotelOnTopDetails.length < 10) {
          this.formData.hotelOnTopDetails.push({
            startDate: '',
            endDate: '',
            hotelSn: data.sn,
            hotelName: data.name,
            address: data.address,
            dateTimePicker: []
          })
        }
      }
    },
    isDisableHashtagEndDate (time) {
      if (!this.formData.startDate) {
        return time < (Date.now() - 8.64e7)
      }
      return time <= new Date(this.formData.startDate).getTime()
    },
    submitForm () {
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          scrollToTop('.el-form-item__error')
          return false
        }
        try {
          this.ui.isSubmiting = true
          if (this.formData.type === 2) {
            this.formData.startDate = this.formatDate(this.formData.startDate)
            this.formData.endDate = this.formatDate(this.formData.endDate)
          }
          this.formData.hotelOnTopDetails.map(item => {
            item.startDate = this.formatDate(item.dateTimePicker[0])
            item.endDate = this.formatDate(item.dateTimePicker[1])
          })
          this.formData = { ...this.formData, ...{ hashtagSn: this.formData.hashtag } }
          let data
          this.page === 'edit'
            ? data = await updateHotelOntop(this.$route.params.sn, this.formData)
            : data = await addHotelOnTop(this.formData)
          if (data.data?.code === 1) {
            const message = this.$t('message.updateSuccess')
            this.$message({
              type: 'success',
              message: message
            })
            this.$router.push({ name: 'hotelOnTop' })
          }
        } catch (error) {
          return false
        } finally {
          this.ui.isSubmiting = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.w-32 {
  width: 32.5%;
}
@media (max-width: 640px) {
  .w-100 {
    width: 100%;
  }
}
.hotel-on-top {
  :deep(.hotel-on-top__form) {
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
  &__item {
    display: flex;
    gap: 1em;
    @media (max-width: 640px) {
      display: inline-block;
      .el-date-editor {
        width: 100%;
      }
      &--flex {
        margin: 1em 0;
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
      width: 16em;
      height: 100px;
      object-fit: contain;
      border: 1px solid #DCDFE6;
      width: 100%;
      @media (min-width: 640px) {
        width: auto;
      }
    }
    .image-uploader {
      text-align: center;
    }
    &--margin {
      margin: 1em 0;
      @media (min-width: 640px) {
        margin: unset;
      }
    }
  }
  &__button {
    z-index: 1;
    display: flex;;
    justify-content: flex-end;
    @media (max-width: 640px) {
      position: fixed;
      bottom: 0;
      right: 0;
      background: white;
      width: 100%;
      padding-bottom: 1em;
      padding-right: 1em;
      button {
        margin-top: 1em;
      }
    }
  }
}
</style>
