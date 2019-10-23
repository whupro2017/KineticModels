Sandcastle.addToolbarButton('创建案件', function () {
    window
        .open(
            "create_case.html",
            "create_case",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");

}, 'CreateCase');

Sandcastle.addToolbarButton('创建场景', function () {
}, 'CreateScene');
Sandcastle.addToolbarButton('自主路线', function () {
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
}, 'caseMenu');
Sandcastle.addToolbarButton('研判标注', function () {
    $(".Smodel").eq(0).show();
}, 'caseMenu');

Sandcastle.addToolbarButton('地理量测', function () {
    $(".toolbar_measure").eq(0).show();
}, 'caseMenu');

Sandcastle.addToolbarButton('爆炸效果', function () {
    startBZ1();
    viewer.camera.setView({
        destination: {x: -2259556.172741972, y: 5023532.150760894, z: 3204801.7784513133},
        orientation: {
            heading: 6.144391448663251,
            pitch: -0.6870827796178554,
            roll: 0.0
        }
    });
}, 'caseMenu');

Sandcastle.addToolbarButton('爆炸冲击波', function () {
    startBZ2();
    viewer.camera.setView({
        destination: {x: -2259482.2093426995, y: 5023565.238597119, z: 3204802.0603294484},
        orientation: {
            heading: 6.144391448663251,
            pitch: -0.6870827796178554,
            roll: 0.0
        }
    });
}, 'caseMenu');
Sandcastle.addToolbarButton('燃烧模型', function () {
    window
        .open(
            "fire_parameter.html",
            "fire_parameter",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}, 'modelMenu');
Sandcastle.addToolbarButton('碰撞模型', function () {
    window.open(
        "collision_parameter.html",
        "collision_parameter",
        "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}, 'modelMenu');
Sandcastle.addToolbarButton('爆炸模型', function () {
    window
        .open(
            "explosion_parameter.html",
            "explosion_parameter",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}, 'modelMenu');
Sandcastle.addToolbarButton('砍杀模型', function () {
    window
        .open(
            "kill_parameter.html",
            "kill_parameter",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}, 'modelMenu');

// Sandcastle.addToolbarButton('砍杀模型', function () {
//
// }, 'modelMenu');
Sandcastle.addToolbarButton('混合模型', function () {
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
}, 'modelMenu');
Sandcastle.addToolbarButton('上传动力学模型', function () {
    $("#files").trigger("click");

}, 'KineticMenu');
Sandcastle.addToolbarButton('创建动力学模型', function () {
    $("#files").trigger("click");

}, 'KineticMenu');
Sandcastle.addToggleButton('显示', false, function (checked) {
    dataSource.clustering.enabled = checked;
}, 'ModelMeasure');
Sandcastle.addToggleButton('标注', false, function (checked) {
    dataSource.clustering.enabled = checked;
}, 'ModelMeasure');
Sandcastle.addToggleButton('范围', false, function (checked) {
    dataSource.clustering.enabled = checked;
}, 'ModelMeasure');
Sandcastle.addToggleButton('轨迹', false, function (checked) {
    dataSource.clustering.enabled = checked;
}, 'ModelMeasure');
Sandcastle.addToolbarButton('标注模式', function () {
    operation_type = "mark_elements";
    alert("选择绑定要素和要素图标后后左键点击标定要素位置");
}, 'markMenu');
Sandcastle.addToolbarButton('导入要素', function () {

    $("#element_file").trigger("click");
    console.log("导入要素");
}, 'markMenu');
Sandcastle.addToolbarButton('新建痕迹', function () {

    $("#element_file").trigger("click");
    console.log("新建痕迹");
}, 'markMenu');
Sandcastle.addToolbarButton('标注模式', function () {
    operation_type = "mark_things";//things标注
    alert("选择绑定要素和要素图标后后左键点击标定要素位置");
}, 'thingMenu');
Sandcastle.addToolbarButton('导入物品', function () {

    $("#thing_file").trigger("click");
    console.log("导入物品");
}, 'thingMenu');
Sandcastle.addToolbarButton('新建物品', function () {

    $("#thing_file").trigger("click");
    console.log("新建物品");
}, 'thingMenu');
Sandcastle.addToolbarButton('标注模式', function () {
    operation_type = "mark_elements";
    alert("选择绑定要素和要素图标后后左键点击标定要素位置");
}, 'humanMenu');
Sandcastle.addToolbarButton('导入主体', function () {

    $("#human_file").trigger("click");
    console.log("导入主体");
}, 'humanMenu');
Sandcastle.addToolbarButton('新建主体', function () {

    $("#human_file").trigger("click");
    console.log("新建主体");
}, 'humanMenu');
Sandcastle.addToolbarButton('标注模式', function () {
    operation_type = "mark_elements";
    alert("选择绑定要素和要素图标后后左键点击标定要素位置");
}, 'infoMenu');
Sandcastle.addToolbarButton('导入信息', function () {

    $("#info_file").trigger("click");
    console.log("导入信息");
}, 'infoMenu');
Sandcastle.addToolbarButton('新建信息', function () {

    $("#info_file").trigger("click");
    console.log("新建信息");
}, 'infoMenu');

//菜单案件与场景选项逻辑
$.get("/get_cases", {"value": "get_cases"}, function (data) {
    cases = data;
    cases.forEach(function (json) {
        $("#case_id").append('<option value=' + json.case_id + ' >' + json.case_id + '</option>');
    });
})