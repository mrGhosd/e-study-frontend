var env = require("../config/env.config.js");
var express = require("express"),
    app = express(),
    http = require("http").createServer(app),
    io = require("socket.io").listen(http),
    redis = require('redis').createClient();

//app.set("ipaddr", "188.166.99.8");
app.set("ipaddr", env[process.env.NODE_ENV].host);
app.set("port", 5001);

redis.subscribe('rtchange');
redis.subscribe('chat');

io.on('connection', function(socket){
    //socket.broadcast.emit('connected', "1");
    redis.on('message', function(channel, message){
        socket.emit('rtchange', JSON.parse(message));
    });
});

http.listen(app.get("port"), app.get("ipaddr"), function() {
    console.log("RUN", app.get("ipaddr"));
}).on("error", function(error){
    console.log(error);
});
