<template>
  <sa-section
    v-loading="ui.loadingGetDetails"
    class="general-settings"
  >
    <div class="general-settings__row">
      <p class="general-settings__label">
        {{ $t('page.settings.updateSetting') }}
      </p>
      <el-button
        type="success"
        @click="updateSetting"
      >
        {{ $t('page.settings.refresh') }}
      </el-button>
    </div>

    <div class="general-settings__row">
      <p class="general-settings__label">
        {{ $t('page.settings.changeNewAfter') }}
      </p>
      <div class="general-settings__content">
        <el-input
          v-model="settingDetails.changeNewAfter">
          <p slot="suffix">{{ $t('page.settings.days') }}</p>
        </el-input>
      </div>
    </div>

    <div class="general-settings__row">
      <p class="general-settings__label">
        {{ $t('page.settings.blockBookingFrom') }}
      </p>
      <div class="general-settings__content">
        <el-input
          v-model="settingDetails.blockBookingFrom">
          <p slot="suffix">{{ $t('page.settings.days') }}</p>
        </el-input>
      </div>
    </div>

    <div class="general-settings__row">
      <p class="general-settings__label">
        {{ $t('page.settings.lastVersion') }}
      </p>
      <div class="general-settings__content">
        <el-input
          v-model="settingDetails.lastIosVersion">
          <p slot="suffix">IOS App</p>
        </el-input>
        <el-input
          v-model="settingDetails.lastAndroidVersion">
          <p slot="suffix">Android App</p>
        </el-input>
      </div>
    </div>

    <div class="general-settings__row">
      <p class="general-settings__label">
        {{ $t('page.settings.partnerLastVersion') }}
      </p>
      <div class="general-settings__content">
        <div class="general-settings__content">
          <el-input
            v-model="settingDetails.lastIosPartnerVer">
            <p slot="suffix">IOS App</p>
          </el-input>
        </div>
        <div class="general-settings__content">
          <el-input
            v-model="settingDetails.lastAndroidPartnerVer">
            <p slot="suffix">Android App</p>
          </el-input>
        </div>
      </div>
    </div>

    <div class="general-settings__row">
      <p class="general-settings__label">
        {{ $t('page.settings.cineJoyLastVersion') }}
      </p>
      <div class="general-settings__content">
        <div class="general-settings__content">
          <el-input
            v-model="settingDetails.lastIosCineVer">
            <p slot="suffix">IOS App</p>
          </el-input>
        </div>
        <div class="general-settings__content">
          <el-input
            v-model="settingDetails.lastAndroidCineVer">
            <p slot="suffix">Android App</p>
          </el-input>
        </div>
      </div>
    </div>

    <div class="general-settings__row">
      <p class="general-settings__label">
        {{ $t('page.settings.refreshCacheData') }}</p>
      <el-button
        type="success"
        @click="getSettings"
      >
        {{ $t('page.settings.refresh') }}
      </el-button>
    </div>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { getSettings, updateSetting } from './api'
export default {
  name: 'GeneralSettings',
  components: {
    SaSection
  },
  data: () => {
    return {
      ui: {
        loadingGetDetails: false,
        loadingUpdateSetting: false
      },
      filter: {
        status: 1
      },
      settingDetails: {}
    }
  },
  created () {
    this.getSettings()
  },
  methods: {
    async getSettings () {
      this.ui.loadingGetDetails = true
      try {
        const { data } = await getSettings(this.filter)
        this.settingDetails = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loadingGetDetails = false
      }
    },
    async updateSetting () {
      this.ui.loadingUpdateSetting = true
      try {
        const { data } = await updateSetting(this.settingDetails)
        if (data.code === 1) {
          const message = this.$t('message.updateSuccess')
          this.$message({
            type: 'success',
            message: message
          })
        }
      } catch (error) {
        return false
      } finally {
        this.ui.loadingUpdateSetting = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.general-settings {
  &__row {
    display: flex;
    align-items: center;
    margin-bottom: 1em;
  }
  &__label {
    width: 30%;
    font-weight: 600;
  }
  &__content {
    width: auto;
    display: flex;
    align-items: center;
    gap: 2em;
  }
  @media (max-width: 640px) {
    &__row {
      display: block;
    }
    &__label {
      width: 100%;
    }
  }
}
.general-settings {
  :deep(.el-input__suffix) {
    margin-top: 10px;
  }
}
</style>
