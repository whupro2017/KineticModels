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
    "scene_file_evidence": "file",
    "scene_footprint": "foot",
    "scene_handprint": "hand",
    "scene_toolmark": "tool"
}
var redirect_title = {
    "mark_goods": "markGoods",
    "involved_goods_info": "involvedGoodsInfo",
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
    window.open(visualpage_addr + redirect_pages[activeObject.element_type] + ".html?" +
        redirect_title[activeObject.element_type] + "Id=" + activeObject.element_id,
        "show_element_info",
        "height=700, width=1000, top=200, left=450, toolbar=no, menubar=no, directories=no, scrollbars=no, resizable=no, location=no, status=no");
}

function locate_model(path) {
    alert("点击鼠标左键选定模型位置，右键单击退出模型定位模式");
    operation_type = "locate_model";
}

function get_scenes(idx) {
    console.log("idx: " + idx);
    console.log("案件id为：" + casesIdMap.get(idx).cases_id + " Name: " + casesIdMap.get(idx).cases_name);
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

function get_involved_goods_info(id) {
    table = "#involved_goods_info_table";
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

    $("#involved_goods_info_table").find("tr").remove();

    $.get("/get_involved_goods_info", {"base_info_id": currentSceneId}, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        console.log(data);

        jQuery(table).jqGrid({
            //direction: "rtl",
            datatype: "local",
            data: data,
            height: 240,
            colColor: 'white',
            colNames: ['物品名称', '创建时间', '物品ID'],
            colModel: [
                {name: 'INVOLVED_GOODS_NAME', index: 'INVOLVED_GOODS_NAME', width: 60, editable: false},//cellclassname: colorFondo},
                {
                    name: 'CREATE_TIME',
                    index: 'CREATE_TIME',
                    sortable: true,
                    sorttype: "string",
                    width: 120,
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
        $(table).jqGrid().trigger('reloadGrid');
    });
}

function get_involved_person_info(id) {
    $(".full_view").css("display", "none");
    var x = document.getElementById(id);
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }

    $("#involved_person_info_table").find("tr").remove();
    $("#involved_person_info_table").append("<tr><td>涉案人员信息ID</td><td>涉案人名字</td></tr>")
    $.get("/get_involved_person_info", {}, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#involved_person_info_table").append("<tr><td>" + json.INVOLVED_PERSON_INFO_ID + "</td><td>" + json.INVOLVED_PERSON_NAME + "</td></tr>");
        });               //序列号
    })
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

function select_scene(selectedIndex) {
    viewer.entities.removeAll();
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
    currentSceneId = sceneIdMap.get(selectedIndex).base_info_id;
    console.log("选择场景号：" + currentSceneId);
    $.get("/scene_exists", {"value": currentSceneId}, function (data) {
        console.log("created configuration");
        return;
    })
    $.ajax({
        url: '/select_scene',
        data: {"value": currentSceneId},
        async: false,
        complete: function (msg) {
            console.log('complete');
        },
        success: function (result) {
            console.log("Output:" + result);
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
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
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
    /*$.get("/select_scene", {"value": currentSceneId}, function (data) {
        console.log("Output:" + data);
        var relevant_info = data.relevant_info;
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
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
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
        console.log("to be or not to be: " + data.location.length);
        if (data.location.length > 0 && data.location[0].start_lon != undefined && data.location[0].start_lat != undefined
            && data.location[0].start_height != undefined && data.location[0].end_lon != undefined
            && data.location[0].end_lat != undefined && data.location[0].end_height != undefined
            && data.location[0].angle_lon != undefined && data.location[0].angle_lat != undefined
            && data.location[0].angle_height != undefined && data.location[0].scene_path != undefined) {
            //set_view(data.location[0].start_lon, data.location[0].start_lat);
            scenePosition.scale = data.location[0].scale;
            scenePosition.offsetX = data.location[0].start_lon;
            scenePosition.offsetY = data.location[0].start_lat;
            scenePosition.offsetZ = data.location[0].start_height;
            scenePosition.absoluteX = data.location[0].end_lon;
            scenePosition.absoluteY = data.location[0].end_lat;
            scenePosition.absoluteZ = data.location[0].end_height;
            scenePosition.rotateX = data.location[0].angle_lon;
            scenePosition.rotateY = data.location[0].angle_lat;
            scenePosition.rotateZ = data.location[0].angle_height;
            scenePosition.tilepath = data.location[0].scene_path;
            console.log(scenePosition.offsetX + "," + scenePosition.offsetY + "," + scenePosition.offsetZ + ","
                + scenePosition.absoluteX + "," + scenePosition.absoluteY + "," + scenePosition.absoluteZ + ","
                + scenePosition.tilepath
                + "," + scenePosition.rotateX + "," + scenePosition.rotateY + "," + scenePosition.rotateZ);
            show_tileset();
        }
    }, "json");*/
    //加载物品标注
    $.get("/select_thing_scene", {"value": currentSceneId}, function (data) {
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
            set_view(data.location[0].start_lon, data.location[0].start_lat);
        }
    })
}

function set_view(lon, lat) {
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(lon, lat, 800),
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
        destination: {x: -2259482.2093426995, y: 5023565.238597119, z: 3204802.0603294484},
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

