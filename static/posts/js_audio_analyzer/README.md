---
created_at: 2017-08-14
---

# Web Audio APIとSVGによる簡易スペクトラムアナライザー

[DEMO](./demo/index.html)

## 詳細

[Web Audio APIを使ってオーディオビジュアライザを作る | KRAY Inc](http://kray.jp/blog/web-audio-api-audio-visualizer/)

ほぼこの記事の内容通り。画面に出力するだけならめちゃくちゃ簡単だけど、コードの意味は理解しきれてない部分も多い。

`AudioContext.createAnalyser()`により取得した`AnalyserNode`を使用して各周波数の値を取得しているが、取得した周波数がどこからどこまでの範囲なのかがよくわからない。

サンプリングレートが48000だったので、おそらく標本化定理から0~24,000Hzが取得した周波数の範囲かと思われるが確証はない。[MDNのAnalyserNodeのページ](https://developer.mozilla.org/ja/docs/Web/API/AnalyserNode)を見ても周波数の範囲の取得方法が書いていないしどうやって範囲を取得するのだろう。


## 参考

[Web Audio API 解説 - 01.前説 | g200kg Music & Software](http://www.g200kg.com/jp/docs/webaudio/)
