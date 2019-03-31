---
created_at: 2019-01-03
---

# Pythonメモ

## 雑に

```
# 「+」で文字列連結
print('hoge' + 'fuga')

# 文字列と非文字列の連結はエラー
print('合計は' + 100 + '円です')

# 文字列へのキャストはstr
print('合計は' + str(100) + '円です')

# 数値へのキャストはint
int('100')

# if文にはコロンが必要
if x == 40 and y == 30 :
  print('xは40かつyは30')
elif x == 50 or y == 40 :
  print('xが50またはyが40')
elif not x == 0
  print('xが0じゃない')
else :
  print('例外')

# inputで標準入力を待てる。この時、型は文字列型となっている
# python2系の場合はraw_inputを使う
input_count = input('数を入力してください：')

# 配列は普通
users = ['たかし', 'まさし']
users.append('ひろし')

# 配列はforで舐めれる
for user in users:
  print(user)

# キーバリュー形式の変数は波括弧を使う
config = {
  'version': '2.7',
  'count': 5
}
print(config['version'])

# キーバリュー形式の追加は配列と異なり直接指定する
config['num'] = 10

# for文では、キーが取り出される
for key in config:
  print(key + ':' + config[key])

# whileは普通
i = 0
while i < 10:
  print(i)
  i++

# 関数はこんな感じ
def sum(a, b=0):
  return a + b

# 別ファイルからは「import 拡張子抜きファイル名」で読み込む
import random
num = random.randint(0, 2)

# 下記の書き方で、名前空間を書かなくても直接クラス名をかける
from [モジュール名] import [クラス名]

# passって書くと何も処理がないことを示せる
class User:
  pass
# インスタンス生成にnewは必要ない
user = User()

# メンバ関数の第一引数は必ず「self」
# コンストラクタは「__init__」
class User:
  def __init__(self, first_name='NO', last_name='NAME'):
    self.first_name = first_name
    self.last_name = last_name

  def get_full_name(self):
    return self.first_name + self.last_name

# 継承は以下のように書く
class AdminUser(User):
  def __init__(self, permission):
    super().__init__()
    self.permission = permission
```

## ちょっとしたスクリプト書くときによく使うやつ

### 特定の名前のディレクトリが無ければ作る

`os.mkdir`を使う。

指定したディレクトリが既に存在する場合は例外になってしまうため、`os.path.isdir`でディレクトリの存在確認を行う必要がある。

```
import os

directory_name = 'dest'

if not os.path.isdir(directory_name):
  os.mkdir(directory_name)
```

### 実行ファイルのパスの取得方法

`__file__`を使用する。

`__file__`はカレントディレクトリからの相対パス。絶対パスが欲しい場合は`os.path.abspath`を使用する。

```
print(__file__) # => filename.py
print(os.path.abspath(__file__)) # => /path/to/filename.py
```

### 特定ディレクトリからファイル一覧を取得

`os.listdir`を使用する。

```
print(os.listdir('src')) # => ['script.py', 'data.txt']
```

### コマンドを実行する

`subprocess.check_output`を使用する。

引数に実行したいコマンドを与える。失敗時には例外が発生。

```
result = subprocess.check_output(['ls', '-la', 'directory_name'])
print (result)
```

### 特定のディレクトリにあるモジュールをインポート

例えば`libs/util.py`のクラス`Util`をインポートしたい場合は

```
from libs.util import Util
```

でいける。

注意点として、`libs`ディレクトリに`__init__.py`が存在しないと駄目。また、`__init__.py`をおいていると実行時に`~.pyc`ファイルが生成されるので、`.gitignore`で`*.pyc`を記述しておいて管理しないようにしておくといい。

## 疑問点

### subprocess.check_outputにおける引数の文字列の扱い

```
# youtube-dl "https://www.youtube.com/watch?v=N5FC_qDZeJY"
# ってコマンドは正常に動くが

# こちらは動かない
result = subprocess.check_output([
    'youtube-dl',
    '"https://www.youtube.com/watch?v=N5FC_qDZeJY"'
])

# ダブルクォーテーション外したら動く
result = subprocess.check_output([
    'youtube-dl',
    'https://www.youtube.com/watch?v=N5FC_qDZeJY'
])
```
