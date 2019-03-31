---
created_at: 2018-12-11
---

# SQLメモ

## 基本的なコマンド等

### SELECT

`SELECT`直後の列指定には、式も指定できる。

```
SELECT id, name AS '商品名', price, price - genka AS '利益'
  FROM items
  WHERE price >= 1000
    AND price - genka >= 100
    AND name IS NOT NULL
    AND (created_at < '2010-10-10' OR created_at > '2017-10-10');
```

#### GROUP BY

```
SELECT instance_id, COUNT(*) AS '合計'
  FROM instance_logs
  WHERE instance_id > 50
  GROUP BY instance_id
  HAVING COUNT(*) > 400;
```



### INSERT

```
INSERT INTO items
  (
    name,
    price,
    genka,
    category
  )
  VALUES (
    'pencil',
    200,
    NULL,
    DEFAULT
  );
```

#### 他のテーブルからコピー

`VALUES (~)`の代わりに`SELECT`を使って他のテーブルからデータをコピーして挿入することが可能。

```
INSERT INTO items_master
  (
    name,
    price,
    genka,
    category
  )
  SELECT name, price, genka, category
    FROM items;
```



### DELETE

```
DELETE FROM items
  WHERE price > 200;
```

#### 全件削除

`WHERE`の指定をしなかった場合、指定したテーブルのレコードを全件削除する。

```
DELETE FROM items;
```

ただし、処理速度の観点から`TRUNCATE テーブル名`を使用するのが一般的。


### UPDATE

```
UPDATE items
  SET price = 200
  WHERE id = 4;
```

`DELETE`と同様に、`WHERE`を指定しなかった場合は、全レコードに対して処理が実行される。


### CREATE VIEW

よく使うSELECTのショートカットを作るみたいな機能。

```
CREATE VIEW items_view (id, name, price)
  AS
    SELECT id, name, price
      FROM items
      WHERE price > 100;
```

上記のようにビューを作っておくと、`SELECT * FROM items_view;`みたいな感じでビューを元にSELECTが叩ける。


### サブクエリ

`SELECT`の結果をSQL文内で使用する書き方の事。

```
SELECT id, name, price
  FROM (
      SELECT id, name, price
        FROM items
        WHERE price > 100
    ) AS sub_items
  WHERE name = 'pen';
```


#### スカラサブクエリ

`SELECT`の結果を定数として使用するサブクエリの事。

```
SELECT id, name, price, (
    SELECT AVG(price) FROM items
  ) AS average
  FROM items;
```

上記クエリで、平均価格が各レコードの右端に表記される。


#### 相関サブクエリ

例えば、「カテゴリー毎の平均販売価格より高い商品を抜き出す」といった処理を行いたい場合に使う。

```
SELECT id, name, price, category
  FROM items
  WHERE price > (
      SELECT AVG(price)
        FROM items AS sub_items
        WHERE items.category = sub_items.category
        GROUP BY category
    );
```


### 述語

`述語`とは、返り値が論理値になる関数のこと。

#### LIKE

文字列の部分一致検索を行う。

```
-- 前方一致（例だとpencilとかが該当）
SELECT * FROM items WHERE name = 'pen%';
-- 中間一致（pencil,append,deepenとかが該当）
SELECT * FROM items WHERE name = '%pen%';
-- 後方一致（deepenが該当）
SELECT * FROM items WHERE name = '%pen';
```


#### BETWEEN

数値の範囲検索を行う。

```
-- 100以上1000以下の値を検索
SELECT * FROM items WHERE price BETWEEN 100 AND 1000;

-- 以下のクエリと同じ意味
SELECT * FROM items WHERE price >= 100 AND price <= 1000;
```


#### IN

`OR`の省略形

```
-- priceが100か200か300のレコードを検索
SELECT * FROM items WHERE price IN (100, 200, 300);

-- 以下のクエリと同じ意味
SELECT * FROM items WHERE price = 100 OR price = 200 OR price = 300;

-- INと組み合わせることも可能
SELECT *
  FROM items
  WHERE id IN (
      SELECT id
        FROM items
        WHERE price > 100
    );

-- NOT INとも
SELECT *
  FROM items
  WHERE id NOT IN (
      SELECT id
        FROM items
        WHERE price > 100
    );
```


### CASE式

条件分岐が出来る。

```
SELECT name
  CASE WHEN category = 'PHP'
    THEN 'A:' || category
  CASE WHEN category = 'JavaScript'
    THEN 'B:' || category
  ELSE NULL
  FROM items;
```


### 集合演算

集合の演算も可能。（和集合、差集合、積集合）

```
SELECT *
  FROM items
  WHERE id IN (1, 2)
UNION
SELECT *
  FROM items
  WHERE id IN (2, 3);
```

結果としてidが1,2,3のレコードが取得される。

`UNION（和集合）`以外にも`INTERSECT（積集合）`と`EXCEPT（差集合）`が使用できる。

#### ALLオプション

