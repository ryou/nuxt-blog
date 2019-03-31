---
created_at: 2018-05-10
---

# UI上に2D、3Dモデルを配置する方法

[Demo](https://ryou.github.io/unity-model-on-ui/Dist/)

## 概要

+ UI用のカメラを配置
+ UI用のカメラは、UIレイヤーのみを表示するようにCullingMaskを設定


## UI用のカメラを配置

UI上には通常UI部品しか配置出来ない。

ただ、UIを表示する用のカメラを配置し、そのカメラにUIを描画させることでモデルをUI上に描画させることが出来る。

手順としては

1. 新規で適当にCameraを配置し、AudioListenerを削除
1. CanvasのRenderModeを`Screen Space - Camera`に

## UI用のカメラは、UIレイヤーのみを表示するようにCullingMaskを設定

カメラはデフォルトで全レイヤーを描画しようとしてしまう。

そのため、UIよりカメラに近いモデルがあれば、それをUIより手前に描画しようとしてしまう。

なので、`CullingMask`にUIのみを設定し、UIレイヤー上のオブジェクトのみ描画するようにする。


## 問題点（解決）

（追記）以下は完全に勘違い。`SetParent`の第二引数がtrueだと親の状態によって子のScaleを良い感じに調整されるのだが、これがデフォルトtrueなため影響を受けてしまっていたのが原因。

`ScreenSpace Camera`なCanvas内に動的にUIを追加すると、何故かUIのScaleが勝手に弄られてしまう。CanvasScalerの`UI Scale Mode`が`Constant Pixel Size`の時は、CameraのSize（Orthographicの場合）を見てCanvasのScaleを自動調整してくれるのだが、動的に追加されたUIは、`CanvasのScale * 追加したUIのScale = 1`になるようにScaleが設定されてしまう。CanvasのScaleが0.5とかの場合、追加UIのScaleは2になってしまっている。

挙動はわかったが、解決法がわからない。とりあえず`Constant Pixel Size`は諦めて`Scale With Screen Size`とかでお茶を濁すしか無い。この方法を使う場合は、UI用のカメラのsizeをCanvasのscaleが1になるように調整し、なおかつ、CanvasのPosZが0になるようにカメラのZを調整しないといけない。


## 参考

[UnityでuGUIを使ったUIに3Dオブジェクトを表示させたい - hildsoftのコード置き場](http://code.hildsoft.com/entry/2018/01/10/090000)
