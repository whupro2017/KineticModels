window.oncontextmenu = function (e) {
    e.preventDefault();
}
window.onclick = function (e) {
    document.querySelector('#menu').style.width = 0;
}

var activeObject = {
    "element_type": "undefined",
    "element_id": "undefined"
};
var json = {
    "scene_bio_evidence": "bio",
    "scene_elec_evidence": "elec",
    "scene_file_evidence": "file",
    "scene_footprint": "foot",
    "scene_handprint": "hand",
    "scene_tool": "tool"
}
var redirect_pages = {
    "mark_goods": "markGoods",
    "involved_goods_info": "involvedGoodsInfo",
    "involved_person_info": "involvedPersonInfo",
    "corpse_info": "bodyBasic",
    "scene_file_evidence": "file",
    "scene_footprint": "foot",
    "scene_handprint": "hand",
    "scene_toolmark": "tool"
}
var redirect_title = {
    "mark_goods": "markGoods",
    "involved_goods_info": "involvedGoodsInfo",
    "involved_person_info": "involvedPersonInfo",
    "corpse_info": "body",
    "scene_file_evidence": "file",
    "scene_footprint": "foot",
    "scene_handprint": "hand",
    "scene_toolmark": "tool"
}

/*
现勘详情
http://localhost:8089/inquestBaseInfo.html?baseInfoId=2c91fa9d6ec45183016ec45443750001
痕迹物品
http://localhost:8089/markGoods.html?markGoodsId=e1613e91256d463f92512e062eb8b1ca
涉案物品
http://localhost:8089/involvedGoodsInfo.html?involvedGoodsInfoId=2c91fa9d6ec59058016ec5a7ba38004c
媒介环境信息
http://localhost:8089/mediaEnvironmentInfo.html?mediaEnvironmentInfoId=2c91facc6ec4364d016ec4776d700009
案事件全貌
http://localhost:8089/caseConclusionInfo.html?caseConclusionId=2c91fa0072e0614c0172e0655c430010
走访情况
http://localhost:8089/visitSituation.html?visitId=2c91fa9d6ec556fe016ec55df2930007
电子信息
http://localhost:8089/eleInfo.html?eleInfoId=2c91facc6ecfb073016ecfbd9d2d0014
嫌疑人供述
http://localhost:8089/staOfSuspect.html?staId=2c91facc6ece8724016ecf8bcedd0039
涉案人员
http://localhost:8089/involvedPersonInfo.html?involvedPersonInfoId=2c91fa9d6ec556fe016ec5618c380013
尸体信息
http://localhost:8089/bodyBasic.html?bodyId=2c91fa9d6ec59058016ec5aa0a72004f
侦察实验
http://localhost:8089/scoutAtta.html?scoutId=2c91fa9d6ec494a2016ec4973d0b0001
媒介信息
http://localhost:8089/medium.html?mediumId=2c91facc6ece8724016ecf93b72b003c
*/

function show_model_info() {
    console.log(activeObject.element_type + "," + activeObject.element_id);
    window.open(visualpage_addr + redirect_pages[activeObject.element_type] + ".html?" +
        redirect_title[activeObject.element_type] + "Id=" + activeObject.element_id,
        "show_element_info",
        "height=700, width=1000, top=200, left=450, toolbar=no, menubar=no, directories=no, scrollbars=no, resizable=no, location=no, status=no");
}

function addTypedSymbol(point, type, size) {
    if (size == undefined)
        size = 0.5
    symbolList.push(viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(point.lon, point.lat, point.height),
        billboard: {
            image: "../imgs/" + type + ".png",
            // heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
            // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            scale: size,
            // color: Cesium.Color.BLUE,
            verticalOrigin: Cesium.VerticalOrigin.MIDDLE,
            horizontalOrigin: Cesium.HorizontalOrigin.MIDDLE,
            disableDepthTestDistance: Number.POSITIVE_INFINITY
        }
    }));
}

