---
created_at: 2018-01-01
---

# [JS] シャローコピーとディープコピー


## 結論

ディープコピーしたいなら`lodash`の`cloneDeep`を使え。


## シャローコピーとディープコピー

+ シャローコピー：参照を維持しているコピー
+ ディープコピー：参照を切ったコピー


### シャローコピーの方法

普通に代入すれば良い

```
var original = [0, 1, 2];
var copy = original;

copy[0] = 3;

console.log(copy); // => [ 3, 1, 2 ]
console.log(original); // => [ 3, 1, 2 ]
```


### ディープコピーの方法

こちらは一筋縄では行かない。

結論から言うと、`lodash`の`cloneDeep`を使うのが一番。

#### `Object.assign`の問題

`Object.assign`はディープコピーする方法としてよく紹介されているがディープコピされるのは１階層目だけで、２階層目以降は普通にシャローコピーされる。

```
var original = {
  name: 'article name',
  date: {
    created: '20171201',
    updated: '20171202',
  },
};

var copy = Object.assign({}, original);

copy.name = "copy article";
copy.date.updated = '20180101';

console.log(copy);
console.log(original);
```

出力はこう

```
{ name: 'copy article',
  date: { created: '20171201', updated: '20180101' } }
{ name: 'article name',
  date: { created: '20171201', updated: '20180101' } }
```

単純なオブジェクト等では問題なくディープコピーされるため、問題なく使えそうに見えやすく逆にハマってしまうとやばそう。

#### `JSON.parse/stringify`の問題

こちらもJSによるディープコピーの方法としてよく紹介されている。

こちらはプロパティにfunctionやundefinedがあると、そのプロパティ自体が消えてしまう問題がある。（JSON.stringifyするのだから当然といえば当然）

```
var original = {
  count: 0,
  countUp: function() {
    this.count++;
  },
  countDown: function() {
    this.count--;
  },
};

var copy = JSON.parse(JSON.stringify(original));
copy.countUp(); // error
```


というわけで`lodash`を使おう。


## 参考

[ES6のObject.assignがシャローコピーなのでディープコピーする方法を考える | Black Everyday Company](https://kuroeveryday.blogspot.jp/2017/05/deep-clone-object-in-javascript.html)
