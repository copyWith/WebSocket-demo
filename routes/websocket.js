var websocket = require("ws");   //����websocket
var websocketServer = websocket.Server;   //����Server��
var wss = new websocketServer({ port: 8021 });   //����ʵ��

var arr=[];
wss.on("connection",function wsFn(ws){
    ws.on('message', function (message) {
        arr.push(message);
        ws.send(JSON.stringify(arr));
    });
});