---
created_at: 2019-04-03
---

# [VSCode]jsconfig.jsonに関して

[jsconfig.json Reference](https://code.visualstudio.com/docs/languages/jsconfig#_jsconfig-options)

VSCodeのJSに関する設定ファイル

## include/exclude

プロジェクトのソースコードとして認識させるファイル群をホワイトリスト/ブラックリスト形式で指定する。両方共globパターンが使用できる。

注意点は`include`や`exclude`によって除外されたファイルも検索対象ではあるということ。ファイルを解析の対象から除外することでパフォーマンスの向上を目論むのが主目的みたい。例えば、この設定をしておくとminifyされ出力されたファイルをうっかり開いてしまってファイルの解析が始まりもたつくみたいな事がなくなるとかそういうあれ。


ドキュメントには記載が見当たらなかったけど、`.gitignore`されているファイルに関してはデフォルトで無視されてる感じがする。

それぞれの書き方は以下の通り、

```json
{
  "exclude": {
    "node_modules"
  }
}
```

```json
{
  "include": {
    "src/**/*"
  }
}
```

`include`が指定されていない場合、ワークスペース内の全ファイルがソースコードとしてみなされる。

## `compilerOptions`配下のオプション

オプション|説明
---|---
noLib|`lib.d.ts`をincludeしない
target|どの`lib.d.ts`を使用するか。"es3", "es5", "es6", "es2015", "es2016", "es2017", "es2018", "esnext"のどれかを指定
checkJs|JavaScriptファイルの型チェックを有効にする
experimentalDecorators|提案段階のESデコレータの試験的サポートを有効にする
allowSytheticDefaultImports|`export default`が存在しないモジュールからの`import default`を許可する。これはチェックするだけで出力されるコードには影響しない。
baseUrl|相対パス指定されていないモジュールを解決するためのベースディレクトリ
paths|baseUrlを基準とした相対パスのパスマッピング

`checkJs`あたりは、JSでもできる範囲で型チェックしてくれるので結構使い所が多いかもしれない。

### `lib.d.ts`

[lib.d.ts - TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive/type-system/lib.d.ts#lib-d-ts)

JSの標準関数とかブラウザ標準API関係の型定義ファイルみたい。

### VSCodeにwebpackとかVueCLIとかでよくあるaliasを認識させる

`baseUrl`と`paths`を指定することで認識させる。

例えば、`@`が`src`のエイリアスである場合、

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

と書けばいい。エイリアスを利用しているプロジェクトでは絶対設定したい。