function show_element_relation() {
    emptySymbol();
    var dataseries = [{
        name: '痕迹',
        data: []
    }, {
        name: '物品',
        data: []
    }, {
        name: '尸体',
        data: []
    }, {
        name: '嫌疑人',
        data: []
    }];
    let object_name = "";
    let object_lon, object_lat, object_height = .0;
    $.get("/get_object_name_position", {
        "key": activeObject.element_type,
        "value": activeObject.element_id
    }, function (data) {
        if (data.length == 0)
            alert("类型：" + activeObject.element_type + "主键：" + activeObject.element_id + "无效");
        else {
            object_name = data[0].name;
            object_lon = data[0].start_lon;
            object_lat = data[0].start_lat;
            object_height = data[0].start_height;
        }

        switch (activeObject.element_type) {
            case "mark_goods":
                dataseries[0].data.push({
                    name: object_name,
                    value: 600,
                    id: activeObject.element_id,
                    type: activeObject.element_type,
                    position: {"lon": object_lon, "lat": object_lat, "height": object_height}
                });
                addTypedSymbol({"lon": object_lon, "lat": object_lat, "height": object_height}, 'good', 0.65);
                break;
            case "involved_goods_info":
                dataseries[1].data.push({
                    name: object_name,
                    value: 600,
                    id: activeObject.element_id,
                    type: activeObject.element_type,
                    position: {"lon": object_lon, "lat": object_lat, "height": object_height}
                });
                addTypedSymbol({"lon": object_lon, "lat": object_lat, "height": object_height}, 'thing', 0.65);
                break;
            case "corpse_info":
                dataseries[2].data.push({
                    name: object_name,
                    value: 600,
                    id: activeObject.element_id,
                    type: activeObject.element_type,
                    position: {"lon": object_lon, "lat": object_lat, "height": object_height}
                });
                addTypedSymbol({"lon": object_lon, "lat": object_lat, "height": object_height}, 'corpse', 0.65);
                break;
            case "involved_person_info":
                dataseries[3].data.push({
                    name: object_name,
                    value: 600,
                    id: activeObject.element_id,
                    type: activeObject.element_type,
                    position: {"lon": object_lon, "lat": object_lat, "height": object_height}
                });
                addTypedSymbol({"lon": object_lon, "lat": object_lat, "height": object_height}, 'person', 0.65);
                break;
            case "scene_file_evidence":
            case "scene_footprint":
            case "scene_handprint":
            case "scene_toolmark":
            case "undefined":
                alert("不支持" + activeObject.element_type);
        }
    });
    /*var sampleseries = [{
        name: '痕迹',
        data: [{name: '血液', value: 332.0}, {name: '足迹', value: 334.0}, {name: '手印', value: 734.0}]
    }, {
        name: '物品',
        data: [{name: '地板', value: 445.0}, {name: '扶手', value: 327.0}, {name: '门窗', value: 618.0}]
    }, {
        name: '主体',
        data: [{name: '被害人1', value: 778.0}, {name: '被害人2', value: 318.0}, {name: '嫌疑人', value: 324.0}]
    }, {
        name: '信息', data: [{name: '录音', value: 581.0}, {name: '视频', value: 312.0}, {name: '基站', value: 327.0}]
    }]*/
    $.get("/get_relation_from_mark_goods", {"value": activeObject.element_id}, function (data) {
        // alert(data.toString());
        // let markgoods = '';
        // obj.push(markgoods);
        data.forEach(function (json) {
            console.log("from mark" + json.MARK_GOODS_NAME + "," + json.EXTRACT_POSITION + "," + json.CREATE_TIME);
            if (json.START_LON == undefined) {
                alert("来源痕迹<" + json.MARK_GOODS_NAME + ">被关联、但尚未标定");
            } else {
                addTypedSymbol({"lon": json.START_LON, "lat": json.START_LAT, "height": json.START_HEIGHT}, 'fromGood');
                dataseries[0].data.push({
                    name: json.MARK_GOODS_NAME,
                    value: 200,
                    id: json.ELEMENT_ID,
                    type: 'mark_goods',
                    position: {"lon": json.START_LON, "lat": json.START_LAT, "height": json.START_HEIGHT}
                });
            }
        });
        bubbleshow(dataseries, true);
    })
    $.get("/get_relation_to_mark_goods", {"value": activeObject.element_id}, function (data) {
        // alert(data.toString());
        // let markgoods = '';
        // obj.push(markgoods);
        data.forEach(function (json) {
            console.log("to mark" + json.MARK_GOODS_NAME + "," + json.EXTRACT_POSITION + "," + json.CREATE_TIME);
            if (json.START_LON == undefined) {
                alert("目标物品<" + json.MARK_GOODS_NAME + ">被关联、但尚未标定");
            } else {
                addTypedSymbol({"lon": json.START_LON, "lat": json.START_LAT, "height": json.START_HEIGHT}, 'toGood');
                dataseries[0].data.push({
                    name: json.MARK_GOODS_NAME,
                    value: 200,
                    id: json.ELEMENT_ID,
                    type: 'mark_goods',
                    position: {"lon": json.START_LON, "lat": json.START_LAT, "height": json.START_HEIGHT}
                });
            }
        });
        bubbleshow(dataseries, true);
    })
    $.get("/get_relation_from_involved_goods", {"value": activeObject.element_id}, function (data) {
        // alert(data.toString());
        data.forEach(function (json) {
            console.log("from goods" + json.INVOLVED_GOODS_NAME + "," + json.REMARKS + "," + json.CREATE_TIME);
            if (json.START_LON == undefined) {
                alert("来源物品<" + json.INVOLVED_GOODS_NAME + ">被关联、但尚未标定");
            } else {
                addTypedSymbol({
                    "lon": json.START_LON,
                    "lat": json.START_LAT,
                    "height": json.START_HEIGHT
                }, 'fromThing');
                dataseries[1].data.push({
                    name: json.INVOLVED_GOODS_NAME,
                    value: 200,
                    id: json.ELEMENT_ID,
                    type: 'involved_goods_info',
                    position: {"lon": json.START_LON, "lat": json.START_LAT, "height": json.START_HEIGHT}
                });
            }
        });
        bubbleshow(dataseries, true);
    })
    $.get("/get_relation_to_involved_goods", {"value": activeObject.element_id}, function (data) {
        // alert(data.toString());
        data.forEach(function (json) {
            console.log("to goods" + json.INVOLVED_GOODS_NAME + "," + json.REMARKS + "," + json.CREATE_TIME);
            if (json.START_LON == undefined) {
                alert("目标物品<" + json.INVOLVED_GOODS_NAME + ">被关联、但尚未标定");
            } else {
                addTypedSymbol({"lon": json.START_LON, "lat": json.START_LAT, "height": json.START_HEIGHT}, 'toGood');
                dataseries[1].data.push({
                    name: json.INVOLVED_GOODS_NAME,
                    value: 200,
                    id: json.ELEMENT_ID,
                    type: 'involved_goods_info',
                    position: {"lon": json.START_LON, "lat": json.START_LAT, "height": json.START_HEIGHT}
                });
            }
        });
        bubbleshow(dataseries, true);
    })
    $.get("/get_relation_from_corpse", {"value": activeObject.element_id}, function (data) {
        // alert(data.toString());
        data.forEach(function (json) {
            console.log("from corpse" + json.CORPSE_INFO_NAME + "," + json.CORPSE_INFORMATION + "," + json.CREATE_TIME);
            if (json.START_LON == undefined) {
                alert("来源尸体<" + json.CORPSE_INFO_NAME + ">被关联、但尚未标定");
            } else {
                addTypedSymbol({
                    "lon": json.START_LON,
                    "lat": json.START_LAT,
                    "height": json.START_HEIGHT
                }, 'fromCorpse');
                dataseries[2].data.push({
                    name: json.CORPSE_INFO_NAME,
                    value: 200,
                    id: json.ELEMENT_ID,
                    type: 'corpse_info',
                    position: {"lon": json.START_LON, "lat": json.START_LAT, "height": json.START_HEIGHT}
                });
            }
        });
        bubbleshow(dataseries, true);
    })
    $.get("/get_relation_to_corpse", {"value": activeObject.element_id}, function (data) {
        // alert(data.toString());
        data.forEach(function (json) {
            console.log("to corpse" + json.CORPSE_INFO_NAME + "," + json.CORPSE_INFORMATION + "," + json.CREATE_TIME);
            if (json.START_LON == undefined) {
                alert("目标尸体<" + json.CORPSE_INFO_NAME + ">被关联、但尚未标定");
            } else {
                addTypedSymbol({"lon": json.START_LON, "lat": json.START_LAT, "height": json.START_HEIGHT}, 'toCorpse');
                dataseries[2].data.push({
                    name: json.CORPSE_INFO_NAME,
                    value: 200,
                    id: json.ELEMENT_ID,
                    type: 'corpse_info',
                    position: {"lon": json.START_LON, "lat": json.START_LAT, "height": json.START_HEIGHT}
                });
            }
        });
        bubbleshow(dataseries, true);
    })
    $.get("/get_relation_from_person", {"value": activeObject.element_id}, function (data) {
        // alert(data.toString());
        data.forEach(function (json) {
            console.log("from person" + json.INVOLVED_PERSON_NAME + "," + json.REMARKS + "," + json.CREATE_TIME);
            if (json.START_LON == undefined) {
                console.log("来源涉案人<" + json.INVOLVED_PERSON_NAME + ">被关联、但尚未标定");
            } else {
                addTypedSymbol({
                    "lon": json.START_LON,
                    "lat": json.START_LAT,
                    "height": json.START_HEIGHT
                }, 'fromPerson');
                dataseries[3].data.push({
                    name: json.INVOLVED_PERSON_NAME,
                    value: 200,
                    id: json.ELEMENT_ID,
                    type: 'involved_person_info',
                    position: {"lon": json.START_LON, "lat": json.START_LAT, "height": json.START_HEIGHT}
                });
            }
        });
        bubbleshow(dataseries, true);
    })
    $.get("/get_relation_to_person", {"value": activeObject.element_id}, function (data) {
        // alert(data.toString());
        data.forEach(function (json) {
            console.log("to person" + json.INVOLVED_PERSON_NAME + "," + json.REMARKS + "," + json.CREATE_TIME);
            if (json.START_LON == undefined) {
                console.log("目标涉案人<" + json.INVOLVED_PERSON_NAME + ">被关联、但尚未标定");
            } else {
                addTypedSymbol({"lon": json.START_LON, "lat": json.START_LAT, "height": json.START_HEIGHT}, 'toPerson');
                dataseries[3].data.push({
                    name: json.INVOLVED_PERSON_NAME,
                    value: 200,
                    id: json.ELEMENT_ID,
                    type: 'involved_person_info',
                    position: {"lon": json.START_LON, "lat": json.START_LAT, "height": json.START_HEIGHT}
                });
            }
        });
        bubbleshow(dataseries, true);
    })
    /*console.log(dataseries);
    console.log(dataseries.toLocaleString());
    var visualseries = [];
    for (var i = 0; i < dataseries.length; i++) {
        if (dataseries[i].data.length > 0)
            visualseries.push(dataseries[i]);
    }
    console.log(visualseries)
    console.log(sampleseries)
    bubbleshow(visualseries, true);*/
}

