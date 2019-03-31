---
created_at: 2018-09-12
---

# [PHP] 日付ライブラリCarbonとDateTimeの差

Laravelが日付のライブラリとして[Carbon](https://carbon.nesbot.com/)を使用している。便利という話は聞くものの、DateTimeとどのような差があるのかよくわからなかったので簡単なサンプルを書いて確認してみた。

```
<?php

require_once __DIR__ . "/vendor/autoload.php";

use Carbon\Carbon;

date_default_timezone_set('Asia/Tokyo');

$d = new DateTime();
$c = new Carbon();


/***********************************************************************
 共通の機能
 **********************************************************************/

// フォーマットに従った出力
echo $d->format("Y/n/j G:i:s") . PHP_EOL; // => 2018/9/12 4:27:51
echo $c->format("Y/n/j G:i:s") . PHP_EOL; // => 2018/9/12 4:27:51

// 時刻文字列からインスタンス生成
echo DateTime::createFromFormat("Y年n月j日", "2018年9月12日")->format("Y/n/j  G:i:s") . PHP_EOL; // => 2018/9/12  4:27:51
echo Carbon::createFromFormat("Y年n月j日", "2018年9月12日")->format("Y/n/j  G:i:s") . PHP_EOL; // => 2018/9/12  4:27:51

// 現在時刻から一日後を取得
echo $d->add(new DateInterval("P1D"))->format("Y/n/j  G:i:s") . PHP_EOL; // => 2018/9/13  4:27:51
echo Carbon::tomorrow()->format("Y/n/j  G:i:s") . PHP_EOL; // => 2018/9/13  0:00:00
// ※tomorrowを使った場合、時刻は「00:00:00」を返す。同じ時刻を返す必要がある場合はaddDayを使うか、DateTimeと同様にaddを使う。
echo Carbon::now()->addDay()->format("Y/n/j  G:i:s") . PHP_EOL; // => 2018/9/13  4:27:51

// 差分を求める
// DateTimeの場合、〜時間かを算出するのは無理？そうだと「特定のDateTimeから1時間以上経過してるか」みたいな時使えない
echo $d->diff(new DateTime(), true)->format("%d日 %h時間") . PHP_EOL; // => 1日 0時間
echo Carbon::now()->diffInHours(Carbon::now()->addDay()) . "時間" . PHP_EOL; // => 24時間

// 比較（比較演算子による比較が可能）
var_dump($d > new DateTime()); // => bool(true)
$first = Carbon::now()->addHour();
$second = Carbon::now();
var_dump($first > $second); // => bool(true)


/***********************************************************************
 Carbon特有の機能
 **********************************************************************/

// セッター・ゲッター
echo $c->year . PHP_EOL; // => 2018
echo $c->month . PHP_EOL; // => 9
echo $c->locale('ja')->monthName . PHP_EOL; // => 9月
echo $c->day . PHP_EOL; // => 12

// 曜日等のチェック
var_dump(Carbon::now()->isWednesday()); // => bool(true)



/***********************************************************************
 番外：経過日数等計算時の注意
 **********************************************************************/
$first = DateTime::createFromFormat("Y年n月j日 G:i:s", "2018年9月12日 12:01:10");
$second = DateTime::createFromFormat("Y年n月j日 G:i:s", "2018年9月13日 0:00:00");
// こういうパターンで差を「1日」取得したい場合、このままでは駄目
echo $first->diff($second, true)->format("%d日") . PHP_EOL; // => 0日
// 予め時刻を揃えておく必要がある
echo $first->setTime(0, 0, 0)->diff($second, true)->format("%d日") . PHP_EOL; // => 1日

// Carbonでも同じ
$first = Carbon::createFromFormat("Y年n月j日 G:i:s", "2018年9月12日 12:01:10");
$second = Carbon::createFromFormat("Y年n月j日 G:i:s", "2018年9月13日 0:00:00");
echo $first->diffInDays($second) . "日" . PHP_EOL; // => 0日
echo $first->startOfDay()->diffInDays($second) . "日" . PHP_EOL; // => 1日
```

以上。Carbonには他にも細かい機能が豊富にあるが、頻繁に使うのは以上ではないだろうか。曜日などのチェックが簡単に出来ること、DateIntervalを使わずに済む点が良いとは思ったが、そこまでめちゃくちゃ便利とは感じなかった。

とは言うものの、Laravelではupdated_at,created_at等がCarbonを返すので、Carbonを使うことを習慣付けたいとは思う。
