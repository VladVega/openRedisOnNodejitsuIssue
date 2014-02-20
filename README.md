What is this? A way to reproduce the ETIMEDOUT error when running a nodeJS app on nodejitsu and using openredis with node-redis. This happens when you need a long lasting redis client (pubsub for instance).


To reproduce error:

1. Make sure your openredis instance is set to 3600 timeout.

2. Run this app in your nodejitsu account with a different name/subdomain

Every hour you will see this error
```[02/18 13:04:00 PST][out] Publisher err: [Error: Redis connection to node-aaaaa.openredis.com:11855 failed - read ETIMEDOUT]```


My fix:

1. Set your openredis timeout value to 1800

2. Ping the db with the client every 20min.

```
var Config = {
    redis:{
        host: 'yourHost',
        port: 13932,
        pw: 'yourPW',
        timeoutVal: 1800, //the value you set one the openredis instance : seconds
        pinger_frequency: 20 //minutes
    }
};
```
