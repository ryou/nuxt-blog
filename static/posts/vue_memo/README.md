---
created_at: 2017-12-10
---

# [Vue.js]メモ

## 呼び出したコンポーネントにclickイベントで何かしたい場合は`native`修飾子をつける

[コンポーネント — Vue.js](https://jp.vuejs.org/v2/guide/components.html#%E3%83%8D%E3%82%A4%E3%83%86%E3%82%A3%E3%83%96%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E3%81%A8%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E3%83%90%E3%82%A4%E3%83%B3%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0)


```
<btn-component @click.native="onClick">ボタン</btn-component>
```

上のように、呼び出したコンポーネントに直接ネイティブのイベントで何かさせたい場合は`native`修飾子をつける必要がある。


## ページ遷移アニメーションを設定している際に、ページ遷移時に最上部までスクロールさせる方法

Vue.jsは、ページ遷移時もスクロール位置を維持してしまう。ページ遷移アニメーションがない場合は、[VueRouterにscrollBehaviourを設定](https://router.vuejs.org/ja/advanced/scroll-behavior.html)することでページ最上部までスクロールすることが可能だが、この方法はページ遷移アニメーションがある場合は使用できない。

ページ遷移アニメーションがある場合は、[フックを利用する](https://jp.vuejs.org/v2/guide/transitions.html#JavaScript-%E3%83%95%E3%83%83%E3%82%AF)ことで違和感なくページ最上部までスクロール出来る。

```
<transition name="slide" mode="out-in" @after-leave="scrollToTop">
  <router-view></router-view>
</transition>
```

例えばこのようなテンプレートの場合は、

```
export default {
  ~
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
  ~
};
```

このように記述すれば実装可能。

**`before-enter`タイミングでスクロールさせた場合、Firefoxでカクつきが発生（原因不明）。after-leaveタイミングなら正常に動作したため、こちらの方でメモを残す。**
