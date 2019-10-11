var map, view, cloud;

function init() {
	var epsg = 'EPSG:' + epsgCode;
	var projection = ol.proj.get(epsg);

	// 初始化显示视图
	var z = maxZoom;
	if (urlType == "4") {
		z = maxZoom - 1;
	}
	view = new ol.View({
		center: ol.proj.transform([centX, centY], 'EPSG:4326', epsg),
		projection: projection,
		zoom: z,
		minZoom: minZoom
	});

	// 初始化地标图层
	var icons = new Array();

	var iconStyle = new ol.style.Style({
		image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
			anchor: [0.5, 46],
			anchorXUnits: 'fraction',
			anchorYUnits: 'pixels',
			src: 'img/icon.png'
		}))
	});

	if (pointsStr != "") {
		var points = pointsStr.split("##");
		for (var i = 0; i < points.length; i++) {
			var point = points[i];
			var info = point.split('$');
			var icon = new ol.Feature({
				geometry: new ol.geom.Point([parseFloat(info[1]), parseFloat(info[0])]),
				name: info[2],
				population: 4000,
				rainfall: 500
			});

			icon.setStyle(iconStyle);
			icons[i] = icon;
		}
	}

	var vectorLayer = new ol.layer.Vector({
		source: new ol.source.Vector({
			features: icons
		})
	});

	// 初始化地图
	map = new ol.Map({
		target: 'map',
		controls: ol.control.defaults().extend([
			// 全屏
			new ol.control.FullScreen(),
			// 鹰眼
			new ol.control.OverviewMap({
				collapsed: false
			}),
			// 比例尺
			new ol.control.ScaleLine(),
			// 鼠标位置
			new ol.control.MousePosition({
				coordinateFormat: ol.coordinate.createStringXY(6),
				projection: ol.proj.get('EPSG:4326'),
				className: 'custom-mouse-position',
				target: document.getElementById('mouse-position')
			}),
			// 图层切换
			new ol.control.LayerSwitcherImage(),
			// 指南针
			new ol.control.Compass({
				className: "bottom",
				src: "img/piratecontrol.png",
				rotateWithView: true,
			}),
		]),
		interactions: ol.interaction.defaults().extend([
			new ol.interaction.DragRotateAndZoom()
		]),
		loadTilesWhileAnimating: true,
		target: document.getElementById('map'),
		view: view
	});

	// 添加离线地图图层
	if (urlType == "4") {
		// 百度格式瓦片
		var resolutions = [];
		for (var i = 0; i < 20; i++) {
			resolutions[i] = Math.pow(2, 18 - i);
		}

		var tileGrid = new ol.tilegrid.TileGrid({
			origin: [0, 0],
			resolutions: resolutions
		});
		map.addLayer(
			new ol.layer.Tile({
				title: "离线地图",
				baseLayer: true,
				preview: 'img/0.png',
				source: new ol.source.XYZ({
					attributions: '<a href="http://www.arctiler.com/">太乐地图</a> © 2012',
					minZoom: minZoom - 1,
					maxZoom: maxZoom,
					projection: projection,
					tileSize: tileSize,
					tileGrid: tileGrid,
					tileUrlFunction: function (tileCoord, pixelRatio, proj) {
						if (!tileCoord) {
							return "";
						}
						var z = tileCoord[0];
						var x = tileCoord[1];
						var y = tileCoord[2];
						if (x < 0) {
							x = "M" + (-x);
						}
						if (y < 0) {
							y = "M" + (-y);
						}
						return outputPath + z + "/" + x + "/" + y + format;
					}
				})
			})
		)
	}
	else if (urlType == "5") {
		map.addLayer(
			new ol.layer.Tile({
				title: "离线地图",
				baseLayer: true,
				preview: 'img/0.png',
				source: new ol.source.XYZ({
					url: outputPath + 'L{z}/R{y}/C{x}' + format,
					projection: projection,
					tileUrlFunction: function (tileCoord, pixelRatio, projection) {
						if (!tileCoord) {
							return undefined;
						} else {
							var z = tileCoord[0];
							if (z < 10) {
								z = "0" + z;
							}
							var tempX = "00000000" + (tileCoord[1]).toString(16);
							var tempY = "00000000" + (-tileCoord[2] - 1).toString(16);
							return this.getUrls()[0].replace('{x}', tempX.substring(tempX.length - 8))
								.replace('{y}', tempY.substring(tempY.length - 8)).replace('{z}', z)
	
						}
					}
				})
			})
		)
	}
	else {
		//	其它格式瓦片
		var url = outputPath;
		if (urlType == "0") {
			url += "{z}/{x}/{y}" + format;
		} else if (urlType == "1") {
			url += "{z}/{y}/{x}" + format;
		} else if (urlType == "2") {
			url += "{z}/{x}/{x}_{y}" + format;
		} else if (urlType == "3") {
			url += "{z}/{x}/{-y}" + format;
		}

		map.addLayer(
			new ol.layer.Tile({
				title: "离线地图",
				baseLayer: true,
				preview: 'img/0.png',
				source: new ol.source.XYZ({
					attributions: '<a href="http://www.arctiler.com/">太乐地图</a> © 2012',
					minZoom: minZoom,
					maxZoom: maxZoom,
					projection: projection,
					tileSize: tileSize,
					url: url
				})
			})
		)
	}
	// 添加其它在线地图图层
	initLayers();

	// 地标相关
	if (pointsStr != "") {
		map.addLayer(vectorLayer);
	}
	markers();
	tilerMarker();

	// 绘制云
	addCloud();
}

