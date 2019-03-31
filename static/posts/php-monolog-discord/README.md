---
created_at: 2018-10-05
---

# [PHP] MonologのDiscordWebhook対応

Monologには、Slack用のHandlerは公式で用意されているが、今回DiscordのWebHookを使いたかったためそれに関してメモ。

Monologのコード例は以下な感じ。

```
<?php

use Monolog\Logger;
use Monolog\Handler\StreamHandler;

// create a log channel
$log = new Logger('name');
$log->pushHandler(new StreamHandler('path/to/your.log', Logger::WARNING));

// add records to the log
$log->warning('Foo');
$log->error('Bar');
```

`$log->warning`等で送られたログをどう扱うかがHandlerによって制御される（例の場合`StreamHandler`）。

Monologでは、以下のような形でオリジナルのHandlerを作成できる。

```
class MyHandler extends AbstractProcessingHandler
{
    public function __construct($level = Logger::DEBUG, $bubble = true)
    {
        parent::__construct($level, $bubble);
    }

    protected function write(array $record)
    {
        echo $record["formatted"] . PHP_EOL;
    }
}
```

`write`メソッドがログが送られてきた際の処理になるので、DiscordのWebHookにログを送りたい場合は例えば

```
<?php

require_once __DIR__ . "/vendor/autoload.php";

use Monolog\Logger;
use Monolog\Handler\AbstractProcessingHandler;

class DiscordHandler extends AbstractProcessingHandler
{
    private $webhookUrl;
    private $client;

    public function __construct($webhookUrl, $level = Logger::DEBUG, $bubble = true)
    {
        $this->webhookUrl = $webhookUrl;
        $this->client = new GuzzleHttp\Client();

        parent::__construct($level, $bubble);
    }

    protected function write(array $record)
    {
        $this->client->request(
            "POST",
            $this->webhookUrl,
            [
                "json" => [
                    "content" => "```" . $record["formatted"] . "```",
                ],
            ]
        );
    }
}


$url = "Discord WebHook URL";

$log = new Logger("DiscordTest");
$log->pushHandler(new DiscordHandler($url, Logger::WARNING));

$log->warning("Warning Test");
$log->debug("Debug Test");
```

このようにすればいい。（今回はPOSTするためにGuzzleを使用している）
