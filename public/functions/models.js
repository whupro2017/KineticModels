function fireModelConfirm() {
    var type="";
    var fire_output = document.getElementById("fire_output").checked;
    var smoke_output = document.getElementById("smoke_output").checked;
    var model_output = document.getElementById("model_output").checked;
    var temperature_output = document.getElementById("temperature_output").checked;
    if(fire_output==true){
        type=type+"1";
    }else{
        type=type+"0";
    }
    if(smoke_output==true){
        type=type+"1";
    }else{
        type=type+"0";
    }
    if(model_output==true){
        type=type+"1";
    }else{
        type=type+"0";
    }
    if(temperature_output==true){
        type=type+"1";
    }else{
        type=type+"0";
    }
    console.log(type);
    var position = document.getElementById("position").value;
    window.document.getElementById("fire_type_name").value = type;
    window.document.getElementById("start_fire_model").click();
    window.close();
}

function fireModelClose() {
    cleanAll();
    $(".caseMenuShow").eq(0).hide();
}

function collisionModelConfirm() {
    clearFire();
    clearExplosion();
    clearMix();
    if ("undefined" != typeof (primitives)) {
        while (primitives.length != 0)
            viewer.scene.primitives.remove(primitives.pop());
        viewer.entities.remove(viewer.entities.getById("house"));
        window.clearInterval(timer);
        window.clearInterval(changeTimer);
        console.log("清除燃烧模型");

    }
    planeEntities[0].show = false;//清除爆炸模型
    startCollision(czml);
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(114.22092858514243, 30.357234672988366, 200),
        orientation: {
            heading: 0.0,
            pitch: Cesium.Math.toRadians(-90.0),
            roll: 0.0
        }
    });
}

function collisionModelClose() {
    cleanAll();
    $(".collisionMenuShow").eq(0).hide();
}
function explodeModelConfirm() {
    clearFire();
    clearCollision();
    clearMix();
    // tileset.clippingPlanes = clippingPlanes;
    planeEntities[0].show = true;
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(114.21930535333072, 30.357892738082274, 500),
        orientation: {
            heading: 0.0,
            pitch: Cesium.Math.toRadians(-90.0),
            roll: 0.0
        }
    });
}

function explodeModelClose() {
    cleanAll();
    $(".explodeMenuShow").eq(0).hide();
}

function stru_changed() {
    var stru_type = $("#structure").val();
    console.log(stru_type);
    $("#position").find("option").remove();
    switch (stru_type) {
        case "1":
        case "2":
        case "3":
            console.log("选1");
            $("#position").append('<option value=1 >接触</option>');
            $("#position").append('<option value=2 >悬空</option>');
            $("#position").append('<option value=3 >埋爆</option>');
            break;
        case "4":
            console.log("选4");
            $("#position").append('<option value=4 >室内-拐角</option>');
            $("#position").append('<option value=5 >室内-地板中心</option>');
            $("#position").append('<option value=6 >室内-墙边</option>');
            $("#position").append('<option value=7 >室外-贴地</option>');
            $("#position").append('<option value=8 >室外-悬空</option>');
            break;
        case "5":
            console.log("选5");
            $("#position").append('<option value=9 >驾驶座</option>');
            $("#position").append('<option value=10 >后备箱</option>');
            $("#position").append('<option value=11 >底盘</option>');
            break;
    }
}
function killModelConfirm() {

}
function killModelClose() {
    cleanAll();
    $(".killMenuShow").eq(0).hide();
}
function modelModifyClose() {
    cleanAll();
    $(".model_modify").eq(0).hide();
}