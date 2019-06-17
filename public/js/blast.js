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

var p1 = [];
id = 0;
var pCount=36;

function startBZ1()
{
    for (var height = 0; height < pCount; height += 1) {


        var centerx=114.21784242174171, centery=30.359570351833124;
        var length=0.0002;
        var leftx=centerx+Math.cos(height*Math.PI/pCount)*length;
        var lefty=centery+Math.sin(height*Math.PI/pCount)*length;
        var rightx=centerx-Math.cos(height*Math.PI/pCount)*length;
        var righty=centery-Math.sin(height*Math.PI/pCount)*length;
    
            var wall = Cesium.WallGeometry.fromConstantHeights({
                positions: Cesium.Cartesian3.fromDegreesArray([
                    leftx,lefty,rightx,righty
                ]),
                minimumHeight: 0,
                maximumHeight: 20.0
            });
            var geometry = Cesium.WallGeometry.createGeometry(wall);
            var Rectangle = viewer.scene.primitives.add(new Cesium.Primitive({
                geometryInstances: new Cesium.GeometryInstance({
                    geometry: geometry
                }),
                appearance: new Cesium.EllipsoidSurfaceAppearance({
                    aboveGround: true,
                }),
            }));
            p1.push(Rectangle);
            Rectangle.appearance.material = new Cesium.Material({
                fabric: {
                    type: 'Image',
                    uniforms: {
                        image: "../img/bz/d0.png"
                    }
                }
            });
        id++;
    }
    var x=1;
    var timer_bz = setInterval(function() {
    
        for (var i = 0; i < pCount; i++) {
            p1[i].appearance.material.uniforms.image = "./img/bz/d"+x+".png"
        }
        console.log(x);
        x++;
        if(x==17)
        clearInterval(timer_bz);
    },250);
}

function startbzbz(){
    

}
