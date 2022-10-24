<template>
  <sa-section>
    <el-form :model="form" :rules="rules" ref="form">
      <div class="hotel_displays">
        <div class="validation__form">
          <el-form-item class="pb-1" :label="$t('page.hotelDisplay.groupName')">
            <el-select
              class="w-100"
              :loading="ui.isLoadingGroups"
              v-model="form.hotelGroupSn"
              element-loading-spinner="el-icon-loading"
              remote
              filterable
              :placeholder="$t('page.hotelDisplay.groupName')"
              :remote-method="reloadHotelGroups"
              >
              <el-option
                  v-for="(item, index) in groups"
                  :key="index"
                  :label="item.name"
                  :value="item.sn"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="validation__form">
          <el-form-item class="pb-1" :label="$t('page.hotelDisplay.hotelName')" prop="name">
            <el-input :placeholder="$t('page.hotelDisplay.hotelName')" v-model="form.name" type="text"></el-input>
          </el-form-item>
        </div>
        <div class="validation__col">
          <el-form-item :label="$t('page.hotelDisplay.holdingCompany')">
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item>
                <el-input :placeholder="$t('page.hotelDisplay.taxNo')" v-model="form.taxId" type="text"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item>
                <el-input :placeholder="$t('page.hotelDisplay.businessLicense')" v-model="form.businessLicense" type="text"></el-input>
              </el-form-item>
            </el-col>
              <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item>
                <el-input :placeholder="$t('page.hotelDisplay.companyName')" v-model="form.companyName" type="text"></el-input>
              </el-form-item>
            </el-col>
              <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item>
                <el-input :placeholder="$t('page.hotelDisplay.address')" v-model="form.companyAddress" type="text"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>
        <div class="validation__col">
          <el-form-item :label="$t('page.hotelDisplay.legalRepresentative')" required>
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item prop="repName">
                <el-input :placeholder="$t('page.hotelDisplay.fullName')" v-model="form.repName" type="text"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item prop="repPosition">
                <el-input :placeholder="$t('page.hotelDisplay.position')" v-model="form.repPosition" type="text"></el-input>
              </el-form-item>
            </el-col>
              <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item prop="repTel">
                <el-input :placeholder="$t('page.hotelDisplay.telephone')" v-model="form.repTel" type="text"></el-input>
              </el-form-item>
            </el-col>
              <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item prop="repEmail">
                <el-input :placeholder="$t('page.hotelDisplay.email')" v-model="form.repEmail" type="text"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>
        <div class="validation__col">
          <el-form-item :label="$t('page.hotelDisplay.bankInformation')" required>
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item prop="bankAccount">
                <el-input :placeholder="$t('page.hotelDisplay.accountNo')" v-model="form.bankAccount" type="text"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item prop="bankName">
                <el-input :placeholder="$t('page.hotelDisplay.bankName')" v-model="form.bankName" type="text"></el-input>
              </el-form-item>
            </el-col>
              <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item prop="bankBranch">
                <el-input :placeholder="$t('page.hotelDisplay.branchName')" v-model="form.bankBranch" type="text"></el-input>
              </el-form-item>
            </el-col>
              <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item prop="beneficiary">
                <el-input :placeholder="$t('page.hotelDisplay.beneficiary')" v-model="form.beneficiary" type="text"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>
        <div class="validation__col">
          <el-form-item :label="$t('page.hotelDisplay.status')" required>
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item>
                <el-select v-model="form.hotelStatus" :placeholder="$t('page.hotelDisplay.status')" style="width: 100%;">
                    <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="$t(item.key)"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item prop="contractDate">
                <el-date-picker :disabled="form.hotelStatus != 3" type="date" :placeholder="$t('page.hotelDisplay.contractDate')" v-model="form.contractDate" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
              <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item>
                <el-date-picker type="date" :placeholder="$t('page.hotelDisplay.endContractDate')" v-model="form.endContractDate" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>
        <div class="infomation">
          <div class="infomation__detail">
            <div class="infomation__detail--left"></div>
            <div class="infomation__detail--right infomation__detail--start infomation__detail--flex">
              <div class="infomation__detail--col w-22per">
                  <el-input v-model="form.number1" type="text"></el-input>
              </div>

              <div class="infomation__detail--col w-4per">
                  /
              </div>

              <div class="infomation__detail--col w-22per">
                  <el-input v-model="form.number2" type="text"></el-input>
              </div>

              <div class="infomation__detail--col w-4per">
                    /
              </div>

              <div class="infomation__detail--col col text-left bold">
                  G2J
              </div>
            </div>
          </div>
        </div>
        <div class="validation__col">
          <el-form-item :label="$t('page.hotelDisplay.typeNewContract')">
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item>
                <el-select class="w-100" v-model="form.newContractedType" :placeholder="$t('page.hotelDisplay.typeNewContract')">
                    <el-option
                    v-for="item in contractOptions"
                    :key="item.value"
                    :label="$t(item.key)"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>
        <div class="validation__col">
          <el-form-item :label="$t('page.hotelDisplay.commission')" prop="commission">
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item>
                  <el-input disabled :placeholder="$t('page.hotelDisplay.commission')" v-model="form.commission" type="text"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
        </div>

        <div class="validation__col">
          <el-form-item :label="$t('page.hotelDisplay.bizInCharge')" required>
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item prop="bizInChargeSn">
                <el-select
                  class="w-100"
                  :loading="ui.isLoadingStaffs"
                  v-model="form.bizInChargeSn"
                  element-loading-spinner="el-icon-loading"
                  :placeholder="$t('page.hotelDisplay.bizInCharge')"
                  >
                    <el-option
                        v-for="item in staffOptions"
                      :key="item.sn"
                      :label="item.fullName"
                      :value="item.sn"
                    >
                    </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item>
                <p>{{ $t('page.hotelDisplay.manageHotelsAfterContracting')}}</p>
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>

        <div class="validation__col">
          <el-form-item :label="$t('page.hotelDisplay.saleInCharge')" required>
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item prop="saleInChargeSn">
                <el-select
                class="w-100"
                :loading="ui.isLoadingStaffs"
                v-model="form.saleInChargeSn"
                element-loading-spinner="el-icon-loading"
                :placeholder="$t('page.hotelDisplay.saleInCharge')"
                >
                  <el-option
                      v-for="item in staffOptions"
                    :key="item.sn"
                    :label="item.fullName"
                    :value="item.sn"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item>
                <p>{{ $t('page.hotelDisplay.contractingNewHotel')}}</p>
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>
        <div class="infomation">
          <div class="infomation__detail">
            <div class="infomation__detail--left">
                <p>{{ $t('page.hotelDisplay.propertyManagementSystem')}}</p>
                <p>{{ $t('page.hotelDisplay.hotelPms')}}</p>
            </div>
            <div class="infomation__detail--block">
              <div class="checkbox">
                <el-radio class="mb-1" v-model="form.hotelPms.type" :label="1">{{ $t('page.hotelDisplay.yesIUsing')}}</el-radio>
                <div>
                  <el-checkbox :disabled="form.hotelPms.type != 1" :true-label="1" :false-label="0" v-model="form.hotelPms.ezCloud">Ez Cloud</el-checkbox>
                  <el-checkbox :disabled="form.hotelPms.type != 1" :true-label="1" :false-label="0" v-model="form.hotelPms.bhotelEasy">bHotel Easy</el-checkbox>
                  <el-checkbox :disabled="form.hotelPms.type != 1" :true-label="1" :false-label="0" v-model="form.hotelPms.hbsoftHotel">HBSoft Hotel</el-checkbox>
                  <el-checkbox :disabled="form.hotelPms.type != 1" :true-label="1" :false-label="0" v-model="form.hotelPms.ohotel">Ohotel</el-checkbox>
                  <el-checkbox :disabled="form.hotelPms.type != 1" :true-label="1" :false-label="0" v-model="form.hotelPms.skyHotel">Sky Hotel</el-checkbox>
                  <el-checkbox :disabled="form.hotelPms.type != 1" :true-label="1" :false-label="0" v-model="form.hotelPms.intellio">INTELLIO</el-checkbox>
                  <el-checkbox :disabled="form.hotelPms.type != 1" :true-label="1" :false-label="0" v-model="form.hotelPms.fotel">Fotel</el-checkbox>
                </div>
                <div class="checkbox__input">
                    <el-input :disabled="form.hotelPms.type != 1" v-model="form.otherForYes" type="text"></el-input>
                </div>
              </div>
              <div class="checkbox">
                <el-radio class="mb-1" v-model="form.hotelPms.type" :label="0">{{ $t('page.hotelDisplay.noIjustUse')}}</el-radio>
                  <div>
                    <el-checkbox :disabled="form.hotelPms.type != 0" :true-label="1" :false-label="0" v-model="form.hotelPms.excel">Excel</el-checkbox>
                    <el-checkbox :disabled="form.hotelPms.type != 0" :true-label="1" :false-label="0" v-model="form.hotelPms.notebook">NoteBook</el-checkbox>
                    <el-checkbox :disabled="form.hotelPms.type != 0" :true-label="1" :false-label="0" v-model="form.hotelPms.googleSheet">Google Sheet</el-checkbox>
                  </div>
                <div class="checkbox__input">
                    <el-input :disabled="form.hotelPms.type != 0" v-model="form.otherForNo" type="text"></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="validation__col">
          <el-form-item :label="$t('page.hotelDisplay.hotelType')" required>
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item>
                <el-select class="w-100" v-model="form.style" :placeholder="$t('page.hotelDisplay.hotelType')">
                  <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="$t(item.key)"
                  :value="item.value">
                  </el-option>
              </el-select>
                </el-form-item>
              </el-col>
            </el-form-item>
        </div>
        <div class="validation__form">
          <el-form-item :label="$t('page.hotelDisplay.location')" required>
            <div class="infomation__detail--map">
              <div class="map-search">
                <label style="width: 100%">
                    <gmap-autocomplete class="el-input__inner" @place_changed="setPlace" @change="reloadAddMarker">
                    </gmap-autocomplete>
                </label>
              </div>
              <gmap-map :center="getCenterMap" :zoom="12" style="width:100%;height: 400px;">
                  <gmap-marker :key="index" v-for="(m, index) in getMarkersrMap" :position="m.position" @click="center=m.position"></gmap-marker>
              </gmap-map>
            </div>
          </el-form-item>
        </div>
        <div class="validation__col">
          <el-form-item :label="$t('page.hotelDisplay.longLat')" required>
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item prop="longitude">
                <el-input :placeholder="$t('page.hotelDisplay.longitude')" v-model="form.longitude" type="text"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item prop="latitude">
                <el-input :placeholder="$t('page.hotelDisplay.latitude')" v-model="form.latitude" type="text"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>
        <div class="validation__form">
          <el-form-item class="pb-1" :label="$t('page.hotelDisplay.address')" prop="address">
            <el-input :placeholder="$t('page.hotelDisplay.address')" v-model="form.address" type="text"></el-input>
          </el-form-item>
        </div>
        <div class="validation__col">
          <el-form-item :label="$t('page.hotelDisplay.provinceDistrict')" required>
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item prop="provinceSn">
                <el-select
                  class="w-100"
                  :loading="ui.isLoadingProvinces"
                  v-model="form.provinceSn"
                  element-loading-spinner="el-icon-loading"
                  :placeholder="$t('page.hotelDisplay.province')"
                  >
                    <el-option
                        v-for="item in provinces"
                      :key="item.sn"
                      :label="item.name"
                      :value="item.sn"
                    >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item prop="districtSn">
                <el-select
                class="w-100"
                :loading="ui.isLoadingDistricts"
                v-model="form.districtSn"
                element-loading-spinner="el-icon-loading"
                :placeholder="$t('page.hotelDisplay.district')"
                >
                  <el-option
                      v-for="item in districts"
                    :key="item.sn"
                    :label="item.name"
                    :value="item.sn"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>
        <div class="validation__col">
          <el-form-item :label="$t('page.hotelDisplay.phone')">
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item>
                <el-input type="text" v-model="form.areaCode" :placeholder="$t('page.hotelDisplay.areaCode')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item>
                <el-input :placeholder="$t('page.hotelDisplay.phone')" v-model="form.phone" type="text"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>
        <div class="validation__form">
          <el-form-item :label="$t('page.hotelDisplay.vietnameseDescription')">
            <div class="w-100 d-inline-block">
              <tinymce v-model="form.description" :height="300" />
            </div>
          </el-form-item>
        </div>
        <div class="validation__form">
          <el-form-item :label="$t('page.hotelDisplay.englishDescription')">
            <div class="w-100 d-inline-block">
              <tinymce v-model="form.enDescription" :height="300" />
            </div>
          </el-form-item>
        </div>
        <div v-if="form.style == 4" class="validation__form">
          <el-form-item :label="$t('page.hotelDisplay.hotelPolicyVietnamese')">
            <div class="w-100 d-inline-block">
              <tinymce v-model="form.policy" :height="300" />
            </div>
          </el-form-item>
        </div>
        <div v-if="form.style == 4" class="validation__form">
          <el-form-item :label="$t('page.hotelDisplay.hotelPolicyEnglish')">
            <div class="w-100 d-inline-block">
              <tinymce v-model="form.policyEn" :height="300" />
            </div>
          </el-form-item>
        </div>
        <div class="validation__form">
          <el-form-item :label="$t('page.hotelDisplay.tipsAddress')">
            <div class="w-100 d-inline-block">
            <tinymce v-model="form.tipsAddress" :height="300" />
            </div>
          </el-form-item>
        </div>
        <div class="validation__form">
          <el-form-item :label="$t('page.hotelDisplay.hashTag')">
            <el-select
              class="w-100"
              v-model="form.hashtags"
              :loading="ui.isLoadingHashtags"
              element-loading-spinner="el-icon-loading"
              multiple
              filterable
              allow-create
              remote
              reserve-keyword
              :remote-method="reloadHashtags"
              :placeholder="$t('page.hotelDisplay.hashTag')">
              <el-option
                v-for="(item, index) in hashtags"
                :key="index"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </div>

        <!-- /////////////////// test -->

          <image-uploader-group
            :preview="false"
            :className="['fileinput', { 'fileinput--loaded': hasImage }]"
            capture="environment"
            :debug="1"
            doNotResize="gif"
            :autoRotate="true"
            outputFormat="verbose"
            :maxLoop="form.images"
            :setRatioThumbnail="setRatioThumbnail"
            @input="setImage"
            @result="resultThumbnail"
            @checkboxItem="checkboxItem"
            @removeItem="removeItem"
          >
          </image-uploader-group>

        <!-- //////////// end test  -->

        <!-- <div v-for="(formImage,index) in form.images" :key="index">
          <div class="picture">
              <div class="picture__label">
                  <p v-if="index == 0">{{ $t('page.hotelDisplay.homeImage')}}<span class="text-danger"> (*)</span></p>
                  <p v-else>{{ $t('page.hotelDisplay.image') + ' ' + index }}</p>
              </div>
              <div class="picture__content">
                <div class="picture__content--preview">
                    <el-image
                        v-if="formImage.src !== 'delete'"
                        :src="formImage.src">
                    </el-image>
                </div>
                <div class="picture__content--upload">
                  <upload-file
                    :showFileName="false"
                    accept="image/png, image/jpeg"
                    @change="addImage(formImage,$event,index)"
                  >
                    {{ $t('button.chooseFile')}}
                  </upload-file>

                  <p v-if="formImage.firstDisplay == 1 && formImage.flag == 1" class="is-danger" >
                      {{ $t('page.hotelDisplay.requiredHomeImage')}}
                  </p>
                  <p v-if="!formImage.isImage" class="is-danger" >
                      {{ $t('page.hotelDisplay.wrongFormatImage')}}
                  </p>
                </div>
              </div>
              <div class="picture__handle">
                <div class="picture__handle--360">
                    <p>
                        <el-checkbox  v-if="index != 0" v-model="formImage.is360" @change="checkBoxImage(formImage,$event)">{{ $t('page.hotelDisplay.degreesImage')}}</el-checkbox>
                    </p>
                </div>
                <div class="picture__handle--delete">
                    <p>
                        <el-button  v-if="formImage.src" type="danger" @click="removeImage(formImage,$event)" size="medium">{{ $t('button.delete')}}</el-button>
                    </p>
                </div>
              </div>
          </div>
        </div> -->

        <div class="hotel_displays__button">
          <el-button type="info" size="large" @click="$router.go(-1)">
              {{ $t('button.back')}}
          </el-button>
          <el-button type="success" :loading="ui.isSubmiting" size="large" @click="preHandleBeforeSubmit">
              {{ $t('button.create')}}
          </el-button>
        </div>
      </div>
    </el-form>
  </sa-section>
