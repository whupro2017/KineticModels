/*function show_tileset() {
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
        //alert(cartographic.longitude + ", " + cartographic.latitude + ", " + clippingPlanes.length + "\n," + tileset.modelMatrix.toString());
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
}*/

function show_tileset() {
    /*viewer.scene.primitives.removeAll();
    viewer.entities.removeAll();*/
    //var primitives = viewer.scene.primitives;
    if (currentTileset != null) {
        viewer.scene.primitives.remove(currentTileset);
        // for (var i = 0; i < primitives.length; i++) {
        //     if (primitives._primitives[i].isEqualTo(currentTileset)/*primitives._primitives[i]._url == url*/) {
        //         alert("Release " + primitives._primitives[i].url);
        //         viewer.scene.primitives.remove(primitives._primitives[i]);
        //     }
        // }
    }
    console.log("Refresh view: " + scenePosition.offsetX + "," + scenePosition.offsetY + "," + scenePosition.offsetZ + "," + scenePosition.tilepath);

    // should consider w/o
    clippingPlanes = new Cesium.ClippingPlaneCollection({
        planes: [
            new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 0.0, -1.0), 80.0)
        ],
        edgeWidth: 0.0
    });

    currentTileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: scenePosition.tilepath,
        maximumScreenSpaceError: 20,
        maximumNumberOfLoadedTiles: 500,
        // should consider w/o
        clippingPlanes: clippingPlanes
    }));
    currentTileset.readyPromise.then(function (tileset) {
        if (scenePosition.absoluteX != .0 || scenePosition.absoluteY != 0) {
            boundingSphere = tileset.boundingSphere;
            var radius = boundingSphere.radius;
            var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
            var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
            var height = scenePosition.absoluteZ;
            var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, height);
            var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
            /*var mat = Cesium.Matrix4.fromTranslation(translation);
            var scale = Cesium.Matrix4.fromUniformScale(100)
            Cesium.Matrix4.multiply(mat, scale, mat);
            tileset.modelMatrix = mat;*/
            tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
            //alert(cartographic.longitude + ", " + cartographic.latitude + ", " + clippingPlanes.length + "\n," + tileset.modelMatrix.toString());
            console.log("原始坐标基础加载中");
        } else {
            var position = Cesium.Cartesian3.fromDegrees(scenePosition.offsetX, scenePosition.offsetY, scenePosition.offsetZ);//62.4);
            var mat = Cesium.Transforms.eastNorthUpToFixedFrame(position);
            //alert(position.toString())
            var scale = Cesium.Matrix4.fromUniformScale(scenePosition.scale)
            Cesium.Matrix4.multiply(mat, scale, mat);
            const m1 = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(scenePosition.rotateX));
            Cesium.Matrix4.multiplyByMatrix3(mat, m1, mat);
            const m2 = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(scenePosition.rotateY));
            Cesium.Matrix4.multiplyByMatrix3(mat, m2, mat);
            const m3 = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(scenePosition.rotateZ));
            Cesium.Matrix4.multiplyByMatrix3(mat, m3, mat);

            tileset._root.transform = mat;
            console.log("变换坐标加载中");
        }

        // should consider w/o
        var boundingSphere = tileset.boundingSphere;
        var radius = boundingSphere.radius;
        var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
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

        if (scenePosition.absoluteX != .0 || scenePosition.absoluteY != 0) {
            viewer.camera.setView({
                destination: Cesium.Cartesian3.fromDegrees(scenePosition.absoluteX, scenePosition.absoluteY, 1500),
                orientation: {
                    heading: 0.0,
                    pitch: Cesium.Math.toRadians(-90.0),
                    roll: 0.0
                }
            });
            console.log("原始坐标基础加载" + scenePosition.absoluteX + "," + scenePosition.absoluteY + "," + scenePosition.absoluteZ);
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(scenePosition.absoluteX, scenePosition.absoluteY, 1500)
            });
        } else {
            viewer.camera.setView({
                destination: Cesium.Cartesian3.fromDegrees(scenePosition.offsetX, scenePosition.offsetY, 1500),
                orientation: {
                    heading: 0.0,
                    pitch: Cesium.Math.toRadians(-90.0),
                    roll: 0.0
                }
            });
            console.log("变换坐标加载" + scenePosition.offsetX + "," + scenePosition.offsetY + "," + scenePosition.offsetZ);
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(scenePosition.offsetX, scenePosition.offsetY, 1500)
            });
        }
    });
    if (activeObject != undefined && activeObject.element_id != "undefined" && activeObject.element_type != "undefined") {
        console.log("++++++++++++++++++ " + activeObject.element_type + ", " + activeObject.element_id);
        show_element_relation();
    }
}

// show_tileset();