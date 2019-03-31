---
created_at: 2018-12-05
---

# MySQLのver8以降SequelProで接続出来ない

Dockerで立ち上げたMySQLサーバーに対してSequelProで接続しようとしたところ、

```
ホスト 127.0.0.1 に接続できなかったか、リクエストがタイムアウトしました。

アドレスが正しく必要な権限のあることを確認するか、接続タイムアウトを増やして試してください（現在 10 秒）。

MySQL の応答: Authentication plugin 'caching_sha2_password' cannot be loaded: dlopen(/usr/local/lib/plugin/caching_sha2_password.so, 2): image not found
```

こちらのようなエラーが発生し接続に失敗した。

原因は、MySQLのver8から認証プラグインが`caching_sha2_password`というものに変更しており、SequelProがその認証方式に対応していないため接続に失敗する。

自前のVagrantで構築した環境や、さくらのサーバーではSequelProで接続できていたのは、MySQLがver5.7だったため。こちらの場合認証プラグインは`mysql_native_password`となっている。

## 一時回避策

認証プラグイン`mysql_native_password`でユーザーを作成したら一応回避できるという話。（もちろんセキュリティは落ちる模様）

```
create user user_name@'%' identified with mysql_native_password by 'user_password';
```

ただ、実際試したところこの対応を行うと認証エラーは回避できたが、認証後に`NSInvalidArgumentException`が発生。MySQL側でエラーは発生しなかったがアプリ側でエラーが出てきてしまった。

もうこれに関してはSequelProのMySQL8対応を待つか別クライアントに乗り換えるかしないといけなさそう。

MySQL5.7のイメージを使用するのもありかもしれない。

## 参考

[MySQL8.0新機能 (caching_sha2_password 認証プラグイン) | スマートスタイル TECH BLOG](https://www.s-style.co.jp/blog/2018/05/1807/)
