---
created_at: 2017-08-19
---

# JSでスクロールに応じて起動するアニメーションの実装例

スクロールに応じてアニメーションを起動するスクリプトを組む機会があり、以後同様の物を組む必要が出た時の為のメモ

[DEMO](./demo/index.html)

## ポイント

### data属性による微調整

以下のように、data属性を使用してアニメーションの微調整を出来るようにしている。

```
<p class="js-animation_target" data-animation-id="2" data-animation-type="fadeup" data-animation-after="1" data-animation-delay="200">〜</p>
```

JSでは、以下のようOR論理演算子を使用してdata属性が設定されている場合のみ値を適用するようなよくあるコードパターンを使用。

```
var after = $target.data('animation-after') || null;
```


### Promiseを使用して特定のアニメーション終了後に起動するよう設定可能に

`data-animation-delay`のみでもまぁ一応組めるんだけど、「アニメーション間の起動間隔は今のままで、全体をごそっと100ms早めたい」って時にそれぞれdelayの値を弄らないといけなくて面倒（そしてよくある）。

`data-animation-delay`で、特定idのアニメーションが終了後にアニメーションを実行するように出来るように。

単一idはもちろん、次のように複数idを指定してそれら全てのアニメーションが完了した際に実行するようにも出来る。

```
data-animation-after="[1, 3]">
```

コードは以下のようにしている。

```
var promiseList = [];
after.forEach(function(e, i, a) {
  var p = new Promise(function(resolve, reject) {
    var $afterTarget = $targets.filter('[data-animation-id=' + e + ']');
    $afterTarget.on('transitionend animationend', function() {
      resolve();
    });
  });
  promiseList.push(p);
});

// afterに設定されたアニメーションが全てresolveされ次第アニメーション起動
Promise.all(promiseList)
  .then(animate);
```

Promiseを使用しているためIE11が対象の場合は使用できないが、IE11はブラウザではないので問題ない。

万が一IE11なんていう糞なやつに対応しなければならない場合は書き直す必要があるので注意。
