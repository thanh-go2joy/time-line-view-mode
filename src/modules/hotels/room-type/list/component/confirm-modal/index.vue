<template>
  <el-dialog
    :id="id"
    :title="$t('page.comFirmLockRoom.name')"
    :visible.sync="confirmModalVisible"
    width="40%"
  >
    <div class="confirm-lock-room">
      <h3 class="hotel-name">{{ name }}</h3>
      <div class="confirm-lock-table">
        <div v-if="!isLoading">
          <div v-if="lockRoom">
            <el-row>
              <el-col class="confirm-lock-header" :span="10">
                  <p>{{ $t("page.comFirmLockRoom.room_name") }}</p>
              </el-col>
              <el-col class="confirm-lock-header" :span="14">
                  <p>{{ $t("page.comFirmLockRoom.block_time") }}</p>
              </el-col>
            </el-row>
            <el-row
              class="row"
              v-for="(content, index) in lockRoom"
              :key="index"
            >
                <el-col class="confirm-lock-content" :span="10">
                    <p>{{ content.roomTypeName }}</p>
                </el-col>
                <el-col class="confirm-lock-content" :span="14">
                  <p v-if="content.displayLockWeek" class="lock-content">
                    <i class="el-icon-lock" />{{ content.displayLockWeek }}
                  </p>
                  <p v-if="content.displayLockSpecial" class="lock-content">
                    <i class="el-icon-lock" />{{ content.displayLockSpecial }}
                  </p>
                </el-col>
            </el-row>
          </div>
          <div v-else style="text-align: center;padding: 20px;">
            <p>{{ $t('no_data') }}</p>
          </div>
        </div>
        <div v-else style="text-align: center;padding: 12px;">
          <h2><i class="el-icon-loading"></i></h2>
          <h2> loading ...</h2>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <div class="">
        <el-button
          type="success"
          data-dismiss="modal"
          @click="onConfirmLockRoom"
        >
          {{ $t("button.confirm") }}
        </el-button>
        <el-button
          type="danger"
          class="btn btn-danger"
          data-dismiss="modal"
          @click="onCancelLockRoom"
        >
          {{ $t("button.cancel") }}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { listLockRoom, onCancelLockRoom, onConfirmLockRoom } from './api'
export default {
  data () {
    return {
      lockRoom: [],
      sn: 0,
      name: '',
      confirmModalVisible: false,
      isLoading: false
    }
  },
  created () {
    this.reset()
  },
  watch: {},
  components: {},
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  computed: {},
  methods: {
    async listLockRoom () {
      this.isLoading = true
      try {
        const { data } = await listLockRoom(this.sn)
        this.lockRoom = data.data
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    },
    async onConfirmLockRoom () {
      try {
        await onConfirmLockRoom(this.sn)
        this.$message({
          type: 'success',
          message: `${this.$t('message.success')}`
        })
        this.onClose()
        this.$emit('reloadRoom')
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    },
    async onCancelLockRoom () {
      try {
        await onCancelLockRoom(this.sn)
        this.$message({
          type: 'success',
          message: `${this.$t('message.success')}`
        })
        this.onClose()
        this.$emit('reloadRoom')
      } catch (error) {
        return false
      } finally {
      }
    },
    reset () {
      this.data = {}
    },
    async open (id, name) {
      this.confirmModalVisible = true
      this.reset()
      this.sn = id || id
      this.name = name || name
      this.lockRoom = []
      await this.listLockRoom()
    },
    onClose () {
      this.confirmModalVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .hotel-name{
    display: flex;
    justify-content: center;
    font-weight: 600;
    color: #263a5b;
    font-size: 26px;
  }
  .confirm-lock-header,
  .confirm-lock-content{
    padding: 10px;
    border: 1px solid #c6cbd3;
    font-weight: 400;
    color: #111;
    i{
      color: #e60d0d;
    }
  }
  .row {
    display: flex
  }
  .lock-content {
    word-break: break-word;
  }
</style>
