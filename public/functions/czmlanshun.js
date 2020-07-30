var dyn_czml = [{
    "id": "document",
    "name": "CZML_Model",
    "version": "1.0",
    "clock": {
        "interval": "2019-03-05T15:00:00Z/",
        "currentTime": "2019-03-05T15:00:00Z",
        "multiplier": 1,
        "range": "LOOP_STOP",
        "step": "SYSTEM_CLOCK_MULTIPLIER"
    }
}, {
    "id": "GroundVehicle_model3",
    "name": "Cesium GroundVehicle",
    "position": {
        "cartographicDegrees": [
            "2019-03-05T15:00:00Z", -123.07428185240943, 44.05051562147769, 100,
            "2019-03-05T15:00:40Z", -123.07357554718455, 44.05051539625325, 100,
        ]
    },
    "model": {
        "gltf": "cesium/Models/obus.gltf",
        "scale": 0.025,
        /*"gltf": "cesium/Models/CesiumMilkTruck/CesiumMilkTruck.glb",
        "scale": 1.0,*/
        "minimumPixelSize": 128,
        // "heightReference": "Cesium.HeightReference.CLAMP_TO_GROUND"
    }
}];