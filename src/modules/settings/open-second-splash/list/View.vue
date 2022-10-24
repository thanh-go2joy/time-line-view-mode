<template>
  <sa-section class="open-second-splash">
    <template slot="header">
      <div class="open-second-splash__header">
        <div class="open-second-splash__header--search">
          <div class="mb-1em w-100">
            <el-input :placeholder="$t('page.settings.title')"
            prefix-icon="el-icon-search"
            v-model="filter.keyword"
            clearable
            @input="handleSearch"
            ></el-input>
          </div>
          <div>
            <el-select
              class="w-100"
              v-model="filter.status"
              @change="fetchSecondSplashes"
            >
              <el-option
                v-for="(item, index) in ui.status"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
          <div class="open-second-splash__header--add">
            <el-button
            type="warning"
            plain
            icon="el-icon-plus"
            @click="$router.push({ name: 'openSecondSplashCreate' })"
          >
            {{ $t('button.add') }}
          </el-button>
        </div>
      </div>
    </template>
    <!-- Data table -->
    <el-table
      v-loading="ui.loading"
      :data="secondSplashes"
      :row-class-name="setClassRow"
      class="second-splash"
    >
      <el-table-column min-width="2" type="index" label="#" />
      <el-table-column
        prop="title"
        min-width="150"
        :label="$t('page.settings.title')"
      />
      <el-table-column
        prop="provinceName"
        min-width="100"
        :label="$t('page.settings.province')"
      />
      <el-table-column
        prop="districtName"
        min-width="120"
        :label="$t('page.settings.district')"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.districtName">
            {{ scope.row.districtName }}
          </div>
          <div v-else>
            {{ $t('page.settings.all') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        min-width="150"
        :label="$t('page.settings.linked_name')"
      >
        <template slot-scope="scope">
          <router-link
            v-if="scope.row.targetType === 1"
            :to="{
              name: 'promotionDetails',
              params: {
                  promotionSn: scope.row.sn,
                  couponSn: scope.row.couponSn
                }
              }"
          >
            {{ scope.row.targetName }}
          </router-link>
          <router-link
            v-else-if="scope.row.targetType === 2"
            :to="{
              name: 'promotionDetails',
              params: {
                  promotionSn: scope.row.sn,
                  couponSn: scope.row.couponSn
                }
              }"
          >
            {{ scope.row.targetName }}
          </router-link>
          <span
            v-else
          >
            {{ scope.row.targetName }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="$t('page.settings.linked_type')"
      >
        <template slot-scope="scope">
          {{ setTargetType(scope.row.targetType) }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="140"
        :label="$t('page.settings.start_date')"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.startTime) }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="140"
        :label="$t('page.settings.end_date')"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.endTime) }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="140"
        :label="$t('page.settings.background_color')"
        align="center"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.backgroundColor }}</p>
          <span
            :style="{
              backgroundColor: scope.row.backgroundColor,
              padding: '1px 30px',
              borderRadius: '4px',
              marginTop: '4px'
          }">
          </span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="180"
        :label="$t('page.settings.image')"
        align="center"
      >
        <template slot-scope="scope">
          <div class="table__image">
            <img :src="formatImage(scope.row.imagePath)" :alt="scope.row.imagePath">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        min-width="140"
        :label="$t('page.settings.create_time')"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="140"
        prop="staffName"
        :label="$t('page.settings.create_by')"
      />
      <el-table-column
        min-width="100"
        :label="$t('page.settings.status')"
      >
        <template slot-scope="scope">
          {{ setStatus(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="100"
        :label="$t('page.settings.operations')"
      >
        <template slot-scope="scope">
          <el-button
            size="small"
            type="success"
            plain
            @click="handleEdit(scope.row.sn)"
            icon="el-icon-edit"
          >
            {{ $t('button.edit') }}
          </el-button>
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
        :total="pagination.total"
      />
    </template>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { fetchSecondSplashes } from './api'
import { debounce, scrollToTop } from '@/utils/helpers'
export default {
  name: 'OpenSecondSplash',
  components: { SaSection },
  data: (vm) => {
    return {
      ui: {
        loading: false,
        status: [{
          label: vm.$t('page.settings.all'),
          value: ''
        }, {
          label: vm.$t('page.settings.expired'),
          value: 0
        }, {
          label: vm.$t('page.settings.active'),
          value: 1
        }, {
          label: vm.$t('page.settings.will_active'),
          value: 2
        }, {
          label: vm.$t('page.settings.pending'),
          value: 3
        }]
      },
      filter: {
        keyword: '',
        status: '',
        limit: 10,
        page: 1
      },
      secondSplashes: [],
      pagination: {}
    }
  },
  created () {
    this.fetchSecondSplashes()
  },
  methods: {
    async fetchSecondSplashes () {
      this.ui.loading = true
      try {
        const { data } = await fetchSecondSplashes(this.filter)
        this.secondSplashes = data.data.secondSplashes
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        scrollToTop('.section__header')
        this.ui.loading = false
      }
    },
    setClassRow ({ row }) {
      if (row.status === 0) {
        return 'second-splash__disabled'
      }
    },
    setStatus (value) {
      switch (value) {
        case 0:
          return this.$t('page.settings.expired')
        case 1:
          return this.$t('page.settings.active')
        case 2:
          return this.$t('page.settings.will_active')
        case 3:
          return this.$t('page.settings.pending')
        default:
          return ''
      };
    },
    setTargetType (value) {
      switch (value) {
        case 1:
          return this.$t('page.settings.promotion_event')
        case 2:
          return this.$t('page.settings.hotel')
        case 3:
          return this.$t('page.settings.notice')
        case 4:
          return this.$t('page.settings.link')
        case 5:
          return this.$t('page.settings.district')
        case 6:
          return this.$t('page.settings.mileage_point')
        case 8:
          return this.$t('page.settings.direct_discount')
        case 10:
          return this.$t('page.settings.promotion_group')
        case 12:
          return this.$t('page.settings.amenity_pack')
        default:
          return ''
      };
    },
    handleEdit (sn) {
      this.$router.push({ name: 'openSecondSplashEdit', params: { sn: sn } })
    },
    handleSearch: debounce(function () {
      this.fetchSecondSplashes()
    }, 500),
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchSecondSplashes()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchSecondSplashes()
    }
  }
}
</script>
<style lang="scss" scoped>
.table__image {
  height: 100px;
  object-fit: cover;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.second-splash {
  :deep(.second-splash__disabled) {
    background-color: rgb(233, 233, 235);
  }
}
.open-second-splash {
  &__button {
    text-align: right;
    margin: 10px;
  }
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
