// Sandcastle.addToolbarButton('创建案件', function () {
//     window
//         .open(
//             "create_case.html",
//             "create_case",
//             "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
//
// }, 'CreateCase');
//
// Sandcastle.addToolbarButton('创建场景', function () {
// }, 'CreateScene');
// Sandcastle.addToolbarButton('模型调整', function(){
//     $(".model_modify").eq(0).show();
// }, 'NewAddedMenu');
// Sandcastle.addToolbarButton('关联展示', function () {
//     showdog();
//     showwaveblue();
//     showwavegreen();
//     showwavered();
//     // showrelation()
// }, 'NewAddedMenu');

// Sandcastle.addToolbarButton('痕迹',function () {
//     menushow("imprintshow")
// }, 'imprint');
// Sandcastle.addToolbarButton('物品',function () {
//     menushow("thingshow")
// }, 'thing');
// Sandcastle.addToolbarButton('主体',function () {
//     menushow("subjectshow")
// }, 'subject');
// Sandcastle.addToolbarButton('信息',function () {
//     menushow("informationshow")
// }, 'information');
// Sandcastle.addToolbarButton('功能',function () {
//     menushow("functionshow")
// }, 'functions');
// Sandcastle.addToolbarButton('模型',function () {
//     menushow("modelshow")
// }, 'modeltype');

