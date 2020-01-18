window.oncontextmenu = function (e) {
    e.preventDefault();
}
window.onclick = function (e) {
    document.querySelector('#menu').style.width = 0;
}

var json = {
    "scene_bio_evidence": "bio",
    "scene_elec_evidence": "elec",
    "scene_file_evidence": "file",
    "scene_footprint": "foot",
    "scene_handprint": "hand",
    "scene_tool": "tool"
}

function show_model_info() {
    var json = {
        "scene_bio_evidence": "bio",
        "scene_elec_evidence": "elec",
        "scene_file_evidence": "file",
        "scene_footprint": "foot",
        "scene_handprint": "hand",
        "scene_toolmark": "tool"
    }
    window
        .open(
            "http://127.0.0.1:3000/web/index?type=" + json[$("#element_type").val()] + "&id=" + $("#elements").val(),
            "show_element_info",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function locate_model(path) {
    alert("点击鼠标左键选定模型位置，右键单击退出模型定位模式");
    operation_type = "locate_model";
}

function get_scenes(case_id) {
    console.log("案件id为：" + case_id);
    $.get("/get_scenes", {"value": case_id}, function (data) {
        scenes = data;
        $("#scene_id").find("option").remove();
        $("#scene_id").append("<option value='volvo' hidden>ID</option>");
        scenes.forEach(function (json) {
            $("#scene_id").append('<option value=' + json.scene_id + ' >' + json.scene_id + '</option>');
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

function get_inquest_base_info(id) {
    $(".full_view").css("display","none");
    var x = document.getElementById(id);
    if(x.style.display == "block"){
        x.style.cssText = "display:none"
    }else {
        x.style.cssText = "display:block"
    }
    $("#inquest_base_info_table").find("tr").remove();
    $("#inquest_base_info_table").append("<tr><td>勘验基础信息ID</td><td>现场勘验号</td><td>案事件编号</td></tr>")
    // $("#inquest_base_info_table").append("<tr><td>勘验基础信息ID</td><td>现场勘验号</td><td>案事件编号</td><td>发案地点</td><td>勘验开始时间</td><td>勘验结束时间</td><td>现场勘验人员</td><td>现场指挥人员ID</td><td>保护措施ID</td><td>现场变动情况ID</td><td>创建时间</td><td>创建人ID</td><td>经度</td><td>纬度</td><td>天气情况ID</td></tr>")
    $.get("/get_inquest_base_info", {
    }, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#inquest_base_info_table").append("<tr><td>"+json.BASE_INFO_ID+"</td><td>"+json.FIELD_SURVEY_NUMBER+"</td><td>"+json.CASE_EVENT_CODE+"</td></tr>");
            // $("#inquest_base_info_table").append("<tr><td>"+json.BASE_INFO_ID+"</td><td>"+json.FIELD_SURVEY_NUMBER+"</td><td>"+json.CASE_EVENT_CODE+"</td><td>"+json.HAPPENING_PLACE+"</td><td>"+json.INQUEST_START_TIME+"</td><td>"+json.INQUEST_END_TIME+"</td><td>"+json.FIELD_SURVEY_PERSON+"</td><td>"+json.FIELD_COMMANDER_ID+"</td><td>"+json.PROTECTIVE_MEASURES+"</td><td>"+json.SITE_CHANGES_ID+"</td><td>"+json.CREATE_TIME+"</td><td>"+json.CREATE_PERSION_ID+"</td><td>"+json.LONGITUDE+"</td><td>"+json.LATITUDE+"</td><td>"+json.WEATHER_CONDITION+"</td></tr>");
        });               //序列号
    })
}
function get_field_commander(id) {
    $(".full_view").css("display","none");
    var x = document.getElementById(id);
    if(x.style.display == "block"){
        x.style.cssText = "display:none"
    }else {
        x.style.cssText = "display:block"
    }
    $("#field_commander_table").find("tr").remove();
    $("#field_commander_table").append("<tr><td>现场指挥人员ID</td><td>现场指挥人员姓名</td></tr>")
    $.get("/get_field_commander", {
    }, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#field_commander_table").append("<tr><td>"+json.FIELD_COMMANDER_ID+"</td><td>"+json.FIELD_COMMANDER_NAME+"</td></tr>");
        });               //序列号
    })
}
function get_protect_measure(id) {
    $(".full_view").css("display","none");
    var x = document.getElementById(id);
    if(x.style.display == "block"){
        x.style.cssText = "display:none"
    }else {
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
    $.get("/get_protect_measure", {
    }, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#protect_measure_table").append("<tr><td>"+json.SITE_CHANGES_ID+"</td><td>"+json.SITE_CHANGES_NAME+"</td></tr>");
        });               //序列号
    })
}
function get_site_changes(id) {
    $(".full_view").css("display","none");
    var x = document.getElementById(id);
    if(x.style.display == "block"){
        x.style.cssText = "display:none"
    }else {
        x.style.cssText = "display:block"
    }
    // $("#site_changes_button").click(function(){
    //     $("#site_changes").toggle();
    // });
    //表内容修改
    // document.getElementById("site_changes_table").rows[0].cells[0].innerText = "现场变动ID"
    // document.getElementById("site_changes_table").rows[0].cells[1].innerText = "现场变动名称"

    $("#site_changes_table").find("tr").remove();
    $("#site_changes_table").append("<tr><td>现场变动情况ID</td><td>现场变动情况名称</td></tr>")
    $.get("/get_site_changes", {
    }, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#site_changes_table").append("<tr><td>"+json.SITE_CHANGES_ID+"</td><td>"+json.SITE_CHANGES_NAME+"</td></tr>");
        });               //序列号
    })
}
function get_mark_goods_unit(id) {
    $(".full_view").css("display","none");
    var x = document.getElementById(id);
    if(x.style.display == "block"){
        x.style.cssText = "display:none"
    }else {
        x.style.cssText = "display:block"
    }
    // $("#site_changes_button").click(function(){
    //     $("#site_changes").toggle();
    // });
    //表内容修改
    // document.getElementById("site_changes_table").rows[0].cells[0].innerText = "现场变动ID"
    // document.getElementById("site_changes_table").rows[0].cells[1].innerText = "现场变动名称"

    $("#mark_goods_unit_table").find("tr").remove();
    $("#mark_goods_unit_table").append("<tr><td>单位ID</td><td>单位名称</td></tr>")
    $.get("/get_mark_goods_unit", {
    }, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#mark_goods_unit_table").append("<tr><td>"+json.MARK_GOODS_UNIT_ID+"</td><td>"+json.MARK_GOODS_UNIT_NAME+"</td></tr>");
        });               //序列号
    })
}
function get_weather(id) {
    $(".full_view").css("display","none");
    var x = document.getElementById(id);
    if(x.style.display == "block"){
        x.style.cssText = "display:none"
    }else {
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
    $.get("/get_weather", {
    }, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#weather_table").append("<tr><td>"+json.SITE_CHANGES_ID+"</td><td>"+json.SITE_CHANGES_NAME+"</td></tr>");
        });               //序列号
    })
}
function get_full_photo(id) {
    $(".full_view").css("display","none");
    var x = document.getElementById(id);
    if(x.style.display == "block"){
        x.style.cssText = "display:none"
    }else {
        x.style.cssText = "display:block"
    }
    // $("#site_changes_button").click(function(){
    //     $("#site_changes").toggle();
    // });
    //表内容修改
    // document.getElementById("site_changes_table").rows[0].cells[0].innerText = "现场变动ID"
    // document.getElementById("site_changes_table").rows[0].cells[1].innerText = "现场变动名称"

    $("#full_photo_table").find("tr").remove();
    $("#full_photo_table").append("<tr><td>全貌图片ID</td><td>全貌图片名称</td></tr>")
    // $("#full_photo_table").append("<tr><td>全貌图片ID</td><td>全貌图片名称</td><td>全貌图片内容</td><td>痕迹物品ID</td><td>创建时间</td></tr>")
    $.get("/get_full_photo", {
    }, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#full_photo_table").append("<tr><td>"+json.FULL_PHOTO_ID+"</td><td>"+json.FULL_PHOTO_NAME+"</td></tr>");
        });               //序列号
    })
}
function get_mark_goods(id) {
    $(".full_view").css("display","none");
    var x = document.getElementById(id);
    if(x.style.display == "block"){
        x.style.cssText = "display:none"
    }else {
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
    $.get("/get_mark_goods", {
    }, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#mark_goods_table").append("<tr><td>"+json.MARK_GOODS_ID+"</td><td>"+json.MARK_GOODS_NAME+"</td></tr>");
            // $("#mark_goods_table").append("<tr><td>"+json.MARK_GOODS_ID+"</td><td>"+json.MARK_GOODS_NAME+"</td><td>"+json.GOODS_TYPE_ID+"</td><td>"+json.EXTRACT_METHOD_ID+"</td><td>"+json.BASE_INFO_ID+"</td><td>"+json.EXTRACT_TIME+"</td><td>"+json.EXTRACT_PERSON+"</td><td>"+json.CREATE_TIME+"</td><td>"+json.CREATE_PERSION_ID+"</td><td>"+json.DATA_STATE+"</td><td>"+json.MARK_GOODS_DESCRIBE+"</td><td>"+json.UPDATE_TIME+"</td></tr>");
        });               //序列号
    })
}
function get_goods_type(id) {
    $(".full_view").css("display","none");
    var x = document.getElementById(id);
    if(x.style.display == "block"){
        x.style.cssText = "display:none"
    }else {
        x.style.cssText = "display:block"
    }
    // $("#site_changes_button").click(function(){
    //     $("#site_changes").toggle();
    // });
    //表内容修改
    // document.getElementById("site_changes_table").rows[0].cells[0].innerText = "现场变动ID"
    // document.getElementById("site_changes_table").rows[0].cells[1].innerText = "现场变动名称"

    $("#goods_type_table").find("tr").remove();
    $("#goods_type_table").append("<tr><td>物品类型ID</td><td>物品类型名称</td></tr>")
    $.get("/get_goods_type", {
    }, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#goods_type_table").append("<tr><td>"+json.GOODS_TYPE_ID+"</td><td>"+json.GOODS_TYPE_NAME+"</td></tr>");
        });               //序列号
    })
}
function get_extract_method(id) {
    $(".full_view").css("display","none");
    var x = document.getElementById(id);
    if(x.style.display == "block"){
        x.style.cssText = "display:none"
    }else {
        x.style.cssText = "display:block"
    }
    // $("#site_changes_button").click(function(){
    //     $("#site_changes").toggle();
    // });
    //表内容修改
    // document.getElementById("site_changes_table").rows[0].cells[0].innerText = "现场变动ID"
    // document.getElementById("site_changes_table").rows[0].cells[1].innerText = "现场变动名称"

    $("#extract_method_table").find("tr").remove();
    $("#extract_method_table").append("<tr><td>提取方法ID</td><td>提取方法名称</td></tr>")
    $.get("/get_extract_method", {
    }, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#extract_method_table").append("<tr><td>"+json.EXTRACT_METHOD_ID+"</td><td>"+json.EXTRACT_METHOD_NAME+"</td></tr>");
        });               //序列号
    })
}
function get_corpse_info(id) {
    $(".full_view").css("display","none");
    var x = document.getElementById(id);
    if(x.style.display == "block"){
        x.style.cssText = "display:none"
    }else {
        x.style.cssText = "display:block"
    }
    // $("#site_changes_button").click(function(){
    //     $("#site_changes").toggle();
    // });
    //表内容修改
    // document.getElementById("site_changes_table").rows[0].cells[0].innerText = "现场变动ID"
    // document.getElementById("site_changes_table").rows[0].cells[1].innerText = "现场变动名称"

    $("#corpse_info_table").find("tr").remove();
    $("#corpse_info_table").append("<tr><td>尸体ID</td><<td>尸体名称</td></tr>")
    // $("#corpse_info_table").append("<tr><td>尸体ID</td><td>勘验基础信息ID</td><td>尸体编号</td><td>尸体名称</td><td>尸体发现地点</td><td>尸体姿态</td><td>现场血迹情况</td><td>现场环境情况</td><td>随身物品</td><td>尸体盛装物</td><td>尸体包裹物</td><td>死亡性质</td><td>致死原因</td><td>死亡时间推论</td><td>尸体加害形式</td><td>特征描述</td><td>创建人ID</td><td>创建时间</td><td>尸体完整度</td><td>数据状态</td><td>修改时间</td></tr>")
    $.get("/get_corpse_info", {
    }, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#corpse_info_table").append("<tr><td>"+json.CORPSE_INFO_ID+"</td><td>"+json.CORPSE_INFO_NAME+"</td></tr>");
        });               //序列号
    })
}
function get_corpse_photo(id) {
    $(".full_view").css("display","none");
    var x = document.getElementById(id);
    if(x.style.display == "block"){
        x.style.cssText = "display:none"
    }else {
        x.style.cssText = "display:block"
    }
    // $("#site_changes_button").click(function(){
    //     $("#site_changes").toggle();
    // });
    //表内容修改
    // document.getElementById("site_changes_table").rows[0].cells[0].innerText = "现场变动ID"
    // document.getElementById("site_changes_table").rows[0].cells[1].innerText = "现场变动名称"

    $("#corpse_photo_table").find("tr").remove();
    $("#corpse_photo_table").append("<tr><td>尸体照片ID</td><td>尸体照片名称</td></tr>")
    // $("#corpse_photo_table").append("<tr><td>尸体照片ID</td><td>尸体照片名称</td><td>尸体照片内容</td><td>创建时间</td><td>尸体ID</td></tr>")
    $.get("/get_corpse_photo", {
    }, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#corpse_photo_table").append("<tr><td>"+json.CORPSE_PHOTO_ID+"</td><td>"+json.CORPSE_PHOTO_NAME+"</td></tr>");
        });               //序列号
    })
}
function get_position_photo(id) {
    $(".full_view").css("display","none");
    var x = document.getElementById(id);
    if(x.style.display == "block"){
        x.style.cssText = "display:none"
    }else {
        x.style.cssText = "display:block"
    }
    // $("#site_changes_button").click(function(){
    //     $("#site_changes").toggle();
    // });
    //表内容修改
    // document.getElementById("site_changes_table").rows[0].cells[0].innerText = "现场变动ID"
    // document.getElementById("site_changes_table").rows[0].cells[1].innerText = "现场变动名称"

    $("#position_photo_table").find("tr").remove();
    $("#position_photo_table").append("<tr><td>方位照片ID</td><td>方位照片名称</td></tr>")
    // $("#position_photo_table").append("<tr><td>方位照片ID</td><td>方位照片名称</td><td>方位照片内容</td><td>痕迹物品ID</td><td>创建时间</td></tr>")
    $.get("/get_position_photo", {
    }, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#position_photo_table").append("<tr><td>"+json.POSITION_PHOTO_ID+"</td><td>"+json.POSITION_PHOTO_NAME+"</td></tr>");
        });               //序列号
    })
}
function get_case_concolusion_info(id) {
    $(".full_view").css("display","none");
    var x = document.getElementById(id);
    if(x.style.display == "block"){
        x.style.cssText = "display:none"
    }else {
        x.style.cssText = "display:block"
    }
    // $("#site_changes_button").click(function(){
    //     $("#site_changes").toggle();
    // });
    //表内容修改
    // document.getElementById("site_changes_table").rows[0].cells[0].innerText = "现场变动ID"
    // document.getElementById("site_changes_table").rows[0].cells[1].innerText = "现场变动名称"

    $("#case_conclusion_info_table").find("tr").remove();
    $("#case_conclusion_info_table").append("<tr><td>勘验基础信息ID</td><td>创建人ID</td></tr>")
    // $("#case_conclusion_info_table").append("<tr><td>勘验基础信息ID</td><td>作案动机</td><td>作案工具</td><td>作案时间</td><td>作案地点</td><td>受害人员</td><td>创建人ID</td><td>创建时间</td><td>修改时间</td><td>数据状态</td></tr>")
    $.get("/get_case_conclusion_info", {
    }, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#case_conclusion_info_table").append("<tr><td>"+json.BASE_INFO_ID+"</td><td>"+json.CREATE_PERSON_ID+"</td></tr>");
            // $("#case_conclusion_info_table").append("<tr><td>"+json.BASE_INFO_ID+"</td><td>"+json.MOTIVATION+"</td><td>"+json.CRIME_TOOLS+"</td><td>"+json.CRIME_TIME+"</td><td>"+json.CRIME_ADDRESS+"</td><td>"+json.VICTIME+"</td><td>"+json.CREATE_PERSON_ID+"</td><td>"+json.CREATE_TIME+"</td><td>"+json.UPDATE_TIME+"</td><td>"+json.DATA_STATE+"</td></tr>");
        });               //序列号
    })
}
function get_ele_info(id) {
    $(".full_view").css("display","none");
    var x = document.getElementById(id);
    if(x.style.display == "block"){
        x.style.cssText = "display:none"
    }else {
        x.style.cssText = "display:block"
    }
    // $("#site_changes_button").click(function(){
    //     $("#site_changes").toggle();
    // });
    //表内容修改
    // document.getElementById("site_changes_table").rows[0].cells[0].innerText = "现场变动ID"
    // document.getElementById("site_changes_table").rows[0].cells[1].innerText = "现场变动名称"

    $("#ele_info_table").find("tr").remove();
    $("#ele_info_table").append("<tr><td>基础勘验信息ID</td><td>电子设备名称</td></tr>")
    // $("#ele_info_table").append("<tr><td>基础勘验信息ID</td><td>电子设备名称</td><td>内容描述</td><td>提取时间</td><td>提取人</td><td>创建人ID</td><td>创建时间</td><td>修改时间</td><td>数据状态</td></tr>")
    $.get("/get_ele_info", {
    }, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#ele_info_table").append("<tr><td>"+json.BASE_INFO_ID+"</td><td>"+json.DEVICE_NAME+"</td></tr>");
        });               //序列号
    })
}
function get_involved_goods_info(id) {
    $(".full_view").css("display","none");
    var x = document.getElementById(id);
    if(x.style.display == "block"){
        x.style.cssText = "display:none"
    }else {
        x.style.cssText = "display:block"
    }
    // $("#site_changes_button").click(function(){
    //     $("#site_changes").toggle();
    // });
    //表内容修改
    // document.getElementById("site_changes_table").rows[0].cells[0].innerText = "现场变动ID"
    // document.getElementById("site_changes_table").rows[0].cells[1].innerText = "现场变动名称"

    $("#involved_goods_info_table").find("tr").remove();
    $("#involved_goods_info_table").append("<tr><td>涉案物品信息ID</td><td>物品名称</td></tr>")
    // $("#involved_goods_info_table").append("<tr><td>涉案物品信息ID</td><td>物品名称</td><td>提取位置</td><td>勘验基础信息ID</td><td>创建人ID</td><td>创建时间</td><td>修改时间</td><td>数据状态</td></tr>")
    $.get("/get_involved_goods_info", {
    }, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#involved_goods_info_table").append("<tr><td>"+json.INVOLVED_GOODS_INFO_ID+"</td><td>"+json.INVOLVED_GOODS_NAME+"</td></tr>");
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
    console.log(thing_gltf)
}




function select_scene(scene_id) {
    document.getElementById("operations").style.display = "";
    $.get("/select_scene", {"value": scene_id}, function (data) {
        console.log("选择场景号：" + scene_id);
        for (var i = 0; i < data.kinetic_info.length; i++) {
            $("#kinetic_model").append('<option value=' + data.kinetic_info[i].id + ' >' + data.kinetic_info[i].kinetic_id + '</option>');
        }
        console.log(data);
        var relevant_info = data.relevant_info;
        for (var i = 0; i < relevant_info.length; i++) {
            var longitude = relevant_info[i].start_lon;
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
            });

        }
        if (data.location[0].lon != null && data.location[0].lon != undefined) {
            set_view(data.location[0].lon, data.location[0].lat);
        }
        // data.forEach(function (icon_name) {
        //     console.log(icon_name);
        //     $("#icon_menu").append('<option value=' + icon_name + ' >' + icon_name + '</option>');
        // });

    })
    //加载物品标注
    $.get("/select_thing_scene", {"value": scene_id}, function (data) {
        console.log("选择场景号：" + scene_id);//选择场景
        for (var i = 0; i < data.kinetic_info.length; i++) {
            $("#kinetic_model").append('<option value=' + data.kinetic_info[i].id + ' >' + data.kinetic_info[i].kinetic_id + '</option>');
        }
        console.log(data);//
        var relevant_info = data.relevant_info;
        for (var i = 0; i < relevant_info.length; i++) {
            var longitude = relevant_info[i].start_lon;
            var latitude = relevant_info[i].start_lat;
            var height = relevant_info[i].start_height
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

            var entity4 = viewer.scene.primitives.add(Cesium.Model.fromGltf({    //fromGltf方法：从Gltf资源加载模型
                    url: gltf_path,
                    modelMatrix: modelMatrix,
                    // minimumPixelSize : 512,
                    scale: 10,
                    // maximumScale : 200000
                })
            );
            // const position = Cesium.Cartesia n3.fromDegrees(longitude, latitude, height);
            // const hpRoll = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(0), Cesium.Math.toRadians(0), Cesium.Math.toRadians(0));
            // const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpRoll);
            // viewer.entities.add({
            //     position: position,
            //     orientation:orientation,
            //     model: {
            //         uri: gltf_path,
            //         heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            //     },
            //
            //     properties: {
            //         type: "added",
            //         thing_type: thing_type,
            //         thing_id: thing_id,
            //         // roll:roll
            //     },
            //     scale:10.0,
            //     minimumPixelSize: 100,
            //     show: true
            // });

        }
        if (data.location[0].lon != null && data.location[0].lon != undefined) {
            set_view(data.location[0].lon, data.location[0].lat);
        }
        // data.forEach(function (icon_name) {
        //     console.log(icon_name);
        //     $("#icon_menu").append('<option value=' + icon_name + ' >' + icon_name + '</option>');
        // });

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
    if(x.style.display == "block"){
        x.style.cssText = "display:none"
    }else {
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
    if(x.style.display == "block"){
        x.style.cssText = "display:none"
    }else {
        x.style.cssText = "display:block"
    }
}

function get_operation_type(){
    console.log(operation_type);
    operation_type = "mark_things";
}

function mark_undefine(id) {
    $(".full_view").css("display","none");
    var x = document.getElementById(id);
    if(x.style.display == "block"){
        x.style.cssText = "display:none"
    }else {
        x.style.cssText = "display:block"
    }
    // $("#site_changes_button").click(function(){
    //     $("#site_changes").toggle();
    // });
    //表内容修改
    // document.getElementById("site_changes_table").rows[0].cells[0].innerText = "现场变动ID"
    // document.getElementById("site_changes_table").rows[0].cells[1].innerText = "现场变动名称"

    $("#mark_undefine_table").find("tr").remove();
    $("#mark_undefine_table").append("<tr><td>痕迹物品ID</td><td>物品名称</td></tr>")
    // $("#mark_undefine_table").append("<tr><td>痕迹物品ID</td><td>物品名称</td><td>物品类型ID</td><td>提取方法ID</td><td>基础勘验信息ID</td><td>提取时间</td><td>提取人</td><td>创建时间</td><td>创建人ID</td><td>数据状态</td><td>描述</td><td>修改时间</td></tr>")
    $.get("/get_mark_goods", {
    }, function (data) {
        if (data.msg != undefined) {
            alert(data.msg);
            return;
        }
        data.forEach(function (json) {
            $("#mark_undefine_table").append("<tr><td>"+json.MARK_GOODS_ID+"</td><td>"+json.MARK_GOODS_DESCRIBE+"</td></tr>");
        });               //序列号
    })
}

$(document).ready(function () {
    $("#upload_kinetic").click(function () {
        $("#fileMutiply").click()
    })
    $("#create_kinetic").click(function () {
        $("#files").click()
    })
    $(".second_button").click(function () {
        $(this).css("display","block")
        $(this).siblings(".full_view").css("display","none")
    })
    $(".first_button").click(function () {
        $(".full_view").css("display","none")
    })
})

