var allModels = {
    // "Concrete_hang_TNT":["0.5kg","1kg","2.5kg","2kg","3kg","4kg","6kg","8kg","12kg"],
    "TNT1kg": ["ne6", "ne10", "ne15", "ne20", "ne25", "ne40", "ne50", "ne60", "ne70", "ne90"],
    "TNT30cm": ["0.2kg", "0.5kg", "1.0kg", "1.5kg", "2.0kg", "3.0kg"],
    "ruhua": ["0.2kg", "0.5kg", "1.0kg", "1.5kg", "2.0kg", "3kg", "4kg", "5kg", "6kg", "8kg"],
    "single": ["hang_2.5kgTNT", "overground_2.5kgTNT", "soilExplosion"]
};
// 输入参数,模型类别modelName,时刻的集合alldir,切片尺寸photoSize,每个时刻切片数量photoNum,
var alltimes = {
    'TNT1kg': [{'ne6': ['T0', 'T100999', 'T125999', 'T151000', 'T176999', 'T202999', 'T228000', 'T25000', 'T50999', 'T76000']}, {'ne10': ['T0', 'T124999', 'T25000', 'T50000', 'T75000', 'T99999']}, {'ne15': ['T0', 'T124999', 'T150000', 'T174999', 'T200499', 'T225500', 'T24999', 'T250001', 'T49999', 'T74999', 'T99999']}, {'ne20': ['T0', 'T124999', 'T149999', 'T174999', 'T200000', 'T224999', 'T24999', 'T250000', 'T49999', 'T74998', 'T99999']}, {'ne25': ['T0', 'T124999', 'T150000', 'T174999', 'T200000', 'T224999', 'T24999', 'T249999', 'T49999', 'T75000', 'T99998']}, {'ne40': ['T0', 'T124999', 'T150000', 'T175000', 'T200000', 'T226500', 'T24999', 'T49999', 'T75000', 'T99999']}, {'ne50': ['T0', 'T24999', 'T50500', 'T75500']}, {'ne60': ['T0', 'T124999', 'T150000', 'T175000', 'T199999', 'T225999', 'T24999', 'T49999', 'T75000', 'T99999']}, {'ne70': ['T0', 'T125000', 'T149999', 'T174999', 'T200000', 'T226499', 'T24998', 'T49999', 'T74999', 'T99999']}, {'ne90': ['T0', 'T125000', 'T149999', 'T175000', 'T199999', 'T224999', 'T24999', 'T250000', 'T275000', 'T50000', 'T74999', 'T99999']}],
    'TNT30cm': [{'0.2kg': ['T0', 'T104999', 'T120000', 'T134999', 'T14999', 'T149999', 'T29999', 'T44999', 'T60000', 'T74998', 'T89999']}, {'0.5kg': ['T0', 'T104999', 'T120000', 'T135000', 'T15000', 'T150000', 'T30000', 'T44999', 'T59999', 'T74999', 'T90000']}, {'1.0kg': ['T0', 'T112249', 'T129749', 'T147249', 'T164749', 'T2000', 'T24749', 'T2998', 'T3998', 'T42249', 'T59749', 'T7250', 'T77249', 'T94749', 'T999']}, {'1.5kg': ['T0', 'T105000', 'T122500', 'T139999', 'T157499', 'T17498', 'T34999', 'T52499', 'T69998', 'T87500']}, {'2.0kg': ['T0', 'T100000', 'T119999', 'T139999', 'T160000', 'T179999', 'T19998', 'T200000', 'T40000', 'T59998', 'T79999']}, {'3.0kg': ['T0', 'T100000', 'T120000', 'T139999', 'T160000', 'T179999', 'T20000', 'T200000', 'T39999', 'T59999', 'T79999']}],
    'ruhua': [{'0.2kg': ['T0', 'T100499', 'T12499', 'T125499', 'T24998', 'T37749', 'T50249', 'T62750', 'T75248', 'T87750']}, {'0.5kg': ['T0', 'T105000', 'T135000', 'T170000', 'T17500', 'T204999', 'T241000', 'T34998', 'T52499', 'T69998', 'T87499']}, {'1.0kg': ['T0', 'T104999', 'T125999', 'T147000', 'T180499', 'T21000', 'T215500', 'T250001', 'T41999', 'T62999', 'T83998']}, {'1.5kg': ['T0', 'T105000', 'T125998', 'T147000', 'T167999', 'T195500', 'T20998', 'T231499', 'T42000', 'T62999', 'T83999']}, {'2.0kg': ['T0', 'T125000', 'T150000', 'T175000', 'T199999', 'T225000', 'T24999', 'T250000', 'T49999', 'T75000', 'T99999']}, {'3kg': ['T0', 'T112499', 'T12499', 'T124999', 'T137500', 'T149999', 'T162500', 'T174999', 'T187499', 'T200000', 'T212499', 'T225000', 'T237500', 'T249999', 'T25000', 'T37499', 'T49999', 'T62500', 'T75000', 'T87499', 'T99999']}, {'4kg': ['T0', 'T124999', 'T150000', 'T174999', 'T200000', 'T224999', 'T24999', 'T49999', 'T74999', 'T99999']}, {'5kg': ['T0', 'T100000', 'T124999', 'T149999', 'T174999', 'T199999', 'T225000', 'T24998', 'T249999', 'T49999', 'T75000']}, {'6kg': ['T0', 'T124999', 'T149999', 'T174999', 'T200000', 'T224999', 'T249999', 'T25000', 'T50000', 'T75000', 'T99999']}, {'8kg': ['T0', 'T125000', 'T150000', 'T175000', 'T199999', 'T225000', 'T24999', 'T249999', 'T275000', 'T49998', 'T74999', 'T99999']}],
    'single': [{'hang_2.5kgTNT': ['T0', 'T350', 'T700', 'T1050', 'T1400', 'T1750', 'T2100', 'T2450', 'T2800', 'T3150', 'T3500', 'T3850', 'T4200', 'T4550', 'T4900', 'T5250', 'T5600', 'T5950', 'T6300', 'T6650', 'T7000']}, {'overground_2.5kgTNT': ['T0', 'T60', 'T120', 'T180', 'T240', 'T300', 'T360', 'T420', 'T480', 'T540', 'T600', 'T660', 'T720', 'T780', 'T840', 'T900', 'T960', 'T1020', 'T1080', 'T1140', 'T1200']}, {'soilExplosion': ['T0', 'T4999', 'T10000', 'T14999', 'T20000', 'T24999', 'T29998', 'T34998', 'T40000', 'T44999', 'T49999', 'T54999', 'T59998', 'T64999', 'T69999', 'T74999', 'T79999', 'T85000', 'T89999']}]
};

