var car1, man1, man2, gou1;
var car1pp, man1pp, man2pp, gou1pp;
var dataSource;

var dataSourcePromise = Cesium.CzmlDataSource.load('./data/ClampToGround.czml');
var dataSourcePromise2 = Cesium.CzmlDataSource.load('./data/ClampToGround.1.czml');
var dataSourcePromise3 = Cesium.CzmlDataSource.load('./data/ClampToGround.2.czml');

viewer.dataSources.add(dataSourcePromise).then(function(dataSource) {
    car1 = dataSource.entities.getById('GroundVehicle');
    car1pp = car1.position;


});
viewer.dataSources.add(dataSourcePromise2).then(function(dataSource) {

    man1 = dataSource.entities.getById('man1');
    man1pp = man1.position;
    man1.show = false;

    gou1 = dataSource.entities.getById('gou1');
    gou1pp = gou1.position;
    gou1.show = false;
});

viewer.dataSources.add(dataSourcePromise3).then(function(dataSource) {

    man2 = dataSource.entities.getById('man2');
    man2pp = man2.position;
    man2.show = false;

});

var lastPosition = {};

function pz_start() {
    clock.shouldAnimate = true;
    var objectsToExclude = [car1, man1];
    scene.postRender.addEventListener(function() {
        var cc1 = car1pp.getValue(clock.currentTime);

        car1.position = cc1;
        car1.orientation = Cesium.Transforms.headingPitchRollQuaternion(cc1, new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(80), 0, 0));
        if (clock.currentTime.dayNumber >= 2458319 && clock.currentTime.secondsOfDay >= 11950) {
            particleSystem.show = true;
        }

        if (clock.currentTime.dayNumber >= 2458319 && clock.currentTime.secondsOfDay >= 11979) {

            man2.show = true;

            var mm1 = man1pp.getValue(clock.currentTime);
            man1.position = mm1;
            man1.orientation = Cesium.Transforms.headingPitchRollQuaternion(mm1, new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-80), Cesium.Math.toRadians(0), 0));

            man1.show = true;

            gou1.show = true;


            var mm2 = man2pp.getValue(clock.currentTime);
            man2.position = mm2;
            man2.orientation = Cesium.Transforms.headingPitchRollQuaternion(mm2, new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-80), Cesium.Math.toRadians(0), 0));
            var gg1 = gou1pp.getValue(clock.currentTime);
            gou1.position = gg1;
            gou1.orientation = Cesium.Transforms.headingPitchRollQuaternion(gg1, new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-80), Cesium.Math.toRadians(0), 0));


        }
    });
}

var particleSystem = scene.primitives.add(new Cesium.ParticleSystem({
    show: false,
    image: './imgs/fire.png',
    imageSize: new Cesium.Cartesian2(20, 20),
    startColor: Cesium.Color.RED.withAlpha(0.7),
    endColor: Cesium.Color.YELLOW.withAlpha(0.3),

    startScale: 4,
    endScale: 5,

    minimumParticleLife: 1,
    maximumParticleLife: 2,

    minimumSpeed: 0,
    maximumSpeed: 1,



    // Particles per second.
    emissionRate: 30,

    bursts: [
        // these burst will occasionally sync to create a multicolored effect
        new Cesium.ParticleBurst({
            time: 5.0,
            minimum: 10,
            maximum: 100
        }),
        new Cesium.ParticleBurst({
            time: 10.0,
            minimum: 50,
            maximum: 100
        }),
        new Cesium.ParticleBurst({
            time: 15.0,
            minimum: 200,
            maximum: 300
        })
    ],

    lifetime: 20.0,

    emitter: new Cesium.ConeEmitter(2.0),

    emitterModelMatrix: computeModelMatrix(),

    updateCallback: applyGravity
}));

var gravityScratch = new Cesium.Cartesian3();

function applyGravity(p, dt) {
    // We need to compute a local up vector for each particle in geocentric space.
    var position = p.position;

    Cesium.Cartesian3.normalize(position, gravityScratch);
    Cesium.Cartesian3.multiplyByScalar(gravityScratch, 3 * dt, gravityScratch);

    p.velocity = Cesium.Cartesian3.add(p.velocity, gravityScratch, p.velocity);
}

function computeModelMatrix() {
    var position = {
        x: -2259636.8589905733,
        y: 5023428.884732758,
        z: 3204785.5621655514
    };
    if (!Cesium.defined(position)) {
        return undefined;
    }
    // var orientation = Cesium.Property.getValueOrUndefined(entity.orientation, time, entityOrientation);
    // if (!Cesium.defined(orientation)) {
    var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position, undefined, modelMatrix);

    return modelMatrix;
}