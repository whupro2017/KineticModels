function start_fire() {
    clearFire();
    clearCollision();
    clearExplosion();
    clearMix();
    show_fire($("#fire_type_name").val());
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(114.21857695568028, 30.359405404026386, 120),
        orientation: {
            heading: Cesium.Math.toRadians(-40.0),
            pitch: Cesium.Math.toRadians(-60.0),
            roll: 0.0
        }
    });
}