<template>
  <sa-section
    class="article-category"
    v-loading="ui.loadingCategory"
  >
    <template slot="header">
      <el-button
        plain
        type="warning"
        icon="el-icon-plus"
        style="float: right;"
        @click="$router.push({ name: 'articleCategoryCreate' })"
      >
        {{ $t('button.add') }}
      </el-button>
    </template>
    <el-table
      v-loading="ui.loading"
      :data="categories"
    >
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column
        :label="$t('page.article.categoryName')"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'article', query: { categorySn: scope.row.sn } }">
            {{ scope.row.name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="numberOfArticle"
        :label="$t('page.article.numberOfArticle')"
      ></el-table-column>
      <el-table-column
        prop="hashTag"
        :label="$t('page.article.hashtag')"
      ></el-table-column>
      <el-table-column
        :label="$t('page.article.lastUpdate')"
      >
        <template slot-scope="scope">
          <p>{{ formatDate(scope.row.lastUpdate) }}</p>
          <p>{{ scope.row.updateStaffName }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.article.operations')"
        align="center"
      >
        <template slot-scope="scope">
          <el-popover
            placement="left"
            trigger="click"
          >
          <i slot="reference" class="operations el-icon-more" />
          <div class="flex" style="padding: 8px 12px;">
            <el-button
              type="success"
              plain
              size="small"
              @click="$router.push({ name: 'articleCategoryEdit', params: { sn: scope.row.sn } })"
            >
              {{ $t('button.edit') }}
            </el-button>
            <el-button
              type="danger"
              plain
              size="small"
              @click="deleteArticleCategory(scope.row.sn)"
            >
              {{ $t('button.delete') }}
            </el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { deleteCategory, fetchCategories } from './api'
export default {
  name: 'ArticleCategory',
  components: { SaSection },
  data: (vm) => {
    return {
      ui: {
        loadingCategory: false
      },
      categories: []
    }
  },
  created () {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories () {
      this.ui.loadingCategory = true
      try {
        const { data } = await fetchCategories()
        this.categories = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loadingCategory = false
      }
    },
    async deleteArticleCategory (sn) {
      try {
        await this.$confirm(`${this.$t('page.article.confirmDeleteCategory')}`, `${this.$t('message.warning')}`, {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        try {
          await deleteCategory(sn)
          const message = this.$t('message.deleteSuccess')
          this.fetchCategories()
          this.$message({
            type: 'success',
            message: message
          })
        } catch (error) {
          return false
        }
      } catch (error) {
        this.$message({
          type: 'info',
          message: error
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.article-category {
  .operations {
    cursor: pointer;
    transform: rotate(90deg);
    &:hover {
      color: #ff6400;
    }
  }
}
</style>
