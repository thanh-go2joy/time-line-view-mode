<template>
  <sa-section >
    <div v-loading="ui.isLoadingHotelGroupEdit" class="hotel-group-edit-segment">
      <el-form ref="dataEditHotelGroup" :model="dataEditHotelGroup" :rules="rules" label-position="left" label-width="25%" class="hotel-group-edit-segment__form">
        <el-form-item :label="$t('page.hotelGroupEdit.namegroup')" prop="name">
          <el-input
            :placeholder="$t('page.hotelGroupEdit.namegroup')"
            v-model="dataEditHotelGroup.name"
          />
        </el-form-item>
        <el-form-item
          :label="$t('page.hotelGroupEdit.ownerinformation')"
          prop="ownerName"
        >
          <div class="hotel-group-edit-segment__form--col">
            <div class="form-row">
              <el-form-item prop="ownerName">
                <el-input
                :placeholder="$t('page.hotelGroupEdit.ownername')"
                v-model="dataEditHotelGroup.ownerName" />
              </el-form-item>
          </div>
          <div class="form-row-center">
            <el-form-item  prop="ownerTel">
              <el-input
                :placeholder="$t('page.hotelGroupEdit.ownertel')"
                v-model="dataEditHotelGroup.ownerTel"
              />
            </el-form-item>
            <el-form-item :label="$t('page.hotelGroupEdit.addhoteltogroup')" >
                <el-select
                  v-model="value"
                  filterable
                  remote
                  reserve-keyword
                  default-first-option
                  @change="addHotelForTable"
                  :remote-method="handleSearch"
                  :placeholder="$t('page.hotelGroupEdit.addhoteltogroup')">
                  <el-option
                    v-for="item in selectHotel"
                    :key="item.sn"
                    :label="item.name"
                    :value="item"
                    >
                  </el-option>
                </el-select>
            </el-form-item>
          </div>
          </div>
        </el-form-item>
        <el-form-item :label="$t('page.hotelGroupEdit.ownerinformation')">
          <div class="hotel-group-edit-segment__form--col">
            <div class="form-row">
              <el-input
                :placeholder="$t('page.hotelGroupEdit.companyname')"
                v-model="dataEditHotelGroup.companyName"
              />
          </div>
          <div class="form-row-center">
              <el-input
                :placeholder="$t('page.hotelGroupEdit.businesslisencenumber')" v-model="dataEditHotelGroup.bln"
              />
          </div>
          <div class="form-row">
              <el-input
                :placeholder="$t('page.hotelGroupEdit.companytel')"
                v-model="dataEditHotelGroup.companyTel"
              />
          </div>
          </div>
        </el-form-item>
        <el-form-item >
          <div class="hotel-group-edit-segment__form--col">
            <div class="form-row">
              <el-input
                :placeholder="$t('page.hotelGroupEdit.companyemail')"
                v-model="dataEditHotelGroup.companyEmail"
              />
            </div>
            <div class="form-row" />
            <div class="form-row" />
          </div>
        </el-form-item>
        <el-form-item :label="$t('page.hotelGroupEdit.companyaddress')" >
            <el-input :placeholder="$t('page.hotelGroupEdit.companyaddress')" v-model="dataEditHotelGroup.companyAddress" />
        </el-form-item>
        <el-form-item :label="$t('page.hotelGroupEdit.addhoteltogroup')" >
            <el-select
              v-model="value"
              filterable
              remote
              clearable
              reserve-keyword
              default-first-option
              :remote-method="handleSearch"
              :placeholder="$t('page.hotelGroupEdit.addhoteltogroup')"
              @change="addHotelForTable"
            >
              <el-option
                v-for="item in selectHotel"
                :key="item.sn"
                :label="item.name"
                :value="item"
              />
            </el-select>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="ui.isLoadingHotelGroupEdit"
        :data="tableData"
        class="hotel-group-mgt-segment__table"
      >
        <el-table-column
          type="index"
          label="#"
          min-width="20"
        />
        <el-table-column
          :label="$t('page.hotelGroupEdit.table_hotel_name')"
          min-width="100"
        >
          <template slot-scope="scope">
            <router-link
              :to="{ name: 'hotelDisplayDetails', params: { sn: scope.row.sn }}"
            >
            {{ scope.row.name }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelGroupEdit.table_status')"
          min-width="100"
        >
          <template slot-scope="scope">
            <span> {{ setHotelStatus(scope.row.hotelStatus) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelGroupEdit.table_phone')"
          min-width="100"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelGroupEdit.table_address')"
          min-width="100"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelGroupEdit.table_commission')"
          min-width="100"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.commission }}</span>
            <span v-if="scope.row.commission !== 0">%</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelGroupEdit.operations')"
          align="center"
          min-width="50"
        >
          <template slot-scope="scope">
            <el-popover
              placement="left"
              trigger="click"
            >
              <i slot="reference" class="operations el-icon-more" />
              <div style="padding: 8px 12px;">
                <el-button
                  type="danger"
                  plain
                  icon="el-icon-delete"
                  size="small"
                  @click="unGroupHotel(scope.row.sn)"
                >
                  {{ $t('button.ungroup')}}
                </el-button>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <template slot="footer">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="query.page"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pagination.perPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total">
          </el-pagination>

      </template>
      <!-- Etart Contentbar-->
    </div>
    <div class="hotel-group-detail-segment__button" style="text-align: right;padding-top:24px">
          <el-button type="info" size="large" @click="$router.go(-1)">
              {{$t('button.back')}}
          </el-button>
          <el-button type="success" size="large" @click="checkValidate('dataEditHotelGroup')">
              <i class="feather icon-save mr-2" />
              {{$t('button.edit')}}
          </el-button>
        </div>
  </sa-section>
</template>

<script>
import {
  getDataHotelGroupById,
  updateDataHotelGroupById,
  getListHotelForHotelGroupById,
  getHotel
} from './api'
import SaSection from '@/components/globals/SaSection'
export default {
  name: 'editHotelGroup',
  components: {
    SaSection
  },
  data: (vm) => {
    return {
      ui: {
        isLoadingHotelGroupEdit: true
      },
      dataEditHotelGroup: {
        bln: '',
        companyAddress: '',
        companyEmail: '',
        companyName: '',
        companyTel: '',
        name: '',
        ownerEmail: '',
        ownerName: '',
        ownerTel: ''
      },
      file: '',
      imageUrl: '',
      rules: {
        name: [{ required: true, message: vm.$t('page.hotelGroupEdit.requiredNameGroup'), trigger: 'blur' }],
        ownerName: [{ required: true, message: vm.$t('page.hotelGroupEdit.requiredNameOwnerInfo'), trigger: 'blur' }],
        ownerTel: [{ required: true, message: vm.$t('page.hotelGroupEdit.requiredOwnerTel'), trigger: 'blur' }],
        ownerEmail: [{ required: true, message: vm.$t('page.hotelGroupEdit.requiredOwnerEmail'), trigger: 'blur' }]

      },
      dataRes: {},
      pagination: {},
      query: {
        limit: 10,
        page: 1,
        keyword: ''
      },
      selectHotel: [],
      value: [],
      tableData: []
    }
  },
  created () {
    this.getListHotel(this.query)
    this.getHotelGroupById()
    this.getListHotelForHotelGroupById()
  },
  methods: {
    async getHotelGroupById () {
      const id = this.$route.params.id
      this.ui.isLoadingHotelGroupEdit = true
      try {
        const { data } = await getDataHotelGroupById(id)
        this.dataEditHotelGroup = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotelGroupEdit = false
      }
    }, // getListReview
    async getListHotelForHotelGroupById () {
      const id = this.$route.params.id
      this.ui.isLoadingHotelGroupEdit = true
      try {
        const { data } = await getListHotelForHotelGroupById(id, this.query)
        this.tableData = data.data.hotels
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotelGroupEdit = false
      }
    }, // getListReview
    async editHotelGroup () {
      this.ui.isLoadingHotelGroupEdit = true
      const getListHotel = []
      const id = this.$route.params.id
      this.tableData.map(function (item) {
        getListHotel.push({ sn: item.sn })
      })
      const formData = {
        name: this.dataEditHotelGroup.name,
        ownerName: this.dataEditHotelGroup.ownerName,
        ownerTel: this.dataEditHotelGroup.ownerTel,
        ownerEmail: this.dataEditHotelGroup.ownerEmail,
        bln: this.dataEditHotelGroup.bln,
        companyAddress: this.dataEditHotelGroup.companyAddress,
        companyEmail: this.dataEditHotelGroup.companyEmail,
        companyName: this.dataEditHotelGroup.companyName,
        companyTel: this.dataEditHotelGroup.companyTel,
        hotels: getListHotel
      }
      try {
        const { data } = await updateDataHotelGroupById(id, formData)
        this.dataRes = data
        this.$message({
          type: 'success',
          message: `${this.$t('Create success')}`
        })
        this.$router.go(-1)
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotelGroupEdit = false
      }
    }, // addHotelGroup
    handleSearch (query) {
      if (query !== '') {
        this.loading = true
        this.query.keyword = query
        setTimeout(() => {
          this.getListHotel(this.query)
          this.loading = false
        }, 500)
      }
    }, // handleSearch
    async getListHotel (params) {
      try {
        const { data } = await getHotel(params)
        this.selectHotel = data.data.hotels
      } catch (error) {
        return false
      } finally {
      }
    },
    unGroupHotel (sn) {
      this.tableData = this.tableData.filter(function (item) {
        return item.sn !== sn
      })
    },
    addHotelForTable (value) {
      if (this.tableData.length < 1) {
        this.tableData.push(value)
      } else {
        let valueCheck = false
        this.tableData.filter((item, index) => {
          if (item.sn === value.sn) {
            valueCheck = true
          }
        })
        if (valueCheck === false) {
          this.tableData.push(value)
          this.pagination.total = this.tableData.length
        }
      }
    },
    setHotelStatus (value) {
      if (!value) {
        return ''
      }
      switch (value) {
        case 1:
          return this.$t('option.hotelStatus.waiting')
        case 2:
          return this.$t('option.hotelStatus.displayed')
        case 3:
          return this.$t('option.hotelStatus.contracted')
        case 4:
          return this.$t('option.hotelStatus.trial')
        case 5:
          return this.$t('option.hotelStatus.terminated')
        case 6:
          return this.$t('option.hotelStatus.suspended')
        default:
          return ''
      }
    },
    checkValidate (dataEditHotelGroup) {
      this.$refs[dataEditHotelGroup].validate((valid) => {
        if (valid) {
          this.editHotelGroup()
        } else {
          return false
        }
      })
    },
    handleSizeChange (value) {
      // this.pagination.perPage = value
      this.query.limit = value
      const id = this.$route.params.id
      this.getListHotelForHotelGroupById(id)
    },
    handleCurrentChange (value) {
      // this.pagination.currentPage = value
      this.query.page = value
      const id = this.$route.params.id
      this.getListHotelForHotelGroupById(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.hotel-group-edit-segment:deep {
  display: block;
  .el-form-item__content[style] {
    @media (max-width: 480px) {
        margin-left: unset !important;
    }
  }
  .el-form-item__label {
    @media (max-width: 480px) {
      text-align: unset !important;
      width: 100% !important;
    }
  }
  .hotel-group-edit-segment__form--col {
    @media (max-width: 480px) {
      display: revert !important;
    }
  }
  .hotel-group-edit-segment__form--col .form-row-center {
    @media (max-width: 480px) {
      padding: 15px 0 !important;
    }
  }
}
.hotel-group-edit-segment {
  min-height: calc(100vh - 220px);
  background-color: #ffffff;
  &__form {
    &--col{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      .form-row-center{
        padding : 0 15px;
      }
    }
  }

  &__button {
    padding: 15px;
    &--content {
      display: flex;
      justify-content: flex-end;
    }
  }
  .style-color-red {
    color: red;
  }
}
</style>
