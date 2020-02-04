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

## おすすめプラグイン

下に挙げるプラグイン以外にも色々便利そうなものはあるので（`nodenv-default-packages` とかも便利そう）nodenv公式リポジトリは一通り見たらいいかも

### nodenv-package-rehash

https://github.com/nodenv/nodenv-package-rehash

nodenvは `~/.nodenv/shims` にnodeやグローバルインストールされたパッケージのエントリポイントが存在している。つまりここに各コマンドに対応したファイルが存在していないとコマンドが実行できない。

shimsの更新は `nodenv init` や `nodenv rehash` が実行された際に行われているみたいで、パッケージをグローバルインストールしたはいいものの前述のコマンドの実行やターミナル再起動を忘れて「何故か知らないけどコマンドが実行できない」みたいな状況が発生する（発生した。

このプラグインを入れるとパッケージのグローバルインストールに自動的に `nodenv rehash` してくれる。便利

### nodenv-package-json-engine

https://github.com/nodenv/nodenv-package-json-engine

package.jsonのenginesフィールドに従い、nodeのバージョンを自動で切り替えてくれる。 `.node-version` で事足りるという話もあるが、個人的にenginesフィールドあるんだからそっち使ったらいいじゃんという気持ちなのでありがたい。

注意点としては、yarnはenginesフィールド通りのnodeバージョンじゃないとエラーが出て諸々のコマンドが失敗してしまう。  
nodeのバージョン管理はしないようなチームの方針だったりすると面倒なので、その場合は `.node-version` ファイルでやったほうがいい。
