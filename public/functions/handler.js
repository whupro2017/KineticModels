var operation_type;
var element_image = "cesium/images/left_foot.JPG";
var mark_color = Cesium.Color.WHITE;
var dataSourcePromise;

function timeFormat(date) {
    var y = date.getFullYear();
    var mon = date.getMonth() + 1;
    if (mon.toString().length == 1) {
        mon = "0" + mon;
    }
    ;
    var d = date.getDay();
    if (d.toString().length == 1) {
        d = "0" + d;
    }
    ;
    var h = date.getHours();
    if (h.toString().length == 1) {
        h = "0" + h;
    }
    ;
    var min = date.getMinutes();
    if (min.toString().length == 1) {
        min = "0" + min;
    }
    ;
    var s = date.getSeconds();
    if (s.toString().length == 1) {
        s = "0" + s;
    }
    ;
    var mytimes = y + "-" + mon + "-" + d + "T" + h + ":" + min + ":" + s + "Z";
    return mytimes;
}

var PolyLinePrimitive = (function () {
    function _(positions) {
        this.options = {
            id: "poly",
            allowPicking: false,
            polyline: {
                show: true,
                // positions : Cesium.Cartesian3.fromDegreesArray(positions),
                positions: positions,
                clampToGround: true,
                material: Cesium.Color.RED,
                width: 5,
                allowPicking: false,
            }
        };
        this.positions = positions;
        this._init();
    }

    _.prototype._init = function () {
        var _self = this;
        var _update = function () {
            return _self.positions;
        };
        //实时更新polyline.positions
        this.options.polyline.positions = new Cesium.CallbackProperty(_update, false);
        viewer.entities.add(this.options);
    };
    return _;
})();

var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
var positions = [];
var poly = undefined;
var a = 0;
var b = 0;
var time = "2018-07-19T15:18:00Z";
var endtime;

//设置鼠标左键点击事件
function onMarkElements(longitude, latitude, height) {
    // if ($("#elements").val() == "volvo") {
    //     alert("请先选择待绑定要素");
    // } else {
    //     console.log("选择待绑定要素:" + $("#elements").val());
    //     console.log(height);
    //     $.get("/element_location", {
    //         "longitude": longitude,
    //         "latitude": latitude,
    //         "height": height,
    //         "scene_id": $("#scene_id").val(),
    //         "element_type": $("#element_type").val(),
    //         "element_id": $("#elements").val(),
    //         "icon_path": element_image,
    //     }, function (data) {
    //         console.log(data, status);
    //         if (data.status == 1) {
    //             viewer.entities.add({
    //                 position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
    //                 billboard: {
    //                     image: element_image,
    //                     // heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    //                     // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    //                     scale: 0.2,
    //                     color: mark_color,
    //                     verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    //                     horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
    //                     disableDepthTestDistance: Number.POSITIVE_INFINITY
    //                 },
    //                 properties: {
    //                     type: "added",
    //                     element_type: $("#element_type").val(),
    //                     element_id: $("#elements").val(),
    //                 }
    //             });
    //             alert("标定要素位置 经度：" + longitude + ",维度：" + latitude + "，高程：" + height);
    //             operation_type == null;
    //         } else {
    //             alert("存入数据库出错，保存要素位置失败");
    //         }
    //     })
    // }
    console.log("选择待绑定要素:" + $("#elements").val());
    console.log(height);
    $.get("/element_location", {
        "longitude": longitude,
        "latitude": latitude,
        "height": height,
        "scene_id": $("#scene_id").val(),
        "element_type": activeObject.element_type,
        "element_id": activeObject.element_id,
        "icon_path": element_image,
    }, function (data) {
        console.log(data, status);
        if (data.status == 1) {
            viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
                billboard: {
                    image: element_image,
                    // heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
                    // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                    scale: 0.2,
                    color: mark_color,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                },
                properties: {
                    type: "added",
                    element_type: activeObject.element_type,
                    element_id: activeObject.element_id,
                }
            });
            alert("标定要素位置 经度：" + longitude + ",维度：" + latitude + "，高程：" + height);
            operation_type == null;
        } else {
            alert("存入数据库出错，保存要素位置失败");
        }
    })
}

