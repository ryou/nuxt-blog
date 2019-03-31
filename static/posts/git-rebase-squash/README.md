---
created_at: 2019-03-06
---

# [Git] ２個以上前のプッシュしていないコミットを修正したくなった場合

rebaseしてsquashすればいい

## 例

```
% git log                                                                 [20:52:42]
commit afed1fc70e8c890d310505f71569a8c568ecf50a (HEAD -> master)
Author: author <author@example.com>
Date:   Wed Mar 6 20:52:42 2019 +0900

    modify first commit

commit 809ab76dcc79192a570fc169f1267ab09cf464f2
Author: author <author@example.com>
Date:   Wed Mar 6 20:52:15 2019 +0900

    third commit

commit bc9c9b4e7c967152b220c5aa211ea23894fd92b1
Author: author <author@example.com>
Date:   Wed Mar 6 20:52:03 2019 +0900

    second commit

commit 84895f112b31929f3c9fc2d19abf85c0dbf773f8
Author: author <author@example.com>
Date:   Wed Mar 6 20:51:52 2019 +0900

    first commit
```

上記のようなコミットログで、`third commit`までしたところで`first commit`のタイポを見つけて`modify first commit`でそれを修正したとする。このままだと、`first commit`に関するコミットが２箇所に別れることになりプルリクを確認する人がつらい。

まだpushしていないこと前提だが、以下の方法で修正できる。

まず`git rebase HEAD~4`を実行。`4`の部分は対象とするコミットの範囲。今回は４個前のコミットを弄る必要があるので`4`。

すると以下のような感じに表示される。

```
pick 84895f1 first commit
pick bc9c9b4 second commit
pick 809ab76 third commit
pick afed1fc modify first commit
```

`modify first commit`を`first commit`の下の行に持ってきて、`pick`を`squash`に変更。（`dd`で行切り取り、`p`で貼り付けできる）

```
pick 84895f1 first commit
squash afed1fc modify first commit
pick bc9c9b4 second commit
pick 809ab76 third commit
```

これで`:wq`すれば、次は以下のような画面になる。

```
# ~~~~~~~~
# ~~~~~~~~

first commit

# ~~~~~~~~

modify first commit
```

これは新しいコメントを入力する画面。コメント行以外の内容が新しいコメントとして登録される。

とりあえず`modify first commit`はいらないので、`modify first commit`の行で`dd`。

これで`:wq`すれば`first commit`に`modify first commit`が統合される。