function locate_model(path) {
    alert("点击鼠标左键选定模型位置，右键单击退出模型定位模式");
    operation_type = "locate_model";
}

function emptyRipple() {
    do {
        var item = rippleList.shift();
        viewer.entities.removeById(item);
        console.log("Removed: " + item);
    } while (item != null);
    viewer.entities.removeAll();
}

function emptySymbol() {
    var item = symbolList.shift();
    while (item != null) {
        viewer.entities.removeById(item.id);
        console.log("Removed: " + item);
        item = symbolList.shift();
    }
}

function get_scenes(idx) {
    console.log("idx: " + idx);
    console.log("案件id为：" + casesIdMap.get(idx).cases_id + " Name: " + casesIdMap.get(idx).cases_name);
    currentCaseId = casesIdMap.get(idx).cases_id;
    $.get("/get_scenes", {"value": casesIdMap.get(idx).cases_id}, function (data) {
        scenes = data;
        $("#case_event_name").find("option").remove();
        $("#case_event_name").append("<option value='volvo' hidden>ID</option>");
        let sceneIdx = 1;
        scenes.forEach(function (json) {
            $("#case_event_name").append('<option value=' + json.case_event_name + ' >' + json.case_event_name + '</option>');
            sceneIdMap.set(sceneIdx++, json);
        });
    })
    let limit_lon = 0, limit_lat = 0, center_lon = 0, center_lat = 0;
    $.get("/get_case_scenes", {"value": casesIdMap.get(idx).cases_id}, function (data) {
        case_scenes = data;
        case_scenes.forEach(function (json) {
            if (json.site_type == '0') {
                center_lon = json.start_lon;
                center_lat = json.start_lat;
                // alert("hit center for scene: " + casesIdMap.get(idx).cases_id + ' data: ' + data.toString());
            }
        })
        case_scenes.forEach(function (json) {
            if (Math.abs(json.start_lon - center_lon) > limit_lon)
                limit_lon = Math.abs(json.start_lon - center_lon);
            if (Math.abs(json.start_lat - center_lat) > limit_lat)
                limit_lat = Math.abs(json.start_lat - center_lat);
        });
        // alert(center_lon + ", " + center_lat + ", " + limit_lon * 111000 + ", " + limit_lat * 111000);
        if (limit_lon == 0) limit_lon = (1000).toFixed(2) / 444000;
        if (limit_lat == 0) limit_lat = (1000).toFixed(2) / 444000;
        emptyRipple();
        set_view(center_lon, center_lat, Math.max(limit_lon, limit_lat) * 444000);
        case_scenes.forEach(function (json) {
            if (json.site_type == '0') {
                showwavered(json.start_lon, json.start_lat, Math.max(limit_lon, limit_lat) * 55000);
            } else {
                showcirleBlue(json.start_lon, json.start_lat, Math.max(limit_lon, limit_lat) * 55000);
            }
        })
    })
}

function get_element_menu(element_type) {
    console.log("要素大类为：" + element_type);
    $("#elements").find("option").remove();
    $("#elements").append("<option value='volvo' hidden>绑定要素</option>");
    $.get("/get_elements", {
        "element_type": $("#element_type").val(),
        "scene_id": $("#scene_id").val()
    }, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#elements").append('<option value=' + json.ID + ' > 序号' + json.ID + '</option>');
        });               //序列号
    })
}


function mergeJsonObject(jsonbject1, jsonbject2) {
    var resultJsonObject = {};
    for (var attr in jsonbject1) {
        resultJsonObject[attr] = jsonbject1[attr];
    }
    for (var attr in jsonbject2) {
        resultJsonObject[attr] = jsonbject2[attr];
    }
    return resultJsonObject;
};

var jgird_table_settings = {
    height: 240,
    autowidth: true,
    colColor: 'white',
    gridview: true,
    viewrecords: true,
    toppager: false,
    multiselect: true,
    multiboxonly: true,
    autowidth: false,
    fixed: true
}

function get_inquest_base_info(id) {
    table = "#inquest_base_info_table";
    $(".full_view").css("display", "none");
    var x = document.getElementById(id);
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }

    $.get("/get_inquest_base_info", {}, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        console.log(data);

        var show_json = {
            datatype: "local",
            data: data,
            colNames: ['勘验基础信息', '现场勘验号', '案件编号'],
            colModel: [
                {name: 'BASE_INFO_ID', index: 'BASE_INFO_ID', width: 100, editable: false},//cellclassname: colorFondo},
                {
                    name: 'FIELD_SURVEY_NUMBER',
                    index: 'FIELD_SURVEY_NUMBER',
                    sortable: true,
                    sorttype: "string",
                    width: 120,
                    editable: false
                },
                {name: 'CASE_EVENT_CODE', index: 'CASE_EVENT_CODE', width: 80, editable: false}
            ],
        };
        var op_json = mergeJsonObject(show_json, jgird_table_settings);
        jQuery(table).jqGrid(op_json);
        $(table).jqGrid().trigger('reloadGrid');
    });

}

function get_field_commander(id) {
    table = "#field_commander_table";
    $(".full_view").css("display", "none");
    var x = document.getElementById(id);
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }

    $.get("/get_field_commander", {}, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        console.log(data);

        var show_json = {
            datatype: "local",
            data: data,
            colNames: ['现场指挥人员', '现场指挥人员姓名'],
            colModel: [
                {name: 'FIELD_COMMANDER_ID', index: 'FIELD_COMMANDER_ID', width: 150, editable: false},
                {name: 'FIELD_COMMANDER_NAME', index: 'FIELD_COMMANDER_NAME', width: 120, editable: false},
            ],
        };
        var op_json = mergeJsonObject(show_json, jgird_table_settings);
        jQuery(table).jqGrid(op_json);
        $(table).jqGrid().trigger('reloadGrid');
    });
}

