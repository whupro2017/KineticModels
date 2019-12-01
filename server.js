var express = require("express");
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var path = require('path');
var mysql = require('mysql');
var service = require('./service');
var app = express();
var readline = require('readline');
var java = require('java')
java.classpath.push('javaClass')
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

app.get("/get_dat_arr", function (req, res) {
    console.log(req.query);
    var num = req.query.num;
    var frs = new Array();
    var rls = new Array();
    var arrs = new Array();
    var nums = new Array();
    var count = 0;

    function readl(i) {
        rls[i].on('line', function (line) {
            arrs[i].push(line);
        });
        rls[i].on('close', function () { // console.log(arr);
            console.log(i + "帧完成");
            count++;
            if (count == 300) {
                var data = {"arrs": arrs};
                res.send(data);
                res.end();
            }
        });
    }

    for (var i = 0; i < 300; i++) {
        frs[i] = fs.createReadStream('public/cesium/trace/frame' + i + '.dat');
        rls[i] = readline.createInterface({input: frs[i]});
        arrs[i] = new Array();
        readl(i);
    }


    var fRead = fs.createReadStream('public/cesium/trace/frame' + num + '.dat');
    var objReadline = readline.createInterface({input: fRead});
    var arr = new Array();
    var c = 0;
    objReadline.on('line', function (line) {
        arr.push(line);
        // console.log(line);
        if (line != 0) {
            c++;
        }
    });
    objReadline.on('close', function () { // console.log(arr);
        // console.log(arr);
        var data = {"arr": arr, "count": c};
        res.send(data);
        res.end();
    });
})

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lwh791209',
    database: 'pointcloud'
});
connection.connect();

var case_id;


