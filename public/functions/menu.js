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

function get_sub_menu(top_name) {
    console.log("图标大类名为：" + top_name);
    $("#sub_icon_menu").find("option").remove();
    $("#sub_icon_menu").append("<option value='volvo' hidden>选择图标子类</option>");
    $("#icon_menu").find("option").remove();
    $("#icon_menu").append("<option value='volvo' hidden>选择图标图片</option>");
    $.get("/get_sub_menu", {"value": top_name}, function (data) {
        sub_menu = data;
        sub_menu.forEach(function (sub_name) {
            $("#sub_icon_menu").append('<option value=' + sub_name + ' >' + sub_name + '</option>');
        });
    })
}

function get_icon_menu(sub_name) {
    $("#icon_menu").find("option").remove();
    $("#icon_menu").append("<option value='volvo' hidden>选择图标图片</option>");
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
    element_image = "cesium/icons/" + top_name + "/" + sub_name + "/" + icon_name;
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

            const position = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
            const hpRoll = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(0), Cesium.Math.toRadians(0), Cesium.Math.toRadians(0));
            const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpRoll);
            viewer.entities.add({
                position: position,
                orientation:orientation,
                model: {
                    uri: gltf_path,
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                },

                properties: {
                    type: "added",
                    thing_type: thing_type,
                    thing_id: thing_id,
                    roll:roll
                },
                scale: 10.0,
                minimumPixelSize: 100,
                show: true
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