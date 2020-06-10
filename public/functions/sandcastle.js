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
    cases.forEach(function (json) {
        $("#case_id").append('<option value=' + json.case_id + ' >' + json.case_id + '</option>');
    });
})

jQuery(function ($) {
    var grid_selector = "#mark_goods_table";

    //var jq = jQuery.noConflict();
    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#CaseInqueryButton').on('click', function () {
        alert("mark_goods_table refresh!");
        // Here releases a bug with uncleared header.
        $(grid_selector).jqGrid("clearGridData", true).trigger("reloadGrid");
        $(grid_selector).trigger('reloadGrid');
        $.get("/get_mark_goods", {}, function (data) {
            if (data.msg != undefined) {
                alert(data.msg);
                return;
            }
            var counter = 0;
            data.forEach(function (json) {
                var row = {
                    MARK_GOODS_NAME: json.MARK_GOODS_NAME,
                    CREATE_TIME: json.CREATE_TIME,
                    EXTRACT_POSITION: json.EXTRACT_POSITION
                };
                if (counter < 5) alert(counter + ":" + row.MARK_GOODS_NAME);
                $(grid_selector).jqGrid("addRowData", counter++, row);
            });
            $(grid_selector).trigger('reloadGrid');
        })
    });

    jQuery(grid_selector).jqGrid({
        //direction: "rtl",
        datatype: "json",
        mtype: 'POST',
        height: 240,
        colNames: ['痕迹名称', '痕迹描述', '提取位置'],
        colModel: [
            {name: 'MARK_GOODS_NAME', index: 'MARK_GOODS_NAME', width: 60, editable: false},
            {name: 'CREATE_TIME', index: 'CREATE_TIME', sorttype: "datetime", width: 120, editable: false},
            {name: 'EXTRACT_POSITION', index: 'EXTRACT_POSITION', width: 80, editable: false}
        ],
        viewrecords: true,
        //toppager: true,
        multiselect: true,
        //multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            alert("jQuery load!");
            var table = this;
            setTimeout(function () {
            }, 0);
        },

        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            alert(rowData.MARK_GOODS_NAME);
            //document.getElementById('e-correlation').value = '选中案件编号为 ' + cid + ' 的事件';
            //document.getElementById('ematerial_show_all').value = '此处显示案件编号为 ' + cid + ' 的案件素材';
        },

        autowidth: true, shrinkToFit: false
    });
});

function mark_thing() {
    operation_type = 'mark_things';
    alert("请选择类型")
}
