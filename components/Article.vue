<template>
  <div class="markdown-body" v-html="html" />
</template>

<script>
import 'github-markdown-css'

export default {
  props: {
    html: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.markdown-body {
  color: inherit;
}
</style>
