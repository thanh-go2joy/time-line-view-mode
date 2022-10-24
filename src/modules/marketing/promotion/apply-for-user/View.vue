<template>
  <sa-section>
    <div class="user-apply__filters">
      <el-form
        :inline="true"
        :model="filter"
        class="demo-form-inline float-left"
      >
        <el-form-item>
          <el-select
            v-model="filter.type"
            element-loading-spinner="el-icon-loading"
            prefix-icon="el-icon-search"
            :placeholder="$t('page.hotelDisplay.hotelName')"
          >
            <el-option
              v-for="(item, index) in type"
              :key="index"
              :label="$t(item.name)"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="filter.type !== 1">
          <el-select
            v-model="filter.typeDetail"
            element-loading-spinner="el-icon-loading"
            prefix-icon="el-icon-search"
            :placeholder="$t('page.hotelDisplay.hotelName')"
          >
            <el-option
              v-for="(item, index) in addUserType"
              :key="index"
              :label="$t(item.name)"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="filter.type !== 1">
          <el-select
            v-if="filter.typeDetail === 3"
            v-model="filter.numCheckin"
            element-loading-spinner="el-icon-loading"
            prefix-icon="el-icon-search"
          >
            <el-option
              v-for="item in 100"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <upload-file
            v-if="filter.typeDetail === 2"
            accept=".xlsx, .xls, .csv"
            @change="onImportApplyUser"
          />
          <el-date-picker
            v-if="filter.typeDetail === 4"
            v-model="dateRange"
            type="daterange"
          popper-class="custom-date-range"
            range-separator="-"
            :start-placeholder="$t('page.firstBooking.startDate')"
            :end-placeholder="$t('page.firstBooking.endDate')"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :clearable="false"
          />
        </el-form-item>
      </el-form>
      <div class="float-right">
        <el-button :loading="ui.isCallAPI" @click="$emit('onCallChangeTab', filter.type, filter.typeDetail)">
          {{ $t('button.back') }}
        </el-button>
        <el-button :loading="ui.isCallAPI" @click="onSave">
          <i class="el-icon-plus" />
          {{ $t('button.save') }}
        </el-button>
      </div>
    </div>
    <div class="user-apply__table">
      <el-table :data="data" v-loading="ui.isTableLoading">
        <el-table-column label="#" type="index" />
        <el-table-column :label="$t('page.promotion.mobileSn')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ scope.row.deviceSn }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.appUserSn')"
          :min-width="85"
        >
          <template slot-scope="scope">
            <p>
              {{ scope.row.appUserSn }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.os')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ getOs(scope.row.os) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.mobileRegisterTime')"
          :min-width="85"
        >
          <template slot-scope="scope">
            <p>
              {{ scope.row.deviceRegisterTime }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.nickName')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ scope.row.nickName }}
            </p>
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
        <el-table-column :label="$t('page.promotion.email')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ scope.row.email }}
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
        <el-table-column :label="$t('page.promotion.loginBy')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ getLoginBy(scope.row.viaApp) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.effectivePoint')"
          :min-width="85"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.mileageAmount }}/{{ scope.row.mileageEarned }}</p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.promotion.registerTime')"
          :min-width="85"
        >
          <template slot-scope="scope">
            <p>
              {{ scope.row.registerTime }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.promotion.openApp')" :min-width="85">
          <template slot-scope="scope">
            <p>
              {{ scope.row.numOpenApp }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.userMgt.operations')" :min-width="90">
          <template slot-scope="scope">
            <el-button
              type="danger"
              plain
              @click="onDelete(scope.row.appUserSn)"
            >
              {{ $t('button.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagination.perPage"
        :current-page="filter.page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      />
    </div>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import UploadFile from '@/components/globals/UploadFile'

import { listUserApply, onDeleteUserApply, onSaveUserApply } from './api'
export default {
  name: 'UserApply',
  components: { SaSection, UploadFile },
  props: {
    propFilter: {
      type: Object,
      default: () => {}
    },
    propData: {
      type: Array,
      default: () => []
    },
    propPagination: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      ui: {
        isTableLoading: false
      },
      type: [
        { name: 'option.applyUserType.applyAllUser', value: 1 },
        { name: 'option.applyUserType.applyAllUserExcept', value: 2 },
        { name: 'option.applyUserType.onlyApply', value: 3 }
      ],
      addUserType: [
        { name: 'page.issue-coupon-condition.importUserByExcel', value: 2 },
        { name: 'page.issue-coupon-condition.numCheckIn', value: 3 },
        { name: 'page.issue-coupon-condition.signUpPeriod', value: 4 }
      ]
    }
  },
  watch: {},
  computed: {
    data: {
      get () {
        return this.propData
      },
      set (val) {
        this.$emit('reloadData', val)
      }
    },
    pagination: {
      get () {
        return this.propPagination
      },
      set (val) {
        this.$emit('reloadPagination', val)
      }
    },
    filter () {
      return this.propFilter
    },
    dateRange: {
      get () {
        console.log(this.filter)
        return [
          this.filter.startDate ? this.filter.startDate : this.formatDate(new Date()),
          this.filter.endDate ? this.filter.endDate : this.formatDate(new Date())
        ]
      },
      set (val) {
        this.filter.startDate = val[0]
        this.filter.endDate = val[1]
      }
    }
  },
  created () {
  },
  methods: {
    async listUserApply () {
      this.ui.isTableLoading = true
      try {
        const { data } = await listUserApply(
          this.$route.params.couponSn,
          this.filter
        )
        this.data = data.data.users
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    async onDelete (sn) {
      this.$confirm(
        this.$t('message.messageAlert'),
        this.$t('message.messageWarning'),
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
        .then(async () => {
          try {
            const { data } = await onDeleteUserApply(
              this.$route.params.couponSn,
              sn
            )
            if (data.code === 1) {
              this.listUserApply()
              this.$message({
                type: 'success',
                message: this.$t('message.deleteSuccess')
              })
            }
          } catch (error) {
            return false
          }
        })
        .catch((error) => {
          this.$message({
            type: 'info',
            message: error
          })
        })
    },
    async onSave () {
      this.ui.isTableLoading = true
      try {
        const formData = new FormData()
        formData.append('type', this.filter.type)
        formData.append('typeDetail', this.filter.typeDetail)
        if (this.filter.type !== 1) {
          switch (this.filter.typeDetail) {
            case 2:
              formData.append('files', this.filter.files)
              break
            case 3:
              formData.append('numCheckIn', this.filter.numCheckin)
              break
            case 4:
              formData.append(
                'startDate',
                this.formatDate(this.filter.startDate, false)
              )
              formData.append(
                'endDate',
                this.formatDate(this.filter.endDate, false)
              )
              break
          }
        }
        const { data } = await onSaveUserApply(
          this.$route.params.couponSn,
          formData
        )
        if (data.code === 1) {
          this.$emit('onCallChangeTab', this.filter.type)
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    onImportApplyUser (file) {
      this.filter.file = file
    },
    onSizeChange (size) {
      this.$emit('onChangePage', { limit: size, page: this.filter.page })
    },
    onCurrentChange (currentPage) {
      this.$emit('onChangePage', { limit: this.filter.size, page: currentPage })
    },
    getGender (status) {
      switch (status) {
        case 1:
          return this.$t('gender.male')
        case 2:
          return this.$t('gender.female')
      }
    },
    getLoginBy (value) {
      switch (value) {
        case 1:
          return 'Manual'
        case 2:
          return 'Facebook'
        case 3:
          return 'Google'
        case 4:
          return 'Apple'
        default:
          return 'Undefine'
      }
    },
    getOs (os) {
      return os === 1 ? 'IOS' : 'Android'
    }
  }
}
</script>
<style lang="scss" scoped></style>
