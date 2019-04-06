---
created_at: 2019-04-06
---

# position: fixedなヘッダーがアンカーリンク先の要素と被る問題の対策

`position: fixed`なヘッダーがある場合、何も対策していないとスムーススクロールの際にヘッダーとスクロール先の要素が被ってしまう。

そういう場合に一般的には以下のようにヘッダーの高さ分スクロール位置をずらすことで対策をしている。

```javascript
var duration = 300;
var href= $(this).attr("href");
var $target = $(href === "#" || href === "" ? 'html' : href);

if($target.length===0) return false;

var headerHeight = 100;

// ヘッダーの高さ分スクロール位置をずらすことで対策
var position = $target.offset().top - headerHeight;

$('html,body').stop().animate(
  {scrollTop:position},
  duration,
  'swing'
);
```

ただこの対策しかしていない場合、`<a href="./about.html#message">`のようにページ外からのアンカーリンクに関してはヘッダーがだだ被りしてしまう。ページ外からの遷移の場合は前述の対策が適用されないので当然。

## 対策方法

[DEMO](./examples/index.html)

アンカーリンクのターゲットとなる要素に対して、以下のCSSを適用する。

```css
:before {
    content: '';
    display: block;

    margin-top: -100px;
    padding-top: 100px;
}
```

`margin-top`及び`padding-top`の値はヘッダーの高さ。

このスタイルの与え方は以下の２パターンある。

## `:target`を利用する方法

DemoのExample01の方法

```css
:not(.js-scroll-target):target:before {
    content: '';
    display: block;

    margin-top: -100px;
    padding-top: 100px;
}
```

`:target`はハッシュの対象となっている要素。こうしておけばページ外からのリンクの場合だけ対象の要素に対してスタイルを適用することが出来る。

`:not(.js-scroll-target)`は、ページ外からハッシュ付きで遷移した後さらにスムーススクロールをした場合にヘッダーがずれてしまうことに対する対策。スムーススクロールをする前のタイミングで`$target.addClass('js-scroll-target')`とかしてこのスタイルが適用されないようにするとずれがなくなる。

既存サイトの場合、出来るだけ今あるソースコードに手を入れずに修正したい場合が多々あるのでそういう場合この方法が便利。

## 普通にクラスを与える方法

DemoのExample02の方法

```css
.u-anchorTarget:before {
    content: '';
    display: block;

    margin-top: -100px;
    padding-top: 100px;
}
```

すごい普通な感じ。この`u-anchorTarget`クラスを愚直にアンカーリンクの対象となる要素に与える。

クラスを与える手間はあるが、スムーススクロールの際にヘッダーの高さ分JSでスクロール位置をずらしたり、`:target`の方法のようにスクロール前に特定のクラスを付与したりする必要がない。

ヘッダー被りの対策コードがこのスタイルただ１点に集中するため後から見た際にコードの意図がわかりやすい…と思う。
