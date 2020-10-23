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
var MyClass = java.import('Single');

/*const http = require('http');
//const hostname = '127.0.0.1';
const port = 8080;
const requestListener = function (req, res) {
    fs.readFile("public/main.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello World!\n');
};
const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`server running at ${port}/`);
});*/
app.use(express.static("public")).listen(8080);
console.log("server started at 'http://127.0.0.1:8080/main.html'")


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
    /*host: '127.0.0.1',
    user: 'root',
    password: 'czl887',
    database: 'pointcloud'*/
    host: '39.105.89.57',
    port: 3303,
    user: 'wuzheng',
    password: 'wuzheng',
    database: 'wuzheng',
    connectionLimit: 20
    /*host: '172.17.0.153',
    user: 'wuzheng',
    password: '111111',
    database: 'wuzheng0727'*/
});
connection.connect();

var case_id;

app.get("/buttonClicked", function (req, res) {
    var nodeCmd = require('node-cmd');
    var data = "send to client";
    nodeCmd.get(
        //????????????
        'cd E:\\Desktop\\project\\cesiumJS\\node_modules\\obj2gltf&&node bin\\obj2gltf.js -i house.obj -o ' +
        'E:\\Desktop\\project\\KineticModels\\public\\cesium\\Models\\test.gltf',
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
    connection.query('SELECT cases_name, cases_id from cases_set where DATA_STATE = 0', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        res.end();
    });
})

app.get("/get_relation_to_mark_goods", function (req, res) {
    let obj_id = req.query.value;
    connection.query('SELECT START_LON, START_LAT, START_HEIGHT, MARK_GOODS_NAME, EXTRACT_POSITION, CREATE_TIME FROM MARK_GOODS, DATA_RELATION LEFT JOIN relevant_t on element_id = DATA_ID WHERE MAIN_DATA_ID=\"' + req.query.value + "\" AND MARK_GOODS_ID = DATA_ID", function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        res.end();
    });
})

app.get("/get_relation_to_person", function (req, res) {
    let obj_id = req.query.value;
    connection.query('SELECT START_LON, START_LAT, START_HEIGHT, INVOLVED_PERSON_NAME, REMARKS, CREATE_TIME FROM INVOLVED_PERSON_INFO, DATA_RELATION LEFT JOIN relevant_t on element_id = DATA_ID WHERE MAIN_DATA_ID=\"' + req.query.value + "\" AND INVOLVED_PERSON_INFO_ID = DATA_ID", function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        res.end();
    });
})

app.get("/get_relation_to_involved_goods", function (req, res) {
    let obj_id = req.query.value;
    connection.query('SELECT START_LON, START_LAT, START_HEIGHT, INVOLVED_GOODS_NAME, REMARKS, CREATE_TIME FROM INVOLVED_GOODS_INFO, DATA_RELATION LEFT JOIN relevant_t on element_id = DATA_ID WHERE MAIN_DATA_ID=\"' + req.query.value + "\" AND INVOLVED_GOODS_INFO_ID = DATA_ID", function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        res.end();
    });
})

app.get("/get_relation_to_corpse", function (req, res) {
    let obj_id = req.query.value;
    connection.query('SELECT START_LON, START_LAT, START_HEIGHT, CORPSE_INFO_NAME, CORPSE_INFORMATION, CREATE_TIME FROM CORPSE_INFO, DATA_RELATION LEFT JOIN relevant_t on element_id = DATA_ID WHERE MAIN_DATA_ID=\"' + req.query.value + "\" AND CORPSE_INFO_ID = DATA_ID", function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        res.end();
    });
})

app.get("/get_relation_from_mark_goods", function (req, res) {
    let obj_id = req.query.value;
    connection.query('SELECT START_LON, START_LAT, START_HEIGHT, MARK_GOODS_NAME, EXTRACT_POSITION, CREATE_TIME FROM MARK_GOODS, DATA_RELATION LEFT JOIN relevant_t on element_id = MAIN_DATA_ID WHERE DATA_ID=\"' + req.query.value + "\" AND MARK_GOODS_ID = MAIN_DATA_ID", function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        res.end();
    });
})

var fieldTableKeyMapping = {
    "mark_goods": ["MARK_GOODS_NAME", "MARK_GOODS", "MARK_GOODS_ID"],
    "involved_goods_info": ["INVOLVED_GOODS_NAME", "INVOLVED_GOODS_INFO", "INVOLVED_GOODS_INFO_ID"],
    "corpse_info": ["CORPSE_INFO_NAME", "CORPSE_INFO", "CORPSE_INFO_ID"],
    "involved_person_info": ["INVOLVED_PERSON_NAME", "INVOLVED_PERSON_INFO", "INVOLVED_PERSON_INFO_ID"]
}

app.get("/get_object_name", function (req, res) {
    console.log("XXXXXXXXXXXXXX " + req.query.key + " " + req.query.value + " " + req.query.toString());
    let map = fieldTableKeyMapping[req.query.key];
    connection.query('SELECT ' + map[0] + " as name from " + map[1] + " where " + map[2] + " = \"" + req.query.value + "\"", function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        res.end();
    });
})

app.get("/get_relation_from_person", function (req, res) {
    let obj_id = req.query.value;
    connection.query('SELECT START_LON, START_LAT, START_HEIGHT, INVOLVED_PERSON_NAME, REMARKS, CREATE_TIME FROM INVOLVED_PERSON_INFO, DATA_RELATION LEFT JOIN relevant_t on element_id = MAIN_DATA_ID WHERE DATA_ID=\"' + req.query.value + "\" AND INVOLVED_PERSON_INFO_ID = MAIN_DATA_ID", function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        res.end();
    });
})

app.get("/get_relation_from_involved_goods", function (req, res) {
    let obj_id = req.query.value;
    connection.query('SELECT START_LON, START_LAT, START_HEIGHT, INVOLVED_GOODS_NAME, REMARKS, CREATE_TIME FROM INVOLVED_GOODS_INFO, DATA_RELATION LEFT JOIN relevant_t on element_id = MAIN_DATA_ID WHERE DATA_ID=\"' + req.query.value + "\" AND INVOLVED_GOODS_INFO_ID = MAIN_DATA_ID", function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        res.end();
    });
})

app.get("/get_relation_from_corpse", function (req, res) {
    let obj_id = req.query.value;
    connection.query('SELECT START_LON, START_LAT, START_HEIGHT, CORPSE_INFO_NAME, CORPSE_INFORMATION, CREATE_TIME FROM CORPSE_INFO, DATA_RELATION LEFT JOIN relevant_t on element_id = MAIN_DATA_ID WHERE DATA_ID=\"' + req.query.value + "\" AND CORPSE_INFO_ID = MAIN_DATA_ID", function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        res.end();
    });
})

app.get("/get_scenes", function (req, res) {
    console.log("选定案件号：" + req.query.value);
    case_id = req.query.value;
    connection.query('SELECT case_event_name, base_info_id from inquest_base_info where cases_id=\"' + req.query.value + "\"", function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        res.end();
    });
})

app.get("/update_kinetic", function (req, res) {
    console.log("选定案件号：" + req.query.value);
    let ksetid = req.query.KSETID;
    connection.query('UPDATE kinetic_set set CONFIG=\'' + req.query.CONFIG + '\' where KSETID=' + ksetid + "", function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        res.end();
    });
})

var scene_id;

app.get("/get_case_scenes", function (req, res) {
    case_id = req.query.value;
    console.log('SELECT scene_id, start_lon, start_lat, start_height, end_lon, end_lat, end_height, site_type from scene_t, inquest_base_info where cases_id=\'' + req.query.value + '\' and scene_id = base_info_id');
    connection.query('SELECT scene_id, start_lon, start_lat, start_height, end_lon, end_lat, end_height, site_type from scene_t, inquest_base_info where cases_id=\'' + req.query.value + '\' and scene_id = base_info_id', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results);
        res.end();
    });
})

