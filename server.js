var express = require("express");
var app = express();
app.use(express.static("public")).listen(8080);
console.log("server started at'http://127.0.0.1:8080/collision.html'");
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123',
    database : 'pointcloud'
});
connection.connect();
var id;
// connection.query('SELECT * from xx', function (error, results, fields) {
//     if (error) throw error;
//     id=results[0].id;
//     console.log('The solution is: ', results[0].id);
// });
app.get("/buttonClicked",function(req,res){
    var nodeCmd = require('node-cmd');
    var data = "send to client";
    nodeCmd.get(
        'cd E:\\Desktop\\project\\cesiumJS\\node_modules\\obj2gltf&&node bin\\obj2gltf.js -i house.obj -o E:\\Desktop\\project\\KineticModels\\public\\cesium\\Models\\test.gltf',
        function (err, stdout, stderr) {
            if (err) {
                console.log("\n" + stderr);
                console.log("出错");
                data="模型转换失败";
                res.send(data);
                res.end();
            } else {
                console.log(stdout);
                console.log("成功");
                data="OBJ转换成功";
                res.send(data);
                res.end();
                // res.send(data);
            }
        }
    )
    console.log(req.query.value); //get param
});
app.get("/get_cases",function(req,res){
    connection.query('SELECT case_id from case_t', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        res.end();
    });
});
app.get("/get_scenes",function(req,res){
    console.log(req.query.value);
    connection.query('SELECT id from modelinfo where case_id='+req.query.value, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results);
        res.end();
    });
})