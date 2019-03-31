---
created_at: 2017-09-18
---

# [PHP] json_encode/decodeはエラーが起きても例外を投げない

以下のように記載されている。

[PHP: json_encode - Manual](http://php.net/manual/ja/function.json-encode.php)

> エンコードに失敗した場合は、json_last_error() を使ってエラーの内容を調べることができます。


[PHP: json_decode - Manual](http://php.net/manual/ja/function.json-decode.php)

> デコードに失敗した場合は、json_last_error() を使用すればエラーの正確な状態を知ることができます。

jsonのシンタックスがおかしい等の場合でも例外を投げず、json_encodeならfalse、json_decodeならNULLを返却するのみで不具合を検出し辛い。

そのため、以下のようにクラスを作成してエラー内容と共に例外を投げるようにした。

```
class JSON
{
    public static function decode($json)
    {
        $result = json_decode($json);

        if ($result === NULL)
        {
            throw new \Exception(json_last_error_msg());
        }

        return $result;
    }

    public static function encode($array)
    {
        $result = json_encode($array);

        if ($result === false)
        {
            throw new \Exception(json_last_error_msg());
        }

        return $result;
    }
}
```