app.get("/scene_exists", function (req, res) {
    scene_id = req.query.value;
    data = {};
    connection.query('SELECT scene_path from scene_t where scene_id=\'' + scene_id + '\'', function (error, results, fields) {
        if (results.length == 0) {
            connection.query('SELECT CASES_ID FROM inquest_base_info where base_info_id=\'' + scene_id + '\'', function (error, results, fields) {
                if (error) return console.error(error)
                let case_id = results[0].CASES_ID;
                console.log('INSERT INTO scene_t (scene_id, case_id) value(\'' + scene_id + '\', \'' + case_id + '\')');
                connection.query('INSERT INTO scene_t (scene_id, case_id) value(\'' + scene_id + '\', \'' + case_id + '\')', function (error, results, fields) {
                    if (error) return console.error(error);
                    res.end();
                });
            })
            console.log('insert pseudo scene: ' + scene_id);
        } else {
            console.log('found scene: ' + scene_id);
            data = results;
            res.send(data);
            res.end();
        }
    });
});

app.get("/select_scene", function (req, res) {
    console.log("选定场景号：" + req.query.value);
    scene_id = req.query.value;
    data = {};
    connection.query('SELECT id,kinetic_id from kinetic_t where scene_id=\'' + req.query.value + '\'', function (error, results, fields) {
        if (error) {
            console.assert(error);
            return console.error(error);
        }
        data.kinetic_info = results;
        //console.log('SELECT start_lon,start_lat,start_height,end_lon,end_lat,end_height,angle_lon,angle_lat,angle_height,scene_path from scene_t where scene_id=\'' + req.query.value + '\'');
        connection.query('SELECT scale,start_lon,start_lat,start_height,end_lon,end_lat,end_height,angle_lon,angle_lat,angle_height,scene_path from scene_t where scene_id=\'' + req.query.value + '\'', function (error, results, fields) {
            if (error) {
                console.assert(error);
                return console.error(error);
            }
            console.log("pos " + results[0].start_lon + "," + results[0].start_lat + "," + results[0].start_height + ","
                + results[0].end_lon + "," + results[0].end_lat + "," + results[0].end_height + ","
                + results[0].angle_lon + "," + results[0].angle_lat + "," + results[0].angle_height + ","
                + results[0].scene_path + "," + results[0].scale);
            data.location = results;
            connection.query('SELECT id,element_type,element_id,icon_path,start_lon,start_lat,start_height from relevant_t where scene_id=\'' + req.query.value + '\'', function (error, results, fields) {
                if (error) {
                    console.assert(error);
                    return console.error(error);
                }
                data.relevant_info = results;
                for (var i = 0; i < results.length; i++) {
                    console.log("\t" + results[i].id + "," + results[i].element_id);
                }
                console.log("---------------------------------------------------------------------------------------");
                let vlocat = data.location;
                console.log("pos " + vlocat[0].start_lon + "," + vlocat[0].start_lat + "," + vlocat[0].start_height + ","
                    + vlocat[0].end_lon + "," + vlocat[0].end_lat + "," + vlocat[0].end_height + ","
                    + vlocat[0].angle_lon + "," + vlocat[0].angle_lat + "," + vlocat[0].angle_height + ","
                    + vlocat[0].scene_path + "," + vlocat[0].scale);
                let verify = data.relevant_info;
                for (var i = 0; i < results.length; i++) {
                    console.log("\t" + verify[i].id + "," + verify[i].element_id);
                }
                //console.log(data);
                res.send(data);
                res.end();
            });
        }, dataType = 'json');
    });
})

