---
created_at: 2018-09-13
---

# [Laravel] 時間の扱いに関してどうするべきかわからない

[LaravelのtimezoneをデフォルトのUTCからJST(日本標準時)へ変更する](https://qiita.com/pinkumohikan/items/2e9cefb85d75a8622d99)

LaravelでJSTを扱う時、上記のような解決法が挙げられている。

ただこの方法を試したところ、DBへ保存される時間もJSTになってしまった。出来るならDBにはUTCで保存しておき、出力の際に適切なtimezoneへ変換するようにしたい。（話題のサマータイム問題もあるし、出来る限り理想的な方法を採用したいという思いがある）


[Laravel 5 - Laravel5.4で、モデルに使用されているCarbonのTimezoneをユーザごとに自動で切り替えたい(108163)｜teratail](https://teratail.com/questions/108163)

少し調べたら上記のような解決法が出てきた。`asDateTime`をオーバーライドする方法。

こういう要件はかなり頻繁にありそうなのに、フレームワーク側で解決策が提供されていないのが気になる…探し方がわるいんだろうか
