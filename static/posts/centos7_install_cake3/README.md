---
created_at: 2017-02-09
---

# [Vagrant]CentOS7にCakePHP3の開発環境を整えるまで

## 手順

+ CentOS7の立ち上げる
+ 各種インストール
	+ Apache
	+ PHP
  + MySQL
+ CakePHP3のインストール
	+ Composerのインストール
	+ CakePHP3プロジェクトの立ち上げ




## CentOS7を立ち上げる

[Vagrantbox.es](http://www.vagrantbox.es/)よりダウンロード（今回は[CentOS 7 x64 (Minimal, Shrinked, Guest Additions 4.3.26) (Monthly updates)](https://github.com/holms/vagrant-centos7-box/releases/download/7.1.1503.001/CentOS-7.1.1503-x86_64-netboot.box)）を選択。適当なフォルダに配置。

```
vagrant box add CentOS7_x64 (ダウンロードしたboxへのパス)

vagrant init CentOS7_x64
```

initにより作成されたVagrantfileの以下の記述を追加

```
# 仮想サーバーのローカルIPを設定
config.vm.network "private_network", ip: "192.168.33.10"
```

仮想マシン起動

```
vagrant up
```

## 各種インストール

### Apache

```
sudo yum update

# apacheのインストール
sudo yum install -y httpd httpd-devel

# sudo service httpd start の代わり
sudo systemctl start httpd.service

# sudo chkconfig httpd on の代わり
sudo systemctl enable httpd.service

# ポート開放
sudo firewall-cmd --permanent --zone=public --add-service=http
sudo firewall-cmd --permanent --zone=public --add-service=https
sudo firewall-cmd --reload
```

.htaccessを有効にするために、設定ファイルを修正

```
sudo vi /etc/httpd/conf/httpd.conf
```

```
<Directory "/var/www/html">
    ~
    # AllowOverrideをAllにする
    AllowOverride All
    ~
</Directory>
```

また、同設定ファイルのEnableSendfileをoffに設定（Vagrantの共有ディレクトリ上のファイルの更新が正常に認識されなくなる場合がある）

```
EnableSendfile off
```

Vagrantfileに以下の行を追加

```
config.vm.synced_folder "./", "/vagrant", owner: 'vagrant', group: 'apache', mount_options: ['dmode=777', 'fmode=666']
```

vagrant再起動

```
vagrant reload
```

#### シンボリックリンクを貼っておく

プロジェクトファイルはホスト端末に配置し、好きなエディタで弄れるようにしておきたい。
そのために、ドキュメントルートから共有ディレクトリへシンボリックリンクを貼る。

```
cd /vagrant
mkdir html

cd /var/www
sudo rm -rf html
sudo ln -s /vagrant/html ./html
```

### PHP

デフォルトのリポジトリからのインストールの場合、php5.4がインストールされてしまいCakePHP3が動作しないのでremiリポジトリからphpをインストールする必要がある。

```
# epelリポジトリのインストール
sudo yum install -y epel-release

# remiリポジトリのインストール
sudo rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-7.rpm

sudo yum install -y --enablerepo=remi,remi-php56 php php-devel php-mbstring php-pdo php-gd php-intl php-mysqlnd
```


### MySQL

```
sudo rpm -ivh http://dev.mysql.com/get/mysql57-community-release-el7-7.noarch.rpm

sudo yum install -y mysql-community-server

sudo systemctl start mysqld.service
```

初期パスワードは開発環境で使うには複雑な物が設定されているので、以下の手順で「root」に変更。

```
# 初期パスワードを確認
sudo cat /var/log/mysqld.log | grep 'temporary password'
> 2017-02-11T19:15:22.764658Z 1 [Note] A temporary password is generated for root@localhost: hogehoge # hogehogeがパスワード

# 先程確認したパスワードでログイン
mysql -u root -p

mysql> SET GLOBAL validate_password_length=4;
mysql> SET GLOBAL validate_password_policy=LOW;
mysql> set password for root@localhost=password('root');
```

#### phpmyadminをインストールしておく

```
sudo yum install -y --enablerepo=remi,remi-php56 phpMyAdmin
```

ホストOSからアクセス出来るように、設定ファイルを編集

```
sudo vi /etc/httpd/conf.d/phpMyAdmin.conf

<IfModule mod_authz_core.c>
  # Apache 2.4
  # Require local # この行をコメントアウト
  Require all granted # この行を追加
</IfModule>
```

apache再起動

```
sudo systemctl restart httpd
```


## CakePHPのインストール

### Composerのインストール

```
curl -sS https://getcomposer.org/installer | php

# パスが通っている場所に移動
sudo mv composer.phar /usr/local/bin/composer
```

### CakePHPプロジェクトの作成

```
cd /vagrant/html

composer create-project --prefer-dist cakephp/app ./
```

### MySQLの設定

config/app.phpのDatasourcesの項目にMySQLの設定を記述


```
    ~

    'Datasources' => [
        'default' => [
            'className' => 'Cake\Database\Connection',
            'driver' => 'Cake\Database\Driver\Mysql',
            'persistent' => false,
            'host' => 'localhost',
            'username' => 'root', # 編集
            'password' => 'root', # 編集

            ~

        ],

    ~
```


## 参考

[PHP7 + CakePHP3.xの開発環境構築手順](http://qiita.com/healsgoclues/items/711605d9b98df8236917)

[CentOS6／CentOS7にPHP5.6／PHP7をyumでインストール](http://qiita.com/ozawan/items/caf6e7ddec7c6b31f01e)

[CentOS7.1にMySQL 5.7をインストール](http://qiita.com/ksugawara61/items/336ffab798e05cae4afc)

[mysql5.7でパスワードを変更する](http://qiita.com/RyochanUedasan/items/9a49309019475536d22a)

[PHP5.6(CentOS7x64)にphpMyAdminをインストールする](http://qiita.com/kenichiro-yamato/items/1a8efbfd738b85369e46)
