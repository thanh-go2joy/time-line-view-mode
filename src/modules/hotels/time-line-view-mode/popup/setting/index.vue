<template>
  <div class="popup-setting">
    <el-dialog :title="$t('page.calendar.room_setting')" :visible.sync="ui.openPopupSetting">
      <div class="popup-setting__row">
          <el-button icon="el-icon-view" round @click="onDetailRoom">{{$t('page.calendar.detail')}}</el-button>
      </div>
      <div class="popup-setting__row">
          <el-button icon="el-icon-edit-outline" round @click="onEdit">{{$t('page.calendar.edit')}}</el-button>
      </div>
      <div class="popup-setting__row">
          <el-button icon="el-icon-top" round @click="handleClick('extra_fee')">{{$t('page.calendar.extra_fee')}}</el-button>
      </div>
      <div class="popup-setting__row">
          <el-button icon="el-icon-bottom" round @click="handleClick('direct_discount')">{{$t('page.calendar.direct_discount')}}</el-button>
      </div>
      <div class="popup-setting__row">
        <el-button :disabled="true" icon="el-icon-delete" round @click="onSettingRoomType">{{$t('page.calendar.delete')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PopupSetting',
  data () {
    return {
      ui: {
        openPopupSetting: false,
        isSubmitting: false
      },
      roomSn: null
    }
  },
  methods: {
    open (roomSn) {
      this.roomSn = roomSn
      this.ui.openPopupSetting = true
    },

    onDetailRoom () {
      this.$router.push({ name: 'detailRoomType', params: { sn: this.roomSn, hotelSn: this.sn } })
    },

    onSettingRoomType () {
      this.$router.push({ name: 'setting-room-type', params: { sn: 4150, roomTypeSn: 11432 } })
    },

    onEdit () {
      this.$router.push({ name: 'editRoomType', params: { sn: this.roomSn } })
    },

    async handleClick (e) {
      await this.$emit('openChildModal', this.roomSn, e)
      this.ui.openPopupSetting = false
    }
  }
}
</script>

<style lang="scss">
.popup-setting {
  .el-dialog {
      width: 70vw;
      @media (min-width:768px) {
          width: 50vw;
      }
      @media (min-width:1280px) {
          width: 30vw;
      }
      @media (min-width: 1920px) {
          width: 26vw;
      }
      &__header {
        text-align: center;
      }
  }
  &__row {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 1em;
    button {
      width: 100%;
      border: none;
      display: grid;
      grid-template-columns: 30% 70%;
      @media (min-width:768px) {
          width: 60%;
      }
      span {
        text-align: left;
      }
    }
  }
}
</style>
