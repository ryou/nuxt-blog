---
created_at: 2019-02-12
---

# [CSS]style属性くんそんな悪いやつじゃないじゃんって話

「style属性つかうやつは糞」みたいな言葉をHTML/CSS学び始めた初期に頻繁に見て悪いイメージしか無かったんだけど、最近は使い所に気をつければめちゃくちゃ良いんじゃないかって思い始めたのでメモ。

## style属性を使うべきパターン

+ その場所でしか出てこないような例外的なデザイン
+ style属性へのプロパティ適用が2個程度に収まる

上記の条件を満たしているなら使っても良いんじゃないかなと。

## 具体例

[Demo](./example/index.html)

+ `.Table`及び`.Tag`コンポーネントが既に存在している
+ コンポーネントを素直に使った実装は上
+ 下側のように「タグだけ右寄せしたい」という要望が出たとする

この場合、style属性を使わないなら要望を満たすためにそれ専用にCSSファイルを弄る必要が出てくる。しかしstyle属性を許容すれば、HTMLに少しCSSを書くだけで済む。

個人的にはCSSファイルがちょっとした例外のために肥大化するのは良くないと思っているので、style属性で済むならstyle属性でいいのではと思った。

もちろん、最初にも書いたとおり「その場所でしか出てこないような例外的なデザイン」かつ「style属性へのプロパティ適用が2個程度に収まる」という前提を満たす必要はある。なんでもかんでもstyle属性でやるとそれは地獄になってしまう。
