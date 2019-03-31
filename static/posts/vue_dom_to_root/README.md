---
created_at: 2017-12-17
---

# [Vue.js]汎用的なツールチップの作成

ツールチップに汎用性を求める場合、ツールチップを起動するコンポーネントの子要素としてツールチップを配置してしまうと祖先要素に`overflow: hidden`が設定されている場合に、見切れてしまう可能性がある。

そのため、body直下にツールチップを配置する必要がある。公式サイトを見る限りではそのような手法は載っていなかったが、Vuetifyのツールチップの実装を見たら一応の解決法があったのでメモ。


## 結論

`mounted`タイミングで、DOMを移動させる。

[DEMO](./demo/index.html)


## 詳細

### ToolTipコンポーネント

```
<span
  class="ToolTip"
  @mouseenter="activate"
  @mouseleave="deactivate"
>
  <slot name="activator"></slot>
  <div
    class="ToolTip_content"
    :class="{
      '-active': isActive
    }"
    :style="contentStyleObj"
    ref="content"
  ><slot></slot></div>
</span>
```

```
Vue.component('tool-tip-component', {
  data: function() {
    return {
      isActive: false,
      contentPosition: {
        top: 0,
        left: 0,
      },
    };
  },
  template: '#tpl-tool-tip',
  methods: {
    activate: function(event) {
      const target = event.target;
      const rect = target.getBoundingClientRect();
      this.contentPosition.top = rect.top - 10;
      this.contentPosition.left = rect.left + rect.width/2;

      this.isActive = true;
    },
    deactivate: function() {
      this.isActive = false;
    }
  },
  computed: {
    contentStyleObj: function() {
      return {
        top: `${this.contentPosition.top}px`,
        left: `${this.contentPosition.left}px`,
      };
    },
  },
  mounted: function() {
    const app = document.getElementById('app');
    app.appendChild(this.$refs.content);
  },
});
```

```
.ToolTip {

}
.ToolTip_content {
  position: absolute;

  display: inline-block;

  padding: 5px 10px;
  border-radius: 3px;

  background: rgba(0, 0, 0, .8);
  color: #fff;
  box-shadow: rgba(0, 0, 0, .2) 2px 2px 10px;

  transform: translate(-50%, -100%);

  opacity: 0;
  transition: opacity .2s;
}
.ToolTip_content.-active {
  opacity: 1;
}
```

### 呼び出し元テンプレート

```
<tool-tip-component>
  <template slot="activator">
    <button type="button">Activator</button>
  </template>
  ツールチップの中身
</tool-tip-component>
```


### 解説

だらだらとソースを記載したが、結論にある通りキモなのは`mounted`タイミングの以下の処理。

```
mounted: function() {
  const app = document.getElementById('app');
  app.appendChild(this.$refs.content);
}
```

単純にDOMを移動させている。

Vuetifyのmixinである[detachable.js](https://github.com/vuetifyjs/vuetify/blob/dev/src/mixins/detachable.js)で同様の方法でbody直下に配置する必要があるコンポーネントのためのmixinとして処理が実装されていた。

「まぁそりゃこうやれば実装できるよな」と思いつつも、「フレームワークの機能外の方法で勝手にDOM操作していいの？バインディング切れたり仮想DOMで問題が出たりしないの？」という心配はすごくある。
