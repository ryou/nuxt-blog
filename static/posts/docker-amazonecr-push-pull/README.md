---
created_at: 2019-01-07
---

# MacでAmazonECRへDockerイメージをpushしてAWSでpullするまで

基本的に[公式サイト](https://docs.aws.amazon.com/ja_jp/AmazonECR/latest/userguide/what-is-ecr.html)読めばわかるのでとりあえず読んだほうが良い。

## ローカル端末からAmazonECRへイメージをpush

```
# aws cliをインストール
pip install awscli --upgrade --user

# 初期設定
aws configure

# pushするイメージをビルド
docker image build -t [適当なイメージ名] .

# AmazonECRにリポジトリを作成
aws ecr create-repository --repository-name [リポジトリ名]

# json形式で情報が出力される

# イメージとリポジトリを結びつける
docker tag [イメージ名] [出力されたrepositoryUri]

# ログインコマンドを取得
aws ecr get-login --no-include-email | pbcopy

# クリップボードに保存されたログインコマンドを実行

# リポジトリにイメージをpushする
docker push [repositoryUri]
```

## EC2インスタンスでイメージをpull

```
# 初期設定
aws configure

# ログインコマンドを取得
aws ecr get-login --no-include-email | pbcopy

# クリップボードに保存されたログインコマンドを実行

docker image pull [リポジトリURI]
```
