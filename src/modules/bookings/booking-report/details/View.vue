<template>
  <sa-section
    v-loading="ui.loading"
    class="brp-details"
  >
    aaa
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { fetchUserBookingDetails } from './api'
export default {
  components: { SaSection },
  name: 'BookingReportDetails',
  data: (vm) => {
    return {
      bookingReportDetails: {},
      ui: {
        loading: false
      }
    }
  },
  created () {
    this.fetchUserBookingDetails()
  },
  methods: {
    async fetchUserBookingDetails () {
      this.ui.loading = true
      try {
        const { data } = await fetchUserBookingDetails(this.$route.params.sn)
        this.bookingReportDetails = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.brp-details {
}
</style>
