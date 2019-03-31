---
created_at: 2017-11-12
---

# [JavaScript] JS関係で最近知ったこと

[PixiJS](http://www.pixijs.com/)を使用して簡単な縦シューティングゲームを作ってみようと思いJSを書いていたら、色々と便利な物を見つけたのでメモ。

## オブジェクトをマージする`Object.assign`

jQueryの`$.extend`と同様にオブジェクトをマージしてくれる。

以下のように、引数としてオプションを受け取るようなパターンでデフォルト値とマージする時に役立つ。

```
class Bullet {
  constructor(inOption) {
    this.option = {
      position: {
        x: 0,
        y: 0,
      },
      spd: 0,
      rotation: 0,
    };

    Object.assign(this.option, inOption);
  }
}

const bullet = new Bullet({
  spd: 10,
});

console.log(bullet);
/*
Bullet { option: { position: { x: 0, y: 0 }, spd: 10, rotation: 0 } }
*/
```

## ベクトルからラジアンを返却してくれる`Math.atan2`

`Math.atan`の場合は返却値が`-PI/2`から`PI/2`のため、それ以外のパターンに関しては結構面倒くさい条件分岐を書かなければならなかった。

`Math.atan2`の場合は`-PI`から`PI`を返却してくれるので、`Math.atan`のように条件分岐を書く必要が無いので非常に楽。

注意しなければならないのは`Math.atan2(y, x)`というように、引数が`(y, x)`の順番な点。何も考えずに書くと絶対にx座標を先に書いてしまう。
