var http = require('http');   //����httpģ��:
var io = require('socket.io');

// ����http server��������ص�����:
var server = http.createServer(function (request, response) {
    //// �ص���������request��response����,
    //// ���HTTP�����method��url:
    //console.log(request.method + ': ' + request.url);
    //// ��HTTP��Ӧ200д��response, ͬʱ����Content-Type: text/html:
    //response.writeHead(200, {'Content-Type': 'text/html'});
    //// ��HTTP��Ӧ��HTML����д��response:
    //response.end('<h1>Hello world!</h1>');
});
var userList=[],arr=[];
function getNowFormatDate() {//��ȡ��ǰʱ��
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
//ws����:
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
// �÷���������8022�˿�(http����):
server.listen(8022,function(){
    console.log("biu biu biu!")
});