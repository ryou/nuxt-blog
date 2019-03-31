---
created_at: 2019-02-16
---

# VSCode+Vue+ESLintで保存時フォーマット+コミット時にリント

Prettierも組み合わせて使いたかったけど諦めた。組み合わせて使おうとしたらコミット時の整形内容と、エディタで保存時にかかる整形内容が何故か異なってしまって気持ちが悪かった。

なので、ESLintでカバー可能な範囲のフォーマットだけ行うことに。

## 手順

+ 保存時に自動フォーマットされるようにする
  + `eslint`と`eslint-plugin-vue`をインストール
  + `.eslintrc.js`を配置
  + VSCodeにESLintプラグインインストール
  + VSCodeの`setting.json`を弄って保存時フォーマットを有効に
+ コミット時にフォーマット&リントされるようにする
  + `husky`と`lint-staged`をインストール
  + `package.json`を弄る

### 保存時に自動フォーマットされるようにする

#### `eslint`と`eslint-plugin-vue`をインストール

```
npm i -D eslint eslint-plugin-vue
```

#### `.eslintrc.js`を配置

設定の一例

```
module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'standard',
    'plugin:vue/recommended',
  ],
  plugins: ['vue'],
  parserOptions: {
    // 「sourceType: 'module'」にしないと、imoportがエラーになる
    // デフォだとWebpackとか使っていない環境向けになってるとか多分そういうあれ
    // https://eslint.org/docs/user-guide/configuring
    sourceType: 'module',
  },
  rules: {
    // ケツカンマは複数行で必ずついていて欲しい
    'comma-dangle': ['error', 'always-multiline'],
  }
}
```

#### VSCodeにESLintプラグインインストール

`ESLint`で検索すれば出てくる。

#### VSCodeの`setting.json`を弄って保存時フォーマットを有効に

以下の内容を追記する。

```
[
  ~
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    {
      "language": "javascript",
      "autoFix": true
    },
    {
      "language": "vue",
      "autoFix": true
    },
  ],
]
```


### コミット時にフォーマット&リントされるようにする

#### `husky`と`lint-staged`をインストール

`husky`はコミット直前のタイミングで`npm script`を呼び出せるようになるやつ。

`lint-staged`は`husky`と組み合わせてステージングエリアのファイルに対してコミット前にリントして、失敗したらコミットさせないようにできるやつ。

```
npm i -D husky lint-staged
```

#### `package.json`を弄る

以下の内容を追加する。

```
{
  ~
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,vue}": [
      "eslint --fix",
      "git add"
    ]
  },
}
```
