<template>
  <el-dialog
    :id="id"
    :visible.sync="RoomSettingModalVisible"
    :show-close="false"
    width="30%"
    :before-close="closeRoomSettingModal"
  >
    <el-row>
      <el-col :span="4" :class="isDisable">
        <label class="switch">
          <input
            type="checkbox"
            class="revent-status"
            v-model="status"
            v-on:click="handleToggleChanged"
          />
          <span class="slider round"></span>
        </label>
      </el-col>
      <el-col :span="20">
        {{ $t("page.calendar.sold_out") }}
      </el-col>
    </el-row>
    <el-row class="click-able" @click.native="handleClick(`view`)">
      <el-col :span="4">
        <i class="el-icon-view"></i>
      </el-col>
      <el-col :span="20">
        <p class="text-dark">{{ $t("page.calendar.detail") }}</p>
      </el-col>
    </el-row>
    <el-row class="click-able" @click.native="handleClick(`edit`)" :class="isDisable">
      <el-col :span="4">
        <i class="el-icon-edit-outline"></i>
      </el-col>
      <el-col :span="20">
        {{ $t("page.calendar.edit") }}
      </el-col>
    </el-row>
    <el-row class="click-able" @click.native="handleClick(`extra_fee`)" :class="isAllowExtraFee">
      <el-col :span="4">
        <i class="el-icon-top"></i>
      </el-col>
      <el-col :span="20">
        {{ $t("page.calendar.extra_fee") }}
      </el-col>
    </el-row>
    <el-row class="click-able" @click.native="handleClick(`direct_discount`)" :class="isDisable">
      <el-col :span="4">
        <i class="el-icon-bottom"></i>
      </el-col>
      <el-col :span="20">
        {{ $t("page.calendar.direct_discount") }}
      </el-col>
    </el-row>
    <el-row
      class="click-able"
      @click.native="handleClick(`delete`)"
      :class="isDisable"
    >
      <el-col :span="4">
        <i class="el-icon-delete"></i>
      </el-col>
      <el-col :span="20">
        {{ $t("page.calendar.delete") }}
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  props: {
    id: {
      type: String,
      default: ''
    },
    origin: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      RoomSettingModalVisible: false,
      status: 0,
      args: {}
    }
  },
  computed: {
    isDisable () {
      if (this.origin === 2) {
        return 'disabled'
      } else {
        return ''
      }
    },
    isAllowExtraFee () {
      if (this.args.allowExtrafee === '0' || this.origin === 2) {
        return 'disabled'
      } else {
        return false
      }
    }
  },
  created () {},
  methods: {
    openRoomSettingModal (args) {
      this.args = args
      this.status = Number(args.status) === 1 ? 1 : 0
      this.RoomSettingModalVisible = true
    },
    closeRoomSettingModal () {
      this.RoomSettingModalVisible = false
    },
    handleClick (e) {
      this.closeRoomSettingModal()
      this.$emit('openChildModal', this.args.sn, e)
    },
    handleToggleChanged () {
      this.$emit('switchClick', this.args)
    }
  }
}
</script>

<style lang="scss" scoped>
.click-able {
  cursor: pointer;
}
.el-col-4 {
  i {
    font-size: 15px;
  }
}
// stype switch input
.switch {
  position: relative;
  display: inline-block;
  width: 34px;
  height: 16px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
    &:focus + .slider {
      box-shadow: 0 0 1px #2196f3;
    }
    &:checked + .slider:before {
      -webkit-transform: translateX(17px);
      -ms-transform: translateX(17px);
      transform: translateX(17px);
    }
    &:checked + .slider {
      background-color: #2196f3;
    }
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    &:before {
      position: absolute;
      content: "";
      height: 10px;
      width: 10px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
    &.round {
      border-radius: 34px;
      &:before {
        border-radius: 50%;
      }
    }
  }
}
</style>
