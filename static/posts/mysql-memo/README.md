---
created_at: 2019-01-28
---

# [MySQL] メモ

## 複合ユニークキー

複数のカラムの組み合わせでユニークであることを担保する方法。

```
CREATE TABLE users
  (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    age INT,
    UNIQUE (name, age)
  )
```

上記のように、`UNIQUE (name, age)`という形で定義する。

この場合、

```
INSERT INTO users
  (name, age)
  VALUES
  ("takashi", 10)
```

とやったあとに再度

```
INSERT INTO users
  (name, age)
  VALUES
  ("takashi", 10)
```

とやってしまうとエラーになる。
