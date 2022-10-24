<template>
<sa-section class="dashboard-block">
  <div class="confirm-group-segment"  v-loading="ui.loadingConfirmGroup">
    <div class="confirm-group-segment__filter" >
      <!-- select types -->
      <el-select
        v-model="queryConfirmGroup.type"
        @change="changeTypeConfirmGroup"
      >
        <el-option
          v-for="(item, index) in types"
          :key="index"
          :label="$t(item.label)"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <!-- select staff -->
      <el-select
        v-model="queryConfirmGroup.keyword"
        v-loading="ui.loadingSuggestionsStaff"
        element-loading-spinner="el-icon-loading"
        :placeholder="$t('page.confirmGroup.placeholder')"
        remote
        filterable
        @change="handleSearch"
        :remote-method="searchSuggestionsStaff"
        prefix-icon="el-icon-search"
        clearable
      >
        <ElOption
          v-for="(item, index) in listSuggestionsStaff"
          :key="index"
          :label="getLabelStaff(item)"
          :value="item.sn"
          style="font-size: 13px; color: #4a5d6e;"
        />
      </el-select>

      <!-- select regions -->
      <el-select
        v-model="queryAddConfirmGroup.region"
        @change="changeRegionConfirmGroup"
      >
        <el-option
          v-for="(item, index) in regions"
          :key="index"
          :label="$t(item.label)"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <!-- select level -->
      <el-select
        v-model="queryAddConfirmGroup.level"
        @change="changeLevelConfirmGroup"
      >
        <el-option
          v-for="(item, index) in levels"
          :key="index"
          :label="$t(item.label)"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <!-- select confirm -->
      <el-select
        v-model="queryAddConfirmGroup.confirm"
        @change="changeConfirmGroup"
      >
        <el-option
          v-for="(item, index) in confirms"
          :key="index"
          :label="$t(item.label)"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <!-- add confirm group -->
      <el-button
      v-if="hasPermission('saconfirmgroup', 'pCreate')" :disabled="!staffSelected"
          @click="addConfirmGroup"
          type="warning"
          plain
          icon="el-icon-plus"
        >
          {{ $t('button.add') }}
        </el-button>
    </div>
    <div>
      <div class="confirm-group-segment__hotel-name">
        <div class="is-title">
          <p>{{ $t('page.confirmGroup.level1') }}</p>
        </div>
        <div class="is-select">
          <el-select
          v-model="queryConfirmGroup.allConfirm"
          @change="changeConfirmOptionSelected"
        >
          <el-option
            v-for="(item, index) in allConfirm.options"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        </div>
      </div>
      <el-table
      :data="tableData"
      class="confirm-group-segment__table"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="20"
      />
      <el-table-column
        :label="$t('page.confirmGroup.staffName')"
        min-width="100"
      >
        <template slot-scope="scope">
          <router-link
            :to="{ name: 'go2joyStaffDetails', params: { sn: scope.row.staffSn }}"
          >
          {{ scope.row.staffName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.confirmGroup.roleName')"
        min-width="80"
      >
        <template slot-scope="scope">
          <span> {{ scope.row.roleName }} </span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.confirmGroup.mobile')"
        min-width="80"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.mobile }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.confirmGroup.enable')"
        min-width="80"
      >
        <template slot-scope="scope">
          <p>{{ getLabelEnable(scope.row.region) }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.confirmGroup.confirmPermission')"
        min-width="60"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.confirm">✔</p>
          <p v-else></p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.confirmGroup.createTime')"
        min-width="80"
      >
        <template slot-scope="scope">
          <p>{{ formatDate(scope.row.createTime) }}</p>
        </template>
      </el-table-column>
      <el-table-column :label="$t('page.confirmGroup.operations')" align="center" min-width="50">
          <template slot-scope="scope">
              <el-popover placement="left" trigger="click">
                  <i slot="reference" class="operations el-icon-more" />
                  <div style="padding: 8px 12px;">
                      <el-button type="danger" plain size="small" icon="el-icon-delete" @click="onDeleteConfirmGroup(scope.row.sn)">
                          {{ $t('button.delete')}}
                      </el-button>
                  </div>
              </el-popover>
          </template>
        </el-table-column>
    </el-table>
    </div>
  </div>
  <template slot="footer" class="confirm-group-segment__footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryConfirmGroup.page"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagination.perPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </template>
</sa-section>
</template>

<script>
// @ is an alias to /src
import { debounce } from '@/utils/helpers'
import {
  getStaffList,
  getConfirmGroup,
  deleteConfirmGroup,
  addConfirmGroup,
  chooseLevelConfirmGroup
} from './api'
import SaSection from '../../../components/globals/SaSection.vue'
const timeDebounce = 500
export default {
  name: 'ConfirmGroupMgt',
  components: {
    SaSection
  },
  data (vm) {
    return {
      ui: {
        loadingConfirmGroup: true,
        loadingSuggestionsStaff: false
      },
      pagination: {},
      queryConfirmGroup: {
        limit: 10,
        page: 1,
        keyword: '',
        type: 1,
        allConfirm: 1
      },
      queryAddConfirmGroup: {
        region: 0,
        level: 1,
        confirm: 1
      },
      queryStaff: {
        limit: 10,
        filter: 1,
        keyword: ''
      },
      tableData: [],
      dataRes: null,

      listSuggestionsStaff: [],
      staffSelected: 0
    }
  },
  async created () {
    await this.getConfirmGroup(this.queryConfirmGroup)
    await this.fetchSuggestionsStaff(this.queryStaff)
  },
  computed: {
    getLocalize () {
      return this._i18n.locale
    },
    types () {
      return [
        { label: this.$t('option.type.transfer_booking'), value: 4 },
        { label: this.$t('option.type.promotion'), value: 1 },
        { label: this.$t('option.type.invite_friend'), value: 2 },
        { label: this.$t('option.type.product'), value: 3 }
      ]
    },
    regions () {
      return [
        { label: this.$t('option.region.all_region'), value: 0 },
        { label: this.$t('option.region.south'), value: 1 },
        { label: this.$t('option.region.north'), value: 2 },
        { label: this.$t('option.region.middle'), value: 3 }
      ]
    },
    levels () {
      return [
        { label: this.$t('option.level.level1'), value: 1 },
        { label: this.$t('option.level.level2'), value: 2 }
      ]
    },
    confirms () {
      return [
        { label: this.$t('option.regionConfirm.confirm'), value: 1 },
        { label: this.$t('option.regionConfirm.view'), value: 0 }
      ]
    },
    allConfirm () {
      return {
        options: [
          { label: 'Xác nhận đơn', value: 0 },
          { label: 'Tất cả xác nhận', value: 1 }
        ]
      }
    }
  },
  methods: {
    async getConfirmGroup (params) {
      this.ui.loadingConfirmGroup = true
      try {
        const { data } = await getConfirmGroup(params)
        this.tableData = data.data.confirmGroups
        if (data?.data?.confirmGroups?.length > 0) {
          this.queryConfirmGroup.allConfirm = data?.data?.confirmGroups[0]?.allConfirm
        }
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loadingConfirmGroup = false
      }
    }, // getProductTypeList

    async fetchSuggestionsStaff (params) {
      this.ui.loadingSuggestionsStaff = true
      try {
        const { data } = await getStaffList(params)
        this.listSuggestionsStaff = data.data.staffs
      } catch (error) {
        return false
      } finally {
        this.ui.loadingSuggestionsStaff = false
      }
    }, // getProductList

    handleSearch: debounce(function (value) {
      this.staffSelected = value
    }, timeDebounce), // handleSearch
    async addConfirmGroup () {
      this.ui.loadingConfirmGroup = true
      const formData = {
        type: this.queryConfirmGroup.type,
        level: this.queryAddConfirmGroup.level,
        allConfirm: 0,
        staffSn: this.staffSelected,
        confirm: this.queryAddConfirmGroup.confirm,
        region: this.queryAddConfirmGroup.region
      }
      try {
        const { data } = await addConfirmGroup(formData)
        this.dataRes = data
        if (data.code === 1) {
          this.$message({
            type: 'success',
            message: `${this.$t('message.addSuccess')}`
          })
          this.getConfirmGroup(this.queryConfirmGroup)
        }
      } catch (error) {
        return false
      } finally {
        this.ui.loadingConfirmGroup = false
      }
    },
    handleSizeChange (value) {
      // this.pagination.perPage = value
      this.queryConfirmGroup.limit = value
      this.getConfirmGroup(this.queryConfirmGroup)
    }, // handleSizeChange

    handleCurrentChange (value) {
      // this.pagination.currentPage = value
      this.queryConfirmGroup.page = value
      this.getConfirmGroup(this.queryConfirmGroup)
    }, // handleCurrentChange

    getLabelEnable (region) {
      if (!region && region !== 0) {
        return
      }
      switch (region) {
        case 0:
          return this.$t('option.region.all_region')
        case 1:
          return this.$t('option.region.south')
        case 2:
          return this.$t('option.region.north')
        case 3:
          return this.$t('option.region.middle')
        default:
          return ''
      }
    },

    getLabelStaff (item) {
      return item.fullName + ' (' + item.hotel.name + ') - ' + item.mobile + (item.address ? ' / ' + item.address : '')
    },
    onDeleteConfirmGroup (id) {
      this.$confirm(`${this.$t('message.areYouSure')}`, `${this.$t('button.delete')}`, {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        this.ui.loadingConfirmGroup = true
        try {
          const { data } = await deleteConfirmGroup(id)
          if (data.code === 1) {
            this.$message({
              type: 'success',
              message: `${this.$t('message.deleteSuccess')}`
            })
            this.getConfirmGroup(this.queryConfirmGroup)
          }
        } catch (error) {
          return false
        } finally {
          this.ui.loadingConfirmGroup = false
        }
      }).catch(error => {
        this.ui.loadingConfirmGroup = false
        this.$message({
          type: 'error',
          message: error.response ? error.response.data.message : error
        })
      })
    },

    changeTypeConfirmGroup (value) {
      this.queryConfirmGroup.type = value
      this.queryConfirmGroup.page = 1
      this.getConfirmGroup(this.queryConfirmGroup)
    },
    changeConfirmOptionSelected (value) {
      this.queryConfirmGroup.allConfirm = value
      this.chooseLevelConfirmGroup()
    },
    changeRegionConfirmGroup (value) {
      this.queryAddConfirmGroup.region = value
    },
    changeLevelConfirmGroup (value) {
      this.queryAddConfirmGroup.level = value
    },
    changeConfirmGroup (value) {
      this.queryAddConfirmGroup.confirm = value
    },
    async chooseLevelConfirmGroup () {
      this.ui.loadingConfirmGroup = true
      const formData = {
        type: this.queryConfirmGroup.type,
        level: this.queryAddConfirmGroup.level,
        allConfirm: this.queryConfirmGroup.allConfirm
      }
      try {
        const { data } = await chooseLevelConfirmGroup(formData)
        this.dataRes = data
        if (data.code === 1) {
          this.$message({
            type: 'success',
            message: `${this.$t('message.updateSuccess')}`
          })
          this.queryConfirmGroup.page = 1
          this.getConfirmGroup(this.queryConfirmGroup)
        }
      } catch (error) {
        return false
      } finally {
        this.ui.loadingConfirmGroup = false
      }
    },
    searchSuggestionsStaff: debounce(function (value) {
      this.queryStaff.keyword = value
      this.fetchSuggestionsStaff(this.queryStaff)
    }, timeDebounce) // handleSearch
  }
}
</script>

<style lang="scss" scoped>
.operations {
  cursor: pointer;
  transform: rotate(90deg);
  &:hover {
    color: #ff6400;
  }
}
.el-table th, .el-table .custom-style-background{
  background-color: #fce5e5 !important;
}
.confirm-group-segment{
    min-height: calc(100vh - 150px );
    background-color: #ffffff;
    .el-select {
      padding: 0 5px;
    }
  &__hotel-name{
    background-color: rgb(93, 178, 255);
    width:100%;
    padding:10px;
    font-weight: bold;
    color: black;
    float: left;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    .is-title {
      color: #000000;
    }
    .is-select {
      float: right;
      text-align: right;
    }
  }
  .el-table {
    td {
      font-size: 12px;
    }

  }
  &__header {
    margin-bottom: 20px;
    &--red {
      color: #F56C6C;
    }
  }
  &__footer {
    margin-top: 30px  ;
  }
  &__filter {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    @media (max-width: 480px) {
      display: block !important;
    }
    .el-input {
      width: 300px;
    }
    .el-input--suffix {
      margin: 0 12px;

    }
    .el-select {
      @media (max-width: 480px) {
        margin: 12px 0 !important;
      }
    }
  }
}

@media (max-width: 1200px) {
  .operations {
    color: green;
  }
}
</style>