// Sandcastle.addToolbarButton('自主路线', function () {
//     // viewer.entities.removeAll();
//     // positions=[];
//     show_tileset();
//     alert("开始规划路线，左键点击经过点，右键结束");
//     operation_type = "drawRoute";
//     // viewer.zoomTo(tileset);
//     viewer.camera.setView({
//         destination: Cesium.Cartesian3.fromDegrees(114.21952507076327, 30.358135859723472, 800),
//         orientation: {
//             heading: 0.0,
//             pitch: Cesium.Math.toRadians(-90.0),
//             roll: 0.0
//         }
//     });
// }, 'caseMenu');
// Sandcastle.addToolbarButton('研判标注',function () {
//     $(".Smodel").eq(0).show();
// }, 'caseMenu');
//
// Sandcastle.addToolbarButton('地理量测', function () {
//     $(".toolbar_measure").eq(0).show();
// }, 'caseMenu');
//
// Sandcastle.addToolbarButton('爆炸效果', function () {
//     startBZ1();
//     viewer.camera.setView({
//         destination: {x: -2259556.172741972, y: 5023532.150760894, z: 3204801.7784513133},
//         orientation: {
//             heading: 6.144391448663251,
//             pitch: -0.6870827796178554,
//             roll: 0.0
//         }
//     });
// }, 'caseMenu');
//
// Sandcastle.addToolbarButton('爆炸冲击波', function () {
//     startBZ2();
//     viewer.camera.setView({
//         destination: {x: -2259482.2093426995, y: 5023565.238597119, z: 3204802.0603294484},
//         orientation: {
//             heading: 6.144391448663251,
//             pitch: -0.6870827796178554,
//             roll: 0.0
//         }
//     });
// }, 'caseMenu');
// Sandcastle.addToolbarButton('燃烧模型', function () {
//     $(".caseMenuShow").eq(0).show();
// }, 'modelMenu');
// Sandcastle.addToolbarButton('碰撞模型', function () {
//     $(".collisionMenuShow").eq(0).show();
// }, 'modelMenu');
// Sandcastle.addToolbarButton('爆炸模型', function () {
//     $(".explodeMenuShow").eq(0).show();
// }, 'modelMenu');
// Sandcastle.addToolbarButton('砍杀模型', function () {
//     $(".killMenuShow").eq(0).show();
// }, 'modelMenu');
//
// // Sandcastle.addToolbarButton('砍杀模型', function () {
// //
// // }, 'modelMenu');
// Sandcastle.addToolbarButton('混合模型', function () {
//     clearFire();
//     clearCollision();
//     clearExplosion();
//     viewer.camera.setView({
//         destination: {
//             x: -2259635.974850741,
//             y: 5023449.2015779745,
//             z: 3204845.1002706015
//         },
//         orientation: {
//             heading: 2.8424653218313556,
//             pitch: -0.8928382126577965,
//             roll: 0
//         }
//     });
//     pz_start();
// }, 'modelMenu');
// Sandcastle.addToolbarButton('上传动力学模型', function () {
//     // $("#files").trigger("click");
//     $("#fileMutiply").trigger("click");
//
// }, 'KineticMenu');
// Sandcastle.addToolbarButton('创建动力学模型', function () {
//     $("#files").trigger("click");
//
// }, 'KineticMenu');
// Sandcastle.addToggleButton('显示', false, function (checked) {
//     dataSource.clustering.enabled = checked;
// }, 'ModelMeasure');
// Sandcastle.addToggleButton('标注', false, function (checked) {
//     dataSource.clustering.enabled = checked;
// }, 'ModelMeasure');
// Sandcastle.addToggleButton('范围', false, function (checked) {
//     dataSource.clustering.enabled = checked;
// }, 'ModelMeasure');
// Sandcastle.addToggleButton('轨迹', false, function (checked) {
//     dataSource.clustering.enabled = checked;
// }, 'ModelMeasure');
// Sandcastle.addToolbarButton('标注模式', function () {
//     operation_type = "mark_elements";
//     alert("选择绑定要素和要素图标后后左键点击标定要素位置");
// }, 'markMenu');
// Sandcastle.addToolbarButton('导入要素', function () {
//
//     $("#element_file").trigger("click");
//     console.log("导入要素");
// }, 'markMenu');
// Sandcastle.addToolbarButton('新建痕迹', function () {
//
//     $("#element_file").trigger("click");
//     console.log("新建痕迹");
// }, 'markMenu');
// Sandcastle.addToolbarButton('标注模式', function () {
//     operation_type = "mark_things";//things标注
//     alert("选择绑定要素和要素图标后后左键点击标定要素位置");
// }, 'thingMenu');
// Sandcastle.addToolbarButton('导入物品', function () {
//
//     $("#thing_file").trigger("click");
//     console.log("导入物品");
// }, 'thingMenu');
// Sandcastle.addToolbarButton('新建物品', function () {
//
//     $("#thing_file").trigger("click");
//     console.log("新建物品");
// }, 'thingMenu');
// Sandcastle.addToolbarButton('标注模式', function () {
//     operation_type = "mark_elements";
//     alert("选择绑定要素和要素图标后后左键点击标定要素位置");
// }, 'humanMenu');
// Sandcastle.addToolbarButton('导入主体', function () {
//
//     $("#human_file").trigger("click");
//     console.log("导入主体");
// }, 'humanMenu');
// Sandcastle.addToolbarButton('新建主体', function () {
//
//     $("#human_file").trigger("click");
//     console.log("新建主体");
// }, 'humanMenu');
// Sandcastle.addToolbarButton('标注模式', function () {
//     operation_type = "mark_elements";
//     alert("选择绑定要素和要素图标后后左键点击标定要素位置");
// }, 'infoMenu');
// Sandcastle.addToolbarButton('导入信息', function () {
//
//     $("#info_file").trigger("click");
//     console.log("导入信息");
// }, 'infoMenu');
// Sandcastle.addToolbarButton('新建信息', function () {
//
//     $("#info_file").trigger("click");
//     console.log("新建信息");
// }, 'infoMenu');

//菜单案件与场景选项逻辑
$.get("/get_cases", {"value": "get_cases"}, function (data) {
    cases = data;
    let caseIdx = 1;
    /*if (predefinedCaseId != undefined) {
        console.log("Current CaseId: " + predefinedCaseId);
    }*/
    cases.forEach(function (json) {
        $("#cases_name").append('<option value=' + json.cases_name + ' >' + json.cases_name + '</option>');
        casesIdMap.set(caseIdx++, json);
    });
})

