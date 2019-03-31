---
created_at: 2019-01-29
---

# Sentryによるエラートラッキング




## minifyしたソースとsourcemapをSentryにアップロードしてminifyソース対応

以下手順

まだ入ってない場合`sentry-cli`を入れる。[https://docs.sentry.io/cli/installation/](https://docs.sentry.io/cli/installation/)

```
npm install @sentry/cli
```

sentryにログインする。最初のログイン時はホームディレクトリに`.sentryclirc`が作成される。

```
npx sentry-cli login
```

プロジェクトルートに`.sentryclirc`を作成

```
[defaults]
org = [organization name]
project = [project name]
```

SentryにReleasesを作成。

Releasesはアプリのバージョンと、Sentryにアップロードされているファイルを突き合わすために必要。

今回は仮として、バージョンを「1.6」としている。

```
npx sentry-cli releases new 1.6
```

アプリのソースに、バージョンを記載。

```
Sentry.init({
  ~
  release: '1.6' // これを追加
})
```

アプリをビルドし、必要なファイルをアップロード。

```
npx sentry-cli releases files 1.6 upload-sourcemaps -i content_script.js -i icon_clicked.js --ext js --ext map ./dist --rewrite
```

注意として、パスはドキュメントルートを指定すること。パスも含めて同一ファイルかどうか判断するのか、`./dist/js`ってするとちゃんと認識してくれなかった。
