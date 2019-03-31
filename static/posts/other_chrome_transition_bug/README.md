---
created_at: 2018-02-26
---

# Chromeでページロード時に本来発動するはずのないtransitionが発動する

## 再現する状況

+ 外部アプリからリンクをクリックして表示
+ ブラウザはChrome

上記２点を満たす際に、`transition`が設定されているものに関して、ブラウザデフォルト値から設定値へのtransitionが発動する

## デモ

[Demo](./demo/index.html)

前述の通り外部アプリからのリンクでないと再現しないことに注意

## 解説

デモではこのような指定をしているだけです。

### HTML

```
<p class="sample">Bug Sample</p>
```

### CSS

```
.sample {
  opacity: 0;
  transition: all 5s;
}
```


これだけです。

本来ならページロード時、`.sample`完全に透明になって表示されないはずですが、「Chrome」かつ「リンク遷移」の時だけopacityが1から0になるようなtransitionが発動してしまいます。

[どうやら2014年時点で類似の不具合が報告](https://bugs.chromium.org/p/chromium/issues/detail?id=332189)されているみたいで、かなり根深い問題の模様。

対策としては、

```
html.-pageLoading * {
  transition: none !important;
}
```

のようなCSSを定義しておいて、`DOMContentLoaded`タイミングで`-pageLoading`クラスを外すといったような方法しかない感じ。
