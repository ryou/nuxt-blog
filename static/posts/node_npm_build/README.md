---
created_at: 2017-05-19
---

# npm runでのビルドを試してみた

タスクランナーにはまだGulpを使っていたんだけど、[Grunt/Gulpで憔悴したおっさんの話 - MOL](https://t32k.me/mol/log/npm-run-script/)とかを過去に見た記憶から`npm run`でのビルドを試したくなったので試した。


## 結論

[ryou/npm_build_test: npmで諸々をビルドしてみるテスト](https://github.com/ryou/npm_build_test)

遅い。

scssファイルを更新したら即browser-sync経由でブラウザに反映されて欲しい（これが遅いとコーディングの速度が顕著に落ちる）んだけど、この方法だと2~3秒かかってしまう。

もしかしたら自分のビルド方法が悪いかもしれないんだけど、現状解決法がわからないのでやっぱり引き続きGulpを使っておこうかなと。

### 出来上がったpackage.json

```
{
  "name": "project-name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "sass": "./node_modules/.bin/node-sass ./src/sass -o ./dist/css",
    "postcss": "./node_modules/.bin/postcss ./dist/**/*.css -b ./dist -d ./dist --no-map  --use autoprefixer --autoprefixer.browsers 'last 2 versions'",
    "build:js": "./node_modules/.bin/browserify -e ./src/js/main.js -o ./dist/js/bundle.js",
    "build:css": "npm run sass && npm run postcss",
    "build": "npm run build:js && npm run build:css",
    "watch:js": "./node_modules/.bin/watch 'npm run build:js' ./src/js",
    "watch:css": "./node_modules/.bin/watch 'npm run build:css' ./src/sass",
    "watch": "npm run watch:js & npm run watch:css",
    "bs": "./node_modules/.bin/browser-sync start -s './dist' -f './dist'",
    "start": "npm run watch & npm run bs"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "autoprefixer": "^7.1.1",
    "browser-sync": "^2.18.11",
    "browserify": "^14.3.0",
    "node-sass": "^4.5.3",
    "postcss-cli": "^4.0.0",
    "watch": "^1.0.2"
  }
}
```
