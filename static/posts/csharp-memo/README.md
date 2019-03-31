---
created_at: 2018-04-08
---

# 独習C#メモ

C#に関して、自分が知ってる言語には無かった点や罠になりそうな点をまとめておく。

## ドキュメンテーションコメント

以下のように`/// <summary>`でドキュメンテーションコメントが記述出来る。

ドキュメンテーションコメントの内容は、インテリセンスの際に要約として表示してくれる。

（インテリセンスへはVisualStudioを開き直さないと反映されなかった。）

```
using System;

namespace csharp_test
{
    class Program
    {
        /// <summary>
        /// 「Hello World」と出力
        /// </summary>
        static void Hello()
        {
            Console.WriteLine("Hello World!");
        }

        static void Main(string[] args)
        {
            Program.Hello();
        }
    }
}
```

## varによる型推論

C#は静的型付け言語なので、

```
int counter = 0;
```

というように、変数宣言の際に型を指定子なければならない。

ただ、C#3から`var`による型推論が導入され、

```
var counter = 0;
```

と宣言すると、右辺（この場合`0`）を見て型を自動的に設定してくれる。

注意なのは、あくまで自動的な型付けをしてくれるだけであって、動的型付けになったわけではない。

なので、以下のソースはコンパイルエラーとなる。

```
var counter = 0;
var userInput = "hoge";

// int型にstring型を代入しようとしてるのでエラー
counter = userInput;
```

また、フィールドに対してはvarを使用できないことも注意。


## 文字列への変数展開

ESにおけるテンプレートリテラルのような仕様がC#でも存在している。（C#6から使える）

`$"..."`のように、文字列リテラルの前の`$`を指定すると、変数・式を`{}`で囲むことで展開してくれる。

```
var name = "山田";
var text = $"彼の名前は{name}です。";

Console.WriteLine(text);
```


## 整数型から浮動小数点への変換の際の桁落ち

`float`型は仮数部が23ビットのため、16777216(2^24)以上の整数を変換しようとすると桁落ちが発生してしまう

```
int i = 16777216;
float f = i;
Console.WriteLine(f); // => 1.677722E+07
```


## null条件演算子・null合体演算子

`null`な変数のメソッドにアクセスしようとすると、当然例外が発生してしまう。

そのためnullチェックが必要となるわけだが、変数がnullでない時だけメソッドにアクセスする「null条件演算子」と、nullでなければ後ろに続く式を返す「null合体演算子」が便利。

null条件演算子は

```
string text = null;

string outText = text?.Trim(); // outTextにはnullが入る
```

のように、変数がnullの際にはメソッドへのアクセスをスルーしてnullと評価してくれる。

null合体演算子は

```
string text = null;

string outText = text ?? "text is null"; // "text is null"がoutTextに入る
```

のように、`A ?? B`のように記述し、Aがnullの際にはBと評価される。

この２つを利用すると

```
string text = null;
string outText = null;

if (text != null)
{
    outText = text.Trim();
} else {
    outText = "text is null";
}

Console.WriteLine(outText);
```

このようなコードが

```
string text = null;

string outText = text?.Trim() ?? "text is null";

Console.WriteLine(outText);
```

のようにすっきりかける。


## null許容型

値型はnullを通常扱えないが、`int?`のように`?`を付けることでnullを扱える「null許容型」として宣言できる。

```
int? num = null; // エラーにならない
```


## 多次元配列・ジャグ配列

多次元配列は行・列がそれぞれツラが揃っている配列で、ジャグ配列は不揃いな配列のこと。

### 多次元配列の宣言

```
int[,] data = new int[3, 3];

int[,] data = {
    {1, 2, 3},
    {1, 2, 3},
    {1, 2, 3},
};

int[,] data = {
    {1, 2, 3},
    {1, 2, 3},
    {1}, // ツラが揃ってないのでエラー
};
```

### ジャグ配列の宣言

```
int[][] data = new int[3][];
data[0] = new int[3];
data[1] = new int[2];
data[2] = new int[5];
```

## 整数同士の除算

整数同士の除算は、自動的に整数化されてしまう。

```
double result = 3 / 4;
Console.WriteLine(result); // => 0
```

なので、少数が欲しい時は明示的に`d`なり`f`なりをつけて少数が返ってくるようにすること。

```
double result = 3d / 4;
Console.WriteLine(result); // => 0.75
```

## 参照型の比較

参照型の比較は、参照先が同じか否かで判断される。

```
int[] data01 = { 1 };
int[] data02 = { 1 };

Console.WriteLine(data01 == data02); // => false
```

例外として、文字列は中身が同じか否かで判断される。

```
string text01 = "hoge";
string text02 = "hoge";

Console.WriteLine(text01 == text02); // => true
```


## nameof演算子

`nameof`演算子を使用することで、識別子を文字列として取得することが出来る。

```
var counter = 10;

Console.WriteLine(nameof(counter) + " is " + counter); // => counter is 10
```

これの何が嬉しいかというと、VisualStudioの「名前の変更」機能の対象になってくれるのが嬉しいみたい。

## foreach

`foreach (value in Collection)`という書き方でforeachが利用できる。

```
string[] magius = {
    "ドグ",
    "マグ",
    "ラグ",
};

foreach (var name in magius)
{
    Console.WriteLine(name);
}
```
