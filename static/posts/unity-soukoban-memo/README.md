---
created_at: 2018-04-16
---

# 【Unity】 倉庫番作成時に学んだこと

Unityの練習として倉庫番を作成した。

[Demo](https://ryou.github.io/unity_soukoban/Dist/)

こんな単純なゲームでも、色々と学ぶことは多かったのでメモとして残しておく。


## FindはアクティブなGameObjectのみ返す

[GameObject.Find - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/current/ScriptReference/GameObject.Find.html)

[GameObject.FindGameObjectsWithTag - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/current/ScriptReference/GameObject.FindGameObjectsWithTag.html)

アクティブなGameObjectのみしか返さないので、スクリプト側で`GameObject.SetActive`でアクティブを変更したい場合はStart時に非アクティブ化、変数に格納等の対応が必要


## シーン切替時に暗くなる

[Unityでシーン遷移するとライトが暗くなる問題 - 脳汁portal](http://portaltan.hatenablog.com/entry/2017/12/19/165020)

各シーンでこの対応をしないといけないので注意



## Buttonが反応しないとき

[UnityでButtonを押しても反応がないとき - Qiita](https://qiita.com/otochan/items/abcbb2cc5a8a5ea79516)

Buttonの動作にはEventSystemが必要

なんだこれ？って間違って消してしまって時間食ってしまった。


## ゲームの終了方法

[Unityでスタートボタン、ゲーム終了ボタンのUIを作成する | Unityを使った３Dゲームの作り方（かめくめ）](https://gametukurikata.com/ui/startbuttonui)


## ButtonのonClickに設定した関数に引数を渡したい場合

引数が必要な関数であれば、自動的にパラメータを入力するためのボックスが出てくる


## Canvasの前後関係

sort orderが大きいほうが手前


## Unityちゃんの表情変更

Animatorにレイヤー機能があるので、これを利用することで１つのAnimatorに別カテゴリのアニメーションを割り当てることが出来る。

1. Animatorにレイヤー追加
1. 追加したレイヤーの設定から、レイヤーを「faceOnly」、Weightを1に
1. あとは通常と同じ


## webglがちゃんと描画されない

### 和文フォントの問題

[UnityのWebGLで日本語を表示する - Qiita](https://qiita.com/tsubaki_t1/items/93e4b91b830729cd93a4)

デフォルトで適用されてるのが欧文フォントで、WebGLでは和文フォントへのフォールバックがされないのが原因の模様。

とりあえずNotoJP設定するようにしておけばいい


### 解像度の問題

[実行ファイル起動時の画面解像度の強制変更スクリプト – Unityインターハイ公式ブログ](http://inter-high-blog.unity3d.jp/2017/08/22/resolutionchange/)

Build設定の「Player Setting」から解像度等調整出来る。


## 似たようなシーンをプレハブを使って構築する場合の注意

シーン毎に変わらない物と、シーン毎に変わる（アタッチされたスクリプトに渡す値等）物は別のプレハブにしておいたほうが良い。

というのも、シーン毎に変わる物もごちゃまぜにしてしまうと、間違ってApplyしてしまって同一プレハブを使用しているシーンがめちゃくちゃになってしまうことが頻繁にあった。

基本、シーン毎に変わるものはプレハブにしないか、プレハブにするにしてもシーン毎に不変なものと別プレハブにしておいたほうが良い。





## クラス、構造体をinspectorで変更できるようにする方法

[UnityのInspectorで変数を表示する方法まとめ - Qiita](https://qiita.com/k_yanase/items/3bb59963a6f477f5a523)

クラス、構造体宣言の直前に`[System.Serializable]`を記述すればいい。

```
[System.Serializable]
public class PositionClass {

    public int x = 0;
    public int y = 0;
}
```

### privateな変数をinspectorで変更する

変数宣言の直前で`[SerializeField]`を記述

```
[System.Serializable]
public class PositionClass {

    [SerializeField]
    private int x = 0;

    [SerializeField]
    private int y = 0;
}
```



## アニメーションの管理に関して

例えば、enumを使用して以下のようにアニメーションの状態を定義しようとする。

```
enum AnimationState
{
	idle,
	walk,
	run,
	jump
}
```

そして、次のようにUnityEditorへアニメーションの状態を引き渡す

```
GetComponent<Animator>().SetInteger("State", (int)currentAnimationState);
```

こうしてしまうと、UnityEdotor上ではアニメーションの状態は単なる整数表現になってしまうので、非常に分かりづらくなってしまう。

なので、この手法はアウト。そもそも、UnityEditor上で作成出来る状態遷移図の利点を生かせないので微妙。

アニメーションの遷移に関しては、UnityEditor上で先に状態遷移図と必要なパラメータを定義し、スクリプトで随時必要なパラメータを投げる形で作成したほうが良さそう。