function get_protect_measure(id) {
    $(".full_view").css("display", "none");
    var x = document.getElementById(id);
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }
    // $("#site_changes_button").click(function(){
    //     $("#site_changes").toggle();
    // });
    //表内容修改
    // document.getElementById("site_changes_table").rows[0].cells[0].innerText = "现场变动ID"
    // document.getElementById("site_changes_table").rows[0].cells[1].innerText = "现场变动名称"

    $("#protect_measure_table").find("tr").remove();
    $("#protect_measure_table").append("<tr><td>保护措施ID</td><td>保护措施名称</td></tr>")
    $.get("/get_protect_measure", {}, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#protect_measure_table").append("<tr><td>" + json.SITE_CHANGES_ID + "</td><td>" + json.SITE_CHANGES_NAME + "</td></tr>");
        });               //序列号
    })
}

function get_site_changes(id) {
    table = "#site_changes_table";
    $(".full_view").css("display", "none");
    var x = document.getElementById(id);
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }

    $.get("/get_site_changes", {}, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        console.log(data);

        var show_json = {
            datatype: "local",
            data: data,
            colNames: ['现场变动ID', '现场现场变动名称'],
            colModel: [
                {name: 'SITE_CHANGES_ID', index: 'SITE_CHANGES_ID', width: 150, editable: false},
                {name: 'SITE_CHANGES_NAME', index: 'SITE_CHANGES_NAME', width: 120, editable: false},
            ],
        };
        var op_json = mergeJsonObject(show_json, jgird_table_settings);
        jQuery(table).jqGrid(op_json);
        $(table).jqGrid().trigger('reloadGrid');
    });
}

function get_mark_goods_unit(id) {
    table = "#mark_goods_unit_table";
    $(".full_view").css("display", "none");
    var x = document.getElementById(id);
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }

    $.get("/get_mark_goods_unit", {}, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        console.log(data);

        var show_json = {
            datatype: "local",
            data: data,
            colNames: ['单位ID', '单位名称'],
            colModel: [
                {name: 'MARK_GOODS_UNIT_ID', index: 'MARK_GOODS_UNIT_ID', width: 150, editable: false},
                {name: 'MARK_GOODS_UNIT_NAME', index: 'MARK_GOODS_UNIT_NAME', width: 120, editable: false},
            ],
        };
        var op_json = mergeJsonObject(show_json, jgird_table_settings);
        jQuery(table).jqGrid(op_json);
        $(table).jqGrid().trigger('reloadGrid');
    });
}

function get_weather(id) {
    $(".full_view").css("display", "none");
    var x = document.getElementById(id);
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }
    // $("#site_changes_button").click(function(){
    //     $("#site_changes").toggle();
    // });
    //表内容修改
    // document.getElementById("site_changes_table").rows[0].cells[0].innerText = "现场变动ID"
    // document.getElementById("site_changes_table").rows[0].cells[1].innerText = "现场变动名称"

    $("#weather_table").find("tr").remove();
    $("#weather_table").append("<tr><td>天气情况ID</td><td>天气情况名称</td></tr>")
    $.get("/get_weather", {}, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#weather_table").append("<tr><td>" + json.SITE_CHANGES_ID + "</td><td>" + json.SITE_CHANGES_NAME + "</td></tr>");
        });               //序列号
    })
}

function get_full_photo(id) {
    table = "#full_photo_table";
    $(".full_view").css("display", "none");
    var x = document.getElementById(id);
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }

    $.get("/get_full_photo", {}, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        console.log(data);

        var show_json = {
            datatype: "local",
            data: data,
            colNames: ['全貌ID', '全貌名称'],
            colModel: [
                {name: 'FULL_PHOTO_ID', index: 'FULL_PHOTO_ID', width: 150, editable: false},
                {name: 'FULL_PHOTO_NAME', index: 'FULL_PHOTO_NAME', width: 120, editable: false},
            ],
        };
        var op_json = mergeJsonObject(show_json, jgird_table_settings);
        jQuery(table).jqGrid(op_json);
        $(table).jqGrid().trigger('reloadGrid');
    });
}

/*function mark_goods(id) {
    $(".full_view").css("display", "none");
    var x = document.getElementById(id);
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }
    // $("#site_changes_button").click(function(){
    //     $("#site_changes").toggle();
    // });
    //表内容修改
    // document.getElementById("site_changes_table").rows[0].cells[0].innerText = "现场变动ID"
    // document.getElementById("site_changes_table").rows[0].cells[1].innerText = "现场变动名称"

    $("#mark_goods_table").find("tr").remove();
    // $("#mark_goods_table").append("<tr><td>痕迹物品ID</td><td>物品名称</td></tr>")
    $("#mark_goods_table").append("<tr><td>痕迹物品ID</td><td>物品名称</td></tr>")
    // $("#mark_goods_table").append("<tr><td>痕迹物品ID</td><td>物品名称</td><td>物品类型ID</td><td>提取方法ID</td><td>勘验基础信息ID</td><td>提取时间</td><td>提取人</td><td>创建时间</td><td>创建人ID</td><td>数据状态</td><td>描述</td><td>修改时间</td></tr>")
    $.get("/get_mark_goods", {}, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#mark_goods_table").append("<tr><td>" + json.MARK_GOODS_ID + "</td><td>" + json.MARK_GOODS_NAME + "</td></tr>");
            // $("#mark_goods_table").append("<tr><td>"+json.MARK_GOODS_ID+"</td><td>"+json.MARK_GOODS_NAME+"</td><td>"+json.GOODS_TYPE_ID+"</td><td>"+json.EXTRACT_METHOD_ID+"</td><td>"+json.BASE_INFO_ID+"</td><td>"+json.EXTRACT_TIME+"</td><td>"+json.EXTRACT_PERSON+"</td><td>"+json.CREATE_TIME+"</td><td>"+json.CREATE_PERSION_ID+"</td><td>"+json.DATA_STATE+"</td><td>"+json.MARK_GOODS_DESCRIBE+"</td><td>"+json.UPDATE_TIME+"</td></tr>");
        });               //序列号
    })
}*/

function get_goods_type(id) {
    table = "#goods_type_table";
    $(".full_view").css("display", "none");
    var x = document.getElementById(id);
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }
    $.get("/get_goods_type", {}, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        console.log(data);

        var show_json = {
            datatype: "local",
            data: data,
            colNames: ['物品类型ID', '物品类型名称'],
            colModel: [
                {name: 'GOODS_TYPE_ID', index: 'GOODS_TYPE_ID', width: 150, editable: false},
                {name: 'GOODS_TYPE_NAME', index: 'GOODS_TYPE_NAME', width: 120, editable: false},
            ],
        };
        var op_json = mergeJsonObject(show_json, jgird_table_settings);
        jQuery(table).jqGrid(op_json);
        $(table).jqGrid().trigger('reloadGrid');
    });
}

