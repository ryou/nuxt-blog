---
created_at: 2019-07-04
---

# nodenvでNode.jsのバージョン自動切り替え

[GitHub - nodenv/nodenv: Manage multiple NodeJS versions.](https://github.com/nodenv/nodenv#how-nodenv-hooks-into-your-shell)

## なぜnodenvか？

`.node-version`ファイルを配置しておくだけで自動的にNode.jsのバージョンを切り替えてくれるため。

自動切り替えは言わずもがな便利だし、`.node-version`で明示的にプロジェクトで推奨のNode.jsバージョンを示しておくことで後から「このプロジェクト、Node.jsのどのバージョン使えばいいんだっけ？？」というのがなくなる。

Windowsなら`nodist`が同じことをしてくれるみたい。

## セットアップ方法

```
# インストール
brew install nodenv

# 下記コマンドを打つと、.bashrcや.zshrcに追記しておくべきスクリプトが出力されるのでそれをコピペする
nodenv init
```

## 使い方

```
# インストールできるNode.jsの一覧表示
nodenv install -l

# Node.jsのインストール
nodenv install [インストールするNode.jsのバージョン]

# 現在アクティブなNode.jsのバージョン
nodenv version

# 端末にインストールされているNode.jsのバージョン一覧
nodenv versions

# 指定したバージョンで.node-versionファイルを生成
nodenv local [使用するNode.jsのバージョン]

# デフォルトで使用するのNode.jsバージョンを指定
nodenv global [使用するNode.jsのバージョン]
```
