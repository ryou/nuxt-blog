---
created_at: 2017-11-14
---

# [Git]間違ったブランチへコミットしてしまった際に、修正する方法。

## 概要

`feature/fix01`ブランチで`add text`を行い。その後本来`develop`から`feature/about`ブランチを切ってするべきだった`make about html`と`add about/style.css`を`feature/fix01`ブランチのまま作業してしまった。

このように`faeture/fix01`に間違ってコミットしてしまった物を、本来の`feature/about`ブランチへ移動させたい。

## コミットログ

```
commit ed3a060acd612c6242fdf91e43b86c33ff07a9d2 (HEAD -> feature/fix01)
Author: Author Name <hoge@fuga.com>
Date:   Tue Nov 14 10:21:53 2017 +0900

    add about/style.css

commit 9f42388aaf5625b347b6fa6aac07a04f77e2af44
Author: Author Name <hoge@fuga.com>
Date:   Tue Nov 14 10:21:37 2017 +0900

    make about html

commit 5db9f564615939a50b2771e247265a99d506e744
Author: Author Name <hoge@fuga.com>
Date:   Tue Nov 14 10:21:04 2017 +0900

    add text

commit fc7d5b939fff35713d8554319f135c0392690615 (master, develop)
Author: Author Name <hoge@fuga.com>
Date:   Tue Nov 14 10:12:50 2017 +0900

    first commit
```

## 対応方法

### 流れ

+ `feature/about`ブランチを作成する
+ `cherry-pick`を使用して、`feature/fix01`ブランチに間違ってコミットした変更を`feature/about`ブランチへ適用する
+ `feature/fix01`ブランチに間違ってコミットした変更を`git reset`で削除


### 実際のコマンド

```
# developブランチからfeature/aboutブランチを作成
git checkout develop
git checkout -b feature/about

# cherry-pickを使用してfeature/aboutブランチへ変更を適用
git cherry-pick 9f42388aaf5625b347b6fa6aac07a04f77e2af44
git cherry-pick ed3a060acd612c6242fdf91e43b86c33ff07a9d2

# feature/fix01から不要なコミットを削除
git checkout feature/fix01
# 先頭から２つが不要なコミットなので２回実行
git reset --hard HEAD^
git reset --hard HEAD^
```
