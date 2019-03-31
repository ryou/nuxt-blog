---
created_at: 2017-10-22
---

# [Vue.js]フォームの必須バリデーション実装例

バリデーション関係はプラグインが結構あり、本来はそれを使うべきなんだろうけど勉強がてら実装。

細かいバリデーションはまだややこしいので必須チェックのみ。

[Demo](./demo/index.html)

## 詳細

### オブジェクトをループ処理したい場合はkeysを上手く使う

算出プロパティの`isValid`でやっているが、`Object.keys(someObject)`でキーの配列が取得出来るので、それに対して処理を行うことでオブジェクトの全キーに対して処理をすることが出来る。

`for in`は色々罠が多くて正直使いたくないのでこっちを覚えておきたい。

### コンポーネントのmodelオプション

```
<my-component v-model="hoge"></my-component>
```

このようにコンポーネントに対しv-modelを使った場合、これは以下の糖衣構文になる。

```
<my-component
  :value="hoge"
  @input="function() { hoge = value; }"
></my-component>
```

このまま使ってもいいが、コンポーネントに`value`というプロパティをv-modelとは別に渡したい時などに困る。

その際は、コンポーネントの`model`オプションを利用すればいい。

`radio-component`では以下のように記述している。

```
Vue.component('radio-component', {
  template: '#tpl-radio',
  props: {
    value: {
      type: String,
      default: '',
    },
    model: {
      type: String,
      default: '',
    },
  },
  model: {
    prop: 'model',
    event: 'update',
  },
});
```

`radio-component`にはプロパティとして`value`を使いたいため、`model`オプションでv-modelでは`model`プロパティをバインディングするよう変更している。

自作コンポーネントに対しv-modelを適用するような場合、明示的にバインディングするプロパティを指定するために`model`プロパティは指定するよう意識づけたほうがいいかもしれない。


## 参考

[Vue.jsのカスタムコンポーネントでradioボタンを使う - つくりおき](http://92thunder.hatenablog.com/entry/2017/10/15/155204)

[[Vue.js]BootstrapとVue.jsでイケてるフォームを実装する - atuweb : つながりを作るWebプログラマ](https://atuweb.net/201704_vue-bootstrap-form/)
