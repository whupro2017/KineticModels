function show_tilesetanshun() {
    clippingPlanes = new Cesium.ClippingPlaneCollection({
        planes: [
            new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 0.0, -1.0), 80.0)
        ],
        edgeWidth: 0.0
    });

    var boundingSphere;
    tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        // url: 'cesium/Models/Tileset.json',
        url: 'cesium/Models/anshun/tileset.json',
        maximumScreenSpaceError: 20,
        maximumNumberOfLoadedTiles: 500,
        clippingPlanes: clippingPlanes
    }));
    /*var longitudeOffset = 104;
    var latitudeOffset = 26;
    var boundingSphere = tileset.boundingSphere;
    var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
    var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
    var offset = Cesium.Cartesian3.fromRadians(longitudeOffset, latitudeOffset, 0.0);
    var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);*/
    tileset.readyPromise.then(function (tileset) {
        /*boundingSphere = tileset.boundingSphere;
        var radius = boundingSphere.radius;
        var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
        var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
        alert(cartographic.longitude + ", " + cartographic.latitude + ", " + cartographic.height + "\n," + tileset.modelMatrix.toString());*/

        /*var longitudeOffset = cartographic.longitude; //104;
        var latitudeOffset = cartographic.latitude; //26;
        var height = 100;
        var offset = Cesium.Cartesian3.fromRadians(longitudeOffset, latitudeOffset, height);
        var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
        boundingSphere = tileset.boundingSphere;
        var radius = boundingSphere.radius;
        var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
        alert(cartographic.longitude + ", " + cartographic.latitude + ", " + cartographic.height + ", " + height + "\n," + tileset.modelMatrix.toString());*/

        var position = Cesium.Cartesian3.fromDegrees(105.93257833333334, 26.2545366666666, 69.3);//62.4);
        //alert(position.toString())
        var mat = Cesium.Transforms.eastNorthUpToFixedFrame(position);

        var scale = Cesium.Matrix4.fromUniformScale(2.35)
        Cesium.Matrix4.multiply(mat, scale, mat);
        const m1 = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(5));
        Cesium.Matrix4.multiplyByMatrix3(mat, m1, mat);
        const m2 = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(21));
        Cesium.Matrix4.multiplyByMatrix3(mat, m2, mat);
        const m3 = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(-50));
        Cesium.Matrix4.multiplyByMatrix3(mat, m3, mat);
        Cesium.Matrix4.multiplyByMatrix3(mat, m1, mat);
        //tileset.modelMatrix = mat;
        tileset._root.transform = mat;
        /*boundingSphere = tileset.boundingSphere;
        var radius = boundingSphere.radius;
        var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
        alert(cartographic.longitude + ", " + cartographic.latitude + ", " + cartographic.height + "\n," + tileset.modelMatrix.toString());*/
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
        destination: Cesium.Cartesian3.fromDegrees(105.93257833333334, 26.2545366666666, 800),
        orientation: {
            heading: 0.0,
            pitch: Cesium.Math.toRadians(-90.0),
            roll: 0.0
        }
    });
}

function show_tilesetplane() {
    tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        // url: 'cesium/Models/Tileset.json',
        url: 'cesium/Models/Plane/tileset.json',
        maximumScreenSpaceError: 20,
        maximumNumberOfLoadedTiles: 500,
        clippingPlanes: clippingPlanes
    }));
    tileset.readyPromise.then(function (tileset) {
        var position = Cesium.Cartesian3.fromDegrees(105.93257833333334, 26.2545366666666, 0);//62.4);
        var mat = Cesium.Transforms.eastNorthUpToFixedFrame(position);

        var scale = Cesium.Matrix4.fromUniformScale(32)
        Cesium.Matrix4.multiply(mat, scale, mat);
        tileset._root.transform = mat;
        tileset.transparent = true;
    });
}

show_tilesetanshun();
// show_tilesetplane();