<template>
  <div class="Article">
    <div class="Article_date">
      {{ createdAt }}
    </div>
    <div class="Article_content" v-html="article.bodyHtml" />
  </div>
</template>

<script>
import { sourceFileArray } from '@/static/posts/_json/summary.json'
const moment = require('moment')

export default {
  validate({ params }) {
    return sourceFileArray.includes(`static/posts/${params.slug}/README.md`)
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
@import '@/assets/sass/init.scss';

.Article {
}
.Article_date {
  font-size: 1.6rem;
}
.Article_content {
  h1, h2, h3, h4, h5, h6, th {
    color: $textColor;
    line-height: $headingLineHeight;
    font-weight: bold;
  }
  h1 {
    font-size: 3.0rem;

    margin-bottom: 2.0rem;
  }
  h2 {
    font-size: 2.6rem;

    margin: 4.5rem 0 2.0rem;
  }
  h3 {
    font-size: 2.4rem;

    margin: 4.0rem 0 1.8rem;
  }
  h4 {
    font-size: 2.0rem;

    margin: 3.6rem 0 1.6rem;
  }
  p {
    margin: 2.8rem 0;
  }

  table {
    border-collapse: collapse;

    tr {
      &:nth-child(even) {
        background-color: $paleGrayColor;
      }
    }

    th, td {
      padding: .8rem;
      border: 1px solid $deepGrayColor;
    }
  }

  a {
    color: $linkColor;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  ul, ol {
    padding-left: 1.2em;
  }
  ul {
    list-style: disc;
  }
  ol {
    list-style: decimal;
  }

  code {
    display: inline;

    font-family: $codeFont;
    background-color: $codeBlockBgColor;
    line-height: $mainLineHeight - 0.2;
    padding: 0 .8rem;
  }
  pre {
    font-size: 1.5rem;
    line-height: $mainLineHeight;
    background-color: $codeBlockBgColor;
    padding: 1.0rem;

    overflow-x: auto;
    overflow-y: hidden;

    code {
      line-height: inherit;
      padding: 0;
      margin: 0;
    }
  }
}
</style>
