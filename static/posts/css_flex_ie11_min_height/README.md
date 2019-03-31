---
created_at: 2017-09-13
---

# FlexBoxを使って、コンテンツが少ないときでもFooter画面下端に配置する場合の注意

## 結論

[DEMO](./examples/example01.html)

## 詳細

諸々省略すると単純な実装は以下の通りになる。

[DEMO](./examples/example02.html)

```
<div class="l-app">
  <div class="l-app_header">Header</div>
  <div class="l-app_content"></div>
  <div class="l-app_footer">Footer</div>
</div>
```

```
.l-app {
  display: flex;
  flex-direction: column;

  min-height: 100vh;
}
.l-app_content {
  flex-grow: 1;
}
```

基本的にはこれだけでFooterの画面下端配置が可能になるが、IE11だけこれでは正常に動かない。

どうもIE11は`display: flex`な要素に`min-height`しか与えられていない場合、flex-itemが`min-height`を考慮出来ない模様。

理由はわからないが、`display: flex`なラッパーで囲めばIE11でも正常に動作する。

```
<div class="wrapper">
  <div class="l-app">
    <div class="l-app_header">Header</div>
    <div class="l-app_content"></div>
    <div class="l-app_footer">Footer</div>
  </div>
</div>
```

```
.wrapper {
  display: flex;
  flex-direction: column;
}
.l-app {
  display: flex;
  flex-direction: column;

  min-height: 100vh;
}
.l-app_content {
  flex-grow: 1;
}
```
