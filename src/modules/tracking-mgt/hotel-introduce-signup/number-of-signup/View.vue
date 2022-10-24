<template>
  <sa-section>
    <div class="hotel-introduce-signup__filters">

      <div >
        <el-select
        v-model="direct"

        @change="directPage"
        style="margin: 0 16px; width: 250px;"
      >
        <el-option
          v-for="page in pages"
          :key="page.value"
          :label="$t(`page.hotelIntroduceSignup.${page.label}`)"
          :value="page.value"
        >
        </el-option>
      </el-select>
      </div>
    </div>
    <div class="hotel-introduce-signup__table">
      <el-table
        :data="data"
        v-loading="ui.isTableLoading"
      >
        <el-table-column type="index" label="#" min-width="2" />
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.nickname')"
          :min-width="50"
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'userDetails', params: { sn: scope.row.sn }}">
                <span>{{ scope.row.nickName }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.gender')"
          :min-width="40"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.gender === 1">{{ $t('gender.male') }}</span>
            <span v-else>{{ $t('gender.female') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.birthday')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <span >{{ scope.row.birthday }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.email')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <span >{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.mobile')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <span >{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.register_province')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <span >{{ scope.row.firstProvinceName?scope.row.firstProvinceName:'' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.via')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.viaApp == 1">Manual</p>
            <p v-else-if="scope.row.viaApp == 2">Facebook</p>
            <p v-else-if="scope.row.viaApp == 3">Google</p>
            <p v-else-if="scope.row.viaApp == 4">Apple</p>
            <p v-else></p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.effective_point')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'pointListMgt', params: { sn: scope.row.sn }}">
                <span>{{ scope.row.mileageAmount }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.register_time')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <span >{{ formatDate(scope.row.registerTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.open_app')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <span >{{ scope.row.numOpenApp }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.last_open_app')"
          :min-width="80"
        >
          <template slot-scope="scope">
            <span >{{ formatDate(scope.row.lastOpenApp) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.status')"
          :min-width="60"
        >
          <template slot-scope="scope">
            <p>{{ getStatus(scope.row.status) }}</p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.hotelIntroduceSignup.hotel_invite_code')"
          :min-width="100"
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'hotelDisplayDetails', params: { sn: scope.row.hotelInviteSn }}">
                <span>{{ scope.row.hotelInviteName }}</span>
            </router-link>
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
import saSection from '@/components/globals/SaSection.vue'
import { getNumberOfSignup } from './api'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
export default {
  name: 'checkinByRegister',
  components: {
    saSection
  },
  data () {
    return {
      filter: {
        limit: 10,
        page: 1,
        startDate: '',
        endDate: '',
        hotelSn: this.$route.query && this.$route.query.hotelSn ? this.$route.query.hotelSn : 0
      },
      pagination: {},
      ui: {
        isTableLoading: false
      },
      pages: [
        { label: 'number_of_signup', value: 0 },
        { label: 'checkin_by_register', value: 1 }
      ],
      direct: 0,
      hotels: [],
      data: []
    }
  },
  computed: {
    dateRange: {
      get () {
        return [this.filter.startDate, this.filter.endDate]
      },
      set (val) {
        this.filter.startDate = val[0]
        this.filter.endDate = val[1]
      }
    }
  },
  created () {
    this.getDataHotelIntroduceSignup()
  },

  methods: {
    async getDataHotelIntroduceSignup () {
      this.ui.isTableLoading = true
      try {
        const { data } = await getNumberOfSignup(this.filter)
        this.data = data.data.appUserList
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isTableLoading = false
      }
    },
    searchHotelIntroduceSign: debounce(function () {
      this.getDataHotelIntroduceSignup(this.filter)
    }, timeDebounce),
    onSizeChange (size) {
      this.filter.limit = size
      if (
        Math.ceil(this.pagination.total / size) < this.pagination.currentPage
      ) {
        this.pagination.currentPage = Math.ceil(this.pagination.total / size)
      } // when curent page is larger than total page
      this.getDataHotelIntroduceSignup(this.filter)
    },
    onCurrentChange (currentPage) {
      this.filter.page = currentPage
      this.getDataHotelIntroduceSignup(this.filter)
    },
    getStatus (value) {
      if (!value) {
        return ''
      }
      switch (value) {
        case 0:
          return `${this.$t('option.status.deleted')}`
        case 1:
          return `${this.$t('option.status.active')}`
        case 2:
          return `${this.$t('option.status.expired')}`
        case 3:
          return `${this.$t('option.status.temp')}`
        case 4:
          return `${this.$t('option.status.draft')}`
        case 5:
          return `${this.$t('option.status.wait_confirm')}`
        default:
      };
    }, // getStatus
    directPage (value) {
      const query = {
        hotelSn: this.$route.query.hotelSn ? this.$route.query.hotelSn : 0,
        type: 1
      }
      if (value === 1) {
        this.$router.push({ name: 'checkinByRegister', query })
      } else {

      }
    }
  }
}
</script>

<style lang="scss" scoped>
.operations{
    padding: 8px 12px;
    display: flex;
    white-space: break-spaces;
}
</style>