jQuery(function ($) {
    var grid_selector = "#mark_goods_table";

    //var jq = jQuery.noConflict();
    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    function changeColor(header) {
        header.css('font-weight', 'bold');
        header.css('color', '#ffffff');
    };

    $('#SceneAdjustButton').on('click', function () {
        $.get("/scene_exists", {"value": currentSceneId}, function (data) {
            console.log("clicked adjustment");
            if (data.length != 1 || data[0].scene_path == "") {
                alert('The scene ' + currentSceneId + " did not have a valid path, configure it first");
                return;
            } else {
                const tilepath = data[0].scene_path;
                console.log('准备读取tileset信息：' + tilepath);
                try {
                    tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                        url: tilepath,
                        maximumScreenSpaceError: 20,
                        maximumNumberOfLoadedTiles: 500,
                        clippingPlanes: clippingPlanes
                    }));
                    tileset.readyPromise.then(function (tileset) {
                        boundingSphere = tileset.boundingSphere;
                        var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
                        var longitude = Cesium.Math.toDegrees(cartographic.longitude);
                        var latitude = Cesium.Math.toDegrees(cartographic.latitude);
                        var height = cartographic.height;
                        if (longitude > 120 || longitude < 100 || latitude > 50 || latitude < 10)
                            alert(longitude + ", " + latitude + ", " + height + ", 场景坐标系需要纠偏");
                        else
                            alert(longitude + ", " + latitude + ", " + height + ", 请填充至配置项中");
                    });
                } catch (e) {
                    alert("加载数据" + data + '失败' + e.toString());
                }
            }
        })
    });

    $('#SceneConfigureButton').on('click', function () {
        // alert("How are you doing?");
        $.get("/scene_exists", {"value": currentSceneId}, function (data) {
            console.log("clicked configuration");
            return;
        })

        window.open(visualpage_addr + "configScene.html?sceneId=" + currentSceneId + "", "show_element_info",
            "height=500, width=1000, top=200, left=450, toolbar=no, menubar=no, directories=no, scrollbars=no, resizable=no, location=no, status=no");

        //http://106.15.190.54:8081/involvedGoodsInfo.html?involvedGoodsInfoId=2c91fa9d6ec59058016ec5a7ba38004c
    });

    $('#CaseInqueryButton').on('click', function () {
        // Here releases a bug with uncleared header.
        $(grid_selector).jqGrid("clearGridData", true).trigger("reloadGrid");
        var gridData = $(grid_selector).jqGrid("getRowData");
        for (var i = 0; i < gridData.length; i++) {
            alert("resting: " + gridData[i].MARK_GOODS_NAME);
            $(grid_selector).jqGrid("delRowData", i);
        }
        $.get("/get_mark_goods", {"base_info_id": currentSceneId}, function (data) {
            if (data.msg != undefined) {
                alert("ajax" + data.msg);
                return;
            }
            var counter = 0;
            data.forEach(function (json) {
                var rowData = {
                    MARK_GOODS_NAME: json.MARK_GOODS_NAME,
                    CREATE_TIME: json.CREATE_TIME,
                    MARK_GOODS_ID: json.MARK_GOODS_ID
                };
                if (counter < 2) alert("put: " + counter + ":" + rowData.MARK_GOODS_NAME);
                $(grid_selector).jqGrid("addRowData", counter, rowData);
                counter++;
            });
            $(grid_selector).trigger('reloadGrid');
        })
    });

    jQuery(document).ready(function (req, res) {
        const urlParams = new URLSearchParams(document.URL.toString());
        var desiredScene = urlParams.get("sceneId");
        var desiredPerson = urlParams.get("personId");
        var desiredCase = urlParams.get("caseId");
        var typevar = urlParams.get("type");
        if (desiredPerson != undefined) {
            console.log("by personId: " + desiredPerson);
            activeObject.element_type = "involved_person_info";
            activeObject.element_id = desiredPerson;
            $.get("/get_scene_by_person", {"value": desiredPerson}, function (data) {
                console.log(data.length + ":" + data[0].cases_id);
                // var i = 0;
                data.forEach(function (json) {
                    // console.log((i++) + ":" + JSON.stringify(json));
                    desiredCase = json.BASE_INFO_ID;
                    desiredScene = json.SCENE_ID;
                });
                console.log("by person's: " + desiredCase + "->" + desiredScene + "->" + desiredPerson);
                triggerCaseScene(desiredCase, desiredScene, desiredPerson);
            });
        } else if (desiredScene != undefined) {
            console.log("by sceneid: " + desiredScene);
            $.get("/get_case_by_scene", {"value": desiredScene}, function (data) {
                console.log(data.length);
                desiredCase = data[0].cases_id;
                console.log("by caseid: " + desiredCase);
                triggerCaseScene(desiredCase, desiredScene, desiredPerson);
            });
        } else if (desiredCase != undefined) {
            triggerCaseScene(desiredCase, desiredScene, desiredPerson);
        }
    });

    jQuery(grid_selector).jqGrid({
        //direction: "rtl",
        datatype: "json",
        mtype: 'POST',
        height: 240,
        colColor: 'white',
        colNames: ['痕迹名称', '痕迹描述', '痕迹ID'],
        colModel: [
            {name: 'MARK_GOODS_NAME', index: 'MARK_GOODS_NAME', width: 60, editable: false},//cellclassname: colorFondo},
            {
                name: 'CREATE_TIME',
                index: 'CREATE_TIME',
                sortable: true,
                sorttype: "string",
                width: 120,
                editable: false
            },
            {name: 'MARK_GOODS_ID', index: 'MARK_GOODS_ID', width: 80, editable: false}
        ],
        gridview: true,
        viewrecords: true,
        toppager: false,
        multiselect: true,
        //multikey: "ctrlKey",
        multiboxonly: true,
        /*gridComplete: function () {
            $(grid_selector).addClass('jqgrid-header');
        },*/
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            alert("jQuery load!");
            var table = this;
            setTimeout(function () {
            }, 0);
        },
        afterInsertRow: function (rowid, rowData, rowelem) {
            $(this).parent().css('color', 'red');
            if (rowid % 2 == 0) $(this).jqGrid('setRowData', rowid, rowData, {color: '#ffffff', background: 'black'});
            else $(this).jqGrid('setRowData', rowid, rowData, {color: '#ffffff', background: '#3f3f3f'});
        },
        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            activeObject.element_type = 'mark_goods';
            activeObject.element_id = rowData.MARK_GOODS_ID;
            alert(rowData.MARK_GOODS_NAME + ":" + rowData.MARK_GOODS_ID + ":" + activeObject.element_type);
            operation_type = "mark_elements";
            //document.getElementById('e-correlation').value = '选中案件编号为 ' + cid + ' 的事件';
            //document.getElementById('ematerial_show_all').value = '此处显示案件编号为 ' + cid + ' 的案件素材';
        },

        autowidth: false,
        fixed: true
    });
});

