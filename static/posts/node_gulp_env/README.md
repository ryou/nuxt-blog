---
created_at: 2017-09-24
---

# Gulpで本番・開発環境を切り分ける方法の一つ

Gulpを使用している際に、本番・開発環境の切り分けをしたいと思うと、EJSは簡単に出来るのだが、SassやJSに関しては直接的な方法ではちょっと面倒。

なので、Sass/JSに関してはEJSで出来る範囲の方法で行うという形が一番楽なのかなと思った。以下その方法をまとめておく。

## 環境概要

+ Gulp
+ EJS
+ Sass(SCSS)
+ Browserifyの使用の有無はどちらでも


## EJS(HTML)の切り分け

`minimist`を使用して本番・開発環境によってコンパイル時に異なるデータをEJSに渡す。

例えば、

```
# 開発モード（developビルド）
npm run develop

# 本番モード（releaseビルド）
npm run release
```

といったコマンドで本番・開発環境を分けたい場合、`package.json`では

```
{
  ~
  "scripts": {
    "develop": "gulp build",
    "release": "gulp build -f release"
  },
  ~
}
```

というようにして、gulpfileには


```
~

var env = minimist(process.argv).f || 'develop';

var config;
if (env === 'release') {
  config = require('./config/release.json');
} else {
  config = require('./config/develop.json');
}

~

gulp.task('ejs', function() {
  gulp.src(paths.ejs)
      .pipe(ejs({
        config: config
      }))
      .pipe(rename({
        extname: '.html'
      }))
      .pipe(gulp.dest(paths.dest));
});
```

といった感じで書き、developなのかreleaseなのかによって引っ張ってくるコンフィグファイルを分ける。

その後、コンフィグファイルのデータをEJSに渡して

```
<% if (config.env === 'release') { -%>
  ~
<% } else { -%>
  ~
<% } -%>
```

みたいな感じで切り分ける。



## Sass(SCSS)の切り分け

前述のEJSでの切り分けを基本的に利用。

```
<link rel="stylesheet" href="./assets/style.css">
<% if (config.env === 'develop') { -%>
<link rel="stylesheet" href="./assets/develop.css">
<% } -%>
```

みたいな感じ。

かなり泥臭いやり方だけど、そもそもCSSは本番・開発環境で切り分けが必要な場合が少ない。経験したパターンとしては和文WEBフォントを使用する予定の場合に、開発環境ではWEBフォントが適用出来ないので`font-face`等を記述したCSSファイルを読み込む必要がある、といったパターン程度。

その程度なので前述の泥臭い方法でも全然問題はない。問題が出てきたらその時に考えればいい。



## JSの切り分け

EJSに、下のような記述をする。

```
<script>
var CONFIG = <%- JSON.stringify(config); %>;
</script>
```

グローバルスコープに設定ファイルの中身を保持している`CONFIG`変数を用意し、そこに直接ぶち込んでしまう。そうしておけば、後はどうとでもなる。

難点は、

```
if (CONFIG.env === 'develop') {
  // 開発環境用コード
} else {
  // 本番環境用コード
}
```

みたいな書き方で切り分けるだけなので、開発用のコードがそのまま本番環境でも残ってしまうこと。

ファイルのサイズを出来るだけ削りたい状況や、開発環境用コードが残っているとまずい場合は他の方法を考えたほうが良い。
