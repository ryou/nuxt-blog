---
created_at: 2017-09-24
---

# Vueアプリを構築する際に、単一ファイルコンポーネントの機能を利用するか否か


## 単一ファイルコンポーネントの懸念点

主にCSSに関する懸念点がある。

単一ファイルコンポーネントでは以下の描き方でローカルスコープで閉じたスタイル指定が可能となっている。

```
<template>
  <h1>Dummy Text</h1>
</template>

<style scoped>
h1 {
  font-size: 12px;
}
</style>
```

これのコンパイル結果は以下のようなものとなる


```
<style type="text/css">
h1[data-v-0cf0b4a0] {
  font-weight: 12px;
}
</style>

<h1 data-v-0cf0b4a0="">Dummy Text</h1>
```

カスタムデータ属性を利用してコンポーネント毎に一意なIDを割り振ることでローカルスコープを実現している。


ここまで見れば問題ないかのように見える。

が、コンポーネントのネストが発生した際に問題がある。

例えば以下のような、コンポーネント内にコンテンツが入る前提のコンポーネントが存在しているとする。

```
<template>
  <section>
    <h1>Title</h1>
    <div class="content">
    </div>
  </section>
</template>

<style scoped>
h1 {
font-weight: bold;
}
</style>
```

この`.content`内に先程のコンポーネントを入れた場合、コンパイル結果は以下のようになる。

```
<style type="text/css">
h1[data-v-be49ad0e] {
  font-weight: bold;
}
</style>
<style type="text/css">
h1[data-v-1997de2c] {
  font-size: 12px;
}
</style>


<section data-v-be49ad0e="">
  <h1 data-v-be49ad0e="">Title</h1>
  <div data-v-be49ad0e="" class="content">
    <h1 data-v-1997de2c="" data-v-be49ad0e="">Dummy Text</h1>
  </div>
</section>
```

見て分かる通り、ネストされたコンポーネントには複数のIDが割り振られてしまい、結果親コンポーネントのスタイルの影響を受けてしまう。

スコープという概念から考えると親スコープの影響を受けるのは当然といえば当然だが、「単一ファイルコンポーネントだから名前被りを気にしなくても良い」なんて考えでいると痛い目を見る可能性がある。

例え単一ファイルコンポーネントだとしても、BEM等を利用して名前被りしない命名が必要となってくる。ただそうなってくるとコンポーネントスコープCSSという機能を利用するのに意味があるのか。

ちょっとここらへんまだまとまってないが、ひとまず下手に飛びつかないようにはしておきたい。


## 追記

[スコープ付き CSS · vue-loader](https://vue-loader.vuejs.org/ja/features/scoped-css.html)

> 子コンポーネントのルートノードは親のスコープの CSS と子のスコープの CSS の両方の影響をうけます。

**公式読めばルートノードは両方の影響受けるって書いてたわ**

影響を受けるのがルートノードだけであるなら、「コンポーネントルートのクラス名はコンポーネント名と同様にする」等のルールで問題なくなりそう。
