<template>
  <div class="Article">
    <div class="Article_date">
      {{ article.frontmatters.created_at }}
    </div>
    <div class="Article_title">{{ article.title }}</div>
    <div class="Article_content">
      <Article :html="article.bodyHtml" />
    </div>
  </div>
</template>

<script>
import Article from '~/components/Article.vue'
import summary from '~/static/posts/_json/summary.json'

export default {
  validate({ params }) {
    return summary.find(article => article.slug === params.slug)
  },
  components: {
    Article
  },
  asyncData({ params }) {
    return {
      article: require(`~/static/posts/_json/${params.slug}/README.json`)
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
