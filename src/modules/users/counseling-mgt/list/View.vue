<template>
  <sa-section>
    <template slot="header">
      <div class="float-left">
        <div class="un-read">
          <div class="un-read__icon" />&nbsp;
          <span class="un-read__label">{{$t('page.counselingMgt.unread')}}</span>
        </div>
        <el-form :inline="true" :model="filter" class="demo-form-inline">
            <el-form-item>
              <el-input
                v-model="filter.keyword"
                :placeholder="$t('placeholder.keyword')"
                clearable
                prefix-icon="el-icon-search"
                @input="listCounseling"
              />
            </el-form-item>
            <el-form-item>
              <sa-select-check
                v-model="regionListSn"
                :isCheckAll="true"
                label="value"
                keyValue="name"
                :model-check-all="checkBox.checkAllRegion"
                :options="region"
                @changeCheckAll="handleCheckAllRegion"
                @input="listProvinces()"
                translate
              />
            </el-form-item>
            <el-form-item>
              <sa-select-check
                v-loading="ui.loadingProvince"
                v-model="filter.provinceSn"
                :isCheckAll="true"
                label="sn"
                keyValue="name"
                :model-check-all="checkBox.checkAllProvince"
                :options="provinces"
                @changeCheckAll="handleCheckAllProvince"
                @input="listCounseling()"
                translate
              />
            </el-form-item>
        </el-form>
      </div>
      <div class="float-right">
        <el-button
          type="danger"
          plain
          @click="onCreate"
        >
          <i class="el-icon-plus" />
          {{$t('button.add')}}
        </el-button>
      </div>
    </template>
    <el-table
      :data="data"
      :row-class-name="rowContentStyle"
      v-loading="ui.isTableLoading"
    >
      <el-table-column
        label="#"
        type="index"
      />
      <el-table-column
        :label="$t('page.counselingMgt.scope')"
        :min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.scope === 1 ? $t('option.public') : $t('option.private') }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.counselingMgt.title')"
        :min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.counselingMgt.nickname')"
        :min-width="160"
      >
        <template slot-scope="scope">
          <router-link
            :to="{name: 'userDetails', params: { sn: scope.row.appUserSn }}"
          >
            {{ scope.row.nickName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.counselingMgt.create_time')"
        :min-width="220"
      >
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.counselingMgt.last_update')"
        :min-width="180"
      >
        <template slot-scope="scope">
          <p>
            {{ scope.row.lastUpdate }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.operations')"
        align="center"
        :min-width="120"
      >
        <template slot-scope="scope">
          <el-popover
            placement="left"
            trigger="click"
          >
            <i slot="reference" class="operations el-icon-more" />
            <div style="padding: 8px 12px;">
              <el-button
                type="success"
                plain
                size="small"
                icon="el-icon-edit"
                @click="onDirectEdit(scope.row.sn)"
              >
                {{ $t('button.reply') }}
              </el-button>
              <el-button
                type="danger"
                plain
                size="small"
                icon="el-icon-delete"
                @click="onDelete(scope.row.sn)"
              >
                {{ $t('button.delete') }}
              </el-button>
            </div>
          </el-popover>
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
      :total="pagination.total">
    </el-pagination>
  </sa-section>
</template>
<script>
import saSection from '@/components/globals/SaSection.vue'
import { listCounseling, onDeleteCounseling } from './api'
import { fetchListProvinces } from '@/api/province'
import SaSelectCheck from '@/components/globals/SaSelectCheck.vue'
import { region } from '@/utils/const'
const allRegion = region.reduce(function async (preValue, curValue) {
  return preValue.concat(curValue.value)
}, [])
export default {
  name: 'CounselingsMgt',
  components: {
    saSection,
    SaSelectCheck
  },
  data: (vm) => {
    return {
      pagination: {},
      filter: {
        limit: 10,
        page: 1,
        keyword: '',
        provinceSn: []
      },
      regionListSn: [],
      data: [],
      provinces: [],
      region: region,
      ui: {
        isTableLoading: false,
        loadingProvince: false,
        loadingDistrict: false,
        provinceOptions: []
      },
      checkBox: {
        checkAllProvince: false,
        checkAllRegion: false
      }
    }
  },
  created () {
    this.listCounseling()
  },
  watch: {
    regionListSn: function () {
      this.filter.provinceSn = []
    }
  },
  methods: {
    async listCounseling () {
      this.ui.isTableLoading = true
      try {
        const { data } = await listCounseling(this.filter)
        this.data = data.data.counselings
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    async listProvinces () {
      this.ui.loadingProvince = true
      try {
        this.provinces = []
        if (this.regionListSn.length > 0) {
          const { data } = await fetchListProvinces(this.regionListSn)
          this.ui.provinceOptions = await data.data.provinces.reduce(function async (preValue, curValue) {
            return preValue.concat(curValue.sn)
          }, [])
          this.provinces = data.data.provinces
        }
      } catch (error) {
        return false
      } finally {
        this.ui.loadingProvince = false
      }
    },
    handleCheckAllRegion (val) {
      this.checkBox.checkAllRegion = val
      this.regionListSn = val ? allRegion : []
      this.listProvinces()
    },
    handleCheckAllProvince (val) {
      this.checkBox.checkAllProvince = val
      this.filter.provinceSn = val ? this.ui.provinceOptions : []
      this.listCounseling()
    },
    onSizeChange (size) {
      this.filter.limit = size
      this.listCounseling()
    },
    onCurrentChange (currentPage) {
      this.filter.page = currentPage
      this.listCounseling()
    },
    onDirectEdit (sn) {
      this.$router.push({ name: 'replyCounselings', params: { sn: sn } })
    },
    onCreate () {
      this.$router.push({ name: 'createCounselings' })
    },
    async onDelete (sn) {
      this.$confirm(
        this.$t('message.messageAlert'),
        this.$t('message.messageWarning'), {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(async () => {
        try {
          await onDeleteCounseling(sn)
          this.listCounseling(this.filter)
          this.$message({
            type: 'success',
            message: this.$t('message.success')
          })
        } catch (error) {
          return false
        }
      })
    },
    rowContentStyle ({ row, rowIndex }) {
      if (row.qaStatus === 1) {
        return ' un-read-row'
      }
    }
  }
}
</script>
<style lang="scss">
.un-read {
  display: flex;
  margin-bottom: 12px;
  &__icon{
    background-color: #5dcc0b7d !important;
    width: 30px;
    height: 30px;
  }
  &__label{
    margin: auto 0;
  }
}
.un-read-row {
  background-color: #5dcc0b7d !important;
}
</style>
