---
created_at: 2017-05-30
---

# [Mac]Sierraで英数キーにワンショットモディファイアを設定

2017/05/30現在、SierraだとKarabinerが使用できません。

英数キーにワンショットモディファイアとしてCtrlを設定していた身としては、それができないとかなり不便（Ctrl+npbfでカーソル移動している）なので方法をメモ。

## Karabiner-Elementsのフォークされた物を利用

Karabiner-Elementsなら現状Sierraでも利用できるのですが、現状ワンショットモディファイアは利用できない状態です。

ただ、wwwjfyさんがフォークしてワンショットモディファイアを実装しており、そちらを利用すれば英数キーにワンショットモディファイアを設定することが可能です。

### インストール

こちらからダウンロードしてインストールします。

[wwwjfy/Karabiner-Elements](https://github.com/wwwjfy/Karabiner-Elements/releases)

### 設定

`~/.config/karabiner/karabiner.json`を弄ることで設定が可能です。

実際は以下のような内容にしました。

```
{
    "global": {
        "check_for_updates_on_startup": true,
        "show_in_menu_bar": true,
        "show_profile_name_in_menu_bar": false
    },
    "profiles": [
        {
            "devices": [],
            "fn_function_keys": {
                "f1": "display_brightness_decrement",
                "f10": "mute",
                "f11": "volume_decrement",
                "f12": "volume_increment",
                "f2": "display_brightness_increment",
                "f3": "mission_control",
                "f4": "launchpad",
                "f5": "illumination_decrement",
                "f6": "illumination_increment",
                "f7": "rewind",
                "f8": "play_or_pause",
                "f9": "fastforward"
            },
            "name": "Default profile",
            "one_to_many_mappings": {},
            "selected": true,
            "simple_modifications": {
                "japanese_eisuu": "left_control",
                "left_control": "left_command",
                "japanese_kana": "right_command"
            },
            "standalone_keys": {
                "japanese_eisuu": "japanese_eisuu",
                "japanese_kana": "japanese_kana"
            },
            "virtual_hid_keyboard": {
                "caps_lock_delay_milliseconds": 0,
                "keyboard_type": "jis",
                "standalone_keys_delay_milliseconds": 200
            }
        }
    ]
}
```

基本的にデフォルトのままで、いじった箇所は

```
"simple_modifications": {
    "japanese_eisuu": "left_control",
    "left_control": "left_command",
    "japanese_kana": "right_command"
},
"standalone_keys": {
    "japanese_eisuu": "japanese_eisuu",
    "japanese_kana": "japanese_kana"
}
```

まずここでキーの入れ替えとワンショットモディファイアの設定を行っています。

`simple_modifications`はキーの入れ替えの設定、`standalone_keys`はワンショットモディファイアの設定です。

それと次に、

```
"keyboard_type": "jis",
```

デフォルトだと英語キーボード配列として処理されてしまうので、ここで日本語キーボード配列をしていしています。英語配列の人はデフォのままで問題ないと思います。

## 備考

Karabiner製作者様本人が作ったものではなく、フォークされたものです。Karabinerの動向を追っかけてKarabiner自体にワンショットモディファイアの機能が実装されたらそちらに乗り換えたほうがいいかと思います。

## 参考

[macOS Sierra に Karabiner-Elements 入れて「英数」キーを「Command」にして、単独で押した時は「英数」として認識させた話 - ngzmのブログ](http://ngzm.hateblo.jp/entry/2016/12/21/002001)
