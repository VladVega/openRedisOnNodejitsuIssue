var Redis= require('redis');
var Config = {};

Config.redis= redis= {
    host: 'proxy4.openredis.com',
    port: 13932,
    pw: 'f0094bb4467705d32607cc4ac19c727b6f1c2a1458291b8833b61e58e27c3447'
};

process.on('uncaughtException', function(err) {
    console.log('uncaught:',err)
});

var publisher = createClient(function(err){
    if(err){
        console.log('pub auth err:', err);
    }
    console.log('publisher created');
    publisher.on('error', function(err){
        console.log('Publisher err:',err);
    });

    var testPublish= function(){
        publisher.publish('test47', 'testhi47');
        console.log('publishtestdone')
    };

    setInterval(testPublish, 30*60*1000);
    testPublish();

});

require('http').createServer(function(req, res) {
    res.end('ok');
}).listen( process.env.PORT || 5001, function(err){
        if(err){

            console.log(err);
        }
        console.log('created server:'+ (process.env.PORT || 5001));
    });

function createClient(callback){
    var client= Redis.createClient(Config.redis.port, Config.redis.host);
    //Redis.debug_mode = true;
    client.auth(Config.redis.pw, function(err){
        if(callback){
            callback(err);
        }
    });
    return client;
}