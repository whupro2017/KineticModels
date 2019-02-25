// var http = require('http');
// http.createServer(function(req,res){
//     res.writeHead(200,{'Content-Type':'text/html'});
//     res.write('<h1>helldddo</h1>');
//     res.end('<p>Hello f</p>')
// }).listen(3000);     //事件监听3000端口
// console.log('open 2s ');
var express = require('express');
var fs = require("fs");
var app = express();
//方法1：通过express.static访问静态文件，这里访问的是ajax.html
//app.use(express.static("./"));
//方法2：使用fs.readFile打开html文件
app.get("/test.html", function (request, response) {
    fs.readFile("./" + request.path.substr(1), function (err, data) {
        // body
        if (err) {
            console.log(err);
            //404：NOT FOUND
            response.writeHead(404, {"Content-Type": "text/html"});
        } else {
            //200：OK
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(data.toString());
        }
        console.log("xx");
        response.end();
        console.log("xx"+request.path);
    });
});
app.listen(8080, function () {
    //监听http://127.0.0.1:8080端口
    console.log("server start");
});

