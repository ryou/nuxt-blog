---
created_at: 2019-01-27
---

# [JavaScript][疑問] 例外処理（エラーハンドリング）に関して

多くの他言語だと例えば、

```
try {
  // 例外が発生しうる処理
} catch (SomeException error) {
  // 例外処理
}
```

のように書いて、`SomeException`のみcatchしてそれ以外は普通に例外吐かせて処理を止めることが出来る（よね？）。

ただ、JavaScriptに関してはこの方法が出来ないので、

```
try {
  // 例外が発生しうる処理
} catch (error) {
  if (error.name === 'SomeException') {
    // 例外処理
  } else {
    throw error;
  }
}
```

とかしないといけない（はず）。

こんなんでいいんだろうかという疑問
