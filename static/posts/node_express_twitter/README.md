---
created_at: 2017-05-19
---

# ExpressでTwitterAPIを扱おうと頑張った

方法は以下リポジトリに書いてる。

[ryou/express_twitter_test: ExpressでTwitterAPI扱うためのテストプロジェクト](https://github.com/ryou/express_twitter_test)


## 以下雑文

フロントエンドとバックエンドで両方JavaScriptで統一しようと思ってnode.js始めたんだけど、PHPがいかに楽かっていうのを痛感した。

PHPだと手軽に出来る内容でもnode.jsだと結構重たい作業になってしまう。というかPHPのおかげというかApacheのおかげなのもあるのかも。node.jsだとPHPでApacheがやっているような内容もnode.jsでやらなければならない（静的ファイル配信とか）。  
あとセッションも扱うのにパッケージ入れてどうのこうのしないといけないってのが驚いた。

とはいうものの、DOMが関わらないJavaScriptプログラムが書けるのは非常にありがたい。どうにもjQueryでちょろっと書けば済む程度のフロントエンドのプログラムはJavaScriptを書く力というより、DOMを弄る力しかつかない気がする。いや、それはそれで必要なんだろうけど。
