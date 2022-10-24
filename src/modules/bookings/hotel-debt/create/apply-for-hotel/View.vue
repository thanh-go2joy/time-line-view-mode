<template>
  <sa-section>
    <div class="hote-debt-mgt__filters">
      <el-form
        :inline="true"
        :model="filter"
        class="demo-form-inline float-left"
      >
        <el-form-item>
          <el-select
            v-model="filter.applyTarget"
          >
            <el-option
              v-for="(item, index) in ui.appLyType"
              :key="index"
              :label="$t(item.key)"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            :disabled="isDisabledExport"
            v-model="filter.provinceSn"
            v-loading="ui.loadingProvince"
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
            :disabled="isDisabledExport"
            v-model="filter.districtSn"
            v-loading="ui.loadingDistrict"
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
          <el-button
            :disabled="isDisabledExport"
            :icon="'el-icon-plus'"
            type="primary"
            plain
            v-on:click="addHotelApply">
              {{$t('button.add')}}
          </el-button>
        </el-form-item>
        <el-form-item>
          <upload-file
            accept=".xlsx, .xls, .csv"
            :isDisabled="isDisabledExport"
            @change="handleExceed"
          />
        </el-form-item>
      </el-form>
      <div class="float-right">
        <el-button
          :loading="ui.isCallAPI"
          @click="onGetBack"
        >
          {{ $t('button.back') }}
        </el-button>
        <el-button
          :loading="ui.isCallAPI"
          @click="onSave"
        >
          <i class="el-icon-plus" />
          {{ $t('button.save') }}
        </el-button>
      </div>
    </div>
    <div class="apply-for-hotel__table">
      <el-table :data="tableData" v-loading="ui.isTableLoading">
        <el-table-column label="#" type="index" />
        <el-table-column
          :label="$t('page.hotelDebt.hotel_name')"
          :min-width="200"
        >
          <template slot-scope="scope">
            <router-link
              :to="{ name: 'UserDetail', query: { sn: scope.row.sn } }"
            >
              {{ scope.row.name }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.hotelDebt.code')" :min-width="150">
          <template slot-scope="scope">
            <p>
              {{ scope.row.code }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelDebt.status')"
          :min-width="120"
        >
          <template slot-scope="scope">
            <p>
              {{ getHotelStatus(scope.row.hotelStatus) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('page.hotelDebt.phone')" :min-width="150">
          <template slot-scope="scope">
            <p>
              {{ scope.row.phone }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelDebt.address')"
          :min-width="240"
        >
          <template slot-scope="scope">
            <p>
              {{ scope.row.address }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelDebt.create_time')"
          :min-width="160"
        >
          <template slot-scope="scope">
            <p>
              {{ formatDate(scope.row.createTime) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelDebt.last_update')"
          :min-width="180"
        >
          <template slot-scope="scope">
            <p>
              {{ formatDate(scope.row.lastUpdate) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelDebt.last_update')"
          :min-width="150"
        >
          <template slot-scope="scope">
            <el-button
              type="danger"
              plain
              size="small"
              @click="onDelete(scope.row.sn)"
            >
              {{ $t('button.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <template slot="footer">
        <el-pagination
          @size-change="onSizeChange"
          @current-change="onCurrentChange"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pagination.perPage"
          :current-page="filter.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        />
      </template>
    </div>
  </sa-section>
</template>
<script>
import saSection from '@/components/globals/SaSection.vue'
import { listHotelApply, addHotelApply, importHotelApply, onSaveHotelApply, onRemoveHotelApply } from './api'
import { fetchProvinces, fetchDistricts } from '@/api/province'
import UploadFile from '@/components/globals/UploadFile'

export default {
  name: 'HotelDebtDetail',
  components: {
    saSection,
    UploadFile
  },
  data () {
    return {
      tableData: [],
      pagination: {},
      provinces: [],
      districts: [{ name: this.$t('page.collection.all'), sn: -1 }],
      filter: {
        limit: 10,
        page: 1,
        applyTarget: 1,
        provinceSn: -1,
        districtSn: -1,
        keyword: ''
      },
      ui: {
        isTableLoading: false,
        loadingProvince: false,
        loadingDistrict: false,
        isCallAPI: false,
        appLyType: [
          { key: 'page.hotelDebt.apply_all_hotel', value: 1 },
          { key: 'page.hotelDebt.apply_all_hotel_except', value: 2 },
          { key: 'page.hotelDebt.only_apply', value: 3 }
        ]
      }
    }
  },
  computed: {
    ApplyType () {
      let applyType
      switch (localStorage.getItem('ApplyType')) {
        case '1':
          applyType = this.$t('page.hotelDebt.apply_all_hotel')
          break
        case '2':
          applyType = this.$t('page.hotelDebt.apply_all_hotel_except')
          break
        case '3':
          applyType = this.$t('page.hotelDebt.only_apply')
          break
        default:
          applyType = this.$t('page.hotelDebt.apply_all_hotel')
          break
      }
      return applyType
    },
    isDisabledExport () {
      if (this.filter.applyTarget === 1) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.listProvinces()
    this.listHotelApply()
  },

  methods: {
    async listHotelApply () {
      try {
        this.ui.isTableLoading = true
        const { data } = await listHotelApply()
        if (data.data.hotels?.length > 0) {
          this.tableData = data.data.hotels
        }
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    async addHotelApply () {
      try {
        this.ui.isTableLoading = true
        const { data } = await addHotelApply()
        if (data.data.hotels?.length > 0) {
          this.tableData = data.data.hotels
        }
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
        this.provinces = [{ name: this.$t('page.collection.all'), sn: -1 }]
        const { data } = await fetchProvinces({ limit: 100, status: 1 })
        this.provinces = [...this.provinces, ...data.data.provinces]
      } catch (error) {
        return false
      } finally {
        this.ui.loadingProvince = false
      }
    },
    async listDistricts () {
      this.ui.loadingDistrict = true
      try {
        this.districts = [{ name: this.$t('page.collection.all'), sn: -1 }]
        if (this.filter.province !== -1) {
          const { data } = await fetchDistricts({ limit: 100, status: 1, provinceSn: this.filter.province })
          this.districts = [...this.districts, ...data.data.districts]
        }
      } catch (error) {
        return false
      } finally {
        this.ui.loadingDistrict = false
      }
    },
    async handleExceed (file) {
      try {
        this.ui.isTableLoading = true
        const formData = new FormData()
        formData.append('file', file)
        const { data } = await importHotelApply(this.filter.limit, this.filter.applyTarget, formData)
        if (data.data.hotels?.length > 0) {
          this.tableData = data.data.hotels
        }
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    async onGetBack () {
      try {
        this.ui.isCallAPI = true
        const { data } = await onSaveHotelApply({ applyTarget: this.filter.applyTarget })
        if (data.code === 1) {
          this.$router.push({
            name: 'hotelDebtCreate',
            query: {
              createType: this.$route.query.typeHotelDebt
            }
          })
        }
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isCallAPI = false
      }
    },
    async onSave () {
      try {
        this.ui.isCallAPI = false
        const { data } = await onSaveHotelApply(this.filter)
        if (data.code === 1) {
          this.$router.push({
            name: 'hotelDebtCreate',
            query: {
              createType: this.$route.query.typeHotelDebt
            }
          })
        }
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isCallAPI = false
      }
    },
    async onDelete (sn) {
      try {
        this.ui.isTableLoading = true
        const { data } = await onRemoveHotelApply({ hotelSn: sn, limit: this.filter.limit })
        if (data.data.hotels?.length > 0) {
          this.tableData = data.data.hotels
        }
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    onSizeChange (size) {
      this.filter.limit = size
      this.listHotetDebt()
    },
    onCurrentChange (currentPage) {
      this.filter.page = currentPage
      this.listHotetDebt()
    },
    getHotelStatus (status) {
      switch (status) {
        case 3:
          return this.$t('page.hotelDebt.contracted')
        case 5:
          return this.$t('page.hotelDebt.terminated')
        case 6:
          return this.$t('page.hotelDebt.suspended')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mar-12 {
  margin: 0 12px;
}
</style>