function onSaveMarkThings(thing_mark_id) {
    let info = {"lng": -1, "lat": -1, "height": -1, "rx": -1, "ry": -1, "rz": -1};
    getInfoFromModelMatrix(currentPickedObject, info);
    $.get("/adjust_thing_location", {
        "longitude": info.lng,
        "latitude": info.lat,
        "height": info.height,
        "scale": currentPickedObject.scale,
        "rx": info.rx,
        "ry": info.ry,
        "rz": info.rz,
        "id": thing_mark_id
    }, function (data) {
        if (data.status == 1) {
            alert("成功保存标注：" + thing_mark_id + info.toString());
        }
    })
}

function onMarkThings(longitude, latitude, height, thing_mark_id) {
    $.get("/thing_location", {//to be done
        "longitude": longitude,
        "latitude": latitude,
        "height": height,
        // "heading": heading,
        // "pitch":pitch,
        // "roll":roll,
        "scene_id": $("#scene_id").val(),
        "thing_type": $("#thing_type").val(),
        "thing_id": $("#things").val(),
        "gltf_path": thing_gltf,
        "id": thing_mark_id
    }, function (data) {
        alert(data + "\n" + status);
        //console.log(data, status);
        if (data.status == 1) {

            var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
                Cesium.Cartesian3.fromDegrees(longitude, latitude, height)
            );
            console.log(thing_gltf)
            console.log(modelMatrix);
            var entity4 = viewer.scene.primitives.add(Cesium.Model.fromGltf({    //fromGltf方法：从Gltf资源加载模型
                    url: thing_gltf,
                    modelMatrix: modelMatrix,
                    // minimumPixelSize : 512,
                    scale: 10
                    // maximumScale : 200000
                })
            );
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, height + 200)
            });//初始视角

            update_model_hpr(entity4)

            alert("标定要素位置 经度：" + longitude + ",维度：" + latitude + "，高程：" + height);
            operation_type == null;
        } else {
            alert("存入数据库出错，保存要素位置失败");
        }
    })
    $.get('/thing_location_latest', {
        "scene_id": $("#scene_id").val(),
        "gltf_path": thing_gltf
    }, function (data) {
        alert(data)
        objectMap.set(id, {
            "scale": data[0].scale,
            "lng": data[0].start_lon,
            "lat": data[0].start_lat,
            "height": data[0].start_height,
            "rx": data[0].angle_lon,
            "ry": data[0].angle_lat,
            "rz": data[0].angle_height
        });
    })
}

function onLocateModel(longitude, latitude, height) {
    var url = "Files/" + $("#models").val();
    var name = $("#models").find("option:selected").text();
    alert("标定模型位置 经度：" + longitude + ",维度：" + latitude + "，高程：" + height + ", 模型：" + name);
    var x = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
        model: {
            uri: url,
            // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            scale: 0.1,
        },
        scale: .0,
        minimumPixelSize: 100,
        properties: {
            type: "added",
        }
    });
    operation_type = null;
    $.get("/model_location", {
        "longitude": longitude,
        "latitude": latitude,
        "height": height,
        "scene_id": $("#scene_id").val(),
        "model_name": name
    }, function (data) {
        console.log("更改模型：" + name + "位置");
    })
}

function onObjectPicking(longitude, latitude, height) {
    alert("需要指定当前操作类型，F10显示操作菜单后选取其中任意一个操作！");
}

function onDrawRoute(longitude, latitude, height, cartesianCoordinates) {
    // var ellipsoid = viewer.scene.globe.ellipsoid;
    // var cartographic = Cesium.Cartographic.fromDegrees(longitude, latitude, height);
    // var cartesian3 = ellipsoid.cartographicToCartesian(cartographic);
    if (cartesianCoordinates == undefined) {
        alert("Draw route without cartesianCoordinates");
        return;
    }
    if (positions.length == 0) {
        positions.push(cartesianCoordinates.clone());
    }
    positions.push(cartesianCoordinates);
    var date = new Date(2019, 2, 1, 15, b, a);
    time = timeFormat(date);
    endtime = time;
    dyn_czml[1].position.cartographicDegrees.push(time, longitude, latitude, height);
    if (a == 59) {
        a = 0;
        b += 1;
    } else {
        a += 2;
    }
}

