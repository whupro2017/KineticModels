var flytoHome;
var targetY = 80.0;
var planeEntities = [];
var selectedPlane;
var clippingPlanes;

var downHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
downHandler.setInputAction(function(movement) {
    var pickedObject = scene.pick(movement.position);
    if (Cesium.defined(pickedObject) &&
        Cesium.defined(pickedObject.id) &&
        Cesium.defined(pickedObject.id.plane)) {
        selectedPlane = pickedObject.id.plane;
        // selectedPlane.material = Cesium.Color.WHITE.withAlpha(0.05);
        selectedPlane.outlineColor = Cesium.Color.WHITE;
        scene.screenSpaceCameraController.enableInputs = false;
    }
}, Cesium.ScreenSpaceEventType.LEFT_DOWN);

// Release plane on mouse up
var upHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
upHandler.setInputAction(function() {
    if (Cesium.defined(selectedPlane)) {
        //selectedPlane.material = Cesium.Color.WHITE.withAlpha(0.1);
        selectedPlane.outlineColor = Cesium.Color.WHITE;
        selectedPlane = undefined;
    }

    scene.screenSpaceCameraController.enableInputs = true;
}, Cesium.ScreenSpaceEventType.LEFT_UP);

// Update plane on mouse move
var moveHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
moveHandler.setInputAction(function(movement) {
    if (Cesium.defined(selectedPlane)) {
        var deltaY = movement.startPosition.y - movement.endPosition.y;
        targetY += deltaY;
        // console.log(targetY)
        var newImage = mapImage(targetY * 2 + 20)
            //console.log(newImage)
        if (heatPlane.plane.material.image)
            if (newImage !== heatPlane.plane.material.image._value)
                heatPlane.plane.material = new Cesium.ImageMaterialProperty({
                    image: newImage,
                    transparent: true
                })
    }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

function mapImage(height) {
    if ((height < 10) || (height >= 90))
        return './imgs/3.png'
    if ((height >= 10 && height < 20) || (height >= 80 && height < 90))
        return './imgs/2.png'
    if ((height >= 20 && height < 30) || (height >= 70 && height < 80))
        return './imgs/1.png'
    if ((height >= 30 && height < 40) || (height >= 60 && height < 70))
        return './imgs/0.png'
    if ((height >= 40 && height < 60))
        return './imgs/h.png'
}

function createPlaneUpdateFunction(plane) {
    return function() {
        plane.distance = targetY;

        return plane;
    };
}