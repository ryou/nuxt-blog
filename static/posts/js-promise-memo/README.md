---
created_at: 2018-11-13
---

# [JavaScript] Promiseに関する覚書

仕様はMDNを参照

[Promiseを使う - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Using_promises)



以下のサンプルコード用の通信系の疑似関数として`get()`を用意。

```
function get() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const value = Math.random();
            if (value > 0.2) {
                console.log('get success.')
                resolve(value);
            } else {
                console.log('get error');
                reject(value);
            }
        }, 200);
    });
}
```

## 基本形

`then(onFullfilled, onRejected)`の`onRejected`は忘れていい。catchを使おう。

```
get()
    .then((value) => console.log('complete with: ' + value))
    .catch((value) => console.log('failure with: ' + value));
```

また、then内では必ず返り値を返すようにすること。返り値が無い場合の挙動に関して、ちゃんと書いてる文面が見つからなかったので念の為という感じ。これに関しては返り値がなかった場合の挙動の仕様を見つかれば考え直す予定。



## rejectの伝播

Promiseチェーンの途中でrejectが発生した場合、最初のcatchで処理される。

例外処理が共通の場合、一番最後にcatchをつけてそこでまとめて処理すれば簡潔。

```
get()
    .then(() => get())
    .then(() => get())
    .then(() => get())
    .then(() => get())
    .then(() => get())
    .then(() => console.log('complete'))
    .catch(() => console.log('failure'));
```

## 並列に繋ぎたい場合はPromise.allを使う

`Promise.all`内でrejectが発生した場合は、最初にrejectされた値をcatchに渡す。

```
Promise.resolve()
    .then(() => {
        const promises = [];
        promises.push(get());
        promises.push(get());

        return Promise.all(promises);
    })
    .then((values) => console.log('complete with:' + values))
    .catch((value) => console.log('failure with: ' + value));
```




## 豆知識

then内の返り値は、Promiseでない場合は内部的に`Promise.resolve()`でラップされる。

```
Promise.resolve()
    .then(() => {
        return 100;
    })
    .then((value) => {
        console.log(value);
        return Promise.resolve(100);
    })
    .then((value) => console.log(value));
```

then内のthrowは、Promise.rejectを返すのと同様の動きをする。

```
Promise.resolve()
    .then(() => {
        return Promise.reject(100);
    })
    .catch((value) => console.log('reject with: ' + value));
```
