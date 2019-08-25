---
created_at: 2019-08-25
---

# [メモ]画像の非可逆圧縮は何が良いか

４〜５年前の「JPEGmini最強！」の時代で止まっていたので、改めて調べてみた。

## 結論

mozjpeg最強

## 候補

- JPEGmini
- ImageOptim
- Webp
- mozjpeg

## 結果

圧縮率・品質自体は４つともそんなに大差はなかった。（品質に関しては目視では４つの違いがわからん）（目視でわからんのサンプルも置かない。めんどい）

圧縮率・品質に差がないのであればそれ以外の部分で選ぶことになるが、JPEGminiとImageOptimはCUIで実行できないのが微妙。WebpはIE11、Safari非対応なのが駄目。

mozjpegに関してはCUIで実行可能で、サーバーサイドでの圧縮も簡単に行える。Webpと異なり普通のjpeg形式なため取り回しも良い。

## mozjpegの使い方

```
yarn add imagemin imagemin-mozjpeg
```

して

```
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');

(async () => {
    await imagemin(['images/*'], {
        destination: 'compressed_images',
        plugins: [
            imageminMozjpeg({quality: 70})
        ]
    });
    console.log('done');
})();
```

な感じのスクリプトを書けばいい。

ちなみに、mozjpegのバイナリは `node_modules/mozjpeg/vendor` 内に存在する。バイナリはmozjpegのpostinstallタイミングでプラットフォームに適したものがダウンロードされる模様。

## 引っかかったこと

imagemin-mozjpegのreadmeにuseオプションを使って書かれていたが、これはimageminの以前の書き方みたい。useを使って書いてたらエラーも何も出ず失敗するという状況で理由がわからず詰まった。

## 参考

[画像の最適化を自動化する | Web Fundamentals | Google Developers](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/automating-image-optimization/?hl=ja)

画像圧縮に関してめっちゃ詳しく書いてくれてる

[Squoosh](https://squoosh.app/)

Googleが提供している画像圧縮サービス。Webpとかmozjpegがどの程度圧縮されるのか見てみるのに使った。
