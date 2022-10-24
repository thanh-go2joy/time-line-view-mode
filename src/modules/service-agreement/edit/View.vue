<template>
<sa-section class="update-service-agreement-mgt-segment" v-loading="ui.loadingAerviceAgreemen">
  <el-form
      ref="dataContent"
      label-position="left"
      label-width="25%"
      class="update-service-agreement-mgt-segment__form"
      :model="dataContent"
    >
        <el-form-item
          :label="$t('page.service-agreement.update_private_policy')"
          prop="name"
        >
          <tinymce class="style-ckeditor" v-model="dataContent.privatePolicy" :height="500" />
        </el-form-item>
        <div class="style_hr"></div>
        <el-form-item
          :label="$t('page.service-agreement.update_service_agreement')"
          prop="name"
        >
          <tinymce class="style-ckeditor" v-model="dataContent.serviceAgreement" :height="500" />
        </el-form-item>
        <div class="style_hr"></div>
        <el-form-item
          :label="$t('page.service-agreement.update_mileage_point')"
          prop="name"
        >
          <tinymce class="style-ckeditor" v-model="dataContent.mpPolicy" :height="500" />
        </el-form-item>
        <div class="style_hr"></div>
        <el-form-item
          :label="$t('page.service-agreement.update_payment_policy')"
          prop="name"
        >
          <tinymce class="style-ckeditor" v-model="dataContent.paymentPolicy" :height="500" />
        </el-form-item>
        <el-form-item style="text-align: right;">
              <el-button type="info" size="large" @click="$router.go(-1)">
                  {{$t('button.back')}}
              </el-button>
              <el-button icon="el-icon-refresh"  type="success" size="large" @click="updateServiceAgreement()">

                  {{$t('button.update')}}
              </el-button>
          </el-form-item>
      </el-form>
</sa-section>
</template>

<script>
// @ is an alias to /src
import SaSection from '@/components/globals/SaSection.vue'
import Tinymce from '@/components/globals/Tinymce'
import { repStatus } from '@/utils/const'
import {
  getCommonInfo,
  updatCommonInfo
} from './api'
export default {
  name: 'updateServiceAgreementMgt',
  components: {
    SaSection,
    Tinymce
  },
  data () {
    return {
      ui: {
        loadingAerviceAgreemen: true
      },
      dataContent: {}
    }
  },
  async created () {
    await this.getDataServiceAgreement()
  },
  computed: {
    getLocalize () {
      return this._i18n.locale
    }
  },
  methods: {
    async getDataServiceAgreement () {
      this.ui.loadingAerviceAgreemen = true
      try {
        const { data } = await getCommonInfo()
        this.dataContent = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loadingAerviceAgreemen = false
      }
    },
    async updateServiceAgreement () {
      this.ui.loadingAerviceAgreemen = true
      try {
        const { data } = await updatCommonInfo(this.dataContent)
        if (data?.code === repStatus.sussess) {
          this.$message({
            type: 'success',
            message: `${this.$t('message.updateSuccess')}`
          })
          this.$router.go(-1)
        }
      } catch (error) {
        return false
      } finally {
        this.ui.loadingAerviceAgreemen = false
      }
    }

  }
}
</script>

<style lang="scss" scoped>

.update-service-agreement-mgt-segment:deep {
  .render-content-html {
    html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video, .el-popper {
      font: revert !important;
    }
  }
  .update-service-agreement-mgt-segment__form {
    .style_hr {
      margin: 24px 0;
      border-top: 0.1px solid #dcdcdc;
    }
  }
  .el-form-item__content[style] {
    @media (max-width: 480px) {
        margin-left: unset !important;
        padding-top: 85px;
    }
    .editor-custom-btn-container {
      @media (max-width: 480px) {
        margin-left: unset !important;
        margin-top: 45px;
    }
    }
  }
  .el-form-item__label {
    font-size: 16px;
    font-weight: bold;
    @media (max-width: 480px) {
      text-align: unset !important;
      width: 100% !important;
    }
  }

}

</style>
