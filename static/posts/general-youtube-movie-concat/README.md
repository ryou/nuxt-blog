---
created_at: 2018-11-12
---

# Youtubeプレイリストの動画をダウンロードから結合までの自動化


## 最終的なスクリプト

```
#!/bin/sh

#----------------------------------------
# 動画のダウンロード
#----------------------------------------

echo "プレイリストのURLを入力してください。"
read playlistUrl

rm -rf original
youtube-dl -f "bestvideo[height<=720]+bestaudio/best[height<=720]" "${playlistUrl}" -o "original/%(playlist_index)02d.%(ext)s"

#----------------------------------------
# mp4に変換
#----------------------------------------

rm -rf conv
mkdir conv

for i in original/*.*
do
  fileFullName=$(basename $i)
  fileName=${fileFullName%.*}
  echo $fileName
  # 参考：http://sogohiroaki.sblo.jp/article/183618558.html
  ffmpeg -i $i -r 30 -vf "yadif=deint=interlaced, scale=w=trunc(ih*dar/2)*2:h=trunc(ih/2)*2, setsar=1/1, scale=w=1280:h=720:force_original_aspect_ratio=1, pad=w=1280:h=720:x=(ow-iw)/2:y=(oh-ih)/2:color=#000000" -pix_fmt yuv420p -ar 48000 conv/${fileName}.mp4
done

#----------------------------------------
# 結合用ファイル一覧ファイルを作成
#----------------------------------------

# 空ファイルを作成
rm list.txt
touch list.txt

for i in conv/*.*
do
  echo "file $i" >> list.txt
done

#----------------------------------------
# 結合処理
#----------------------------------------

ffmpeg -f concat -i list.txt -c copy merge.mp4
```

## 用意するもの

+ youtube-dl
+ ffmpeg

homebrewでインストールすればOK

## 手順

+ youtube-dlでプレイリストの動画をダウンロード
+ ffmpegでmp4形式に変換
+ ffmpegで動画を結合

### youtube-dlでプレイリストの動画をダウンロード

`youtube-dl`で直接高画質mp4動画をダウンロード出来ればよかったのだが、mp4だとどうにも低画質の物しかダウンロード出来なかったので拡張子指定なしでダウンロードする。

```
youtube-dl -f "bestvideo[height<=720]+bestaudio/best[height<=720]" "プレイリストのURL" -o "%(playlist_index)02d.%(ext)s"
```

今回は最終的に1280x720に変換するので、高さ720以下の最高画質をダウンロードしている。



### ffmpegでmp4形式に変換

```
ffmpeg -i [対象ファイル] -r 30 -s 1280x720 -ar 48000 [出力ファイル名].mp4
```

`-r 30`は30fpsで書き出しということ。これを書く位置を間違えると違った挙動をするので、必ず出力ファイル名の前に書くこと。

この際に、音声のサンプリングレートを揃えておかないと後の処理で異常が発生してしまうので、`-ar 48000`で4800Hzを指定しておく。


### ffmpegで動画を結合

以下のコマンドで結合可能

```
ffmpeg -f concat -i list.txt -c copy [Filename].mp4
```


`list.txt`には、以下の形式で結合する動画を記述

```
file path/to/file01.ext
file path/to/file02.ext
```
