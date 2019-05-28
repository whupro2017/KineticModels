function cleanAll() {
    cleanHeightLine(); //清除高度量测
    cleanDistanceHandler(); //清除距离量测
    cleanAreaHandler(); //清除面积量测
    cleanPickMouseMove();
}

function stopMeasure() {
    cleanAll();
    $(".toolbar_measure").eq(0).hide();

}
var leftMenu = document.getElementById("modelInfo");

var scene = viewer.scene;

var ellipsoid = scene.globe.ellipsoid;
var entity;
var newPolygon;
var newOutline;
var canvas = document.getElementById("canvas");
var setBaseHeight = 5;


//高度测量
var heightWall = viewer.entities.add({
    id: "heightLine",
    polyline: {
        positions: [],
        width: 3,
        outlineWidth: 2,
        show: true,
        material: Cesium.Color.YELLOW.withAlpha(0.5),
    }
});
var circle = viewer.entities.add({
    id: "1c",
    position: { x: -2253465.321794585, y: 5008236.223461948, z: 3232784.551347762 },
    name: 'Circle',
    ellipse: {
        semiMinorAxis: 0,
        semiMajorAxis: 0,
        height: 0.0,
        material: Cesium.Color.YELLOW.withAlpha(0.1),
        outline: true, // height must be set for outline to display
        outlineColor: Cesium.Color.YELLOW.withAlpha(0.5)
    }
});

