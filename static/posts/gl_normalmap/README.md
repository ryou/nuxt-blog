---
created_at: 2018-07-25
---

# ノーマルマップに関して覚書

ノーマルマップを自前で実装する際に学んだことをメモ。

前提として、右手系で考える。


## OpenGLとDirectXで法線マップ画像が異なる理由

OpenGL用では緑が強いほど上方向へ傾いているがDirectX用では下方向に傾いており、Y軸に関して逆になっている。これは、OpenGLが右手系、DirectXが左手系と座標系が異なる事に起因している。

テクスチャに対して、手前をZ軸正方向、右をX軸正方向とすると、Y軸正方向は右手系と左手系とでどうしても逆になってしまう。そのため、OpenGLとDirectXで法線マップ画像が異なっている。


## 接空間

法線マップは接空間上のベクトルを表現している。そのため右手系において、頂点に対して頂点法線をZ軸、UV座標のV軸正方向をY軸、U軸正方向をX軸とする接空間を考える。さらに接空間のZ軸をNormal、Y軸をBinormal、X軸をTangentと定義する。

### 外積によるTangent、Binormalの計算

2ベクトルの外積は、その2ベクトルが成す面に対して垂直なベクトルである。

そのため、説明記事によっては以下の方法でTangent/Binormalを算出出来ると書いているものがある。

```
var tangent = cross(normal, vec3(0.0, 1.0, 0.0));
var binormal = cross(n, t);
```

しかし、外積は同じ向きor逆方向の場合に結果が0ベクトルとなってしまう。そのため`normal = vec3(0.0, 1,0, 0.0)`の時等で結果がおかしくなってしまう。

さらに、この方法だとTangentやBinormalがUV座標のU軸/V軸と一致している保証がない。頂点(0, 1, 0)においてUV(0, 0)で頂点(0, -1, 0)においてUV(0, 1)となるようなUVマップのように、ローカル座標Y軸負方向に行くほどVが大きくなるようなUVマップもありえる。UV座標のU軸がTangent、V軸がBinormalと対応していると定義しているのに、そのTangent/Binormalの算出にUV情報を用いないためこの方法では正確な法線情報が算出出来ない。

### deltaPosition, deltaUVによるTangent, Binormalの計算

参考：[チュートリアル13:法線マッピング](http://www.opengl-tutorial.org/jp/intermediate-tutorials/tutorial-13-normal-mapping/)

各三角面毎に頂点のTangent/Binormalを、頂点座標とUV座標の変化を元に算出する方法。

三角ポリゴンの頂点v0,v1,v2において、v0のTangent/Binormalは以下の式で算出出来る。（以下は擬似コード）

```
var deltaUV1 = v1.uv - v0.uv;
var deltaUV2 = v2.uv - v0.uv;
var deltaPos1 = v1.position - v0.position;
var deltaPos2 = v2.position - v0.position;

var r = 1.0 / (deltaUV1.x * deltaUV2.y - deltaUV1.y * deltaUV2.x);
var tangent = (deltaPos1 * deltaUV2.y - deltaPos2 * deltaUV1.y) * r;
var binormal = (deltaPos2 * deltaUV1.x - deltaPos1 * deltaUV2.x) * r;
```

この計算式を利用して、モデルの頂点座標/UVデータを元に算出しシェーダーへuniformとして送る。


## ローカル空間における法線情報の算出

ローカル空間におけるNormal/Tangent/Binormalがあれば、以下の式でローカル空間における法線情報を導く事が出来る。

```
var sampleNormal = texture2D(normalTex, uv);
sampleNormal = (sampleNormal * 2.0) - 1.0; // -1.0~1.0の範囲に収める
var localNormal = tangent * sampleNormal.x + binormal * (-1.0 * sampleNormal.y) + normal * sampleNormal.z;
```

`(-1.0 * sampleNormal.y)`というように、Yに関して反転させているのは、テクスチャはUV座標系において上下反転するから。


## 参考サイト

[その５ 0から学ぶ法線マップ](http://marupeke296.com/DXPS_S_No5_NormalMap.html)

[チュートリアル13:法線マッピング](http://www.opengl-tutorial.org/jp/intermediate-tutorials/tutorial-13-normal-mapping/)
