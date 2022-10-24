<template>
  <sa-section v-loading="isLoading">
    <div>
      <el-row class="is-flex" v-for="rooms in hotelRooms" :key="rooms.sn">
        <el-col :span="6" class="background">
          <p>{{ rooms.name }}</p>
        </el-col>
        <el-col :span="18">
          <el-checkbox :true-label="1" :false-label="0" v-model="rooms.status" />
        </el-col>
      </el-row>
    </div>
    <div slot="footer" class="dialog-footer float-right">
      <el-button size="large" @click="$router.go(-1)">
        {{ $t('button.back') }}
      </el-button>
      <el-button type="success" size="large" @click="onSave">
        {{ $t('button.save') }}
      </el-button>
    </div>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { listHotelRoomsApply, onSaveHotelRoomsApply } from './api'
export default {
  name: 'HotelRoomApply',
  components: {
    SaSection
  },
  data () {
    return {
      hotelRooms: [],
      isLoading: false
    }
  },
  computed: {},
  created () {
    this.listHotelRooms()
  },
  methods: {
    async listHotelRooms () {
      this.isLoading = true
      try {
        const { data } = await listHotelRoomsApply(this.$route.params.couponSn)
        if (data.code === 1) {
          this.hotelRooms = data.data.roomTypeSnList
        }
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    },
    async onSave () {
      try {
        const rawData = {
          couponSn: this.$route.params.couponSn,
          roomTypeSnList: this.hotelRooms
            .filter((item) => item.status === 1)
            .map((item) => item.sn)
        }
        const { data } = await onSaveHotelRoomsApply(rawData)
        if (data.code === 1) {
          this.$router.push({
            name: 'couponCondition',
            params: {
              couponSn: this.$route.params.couponSn,
              promotionSn: this.$route.params.promotionSn
            }
          })
          this.$message({
            type: 'success',
            message: this.$t('message.success')
          })
        }
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.float-right {
  float: right;
}
.is-flex {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  [class*='el-col-'] {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    [class*='el-col-'] {
      display: block;
    }
  }
}
.background {
  background-color: #f0f0f0;
}
</style>
