<template>
  <sa-section class="notification">
    <template slot="header">
      <div class="notification__header">
        <div class="notification__header--search">
          <div class="mb-1em">
            <el-select
              class="w-100"
              v-model="filter.type"
              @change="fetchNotifications"
            >
              <el-option
                v-for="item in notices"
                :key="item.value"
                :label="$t(`${item.key}`)"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="mb-1em">
            <el-select
              class="w-100"
              v-model="filter.sendTo"
              @change="fetchNotifications"
            >
              <el-option
                v-for="item in senTos"
                :key="item.value"
                :label="$t(`${item.key}`)"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="mb-1em">
            <el-select
              class="w-100"
              v-model="filter.status"
              @change="fetchNotifications"
            >
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="$t(`${item.key}`)"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="w-100 mb-1em">
            <el-input :placeholder="$t('breadcrumb.keyword')"
              prefix-icon="el-icon-search"
              v-model="filter.keyword"
              clearable
              @input="reloadNotifications"
            />
          </div>
          <div>
            <el-date-picker
              class="w-100"
              v-model="dateRange"
              type="daterange"
              align="right"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :start-placeholder="$t('placeholder.startDate')"
              :end-placeholder="$t('placeholder.endDate')"
            />
          </div>
        </div>
        <div class="notification__header--add">
          <el-button
            type="warning"
            plain
            @click="handleCreate"
            icon="el-icon-plus"
          >
            {{ $t('button.add') }}
          </el-button>
        </div>
      </div>
    </template>
    <el-table
      v-loading="ui.isLoading"
      :data="listNotifications"
    >
      <el-table-column
        type="index"
        label="#"
        min-width="20"
      />
      <el-table-column
        :label="$t('page.notification.noticeType')"
        min-width="120"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.type === 1">{{ $t('option.status.normal') }}</p>
          <p v-else-if="scope.row.type === 2">{{ $t('option.status.donateCoupon') }}</p>
          <p v-else-if="scope.row.type === 3">{{ $t('option.status.remindCoupon') }}</p>
          <p v-else></p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.notification.title')"
        min-width="140"
      >
        <template slot-scope="scope">
          <router-link
            :to="{ name: 'notificationDetails', params: { sn: scope.row.sn }}"
          >
            {{ scope.row.title }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.notification.targetType')"
        min-width="140"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.type === 3"></div>
          <div v-else>
            <router-link
              v-if="scope.row.targetType === TARGET_TYPE_V2.PROMOTION"
              :to="{ name: 'notificationDetails', params: { sn: scope.row.sn }}">
              {{ $t('option.targetType.promotion') }}
            </router-link>
            <router-link
              v-else-if="scope.row.targetType === TARGET_TYPE_V2.HOTEL"
              :to="{ name: 'hotelDisplayDetails', params: { sn: scope.row.targetSn }}">
              {{ $t('option.targetType.hotel') }}
            </router-link>
            <p v-else>{{ getTargetType(scope.row.targetType) }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.notification.createStaff')"
        min-width="140"
      >
        <template slot-scope="scope">
          <router-link
            :to="{ name: 'hotel_staff_detail', params: { id: scope.row.createStaffSn }}"
          >
            {{ scope.row.fullName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.notification.sendTo')"
        min-width="150"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.type === 3"></div>
          <div v-else>
            <div v-if="scope.row.sendTo === 1">
              <div v-if="scope.row.openApp === 1">
                <p>{{ $t('option.status.allUser') }}</p>
                <p>{{ $t('option.status.lastTimeOpenApp') }}</p>
              </div>
              <div v-else>
                {{ $t('option.status.allUser') }}
              </div>
            </div>
            <div v-if="scope.row.sendTo === 2">
              {{ $t('option.status.go2joy') }}
            </div>
            <div v-if="scope.row.sendTo === 3">
              {{ $t('option.status.allPartner') }}
            </div>
            <div v-if="scope.row.sendTo === 4">
              {{ $t('option.status.booking') }}
            </div>
            <div v-if="scope.row.sendTo === 5">
              {{ $t('option.status.hotel') }}
            </div>
            <div v-if="scope.row.sendTo === 8">
              <el-link :underline="false" :href="formatImage(scope.row.filePath)" type="primary">{{ scope.row.originalFileName }}</el-link>
            </div>
            <div v-if="scope.row.sendTo === 9">
              {{ $t('option.status.crmFilter') }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.notification.totalSend')"
        min-width="200"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.type === 3"></p>
          <p v-else>
            {{ scope.row.totalSend }} ({{ scope.row.totalIosSend }} - {{ scope.row.totalAndroidSend }})
          </p>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.notification.totalView')"
        min-width="200"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.type === 3"></p>
          <p v-else>
            {{ scope.row.totalView }} ({{ scope.row.totalIosView }} - {{ scope.row.totalAndroidView }})
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.notification.conversion')"
        min-width="200"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.type === 3"></p>
          <p v-else>
            {{ scope.row.totalConversion }} ({{ scope.row.totalIosConversion }} - {{ scope.row.totalAndroidConversion }})
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.notification.numSent')"
        min-width="120"
      >
        <template slot-scope="scope">
            {{ scope.row.countNumSend }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.notification.createTime')"
        min-width="140"
      >
        <template slot-scope="scope">
            {{ formatDate(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.notification.sentTime')"
        min-width="140"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.type === 3"></p>
          <p v-else>
            {{ formatDate(scope.row.sendTime) }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.notification.status')"
        min-width="100"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.status === 1">{{ $t('option.status.draft') }}</p>
          <p v-else-if="scope.row.status === 2">{{ $t('option.status.created') }}</p>
          <p v-else-if="scope.row.status === 3">{{ $t('option.status.sending') }}</p>
          <p v-else-if="scope.row.status === 4">{{ $t('option.status.sent') }}</p>
          <p v-else></p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.userMgt.operations')"
        align="center"
        min-width="100"
      >
        <template slot-scope="scope">
          <el-popover
            placement="left"
            trigger="click"
          >
            <i slot="reference" class="operations el-icon-more" />
            <div class="p-8-12">
              <el-button
              v-if="hasPermission('sanotification', 'pCreate')"
              type="primary"
              size="small"
              plain
              @click="handleResend(scope.row)"
            >
              {{$t('button.resend')}}
            </el-button>

            <el-button
              v-if="hasPermission('sanotification', 'pCreate') && (scope.row.status == 1 || scope.row.status == 2)"
              type="success"
              plain
              size="small"
              @click="handleEdit(scope.row)"
              icon="el-icon-edit"
            >
              {{$t('button.edit')}}
            </el-button>

            <el-button
              v-if="hasPermission('sanotification', 'pDelete') && (scope.row.status == 1 || scope.row.status == 2)"
              type="danger"
              plain
              size="small"
              @click="handleDelete(scope.row)"
            >
              {{$t('button.delete')}}
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
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagination.perPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </template>
  </sa-section>
</template>
<script>
import { TARGET_TYPE_V2, statusOptionsV3, statusOptionsV4, sendToOptions } from '@/utils/const'
import { debounce, scrollToTop } from '@/utils/helpers'

import SaSection from '@/components/globals/SaSection.vue'
import { fetchNotifications, deleteNotification } from './api'
const timeDebounce = 500

export default {
  name: 'Notification',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        isLoading: false
      },
      listNotifications: [],
      filter: {
        limit: 10,
        page: 1,
        keyword: '',
        startDate: '',
        endDate: '',
        sendTo: 0,
        type: 0,
        status: 0
      },
      pagination: {},
      notices: statusOptionsV3,
      senTos: sendToOptions,
      status: statusOptionsV4,
      TARGET_TYPE_V2: TARGET_TYPE_V2
    }
  },
  created () {
    this.fetchNotifications()
  },
  computed: {
    dateRange: {
      get () {
        return [this.filter.startDate, this.filter.endDate]
      },
      set (val) {
        if (!val) {
          this.filter.startDate = this.filter.endDate = ''
        } else {
          this.filter.startDate = val[0]
          this.filter.endDate = val[1]
        }
      }
    }
  },
  watch: {
    dateRange (value) {
      if (!value) {
        delete this.filter.startDate
        delete this.filter.endDate
      } else {
        this.filter.startDate = value[0]
        this.filter.endDate = value[1]
      }
      this.fetchNotifications()
    }
  },
  methods: {
    getTargetType (targetType) {
      if (targetType === TARGET_TYPE_V2.NOTICE) return `${this.$t('option.targetType.notice')}`
      else if (targetType === TARGET_TYPE_V2.SERVICE_AGREEMENT) return `${this.$t('option.targetType.serviceAgreement')}`
      else if (targetType === TARGET_TYPE_V2.FAQ) return `${this.$t('option.targetType.faq')}`
      else if (targetType === TARGET_TYPE_V2.INVITE_FRIEND) return `${this.$t('option.targetType.inviteFriend')}`
      else if (targetType === TARGET_TYPE_V2.OPEN_APP) return `${this.$t('option.targetType.openApp')}`
      else if (targetType === TARGET_TYPE_V2.MILEAGE_POINT) return `${this.$t('option.targetType.mileagePoint')}`
      else if (targetType === TARGET_TYPE_V2.DIRECT_DISCOUNT) return `${this.$t('option.targetType.directDiscount')}`
      else if (targetType === TARGET_TYPE_V2.SIGN_UP) return `${this.$t('option.targetType.signUp')}`
      else if (targetType === TARGET_TYPE_V2.PROMOTION_GROUP) return `${this.$t('option.targetType.promotionGroup')}`
      else if (targetType === TARGET_TYPE_V2.AMENITY_PACK) return `${this.$t('option.targetType.amenityPack')}`
      else if (targetType === TARGET_TYPE_V2.HOTEL_GO2CHOICE) return `${this.$t('option.targetType.hotelGo2Choice')}`
      else return ''
    },
    async fetchNotifications () {
      this.ui.isLoading = true
      try {
        const { data } = await fetchNotifications(this.filter)
        this.listNotifications = data.data.appNotifications
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        scrollToTop('.section__header')
        this.ui.isLoading = false
      }
    },
    reloadNotifications: debounce(function (keyword) {
      this.fetchNotifications(keyword)
    }, timeDebounce),
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchNotifications()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchNotifications()
    },
    handleResend (data) {
      this.$router.push({ name: 'notificationDetails', params: { sn: data.sn, type: 'resend' } })
    },
    handleCreate () {
      this.$router.push({ name: 'notificationCreate' })
    },
    handleEdit (data) {
      this.$router.push({ name: 'notificationEdit', params: { sn: data.sn } })
    },
    async handleDelete (data) {
      try {
        this.$confirm(`${this.$t('message.areYouSure')}`, `${this.$t('message.warning')}`, {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(async () => {
          await deleteNotification(data.sn)
          this.$message({
            type: 'success',
            message: this.$t('message.deleteSuccess')
          })
          this.fetchNotifications(this.filter)
        }).catch(error => {
          this.$message({
            type: 'info',
            message: error
          })
        })
      } catch (error) {
        return false
      }
    }
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
    @media (max-width: 1200px) {
      color: green;
    }
  }
  .p-8-12 {
    padding: 8px 12px;
  }
  .notification {
    &__header {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1em;
      &--search {
        display: flex;
        gap: 1em;

        @media (max-width: 768px) {
          display: inline-block;
          width: 100%;
        }
      }
    }

    @media (max-width: 768px) {
      .mb-1em {
        margin-bottom: 1em;
      }
      .w-100 {
        width: 100%;
      }
    }
  }
</style>
