---
created_at: 2018-08-14
---

# RxJSメモ

## 分岐パターン

### n対n

単一のObservableに複数subscribeした場合、subscribeしたタイミングでStreamの複製が割り当てられる。

で、何が起こるかというと、複製されたStreamではまた値が最初からになる。

[RxJS を学ぼう #4 – COLD と HOT について学ぶ / ConnectableObservable – PSYENCE:MEDIA](https://tech.recruit-mp.co.jp/front-end/post-11558/)

```
import * as Rx from 'rxjs';
import * as Operators from 'rxjs/operators';

const clock$ = Rx.interval(1000);

clock$.subscribe(value => console.log(value));

setTimeout(() => {
    clock$.pipe(
        Operators.map(value => value * 10)
    )
    .subscribe(value => console.log(value));
}, 2500);
```

#### 実行結果

```
0
1
2
0
3
10
4
20
5
30
```

### 1対n(HOTなObservable)

前述の通りCOLDな状態では、複数`subscribe`するとストリームの複製がそれぞれ割り当てられる。

`publish`を行う事で、`ConnectableObservable`に変化。その後、`connect`することでデータを流しはじめる。この状態はHOTな状態で、複数subscribeされた場合でも同じストリームが利用されるので同じデータが流される。

**※ConnectableObservableへ明示的にダウンキャストしないと現状エラーが発生する。これに関してはissueとして登録されている。**

[Pipe operator cannot infer return type as ConnectableObservable · Issue #2972 · ReactiveX/rxjs · GitHub](https://github.com/ReactiveX/rxjs/issues/2972)

```
import * as Rx from 'rxjs';
import * as Operators from 'rxjs/operators';

const clock$ = Rx.interval(1000).pipe(
    Operators.publish()
) as Rx.ConnectableObservable<number>;

clock$.subscribe(value => console.log(value));

setTimeout(() => {
    clock$.pipe(
        Operators.map(value => value * 10)
    )
    .subscribe(value => console.log(value));
}, 2500);

clock$.connect();
```

#### 実行結果

```
0
1
2
20
3
30
4
40
5
50
```

### 1対n(Subject)

1対nは`Subject`を利用することでも可能。

[RxJS を学ぼう #5 – Subject について学ぶ / Observable × Observer – PSYENCE:MEDIA](https://tech.recruit-mp.co.jp/front-end/post-11951/)

```
import * as Rx from 'rxjs';
import * as Operators from 'rxjs/operators';

const clock$ = Rx.interval(1000);
const subject = new Rx.Subject<number>();

clock$.subscribe(subject);
subject.subscribe(value => console.log(value));
subject
    .pipe(
        Operators.map(value => value * 10)
    )
    .subscribe(value => console.log(value));
```

#### 実行結果

```
0
0
1
10
2
20
3
30
4
40
5
50
```


## 任意タイミングでデータを流す

`Subject`で`next`を利用することで可能。

Angularではこれ別コンポーネントへメッセージを渡す場合に使う。

```
import * as Rx from 'rxjs';

class ToastService {
    _subject: Rx.Subject<string>;

    get observable() {
        return this._subject.asObservable();
    }

    constructor() {
        this._subject = new Rx.Subject<string>();
    }

    launchToast(message: string) {
        this._subject.next(message);
    }
}

class FirstComponent {
    constructor(private toastService: ToastService) {}

    showMessage(message: string) {
        this.toastService.launchToast(message);
    }
}

class SecondComponent {
    constructor(private toastService: ToastService) {
        this.toastService.observable.subscribe(message => console.log(message));
    }
}

const toastService = new ToastService();
const first = new FirstComponent(toastService);
new SecondComponent(toastService);

first.showMessage('toast message');
```

### 実行結果

```
toast message
```
