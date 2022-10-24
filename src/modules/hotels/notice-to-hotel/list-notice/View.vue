<template>
<sa-section class="notice-to-hotel-segment" v-loading="ui.loadingNoticeToHotelList">
  <template slot="header" class="notice-to-hdivotel-segment__filter">
    <el-form
      :inline="true"
      :model="query"
      class="demo-form-inline float-left"
    >
      <el-form-item>
        <el-input
          :placeholder="$t(`page.noticeList.placeholder`)"
          v-model="query.keyword"
          clearable
          prefix-icon="el-icon-search"
          @input="handleSearch"
         />
      </el-form-item>
      <el-form-item>
        <sa-select-check
          class="select-check"
          v-model="query.filter"
          :indeterminate="checkBox.isIndeterminateStatus"
          :options="ui.statusOptions"
          :isCheckAll="false"
          @input="handleCheckedStatus"
          translate
        />
      </el-form-item>
    </el-form>
    <div class="notice-to-hotel-segment__filter--btn">
        <el-button
          type="warning"
          icon="el-icon-plus"
          @click="onDirectAddNoticeToHotel"
          plain
        >
          {{ $t('button.add') }}
        </el-button>
    </div>
  </template>
  <el-table
  :data="tableData"
  class="notice-to-hotel-segment__table"
  :row-class-name="rowContentStyle">
      <el-table-column type="index" label="#" min-width="20" />
      <el-table-column :label="$t('page.noticeList.topic')" min-width="80">
          <template slot-scope="scope">
              <div>
                  <router-link :to="{ name: 'notice_to_hotel_detail', params: { id: scope.row.sn }}">
                      <span>{{ scope.row.title }}</span>
                  </router-link>
              </div>
          </template>
      </el-table-column>
      <el-table-column :label="$t('page.noticeList.message_type')" min-width="100">
          <template slot-scope="scope">
              <span> {{ getLabelTypeNotice(scope.row.type) }}</span>
          </template>
      </el-table-column>
      <el-table-column :label="$t('page.noticeList.apply_for_hotel')" min-width="100">
          <template slot-scope="scope">
              <span v-html="getLabelApplyNotice(scope.row.hotelScope, scope.row.numNotAnswer, scope.row.sn, scope.row.faqHotelCount)"></span>
          </template>
      </el-table-column>
      <el-table-column :label="$t('page.noticeList.create_staff')" min-width="100">
          <template slot-scope="scope">
              <span> {{ scope.row.staffName }}</span>
          </template>
      </el-table-column>
      <el-table-column :label="$t('page.noticeList.create_time')" min-width="100">
          <template slot-scope="scope">
              <span> {{ formatDate(scope.row.createTime) }}</span>
          </template>
      </el-table-column>
      <el-table-column :label="$t('page.noticeList.last_update')" min-width="100">
          <template slot-scope="scope">
              <span> {{ formatDate(scope.row.lastUpdate) }}</span>
          </template>
      </el-table-column>
      <el-table-column :label="$t('page.noticeList.operations')" align="center" min-width="50">
          <template slot-scope="scope">
              <el-popover placement="left" trigger="click">
                  <i slot="reference" class="operations el-icon-more" />
                  <div style="padding: 8px 12px;">
                    <el-button
                      v-if="scope.row.answer && hasPermission('safaq', 'pModify')"
                      type="primary"
                      plain
                      size="small"
                      @click="onReplyNoticeToHotelById(scope.row.sn)"
                    >
                      {{ $t('button.reply')}}
                    </el-button>
                    <el-button
                      v-if="hasPermission('safaq', 'pModify')"
                      type="success"
                      plain
                      size="small"
                      icon="el-icon-s-promotion"
                      @click="onSendNoticeToHotelById(scope.row.sn)"
                    >
                        {{ $t('button.send')}}
                    </el-button>
                    <el-button
                      v-if="hasPermission('safaq', 'pModify')"
                      type="success"
                      plain
                      size="small"
                      icon="el-icon-edit"
                      @click="onEditNoticeToHotelById(scope.row.sn)"
                    >
                        {{ $t('button.edit')}}
                    </el-button>
                    <el-button
                      v-if="hasPermission('safaq', 'pModify')"
                      type="danger"
                      plain
                      size="small"
                      icon="el-icon-delete"
                      @click="onDeleteNoticeToHotelById(scope.row.sn)"
                    >
                        {{ $t('button.delete')}}
                    </el-button>
                  </div>
              </el-popover>
          </template>
      </el-table-column>
  </el-table>
  <div class="notice-to-hotel-segment__footer">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="query.page"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pagination.perPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>
  </div>
