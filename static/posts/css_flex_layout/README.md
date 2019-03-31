---
created_at: 2017-05-22
---

# [CSS]FlexBoxに関してのメモ

FlexBoxがいい加減積極的に使うべき物になってるので、まとめておく。

## 不具合

[philipwalton/flexbugs: A community-curated list of flexbox issues and cross-browser workarounds for them.](https://github.com/philipwalton/flexbugs)

ここにまとまってる。

これはまた別にまとめたい。

### flex-item内の要素に対してtext-overflowが効かない

不具合かは仕様書を読まないとわからないが、flex-item内の要素に対してtext-overflowが効かない問題が有る。

対策としては、flex-itemに対して`min-width: 0;`を指定すればいい。

[flexbox内でtext-overflowが効かない | cly7796.net](http://cly7796.net/wp/css/it-does-not-work-text-overflow-in-the-flexbox/)

### IE11でbox-sizingがflex-basisに効かない

`flex-basis`と同値の`max-width`を指定すればOK。

```
.flex-item {
  flex-basis: 50%;
  max-width: 50%;
}
```

[【IE11バグ】 flex-basisにbox-sizingが効かない不具合 &#8211; 広告のフジプロ](http://www.fujipro-inc.com/2015/11/30/2910.html)



## プロパティ

### display: flexを指定した要素に対するプロパティ

+ flex-direction: 横並び縦並び、降順昇順を指定出来る
+ flex-wrap: 折り返すか、また折り返す場合上と下どっちに折り返すか
+ justify-content: 整列方法。左揃え中央揃え右揃え均等配置（両端余白有り・無し）
+ align-items: 縦揃えの指定。中央揃え、ベースライン、同じ高さに揃える
+ align-content: コンテナに対してどう揃えるか


### フレックスアイテムに対するプロパティ

+ align-self: 行に対してそのアイテムをどう整列させるか
+ order: 順序
+ flex-basis: 基本の長さの指定
+ flex-grow: どれだけのびるか
+ flex-shrink: どれだけ縮むか


## 余白がある、またはコンテナをオーバーしてしまってるとき

各アイテムのflex-grow, flex-shrinkに指定された値に従ってで各アイテムが伸縮する。

詳しくはCodeGridを購読して見ろ。

## FlexBoxじゃないとHTML/CSSのみで出来ないレイアウト

FlexBoxは微妙にややこしいので、従来の方法で問題なくコーディング出来るのであればそっちを優先したい。

そのため、「FlexBoxじゃないと実現できない or FlexBox使ったほうが簡潔になる」パターンを以下にまとめる。

### 並べた要素を行毎に高さを揃える

[Demo](./examples/align_height.html)

上記のようなレイアウトは、FlexBoxを使えない場合はJavaScriptを使わないと実現できない。

#### 前提知識

align-itemsにstretchを使えばフレックスアイテムの高さを行毎に揃えることが出来るが、レイアウトとモジュールで分けたい場合はそうもいかない。

その場合は以下のようにする。

[flexをつかって配置したモジュールの高さを、レイアウトの高さに揃えるデモ](./examples/stretch_height_auto_container.html)



### 画像+テキストレイアウト & テキスト縦方向中央揃え & 奇数（偶数）アイテム画像位置逆転 & レスポンシブ

[Demo](./examples/img_txt_responsive.html)

要はこんなレイアウト。結構よく見る。

要件としては以下のような物。

+ PCレイアウトは画像＋テキストの横並びレイアウト
+ PCレイアウトでは奇数番目のアイテムは画像とテキストの配置が逆
+ テキストは縦方向中央揃え
+ スマホレイアウトは縦に積むレイアウト

個々の要素だとFlexBoxがなくてもいけるんだけど、全部そろうとtableレイアウト+JavaScriptじゃないと無理になる。


## FlexBoxだと簡単に出来ること

### 横並びナビのリンクの高さを揃える / 横並びナビの一部を右端に寄せる

[Demo](./examples/nav_height_align.html)

`align-items: stretch`が便利な例。

あと`margin-x: auto`も便利。


### 上下中央配置

[Demo](./examples/center.html)

上下中央配置だけだとtableレイアウトでも可能だけど、例みたいに「画像を中央配置して、ビューポートサイズに応じて縮める（拡大はしない）」みたいな要件の場合はFlexBoxじゃないと無理。（tableの仕様上、ビューポートを縦方向に縮めても、画像が縮小しない）
