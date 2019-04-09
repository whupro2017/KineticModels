var express = require("express");
var app = express();
console.log("到这");
app.get("/buttonClicked",function(req,res){
    console.log("到这");
    var nodeCmd = require('node-cmd');
    var data = "send to client";
    nodeCmd.get(
        'cd E:\\Desktop\\project\\cesiumJS\\node_modules\\obj2gltf&&node bin\\obj2gltf.js -i box.obj -o E:\\Desktop\\project\\KineticModels\\public\\cesium\\Models\\test.gltf',
        function (err, stdout, stderr) {
            if (err) {
                console.log("\n" + stderr);
                console.log("出错");
                data="模型转换失败";
                res.send(data);
            } else {
                console.log(stdout);
                console.log("成功");
                data="xx";
                // res.send(data);
            }
        }
    )
    console.log(req.query.value); //get param
    data="xx";
    res.send(data);
    res.end();
})
