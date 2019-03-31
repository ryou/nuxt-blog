---
created_at: 2017-05-18
---

# [node.js]Express関係メモ


## 注意

パッケージのバージョンアップでめっちゃ挙動変わるので、動かない場合は公式をチェックすること。

## sassを使いたい

express-generatorのオプションで、sassオプションが存在する。

プロジェクト生成時に

```
express [project-name] -c sass
```

とやればOK。

### 参考

[Express のアプリケーション生成プログラム](http://expressjs.com/ja/starter/generator.html)





## autoprefixerを使いたい

express-autoprefixerを使う。

express-autoprefixerをインストールした上で、以下のようにsassMiddlewareとstaticの間に入れればOK。

```
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(autoprefixer({
  browsers: ['android 2.3'],
  cascade: false
}));
app.use(express.static(path.join(__dirname, 'public')));

```

### 参考

[express-autoprefixer](https://www.npmjs.com/package/express-autoprefixer)




## sessionを使いたい

express-sessionを使う。

インストールした上で以下のように記述。

```
# app.js

~

app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'keyboard cat'
}));

app.use('/', index);
app.use('/users', users);
```

オプションは適当なので調べて適宜調整すること。

また、`app.use('/', index)`とかの前に書かないと動作しないので注意。結構ハマった。
