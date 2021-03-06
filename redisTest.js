var Redis= require('redis');//node-redis

var Config = {
    redis:{
        host: 'yourHost',
        port: 13932,
        pw: 'yourPW',
        timeoutVal: 3600, //the value you set one the openredis instance : seconds
        pinger_frequency: 30 //minutes
    }
};

process.on('uncaughtException', function(err) {
    console.log('uncaught:',err)
});

console.log('App starting, I set my openredis timeout to ' + (Config.redis.timeoutVal * 1000) +
    ' minutes. Pinger frequency: ' + Config.redis.pinger_frequency + ' minutes.' );

var client= Redis.createClient(Config.redis.port, Config.redis.host);
//Redis.debug_mode = true;
client.auth(Config.redis.pw, function(err){
    if(err){
        return console.log('pub auth err:', err);
    }
    console.log('publisher created');

    client.on('error', function(err){
        console.log('Publisher err:',err);
    });

    var testPublish= function(){
        client.publish('test47', 'testhi47');
        console.log('publishtestdone')
    };

    setInterval(testPublish, Config.redis.pinger_frequency*60*1000);
    testPublish();
});

//open a server so that nodejitsu has an endpoint.
require('http').createServer(function(req, res) {
    res.end('ok');
}).listen( process.env.PORT || 5001, function(err){
    if(err){
        console.log(err);
    }
    console.log('created server:'+ (process.env.PORT || 5001));
});

