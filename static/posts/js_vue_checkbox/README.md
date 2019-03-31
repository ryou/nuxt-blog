---
created_at: 2017-10-15
---

# [Vue.js] 見た目をカスタマイズしたチェックボックスの実装例

[Demo](./example/index.html)


## ソース

### HTML

```
<label class="m-check">
  <input
    type="checkbox"
    class="m-check_input"
    :checked="value"
    @change="updateValue($event.target.checked)"
  >
  <span class="m-check_body">
    <span class="m-check_square"></span>
    <span class="m-check_txt">
      <slot></slot>
    </span>
  </span>
</label>
```

### JS

```
Vue.component('check-component', {
  data: function() {
    return {};
  },
  props: ['value'],
  methods: {
    updateValue: function(value) {
      this.$emit('input', value);
    },
  },
  template: '#tpl-check',
});
```

### 呼び出し方

```
<check-component v-model="isAgree">利用規約に同意する</check-component>
```

## 解説

[コンポーネント — Vue.js](https://jp.vuejs.org/v2/guide/components.html#%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%9F%E3%83%95%E3%82%A9%E3%83%BC%E3%83%A0%E5%85%A5%E5%8A%9B%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88)

上記リンクに記載の通り、

```
<check-component v-model="isAgree">利用規約に同意する</check-component>
```

は以下の糖衣構文になる。

```
<check-component
  :value="isAgree"
  @input="function(value) {isAgree = value}"
>
  利用規約に同意する
</check-component>
```

なので、`check-component`に対して必要な作業は

+ `isAgree`とバインディングする`prop`として`value`を追加
+ チェックボックスの状態が変化した際に、`input`イベントをチェックボックスの現在の状態と共にemit

である。

これに従って実装すれば前述のようなソースになる。
