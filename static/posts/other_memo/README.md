---
created_at: 2017-07-02
---

# [その他]全般的なメモ


## Git関係

### マージ&ブランチ削除

```
git merge branch-name
git branch -d branch-name
```

一定期間手動でやって、煩わしくなったらaliasを作る。

### コミットをまとめる

```
git rebase -i HEAD~[まとめる数]
```

vimが開かれるので、ベースにするコミットは`pickup`のままで、それ以外を`fixup` or `f` に書き換えて`:wq`


### 直前のコミットのコメントを修正

```
git commit --amend -m "[新しいコメント]"
```

### git pullを使わない方法

`fetch`を使用する

```
git checkout [対象ブランチ]
git fetch
git merge ～/～
```

### 特定のファイルの履歴を追いかけたい

```
git log -p [ファイル名]
```

これだけだと、ターミナル上でズラッと表示されてしまい、履歴が長い場合は追いきれなくなるので

```
git log -p [ファイル名] | vim -
```

とすれば`vim`に履歴が表示される。


### 特定のコミットからファイルを取得

```
git show リビジョン番号:対象ファイル(相対パス)
```

#### 例

```
git show 3e7a16a572f6e6aa673f517ea4ff8b9d1e70486e:src/html/index.ejs | pbcopy
```

※標準出力へ吐き出されるので、`pbcopy`でクリップボードへ出力している。

### pagerを使用せずにlog等を確認したい

グローバルのconfigを弄る

```
git config --global core.pager cat
```

### 特定リポジトリではユーザーを変更

```
git config user.name "username"
git config user.email "email"
```


## Atom関係

### `Cmd+p`によるファイル検索から、特定のファイル・ディレクトリを除外したい

「Setting -> Core -> Ignored Names」に除外したいファイル・ディレクトリ名を指定すればOK


## その他

### gistコマンドで簡単にソースコード共有

ネット上のコミュニケーションとかで短いソースコードの共有をしたい時にGistを使えば便利。

それをCUIからさくっとする方法。

#### やり方

```
gem install gist

gist [対象ファイル]

# アップロードされたURLが表示される
```

#### 参考

[ターミナルからGistに投稿 - Qiita](http://qiita.com/smison/items/d7fdec3a1b74a0d22c36)


### mvコマンドでファイル名を変更せず移動

ディレクトリだけ指定すればいい。

例えば、`test.txt`を`work/test`へ移動したい場合、

```
mv test.txt work/test
```

でOK。


### Macでrmコマンドでゴミ箱に移動するように

小飼弾氏作の[mv2trash](https://github.com/dankogai/osx-mv2trash/blob/master/bin/mv2trash)を利用する。

`/usr/local/bin`あたりに配置してalias設定すればOK。

よく使われている`rmtrash`と異なり、AppleScriptを使用している物なので、右クリックからの「戻す」で元の位置に戻すことが可能。

代わりにちょっと時間がかかるのはしょうがない。




## Karabiner-ElementsでCtrl+MをCapslockにする方法

下記内容を`rules`に追加すればいい。

```
{
    "description": "Ctrl+M => Capslock",
    "manipulators": [
        {
            "from": {
                "key_code": "comma",
                "modifiers": {
                    "mandatory": [
                        "control"
                    ],
                    "optional": [
                        "caps_lock"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "caps_lock"
                }
            ],
            "type": "basic"
        }
    ]
}
```

注意点としては、`optional`に`caps_lock`を追加すること。

そうしないと、caps_lockが有効になった状態だと「controlとcaps_lock」の２つの修飾キーが有効とみなされて、caps_lockが発火しない。

### アプリに渡されてるキー入力を確認

キーボードビューアで確認出来る模様

https://qiita.com/yousan/items/30c7804261db6364de8e

