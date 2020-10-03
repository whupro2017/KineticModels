function modelrelation() {
    showdog();
    showwaveblue(114.19546052231226, 30.32516669700495);
    showwavegreen(114.23039417448082, 30.314405350785258);
    showwavered(114.22374911095045, 30.357474991097224);
    // showrelation()
}

function modelbinding() {

}


function showrelation() {
    // var viewer=ysc.createNormalCesium("cesiumContainer",{});
    // var lat = 30.598026044;
    // var lon = 114.302312702;

    //设置初始位置
    // viewer.camera.setView({
    //     destination: Cesium.Cartesian3.fromDegrees(lon, lat, 300000)
    // });
    var data = {
        flowing: true,
        height: 100000,//抛物线最大高度
        flowImage: "cesium/ysc/images/colors1.png"
        , center: {id: 0, lon: 114.302312702, lat: 30.598026044, size: 20, color: Cesium.Color.YELLOW,}
        , points: [
            {id: 1, "lon": 115.028495718, "lat": 30.200814617, color: Cesium.Color.YELLOW, size: 15},
            {id: 2, "lon": 110.795000473, "lat": 32.638540762, color: Cesium.Color.RED, size: 15},
            {id: 3, "lon": 111.267729446, "lat": 30.698151246, color: Cesium.Color.BLUE, size: 15},
            {id: 4, "lon": 112.126643144, "lat": 32.058588576, color: Cesium.Color.GREEN, size: 15},
            {id: 5, "lon": 114.885884938, "lat": 30.395401912, color: Cesium.Color.BLUE, size: 15},
            {id: 6, "lon": 112.190419415, "lat": 31.043949588, color: Cesium.Color.BLUE, size: 15},
            {id: 7, "lon": 113.903569642, "lat": 30.932054050, color: Cesium.Color.BLUE, size: 15},
            {id: 8, "lon": 112.226648859, "lat": 30.367904255, color: Cesium.Color.BLUE, size: 15},
            {id: 9, "lon": 114.861716770, "lat": 30.468634833, color: Cesium.Color.BLUE, size: 15},
            {id: 10, "lon": 114.317846048, "lat": 29.848946148, color: Cesium.Color.BLUE, size: 15},
            {id: 11, "lon": 113.371985426, "lat": 31.704988330, color: Cesium.Color.BLUE, size: 15},
            {id: 12, "lon": 109.468884533, "lat": 30.289012191, color: Cesium.Color.BLUE, size: 15},
            {id: 13, "lon": 113.414585069, "lat": 30.368350431, color: Cesium.Color.SALMON, size: 15},
            {id: 14, "lon": 112.892742589, "lat": 30.409306203, color: Cesium.Color.WHITE, size: 15},
            {id: 15, "lon": 113.160853710, "lat": 30.667483468, color: Cesium.Color.SALMON, size: 15},
            {id: 16, "lon": 110.670643354, "lat": 31.748540780, color: Cesium.Color.PINK, size: 15}
        ],
        options: {
            name: 'yscNoNeedEntity',
            polyline: {
                width: 2,//线宽度
                // clampToGround : true,//贴地
                material: [Cesium.Color.YELLOW, 1],//混合颜色、(红绿混合透明后 就是黄色了)3000秒发射间隔,单纯材质无法展示飞行动态。所以去掉了。
            }
        }
    };
    //中心点 和散点 都是 entity point 做的 有需要的话 可以用其他的来做。
    ysc.creatFlyLinesAndPoints(viewer, data, function (id) {
        alert(id);
    });
}

function showwavered(x, y) {
    // var viewer=ysc.createNormalCesium("cesiumContainer",{});
    var lon = x;
    var lat = y;
    ysc.addCircleRipple(viewer, { //默认只绘制两个圆圈叠加 如遇绘制多个，请自行源码内添加。
        id: "redwave",
        lon: lon,
        lat: lat,
        height: 0,
        maxR: 3000,
        minR: 0,//最好为0
        deviationR: 20,//差值 差值也大 速度越快
        eachInterval: 1500,//两个圈的时间间隔
        imageUrl: "cesium/ysc/images/redCircle2.png"
    });

    //如果添加中心线的话：
    viewer.entities.add({
        name: "",
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                lon, lat, 0,
                lon, lat, 5000,]
            ),
            width: 4,
            material: new Cesium.PolylineGlowMaterialProperty({ //发光线
                glowPower: 0.1,
                color: Cesium.Color.RED
            })
        }
    });
    // viewer.zoomTo(viewer.entities);
}

