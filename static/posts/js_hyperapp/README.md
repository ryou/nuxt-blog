---
created_at: 2017-12-29
---

# hyperappを（一部）読んだ

[hyperapp](https://github.com/hyperapp/hyperapp)が300行程度のフロントエンドフレームワークとして話題になっていたので読んでみた。

結論から言うと、量が少ないから読みやすいかと思いきや、行数節約のために結構自分からしたら変な書き方が散見されており、全部読み切る気が途中でなくなってしまった。

というものの、途中まででも学ぶことは結構あったのでメモとして残しておく。


## 新しく知った内容

### `&&`をつかったイディオム

[論理演算子 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_Operators)

```
var hoge = '';
var fuga = 'fugafuga'

var foo = hoge && fuga;
console.log(foo); // => ''

var bar = hoge || fuga;
console.log(bar); // => 'fugafuga'
```

上記のように、

+ `a && b`はaがfalseと評価される値ならaが結果として返され、それ以外ならbが返される
+ `a || b`はaがtrueと評価される値ならaが結果として返され、それ以外ならbが返される


### 関数は`argument`という引数が格納されている配列を持つ

```
function hoge(a, b) {
  if (arguments.length < 2) {
    console.log('require 2 arguments');
    return;
  }
  console.log(a + b);
}

hoge(1); // => require 2 arguments
```

上記のように、javascriptの関数は`arguments`という引数が格納されている配列を持っている。



## hyperappの読みにくい部分

### for文の通常とは異なる記述方法

例えばこれ

```
for (i = node.length; i--; ) {
  stack.push(node[i])
}
```

読めることは読めるが、一瞬詰まってしまう。

```
for (i = node.length; i > 0; i-- ) {
  stack.unshift(node[i])
}
```

このように普通の書き方で書いてほしい。

というかそもそも、スタックではなくキューを使えば普通に前からループさせることが出来るのでは。

具体的には

```
var node
var stack = []
var children = []

for (var i = arguments.length; i-- > 2; ) {
  stack.push(arguments[i])
}

while (stack.length) {
  if (Array.isArray((node = stack.pop()))) {
    for (i = node.length; i--; ) {
      stack.push(node[i])
    }
  } else if (null == node || true === node || false === node) {
  } else {
    children.push(typeof node === "number" ? node + "" : node)
  }
}
```

これを、

```
var node
var queue = []
var children = []

for (var i = 2; i < arguments.length; i++) {
    queue.push(arguments[i]);
}
while (queue.length > 0) {
  node = queue.shift();
  if (Array.isArray(node)) {
    queue = node.concat(queue);
  } else if (null == node || true === node || false === node) {
  } else {
    children.push(typeof node === "number" ? node + "" : node)
  }
}
```

こう


### 他

挙げれば色々あるが、引数を別の用途で使用したり、制御構文の条件判断の中で代入処理等を行っていたりと、正直読み辛い部分が多かった。

パフォーマンスに影響が大きい部分ならともかく、読んだ限り片っ端からコードを短くしようとしている感じがあって、コードオリンピックじゃあるまいしもうちょっと普通の書き方をしれくれてもいいのでは…という感じ
