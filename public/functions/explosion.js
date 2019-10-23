function start_explosion() {
    clearFire();
    clearCollision();
    clearMix();
    // tileset.clippingPlanes = clippingPlanes;
    planeEntities[0].show = true;
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(114.21930535333072, 30.357892738082274, 500),
        orientation: {
            heading: 0.0,
            pitch: Cesium.Math.toRadians(-90.0),
            roll: 0.0
        }
    });
}

function clearExplosion() {
    if (planeEntities[0] != undefined) {
        planeEntities[0].show = false;//清除爆炸模型
        clippingPlanes._planes[0]._distance = 80;
        console.log(clippingPlanes._planes[0]._distance);
    }
}