function get_extract_method(id) {
    table = "#extract_method_table";
    $(".full_view").css("display", "none");
    var x = document.getElementById(id);
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }

    $.get("/get_extract_method", {}, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        console.log(data);

        var show_json = {
            datatype: "local",
            data: data,
            colNames: ['提取方法ID', '提取方法名称'],
            colModel: [
                {name: 'EXTRACT_METHOD_ID', index: 'EXTRACT_METHOD_ID', width: 150, editable: false},
                {name: 'EXTRACT_METHOD_NAME', index: 'EXTRACT_METHOD_NAME', width: 120, editable: false},
            ],
        };
        var op_json = mergeJsonObject(show_json, jgird_table_settings);
        jQuery(table).jqGrid(op_json);
        $(table).jqGrid().trigger('reloadGrid');
    });
}

function get_corpse_photo(id) {
    table = "#corpse_photo_table";
    $(".full_view").css("display", "none");
    var x = document.getElementById(id);
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }

    $.get("/get_corpse_photo", {}, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        console.log(data);

        var show_json = {
            datatype: "local",
            data: data,
            colNames: ['尸体照片ID', '尸体照片名称'],
            colModel: [
                {name: 'CORPSE_PHOTO_ID', index: 'CORPSE_PHOTO_ID', width: 150, editable: false},
                {name: 'CORPSE_PHOTO_NAME', index: 'CORPSE_PHOTO_NAME', width: 120, editable: false},
            ],
        };
        var op_json = mergeJsonObject(show_json, jgird_table_settings);
        jQuery(table).jqGrid(op_json);
        $(table).jqGrid().trigger('reloadGrid');
    });
}

function get_position_photo(id) {
    table = "#position_photo_table";
    $(".full_view").css("display", "none");
    var x = document.getElementById(id);
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }

    $.get("/get_position_photo", {}, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        console.log(data);

        var show_json = {
            datatype: "local",
            data: data,
            colNames: ['方位照片ID', '方位照片名称'],
            colModel: [
                {name: 'POSITION_PHOTO_ID', index: 'POSITION_PHOTO_ID', width: 150, editable: false},
                {name: 'POSITION_PHOTO_NAME', index: 'POSITION_PHOTO_NAME', width: 120, editable: false},
            ],
        };
        var op_json = mergeJsonObject(show_json, jgird_table_settings);
        jQuery(table).jqGrid(op_json);
        $(table).jqGrid().trigger('reloadGrid');
    });
}

function get_case_conclusion_info(id) {
    table = "#case_conclusion_info_table";
    $(".full_view").css("display", "none");
    var x = document.getElementById(id);
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }

    $.get("/get_case_conclusion_info", {}, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        console.log(data);

        var show_json = {
            datatype: "local",
            data: data,
            colNames: ['勘验基础信息ID', '创建人ID'],
            colModel: [
                {name: 'BASE_INFO_ID', index: 'BASE_INFO_ID', width: 150, editable: false},
                {name: 'CREATE_PERSON_ID', index: 'CREATE_PERSON_NAME_ID', width: 120, editable: false},
            ],
        };
        var op_json = mergeJsonObject(show_json, jgird_table_settings);
        jQuery(table).jqGrid(op_json);
        $(table).jqGrid().trigger('reloadGrid');
    });
}

function get_ele_info(id) {
    table = "#ele_info_table";
    $(".full_view").css("display", "none");
    var x = document.getElementById(id);
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }

    $.get("/get_ele_info", {}, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        console.log(data);

        var show_json = {
            datatype: "local",
            data: data,
            colNames: ['基础勘验信息ID', '电子设备名称'],
            colModel: [
                {name: 'BASE_INFO_ID', index: 'BASE_INFO_ID', width: 150, editable: false},
                {name: 'DEVICE_NAME', index: 'DEVICE_NAME', width: 120, editable: false},
            ],
        };
        var op_json = mergeJsonObject(show_json, jgird_table_settings);
        jQuery(table).jqGrid(op_json);
        $(table).jqGrid().trigger('reloadGrid');
    });
}

function get_corpse_info(id) {
    table = "#corpse_info_table";
    $(".full_view").css("display", "none");
    var x = document.getElementById(id);
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }
    // $("#corpse_info_table").find("tr").remove();

    $.get("/get_corpse_info", {"base_info_id": currentSceneId}, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        console.log("foreend" + data);

        jQuery(table).jqGrid({
            //direction: "rtl",
            datatype: "local",
            data: data,
            height: 250,
            colColor: 'white',
            colNames: ['尸体名称', '体位信息', '尸体ID'],
            colModel: [
                {name: 'CORPSE_INFO_NAME', index: 'CORPSE_INFO_NAME', width: 60, editable: false},//cellclassname: colorFondo},
                {name: 'CORPSE_FIND_PLACE', index: 'CORPSE_FIND_PLACE', width: 130, editable: false},
                {name: 'CORPSE_INFO_ID', index: 'CORPSE_INFO_ID', width: 80, editable: false}
            ],
            gridview: true,
            viewrecords: true,
            toppager: false,
            multiselect: true,
            multiboxonly: true,
            autowidth: false,
            fixed: true,
            onSelectRow: function (id) {
                var grid_selector = "#corpse_info_table";
                //var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
                var rowid = $(grid_selector).getGridParam("selrow");
                var rowData = $(grid_selector).getRowData(rowid);
                activeObject.element_type = 'corpse_info';
                activeObject.element_id = rowData.CORPSE_INFO_ID;
                alert(rowData.CORPSE_INFO_NAME + ":" + rowData.CORPSE_INFO_ID + ":" + activeObject.element_type);
                operation_type = "mark_elements";
            },
        });
        var gridData = $(table).jqGrid("getRowData");
        for (var i = gridData.length; i >= 0; i--) {
            $(table).jqGrid("delRowData", i);
        }
        let counter = 0;
        data.forEach(function (json) {
            var rowData = {
                CORPSE_INFO_NAME: json.CORPSE_INFO_NAME,
                CORPSE_FIND_PLACE: json.CORPSE_FIND_PLACE,
                CORPSE_INFO_ID: json.CORPSE_INFO_ID
            };
            // if (counter < 2) alert("put: " + counter + ":" + rowData.MARK_GOODS_NAME);
            $(table).jqGrid("addRowData", counter, rowData);
            counter++;
        });
        $(table).jqGrid().trigger('reloadGrid');
    });
}

