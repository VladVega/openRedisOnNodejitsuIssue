Repro code for using openredis on nodejitsu

Every hour you will see
```[02/18 13:04:00 PST][out] Publisher err: [Error: Redis connection to node-aaaaa.openredis.com:11855 failed - read ETIMEDOUT]```
printed out in the logs.

Steps to see the error:
Publish this app with different name and subdomain on nodejitsu. Then check back in one 1 hour or 2 and you will see:

```
[02/18 12:28:17 PST][out] publishtestdone
[02/18 12:28:17 PST][out] publisher created
[02/18 12:28:17 PST][out] created server:5001
[02/18 12:58:17 PST][out] publishtestdone
[02/18 13:04:00 PST][out] Publisher err: [Error: Redis connection to node-aaaaa.openredis.com:11855 failed - read ETIMEDOUT]
[02/18 13:28:17 PST][out] publishtestdone
[02/18 13:58:17 PST][out] publishtestdone
[02/18 14:04:00 PST][out] Publisher err: [Error: Redis connection to node-aaaaa.openredis.com:11855 failed - read ETIMEDOUT]
[02/18 14:28:17 PST][out] publishtestdone
[02/18 14:58:17 PST][out] publishtestdone
[02/18 15:04:00 PST][out] Publisher err: [Error: Redis connection to node-aaaaa.openredis.com:11855 failed - read ETIMEDOUT]
[02/18 15:28:17 PST][out] publishtestdone

```
