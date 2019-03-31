---
created_at: 2017-05-19
---

# [node.js]細かいことメモ

## ローカルにインストールしたパッケージをターミナルから実行したい

`./node_modules/.bin`内に実行ファイルがあるので

```
./node_modules/.bin/[パッケージ名]
```

で実行可能。

browserifyなら

```
./node_modules/.bin/browserify -h
```

で実行できることを確認出来る。

## 「npm run」の&と&&の違い

[Grunt/Gulpで憔悴したおっさんの話 - MOL](https://t32k.me/mol/log/npm-run-script/)

&&は直列、&は並列


## 「npm install --save」と「npm install --save-dev」の違い

### 結論

`--save`は`package.json`の`dependancies`、`--save-dev`は`devDependancies`に追加される。

### 詳細

`devDependancies`は名前の通り開発時に必要なパッケージ群なので、npmに公開したりする時に動作自体に必要なパッケージを`--save-dev`してしまうと動かない。あとHerokuでも動作に必要なパッケージを`--save-dev`してしまっていると動かなかった。

判断に迷ったらとりあえず`--save`しとけば良いと思った。

### 省略系

`--save`は`-S`、`--save-dev`は`-D`と書ける。

```
npm install --save
npm i -S

npm install --save-dev
npm i -D
```



## package-lock.jsonの意味

細かいバージョンを記録して、バージョンの違いによる挙動差異をなくす

[webのプロジェクトフォルダ直下のファイルの意味をまとめてみた - Qiita](http://qiita.com/tonkotsuboy_com/items/99b665cecf16f5ac037d)


## nodeとnpm run-scriptでの引数の渡し方の違い

### 結論

```
npm run [コマンド名] -- [引数]
```

### 詳細

たとえば`npm i -D node-sass`をして、`package.json`に

```
{
  ~
  "scripts": {
    "sass": "node-sass"
  },
  ~
}
```

のように書いて`npm run sass`でローカルの`node-sass`を実行出来るようにしたとする。

通常`node-sass`のヘルプを見たい場合

```
# グローバルインストールされている
node-sass --help

# ローカルインストールされているやつをパス指定で呼び出す
./node_modules/.bin/node-sass --help
```

`npm run-script`においても同様に

```
npm run sass --help
```

とすれば出来そうだが、結果は

```
Top hits for "run" "sass"
————————————————————————————————————————————————————————————————————————————————
npm help scripts                                                          run:38
npm help config                                                           run:30
（中略）
npm help edit                                                              run:1
npm help shrinkwrap                                                        run:1
————————————————————————————————————————————————————————————————————————————————
(run with -l or --long to see more context)
```

な感じになる。

`npm run-script`で引数を渡す場合は`--`の後に記述しないといけない。

今回の場合は、

```
npm run sass -- --help
```

となる。

### 参考

[run-script | npm Documentation](https://docs.npmjs.com/cli/run-script)
