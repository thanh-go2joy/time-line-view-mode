<template>
    <div class="create-room-type">
      <sa-section v-loading="ui.isLoading">
        <el-form
          :model="dataRoomType"
          :rules="rules"
          ref="ruleForm"
          label-position="left"
          label-width="20%"
          hide-required-asterisk
          class="promotion-create__content"
        >
          <el-form-item :label="$t('page.editRoomType.hotel_name')">
            <div>
              <el-select
                v-model="sn"
                element-loading-spinner="el-icon-loading"
                :placeholder="$t('page.collection.hotelSuggestion')"
                remote
                filterable
                :remote-method="reloadFilterData"
                style="min-width: 250px; margin-right: 12px"
                prefix-icon="el-icon-search"
                clearable
              >
                <el-option
                  v-for="(item, index) in hotels"
                  :key="index"
                  :label="`${item.name}`"
                  :value="item.sn"
                  style="font-size: 13px; color: #4a5d6e;"
                />
              </el-select>
            </div>
          </el-form-item>
          <el-form-item :label="$t('page.editRoomType.name')">
              <div>
                <el-row>
                  <el-col :span="19" class="padding-none">
                    <el-input
                      :placeholder="$t('page.createRoomType.name_short_name')"
                      type="text"
                      v-model="dataRoomType.name"
                    />
                  </el-col>
                  <el-col :span="4" class="padding-none ml-12">
                    <el-input
                      :placeholder="$t('page.createRoomType.short_name')"
                      type="text"
                      v-model="dataRoomType.shortName"
                    />
                  </el-col>
                </el-row>
            </div>
          </el-form-item>
          <el-form-item :label="$t('page.editRoomType.room_type')">
            <div>
              <el-row>
                <el-col :span="4" class="padding-none">
                  <el-select
                    v-model="dataRoomType.mode"
                    element-loading-spinner="el-icon-loading"
                    :placeholder="$t('page.collection.hotelSuggestion')"
                    remote
                    style="min-width: 250px; margin-right: 12px"
                    prefix-icon="el-icon-search"
                    clearable
                  >
                    <el-option
                      v-for="(item, index) in selectRoomType"
                      :key="index"
                      :label="`${$t(item.key)}`"
                      :value="item.value"
                      style="font-size: 13px; color: #4a5d6e;"
                    />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <el-form-item :label="$t('page.editRoomType.num_of_room')">
              <div>
                <el-row>
                  <el-col :span="4" class="padding-none">
                    <el-input
                      :placeholder="$t('page.createRoomType.num_of_room')"
                      name="numOfRoomHotel"
                      type="text"
                      v-model="dataRoomType.numOfRoomHotel"
                    />
                  </el-col>
                </el-row>
            </div>
          </el-form-item>
          <el-form-item :label="$t('page.editRoomType.first_hours_price')">
              <div>
                <el-row>
                  <el-col :span="6" class="padding-none">
                    <el-form-item :label="$t('page.editRoomType.num_of_hours')" label-width="120px">
                      <el-select
                        v-model="dataRoomType.firstHours"
                        element-loading-spinner="el-icon-loading"
                        :placeholder="$t('page.collection.hotelSuggestion')"
                        remote
                        prefix-icon="el-icon-search"
                        clearable
                      >
                        <el-option
                          v-for="(item, index) in selectNumHour"
                          :key="index"
                          :label="`${item.name}`"
                          :value="item.value"
                          style="font-size: 13px; color: #4a5d6e;"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" class="padding-none">
                    <el-form-item :label="$t('page.editRoomType.price')" class="ml-12" prop="firstHoursOrigin">
                      <el-input
                        type="text"
                        name="firstHoursOrigin"
                        v-model="dataRoomType.firstHoursOrigin"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" class="padding-none">
                    <el-form-item :label="$t('page.editRoomType.max_num_hour')" class="ml-12" label-width="120px">
                      <el-input class="w-120" type="text" v-model="dataRoomType.maxNumHour" />
                      <span><strong>h</strong></span>
                    </el-form-item>
                  </el-col>
                </el-row>
            </div>
          </el-form-item>
          <el-form-item :label="$t('page.editRoomType.plus_hours_price')">
              <div>
                <el-row>
                  <el-col :span="6" class="padding-none">
                    <el-form-item :label="$t('page.editRoomType.num_of_hours')" label-width="120px">
                      <el-select
                        v-model="dataRoomType.additionalHours"
                        element-loading-spinner="el-icon-loading"
                        :placeholder="$t('page.collection.hotelSuggestion')"
                        remote
                        prefix-icon="el-icon-search"
                        clearable
                      >
                        <el-option
                          v-for="(item, index) in selectNumHour"
                          :key="index"
                          :label="`${item.name}`"
                          :value="item.value"
                          style="font-size: 13px; color: #4a5d6e;"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" class="padding-none">
                    <el-form-item :label="$t('page.editRoomType.price')" class="ml-12" prop="additionalOrigin">
                      <el-input
                        type="text"
                        v-model="dataRoomType.additionalOrigin"
                        @change="onInputPrice('plus')"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
            </div>
          </el-form-item>
          <el-form-item :label="$t('page.editRoomType.overnight_price')" prop="overnightOrigin">
              <div>
                <el-input
                  :placeholder="$t('page.createRoomType.overnight_price')"
                  type="text"
                  v-model="dataRoomType.overnightOrigin"
                  @change="onInputPrice('overnight')"
                />
            </div>
          </el-form-item>
          <el-form-item :label="$t('page.editRoomType.one_day_price')" prop="oneDayOrigin">
              <div>
                <el-input
                  :placeholder="$t('page.createRoomType.one_day_price')"
                  type="text"
                  v-model="dataRoomType.oneDayOrigin"
                  @change="onInputPrice('oneDay')"
                />
            </div>
          </el-form-item>
          <el-form-item :label="$t('page.editRoomType.square_bed_type_view')">
              <div>
                <el-row>
                  <el-col :span="4" class="padding-none">
                    <el-input
                      :placeholder="$t('page.createRoomType.square_bed_type_view')"
                      type="text"
                      v-model="dataRoomType.square"
                      @change="onInputPrice('square')"
                    />
                  </el-col>
                  <el-col :span="5" class="padding-none">
                    <span class="ml-12">
                      <strong>m</strong><sup>2</sup>
                    </span>
                    <el-select
                      v-model="dataRoomType.bedType"
                      element-loading-spinner="el-icon-loading"
                      :placeholder="$t('page.collection.hotelSuggestion')"
                      remote
                      style="width: 180px; margin-right: 12px"
                      class="ml-12"
                      prefix-icon="el-icon-search"
                      clearable
                    >
                      <el-option
                        v-for="(item, index) in selectBedType"
                        :key="index"
                        :label="`${$t(item.name)}`"
                        :value="item.value"
                        style="font-size: 13px; color: #4a5d6e;"
                      />
                    </el-select>
                  </el-col>
                  <el-col :span="15" class="padding-none">
                    <el-select
                      v-model="arrArticle"
                      multiple
                      filterable
                      allow-create
                      default-first-option
                      placeholder="Choose tags for your article"
                      class="custom-multi-select">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.name"
                        :value="item.sn">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
            </div>
          </el-form-item>
          <el-form-item :label="$t('page.editRoomType.limit_number')">
            <div>
              <el-row>
                <el-col :span="4" class="padding-none">
                  <el-input
                    :placeholder=" $t('page.createRoomType.limit_number' )"
                    type="text"
                    v-model="dataRoomType.maxBooking"
                  />
                </el-col>
                <span class="ml-12">(0 = {{ $t("page.editRoomType.no_limit") }})</span>
              </el-row>
            </div>
          </el-form-item>
          <el-form-item :label="$t('page.editRoomType.memo')">
            <div>
              <el-input type="textarea" :rows="5" v-model="dataRoomType.memo" />
            </div>
          </el-form-item>
          <!-- <el-form-item :label="$t('page.editRoomType.bonus_hours')">
            <div>
              <el-row>
                <el-col :span="4" class="padding-none">
                  <el-select
                    v-model="dataRoomType.minProHour"
                    element-loading-spinner="el-icon-loading"
                    :placeholder="$t('page.collection.hotelSuggestion')"
                    remote
                    style="min-width: 120px; margin-right: 12px"
                    prefix-icon="el-icon-search"
                    clearable
                  >
                    <el-option
                      v-for="(item, index) in 7"
                      :key="index"
                      :label="index"
                      :value="index"
                      style="font-size: 13px; color: #4a5d6e;"
                    />
                  </el-select>
                </el-col>
                <el-col :span="8" class="padding-none">
                  <el-form-item :label="$t('page.editRoomType.num_of_bonus_hours')" class="ml-12" label-width="145px">
                    <el-select
                      v-model="dataRoomType.bonusHour"
                      element-loading-spinner="el-icon-loading"
                      :placeholder="$t('page.collection.hotelSuggestion')"
                      remote
                      prefix-icon="el-icon-search"
                      style="display: block"
                      clearable
                    >
                      <el-option
                        v-for="(item, index) in 6"
                        :key="index"
                        :label="index"
                        :value="index"
                        style="font-size: 13px; color: #4a5d6e;"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8" class="padding-none">
                  <el-form-item :label="$t('page.editRoomType.to_date')" class="ml-12">
                      <el-date-picker
                        v-model="dataRoomType.endProDate"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                      />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <el-form-item :label="$t('page.editRoomType.gift_from_hotel')">
            <div>
              <el-row>
                <el-col :span="4" class="padding-none">
                  <el-checkbox
                    :true-label="1"
                    :false-label="0"
                    v-model="dataRoomType.hasGift"
                  />
                </el-col>
                <el-col :span="8" class="padding-none">
                  <el-form-item :label="$t('page.editRoomType.gift_desc')" class="ml-12" label-width="145px">
                    <el-input
                      :placeholder="$t('page.editRoomType.gift_desc')"
                      type="text"
                      v-model="dataRoomType.giftDescription"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form-item> -->
          <el-form-item :label="$t('page.editRoomType.facilities')">
            <div>
              <el-select
                v-model="valFacilities"
                element-loading-spinner="el-icon-loading"
                :placeholder="$t('page.collection.hotelSuggestion')"
                filterable
                :remote-method="reloadFilterDataFaciliti"
                remote
                style="min-width: 250px; margin-right: 12px"
                prefix-icon="el-icon-search"
                clearable
                @input="onAddFacility"
              >
                <el-option
                  v-for="(item, index) in optionFacilities"
                  :key="index"
                  :label="`${$t(item.name)}`"
                  :value="item"
                  style="font-size: 13px; color: #4a5d6e;"
                />
              </el-select>
            </div>
          </el-form-item>
          <el-form-item >
            <div>
              <el-tag
                style="margin-left: 15px;"
                v-for="(item, index) in arrFacilities"
                :key="index"
                closable
                @close="handleCloseFacilities(item)"
                type="success">
                {{item}}
              </el-tag>
            </div>
          </el-form-item>
          <el-form-item
            v-for="(formImage, index) in formImages"
            :key="index"
            label="temp"
          >
            <span slot="label">{{ index === 0 ? $t("page.editRoomType.home_image") : $t("page.editRoomType.image") + index }} </span>
            <div>
              <el-row>
                <el-col :span="5" class="padding-none">
                  <div id="preview">
                    <img :src="formImage.src" />
                  </div>
                </el-col>
                <el-col :span="4" class="padding-none ml-12">
                    <label class="custom-file-upload">
                    <i class="fa fa-upload"></i>
                    {{ $t("button.chooseFile") }}
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      id="file_detail_gift"
                      ref="file_detail_gift"
                      @change="handleFileUploadImage(formImage, $event)"
                    />
                  </label>
                </el-col>
                <el-col
                  :span="4"
                  style="float:left"
                  v-if="index != 0"
                >
                  <el-checkbox
                    v-model="formImage.is360"
                    :true-label="2"
                  >
                  {{ $t("page.editRoomType._360image") }}</el-checkbox>
                </el-col>
                <el-col
                  :span="4"
                  style="float:left"
                  v-if="formImage.src !== '' || formImage.file !== ''"
                >
                  <el-button
                    type="danger"
                    @click="onDeleteImage(formImage, $event)"
                    size="medium"
                  >
                    {{ $t("button.delete") }}
                  </el-button >
                </el-col>
              </el-row>
            </div>
          </el-form-item>
        </el-form>
        <div class="right-content">
          <el-button
            type="info"
            size="large"
            @click="$router.push({
              name: 'roomType',
              query: {sn: sn}
            })"
          >
            {{ $t("button.back") }}
          </el-button>
          <el-button
            type="success"
            size="large"
            @click="onCreateRoomType"
            :class="isDisable == true ? 'disabled' : ' '"
          >
            <i v-if="isDisable == false" class="feather icon-save mr-2" />
            <i v-if="isDisable == true" class="el-icon-loading"></i>
            {{ $t("button.create") }}
          </el-button>
        </div>
      </sa-section>
    </div>
