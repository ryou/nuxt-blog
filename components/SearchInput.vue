<template>
  <form class="Input" :class="formStateClass" @submit.prevent="onSubmit">
    <label class="Input_inner">
      <div class="Input_icon"><i class="fas fa-search" /></div>
      <input
        v-model="searchText"
        type="text"
        class="Input_input"
        @focus="isFocus = true"
        @blur="isFocus = false"
      >
    </label>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
      isFocus: false
    }
  },
  computed: {
    formStateClass() {
      if (this.isFocus) {
        return ['-focus']
      }
      if (this.searchText.length > 0) {
        return ['-wait']
      }
      return ['-idle']
    }
  },
  methods: {
    onSubmit() {
      this.$router.push({
        path: '/',
        query: {
          s: this.searchText
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/sass/init.scss';

.Input {
  position: relative;

  display: inline-block;

  padding: .5rem;
  border: 1px solid transparent;
  border-radius: $formRadius;
  box-sizing: border-box;

  transition: border-color $mainAnimationDuration;

  &.-idle {
    .Input_input {
      width: 0;
    }
  }
  &.-focus {
    border-color: $mainColor;
  }
  &.-wait {
    border-color: $grayColor;
  }
}
.Input_inner {
  display: block;
}
.Input_icon {
  position: absolute;
  top: 50%;
  left: .5rem;
  margin-top: -0.9rem;

  font-size: 1.8rem;
  line-height: 1.0;

  cursor: pointer;
}
.Input_input {
  font-size: 1.8rem;

  padding-left: 2.5rem;
  width: 200px;
  @include screen('sp') {
    width: 130px;
  }

  outline: 0;

  transition: width $mainAnimationDuration;
}
</style>
