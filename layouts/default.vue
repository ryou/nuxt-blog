<template>
  <div>
    <div class="Header">
      <div class="Header_content">
        <div class="Header_logo">
          <nuxt-link class="Logo" to="/">
            SDMILIEU <br class="u-showInSp">TECH MEMO
          </nuxt-link>
        </div>
        <div class="Header_search">
          <SearchInput />
        </div>
      </div>
    </div>
    <div class="Content">
      <nuxt />
    </div>
  </div>
</template>

<script>
import SearchInput from '@/components/SearchInput'

export default {
  components: {
    SearchInput
  }
}
</script>

<style lang="scss">
@import '@/assets/sass/base.scss';

.Header {
  padding: 1.0rem 0;
  border-bottom: 1px solid $grayColor;

  background-color: $whiteColor;
}
.Header_content {
  @include container;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
.Header_logo {

}
.Header_search {

}

.Logo {
  font-size: 2.4rem;
  font-family: $logoFont;
  line-height: 1.2;
}

.Content {
  @include container;

  padding-top: 4.0rem;
  padding-bottom: 4.0rem;
}

// show/hide
.u-showInSp {
  display: none;
}
@include screen('sp') {
  .u-showInSp {
    display: initial;
  }
}
.u-showInTb {
  display: none;
}
@include screen('tb') {
  .u-showInTb {
    display: initial;
  }
}
.u-showInPc {
  display: none;
}
@include screen('pc') {
  .u-showInPc {
    display: initial;
  }
}

@include screen('sp') {
  .u-hideInSp {
    display: none;
  }
}
@include screen('tb') {
  .u-hideInTb {
    display: none;
  }
}
@include screen('pc') {
  .u-hideInPc {
    display: none;
  }
}
</style>
