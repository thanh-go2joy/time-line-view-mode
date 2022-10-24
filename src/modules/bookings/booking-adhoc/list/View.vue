<template>
  <sa-section class="booking-adhoc">
      <div class="booking-adhoc__filter">
          <el-select
              class="is-filter"
              v-model="dataBookingNo.bookingType"
              @change="changeType"
            >
            <el-option
              v-for="(item, index) in ui.bookingTypeOptions"
              :key="index"
              :label="item.key"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-form
            ref="dataForm"
            :model="dataBookingNo"
            hide-required-asterisk
            label-position="left"
            label-width="25%"
            class="booking-adhoc__form">
            <div style="padding-bottom: 24px;" v-if="dataBookingNo.bookingType === 3">
              <p style="color:red;font-size: 16px;">*** Kiểm tra trên portal của những trang payment gateway xem booking đã được hoàn tất thanh toán hay chưa ?
                <br> Nếu <strong>CHƯA</strong> vui lòng <strong>LIÊN HỆ KHÁCH</strong> để xác nhận lại.
                <br> Nếu <strong>ĐÃ</strong> thanh toán thì tiếp tục những bước bên dưới.
                <br> Do case này dính Promotion từ phía Payment gateway nên CS chủ động Refund cho khách sau đó lấy Refund ID để cập nhật lại thông tin booking</p>
            </div>
            <div style="padding-bottom: 24px;" v-else>
              <p style="color:red;font-size: 16px;">*** Kiểm tra trên portal của những trang payment gateway xem booking đã được hoàn tất thanh toán hay chưa ?
                <br> Nếu <strong>CHƯA</strong> vui lòng <strong>LIÊN HỆ KHÁCH</strong> để xác nhận lại.
                <br> Nếu <strong>ĐÃ</strong> thanh toán thì tiếp tục những bước bên dưới.</p>
            </div>

            <el-form-item :label="$t('page.bookingAdhoc.booking_no')" prop="bookingNo">
              <el-col :span="24">
                <ElInput type="number" :placeholder="$t('page.bookingAdhoc.booking_no')"  v-model="dataBookingNo.bookingNo" @blur="getBlurBookingNo()" />
              </el-col>
            </el-form-item>
            <el-form-item :label="$t('page.bookingAdhoc.trading_code')" prop="partnerUserBookingId">
              <el-col :span="24">
                <ElInput :placeholder="$t('page.bookingAdhoc.trading_code')" :disabled="true" v-model="dataBookingNo.transactionId" />
              </el-col>
            </el-form-item>

            <el-form-item :label="$t('page.bookingAdhoc.psp_transaction_id')" v-if="dataBookingNo.bookingType !== 3">
              <el-col :span="12" class="get-transaction-id">
                <ElInput :placeholder="$t('page.bookingAdhoc.psp_transaction_id')" v-model="dataBookingNo.pspTransactionId" />
              </el-col>
              <el-col v-if="dataBookingNo.bookingType !== 3" class="line" :span="1">-</el-col>
              <el-col v-if="dataBookingNo.bookingType !== 3" :span="11" class="get-transaction-id">
                <p><a style="color:#ff6400" href="https://docs.google.com/document/d/1Q9-g8NPNmFplfSchHWo8Y8d8Ndh_Wb0svydl5qFVURc/edit" target="_blank">Hướng dẫn lấy PSP Transaction ID</a></p>
              </el-col>
            </el-form-item>
            <el-form-item :label="$t('page.bookingAdhoc.psp_transaction_id')" v-else>
              <el-col :span="24" class="get-transaction-id">
                <ElInput :placeholder="$t('page.bookingAdhoc.psp_transaction_id')" v-model="dataBookingNo.pspTransactionId" />
              </el-col>
            </el-form-item>
            <el-form-item :label="$t('page.bookingAdhoc.refund_id')" v-if="dataBookingNo.bookingType === 3">
              <el-col :span="12" class="get-transaction-id">
                <ElInput :placeholder="$t('page.bookingAdhoc.refund_id')" v-model="dataBookingNo.rfTransactionId" />
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="11" class="get-transaction-id">
                <p><a style="color:#ff6400" href="https://docs.google.com/document/d/1Q9-g8NPNmFplfSchHWo8Y8d8Ndh_Wb0svydl5qFVURc/edit#heading=h.hayhe7w2ck7y" target="_blank">Hướng dẫn lấy Refund ID</a></p>
              </el-col>
            </el-form-item>
            <el-form-item style="text-align: right;padding-top: 25px;">
              <el-button plain type="warning" v-if="hasPermission('sabooking', 'pModify')" :disabled="
                checkUpdate(
                    dataBookingNo.bookingNo,
                    dataBookingNo.pspTransactionId,
                    dataBookingNo.rfTransactionId
                )"
                :loading="ui.isSubmiting" size="large" icon="el-icon-refresh" @click="updateBookingAdhoc()">
                  {{ $t('button.update')}}
              </el-button>
              <el-button plain type="primary" v-if="hasPermission('sabooking', 'pModify') && dataBookingNo.bookingType !== 3" :disabled="checkRefund()" size="large" icon="el-icon-caret-right" @click="updateRefundBookingNo()" >
                  {{ $t('button.refund')}}
              </el-button>
            </el-form-item>
          </el-form>
      </div>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import {
  getDataBookingAdhoc,
  updatePaymentTransactionInfo,
  cancelAgodaBooking,
  cancelFailedPaymentBooking,
  updateBookingsZaloPay,
  bookingsReportsRefund
} from './api'
export default {
  components: { SaSection },
  name: 'BookingAdhoc',
  data: (vm) => {
    return {
      // data from APIs
      listHotels: [],
      // ui
      ui: {
        loading: false,
        bookingTypeOptions: [
          { key: 'Booking báo lỗi refund', value: 0 },
          { key: '[Agoda] Chuyển trạng thái booking Agoda thành Cancel để CS refund', value: 1 },
          { key: 'Booking fail nhưng ghi nhận thanh toán thành công phải chuyển trạng thái booking thành cancel để CS refund', value: 2 },
          { key: 'ZaloPay refund báo lỗi "Số tiền refund không hợp lệ"', value: 3 }
        ]
      },
      isRefund: false,
      dataBookingNo: {
        pspTransactionId: '',
        transactionId: '',
        userBookingSn: 0,
        bookingType: 0,
        bookingNo: '',
        rfTransactionId: ''
      }
    }
  },
  methods: {
    // const bookingNo = '617146, 610490'
    async getDataBookingAdhoc () {
      if (!this.dataBookingNo.bookingNo) {
        this.$message({
          type: 'warning',
          message: this.$t('page.bookingAdhoc.requiredbookingNoTitle')
        })
        return
      }
      this.ui.loading = true
      try {
        const { data } = await getDataBookingAdhoc({ bookingNo: this.dataBookingNo.bookingNo })
        this.dataBookingNo.pspTransactionId = data.data.pspTransactionId
        this.dataBookingNo.transactionId = data.data.transactionId
        this.dataBookingNo.userBookingSn = data.data.userBookingSn
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    getBlurBookingNo () {
      this.getDataBookingAdhoc(this.dataBookingNo.bookingNo)
    },
    changeType () {
      this.dataBookingNo.bookingNo = ''
      this.dataBookingNo.transactionId = ''
      this.dataBookingNo.pspTransactionId = ''
      this.dataBookingNo.refunId = ''
      this.isRefund = false
    },
    async updateBookingAdhoc () {
      if (!this.dataBookingNo.pspTransactionId) {
        this.$message({
          type: 'warning',
          message: this.$t('page.bookingAdhoc..message_input_psp_transaction_id')
        })
        return
      }
      if (!this.dataBookingNo.userBookingSn) {
        this.$message({
          type: 'warning',
          message: this.$t('userBookingSn không tồn tại')
        })
      }
      this.ui.loading = true
      try {
        let apiUpdate = ''
        switch (this.dataBookingNo.bookingType) {
          case 0:
            apiUpdate = updatePaymentTransactionInfo
            break
          case 1:
            apiUpdate = cancelAgodaBooking
            break
          case 2:
            apiUpdate = cancelFailedPaymentBooking
            break
          case 3:
            apiUpdate = updateBookingsZaloPay
            break
          default:
            apiUpdate = updatePaymentTransactionInfo
        }
        let query = {}
        if (this.dataBookingNo.bookingType === 3) {
          query = {
            userBookingSn: this.dataBookingNo.userBookingSn,
            rfTransactionId: this.dataBookingNo.rfTransactionId
          }
        } else {
          query = {
            userBookingSn: this.dataBookingNo.userBookingSn,
            pspTransactionId: this.dataBookingNo.pspTransactionId
          }
        }
        const { data } = await apiUpdate(query)

        if (data.code === 1) {
          this.isRefund = true
          this.dataBookingNo.rfTransactionId = ''
          this.$message({
            type: 'success',
            message: this.$t('page.bookingAdhoc.update_success')
          })
        }
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    async getAPIRefund () {
      const sn = this.dataBookingNo.userBookingSn
      try {
        await this.$confirm(`${this.$t('page.bookingAdhoc.message_alert')} ${this.dataBookingNo.bookingNo}`, `${this.$t('page.bookingAdhoc.message_alert')}`, {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        try {
          const { data } = await bookingsReportsRefund(sn)
          if (data.code === 1) {
            this.$message({
              type: 'success',
              message: this.$t('page.bookingAdhoc.refunded')
            })
            this.dataBookingNo.bookingNo = ''
            this.dataBookingNo.transactionId = ''
            this.dataBookingNo.pspTransactionId = ''
            this.isRefund = false
          }
        } catch (error) {
          this.$message({
            type: 'error',
            message: error.message
          })
          return false
        }
      } catch (error) {
        this.$message({
          type: 'info',
          message: error
        })
      }
    },
    checkUpdate (bookingNo, pspTransactionID, rfTransactionId) {
      if (this.dataBookingNo.bookingType !== 3) {
        if (!bookingNo || !pspTransactionID) {
          return true
        } else {
          return false
        }
      } else {
        if (!bookingNo || !rfTransactionId) {
          return true
        } else {
          return false
        }
      }
    },
    checkRefund () {
      let isCheck = true
      if ((this.dataBookingNo.pspTransactionId && this.dataBookingNo.userBookingSn && this.dataBookingNo.bookingNo) && this.isRefund === true) {
        isCheck = false
      } else {
        isCheck = true
      }
      return isCheck
    },
    updateRefundBookingNo () {
      if (!this.dataBookingNo.bookingNo) {
        this.$message({
          type: 'error',
          message: this.$t(
            'page.bookingAdhoc.message_input_booking_no'
          )
        })
      } else {
        this.getAPIRefund()
      }
    }
  }
}
</script>
<style lang="scss">
.booking-adhoc {
  display: block;
  .el-form-item__content[style] {
    @media (max-width: 480px) {
        margin-left: unset !important;
    }
  }
  .el-form-item__label {
    @media (max-width: 480px) {
      text-align: unset !important;
      width: 100% !important;
    }
  }
  .line {
    @media (max-width: 480px) {
      display: none;
    }
  }
  .get-transaction-id {
    @media (max-width: 480px) {
      text-align: unset !important;
      width: 100% !important;
    }
  }
}

</style>
<style lang="scss" scoped>
.el-form-item {
    margin-bottom: 0px;
}
.booking-adhoc {
  &__filter {
    .is-filter {

      min-width:auto;
      padding-bottom: 50px;
      @media (min-width: 640px) {
        min-width: 400px;
      }

    }
    .el-select, .el-date-editor, .el-button {
      margin-right: 12px;
      margin-left: 0;
      margin-bottom: 12px;
    }

  }
  &__form {
    strong {
      font-weight: bold !important;
    }

.el-form-item {
    margin-bottom: 0px;
}
  }
  &__footer {
    margin-top: 30px;
  }
  .operations {
    cursor: pointer;
    transform: rotate(90deg);
    &:hover {
      color: #ff6400;
    }
  }
}
</style>
