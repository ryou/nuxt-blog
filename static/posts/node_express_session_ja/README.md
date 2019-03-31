---
created_at: 2017-05-26
---

# express-session README日本語訳

**翻訳途中**

express-sessionの設定項目が意味不明で日本語情報もほとんど見当たらなかったので、自身の理解のために雑に翻訳。英文そのままの所は未翻訳。

翻訳信頼性は限りなく0に等しいので参考にしないほうが良い。

自分自身が追記した注釈に関しては「独自追記」と記載。

## 翻訳元

[GitHub - expressjs/session: Simple session middleware for Express](https://github.com/expressjs/session)(2017.05.26時点)

## インストール

[npm registry](https://www.npmjs.com/)を通して利用可能な[Node.js](https://nodejs.org/en/)モジュールです。

インストールは[`npm install`コマンド](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)で出来ます。

```
$ npm install express-session
```

## API

```
var session = require('express-session')
```

### session(options)

与えられたoptionsに従ってセッションMiddlewareを作成します。

**Note:**セッションデータはクッキーには保存されません、クッキーに保存されるのはセッションIDです。セッションデータ自体はサーバーサイドで保存されます。

**Note:**バージョン1.5.0以降、このモジュールに[cookie-parserミドルウェア](https://www.npmjs.com/package/cookie-parser)は不要になりました。このモジュールは今では`req/res`を用いて直接クッキーを読み書きしています。`cookie-parser`を使用すると、もしsecretがこのモジュールと`cookie-parser`間で統一されていない場合不具合の原因になってしまいます。

**Warning:**デフォルトのサーバーサイドのセッションストレージである`MemoryStore`は、わざと本番環境のために設計していません。`MemoryStore`は多くの状況でメモリリークを引き起こし、does not scale past a single process,つまり`MemoryStore`は開発やデバッグ用途のものなのです。

セッションの保存方式一覧は、[Compatible Session Stores](https://www.npmjs.com/package/express-session#compatible-session-stores)を確認してください。

#### Options

`express-session`はoptionsオブジェクトに以下のプロパティを利用できます。

##### cookie

セッションIDを保存するクッキーのための設定です。

デフォルトは以下の通りです。

```
{
  path: '/',
  httpOnly: true,
  secure: false,
  maxAge: null
}
```

以下のオプションはこのオブジェクトに設定できるものです。

**独自追記：一般的なCookieのOptionなので省略**

##### genid

新しいセッションIDを生成するために呼ばれる関数。セッションIDとして使用される文字列を返却する関数を与えて下さい。IDを生成する際に`req`に関わる値を使用したい時のために、第一引数に`req`が与えられています。

デフォルトは、IDを生成するために`uid-safe`ライブラリを使用している関数です。

**NOTE:**ユニークなIDを生成する際には、セッションIDが競合しないよう注意して下さい。

```
app.use(session({
  genid: function(req) {
    return genuuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat'
}))
```

##### name

HTTPレスポンスに設定するセッションIDクッキーの名前です。

デフォルトは`connect.sid`です。

**NOTE:**もし複数のアプリを同一ホスト名で走らせるなら (this is just the name, i.e. localhost or 127.0.0.1; different schemes and ports do not name a different hostname)、セッションのクッキーをお互いに分離させる必要があります。シンプルな方法としてはアプリ毎に異なるnameを設定することです。


##### proxy

クッキーにsecure属性が設定されている際に、リバースプロキシを信頼するかどうか。

デフォルトは`undefined`。

+ `true`: `X-Forwaded-Proto`ヘッダーが使用されます。
+ `false`: 全てのヘッダーは無視され、接続はダイレクトなTLS/SSL接続の時のみセキュアとみなされます。
+ `undefined`: expressの`trust proxy`の設定を使用します。

**独自追記:**この項目よくわからないのであくまで予想だけど、リバースプロキシは簡単に信頼していいものではなく、X-Forwaded-Protoヘッダーが改鼠される可能性があるみたい。Set-Cookieでsecure属性を設定しているにも関わらず、リバースプロキシとクライアント間の通信がhttpなのにhttpsと見なしてクッキーを送ったらMITM攻撃でセッションハイジャックされるので、それの対策っぽい。

**独自追記:**X-Forwaded-Protoヘッダーは、クライアントとロードバランサ間のプロトコルがHTTPなのかHTTPSなのか判別するためのヘッダー。ロードバランサを使用している際には、サーバーは何も対策していなければロードバランサとサーバー間のプロトコルしか判別出来ないっぽい。それだとCookieのsecureオプションを適用するかどうか判断する際に困るからこの設定がある、みたい。

**独自追記:**リバースプロキシ参考：[リバースプロキシって何？触りだけ学んだサーバー/インフラ入門 - Qiita](http://qiita.com/growsic/items/fead30272a5fa374ac7b)


##### resave

Forces the session to be saved back to the session store, even if the session was never modified during the request. Depending on your store this may be necessary, but it can also create race conditions where a client makes two parallel requests to your server and changes made to the session in one request may get overwritten when the other request ends, even if it made no changes (this behavior also depends on what store you're using).

The default value is true, but using the default has been deprecated, as the default will change in the future. Please research into this setting and choose what is appropriate to your use-case. Typically, you'll want false.

How do I know if this is necessary for my store? The best way to know is to check with your store if it implements the touch method. If it does, then you can safely set resave: false. If it does not implement the touch method and your store sets an expiration date on stored sessions, then you likely need resave: true.


##### rolling

セッションIDのクッキーを毎レスポンスに強制的に付与します。そのことでクッキーの期限がリセットされます。

デフォルトはfalseです。

**独自追記:**通常はクッキーの期限が切れない限り新しくレスポンスにクッキーを付与しないんだけど、このオプションをtrueすると毎回Set-Cookieされていており、またそれのExpireはmaxAgeを元に計算された新しい期限が設定されていた。

**NOTE:**このオプションが`true`に設定されており、`saveUninitialized`オプションが`false`に設定されているなら、he cookie will not be set on a response with an uninitialized session.



##### saveUninitialized

Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. Choosing false is useful for implementing login sessions, reducing server storage usage, or complying with laws that require permission before setting a cookie. Choosing false will also help with race conditions where a client makes multiple parallel requests without a session.

The default value is true, but using the default has been deprecated, as the default will change in the future. Please research into this setting and choose what is appropriate to your use-case.

Note if you are using Session in conjunction with PassportJS, Passport will add an empty Passport object to the session for use after a user is authenticated, which will be treated as a modification to the session, causing it to be saved. This has been fixed in PassportJS 0.3.0


##### secret

**必須設定**

セッションIDクッキーを暗号化するためのsecretです。単一のsecretなら文字列、複数のsecretなら配列を指定します。配列を指定した場合、セッションIDクッキーの暗号化には最初の要素のみが使用され、リクエスト内の署名の復号には全ての要素が使用されます。


##### store

session storeのインスタンスです。デフォルトでは新しく`MemoryStore`インスタンスが指定されています。


##### unset

`req.session`をunsetした際（`delete`や、`null`を設定する等）の結果をコントロールします。

デフォルトは`keep`で

+ `destroy`: レスポンス終了時にセッションが破棄されます。
+ `keep`: ストア内のセッションは維持されますが、リクエストによってセッションの変更が発生したとしても無視され保存されません。


**独自追記：以下未翻訳**
