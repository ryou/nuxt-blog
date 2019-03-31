---
created_at: 2019-03-28
---

# MySQLのcollationに関して

## 結論

基本`utf8mb4_bin`でいいんじゃなかろうかと個人的に思った。

ただ、ネット上の情報だと何故か`utf8mb4_general_ci`を選択しているパターンが多い…なにか見逃しがあるのかもしれない。

## 各collationにおける比較結果の表

各collationで「a」と「A」や「🍣」と「🍺」等を比較した際に同じものとして扱われるかどうかを以下にまとめた。

|collation|a/A|ハ/パ|@/＠|🍣/🍺|ブ/ブ(結合文字)|
|:----|:----|:----|:----|:----|:----|
|utf8mb4_bin|≠|≠|≠|≠|≠|
|utf8mb4_general_ci|=|≠|≠|=|≠|
|utf8mb4_unicode_ci|=|=|=|=|=|

## 結合文字

UTF8では「ボ」という文字を表現する場合、合成文字(U+30dc)と結合文字（U+30db U+3099）の２通りの方法が存在する。

結合文字は名前の通り、「ホ（U+30db）」と「゛（U+3099）」という風に２つの文字を結合して１つの文字として表現する方法。

どちらも同じ「ボ」だが、`utf8mb4_bin`だと別物扱いになる。

結合文字に関しては以前Unicode正規化に関して調べた際に少し触れた。

[Unicode正規化（NFC,NFD,etc…）](/posts/general_unicode_normalize/)

結合文字に関してはそもそもレアな点と、合成文字と結合文字を同じものとして扱ってほしい場合は問題が大量にある`utf8mb4_unicode_ci`を選択しなければならないので無視するしかないと思う。

## 参考

[MySQL 寿司ビール問題 - PukiWiki](https://yassu.jp/pukiwiki/index.php?MySQL%20%BC%F7%BB%CA%A5%D3%A1%BC%A5%EB%CC%E4%C2%EA)

[寿司ビール問題①　初心者→中級者へのSTEP20/25 - Qiita](https://qiita.com/kamohicokamo/items/3cc05f63a90148525caf)

[寿司=ビール問題 : MySQL 8.0でのUTF8サポート入門 (MySQL Server Blogより) | Yakst](https://yakst.com/ja/posts/4405)
