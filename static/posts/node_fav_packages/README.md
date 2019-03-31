---
created_at: 2017-05-16
---

# node.jsで気に入ったパッケージ

備忘録のため、メモ程度に残しておく




## json-server

[typicode/json-server: Get a full fake REST API with zero coding in less than 30 seconds (seriously)](https://github.com/typicode/json-server)

APIモックを作るのに便利

クエリパラメータによらず、固定の値を返して欲しい場合はcustom routesを使えばいい

[Add custom routes](https://github.com/typicode/json-server#add-custom-routes)

## cheerio-httpcli

npm: [cheerio-httpcli](https://www.npmjs.com/package/cheerio-httpcli)

取得したHTMLを、jQueryライクに探索することが出来る。

スクレイピングする際に最高。

製作者による記事：[Node.js用のスクレイピングモジュール「cheerio-httpcli」の紹介 - Qiita](http://qiita.com/ktty1220/items/e9e42247ede476d04ce2)

## node-twitter-api

[reneraab/node-twitter-api: Simple module for using Twitter's API in node.js](https://github.com/reneraab/node-twitter-api)

このパッケージ一つで認証からAPI叩く所まで全て賄える。他のパッケージ探した限りでは認証用のパッケージとAPI叩く（ラッパー的な）用のパッケージ２種類使わないといけない感じでちょっと微妙だった。

ただ残念ながらREADMEに書いている通り既にメンテナンスされていない。

コードが千行程度で割りと短いので、自分で読んで一度理解しておくのもいいかもと思った。

## minimist

[minimist](https://www.npmjs.com/package/minimist)

CUI上で使用するnode.jsプログラムを作る際、引数を簡単に扱えるようにしてくれるパッケージ。

### 詳細

node.jsでは`process.argv`で引数を取得することが出来る

例えば、`hoge`という以下の内容のJavaScriptプログラムを作成したとする。

```
#!/usr/bin/env node

// 実際の引数は配列の３番目以降なので、sliceを利用して抽出する
var argv = process.argv.slice(2);

console.log(argv);
```

これに対し、`hoge -e dev`といったコマンドを打った場合は

```
[ '-e', 'dev' ]
```

このままだと単に配列に羅列されているだけで扱いづらい。

ここで`minimistを利用すると`

```
#!/usr/bin/env node

var minimist = require('minimist');

// 実際の引数は配列の３番目以降なので、sliceを利用して抽出する
var argv = minimist(process.argv.slice(2));

console.log(argv);
```

のようなソースコードになり、`hoge -e dev`に対する出力は

```
{ _: [], e: 'dev' }
```

と言うかたちとなる。

今回の場合、`-e`オプションは`dev`なら開発環境モード、`prod`なら本番環境モードといった感じの物を想定しており、

```
var environment = argv.e || 'dev';
```

といった形で変数`environment`にオプションが指定されている場合は指定されたオプションが入り、指定されていない場合はデフォルト値（今回の場合はdev）が入る、といったよくある処理が簡単に出来るようになる。
