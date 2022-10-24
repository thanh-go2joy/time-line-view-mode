<template>
<sa-section>
  <div
    class="hotel-group-create-segment"
    v-loading="ui.isLoadingHotelGroupCreate"
  >
    <el-form
      ref="dataCreatelHotelGroup"
      label-position="left"
      label-width="25%"
      class="hotel-group-create-segment__form"
      :model="dataCreatelHotelGroup"
      :rules="rules"
    >
      <el-form-item
        :label="$t('page.hotelGroupAdd.namegroup')"
        prop="name"
      >
        <el-input
          :placeholder="$t('page.hotelGroupAdd.namegroup')"
          v-model="dataCreatelHotelGroup.name"
        />
      </el-form-item>
      <el-form-item
        :label="$t('page.hotelGroupAdd.ownerinformation')"
        prop="ownerName"
      >
        <div class="hotel-group-create-segment__form--col">
          <div class="form-row">
            <el-form-item prop="ownerName">
              <el-input
                :placeholder="$t('page.hotelGroupAdd.ownername')"
                v-model="dataCreatelHotelGroup.ownerName"
              />
            </el-form-item>
        </div>
        <div class="form-row-center">
          <el-form-item  prop="ownerTel">
            <el-input
              :placeholder="$t('page.hotelGroupAdd.ownertel')"
              v-model="dataCreatelHotelGroup.ownerTel"
            />
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item  prop="ownerEmail">
            <el-input
              :placeholder="$t('page.hotelGroupAdd.owneremail')"
              v-model="dataCreatelHotelGroup.ownerEmail"
            />
          </el-form-item>
        </div>
        </div>
      </el-form-item>
      <el-form-item :label="$t('page.hotelGroupAdd.ownerinformation')">
        <div class="hotel-group-create-segment__form--col">
          <div class="form-row">
            <el-input
              :placeholder="$t('page.hotelGroupAdd.companyname')"
              v-model="dataCreatelHotelGroup.companyName"
            />
        </div>
        <div class="form-row-center">
          <el-input
            :placeholder="$t('page.hotelGroupAdd.businesslisencenumber')" v-model="dataCreatelHotelGroup.bln"
          />
        </div>
        <div class="form-row">
          <el-input
            :placeholder="$t('page.hotelGroupAdd.companytel')"
            v-model="dataCreatelHotelGroup.companyTel"
          />
        </div>
        </div>
      </el-form-item>
      <el-form-item >
        <div class="hotel-group-create-segment__form--col">
          <div class="form-row">
            <el-input
              :placeholder="$t('page.hotelGroupAdd.companyemail')"
              v-model="dataCreatelHotelGroup.companyEmail"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="$t('page.hotelGroupAdd.companyaddress')" >
          <el-input :placeholder="$t('page.hotelGroupAdd.companyaddress')" v-model="dataCreatelHotelGroup.companyAddress" />
      </el-form-item>
      <el-form-item :label="$t('page.hotelGroupAdd.addhoteltogroup')" >
          <el-select
            v-model="value"
            filterable
            remote
            reserve-keyword
            default-first-option
            :remote-method="handleSearch"
            :placeholder="$t('page.hotelGroupAdd.addhoteltogroup')"
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
      <el-table
        v-loading="ui.loadingHotelGroup"
        :data="tableData"
        class="hotel-group-mgt-segment__table"
      >
        <el-table-column
          type="index"
          label="#"
          min-width="20"
        />
        <el-table-column
          :label="$t('page.hotelGroupAdd.table_hotel_name')"
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
          :label="$t('page.hotelGroupAdd.table_status')"
          min-width="100"
        >
          <template slot-scope="scope">
            <span> {{ setHotelStatus(scope.row.hotelStatus) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelGroupAdd.table_phone')"
          min-width="100"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelGroupAdd.table_address')"
          min-width="100"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelGroupAdd.table_commission')"
          min-width="100"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.commission }}</span><span v-if="scope.row.commission !== 0">%</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelGroupAdd.operations')"
          min-width="5"
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
      <el-form-item style="text-align: right;padding-top: 12px;">
    <el-button type="info" size="large" @click="$router.go(-1)">
      {{$t('button.back')}}
    </el-button>
    <el-button type="success" size="large" @click="checkValidate('dataCreatelHotelGroup')">
      <i class="feather icon-save mr-2" />
      {{$t('button.add')}}
    </el-button>
  </el-form-item>
    </el-form>
  </div>

</sa-section>
</template>
<script>
import {
  createHotelGroup,
  getHotel
} from './api'
import SaSection from '@/components/globals/SaSection'
export default {
  name: 'CreateHotelGroup',
  components: {
    SaSection
  },
  data: (vm) => {
    return {
      ui: {
        isLoadingHotelGroupCreate: true
      },
      dataCreatelHotelGroup: {
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
        name: [{ required: true, message: vm.$t('page.hotelGroupAdd.requiredNameGroup'), trigger: 'blur' }],
        ownerName: [{ required: true, message: vm.$t('page.hotelGroupAdd.requiredNameOwnerInfo'), trigger: 'blur' }],
        ownerTel: [{ required: true, message: vm.$t('page.hotelGroupAdd.requiredOwnerTel'), trigger: 'blur' }],
        ownerEmail: [{ required: true, message: vm.$t('page.hotelGroupAdd.requiredOwnerEmail'), trigger: 'blur' }]

      },
      dataRes: {},
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
    this.ui.isLoadingHotelGroupCreate = false
  },
  methods: {
    async addHotelGroup () {
      this.ui.isLoadingHotelGroupCreate = true
      const getListHotel = []
      this.tableData.map(function (item) {
        getListHotel.push({ sn: item.sn })
      })
      const forData = {
        name: this.dataCreatelHotelGroup.name,
        ownerName: this.dataCreatelHotelGroup.ownerName,
        ownerTel: this.dataCreatelHotelGroup.ownerTel,
        ownerEmail: this.dataCreatelHotelGroup.ownerEmail,
        bln: this.dataCreatelHotelGroup.bln,
        companyAddress: this.dataCreatelHotelGroup.companyAddress,
        companyEmail: this.dataCreatelHotelGroup.companyEmail,
        companyName: this.dataCreatelHotelGroup.companyName,
        companyTel: this.dataCreatelHotelGroup.companyTel,
        hotels: getListHotel
      }
      try {
        const { data } = await createHotelGroup(forData)
        this.dataRes = data
        this.$message({
          type: 'success',
          message: `${this.$t('message.createSuccess')}`
        })
        this.$router.go(-1)
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotelGroupCreate = false
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
    checkValidate (dataCreatelHotelGroup) {
      this.$refs[dataCreatelHotelGroup].validate((valid) => {
        if (valid) {
          this.addHotelGroup()
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.hotel-group-create-segment:deep {
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
  .hotel-group-create-segment__form--col {
    @media (max-width: 480px) {
      display: revert !important;
    }
  }
  .hotel-group-create-segment__form--col .form-row-center {
    @media (max-width: 480px) {
      padding: 15px 0 !important;
    }
  }
}
.hotel-group-create-segment {
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
