---
created_at: 2017-12-10
---

# [Vue.js]slotに関するメモ

[Demo](./demo/index.html)

## 概要

コンポーネントの内容を呼び出し元である程度自由にしたい場合、プロパティだけでは不十分な場合がある。

その場合にslotという機能を使用して、呼び出し元から柔軟にコンポーネントの内容を調整出来るようにする。

## スロットの種類

+ 単一スロット
+ 名前付きスロット
+ スコープ付きスロット

## 単一スロット

```
// btn-component
<div class="Btn">
  <slot></slot>
</div>
```

```
// 呼び出し元
<btn-component>ボタン</btn-component>
```

```
// 結果
<div class="Btn">
  ボタン
</div>
```

上記のように、コンポーネントに`slot`タグを配置しておくと、そこに呼び出し元でコンポーネントのタグ内に記述されたものがそのまま入る。


## 名前付きスロット

```
// app-component
<div class="App">
  <div class="App_header">
    <slot name="header"></slot>
  </div>
  <div class="App_content">
    <div class="App_contentInner">
      <slot name="content"></slot>
    </div>
  </div>
  <div class="App_footer">
    <slot name="footer"></slot>
  </div>
</div>
```

```
// 呼び出し元
<app-component>
  <template slot="header">
    Header
  </template>
  <template slot="content">
    Content
  </template>
  <template slot="footer">
    Footer
  </template>
</app-component>
```

```
// 結果
<div class="App">
  <div class="App_header">
    Header
  </div>
  <div class="App_content">
    <div class="App_contentInner">
      Content
    </div>
  </div>
  <div class="App_footer">
    Footer
  </div>
</div>
```

こちらは、一つのコンポーネントでスロットを複数使いたい場合のやり方。


## スコープ付きスロット

```
// clock-component
<div class="Clock">
  <div class="Clock_title">時計</div>
  <div class="Clock_time">
    <slot :hours="hours" :minutes="minutes" :seconds="seconds"></slot>
  </div>
</div>
```

```
// 呼び出し元
<clock-component>
  <template slot-scope="time">
    {{ time.hours }}:{{ time.minutes }}:{{ time.seconds }}
  </template>
</clock-component>
```

```
// 結果（例）
<div class="Clock">
  <div class="Clock_title">時計</div>
  <div class="Clock_time">
    11:34:23
  </div>
</div>
```

スロット内でコンポーネントから渡された情報を使いたい場合に使うスロット。

例では、時計コンポーネントをスコープ付きスロット機能を使って、時間の表示方法を弄れるようにしている。

公式サイトでは、子コンポーネントのプロパティが親コンポーネントに渡される例が示されていたが、そもそもプロパティは親が渡すものでプロパティ渡されても特にメリットが無く、最初はメリットがわからなかった。今回のように子コンポーネントで処理された後の値を渡してもらうといった際は非常に有用だと思う。
