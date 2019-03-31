---
created_at: 2018-02-04
---

# [CSS] scroll-snapでJS無しでタッチ対応スライダーの実装

[Demo](./demo/index.html)

## 概要

[CSS スクロールスナップ - CSS | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Scroll_Snap_Points)

[Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/#search=scroll%20snap)

CanIuseで分かる通り、2018/2/4時点ではChromeが対応していない。

とはいうもののChrome以外では対応しており、Chrome自体も現在開発中とのことなのでそのうち使用できるようになると思う。

## 何が嬉しいか

ピンチインでの拡大に対応したスライダーが簡単に作成出来る。

現状では単にスナップするスライダーを作成する時点でJSを結構書かなくてはならず、更にピンチイン対応となるとかなり重くなってしまう。

`scroll-snap`を使えば、特に何もしなくてもピンチイン対応スライダーになってくれるので非常に有り難い。

## 使い方

Demoを見れば代替わかるので割愛