/******************************************************************************************************************
											          图层相关
******************************************************************************************************************/
function initLayers() {
	map.addLayer(new ol.layer.Tile({
		title: "ArcGIS卫星",
		baseLayer: true,
		source: new ol.source.XYZ({
			url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg",
			attributions: ['&copy; <a href="http://www.arcgis.com/home/">Esri</a> ',
				'&copy; <a href="http://www.arcgis.com/home/">DigitalGlobe, Earthstar Geographics, CNES/Airbus DS, GeoEye, USDA FSA, USGS, Getmapping, Aerogrid, IGN, IGP, swisstopo</a> '
			]
		}),
		visible: false
	}));
	map.addLayer(new ol.layer.Tile({
		title: "天地图卫星",
		baseLayer: true,
		source: new ol.source.XYZ({
			url: 'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=1d109683f4d84198e37a38c442d68311'
		}),
		visible: false
	}));
	map.addLayer(new ol.layer.Tile({
		title: "天地图街道",
		baseLayer: true,
		source: new ol.source.XYZ({
			url: 'http://t3.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=1d109683f4d84198e37a38c442d68311'
		}),
		visible: false
	}));
	map.addLayer(new ol.layer.Tile({
		title: "天地图地形",
		baseLayer: true,
		source: new ol.source.XYZ({
			url: 'http://t3.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=1d109683f4d84198e37a38c442d68311'
		}),
		visible: false
	}));
	map.addLayer(new ol.layer.Tile({
		title: "百度地图",
		baseLayer: true,
		source: this.getBaiduSource(),
		visible: false,
	}));
	map.addLayer(new ol.layer.Tile({
		title: "OpenStretMap",
		baseLayer: true,
		source: new ol.source.OSM(),
		visible: false
	}));
}

function getBaiduSource() {
	var projection = ol.proj.get("EPSG:3857");
	var resolutions = [];
	for (var i = 0; i < 19; i++) {
		resolutions[i] = Math.pow(2, 18 - i);
	}
	var tilegrid = new ol.tilegrid.TileGrid({
		origin: [0, 0],
		resolutions: resolutions
	});
	return new ol.source.TileImage({
		projection: projection,
		tileGrid: tilegrid,
		tileUrlFunction: function (tileCoord, pixelRatio, proj) {
			if (!tileCoord) {
				return "";
			}
			var z = tileCoord[0];
			var x = tileCoord[1];
			var y = tileCoord[2];
			if (x < 0) {
				x = "M" + (-x);
			}
			if (y < 0) {
				y = "M" + (-y);
			}
			return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x=" + x + "&y=" + y + "&z=" + z + "&styles=pl&udt=20190610&scaler=1&p=1";
		}
	});

}

/******************************************************************************************************************
											          地标相关
******************************************************************************************************************/

function markers() {
	var element = document.getElementById('popup');

	var popup = new ol.Overlay({
		element: element,
		positioning: 'bottom-center',
		stopEvent: false,
		offset: [0, -50]
	});
	map.addOverlay(popup);

	// 鼠标点击后，弹出属性提示框
	map.on('click', function (evt) {
		var feature = map.forEachFeatureAtPixel(evt.pixel,
			function (feature) {
				return feature;
			});
		if (feature) {
			var coordinates = feature.getGeometry().getCoordinates();
			popup.setPosition(coordinates);
			$(element).popover({
				'placement': 'top',
				'html': true,
				'content': '<img src=\'img/v.jpg\'/></br>' + feature.get('name')
			});
			$(element).popover('show');
		} else {
			$(element).popover('destroy');
		}
	});

	// 鼠标移动后，改变鼠标样式
	map.on('pointermove', function (e) {
		if (e.dragging) {
			$(element).popover('destroy');
			return;
		}
		var pixel = map.getEventPixel(e.originalEvent);
		var hit = map.hasFeatureAtPixel(pixel);
		map.getTarget().style.cursor = hit ? 'pointer' : '';
	});
}

function tilerMarker() {
	var iconFeature = new ol.Feature({
		geometry: new ol.geom.Point(ol.proj.transform([centX, centY], 'EPSG:4326', 'EPSG:' + epsgCode)),
		name: '站在分叉的十字路口，你会迷失还是继续前行？</br>太乐地图，让地理信息应用更简单，让我们携手探索，回归。',
	});

	var tilerVectorSource = new ol.source.Vector({
		features: [iconFeature]
	});

	map.addLayer(new ol.layer.Vector({
		name: '太乐地图',
		source: tilerVectorSource,
		style: new ol.style.Style({
			image: new ol.style.Icon({
				anchor: [0.5, 50],
				anchorXUnits: 'fraction',
				anchorYUnits: 'pixels',
				src: "img/icon.png",
				scale: 1
			})
		})
	}));
}

/******************************************************************************************************************
												 	 云层
******************************************************************************************************************/

function addCloud() {
	cloud = new ol.control.Cloud({ opacity: 0.3, density: 0.2, windSpeed: 1, windAngle: 45 * Math.PI / 180 });
	map.addControl(cloud);
	var cloudBtn = new ol.control.Button({
		html: '<i class="glyphicon glyphicon-cloud"></i>',
		className: "ol-cloud",
		title: "云层控制",
		handleClick: function () {
			var controls = map.getControls();
			var removed = false;
			controls.array_.forEach(function (item) {
				if (item.cloud) {
					map.removeControl(cloud);
					removed = true;
				}
			});
			if (!removed) {
				map.addControl(cloud);
			}
		}

	});
	map.addControl(cloudBtn);
}


/******************************************************************************************************************
													窗口控制相关
******************************************************************************************************************/

function showAbout() {
	document.getElementById("aboutContainer").style.visibility = "visible";
}

function hideAbout() {
	document.getElementById("aboutContainer").style.visibility = "hidden";
}