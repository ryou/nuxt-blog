---
created_at: 2017-05-30
---

# SSHの仕組み


SSHに関して頻繁に仕組みを忘れては調べなおしてってのを繰り返しているので、後々再び忘れた際にすぐに思い出せるようメモっておく。

## 要約

+ SSHは実際のデータのやり取りは共通鍵暗号方式で行っている
+ 共通鍵暗号方式の鍵を公開鍵暗号方式でやり取りすることで、共通鍵の問題点を克服している


## 詳細

### 共通鍵暗号方式

+ 共通鍵暗号方式は単一の鍵を用いて暗号化・復号化を行う
+ 問題としては、鍵のやり取りの時点で中間者攻撃を受けた場合、通信の中身がダダ漏れになる。

### 公開鍵暗号方式

+ 公開鍵・秘密鍵のペアで運用される暗号方式。
+ 公開鍵で暗号化されたものは秘密鍵でしか復号化できず、秘密鍵で暗号化されたものは公開鍵でしか復号化出来ない。  
  （どちらの鍵を暗号化・復号化用途に使うかは自由だが、ペアで使わないといけない）
+ 公開鍵側→秘密鍵側への通信は、通信の暗号化用途で使う。SSHではこちらを利用する。
+ 秘密鍵側→公開鍵側への通信は、署名用途。SSLサーバー証明書はこれを利用。
+ 最初の公開鍵の送信の時点で公開鍵を傍受される可能性があるが、されたところで問題はない。（秘密鍵がないと復号化できないし）
+ 問題点として、計算量が多くなるので処理が重くなる。


### SSH

+ 共通鍵暗号方式だと鍵のやり取りの問題がある。
+ とはいっても、通信の暗号化用途だと公開鍵暗号方式だと一方通行。処理が重いという問題も有る。
+ なので、SSHでは共通鍵暗号方式でデータのやり取りを行うが、共通鍵のやりとりの際だけ公開鍵暗号方式を使って行うことで共通鍵が外部に漏れるのを防いでいる。


## 参考

[共通鍵暗号と公開鍵暗号の解説とSSHでの認証手順 - VPSサービスの使い方](https://www.adminweb.jp/web-service/ssh/index4.html)

[公開鍵暗号と電子署名の基礎知識 - Qiita](http://qiita.com/kunichiko/items/ef5efdb41611d6cf7775)

## 気になる

[RSA暗号の世界 | サルにも分かるRSA暗号](http://www.maitou.gr.jp/rsa/rsa10.php)

実際にRSA暗号（公開鍵暗号）の暗号化・復号化がどのようにされているのか。ざっとしか読んでないのでじっくり読んで理解したい。