function triggerCaseScene(desiredCase, desiredScene, desiredPerson) {
    console.log("pseudo click on case_name");
    var selectedIdx = -1;
    var currentId = 1;
    $.get("/get_cases", {"value": "get_cases"}, function (data) {
        console.log(data.length);
        data.forEach(function (json) {
            if (desiredCase.normalize() === json.cases_id.normalize())
                selectedIdx = currentId;
            console.log("\t" + currentId + ":" + json.cases_id + "<->" + desiredCase);
            currentId++;
        });
        if (selectedIdx >= 0 && selectedIdx <= casesIdMap.size) {
            var select = document.getElementById("cases_name");
            select.selectedIndex = selectedIdx;
            console.log("by caseid: " + desiredCase + " at: " + selectedIdx + " out of: " + currentId);
            select.onchange(get_scenes(selectedIdx));
        }
        if (desiredScene != undefined) {
            currentId = 1;
            selectedIdx = -1;
            $.get("/get_scenes", {"value": desiredCase}, function (data) {
                console.log(data.length);
                data.forEach(function (json) {
                    if (desiredScene.normalize() === json.base_info_id.normalize())
                        selectedIdx = currentId;
                    console.log("\t" + currentId + ":" + json.base_info_id + "<->" + desiredScene);
                    currentId++;
                });
                console.log("^^^^^^^^^^^^^^^^^^ try to remove: " + rippleList.length);
                if (selectedIdx >= 0 && selectedIdx < data.length) {
                    var select = document.getElementById("case_event_name");
                    select.selectedIndex = selectedIdx;
                    console.log("by caseid: " + desiredCase + " at: " + selectedIdx + " out of: " + currentId);
                    // select.onchange(select_scene(selectedIdx));
                    display_selected();
                    if (desiredPerson != undefined) {
                        scenevisualization();
                    }
                }
            });
        }
    })
}

function mark_thing() {
    // if (operation_type == undefined)
    operation_type = 'mark_things';
    alert("请选择类型")
}
