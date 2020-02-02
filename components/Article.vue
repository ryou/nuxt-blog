<template>
  <div class="markdown-body" v-html="html" />
</template>

<script>
export default {
  props: {
    html: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.markdown-body {
  font-size: $mainFontSize;
  color: inherit;

  table {
    word-break: initial;
  }

  a {
    color: $linkColor;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  ul, ol {
    list-style: initial;
  }
}
</style>
