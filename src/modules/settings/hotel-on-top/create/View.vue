<template>
  <sa-section >
    <FormEdit page="create" />
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import FormEdit from '../components/form.vue'
export default {
  name: 'hotelOntopCreate',
  components: {
    FormEdit,
    SaSection
  }
}
</script>
