---
created_at: 2017-05-21
---

# ES5に関して、自分が使いそうな機能のメモ

あまりES4/ES5/ES6の違いを意識しておらず、まだES4の書き方をしてしまっている部分が多そうなので手始めにES5で使いそうな機能を調べた。

ちゃんと覚えておいてES4までの古い情報に惑わされないようにしたい。


## use strict

知識として知ってはいるものの、使ったことがない。  
これに関して書き出すと長くなりそうなので別の記事で書きたい。

## Date.now

何の気なしに使ってた。ES5からってこと知らなかった。

現在のミリ秒単位のUnixTimeを返す。

## JSON.parse / JSON.stringify

JSON文字列⇔オブジェクトの変換。

```
var obj = {
  name: 'tadashi',
  age: 20
};

var jsonStr = JSON.stringify(obj);

console.log(jsonStr); // => {"name":"tadashi","age":20}

var parsedObj = JSON.parse(jsonStr);

console.log(parsedObj); // => { name: 'tadashi', age: 20 }
```

## Array関係

配列関係は有用な物が多い。

### Array.isArray

配列かどうかを判断する。

```
var nums = [1, 2, 3];

console.log(Array.isArray(nums)); // => true

console.log(nums.isArray); // これはダメ
```

### Array.prototype.indexOf / Array.prototype.lastIndexOf

引数として渡された物と配列内の各要素が「===」で比較され、indexOfは最初に一致した要素、lastIndexOfは最後に一致した要素の添字を返す。

### Array.prototype.every / Array.prototype.some

everyは渡した関数で評価した結果、全部trueならtrue、一つでもfalseならfalseを返却。

someは一つでもtrueならtrueを返却。

```
var nums01 = [4, 3, 6, 8];
var nums02 = [1, 2, 5, 3];

var biggerThan2 = function (val) {
  return val > 2;
};

console.log(nums01.every(biggerThan2)); // => true
console.log(nums02.every(biggerThan2)); // => false

console.log(nums01.some(biggerThan2)); // => true
console.log(nums02.some(biggerThan2)); // => true
```

### Array.prototype.forEach

めっちゃ使ってるので今更書くものでも。


### Array.prototype.map

引数として渡された関数に従って配列の各要素が処理される。  

注意として非破壊的メソッドなので返却値を受け取らないといけない。

```
var nums = [1, 2, 3];

nums = nums.map(function(e, i, a) {
  return e * 2;
});

console.log(nums); // => [ 2, 4, 6 ]
```


### Array.prototype.filter

引数として渡された関数に従って配列の各要素が評価され、trueがreturnされたものだけで構成された配列を返却する。

```
var nums = [1, 2, 3];

nums = nums.filter(function(e, i, a) {
  return e > 2;
});

console.log(nums); // => [ 3 ]
```


### Array.prototype.reduce / Array.prototype.reduceRight

配列の1番目と2番目を渡した関数を使って処理、その結果と配列の3番目を使って同様に処理、を繰り返す。

reduceRightは順番が逆になる。

使うかどうかは微妙。一応あるってことだけは覚えておきたい。

```
var nums = [1, 2, 3, 4, 5];

var result = nums.reduce(function(a, b, index, array) {
  console.log('a: ' + a);
  console.log('b: ' + b);

  return a + b;
});

console.log('result: ' + result);
```

```
a: 1
b: 2
a: 3
b: 3
a: 6
b: 4
a: 10
b: 5
result: 15
```



## 参考

[ES2015(ES6)な時代だからこそ、ES5を改めて調べたJavaScript初級者のメモ - Qiita](http://qiita.com/zaru/items/d833dca52962c3f7770f)
