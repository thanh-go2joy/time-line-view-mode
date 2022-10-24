<template>
  <sa-section v-loading="ui.isCallApi">
    <el-tabs v-model="activeTab">
      <el-tab-pane name="create" disabled>
        <div class="group-promotion-create__content">
          <el-row>
            <el-col :span="5">
              <p>{{ $t('page.group-promotion.promotionList')}}</p>
            </el-col>
            <el-col :span="19">
              <el-link
                @click="onGotoApply"
              >
                <p>
                    {{ $t(applyType)}}
                    <span v-if="data.numOfPromotion > 0">
                    ({{ data.numOfPromotion }}) {{$t('breadcrumb.promotion')}}
                    </span>
                </p>
              </el-link>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <p>{{ $t('page.group-promotion.title')}}</p>
            </el-col>
            <el-col :span="19">
              <el-input type="text" v-model="data.title" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <p>{{ $t('page.group-promotion.displayArea')}}</p>
            </el-col>
            <el-col :span="19">
              <sa-select-check
                class="select-check"
                :isCheckAll="true"
                v-model="data.provinceSelected"
                :model-check-all="checkBox.checkAllProvinces"
                label="sn"
                keyValue="name"
                :options="provinces"
                @changeCheckAll="handleCheckAllProvinces"
                @input="handleCheckedProvince"
                :loadingButton="ui.provincesLoading"
              />
            </el-col>
          </el-row>
        </div>
        <div
          class="dialog-footer float-right"
        >
          <el-button
            type="success"
            size="large"
            @click="onCreateGroupPromotion"
          >
            {{$t('button.create')}}
          </el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane name="apply-for-promotion">
        <apply-for-promotion
          :propFilter="statistics"
          :dataApply="dataApply"
          :provinceApply="provinces"
          @onCallChangeTab="onCallChangeTab"
          @reloadData="reloadData"
        />
      </el-tab-pane>
    </el-tabs>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { onCreateGroupPromotion, getFilterPromotionApply } from './api'
import { fetchProvinces } from '@/api/province'
import SaSelectCheck from '@/components/globals/SaSelectCheck.vue'
import applyForPromotion from '@/modules/marketing/promotion/group-promotion/apply-for-promo/View.vue'
export default {
  name: 'GroupPromotionCreate',
  components: {
    SaSection,
    SaSelectCheck,
    applyForPromotion
  },
  data () {
    return {
      checkBox: {
        checkAllStatus: true,
        checkAllProvinces: true
      },
      provinces: [],
      ui: {
        provincesLoading: false,
        provinceOptions: [],
        isCallApi: false
      },
      data: {
        title: '',
        numOfPromotion: 0,
        provinceSelected: []
      },
      activeTab: 'create',
      statistics: {},
      dataApply: {
        promotions: [],
        meta: {
          total: 0
        }
      }
    }
  },
  computed: {
    applyType () {
      switch (this.statistics.applyTarget) {
        case 2:
          return 'option.applyPromotionType.justApply'
        default:
          return 'option.applyPromotionType.applyAllPromo'
      }
    }
  },
  created () {
    this.listProvinces()
  },
  methods: {
    async listProvinces () {
      this.ui.provincesLoading = true
      try {
        const { data } = await fetchProvinces({ limit: 100 })
        this.provinces = data.data.provinces
        this.ui.provinceOptions = await data.data.provinces.reduce(
          function async (preValue, curValue) {
            return preValue.concat(curValue.sn)
          },
          []
        )
        if (this.data.provinceSelected.length === 0) {
          this.data.provinceSelected = [...this.ui.provinceOptions]
        }
      } catch (error) {
        return false
      } finally {
        this.ui.provincesLoading = false
      }
    },
    async onCreateGroupPromotion () {
      try {
        this.ui.isCallApi = true
        const formData = new FormData()
        formData.append('title', this.data.title)
        if (this.data.provinceSelected && this.data.provinceSelected.length > 0) {
          formData.append('listProvinceSn', this.data.provinceSelected)
        }
        const { data } = await onCreateGroupPromotion(formData)
        if (data.code === 1) {
          this.$message({
            type: 'success',
            message: this.$t('message.success')
          })
          this.$router.push({ name: 'groupPromotion' })
          sessionStorage.removeItem('groupPromotion')
        }
      } catch (error) {
        this.ui.isCallApi = false
        return false
      }
    },
    async onGotoApply () {
      try {
        this.ui.isCallApi = true
        const { data } = await getFilterPromotionApply()
        if (data.code === 1) {
          this.activeTab = 'apply-for-promotion'
          this.$delete(data.data.statistics, 'promotionGroupSn')
          this.statistics = data.data.statistics
          this.dataApply = data.data
        }
      } catch (error) {
        this.ui.isCallApi = false
        return false
      } finally {
        this.ui.isCallApi = false
      }
    },
    onCallChangeTab (applyTarget, numApply) {
      this.statistics.applyTarget = applyTarget
      this.data.numOfPromotion = numApply
      this.activeTab = 'create'
    },
    reloadData (data) {
      this.dataApply = data
    },
    handleCheckAllProvinces (val) {
      this.checkBox.checkAllProvinces = val
      this.data.provinceSelected = val ? this.ui.provinceOptions : []
    },
    handleCheckedProvince (value) {
      this.checkBox.checkAllProvinces =
        value.length === this.ui.provinceOptions.length
    }
  }
}
</script>
<style lang="scss">
.float-right {
  float: right;
}
#tab-apply-for-promotion,
#tab-create{
  display: none;
}
</style>