function get_involved_goods_info(id) {
    table = "#involved_goods_info_table";
    $(".full_view").css("display", "none");
    var x = document.getElementById(id);
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }

    $.get("/get_involved_goods_info", {"base_info_id": currentCaseId}, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        console.log(data);

        jQuery(table).jqGrid({
            //direction: "rtl",
            datatype: "local",
            data: data,
            height: 250,
            colColor: 'white',
            colNames: ['物品名称', '创建时间', '物品ID'],
            colModel: [
                {name: 'INVOLVED_GOODS_NAME', index: 'INVOLVED_GOODS_NAME', width: 60, editable: false},//cellclassname: colorFondo},
                {
                    name: 'CREATE_TIME',
                    index: 'CREATE_TIME',
                    sortable: true,
                    sorttype: "string",
                    width: 130,
                    editable: false
                },
                {name: 'INVOLVED_GOODS_INFO_ID', index: 'INVOLVED_GOODS_INFO_ID', width: 80, editable: false}
            ],
            gridview: true,
            viewrecords: true,
            toppager: false,
            multiselect: true,
            //multikey: "ctrlKey",
            multiboxonly: true,
            autowidth: false,
            fixed: true,
            onSelectRow: function (id) {
                var grid_selector = "#involved_goods_info_table";
                //var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
                var rowid = $(grid_selector).getGridParam("selrow");
                var rowData = $(grid_selector).getRowData(rowid);
                activeObject.element_type = 'involved_goods_info';
                activeObject.element_id = rowData.INVOLVED_GOODS_INFO_ID;
                alert(rowData.INVOLVED_GOODS_NAME + ":" + rowData.INVOLVED_GOODS_INFO_ID + ":" + activeObject.element_type);
                operation_type = "mark_elements";
                //document.getElementById('e-correlation').value = '选中案件编号为 ' + cid + ' 的事件';
                //document.getElementById('ematerial_show_all').value = '此处显示案件编号为 ' + cid + ' 的案件素材';
            },
        });
        var gridData = $(table).jqGrid("getRowData");
        for (var i = gridData.length; i >= 0; i--) {
            $(table).jqGrid("delRowData", i);
        }
        let counter = 0;
        data.forEach(function (json) {
            var rowData = {
                INVOLVED_GOODS_NAME: json.INVOLVED_GOODS_NAME,
                CREATE_TIME: json.CREATE_TIME,
                INVOLVED_GOODS_INFO_ID: json.INVOLVED_GOODS_INFO_ID
            };
            // if (counter < 2) alert("put: " + counter + ":" + rowData.MARK_GOODS_NAME);
            $(table).jqGrid("addRowData", counter, rowData);
            counter++;
        });
        $(table).jqGrid().trigger('reloadGrid');
    });
}

function get_involved_person_info(id) {
    table = "#involved_goods_person_table";
    $(".full_view").css("display", "none");
    var x = document.getElementById(id);
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }

    console.log("Current scene: " + currentSceneId + " current case: " + currentCaseId);
    $.get("/get_involved_person_info", {"base_info_id": currentCaseId}, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        console.log(data);

        jQuery(table).jqGrid({
            //direction: "rtl",
            datatype: "local",
            data: data,
            height: 250,
            colColor: 'white',
            colNames: ['人员名称', '创建时间', '人员ID'],
            colModel: [
                {name: 'INVOLVED_PERSON_NAME', index: 'INVOLVED_PERSON_NAME', width: 60, editable: false},//cellclassname: colorFondo},
                {
                    name: 'CREATE_TIME',
                    index: 'CREATE_TIME',
                    sortable: true,
                    sorttype: "string",
                    width: 130,
                    editable: false
                },
                {name: 'INVOLVED_PERSON_INFO_ID', index: 'INVOLVED_PERSON_INFO_ID', width: 80, editable: false}
            ],
            gridview: true,
            viewrecords: true,
            toppager: false,
            multiselect: true,
            //multikey: "ctrlKey",
            multiboxonly: true,
            autowidth: false,
            fixed: true,
            onSelectRow: function (id) {
                var grid_selector = "#involved_goods_person_table";
                //var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
                var rowid = $(grid_selector).getGridParam("selrow");
                var rowData = $(grid_selector).getRowData(rowid);
                activeObject.element_type = 'involved_person_info';
                activeObject.element_id = rowData.INVOLVED_PERSON_INFO_ID;
                alert(rowData.INVOLVED_PERSON_NAME + ":" + rowData.INVOLVED_PERSON_INFO_ID + ":" + activeObject.element_type);
                operation_type = "mark_elements";
            },
        });
        var gridData = $(table).jqGrid("getRowData");
        for (var i = gridData.length; i >= 0; i--) {
            $(table).jqGrid("delRowData", i);
        }
        let counter = 0;
        data.forEach(function (json) {
            var rowData = {
                INVOLVED_PERSON_NAME: json.INVOLVED_PERSON_NAME,
                CREATE_TIME: json.CREATE_TIME,
                INVOLVED_PERSON_INFO_ID: json.INVOLVED_PERSON_INFO_ID
            };
            // if (counter < 2) alert("put: " + counter + ":" + rowData.MARK_GOODS_NAME);
            $(table).jqGrid("addRowData", counter, rowData);
            counter++;
        });
        $(table).jqGrid().trigger('reloadGrid');
    });
}

// function get_thing_menu(thing_type) {
//     console.log("要素大类为：" + thing_type);//
//     $("#things").find("option").remove();
//     $("#things").append("<option value='volvo' hidden>物品子类</option>");
//     $.get("/get_things", {
//         "thing_type": $("#thing_type").val(),
//         "scene_id": $("#scene_id").val()   //########
//     }, function (data) {
//         if (data.msg != undefined) {
//             alert(data.msg);
//             return;
//         }
//         data.forEach(function (json) {
//             $("#things").append('<option value=' + json.ID + ' >' + $("#thing_type").find("option:selected").text() + json.ID + '</option>');//获取通用名
//         });//序列号
//     })
// }


function get_thing_menu(top_name) {
    console.log("物品大类名为：" + top_name);
    $("#things").find("option").remove();
    $("#things").append("<option value='volvo' hidden>物品子类</option>");
    $("#specific_thing").find("option").remove();
    $("#specific_thing").append("<option value='volvo' hidden>选择物品</option>");
    $.get("/get_things", {"value": top_name}, function (data) {
        sub_menu = data;
        sub_menu.forEach(function (sub_name) {
            $("#things").append('<option value=' + sub_name + ' >' + sub_name + '</option>');
        });
    })
}

