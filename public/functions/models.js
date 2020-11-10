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

function fireModelParam() {
    var intype = "";
    intype += document.getElementById("position").selectedIndex;
    intype += document.getElementById("door_status").selectedIndex;
    intype += document.getElementById("fuel").selectedIndex;
    intype += document.getElementById("capacity").selectedIndex;
    intype += document.getElementById("material").selectedIndex;
    intype += document.getElementById("duration").selectedIndex;
    var outype = "";
    outype += document.getElementById("fire_output").checked ? 1 : 0;
    outype += document.getElementById("smoke_output").checked ? 1 : 0;
    outype += document.getElementById("model_output").checked ? 1 : 0;
    outype += document.getElementById("temperature_output").checked ? 1 : 0;
    let index = document.getElementById("sub_kinetic_menu").selectedIndex;
    let setid = document.getElementById("sub_kinetic_menu").options[index].value;
    $.get("/update_kinetic", {
        "KSETID": setid,
        "CONFIG": intype + "," + outype
    }, function (data) {
        console.log("更改模型：" + name + "位置");
    })
    alert(intype + "," + outype);
}

function collisionModelParam() {
    var intype = "";
    intype += document.getElementById("height").selectedIndex;
    intype += document.getElementById("posture").selectedIndex;
    intype += document.getElementById("car_type").selectedIndex;
    intype += document.getElementById("roadPosition").selectedIndex;
    intype += document.getElementById("trace").selectedIndex;
    var outype = "";
    let index = document.getElementById("sub_kinetic_menu").selectedIndex;
    let setid = document.getElementById("sub_kinetic_menu").options[index].value;
    $.get("/update_kinetic", {
        "KSETID": setid,
        "CONFIG": intype + "," + outype
    }, function (data) {
        console.log("更改模型：" + name + "位置");
    })
    alert(intype + "," + outype);
}

function explodeModelParam() {
    var intype = "";
    intype += document.getElementById("structure").selectedIndex;
    intype += document.getElementById("explodePosition").selectedIndex;
    intype += document.getElementById("type").selectedIndex;
    intype += document.getElementById("weight").selectedIndex;
    var outype = "";
    let index = document.getElementById("sub_kinetic_menu").selectedIndex;
    let setid = document.getElementById("sub_kinetic_menu").options[index].value;
    $.get("/update_kinetic", {
        "KSETID": setid,
        "CONFIG": intype + "," + outype
    }, function (data) {
        console.log("更改模型：" + name + "位置");
    })
    alert(intype + "," + outype);
}

function killModelParam() {
    var intype = "";
    intype += document.getElementById("criminal").selectedIndex;
    intype += document.getElementById("victim").selectedIndex;
    intype += document.getElementById("victim_posture").selectedIndex;
    intype += document.getElementById("criminal_posture").selectedIndex;
    intype += document.getElementById("knife").selectedIndex;
    intype += document.getElementById("environment").selectedIndex;
    intype += document.getElementById("wound").selectedIndex;
    var outype = "";
    let index = document.getElementById("sub_kinetic_menu").selectedIndex;
    let setid = document.getElementById("sub_kinetic_menu").options[index].value;
    $.get("/update_kinetic", {
        "KSETID": setid,
        "CONFIG": intype + "," + outype
    }, function (data) {
        console.log("更改模型：" + name + "位置");
    })
    alert(intype + "," + outype);
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
    select_scene(document.getElementById("case_event_name").selectedIndex);
    // show_tileset();
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

function modelParamterize() {
    console.log("选择索引" + document.getElementById("kinetic_model").selectedIndex);
    if (document.getElementById("kinetic_model").selectedIndex == 0 || document.getElementById("sub_kinetic_menu").selectedIndex == 0)
        alert("请选定模型的要素集");
    else {
        switch (document.getElementById("kinetic_model").selectedIndex) {
            case 1:
                document.getElementById('caseMenuShow').style.cssText = "display:block";
                break;
            case 2:
                document.getElementById('explodeMenuShow').style.cssText = "display:block";
                break;
            case 3:
                document.getElementById('collisionMenuShow').style.cssText = "display:block";
                break;
            case 4:
                document.getElementById('killMenuShow').style.cssText = "display:block";
                break;
            default:
                alert("请选定模型的要素集");
        }
    }
}

function modelConfiguration() {
    if (document.getElementById("kinetic_model").selectedIndex == 0 || document.getElementById("sub_kinetic_menu").selectedIndex == 0)
        alert("请选定模型的要素集");
    else {
        let index = document.getElementById("sub_kinetic_menu").selectedIndex;
        let setid = document.getElementById("sub_kinetic_menu").options[index].value;
        window.open(visualpage_addr + "createKineticModel.html?KSETID=" + setid, "show_element_info");//,
        //"height=500, width=1000, top=200, left=450, toolbar=no, menubar=no, directories=no, scrollbars=no, resizable=no, location=no, status=no");
    }
}

function killModelConfirm() {

}

function killModelClose() {
    cleanAll();
    $(".killMenuShow").eq(0).hide();
}

function modelModifyDone() {
    if (currentPickedObject == undefined) return;
    onSaveMarkThings(currentPickedObject.id);
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

function update_model_pos(position, entity) {
    var m = Cesium.Transforms.eastNorthUpToFixedFrame(position);
    /*const rx = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(originParam.rx)));
    const ry = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(originParam.ry)));
    const rz = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(originParam.rz)));
    m = Cesium.Matrix4.multiply(m, rx, m);
    m = Cesium.Matrix4.multiply(m, ry, m);
    m = Cesium.Matrix4.multiply(m, rz, m);*/
    const m1 = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(originParam.rx));
    Cesium.Matrix4.multiplyByMatrix3(m, m1, m);
    const m2 = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(originParam.ry));
    Cesium.Matrix4.multiplyByMatrix3(m, m2, m);
    const m3 = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(originParam.rz));
    Cesium.Matrix4.multiplyByMatrix3(m, m3, m);
    entity.modelMatrix = m.clone();
    originModelMadrix = entity.modelMatrix.clone();
    console.log(entity.modelMatrix.toString());
}

