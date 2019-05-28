var express = require("express");
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var path = require('path');
var mysql = require('mysql');
var app = express();
var readline = require('readline');
app.use(express.static("public")).listen(8080);
console.log("server started at'http://127.0.0.1:8080/collision.html'")


// c.on('ready', function () {
//     console.log("ftp连'接成功");
//     c.mkdir('1', function (err) {
//         if (err) throw err;
//     });
//     c.list(function (err, list) {
//         if (err) console.log(err);
//         console.dir(list);
//         c.end();
//     });
// })

// fs.readdir('public/cesium/trace/frame0.dat', function (err, data) {
//     console.log(data);
// });
// var LineByLine = require('./readlinesyn');
// var filename = './新建文本文档.txt';
// var liner = new LineByLine();
// liner.open( filename );
// var theline;
// while( !liner._EOF )
// {
//     theline = liner.next();
//     console.log( 'READ LINE: ' + theline );
// }
// liner.close();

app.get("/get_dat_arr", function(req, res) {
    console.log(req.query);
    var num = req.query.num;
    var frs = new Array(300);
    var rls = new Array(300);
    var arrs = new Array(300);
    var nums = new Array(300);
    var count = 0;

    function readl(i) {
        rls[i].on('line', function(line) {
            arrs[i].push(line);
        });
        rls[i].on('close', function() { // console.log(arr);
            console.log(i + "帧完成");
            count++;
            if (count == 300) {
                var data = { "arrs": arrs };
                res.send(data);
                res.end();
            }
        });
    }
    for (var i = 0; i < 300; i++) {
        frs[i] = fs.createReadStream('public/cesium/trace/frame' + i + '.dat');
        rls[i] = readline.createInterface({ input: frs[i] });
        arrs[i] = new Array();
        readl(i);
    }
    // var fRead = fs.createReadStream('public/cesium/trace/frame'+num+'.dat');
    // var objReadline = readline.createInterface({input: fRead});
    // var arr = new Array();
    // var c = 0;
    // objReadline.on('line', function (line) {
    //     arr.push(line);
    //     // console.log(line);
    //     if (line != 0) {
    //         c++;
    //     }
    // });
    // objReadline.on('close', function () { // console.log(arr);
    //     // console.log(arr);
    //     var data = {"arr": arr,"count":c};
    //     res.send(data);
    //     res.end();
    // });
})

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'user1',
    password: '123456',
    database: 'pointcloud'
});
connection.connect();

var case_id;


app.get("/buttonClicked", function(req, res) {
    var nodeCmd = require('node-cmd');
    var data = "send to client";
    nodeCmd.get(
        'cd E:\\Desktop\\project\\cesiumJS\\node_modules\\obj2gltf&&node bin\\obj2gltf.js -i house.obj -o E:\\Desktop\\project\\KineticModels\\public\\cesium\\Models\\test.gltf',
        function(err, stdout, stderr) {
            if (err) {
                console.log("\n" + stderr);
                console.log("出错");
                data = "模型转换失败";
                res.send(data);
                res.end();
            } else {
                console.log(stdout);
                console.log("成功");
                data = "OBJ转换成功";
                res.send(data);
                res.end();
                // res.send(data);
            }
        }
    )
    console.log(req.query.value); //get param
});
app.get("/get_cases", function(req, res) {
    connection.query('SELECT case_id from case_t', function(error, results, fields) {
        if (error) throw error;
        res.send(results);
        res.end();
    });
})
app.get("/get_scenes", function(req, res) {
    console.log("选定案件号：" + req.query.value);
    case_id = req.query.value;
    connection.query('SELECT scene_id from scene_t where case_id=' + req.query.value, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
        res.end();
    });
})

var scene_id;
app.get("/get_kinetic_models", function(req, res) {
    console.log("选定场景号：" + req.query.value);
    scene_id = req.query.value;
    connection.query('SELECT id,kinetic_id from kinetic_t where scene_id=' + req.query.value, function(error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results);
        res.end();
    });

})