var singleFiles = {
    'hang_2.5kgTNT': ['-53.8cm.png', '-49.8cm.png', '-45.8cm.png', '-41.8cm.png', '-37.8cm.png', '-33.8cm.png', '-17.8cm.png', '-13.8cm.png', '-9.8cm.png', '-5.8cm.png', '-1.8cm.png'],
    'overground_2.5kgTNT': ['-49.8cm.png', '-45.8cm.png', '-41.8cm.png', '-37.8cm.png', '-33.8cm.png', '-13.8cm.png', '-9.8cm.png', '-5.8cm.png', '-1.8cm.png'],
};

function soilBlast(model1, model2, location) {
    //用于测试的平面
    // var centerx=114.21784242174171, centery=30.359570351833124;
    var photoSize = [0.5, 0.5];
    var index = allModels[model1].indexOf(model2)
    alldir = alltimes[model1][index][model2];
    var modelName = model1 + '/' + model2
    var id = 0;
    var primitives = [];
    //调整模型大小 0.125*0.045
    var size = 0.00022;
    var centerx = location[0];
    var centery = location[1];

    //高度缩放[乘因子,常数因子]
    var heightScale = [1, 0];
    //模型加载的切片个数
    var heightLayers = 30;
    if (model2 === "hang_2.5kgTNT") {
        heightLayers = singleFiles["hang_2.5kgTNT"].length;
        photoSize = [0.54, 0.2];
        heightScale = [2, 15];
    } else if (model2 === "soilExplosion") {
        photoSize = [0.3, 0.252];
    } else if (model2 === "overground_2.5kgTNT") {
        heightLayers = singleFiles["overground_2.5kgTNT"].length;
        photoSize = [0.5, 0.18];
        heightScale = [2, 15];
    }
    // console.log(photoSize);
    var leftX = centerx - size * photoSize[0];
    var rightX = centerx + size * photoSize[0];
    var topY = centery + size * photoSize[1];
    var bottomY = centery - size * photoSize[1];
    for (var h = 0; h < heightLayers; h++) {
        // console.log('here is going');
        var imageUrl = (function () {
                // console.log(model1==="TNT1kg"||model1==="TNT30cm"||model1==="ruhua");
                if (model1 === "TNT1kg" || model1 === "TNT30cm" || model1 === "ruhua") {
                    return 'layers/' + modelName + '/fullImg/' + alldir[0] + '/' + (-179.4 + h * 6.0).toFixed(1).toString() + 'cm.png'
                } else if (model2 === "hang_2.5kgTNT") {
                    return 'layers/' + modelName + '/fullImg/' + alldir[0] + '/' + singleFiles["hang_2.5kgTNT"][h]
                } else if (model2 === "soilExplosion") {
                    return 'layers/' + modelName + '/fullImg/' + alldir[0] + '/' + (-179.4 + h * 6.0).toFixed(1).toString() + 'cm.png'
                } else if (model2 === "overground_2.5kgTNT") {
                    return 'layers/' + modelName + '/fullImg/' + alldir[0] + '/' + singleFiles["overground_2.5kgTNT"][h]
                }
            }
        )();
        primitives.push(viewer.scene.primitives.add(new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                id: id,
                geometry: new Cesium.RectangleGeometry({
                    ellipsoid: Cesium.Ellipsoid.WGS84,
                    rectangle: Cesium.Rectangle.fromDegrees(leftX, bottomY, rightX, topY),
                    height: h * heightScale[0] + heightScale[1],
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
                            image: imageUrl
                        }
                    },
                    transport: true
                })
            })
        })))
        id++;
    }
    var time = 0;
    //每个模型时刻数
    var length = alldir.length;
    //有19个时间节点
    var timer_bz = setInterval(function () {
        if (time == length) {
            clearInterval(timer_bz);
        } else {
            for (var i = 0; i < primitives.length; i++) {
                // console.log(alldir[time]);
                if (model1 === "TNT1kg" || model1 === "TNT30cm" || model1 === "ruhua") {
                    primitives[i].appearance.material.uniforms.image = 'layers/' + modelName + '/fullImg/' + alldir[time] + '/' + (-179.4 + i * 6.0).toFixed(1).toString() + 'cm.png';
                } else if (model2 === "hang_2.5kgTNT") {
                    primitives[i].appearance.material.uniforms.image = 'layers/' + modelName + '/fullImg/' + alldir[time] + '/' + singleFiles["hang_2.5kgTNT"][i];
                } else if (model2 === "soilExplosion") {
                    primitives[i].appearance.material.uniforms.image = 'layers/' + modelName + '/fullImg/' + alldir[time] + '/' + (-179.4 + i * 6.0).toFixed(1).toString() + 'cm.png';
                } else if (model2 === "overground_2.5kgTNT") {
                    primitives[i].appearance.material.uniforms.image = 'layers/' + modelName + '/fullImg/' + alldir[time] + '/' + singleFiles["overground_2.5kgTNT"][i];
                }
            }
            time += 1;
        }
        //?????
    }, 500);
    viewer.camera.setView({
        destination: {x: -2259529.669909889, y: 5023703.358779508, z: 3204751.5837182626},
        orientation: {
            heading: 0.016569134962708176,
            pitch: -0.5862737599993473,
            roll: 0.000058279677437766964
        }
    });
}


