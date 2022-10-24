<template>
  <sa-section>
    <FormStaff page="edit" />
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import FormStaff from '../components/staff-form.vue'
export default {
  components: { SaSection, FormStaff },
  name: 'Go2joyStaffEdit'
}
</script>
<style lang="scss" scoped>

</style>
