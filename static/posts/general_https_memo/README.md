---
created_at: 2017-08-11
---

# HTTPS通信の仕組みの覚書

現在制作物をPWA対応しようと思い、そのためにサイトをHTTPS対応しようとしているのだが、その手順の中に「なぜこの手順が必要なのか」っていう物が非常に多く、それを理解しないままこなしていくのは非常に気持ちが悪い。

「手順の必要性がわからないのはHTTPS通信の仕組みを理解していないからだ」と思ったため、HTTPS通信の仕組みに関して調べた。そのうちまた忘れそうなので、覚書として雑に残しておく。


## サーバー証明書発行まで

1. サーバーが秘密鍵・公開鍵を作成。
1. サーバーが作成した公開鍵と共に認証局に証明書の申請をする。
1. 認証局は、「サーバー証明書（サーバーの情報諸々と"サーバーの公開鍵"）」を「認証局の秘密鍵」で暗号化したものを発行しサーバーに送る。


## 実際のHTTPS通信の流れ

1. クライアントがサーバーへHTTPS通信を要求
1. サーバーはクライアントへサーバー証明書を返却
1. クライアントは証明書を認証局の公開鍵で復号化  
復号化出来れば、証明書が認証局の秘密鍵で暗号化されたもの、つまり認証局で認可されたサーバーであることが証明される（認証としての公開鍵方式の利用）
1. 復号化された証明書に含まれる「サーバーの公開鍵」を用いてクライアントが作成した共通鍵を暗号化し、サーバーへ返却（通信の機密保持のための公開鍵方式の利用）
1. 以降、クライアントとサーバーの共通鍵で暗号化された通信が行われる

実際には、ルート認証局までの確認手順があるみたいだが、簡単のため省略している。


## 参考

[図解で学ぶネットワークの基礎：SSL編 - Lesson4：相手が信頼できることを確かめる「サーバー証明書」とは？：ITpro](http://itpro.nikkeibp.co.jp/article/COLUMN/20071012/284426/?rt=nocnt)