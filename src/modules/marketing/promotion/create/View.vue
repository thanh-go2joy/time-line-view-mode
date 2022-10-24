<template>
  <sa-section v-loading="ui.isCallApi">
    <el-form
      :model="{ ...promotion, ...promotionImage}"
      :rules="rules"
      ref="ruleForm"
      label-position="left"
      label-width="20%"
      hide-required-asterisk
      class="promotion-create__content"
    >
      <el-form-item
        :label="$t('page.create-promotion.promotionGroup')"
      >
        <div>
          <el-select
            :loading="ui.isFilterLoading"
            v-model="ui.promotions"
            value-key="sn"
            element-loading-spinner="el-icon-loading"
            remote
            filterable
            prefix-icon="el-icon-search"
            clearable
            :remote-method="searchSuggestionsPromo"
          >
            <el-option
              v-for="(item, index) in promotionGroup"
              :key="index"
              :label="item.title"
              :value="{ sn: item.sn, title: item.title }"
            />
          </el-select>
          <el-button
            class="mr-lr-12"
            type="primary"
            @click="onAddPromotionGroups"
          >
            {{ $t('button.add') }}
          </el-button>
        </div>
        <div>
          <el-tag
            class="mr-12"
            v-for="(item, index) in arrPromotionGroups"
            :key="index"
            closable
            @close="onRemovePromotionGroups(item)"
            :type="item.type"
          >
            {{ item.title }}
          </el-tag>
        </div>
      </el-form-item>
      <el-form-item
        :label="$t('page.create-promotion.title')"
        prop="title"
      >
        <el-input
          type="text"
          name="title"
          :placeholder="$t('page.create-promotion.title')"
          v-model="promotion.title"
        />
      </el-form-item>
      <el-form-item
        :label="$t('page.create-promotion.code')"
        required
      >
        <el-col :span="4" class="pd-l-0">
          <el-form-item prop="code">
            <el-input
              type="text"
              name="code"
              v-model="promotion.code"
              :placeholder="$t('page.create-promotion.code')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item
            prop="num"
            :label="$t('page.create-promotion.numOfCoupon')"
            label-width="30%"
          >
            <el-input-number
              :min="1"
              :max="100000000"
              v-model="promotion.numOfCoupon"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item
            prop="maxNum"
            :label="$t('page.create-promotion.maxNumOfCoupon')"
            label-width="30%"
          >
            <el-input type="text" v-model="promotion.maxNumCoupon" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item
        :label="$t('page.create-promotion.type')"
      >
        <el-col :span="24" class="pd-l-0">
          <el-form-item>
            <el-select
              v-model="promotion.type"
              element-loading-spinner="el-icon-loading"
              prefix-icon="el-icon-search"
            >
              <el-option
                v-for="(item, index) in ui.selectType"
                :key="index"
                :label="$t(item.key)"
                :value="item.value"
              />
            </el-select>
            <el-checkbox
              v-model="promotion.coPromotion"
              :true-label="1"
              :false-label="0"
              :label="$t('page.create-promotion.coPromotion')"
              class="mr-lr-12"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" class="pd-l-0">
          <el-checkbox
            :true-label="1"
            :false-label="0"
            v-model="promotion.display"
            :label="$t('page.create-promotion.display')"
            class="mr-lr-12"
          />
          <el-checkbox
            :true-label="1"
            :false-label="0"
            v-model="promotion.calMaxDiscount"
            :label="$t('page.create-promotion.callMaxDiscount')"
            class="mr-lr-12"
          />
          <el-checkbox
            :true-label="1"
            :false-label="0"
            v-model="promotion.afterDiscount"
            :label="$t('page.create-promotion.discountAfterPromotion')"
            class="mr-lr-12"
          />
          <el-checkbox
            :true-label="1"
            :false-label="0"
            v-model="promotion.makeLabel"
            :label="$t('page.create-promotion.makePLabel')"
            class="mr-lr-12"
          />
          <el-checkbox
            :true-label="1"
            :false-label="0"
            v-model="promotion.directDiscount"
            :label="$t('page.create-promotion.applyDirectDiscount')"
            class="mr-lr-12"
          />
          <el-checkbox
            :true-label="1"
            :false-label="0"
            v-model="promotion.displayHotel"
            :label="$t('page.create-promotion.displayHotel')"
            class="mr-lr-12"
          />
        </el-col>
      </el-form-item>
      <el-form-item
        :label="$t('page.create-promotion.applyStartEnd')"
        required
      >
        <el-date-picker
          v-model="promotion.applyStart"
          :picker-options="datePickerOptions"
          type="date"
          :placeholder="$t('placeholder.from')"
          @change="onChangeApplyStartDate"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
        ~
        <el-date-picker
          v-model="promotion.applyEnd"
          :picker-options="dateEndApplyPickerOptions"
          type="date"
          :placeholder="$t('placeholder.to')"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item
        v-if="ui.type !== 9"
        :label="$t('page.create-promotion.couponStartEnd')"
        required
      >
        <el-date-picker
          :disabled="ui.applyStartEnd === 1"
          v-model="promotion.couponStart"
          :picker-options="datePickerOptions"
          type="date"
          :placeholder="$t('placeholder.from')"
          @change="onChangeCouponStartDate"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
        ~
        <el-date-picker
          :disabled="ui.applyStartEnd === 1"
          v-model="promotion.couponEnd"
          :picker-options="dateEndCouponPickerOptions"
          type="date"
          :placeholder="$t('placeholder.to')"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
        <el-radio
          v-model="ui.applyStartEnd"
          class="mr-lr-12 hide-label"
          :label="0"
        />
      </el-form-item>
      <el-form-item
        v-if="ui.type !== 8 && ui.type !== 9"
        :label="$t('page.create-promotion.couponStartEnd')"
        required
      >
        <el-input
          :disabled="ui.applyStartEnd === 0"
          type="number"
          v-model="promotion.numActiveDay"
          class="width-input"
        />
        {{ $t('page.create-promotion.daysFromIssueDate') }}
        <el-radio
          v-model="ui.applyStartEnd"
          :label="1"
          class="mr-lr-12 hide-label"
        />
      </el-form-item>
      <el-form-item
        :label="discountLabel"
      >
        <el-select
          v-model="promotion.discountType"
          element-loading-spinner="el-icon-loading"
          prefix-icon="el-icon-search"
        >
          <el-option
            v-for="(item, index) in ui.selectTypeDiscount"
            :key="index"
            :label="$t(item.key)"
            :value="item.value"
          />
        </el-select>
        <el-currency-input
          v-if="
            promotion.discountType == 1 ||
            promotion.discountType == 2 ||
            promotion.discountType == 5
          "
          class="mr-lr-12"
          :disabled="promotion.discountType != 5"
          :max='100000000000'
          :min='0'
          :fixed='0'
          style="width: 15%"
          v-model="promotion.discount"
          clearable
        />
        <span
          v-if="promotion.discountType !== 3 && promotion.discountType !== 4"
          >{{
            (promotion.discountType !== 2 || promotion.discountType !== 3) &&
            promotion.discountType == 2
              ? '%'
              : 'VND'
          }}</span
        >
        <el-currency-input
          v-if="promotion.discountType == 2"
          :max='100000000000'
          :min='0'
          :fixed='0'
          style="width: 15%"
          v-model="promotion.maxDiscount"
          clearable
        />
        <span>{{ promotion.discountType == 2 ? 'VND' : ' ' }}</span>
      </el-form-item>
      <el-form-item
        :label="$t('page.create-promotion.go2joyHotel')"
        v-if="
          promotion.discountType == 1 ||
          promotion.discountType == 2 ||
          promotion.discountType == 5
        "
      >
        <el-currency-input
          :max='promotion.discountType === 1 ? 100000000000 : 100'
          :min='0'
          :fixed='0'
          style="width: 15%"
          v-model="promotion.go2joyDiscount"
          @input="totalDiscount('go2joy')"
          clearable
        />
        <span class="mr-lr-12">{{ promotion.discountType === 1 ? 'VND' : '%' }}</span>
        <el-currency-input
          :max='promotion.discountType === 1 ? 100000000000 : 100'
          :min='0'
          :fixed='0'
          style="width: 15%"
          v-model="promotion.hotelDiscount"
          @input="totalDiscount('hotel')"
          clearable
        />
        <span class="mr-lr-12">{{ promotion.discountType == 1 ? 'VND' : '%' }}</span>
      </el-form-item>
      <el-form-item
        :label="$t('page.create-promotion.contentVi')"
        prop="content"
      >
        <tinymce v-model="promotion.content" :height="500" />
      </el-form-item>
      <el-form-item
        :label="$t('page.create-promotion.contentEn')"
        prop="contentEn"
      >
        <tinymce v-model="promotion.contentEn" :height="500" />
      </el-form-item>
      <el-form-item
        v-if="promotion.type == 2 || promotion.type == 3"
        :label="$t('page.create-promotion.content2')"
        prop="content2"
      >
        <el-input v-model="promotion.content2" type="textarea" />
      </el-form-item>
      <el-form-item
        v-if="promotion.type == 2 || promotion.type == 3"
        :label="$t('page.create-promotion.memo')"
        prop="memo"
      >
        <el-input v-model="promotion.memo" type="textarea" />
      </el-form-item>
      <el-form-item
        :label="$t('page.create-promotion.typeOfDisplay')"
        required
      >
        <el-select
          :disabled="isDisableTypeDisplay"
          v-model="promotion.typesOfDisplay"
          element-loading-spinner="el-icon-loading"
          prefix-icon="el-icon-search"
        >
          <el-option
            v-for="(item, index) in ui.selectTypeDisplay"
            :key="index"
            :label="$t(item.key)"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="promotion && promotion.typesOfDisplay == 1"
        :label="$t('page.create-promotion.subContentVi')"
        prop="subContentVi"
      >
        <el-input v-model="promotion.subContentVi" type="textarea" name="subContentVi" />
      </el-form-item>
      <el-form-item
        v-if="promotion && promotion.typesOfDisplay == 1"
        :label="$t('page.create-promotion.subContentEn')"
        prop="subContentEn"
      >
        <el-input v-model="promotion.subContentEn" type="textarea" name="subContentEn" />
      </el-form-item>
      <el-form-item
        v-if="promotion && promotion.typesOfDisplay == 1"
        :label="$t('page.create-promotion.nameOfButton')"
        prop="nameOfButton"
      >
        <el-input v-model="promotion.nameOfButton" type="textarea" name="nameOfButton" />
      </el-form-item>
      <el-form-item
        v-for="file in files"
        :key="file.type"
        :label="$t(`page.create-promotion.${file.label}`)"
        :prop="file.label"
      >
        <el-input :value="promotionImage[file.label]" :name="file.label" class="disappear"/>
        <el-col :span="6" class="pd-l-0">
          <div id="preview">
            <img v-if="file.src" :src="file.src" />
          </div>
          <div>
            <span>
              <span v-if="promotion.typesOfDisplay == 0"
                >{{ file.hight.banner }}x{{ file.weight.banner }}</span
              >
              <span v-else
                >{{ file.hight.detail }}x{{ file.weight.detail }}</span
              >
              ({{ $t('option.hight') }} x {{ $t('option.weight') }})
            </span>
          </div>
        </el-col>
        <el-col :span="6">
          <i class="fa fa-upload"></i>
          {{ $t('button.chooseFile') }}
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="file"
            ref="file"
            v-on:change="handleFileUpload(file, $event, file.label)"
          />
        </el-col>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer float-right">
      <el-button type="success" size="large" @click="onCreate">
        {{ $t('button.create') }}
      </el-button>
       <!-- <el-button type="success" size="large" @click="test">
        test
      </el-button> -->
    </div>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import ElCurrencyInput from '@/components/globals/elCurrencyInput'
