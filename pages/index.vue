<template>
  <div class="MiniArticleList">
    <div v-for="article in articles" :key="article.slug" class="MiniArticleList_item">
      <div class="MiniArticle">
        <div class="MiniArticle_date">
          {{ article.frontmatters.created_at }}
        </div>
        <div class="MiniArticle_title">
          <nuxt-link :to="`/posts/${article.slug}/`">
            {{ article.title }}
          </nuxt-link>
        </div>
        <div class="MiniArticle_excerpt">
          {{ article.preview }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import summary from '~/static/posts/_json/summary.json'
const moment = require('moment')

export default {
  data() {
    return {
      filter: ''
    }
  },
  computed: {
    articles() {
      return summary.filter((article) => {
        if (this.filter === '') {
          return true
        }
        return article.title.toLowerCase().includes(this.filter.toLowerCase())
      }).sort((a, b) => {
        const momentA = moment(a.frontmatters.created_at)
        const momentB = moment(b.frontmatters.created_at)

        if (momentA.isSame(momentB)) return 0
        if (momentA.isBefore(momentB)) return 1
        return -1
      })
    }
  },
  mounted() {
    this.updateFilter(this.$route)
  },
  methods: {
    updateFilter(to) {
      const searchText = to.query.s
      if (searchText !== undefined) {
        this.filter = searchText
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.updateFilter(to)

    next()
  }
}
</script>

<style lang="scss" scoped>
.MiniArticleList {

}
.MiniArticleList_item {
  &:not(:last-child) {
    &::after {
      content: '';
      display: block;

      width: 5.0rem;
      height: .8rem;
      margin: 6.0rem auto;
      background: $grayColor;
    }
  }
}

.MiniArticle {
}
.MiniArticle_date {
  font-size: 1.2rem;
  color: $deepGrayColor;

  margin-bottom: .5rem;
}
.MiniArticle_title {
  display: block;

  font-size: 2.0rem;
  font-weight: bold;
  line-height: $headingLineHeight;

  margin-bottom: 1.0rem;
}
.MiniArticle_excerpt {
  $fontSize: 16;
  $lineNum: 2;

  font-size: $fontSize * 0.1rem;
  color: $deepGrayColor;
  height: $fontSize * $mainLineHeight * $lineNum * 1px;
  overflow: hidden;

  // TODO: ここ無理矢理やってるの修正する
  @include screen('sp') {
    height: $fontSize * $mainLineHeight * $lineNum * 0.8 * 1px;
  }
}
</style>
