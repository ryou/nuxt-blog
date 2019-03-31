---
created_at: 2018-05-19
---

# delegate/Action/event/UnityAction/UnityEvent

## delegate

変数に関数を格納するために、関数の型を定義するための方法。

例えば、

```
delegate void OnCalcComplete(float value);
```

これは、「float型の引数を持ちvoidを返すOnCalcCompleteという型の関数」を定義している。

```
delegate void OnCalcComplete(float value);

class MyDelegate
{
    public void Calc(OnCalcComplete callback)
    {
        // 計算
        var result = 1.0f * 100.0f;

        callback(result);
    }
}

class Program
{
    static void Main(string[] args)
    {
        var myDelegate = new MyDelegate();
        myDelegate.Calc(PrintValue);
    }

    static void PrintValue(float value)
    {
        Console.WriteLine(value);
    }

}
```

delegateによって上のように、関数を渡して実行させることが可能。

ちなみにdelegateは`+=`演算子で実行する関数を追加していくことが出来る`マルチキャストデリゲート`という機能がある。これは主に後述する`event`にて使う。


## Action

Actionはdelegateをもっと楽に書くための方法と思えばいい。

Actionを使用すると、前述のソースは以下のようになる。

```
class MyDelegate
{
    public void Calc(Action<float> callback)
    {
        // 計算
        var result = 1.0f * 100.0f;

        callback(result);
    }
}

class Program
{
    static void Main(string[] args)
    {
        var myDelegate = new MyDelegate();
        myDelegate.Calc(PrintValue);
    }

    static void PrintValue(float value)
    {
        Console.WriteLine(value);
    }

}
```

`delegate ~`の行を削除し、`OnCalcComplete`を`Action<float>`にて置き換えている。

`OnCalcComplete`はつまり「floatを引数として持ち、返り値が無い関数」を表すための型だが、わざわざ毎回自前で命名するのは面倒だからそういう場合は`Action<T>`を使って汎用的に表現しろって話。

ちなみに、Actionは戻り値が無い場合に使い、戻り値がある場合は`Func`を使う。他にも比較の際に使うComparison等あるけどとりあえずAction/Funcを覚えとけばいいのではなかろうか。

## event

ブラウザJSにおける`AddEventListener`みたいに使うためのアレ。

コード例を挙げると以下のようなもの。

```
class MyDelegate
{
    public event Action<float> OnCalcComplete = value => { };

    public void Calc()
    {
        // 計算
        var result = 1.0f * 100.0f;

        this.OnCalcComplete(result);
    }
}

class Program
{
    static void Main(string[] args)
    {
        var myDelegate = new MyDelegate();
        myDelegate.OnCalcComplete += value =>
        {
            Console.WriteLine(value);
        };
        myDelegate.Calc();
    }
}
```

やってることはdelegateと同じで、実際`event`を外しても動作する。

`event`を付与した場合は、クラス外部からは`+=`と`-=`の操作しか出来なくすることが出来る。制限をかけるためのもの。


## UnityAction/UnityEvent

[【Unity】UnityEventの用法と用量 - うら干物書き](http://www.urablog.xyz/entry/2016/09/11/080000)

インスペクタ経由でコールバックを設定したい場合はUnityEventを使用する、という理解でOK。詳細は上記リンクで
