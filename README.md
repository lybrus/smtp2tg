# Simple SMTP server for forwarding messages to telegram

The server forwards only text messages. Created to work with Yearstar TG series.

env variables:
* `SMTP_USERNAME`, default is `test`
* `SMTP_PASSWORD`, default is `test`
* `BOT_TOKEN` telegram bot token, can be registered using @BotFather
* `CHAT_ID` telegram chat id. It can be retrieved with `curl https://api.telegram.org/bot<BOT_TOKEN>/getUpdates`

Start docker container
```shell
docker run -e BOT_TOKEN=<BOT_TOKEN> -e CHAT_ID=<CHAT_ID> -d -p 2525:2525 lybrus/smtp2tg
```