和集合、積集合には集合同士の交差部分が存在している。デフォルトだと、この交差している、つまり重複しているレコードはひとつにまとめられるが、`ALL`オプションを使用することで重複レコードも残しておくことが出来る。

```
SELECT *
  FROM items
  WHERE id IN (1, 2)
UNION ALL
SELECT *
  FROM items
  WHERE id IN (2, 3);
```

このSQLでは、id2のレコードが２回出てくる。（ただidがprimary_keyの場合はエラーになるか…？）



### JOIN

テーブル同士を横方向に結合する処理。

#### INNER JOIN

`items`テーブル

|id|name|price|
|:----|:----|:----|
|1|pencil|100|
|2|pen|NULL|
|3|eraser|50|

`shops`テーブル

|id|name|
|:----|:----|
|1|first|
|2|second|
|3|third|

`item_shop`テーブル

|id|shop_id|item_id|num|
|:----|:----|:----|:----|
|1|1|1|10|
|2|1|2|20|
|3|2|3|5|

この３テーブルが存在しているとする。

```
SELECT
  item_shop.id
  item_shop.shop_id
  item_shop.item_id
  item_shop.num
  items.name
  items.price
  FROM item_shop INNER JOIN items
  ON item_shop.item_id = items.id;
```

こうすると、

|id|shop_id|item_id|num|name|price|
|:----|:----|:----|:----|:----|:----|
|1|1|1|10|pencil|100|
|2|1|2|20|pen|NULL|
|3|2|3|5|eraser|50|

という結果を得ることが出来る。





## その他知識

### NULLに関して

テーブルを定義する際には、原則として`NOT NULL`制約を設定すべきらしい。

理由は色々あるみたいだが、勉強した限りでは大きく以下の２点。

#### 比較演算子がつかえない

`NULL`を検索したい場合は`IS NULL`、または`IS NOT NULL`を使用する必要がある。

`users`テーブルに`name`カラムが`NULL`のレコードがあるとする。

その際に`SELECT * FROM users WHERE name = NULL;`とクエリを叩いたとしても、１レコードも返ってこない。

なので、`SELECT * FROM users WHERE name IS NULL;`といった形にしないといけない。


#### NULL値を取りうるカラムに対する比較演算の注意

|id|name|price|
|:----|:----|:----|
|1|pencil|100|
|2|pen|NULL|
|3|eraser|50|

上記のような`items`テーブルがある際に、

```
SELECT *
  FROM items
  WHERE name = 'pen'
    AND price <> 100;
```

このようなクエリを叩いたとする。

感覚的には`pen`のレコードが返ってきそうな気がするが、実際はレコードは１行も返ってこない。

理由は`price <> 100`の部分、`pen`の`price`は`NULL`である。`NULL`に対する論理演算の結果は`true`でも`false`でもなく、`unknown`という状態になってしまう。`unknown`は`false`に近い扱いをされる（実際には細かい部分で違うが）ので、`AND`の条件を満たさず結果的にレコードは１行も返されない。

### 集約関数

`COUNT`とか`SUM`とかのこと。

集約関数が使えるのは、`SELECT`句、`HAVING`句、`ORDER BY`句のみ。**（`WHERE`句では使用できないので注意。）**

集約関数を`SELECT`句で使用すると、結果は1行になる。（ex: `SELECT COUNT(*) FROM items;`）

#### 記法

|id|name|price|
|:----|:----|:----|
|1|pencil|100|
|2|pen|NULL|
|3|eraser|50|

`関数名(対象カラム名)`という風に書く。例えば`AVG(price)`。

注意として、集約関数は`NULL`を除外する。例えば`AVG(price)`の結果は`(100 + 50) / 2`と`NULL`を除外して計算し、結果として`75`となる。`NULL`を特定の値にみなした上で含めたい場合は`COALESCE`関数を使用する模様。

例外として、`COUNT(*)`は`NULL`も含めて数える。


#### 重複を省いて計算

`DISTINCT`を使用する。例えばテーブル内の`category`カラムのパターンを数えたい場合は、`SELECT COUNT(DISTINCT category) FROM items;`みたいな感じで。



### トランザクション

`BEGIN TRANSACTION`をしておくと、`COMMIT`するまで実データに影響を与えること無くSQLを実行できる。トランザクションをキャンセルする場合は`ROLLBACK`をすればいい。


#### トランザクションに関する疑問

1. トランザクションA開始
1. トランザクションB開始
1. トランザクションAコミット
1. トランザクションBコミット

このような状況において、トランザクションAでBに影響があるようなSQLを実行していた場合どうなるのか？



## 疑問

### アプリケーションプログラムでの対応をした方がいいパターンも多いのでは？

SQLで出来ることはかなり多いけど、一種のシェル芸みたいな感じになって時間が経つと理解が出来ないようなクエリが出てきたりするのではないかという疑問。

それをするのであれば、ある程度はアプリケーション内でフィルタ処理等をしたほうがいいのではとか思った。