function getInfoFromModelMatrix(entity, info) {
    const originCart3 = new Cesium.Cartesian3();
    Cesium.Matrix4.getTranslation(entity.modelMatrix, originCart3);
    const originCarto = Cesium.Cartographic.fromCartesian(originCart3);
    const lng = Cesium.Math.toDegrees(originCarto.longitude);
    const lat = Cesium.Math.toDegrees(originCarto.latitude);
    const height = originCarto.height;
    const position = Cesium.Cartesian3.fromDegrees(lng, lat, height);

    var m = Cesium.Transforms.eastNorthUpToFixedFrame(position);
    const m3 = Cesium.Matrix4.multiply(Cesium.Matrix4.inverse(m, new Cesium.Matrix4()), entity.modelMatrix, new Cesium.Matrix4());
    const mat3 = Cesium.Matrix4.getRotation(m3, new Cesium.Matrix3());
    const q = Cesium.Quaternion.fromRotationMatrix(mat3);
    const hpr = Cesium.HeadingPitchRoll.fromQuaternion(q);
    const heading = Cesium.Math.toDegrees(hpr.heading);
    const pitch = Cesium.Math.toDegrees(hpr.pitch);
    const roll = Cesium.Math.toDegrees(hpr.roll);
    info.lng = lng;
    info.lat = lat;
    info.height = height;
    info.rx = heading;
    info.ry = pitch;
    info.rz = roll;
}

function onAdjustModel(pick) {
    /*var windowPosition = viewer.camera.getPickRay(movement.position);
    var cartesianCoordinates = viewer.scene.globe.pick(windowPosition, viewer.scene);
    var pick = viewer.scene.pick(movement.position);
    // if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
    if (cartesianCoordinates != undefined) {
        if (Cesium.defined(pick)) {
            console.log("点击到物体");
            console.log(pick);
            cartesianCoordinates = viewer.scene.pickPosition(movement.position);
        } else {
            console.log("点击到地面");
        }
        var cartoCoordinates = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesianCoordinates);
        var longitude = Cesium.Math.toDegrees(cartoCoordinates.longitude);
        var latitude = Cesium.Math.toDegrees(cartoCoordinates.latitude);
        var height = cartoCoordinates.height;
        console.log("经度" + longitude + "纬度" + latitude + '高度：:' + height);
    }*/
    //var pick = viewer.scene.pick(movement.position);
    if (pick != undefined) {
        //pick.primitive.silhouetteColor = Cesium.Color.RED;
        //pick.primitive.silhouetteSize = 15.0;
        //entity3 = pick.primitive;
        console.log(pick.primitive.modelMatrix + "****" + pick.primitive);
        if (pick.primitive.modelMatrix == undefined) return;
        originModelMadrix = pick.primitive.modelMatrix.clone();
        originParam = {"scale": pick.primitive.scale, "lng": 0, "lat": 0, "height": 0, "rx": 0, "ry": 0, "rz": 0};
        if (originPickedObject != undefined) {
            originPickedObject.color = Cesium.Color.WHITE;
        }
        pick.primitive.color = Cesium.Color.RED;

        let info = {"lng": -1, "lat": -1, "height": -1, "rx": -1, "ry": -1, "rz": -1};
        getInfoFromModelMatrix(pick.primitive, info);

        // entity3为一个哑对象，这里为了调整viewModel的项
        currentPickedObject = entity3;
        Cesium.knockout.track(viewModel);
        viewModel.Enlarge = pick.primitive.scale;
        viewModel.OffsetX = info.lng - objectMap.get(pick.primitive.id).lng;
        viewModel.OffsetY = info.lat - objectMap.get(pick.primitive.id).lat;
        viewModel.OffsetZ = info.height - objectMap.get(pick.primitive.id).height;
        viewModel.RotateX = info.rx;
        viewModel.OffsetY = info.ry;
        viewModel.OffsetZ = info.rx;
        Cesium.knockout.track(viewModel);

        console.log(info);
        currentPickedObject = pick.primitive;
        /*$("#OffsetX").val(info.lng);
        $("#OffsetY").val(info.lat);
        $("#OffsetZ").val(info.height);
        $("#RotateX").val(info.rx);
        $("#RotateY").val(info.ry);
        $("#RotateZ").val(info.rz);*/
        update_model_hpr(pick.primitive);
        originPickedObject = pick.primitive;
    }
}

