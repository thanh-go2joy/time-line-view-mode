<template>
  <sa-section v-loading="ui.loading">
    <FormArticle action="create" />
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import FormArticle from '../components/form-article.vue'
export default {
  name: 'ArticleCreate',
  components: { SaSection, FormArticle },
  data: () => {
    return {
      ui: {
        loading: false
      },
      articleDetails: {}
    }
  }
}
</script>
