<template>
  <div class="Article">
    <div class="Article_date">
      {{ createdAt }}
    </div>
    <div class="Article_content">
      <Article :html="article.bodyHtml" />
    </div>
  </div>
</template>

<script>
import Article from '@/components/Article'
import { sourceFileArray } from '@/static/posts/_json/summary.json'
const moment = require('moment')

export default {
  validate({ params }) {
    return sourceFileArray.includes(`static/posts/${params.slug}/README.md`)
  },
  components: {
    Article
  },
  computed: {
    createdAt() {
      return moment(this.article.created_at).format('YYYY-MM-DD')
    }
  },
  asyncData({ params }) {
    return {
      article: require(`@/static/posts/_json/${params.slug}/README.json`)
    }
  },
  head() {
    return {
      title: this.title
    }
  }
}
</script>

<style lang="scss">
.Article {
}
.Article_date {
  font-size: 1.6rem;
}
.Article_content {
}
</style>