app.get("/get_mark_info", function(req, res) {
    console.log(req.query.value);
    connection.query('SELECT info from mark_info where id=' + req.query.value, function(error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results);
        res.end();
    });
})
app.get("/get_sub_menu", function(req, res) {
    fs.readdir('public/cesium/icons/' + req.query.value, function(err, files) {
        if (err) {
            throw err;
        }
        // files是一个数组
        // 每个元素是此目录下的文件或文件夹的名称
        res.send(files);
        res.end();
    });
})
app.get("/get_icon_menu", function(req, res) {
    fs.readdir('public/cesium/icons/' + req.query.top_name + '/' + req.query.sub_name, function(err, files) {
        if (err) {
            throw err;
        }
        // files是一个数组
        // 每个元素是此目录下的文件或文件夹的名称
        res.send(files);
        res.end();
    });
})
app.get('/files', function(req, res, next) {
    fs.readFile('./indexz.html', function(err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
})

app.get("/get_elements", function(req, res) {
    var element_type = req.query.element_type;
    var scene_id = req.query.scene_id;
    console.log(element_type + "," + scene_id);
    connection.query("SELECT ID,SERIAL_NO from " + element_type + " WHERE scene_id=" + scene_id, function(error, results, fields) {
        if (error) {
            var data = { msg: "写入数据库错误，上传失败" };
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        console.log(results);
        res.send(results);
        res.end();
    });
})

app.get('/model_location', function(req, res, next) {
    var longitude = req.query.longitude;
    var latitude = req.query.latitude;
    var height = req.query.height;
    var scene_id = req.query.scene_id;
    var model_name = req.query.model_name;
    connection.query("UPDATE  modelinfo SET start_lon=" + longitude + ",start_lat=" + latitude + ",start_height=" + height + "WHERE scene_id=" + scene_id + " and name='" + model_name + "'", function(error, results, fields) {
        if (error) {
            var data = { msg: "写入数据库错误，上传失败" };
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = { msg: "更新模型位置成功" };
        // c.end();
        console.log("更新模型位置成功");
        res.send(data);
        res.end();
    });

})

app.get('/store_elements', function(req, res, next) {
    //form表单
    var form = JSON.parse(req.query.form);
    var scene_id = req.query.scene_id;
    var jslength = 0;
    for (var i in form) {
        connection.query("INSERT into scene_bio_evidence (scene_id,SERIAL_NO,EVIDENCE_TYPE,DESCRIPTION,LEFT_POSITION,COLLECTION_MODE,COLLECTED_BY,COLLECTED_DATE,CRIMINAL_FLAG,UTILIZATION,PRINT_FLAG,STORAGE_FLAG) " +
            "value (" + scene_id + "," + form[i].序号 + ",'" + form[i].类型 + "','" + form[i].基本特征 + "','" + form[i].遗留部位 + "','" + form[i].提取方法 + "','" + form[i].提取人 + "','" + form[i].提取日期 + "','" + form[i].可靠程度 + "','" + form[i].利用情况 + "','" + form[i].列入现场提取登记表 + "','" + form[i].是否已DNA系统 + "')",
            function(error, results, fields) {
                if (error) {
                    var data = { msg: "写入数据库错误，上传失败" };
                    // c.end();
                    res.send(data);
                    res.end();
                    return console.error(error);
                } else if (jslength == form.length - 1) {
                    var data = { msg: "存入数据库成功" };
                    // c.end();
                    console.log("存入element文件成功");
                    res.send(data);
                    res.end();
                }
                jslength++;
            });
    }
});

app.get('/get_element_info', function(req, res, next) {
    //form表单
    var element_type = req.query.element_type;
    var element_id = req.query.element_id;
    connection.query("SELECT  scene_id,SERIAL_NO,EVIDENCE_TYPE,DESCRIPTION,LEFT_POSITION,COLLECTION_MODE,COLLECTED_BY,COLLECTED_DATE,CRIMINAL_FLAG,UTILIZATION,PRINT_FLAG,STORAGE_FLAG from " + element_type + " where id=" + element_id, function(error, results, fields) {
        if (error) {
            var data = { msg: "读取数据库错误" };
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = { msg: "读取数据库成功" };
        // c.end();
        console.log("读取数据库成功");
        console.log(results);
        res.send(results);
        res.end();

    });

});

app.get('/update_element_info', function(req, res, next) {
    //form表单
    var element_type = req.query.element_type;
    var element_id = req.query.element_id;
    var COLLECTED_BY = req.query.COLLECTED_BY;
    var COLLECTED_DATE = req.query.COLLECTED_DATE;
    var COLLECTION_MODE = req.query.COLLECTION_MODE;
    var CRIMINAL_FLAG = req.query.CRIMINAL_FLAG;
    var DESCRIPTION = req.query.DESCRIPTION;
    var EVIDENCE_TYPE = req.query.EVIDENCE_TYPE;
    var LEFT_POSITION = req.query.LEFT_POSITION;
    var PRINT_FLAG = req.query.PRINT_FLAG;
    var STORAGE_FLAG = req.query.STORAGE_FLAG;
    var UTILIZATION = req.query.UTILIZATION;
    connection.query("UPDATE " + element_type + " set COLLECTED_BY='" + COLLECTED_BY + "',COLLECTED_DATE='" + COLLECTED_DATE + "',COLLECTION_MODE='" + COLLECTION_MODE + "',CRIMINAL_FLAG='" + CRIMINAL_FLAG + "',DESCRIPTION='" + DESCRIPTION + "',EVIDENCE_TYPE='" + EVIDENCE_TYPE + "',LEFT_POSITION='" + LEFT_POSITION + "',PRINT_FLAG='" + PRINT_FLAG + "',STORAGE_FLAG='" + STORAGE_FLAG + "',UTILIZATION='" + UTILIZATION + "' where id=" + element_id, function(error, results, fields) {
        // connection.query("UPDATE  COLLECTED_BY=" + COLLECTED_BY +" from " + element_type + " where id=" + element_id, function (error, results, fields) {
        if (error) {
            var data = { msg: "更新失败" };
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        } else {
            var data = { msg: "更新成功" };
            // c.end();
            console.log("更新成功");
            res.send(data);
            res.end();
        }

    });

});

// var Client = require('node-ftp');
// var c = new Client();
// var targetOptions = {
//     host: '127.0.0.1',
//     port: '2121',
//     user: 'anonymous',
//     password: '',
// };
// c.connect(targetOptions);
// c.on('ready', function () {
//     var FTPfolderPath="wallpaper"
//     c.get(FTPfolderPath, function (err) {
//         console.log("获取FTP文件夹" + FTPfolderPath);
//         if (err) {
//             c.mkdir(FTPfolderPath, function (err) {
//                 if (err) throw err;
//                 console.log("FTP服务器创建目录" + FTPfolderPath);
//             })
//         }
//         ;
//     });
// })


app.post('/uploads', function(req, res, next) {
    //form表单
    var form = new formidable.IncomingForm();
    //保留后缀
    form.keepExtensions = true;
    form.encoding = 'utf-8';
    form.maxFileSize = 4 * 1024 * 1024 * 1024;
    //上传文件路径,采用path路径拼接
    form.uploadDir = path.join(__dirname, 'public/Files');
    //如果上传文件夹（多个文件）需将 默认值改为TRUE
    form.multiples = true;
    //该方法会转换请求中所包含的表单数据，callback会包含所有字段域和文件信息
    // fields 是普通表单数据
    // files 是文件数据
    form.parse(req, function(err, fields, files) {
        console.log("开始上传");
        // var Client = require('node-ftp');
        // var c = new Client();
        // var targetOptions = {
        //     host: '127.0.0.1',
        //     port: '2121',
        //     user: 'anonymous',
        //     password: '',
        // };
        // c.connect(targetOptions);
        //该属性upload是在HTML文件的name中设置的
        // c.on('ready', function () {
        //     console.log("ftp连接成功");
        for (var i = 0; i < files.upload.length; i++) {
            var file = files.upload[i];
            var pathnameArray = file.name.split('/');
            var folderPath = form.uploadDir;
            var FTPfolderPath = "";
            for (var j = 0; j < pathnameArray.length - 1; j++) {
                folderPath = path.join(folderPath, pathnameArray[j]);
                // FTPfolderPath = path.join(FTPfolderPath, pathnameArray[j]);
                // c.get(FTPfolderPath, function (err) {
                //     console.log("获取FTP文件夹" + FTPfolderPath);
                //     if (err) {
                //         c.mkdir(FTPfolderPath, function (err) {
                //             if (err) throw err;
                //             console.log("FTP服务器创建目录" + FTPfolderPath);
                //             if(j==pathnameArray.length - 2){
                //                 c.put(file.path, path.join(FTPfolderPath, pathnameArray[pathnameArray.length - 1]), function (err) {
                //                     console.log("本地路径："+path.join(folderPath, pathnameArray[pathnameArray.length - 1])+"；ftp服务器路径："+path.join(FTPfolderPath, pathnameArray[pathnameArray.length - 1]));
                //                     if (err) throw err;
                //                     console.log("上传FTP文件" + pathnameArray[pathnameArray.length - 1]);
                //                 });
                //             }
                //         })
                //     }
                //     ;
                // });
                if (!fs.existsSync(folderPath)) {
                    //如果不存在上传文件夹名称，就创建
                    try {
                        fs.mkdirSync(folderPath, 0777);
                        ("成功创建目录" + folderPath);
                    } catch (e) {
                        console.log(e.name + ": " + e.message);
                    }
                }
                //移动文件夹并更改名称
                //  fs.rename(oldpath, newpath, callback)
                // fs.rename(file.path, path.join(folderPath, pathnameArray[1]));
            }

            try {
                fs.renameSync(file.path, path.join(folderPath, pathnameArray[pathnameArray.length - 1]));
                if (pathnameArray[pathnameArray.length - 1] == "kinetic.json") {
                    console.log("获得json文件");
                    var info = {};
                    fs.readFile(path.join(folderPath, pathnameArray[pathnameArray.length - 1]), function(err, data) {
                        if (err) {
                            return console.error(err);
                        }
                        var filedata = data.toString(); //将二进制的数据转换为字符串
                        filedata = JSON.parse(filedata); //将字符串转换为json对象
                        var kinetic_id = filedata.kinetic_id;
                        connection.query("INSERT into kinetic_t (scene_id,kinetic_id) value (" + scene_id + ",'" + kinetic_id + "')", function(error, results, fields) {
                            if (error) {
                                var data = { msg: "写入数据库错误，上传失败" };
                                // c.end();
                                res.send(data);
                                res.end();
                                return console.error(error);
                            }
                            info.kinetic_id = kinetic_id;

                        });
                        var model_info = [];
                        var index = 0;
                        for (var gltf in filedata.gltfs) {
                            connection.query("INSERT into modelinfo (scene_id,path,name) value (" + scene_id + ",'" + filedata.gltfs[index].path + "','" + filedata.gltfs[index].name + "')", function(error, results, fields) {
                                if (error) {
                                    var data = { msg: "写入数据库错误，上传失败" };
                                    // c.end();
                                    res.send(data);
                                    res.end();
                                    return console.error(error);
                                }
                                model_info.push(filedata.gltfs[index].name, filedata.gltfs[index].path);
                                if (index == filedata.gltfs.length - 1) {
                                    console.log("sql完成");
                                    console.log("上传成功");
                                    info.msg = '上传成功';
                                    info.model_info = model_info;
                                    res.send(info);
                                    res.end();
                                }
                                index++;
                            });
                        }
                        //  返回此案件包含案件列表
                        // connection.query("SELECT from modelinfo where scene_id=" + scene_id, function (error, results, fields) {
                        //     if (error) {
                        //         var data = {msg: "写入数据库错误，上传失败"};
                        //         // c.end();
                        //         res.send(data);
                        //         res.end();
                        //         return console.error(err);
                        //     }
                        //     ;
                        // });
                        // console.log(filedata.gltfs[0].path);

                    })
                }
            } catch (e) {
                console.log(e.name + ": " + e.message);
                var data = { msg: "上传失败" };
                // c.end();
                res.send(data);
                res.end();

            }
        }
        //响应 格式化打印 String
        // console.log("上传结束");
        // var data = {msg: "上传完成"};
        // c.end();
        // res.send(data);
        // if (sql_finished==true)
        //     res.end();
        // });
    });
});

app.post('/upload', function(req, res, next) {
    //form表单
    console.log("开始上传");
    var form = new formidable.IncomingForm();
    //保留后缀
    form.keepExtensions = true;
    form.encoding = 'utf-8';
    form.maxFileSize = 4 * 1024 * 1024 * 1024;
    //上传的数据保存的路径
    form.uploadDir = path.join(__dirname, 'Files');
    //该方法会转换请求中所包含的表单数据，callback会包含所有字段域和文件信息
    // fields 是普通表单数据
    // files 是文件数据
    form.parse(req, function(err, fields, files) {
        // var filename = files.upload.name;
        console.log(files);
        // var path = files.upload.path;
        //移动并更名
        // console.log("重命名");
        // fs.renameSync(path, form.uploadDir + filename);
        // //响应 格式化打印
        // console.log("上传完成");
        res.end();
        // res.end(util.inspect(files));
    });
});