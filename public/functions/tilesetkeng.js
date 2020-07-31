function show_tilesetanshun() {
    clippingPlanes = new Cesium.ClippingPlaneCollection({
        planes: [
            new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 0.0, -1.0), 80.0)
        ],
        edgeWidth: 0.0
    });

    var boundingSphere;
    tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: 'cesium/Models/KENG/tileset.json',
        maximumScreenSpaceError: 20,
        maximumNumberOfLoadedTiles: 500,
        clippingPlanes: clippingPlanes
    }));
    tileset.readyPromise.then(function (tileset) {
        var position = Cesium.Cartesian3.fromDegrees(110.743236167, 39.084274472, 20.5);//62.4);
        var mat = Cesium.Transforms.eastNorthUpToFixedFrame(position);
        //alert(position.toString())
        var scale = Cesium.Matrix4.fromUniformScale(1.5)
        Cesium.Matrix4.multiply(mat, scale, mat);
        const m1 = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(0));
        Cesium.Matrix4.multiplyByMatrix3(mat, m1, mat);
        const m2 = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(0));
        Cesium.Matrix4.multiplyByMatrix3(mat, m2, mat);
        const m3 = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(-20));
        Cesium.Matrix4.multiplyByMatrix3(mat, m3, mat);

        tileset._root.transform = mat;
        console.log("加载中");

        for (var i = 0; i < clippingPlanes.length; ++i) {
            var plane = clippingPlanes.get(i);
            var planeEntity = viewer.entities.add({
                position: offset,
                plane: {
                    dimensions: new Cesium.Cartesian2(radius * 0.75, radius * 0.75),
                    material: new Cesium.ImageMaterialProperty({
                        image: 'imgs/3.png',
                        transparent: true
                    }),
                    plane: new Cesium.CallbackProperty(createPlaneUpdateFunction(plane), false),
                    outline: true,
                    outlineColor: Cesium.Color.WHITE
                },
                show: false
            });
            heatPlane = planeEntity;
            planeEntities.push(planeEntity);
        }
    });


    viewer.camera.setView({
        // destination: Cesium.Cartesian3.fromDegrees(105, 26, 800),
        destination: Cesium.Cartesian3.fromDegrees(110.743236167, 39.084274472, 800),
        orientation: {
            heading: 0.0,
            pitch: Cesium.Math.toRadians(-90.0),
            roll: 0.0
        }
    });
}

show_tilesetanshun();