---
created_at: 2019-01-10
---

# XAMPP+CGIでGMail経由でメールを送信する

## 手順

+ `sendmail.ini`を編集
+ cgiの該当設定ファイル等に、XAMPP内の`sendmail.exe`のパスを指定

## `sendmail.ini`を編集

```
smtp_server=smtp.gmail.com
smtp_port=587
auth_username=[GMailのメールアドレス]
auth_password=[GMailのパスワード]
force_sender=[使用するGMailのメールアドレス]
```

## cgiの該当設定ファイル等に、XAMPP内の`sendmail.exe`のパスを指定

例えば、以下のように指定する。

```
$config{'sendmail'} = 'C:\xampp\sendmail\sendmail.exe';
```

該当コードは対象のCGIにより変わるので注意。



## ハマりどころ

### 二段階認証をしているGMailアカウントを使用しない

二段階認証をしているとまた面倒な手順があるみたいなので新しくテストアカウントでも作ってやること


### アカウントのセキュリティ設定を緩くする必要がある

GMailのアカウント設定の「安全性の低いアプリのアクセス」をONにする必要がある。

なおさらテストアカウントを作ってやること。
