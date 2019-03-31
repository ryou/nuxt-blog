---
created_at: 2018-01-25
---

# nvmでNode.jsのバージョンを管理

[creationix/nvm: Node Version Manager - Simple bash script to manage multiple active node.js versions](https://github.com/creationix/nvm#usage)


## インストール

方法変わるかもしれないので公式読め

## 各種コマンド

### ヘルプ

```
nvm --help
```

### インストール可能なバージョンの一覧表示

```
nvm ls-remote
```

### Node.jsのインストール

```
nvm install <version>

# 最新LTS(Long Term Support)のインストール
nvm install --lts
```

### 使用バージョンの変更

```
nvm use <version>
```




## .nvmrc

プロジェクトルートに`.nvmrc`を配置しておくと`nvm use`コマンドで`.nvmrc`に指定したバージョンに変更するようになる。
