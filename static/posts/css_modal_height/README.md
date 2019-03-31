---
created_at: 2017-09-08
---

# 画面中央配置のサイズ固定モーダルで、ブラウザの高さが狭くなった際に縮める方法

## デモ

[DEMO](./examples/index.html)

## 詳細

普通は中央配置をする際

```
.modal {
  width: 800px; height: 600px;

  position: fixed;
  left: 50%; top: 50%;
  margin-left: -400px;
  margin-top: -300px;
}
```

というように、'top','left'とマイナスマージンを利用して行う。

これだと、ブラウザの高さが縮まった際にモーダル上下が単純に切れてしまうので、ブラウザが特定の高さより縮まった際のみモーダルも縮むようにしたい。

それは以下のように変えれば可能。

```
.modal {
  width: 800px; height: 90vh;
  max-height: 600px;

  position: fixed;
  left: 50%; top: 50%;
  margin-left: -400px;
  transform: translateY(-50%);
}
```

`height`,`max-height`,`transform`が変更した箇所。
