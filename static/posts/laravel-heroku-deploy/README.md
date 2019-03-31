---
created_at: 2019-02-11
---

# LaravelをHerokuにデプロイ（Laravel mix使用かつGitHub経由）


最近Herokuの活用事例を聞いて試してみたくなったので試した。そのメモ。

## 手順

+ GitHubリポジトリの準備
+ Herokuの準備
  + アプリの作成
  + BuildPackの適用
  + DBの準備
  + GitHubリポジトリと連携
+ 初回デプロイ
  + 最初は手動デプロイ
  + 環境変数の設定


## GitHubリポジトリの準備

基本普通に作成したLaravelアプリのリポジトリを用意すれば問題ないが、以下の点に留意して準備する。

### リポジトリのルートディレクトリに`composer.json`が存在するように

Herokuはビルドする際にリポジトリのルートディレクトリだけを見るみたいで、ルートディレクトリ以外でビルドしようとすると面倒。なので、基本ルートディレクトリに`composer.json`や`package.json`等が配置されるようにすること。

### `Procfile`の配置

ルートディレクトリに以下の内容の`Procfile`を配置。

```
web: vendor/bin/heroku-php-apache2 public/
```

`Procfile`はHerokuでアプリが起動する際の処理を記述するみたいだけど詳しいことはよくわかっていない。とりあえず上記のように書いておくと`public`がドキュメントルートになる。

### `package.json`に`heroku-postbuild`を追加

当然だけど、Heroku側で`npm run production`されないとフロントエンドの諸々が用意されない。

以下のように`package.json`に`heroku-postbuild`を追加すると、パッケージインストール完了後記述したスクリプトが実行される。

```
{
    ~
    "scripts": {
        ~

        "heroku-postbuild": "npm run production"
    },
    ~
}
```


## Herokuの準備

### アプリの作成

普通に作成。

### Buildpacksの適用

`Settings`タブから`heroku/nodejs`と`heroku/php`をインストールしておく。

### DBの準備

`Resources`タブの`Add-ons`から、`Heroku Postgres`をインストールする。

### GitHubリポジトリと連携

先んじて準備しておいたリポジトリと連携し、`master`ブランチに`push`された際に自動デプロイされるようにする。

`Deploy`タブの`Deployment method`からGitHubを選び、画面の指示に従って進めればOK。


## 初回デプロイ

### 最初は手動デプロイ

`push`に反応して自動デプロイされるので、最初は手動でデプロイする。

### 環境変数の設定

Laravelに必要な環境変数の設定をする。

HerokuのWEBサイトからも設定できるが、面倒なのでCLIからやる。

#### ローカルのプロジェクトとHerokuアプリを結びつける

以下のコマンドをプロジェクトルートで実行する。

```
heroku git:remote -a [app name]
```

これで、リモートブランチとして`heroku`が登録されると共に、`heroku`コマンド時に自動的に指定したアプリへのコマンドとして実行されるようになる。（これをしないと毎回`-a`オプションが必要になる。）

#### 環境変数を設定する

`APP_KEY`とDB情報の設定を行う。

DB情報は、`Heroku Postgres`の`Settings`タブ内の項目`Database Credentials`に記述されている。

必要な項目を以下のコマンドで環境変数として設定。

```
heroku config:set APP_KEY=$(php artisan key:generate --show) DB_CONNECTION=pgsql DB_HOST=...
```


## 参考

[Laravel5.7: Herokuにデプロイする - Qiita](https://qiita.com/sutara79/items/a173b969474d9f5afe1b)

[Laravel Mix + Heroku - Qiita](https://qiita.com/llhrkll/items/513c23008b2596089a00)

[Heroku Node.js Support | Heroku Dev Center](https://devcenter.heroku.com/articles/nodejs-support#heroku-specific-build-steps)
