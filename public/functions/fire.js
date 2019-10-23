function start_fire() {
    clearFire();
    clearCollision();
    clearExplosion();
    clearMix();
    show_fire();
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(114.21857695568028, 30.359405404026386, 120),
        orientation: {
            heading: Cesium.Math.toRadians(-40.0),
            pitch: Cesium.Math.toRadians(-60.0),
            roll: 0.0
        }
    });
}

function show_fire() {
    var house = viewer.entities.add({
        id: "house",
        position: Cesium.Cartesian3.fromDegrees(114.21804414901572, 30.35976800592169, 10.06741790731156),
        orientation: Cesium.Transforms.headingPitchRollQuaternion(
            Cesium.Cartesian3.fromDegrees(114.21804414901572, 30.35976800592169, 10.06741790731156),
            new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(180), Cesium.Math.toRadians(0), Cesium.Math.toRadians(0))
        ),
        model: {
            uri: "cesium/Models/house.gltf",
            // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            color: Cesium.Color.fromAlpha(Cesium.Color.WHITE, 0.4),
            scale: 0.08
        },
        show: true,
    });
    primitives = [];
    var id = 0;
    var lon = -113.999;
    var lat = 40.001;
    var height = 11;
    for (; height <= 35; height += 1) {
        primitives.push(viewer.scene.primitives.add(new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                id: id,
                geometry: new Cesium.RectangleGeometry({
                    ellipsoid: Cesium.Ellipsoid.WGS84,
                    rectangle: Cesium.Rectangle.fromDegrees(114.21784242174171, 30.359570351833124, 114.21818308677508, 30.35989081794081),
                    height: height,
                    // extrudedHeight: 1
                }),
                attributes: {
                    color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({
                        alpha: 0.5
                    }))
                }
            }),
            appearance: new Cesium.EllipsoidSurfaceAppearance({
                material: new Cesium.Material({
                    fabric: {
                        type: 'Image',
                        uniforms: {
                            image: "./smoke/frame0/image" + id + ".png"
                        }
                    },
                    transport: true
                })
            })
        })))
        id++;
    }
    var x = 0;
    clock.multiplier = 5;
    timer = setInterval(function () {
        if (viewer.clockViewModel.shouldAnimate == true && x < 1000) {
            // console.log("加载帧" + x);
            for (var i = 0; i < 25; i++) {
                primitives[i].appearance.material.uniforms.image = "./smoke/frame" + x + "/image" + i + ".png";
            }
            x++;
        }
    }, 100);
    var temp = 0;
    var old_mul = 1;
    changeTimer = setInterval(function () {
        if (old_mul != clock.multiplier) {
            window.clearInterval(timer);
            if (old_mul < 1) {
                timer = setInterval(function () {
                    if (viewer.clockViewModel.shouldAnimate == true && x < 1000) {
                        for (var i = 0; i < 25; i++) {
                            primitives[i].appearance.material.uniforms.image = "./smoke/frame" + x + "/image" + i + ".png";
                        }
                        x++;
                    }
                    //     viewer.scene.primitives.remove(primitives.pop());
                    // viewer.entities.remove(house);

                }, 100 / clock.multiplier);
            } else {
                timer = setInterval(function () {
                    if (viewer.clockViewModel.shouldAnimate == true && x < 1000) {
                        for (var i = 0; i < 25; i++) {
                            primitives[i].appearance.material.uniforms.image = "./smoke/frame" + x + "/image" + i + ".png";
                        }
                        x += Math.ceil(clock.multiplier);
                    }
                }, 100);
            }
            old_mul = clock.multiplier;
        }
    }, 100);
    clock.shouldAnimate = true;
}

function clearFire() {
    if ("undefined" != typeof (primitives)) {
        while (primitives.length != 0)
            viewer.scene.primitives.remove(primitives.pop());
        viewer.entities.remove(viewer.entities.getById("house"));
        window.clearInterval(timer);
        window.clearInterval(changeTimer);
        console.log("清除燃烧模型");
    }
}