//展示动态爆炸过程
function show_layers() {
    //用于测试的平面
    // var centerx=114.21784242174171, centery=30.359570351833124;
    var primitives = [];
    var id = 0;
    // var allz = ['-1.8','-5.8','-9.8','-13.8','-33.8','-37.8','-41.8','-45.8','-49.8'];
    var allz = ['-53.8', '-49.8', '-45.8', '-41.8', '-37.8', '-33.8', '-17.8', '-13.8', '-9.8', '-5.8', '-1.8']
    //调整模型大小 0.125*0.045
    var size = 0.00022;
    // var photosize =[0.125*10,0.045*10]
    var photosize = [0.135 * 10, 0.05 * 10]

    var centerx = 114.2169971748;
    var centery = 30.3595086389;
    // var leftX = centerx-size*1.25;
    // var rightX = centerx+size*1.25;
    var leftX = centerx - size * photosize[0];
    var rightX = centerx + size * photosize[0];
    var topY = centery + size * photosize[1];
    var bottomY = centery - size * photosize[1];
    // h=12,9
    for (var h = 0; h < 11; h++) {
        console.log('here is going');
        primitives.push(viewer.scene.primitives.add(new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                id: id,
                geometry: new Cesium.RectangleGeometry({
                    ellipsoid: Cesium.Ellipsoid.WGS84,
                    rectangle: Cesium.Rectangle.fromDegrees(leftX, bottomY, rightX, topY),
                    height: h * 4 + 10,
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
                            image: 'layers/hang_2.5kgTNT/fullImg/T0/' + allz[h] + 'cm.png'
                            // image: 'layers/overground_2.5kgTNT/fullImg/T0/'+allz[h]+'cm.png'
                        }
                    },
                    transport: true
                })
            })
        })))
        id++;
    }
    var time = 0;
    var timer_bz = setInterval(function () {
        if (time > 7350) {
            clearInterval(timer_bz);
        } else if (time == 7350) {
            for (var i = 0; i < primitives.length; i++) {
                primitives[i].appearance.material.uniforms.image = 'layers/hang_2.5kgTNT/fullTmax/' + allz[i] + 'cm.png';
                // primitives[i].appearance.material.uniforms.image = 'layers/overground_2.5kgTNT/fullTmax/'+allz[i]+'cm.png';

            }
        } else {
            for (var i = 0; i < primitives.length; i++) {
                primitives[i].appearance.material.uniforms.image = 'layers/hang_2.5kgTNT/fullImg/T' + time.toString() + '/' + allz[i] + 'cm.png';
                // primitives[i].appearance.material.uniforms.image = 'layers/overground_2.5kgTNT/fullImg/T'+time.toString()+'/'+allz[i]+'cm.png';
            }
            time += 350;
        }

        //?????
    }, 500);
    viewer.camera.setView({
        destination: {x: -2259529.669909889, y: 5023703.358779508, z: 3204751.5837182626},
        orientation: {
            heading: 0.016569134962708176,
            pitch: -0.5862737599993473,
            roll: 0.000058279677437766964
        }
    });
}