</sa-section>
</template>

<script>
// @ is an alias to /src
import {
  debounce
} from '@/utils/helpers.js'
import SaSelectCheck from '@/components/globals/SaSelectCheck'
import SaSection from '@/components/globals/SaSection.vue'

import {
  getNoticeToHotelList,
  deleteNoticeToHotelList,
  resetApplyingHotelFaq
} from './api'
const allHotelStatus = [1, 2, 3, 4, 5, 6]
const timeDebounce = 500
export default {
  name: 'NoticeToHotel',
  components: {
    SaSelectCheck,
    SaSection
  },
  data () {
    return {
      ui: {
        loadingNoticeToHotelList: false,
        statusOptions: [
          { key: 'option.noticeType.function', value: 1 },
          { key: 'option.noticeType.promotion', value: 2 },
          { key: 'option.noticeType.term_policy', value: 3 },
          { key: 'option.noticeType.notification', value: 4 },
          { key: 'option.noticeType.notice_of_no_show', value: 5 },
          { key: 'option.noticeType.notice_of_Checked_in_l', value: 6 }
        ]
      },
      pagination: {},
      query: {
        limit: 10,
        page: 1,
        keyword: '',
        filter: allHotelStatus
      },
      tableData: [],

      checkBox: {
        isIndeterminateStatus: false,
        isIndeterminateProvinces: false,
        checkAllStatus: false,
        checkAllProvinces: false
      },
      dataRes: null
    }
  },
  async created () {
    await this.getDataNoticeToHotelList(this.query)
    this.onResetListHotel()
  },
  computed: {
    getLocalize () {
      return this._i18n.locale
    }
  },
  methods: {
    async getDataNoticeToHotelList (params) {
      this.ui.loadingNoticeToHotelList = true
      const filter = { ...params, filter: '[' + params.filter.toString() + ']' }
      try {
        const {
          data
        } = await getNoticeToHotelList(filter)
        this.tableData = data.data.faqInformation
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loadingNoticeToHotelList = false
      }
    }, // getListReview
    handleSearch: debounce(function () {
      this.query.page = 1
      this.getDataNoticeToHotelList(this.query)
    }, timeDebounce), // handleSearch

    onDirectAddNoticeToHotel () {
      this.$router.push({
        name: 'notice_to_hotel_create'
      })
    },

    handleSizeChange (value) {
      // this.pagination.perPage = value
      this.query.limit = value
      this.getDataNoticeToHotelList(this.query)
    },

    handleCurrentChange (value) {
      // this.pagination.currentPage = value
      this.query.page = value
      this.getDataNoticeToHotelList(this.query)
    },

    async onDeleteNoticeToHotelById (id) {
      this.$confirm(`${this.$t('message.areYouSure')}`, `${this.$t('button.delete')}`, {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        this.ui.loadingActivities = true
        try {
          await deleteNoticeToHotelList(id)
          this.$message({
            type: 'success',
            message: `${this.$t('message.deleteSuccess')}`
          })
          this.getDataNoticeToHotelList(this.query)
        } catch (error) {
          return false
        } finally {
          this.ui.loadingActivities = false
        }
      }).catch(error => {
        this.ui.loadingActivities = false
        this.$message({
          type: 'error',
          message: error.response ? error.response.data.message : error
        })
      })
    }, // onWithdrawActivities

    onEditNoticeToHotelById (id) {
      this.$router.push({ name: 'notice_edit', params: { id: id } })
    }, // onEditNoticeToHotelById

    onReplyNoticeToHotelById (id) {
      this.$router.push({ name: 'notice_to_hotel_reply', params: { id: id } })
    }, // onReplyNoticeToHotelById

    onSendNoticeToHotelById (id) {
      this.$router.push({ name: 'send_notice_to_hotel', params: { id: id } })
    }, // onSendNoticeToHotelById

    getLabelTypeNotice (type) {
      if (!type) {
        return ''
      }
      switch (type) {
        case 1:
          return this.$t('option.noticeType.function')
        case 2:
          return this.$t('option.noticeType.promotion')
        case 3:
          return this.$t('option.noticeType.term_policy')
        case 4:
          return this.$t('option.noticeType.notification')
        case 5:
          return this.$t('option.noticeType.notice_of_no_show')
        case 6:
          return this.$t('option.noticeType.notice_of_Checked_in_l')
        default:
          return ''
      }
    },

    getLabelApplyNotice (hotelScope, numNotAnswer, sn, faqHotelCount) {
      if (!hotelScope) {
        return ''
      }
      if (hotelScope < 4 && numNotAnswer <= 0) {
        switch (hotelScope) {
          case 1:
            return this.$t('option.applyHotelOption.all_hotel')
          case 2:
            return this.$t('option.applyHotelOption.all_contracted')
          case 3:
            return this.$t('option.applyHotelOption.all_trial')
        }
      } else if (hotelScope < 4 && numNotAnswer > 0) {
        switch (hotelScope) {
          case 1:
            return this.$t('option.applyHotelOption.all_hotel') + '<span style="color:red"> (' + numNotAnswer + ' )</span>'
          case 2:
            return this.$t('option.applyHotelOption.all_contracted') + '<span style="color:red"> (' + numNotAnswer + ' )</span>'
          case 3:
            return this.$t('option.applyHotelOption.all_trial') + '<span style="color:red"> (' + numNotAnswer + ' )</span>'
        }
      } else if (hotelScope === 4 && numNotAnswer >= 1) {
        return `<a href="list-apply-for-hotel?id=${sn}&targetSn=4" style="color: #409EFF">` + faqHotelCount + '</span></a>' + '<span style="color:red"> (' + numNotAnswer + ' )</span>'
      } else if (hotelScope === 4 && numNotAnswer < 1) {
        return `<a href="list-apply-for-hotel?id=${sn}&targetSn=4" style="color: #409EFF">` + faqHotelCount + '</span></a>'
      }
    },

    rowContentStyle ({ row }) {
      if (row.numNotAnswer > 0 || row.readStaffSn == null) {
        return 'custom-style-background-fce5e5'
      } else {
        return ''
      }
    },

    handleCheckedStatus: debounce(function (value) {
      this.query.page = 1
      this.getDataNoticeToHotelList(this.query)
    }, 1000),

    async onResetListHotel () {
      this.ui.loadingNoticeToHotelList = true
      try {
        const {
          data
        } = await resetApplyingHotelFaq()
        this.dataRes = data
      } catch (error) {
        return false
      } finally {
        this.ui.loadingNoticeToHotelList = false
      }
    }
  }
}
</script>
<style>
.custom-style-background-fce5e5{
  background-color: #fce5e5 !important;
}
</style>
<style lang="scss" scoped>
.operations {
    cursor: pointer;
    transform: rotate(90deg);

    &:hover {
        color: #ff6400;
    }
}

.el-table th,
.el-table .custom-style-background {
    background-color: #fce5e5 !important;
}

.notice-to-hotel-segment {
    &__table--image-error {
        display: grid;
        grid-template-columns: 1fr 1fr;

        .block {
            width: 100px;
            height: 100px;

            .el-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .text-name {
            display: flex;
            justify-content: center;
            align-items: center;
            vertical-align: middle;
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
        margin-top: 30px;
    }

    &__filter {
        display: grid;
        grid-template-columns: 1fr 2fr 2fr;
        align-items: center;
        margin-bottom: 24px;

        &--input {
            .el-input {
                width: 250px;
            }
        }

        &--btn {
            button {
                float: right;
            }
        }
        &--select{
          padding-left: 15px;
        }
    }
}

@media (max-width: 1200px) {
    .operations {
        color: green;
    }
}
</style>
