<template>
  <sa-section
    v-loading="ui.isLoading"
    class="notice"
  >
    <div class="notice__info">
      <div class="card-item" v-for="(value, label, index) in ui.form" :key="index">
        <p class="card-item__label">
          {{ $t(`page.notice.${label}`) }}
        </p>
        <div v-if="label === 'content'" class="card-item__value">
          <p v-html="value"></p>
        </div>
        <p v-else class="card-item__value">
          {{ value }}
        </p>
      </div>
    </div>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { getAppNoticeDetails } from './api'
export default {
  name: 'NoticeDetails',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        isLoading: false,
        form: {}
      }
    }
  },
  created () {
    this.getNoticeDetails()
  },
  methods: {
    async getNoticeDetails () {
      this.ui.isLoading = true
      try {
        const { data } = await getAppNoticeDetails(this.$route.params.sn)
        this.ui.form = {
          title: data.data.title,
          onTop: data.data.top === 1 ? this.$t('option.yes') : this.$t('option.yes'),
          homePage: data.data.homePage === 1 ? '✔' : '',
          createStaff: data.data.staffName,
          createTime: this.formatDate(data.data.createTime),
          lastUpdate: this.formatDate(data.data.lastUpdate),
          content: data.data.content
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-item {
    padding: 1em 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    display: flex;
    align-items: center;
    &__label {
      width: 30%;
      font-weight: 600;
    }
    &__value {
      width: 70%;
    }
    @media (max-width: 640px) {
      display: block;
      &__label {
        width: 100%;
      }
      &__value {
        width: 100%;
      }
      .card-item__value {
        :deep(img) {
          width: 100% !important;
          object-fit: cover;
        }
      }
    }
  }
</style>
