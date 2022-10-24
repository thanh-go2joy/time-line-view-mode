<template>
  <sa-section class="pin-article">
    <template slot="header">
      <div class="pin-article__header">
        <span class="pin-article__header--text">{{ $t('page.article.addArticle') }}</span>
        <el-select
          v-model="articleSelected"
          remote
          :placeholder="$t('placeholder.search')"
          :remote-method="handleSearch"
          prefix-icon="el-icon-search"
          filterable
          :loading="ui.loadingArticles"
          @change="changeFilter"
          class="pin-article__header--filter"
        >
          <ElOption
            v-for="(item, index) in listArticles"
            :key="index"
            :label="item.title"
            :value="item.sn"
            :disabled="articleOfCategory.length !== 0"
            style="font-size: 13px; color: #4a5d6e;"
          />
        </el-select>
      </div>
    </template>
    <el-table
      :data="articleOfCategory"
      v-loading="ui.loadingPinArticle"
    >
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column
        :label="$t('page.article.title')"
      >
        <template slot-scope="scope">
          <div
            @click="openArticleDialog(scope.row)"
            class="article-title"
          >
            {{ scope.row.title }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Thumbnail"
      >
        <template slot-scope="scope">
          <div style="width:200px; height:100px;">
            <el-image
              v-if="scope.row.thumbnailPath"
              :src="formatImage(scope.row.thumbnailPath)"
              :alt="scope.row.thumbnailPath"
            ></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.article.display')"
          align="center"
        header-align="center"
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
        :label="$t('page.article.displayType')"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.displayType && scope.row.displayType.length > 0">
            <span v-for="(item, index) in scope.row.displayType" :key="index" style="margin-right: 0px;">
              <span v-if="index !== 0 && index !== scope.row.displayType.length" style="margin-right: 8px;">,&nbsp;
              </span>
              {{ item.name }}
            </span>
          </p>
        </template>
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
            <upload-file
              accept="image/png, image/jpeg"
              @change="file => addThumbnail(file, scope.row)"
              :showFileName="false"
            >
              {{ $t('button.addThumbnail') }}
            </upload-file>
            <el-button
              type="danger"
              plain
              size="small"
              @click="removeArticle(scope.row.articleDisplayTypeSn)"
            >
              {{ $t('button.remove') }}
            </el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <ThumbnailDialog
      ref="thumbnailDialog"
      :width="352"
      :height="352"
      :visible="ui.thumbnailDialogVisible"
      @close="ui.thumbnailDialogVisible = false"
      @refresh="fetchArticles"
    />
    <ArticleDialog
      ref="articleDialog"
      :visible="ui.articleDialogVisible"
      @close="ui.articleDialogVisible = false"
    />
  </sa-section>
</template>
<script>
import UploadFile from '@/components/globals/UploadFile.vue'
import SaSection from '@/components/globals/SaSection.vue'
import ArticleDialog from '@/components/globals/article-dialog.vue'
import ThumbnailDialog from '../components/thumbnail-dialog.vue'
import { debounce } from '@/utils/helpers'
import { fetchSearchArticles, fetchArticles, addArticle, deleteArticle } from '../api'
const timeDebounce = 500
export default {
  name: 'PinArticle',
  components: {
    SaSection,
    ArticleDialog,
    ThumbnailDialog,
    UploadFile
  },
  data: () => {
    return {
      ui: {
        loadingPinArticle: false,
        loadingArticles: false,
        articleDialogVisible: false,
        thumbnailDialogVisible: false
      },
      filter: {
        keyword: '',
        litmit: 10
      },
      articleSelected: '',
      listArticles: [],
      articleOfCategory: []
    }
  },
  created () {
    this.fetchArticles()
  },
  methods: {
    handleSearch: debounce(function (keyword) {
      this.fetchSearchArticles({ keyword: keyword, displayTypeSn: 2 })
    }, timeDebounce),
    async fetchSearchArticles (filter) {
      try {
        const { data } = await fetchSearchArticles(filter)
        this.listArticles = data.data
      } catch (error) {
        return false
      }
    },
    openArticleDialog (article) {
      this.$refs.articleDialog.setup(article)
      this.ui.articleDialogVisible = true
    },
    addThumbnail (file, article) {
      this.$refs.thumbnailDialog.setup({ article: article, file: file })
      this.ui.thumbnailDialogVisible = true
    },
    async changeFilter (sn) {
      try {
        const params = {
          displayTypeSn: 2,
          articleSn: sn
        }
        await addArticle(params)
        const message = this.$t('message.updateSuccess')
        this.fetchArticles()
        this.$message({
          type: 'success',
          message: message
        })
      } catch (error) {
        return false
      }
    },
    async removeArticle (sn) {
      try {
        const params = {
          displayTypeSn: 2,
          articleDisplayTypeSn: sn
        }
        await deleteArticle(params)
        const message = this.$t('message.deleteSuccess')
        this.fetchArticles()
        this.$message({
          type: 'success',
          message: message
        })
      } catch (error) {
        return false
      }
    },
    async fetchArticles () {
      this.ui.loadingPinArticle = true
      try {
        const { data } = await fetchArticles({ displayTypeSn: 2 })
        this.articleOfCategory = data.data
        // const article = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loadingPinArticle = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.flex {
  align-items: center;
  display: flex;
}
.pin-article {
  .operations {
    cursor: pointer;
    transform: rotate(90deg);
    &:hover {
      color: #ff6400;
    }
  }
  .article-title {
    color: #409EFF;
    cursor: pointer;
    transition: all .2s ease-in;
    &:hover {
      opacity: 0.8;
    }
  }
  &__header {
    width: 100%;
    display: flex;
    align-items: center;
    &--text {
      margin-right: 16px;
      font-size: 20px;
      font-weight: 500;
      // width: 1?0%;
    }
    &--filter {
      flex: 1;
    }
  }
}
</style>
