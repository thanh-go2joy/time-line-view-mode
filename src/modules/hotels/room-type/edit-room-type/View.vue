<template>
    <!-- ----------------------------------------------------------------------------- -->
  <sa-section v-loading="ui.isLoading">
    <el-form :model="dataRoomType" :rules="rules" ref="ruleForm">
      <div class="room-type">

        <div class="room-type__row">
          <el-form-item :label="$t('page.editRoomType.hotel_name')">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item>
                  <el-input disabled :value="dataRoomType.hotelName" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <div class="room-type__row">
          <el-form-item :label="$t('page.editRoomType.name_short_name')" required>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
                <el-form-item prop="name">
                  <el-input :placeholder="$t('page.editRoomType.name_room')" v-model="dataRoomType.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item prop="shortName">
                  <el-input :placeholder="$t('page.editRoomType.short_name')" v-model="dataRoomType.shortName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <div class="room-type__row">
          <el-form-item :label="$t('page.editRoomType.room_type')">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item>
                  <el-input disabled :placeholder="$t('page.hotelDisplay.hotelName')" :value="$t('page.editRoomType.normal_room')" type="text"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <div class="room-type__row">
          <el-form-item :label="$t('page.editRoomType.num_of_room')" required>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item>
                  <el-input :placeholder="$t('page.editRoomType.num_of_room')" v-model="dataRoomType.numOfRoomHotel" type="text"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <div class="room-type__row">
          <el-form-item :label="$t('page.editRoomType.first_hours_price')" required>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="2">
                <el-form-item>
                  <el-select class="w-100" v-model="dataRoomType.firstHours" :placeholder="$t('page.editRoomType.first_hours_price')">
                      <el-option
                      v-for="item in selectNumHour"
                      :key="item.value"
                      :label="$t(item.name)"
                      :value="item.value">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="2" :lg="2" :xl="1" class="text-center">{{ $t('page.editRoomType.price') }}</el-col>
              <el-col :xs="24" :sm="24" :md="5" :lg="6" :xl="3">
                <el-form-item prop="firstHoursOrigin">
                  <el-input v-model="dataRoomType.firstHoursOrigin" :placeholder="$t('page.editRoomType.price')">
                    <i slot="suffix">VND</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="5" :lg="3" :xl="2" class="text-center">{{ $t('page.editRoomType.max_num_hour') }}</el-col>
              <el-col :xs="24" :sm="24" :md="4" :lg="2" :xl="2">
                <el-form-item>
                  <el-input v-model="dataRoomType.maxNumHour" :placeholder="$t('page.editRoomType.max_num_hour')">
                    <i slot="suffix">h</i>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <div class="room-type__row">
          <el-form-item :label="$t('page.editRoomType.plus_hours_price')">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="10" :lg="6" :xl="2">
                <el-form-item>
                  <el-select class="w-100" v-model="dataRoomType.additionalHours" :placeholder="$t('page.editRoomType.plus_hours_price')">
                    <el-option
                    v-for="item in selectNumHour"
                    :key="item.value"
                    :label="$t(item.name)"
                    :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="2" :lg="2" :xl="1" class="text-center">{{ $t('page.editRoomType.price') }}</el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="3">
                <el-form-item>
                  <el-input v-model="dataRoomType.additionalOrigin" :placeholder="$t('page.editRoomType.price')">
                    <i slot="suffix">VND</i>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <div class="room-type__row">
          <el-form-item :label="$t('page.editRoomType.overnight_price')">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="10" :lg="6" :xl="6">
                <el-form-item>
                  <el-input v-model="dataRoomType.overnightOrigin" :placeholder="$t('page.editRoomType.overnight_price')">
                    <i slot="suffix">VND</i>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <div class="room-type__row">
          <el-form-item :label="$t('page.editRoomType.one_day_price')">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="10" :lg="6" :xl="6">
                <el-form-item>
                  <el-input v-model="dataRoomType.oneDayOrigin" :placeholder="$t('page.editRoomType.one_day_price')">
                    <i slot="suffix">VND</i>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <div class="room-type__row">
          <el-form-item :label="$t('page.editRoomType.square_bed_type_view')">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="10" :lg="6" :xl="24">
                <el-form-item>
                  <el-input v-model="dataRoomType.square" :placeholder="$t('page.editRoomType.square_bed_type_view')">
                    <i slot="suffix">VND</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="14" :lg="18" :xl="24">
                <el-form-item>
                  <el-select class="w-100" v-model="dataRoomType.bedType">
                    <el-option
                    v-for="item in selectBedType"
                    :key="item.value"
                    :label="$t(item.name)"
                    :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item>
                  <el-select
                    class="w-100"
                    v-model="dataRoomType.views"
                    multiple
                    filterable
                    allow-create
                    default-first-option>
                    <el-option
                      v-for="(item, index) in viewOptions"
                      :key="index"
                      :label="$t(item.key)"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <div class="room-type__row">
          <el-form-item :label="$t('page.editRoomType.limit_number')">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="10" :lg="6" :xl="6">
                <el-form-item>
                  <el-input v-model="dataRoomType.maxBooking" :placeholder="$t('page.editRoomType.limit_number')">
                    <i slot="suffix">( 0 = {{ $t("page.editRoomType.no_limit") }} )</i>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <div class="room-type__row">
          <el-form-item :label="$t('page.editRoomType.memo')">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item>
                  <el-input type="textarea" :rows="5" v-model="dataRoomType.memo" :placeholder="$t('page.editRoomType.memo')"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <div class="room-type__row">
          <el-form-item :label="$t('page.editRoomType.bonus_hours')">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="6" :lg="4" :xl="3" class="text-position">{{ $t('page.editRoomType.min_booking_hours') }}</el-col>
              <el-col :xs="24" :sm="24" :md="6" :lg="4" :xl="2">
                <el-form-item>
                  <el-select class="w-100" v-model="dataRoomType.minProHour" :placeholder="$t('page.editRoomType.bonus_hours')">
                      <el-option
                      v-for="(item, index) in 7"
                      :key="index"
                      :label="index"
                      :value="index">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="6" :lg="4" :xl="3" class="text-position">{{ $t('page.editRoomType.num_of_bonus_hours') }}</el-col>
              <el-col :xs="24" :sm="24" :md="6" :lg="4" :xl="2">
                <el-form-item>
                  <el-select class="w-100" v-model="dataRoomType.bonusHour" :placeholder="$t('page.editRoomType.num_of_bonus_hours')">
                      <el-option
                      v-for="(item, index) in 6"
                      :key="index"
                      :label="index"
                      :value="index">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="6" :lg="3" :xl="2" class="text-position">{{ $t('page.editRoomType.to_date') }}</el-col>
              <el-col :xs="24" :sm="24" :md="6" :lg="5" :xl="3">
                <el-form-item prop="firstHoursOrigin">
                  <el-date-picker
                    class="w-100"
                    v-model="dataRoomType.endProDate"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <div class="room-type__row">
          <el-form-item :label="$t('page.editRoomType.gift_from_hotel')">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="2" :lg="2" :xl="2">
                <el-form-item>
                  <el-checkbox
                    :true-label="1"
                    :false-label="0"
                    v-model="dataRoomType.hasGift"
                  />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="4" :lg="2" :xl="2" class="text-position">{{ $t('page.editRoomType.gift_desc') }}</el-col>
              <el-col :xs="24" :sm="24" :md="18" :lg="20" :xl="20">
                <el-form-item prop="firstHoursOrigin">
                  <el-input
                    :placeholder="$t('page.editRoomType.gift_desc')"
                    type="text"
                    v-model="dataRoomType.giftDescription"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <div class="room-type__row">
          <el-form-item :label="$t('page.editRoomType.facilities')">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item>
                  <el-select
                    :loading="ui.isLoadingFacilities"
                    class="w-100"
                    v-model="dataRoomType.facilities"
                    multiple
                    filterable
                    :remote-method="reloadFilterDataFacility"
                    remote
                    allow-create
                    default-first-option>
                    <el-option
                      v-for="item in optionFacilities"
                      :key="item.sn"
                      :label="item.name"
                      :value="item.sn">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <div class="room-type__image">
          <image-uploader-group
            :preview="false"
            :className="['fileinput', { 'fileinput--loaded': hasImage }]"
            capture="environment"
            :debug="1"
            doNotResize="gif"
            :autoRotate="true"
            outputFormat="verbose"
            :maxLoop="form.images"
            @input="setImage"
            @result="resultThumbnail"
            @checkboxItem="checkboxItem"
            @removeItem="removeItem"
          >
            <label slot="upload-label"></label>
          </image-uploader-group>
        </div>

        <div class="room-type__button">
          <el-button type="info" size="large" @click="$router.go(-1)">
              {{ $t('button.back')}}
          </el-button>
          <el-button type="success" :loading="ui.isSubmiting" size="large" @click="preHandleBeforeSubmit">
              {{ $t('button.edit')}}
          </el-button>
        </div>
      </div>
    </el-form>
  </sa-section>
    <!-- -------------------------------------------------------------------------------------- -->
