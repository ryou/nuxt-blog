---
created_at: 2019-04-06
---

# VSCodeでVueを書くときの諸々の設定

+ `Vetur`のインストール
+ `jsconfig.json`の作成
+ `vue`ファイルへの定義ジャンプを可能にする方法
+ ESLintでの保存時フォーマット

## `jsconfig.json`の作成

Vue CLIやNuxtの場合、最初から`@`や`~`といったエイリアスが用意されている。

エイリアスは`jsconfig.json`を用意してVSCodeに認識させないといけない。

設定内容は以下の通り

### Vue CLI

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  }
}
```

### Nuxt

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "*"
      ],
      "~/*": [
        "*"
      ],
      "@@/*": [
        "*"
      ],
      "~~/*": [
        "*"
      ]
    }
  }
}
```

## `vue`ファイルの定義ジャンプを出来るようにする

`vue`ファイルへの`F12`ショートカットでの定義ジャンプは、

+ `Vetur`のインストール
+ `jsconfig.json`の作成

をした上で、importの際に`.vue`拡張子を明示的に書いておかなければならない。

```js
// .vueは省略してはいけない
import ExampleComponent from '~/components/ExampleComponent.vue'
```

あと、`vue`ファイルから`vue`ファイルへの定義ジャンプは可能だが、`js`ファイルから`vue`ファイルへの定義ジャンプは出来なかったりする。（この点に関しては`js`ファイルから定義ジャンプすることはそんなに無いから問題にならないと思う）

## ESLintでの保存時フォーマット

[VSCode+Vue+ESLintで保存時フォーマット+コミット時にリント](../js-vue-vscode-format/)