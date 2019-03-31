---
created_at: 2017-08-05
---

# モーダル等アクティブな際に、モーダル内のスクロールは有効にしつつ、ページ全体のスクロールは固定する方法

以下のようなCSSで実現可能

```
html {
  height: 100%;
}
body {
  height: 100%;
  overflow: hidden;
}
```

上記のように、`html`,`body`を`height: 100%;`にした上で、`body`に`overflow: hidden;`を適用すればスクロールを固定できる。

ただし、これだけだと`overflow: hidden;`を有効にした瞬間スクロールバーが消え、表示領域が広がる結果ページ全体がカクッと動いてしまい、非常に不細工。

[デモ](./examples/example01.html)

解決法としては、`overflow: hidden;`を有効にする瞬間に、body等にスクロールバーの太さ分のpadding-rightを与える等すればOK。

スクロールバーの太さを直接的に取得する方法は無いが、`window.innerWidth`でスクロールバーを含むブラウザの横幅、`document.body.clientWidth`でスクロールバーを含まないブラウザの横幅が取得できるので

```
var barW = window.innerWidth - document.body.clientWidth;

$('body').css({
  'overflow': 'hidden',
  'padding-right': barW + 'px'
});
```

このようなコードを書けばOK。

[デモ](./examples/example02.html)
