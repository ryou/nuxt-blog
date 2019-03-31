---
created_at: 2017-08-12
---

# SVGで進捗を表示する円をアニメーションさせる

円形の進捗を表示するデザインはd3.jsにデフォルトで用意されているが、それだけの為にd3.jsを利用するのはオーバーな感じがする。

SVGに関して無知だったので調べてみたら、d3.jsをわざわざ使わなくても結構簡単に実装出来たのでまとめておく。

## pathのd属性を弄る

[DEMO](./examples/example01.html)

一番最初はこの方法で実装した。

そこまで複雑ではないが、三角関数を利用して計算する必要があったりと多少面倒。


## stroke-dasharray/stroke-dashoffsetを利用する

SVGでは、pathを点線として表現することが可能。

`stroke-dasharray`で各点線の長さ、`stroke-dashoffset`で点線の開始位置を設定することが出来る。

点線本来の用途ではないが、この２つを利用して線をアニメーションさせることが可能。

[DEMO](./examples/example02.html)

pathの内容が動的に変化する場合はこの手法は取れないが、pathの内容が固定の場合この手法でアニメーションさせるのが手軽。

## パスに沿ってオブジェクトを移動させる

[DEMO](./examples/example03.html)

`getTotalLength`と`getPointAtLength`を利用する。

`getTotalLength`はパス全体の長さ、`getPointAtLength`はパスの開始地点から引数分進んだ際の座標を返却する。

```
var $route = $component.find('.m-svg01_route').get(0);
var routeLength = $route.getTotalLength();
var progress = 0.5;

// パス全体の半分だけ進んだ際の座標が取得できる。
var point = $route.getPointAtLength(routeLength * progress);
```

取得した座標を元に、移動させたいオブジェクトの座標をtranslateなりで移動させればOK。

## 参考

[svg要素の基本的な使い方まとめ](http://defghi1977.html.xdomain.jp/tech/svgMemo/svgMemo.htm)

[SVGによる円弧の描画サンプル](http://yamatyuu.net/computer/html/svg/arc.html)

[SVGのpathを使ったモーションパスアニメーションの実装方法 | 株式会社LIG](https://liginc.co.jp/web/html-css/html/154217)
