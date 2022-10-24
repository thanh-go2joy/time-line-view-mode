<template>
  <sa-section class="article">
    <template slot="header">
      <el-form
        :inline="true"
        :model="filter"
        class="demo-form-inline"
        style="float: left;"
      >
        <el-input
          v-model="filter.keyword"
          :placeholder="$t('placeholder.search')"
          style="width: 300px; margin-right: 16px;"
          prefix-icon="el-icon-search"
          @input="handleSearch"
        />
        <el-select
          clearable
          v-model="filter.categorySn"
          :loading="ui.categoriesLoading"
          @change="changeCategory"
          style="width: 250px; margin-right: 16px;"
        >
          <el-option
            v-for="item, id in categories"
            :key="id"
            :value="item.sn"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form>
      <div style="float: right;">
        <el-button
          @click="$router.push({ name: 'articleCreate' })"
          type="warning"
          plain
          size="small"
          icon="el-icon-plus"
        >
          {{ $t('button.add') }}
        </el-button>
      </div>
    </template>
    <el-table
      :data="listArticles"
      v-loading="ui.loading"
    >
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column
        :label="$t('page.article.articleTitle')"
      >
        <template slot-scope="scope">
          <p
            class="article__title"
            @click="openArticleDialog(scope.row)"
          >
            {{ scope.row.title }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.article.image')"
      >
        <template slot-scope="scope">
          <div style="width:200px; height:100px;">
            <el-image v-if="scope.row.imagePath" :src="formatImage(scope.row.imagePath)" :alt="scope.row.imagePath" />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.article.display')"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.display === 1 ? '✓': '' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="categoryName"
        :label="$t('page.article.articleCategory')"
      >
      </el-table-column>
      <el-table-column
        prop="numberOfView"
        :label="$t('page.article.views')"
      >
      </el-table-column>
      <el-table-column
        :label="$t('page.article.postingDate')"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.schedulePosting) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.article.lastUpdate')"
      >
        <template slot-scope="scope">
          <p>{{ formatDate(scope.row.updateTime) }}</p>
          <p>{{ scope.row.updateStaffName }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="author"
        :label="$t('page.article.author')"
      >
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
              v-if="hasPermission('saarticle', 'pModify')"
              type="success"
              plain
              size="small"
              @click="onDirectArticleDetails(scope.row.sn)"
            >
              {{ $t('button.edit') }}
            </el-button>
            <el-button
              v-if="scope.row.display === 0"
              type="success"
              plain
              size="small"
              @click="updateStatusDisplay(scope.row.sn)"
            >
              {{ $t('button.show') }}
            </el-button>
            <el-button
              v-if="scope.row.display === 1"
              type="danger"
              plain
              size="small"
              @click="updateStatusDisplay(scope.row.sn)"
            >
              {{ $t('button.hidden') }}
            </el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagination.perPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </template>
    <article-dialog
      ref="articleDialog"
      :visible="ui.articleDialogVisible"
      @close="ui.articleDialogVisible = false"
    />
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import ArticleDialog from '@/components/globals/article-dialog.vue'
import { fetchArticles, updateStatusDisplay } from './api'
import { fetchCategories } from '../api'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
export default {
  name: 'ArticlePage',
  components: { SaSection, ArticleDialog },
  data: () => {
    return {
      filter: {
        limit: 10,
        page: 1,
        keyword: '',
        categorySn: ''
      },
      pagination: {
        perPage: 1,
        total: 0
      },
      ui: {
        loading: false,
        categoriesLoading: false,
        articleDialogVisible: false
      },
      listArticles: [],
      categories: []
    }
  },
  created () {
    this.fetchCategories()
    this.filter.categorySn = Number(this.$route.query.categorySn) || ''
    this.fetchArticles()
  },
  methods: {
    changeCategory () {
      this.$router.replace({ query: { categorySn: this.filter.categorySn } })
      this.fetchArticles()
    },
    async fetchCategories () {
      this.ui.categoriesLoading = true
      try {
        const { data } = await fetchCategories()
        this.categories = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.categoriesLoading = false
      }
    },
    async fetchArticles () {
      this.ui.loading = true
      try {
        const { data } = await fetchArticles(this.filter)
        this.listArticles = data.data.articleList
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    handleSearch: debounce(function () {
      this.fetchArticles()
    }, timeDebounce),
    openArticleDialog (article) {
      this.$refs.articleDialog.setup(article)
      this.ui.articleDialogVisible = true
    },
    onDirectArticleDetails (sn) {
      this.$router.push({ name: 'articleEdit', params: { sn: sn } })
    },
    async updateStatusDisplay (sn) {
      try {
        await updateStatusDisplay({ articleSn: sn })
        const message = this.$t('message.updateSuccess')
        this.$message({
          type: 'success',
          message: message
        })
        this.fetchArticles()
      } catch (error) {
        return false
      }
    },
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchArticles()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchArticles()
    }
  }
}
</script>
<style lang="scss" scoped>
.article {
  &__title {
    cursor: pointer;
    color: #007bff;
  }
  .operations {
    cursor: pointer;
    transform: rotate(90deg);
    &:hover {
      color: #ff6400;
    }
  }
}
</style>
