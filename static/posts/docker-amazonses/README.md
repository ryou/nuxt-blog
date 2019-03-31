---
created_at: 2019-01-07
---

# AWS+Docker+PHP+AmazonSESでメール送信するまで

詳細な手順は省略。詰まった所をメモっておく

## AWSの認証情報をDockerコンテナ内に配置する

AWSの認証情報は通常`~/.aws/credentials`として配置し、AWS SDKもそこから情報を読み取る。

認証情報は`aws configure`した際にファイルが作成されるが、コンテナ内で`aws configure`を行っていない場合コンテナ内には当然ファイルが作成されない。

なので、Dockerfileで

```
COPY .aws/credentials /.aws/credentials
```

等してファイルをコピーしないとAWS SDKが使用できないので注意。

awsコマンドはdockerイメージのやり取りでしか使っておらず、コンテナ外で全て実行していたので数分ハマった。


## composerでrequireする際に、PHPのバージョン指定をしておく

composerでrequireする際、特に何もしなければcomposerを実行した環境のPHPバージョンに従ってパッケージがインストールされる。

例えば、ホスト側がPHP5でゲスト側がPHP7の際にホスト側でrequireするとPHP5に適応したパッケージがインストールされてしまう。

これを回避するには、「コンテナ内で作業を行う」のと「composer.jsonでPHPのバージョン指定を行う」等ある。

「composer.jsonでPHPのバージョン指定を行う」には、`composer.json`に

```
{
  "config": {
    "platform": {
      "PHP": "7.2.13"
    }
  }
}
```

といった感じでPHPバージョンを指定すればOK。
