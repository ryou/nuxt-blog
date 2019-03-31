---
created_at: 2017-12-08
---

# [Vue.js] コンポーネントのバリエーションを指定する方法

以下のようなHTMLが存在する。

```
<div class="Btn"></div>

<div class="Btn -primary"></div>

<div class="Btn -secondary"></div>

<div class="Btn -disabled"></div>
```

これを

```
<btn-component></btn-component>
```

このように`btn-component`としてVueコンポーネントした場合、どのようにバリエーション（デフォなのかprimaryなのかsecondaryなのか）を指定するのかは色々方法はあると思うが、自分が良いと思った手法をメモとして残しておく。


## 結論

[Demo](./demo/index.html)

以下のような方法で指定する。

```
<btn-component>Default</btn-component>
<btn-component color="primary">Primary</btn-component>
<btn-component color="secondary">Secondary</btn-component>
<btn-component disabled>Disabled</btn-component>
```

```
<template>
  <div class="Btn" :class="rootClass">
    <slot></slot>
  </div>
</template>

<script>
var BtnComponent = {
  template: '#tpl-btn',
  props: {
    color: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    rootClass: function() {
      var classObj = {
        '-disabled': this.disabled,
      };

      if (this.color) classObj[`-${this.color}`] = true;

      return classObj;
    },
  },
};
</script>
```

## 解説

`color`に関してはわかりやすく、プロパティとして呼び出しの際に文字列を渡す事によってバリエーションを指定する。色指定のような一つの項目に対して複数のパターンがあるような物はこのように指定する。

`disabled`に関しては少し特殊で、呼び出しの際に

```
<btn-component disabled></btn-component>
```

のように、呼び出している。これは

```
<btn-component disabled="true"></btn-component>
```

と同じ意味で、`disabled`プロパティに`true`を渡している。

公式には記載が無かったが、プロパティの値を指定しなかった場合はtrueが渡される模様。

公式サイトには記載が無いものの、有名所のVueフレームワークであるvuetifyがこの手法を使用しているので自分も同様に使うことにした。