import { onCreatePromotion, listGroupPromotion } from './api'
import Tinymce from '@/components/globals/Tinymce'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
export default {
  name: 'PromotionCreate',
  components: {
    SaSection,
    Tinymce,
    ElCurrencyInput
  },
  data () {
    return {
      ui: {
        isFilterLoading: false,
        isCallApi: false,
        applyStartEnd: 0,
        type: 0,
        promotions: {},
        selectType: [
          { key: 'page.promotion.apply', value: 1 },
          { key: 'page.promotion.event', value: 2 },
          { key: 'page.promotion.inviteFriend', value: 3 },
          { key: 'page.promotion.gift', value: 4 },
          { key: 'page.promotion.booking', value: 5 },
          { key: 'page.promotion.signUp', value: 7 },
          { key: 'page.promotion.birthday', value: 8 },
          { key: 'page.promotion.payment', value: 9 },
          { key: 'page.promotion.voucherCode', value: 10 }
        ],
        selectTypeDiscount: [
          { key: 'page.promotion.discountMoney', value: 1 },
          { key: 'page.promotion.discountPercent', value: 2 },
          { key: 'page.promotion.gift', value: 3 },
          { key: 'page.promotion.discountHours', value: 4 },
          { key: 'page.promotion.samePrice', value: 5 }
        ],
        selectTypeDisplay: [
          { key: 'page.promotion.banner', value: 0 },
          { key: 'page.promotion.detail', value: 1 }
        ]
      },
      arrPromotionGroups: [],
      promotionGroup: [],
      promotion: {
        title: '',
        code: '',
        numOfCoupon: 1,
        maxNumCoupon: 50,
        type: 1,
        applyStart: new Date(),
        applyEnd: new Date(),
        couponStart: new Date(),
        couponEnd: new Date(),
        displayHotel: 0,
        go2joyDiscount: 0,
        hotelDiscount: 0,
        discount: 0,
        coPromotion: 0,
        display: 1,
        calMaxDiscount: 1,
        afterDiscount: 1,
        makePTable: 1,
        directDiscount: 1,
        numActiveDay: 60,
        discountType: 1,
        makeLabel: 1,
        typesOfDisplay: 0,
        maxDiscount: 0,
        memo: '',
        content: '',
        contentEn: '',
        content2: '',
        subContentVi: '',
        subContentEn: ''
      },
      promotionImage: {
        imageList: '',
        imageDetail: ''
      },
      datePickerOptions: { disabledDate: this.disabledDueDate },
      dateEndApplyPickerOptions: { disabledDate: this.disabledDueDate },
      dateEndCouponPickerOptions: { disabledDate: this.disabledDueDate },
      files: [
        {
          file: '',
          src: '',
          name: '',
          type: 1,
          label: 'imageList',
          hight: {
            banner: '420',
            detail: '420'
          },
          weight: {
            banner: '1000',
            detail: '420'
          }
        },
        {
          file: '',
          src: '',
          name: '',
          type: 2,
          label: 'imageDetail',
          hight: {
            banner: '560',
            detail: '560'
          },
          weight: {
            banner: '1000',
            detail: '420'
          }
        }
      ]
    }
  },
  computed: {
    discountLabel () {
      if (this.promotion.discountType !== 2) {
        return this.$t('page.create-promotion.discount')
      } else {
        return this.$t('page.create-promotion.maxDiscount')
      }
    },
    isDisableTypeDisplay () {
      if (this.promotion.type === 1 || this.promotion.type === 4 || this.promotion.type === 5) {
        return false
      } else {
        return true
      }
    },
    rules () {
      return {
        title: [
          {
            required: true,
            message: this.$t('page.create-promotion.titleRequired'),
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: this.$t('page.create-promotion.codeRequired'),
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: this.$t('page.create-promotion.contentViRequired'),
            trigger: 'blur'
          }
        ],
        contentEn: [
          {
            required: true,
            message: this.$t('page.create-promotion.contentEnRequired'),
            trigger: 'blur'
          }
        ],
        content2: [
          {
            required: true,
            message: this.$t('page.create-promotion.content2Required'),
            trigger: 'blur'
          }
        ],
        memo: [
          {
            required: true,
            message: this.$t('page.create-promotion.memoRequired'),
            trigger: 'blur'
          }
        ],
        subContentVi: [
          {
            required: true,
            message: this.$t('page.create-promotion.subContentViRequired'),
            trigger: 'blur'
          }
        ],
        subContentEn: [
          {
            required: true,
            message: this.$t('page.create-promotion.subContentEnRequired'),
            trigger: 'blur'
          }
        ],
        nameOfButton: [
          {
            required: true,
            message: this.$t('page.create-promotion.nameOfButtonRequired'),
            trigger: 'blur'
          }
        ],
        imageList: [
          {
            required: true,
            message: this.$t('page.create-promotion.listImageRequired'),
            trigger: 'blur'
          }
        ],
        imageDetail: [
          {
            required: true,
            message: this.$t('page.create-promotion.detailImageRequired'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {},
  methods: {
    async listGroupPromotion (params) {
      this.ui.isFilterLoading = true
      try {
        const { data } = await listGroupPromotion(params)
        this.promotionGroup = data.data.promotionGroups
      } catch (error) {
        return false
      } finally {
        this.ui.isFilterLoading = false
      }
    },
    searchSuggestionsPromo: debounce(function (keyword) {
      this.listGroupPromotion({
        limit: 10,
        keyword: keyword
      })
    }, timeDebounce),

    onCreate () {
      this.ui.isCallApi = true
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          try {
            const formData = Object.keys(this.promotion).reduce((formData, key) => {
              this.promotion[key] === null || formData.append(key, this.promotion[key])
              return formData
            }, new FormData())
            this.files.forEach((obj, index) => {
              formData.append(`images[${index}][file]`, obj.file)
              formData.append(`images[${index}][type]`, obj.type)
            })
            if (this.arrPromotionGroups.length > 0) {
              const listPromotionGroupSn = []
              this.arrPromotionGroups.forEach((obj) => {
                listPromotionGroupSn.push(obj.sn)
              })
              formData.append('listPromotionGroupSn', listPromotionGroupSn)
            }
            formData.append('numActiveDay', this.ui.applyStartEnd === 1 ? this.promotion.numActiveDay : 0)
            formData.append('numOfDays', this.ui.applyStartEnd === 1 ? 1 : 0)
            formData.append('fromToDay', this.ui.applyStartEnd === 0 ? 1 : 0)
            formData.append('sponsorDiscount', 0)
            const { data } = await onCreatePromotion(formData)
            if (data.code === 1) {
              this.$router.push(
                {
                  name: 'couponCondition',
                  params: {
                    couponSn: data.data.couponSn,
                    promotionSn: data.data.promotionSn
                  }
                })
              this.$message({
                type: 'success',
                message: this.$t('message.success')
              })
            }
          } catch (error) {
            console.log(error)
          } finally {
            this.ui.isCallApi = false
          }
        } else {
          this.scrollToTop()
          this.ui.isCallApi = false
        }
      })
    },
    onAddPromotionGroups () {
      this.arrPromotionGroups.push(this.ui.promotions)
      this.ui.promotions = {}
    },
    onRemovePromotionGroups (item) {
      this.arrPromotionGroups.splice(this.arrPromotionGroups.indexOf(item), 1)
    },
    disabledDueDate (date) {
      return date < this.getPassDate(new Date(), false)
    },
    totalDiscount (type) {
      if (
        this.promotion.discountType === 5 ||
        this.promotion.discountType === 2
      ) {
        if (
          Number(this.promotion.go2joyDiscount) > 100 ||
          Number(this.promotion.hotelDiscount) > 100
        ) {
          switch (type) {
            case 'go2joy':
              this.promotion.hotelDiscount = 0
              this.promotion.go2joyDiscount = 100
              break
            case 'hotel':
              this.promotion.go2joyDiscount = 0
              this.promotion.hotelDiscount = 100
              break
          }
        } else if (this.promotion.discountType !== 2) {
          switch (type) {
            case 'go2joy':
              this.promotion.hotelDiscount =
                100 - Number(this.promotion.go2joyDiscount)
              break
            case 'hotel':
              this.promotion.go2joyDiscount =
                100 - Number(this.promotion.hotelDiscount)
              break
          }
        }
      }
      if (this.promotion.discountType !== 5) {
        this.promotion.discount =
          Number(
            this.promotion.go2joyDiscount ? this.promotion.go2joyDiscount : 0
          ) +
          Number(
            this.promotion.hotelDiscount ? this.promotion.hotelDiscount : 0
          )
      }
    },
    filterTypeSelect (data) {
      this.promotion.type = data.item.value
      this.type = data.item.value
      // unchecked
      if (
        this.type === 1 ||
        this.type === 2 ||
        this.type === 8 ||
        this.type === 9
      ) {
        this.promotion.makePTable = true
      } else {
        this.promotion.makePTable = false
      }
      // radio check
      if (this.type === 8) {
        this.ui.applyStartEnd = 1
      } else {
        this.ui.applyStartEnd = 0
      }
      // disable typeDisplay
      if (this.type === 1 || this.type === 4 || this.type === 5) {
        this.disableTypeDisplay = false
      } else {
        this.disableTypeDisplay = true
      }
    },
    filterDiscountSelect (data) {
      this.promotion.discountType = data.item.value
      this.promotion.go2joyDiscount = 0
      this.promotion.hotelDiscount = 0
      this.promotion.discount = 0
    },
    filterTypeDisplaySelect (data) {
      this.promotion.typesOfDisplay = data.item.value
    },
    onChangeCouponStartDate (data) {
      const self = this
      this.dateEndCouponPickerOptions = {
        disabledDate (date) {
          return date < new Date(self.getAfterBeforeDate(new Date(data), false))
        }
      }
    },
    onChangeApplyStartDate (data) {
      const self = this
      this.dateEndApplyPickerOptions = {
        disabledDate (date) {
          return date < new Date(self.getAfterBeforeDate(new Date(data), false))
        }
      }
    },
    handleFileUpload (file, e, label) {
      file.file = e.target.files[0]
      this.promotionImage[label] = e.target.files[0].name
      file.src = URL.createObjectURL(e.target.files[0])
    },
    scrollToTop () {
      setTimeout(() => {
        var el = this.$el.querySelector('.el-form-item__error') // get error filter
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 500) // scroll to error filter
    },
    test () {
      return (this.promotion = {
        clonePromotionSn: null,
        title: 'test create promotion 1',
        code: String(Math.floor(Math.random() * 100000001)),
        content_vi: 'asdfghjkl',
        type: 1,
        applyStart: '2021-12-10 00:00',
        applyEnd: '2021-12-30 00:00',
        numActiveDay: '60',
        couponStart: '2021-12-10 00:00',
        couponEnd: '2021-12-30 00:00',
        directDiscount: 1,
        go2joyDiscount: 10000,
        hotelDiscount: 10000,
        sponsorDiscount: 0,
        roomApplyInfo: null,
        sponsorSn: null,
        sponsorName: null,
        discount: '20000',
        numOfCoupon: 1,
        maxNumCoupon: '50',
        display: 1,
        calMaxDiscount: 1,
        afterDiscount: 1,
        makeLabel: 1,
        memo: 'Zxcvbnm',
        fromToDay: 1,
        numOfDays: 0,
        content2: null,
        displayHotel: 1,
        content: 'ASDFGHJKL',
        contentEn: 'ASDFGHJKL',
        typesOfDisplay: 0,
        subContentEn: null,
        nameOfButton: null,
        coPromotion: 0,
        maxDiscount: 0,
        discountType: 1
      })
    }
  }
}
</script>
<style lang="scss">
.mr-12 {
  margin: 12px 8px;
}
.mr-lr-12 {
  margin: 0 8px;
}
.pd-l-0 {
  padding-left: 0px;
}
.float-right {
  float: right;
}
.width-input {
  width: 120px;
}
.hide-label {
  .el-radio__label {
    display: none;
  }
}
.is-flex {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  [class*='el-col-'] {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    [class*='el-col-'] {
      display: block;
    }
  }
}
</style>
