<template>
  <sa-section
    v-loading="ui.loading"
    class="second-splash"
  >
    <SecondSplashForm
      page="create"
    />
  </sa-section>
</template>
<script>
import SecondSplashForm from '../components/form.vue'
import SaSection from '@/components/globals/SaSection.vue'
export default {
  name: 'OpenSecondSplashCreate',
  components: { SaSection, SecondSplashForm },
  data: () => {
    return {
      ui: {
        loading: false,
        secondSplashes: {},
        districtsLocation: []
      }
    }
  }
}
</script>