function update_model_hpr(entity) {
    Cesium.knockout.getObservable(viewModel, 'Enlarge').subscribe(function (Enlarge) {
        Enlarge = Number(Enlarge).toFixed(8);
        console.log(Enlarge);
        if (isNaN(Enlarge) || entity.id != currentPickedObject.id) {
            return;
        }
        entity.scale = originParam.scale * Math.pow(1.1, Enlarge);
    });

    Cesium.knockout.getObservable(viewModel, 'OffsetX').subscribe(function (OffsetX) {
        OffsetX = Number(OffsetX).toFixed(8);
        if (isNaN(OffsetX) || entity.id != currentPickedObject.id) {
            return;
        }
        extract_model_pos(entity, currentPos);
        const rect = new Cesium.Rectangle();
        viewer.camera.computeViewRectangle(viewer.scene.globe.ellipsoid, rect);
        const vx = (Cesium.Math.toDegrees(rect.east) - Cesium.Math.toDegrees(rect.west)) / 100;
        const x = currentPos.lng + vx * (OffsetX - originParam.lng);
        const position = Cesium.Cartesian3.fromDegrees(x, currentPos.lat, currentPos.height);
        update_model_pos(position, entity);
        originParam.lng = OffsetX;
    });

    Cesium.knockout.getObservable(viewModel, 'OffsetY').subscribe(function (OffsetY) {
        OffsetY = Number(OffsetY).toFixed(8);
        if (isNaN(OffsetY) || entity.id != currentPickedObject.id) {
            return;
        }
        extract_model_pos(entity, currentPos);
        const rect = new Cesium.Rectangle();
        viewer.camera.computeViewRectangle(viewer.scene.globe.ellipsoid, rect);
        const vy = (Cesium.Math.toDegrees(rect.north) - Cesium.Math.toDegrees(rect.south)) / 100;
        const y = currentPos.lat + vy * (OffsetY - originParam.lat);
        const position = Cesium.Cartesian3.fromDegrees(currentPos.lng, y, currentPos.height);
        update_model_pos(position, entity);
        originParam.lat = OffsetY;
    });

    Cesium.knockout.getObservable(viewModel, 'OffsetZ').subscribe(function (OffsetZ) {
        OffsetZ = Number(OffsetZ).toFixed(8);
        if (isNaN(OffsetZ) || entity.id != currentPickedObject.id) {
            return;
        }
        extract_model_pos(entity, currentPos);
        const rect = new Cesium.Rectangle();
        viewer.camera.computeViewRectangle(viewer.scene.globe.ellipsoid, rect);
        const vz = (viewer.scene.globe.ellipsoid.cartesianToCartographic(viewer.camera.position).height) / 100;
        const z = currentPos.height + vz * (OffsetZ - originParam.height);
        const position = Cesium.Cartesian3.fromDegrees(currentPos.lng, currentPos.lat, z);
        update_model_pos(position, entity);
        originParam.height = OffsetZ;
    });

    Cesium.knockout.getObservable(viewModel, 'RotateX').subscribe(function (RotateX) {
        RotateX = Number(RotateX).toFixed(8);
        if (isNaN(RotateX) || entity.id != currentPickedObject.id) {
            return;
        }
        extract_model_pos(entity, currentPos);
        originParam.rx = RotateX;
        const position = Cesium.Cartesian3.fromDegrees(currentPos.lng, currentPos.lat, currentPos.height);
        update_model_pos(position, entity);
    });

    Cesium.knockout.getObservable(viewModel, 'RotateY').subscribe(function (RotateY) {
        RotateY = Number(RotateY).toFixed(8);
        if (isNaN(RotateY) || entity.id != currentPickedObject.id) {
            return;
        }
        extract_model_pos(entity, currentPos);
        originParam.ry = RotateY;
        const position = Cesium.Cartesian3.fromDegrees(currentPos.lng, currentPos.lat, currentPos.height);
        update_model_pos(position, entity);
    });

    Cesium.knockout.getObservable(viewModel, 'RotateZ').subscribe(function (RotateZ) {
        RotateZ = Number(RotateZ).toFixed(8);
        if (isNaN(RotateZ) || entity.id != currentPickedObject.id) {
            return;
        }
        extract_model_pos(entity, currentPos);
        originParam.rz = RotateZ;
        const position = Cesium.Cartesian3.fromDegrees(currentPos.lng, currentPos.lat, currentPos.height);
        update_model_pos(position, entity);
    });//Sandcastle_End
    Sandcastle.finishedLoading();
}