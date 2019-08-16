---
created_at: 2019-08-16
---

# [Node] pathモジュールの各メソッドのメモ

pathモジュールの使い方毎回忘れるのでメモ

```
/******************************
 * 情報取得系
 ******************************/

// 絶対パスかどうかを判断
path.isAbsolute('/foo/bar') // => true

// パス情報を分解。拡張子を除いたファイル名も簡単に取れて便利
// 以降の`dirname`, `basename`,`extname`に関しては、`parse`を使ったら良いので存在だけ知ってればOK
path.parse('/home/www/public/index.html')
/* =>
{ root: '/',
  dir: '/home/www/public',
  base: 'index.html',
  ext: '.html',
  name: 'index'
}
*/

// 指定されたエントリが存在しているディレクトリを返却
path.dirname('/foo/bar/hoge') // => '/foo/bar'

// ファイル名、ディレクトリ名を取得
path.basename('/foo/bar/hoge.txt') // => 'hoge.txt'
path.basename('/foo/bar/hoge.txt', '.txt') // => 'hoge'

// 拡張子を取得
path.extname('/foo/bar/hoge.txt') // => '.txt'



/******************************
 * パス操作系
 ******************************/

// ディレクトリ名とファイル名からパスを生成(プロパティにrootってのも存在するけど存在意義がわからないので無視)
path.format({ dir: '/foo/bar', base: 'hoge.txt' }) // => '/foo/bar/hoge.txt'
path.format({ dir: '/foo/bar', name: 'hoge', ext: '.txt' }) // => '/foo/bar/hoge.txt'

// パスを絶対パスに変換
// cwdが'/home/www/public'の場合
path.resolve('./index.html') // => '/home/www/public/index.html'
path.resolve('/home/www', '/home/user', './config') // => '/home/user/config'

// パスを結合
path.join('/foo', 'bar') // => '/foo/bar'
path.join('/home/www', 'public', '../app') // => '/home/www/app'

// パスの正規化
path.normalize('/home/www/public/../app') // => '/home/www/app'

// fromからtoへの相対パスを生成
path.relative('/home/www/public', '/home/www/app/config.js') // => '../app/config.js'


/******************************
 * 区切り文字系
 ******************************/

// 動作しているプラットフォームのパスのセパレータを取得
'/home/www/public'.split(path.sep) // => [ '', 'home', 'www', 'public' ]

// 動作しているプラットフォームのパスのデリミタを取得
console.log(process.env.PATH) // => '/usr/bin:/bin:/usr/sbin'
process.env.PATH.split(path.delimiter) // => [ '/usr/bin', '/bin', '/usr/sbin' ]
```

## resolveとjoinの違い

```
// cwdが`/home/www`の場合
path.resolve('./config', 'db.json') // => '/home/www/config/db.json'
path.join('./config', 'db.json') // => 'config/db.json'
```

上に書いたとおり、`resolve`は絶対パスへの変換なので`join`と異なり必ず絶対パスが返却される。相対パスのまま欲しい場合は`join`を使用すること。

`resolve`は順番に`cd`していった結果の最終的な絶対パスが返却されるイメージ。

```
path.resolve('/home/www', '/home/user', './config') // => '/home/user/config'
path.join('/home/www', '/home/user', './config') // => '/home/www/home/user/config'
```

また、第２引数以降に絶対パスを渡した場合の挙動が異なる。`resolve`は第２引数以降に絶対パスを渡すと、それ以前の内容が完全に無視される。

これに関してはそもそも第２引数以降に絶対パス渡すなよっていう話で、`join`の挙動が変な気もする。
