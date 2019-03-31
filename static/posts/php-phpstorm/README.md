---
created_at: 2019-01-14
---

# PHPStorm覚書

## PHPDocに関して

### こまごましたこと

+ プロパティやメソッドの１行上で`/**`と書いて`Enter`すると、適当なPHPDocコメントを入れてくれる。

### 特定の型の配列を指定

`private $users = []`という`User`型の配列があったとする。単純にPHPDocを自動生成すると、

```
/**
 * @var array
 */
private $users = []
```

と、型無しの配列としてコメント生成されてしまう。

```
/**
 * @var User[]
 */
private $users = []
```

このように、`User[]`みたいな感じで書いておけば`foreach`とかで`users`を回すときも適切に補完が働いてくれる。
