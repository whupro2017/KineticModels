function show_tileset() {
    clippingPlanes = new Cesium.ClippingPlaneCollection({
        planes: [
            new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 0.0, -1.0), 80.0)
        ],
        edgeWidth: 0.0
    });

    var boundingSphere;
    tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: 'cesium/Models/Tileset.json',
        maximumScreenSpaceError: 20,
        maximumNumberOfLoadedTiles: 500,
        clippingPlanes: clippingPlanes
    }));
    tileset.readyPromise.then(function (tileset) {
        boundingSphere = tileset.boundingSphere;
        var radius = boundingSphere.radius;
        var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
        var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
        var height = 10;
        var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, height);
        var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
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
        destination: Cesium.Cartesian3.fromDegrees(114.21952507076327, 30.358135859723472, 800),
        orientation: {
            heading: 0.0,
            pitch: Cesium.Math.toRadians(-90.0),
            roll: 0.0
        }
    });
}

show_tileset();