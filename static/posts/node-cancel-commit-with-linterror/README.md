---
created_at: 2019-07-14
---

# リントエラー時にコミットをキャンセルさせる

## 結論

`husky`と`lint-staged`を導入すればいい。

### 導入手順

前提として、`eslint`がインストール済なこと

#### インストール

```
yarn add --dev husky lint-staged
```

#### `package.json`記述

```
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,vue}": "eslint"
  }
}
```

### 注意

#### husky導入以前に、`.git/hooks`に`pre-commit`などのフックファイルを作成していないこと

`husky`はインストール時に`.git/hooks`に`pre-commit`等のフックファイルを自動生成する。

ただし、事前にフックファイルを時前で作っていると、存在しているフックファイルに関しては既存の物が優先され、`husky`に必要なフックファイルが生成されずスキップされてしまう。

結果、`husky`によるフックが正常に動作しなくなるので注意。

#### package.jsonがリポジトリのルートに存在していること

前述の通り、`husky`はインストール時にフックファイルを自動生成するが、`package.json`と同じディレクトリに`.git`ディレクトリが存在しない場合は生成されない。

一つのリポジトリでフロントエンドからバックエンドまで一緒くたに管理している場合この状況に陥って`husky`が動作しなくなるので注意。

## 以下、調べた事を雑に書く

`.git/hooks`ディレクトリに`pre-commit`等フックのタイミングに応じた名前のシェルスクリプトを配置することで、特定のタイミングでシェルスクリプトを実行できる。

また、フックが異常終了した場合、その時の動作がキャンセルされる。例えば`pre-commit`で異常終了した場合はコミットがキャンセルされる。

```
#!/bin/sh

exit 1
```

なので、こんな`pre-commit`ファイルを配置すると、コミットが常にキャンセルされる。

```
#!/bin/sh
# 実行場所を気にしないために、まず自身のディレクトリに移動
cd `dirname $0`
cd ../..
npx eslint main.js
```

こういう`pre-commit`ファイルを配置すると、`main.js`でリントエラーが発生した場合はコミットがキャンセルされる。

これを応用することでコミット時にリントを走らせて、エラーがあればコミットキャンセルすることでESLintを常に守らせることができる。

ただ、`.git`ディレクトリはGit監視対象外のディレクトリなので、このままだとプロジェクトメンバー全員に手動で`pre-commit`ファイルの設定をしてもらわないといけない。

それを解決するのが`husky`。`husky`をプロジェクトでインストールしていると`package.json`にフック動作を記述することが出来るのでフック動作をGitで管理することが可能になる。

また、`lint-staged`を利用することで特定の拡張子を持つコミット対象のファイルのみリントの対象とすることが出来るので大体それも一緒に使う。

### ESLintがnpm経由で実行すると、エラーを吐く

```
{
  "scripts": {
    "lint": "eslint main.js"
  }
}
```

とかして、`npm run lint`とかすると、リントエラー時にESLintのエラーメッセージに加えて以下のようなエラーが出力される。

```
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! 8@1.0.0 lint: `eslint main.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the 8@1.0.0 lint script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/user/.npm/_logs/2019-07-14T05_53_02_446Z-debug.log
```

どうもこれはnpm自体のエラーで、ESLintのエラー時にはこのエラーが出るのが正常みたい。ただノイズにはなる。

そういう場合は`npm run -s lint`とすればいいらしい。

[npm scriptsでエラーログを表示させたくない話 - はらへり日記](https://sota1235.hatenablog.com/entry/2016/08/06/210659)

`-s`はnpmのオプションで、npmのエラーを出力させたくない場合に使うみたい。

### VueCLIで作られるpackage.jsonには「husky」ではなく「gitHooks」という記述だがあれは？

VueCLIでは`husky`からEvan自らforkした`yorkie`を使っているみたい。

[GitHub - yyx990803/yorkie: Git hooks made easy](https://github.com/yyx990803/yorkie)
