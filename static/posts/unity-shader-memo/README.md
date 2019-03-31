---
created_at: 2018-04-21
---

# Unityのシェーダーに関して

## Unityのシェーダーの種類

Unityのシェーダーには以下の３種類が存在する。

+ Surface Shader
+ 頂点シェーダーとフラグメントシェーダー
+ 固定関数シェーダー

「Surface Shader」は簡単だが出来ることに制限がある、「頂点シェーダーとフラグメントシェーダー」は難しいが出来ることに制限がない（いわゆる一般的なプログラマブルシェーダー）、「固定関数シェーダー」は古いグラフィクスカード用のシェーダー

## Surface Shader

[7日間でマスターするUnityシェーダ入門 - おもちゃラボ](http://nn-hokuson.hatenablog.com/entry/2018/02/15/140037)

ここにサーフェイスシェーダーのサンプルが大量にあるので、実際に触ってみると大体わかる。



## 頂点シェーダーとフラグメントシェーダー

こちらに関しては、内容が難しいので詳細めにまとめておく。

### 基本コード

ソース内のコメントで説明を記述。

```
// Unityのシェーダーにおける変数の型については以下を参照
// https://docs.unity3d.com/ja/current/Manual/SL-DataTypesAndPrecision.html
// 種類が多いのは、シェーダーは計算量がともかく多いため、可能な限り低精度な型を
// 使用するようにしたほうがパフォーマンスに良いため。

// シェーダーにおける演算に関してはこちらを参考にしたらいいかも
// https://msdn.microsoft.com/ja-jp/library/ee418342(v=vs.85).aspx

Shader "Custom/MyShader"
{
	Properties
	{
		_MainTex ("Texture", 2D) = "white" {}
	}
	SubShader
	{
		Tags {
			"RenderType" = "Opaque"
			"LightMode" = "ForwardBase"
		}
		LOD 100

		Pass
		{
			CGPROGRAM
			#pragma vertex vert
			#pragma fragment frag

			// UnityCG.cgincは便利なヘルパー関数が多い
			// UnityLightingCommon.cgincはライティングするなら必須っぽい
			#include "UnityCG.cginc"
			#include "UnityLightingCommon.cginc"

			struct v2f
			{
				float2 uv : TEXCOORD0;
				float4 vertex : SV_POSITION;
				fixed4 diff : COLOR;
			};

			sampler2D _MainTex;

			// 「TRANSFORM_TEX」を使用する際に必須
			float4 _MainTex_ST;

			// appdata_base
			// UnityCG.cgincで定義されている構造体
			// https://docs.unity3d.com/ja/current/Manual/SL-BuiltinIncludes.html
			v2f vert (appdata_base v)
			{
				v2f o;

				// UnityObjectToClipPos
				// 頂点座標をスクリーン上の座標に変換
				o.vertex = UnityObjectToClipPos(v.vertex);

				// TRANSFORM_TEX
				// インスペクタで指定したTiling/Offsetを反映させる
				o.uv = TRANSFORM_TEX(v.texcoord, _MainTex);

				// UnityObjectToWorldNormal
				// 法線をワールド座標系に変換
				half3 worldNormal = UnityObjectToWorldNormal(v.normal);
				half nl = max(0, dot(worldNormal, _WorldSpaceLightPos0.xyz));
				o.diff = nl * _LightColor0;

				// この処理をしないと陰影が強くつきすぎる
				// https://docs.unity3d.com/ja/current/Manual/SL-VertexFragmentShaderExamples.html
				// の「アンビエントを使った拡散ライティング」を参考
				o.diff.rgb += ShadeSH9(half4(worldNormal,1));

				return o;
			}

			fixed4 frag (v2f i) : SV_Target
			{
				fixed4 col = tex2D(_MainTex, i.uv);
				col *= i.diff;

				return col;
			}
			ENDCG
		}
	}
}
```

### 影をつけたい場合

前述のコードは、地面に影が投影されない。

影を投影したい場合はゴリゴリコードを書いてもOKだけど、以下のコードのみでも可能。

```
Pass {
	~
}

// VertexLit ビルトインシェーダーのshadow caster を取得
UsePass "Legacy Shaders/VertexLit/SHADOWCASTER"
```

### トゥーンシェーダーっぽくする

輝度を計算し、一定のしきい値を下回ったら暗くするようにすればいい。

一例として、以下のようにする。

```
fixed4 frag (v2f i) : SV_Target
{
  fixed4 col = tex2D(_MainTex, i.uv);

  fixed lumi = Luminance(i.diff.rgb);

  if (lumi > 0.05) {
    col *= fixed4(1, 1, 1, 1);
  } else {
    col *= fixed4(0.9, 0.9, 0.9, 1);
  }

  return col;
}
```

`Luminance`は`UnityCG.cginc`で定義されている関数で、色を輝度に変換してくれる。

注意としては、

```
o.diff.rgb += ShadeSH9(half4(worldNormal,1));
```

こちらのアンビエントの処理を削除しておかないと影がギザギザになり汚くなってしまう。
