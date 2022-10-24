<template>
  <sa-section v-loading="ui.loading">
    <FormArticle :article="articleDetails" action="edit" />
  </sa-section>
</template>
<script>
import { getArticleDetails } from './api'
import SaSection from '@/components/globals/SaSection.vue'
import FormArticle from '../components/form-article.vue'
export default {
  name: 'ArticleEditing',
  components: { SaSection, FormArticle },
  data: () => {
    return {
      ui: {
        loading: false
      },
      articleDetails: {}
    }
  },
  created () {
    this.getArticleDetails()
  },
  methods: {
    async getArticleDetails () {
      this.ui.loading = true
      try {
        const { data } = await getArticleDetails(this.$route.params.sn)
        this.articleDetails = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    }
  }
}
</script>
<style lang="">

</style>