function showwavegreen(x, y) {
    // var viewer = ysc.createNormalCesium("cesiumContainer", {});
    //添加圆形放大扫描。
    var circleScan = ysc.addCircleScan(viewer, {
        lon: x,//经度
        lat: y, //纬度
        scanColor: new Cesium.Color(0, 1.0, 0, 1),
        r: 1500,//扫描半径
        interval: 4000//时间间隔
    });

    // setTimeout(function () {
    //     viewer.scene.postProcessStages.remove(circleScan); //消除;
    // },10000);

    //飞行到这个位子
    // viewer.camera.flyTo({
    //     destination: Cesium.Cartesian3.fromDegrees(114.23039417448082, 30.314405350785258, 3000.0),
    //     orientation: {
    //         heading: Cesium.Math.toRadians(90.0), // east, default value is 0.0 (north) //东西南北朝向
    //         pitch: Cesium.Math.toRadians(-90),    // default value (looking down)  //俯视仰视视觉
    //         roll: 0.0                             // default value
    //     },
    //     duration: 3//3秒到达战场
    // });
}

function showwaveblue(x, y) {
    var oneDiv = $("#one");
    var scratch = new Cesium.Cartesian2(); //cesium二维笛卡尔 笛卡尔二维坐标系就是我们熟知的而二维坐标系；三维也如此
    var divPosition = Cesium.Cartesian3.fromDegrees(x, y, 500);
    viewer.scene.preRender.addEventListener(function () {
        var canvasPosition = viewer.scene.cartesianToCanvasCoordinates(divPosition, scratch);//cartesianToCanvasCoordinates 笛卡尔坐标（3维度）到画布坐标
        if (Cesium.defined(canvasPosition)) {
            oneDiv.css({
                top: canvasPosition.y,
                left: canvasPosition.x
            });
        }
    });

    /** 六添加椭圆面*/
    var rotation = Cesium.Math.toRadians(50);

    function getRotationValue() {
        rotation += 0.4;
        return rotation;
    }

    var blueEllipse = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(x, y),
        name: 'Blue translucent, rotated, and extruded ellipse with outline',
        ellipse: {
            semiMinorAxis: 30.0, //半短轴
            semiMajorAxis: 30.0, //半长轴
            height: 40.0,//距离地球球面高度
            material: new Cesium.ImageMaterialProperty({
                image: "cesium/ysc/images/circle1.png",
                transparent: true//别忘了把允许透明打开
            }),
            rotation: new Cesium.CallbackProperty(getRotationValue, false),
            stRotation: new Cesium.CallbackProperty(getRotationValue, false),
            outline: 8,//windows 下 不能为1 可以置为false
        }
    });
}

function showdog() {
    // var viewer=ysc.createNormalCesium("cesiumContainer",{});
    // var lat = 30.598026044;
    // var lon = 114.302312702;

    //设置初始位置
    // viewer.camera.setView({
    //     destination: Cesium.Cartesian3.fromDegrees(lon, lat, 300000)
    // });
    var data = {
        flowing: true,
        height: 1,//抛物线最大高度
        flowImage: "cesium/ysc/images/colors1.png"
        , center: {id: 0, lon: 114.22374307036247, lat: 30.357468963515792, size: 50, color: Cesium.Color.GREEN,}
        , points: [
            {id: 1, "lon": 114.22359736308196, "lat": 30.357858193626722, color: Cesium.Color.LIGHTSEAGREEN, size: 15},
            {id: 2, "lon": 114.22402249943266, "lat": 30.357851986183313, color: Cesium.Color.LIGHTSEAGREEN, size: 15},
            {id: 3, "lon": 114.22502503761544, "lat": 30.357327763721774, color: Cesium.Color.LIGHTSEAGREEN, size: 15},
            {id: 4, "lon": 114.22474631280522, "lat": 30.356792219619745, color: Cesium.Color.LIGHTSEAGREEN, size: 15},
            {id: 5, "lon": 114.22349750986672, "lat": 30.35667760741639, color: Cesium.Color.LIGHTSEAGREEN, size: 15},
            {id: 6, "lon": 114.22429510957168, "lat": 30.357250717167766, color: Cesium.Color.LIGHTSEAGREEN, size: 15},
        ],
        options: {
            name: 'yscNoNeedEntity',
            polyline: {
                width: 3,//线宽度
                clampToGround: true,
                material: [Cesium.Color.LIGHTSEAGREEN, 1],//混合颜色、(红绿混合透明后 就是黄色了)3000秒发射间隔,单纯材质无法展示飞行动态。所以去掉了。
            }
        }
    };
    //中心点 和散点 都是 entity point 做的 有需要的话 可以用其他的来做。
    ysc.creatFlyLinesAndPoints(viewer, data, function (id) {
        alert(id);
    });
}