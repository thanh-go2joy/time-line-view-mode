<template>
  <sa-section >
    <FormEdit page="edit" />
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import FormEdit from '../components/form.vue'
export default {
  name: 'hotelOntopEdit',
  components: {
    FormEdit,
    SaSection
  }
}
</script>
