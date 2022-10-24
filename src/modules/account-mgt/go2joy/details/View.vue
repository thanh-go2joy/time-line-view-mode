<template>
  <sa-section class="staff-details">
    <div
      v-for="(item, index) in ui.displayDetails"
      :key="index"
      class="staff-details__item"
    >
      <span class="staff-details__item--left">{{ $t(`page.staffs.${item}`) }}</span>
      <span v-if="item === 'enable'" class="staff-details__item--right">{{ staffDetails.status === 1 ? '✔' : '' }}</span>
      <span v-if="item === 'role'" class="staff-details__item--right">{{ staffDetails.role.name }}</span>
      <span v-else class="staff-details__item--right">{{ staffDetails[item] }}</span>
    </div>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { getStaffDetails } from '../edit/api'
export default {
  name: 'StaffMgt',
  components: { SaSection },
  data: () => {
    return {
      ui: {
        loading: false,
        displayDetails: [
          'fullName',
          'enable',
          'userId',
          'role',
          'mobile',
          'email',
          'address',
          'memo'
        ]
      },
      staffDetails: {}
    }
  },
  created () {
    this.getStaffDetails()
  },
  methods: {
    async getStaffDetails () {
      this.ui.staffLoading = true
      try {
        const { data } = await getStaffDetails(this.$route.params.sn)
        this.staffDetails = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.staffLoading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.staff-details {
  &__item {
    display: flex;
    align-items: center;
    padding: 12px 0px;
    border-bottom: 1px solid #EBEEF5;
    color: #8A98AC;
    &--left {
      min-width: 350px;
    }
  }
}
</style>
