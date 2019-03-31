---
created_at: 2017-05-12
---

# MicrosoftのFluentDesignSystemがChromeで崩れる理由

## 検証環境

Mac Chrome 58.0.3029.96

## 結論

root要素のfont-size指定が、Chromeの最小フォントサイズ指定を下回る場合（デフォルトだと10px）、Chromeでpaddingやmarginのremが正常に計算されなくなる。

## 詳細

[Demo](./examples/example01.html)

Chromeのバージョンアップによって修正されれば別ですが、Chromeとそれ以外で表示が違うはずです。  
（Chromeでは異常にpadding、marginが大きくなる）

上記デモページではCSSを以下のようにしています。

```
* {
  margin: 0;
  padding: 0;
}
html {
  font-size: 1px;
}
p {
  background: #000;
  color: #fff;
  font-size: 16rem;
  padding: 16rem;
  margin-bottom: 16rem;
}
```

remはroot要素（今回の場合html）のfont-sizeに応じて変化するので、pタグのfont-size/padding/margin-bottomは全て16pxになるはずです。実際Chrome以外ではそのようになっています。

ただ、Chromeの場合「最小フォントサイズ」という設定があり、デフォルトでこれは10pxに設定されています。そのため、DevToolsのElementsタブでhtmlタグのComputedを確認するとfont-sizeが10pxになってしまっています。

ここでpタグのfont-sizeに関しては、htmlタグの大元の設定（1px）を元にfont-sizeを計算しているのか、正常に16pxで表示されます。

ただ、pタグのpadding/marginに関してはhtmlタグに対して最小フォントサイズが適用された10pxという値を元に計算してしまっているのか、Chromeだけpadding/marginが160pxになってしまっています。

このように「root要素に最小フォントサイズが適用された後の値を元にmargin/paddingのremを計算してしまっている」という挙動をChromeがしてしまっています。

FluentDesignSystemのサイトでは、root要素のfont-sizeにvwが使われており、大体0.5~1.5pxの間を遷移しています。

さらにpadding/marginにremが使われているため前述の挙動が発生してしまっている形になります。

## まとめ

font-sizeに関してはChromeが気を利かして最小フォントサイズ適用前の値を元に計算しているのに、margin/paddingに関してはそうなってないのは恐らく実装ミスかなという感じなので、Chromeのバージョンアップで早い内に修正されるのではないでしょうか。（root要素のfont-sizeに10px未満の値を指定した上でmargin/paddingにremを使うと言った状況が無かったので全く気づきませんでした。）

## 追記（2017.5.13）

どうも2年程前に既にAppleのヘルプページで同じ原因と思われる現象が発生していた模様。

[ChromeでAppleの公式ヘルプページの表示が崩れる問題発生中](http://did2memo.net/2015/09/18/chrome-apple-help-page-rem-bug/)


[rem Hack](https://butchi.github.io/remhack/)

root要素のfont-sizeが10px未満にならないよう気をつければ回避出来るとはいえ、仕様外の挙動っぽいので出来れば直して欲しい所。
