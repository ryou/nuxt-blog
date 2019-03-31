---
created_at: 2017-05-25
---

# クッキーに関して

バックエンドをNode.jsに切り替えようとしてExpress使ってexpress-sessionを使ってセッションを扱おうとしたらCookieに関するオプションがよくわからなかったのでまとめておく。

## サーバー側からの送信方法

HTTPヘッダーに`Set-Cookie`を付与することによって送信出来る。

例えば、以下のような形。

```
Set-Cookie: hoge_cookie=var; path=/; httponly
```

パラメータに関しての説明は後述。

## クライアント側での取得方法

サーバーから送られたCookieのデータは、`document.cookie`に保存されるので、単純に以下のコードで取得することが可能。

```
var cookie = document.cookie;
```

ただ、これで取得できるのはオブジェクトではなく、`fuga_cookie=hoge`のような単純な文字列なので扱いづらい。`cookie.js`等のライブラリを使用したほうが良い。


## Set-Cookieの各種パラメータ

### NAME=VALUE

Cookieの本体、キーバリュー形式で値をクライアントに保管する。終わり。

### expires

```
Set-Cookie: fuga=hoge; expires=Tue, 19 Jan 2038 03:14:07 GMT
```

みたいな感じで使用する。expiresに指定された日付までCookieが有効、超えると無効になる。

cache-controlでも見たなこれ。

### max-age

```
Set-Cookie: fuga=hoge; max-age=3600
```

みたいな感じで使用する。max-ageに指定された秒数間Cookieが有効。

expiresと同時に指定された場合はmax-ageが有効になる。

cache-controlでも（ry


### domain

```
Set-Cookie: name=value; domain=example.com
```

Cookieが有効なドメインを指定する。現在のホストとdomainで指定された物が後方一致すればそのCookieは有効になる。

なお、domainには現在のホストと全く関係の無いものを設定しても無効になる。

例えば、`http://www.sd-milieu.net`にアクセスがあって`domain=www.sd-milieu.net`なら有効だが、`domain=google.com`とかは無効。そりゃ他人のドメインのCookieを操作できちゃうので当然っちゃ当然。

じゃあどんな時に使うのかって言うと`http://www.sd-milieu.net`にアクセスがあった際に`domain=sd-milieu.net`として（これは有効）、`http://blog.sd-milieu.net`でもCookieを有効にしたりとかしたい場合に使う。同一ホスト間でCookieをやり取りしたい場合に使う。多分。（試してない）


### path

```
Set-Cookie: name=value; path=/
```

Cookieが有効なパスを指定。現在のパスとpathで指定された物が前方一致すれば有効になる。

例えば`path=/blog`の場合、アクセスがあったURLが`http://www.sd-milieu.net/blog/`ならCookieが有効だが、`http://www.sd-milieu.net/about/`なら無効になる。パスが違うから。


### secure

このオプションが設定されているCookieは、https通信の時のみ送信される。

セッションを利用する場合は、セッションを利用するページは全てhttpsにしておきこのsecureオプションをセッションIDに付与しておかないと、http通信をしているページでもセッションIDが通信に平文で乗ってしまってMITM攻撃でセッションハイジャックされるよ、って感じなのかなと。

### httponly

このオプションが付与されたCookieは、JavaScriptから参照できなくなる。

XSS脆弱性があったとしても、このオプションをセッションIDに付与しておけばセッションハイジャックを防ぐことが出来る。セッションIDには付けよう。


## 検証のために書いたNode.jsのコード

```
var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");


var server = http.createServer();
server.on('request', function(req, res) {
  var uri = url.parse(req.url).pathname;
  var filename = path.join(process.cwd(), uri);

  fs.exists(filename, function(exists){
      if (!exists) {
        console.log('file or directory not found');
        return;
      }

      if (fs.statSync(filename).isDirectory()) {
        filename += '/index.html';
      }

      fs.readFile(filename, "binary", function(err, file) {
        if (err) {
          console.log('file can\'t read.');
          return;
        }

        var extname = path.extname(filename);
        var header = {
          "Set-Cookie": ["hoge_cookie=var; path=/; httponly", "fuga_cookie=test;"]
        };
        res.writeHead(200, header);
        res.write(file, "binary");
        res.end();
      });
  });

});
server.listen(8000);
```

## 参考

[Cookie の仕様とセキュリティ](http://www.yunabe.jp/docs/cookie_and_security.html)
