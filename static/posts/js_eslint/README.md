---
created_at: 2017-10-09
---

# ESLint覚書

今まではJSHintを使用していたが、webpack+Vue.jsで個人的に物を作るにあたってES2015以降の構文を使用したい状況が多く出てきたため、ESLintに移行することにした。

その備忘録。

[ESLint - Pluggable JavaScript linter](https://eslint.org/)

## 全体の流れ

+ エディタの準備
  + linter-eslintのインストール
+ プロジェクトの準備
  + ローカルにeslintをインストール
  + 設定ファイルを配置

## エディタの準備

### linter-eslintのインストール

Atomの場合は、linter-eslintをインストールする。

依存しているパッケージが複数あるが、linter-eslintをインストールする際に「これも必要だけどインストールする？」って確認してくれるので、そこで一緒にインストールすればいい。

### (Optional).vueファイルを使用する場合

`.vue`ファイルを使用する場合は、それに対してもESLintが動作するよう設定をしなければならない。

やることは

+ `eslint-plugin-vue`のインストール
+ Atomで、linter-eslintの設定に`text.html.vue`を追加

#### `eslint-plugin-vue`のインストール

以下のコマンドでインストール

```
npm i -D eslint-plugin-vue
```

#### Atomで、linter-eslintの設定に`text.html.vue`を追加

linter-eslintの設定内に「List of scopes to run ESLing on, ~」といった感じの、どのファイルに対してESLintを動作させるかの設定がある。

そこに`text.html.vue`を追加。

（なぜ`source.vue`でなく、`text.html.vue`なのかは不明。説明にある通り、`.vue`ファイルに対してAtomの`Editor: Log Cursor Scope`を実行すると`text.html.vue`が表示される）

（追記：どうも`language-vue`がScopeとして`text.html.vue`を指定しているのでその関係っぽい）

[Atomのlinter-eslintでvuejsのプラグインを導入する](http://omachizura.com/note/Atom%E3%81%AElinter-eslint%E3%81%A7vuejs%E3%81%AE%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3%E3%82%92%E5%B0%8E%E5%85%A5%E3%81%99%E3%82%8B.html)


## プロジェクトの準備

プロジェクト毎にES2015の仕様を利用していけるのか、それとも利用できないのか等、構文チェックの要件は異なってくる。

そのため、ESLintをプロジェクト毎に準備することで、プロジェクト毎に設定を変更できるようにしておく。

### ローカルにESLintをインストール

```
npm init
npm i -D eslint
```

### 設定ファイルを配置

設定ファイルは自分で作成する事も可能だが、項目が多いためとりあえず最初はメジャーであるAirbnbの設定ファイルを利用することとする。

[Javascript-style-guide](https://mitsuruog.github.io/javascript-style-guide/)


```
# eslintのinitコマンド
./node_modules/.bin/eslint --init

# 「人気のスタイルガイドを使用する」を選択しEnter
? How would you like to configure ESLint?
  Answer questions about your style
❯ Use a popular style guide
  Inspect your JavaScript file(s)

# 「Airbnb」を選択しEnter
? Which style guide do you want to follow?
  Google
❯ Airbnb
  Standard
```

#### ES5プロジェクトの場合

ES5の場合はひとまず以下のような設定ファイルを使用している

```
// .eslintrc.js
module.exports = {
    'env': {
        'browser': true,
        'jquery': true,
    },
    'extends': 'eslint:recommended',
    'rules': {
        'indent': [
            'error',
            2,
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'always',
        ],
    },
};
```

適宜既存の設定ファイルを参考にしたりして諸々修正したい。




## その他メモ

### エラーチェックをスルーしたい場合

以下の行はエラーとなる可能性がある。

```
new Vue({ // この行
  ~
});
```

[no-new - Rules - ESLint - Pluggable JavaScript linter](https://eslint.org/docs/rules/no-new)

要約すると「newした結果を変数に保存しないなら、そもそもそのクラスがコンストラクタでやっている処理は関数でやるべきだよね？」って感じ。

ただ今回のような場合は外部ライブラリを使用しており、流石にそれを弄るのは面倒。かといってエラーを放置するのも気持ち悪い。

以下のように書けば例外としてESLintはエラーをスルーする。

```
new Vue({ // eslint-disable-line no-new
  ~
});
```

`no-new`の部分は該当するチェック項目。ここを記述せず`eslint-disable-line`のみでもエラーは回避出来るが、その場合はあらゆるチェック項目をスルーしてしまう。

エラーとして表出されるべき項目もスルーされてしまう可能性があるので、出来ればピンポイントで問題となっている項目だけ指定すること。
