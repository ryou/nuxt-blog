---
created_at: 2018-08-09
---

# DIに関する覚書

ユニットテストしやすくするために、クラス内で他クラスのインスタンスを生成するのでなく、コンストラクタの引数としてインスタンスを受け取ろうぜっていうアレ

## 例

実際にVRChatのAPIを叩くサンプルプロジェクトを作って試してみた。

[GitHub](https://github.com/ryou/di-sample)

### DIなし

```
import { VrcApi } from './vrcapi';
import { config } from './data/config';

export class NotDI {
    private _api: VrcApi;

    constructor() {
        this._api = new VrcApi(
            config.username,
            config.password
        );
    }

    async fetchUserId(username: string) {
        await this._api.init();
        const userData =  await this._api.fetchUserByName(username);
        return userData.id;
    }
}
```

DI無しの場合はこのようにコンストラクタ内でVRChatのAPIを扱うためのクラス`VrcApi`をインスタンス化することになる。

この場合、ユニットテストの際も常にVRChatAPI本番環境に直接通信を行うようになってしまう。（一応フラグとかを設定して、フラグによってモックにつなぎにいくみたいな形にすることは可能なのかな？）

### DI有り

```
import { AbstractVrcApi } from './vrcapi';

export class DI {
    constructor(private _api: AbstractVrcApi) {}

    async fetchUserId(username: string) {
        await this._api.init();
        const userData =  await this._api.fetchUserByName(username);
        return userData.id;
    }
}
```

DI有りの場合、上記のように抽象クラスである`AbstractVrcApi`のインスタンスをコンストラクタの引数として受け取るようにしている。

こうしておくと、

```
import { VrcApiMock } from '../src/vrcapi';
import { DI } from '../src/di';

describe('NotDI', () => {
    test('Get User ID', () => {
        const api = new VrcApiMock();
        const notDI = new DI(api);
        return notDI.fetchUserId('nekomasu')
            .then((id) => {
                expect(id).toBe('usr_d0d44753-45d6-4c8e-b7de-ba9c53cb31a1');
            });
    });
});
```

このように、ユニットテストする際にモッククラスである`VrcApiMock`のインスタンスを渡すことで、ユニットテスト時にモックサーバー等への通信によるテストを行うことが出来る。


## その他

### Jestでテスト時に`Cross origin null forbidden`というエラー

jsdomにより、ブラウザ環境をシミュレートしてテストが実行されているため、クロスオリジン通信をしようとしているとエラーが出てしまう。

node環境の場合は、`jest.config.js`で`testEnvironment`に`node`を設定すれば問題ない。

[公式ドキュメント](https://doc.ebichu.cc/jest/docs/ja/configuration.html#testenvironment-string)


### VRChatのusernameとdisplayNameは異なる

普段表示されているのはdisplayName、大文字で登録したものは小文字としてusernameに登録されるっぽい。

```
displayName: Nekomasu
username: nekomasu
```
