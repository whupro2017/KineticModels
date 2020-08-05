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
        "scene_id": currentSceneId, //$("#scene_id").val(),
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
    console.log(cartesianCoordinates.toString());
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
};
// Left click event can support marking mark_goods/involved_goods_info/burning_element
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
);
// Draw trajectory incrementally.
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
// Dummy operation with clicked objects informed as a possible menu..
handler.setInputAction(function (movement) {
        var pick = viewer.scene.pick(movement.position);
        console.log("Right click")
        if (Cesium.defined(pick) && pick.id != undefined && pick.id.properties != undefined && pick.id.properties.type.toString() == "added") {
            console.log("点击到物体");
            var element_type = pick.id.properties.element_type._value;
            var element_id = pick.id.properties.element_id._value;
            $("#elements").append('<option value=' + element_id + ' > 序号' + element_id + '</option>');
            console.log($("#elements").toString());
            activeObject.element_type = element_type;
            activeObject.element_id = element_id;
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
        // anshun disabled
        /*if (operation_type == "drawRoute") {
            if (positions.length != 0) {
                positions.pop();
                dyn_czml[0].clock.interval = dyn_czml[0].clock.interval + endtime;
                console.log(dyn_czml[0].clock.interval);
                startDynRoute(dyn_czml);
                operation_type = null;
            }
        } else*/
        if (operation_type == "drawRoute") {
            const input = [
                /*{"lon":105.92575,"lat":26.2586},
                {"lon":105.92575,"lat":26.2586},
                {"lon":105.92575,"lat":26.2586},
                {"lon":105.92575,"lat":26.2586},
                {"lon":105.92575,"lat":26.2586},
                {"lon":105.92575,"lat":26.2586},
                {"lon":105.92575,"lat":26.2586},
                {"lon":105.92575,"lat":26.2586},
                {"lon":105.92575,"lat":26.2586},
                {"lon":105.92575,"lat":26.2586},
                {"lon":105.92575,"lat":26.2586},
                {"lon":105.92575,"lat":26.2586},
                {"lon":105.92575944444444,"lat":26.25859888888889},
                {"lon":105.92576888888888,"lat":26.25859777777778},
                {"lon":105.92577833333333,"lat":26.25859666666667},
                {"lon":105.92578777777777,"lat":26.258595555555555},
                {"lon":105.92579722222222,"lat":26.258594444444444},
                {"lon":105.92580666666666,"lat":26.258593333333334},
                {"lon":105.9258161111111,"lat":26.258592222222223},
                {"lon":105.92582555555555,"lat":26.258591111111112},
                {"lon":105.92583499999999,"lat":26.25859},
                {"lon":105.92584444444444,"lat":26.25858888888889},
                {"lon":105.92585388888888,"lat":26.25858777777778},
                {"lon":105.92586333333333,"lat":26.258586666666666},
                {"lon":105.92587277777777,"lat":26.258585555555555},
                {"lon":105.92588222222221,"lat":26.258584444444445},
                {"lon":105.92589166666667,"lat":26.258583333333334},
                {"lon":105.92590111111112,"lat":26.258582222222223},
                {"lon":105.92591055555556,"lat":26.258581111111113},
                {"lon":105.92592,"lat":26.258580000000002},
                {"lon":105.92592944444445,"lat":26.258578888888888},
                {"lon":105.9259388888889,"lat":26.258577777777777},
                {"lon":105.92594833333334,"lat":26.258576666666666},
                {"lon":105.92595777777778,"lat":26.258575555555556},
                {"lon":105.92596722222223,"lat":26.258574444444445},
                {"lon":105.92597666666667,"lat":26.258573333333334},
                {"lon":105.92598611111111,"lat":26.258572222222224},
                {"lon":105.92599555555556,"lat":26.258571111111113},
                {"lon":105.926005,"lat":26.25857},
                {"lon":105.92601444444445,"lat":26.258568888888888},
                {"lon":105.92602388888889,"lat":26.258567777777778},
                {"lon":105.92603333333334,"lat":26.258566666666667},
                {"lon":105.92603555555556,"lat":26.25856611111111},
                {"lon":105.92603777777778,"lat":26.258565555555556},
                {"lon":105.92604,"lat":26.258565},
                {"lon":105.92604222222222,"lat":26.258564444444445},
                {"lon":105.92604444444444,"lat":26.25856388888889},
                {"lon":105.92604666666666,"lat":26.258563333333335},
                {"lon":105.92604888888889,"lat":26.25856277777778},
                {"lon":105.92605111111112,"lat":26.25856222222222},
                {"lon":105.92605333333334,"lat":26.258561666666665},
                {"lon":105.92605555555556,"lat":26.25856111111111},
                {"lon":105.92605777777779,"lat":26.258560555555555},
                {"lon":105.92606,"lat":26.25856},
                {"lon":105.92606222222223,"lat":26.258559444444444},
                {"lon":105.92606444444445,"lat":26.25855888888889},
                {"lon":105.92606666666667,"lat":26.258558333333333},
                {"lon":105.92606888888889,"lat":26.258557777777778},
                {"lon":105.92607111111111,"lat":26.258557222222223},
                {"lon":105.92607333333333,"lat":26.258556666666667},
                {"lon":105.92607555555556,"lat":26.258556111111112},
                {"lon":105.92607777777778,"lat":26.258555555555557},
                {"lon":105.92608,"lat":26.258555},
                {"lon":105.92608222222222,"lat":26.258554444444446},
                {"lon":105.92608444444446,"lat":26.258553888888887},
                {"lon":105.92608666666668,"lat":26.25855333333333},
                {"lon":105.9260888888889,"lat":26.258552777777776},
                {"lon":105.92609111111112,"lat":26.25855222222222},
                {"lon":105.92609333333334,"lat":26.258551666666666},
                {"lon":105.92609555555556,"lat":26.25855111111111},
                {"lon":105.92609777777778,"lat":26.258550555555555},
                {"lon":105.9261,"lat":26.25855},
                {"lon":105.92611197916668,"lat":26.258546875},
                {"lon":105.92612395833333,"lat":26.25854375},
                {"lon":105.9261359375,"lat":26.258540625},
                {"lon":105.92614791666668,"lat":26.2585375},
                {"lon":105.92615989583334,"lat":26.258534375},
                {"lon":105.92617187500001,"lat":26.25853125},
                {"lon":105.92618385416667,"lat":26.258528124999998},
                {"lon":105.92619583333334,"lat":26.258525},
                {"lon":105.92620781250001,"lat":26.258521875},
                {"lon":105.92621979166667,"lat":26.25851875},
                {"lon":105.92623177083334,"lat":26.258515625},
                {"lon":105.92624375,"lat":26.2585125},
                {"lon":105.92625572916667,"lat":26.258509375},
                {"lon":105.92626770833334,"lat":26.25850625},
                {"lon":105.9262796875,"lat":26.258503125},
                {"lon":105.92629166666667,"lat":26.258499999999998},
                {"lon":105.92630364583334,"lat":26.258496875},
                {"lon":105.926315625,"lat":26.25849375},
                {"lon":105.92632760416667,"lat":26.258490625},
                {"lon":105.92633958333334,"lat":26.2584875},
                {"lon":105.9263515625,"lat":26.258484375},
                {"lon":105.92636354166667,"lat":26.25848125},
                {"lon":105.92637552083333,"lat":26.258478125},
                {"lon":105.9263875,"lat":26.258475},
                {"lon":105.92639947916668,"lat":26.258471875},
                {"lon":105.92641145833333,"lat":26.25846875},
                {"lon":105.9264234375,"lat":26.258465625},
                {"lon":105.92643541666666,"lat":26.2584625},
                {"lon":105.92644739583334,"lat":26.258459375},
                {"lon":105.92645937500001,"lat":26.25845625},
                {"lon":105.92647135416667,"lat":26.258453125},
                {"lon":105.92648333333334,"lat":26.25845},
                {"lon":105.9265513888889,"lat":26.25842777777778},
                {"lon":105.92661944444444,"lat":26.258405555555555},
                {"lon":105.9266875,"lat":26.258383333333335},
                {"lon":105.92675555555556,"lat":26.25836111111111},
                {"lon":105.92682361111112,"lat":26.25833888888889},
                {"lon":105.92689166666668,"lat":26.258316666666666},
                {"lon":105.92695972222222,"lat":26.258294444444445},
                {"lon":105.92702777777778,"lat":26.258272222222224},
                {"lon":105.92709583333334,"lat":26.25825},
                {"lon":105.92716388888888,"lat":26.25822777777778},
                {"lon":105.92723194444444,"lat":26.258205555555556},
                {"lon":105.9273,"lat":26.258183333333335},
                {"lon":105.92737333333334,"lat":26.258152222222225},
                {"lon":105.92744666666667,"lat":26.258121111111112},
                {"lon":105.92752,"lat":26.258090000000003},
                {"lon":105.92759333333333,"lat":26.25805888888889},
                {"lon":105.92766666666667,"lat":26.25802777777778},
                {"lon":105.92774,"lat":26.257996666666667},
                {"lon":105.92781333333333,"lat":26.257965555555558},
                {"lon":105.92788666666667,"lat":26.257934444444444},
                {"lon":105.92796,"lat":26.257903333333335},
                {"lon":105.92803333333333,"lat":26.257872222222222},
                {"lon":105.92810666666666,"lat":26.257841111111112},
                {"lon":105.92818,"lat":26.25781},
                {"lon":105.92825333333333,"lat":26.25777888888889},
                {"lon":105.92832666666666,"lat":26.257747777777777},
                {"lon":105.9284,"lat":26.257716666666667},
                {"lon":105.9284717948718,"lat":26.25768717948718},
                {"lon":105.92854358974358,"lat":26.257657692307692},
                {"lon":105.92861538461538,"lat":26.257628205128206},
                {"lon":105.92868717948717,"lat":26.257598717948717},
                {"lon":105.92875897435897,"lat":26.25756923076923},
                {"lon":105.92883076923077,"lat":26.257539743589742},
                {"lon":105.92890256410256,"lat":26.257510256410256},
                {"lon":105.92897435897436,"lat":26.257480769230767},
                {"lon":105.92904615384616,"lat":26.25745128205128},
                {"lon":105.92911794871794,"lat":26.257421794871792},
                {"lon":105.92918974358975,"lat":26.257392307692307},
                {"lon":105.92926153846153,"lat":26.257362820512817},
                {"lon":105.92933333333333,"lat":26.25733333333333},
                {"lon":105.92937948717949,"lat":26.25729358974359},
                {"lon":105.92942564102565,"lat":26.257253846153844},
                {"lon":105.9294717948718,"lat":26.257214102564102},
                {"lon":105.92951794871794,"lat":26.257174358974357},
                {"lon":105.9295641025641,"lat":26.257134615384615},
                {"lon":105.92961025641026,"lat":26.25709487179487},
                {"lon":105.92965641025641,"lat":26.257055128205128},
                {"lon":105.92970256410257,"lat":26.257015384615382},
                {"lon":105.92974871794873,"lat":26.25697564102564},
                {"lon":105.92979487179487,"lat":26.256935897435895},
                {"lon":105.92984102564102,"lat":26.256896153846153},
                {"lon":105.92988717948718,"lat":26.256856410256407},
                {"lon":105.92993333333334,"lat":26.256816666666666},
                {"lon":105.9299888888889,"lat":26.25676111148148},
                {"lon":105.93004444444445,"lat":26.256705556296296},
                {"lon":105.93010000000001,"lat":26.25665000111111},
                {"lon":105.93015555555556,"lat":26.256594445925927},
                {"lon":105.93021111111112,"lat":26.25653889074074},
                {"lon":105.93026666666667,"lat":26.256483335555554},
                {"lon":105.93032222222223,"lat":26.25642778037037},
                {"lon":105.93037777777778,"lat":26.256372225185185},
                {"lon":105.93043333333334,"lat":26.25631667},
                {"lon":105.9304880952381,"lat":26.256267860238097},
                {"lon":105.93054285714287,"lat":26.25621905047619},
                {"lon":105.93059761904763,"lat":26.256170240714287},
                {"lon":105.93065238095238,"lat":26.25612143095238},
                {"lon":105.93070714285714,"lat":26.256072621190476},
                {"lon":105.93076190476191,"lat":26.25602381142857},
                {"lon":105.93081666666667,"lat":26.255975001666666},
                {"lon":105.93087142857144,"lat":26.255926191904763},
                {"lon":105.9309261904762,"lat":26.255877382142856},
                {"lon":105.93098095238096,"lat":26.255828572380953},
                {"lon":105.93103571428571,"lat":26.255779762619046},
                {"lon":105.93109047619048,"lat":26.255730952857142},
                {"lon":105.93114523809524,"lat":26.255682143095235},
                {"lon":105.9312,"lat":26.255633333333332},
                {"lon":105.93121785714285,"lat":26.255616666666665},
                {"lon":105.93123571428572,"lat":26.255599999999998},
                {"lon":105.93125357142857,"lat":26.255583333333334},
                {"lon":105.93127142857143,"lat":26.255566666666667},
                {"lon":105.93128928571429,"lat":26.25555},
                {"lon":105.93130714285715,"lat":26.255533333333332},*/
                /*{"lon":105.931325,"lat":26.255516666666665},
                {"lon":105.93134285714285,"lat":26.2555},
                {"lon":105.93136071428572,"lat":26.255483333333334},
                {"lon":105.93137857142857,"lat":26.255466666666667},
                {"lon":105.93139642857143,"lat":26.25545},
                {"lon":105.93141428571428,"lat":26.255433333333336},
                {"lon":105.93143214285715,"lat":26.25541666666667},
                {"lon":105.93145,"lat":26.2554},
                {"lon":105.93149696969697,"lat":26.255359090909092},
                {"lon":105.93154393939393,"lat":26.255318181818183},
                {"lon":105.93159090909091,"lat":26.255277272727273},
                {"lon":105.93163787878788,"lat":26.255236363636364},*/
                {"lon": 105.93168484848485, "lat": 26.255195454545454},
                {"lon": 105.93173181818182, "lat": 26.25515454545455},
                {"lon": 105.93177878787878, "lat": 26.25511363636364},
                {"lon": 105.93182575757575, "lat": 26.25507272727273},
                {"lon": 105.93187272727273, "lat": 26.25503181818182},
                {"lon": 105.9319196969697, "lat": 26.25499090909091},
                {"lon": 105.93196666666667, "lat": 26.25495},
                {"lon": 105.93206666666667, "lat": 26.254883333333332},
                {"lon": 105.93216666666666, "lat": 26.254816666666667},
                {"lon": 105.93226666666666, "lat": 26.2548},
                {"lon": 105.93236666666667, "lat": 26.254808333333333},
                {"lon": 105.93246666666667, "lat": 26.254816666666667},
                {"lon": 105.93256666666667, "lat": 26.254825},
                {"lon": 105.93266666666668, "lat": 26.254833333333334}/*,
                {"lon":105.93276666666668,"lat":26.254841666666668},
                {"lon":105.93286666666668,"lat":26.25485},
                {"lon":105.93296666666669,"lat":26.254858333333335},
                {"lon":105.93306666666669,"lat":26.25486666666667},
                {"lon":105.9331666666667,"lat":26.254875000000002}*/];
            for (var idx = 0; idx < input.length; idx++) {
                var pos = input[idx];
                positions.push(Cesium.Cartesian3.fromDegrees(pos.lon, pos.lat, 0));
                var date = new Date(2019, 2, 1, 15, b, a);
                time = timeFormat(date);
                var cartoCoordinates = viewer.scene.globe.ellipsoid.cartesianToCartographic(Cesium.Cartesian3.fromDegrees(pos.lon, pos.lat, 0));
                const longitude = Cesium.Math.toDegrees(cartoCoordinates.longitude);
                const latitude = Cesium.Math.toDegrees(cartoCoordinates.latitude);
                const height = cartoCoordinates.height;
                endtime = time;
                dyn_czml[1].position.cartographicDegrees.push(time, longitude, latitude, height);
                if (a == 59) {
                    a = 0;
                    b += 1;
                } else {
                    a += 2;
                }
                console.log(pos.lon + ", " + pos.lat + ", " + 15, +"|" + longitude + "," + latitude + ", " + height);
            }

            positions.pop();
            dyn_czml[0].clock.interval = dyn_czml[0].clock.interval + endtime;
            console.log(dyn_czml[0].clock.interval);
            startDynRoute(dyn_czml);
            operation_type = null;
        }
    },
    Cesium.ScreenSpaceEventType.RIGHT_CLICK
);
//设置鼠标左键双击事件
handler.setInputAction(function (movement) {
    if (operation_type == "drawRoute") {
        positions.pop();
        positions = [];
        operation_type = null;
    }

}, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);