---
created_at: 2019-02-16
---

# [JavaScript]VSCode+Prettier導入

めちゃくちゃ今更だけどやっと`Prettier`を入れたのでメモ。ESLintとの連携は後回し。

## 公式

[prettier/prettier: Prettier is an opinionated code formatter.](https://github.com/prettier/prettier)


## 手順

+ `prettier`インストール
+ プロジェクトルートに`.prettierrc.js`を配置
+ VSCodeにプラグインを導入
+ VSCodeで保存時にフォーマッタがかかるように

以上、めちゃくちゃ簡単。

### `prettier`インストール

```
npm i -D prettier
```

### プロジェクトルートに`.prettierrc.js`を配置

`.prettierrc.js`はコンフィグファイル。以下は一例。

```
module.exports = {
  // `(x) => x`を`x => x`に変換
  arrowParens: 'avoid',

  // `{x: 10}`を`{ x: 10 }`に変換
  bracketSpacing: true,

  // 改行コードをLFに統一
  endOfLine: 'lf',

  // ケツカンマ
  trailingComma: 'es5',

  // インデント幅
  tabWidth: 2,

  // セミコロンなし
  semi: false,

  // シングルクォート
  singleQuote: true,
}
```


### VSCodeにプラグインを導入

`prettier`で検索すれば出てくる。


### VSCodeで保存時にフォーマッタがかかるように

設定画面開いて`format`あたりで検索すれば`Format On Save`という項目が出てくるので、それをONにする。
