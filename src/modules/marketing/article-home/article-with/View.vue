<template>
  <sa-section class="article">
    <template slot="header">
      <div class="article__header">
        <span class="article__header--text">{{ $t('page.article.addArticle') }}</span>
        <el-select
          v-model="articleSelected"
          remote
          :placeholder="$t('placeholder.search')"
          :remote-method="handleSearch"
          prefix-icon="el-icon-search"
          filterable
          :loading="ui.loadingArticles"
          @change="changeFilter"
          class="article__header--filter"
        >
          <ElOption
            v-for="(item, index) in listArticles"
            :key="index"
            :label="item.title"
            :value="item.sn"
            style="font-size: 13px; color: #4a5d6e;"
          />
        </el-select>
      </div>
    </template>
    <el-table
      :data="articleOfCategory"
      v-loading="ui.loadingPinArticle"
    >
      <el-table-column
        type="index"
        label="#"
      >
      </el-table-column>
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
            v-model="scope.row.visible"
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
              @click="(e) => {
                scope.row.visible = false
                removeArticle(scope.row.articleDisplayTypeSn)
              }"
            >
              {{ $t('button.remove') }}
            </el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <ThumbnailDialog
      :width="setRatioThumbnail.width"
      :height="setRatioThumbnail.height"
      ref="thumbnailDialog"
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
const timeDebounce = 300
export default {
  name: 'ArticleWith',
  components: { SaSection, ArticleDialog, UploadFile, ThumbnailDialog },
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
      popover: true,
      articleSelected: '',
      listArticles: [],
      articleOfCategory: []
    }
  },
  computed: {
    setRatioThumbnail () {
      switch (this.$route.name) {
        case 'Article with title':
          return {
            width: 228,
            height: 182
          }
        case 'Article with image':
          return {
            width: 228,
            height: 182
          }
        case 'Article with summary':
          return {
            width: 228,
            height: 268
          }
        case 'Article collection':
          return {
            width: 228,
            height: 400
          }
        default:
          return {
            width: 228,
            height: 182
          }
      }
    },
    displayTypeSn () {
      switch (this.$route.name) {
        case 'Article with title':
          return 3
        case 'Article with image':
          return 4
        case 'Article with summary':
          return 5
        case 'Article collection':
          return 6
        default:
          return ''
      }
    }
  },
  created () {
    this.fetchArticles()
  },
  methods: {
    displayTypeName (displayTypeSn) {
      switch (displayTypeSn) {
        case 2:
          return 'Article with title'
        case 3:
          return 'Article with image'
        case 4:
          return 'Article with summary'
        case 5:
          return 'Article collection'
        default:
          return ''
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
    handleSearch: debounce(function (keySearch) {
      this.fetchSearchArticles({ keyword: keySearch, displayTypeSn: this.displayTypeSn })
    }, timeDebounce),
    async fetchSearchArticles (filter) {
      try {
        const { data } = await fetchSearchArticles(filter)
        this.listArticles = data.data
      } catch (error) {
        return false
      }
    },
    async changeFilter (sn) {
      try {
        const params = {
          displayTypeSn: this.displayTypeSn,
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
    async removeArticle (articleSn) {
      try {
        const params = {
          displayTypeSn: this.displayTypeSn,
          articleDisplayTypeSn: articleSn
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
        const { data } = await fetchArticles({ displayTypeSn: this.displayTypeSn })
        this.articleOfCategory = data.data
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
.article {
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
