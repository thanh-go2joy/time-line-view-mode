<template>
  <sa-section v-loading="ui.isLoading">
    <div>
      <el-row class="is-flex">
        <el-col :span="6" class="background">
          <p>{{ $t('page.promotion.title') }}</p>
        </el-col>
        <el-col :span="18">
          {{ data.title }}
        </el-col>
      </el-row>
      <el-row class="is-flex">
        <el-col :span="6" class="background">
          <p>{{ $t('page.promotion.type') }}</p>
        </el-col>
        <el-col :span="18">
          {{ getType(data.type) }}
        </el-col>
      </el-row>
      <el-row class="is-flex">
        <el-col :span="6" class="background">
          <p>{{ $t('page.promotion.applyStartEnd') }}</p>
        </el-col>
        <el-col :span="18">
          {{ data.applyStart + ' ~ ' + data.applyEnd }}
        </el-col>
      </el-row>
      <el-row class="is-flex">
        <el-col :span="6" class="background">
          <p>{{ $t('page.promotion.couponStartEnd') }}</p>
        </el-col>
        <el-col :span="18">
          {{ data.couponStart + ' ~ ' + data.couponEnd }}
        </el-col>
      </el-row>
      <el-row class="is-flex">
        <el-col :span="6" class="background">
          <p>{{ $t('page.promotion.discount') }}</p>
        </el-col>
        <el-col :span="18">
          {{ data.discount }}
        </el-col>
      </el-row>
      <el-row class="is-flex">
        <el-col :span="6" class="background">
          <p>{{ $t('page.promotion.totalUserApplied') }}</p>
        </el-col>
        <el-col :span="18">
          {{ data.totalUserApplied }}
        </el-col>
      </el-row>
    </div>
    <div style="position:relative; margin-top: 12px">
      <p class="header-content">{{ $t('page.promotion.userAppliedList') }}</p>
      <el-select
        class="user-type-select"
        v-model="filter.type"
        element-loading-spinner="el-icon-loading"
        prefix-icon="el-icon-search"
        :placeholder="$t('page.hotelDisplay.hotelName')"
        @change="listUserApply"
      >
        <el-option
          v-for="(item, index) in userAppliedType"
          :key="index"
          :label="$t(item.key)"
          :value="item.value"
        />
      </el-select>
      <el-table
        :data="dataTable"
        v-loading="ui.isLoadingTable"
      >
        <el-table-column label="#" type="index" />
        <el-table-column :label="$t('page.promotion.nickName')" :min-width="85">
          <template slot-scope="scope">
            <router-link
              :to="{name: 'userDetails', params:{sn: scope.row.sn }}"
            >
              {{ scope.row.userNickname }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.gender')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ getGender(scope.row.gender) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.birthday')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ scope.row.birthday }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.mobile')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ scope.row.mobile }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.registerTime')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ scope.row.registerTime }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.applyTime')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ scope.row.appliedTime }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.userMgt.operations')" :min-width="85">
          <template slot-scope="scope">
            <el-link @click="chooseWinner(scope.row.sn)">
              {{ $t('button.chooseWinner') }}
            </el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { getPromotion, listUserApply, chooseWinner } from './api'

export default {
  name: 'CouponCondition',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        isLoading: false,
        isLoadingTable: false
      },
      data: {},
      dataTable: [],
      filter: {
        page: 1,
        limit: 10,
        type: 0
      },
      userAppliedType: [
        { key: 'page.promotion.waitingList', value: 0 },
        { key: 'page.promotion.winner', value: 1 }
      ]
    }
  },
  computed: {},
  created () {
    this.getPromotion()
    this.listUserApply()
  },
  methods: {
    async listUserApply () {
      this.ui.isLoadingTable = true
      try {
        const { data } = await listUserApply(this.$route.params.sn, this.filter)
        if (data.code === 1) {
          this.dataTable = data.userApplyList
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingTable = false
      }
    },
    async getPromotion () {
      this.ui.isLoading = true
      try {
        const { data } = await getPromotion(this.$route.params.sn)
        if (data.code === 1) {
          this.data = data.data
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    async chooseWinner (id) {
      this.ui.isLoadingTable = true
      try {
        const { data } = await chooseWinner({ eventRegisterSn: id })
        if (data.code === 1) {
          this.$message({
            type: 'success',
            message: this.$t('message.success')
          })
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingTable = false
      }
    },
    getType (value) {
      if (value) {
        switch (value) {
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
            return ''
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
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
.background {
  background-color: #f0f0f0;
}
.header-content{
  padding: 10px 16px;
  background-color: #5db2ff;
  color: #ffff;
  margin-bottom: 45px;
}
.user-type-select{
  position: absolute;
  margin: 2%;
  top: 0;
  background-color: #ffff;
}
</style>
