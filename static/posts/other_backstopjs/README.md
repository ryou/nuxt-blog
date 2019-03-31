---
created_at: 2017-11-15
---

# BackstopJSの使い方

[BackstopJS](https://github.com/garris/BackstopJS)

## 準備

### ローカルにインストール

```
npm i -D backstopjs
```

### 設定ファイルを生成

```
npx backstop init
```

## 設定ファイルの書き方

設定項目は色々あるが、基本`scenarios`と`viewports`だけ弄れば使える。

### scenarios

```
{
  ~
  "scenarios": [
    {
      "label": "Top Page",
      "url": "http://localhost:8000/index.html",
      "delay": 1000
    }
  ],
  ~
}
```

`label`は生成するスクリーンショット等で使われるラベル。当然半角英数推奨。

他は名前のまま。

### viewports

見たらわかるけど、ブラウザサイズを指定する。

```
{
  "viewports": [
    {
      "label": "phone",
      "width": 320,
      "height": 480
    },
    {
      "label": "tablet",
      "width": 1024,
      "height": 768
    }
  ],
  ~
}
```


## 使い方

### 比較元となる画像ファイルの生成

```
npx backstop reference
```

### 比較元画像と現状との比較処理

```
npx backstop test
```

### 比較元画像を現状で更新

```
npx backstop approve
```


## その他

### 一部キャプチャの取得に失敗する

色々なケースがあると思うが、可能性として使用済みポートを使ってしまい失敗している可能性がある。

自分の場合は、ポート9252~9254が使用済みにも関わらず使用してしまっており、失敗していた。

```
lsof -i:9252
```

おそらく、プロセスが残りっぱなし等が理由。再起動でポート解放し一旦解決した。

## 難点

### 処理に時間が結構かかる

実際にHTMLを解釈して（GUIはないものの）レンダリング処理をする必要がある都合上か、１ページ毎の処理に結構時間がかかってしまう。

ページ数が10程度ならともかく、100単位のチェックだと数分かかってしまい待ち時間が発生してしまうのが難点。
