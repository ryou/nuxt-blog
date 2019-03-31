---
created_at: 2017-12-12
---

# [JavaScript] イベントオブジェクトに関して

[DEMO](./demo/index.html)

※クリックの際に座標とtargetに関する情報を流している。

## クリック座標関係

|プロパティ名|備考|
|:----|:----|
|offsetX/Y|targetの左上からの相対座標|
|pageX/Y|documentの左上からの相対座標|
|clientX/Y|ブラウザの左上からの相対座標|

## targetとcurrentTarget

`target`はイベントが発火された要素で`currentTarget`はイベントリスナが登録された要素。

DEMOでは、`.box`にイベントリスナと登録しているが、バブリングにより`.btn`をクリックした際でもイベントが発火する。

そのため、`.btn`をクリックした際は

```
target => .btn
currentTarget => .box
```

となり、`.box`をクリックした際には

```
target => .box
currentTarget => .box
```

となる。
