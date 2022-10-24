<template>
  <el-dialog
    :id="id"
    :title="$t('page.exportFlashSale.name')"
    :visible.sync="FlashSaleExportModalVisible"
    :show-close="true"
    width="35%"
  >
    <div class="edit-flash-sale-export">
      <p style="text-align: center;">
        {{ $t("page.exportFlashSale.export_title") }}
      </p>
      <div>
        <el-date-picker
          v-model="startDate"
          popper-class="disable-time-picker"
          type="datetime"
          :placeholder="$t('header.from')"
          @change="onChangeStartDate"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        ~
        <el-date-picker
          v-model="endDate"
          popper-class="disable-time-picker"
          :picker-options="dateEndPickerOptions"
          type="datetime"
          :placeholder="$t('header.to')"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <el-button type="primary" @click="onExport" style="margin-left: 10px">
          {{ $t("button.export") }}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { onExportFlashSale } from './api'
export default {
  data () {
    return {
      startDate: new Date(),
      endDate: new Date(),
      dateEndPickerOptions: {},
      FlashSaleExportModalVisible: false
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
    async onExport () {
      try {
        const params = {
          startDate: this.formatDate(this.startDate, false),
          endDate: this.formatDate(this.endDate, false)
        }
        await onExportFlashSale(params)
        this.onClose()
        this.$message({
          type: 'success',
          message: `${this.$t('message.exportSuccess')}`
        })
      } catch (error) {
        return false
      } finally {
        this.loadingExtraFee = false
      }
    },

    onChangeStartDate (data) {
      this.dateEndPickerOptions = {
        disabledDate (date) {
          return date < new Date(data)
        }
      }
    },
    reset () {
      this.data = {}
    },
    open () {
      this.FlashSaleExportModalVisible = true
      this.reset()
    },
    onClose () {
      this.FlashSaleExportModalVisible = false
    }
  }
}
</script>