app.get("/buttonClicked", function (req, res) {
    var nodeCmd = require('node-cmd');
    var data = "send to client";
    nodeCmd.get(
        'cd E:\\Desktop\\project\\cesiumJS\\node_modules\\obj2gltf&&node bin\\obj2gltf.js -i house.obj -o E:\\Desktop\\project\\KineticModels\\public\\cesium\\Models\\test.gltf',
        function (err, stdout, stderr) {
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
app.get("/get_cases", function (req, res) {
    connection.query('SELECT case_id from case_t', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        res.end();
    });
})
app.get("/get_scenes", function (req, res) {
    console.log("选定案件号：" + req.query.value);
    case_id = req.query.value;
    connection.query('SELECT scene_id from scene_t where case_id=' + req.query.value, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        res.end();
    });
})

var scene_id;

app.get("/select_scene", function (req, res) {
    console.log("选定场景号：" + req.query.value);
    scene_id = req.query.value;
    data = {};
    connection.query('SELECT id,kinetic_id from kinetic_t where scene_id=' + req.query.value, function (error, results, fields) {
        if (error) return console.error(error);
        data.kinetic_info = results;
        connection.query('SELECT lon,lat from scene_t where scene_id=' + req.query.value, function (error, results, fields) {
            if (error) return console.error(error);
            data.location = results;
            connection.query('SELECT id,element_type,element_id,icon_path,start_lon,start_lat,start_height from relevant_t where scene_id=' + req.query.value, function (error, results, fields) {
                if (error) return console.error(error);
                data.relevant_info = results;
                console.log(data);
                res.send(data);
                res.end();
            });
        });
    });

})

app.get("/select_thing_scene", function (req, res) {
    console.log("选定场景号：" + req.query.value);
    scene_id = req.query.value;
    data = {};
    connection.query('SELECT id,kinetic_id from kinetic_t where scene_id=' + req.query.value, function (error, results, fields) {
        if (error) return console.error(error);
        data.kinetic_info = results;
        connection.query('SELECT lon,lat from scene_t where scene_id=' + req.query.value, function (error, results, fields) {
            if (error) return console.error(error);
            data.location = results;
            connection.query('SELECT id,thing_type,thing_id,gltf_path,start_lon,start_lat,start_height from thing_relevant where sceneid=' + req.query.value, function (error, results, fields) {
                if (error) return console.error(error);
                data.relevant_info = results;
                console.log(data);
                res.send(data);
                res.end();
            });
        });
    });

})
app.get("/get_mark_info", function (req, res) {
    console.log(req.query.value);
    connection.query('SELECT info from mark_info where id=' + req.query.value, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results);
        res.end();
    });
})
app.get("/get_sub_menu", function (req, res) {
    fs.readdir('public/cesium/icons/' + req.query.value, function (err, files) {
        if (err) {
            throw err;
        }
        // files是一个数组
        // 每个元素是此目录下的文件或文件夹的名称
        res.send(files);
        res.end();
    });
})
app.get("/get_icon_menu", function (req, res) {
    fs.readdir('public/cesium/icons/' + req.query.top_name + '/' + req.query.sub_name, function (err, files) {
        if (err) {
            throw err;
        }
        // files是一个数组
        // 每个元素是此目录下的文件或文件夹的名称
        res.send(files);
        res.end();
    });
})
app.get('/files', function (req, res, next) {
    fs.readFile('./indexz.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
})

app.get("/get_elements", function (req, res) {
    var element_type = req.query.element_type;
    var scene_id = req.query.scene_id;
    console.log(element_type + "," + scene_id);
    connection.query("SELECT ID,SERIAL_NO from " + element_type + " WHERE scene_id=" + scene_id, function (error, results, fields) {
        if (error) {
            var data = {msg: "写入数据库错误，上传失败"};
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
// app.get("/get_things", function (req, res) {//新增内容
//     var thing_type = req.query.thing_type;
//     var scene_id = req.query.scene_id;
//     console.log(thing_type + "," + scene_id);
//     connection.query("SELECT ID,CATEGORY from " + thing_type + " WHERE sceneid=" + scene_id, function (error, results, fields) {
//         if (error) {
//             var data = {msg: "写入数据库错误，上传失败"};
//             // c.end();
//             res.send(data);
//             res.end();
//             return console.error(error);
//         }
//         console.log(results);
//         res.send(results);
//         res.end();
//     });
// })

app.get("/get_things", function (req, res) {
    fs.readdir('public/cesium/Models/model/' + req.query.value, function (err, files) {
        if (err) {
            throw err;
        }
        // files是一个数组
        // 每个元素是此目录下的文件或文件夹的名称
        res.send(files);
        res.end();
    });
})

app.get('/model_location', function (req, res, next) {
    var longitude = req.query.longitude;
    var latitude = req.query.latitude;
    var height = req.query.height;
    var scene_id = req.query.scene_id;
    var model_name = req.query.model_name;
    connection.query("UPDATE  modelinfo SET start_lon=" + longitude + ",start_lat=" + latitude + ",start_height=" + height + "WHERE scene_id='" + scene_id + "'and name='" + model_name + "'", function (error, results, fields) {
        if (error) {
            var data = {msg: "写入数据库错误，上传失败"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        connection.query("UPDATE  scene_t SET lon=" + longitude + ",lat=" + latitude + "WHERE scene_id=" + scene_id + "'", function (error, results, fields) {
            if (error) {
                var data = {msg: "写入数据库错误，上传失败"};
                // c.end();
                res.send(data);
                res.end();
                return console.error(error);
            }
            var data = {msg: "更新模型位置成功"};
            // c.end();
            console.log("更新模型位置成功");
            res.send(data);
            res.end();
        });
    });

})

app.get('/store_elements', function (req, res, next) {
    //form表单
    var form = JSON.parse(req.query.form);
    var scene_id = req.query.scene_id;
    var jslength = 0;
    for (var i in form) {
        connection.query("INSERT into scene_bio_evidence (scene_id,SERIAL_NO,EVIDENCE_TYPE,DESCRIPTION,LEFT_POSITION,COLLECTION_MODE,COLLECTED_BY_NAME,COLLECTED_DATE,CRIMINAL_FLAG,UTILIZATION,PRINT_FLAG,STORAGE_FLAG) " +
            "value (" + scene_id + "," + form[i].序号 + ",'" + form[i].类型 + "','" + form[i].基本特征 + "','" + form[i].遗留部位 + "','" + form[i].提取方法 + "','" + form[i].提取人 + "','" + form[i].提取日期 + "','" + form[i].可靠程度 + "','" + form[i].利用情况 + "','" + form[i].列入现场提取登记表 + "','" + form[i].是否已DNA系统 + "')", function (error, results, fields) {
            if (error) {
                var data = {msg: "写入数据库错误，上传失败"};
                // c.end();
                res.send(data);
                res.end();
                return console.error(error);
            } else if (jslength == form.length - 1) {
                var data = {msg: "存入数据库成功"};
                // c.end();
                console.log("存入element文件成功");
                res.send(data);
                res.end();
            }
            jslength++;
        });
    }
});

app.get('/store_things', function (req, res, next) {//新增内容
    //form表单
    var form = JSON.parse(req.query.form);
    var scene_id = req.query.scene_id;
    var jslength = 0;
    for (var i in form) {
        connection.query("INSERT into thing_tea_table (id,filename,category,sceneid) " +
            "value (" + form[i].id + ",'" + form[i].filename + "','" + form[i].category + "','" + scene_id + "')", function (error, results, fields) {//新网页数据
            if (error) {
                var data = {msg: "写入数据库错误，上传失败"};
                // c.end();
                res.send(data);
                res.end();
                return console.error(error);
            } else if (jslength == form.length - 1) {
                var data = {msg: "存入数据库成功"};
                // c.end();
                console.log("存入thing文件成功");
                res.send(data);
                res.end();
            }
            jslength++;
        });
    }
});


app.get('/element_location', function (req, res, next) {//左键点击绑定要素存入数据库
    var longitude = req.query.longitude;
    var latitude = req.query.latitude;
    var height = req.query.height;
    var scene_id = req.query.scene_id;
    var element_type = req.query.element_type;
    var element_id = req.query.element_id;
    var icon_path = req.query.icon_path;
    connection.query("INSERT into relevant_t (scene_id,element_id,icon_path,start_lon,start_lat,start_height,element_type) value (" + scene_id + ",'" + element_id + "','" + icon_path + "','" + longitude + "','" + latitude + "','" + height + "','" + element_type + "')", function (error, results, fields) {
        if (error) {
            var data = {status: 0};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        connection.query("UPDATE  scene_t SET lon=" + longitude + ",lat=" + latitude + " WHERE scene_id=" + scene_id + "", function (error, results, fields) {
            if (error) {
                var data = {status: 0};
                // c.end();
                res.send(data);
                res.end();
                return console.error(error);
            }
            var data = {status: 1};
            // c.end();
            console.log("存储要素位置成功");
            res.send(data);
            res.end();
        });
    });

})

app.get('/thing_location', function (req, res, next) {//新增内容
    var longitude = req.query.longitude;
    var latitude = req.query.latitude;
    var height = req.query.height;
    var scene_id = req.query.scene_id;
    var thing_type = req.query.thing_type;
    var thing_id = req.query.thing_id;//to be done
    var gltf_path = req.query.gltf_path;
    var heading = req.query.heading;
    var pitch = req.query.pitch;
    var roll = req.query.roll;
    var thing_mark_id = req.query.id;
    //新增thing_relevant,设置自己的属性
    connection.query("INSERT into thing_relevant (sceneid,thing_id,gltf_path,start_lon,start_lat,start_height,thing_type,heading,pitch,roll,thing_mark_id) value (" + scene_id + ",'" + thing_id + "','" + gltf_path + "','" + longitude + "','" + latitude + "','" + height + "','" + thing_type + "','" + heading + "','" + pitch + "','" + roll + "','" + thing_mark_id + "')", function (error, results, fields) {
        if (error) {
            var data = {status: 1};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        connection.query("UPDATE  scene_t SET lon=" + longitude + ",lat=" + latitude + " WHERE scene_id=" + scene_id + "", function (error, results, fields) {
            if (error) {
                var data = {status: 0};
                // c.end();
                res.send(data);
                res.end();
                return console.error(error);
            }
            var data = {status: 1};
            // c.end();
            console.log("存储要素位置成功");//存储要素位置成功
            res.send(data);
            res.end();
        });
    });

})
app.get('/get_element_info', function (req, res, next) {
    //form表单
    var element_type = req.query.element_type;
    var element_id = req.query.element_id;
    connection.query("SELECT  scene_id,SERIAL_NO,EVIDENCE_TYPE,DESCRIPTION,LEFT_POSITION,COLLECTION_MODE,COLLECTED_BY,COLLECTED_DATE,CRIMINAL_FLAG,UTILIZATION,PRINT_FLAG,STORAGE_FLAG from " + element_type + " where id=" + element_id, function (error, results, fields) {
        if (error) {
            var data = {msg: "读取数据库错误"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = {msg: "读取数据库成功"};
        // c.end();
        console.log("读取数据库成功");
        console.log(results);
        res.send(results);
        res.end();

    });

});
app.get('/get_thing_info', function (req, res, next) {//新增内容
    //form表单
    var thing_type = req.query.thing_type;
    var thing_id = req.query.thing_id;//to be done
    connection.query("SELECT scene_id,SERIAL_NO,THING_TYPE,DESCRIPTION,LEFT_POSITION,COLLECTION_MODE,COLLECTED_BY,COLLECTED_DATE,CRIMINAL_FLAG,UTILIZATION,PRINT_FLAG,STORAGE_FLAG from " + thing_type + " where id=" + thing_id, function (error, results, fields) {
        if (error) {
            var data = {msg: "读取数据库错误"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = {msg: "读取数据库成功"};
        // c.end();
        console.log("读取数据库成功");
        console.log(results);
        res.send(results);
        res.end();

    });

});

app.get('/update_element_info', function (req, res, next) {
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
    connection.query("UPDATE " + element_type + " set COLLECTED_BY='" + COLLECTED_BY + "',COLLECTED_DATE='" + COLLECTED_DATE + "',COLLECTION_MODE='" + COLLECTION_MODE + "',CRIMINAL_FLAG='" + CRIMINAL_FLAG + "',DESCRIPTION='" + DESCRIPTION + "',EVIDENCE_TYPE='" + EVIDENCE_TYPE + "',LEFT_POSITION='" + LEFT_POSITION + "',PRINT_FLAG='" + PRINT_FLAG + "',STORAGE_FLAG='" + STORAGE_FLAG + "',UTILIZATION='" + UTILIZATION + "' where id=" + element_id, function (error, results, fields) {
        // connection.query("UPDATE  COLLECTED_BY=" + COLLECTED_BY +" from " + element_type + " where id=" + element_id, function (error, results, fields) {
        if (error) {
            var data = {msg: "更新失败"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        } else {
            var data = {msg: "更新成功"};
            // c.end();
            console.log("更新成功");
            res.send(data);
            res.end();
        }

    });

});

app.post('/uploads_particle', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.encoding = 'utf-8';
    form.maxFileSize = 4 * 1024 * 1024 * 1024;
    form.uploadDir = path.join(__dirname, 'public/particle_source');
    form.multiples = true;
    form.parse(req, function (err, fields, files) {
            console.log("开始上传粒子");
            var id;
            var name;
            var max_frame;
            var max_x;
            var max_y;
            var max_z;
            var file_folder;
            var first_file;
            for (var i = 0; i < files.upload.length; i++) {
                var file = files.upload[i];
                var pathnameArray = file.name.split('/');
                var folderPath = form.uploadDir;
                for (var j = 0; j < pathnameArray.length - 1; j++) {
                    folderPath = path.join(folderPath, pathnameArray[j]);
                    if (!fs.existsSync(folderPath)) {
                        //如果不存在上传文件夹名称，就创建
                        try {
                            fs.mkdirSync(folderPath, 0o777);
                            ("成功创建目录" + folderPath);
                        } catch (e) {
                            console.log(e.name + ": " + e.message);
                        }
                    }
                }
                fs.renameSync(file.path, path.join(folderPath, pathnameArray[pathnameArray.length - 1]));
                if (pathnameArray[pathnameArray.length - 1].split(".")[1] == "json") {
                    console.log("获得json文件");
                    var data = fs.readFileSync(path.join(folderPath, pathnameArray[pathnameArray.length - 1]));
                    var filedata = data.toString();//将二进制的数据转换为字符串
                    console.log(filedata);
                    filedata = JSON.parse(filedata);//将字符串转换为json对象
                    id = filedata.id;
                    name = filedata.name;
                    max_frame = parseInt(filedata.max_frame);
                    max_x = parseInt(filedata.max_x);
                    max_y = parseInt(filedata.max_y);
                    max_z = parseInt(filedata.max_z);
                    file_folder = filedata.file_folder;
                    first_file = filedata.first_file;
                }
            }
            // try {
            var MyClass = java.import('Single');
            MyClass.transform(file_folder, max_x, max_y, max_z, max_frame, (error, info) => {
                if (error) {
                    console.log('put name Error: ', error);
                    return;
                }
                console.log("all finnished");
                var data = {msg: "转换粒子模型成功"};
                // c.end();
                res.send(data);
                res.end();
            });
            // } catch (e) {
            //     console.log(e.name + ": " + e.message);
            //     var data = {msg: "上传失败"};
            //     // c.end();
            //     res.send(data);
            //     res.end();
            // }
        }
    );
});


app.post('/uploads', function (req, res, next) {
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
    form.parse(req, function (err, fields, files) {
            console.log("开始上传");
            for (var i = 0; i < files.upload.length; i++) {
                var file = files.upload[i];
                var pathnameArray = file.name.split('/');
                var folderPath = form.uploadDir;
                for (var j = 0; j < pathnameArray.length - 1; j++) {
                    folderPath = path.join(folderPath, pathnameArray[j]);
                    if (!fs.existsSync(folderPath)) {
                        try {
                            fs.mkdirSync(folderPath, 0o777);
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
                        fs.readFile(path.join(folderPath, pathnameArray[pathnameArray.length - 1]), function (err, data) {
                            if (err) {
                                return console.error(err);
                            }
                            var filedata = data.toString();//将二进制的数据转换为字符串
                            filedata = JSON.parse(filedata);//将字符串转换为json对象
                            var kinetic_id = filedata.kinetic_id;
                            connection.query("INSERT into kinetic_t (scene_id,kinetic_id) value (" + scene_id + ",'" + kinetic_id + "')", function (error, results, fields) {
                                if (error) {
                                    var data = {msg: "写入数据库错误，上传失败"};
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
                                connection.query("INSERT into modelinfo (scene_id,path,name) value (" + scene_id + ",'" + filedata.gltfs[index].path + "','" + filedata.gltfs[index].name + "')", function (error, results, fields) {
                                    if (error) {
                                        var data = {msg: "写入数据库错误，上传失败"};
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
                    var data = {msg: "上传失败"};
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
        }
    );
});

app.post('/upload', function (req, res, next) {
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
    form.parse(req, function (err, fields, files) {
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