function show_specific_thing() {
    window.open(
        "./table_tea1_50.html",
        "table_tea1-50",
        "height=400, width=410, top=340, left=200,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function get_kinetic(model_category) {
    console.log("will address " + model_category);
    let options = document.getElementById("sub_kinetic_menu").options;
    for (var i = options.length - 1; i >= 1; i--) options.remove(i);
    $.get("/get_kinetic_set", {"value": model_category}, function (data) {
        console.log(data);
        sub_menu = data;
        sub_menu.forEach(function (it) {
            $("#sub_kinetic_menu").append('<option value=' + it.KSETID + ' >' + it.KSETNAME + '(' + it.KSETID + ")" + '</option>');
        })
    })
}

function get_kinetic_set(kinetic_name) {

}

function get_kinetic_element(kinetic_elment) {

}

function get_sub_icon_menu(top_name) {
    console.log("图标大类名为：" + top_name);
    $("#sub_icon_menu").find("option").remove();
    $("#sub_icon_menu").append("<option value='volvo' hidden>选择图标子类</option>");
    $("#icon_menu").find("option").remove();
    $("#icon_menu").append("<option value='volvo' hidden>选择图标</option>");
    $.get("/get_sub_icon_menu", {"value": top_name}, function (data) {
        sub_menu = data;
        sub_menu.forEach(function (sub_name) {
            $("#sub_icon_menu").append('<option value=' + sub_name + ' >' + sub_name + '</option>');
        });
    })
}

function get_icon_menu(sub_name) {
    $("#icon_menu").find("option").remove();
    $("#icon_menu").append("<option value='volvo' hidden>选择图标</option>");
    var top_name = document.getElementById("top_icon_menu").value;
    $.get("/get_icon_menu", {"top_name": top_name, "sub_name": sub_name}, function (data) {
        icon_menu = data;
        icon_menu.forEach(function (icon_name) {
            $("#icon_menu").append('<option value=' + icon_name + ' >' + icon_name + '</option>');
        });
    })
}

function get_icon_image(icon_name) {
    var top_name = document.getElementById("top_icon_menu").value;
    var sub_name = document.getElementById("sub_icon_menu").value;
    console.log(top_name);
    element_image = "cesium/icons/" + top_name + "/" + sub_name + "/" + icon_name;
}

function get_sub_model_menu(top_name) {
    console.log("图标大类名为：" + top_name);
    $("#sub_model_menu").find("option").remove();
    $("#sub_model_menu").append("<option value='volvo' hidden>选择模型子类</option>");
    $("#model_menu").find("option").remove();
    $("#model_menu").append("<option value='volvo' hidden>选择模型</option>");
    $.get("/get_things", {"value": top_name}, function (data) {
        sub_menu = data;
        sub_menu.forEach(function (sub_name) {
            $("#sub_model_menu").append('<option value=' + sub_name + ' >' + sub_name + '</option>');
        });
    })
}

function get_model_menu(sub_name) {
    $("#model_menu").find("option").remove();
    $("#model_menu").append("<option value='volvo' hidden>选择模型</option>");
    var top_name = document.getElementById("top_model_menu").value;
    $.get("/sub_thing_menu", {"top_name": top_name, "sub_name": sub_name}, function (data) {
        icon_menu = data;
        icon_menu.forEach(function (icon_name) {
            $("#model_menu").append('<option value=' + icon_name + ' >' + icon_name + '</option>');
        });
    })
}

function get_model(icon_name) {
    var top_name = document.getElementById("top_model_menu").value;
    var sub_name = document.getElementById("sub_model_menu").value;
    thing_gltf = "cesium/Models/model/" + top_name + "/" + sub_name + "/" + icon_name + "/model.gltf";
    operation_type = undefined;
    console.log(thing_gltf)
}

function change_icon_col() {
    alert("will change" + json[$("#element_type").val()] + "&id=" + $("#elements").val());

    /*var longitude = relevant_info[i].start_lon;
    var latitude = relevant_info[i].start_lat;
    var height = relevant_info[i].start_height
    var icon_path = relevant_info[i].icon_path;
    var id = relevant_info[i].id;
    var element_type = relevant_info[i].element_type;
    var element_id = relevant_info[i].element_id;
    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
        billboard: {
            image: icon_path,
            // heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
            // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            scale: 0.2,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            disableDepthTestDistance: Number.POSITIVE_INFINITY
        },
        properties: {
            type: "added",
            element_id: element_id,
            element_type, element_type
        }
    });*/
}

function updateScene() {
    emptyRipple();
    $.ajax({
        async: false, cache: false, global: false,
        type: 'GET',
        url: '/select_scene',
        dataType: "json",
        data: {"value": currentSceneId},
        complete: function (msg) {
            console.log('complete');
        },
        success: function (result) {
            console.log("Output:" + result.toString());
            console.log("Output:" + result.relevant_info);
            var relevant_info = result.relevant_info;
            for (var i = 0; i < relevant_info.length; i++) {
                var longitude = relevant_info[i].start_lon;
                var latitude = relevant_info[i].start_lat;
                var height = relevant_info[i].start_height
                var icon_path = relevant_info[i].icon_path;
                var id = relevant_info[i].id;
                var current_type = relevant_info[i].element_type;
                var element_id = relevant_info[i].element_id;
                viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
                    billboard: {
                        image: icon_path,
                        // heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
                        // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                        scale: 0.2,
                        verticalOrigin: Cesium.VerticalOrigin.MIDDLE,
                        horizontalOrigin: Cesium.HorizontalOrigin.MIDDLE,
                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                    },
                    properties: {
                        type: "added",
                        element_id: element_id,
                        element_type: current_type
                    }
                });
                console.log(element_id + "<->" + current_type + "<->" + id);
            }

            console.log("to be or not to be: " + result.location.length);
            if (result.location.length > 0 && result.location[0].start_lon != undefined && result.location[0].start_lat != undefined
                && result.location[0].start_height != undefined && result.location[0].end_lon != undefined
                && result.location[0].end_lat != undefined && result.location[0].end_height != undefined
                && result.location[0].angle_lon != undefined && result.location[0].angle_lat != undefined
                && result.location[0].angle_height != undefined && result.location[0].scene_path != undefined) {
                //set_view(result.location[0].start_lon, result.location[0].start_lat);
                scenePosition.scale = result.location[0].scale;
                scenePosition.offsetX = result.location[0].start_lon;
                scenePosition.offsetY = result.location[0].start_lat;
                scenePosition.offsetZ = result.location[0].start_height;
                scenePosition.absoluteX = result.location[0].end_lon;
                scenePosition.absoluteY = result.location[0].end_lat;
                scenePosition.absoluteZ = result.location[0].end_height;
                scenePosition.rotateX = result.location[0].angle_lon;
                scenePosition.rotateY = result.location[0].angle_lat;
                scenePosition.rotateZ = result.location[0].angle_height;
                scenePosition.tilepath = result.location[0].scene_path;
                console.log(scenePosition.offsetX + "," + scenePosition.offsetY + "," + scenePosition.offsetZ + ","
                    + scenePosition.absoluteX + "," + scenePosition.absoluteY + "," + scenePosition.absoluteZ + ","
                    + scenePosition.tilepath
                    + "," + scenePosition.rotateX + "," + scenePosition.rotateY + "," + scenePosition.rotateZ);
                show_tileset();
            }
        }
    });
}

