//模型取点
function siteModelTake(str1, str2, str3) {
    cleanAll();
    viewer.entities.removeById("take2");
    $('.Sdirection').unbind();
    $('.Sproportion').unbind();
    $('.Slongitude').unbind();
    $('.Slatitude').unbind();
    $('.Sheight').unbind();
    $('.dropdownMenu').unbind();

    $('.Sdirection1').unbind();
    $('.Sproportion1').unbind();
    $('.Slongitude1').unbind();
    $('.Slatitude1').unbind();
    $('.Sheight1').unbind();
    $('.dropdownMenu1').unbind();
    if ($(".Smodel").eq(0).css("display") == "block") {
        var url = $(".dropdownMenu").eq(0).val();
        var direction = $(".Sdirection").eq(0).val();
        var proportion = $(".Sproportion").eq(0).val();
    } else if ($(".Smodel1").eq(0).css("display") == "block") {
        var url = $(".dropdownMenu1").eq(0).val();
        var direction = $(".Sdirection1").eq(0).val();
        var proportion = $(".Sproportion1").eq(0).val();
    }
    sitetake = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    sitetake.setInputAction(function(evt) {
        sitetakeSH = true;
        var scene = viewer.scene;
        if (scene.mode !== Cesium.SceneMode.MORPHING) {
            var pickedObject = scene.pick(evt.position);
            if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
                var cartesian = viewer.scene.pickPosition(evt.position);
                console.log(cartesian)
                if (Cesium.defined(cartesian)) {
                    var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                    var lng = Cesium.Math.toDegrees(cartographic.longitude);
                    var lat = Cesium.Math.toDegrees(cartographic.latitude);
                    var height = cartographic.height; //模型高度  
                    $(str1).eq(0).val(lng)
                    $(str2).eq(0).val(lat)
                    $(str3).eq(0).val(height)
                    cleanModel();
                    // viewer.selectedEntity = null; //清除右键事
                    var position = Cesium.Cartesian3.fromDegrees(lng, lat, height);
                    var hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(direction), Cesium.Math.toRadians(90), Cesium.Math.toRadians(-0));
                    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
                    var entity = viewer.entities.add({
                        id: "take2",
                        position: position,
                        orientation: orientation,
                        model: {
                            uri: url,
                            heightReference: Cesium.HeightReference.NONE,
                            scale: proportion,
                            show: true
                        }
                    });
                    //监听添加模型取点时的变化
                    $('.Sdirection').on('input', function(e) {
                        hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians($(".Sdirection").eq(0).val()), Cesium.Math.toRadians(90), Cesium.Math.toRadians(-0));
                        orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
                        entity.orientation = orientation;
                    });
                    $('.Sproportion').on('input', function(e) {
                        entity.model.scale = $(".Sproportion").eq(0).val();
                    });
                    $('.Slongitude').on('input', function(e) {
                        hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians($(".Sdirection").eq(0).val()), Cesium.Math.toRadians(90), Cesium.Math.toRadians(-0));
                        position = Cesium.Cartesian3.fromDegrees($('.Slongitude').eq(0).val(), $('.Slatitude').eq(0).val(), $('.Sheight').eq(0).val());
                        orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
                        entity.position = [];
                        entity.position = position;
                        //entity.orientation = orientation
                    });
                    $('.Slatitude').on('input', function(e) {
                        hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians($(".Sdirection").eq(0).val()), Cesium.Math.toRadians(90), Cesium.Math.toRadians(-0));
                        position = Cesium.Cartesian3.fromDegrees($('.Slongitude').eq(0).val(), $('.Slatitude').eq(0).val(), $('.Sheight').eq(0).val());
                        orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
                        entity.position = [];
                        entity.position = position;
                        entity.orientation = orientation;
                    });
                    $('.Sheight').on('input', function(e) {
                        hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians($(".Sdirection").eq(0).val()), Cesium.Math.toRadians(90), Cesium.Math.toRadians(-0));
                        position = Cesium.Cartesian3.fromDegrees($('.Slongitude').eq(0).val(), $('.Slatitude').eq(0).val(), $('.Sheight').eq(0).val());
                        orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
                        entity.position = [];
                        entity.position = position;
                        entity.orientation = orientation;
                    });
                    $('.dropdownMenu').change(function() {
                        entity.model.uri = $('.dropdownMenu').eq(0).val()
                    })

                    //监听编辑取点时值的变化
                    $('.Sdirection1').on('input', function(e) {
                        hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians($(".Sdirection1").eq(0).val()), Cesium.Math.toRadians(90), Cesium.Math.toRadians(-0));
                        orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
                        entity.orientation = orientation;
                    });
                    $('.Sproportion1').on('input', function(e) {
                        entity.model.scale = $(".Sproportion1").eq(0).val();
                    });
                    $('.Slongitude1').on('input', function(e) {
                        hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians($(".Sdirection1").eq(0).val()), Cesium.Math.toRadians(90), Cesium.Math.toRadians(-0));
                        position = Cesium.Cartesian3.fromDegrees($('.Slongitude1').eq(0).val(), $('.Slatitude1').eq(0).val(), $('.Sheight1').eq(0).val());
                        orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
                        entity.position = [];
                        entity.position = position;
                        entity.orientation = orientation
                    });
                    $('.Slatitude1').on('input', function(e) {
                        hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians($(".Sdirection1").eq(0).val()), Cesium.Math.toRadians(90), Cesium.Math.toRadians(-0));
                        position = Cesium.Cartesian3.fromDegrees($('.Slongitude1').eq(0).val(), $('.Slatitude1').eq(0).val(), $('.Sheight1').eq(0).val());
                        orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
                        entity.position = [];
                        entity.position = position;
                        entity.orientation = orientation;
                    });
                    $('.Sheight1').on('input', function(e) {
                        hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians($(".Sdirection1").eq(0).val()), Cesium.Math.toRadians(90), Cesium.Math.toRadians(-0));
                        position = Cesium.Cartesian3.fromDegrees($('.Slongitude1').eq(0).val(), $('.Slatitude1').eq(0).val(), $('.Sheight1').eq(0).val());
                        orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
                        entity.position = [];
                        entity.position = position;
                        entity.orientation = orientation;
                    });
                    $('.dropdownMenu1').change(function() {
                        entity.model.uri = $('.dropdownMenu1').eq(0).val();
                    })
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);



}