handler.setInputAction(function (movement) {
        var longitude;
        var latitude;
        var height;
        var heading = Cesium.Math.toRadians(0);
        var pitch = 0;
        var roll = 0;
        var thing_mark_id = 1;
        var windowPosition = viewer.camera.getPickRay(movement.position);
        var cartesianCoordinates = viewer.scene.globe.pick(windowPosition, viewer.scene);
        var pick = viewer.scene.pick(movement.position);
        // if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
        if (cartesianCoordinates != undefined) {
            if (Cesium.defined(pick)) {
                console.log("点击到物体");
                console.log(pick);
                cartesianCoordinates = viewer.scene.pickPosition(movement.position);
            } else {
                console.log("点击到地面");
            }
            var cartoCoordinates = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesianCoordinates);
            longitude = Cesium.Math.toDegrees(cartoCoordinates.longitude);
            latitude = Cesium.Math.toDegrees(cartoCoordinates.latitude);
            height = cartoCoordinates.height;
            console.log("经度" + longitude + "纬度" + latitude + '高度：:' + height);
        }
        switch (operation_type) {
            case "mark_elements":
                onMarkElements(longitude, latitude, height);
                break;
            case "mark_things":
                onMarkThings(longitude, latitude, height, thing_mark_id);
                break;
            case "drawRoute":
                onDrawRoute(longitude, latitude, height, cartesianCoordinates);
                break;
            case "locate_model":
                onLocateModel(longitude, latitude, height);
                break;
            case "adjust_model":
                onAdjustModel(pick);
                break;
            case "toolbar_measure":
                break;
            case "display_selected":
            default:
                onObjectPicking(longitude, latitude, height);
                break;
        }
    },
    Cesium.ScreenSpaceEventType.LEFT_CLICK
)
//设置鼠标移动事件
handler.setInputAction(function (movement) {
    if (operation_type == "drawRoute") {
        var longitude;
        var latitude;
        var height;
        var windowPosition = viewer.camera.getPickRay(movement.endPosition);
        // var cartesianCoordinates= viewer.scene.pickPosition(movement.endPosition);
        var cartesianCoordinates = viewer.scene.globe.pick(windowPosition, viewer.scene);
        var pick = viewer.scene.pick(movement.endPosition);
        if (cartesianCoordinates != undefined) {
            if (Cesium.defined(pick)) {
                cartesianCoordinates = viewer.scene.pickPosition(movement.endPosition);
            }
            var cartoCoordinates = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesianCoordinates);
            longitude = Cesium.Math.toDegrees(cartoCoordinates.longitude);
            latitude = Cesium.Math.toDegrees(cartoCoordinates.latitude);
            height = cartoCoordinates.height;
            // console.log(longitude + "/" + latitude + '/' + height);
            if (positions.length >= 2) {
                if (!Cesium.defined(poly)) {
                    poly = new PolyLinePrimitive(positions);
                    console.log("开始划线");

                } else {
                    positions.pop();
                    positions.push(cartesianCoordinates);
                }
            }
        }
    }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

handler.setInputAction(function (movement) {
        var pick = viewer.scene.pick(movement.position);
        if (Cesium.defined(pick) && pick.id != undefined && pick.id.properties != undefined && pick.id.properties.type.toString() == "added") {
            console.log("点击到物体");
            var element_type = pick.id.properties._element_type._value;
            var element_id = pick.id.properties._element_id._value;
            $("#element_type").val(element_type);
            $("#elements").append('<option value=' + element_id + ' > 序号' + element_id + '</option>');
            $("#elements").val(element_id);
            console.log($("#element_type").val());
            console.log($("#elements").val());
            var menu = document.getElementById("menu");
            menu.style.left = movement.position.x + 'px';
            menu.style.top = movement.position.y + 'px';
            menu.style.width = '125px';
            // window.oncontextmenu = function (e) {
            //     e.preventDefault();
            // }
            // var menu = document.querySelector("#menu");
            // menu.style.left = movement.position.x + 'px';
            // menu.style.top = movement.position.y + 'px';
            // menu.style.width = '125px';
            // window.onclick = function (e) {
            //     document.querySelector('#menu').style.width = 0;
            // }
        }
        if (operation_type == "mark_elements") {
            operation_type = null;
        }
        if (operation_type == "drawRoute") {
            if (positions.length != 0) {
                positions.pop();
                dyn_czml[0].clock.interval = dyn_czml[0].clock.interval + endtime;
                console.log(dyn_czml[0].clock.interval);
                startDynRoute(dyn_czml);
                operation_type = null;
            }
        }
    },
    Cesium.ScreenSpaceEventType.RIGHT_CLICK
)
;
//设置鼠标左键双击事件
handler.setInputAction(function (movement) {
    if (operation_type == "drawRoute") {
        positions.pop();
        positions = [];
        operation_type = null;
    }

}, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);