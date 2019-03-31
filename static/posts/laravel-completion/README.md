---
created_at: 2018-09-11
---

# LaravelのModelクラス等にコード補完が働かない理由

PHPStormを使い初めたのですが、Laravelにおいてコード補完が働かない場合がちょくちょくあります。

例えば、`php artisan make:model World`で作成したWorldクラスに関して、Controllerで

```
World::where(~)
```

と書くと、`Method where not found ~`といった警告がPHPStormで出ます。

出るのですが、このコードは正常に動作しますし、公式ドキュメントでもこの書き方が例として書かれています。

Worldクラスの親クラスであるModelクラスの中身を見ても、`where`メソッドなど存在していません。（存在していれば当然の如く補完が働きます。）

ではなぜ前述のコードが動作してるのかというと、Modelクラスにおいて`__call`および`__callStatic`メソッドを定義しているからです。

`__call`はそのクラスにおいて定義されていないメソッドが呼ばれた際に、`__callStatic`は定義されていない静的メソッドが呼ばれた際に呼ばれるメソッドになります。

Modelクラスがそれをどのように使ってるかというと、簡単なコードにすると以下のような仕組みになります。

```
<?php

class Builder
{
    public function where($a, $b)
    {
        echo "where(${a}, ${b}) called." . PHP_EOL;
    }
}

abstract class Model
{
    public function newQuery()
    {
        return new Builder();
    }

    public function __call($name, $arguments)
    {
        return $this->newQuery()->$name(...$arguments);
    }

    public static function __callStatic($name, $arguments)
    {
        return (new static)->$name(...$arguments);
    }
}

class World extends Model
{
}

World::where('id', '1');
```

流れとしては、まず`World::where`を実行しようとしますが、World及びModelに`static where`メソッドが存在していないので`__callStatic`が呼ばれます。`__callStatic`内の`new static`は呼び出し元のクラスのインスタンスを生成する処理です。（今回の場合はWorldクラスのインスタンスを生成しています。）

`new static`によりWorldクラスのインスタンスが生成されたので、次はstaticでないwhereメソッドを探しますが、これもないので`__call`メソッドに入ります。`__call`メソッドではBuilderインスタンスを生成して返す`newQuery`メソッドが呼ばれ、それ経由でBuilderクラスのwhereメソッドが呼ばれます。

## 参考記事

[Laravel コードで見るファサードクラスの仕組み - Shin x blog](http://www.1x1.jp/blog/2014/03/laravel-facade-class.html)

今回の話にFacadeは出てこないのですが、`__callStatic`を使って実現する辺りが似ています。

ちなみに、`Route`クラスも各種メソッドが直接的には実装されておらず、親クラスであるFacadeクラスの`__callStatic`経由で`\Illuminate\Routing\Router`のメソッドが呼ばれているので補完が働かなさそうですが、

```
<?php

namespace Illuminate\Support\Facades;

/**
 * @method static \Illuminate\Routing\Route get(string $uri, \Closure|array|string|null $action = null)
 * @method static \Illuminate\Routing\Route post(string $uri, \Closure|array|string|null $action = null)
 * @method static \Illuminate\Routing\Route put(string $uri, \Closure|array|string|null $action = null)
 * @method static \Illuminate\Routing\Route delete(string $uri, \Closure|array|string|null $action = null)
 * @method static \Illuminate\Routing\Route patch(string $uri, \Closure|array|string|null $action = null)
 * @method static \Illuminate\Routing\Route options(string $uri, \Closure|array|string|null $action = null)
 * @method static \Illuminate\Routing\Route any(string $uri, \Closure|array|string|null $action = null)
 * @method static \Illuminate\Routing\Route match(array|string $methods, string $uri, \Closure|array|string|null $action = null)
 * @method static \Illuminate\Routing\RouteRegistrar prefix(string  $prefix)
 * @method static \Illuminate\Routing\RouteRegistrar where(array  $where)
 * @method static \Illuminate\Routing\PendingResourceRegistration resource(string $name, string $controller, array $options = [])
 * @method static \Illuminate\Routing\PendingResourceRegistration apiResource(string $name, string $controller, array $options = [])
 * @method static void apiResources(array $resources)
 * @method static \Illuminate\Routing\RouteRegistrar middleware(array|string|null $middleware)
 * @method static \Illuminate\Routing\Route substituteBindings(\Illuminate\Support\Facades\Route $route)
 * @method static void substituteImplicitBindings(\Illuminate\Support\Facades\Route $route)
 * @method static \Illuminate\Routing\RouteRegistrar as(string $value)
 * @method static \Illuminate\Routing\RouteRegistrar domain(string $value)
 * @method static \Illuminate\Routing\RouteRegistrar name(string $value)
 * @method static \Illuminate\Routing\RouteRegistrar namespace(string $value)
 * @method static \Illuminate\Routing\Router|\Illuminate\Routing\RouteRegistrar group(array|\Closure|string $attributes, \Closure|string $routes)
 * @method static \Illuminate\Routing\Route redirect(string $uri, string $destination, int $status = 301)
 * @method static \Illuminate\Routing\Route view(string $uri, string $view, array $data = [])
 * @method static void bind(string $key, string|callable $binder)
 * @method static \Illuminate\Routing\Route current()
 * @method static string|null currentRouteName()
 * @method static string|null currentRouteAction()
 *
 * @see \Illuminate\Routing\Router
 */
class Route extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'router';
    }
}
```

上記のようにコメントが書かれているのが理由かこちらはコード補完が働きました。


## で、どうやれば補完が効くようになる？

[GitHub - barryvdh/laravel-ide-helper: Laravel IDE Helper](https://github.com/barryvdh/laravel-ide-helper)

こちらのide-helperを使います。

### 手順

公式を毎回見直すべきだが、一応。

```
# 仮想環境を使っているなら、事前に仮想環境にログインしておくこと

composer require --dev barryvdh/laravel-ide-helper
composer require doctrine/dbal

php artisan ide-helper:generate
# --dirには、モデルが配置されているディレクトリを入力
# こちらの作業は、Modelが増えるたびに毎回行う必要がある
php artisan ide-helper:models --dir="app/Models"
```

#### Fluentクラスの補完

さらに、Fluentクラスの補完をきくようにするには以下の作業

```
ex: Fluentは例えばマイグレーションファイルで
    $table->foreign('type_id')->references('id')->on('types');
    みたいなことをする際にforeignが返すクラス
```

まず、`config/ide-helper.php`が無ければ生成

```
php artisan vendor:publish --provider="Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider" --tag=config
```

`config/ide-helper.php`にて以下のように変更

```
'include_fluent' => true,
```

で、再ジェネレート

```
php artisan ide-helper:generate
```
