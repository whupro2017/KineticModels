function fireModelConfirm() {
    var type = "";
    var fire_output = document.getElementById("fire_output").checked;
    var smoke_output = document.getElementById("smoke_output").checked;
    var model_output = document.getElementById("model_output").checked;
    var temperature_output = document.getElementById("temperature_output").checked;
    if (fire_output == true) {
        type = type + "1";
    } else {
        type = type + "0";
    }
    if (smoke_output == true) {
        type = type + "1";
    } else {
        type = type + "0";
    }
    if (model_output == true) {
        type = type + "1";
    } else {
        type = type + "0";
    }
    if (temperature_output == true) {
        type = type + "1";
    } else {
        type = type + "0";
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

function display_selected() {
    operation_type = "display_selected";
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

function modelModifyDone() {

}

function modelModifyClose() {
    cleanAll();
    $(".model_modify").eq(0).hide();
}

function rightmodelmodify() {
    operation_type = "adjust_model";
    var x = document.getElementById("model_modify")
    if (x.style.display == "none") {
        x.style.cssText = "display:block"
    }
}

var currentPos = {"lng": 0, "lat": 0, "height": 0};

function extract_model_pos(entity, result) {
    var originCart3 = new Cesium.Cartesian3();
    Cesium.Matrix4.getTranslation(entity.modelMatrix, originCart3);
    var originCarto = Cesium.Cartographic.fromCartesian(originCart3);
    var lng = Cesium.Math.toDegrees(originCarto.longitude);
    var lat = Cesium.Math.toDegrees(originCarto.latitude);
    var height = originCarto.height;

    console.log(originCart3 + " " + lng + " " + lat + " " + height);
    result.lng = lng;
    result.lat = lat;
    result.height = height;
    //const mat3 = Cesium.Matrix4.getRotation(m3, new Cesium.Matrix3());
}

function update_model_hpr(entity) {
    Cesium.knockout.getObservable(viewModel, 'Enlarge').subscribe(function (Enlarge) {
        //originModelMadrix = entity.modelMatrix;
        console.log(entity.modelMatrix.toString());
        Enlarge = Number(Enlarge);
        if (isNaN(Enlarge)) {
            return;
        }
        entity.scale = originScale * Math.pow(1.1, Enlarge);
        console.log(entity.modelMatrix.toString());
    });

    Cesium.knockout.getObservable(viewModel, 'OffsetX').subscribe(function (OffsetX) {
        OffsetX = Number(OffsetX);
        if (isNaN(OffsetX)) {
            return;
        }
        extract_model_pos(entity, currentPos);
        var rect = new Cesium.Rectangle();
        viewer.camera.computeViewRectangle(viewer.scene.globe.ellipsoid, rect);
        var vx = (Cesium.Math.toDegrees(rect.east) - Cesium.Math.toDegrees(rect.west)) / 100;
        var x = currentPos.lng + vx * (OffsetX - originOffset.lng);
        var position = Cesium.Cartesian3.fromDegrees(x, currentPos.lat, currentPos.height);
        var m = Cesium.Transforms.eastNorthUpToFixedFrame(position);
        entity.modelMatrix = m;
        originOffset.lng = OffsetX;
        console.log(entity.modelMatrix.toString());
        //var m = originModelMadrix;
        /*var m1 = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(RotateX));
        entity.modelMatrix = Cesium.Matrix4.multiplyByMatrix3(m, m1, new Cesium.Matrix4());
        console.log(entity.modelMatrix.toString());*/
    });

    Cesium.knockout.getObservable(viewModel, 'OffsetY').subscribe(function (OffsetY) {
        OffsetY = Number(OffsetY);
        if (isNaN(OffsetY)) {
            return;
        }
        extract_model_pos(entity, currentPos);
        var rect = new Cesium.Rectangle();
        viewer.camera.computeViewRectangle(viewer.scene.globe.ellipsoid, rect);
        var vy = (Cesium.Math.toDegrees(rect.north) - Cesium.Math.toDegrees(rect.south)) / 100;
        var y = currentPos.lat + vy * (OffsetY - originOffset.lat);
        var position = Cesium.Cartesian3.fromDegrees(currentPos.lng, y, currentPos.height);
        var m = Cesium.Transforms.eastNorthUpToFixedFrame(position);
        entity.modelMatrix = m;
        originOffset.lat = OffsetY;
        console.log(entity.modelMatrix.toString());
    });

    Cesium.knockout.getObservable(viewModel, 'OffsetZ').subscribe(function (OffsetZ) {
        OffsetZ = Number(OffsetZ);
        if (isNaN(OffsetZ)) {
            return;
        }
        extract_model_pos(entity, currentPos);
        var rect = new Cesium.Rectangle();
        viewer.camera.computeViewRectangle(viewer.scene.globe.ellipsoid, rect);
        var vz = currentPos.height / 100;
        var z = currentPos.height + vz * (OffsetZ - originOffset.height);
        var position = Cesium.Cartesian3.fromDegrees(currentPos.lng, currentPos.lat, z);
        var m = Cesium.Transforms.eastNorthUpToFixedFrame(position);
        entity.modelMatrix = m;
        originOffset.height = OffsetZ;
        console.log(entity.modelMatrix.toString());
    });

    Cesium.knockout.getObservable(viewModel, 'RotateX').subscribe(function (RotateX) {
        RotateX = Number(RotateX);
        if (isNaN(RotateX)) {
            return;
        }
        var m = originModelMadrix;
        var m1 = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(RotateX));
        entity.modelMatrix = Cesium.Matrix4.multiplyByMatrix3(m, m1, new Cesium.Matrix4());
        console.log(entity.modelMatrix.toString());
    });

    Cesium.knockout.getObservable(viewModel, 'RotateY').subscribe(function (RotateY) {
        RotateY = Number(RotateY);
        if (isNaN(RotateY)) {
            return;
        }
        var m = originModelMadrix;
        var m1 = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(RotateY));
        entity.modelMatrix = Cesium.Matrix4.multiplyByMatrix3(m, m1, new Cesium.Matrix4());
        console.log(entity.modelMatrix.toString());
    });

    Cesium.knockout.getObservable(viewModel, 'RotateZ').subscribe(function (RotateZ) {
        RotateZ = Number(RotateZ);
        if (isNaN(RotateZ)) {
            return;
        }
        var m = originModelMadrix;
        var m1 = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(RotateZ));
        entity.modelMatrix = Cesium.Matrix4.multiplyByMatrix3(m, m1, new Cesium.Matrix4());
        console.log(entity.modelMatrix.toString());
    });//Sandcastle_End
    //originModelMadrix = entity.modelMatrix;
    Sandcastle.finishedLoading();
}