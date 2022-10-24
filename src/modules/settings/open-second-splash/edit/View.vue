<template>
  <sa-section
    v-loading="ui.loading"
    class="second-splash"
  >
    <SecondSplashForm
      page="edit"
    />
  </sa-section>
</template>
<script>
import SecondSplashForm from '../components/form.vue'
import SaSection from '@/components/globals/SaSection.vue'
export default {
  name: 'OpenSecondSplashEdit',
  components: { SaSection, SecondSplashForm },
  data: (vm) => {
    return {
      ui: {
        loading: false
      }
    }
  }
}
</script>
