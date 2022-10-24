<template>
  <el-tabs type="border-card" v-model="activeTab" v-loading="ui.isLoading">
    <el-tab-pane name="edit" disabled>
      <div class="group-promotion-edit__content">
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
              v-model="provinceSelected"
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
          @click="onEditGroupPromotion"
        >
          {{$t('button.edit')}}
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
</template>
<script>
import { getGroupPromotion, onEditGroupPromotion, getFilterPromotionApply } from './api'
import { fetchProvinces } from '@/api/province'
import SaSelectCheck from '@/components/globals/SaSelectCheck.vue'
import applyForPromotion from '@/modules/marketing/promotion/group-promotion/apply-for-promo/View.vue'

export default {
  name: 'editGroupPromotion',
  components: {
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
        isLoading: false,
        provincesLoading: false,
        provinceOptions: []
      },
      provinceSelected: [],
      data: {},
      activeTab: 'edit',
      statistics: {},
      dataApply: {}
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
    this.getGroupPromotion()
  },
  methods: {
    async getGroupPromotion () {
      this.ui.isLoading = true
      try {
        const { data } = await getGroupPromotion(this.$route.params.sn)
        this.data = data.data
        this.proviceSelected = this.data.listProvinceSn
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    async listProvinces () {
      this.ui.provincesLoading = true
      try {
        const { data } = await fetchProvinces({ limit: 100, status: 1 })
        this.provinces = data.data.provinces
        this.ui.provinceOptions = await data.data.provinces.reduce(
          function async (preValue, curValue) {
            return preValue.concat(curValue.sn)
          },
          []
        )
        this.provinceSelected = [...this.ui.provinceOptions]
      } catch (error) {
        return false
      } finally {
        this.ui.provincesLoading = false
      }
    },
    async onGotoApply () {
      try {
        const { data } = await getFilterPromotionApply({ promotionGroupSn: this.data.sn })
        if (data.code === 1) {
          this.activeTab = 'apply-for-promotion'
          this.$delete(data.data.statistics, 'promotionGroupSn')
          this.statistics = data.data.statistics
          this.dataApply = data.data
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    onCallChangeTab (applyTarget, numApply) {
      this.statistics.applyTarget = applyTarget
      this.data.numOfPromotion = numApply
      this.activeTab = 'edit'
    },
    reloadData (data) {
      this.dataApply = data
    },
    async onEditGroupPromotion () {
      try {
        const formData = new FormData()
        formData.append('title', this.data.title)
        if (this.provinceSelected && this.provinceSelected.length > 0) {
          formData.append('listProvinceSn', this.provinceSelected)
        }
        const { data } = await onEditGroupPromotion(this.$route.params.sn, formData)
        if (data.code === 1) {
          this.$router.push({ name: 'groupPromotion' })
          this.$message({
            type: 'success',
            message: this.$t('message.success')
          })
        }
      } catch (error) {
        return false
      }
    },
    handleCheckAllProvinces (val) {
      this.checkBox.checkAllProvinces = val
      this.provinceSelected = val ? this.ui.provinceOptions : []
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
#tab-edit{
  display: none;
}
</style>
