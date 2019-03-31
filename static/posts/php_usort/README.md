---
created_at: 2017-05-11
---

# [PHP]usortに関する覚書

PHPでソートをしたくなって、usortって関数がすごく便利で良かったんだけど正直理解しづらい部分があって未来の自分がすぐ使い方を思い出せるようにするための覚書。

[PHP: usort - Manual](http://php.net/manual/ja/function.usort.php)

## 使い方

```
usort($array, function($a, $b) {
  // 返り値が正なら$bが手前、負なら$aが手前にくるべきやつと判断される
  return $a - $b;
});
```

上記のように、第一引数にはソートしたい配列、第二引数には値の比較用の関数を渡す。

比較用の関数に関して、コメントに書いている通り返り値が正なら二つ目の引数である$b、負の値なら一つ目の引数である$aが配列の手前にくるべきやつであると判断される。

もう一度書く、「返り値が正なら第二引数が手前、負なら第一引数が手前」である。

### 例1

数値が格納されているインデックス配列を昇順に並び替えたい場合は以下の通りになる。

```
$array = [1, 3, 6, 3, 4, 2];

usort($array, function($a, $b) {
  return $a - $b;
});

var_dump($array);
```

出力結果は

```
array(6) {
  [0]=>
  int(1)
  [1]=>
  int(2)
  [2]=>
  int(3)
  [3]=>
  int(3)
  [4]=>
  int(4)
  [5]=>
  int(6)
}
```

「$a - $b」が正になるのは$aが$bより大きい場合、つまり昇順に並べ替えたいので$bが手前に来て欲しいパターンなので、「返り値が正なら第二引数が手前、負なら第一引数が手前」より$bが手前に来る。

### 例2

例1のような単純なパターンならusortの恩恵はほとんど感じられないが、オブジェクトや多次元配列なんかをソートしたい際はすごく重宝する。例2はそんなパターン

名簿を格納している配列$peopleが存在しており、その配列を「親、教師、学生」の順で並び替えしたいといった場合は以下のようなコードになる。

```
$people = [
  [
    "name" => "まさし",
    "type" => "student",
  ],
  [
    "name" => "たかし",
    "type" => "teacher"
  ],
  [
    "name" => "はなこ",
    "type" => "parent"
  ],
  [
    "name" => "さなえ",
    "type" => "student"
  ]
];

usort($people, function($a, $b) {
  $order = [
    "parent",
    "teacher",
    "student"
  ];

  $aOrder = array_search($a["type"], $order);
  $bOrder = array_search($b["type"], $order);

  return $aOrder - $bOrder;
});

var_dump($people);
```

出力結果は

```
array(4) {
  [0]=>
  array(2) {
    ["name"]=>
    string(9) "はなこ"
    ["type"]=>
    string(6) "parent"
  }
  [1]=>
  array(2) {
    ["name"]=>
    string(9) "たかし"
    ["type"]=>
    string(7) "teacher"
  }
  [2]=>
  array(2) {
    ["name"]=>
    string(9) "さなえ"
    ["type"]=>
    string(7) "student"
  }
  [3]=>
  array(2) {
    ["name"]=>
    string(9) "まさし"
    ["type"]=>
    string(7) "student"
  }
}
```

このように、オブジェクトの配列や多次元配列をソートしたい際に、usortだとややこしい部分はあるものの比較的シンプルにソート処理を書くことが出来る。
