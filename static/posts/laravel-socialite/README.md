---
created_at: 2018-09-17
---

# [Laravel] Twitter認証を使用してログインするまで

Twitter認証をしてログインするまでの手順が難しくはないがやることが結構あったので覚書

## 手順

+ socialiteのインストール
+ `config/service.php`及び`.env`の更新
+ LoginControllerの作成
+ usersテーブル、Userモデルの作成
+ ユーザー情報登録・ログイン処理
+ 認証していないと見れないページの作成

### socialiteのインストール

```
composer require laravel/socialite
```

### `config/service.php`及び`.env`の更新

まず、`config/service.php`にTwitterAppのToken情報を記述。

```
'twitter' => [
    'client_id' => env('TWITTER_CLIENT_ID'),
    'client_secret' => env('TWITTER_CLIENT_SECRET'),
    'redirect' => env('TWITTER_CALLBACK_URL'),
],
```

それに伴い、.env（.env.example）も更新しておく。

```
TWITTER_CLIENT_ID=~
TWITTER_CLIENT_SECRET=~
TWITTER_CALLBACK_URL=~
```

### LoginControllerの作成

LoginControllerを生成

```
php artisan make:controller LoginController
```

LoginControllerはひとまず次のように記述しておきます。

```
<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    public function login()
    {
        return Socialite::driver("twitter")->redirect();
    }

    public function callback()
    {
        $user = Socialite::driver("twitter")->user();

        var_dump($user);
    }

    public function logout()
    {
        Auth::logout();

        return redirect()->route("home");
    }
}
```

`routes/web.php`に認証系のルーティングを追加すると同時に、トップページに`home`と名前をつけておく。

```
Route::get('/', function () {
    return view('welcome');
})->name("home"); //このname("home")を追加

Route::get("auth/login", "LoginController@login")->name("login");
Route::get("auth/callback", "LoginController@callback");
Route::get("auth/logout", "LoginController@logout")->name("logout");
```

これで`auth/login`にアクセスするとTwitter認証され、`auth/callback`にてユーザー情報が表示されます。


### usersテーブル、Userモデルの作成

DB関係の用意をします。

まず、最初に入っているマイグレーションとUserモデルは消しておきます。

消したら、usersテーブルを作成するマイグレーションを生成。

```
php artisan make:migration create_users_table
```

ファイルの中身は以下のようにしておきます。

```
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments("id");
            $table->string("twitter_id");
            $table->string("twitter_name");
            $table->string("twitter_nickname");
            $table->string("twitter_avatar");
            $table->timestamps();
            $table->rememberToken();

            $table->index("twitter_id");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
```

マイグレーションを実行

```
php artisan migrate
```

次に、Userモデルを作成します。

```
php artisan make:model Models/User
```

User.phpの中身は以下の通り。Authクラスと関連付けるためにAuthenticatableを継承します。

```
<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $fillable = [ "twitter_id" ];
}
```

同時に、`config/auth.php`の`providers`の`model`に関して、Userのディレクトリが変わったので書き換えます。

```
'providers' => [
    'users' => [
        'driver' => 'eloquent',
        'model' => App\Models\User::class,
    ],
],

```

### ユーザー情報登録・ログイン処理

LoginControllerのcallbackを以下のように書き換えると、ユーザー情報の保存が出来ます。

```
public function callback()
{
    $twitterUserInfo = Socialite::driver("twitter")->user();

    $user = User::firstOrNew([
        "twitter_id" => $twitterUserInfo->id,
    ]);
    $user->twitter_id = $twitterUserInfo->id;
    $user->twitter_name = $twitterUserInfo->name;
    $user->twitter_nickname = $twitterUserInfo->nickname;
    $user->twitter_avatar = $twitterUserInfo->avatar;
    $user->save();

    Auth::loginUsingId($user->id, true);

    return redirect()->route("home");
}
```


### 認証していないと見れないページの作成

例として認証していないと見れないURL`posts/~`を作成。

まず、PostsControllerを作成。

```
php artisan make:controller PostsController
```

PostsControllerは以下のようにindexだけ作成しておきます（あくまでテスト用なので）。

```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostsController extends Controller
{
    public function index()
    {
        echo "posts index";
    }
}
```

最後に、`web.php`に次の行を追加して完了です。

```
Route::get("posts", "PostsController@index")->name("posts")->middleware("auth");
```

これで認証していない状態で`/posts`にアクセスすると、`login`という名前がつけられたルート（今回の場合`auth/login`）へリダイレクトされます。
