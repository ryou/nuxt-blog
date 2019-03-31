---
created_at: 2017-05-17
---

# [Vue.js]browserifyをVue.jsで利用する時の注意

Vue.jsを特に何も考えずbrowserifyでビルドすると以下のエラーが発生する時がある。

```
[Vue warn]: You are using the runtime-only build of Vue
where the template compiler is not available.
Either pre-compile the templates into render functions,
or use the compiler-included build.
```

## 解決法

package.jsonに以下の記述を追加する。

```
"browser": {
  "vue": "vue/dist/vue.common.js"
}
```

## 詳細

公式サイトに以下のように記述がある。

> もしその場でテンプレートをコンパイルする必要がある (例えば、 template オプションに文字列を渡す、もしくは DOM 内の HTML をテンプレートとして利用し要素にマウントする) 場合は、コンパイラすなわち完全ビルドが必要です。  
> vue-loader や vueify を利用する場合、 *.vue ファイルに中のテンプレートはビルド時に JavaScript に事前コンパイルされます。最終成果物の中にコンパイラは本当に必要なく、したがってランタイム限定ビルドを利用することが出来ます。

vue.jsにはテンプレートのコンパイラを含む物と含まないものが存在し、npm経由でインストールしたvue.jsはデフォルトでコンパイラを含まないランタイム限定ビルドを使用してしまう。vue-loaderやvueifyを使っている場合は事前にテンプレートがコンパイルされるため問題ないが、そうでなければ明示的にコンパイラを含む完全版のビルドを使うよう指定する必要がある。

前述の通りbrowserifyを使用する場合は、

```
"browser": {
  "vue": "vue/dist/vue.common.js"
}
```

をpackage.jsonに追記する必要があるという話。

## 参考

[インストール - Vue.js](https://jp.vuejs.org/v2/guide/installation.html#ランタイム-コンパイラとランタイム限定の違い)
