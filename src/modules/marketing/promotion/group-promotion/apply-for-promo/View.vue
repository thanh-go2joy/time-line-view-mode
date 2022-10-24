<template>
  <sa-section>
    <template slot="header">
      <div class="promo__filters">
        <el-form
          :inline="true"
          :model="filter"
          class="demo-form-inline float-left"
          v-if="$route.query.page !== 'groupPromotion' && !isPreView"
        >
          <el-form-item>
            <el-select
              v-model="filter.applyTarget"
              element-loading-spinner="el-icon-loading"
              prefix-icon="el-icon-search"
            >
              <el-option
                v-for="(item, index) in applyTargetType"
                :key="index"
                :label="$t(item.key)"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              :disabled="isDisabled"
              v-model="filter.type"
              element-loading-spinner="el-icon-loading"
              prefix-icon="el-icon-search"
            >
              <el-option
                v-for="(item, index) in promoType"
                :key="index"
                :label="$t(item.key)"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              :disabled="isDisabled"
              v-model="filter.provinceSn"
              v-loading="ui.isLoadingProvince"
              element-loading-spinner="el-icon-loading"
              :placeholder="$t('page.collection.province')"
              @change="listDistricts"
            >
              <el-option
                v-for="(item, index) in provinces"
                :key="index"
                :label="item.name"
                :value="item.sn"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              :disabled="isDisabled"
              v-model="filter.districtSn"
              v-loading="ui.isLoadingDistrict"
              element-loading-spinner="el-icon-loading"
              :placeholder="$t('page.collection.district')"
            >
              <el-option
                v-for="(item, index) in districts"
                :key="index"
                :label="item.name"
                :value="item.sn"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              :disabled="isDisabled"
              :loading="ui.isLoadingPromo"
              v-model="filter.promotionSn"
              element-loading-spinner="el-icon-loading"
              remote
              filterable
              prefix-icon="el-icon-search"
              clearable
              :remote-method="searchSuggestionsPromo"
            >
              <el-option
                  v-for="(item, index) in promotions"
                  :key="index"
                  :label="item.title"
                  :value="item.sn"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-plus"
              plain
              @click="onAdd"
              :disabled="isDisabled"
            >
              {{ $t('button.add') }}
            </el-button>
          </el-form-item>
        </el-form>
        <div class="float-right">
          <el-button
            type="warning"
            plain
            @click="onBack"
          >
            {{ $t('button.back') }}
          </el-button>
          <el-button
            v-if="$route.query.page !== 'groupPromotion' && !isPreView"
            type="warning"
            plain
            @click="onSave"
          >
            {{ $t('button.save') }}
          </el-button>
        </div>
      </div>
    </template>
    <div class="promo__table">
      <el-table :data="data.promotions" v-loading="ui.isTableLoading">
        <el-table-column label="#" type="index" />
        <el-table-column :label="$t('page.promotion.title')" :min-width="180">
          <template slot-scope="scope">
            <router-link
              :to="{
                name: 'PromotionDetail',
                query: { sn: scope.row.sn }
              }"
            >
              {{ scope.row.title }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.code')" :min-width="180">
          <template slot-scope="scope">
            <p>
              {{ scope.row.code }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.type')" :min-width="180">
          <template slot-scope="scope">
            <p>
              {{ getPromotionType(scope.row.type) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.discount')"
          :min-width="100"
        >
          <template slot-scope="scope">
            <div
              v-html="
                getDiscountType({
                  discountType: scope.row.discountType,
                  discount: scope.row.discount
                })
              "
            />
            <img
              v-if="scope.row.discountType === 3"
              src="@/assets/images/svg/gifts.svg"
              style="width: 20px; height: 20px"
              class="icon-tick"
            />
            <img
              v-if="scope.row.discountType === 4"
              src="@/assets/images/svg/clock.svg"
              style="width: 20px; height: 20px"
              class="icon-tick"
            />
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.applyStartEnd')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.applyStart }} {{ scope.row.applyEnd }}</p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.applyStartEnd')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.numActiveDay === 0">
              {{ scope.row.couponStart }}
              {{ scope.row.couponEnd }}
            </p>
            <p v-else>
              {{ scope.row.numActiveDay }}
              {{ $t('page.promotion.couponContent') }}
            </p>
          </template>
        </el-table-column>
         <el-table-column
          :label="$t('page.promotion.type')"
          :min-width="85"
          v-if="$route.query.page === 'groupPromotion'"
        >
          <template slot-scope="scope">
            <p>
              {{ getStatus(scope.row.status) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.userMgt.operations')"
          :min-width="90"
          v-else
        >
          <template slot-scope="scope">
            <el-button
              type="danger"
              plain
              @click="onDelete(scope.row)"
            >
              {{ $t('button.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="filter.limit"
        :current-page="filter.page"
        :total="data.meta.total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      />
    </div>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { onAddPromotionApply, onRemovePromotionApply, onSavePromotionApply, onBackPromotionApply, getFilterPromotionApply } from './api'
import { fetchProvinces, fetchDistricts } from '@/api/province'
import { fetchPromotions } from '@/api/promotion'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
export default {
  name: 'PromoApply',
  components: { SaSection },
  props: {
    propFilter: {
      type: Object,
      default: () => {}
    },
    dataApply: {
      type: Object,
      default: () => {}
    },
    provinceApply: {
      type: Array,
      default: () => []
    },
    isPreView: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      ui: {
        isTableLoading: false,
        isLoadingProvince: false,
        isLoadingDistrict: false,
        isLoadingPromotion: false,
        promo: ''
      },
      districts: [{ name: this.$t('page.collection.all'), sn: -1 }],
      promotions: []
    }
  },
  computed: {
    isDisabled () {
      if (this.filter.applyTarget === 1) {
        return true
      } else {
        return false
      }
    },
    data: {
      get () {
        return this.dataApply
      },
      set (val) {
        this.$emit('reloadData', val)
      }
    },
    filter () {
      return Object.assign(this.propFilter, { page: 1, limit: 10 })
    },
    provinces () {
      return [{ name: this.$t('page.collection.all'), sn: -1 }, ...this.provinceApply]
    },
    applyTargetType () {
      return [
        {
          key: 'option.applyPromotionType.applyAllPromo',
          value: 1
        },
        {
          key: 'option.applyPromotionType.justApply',
          value: 2
        }
      ]
    },
    promoType () {
      return [
        { key: 'page.promotion.all', value: 0 },
        { key: 'page.promotion.apply', value: 1 },
        { key: 'page.promotion.event', value: 2 },
        { key: 'page.promotion.inviteFriend', value: 3 },
        { key: 'page.promotion.gift', value: 4 },
        { key: 'page.promotion.booking', value: 5 },
        { key: 'page.promotion.report_new_hotel', value: 6 },
        { key: 'page.promotion.sign_up', value: 7 },
        { key: 'page.promotion.birthday', value: 8 },
        { key: 'page.promotion.payment', value: 9 }
      ]
    }
  },
  watch: {
  },
  created () {
  },
  methods: {
    async listPromotionsFilter (params) {
      this.ui.isLoadingPromotion = true
      try {
        const { data } = await fetchPromotions(params)
        this.promotions = data.data.suggestionPromotion
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingPromotion = false
      }
    },
    async onGetApply (sn) {
      try {
        this.ui.isTableLoading = true
        const { data } = await getFilterPromotionApply(this.filter)
        if (data.code === 1) {
          this.activeTab = 'apply-for-promotion'
          this.$delete(data.data.statistics, 'promotionGroupSn')
          this.statistics = data.data.statistics
          this.data = data.data
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    searchSuggestionsPromo: debounce(function (keyword) {
      this.listPromotionsFilter({
        limit: 10,
        keyword: keyword
      })
    }, timeDebounce),
    async listProvinces () {
      this.ui.isLoadingProvince = true
      try {
        this.provinces = [{ name: this.$t('page.collection.all'), sn: -1 }]
        const { data } = await fetchProvinces({ limit: 100, status: 1 })
        this.provinces = [...this.provinces, ...data.data.provinces]
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingProvince = false
      }
    },
    async listDistricts () {
      this.ui.isLoadingDistrict = true
      try {
        this.districts = [{ name: this.$t('page.collection.all'), sn: -1 }]
        this.filter.districtSn = -1
        if (this.filter.provinceSn !== -1) {
          const { data } = await fetchDistricts({ limit: 100, status: 1, provinceSn: this.filter.province })
          this.districts = [...this.districts, ...data.data.districts]
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingDistrict = false
      }
    },
    async onAdd () {
      this.ui.isTableLoading = true
      try {
        const { data } = await onAddPromotionApply(this.filter)
        this.data = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    async onDelete (args) {
      this.ui.isTableLoading = true
      try {
        const params = {
          promotionSn: args.sn,
          limit: this.filter.limit
        }
        const { data } = await onRemovePromotionApply(params)
        this.data = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    async onBack () {
      this.ui.isTableLoading = true
      try {
        if (this.$route.query.page !== 'groupPromotion') {
          const { data } = await onBackPromotionApply()
          if (data.code === 1) {
            this.onCallChangeTab()
          }
        } else {
          this.onCallChangeTab()
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    async onSave () {
      this.ui.isTableLoading = true
      try {
        const { data } = await onSavePromotionApply({ applyTarget: this.filter.applyTarget })
        if (data.code === 1) {
          this.onCallChangeTab()
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    onCallChangeTab () {
      this.$emit('onCallChangeTab', this.filter.applyTarget, this.data.length)
    },
    onSizeChange (size) {
      this.filter.limit = size
      this.onGetApply()
    },
    onCurrentChange (currentPage) {
      this.filter.page = currentPage
      this.onGetApply()
    },
    getPromotionType (type) {
      switch (type) {
        case 0:
          return this.$t('page.promotion.all')
        case 1:
          return this.$t('page.promotion.apply')
        case 2:
          return this.$t('page.promotion.event')
        case 3:
          return this.$t('page.promotion.inviteFriend')
        case 4:
          return this.$t('page.promotion.gift')
        case 5:
          return this.$t('page.promotion.booking')
        case 6:
          return this.$t('page.promotion.reportNewHotel')
        case 7:
          return this.$t('page.promotion.signUp')
        case 8:
          return this.$t('page.promotion.birthday')
        case 9:
          return this.$t('page.promotion.payment')
        case 10:
          return this.$t('page.promotion.voucherCode')
        default:
          break
      }
    },
    getDiscountType (json) {
      switch (json.discountType) {
        case 1:
          return this.formatMoney(json.discount) + ' VND'
        case 2:
          return json.discount + ' %'
        case 5:
          return '<span class="bold" style="font-weight: bold">ĐG</span> ' + this.formatMoney(json.discount)
      }
    },
    getStatus (status) {
      switch (status) {
        case 0:
          return this.$t('page.promotion.deleted')
        case 1:
          return this.$t('page.promotion.active')
        case 2:
          return this.$t('page.promotion.expired')
        case 3:
          return this.$t('page.promotion.not_yet')
        case 4:
          return this.$t('page.promotion.draft')
        case 5:
          return this.$t('page.promotion.wait_confirm')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.promo__filters{
  display: block;
  width: 100%;
}
.float-right{
  float: right;
}
.section__header {
  margin-top: 0;
}
</style>