var Mheight;
var heightArray = [];
var heightArray1 = [];
var heightLineSH = false;
var circleSF = false;
var newlist = [];
var json = [];
var heightHandler;
//高度量测
function heightMeasuring() {
    $.Pro('请左键单击选择需要量测的两个点的高度差，取两个点后将自动计算！', { BoxBgopacity: .8 });
    cleanAll();
    heightLineSH = true;
    heightHandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    heightHandler.setInputAction(function(evt) {
        var scene = viewer.scene;
        if (scene.mode !== Cesium.SceneMode.MORPHING) {
            var pickedObject = scene.pick(evt.position);
            if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
                var cartesian = viewer.scene.pickPosition(evt.position);
                if (Cesium.defined(cartesian)) {
                    var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                    heightArray.push(cartesian);
                    newlist.push(cartesian);
                    heightArray1.push(cartographic);
                    heightWall.polyline.positions = newlist;

                    if (heightArray1.length == 2) {
                        circleSF = true;
                        var distance = Cesium.Cartesian3.distance(newlist[2], newlist[1]);
                        var xx = Cesium.Cartesian3.fromDegrees(-111.0, 40.0, 150000.0);
                        circle.position = newlist[1];
                        circle.ellipse.semiMinorAxis = distance;
                        circle.ellipse.semiMajorAxis = distance;
                        circle.ellipse.height = cartographic.height;
                        heightHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
                        heightHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                        var heightVal = heightArray1[1].height - heightArray1[0].height;
                        $.Pop('高度', `测量的高度为：${heightVal.toFixed(2)}米`, 'alert');
                    }
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    heightHandler.setInputAction(function(movement) {
        if (scene.mode !== Cesium.SceneMode.MORPHING) {
            var pickedObject = scene.pick(movement.endPosition);
            if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
                var cartesian = viewer.scene.pickPosition(movement.endPosition);
                if (Cesium.defined(cartesian)) {

                    if (heightArray.length >= 1) {
                        heightWall.polyline.positions = new Cesium.CallbackProperty(function() {
                            if (newlist.length == heightArray.length + 1) {
                                var aa = Cesium.Cartographic.fromCartesian(cartesian);
                                var bb = Cesium.Cartographic.fromCartesian(newlist[0]);
                                bb.height = aa.height;
                                var cartesian3 = ellipsoid.cartographicToCartesian(bb);
                                newlist.pop();
                                newlist.push(cartesian3);
                            }
                            if (newlist.length != heightArray.length + 1) {
                                newlist.push(cartesian);
                            }
                            return newlist;
                        }, false);
                        circle.position = new Cesium.CallbackProperty(function() {
                            var aa = Cesium.Cartographic.fromCartesian(cartesian); //第二个点
                            var bb = Cesium.Cartographic.fromCartesian(newlist[0]); //第一个点
                            var cc = JSON.stringify(bb); //第三个点
                            cc = JSON.parse(cc);
                            cc.height = aa.height;
                            var cartesian3 = ellipsoid.cartographicToCartesian(cc);
                            var distance = Cesium.Cartesian3.distance(cartesian, cartesian3);
                            circle.ellipse.semiMinorAxis = distance;
                            circle.ellipse.semiMajorAxis = distance;
                            circle.ellipse.height = cc.height;
                            return cartesian3;
                        }, false)
                    }
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}
//清除高度效果
function cleanHeightLine() {
    newlist = [];
    heightArray = [];
    heightArray1 = [];
    heightWall.polyline.positions = [];
    circle.position = [];
    circle.ellipse.semiMinorAxis = 0;
    circle.ellipse.semiMajorAxis = 0;
    circle.ellipse.height = 0;
    if (heightLineSH) {
        heightLineSH = false;
        heightHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        heightHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }
}


//距离量测
var distanceHandler;
var distanceList = [];
var distanceHandlerSH = false;
var distanceArray = [];
var distance = [];

var distanceWall = viewer.entities.add({
    id: "distanceLine",
    polyline: {
        positions: [],
        width: 3,
        outlineWidth: 2,
        show: true,
        material: Cesium.Color.BLUE.withAlpha(0.5),
    }
});

//线路漫游绘制功能
function distanceDraw() {
    $.Pro('请左键单击取点，双击左键自动结束测量，将自动计算距离！', { BoxBgopacity: .8 })
    cleanAll();
    distanceHandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    distanceHandler.setInputAction(function(evt) {
        distanceHandlerSH = true;
        var scene = viewer.scene;
        if (scene.mode !== Cesium.SceneMode.MORPHING) {
            var pickedObject = scene.pick(evt.position);
            if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
                var cartesian = viewer.scene.pickPosition(evt.position);
                if (Cesium.defined(cartesian)) {
                    var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                    console.log(cartesian)
                    distanceArray.push(cartesian); //绘制线路的位置集合
                    distanceList.push(cartesian); //橡皮筋效果数据集合
                    distanceWall.polyline.positions = distanceArray; //绘制线路的效果图
                    distance.push(cartographic); //漫游的数据集合，采用经纬度坐标
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    distanceHandler.setInputAction(function(movement) {
        if (scene.mode !== Cesium.SceneMode.MORPHING) {
            var pickedObject = scene.pick(movement.endPosition);
            if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
                var cartesian = viewer.scene.pickPosition(movement.endPosition);
                if (Cesium.defined(cartesian)) {
                    if (distanceArray.length >= 1) {
                        distanceWall.polyline.positions = new Cesium.CallbackProperty(function() {
                            if (distanceList.length == distanceArray.length + 1) {
                                distanceList.pop();
                                distanceList.push(cartesian);
                            }
                            if (distanceList.length != distanceArray.length + 1) {
                                distanceList.push(cartesian);
                            }
                            return distanceList;
                        }, false);
                    }
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    distanceHandler.setInputAction(function(movement) {
        distanceHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        distanceHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        distanceList.pop();
        distanceList.pop();
        calculateLength2(distanceList);
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
}

//清除绘制效果
function cleanDistanceHandler() {
    distanceList = [];
    distanceArray = [];
    distance = [];
    distanceWall.polyline.positions = [];
    if (distanceHandlerSH) {
        distanceHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        distanceHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        distanceHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        distanceHandlerSH = false;
    }
}




//面积量测
var areaHandler;
var areaList = [];
var newAreaArr = [];
var areaArr = [];
var areaSH = false;
var area = viewer.entities.add({
    id: "area",
    polygon: {
        //hierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromRadiansArray([])),
        classificationType: Cesium.ClassificationType.BOTH,
        material: Cesium.Color.BLUE.withAlpha(0.5),
    }
});

function areaMeasuring() {
    $.Pro('请左键单击取点，双击左键自动结束测量，将自动计算面积！', { BoxBgopacity: .8 })
    cleanAll();
    areaHandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    areaHandler.setInputAction(function(evt) {
        areaSH = true;
        var scene = viewer.scene;
        if (scene.mode !== Cesium.SceneMode.MORPHING) {
            var pickedObject = scene.pick(evt.position);
            if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
                var cartesian = viewer.scene.pickPosition(evt.position);
                if (Cesium.defined(cartesian)) {
                    var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                    var lng = Cesium.Math.toDegrees(cartographic.longitude);
                    var lat = Cesium.Math.toDegrees(cartographic.latitude);
                    areaList.push(cartesian); //绘制线路的位置集合
                    newAreaArr.push(cartesian); //橡皮筋效果数据集合
                    area.polygon.hierarchy = areaList; //绘制线路的效果图
                    areaArr.push(lng)
                    areaArr.push(lat)
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    areaHandler.setInputAction(function(movement) {
        if (scene.mode !== Cesium.SceneMode.MORPHING) {
            var pickedObject = scene.pick(movement.endPosition);
            if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
                var cartesian = viewer.scene.pickPosition(movement.endPosition);
                if (Cesium.defined(cartesian)) {
                    if (areaList.length >= 1) {
                        area.polygon.hierarchy = new Cesium.CallbackProperty(function() {
                            if (newAreaArr.length == areaList.length + 1) {
                                newAreaArr.pop();
                                newAreaArr.push(cartesian);
                            }
                            if (newAreaArr.length != areaList.length + 1) {
                                newAreaArr.push(cartesian);
                            }
                            return newAreaArr;
                        }, false);
                    }
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    //双击鼠标左键，清除move事件和鼠标左键单击事件
    areaHandler.setInputAction(function() {
        areaHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        areaHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        areaArr.pop();
        areaArr.pop();
        calculateArea(areaArr);
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
}



function cleanAreaHandler() {
    areaList = [];
    newAreaArr = [];
    areaArr = [];
    area.polygon.hierarchy = [];
    if (areaSH) {
        areaSH = false;
        areaHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        areaHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        areaHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    }
}

//传世界坐标计算点之间的距离
function calculateLength2(Points) {


    var length3d = 0;
    for (var i = 0; i < Points.length - 1; i++) {

        length3d += Math.sqrt(
            (Points[i].x - Points[i + 1].x) * (Points[i].x - Points[i + 1].x) +
            (Points[i].y - Points[i + 1].y) * (Points[i].y - Points[i + 1].y) +
            (Points[i].z - Points[i + 1].z) * (Points[i].z - Points[i + 1].z)
        );
    }
    $.Pop('距离', `三维长度：${length3d}`, 'alert')

    // alert("平面长度：" + length + " 米\n三维长度：" + length3d);

}



//计算面积
function calculateArea(lla) {
    var area = 0;
    for (var i = 0; i < lla.length / 2 - 1; i++) {
        var lng1 = lla[2 * i];
        var lat1 = lla[2 * i + 1];

        var lng2 = lla[2 * i + 2];
        var lat2 = lla[2 * i + 3];



        var result1, result2;
        var GP = new Cesium.GeographicProjection();
        result1 = GP.project(new Cesium.Cartographic(Cesium.Math.toRadians(lng1), Cesium.Math.toRadians(lat1), 0))
        result2 = GP.project(new Cesium.Cartographic(Cesium.Math.toRadians(lng2), Cesium.Math.toRadians(lat2), 0))



        area += result1.x * result2.y - result1.y * result2.x;
    }
    var i = lla.length / 2 - 1;
    var lng1 = lla[2 * i];
    var lat1 = lla[2 * i + 1];

    var lng2 = lla[0];
    var lat2 = lla[1];

    var result1, result2;
    var GP = new Cesium.GeographicProjection();
    result1 = GP.project(new Cesium.Cartographic(Cesium.Math.toRadians(lng1), Cesium.Math.toRadians(lat1), 0))
    result2 = GP.project(new Cesium.Cartographic(Cesium.Math.toRadians(lng2), Cesium.Math.toRadians(lat2), 0))
    area += result1.x * result2.y - result1.y * result2.x;
    area *= 0.5;
    if (area < 0)
        area *= -1;
    $.Pop('面积', `面积：${area} 平方米`, 'alert');
}



var picking = false;
var handler;
var pickSH = false;

function pick() {
    cleanAll(); //清除高度量测
    pickSH = true;
    // if (leftMenu.style.display = "block") {

    // }


    var scene = viewer.scene;

    if (picking == true) {
        picking = false;
        handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        leftMenu.style.display = "none";
        return;
    } else if (picking == false) {
        picking = true;
        handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
        handler.setInputAction(function(movement) {
            if (scene.mode !== Cesium.SceneMode.MORPHING) {
                var pickedObject = scene.pick(movement.endPosition);
                if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
                    var cartesian = viewer.scene.pickPosition(movement.endPosition);

                    if (Cesium.defined(cartesian)) {
                        leftMenu.style.display = "block";
                        leftMenu.style.left = movement.endPosition.x + "px";
                        leftMenu.style.top = (movement.endPosition.y - 80) + "px"
                        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                        var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(10);
                        var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(10);
                        var heightString = cartographic.height.toFixed(5) + 20;


                        leftMenu.innerHTML = `<p>Lon: ${longitudeString}</p><p>Lat: ${latitudeString}</p><p>Alt:${heightString}</p>`

                        //foundPosition = true;
                    } else {
                        leftMenu.style.display = "none";
                    }
                } else {
                    var cartesian = viewer.camera.pickEllipsoid(movement.endPosition, scene.globe.ellipsoid);
                    var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                    var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(5);
                    var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(5);
                    var heightString = cartographic.height.toFixed(5);

                    //foundPosition = true;
                }
            }


        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }

}

function cleanPickMouseMove() {
    leftMenu.style.display = "none";
    if (pickSH) {
        pickSH = false;
        handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }
}