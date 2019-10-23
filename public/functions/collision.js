function startCollision(CZML) {
    var point = viewer.entities.add({
        point: {
            outlineColor: Cesium.Color.BLACK,
        },
        position: Cesium.Cartesian3.fromDegrees(114.22093543536897, 30.357231324330957, 5),
        show: false
    });

    function computeModelMatrix(entity, time) {
        return entity.computeModelMatrix(time, new Cesium.Matrix4());
    }

    var emitterModelMatrix = new Cesium.Matrix4();
    var translation = new Cesium.Cartesian3();
    var rotation = new Cesium.Quaternion();
    var hpr = new Cesium.HeadingPitchRoll();
    var trs = new Cesium.TranslationRotationScale();

    function computeEmitterModelMatrix() {
        hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, hpr);
        trs.translation = Cesium.Cartesian3.fromElements(0.0, 0.0, 0.0, translation);
        trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);

        return Cesium.Matrix4.fromTranslationRotationScale(trs, emitterModelMatrix);
    }

    collision_particleSystem = scene.primitives.add(new Cesium.ParticleSystem({
        startColor: Cesium.Color.WHITE.withAlpha(1),
        endColor: Cesium.Color.WHITE.withAlpha(0),
        // endColor : Cesium.Color.WHITE.withAlpha(0.0),
        image: 'cesium/Models/fire.png',
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        startScale: 10.0,
        endScale: 150.0,
        minimumParticleLife: 2,
        maximumParticleLife: 3,
        minimumSpeed: 0,
        maximumSpeed: 0,
        imageSize: new Cesium.Cartesian2(5, 5),
        emissionRate: 0,
        bursts: [
            // these burst will occasionally sync to create a multicolored effect
            new Cesium.ParticleBurst({time: 20.0, minimum: 500, maximum: 500})
        ],
        lifetime: 29.9,

        emitter: new Cesium.CircleEmitter(1.0),

        emitterModelMatrix: computeEmitterModelMatrix()
        // modelMatrix:computeModelMatrix(entity, time),

    }));
    viewer.scene.preUpdate.addEventListener(function (scene, time) {
        collision_particleSystem.modelMatrix = computeModelMatrix(point, time);

        // Account for any changes to the emitter model matrix.
        collision_particleSystem.emitterModelMatrix = computeEmitterModelMatrix();

        // Spin the emitter if enabled.
    });
    ds = Cesium.CzmlDataSource.load(CZML);
    dataSourcePromise = viewer.dataSources.add(ds);
    dataSourcePromise.then(function (dataSource) {
        console.log("开始碰撞演示");
        var mo1 = dataSource.entities.getById('GroundVehicle_model1');
        var mo2 = dataSource.entities.getById('GroundVehicle_model2');
        mo1.orientation = new Cesium.VelocityOrientationProperty(mo1.position);
        mo2.orientation = new Cesium.VelocityOrientationProperty(mo2.position);
        var positionProperty1 = mo1.position;
        var positionProperty2 = mo2.position;
        viewer.dataSources._dataSources
        if (scene.clampToHeightSupported) {
            clock.shouldAnimate = true;
            var objectsToExclude1 = [mo1];
            var objectsToExclude2 = [mo2];
            listener = function () {
                var position1 = positionProperty1.getValue(clock.currentTime);
                mo1.position = scene.clampToHeight(position1, objectsToExclude1);
                var position2 = positionProperty2.getValue(clock.currentTime);
                mo2.position = scene.clampToHeight(position2, objectsToExclude2);
            };
            scene.postRender.addEventListener(listener);
        } else {
            console.log('This browser does not support clampToHeight.');
        }
    });
}

function start_collision() {
    clearFire();
    clearExplosion();
    clearMix();
    if ("undefined" != typeof (primitives)) {
        while (primitives.length != 0)
            viewer.scene.primitives.remove(primitives.pop());
        viewer.entities.remove(viewer.entities.getById("house"));
        window.clearInterval(timer);
        window.clearInterval(changeTimer);
        console.log("清除燃烧模型");
    }
    planeEntities[0].show = false;//清除爆炸模型
    startCollision(czml);
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(114.22092858514243, 30.357234672988366, 200),
        orientation: {
            heading: 0.0,
            pitch: Cesium.Math.toRadians(-90.0),
            roll: 0.0
        }
    });
}

function clearCollision() {
    if ("undefined" != typeof (ds)) {
        for (var i = 0; i < viewer.dataSources.length; i++) {
            if (viewer.dataSources.get(i)._name == "CZML_Model") {
                viewer.dataSources.remove(viewer.dataSources.get(i), true);
            }
        }
        scene.postRender.removeEventListener(listener);
        viewer.scene.primitives.remove(collision_particleSystem);
        console.log("清除碰撞模型");
    }
}