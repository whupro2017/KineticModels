var Canvas = require('canvas');
var readline = require('readline');
var fs = require('fs');
// var tinify = require("tinify");
// tinify.key = "pmofs5ukduRPGzMsogUQ5VAr1G49NK41"; // 自行注册
function creatwImages(frameN) {
    if (!fs.existsSync('public/smoke/frame' + frameN)) {
        //如果不存在上传文件夹名称，就创建
        try {
            fs.mkdirSync('public/smoke/frame' + frameN, 0o777);
        } catch (e) {
            console.log(e.name + ": " + e.message);
        }
    }
    var fRead = fs.createReadStream('public/cesium/trace/frame' + frameN + '.dat');
    var arr = new Array();
    var objReadline = readline.createInterface({input: fRead});
    objReadline.on('line', function (line) {
        arr.push(line);
        // console.log(line);
        if (line != 0) {
        }
    });
    objReadline.on('close', function () { // console.log(arr);
        // var outs = new Array(25);
        // var canvass = new Array(25);
        // var streams = new Array(25);
        var count = 0;
        for (var k = 0; k < 25; k++) {
            creatwImage(k, frameN, arr);
        }
        console.log(frameN + "完成");
        objReadline.close();
    });
}

function creatwImage(heightN, frameN, arr) {
    var out = fs.createWriteStream('public/smoke/frame' + frameN + '/image' + heightN + '.png');
    var canvas = new Canvas.Canvas(55, 53);
    var stream = canvas.createPNGStream();
    stream.on('data', function (chunk) {
        out.write(chunk);
    });
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';
    var count = heightN * 2915;
    for (var i = 0; i < 55; i++) {
        for (var j = 0; j < 53; j++) {
            ctx.globalAlpha = arr[count] / 255;
            ctx.fillRect(i, j, 1, 1);
            count++;
        }
    }
    ctx.save();
}

for (var i = 0; i < 1; i++) {
    creatwImages(i);
}


// var x=0;
// function  b() {
//     setTimeout(b,1);
//     var i=0;
//     while(i<1000000000){
//         i++;
//     }
//     x+=1;
//     console.log("x="+x);
// }

// var source = tinify.fromFile("circum.png");
// source.toFile("circum.png");

//递归删除文件夹功能
// var fs = require('fs');
// function delDir(path) {
//     let files = [];
//     if (fs.existsSync(path)) {
//         files = fs.readdirSync(path);
//         files.forEach((file, index) => {
//             let curPath = path + "/" + file;
//             if (fs.statSync(curPath).isDirectory()) {
//                 delDir(curPath); //
//             } else {
//                 fs.unlinkSync(curPath);// 删除文件
//             }
//         });
//         if(path=="smoke"){
//             console.log("完成");
//         }
//         fs.rmdirSync(path);
//     }
// }
// delDir("smoke");


// var Canvas = require('canvas');
// var out = fs.createWriteStream('circum.png');
// var canvas = new Canvas.Canvas(50, 50);
// var stream = canvas.createPNGStream();
// stream.on('data', function (chunk) {
//     out.write(chunk);
// });
// var ctx = canvas.getContext('2d');
// ctx.fillStyle = '#000000';
// ctx.beginPath();
// ctx.arc(25, 25, 25, 0, 2*Math.PI);
// ctx.stroke();
// // ctx.fillStyle = "green";
// ctx.fill();
// ctx.save();
// console.log("结束");

