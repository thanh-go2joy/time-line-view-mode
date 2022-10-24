<template>
  <sa-section v-if="$route.fullPath === '/hotel/sadmin/collection'" class="collection">
    <template slot="header">
      <div class="collection__header">
        <div class="collection__header--search">
          <div class="mb-1em w-100">
            <el-input
              v-model="filter.keyword"
              :placeholder="$t('placeholder.search')"
              prefix-icon="el-icon-search"
              @input="handleSearch" />
          </div>
          <div>
            <el-select
              class="w-100"
              v-model="filter.type"
              @change="fetchHomeCollections"
            >
              <el-option
                v-for="item, id in ui.type"
                :key="id"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </div>
        </div>
        <div class="collection__header--add">
          <el-button
            plain
            type="warning"
            icon="el-icon-plus"
            @click="$router.push({ name: 'collectionCreate' })"
          >
            {{ $t('button.add') }}
          </el-button>
        </div>
      </div>
    </template>
    <el-table
      v-loading="ui.isLoading"
      :data="listHomeCollections"
    >
      <el-table-column
        type="index"
        min-width="20"
      >
      <template slot-scope="scope">
        <el-checkbox
          v-model="position[scope.row.sn]"
          @change="changePosition(scope.row.sn)">
        </el-checkbox>
      </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.collection.type')"
        min-width="100"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.flashSale == 1">{{$t('page.collection.flashSale')}}</p>
          <p v-else-if="scope.row.promotion == 1">{{$t('page.collection.promotion')}}</p>
          <p v-else-if="scope.row.directDiscount == 1">{{$t('page.collection.directDiscount')}}</p>
          <p v-else-if="scope.row.amenityPackHotel == 1">{{$t('page.collection.amenityPackHotel')}}</p>
          <p v-else-if="scope.row.hotHotel == 1">{{$t('page.collection.hotHotel')}}</p>
          <p v-else-if="scope.row.loveHotel == 1">{{$t('page.collection.loveHotel')}}</p>
          <p v-else-if="scope.row.newHotel == 1">{{$t('page.collection.newHotel')}}</p>
          <p v-else-if="scope.row.travelHotel == 1">{{$t('page.collection.travelHotel')}}</p>
          <p v-else-if="scope.row.stamp == 1">{{$t('page.collection.stamp')}}</p>
          <p v-else-if="scope.row.image360 == 1">{{$t('page.collection.image360')}}</p>
          <p v-else-if="scope.row.hotelReview == 1">{{$t('page.collection.hotelReview')}}</p>
          <p v-else-if="scope.row.hotelSearched == 1">{{$t('page.collection.hotSearched')}}</p>
          <p v-else-if="scope.row.hotelBooked == 1">{{$t('page.collection.hotelBooked')}}</p>
          <p v-else-if="scope.row.hotelFavorite == 1">{{$t('page.collection.hotelFavorite')}}</p>
          <p v-else-if="scope.row.hotelSuggestion == 1">{{$t('page.collection.hotelSuggestion')}}</p>
          <p v-else-if="scope.row.g2jCertified == 1">{{$t('page.collection.g2jCertified')}}</p>
          <p v-else-if="scope.row.promotionSuggestion == 1">{{$t('page.collection.promotionSuggestion')}}</p>
          <p v-else-if="scope.row.quarantine == 1">{{$t('page.collection.quarantine')}}</p>
          <p v-else-if="scope.row.isTet == 1">{{$t('page.collection.isTet')}}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.collection.title1')"
        min-width="180"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'collectionDetails', params: { sn: scope.row.sn } }">
            {{ scope.row.title }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.collection.displayApp')"
        min-width="110"
      >
        <template slot-scope="scope">
          {{ scope.row.type === 1 ? '✔' : '' }}
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.collection.displayWeb')"
        min-width="110"
      >
        <template slot-scope="scope">
          {{ scope.row.type === 2 ? '✔' : '' }}
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.collection.displayType')"
        min-width="150"
      >
        <template slot-scope="scope">
          {{$t(ui.displayType[scope.row.displayType])}}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.collection.lastUpdate')"
        min-width="150"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.lastUpdate) }}
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.collection.operations')"
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
                type="success"
                size="small"
                plain
                @click="handleEdit(scope.row.sn)"
                icon="el-icon-edit"
              >
                {{$t('page.collection.edit')}}
              </el-button>
              <el-button
                v-if="scope.row.promotionSuggestion != 1 && scope.row.isTet != 1"
                type="edit"
                size="small"
                plain
                icon="el-icon-menu"
                @click="onDirecHotelList(scope.row.sn)"
              >
                {{$t('page.collection.hotelList')}}
              </el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>

    </el-table>
  </sa-section>
  <router-view v-else />
