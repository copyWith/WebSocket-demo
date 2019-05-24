var websocket = require("ws");   //引入websocket
var websocketServer = websocket.Server;   //引用Server类
var wss = new websocketServer({ port: 8021 });   //创建实例

var arr=[];
wss.on("connection",function wsFn(ws){
    ws.on('message', function (message) {
        arr.push(message);
        ws.send(JSON.stringify(arr));
    });
});