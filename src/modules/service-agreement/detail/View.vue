<template>
<sa-section class="service-agreement-mgt-segment" v-loading="ui.loadingAerviceAgreemen">
  <template slot="header">
    <el-button type="warning" icon="el-icon-plus" style="float: right;" @click="updateServiceAgreement" plain>{{ $t('button.update') }}</el-button>
  </template>
  <div class="service-agreement-mgt-segment__content">
    <el-tabs type="border-card">
      <el-tab-pane :label="$t('page.service-agreement.private_policy')">
        <div class="render-content-html" v-html="dataContent.privatePolicy"></div>
      </el-tab-pane>
      <el-tab-pane :label="$t('page.service-agreement.service_agreement')">
        <div class="render-content-html" v-html="dataContent.serviceAgreement"></div>
      </el-tab-pane>
      <el-tab-pane :label="$t('page.service-agreement.mileage_point')">
        <div class="render-content-html" v-html="dataContent.mpPolicy"></div>
      </el-tab-pane>
      <el-tab-pane :label="$t('page.service-agreement.payment_policy')">
        <div class="render-content-html" v-html="dataContent.paymentPolicy"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</sa-section>
</template>

<script>
// @ is an alias to /src
import SaSection from '@/components/globals/SaSection.vue'
import {
  getCommonInfo
  // updatCommonInfo
} from './api'
export default {
  name: 'serviceAgreementMgt',
  components: {
    SaSection
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
    }, // getListReview
    async updateServiceAgreement () {
      this.$router.push({ name: 'update_service_agreement_mgt' })
    }
  }
}
</script>

<style lang="scss" scoped>

.service-agreement-mgt-segment:deep {
  .el-tabs__item {
    font-weight: bold !important;
    font-size: 16px;

  }
  .is-active {
    color: #ff6400 !important;
  }
  .render-content-html {
    html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video, .el-popper {
      font: revert !important;
    }
  }
  .service-agreement-mgt-segment__content {
    padding-top: 50px !important;
  }

}

</style>