app.get("/select_thing_scene", function (req, res) {
    // console.log("选定场景号：" + req.query.value);
    scene_id = req.query.value;
    data = {};
    connection.query('SELECT id,kinetic_id from kinetic_t where scene_id=\'' + req.query.value + '\'', function (error, results, fields) {
        if (error) return console.error(error);
        data.kinetic_info = results;
        connection.query('SELECT start_lon,start_lat,start_height,angle_lon,angle_lat,angle_height from scene_t where scene_id=\'' + req.query.value + '\'', function (error, results, fields) {
            if (error) return console.error(error);
            data.location = results;
            connection.query('SELECT id,thing_type,thing_id,gltf_path,scale,start_lon,start_lat,start_height,end_lon,end_lat,end_height,angle_lon,angle_lat,angle_height from thing_relevant where sceneid=\'' + req.query.value + '\'', function (error, results, fields) {
                if (error) return console.error(error);
                data.relevant_info = results;
                // console.log(data);
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

app.get("/get_kinetic_set", function (req, res) {
    console.log(req.query.value);
    connection.query("SELECT KSETID, KSETNAME from kinetic_set where MODEL_CATEGORY=\'" + req.query.value + "\'", function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results);
        res.end();
    });
})

app.get("/get_sub_icon_menu", function (req, res) {
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

app.get("/sub_thing_menu", function (req, res) {
    fs.readdir('public/cesium/Models/model/' + req.query.top_name + '/' + req.query.sub_name, function (err, files) {
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
    fs.readFile('./indexz.html', function (err, data) {//indexz.html
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

app.get('/store_elements', function (req, res, next) {//获取表单 导入内容
    //form表单
    var form = JSON.parse(req.query.form);
    var scene_id = req.query.scene_id;
    var jslength = 0;
    for (var i in form) {
        connection.query("INSERT into scene_bio_evidence (scene_id,SERIAL_NO,EVIDENCE_TYPE,DESCRIPTION,LEFT_POSITION,COLLECTION_MODE,COLLECTED_BY_NAME,COLLECTED_DATE,CRIMINAL_FLAG,UTILIZATION,PRINT_FLAG,STORAGE_FLAG) " +
            "value (" + scene_id + "," + form[i].序号 + ",'" + form[i].类型 + "','" + form[i].基本特征 + "','" + form[i].遗留部位 + "','" + form[i].提取方法 + "','" + form[i].提取人 + "','" + form[i].提取日期 + "','" + form[i].可靠程度 + "','" + form[i].利用情况 + "','" + form[i].列入现场提取登记表 + "','" + form[i].是否已DNA系统 + "')", function (error, results, fields) {//新网页数据
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

app.get('/store_inquest_base_info', function (req, res, next) {//勘验基础信息
    //form表单
    var form = JSON.parse(req.query.form);
    var scene_id = req.query.scene_id;
    var jslength = 0;
    connection.query("set foreign_key_checks = 0")
    connection.query("DELETE from inquest_base_info")
    for (var i in form) {
        connection.query("INSERT into inquest_base_info (BASE_INFO_ID,FIELD_SURVEY_NUMBER,CASE_EVENT_CODE,HAPPENING_PLACE,INQUEST_START_TIME,INQUEST_END_TIME,FIELD_SURVEY_PERSON,FIELD_COMMANDER_ID,PROTECTIVE_MEASURES,SITE_CHANGES_ID,CREATE_TIME,CREATE_PERSION_ID,LONGITUDE,LATITUDE,WEATHER_CONDITION) value (" + "'" + form[i].勘验基础信息ID + "','" + form[i].现场勘验号 + "','" + form[i].案事件编号 + "','" + form[i].发案地点 + "','" + form[i].勘验开始时间 + "','" + form[i].勘验结束时间 + "','" + form[i].现场勘验人员 + "','" + form[i].现场指挥人员ID + "','" + form[i].保护措施ID + "','" + form[i].现场变动情况ID + "','" + form[i].创建时间 + "','" + form[i].创建人ID + "','" + form[i].经度 + "','" + form[i].纬度 + "','" + form[i].天气情况ID + "')", function (error, results, fields) {//新网页数据
            if (error) {
                var data = {msg: "写入数据库错误，上传失败"};
                // c.end();
                res.send(data);
                res.end();
                return console.error(error);
            } else if (jslength == form.length - 1) {
                var data = {msg: "存入数据库成功"};
                // c.end();
                console.log("存入inquest_base_info文件成功");
                res.send(data);
                res.end();
            }
            jslength++;
        });
        connection.query("set foreign_key_checks = 1")
    }
});

app.get('/store_field_commander', function (req, res, next) {//现场指挥人员
    //form表单
    var form = JSON.parse(req.query.form);
    var scene_id = req.query.scene_id;
    var jslength = 0;
    connection.query("set foreign_key_checks = 0")
    connection.query("DELETE from field_commander")
    for (var i in form) {
        connection.query("INSERT into field_commander (FIELD_COMMANDER_ID,FIELD_COMMANDER_NAME) value (" + "'" + form[i].现场指挥人员ID + "','" + form[i].现场指挥人员名称 + "')", function (error, results, fields) {//新网页数据
            if (error) {
                var data = {msg: "写入数据库错误，上传失败"};
                // c.end();
                res.send(data);
                res.end();
                return console.error(error);
            } else if (jslength == form.length - 1) {
                var data = {msg: "存入数据库成功"};
                // c.end();
                console.log("存入field_commander文件成功");
                res.send(data);
                res.end();
            }
            jslength++;
        });
        connection.query("set foreign_key_checks = 1")
    }
});

app.get('/store_protect_measure', function (req, res, next) {//暂无此表
    //form表单
    var form = JSON.parse(req.query.form);
    var scene_id = req.query.scene_id;
    var jslength = 0;
    connection.query("set foreign_key_checks = 0")
    connection.query("DELETE from protect_measure")
    for (var i in form) {
        connection.query("INSERT into protect_measure (Protect_MEASURE_ID,Protect_MEASURE_NAME) value (" + "'" + form[i].保护措施ID + "','" + form[i].保护措施名称 + "')", function (error, results, fields) {//新网页数据
            if (error) {
                var data = {msg: "写入数据库错误，上传失败"};
                // c.end();
                res.send(data);
                res.end();
                return console.error(error);
            } else if (jslength == form.length - 1) {
                var data = {msg: "存入数据库成功"};
                // c.end();
                console.log("存入protect_measure文件成功");
                res.send(data);
                res.end();
            }
            jslength++;
        });
        connection.query("set foreign_key_checks = 1")
    }
});

app.get('/store_site_changes', function (req, res, next) {//现场变动情况
    //form表单
    var form = JSON.parse(req.query.form);
    var scene_id = req.query.scene_id;
    var jslength = 0;
    connection.query("set foreign_key_checks = 0")
    connection.query("DELETE from site_changes")
    for (var i in form) {
        connection.query("INSERT into site_changes (SITE_CHANGES_ID,SITE_CHANGES_NAME) value (" + "'" + form[i].现场变动情况ID + "','" + form[i].现场变动情况名称 + "')", function (error, results, fields) {//新网页数据
            if (error) {
                var data = {msg: "写入数据库错误，上传失败"};
                // c.end();
                res.send(data);
                res.end();
                return console.error(error);
            } else if (jslength == form.length - 1) {
                var data = {msg: "存入数据库成功"};
                // c.end();
                console.log("存入site_changes文件成功");
                res.send(data);
                res.end();
            }
            jslength++;
        });
        connection.query("set foreign_key_checks = 1")
    }
});

app.get('/store_mark_goods_unit', function (req, res, next) {//单位
    //form表单
    var form = JSON.parse(req.query.form);
    var scene_id = req.query.scene_id;
    var jslength = 0;
    connection.query("set foreign_key_checks = 0")
    connection.query("DELETE from mark_goods_unit")
    for (var i in form) {
        connection.query("INSERT into mark_goods_unit (MARK_GOODS_UNIT_ID,MARK_GOODS_UNIT_NAME) value (" + "'" + form[i].单位ID + "','" + form[i].单位名称 + "')", function (error, results, fields) {//新网页数据
            if (error) {
                var data = {msg: "写入数据库错误，上传失败"};
                // c.end();
                res.send(data);
                res.end();
                return console.error(error);
            } else if (jslength == form.length - 1) {
                var data = {msg: "存入数据库成功"};
                // c.end();
                console.log("存入mark_goods_unit文件成功");
                res.send(data);
                res.end();
            }
            jslength++;
        });
        connection.query("set foreign_key_checks = 1")
    }
});

app.get('/store_weather', function (req, res, next) {//暂无此表
    //form表单
    var form = JSON.parse(req.query.form);
    var scene_id = req.query.scene_id;
    var jslength = 0;
    connection.query("set foreign_key_checks = 0")
    connection.query("DELETE from weather")
    for (var i in form) {
        connection.query("INSERT into weather (WRATHER_ID,WRATHER_NAME) value (" + "'" + form[i].天气情况ID + "','" + form[i].天气情况名称 + "')", function (error, results, fields) {//新网页数据
            if (error) {
                var data = {msg: "写入数据库错误，上传失败"};
                // c.end();
                res.send(data);
                res.end();
                return console.error(error);
            } else if (jslength == form.length - 1) {
                var data = {msg: "存入数据库成功"};
                // c.end();
                console.log("存入weather文件成功");
                res.send(data);
                res.end();
            }
            jslength++;
        });
        connection.query("set foreign_key_checks = 1")
    }
});

app.get('/store_full_photo', function (req, res, next) {//全貌照片
    //form表单
    var form = JSON.parse(req.query.form);
    var scene_id = req.query.scene_id;
    var jslength = 0;
    connection.query("set foreign_key_checks = 0")
    connection.query("DELETE from full_photo")
    for (var i in form) {
        connection.query("INSERT into full_photo (FULL_PHOTO_ID,FULL_PHOTO_NAME,FULL_PHOTO_CONTENT,MARK_GOODS_ID,CREATE_TIME) value (" + "'" + form[i].全貌照片ID + "','" + form[i].全貌照片名称 + "','" + form[i].全貌照片名称 + "','" + form[i].痕迹物品ID + "','" + form[i].创建时间 + "')", function (error, results, fields) {//新网页数据
            if (error) {
                var data = {msg: "写入数据库错误，上传失败"};
                // c.end();
                res.send(data);
                res.end();
                return console.error(error);
            } else if (jslength == form.length - 1) {
                var data = {msg: "存入数据库成功"};
                // c.end();
                console.log("存入full_photo文件成功");
                res.send(data);
                res.end();
            }
            jslength++;
        });
        connection.query("set foreign_key_checks = 1")
    }
});

app.get('/store_mark_goods', function (req, res, next) {//痕迹物品
    //form表单
    var form = JSON.parse(req.query.form);
    var scene_id = req.query.scene_id;
    var jslength = 0;
    connection.query("set foreign_key_checks = 0")
    connection.query("DELETE from mark_goods")
    for (var i in form) {
        connection.query("INSERT into mark_goods (MARK_GOODS_ID,MARK_GOODS_NAME,GOODS_TYPE_ID,EXTRACT_METHOD_ID,BASE_INFO_ID,EXTRACT_TIME,EXTRACT_PERSON,CREATE_TIME,CREATE_PERSION_ID,DATA_STATE,MARK_GOODS_DESCRIBE,UPDATE_TIME) value (" + "'" + form[i].痕迹物品ID + "','" + form[i].物品名称 + "','" + form[i].物品类型ID + "','" + form[i].提取方法ID + "','" + form[i].勘验基础信息ID + "','" + form[i].提取时间 + "','" + form[i].提取人 + "','" + form[i].创建时间 + "','" + form[i].创建人ID + "','" + form[i].数据状态 + "','" + form[i].描述 + "','" + form[i].修改时间 + "')", function (error, results, fields) {//新网页数据
            if (error) {
                var data = {msg: "写入数据库错误，上传失败"};
                // c.end();
                res.send(data);
                res.end();
                return console.error(error);
            } else if (jslength == form.length - 1) {
                var data = {msg: "存入数据库成功"};
                // c.end();
                console.log("存入mark_goods文件成功");
                res.send(data);
                res.end();
            }
            jslength++;
        });
        connection.query("set foreign_key_checks = 1")
    }
});

app.get('/store_goods_type', function (req, res, next) {//物品类型
    //form表单
    var form = JSON.parse(req.query.form);
    var scene_id = req.query.scene_id;
    var jslength = 0;
    connection.query("set foreign_key_checks = 0")
    connection.query("DELETE from goods_type")
    for (var i in form) {
        connection.query("INSERT into goods_type (GOODS_TYPE_ID,GOODS_TYPE_NAME) value (" + "'" + form[i].物品类型ID + "','" + form[i].物品类型名称 + "')", function (error, results, fields) {//新网页数据
            if (error) {
                var data = {msg: "写入数据库错误，上传失败"};
                // c.end();
                res.send(data);
                res.end();
                return console.error(error);
            } else if (jslength == form.length - 1) {
                var data = {msg: "存入数据库成功"};
                // c.end();
                console.log("存入goods_type文件成功");
                res.send(data);
                res.end();
            }
            jslength++;
        });
        connection.query("set foreign_key_checks = 1")
    }
});

app.get('/store_extract_method', function (req, res, next) {//提取方法
    //form表单
    var form = JSON.parse(req.query.form);
    var scene_id = req.query.scene_id;
    var jslength = 0;
    connection.query("set foreign_key_checks = 0")
    connection.query("DELETE from extract_method")
    for (var i in form) {
        connection.query("INSERT into extract_method (EXTRACT_METHOD_ID,EXTRACT_METHOD_NAME) value (" + "'" + form[i].提取方法ID + "','" + form[i].提取方法名称 + "')", function (error, results, fields) {//新网页数据
            if (error) {
                var data = {msg: "写入数据库错误，上传失败"};
                // c.end();
                res.send(data);
                res.end();
                return console.error(error);
            } else if (jslength == form.length - 1) {
                var data = {msg: "存入数据库成功"};
                // c.end();
                console.log("存入extract_method文件成功");
                res.send(data);
                res.end();
            }
            jslength++;
        });
        connection.query("set foreign_key_checks = 1")
    }
});

app.get('/store_corpse_info', function (req, res, next) {//尸体信息
    //form表单
    var form = JSON.parse(req.query.form);
    var scene_id = req.query.scene_id;
    var jslength = 0;
    connection.query("set foreign_key_checks = 0")
    connection.query("DELETE from corpse_info")
    for (var i in form) {
        connection.query("INSERT into corpse_info (CORPSE_INFO_ID,BASE_INFO_ID,CORPSE_INFO_CODE,CORPSE_INFO_NAME,CORPSE_FIND_PLACE,CORPSE_FEATURES,SCENE_BLOODSTAIN_SITUATION,SCENE_ES_SURVEY,CLOTHES_SITUATION,CORPSE_INCLUSIONS,CORPSE_COSTUMES,DEATH_NATURE,LETHAL_REASON,DEATH_TIME_START,DEATH_TIME_END,CORPSE_INJURING_FORM,FEATURES_DESCRIBE,CREATE_PERSION_ID,CREATE_TIME,CORPSE_COMPLETION,DATA_STATE,UPDATE_TIME) value (" + "'" + form[i].尸体ID + "','" + form[i].勘验基础信息ID + "','" + form[i].尸体编号 + "','" + form[i].尸体名称 + "','" + form[i].尸体发现地点 + "','" + form[i].尸体姿态 + "','" + form[i].现场血迹情况 + "','" + form[i].现场环境情况 + "','" + form[i].随身物品 + "','" + form[i].尸体盛装物 + "','" + form[i].尸体包裹物 + "','" + form[i].死亡性质 + "','" + form[i].致死原因 + "','" + form[i].死亡时间推论 + "','" + form[i].尸体加害形式 + "','" + form[i].特征描述 + "','" + form[i].创建人ID + "','" + form[i].创建时间 + "','" + form[i].尸体完整度 + "','" + form[i].数据状态 + "','" + form[i].修改时间 + "')", function (error, results, fields) {//新网页数据
            if (error) {
                var data = {msg: "写入数据库错误，上传失败"};
                // c.end();
                res.send(data);
                res.end();
                return console.error(error);
            } else if (jslength == form.length - 1) {
                var data = {msg: "存入数据库成功"};
                // c.end();
                console.log("存入corpse_info文件成功");
                res.send(data);
                res.end();
            }
            jslength++;
        });
        connection.query("set foreign_key_checks = 1")
    }
});

app.get('/store_corpse_photo', function (req, res, next) {//尸体照片
    //form表单
    var form = JSON.parse(req.query.form);
    var scene_id = req.query.scene_id;
    var jslength = 0;
    connection.query("set foreign_key_checks = 0")
    connection.query("DELETE from corpse_photo")
    for (var i in form) {
        connection.query("INSERT into corpse_photo (CORPSE_PHOTO_ID,CORPSE_PHOTO_NAME,CORPSE_PHOTO_CONTENT,CREATE_TIME,CORPSE_INFO_ID) value (" + "'" + form[i].尸体照片ID + "','" + form[i].尸体照片名称 + "','" + form[i].尸体照片内容 + "','" + form[i].创建时间 + "','" + form[i].尸体ID + "')", function (error, results, fields) {//新网页数据
            if (error) {
                var data = {msg: "写入数据库错误，上传失败"};
                // c.end();
                res.send(data);
                res.end();
                return console.error(error);
            } else if (jslength == form.length - 1) {
                var data = {msg: "存入数据库成功"};
                // c.end();
                console.log("存入corpse_photo文件成功");
                res.send(data);
                res.end();
            }
            jslength++;
        });
        connection.query("set foreign_key_checks = 1")
    }
});

app.get('/store_position_photo', function (req, res, next) {//方位照片
    //form表单
    var form = JSON.parse(req.query.form);
    var scene_id = req.query.scene_id;
    var jslength = 0;
    connection.query("set foreign_key_checks = 0")
    connection.query("DELETE from position_photo")
    for (var i in form) {
        connection.query("INSERT into position_photo (POSITION_PHOTO_ID,POSITION_PHOTO_NAME,POSITION_PHOTO_CONTENT,MARK_GOODS_ID,CREATE_TIME) value (" + "'" + form[i].方位照片ID + "','" + form[i].方位照片名称 + "','" + form[i].方位照片内容 + "','" + form[i].痕迹物品ID + "','" + form[i].创建时间 + "')", function (error, results, fields) {//新网页数据
            if (error) {
                var data = {msg: "写入数据库错误，上传失败"};
                // c.end();
                res.send(data);
                res.end();
                return console.error(error);
            } else if (jslength == form.length - 1) {
                var data = {msg: "存入数据库成功"};
                // c.end();
                console.log("存入position_photo文件成功");
                res.send(data);
                res.end();
            }
            jslength++;
        });
        connection.query("set foreign_key_checks = 1")
    }
});

app.get('/store_case_conclusion_info', function (req, res, next) {//案事件全貌
    //form表单
    var form = JSON.parse(req.query.form);
    var scene_id = req.query.scene_id;
    var jslength = 0;
    connection.query("set foreign_key_checks = 0")
    connection.query("DELETE from case_conclusion_info")
    for (var i in form) {
        connection.query("INSERT into case_conclusion_info (BASE_INFO_ID,MOTIVATION,CRIME_TOOLS,CRIME_TIME,CRIME_ADDRESS,VICTIME,CREATE_PERSON_ID,CREATE_TIME,UPDATE_TIME,DATA_STATE) value (" + "'" + form[i].勘验基础信息ID + "','" + form[i].作案动机 + "','" + form[i].作案工具 + "','" + form[i].作案时间 + "','" + form[i].作案地点 + "','" + form[i].受害人员 + "','" + form[i].创建人ID + "','" + form[i].创建时间 + "','" + form[i].修改时间 + "','" + form[i].数据状态 + "')", function (error, results, fields) {//新网页数据
            if (error) {
                var data = {msg: "写入数据库错误，上传失败"};
                // c.end();
                res.send(data);
                res.end();
                return console.error(error);
            } else if (jslength == form.length - 1) {
                var data = {msg: "存入数据库成功"};
                // c.end();
                console.log("存入case_conclusion_info文件成功");
                res.send(data);
                res.end();
            }
            jslength++;
        });
        connection.query("set foreign_key_checks = 1")
    }
});

app.get('/store_ele_info', function (req, res, next) {//电子信息
    //form表单
    var form = JSON.parse(req.query.form);
    var scene_id = req.query.scene_id;
    var jslength = 0;
    connection.query("set foreign_key_checks = 0")
    connection.query("DELETE from ele_info")
    for (var i in form) {
        connection.query("INSERT into ele_info (BASE_INFO_ID,DEVICE_NAME,CONTENT_DESC,EXT_TIME,EXT_PERSON,CREATE_PERSON_ID,CREATE_TIME,UPDATE_TIME,DATA_STATE) value (" + "'" + form[i].基础勘验信息ID + "','" + form[i].电子设备名称 + "','" + form[i].内容描述 + "','" + form[i].提取时间 + "','" + form[i].提取人 + "','" + form[i].创建人ID + "','" + form[i].创建时间 + "','" + form[i].修改时间 + "','" + form[i].数据状态 + "')", function (error, results, fields) {//新网页数据
            if (error) {
                var data = {msg: "写入数据库错误，上传失败"};
                // c.end();
                res.send(data);
                res.end();
                return console.error(error);
            } else if (jslength == form.length - 1) {
                var data = {msg: "存入数据库成功"};
                // c.end();
                console.log("存入ele_info文件成功");
                res.send(data);
                res.end();
            }
            jslength++;
        });
        connection.query("set foreign_key_checks = 1")
    }
});

app.get('/store_involved_goods_info', function (req, res, next) {//涉案物品信息
    //form表单
    var form = JSON.parse(req.query.form);
    var scene_id = req.query.scene_id;
    var jslength = 0;
    connection.query("set foreign_key_checks = 0")
    connection.query("DELETE from involved_goods_info")
    for (var i in form) {
        connection.query("INSERT into involved_goods_info (INVOLVED_GOODS_INFO_ID,INVOLVED_GOODS_NAME,EXTRACT_POSITION,BASE_INFO_ID,CREATE_PERSION_ID,CREATE_TIME,UPDATE_TIME,DATA_STATE) value (" + "'" + form[i].涉案物品信息ID + "','" + form[i].物品名称 + "','" + form[i].提取位置 + "','" + form[i].基础勘验信息ID + "','" + form[i].创建人ID + "','" + form[i].创建时间 + "','" + form[i].修改时间 + "','" + form[i].数据状态 + "')", function (error, results, fields) {//新网页数据
            if (error) {
                var data = {msg: "写入数据库错误，上传失败"};
                // c.end();
                res.send(data);
                res.end();
                return console.error(error);
            } else if (jslength == form.length - 1) {
                var data = {msg: "存入数据库成功"};
                // c.end();
                console.log("存入involved_goods_info文件成功");
                res.send(data);
                res.end();
            }
            jslength++;
        });
        connection.query("set foreign_key_checks = 1")
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
    connection.query("INSERT into relevant_t (scene_id,element_id,icon_path,start_lon,start_lat,start_height,element_type) value ('" + scene_id + "','" + element_id + "','" + icon_path + "','" + longitude + "','" + latitude + "','" + height + "','" + element_type + "')", function (error, results, fields) {
        if (error) {
            var data = {status: 0};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        connection.query("UPDATE  scene_t SET start_lon=" + longitude + ",start_lat=" + latitude + ",start_height=" + 5000 + " WHERE scene_id='" + scene_id + "'", function (error, results, fields) {
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

app.get('/adjust_thing_location', function (req, res, next) {
    var longitude = parseFloat(req.query.longitude).toFixed(8);
    var latitude = parseFloat(req.query.latitude).toFixed(8);
    var height = parseFloat(req.query.height).toFixed(8);
    var scale = parseFloat(req.query.scale).toFixed(8);
    var angle_lon = parseFloat(req.query.rx).toFixed(8);
    var angle_lat = parseFloat(req.query.ry).toFixed(8);
    var angle_height = parseFloat(req.query.rz).toFixed(8);
    var id = req.query.id;
    connection.query("UPDATE thing_relevant SET scale=" + scale +
        ",start_lon=" + longitude +
        ",start_lat=" + latitude +
        ",start_height=" + height +
        ",angle_lon=" + angle_lon +
        ",angle_lat=" + angle_lat +
        ",angle_height=" + angle_height + " WHERE id=" + id + "", function (error, results, fields) {
        if (error) {
            alert("数据库写入错误：" + id);
            var data = {status: 0};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = {status: 1};
        // c.end();
        console.log("更新物品位置成功" + "UPDATE thing_relevant SET scale=" + scale +
            ",start_lon=" + longitude +
            ",start_lat=" + latitude +
            ",start_height=" + height +
            ",angle_lon=" + angle_lon +
            ",angle_lat=" + angle_lat +
            ",angle_height=" + angle_height + " WHERE thing_mark_id=" + id);//存储要素位置成功
        res.send(data);
        res.end();
    });
});

app.get('/thing_location_latest', function (req, res, next) {
    var scene_id = req.query.scene_id;
    var gltf_path = req.query.gltf_path;
    console.log("@@@@@@@@@@@@@@@@" + scene_id + ":" + gltf_path);
    connection.query("SELECT id, scale, start_lon, start_lat, start_height, angle_lon, angle_lat, angle_height from thing_relevant where gltf_path=" + "\"" + gltf_path + "\" AND sceneid=\'" + scene_id + "\' order by id desc limit 1", function (error, results, fields) {
        if (error) {
            console.log('Error when refresh latest object: ' + scene_id + ":" + gltf_path)
            return console.error(error);
        }
        console.log('Success when refresh latest object: ' + scene_id + ":" + gltf_path);
        res.send(results);
        res.end();
    });

});

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
    console.log("INSERT into thing_relevant (sceneid,thing_id,gltf_path,start_lon,start_lat,start_height,thing_type,thing_mark_id) value ('" + scene_id + "','" + thing_id + "','" + gltf_path + "'," + longitude + "," + latitude + "," + height + ",'" + thing_type + "','" + thing_mark_id + "')");
    connection.query("INSERT into thing_relevant (sceneid,thing_id,gltf_path,start_lon,start_lat,start_height,thing_type,thing_mark_id) value ('" + scene_id + "','" + thing_id + "','" + gltf_path + "'," + longitude + "," + latitude + "," + height + ",'" + thing_type + "','" + thing_mark_id + "')", function (error, results, fields) {
        if (error) {
            var data = {status: 1};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        /*connection.query("UPDATE scene_t SET start_lon=" + longitude + ",start_lat=" + latitude + " WHERE scene_id=\'" + scene_id + "\'", function (error, results, fields) {
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
        });*/
    });
})

app.get('/get_element_info', function (req, res, next) {
    //form表单
    var element_type = req.query.element_type;
    var element_id = req.query.element_id;
    connection.query("SELECT scene_id,SERIAL_NO,EVIDENCE_TYPE,DESCRIPTION,LEFT_POSITION,COLLECTION_MODE,COLLECTED_BY,COLLECTED_DATE,CRIMINAL_FLAG,UTILIZATION,PRINT_FLAG,STORAGE_FLAG from " + element_type + " where id=" + element_id, function (error, results, fields) {
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

app.get('/get_site_changes', function (req, res, next) {
    //form表单
    connection.query("SELECT SITE_CHANGES_ID,SITE_CHANGES_NAME from site_changes", function (error, results, fields) {
        if (error) {
            var data = {msg: "读取数据库错误"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = {msg: "读取数据库成功"};
        // c.end();
        console.log(data);
        console.log(results);
        res.send(results);
        res.end();
    });
});
app.get('/get_inquest_base_info', function (req, res, next) {
    //form表单
    // CASE_EVENT_CODE,HAPPENING_PLACE,INQUEST_START_TIME,INQUEST_END_TIME,FIELD_SURVEY_PERSON,FIELD_COMMANDER_ID,PROTECTIVE_MEASURES,SITE_CHANGES_ID,CREATE_TIME,CREATE_PERSION_ID,LONGITUDE,LATITUDE,WEATHER_CONDITION
    connection.query("SELECT BASE_INFO_ID,FIELD_SURVEY_NUMBER,CASE_EVENT_CODE,HAPPENING_PLACE,INQUEST_START_TIME,INQUEST_END_TIME,FIELD_SURVEY_PERSON,FIELD_COMMANDER_ID,PROTECTIVE_MEASURES,SITE_CHANGES_ID,CREATE_TIME,CREATE_PERSION_ID,LONGITUDE,LATITUDE,WEATHER_CONDITION from inquest_base_info", function (error, results, fields) {
        if (error) {
            var data = {msg: "读取数据库错误"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = {msg: "读取数据库成功"};
        // c.end();
        console.log(data);
        console.log(results);
        res.send(results);
        res.end();
    });
});
app.get('/get_field_commander', function (req, res, next) {
    //form表单
    connection.query("SELECT FIELD_COMMANDER_ID,FIELD_COMMANDER_NAME from field_commander", function (error, results, fields) {
        if (error) {
            var data = {msg: "读取数据库错误"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = {msg: "读取数据库成功"};
        // c.end();
        console.log(data);
        console.log(results);
        res.send(results);
        res.end();
    });
});
app.get('/get_protect_measure', function (req, res, next) {
    //form表单
    connection.query("SELECT Protect_MEASURE_ID,Protect_MEASURE_NAME from protect_measure", function (error, results, fields) {
        if (error) {
            var data = {msg: "读取数据库错误"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = {msg: "读取数据库成功"};
        // c.end();
        console.log(data);
        console.log(results);
        res.send(results);
        res.end();
    });
});
app.get('/get_site_changes', function (req, res, next) {
    //form表单
    connection.query("SELECT SITE_CHANGES_ID,SITE_CHANGES_NAME from site_changes", function (error, results, fields) {
        if (error) {
            var data = {msg: "读取数据库错误"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = {msg: "读取数据库成功"};
        // c.end();
        console.log(data);
        console.log(results);
        res.send(results);
        res.end();
    });
});
app.get('/get_mark_goods_unit', function (req, res, next) {
    //form表单
    connection.query("SELECT MARK_GOODS_UNIT_ID,MARK_GOODS_UNIT_NAME from mark_goods_unit", function (error, results, fields) {
        if (error) {
            var data = {msg: "读取数据库错误"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = {msg: "读取数据库成功"};
        // c.end();
        console.log(data);
        console.log(results);
        res.send(results);
        res.end();
    });
});
app.get('/get_weather', function (req, res, next) {
    //form表单
    connection.query("SELECT WRATHER_ID,WRATHER_NAME from weather", function (error, results, fields) {
        if (error) {
            var data = {msg: "读取数据库错误"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = {msg: "读取数据库成功"};
        // c.end();
        console.log(data);
        console.log(results);
        res.send(results);
        res.end();
    });
});
app.get('/get_full_photo', function (req, res, next) {
    //form表单
    connection.query("SELECT FULL_PHOTO_ID,FULL_PHOTO_NAME,FULL_PHOTO_CONTENT,MARK_GOODS_ID,CREATE_TIME from full_photo", function (error, results, fields) {
        if (error) {
            var data = {msg: "读取数据库错误"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = {msg: "读取数据库成功"};
        // c.end();
        console.log(data);
        console.log(results);
        res.send(results);
        res.end();
    });
});
app.get('/get_mark_goods', function (req, res, next) {
    //form表单
    let currentSceneId = req.query.base_info_id;
    if (currentSceneId == undefined) currentSceneId = "";
    else currentSceneId = " where base_info_id=\'" + currentSceneId + "\'";
    console.log("SELECT MARK_GOODS_ID,MARK_GOODS_NAME,GOODS_TYPE_ID,EXTRACT_METHOD_ID,BASE_INFO_ID,EXTRACT_TIME,EXTRACT_PERSON,CREATE_TIME,CREATE_PERSION_ID,DATA_STATE,MARK_GOODS_DESCRIBE from mark_goods" + currentSceneId + ";");
    connection.query("SELECT MARK_GOODS_ID,MARK_GOODS_NAME,GOODS_TYPE_ID,EXTRACT_METHOD_ID,BASE_INFO_ID,EXTRACT_TIME,EXTRACT_PERSON,CREATE_TIME,CREATE_PERSION_ID,DATA_STATE,MARK_GOODS_DESCRIBE from mark_goods" + currentSceneId + ";", function (error, results, fields) {
        if (error) {
            var data = {msg: "读取数据库错误"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = {msg: "读取数据库成功"};
        // c.end();
        console.log(data);
        console.log(results);
        res.send(results);
        res.end();
    });
});
app.get('/get_goods_type', function (req, res, next) {
    //form表单
    connection.query("SELECT GOODS_TYPE_ID,GOODS_TYPE_NAME from goods_type", function (error, results, fields) {
        if (error) {
            var data = {msg: "读取数据库错误"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = {msg: "读取数据库成功"};
        // c.end();
        console.log(data);
        console.log(results);
        res.send(results);
        res.end();
    });
});
app.get('/get_extract_method', function (req, res, next) {
    //form表单
    connection.query("SELECT EXTRACT_METHOD_ID,EXTRACT_METHOD_NAME from extract_method", function (error, results, fields) {
        if (error) {
            var data = {msg: "读取数据库错误"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = {msg: "读取数据库成功"};
        // c.end();
        console.log(data);
        console.log(results);
        res.send(results);
        res.end();
    });
});
app.get('/get_corpse_info', function (req, res, next) {
    let currentSceneId = req.query.base_info_id;
    if (currentSceneId == undefined) currentSceneId = "";
    else currentSceneId = " where base_info_id=\'" + currentSceneId + "\'";
    console.log("SELECT CORPSE_INFO_ID,BASE_INFO_ID,CORPSE_INFO_CODE,CORPSE_INFO_NAME,CORPSE_FIND_PLACE,CORPSE_FEATURES,SCENE_BLOODSTAIN_SITUATION,SCENE_ES_SURVEY,CLOTHES_SITUATION,CORPSE_INCLUSIONS,CORPSE_COSTUMES,DEATH_NATURE,LETHAL_REASON,DEATH_TIME_START,DEATH_TIME_END,CORPSE_INJURING_FORM,FEATURES_DESCRIBE,CREATE_PERSION_ID,CREATE_TIME,CORPSE_COMPLETION,DATA_STATE,UPDATE_TIME from corpse_info" + currentSceneId);
    connection.query("SELECT CORPSE_INFO_ID,BASE_INFO_ID,CORPSE_INFO_CODE,CORPSE_INFO_NAME,CORPSE_FIND_PLACE,CORPSE_FEATURES,SCENE_BLOODSTAIN_SITUATION,SCENE_ES_SURVEY,CLOTHES_SITUATION,CORPSE_INCLUSIONS,CORPSE_COSTUMES,DEATH_NATURE,LETHAL_REASON,DEATH_TIME_START,DEATH_TIME_END,CORPSE_INJURING_FORM,FEATURES_DESCRIBE,CREATE_PERSION_ID,CREATE_TIME,CORPSE_COMPLETION,DATA_STATE,UPDATE_TIME from corpse_info" + currentSceneId, function (error, results, fields) {
        if (error) {
            var data = {msg: "读取数据库错误"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = {msg: "读取数据库成功"};
        // c.end();
        console.log(data);
        console.log(results);
        res.send(results);
        res.end();
    });
});
app.get('/get_corpse_photo', function (req, res, next) {
    //form表单
    connection.query("SELECT CORPSE_PHOTO_ID,CORPSE_PHOTO_NAME,CORPSE_PHOTO_CONTENT,CREATE_TIME,CORPSE_INFO_ID from corpse_photo", function (error, results, fields) {
        if (error) {
            var data = {msg: "读取数据库错误"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = {msg: "读取数据库成功"};
        // c.end();
        console.log(data);
        console.log(results);
        res.send(results);
        res.end();
    });
});
app.get('/get_position_photo', function (req, res, next) {
    //form表单
    connection.query("SELECT POSITION_PHOTO_ID,POSITION_PHOTO_NAME,POSITION_PHOTO_CONTENT,MARK_GOODS_ID,CREATE_TIME from position_photo", function (error, results, fields) {
        if (error) {
            var data = {msg: "读取数据库错误"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = {msg: "读取数据库成功"};
        // c.end();
        console.log(data);
        console.log(results);
        res.send(results);
        res.end();
    });
});
app.get('/get_case_conclusion_info', function (req, res, next) {
    //form表单
    connection.query("SELECT BASE_INFO_ID,MOTIVATION,CRIME_TOOLS,CRIME_TIME,CRIME_ADDRESS,VICTIME,CREATE_PERSON_ID,CREATE_TIME,UPDATE_TIME,DATA_STATE from case_conclusion_info", function (error, results, fields) {
        if (error) {
            var data = {msg: "读取数据库错误"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = {msg: "读取数据库成功"};
        // c.end();
        console.log(data);
        console.log(results);
        res.send(results);
        res.end();
    });
});
app.get('/get_ele_info', function (req, res, next) {
    //form表单
    connection.query("SELECT BASE_INFO_ID,DEVICE_NAME,CONTENT_DESC,EXT_TIME,EXT_PERSON,CREATE_PERSON_ID,CREATE_TIME,UPDATE_TIME,DATA_STATE from ele_info", function (error, results, fields) {
        if (error) {
            var data = {msg: "读取数据库错误"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = {msg: "读取数据库成功"};
        // c.end();
        console.log(data);
        console.log(results);
        res.send(results);
        res.end();
    });
});
app.get('/get_involved_goods_info', function (req, res, next) {
    let currentSceneId = req.query.base_info_id;
    if (currentSceneId == undefined) currentSceneId = "";
    else currentSceneId = " where base_info_id=\'" + currentSceneId + "\'";
    console.log("SELECT INVOLVED_GOODS_INFO_ID,INVOLVED_GOODS_NAME,EXTRACT_POSITION,BASE_INFO_ID,CREATE_PERSION_ID,CREATE_TIME,UPDATE_TIME,DATA_STATE from involved_goods_info" + currentSceneId);
    //form表单
    connection.query("SELECT INVOLVED_GOODS_INFO_ID,INVOLVED_GOODS_NAME,EXTRACT_POSITION,BASE_INFO_ID,CREATE_PERSION_ID,CREATE_TIME,UPDATE_TIME,DATA_STATE from involved_goods_info" + currentSceneId, function (error, results, fields) {
        if (error) {
            var data = {msg: "读取数据库错误"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = {msg: "读取数据库成功"};
        // c.end();
        console.log(data);
        console.log(results);
        res.send(results);
        res.end();
    });
});
app.get('/get_involved_person_info', function (req, res, next) {
    //form表单
    let currentSceneId = req.query.base_info_id;
    if (currentSceneId == undefined) currentSceneId = "";
    else currentSceneId = " where base_info_id=\'" + currentSceneId + "\'";
    console.log(req.query.base_info_id);
    connection.query("SELECT INVOLVED_PERSON_INFO_ID,INVOLVED_PERSON_CODE,INVOLVED_PERSON_NAME,SEX,AGE,NATION,NATIONALITY,POSTURE,HEIGHT,CLOTHES_SITUATION,PHY_FUN,CARD_TYPE,DOMICILE,CARD_NUMBER,CURRENT_ADDRESS,WORK_UNIT,UNIT_ADDRESS,PHONE,JOB_DUTIES,BASE_INFO_ID,INVESTIGATION_TIME,INVESTIGATION_PERSION,INVESTIGATION_ADDRESS,REMARKS,CREATE_PERSON_ID,CREATE_TIME,UPDATE_TIME,DATA_SOURCES,DATA_STATE,RELATION_CORPSE,RELATION_PERSON from involved_person_info" + currentSceneId, function (error, results, fields) {
        if (error) {//TYPE_ID,
            var data = {msg: "读取数据库错误"};
            // c.end();
            res.send(data);
            res.end();
            return console.error(error);
        }
        var data = {msg: "读取数据库成功"};
        // c.end();
        console.log(data);
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


// app.get('/update_thing_info', function (req, res, next) {//新增
//     //form表单
//     var thing_type = req.query.thing_type;
//     var thing_id = req.query.thing_id;
//     var COLLECTED_BY = req.query.COLLECTED_BY;
//     var COLLECTED_DATE = req.query.COLLECTED_DATE;
//     var COLLECTION_MODE = req.query.COLLECTION_MODE;
//     var CRIMINAL_FLAG = req.query.CRIMINAL_FLAG;
//     var DESCRIPTION = req.query.DESCRIPTION;
//     var EVIDENCE_TYPE = req.query.EVIDENCE_TYPE;
//     var LEFT_POSITION = req.query.LEFT_POSITION;
//     var PRINT_FLAG = req.query.PRINT_FLAG;
//     var STORAGE_FLAG = req.query.STORAGE_FLAG;
//     var UTILIZATION = req.query.UTILIZATION;
//     connection.query("UPDATE " + thing_type + " set COLLECTED_BY='" + COLLECTED_BY + "',COLLECTED_DATE='" + COLLECTED_DATE + "',COLLECTION_MODE='" + COLLECTION_MODE + "',CRIMINAL_FLAG='" + CRIMINAL_FLAG + "',DESCRIPTION='" + DESCRIPTION + "',EVIDENCE_TYPE='" + EVIDENCE_TYPE + "',LEFT_POSITION='" + LEFT_POSITION + "',PRINT_FLAG='" + PRINT_FLAG + "',STORAGE_FLAG='" + STORAGE_FLAG + "',UTILIZATION='" + UTILIZATION + "' where id=" + thing_id, function (error, results, fields) {
//         // connection.query("UPDATE  COLLECTED_BY=" + COLLECTED_BY +" from " + element_type + " where id=" + element_id, function (error, results, fields) {
//         if (error) {
//             var data = {msg: "更新失败"};
//             // c.end();
//             res.send(data);
//             res.end();
//             return console.error(error);
//         } else {
//             var data = {msg: "更新成功"};
//             // c.end();
//             console.log("更新成功");
//             res.send(data);
//             res.end();
//         }
//
//     });
//
// });


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


// app.post('/uploads', function (req, res, next) {
//     //form表单
//     var form = new formidable.IncomingForm();
//     //保留后缀
//     form.keepExtensions = true;
//     form.encoding = 'utf-8';
//     form.maxFileSize = 4 * 1024 * 1024 * 1024;
//     //上传文件路径,采用path路径拼接
//     form.uploadDir = path.join(__dirname, 'public/Files');
//     //如果上传文件夹（多个文件）需将 默认值改为TRUE
//     form.multiples = true;
//     //该方法会转换请求中所包含的表单数据，callback会包含所有字段域和文件信息
//     // fields 是普通表单数据
//     // files 是文件数据
//     form.parse(req, function (err, fields, files) {
//             console.log("开始上传");
//             // var Client = require('node-ftp');
//             // var c = new Client();
//             // var targetOptions = {
//             //     host: '127.0.0.1',
//             //     port: '2121',
//             //     user: 'anonymous',
//             //     password: '',
//             // };
//             // c.connect(targetOptions);
//             //该属性upload是在HTML文件的name中设置的
//             // c.on('ready', function () {
//             //     console.log("ftp连接成功");
//             for (var i = 0; i < files.upload.length; i++) {
//                 var file = files.upload[i];
//                 var pathnameArray = file.name.split('/');
//                 var folderPath = form.uploadDir;
//                 var FTPfolderPath = "";
//                 for (var j = 0; j < pathnameArray.length - 1; j++) {
//                     folderPath = path.join(folderPath, pathnameArray[j]);
//                     // FTPfolderPath = path.join(FTPfolderPath, pathnameArray[j]);
//                     // c.get(FTPfolderPath, function (err) {
//                     //     console.log("获取FTP文件夹" + FTPfolderPath);
//                     //     if (err) {
//                     //         c.mkdir(FTPfolderPath, function (err) {
//                     //             if (err) throw err;
//                     //             console.log("FTP服务器创建目录" + FTPfolderPath);
//                     //             if(j==pathnameArray.length - 2){
//                     //                 c.put(file.path, path.join(FTPfolderPath, pathnameArray[pathnameArray.length - 1]), function (err) {
//                     //                     console.log("本地路径："+path.join(folderPath, pathnameArray[pathnameArray.length - 1])+"；ftp服务器路径："+path.join(FTPfolderPath, pathnameArray[pathnameArray.length - 1]));
//                     //                     if (err) throw err;
//                     //                     console.log("上传FTP文件" + pathnameArray[pathnameArray.length - 1]);
//                     //                 });
//                     //             }
//                     //         })
//                     //     }
//                     //     ;
//                     // });
//                     if (!fs.existsSync(folderPath)) {
//                         //如果不存在上传文件夹名称，就创建
//                         try {
//                             fs.mkdirSync(folderPath, 0o777);
//                             ("成功创建目录" + folderPath);
//                         } catch (e) {
//                             console.log(e.name + ": " + e.message);
//                         }
//                     }
//                     //移动文件夹并更改名称
//                     //  fs.rename(oldpath, newpath, callback)
//                     // fs.rename(file.path, path.join(folderPath, pathnameArray[1]));
//                 }
//
//                 try {
//                     fs.renameSync(file.path, path.join(folderPath, pathnameArray[pathnameArray.length - 1]));
//                     if (pathnameArray[pathnameArray.length - 1] == "kinetic.json") {
//                         console.log("获得json文件");
//                         var info = {};
//                         fs.readFile(path.join(folderPath, pathnameArray[pathnameArray.length - 1]), function (err, data) {
//                             if (err) {
//                                 return console.error(err);
//                             }
//                             var filedata = data.toString();//将二进制的数据转换为字符串
//                             filedata = JSON.parse(filedata);//将字符串转换为json对象
//                             var kinetic_id = filedata.kinetic_id;
//                             connection.query("INSERT into kinetic_t (scene_id,kinetic_id) value (" + scene_id + ",'" + kinetic_id + "')", function (error, results, fields) {
//                                 if (error) {
//                                     var data = {msg: "写入数据库错误，上传失败"};
//                                     // c.end();
//                                     res.send(data);
//                                     res.end();
//                                     return console.error(error);
//                                 }
//                                 info.kinetic_id = kinetic_id;
//
//                             });
//                             var model_info = [];
//                             var index = 0;
//                             for (var gltf in filedata.gltfs) {
//                                 connection.query("INSERT into modelinfo (scene_id,path,name) value (" + scene_id + ",'" + filedata.gltfs[index].path + "','" + filedata.gltfs[index].name + "')", function (error, results, fields) {
//                                     if (error) {
//                                         var data = {msg: "写入数据库错误，上传失败"};
//                                         // c.end();
//                                         res.send(data);
//                                         res.end();
//                                         return console.error(error);
//                                     }
//                                     model_info.push(filedata.gltfs[index].name, filedata.gltfs[index].path);
//                                     if (index == filedata.gltfs.length - 1) {
//                                         console.log("sql完成");
//                                         console.log("上传成功");
//                                         info.msg = '上传成功';
//                                         info.model_info = model_info;
//                                         res.send(info);
//                                         res.end();
//                                     }
//                                     index++;
//                                 });
//                             }
//                             //  返回此案件包含案件列表
//                             // connection.query("SELECT from modelinfo where scene_id=" + scene_id, function (error, results, fields) {
//                             //     if (error) {
//                             //         var data = {msg: "写入数据库错误，上传失败"};
//                             //         // c.end();
//                             //         res.send(data);
//                             //         res.end();
//                             //         return console.error(err);
//                             //     }
//                             //     ;
//                             // });
//                             // console.log(filedata.gltfs[0].path);
//
//                         })
//                     }
//                 } catch (e) {
//                     console.log(e.name + ": " + e.message);
//                     var data = {msg: "上传失败"};
//                     // c.end();
//                     res.send(data);
//                     res.end();
//
//                 }
//             }
//             //响应 格式化打印 String
//             // console.log("上传结束");
//             // var data = {msg: "上传完成"};
//             // c.end();
//             // res.send(data);
//             // if (sql_finished==true)
//             //     res.end();
//             // });
//         }
//     );
// });

// app.post('/upload', function (req, res, next) {
//     //form表单
//     console.log("开始上传");
//     var form = new formidable.IncomingForm();
//     //保留后缀
//     form.keepExtensions = true;
//     form.encoding = 'utf-8';
//     form.maxFileSize = 4 * 1024 * 1024 * 1024;
//     //上传的数据保存的路径
//     form.uploadDir = path.join(__dirname, 'Files');
//     //该方法会转换请求中所包含的表单数据，callback会包含所有字段域和文件信息
//     // fields 是普通表单数据
//     // files 是文件数据
//     form.parse(req, function (err, fields, files) {
//         // var filename = files.upload.name;
//         console.log(files);
//         // var path = files.upload.path;
//         //移动并更名
//         // console.log("重命名");
//         // fs.renameSync(path, form.uploadDir + filename);
//         // //响应 格式化打印
//         // console.log("上传完成");
//
//         res.end();
//         // res.end(util.inspect(files));
//     });
// });
var id;
var name;
var max_frame;
var max_x;
var max_y;
var max_z;
var file_folder;
var first_file;
var file_prefix;

function initdirs(dirpath) {
    var subpath = dirpath;
    var pathnameArray = subpath.split('/');
    var newpath = '';
    for (var j = 0; j < pathnameArray.length; j++) {
        newpath = path.join(newpath, pathnameArray[j]);
        if (!fs.existsSync(newpath)) {
            try {
                fs.mkdirSync(newpath, 0o777);
                ("成功创建目录" + newpath);
            } catch (e) {
                console.log(e.name + ": " + e.message);
            }
        }
    }
}

app.post('/update_transform', function (req, res, next) {
    //form表单
    var form = new formidable.IncomingForm();
    //保留后缀
    form.keepExtensions = true;
    form.encoding = 'utf-8';
    form.maxFileSize = 4 * 1024 * 1024 * 1024;
    //上传文件路径,采用path路径拼接
    var dirpath = 'public/particle_source/';
    console.log(dirpath);
    initdirs(dirpath);
    form.uploadDir = path.join(__dirname, dirpath);
    //如果上传文件夹（多个文件）需将 默认值改为TRUE
    form.multiples = true;
    form.parse(req, function (err, fields, files) {
        var suffix = fields.suffix;
        var rootdir = form.uploadDir;
        var suffixArray = suffix.split('/');
        for (var j = 0; j < suffixArray.length - 1; j++) {
            rootdir = path.join(rootdir, suffixArray[j]);
            if (!fs.existsSync(rootdir)) {
                try {
                    fs.mkdirSync(rootdir, 0o777);
                    ("成功创建目录" + rootdir);
                } catch (e) {
                    console.log(e.name + ": " + e.message);
                }
            }
        }
        var folderPath = form.uploadDir + suffix;
        var file = files.files;
        var pathnameArray = file.name.split('/');
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
        }
        var filename = pathnameArray[pathnameArray.length - 1];
        var newpath = path.join(folderPath, filename);
        fs.renameSync(file.path, newpath);
        if (filename.split(".")[1] == "json") {
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
            file_prefix = filedata.file_prefix;
            var data = {target: 1, msg: "json"};
            // c.end();
            res.send(data);
            res.end();
        } else if (filename.split(".")[1] == "dat") {
            var number = parseInt(filename.split(".")[0].split(file_prefix)[1]);
            console.log(number + ":" + max_x + ":" + max_y + ":" + max_z + ":" + file_folder + ":" + file_prefix + number);
            MyClass.transform(number, max_x, max_y, max_z, suffix + file_folder, (error, info) => {
                if (error) {
                    console.log('put name Error: ', error);
                    var data = {target: 1, msg: number + "帧转换失败"};
                    res.send(data);
                    res.end();
                    return;
                }
                var data = {target: 1, msg: number + "帧转换成功"};
                // c.end();
                res.send(data);
                res.end();
            });
        } else {
            var data = {target: 0};
            res.send(data);
            res.end();
        }
    });
});

//一般文件上传函数，存于public/Files文件夹，Files文件夹（如无请新建）被项目忽略，如还未设置请项目根目录下.gitignore文件（如无请新建）中添加文本public/Files
app.post('/upload_things', function (req, res, next) {
    //form表单
    try {
        var form = new formidable.IncomingForm();
        //保留后缀
        form.keepExtensions = true;
        form.encoding = 'utf-8';
        form.maxFileSize = 4 * 1024 * 1024 * 1024;
        var dirpath = 'public/Files/';
        //上传文件路径,采用path路径拼接
        initdirs(dirpath);
        form.uploadDir = path.join(__dirname, dirpath);
        //如果上传文件夹（多个文件）需将 默认值改为TRUE
        form.multiples = true;
        form.parse(req, function (err, fields, files) {
            var suffix = fields.suffix;
            var rootdir = form.uploadDir;
            var file = files.files;
            var suffixArray = suffix.split('/');
            for (var j = 0; j < suffixArray.length - 1; j++) {
                rootdir = path.join(rootdir, suffixArray[j]);
                if (!fs.existsSync(rootdir)) {
                    try {
                        fs.mkdirSync(rootdir, 0o777);
                        ("成功创建目录" + rootdir);
                    } catch (e) {
                        console.log(e.name + ": " + e.message);
                    }
                }
            }
            var folderPath = form.uploadDir + suffix;
            var file = files.files;
            var pathnameArray = file.name.split('/');
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
            }
            var filename = pathnameArray[pathnameArray.length - 1];
            var newpath = path.join(folderPath, filename);
            fs.renameSync(file.path, newpath);
            // console.log(newpath);
            var data = {status: 1, msg: filename + "上传成功"};
            // c.end();
            res.send(data);
            res.end();
        })
        currentUploaded = dirpath;
    } catch (error) {
        console.log(error.name + ": " + error.message);
        var data = {status: 0, msg: filename + "上传失败"};
        // c.end();
        res.send(data);
        res.end();
    }
});

app.post('/uploads_particle', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.encoding = 'utf-8';
    form.maxFileSize = 4 * 1024 * 1024 * 1024;
    var suffix = req.data.get('name');
    var dirpath = 'public/particle_source/' + suffix;
    initdirs(dirpath);
    form.uploadDir = path.join(__dirname, dirpath);
    form.multiples = true;
    form.parse(req, function (err, fields, files) {
        console.log("开始上传粒子");
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
        MyClass.transform(file_folder, max_x, max_y, max_z, max_frame, (error, info) => {

            if (error) {
                console.log('put name Error: ', error);
                return;
            }
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
    });
});
