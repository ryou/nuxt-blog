<template>
  <div class="Article">
    <div class="Article_date">
      {{ article.frontmatters.created_at }}
    </div>
    <div class="Article_title">
      {{ article.title }}
    </div>
    <div class="Article_content">
      <Article :html="article.bodyHtml" />
    </div>
  </div>
</template>

<script>
import { SITE_URL } from '~/settings/meta'
import Article from '~/components/Article.vue'
import summaries from '~/static/posts/_json/summary.json'

const getSummaryBySlug = slug => summaries.find(summary => summary.slug === slug)

export default {
  validate({ params }) {
    return getSummaryBySlug(params.slug)
  },
  components: {
    Article
  },
  asyncData({ params }) {
    return {
      summary: getSummaryBySlug(params.slug),
      article: require(`~/static/posts/_json/${params.slug}/README.json`)
    }
  },
  head() {
    const title = this.article.title
    const url = `${SITE_URL}${this.$route.path}`
    const description = `${this.summary.preview}…`

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:description', property: 'og:description', content: description },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'og:url', property: 'og:url', content: url }
      ]
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
.Article_title {
  font-size: 2.8rem;
  font-weight: bold;
  border-bottom: 1px solid #eaecef;
  padding-bottom: .3em;
  margin-bottom: 16px;
}
.Article_content {
}
</style>