</template>
<script>
import { listFacilities, getRoomType } from '@/api/roomType'
import { onEditRoomType } from './api'
import { debounce, scrollToTop } from '@/utils/helpers'
import saSection from '@/components/globals/SaSection.vue'
import { uploadFileZip } from '@/api/uploadFileZip'
import ImageUploaderGroup from '@/components/globals/clipper-fixed/ImageUploaderGroup.vue'
import { repStatus, viewOptions } from '@/utils/const'
const timeDebounce = 500

export default {
  name: 'CreateRoomType',
  components: {
    saSection,
    ImageUploaderGroup
  },
  data () {
    return {
      dataRoomType: {},
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
      viewOptions: viewOptions,
      selectNumHour: [
        { name: '1', value: 1 },
        { name: '2', value: 2 },
        { name: '3', value: 3 },
        { name: '4', value: 4 },
        { name: '5', value: 5 }
      ],
      sn: this.$route.params.sn ? Number(this.$route.params.sn) : '',
      hotelSn: this.$route.query.hotelSn ? Number(this.$route.query.hotelSn) : '',
      optionFacilities: [],
      addFacilities: [],
      imageGift: '',
      flagGift: 5,
      fileGift: '',
      ui: {
        isLoading: false,
        isLoadingFacilities: false,
        isLoadingHotels: false,
        isSubmiting: false
      },
      form: {
        images: [
          { src: '', is360: false, no: 0, typeImage: 2, width: 400, height: 400, label: '(50x50)' }, // 50x50 -  0: Hình + (index), 1: Hình hiển thị, 2: Ảnh quà tặng
          { src: '', is360: false, no: 0, typeImage: 1, width: 685, height: 465, label: '(1370x930)' }, // 1370x930
          { src: '', is360: false, no: 1, typeImage: 0, width: 685, height: 465, label: '(1370x930)' }, // 1370x930
          { src: '', is360: false, no: 2, typeImage: 0, width: 685, height: 465, label: '(1370x930)' }, // 1370x930
          { src: '', is360: false, no: 3, typeImage: 0, width: 685, height: 465, label: '(1370x930)' }, // 1370x930
          { src: '', is360: false, no: 4, typeImage: 0, width: 685, height: 465, label: '(1370x930)' }, // 1370x930
          { src: '', is360: false, no: 5, typeImage: 0, width: 685, height: 465, label: '(1370x930)' }, // 1370x930
          { src: '', is360: false, no: 6, typeImage: 0, width: 685, height: 465, label: '(1370x930)' }, // 1370x930
          { src: '', is360: false, no: 7, typeImage: 0, width: 685, height: 465, label: '(1370x930)' }, // 1370x930
          { src: '', is360: false, no: 8, typeImage: 0, width: 685, height: 465, label: '(1370x930)' }, // 1370x930
          { src: '', is360: false, no: 9, typeImage: 0, width: 685, height: 465, label: '(1370x930)' }, // 1370x930
          { src: '', is360: false, no: 10, typeImage: 0, width: 685, height: 465, label: '(1370x930)' }, // 1370x930
          { src: '', is360: false, no: 11, typeImage: 0, width: 685, height: 465, label: '(1370x930)' } // 1370x930
        ]
      },
      srcImage: '',
      hasImage: ''
    }
  },
  computed: {
    selectBedType () {
      return [
        { name: this.$t('page.editRoomType.not_select'), value: 0 },
        { name: this.$t('page.editRoomType.single'), value: 1 },
        { name: this.$t('page.editRoomType.double'), value: 2 },
        { name: this.$t('page.editRoomType.twin'), value: 3 },
        { name: this.$t('page.editRoomType.triple'), value: 4 },
        { name: this.$t('page.editRoomType._2double'), value: 5 }
      ]
    },
    rules () {
      return {
        name: [
          {
            required: true,
            message: this.$t('validation.required'),
            trigger: 'blur'
          }
        ],
        shortName: [
          {
            required: true,
            message: this.$t('validation.required'),
            trigger: 'blur'
          }
        ],
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
    this.getFacilities()
    this.getRoomType()
  },
  methods: {
    checkboxItem (index) {},
    removeItem (index) {
      this.form.images.splice(index, 1)
    },
    setImage (file, index) {
      this.imageIndex = index
    },
    resultThumbnail (result, index) {
      this.form.fileName = result.name
      this.image = result
      this.form.images[this.imageIndex].src = URL.createObjectURL(result)
      this.srcImage = URL.createObjectURL(result)
    },

    async uploadFileZip (preSigned, filePath) {
      try {
        await uploadFileZip(preSigned, filePath)
        const message = this.$t('message.createSuccess')
        this.$message({
          type: 'success',
          message: message
        })
        this.$router.go(-1)
      } catch (error) {
        return false
      } finally {}
    },

    /** ************************************************** */
    preHandleBeforeSubmit () {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          scrollToTop('.el-form-item__error')
          return false
        }
        this.submit()
      })
    },

    async submit () {
      this.ui.isSubmiting = true
      try {
        const formData = new FormData()
        formData.append('hotelSn', this.hotelSn ? this.hotelSn : this.dataRoomType.hotelSn)
        formData.append('name', this.dataRoomType.name)
        formData.append('shortName', this.dataRoomType.shortName)
        formData.append('mode', this.dataRoomType.mode)
        formData.append('numOfRoomHotel', this.dataRoomType.numOfRoomHotel)
        formData.append('giftDescription', this.dataRoomType.giftDescription ? this.dataRoomType.giftDescription : '')
        formData.append('firstHours', this.dataRoomType.firstHours)
        formData.append('firstHoursOrigin', this.dataRoomType.firstHoursOrigin)
        formData.append('maxNumHour', this.dataRoomType.maxNumHour)
        formData.append('additionalHours', this.dataRoomType.additionalHours)
        formData.append('additionalOrigin', this.dataRoomType.additionalOrigin)
        formData.append('overnightOrigin', this.dataRoomType.overnightOrigin)
        formData.append('oneDayOrigin', this.dataRoomType.oneDayOrigin)
        formData.append('square', this.dataRoomType.square)
        formData.append('bedType', this.dataRoomType.bedType)
        this.dataRoomType.views.forEach((sn, index) => {
          formData.append(`roomViews[${index}][sn]`, sn)
        })
        this.addFacilities.forEach((obj, index) => {
          formData.append(`facilities[${index}]`, obj)
        })
        formData.append('maxBooking', this.dataRoomType.maxBooking)
        formData.append('memo', this.dataRoomType.memo)
        formData.append('minProHour', this.dataRoomType.minProHour)
        formData.append('bonusHour', this.dataRoomType.bonusHour)
        if (this.dataRoomType.hasGift === true || this.dataRoomType.minProHour > 0 || this.dataRoomType.bonusHour > 0) {
          formData.append('endProDate', this.dataRoomType.endProDate)
        }
        formData.append('hasGift', this.dataRoomType.hasGift === true ? 1 : 0)
        if (this.flagGift !== 5) {
          formData.append('giftImage[file]', this.fileGift)
          formData.append('giftImage[flag]', this.flagGift)
          if (this.dataRoomType && this.dataRoomType.giftImages && this.dataRoomType.giftImages.sn) {
            formData.append('giftImage[sn]', this.dataRoomType.giftImages.sn)
          }
        }
        const formImagesHasImg = this.formImages.filter(function (person) {
          return person.src !== ''
        })
        formImagesHasImg.forEach((obj, index) => {
          (obj.flag !== 2) && formData.append(`images[${index}][sn]`, obj.sn)
          formData.append(`images[${index}][firstDisplay]`, obj.firstDisplay)
          formData.append(`images[${index}][file]`, obj.file)
          formData.append(`images[${index}][flag]`, obj.flag)
          formData.append(`images[${index}][type]`, obj.is360 === true ? 2 : 1)
        })
        const { data } = await onEditRoomType(this.sn, formData)

        if (data?.code === repStatus.sussess) {
          this.$router.push({
            name: 'roomType',
            query: {
              sn: this.hotelSn
            }
          })
          this.$message({
            type: 'success',
            message: `${this.$t('message.success')}`
          })
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isSubmiting = false
      }
    },

    async getFacilities (keyword) {
      this.ui.isLoadingFacilities = true
      try {
        const params = {
          limit: 100,
          keyword: keyword
        }
        const { data } = await listFacilities(params)
        this.optionFacilities = data?.data?.facilities
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingFacilities = false
      }
    },
    reloadFilterDataFacility: debounce(function (keyword) {
      this.getFacilities(keyword)
    }, timeDebounce),

    async getRoomType () {
      this.ui.isLoading = true
      try {
        const { data } = await getRoomType(this.sn)
        if (data.data) {
          this.dataRoomType = data.data
          this.dataRoomType.preFirstHoursOrigin = this.dataRoomType.firstHoursOrigin
          this.dataRoomType.preAdditionalOrigin = this.dataRoomType.additionalOrigin
          this.dataRoomType.preOvernightOrigin = this.dataRoomType.overnightOrigin
          this.dataRoomType.preOneDayOrigin = this.dataRoomType.oneDayOrigin
          this.dataRoomType.preSquare = this.dataRoomType.square
          if (this.dataRoomType && this.dataRoomType.giftImages) {
            this.imageGift = this.formatImage(
              this.dataRoomType.giftImages.imagePath
            )
          }
          if (this.dataRoomType && this.dataRoomType.roomTypeImages.length > 0) {
            this.dataRoomType.roomTypeImages.forEach((obj, index) => {
              this.formImages[index].firstDisplay = obj.firstDisplay
              this.formImages[index].sn = obj.sn
              this.formImages[index].src = this.formatImage(obj.imagePath)
              this.formImages[index].is360 = obj.type
              this.formImages[index].flag = 4 // 4:skip,3:update,2:create,1:delete. Default 4
            })
          }
          this.dataRoomType.views = this.dataRoomType.views.map((item) => item.sn)
          this.dataRoomType.facilities = this.dataRoomType.facilities.map((item) => item.sn)
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },

    onInputPrice (price) {
      switch (price) {
        case 'first':
          if (this.firstHoursOrigin) this.firstHoursOrigin = 0
          break
        case 'plus':
          if (this.additionalOrigin) this.additionalOrigin = 0
          break
        case 'overnight':
          if (this.overnightOrigin) this.overnightOrigin = 0
          break
        case 'oneDay':
          if (this.oneDayOrigin) this.oneDayOrigin = 0
          break
        case 'square':
          if (this.square) this.square = 0
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.room-type {
  &__row {
    :deep(.el-form-item) {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      flex-wrap: wrap;
      @media (max-width: 768px) {
        display: block;
      }
    }
    :deep(.el-form-item__label) {
      text-align: left;
      flex: 3;
    }
    :deep(.el-form-item__content) {
      flex: 12;
    }
    :deep(.el-form-item__error) {
      position: unset;
    }
  }

  &__image {
    :deep(.image-uploader__content) {
      margin-left: 0.5vw;
    }
  }

  &__button {
    z-index: 100;
    display: flex;
    justify-content: flex-end;

    position: fixed;
    bottom: 0;
    right: 0;
    background: white;
    width: 100%;
    padding-bottom: 1vh;
    padding-right: 1vh;

    button {
      margin-top: 1vh;
    }
  }
}
.text-position {
  text-align: left;
}
.el-col {
  padding: unset;
}
.el-form-item {
  margin-bottom: 1vh;
}
.w-100 {
  width: 100%;
}
</style>
