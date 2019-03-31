---
created_at: 2017-07-22
---

# fromCharCodeに関して

fromCharCodeの変換ルールが最初意味不明だったのでメモ。

## 要約

+ 引数で渡された値を[Unicode表](https://ja.wikipedia.org/wiki/Unicode%E4%B8%80%E8%A6%A7_0000-0FFF)を元に文字に変換して返却
+ UCS-2なので、２バイトの範囲内の文字しか変換出来ない。より広範囲の文字を変換したい場合はfromCodePointを使用する。


## 実例

```
console.log(String.fromCharCode('0x0410', '0x000290b0'));
// => А邰
// 2バイト文字までしか変換できないので、'0x000290b0'が'0x90b0'として判定され対応する「邰」に変換される

console.log(String.fromCodePoint('0x0410', '0x000290b0'));
// => А𩂰
// こちらは正常に'0x000290b0'と対応する「𩂰」に変換
```

## 参考

[String.fromCharCode() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)

[UCS-2とUTF-8](http://nomenclator.la.coocan.jp/unicode/ucs_utf.htm)

[Unicode一覧 0000-0FFF - Wikipedia](https://ja.wikipedia.org/wiki/Unicode%E4%B8%80%E8%A6%A7_0000-0FFF)
