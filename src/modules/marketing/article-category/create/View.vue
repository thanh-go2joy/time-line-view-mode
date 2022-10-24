<template>
  <sa-section
    class="article-category"
  >
    <CategoryForm page="create" />
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import CategoryForm from '../components/category-form.vue'
export default {
  name: 'ArticleCategory',
  components: { SaSection, CategoryForm }
}
</script>