//清除模型取点左击
function cleanModelTake() {
    if (sitetakeSH) {
        sitetake.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        sitetakeSH = false;
    }

}
//清除取点时添加的模型
function cleanModel() {
    var viewerid = viewer.entities.getById("take2");
    if (viewerid) {
        viewer.entities.removeById("take2");
    }
}



//模型添加功能
function addModelInfo() {
    cleanAll();
    var name = $(".Sname").eq(0).val();
    var Slongitude = $(".Slongitude").eq(0).val();
    var Slatitude = $(".Slatitude").eq(0).val();
    var Sheight = $(".Sheight").eq(0).val();
    var Sdirection = $(".Sdirection").eq(0).val();
    var Sproportion = $(".Sproportion").eq(0).val();
    var modelUrl = $(".dropdownMenu").val();
    var id = $(".planOption").val();
    if (!name) {
        $.Pro('名称不能为空！', {
            BoxBgopacity: .8
        })
    } else if (!Slongitude) {
        $.Pro('经度不能为空！', {
            BoxBgopacity: .8
        })
    } else if (!Slatitude) {
        $.Pro('纬度不能为空！', {
            BoxBgopacity: .8
        })
    } else if (!Sheight) {
        $.Pro('高度不能为空！', {
            BoxBgopacity: .8
        })
    } else if (!Sdirection) {
        $.Pro('方向不能为空！', {
            BoxBgopacity: .8
        })
    } else if (!Sproportion) {
        $.Pro('比例不能为空！', {
            BoxBgopacity: .8
        })
    } else {
        addmodelinfosql(id, name, Slongitude, Slatitude, Sheight, Sdirection, Sproportion, modelUrl)
        addmodel(Math.random(), name, Slongitude, Slatitude, Sheight, Sdirection, Sproportion, modelUrl)

    }
}

//添加实体车模型
function addmodel(id, name, longitude, latitude, height, direction, proportion, modelUrl) {
    cleanModel();

    var position = Cesium.Cartesian3.fromDegrees(longitude * 1, latitude * 1, height * 1);
    var hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(direction), Cesium.Math.toRadians(90), 0);
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
    var entity = viewer.entities.add({
        id: id,
        name: name,
        position: position,
        orientation: orientation,
        model: {
            uri: modelUrl,
            heightReference: Cesium.HeightReference.NONE,
            scale: proportion,
            show: true
        }
    });
    $.Pro('添加成功！', {
        BoxBgopacity: .8
    })

}


//将模型信息添加至数据库中
function addmodelinfosql(id, mname, Slongitude, Slatitude, Sheight, Sdirection, Sproportion, modelUrl) {
    // // obj.bridgeID = bridgeID;
    // $.post(configUrl + "addmodelinfo", {
    //         planID: id,
    //         name: mname,
    //         longitude: Slongitude,
    //         latitude: Slatitude,
    //         height: Sheight,
    //         direction: Sdirection,
    //         proportion: Sproportion,
    //         modelUrl: modelUrl
    //     },
    //     function(data, status) {
    //         if (data == 1) {
    //             $.Pro('添加成功！', {
    //                     BoxBgopacity: .8
    //                 })
    //                 //$.Pop('提示', '添加成功！', 'alert')
    //         } else {
    //             $.Pro('添加失败！', {
    //                 BoxBgopacity: .8
    //             })
    //         }
    //     });
}

function stopModel() {
    cleanModel();
    $(".Smodel").eq(0).hide();

}