---
created_at: 2019-03-03
---

# VueRouterで画面遷移時にトランジションをつける

[参考プロジェクト](https://github.com/ryou/twitter-list-image-viewer/tree/reference/page-transition)

上の`twitter-list-image-viewer`の`reference/page-transition`ブランチでは、VueRouterでの画面遷移時にトランジションをつけている。

まだちゃんと動作する理由は把握しきれていないがメモとして動作の肝となる部分をメモ。

## router.js

`router.js`には以下のコードを記述している。

```
scrollBehavior (to, from, savedPosition) {
  const position = savedPosition || { x: 0, y: 0 }
  return new Promise((resolve, reject) => {
    router.app.$root.$once('triggerScroll', () => {
      router.app.$nextTick(() => {
        window.scrollTo({ top: position.y, left: position.x })
        resolve(position)
      })
    })
  })
},
```

動作する理由が一番わからない部分はこのコード。`resolve(position)`のタイミングでVueRouterがpositionへのscrollToを実行しているが、それだけでは画像詳細画面への遷移時に最上部までスクロールされなかった。

## App.vue

```
<transition
  mode="out-in"
  :enter-active-class="transition.enterActiveClass"
  @after-leave="$root.$emit('triggerScroll')"
>
  <keep-alive include="HomePage,ListPage">
    <router-view />
  </keep-alive>
</transition>
```

テンプレートとして、上記コードを記載している。ここではscrollBehaviorで登録したイベントを発火させてるくらいで特別なことはしていない。
