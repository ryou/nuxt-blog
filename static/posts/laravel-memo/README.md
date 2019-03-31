---
created_at: 2018-10-02
---

# Laravelメモ



## `Eloquent`の`all`はメモリ消費量が多いので注意

大量のレコードを処理する場合は`chunk`を使おう。

[Laravel(Eloquent): chunk() vs cursor() - Qiita](https://qiita.com/ryo511/items/ebcd1c1b2ad5addc5c9d)


## 作った関数とか処理を手軽に試したい

`tinker`を利用する。

```
php artisan tinker
```

## whereでOR検索したい

同一カラムなら`whereIn`を使う。

```
$users = DB::table('users')
                    ->whereIn('id', [1, 2, 3])
                    ->get();
```

[データベース：クエリビルダ 5.6 Laravel（※「Where節を参照」）](https://readouble.com/laravel/5.6/ja/queries.html)


## Laravelで常に特定のレスポンスヘッダーを設定したい

[ミドルウェア 5.6 Laravel](https://readouble.com/laravel/5.6/ja/middleware.html)

ミドルウェアで指定すればいい。

例えば、CORSに対応するために`Access-Control-Allow`系のヘッダーを指定する場合以下のようになる。

```
public function handle($request, Closure $next)
{
    return $next($request)
            ->header("Access-Control-Allow-Origin", config("app.allow-origin"))
            ->header("Access-Control-Allow-Credentials", "true")
            ->header("Access-Control-Allow-Methods", "POST, GET")
            ->header("Access-Control-Allow-Headers", "Content-Type");
}
```



## Laravelはクッキーが暗号化されている

デフォルトで、ミドルウェアの`EncryptCookies`でクッキーが暗号化されている。

なので、DevToolsで表示されているクッキー情報（暗号化されている）と、Laravel内のクッキー情報（復号後）は異なっているので注意。



## 最初にtimezone設定をしておく

デフォルトではUTCのため、DBに保存するTimeStamp等もUTCとして保存されてしまう。

JSTとして保存したい場合はtimezone設定をしておくこと。

[LaravelのtimezoneをデフォルトのUTCからJST(日本標準時)へ変更する](https://qiita.com/pinkumohikan/items/2e9cefb85d75a8622d99)



## oldヘルパーのデフォルト値

Laravelで、バリデーション後フォームの入力値にバリデーション前と同じ値を入力させておきたい場合、`old`ヘルパーを使用するが、oldにはデフォルト値を設定できる

```
old("title", $post->title)
```

## 入れ子形式のリクエスト

```
  "post" => array:2 [▼
    "title" => "heah"
    "content" => "ahe"
  ]
```

こんな形のリクエストが欲しい場合、

```
<div><input type="text" name="post[title]" value="{{ $values["title"] }}"></div>
<div><textarea name="post[content]">{{ $values["content"] }}</textarea></div>
```

こう。



## 多次元配列のバリデーション

```
<form method="post" action="{{ $actionUrl }}">
    @csrf
    <div><input type="text" name="post[title]" value="{{ $values["title"] }}"></div>
    <ul>
        <li><input type="text" name="tags[0][name]"></li>
        <li><input type="text" name="tags[1][name]"></li>
    </ul>
    <div><textarea name="post[content]">{{ $values["content"] }}</textarea></div>
    <div><button type="submit">submit</button></div>

    <input name="_method" type="hidden" value="{{ $method }}">
</form>
```

これのバリデーションは

```
public function rules()
{
    return [
        "post.title" => "required",
        "post.content" => "required",
        "tags.*.name" => "required",
    ];
}
```

こう



## バリデーションでmin/maxが働かない

min/maxによるバリデーションをしたい場合、以下のようにinteger等も指定して数値として認識させる必要がある。

```
public function rules()
{
    return [
        "num" => "required|integer|min:3",
    ];
}
```


## マイグレーションファイルでカラムの変更をしたい

[公式の「カラム属性の変更」を参照](https://readouble.com/laravel/5.6/ja/migrations.html)



## .htaccessを使用せず常時SSL化対応

Middlewareで対応

[Laravel5で.htaccessを使用せず常時SSL化対応する方法](https://qiita.com/qwe001/items/7cd0bcb149b5b5cc0fd7)



## テスト関連

### 現在時刻を任意の値にしたい

テスト対象の関数内で`Carbon::now()`とか使っていた時、テスト毎に状態が変化してしまい微妙。

なので、テスト中に現在時刻を任意の値にするために、[`Carbon::setTestNow()`](https://carbon.nesbot.com/docs/#api-testing)を使用する。


### testから始まらない関数をテスト関数として認識させたい

`@test`と関数の直前に記述すればいい。

```
/*
 * @test
 */
public function 有効期限が正常に判定されていることの確認()
{
  ~
}
```

ちなみに、テストの関数名は日本語にしておくとわかりやすい。
