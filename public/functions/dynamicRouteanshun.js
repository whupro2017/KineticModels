function startDynRoute(CZML) {
    console.log(CZML[1].position.cartographicDegrees);
    //dataSourcePromise = viewer.dataSources.add(Cesium.CzmlDataSource.load(CZML));
    dataSourcePromise = viewer.dataSources.add(Cesium.CzmlDataSource.load(CZML));
    dataSourcePromise.then(function (dataSource) {
        console.log("开始动态路径演示");
        var mo3 = dataSource.entities.getById('GroundVehicle_model3');
        var positionProperty = mo3.position;
        viewer.trackedEntity = mo3;
        if (scene.clampToHeightSupported) {
            clock.shouldAnimate = true;
            var objectsToExclude = [mo3];
            scene.postRender.addEventListener(function () {
                var po = positionProperty.getValue(clock.currentTime);
                mo3.position = scene.clampToHeight(po, objectsToExclude);
            });
        } else {
            console.log('This browser does not support clampToHeight.');
        }
        mo3.orientation = new Cesium.VelocityOrientationProperty(mo3.position);
    });
}