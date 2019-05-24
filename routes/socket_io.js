var http = require('http');   //导入http模块:
var io = require('socket.io');

// 创建http server，并传入回调函数:
var server = http.createServer(function (request, response) {
    //// 回调函数接收request和response对象,
    //// 获得HTTP请求的method和url:
    //console.log(request.method + ': ' + request.url);
    //// 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    //response.writeHead(200, {'Content-Type': 'text/html'});
    //// 将HTTP响应的HTML内容写入response:
    //response.end('<h1>Hello world!</h1>');
});
var userList=[],arr=[];
function getNowFormatDate() {//获取当前时间
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}
//ws服务:
io.listen(server).on('connection', function(user){
    console.log("server start...");
    user.on("login",function(res){
        userList.push(res);
        user.broadcast.emit('userBack', JSON.stringify(userList));
        user.emit('userBack', JSON.stringify(userList));
    });
    user.on("sendMsg",function(res){
        arr.push({
            name:res.name,
            time:getNowFormatDate(),
            cont:res.cont
        });
        user.broadcast.emit('sendMsgBack', JSON.stringify(arr));
        user.emit('sendMsgBack', JSON.stringify(arr));
    });
    user.emit('sendMsgBack', JSON.stringify(arr));
});
// 让服务器监听8022端口(http服务):
server.listen(8022,function(){
    console.log("biu biu biu!")
});