//加载平面切片和场景模型
// show_tileset();
function show_blasttileset() {
    // 定义一个新的裁剪平面集合
    // clippingPlanes = new Cesium.ClippingPlaneCollection({
    //     planes: [
    //         new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 0.0, -1.0), 80.0)
    //     ],
    //     edgeWidth: 0.0
    // });
    //加载数据集
    newTileSet = new Cesium.Cesium3DTileset({
        url: 'cesium/Models/Tileset.json',
        maximumScreenSpaceError: 20,
        maximumNumberOfLoadedTiles: 500,
        // clippingPlanes: clippingPlanes
    })
    tileset = viewer.scene.primitives.add(newTileSet);
    tileset.readyPromise.then(function (tileset) {
        var boundingSphere = tileset.boundingSphere;
        var radius = boundingSphere.radius;
        var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
        var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
        var height = 10;
        //位置
        var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, height);
        var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
        console.log("加载中");

        // for (var i = 0; i < clippingPlanes.length; i++) {
        //     var plane = clippingPlanes.get(i);
        //     var planeEntity = viewer.entities.add({
        //         position: offset,
        //         plane: {
        // 			//宽高
        //             dimensions: new Cesium.Cartesian2(radius * 0.75, radius * 0.75),
        //             material: new Cesium.ImageMaterialProperty({
        //                 image: 'imgs/0.png',
        //                 transparent: true
        //             }),
        //             plane: new Cesium.CallbackProperty(createPlaneUpdateFunction(plane), false),
        //             outline: true,
        //             outlineColor: Cesium.Color.WHITE
        //         },
        //         show: true
        //     });
        // 	// 热力图的平面
        //     heatPlane = planeEntity;
        // 	// alert(typeof heatPlane.plane);
        //     planeEntities.push(planeEntity);
        // }
    });


    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(114.21952507076327, 30.358135859723472, 800),
        orientation: {
            heading: 0.0,
            pitch: Cesium.Math.toRadians(-90.0),
            roll: 0.0
        }
    });
}