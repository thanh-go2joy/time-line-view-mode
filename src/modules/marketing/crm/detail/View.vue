<template>
  <sa-section class="detail-crm">
    <template slot="header" class="detail-crm__filters">
      <el-form :inline="true" />
      <div class="float-right">
        <router-link
          class="el-button el-button--default is-plain"
          :to="{ name: 'mobileList', params: {sn: $route.params.sn}}"
          target="_blank"
        >
          <i class="el-icon-tickets" />
          {{ $t('button.mobileLists') }}
        </router-link>
        <el-button
          @click="onExportCRM"
        >
          <i class="el-icon-download" />
          {{ $t('button.export') }}
        </el-button>
        <el-button
          type="success"
          @click="onSend"
        >
          <i class="el-icon-s-promotion" />
          {{ (!$route.query.type ? $t('button.save')+'&': '') + $t('button.send') }}
        </el-button>
        <el-button
          type="success"
          v-if="!$route.query.type"
          @click="onSave"
        >
          <i class="el-icon-s-promotion" />
          {{ $t('button.save') }}
        </el-button>
        <router-link
          class="el-button el-button--primary is-plain"
          :to="getBack"
        >
          <i class="el-icon-refresh-left" />
          {{ $t('button.back') }}
        </router-link>
      </div>
    </template>
    <div class="detail-crm__table" v-loading="isLoading">
      <p class="bold" v-html="crmContent.title"></p>
      <p v-html="crmContent.memo"></p>
      <table>
        <tr
          v-for="(crm, indexDetail) in crmContent.detailList"
          :key="indexDetail"
          :class="indexDetail % 2 ? 'even-row' : 'odd-row'"
        >
          <td style="width: 50px">
            {{ crmContent.operator == 1 ? 'AND' : 'OR' }}
          </td>
          <td style="width: 150px">{{ crm.fieldDisplay }}</td>
          <td style="width: 100px">
            <span>
              {{ getOperatorType(crm.criteriaList[0].operator) }}
            </span>
          </td>
          <td
            v-for="(length, indexLength) in crmLength"
            :key="indexLength"
            :class="`criteria-${indexLength}`"
          >
            <div
              v-for="(criteria, indexCriteria) in crm.criteriaList"
              :key="indexCriteria"
            >
              <p
                v-if="
                  criteria.type != 4 && criteria.type != 5 && indexLength == 0
                "
              >
                <span
                  v-if="criteria.type == 1"
                  v-html="getType(criteria.value, crm.fieldFilterSn)"
                >
                </span>
                <span v-else-if="criteria.type == 0" v-html="criteria.value">
                </span>
              </p>
              <p
                v-else-if="criteria.type == 2 && indexLength == 1"
                v-html="criteria.value"
              ></p>
              <p
                v-else-if="criteria.type == 3 && indexLength == 2"
                v-html="criteria.value"
              ></p>
              <el-select
                v-if="criteria.type == 4 && indexLength == 3"
                :value="getProvinceSelected(crm.provinceNameList)"
              >
                <el-option
                  disabled
                  v-for="(pro, inx) in crm.provinceNameList"
                  :key="inx"
                  :label="pro"
                />
              </el-select>
              <el-select
                v-if="criteria.type == 5 && indexLength == 4"
                :value="getDistrictSelected(crm.districtNameList)"
              >
                <el-option
                  disabled
                  v-for="(pro, inx) in crm.districtNameList"
                  :key="inx"
                  :label="pro"
                />
              </el-select>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { getCRM, onSaveCRM, onExportCRM } from './api'

export default {
  name: 'crmDetail',
  components: { SaSection },
  data () {
    return {
      crmContent: {},
      crmLength: 5,
      isLoading: false
    }
  },
  computed: {
    getBack () {
      return !this.$route.query.page ? { name: 'crm' } : { name: 'crmEdit', params: { sn: this.$route.params.sn } }
    }
  },
  created () {
    this.getCRM()
  },
  methods: {
    async getCRM () {
      try {
        this.isLoading = true
        const { data } = await getCRM(this.$route.params.sn)
        this.crmContent = data.data
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    },
    async onSend () {
      await this.onSaveCRM()
      this.$router.push({ name: 'notificationCreate', params: { sn: this.$route.params.sn } })
    },
    async onSave () {
      await this.onSaveCRM()
      this.$router.push({ name: 'crm' })
    },
    async onSaveCRM () {
      try {
        this.isLoading = true
        const { data } = await onSaveCRM(this.$route.params.sn, {
          title: this.crmContent.title,
          memo: this.crmContent.memo
        })
        if (data.code === 1) {
          this.$message({
            type: 'success',
            message: this.$t('message.success')
          })
        }
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    },
    async onExportCRM () {
      try {
        this.isLoading = true
        const { data } = await onExportCRM({ crmFilterSn: this.$route.params.sn })
        if (data.code === 1) {
          this.$message({
            type: 'success',
            message: this.$t('message.success')
          })
        }
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    },
    getOperatorType (type) {
      switch (type) {
        case 0:
          return this.$t('page.crm.equal')
        case 1:
          return this.$t('page.crm.greater')
        case 2:
          return this.$t('page.crm.greaterEqual')
        case 3:
          return this.$t('page.crm.less')
        case 4:
          return this.$t('page.crm.lessEqual')
        case 5:
          return this.$t('page.crm.notEqual')
        default:
          return ' '
      }
    },
    getType (val, type) {
      switch (type) {
        case 2:
          return val === 1
            ? this.$t('page.crm.male')
            : this.$t('page.crm.female')
        case 6:
          return val === 1 ? 'Manual' : val === 2 ? 'Facebook' : 'Google'
        case 12:
          return val === 1 ? 'IOS' : 'Android'
        case 13:
          return val === 1
            ? this.$t('page.crm.install')
            : this.$t('page.crm.uninstall')
        case 14:
          return val === 1
            ? this.$t('page.crm.empty')
            : this.$t('page.crm.notEmpty')
        default:
          return ' '
      }
    },
    getProvinceSelected (arr) {
      return `${arr.length} ${this.$t('placeholder.cmrProvince')}`
    },
    getDistrictSelected (arr) {
      return `${arr.length} ${this.$t('placeholder.cmrDistrict')}`
    }
  }
}
</script>
<style lang="scss">
.crm .style-background-lightgrey {
  background-color: lightgrey;
}
.detail-crm__filters,
.detail-crm__table {
  margin: 10px;
}
.detail-crm__table {
  .even-row {
    background-color: #fafafa;
  }
  .odd-row {
    background-color: #fff;
  }
  td {
    padding: 8px;
    border: 1px solid #ddd;
  }
  .criteria-0 {
    width: 180px;
  }
  .criteria-1,
  .criteria-2 {
    width: 350px;
  }
  .criteria-3,
  .criteria-4 {
    width: 200px;
  }
  p{
    color: #8A98AC;
    margin: 8px 0
  }
}
</style>