</template>
<script>
// import draggableComponent from '@/utils/draggable.js'
import SaSection from '@/components/globals/SaSection.vue'
import { fetchHomeCollections, sortHotelCollectionV1 } from './api'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
export default {
  name: '',
  components: {
    SaSection
    // draggableComponent
  },
  data: (vm) => {
    return {
      listHomeCollections: [],
      filter: {
        keyword: '',
        type: ''
      },
      position: [],
      ui: {
        isLoading: false,
        displayType: {
          1: 'page.collection.detail',
          2: 'page.collection.collection',
          3: 'page.collection.summary',
          4: 'page.collection.circle',
          5: 'page.collection.lightSquare',
          6: 'page.collection.darkSquare',
          7: 'page.collection.rectangle1',
          8: 'page.collection.rectangle2',
          9: 'page.collection.icon'
        },
        type: [
          {
            label: vm.$t('page.collection.allType'),
            value: ''
          },
          {
            label: vm.$t('page.collection.flashSale'),
            value: 1
          },
          {
            label: vm.$t('page.collection.promotion'),
            value: 2
          },
          {
            label: vm.$t('page.collection.directDiscount'),
            value: 3
          },
          {
            label: vm.$t('page.collection.amenityPackHotel'),
            value: 4
          },
          {
            label: vm.$t('page.collection.loveHotel'),
            value: 5
          },
          {
            label: vm.$t('page.collection.travelHotel'),
            value: 6
          },
          {
            label: vm.$t('page.collection.hotHotel'),
            value: 7
          },
          {
            label: vm.$t('page.collection.newHotel'),
            value: 8
          },
          {
            label: vm.$t('page.collection.stamp'),
            value: 9
          },
          {
            label: vm.$t('page.collection.image360'),
            value: 10
          },
          {
            label: vm.$t('page.collection.hotelReview'),
            value: 11
          },
          {
            label: vm.$t('page.collection.hotSearched'),
            value: 12
          },
          {
            label: vm.$t('page.collection.hotelBooked'),
            value: 13
          },
          {
            label: vm.$t('page.collection.hotelFavorite'),
            value: 14
          },
          {
            label: vm.$t('page.collection.hotelSuggestion'),
            value: 15
          },
          {
            label: vm.$t('page.collection.g2jCertified'),
            value: 16
          },
          {
            label: vm.$t('page.collection.quarantine'),
            value: 17
          }
        ]
      },
      positionsSelected: []
    }
  },
  watch: {
    '$route.fullPath' (fullPath) {
      if (fullPath === '/hotel/sadmin/collection') {
        this.fetchHomeCollections()
      }
    }
  },
  created () {
    if (this.$route.fullPath === '/hotel/sadmin/collection') {
      this.fetchHomeCollections()
    }
  },
  methods: {
    handleSearch: debounce(function () {
      this.fetchHomeCollections()
    }, timeDebounce),
    async fetchHomeCollections () {
      this.ui.isLoading = true
      try {
        const { data } = await fetchHomeCollections(this.filter)
        this.listHomeCollections = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    handleEdit (sn) {
      this.$router.push({ name: 'collectionEdit', params: { sn: sn } })
    },
    async changePosition (sn) {
      try {
        this.positionsSelected.push(sn)
        if (this.positionsSelected.length === 2) {
          this.ui.isLoading = true
          await sortHotelCollectionV1(this.positionsSelected)
          this.position[this.positionsSelected[0]] = false
          this.position[this.positionsSelected[1]] = false
          this.positionsSelected = []
          this.fetchHomeCollections()
        }
      } catch (error) {
        return false
      }
    },
    // async changePosition (e) {
    //   if (!e.moved) {
    //     return false
    //   }
    //   const query = `positionBefore=${e.moved.oldIndex}&positionAfter=${e.moved.newIndex}`
    //   try {
    //     await sortHotelCollection(query)
    //     const message = this.$t('page.collection.editSuccess')
    //     this.$message({
    //       type: 'success',
    //       message: message
    //     })
    //   } catch (error) {
    //     return false
    //   } finally {
    //     this.ui.isLoading = false
    //   }
    // },
    onDirecHotelList (sn) {
      this.$router.push({ name: 'selectApplyHotel', params: { sn: sn } })
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

.collection {
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
