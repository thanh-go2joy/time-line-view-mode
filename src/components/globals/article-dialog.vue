<template>
  <el-dialog
    class="article-dialog"
    :visible.sync="dialogVisible"
    width="40%"
    @close="closeDialog"
  >
    <div class="article-dialog__title">
      <p class="text-word-break">
        {{ article.title }}
      </p>
    </div>
    <div class="article-dialog__info" style="font-weight: 600">
      <span>{{ $t('page.article.articleCategory') }}:</span>
      <span>{{ article.categoryName }}</span>
      <span>|</span>
      <span>{{ $t('page.article.displayType') }}:</span>
      <span v-if="article.articleDisplayType">{{ article.articleDisplayType }}</span>
      <span v-if="article.displayType && article.displayType.length > 0">
        <span v-for="(item, index) in article.displayType" :key="index" style="margin-right: 0px;">
          <span v-if="index !== 0 && index !== article.displayType.length" style="margin-right: 8px;">,&nbsp;</span>{{ item.name }}
        </span>
      </span>
    </div>
    <div class="article-dialog__info">
      <span>{{ formatDate(article.schedulePosting) }}</span>
      <span>|</span>
      <span>{{ $t('page.article.by') }} {{ article.author }}</span>
      <span>|</span>
      <span>{{ $t('page.article.views') }}:</span>
      <span>{{ article.numberOfView }}</span>
    </div>
    <div class="article-dialog__image">
      <img :src="formatImage(article.imagePath)" :alt="article.imagePath">
    </div>
    <div class="article-dialog__subContent">
      {{ article.subContent }}
    </div>
     <div class="article-dialog__content" v-html="article.content">
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'ArticleDialog',
  data: () => {
    return {
      article: {}
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialogVisible: {
      get () {
        return this.visible
      },
      set (newValue) {
        this.$emit('update:visible', newValue)
      }
    }
  },
  methods: {
    setup (article) {
      this.article = article
    },
    closeDialog (e) {
      this.$emit('close', e)
    }
  }
}
</script>
<style lang="scss" scoped>
.article-dialog {
  word-break: normal;
  &__title {
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 16px;
    color: #212121;
  }
  &__image {
    img {
      width: 100%;
      object-fit: contain;
      text-align: center;
    }
  }
  &__subContent {
    margin: 16px 0;
    font-size: 16px;
    font-weight: 600;
  }
  &__info {
    color: #696969;
    margin-bottom: 12px;
    font-size: 14px;
    span {
      margin-right: 16px;
    }
  }
  &__content {
    word-break: normal;
    overflow: hidden;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
}
</style>
