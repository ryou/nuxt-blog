---
created_at: 2017-12-14
---

# [Karabiner] メモ


[Karabiner](https://pqrs.org/osx/karabiner/)に関するメモ置き場


## 設定ファイル

[GitHub](https://github.com/ryou/karabiner_elements_setting)

## メモ

### 特定のアプリで特定のキーバインドを無効にしたい

無効にしたいキーバインドの`conditions`に以下のような設定をすれば可能。

```
{
    "description": "キーバインドの説明",
    "manipulators": [
        {
            "conditions": [
                {
                    "bundle_identifiers": [
                        "^com\\.googlecode\\.iterm2$"
                    ],
                    "type": "frontmost_application_unless"
                }
            ],
        },
        ~
    ]
}
```

`bundle_identifiers`はアプリの`info.plist`に記載されている。

`info.plist`は「アプリ右クリック => パッケージの内容を表示」で開いた先を潜っていけばある。

[](http://harafuji0613.hatenablog.com/entry/2015/03/22/002953)