</template>
<script>
import { debounce, scrollToTop } from '@/utils/helpers'
import { statusOptions, contractOptions, typeOptions } from '@/utils/const'
import SaSection from '@/components/globals/SaSection.vue'
import { createHotelDisplay, getNextIncrementContractId } from './api'
import { fetchProvinces, fetchDistricts } from '@/api/province'
import { fetchHashtags } from '@/api/hashtag'
import { fetchManagerStaffs } from '@/api/staff'
import { fetchHotelGroups } from '@/api/hotels'
import Tinymce from '@/components/globals/Tinymce/index.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'

import { uploadFileZip } from '@/api/uploadFileZip'
import ImageUploaderGroup from '@/components/globals/clipper-fixed/ImageUploaderGroup.vue'

const timeDebounce = 500
const latitude = 10.7642837
const longitude = 106.6812808

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_MIX_PUSHER_APP_KEY_GOOGLE_MAP,
    libraries: 'places',
    v: 3.37
  },
  installComponents: true
})

export default {
  name: 'CreateHotelDisplay',
  components: {
    SaSection,
    Tinymce,
    ImageUploaderGroup
  },
  data () {
    return {
      form: {
      // basicInfo
        hotelGroupSn: '',
        name: '',
        taxId: '',
        businessLicense: '',
        companyName: '',
        companyAddress: '',
        repName: '',
        repPosition: '',
        repTel: '',
        repEmail: '',
        bankAccount: '',
        bankName: '',
        bankBranch: '',
        beneficiary: '',
        hotelStatus: 1,
        contractDate: '',
        endContractDate: '',
        number1: '',
        number2: '',
        contractId: '',
        newContractedType: 0,
        bizInChargeSn: '',
        saleInChargeSn: '',
        otherForYes: '',
        otherForNo: '',
        hotelPms: {
          type: 0,
          ezCloud: 0,
          skyHotel: 0,
          bhotelEasy: 0,
          intellio: 0,
          hbsoftHotel: 0,
          fotel: 0,
          ohotel: 0,
          excel: 0,
          notebook: 0,
          googleSheet: 0
        },
        style: 0,
        // mapInfo
        latitude: null,
        longitude: null,
        provinceSn: '',
        districtSn: '',
        address: '',
        areaCode: '',
        phone: '',
        // PictureDescriptionInfo
        description: '',
        enDescription: '',
        policy: '',
        policyEn: '',
        tipsAddress: '',
        commission: 15,
        hashtags: [],
        // gallery images
        images: [
          { file: '', src: '', is360: false, firstDisplay: 1, flag: 5, sn: 0, isImage: true, no: 0, typeImage: 1, width: 685, height: 465, label: '(1370x930)' }, // 1370x930
          { file: '', src: '', is360: false, firstDisplay: 0, flag: 5, sn: 0, isImage: true, no: 1, typeImage: 0, width: 685, height: 465, label: '(1370x930)' }, // 1370x930
          { file: '', src: '', is360: false, firstDisplay: 0, flag: 5, sn: 0, isImage: true, no: 2, typeImage: 0, width: 685, height: 465, label: '(1370x930)' }, // 1370x930
          { file: '', src: '', is360: false, firstDisplay: 0, flag: 5, sn: 0, isImage: true, no: 3, typeImage: 0, width: 685, height: 465, label: '(1370x930)' }, // 1370x930
          { file: '', src: '', is360: false, firstDisplay: 0, flag: 5, sn: 0, isImage: true, no: 4, typeImage: 0, width: 685, height: 465, label: '(1370x930)' }, // 1370x930
          { file: '', src: '', is360: false, firstDisplay: 0, flag: 5, sn: 0, isImage: true, no: 5, typeImage: 0, width: 685, height: 465, label: '(1370x930)' }, // 1370x930
          { file: '', src: '', is360: false, firstDisplay: 0, flag: 5, sn: 0, isImage: true, no: 6, typeImage: 0, width: 685, height: 465, label: '(1370x930)' }, // 1370x930
          { file: '', src: '', is360: false, firstDisplay: 0, flag: 5, sn: 0, isImage: true, no: 7, typeImage: 0, width: 685, height: 465, label: '(1370x930)' }, // 1370x930
          { file: '', src: '', is360: false, firstDisplay: 0, flag: 5, sn: 0, isImage: true, no: 8, typeImage: 0, width: 685, height: 465, label: '(1370x930)' }, // 1370x930
          { file: '', src: '', is360: false, firstDisplay: 0, flag: 5, sn: 0, isImage: true, no: 9, typeImage: 0, width: 685, height: 465, label: '(1370x930)' }, // 1370x930
          { file: '', src: '', is360: false, firstDisplay: 0, flag: 5, sn: 0, isImage: true, no: 10, typeImage: 0, width: 685, height: 465, label: '(1370x930)' } // 1370x930

        ]
      },
      isErrors: {
        image: false
      },
      rules: {
        name: [
          { required: true, message: this.$t('page.hotelDisplay.requiredHotelName'), trigger: 'blur' }
        ],
        repName: [
          { required: true, message: this.$t('page.hotelDisplay.requiredFullname'), trigger: 'blur' }
        ],
        repPosition: [
          { required: true, message: this.$t('page.hotelDisplay.requiredPosition'), trigger: 'blur' }
        ],
        repTel: [
          { required: true, message: this.$t('page.hotelDisplay.requiredTelephone'), trigger: 'blur' }
        ],
        repEmail: [
          { required: true, message: this.$t('page.hotelDisplay.requiredEmail'), trigger: 'blur' }
        ],

        bankAccount: [
          { required: true, message: this.$t('page.hotelDisplay.requiredAccountNo'), trigger: 'blur' }
        ],
        bankName: [
          { required: true, message: this.$t('page.hotelDisplay.requiredBankName'), trigger: 'blur' }
        ],
        bankBranch: [
          { required: true, message: this.$t('page.hotelDisplay.requiredBranchName'), trigger: 'blur' }
        ],
        beneficiary: [
          { required: true, message: this.$t('page.hotelDisplay.requiredBeneficiary'), trigger: 'blur' }
        ],
        contractDate: [
          { required: true, message: this.$t('page.hotelDisplay.requiredContractDate'), trigger: 'change' }
        ],

        address: [
          { required: true, message: this.$t('page.hotelDisplay.requiredAddress'), trigger: 'blur' }
        ],

        provinceSn: [
          { required: true, message: this.$t('page.hotelDisplay.requiredProvince'), trigger: 'change' }
        ],
        districtSn: [
          { required: true, message: this.$t('page.hotelDisplay.requiredDistrict'), trigger: 'change' }
        ],

        latitude: [
          { required: true, message: this.$t('page.hotelDisplay.requiredLatitude'), trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: this.$t('page.hotelDisplay.requiredLongitude'), trigger: 'blur' }
        ],

        commission: [
          { required: true, message: this.$t('page.hotelDisplay.requiredCommission'), trigger: 'blur' }
        ],
        bizInChargeSn: [
          { required: true, message: this.$t('page.hotelDisplay.requiredBizInCharge'), trigger: 'change' }
        ],
        saleInChargeSn: [
          { required: true, message: this.$t('page.hotelDisplay.requiredSaleInCharge'), trigger: 'change' }
        ]
      },
      ui: {
        isSubmiting: false,
        isLoadingGroups: false,
        isLoadingHashtags: false,
        isLoadingStaffs: false,
        isLoadingProvinces: false
      },
      groups: [],
      staffOptions: [],
      provinces: [],
      districts: [],
      hashtags: [],
      statusOptions: statusOptions,
      contractOptions: contractOptions,
      typeOptions: typeOptions,

      hasImage: false,
      srcImage: '',
      imageIndex: 0
    }
  },
  created () {
    this.getNextIncrementContractId()
    this.fetchManagerStaffs()
    this.getProvinces()
    this.getHashtags()
    this.getHotelGroups()
  },
  computed: {
    getCenterMap () {
      let center = {}
      center = {
        lat: this.form.latitude || latitude,
        lng: this.form.longitude || longitude
      }
      return center
    },
    getMarkersrMap () {
      let markers = []
      markers = [{
        position: {
          lat: this.form.latitude || latitude,
          lng: this.form.longitude || longitude
        }
      }]
      return markers
    },
    setRatioThumbnail () {
      return {
        width: 685, // 1370
        height: 465 // 930
      }
    }
  },
  watch: {
    'form.newContractedType': function (newValue) {
      this.form.commission = newValue === 5 ? 0 : 15
    },
    'form.hotelPms.type': function () {
      if (this.form.hotelPms.type === 1) {
        this.form.hotelPms.excel = 0
        this.form.hotelPms.notebook = 0
        this.form.hotelPms.googleSheet = 0
        this.form.otherForYes = ''
        this.form.otherForNo = ''
      } else {
        this.form.hotelPms.fotel = 0
        this.form.hotelPms.other = 0
        this.form.hotelPms.ohotel = 0
        this.form.hotelPms.ezCloud = 0
        this.form.hotelPms.intellio = 0
        this.form.hotelPms.skyHotel = 0
        this.form.hotelPms.bhotelEasy = 0
        this.form.hotelPms.hbsoftHotel = 0
        this.form.otherForYes = ''
      }
    },
    'form.provinceSn': async function () {
      this.ui.isLoadingDistricts = true
      this.form.districtSn = ''
      await this.getDistricts(this.form.provinceSn)
      this.getDistrictByProvinceSn()
    }
  },
  methods: {
    checkboxItem (index) {
      console.log('checkboxItem :', index)
    },
    removeItem (index) {
      console.log('removeItem :', index)
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

    async getNextIncrementContractId () {
      try {
        const { data } = await getNextIncrementContractId()
        const contractId = data.data.contractId.split('/')
        this.form.number1 = contractId[0]
        this.form.number2 = contractId[1]
      } catch (error) {
        return false
      }
    },
    async getHotelGroups (keyword) {
      this.ui.isLoadingGroups = true
      try {
        const params = { keyword: keyword || '' }
        const { data } = await fetchHotelGroups(params)
        this.groups = data.data.hotelGroups
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingGroups = false
      }
    },
    async fetchManagerStaffs () {
      this.ui.isLoadingStaffs = true
      try {
        const params = { limit: 15, status: 0, roles: '[6,10,12,14]' }
        const { data } = await fetchManagerStaffs(params)
        this.staffOptions = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingStaffs = false
      }
    },
    async getProvinces () {
      this.ui.isLoadingProvinces = true
      try {
        const params = { limit: 100, status: 1 }
        const { data } = await fetchProvinces(params)
        this.provinces = data.data.provinces
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingProvinces = false
      }
    },
    async getDistricts (provinceSn) {
      try {
        const params = { limit: 100, provinceSn: provinceSn }
        const { data } = await fetchDistricts(params)
        this.districts = data.data.districts
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingDistricts = false
      }
    },
    setPlace (place) {
      this.currentPlace = place
    },
    reloadAddMarker: debounce(function () {
      this.addMarker()
    }, timeDebounce),
    async addMarker () {
      if (this.currentPlace) {
        this.markers = []
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({
          position: marker
        })

        this.form.latitude = marker.lat
        this.form.longitude = marker.lng
        this.form.address = this.currentPlace.formatted_address

        const localtionProvince = {
          item: this.provinces.find((elm) => {
            return this.form.address.includes(elm.name)
          })
        }

        if (localtionProvince && localtionProvince.item) {
          this.form.areaCode = localtionProvince.item.areaCode ? localtionProvince.item.areaCode : ''
          this.form.provinceSn = localtionProvince.item.sn
        }
      }
    },
    getDistrictByProvinceSn () {
      const localtionDistrict = {
        item: this.districts.find((elm) => {
          return this.form.address.includes(elm.name)
        })
      }
      if (localtionDistrict && localtionDistrict.item) {
        this.form.districtSn = localtionDistrict.item.sn
      }
    },
    async getHashtags (keyword) {
      this.ui.isLoadingHashtags = true
      try {
        const params = { keyword: keyword || '' }
        const { data } = await fetchHashtags(params)
        this.hashtags = data.data.hashtag
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHashtags = false
      }
    },
    reloadHotelGroups: debounce(function (keyword) {
      this.getHotelGroups(keyword)
    }, timeDebounce),
    reloadHashtags: debounce(function (keyword) {
      this.getHashtags(keyword)
    }, timeDebounce),
    addImage (formImage, e) {
      var ext = e.type
      switch (ext.toLowerCase()) {
        case 'image/jpg':
        case 'image/jpeg':
        case 'image/gif':
        case 'image/bmp':
        case 'image/png':
          formImage.file = e
          formImage.src = URL.createObjectURL(e)
          if (formImage.sn === 0) {
            formImage.flag = 2
          } else if (formImage.sn !== 0) {
            formImage.flag = 3
          }
          formImage.isImage = true

          if (formImage.firstDisplay === 1) {
            this.isErrors.image = false
          }
          return true
      }
      formImage.isImage = false
      this.resetImage(formImage)
      return false
    },
    resetImage (formImage) {
      this.isErrors.image = true
      formImage.file = ''
      formImage.isImage = false
      formImage.src = ''
      formImage.is360 = 0
    },
    checkExistHomeImage () {
      if (this.form.images[0].flag === 1) {
        this.isErrors.image = true
      }
    },
    checkBoxImage (image) {
      if (image.sn === 0) {
        image.flag = 2
      } else if (image.sn !== 0) {
        image.flag = 3
      }
    },
    removeImage (image) {
      if (image.sn === 0) {
        image.src = ''
        image.file = ''
        image.flag = 5
        image.is360 = 0
      } else {
        image.src = ''
        image.flag = image.sn ? 1 : 4
        image.is360 = 0
      }
      this.checkExistHomeImage()
    },
    preHandleBeforeSubmit () {
      // first handle before submit
      this.form.contractId = this.form.number1 + '/' + this.form.number2 + '/G2J'
      this.form.contractDate = this.formatDate(this.form.contractDate, false)
      this.form.endContractDate = this.formatDate(this.form.endContractDate, false)
      this.form.hashtags = this.form.hashtags ? this.form.hashtags : []
      this.$refs.form.validate((valid) => {
        if (!valid || this.isErrors.image) {
          scrollToTop('.el-form-item__error')
          return false
        }
        this.submit()
      })
    },
    async submit () {
      this.ui.isSubmiting = true
      const formImagesHasImg = this.form.images.filter(function (person) {
        return person.flag !== 5 || person.sn !== 0
      })
      try {
        const formData = Object.keys(this.form).reduce((formData, key) => {
          switch (key) {
            case 'hashtags':
              this.form.hashtags.forEach((obj, index) => {
                formData.append(`${key}[${index}]`, obj)
              })
              break
            case 'hotelPms':
              formData.append(`${key}[other]`, this.form.otherForYes ? this.form.otherForYes : this.form.otherForNo)
              Object.keys(this.form.hotelPms).forEach(keyhotelPms => {
                formData.append(`${key}[${keyhotelPms}]`, this.form.hotelPms[keyhotelPms])
              })
              break
            case 'images':
              formImagesHasImg.forEach((item, index) => {
                (item.flag !== 2) && formData.append(`images[${index}][sn]`, item.sn)
                formData.append(`images[${index}][firstDisplay]`, item.firstDisplay)
                formData.append(`images[${index}][file]`, item.file)
                formData.append(`images[${index}][flag]`, item.flag)
                formData.append(`images[${index}][type]`, item.is360 === true ? 2 : 1)
              })
              break
            default:
              formData.append(key, this.form[key])
              break
          }
          return formData
        }, new FormData())

        const { data } = await createHotelDisplay(formData)

        if (data.code === 1) {
          const message = this.$t('message.createSuccess')
          this.$message({
            type: 'success',
            message: message
          })
          this.$router.go(-1)
        }
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
.el-col {
    padding: unset;
  }

  .w-100 {
      width: 100%;
  }
  .w-25 {
    width: 25%;
  }
  .pb-1 {
    padding-bottom: 10px;
  }
  .mr-5 {
    margin-right: 50px;
  }
  .mr-1e {
    margin-right: 1em;
  }
  .w-22per {
    width: 22% !important;
  }
  .w-4per {
    width: 4% !important;
  }
  .d-inline-block {
    display: inline-block;
  }
  .is-danger {
    color: #F56C6C;
  }
  .el-form-item {
      margin-bottom: 0.6em;
  }
  :deep(.validation__form) {
      .el-form-item__label {
        width: unset !important;
      }
      .el-form-item__content {
        margin-left: unset !important
      }
      @media (min-width: 640px) {
        .el-form-item__content {
          margin-left: 20% !important
        }
      }
  }
  :deep(.validation__col) {
    .p-10-0 {
      padding: 10px 0;
    }
    .p-10-0:last-child {
      padding: 10px 0;
    }
    .el-form-item__label {
      width: unset !important;
    }
    .el-form-item__content {
      margin-left: unset !important;
      margin-bottom: 1em;
      @media (min-width: 640px) {
          margin-left: 16.5% !important;
          margin-bottom: 4px;
      }
    }
  }
  .hotel_displays {
    &__button {
      z-index: 100;
      display: flex;
      justify-content: flex-end;

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
  .infomation {
      text-align: left;
      &__detail {
          align-items: center;
          margin: 10px 0;
          @media (min-width: 640px) {
              display: flex;
          }
          &--left {
              flex: 1;
          }
          &--right {
              flex: 4;
              justify-content: space-between;
              align-items: center;
              margin: 10px 0;
              @media (min-width: 640px) {
                  display: flex;
                  margin: unset;
              }
              .el-select {
                  width: 100%;
              }
          }
          .booking-setup {
            .el-select {
              width: 30%;
              margin-right: 1em;
            }
            .group {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              margin-bottom: inherit;
            }
          }
          &--flex {
              display: flex;

              .province {
                  margin-right: 2em;
              }
          }
          &--col {
              display: flex;
              justify-content: space-around;
              margin: 10px 0;
              @media (min-width: 640px) {
                  width: 24%;
                  margin: unset;
              }
          }
          &--block {
              flex: 4;
              justify-content: space-between;
              display: block;
              .checkbox {
                  margin: 20px 0;

                  &__input {
                      margin-top: 10px;
                  }
                  .mb-1 {
                      margin-bottom: 10px;
                  }
              }
          }
          &--start {
              @media (min-width: 640px) {
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
              }
              .col {
                  @media (min-width: 640px) {
                      margin-right: 1em;
                  }
              }
              .text-left {
                  justify-content: left;
              }
          }
          &--map {
              width: 100%;
              .map-search {
                display: flex;
                align-items: center;
                margin-bottom: 1em;

                label {
                  margin-right: 0.5em;
                }
              }
          }
      }
  }
  .picture {
    margin: 10px 0;
    @media (min-width: 640px) {
        display: flex;
        align-items: center;
        border: unset;
    }
    &__label {
        text-align: center;
        margin: 20px 0;

        @media (min-width: 640px) {
            text-align: left;
            width: 20%;
        }
    }
    &__content {
        @media (min-width: 640px) {
            flex: 4;
            display: flex;
            align-items: center;
        }
        &--preview {
          width: 100%;
          text-align: center;
          @media (min-width: 640px) {
              width: 40%;
              text-align: unset;
          }
          .el-image {
              width: 160px;
              height: 160px;
              border: 1px solid #ccc;
          }
          img {
              object-fit: scale-down
          }
          .el-image__error {
              display: none;
          }
        }
        &--upload {
          margin: 10px 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          @media (min-width: 640px) {
              width: 60%;
          }
        }
    }
    &__handle {
        flex: 2;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &--delete {
            @media (min-width: 640px) {
                flex: 1;
                text-align: right;
            }
        }
    }
  }
</style>
