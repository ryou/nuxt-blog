---
created_at: 2018-04-18
---

# モデルビューワーメモ

勉強のために、モデルを回転・拡大・移動させる簡易ビューワーを作成した。

[GitHub Pages](https://ryou.github.io/unitychan-viewer/Dist/)

その際に詰まったことや学んだことのメモ。


## マウスの座標を取得

`Input.mousePosition`で取得可能。

ウィンドウの左下を(0, 0, 0)として現在のマウスポインタのピクセル座標をVector3として返却。（zは常に0）


## C#にはstaticなローカル変数が無い

[JavaScriptとかC#でstaticローカル変数の代わり - Qiita](https://qiita.com/dskssk/items/c5fc335d327edc03c168)

一応上記のように無理やり同様の事をやることはできるが、素直にフィールドに変数用意してやるほうが素直でいいと思う。


## Quaternionの合成に関して

とあるオブジェクトの角度を(90, 90, 0)にしたい場合

```
this.transform.rotation = Quaternion.Euler(90, 90, 0);
```

とやると、当然(90, 90, 0)になる。


ところが、

```
this.transform.rotation = Quaternion.Euler(0, 45, 0);
this.transform.rotation = Quaternion.Euler(90, 0, 0) * this.transform.rotation;
this.transform.rotation = Quaternion.Euler(0, 45, 0) * this.transform.rotation
```

とやると目的の角度にならない。

これは実際に指を使って「X軸中心に45度回転し、Y軸中心に90度回転した後、更にX軸中心に45度回転」という事をやってみると直感的には理解できた。

ただまだ直感的な理解しか出来ていないので、ひとまず「Quaternionの*演算子による合成は、直感と異なる結果になりやすいので極力避ける」という形で対応することに。

## ローカルでHTTPサーバーを用意

Node.jsの`http-server`を使えばいい


## DOTweenでなめらかに動かす

[DOTweenをふわっとまとめてみた - Qiita](https://qiita.com/kagigi/items/bdf4d42835add07b0077)

カメラを初期状態に戻す際に使用。jQueryのanimateやCSS Animationみたいな感じで手軽に使える。

基本ワールド座標を基準に行われ、ローカル座標を基準に行いたい場合は`DOLocalMove`等Localをつける必要があるので注意。
