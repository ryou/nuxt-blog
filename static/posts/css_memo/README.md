---
created_at: 2017-05-26
---

# [CSS]雑多メモ

わざわざ一つの記事にするものでもないやつの寄せ集め。

## codeタグ内の文字がChrome等Webkit系で小さくなる

### 原因

Webkit系のブラウザは、monospace系のデフォルトフォントサイズが小さい。（具体的には通常フォントサイズが16pxだが、monospace系は13px）

なので、root要素で%指定してremでフォントサイズをしたりしてると、codeタグ内だけ小さくなる。

### 解決法

```
font-family: monospace, sans-serif;
```

混在させると、sans-serif(serifでも可)の方のデフォルトフォントサイズが優先される。


### 参考

[font-family: monospace;だと文字が小さくなる - しらいとブログ](http://silight.hatenablog.jp/entry/2015/07/02/214601)
