# フォームのdisableスタイルの個人的実装ベタープラクティス

[デモ](./demo/index.html)

## 要約

+ disable時の見た目はopacityで対応。
    + デザインもそのように作ってもらう必要はある。
+ フォームパーツのグループや、フォームパーツ以外にもdisableな見た目にする必要がある場合はfieldsetを使う

## disable時の見た目はopacityで対応。

フォームのdisable時の見た目はinput等のようなフォームパーツだけを気にすればOKな話ではなく、デモのようにフォーム周辺のテキストに対しても気を使う必要がある。

disabled時のスタイルとしては、大きく下の２パターンになるかと思う。

+ border-color, colorを指定の色に変更
+ opacityで半透明に変更

「border-color, colorを指定の色に変更」に関しては、非常に面倒な事になる場合があるので避けたほうがいい。

例えば、最初はdisableになるパーツには黒色のテキストしかなく、disableな時には灰色にすればよかったとする。ただ運用の結果、黒以外の文字色（例えば赤）が入った場合に「赤色の文字も灰色にしていいのか？」という問題が発生する。  
もちろん「赤色の場合はちょっと薄い赤色に」とかなると地獄。

「opacityで半透明に変更」でやっておけば、色のパターンが増えたとしてもルールとして破綻しないので問題は発生しない。

## 具体的なスタイル指定例

デモが全てだが、肝は以下の部分。

```css
/* フォームパーツ単体でdisabled指定された場合のスタイル */
.c-radio_input:disabled,
.c-radio_input:disabled ~ *,
select:disabled {
  opacity: var(--disable-opacity);
}

/* fieldset単位でdisabled指定された場合のスタイル */
fieldset:disabled {
  opacity: var(--disable-opacity);
}

/* 二重でopacityがかからないように、打ち消す必要がある */
fieldset:disabled .c-radio_input:disabled,
fieldset:disabled .c-radio_input:disabled ~ *,
fieldset:disabled select:disabled {
  opacity: initial;
}
```

複数のフォームパーツのグループだったり、フォームパーツ以外にもdisable時に色を薄くする必要がある場合は `fieldset` を使用する。