</template>
<script>
import { listHotels } from '@/api/hotels'
import { listFacilities } from '@/api/roomType'
import { onCreateRoomType } from './api'
import saSection from '@/components/globals/SaSection.vue'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500

export default {
  name: 'CreateRoomType',
  components: {
    saSection
  },
  data () {
    return {
      hotels: [],
      dataRoomType: {
        shortName: '',
        name: '',
        hotelName: '',
        numNotConfirmed: 0,
        priceOneDay: 0,
        priceOvernight: 0,
        priceFirstHours: 0,
        firstHours: 1,
        priceAdditionalHours: 0,
        additionalHours: 1,
        bookCount: 0,
        numOfRoom: 0,
        memo: '',
        mode: 1,
        square: 0,
        bedType: 0,
        status: 0,
        countExifImage: 0,
        maxBooking: 0,
        overnightOrigin: 0,
        oneDayOrigin: 0,
        firstHoursOrigin: 0,
        additionalOrigin: 0,
        extraFee: 0,
        applyExtraFee: 0,
        startDateExtraFee: null,
        endDateExtraFee: null,
        specialDateExtraFee: null,
        maxNumHour: 0,
        hotels: [],
        numOfRoomHotel: 0
      },
      formImages: [
        { file: '', src: '', is360: false, firstDisplay: 1, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 }
      ],
      options: [
        {
          name: 'Cửa Sổ | Window',
          sn: 1
        },
        {
          name: 'Ban Công | Balcony',
          sn: 2
        },
        {
          name: 'Thành Phố | City',
          sn: 3
        },
        {
          name: 'Sân Vườn | Garden',
          sn: 4
        },
        {
          name: 'Hồ Bơi | Pool',
          sn: 5
        },
        {
          name: 'Không Có | No view',
          sn: 6
        }
      ],
      arrArticle: [],
      selectRoomType: [
        { key: 'page.createRoomType.normal_room', value: 1 }
      ],
      selectNumHour: [
        { name: '1', value: 1 },
        { name: '2', value: 2 },
        { name: '3', value: 3 },
        { name: '4', value: 4 },
        { name: '5', value: 5 }
      ],
      sn: this.$route.query.sn ? Number(this.$route.query.sn) : '',
      isDisable: false,
      optionFacilities: [],
      valFacilities: {},
      arrFacilities: [],
      ui: {
        isLoading: false
      }
    }
  },
  computed: {
    selectBedType () {
      return [
        { name: this.$t('page.createRoomType.not_select'), value: 0 },
        { name: this.$t('page.createRoomType.single'), value: 1 },
        { name: this.$t('page.createRoomType.double'), value: 2 },
        { name: this.$t('page.createRoomType.twin'), value: 3 },
        { name: this.$t('page.createRoomType.triple'), value: 4 },
        { name: this.$t('page.createRoomType._2double'), value: 5 }
      ]
    },
    rules () {
      return {
        firstHoursOrigin: [
          {
            required: true,
            message: this.$t('validation.required'),
            trigger: 'blur'
          }
        ],
        additionalOrigin: [
          {
            required: true,
            message: this.$t('validation.required'),
            trigger: 'blur'
          }
        ],
        overnightOrigin: [
          {
            required: true,
            message: this.$t('validation.required'),
            trigger: 'blur'
          }
        ],
        oneDayOrigin: [
          {
            required: true,
            message: this.$t('validation.required'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  async created () {
    this.listHotel()
    this.getFacilities()
  },
  mounted () {},
  methods: {
    async onCreateRoomType () {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.ui.isLoading = true
          try {
            const formData = new FormData()
            formData.append('hotelSn', this.sn)
            formData.append('name', this.dataRoomType.name)
            formData.append('shortName', this.dataRoomType.shortName)
            formData.append('mode', this.dataRoomType.mode)
            formData.append('numOfRoomHotel', this.dataRoomType.numOfRoomHotel)
            formData.append('firstHours', this.dataRoomType.firstHours)
            formData.append('firstHoursOrigin', this.dataRoomType.firstHoursOrigin)
            formData.append('maxNumHour', this.dataRoomType.maxNumHour)
            formData.append('additionalHours', this.dataRoomType.additionalHours)
            formData.append('additionalOrigin', this.dataRoomType.additionalOrigin)
            formData.append('overnightOrigin', this.dataRoomType.overnightOrigin)
            formData.append('oneDayOrigin', this.dataRoomType.oneDayOrigin)
            formData.append('square', this.dataRoomType.square)
            formData.append('bedType', this.dataRoomType.bedType)
            this.arrArticle.forEach((sn, index) => {
              formData.append(`roomViews[${index}][sn]`, sn)
            })
            this.arrFacilities.forEach((obj, index) => {
              formData.append(`facilities[${index}]`, obj)
            })
            formData.append('memo', this.dataRoomType.memo)
            formData.append('maxBooking', this.dataRoomType.maxBooking)
            const formImagesHasImg = this.formImages.filter(function (person) {
              return person.src !== ''
            })
            formImagesHasImg.forEach((obj, index) => {
              if (index === 0) {
                formData.append(`images[${index}][firstDisplay]`, 1)
              } else {
                formData.append(`images[${index}][firstDisplay]`, 0)
              }
              formData.append(`images[${index}][file]`, obj.file)
              formData.append(`images[${index}][flag]`, 2)
              formData.append(`images[${index}][type]`, obj.is360 === true ? 2 : 1)
            })
            await onCreateRoomType(formData)
            this.isDisable = false
            this.$router.push({
              name: 'roomType',
              query: { sn: this.sn }
            })
            this.$message({
              type: 'success',
              message: `${this.$t('message.success')}`
            })
          } catch (error) {
            this.ui.isLoading = false
            return false
          }
        } else {
          this.ui.isLoading = false
          this.scrollToTop()
        }
      })
    },
    async getFacilities (keyword) {
      try {
        const params = {
          limit: 100
        }
        if (keyword) {
          params.keyword = keyword
        }
        this.optionFacilities = []
        const { data } = await listFacilities(params)
        const self = this
        const facilities = data.data
        if (facilities && facilities.meta.total > 0) {
          facilities.facilities.map(function (currentValue) {
            self.optionFacilities.push({
              name: currentValue.name,
              value: currentValue.sn
            })
          })
        }
      } catch (error) {
        return false
      }
    },

    reloadFilterDataFaciliti: debounce(function (keyword) {
      this.getFacilities(keyword)
    }, timeDebounce),

    async listHotel (keyword) {
      try {
        const params = {}
        if (this.sn !== ' ' && !keyword) {
          params.hotelSn = this.sn
        } else if (keyword) {
          params.keyword = keyword
        }
        this.hotels = []
        const { data } = await listHotels(params)
        if (data.data.hotels && data.data.hotels.length > 0) {
          this.hotels = data.data.hotels
        }
      } catch (error) {
        return false
      }
    },
    reloadFilterData: debounce(function (keyword) {
      this.listHotel(keyword)
    }, timeDebounce),

    onInputPrice (price) {
      switch (price) {
        case 'first':
          if (this.firstHoursOrigin < 0) this.firstHoursOrigin = 0
          break
        case 'plus':
          if (this.additionalOrigin < 0) this.additionalOrigin = 0
          break
        case 'overnight':
          if (this.overnightOrigin < 0) this.overnightOrigin = 0
          break
        case 'oneDay':
          if (this.oneDayOrigin < 0) this.oneDayOrigin = 0
          break
        case 'square':
          if (this.square < 0) this.square = 0
          break
      }
    },
    onAddFacility () {
      let status = 0
      let arrFaci = ''
      if (this.valFacilities) {
        arrFaci = this.valFacilities.name
        if (this.arrFacilities.length > 0) {
          this.arrFacilities.forEach(element => {
            if (arrFaci === element) {
              status = 1
            }
          })
        }
        if (status === 0) {
          this.arrFacilities.push(arrFaci)
        }
      }
      this.valFacilities = ''
    },
    handleCloseFacilities (item) {
      this.arrFacilities.splice(this.arrFacilities.indexOf(item), 1)
    },
    handleFileUploadImage (formImage, e) {
      formImage.file = e.target.files[0]
      formImage.src = URL.createObjectURL(e.target.files[0])
    },
    onDeleteImage (formImage, e) {
      formImage.src = ''
      formImage.file = ''
    },
    scrollToTop () {
      setTimeout(() => {
        var el = this.$el.querySelector('.el-form-item__error') // get error filter
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 300) // scroll to error filter
    }
  }
}
</script>
<style lang="scss" scoped>
  .right-content{
    text-align: right;
    margin-top: 12px;
  }
  .custom-multi-select{
    display: block;
    margin-left: 8px;
    .el-select__tags{
      max-width: unset;
    }
  }
  .ml-12 {
    margin-left: 12px;
  }
  .w-120 {
    width: 120px; margin-right: 12px
  }
</style>