function select_scene(selectedIndex) {
    emptyRipple();
    var primitives = viewer.scene.primitives;
    for (var i = 0; i < primitives.length; i++) {
        if (primitives._primitives[i] != undefined) {
            if (primitives._primitives[i].scale != null) viewer.scene.primitives.remove(primitives._primitives[i]);
        }
    }
    //viewer.scene.primitives.removeAll();
    document.getElementById("SceneConfigureButton").disabled = false;
    document.getElementById("operations").style.display = "";
    console.log("选择场景: " + selectedIndex);
    if (sceneIdMap.get(selectedIndex) == null) {
        alert("请先选择场景");
        return;
    }
    currentSceneId = sceneIdMap.get(selectedIndex).base_info_id;
    console.log("选择场景号：" + currentSceneId);
    $.ajax({
        async: false, cache: false, global: false,
        type: 'GET',
        url: "/scene_exists",
        data: {"value": currentSceneId},
        complete: function (msg) {
            console.log('complete');
        },
        success: function (data) {
            console.log("created configuration");
            return;
        }
    });
    updateScene();
    //加载物品标注
    $.ajax({
        async: false, cache: false, global: false,
        type: 'GET',
        url: "/select_thing_scene",
        dataType: "json",
        data: {"value": currentSceneId},
        complete: function (msg) {
            console.log('complete');
        },
        success: function (data) {
            console.log("选择场景号：" + currentSceneId);//选择场景
            console.log(data);//
            var relevant_info = data.relevant_info;
            for (var i = 0; i < relevant_info.length; i++) {
                var scale = relevant_info[i].scale;
                var longitude = relevant_info[i].start_lon;
                var latitude = relevant_info[i].start_lat;
                var height = relevant_info[i].start_height;
                var end_lon = relevant_info[i].end_lon;
                var end_lat = relevant_info[i].end_lat;
                var end_height = relevant_info[i].end_height;
                var angle_lon = relevant_info[i].angle_lon;
                var angle_lat = relevant_info[i].angle_lat;
                var angle_height = relevant_info[i].angle_height;
                var gltf_path = relevant_info[i].gltf_path;
                var id = relevant_info[i].id;
                var thing_type = relevant_info[i].thing_type;
                var thing_id = relevant_info[i].thing_id;
                var heading = relevant_info[i].heading;
                var pitch = relevant_info[i].pitch;
                var roll = relevant_info[i].roll;
                var thing_mark_id = relevant_info[i].thing_mark_id;

                var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
                    Cesium.Cartesian3.fromDegrees(longitude, latitude, height)
                );

                var m = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(longitude, latitude, height));
                const m1 = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(angle_lon));
                Cesium.Matrix4.multiplyByMatrix3(m, m1, m);
                const m2 = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(angle_lat));
                Cesium.Matrix4.multiplyByMatrix3(m, m2, m);
                const m3 = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(angle_height));
                Cesium.Matrix4.multiplyByMatrix3(m, m3, m);

                const mat3 = Cesium.Matrix4.getRotation(m, new Cesium.Matrix3());

                var entity4 = viewer.scene.primitives.add(Cesium.Model.fromGltf({    //fromGltf方法：从Gltf资源加载模型
                        url: gltf_path,
                        id: id,
                        modelMatrix: m,
                        // minimumPixelSize : 512,
                        scale: scale
                        // maximumScale : 200000
                    })
                );

                originModelMadrix = entity4.modelMatrix.clone();
                originParam = {
                    "scale": scale,
                    "lng": longitude,
                    "lat": latitude,
                    "height": height,
                    "rx": angle_lon,
                    "ry": angle_lat,
                    "rz": angle_height
                };

                objectMap.set(id, {
                    "scale": scale,
                    "lng": longitude,
                    "lat": latitude,
                    "height": height,
                    "rx": angle_lon,
                    "ry": angle_lat,
                    "rz": angle_height
                });
            }
            if (data.location.length > 0 && data.location[0].start_lon != null && data.location[0].start_lat != undefined) {
                if (data.location[0].start_height < 100)
                    set_view(data.location[0].start_lon, data.location[0].start_lat, 800);
                else
                    set_view(data.location[0].start_lon, data.location[0].start_lat, data.location[0].start_height);
            }
        }
    });
}

function set_view(lon, lat, height) {
    // alert(lon + ", " + lat + ", " + height);
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
        orientation: {
            heading: 0.0,
            pitch: Cesium.Math.toRadians(-90.0),
            roll: 0.0
        }
    });
}

function functions(id) {
    var x = document.getElementById(id);
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }
}

function mixmodel() {
    clearFire();
    clearCollision();
    clearExplosion();
    viewer.camera.setView({
        destination: {
            x: -2259635.974850741,
            y: 5023449.2015779745,
            z: 3204845.1002706015
        },
        orientation: {
            heading: 2.8424653218313556,
            pitch: -0.8928382126577965,
            roll: 0
        }
    });
    pz_start();
}

function routeshow() {
    // viewer.entities.removeAll();
    // positions=[];
    show_tileset();
    alert("开始规划路线，左键点击经过点，右键结束");
    operation_type = "drawRoute";
    // viewer.zoomTo(tileset);
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(114.21952507076327, 30.358135859723472, 800),
        orientation: {
            heading: 0.0,
            pitch: Cesium.Math.toRadians(-90.0),
            roll: 0.0
        }
    });
}

function explosiveshow() {
    startBZ1();
    viewer.camera.setView({
        destination: {x: -2259556.172741972, y: 5023532.150760894, z: 3204801.7784513133},
        orientation: {
            heading: 6.144391448663251,
            pitch: -0.6870827796178554,
            roll: 0.0
        }
    });
}

function waveshow() {
    startBZ2();
    viewer.camera.setView({
        //destination: {x: -2259482.2093426995, y: 5023565.238597119, z: 3204802.0603294484},
        destination: {x: -2259782.2093426995, y: 5023765.238597119, z: 3204802.0603294484},
        orientation: {
            heading: 6.144391448663251,
            pitch: -0.6870827796178554,
            roll: 0.0
        }
    });
}

function mark_site_changes(id) {
    var x = document.getElementById(id);
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }
}

function get_operation_type() {
    console.log(operation_type);
    operation_type = "mark_things";
}

function mark_goods(id) {
    $(".full_view").css("display", "none");
    var x = document.getElementById(id);
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }
    // $("#site_changes_button").click(function(){
    //     $("#site_changes").toggle();
    // });
    //表内容修改
    // document.getElementById("site_changes_table").rows[0].cells[0].innerText = "现场变动ID"
    // document.getElementById("site_changes_table").rows[0].cells[1].innerText = "现场变动名称"

    $("#mark_goods_table").find("tr").remove();
    //$("#mark_goods_table").append("<tr><td>痕迹物品ID</td><td>痕迹描述</td></tr>")
    // $("#mark_goods_table").append("<tr><td>痕迹物品ID</td><td>物品名称</td><td>物品类型ID</td><td>提取方法ID</td><td>基础勘验信息ID</td><td>提取时间</td><td>提取人</td><td>创建时间</td><td>创建人ID</td><td>数据状态</td><td>描述</td><td>修改时间</td></tr>")
    /*$.get("/get_mark_goods", {}, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#mark_goods_table").append("<tr><td>" + json.MARK_GOODS_ID + "</td><td>" + json.MARK_GOODS_DESCRIBE + "</td></tr>");
        });               //序列号
    })*/
}

$(document).ready(function () {
    $("#upload_kinetic").click(function () {
        $("#fileMutiply").click()
    })
    $("#upload_kinetic_element").click(function () {
        $("#upload_files").click()
    })
    $("#create_kinetic").click(function () {
        window.open(visualpage_addr + "createKineticModel.html?MODEL_CATEGORY=燃烧模型", "show_element_info",
            "height=500, width=1000, top=200, left=450, toolbar=no, menubar=no, directories=no, scrollbars=no, resizable=no, location=no, status=no");
        //$("#files").click()
    })
    $(".second_button").click(function () {
        $(this).css("display", "block")
        $(this).siblings(".full_view").css("display", "none")
    })
    $(".first_button").click(function () {
        $(".full_view").css("display", "none")
    })
})

