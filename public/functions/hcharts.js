function line() {
    var x = document.getElementById("line");
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }
}

function bar() {
    var x = document.getElementById("bar");
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }
}

function pie() {
    var x = document.getElementById("pie");
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }
}

function bubble() {
    var x = document.getElementById("bubble");
    if (x.style.display == "block") {
        x.style.cssText = "display:none"
    } else {
        x.style.cssText = "display:block"
    }
}

function lineshow() {
    $(document).ready(function () {
        chart = new Highcharts.Chart({
            colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
                '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
            chart: {
                backgroundColor: {
                    linearGradient: {x1: 0, y1: 0, x2: 1, y2: 1},
                    stops: [
                        [0, '#2a2a2b'],
                        [1, '#3e3e40']
                    ]
                },
                style: {
                    fontFamily: '\'Unica One\', sans-serif'
                },
                plotBorderColor: '#606063',
                renderTo: 'container1',
                type: 'line',
                marginRight: 10,
                marginBottom: 20,
                scrollablePlotArea: {
                    minWidth: 400
                }
            },
            title: {
                text: '参量曲线图',
                x: -20, //center
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase',
                    fontSize: '16px'
                }
            },
            subtitle: {
                text: '折线统计图',
                x: -20,
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase'
                }
            },
            xAxis: {
                categories: ['05年', '06年',
                    '07年', '08年', '09年', '20年'],
                labels: {
                    style: {
                        color: 'white'
                    }
                },
            },
            yAxis: {
                title: {
                    text: '数据',
                    style: {
                        color: 'white'
                    }
                },
                labels: {
                    style: {
                        color: 'white'
                    }
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/><br/>' +
                        this.x + ': ' + this.y + '单位';
                },
                style: {
                    color: 'white'
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        color: '#F0F0F3',
                        style: {
                            fontSize: '13px'
                        }
                    },
                    marker: {
                        lineColor: '#333'
                    }
                },
                candlestick: {
                    lineColor: 'white'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -20,
                // y: 200,
                borderWidth: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                itemStyle: {
                    color: '#E0E0E3'
                },
                itemHoverStyle: {
                    color: '#FFF'
                },
                itemHiddenStyle: {
                    color: '#606063'
                },
                title: {
                    style: {
                        color: '#C0C0C0'
                    }
                }
            },
            series: [{
                name: '用户1',
                data: [282, 225, 252, 265, 222, 282]
            }, {
                name: '用户2',
                data: [270, 220, 248, 242, 202, 242]
            }, {
                name: '用户3',
                data: [225, 270, 286, 279, 242, 90]
            }, {
                name: '用户4',
                data: [229, 252, 270, 266, 242, 202]
            }]
        });
    });
    line();
}

function barshow() {
    chart = new Highcharts.Chart({
        colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
            '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
        chart: {
            renderTo: 'container2',
            type: 'column',
            backgroundColor: {
                linearGradient: {x1: 0, y1: 0, x2: 1, y2: 1},
                stops: [
                    [0, '#2a2a2b'],
                    [1, '#3e3e40']
                ]
            },
            style: {
                fontFamily: '\'Unica One\', sans-serif'
            },
            plotBorderColor: '#606063'
        },
        title: {
            text: '比对柱形图',
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase',
                fontSize: '20px'
            }
        },
        subtitle: {
            text: '柱状统计图',
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase'
            }
        },
        xAxis: {
            categories: [
                '06年',
                '07年',
                '08年',
                '09年',
                '10年',
                '11年',
                '12年'
            ],
            labels: {
                style: {
                    color: 'white'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '数据',
                style: {
                    color: 'white'
                }
            },
            labels: {
                style: {
                    color: 'white'
                }
            }
        },
        legend: {
            layout: 'vertical',
            backgroundColor: 'black',
            align: 'right',
            verticalAlign: 'top',
            x: -20,
            // y: 70,
            floating: true,
            shadow: true
        },
        tooltip: {
            formatter: function () {
                return '' +
                    this.x + ': ' + this.y + ' 单位';
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '用户1',
            data: [1760, 1356, 1485, 2164, 1941, 956, 544]

        }, {
            name: '用户2',
            data: [845, 1050, 1043, 912, 835, 1066, 923]

        }, {
            name: '用户3',
            data: [483, 590, 596, 524, 652, 593, 512]

        }, {
            name: '用户4',
            data: [755, 574, 604, 476, 391, 468, 511]

        }]
    });
    bar();
}

function pieshow() {
    //饼状图初始化
    chart = new Highcharts.Chart({
        colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
            '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
        chart: {
            renderTo: 'container3',
            type: 'pie',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            backgroundColor: {
                linearGradient: {x1: 0, y1: 0, x2: 1, y2: 1},
                stops: [
                    [0, '#2a2a2b'],
                    [1, '#3e3e40']
                ]
            },
            style: {
                fontFamily: '\'Unica One\', sans-serif'
            },
            plotBorderColor: '#606063'
        },
        title: {
            text: '成分比例图',
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase',
                fontSize: '20px'
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.point.name + '</b>: ' + this.percentage.toFixed(2) + ' %';
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    formatter: function () {
                        return '<b>' + this.point.name + '</b>: ' + this.percentage.toFixed(2) + ' %';
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'pie',
            data: [
                ['圆通', 55.0],
                ['中通', 26.8],
                {
                    name: 'EMS',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['申通', 7.5]
            ]
        }]
    });
    pie();
}

function bubbleshow() {
    chart = new Highcharts.Chart({
        colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
            '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
        chart: {
            renderTo: 'container4',
            type: 'packedbubble',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            backgroundColor: {
                linearGradient: {x1: 0, y1: 0, x2: 1, y2: 1},
                stops: [
                    [0, '#2a2a2b'],
                    [1, '#3e3e40']
                ]
            },
            style: {
                fontFamily: '\'Unica One\', sans-serif'
            },
            plotBorderColor: '#606063'
        },
        title: {
            text: '案事件勘验研判全要素关联图',
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase',
                fontSize: '20px'
            }
        },
        // subtitle: {
        //     text:'Carbon emissions around the world (2014)',
        //     style: {
        //         color: '#E0E0E3',
        //         textTransform: 'uppercase'
        //     }
        // },

        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}:</b> {point.value}‰'//<sub>2</sub>
        },
        plotOptions: {
            packedbubble: {
                minSize: '10%',
                maxSize: '140%',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                    splitSeries: false,
                    gravitationalConstant: 0.2
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    filter: {
                        property: 'y',
                        operator: '>',
                        value: 250
                    },
                    style: {
                        color: 'black',
                        textOutline: 'none',
                        fontWeight: 'normal'
                    }
                }
            }
        },
        legend: {
            enabled: false,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            itemStyle: {
                color: '#E0E0E3'
            },
            itemHoverStyle: {
                color: '#FFF'
            },
            itemHiddenStyle: {
                color: '#606063'
            },
            title: {
                style: {
                    color: '#C0C0C0'
                }
            }
        },
        series: [{
            name: '痕迹',
            data: [{name: '血液', value: 332.0}, {name: '足迹', value: 334.0}, {name: '手印', value: 734.0}]
        }, {
            name: '物品',
            data: [{name: '地板', value: 445.0}, {name: '扶手', value: 327.0}, {name: '门窗', value: 618.0}]
        }, {
            name: '主体',
            data: [{name: '被害人1', value: 778.0}, {name: '被害人2', value: 318.0}, {name: '嫌疑人', value: 324.0}]
        }, {
            name: '信息', data: [{name: '录音', value: 581.0}, {name: '视频', value: 312.0}, {name: '基站', value: 327.0}]
        }]
        /*[{
            name: 'Europe',
            data: [{
                name: 'Germany',
                value: 767.1
            }, {
                name: 'Croatia',
                value: 20.7
            },
                {
                    name: "Belgium",
                    value: 97.2
                },
                {
                    name: "Czech Republic",
                    value: 111.7
                },
                {
                    name: "Netherlands",
                    value: 158.1
                },
                {
                    name: "Spain",
                    value: 241.6
                },
                {
                    name: "Ukraine",
                    value: 249.1
                },
                {
                    name: "Poland",
                    value: 298.1
                },
                {
                    name: "France",
                    value: 323.7
                },
                {
                    name: "Romania",
                    value: 78.3
                },
                {
                    name: "United Kingdom",
                    value: 415.4
                }, {
                    name: "Turkey",
                    value: 353.2
                }, {
                    name: "Italy",
                    value: 337.6
                },
                {
                    name: "Greece",
                    value: 71.1
                },
                {
                    name: "Austria",
                    value: 69.8
                },
                {
                    name: "Belarus",
                    value: 67.7
                },
                {
                    name: "Serbia",
                    value: 59.3
                },
                {
                    name: "Finland",
                    value: 54.8
                },
                {
                    name: "Bulgaria",
                    value: 51.2
                },
                {
                    name: "Portugal",
                    value: 48.3
                },
                {
                    name: "Norway",
                    value: 44.4
                },
                {
                    name: "Sweden",
                    value: 44.3
                },
                {
                    name: "Hungary",
                    value: 43.7
                },
                {
                    name: "Switzerland",
                    value: 40.2
                },
                {
                    name: "Denmark",
                    value: 40
                },
                {
                    name: "Slovakia",
                    value: 34.7
                },
                {
                    name: "Ireland",
                    value: 34.6
                },
                {
                    name: "Croatia",
                    value: 20.7
                },
                {
                    name: "Estonia",
                    value: 19.4
                },
                {
                    name: "Slovenia",
                    value: 16.7
                },
                {
                    name: "Lithuania",
                    value: 12.3
                },
                {
                    name: "Luxembourg",
                    value: 10.4
                },
                {
                    name: "Macedonia",
                    value: 9.5
                },
                {
                    name: "Moldova",
                    value: 7.8
                },
                {
                    name: "Latvia",
                    value: 7.5
                },
                {
                    name: "Cyprus",
                    value: 7.2
                }]
        }, {
            name: 'Africa',
            data: [{
                name: "Senegal",
                value: 8.2
            },
                {
                    name: "Cameroon",
                    value: 9.2
                },
                {
                    name: "Zimbabwe",
                    value: 13.1
                },
                {
                    name: "Ghana",
                    value: 14.1
                },
                {
                    name: "Kenya",
                    value: 14.1
                },
                {
                    name: "Sudan",
                    value: 17.3
                },
                {
                    name: "Tunisia",
                    value: 24.3
                },
                {
                    name: "Angola",
                    value: 25
                },
                {
                    name: "Libya",
                    value: 50.6
                },
                {
                    name: "Ivory Coast",
                    value: 7.3
                },
                {
                    name: "Morocco",
                    value: 60.7
                },
                {
                    name: "Ethiopia",
                    value: 8.9
                },
                {
                    name: "United Republic of Tanzania",
                    value: 9.1
                },
                {
                    name: "Nigeria",
                    value: 93.9
                },
                {
                    name: "South Africa",
                    value: 392.7
                }, {
                    name: "Egypt",
                    value: 225.1
                }, {
                    name: "Algeria",
                    value: 141.5
                }]
        }, {
            name: 'Oceania',
            data: [{
                name: "Australia",
                value: 409.4
            },
                {
                    name: "New Zealand",
                    value: 34.1
                },
                {
                    name: "Papua New Guinea",
                    value: 7.1
                }]
        }, {
            name: 'North America',
            data: [{
                name: "Costa Rica",
                value: 7.6
            },
                {
                    name: "Honduras",
                    value: 8.4
                },
                {
                    name: "Jamaica",
                    value: 8.3
                },
                {
                    name: "Panama",
                    value: 10.2
                },
                {
                    name: "Guatemala",
                    value: 12
                },
                {
                    name: "Dominican Republic",
                    value: 23.4
                },
                {
                    name: "Cuba",
                    value: 30.2
                },
                {
                    name: "USA",
                    value: 5334.5
                }, {
                    name: "Canada",
                    value: 566
                }, {
                    name: "Mexico",
                    value: 456.3
                }]
        }, {
            name: 'South America',
            data: [{
                name: "El Salvador",
                value: 7.2
            },
                {
                    name: "Uruguay",
                    value: 8.1
                },
                {
                    name: "Bolivia",
                    value: 17.8
                },
                {
                    name: "Trinidad and Tobago",
                    value: 34
                },
                {
                    name: "Ecuador",
                    value: 43
                },
                {
                    name: "Chile",
                    value: 78.6
                },
                {
                    name: "Peru",
                    value: 52
                },
                {
                    name: "Colombia",
                    value: 74.1
                },
                {
                    name: "Brazil",
                    value: 501.1
                }, {
                    name: "Argentina",
                    value: 199
                },
                {
                    name: "Venezuela",
                    value: 195.2
                }]
        }, {
            name: 'Asia',
            data: [{
                name: "Nepal",
                value: 6.5
            },
                {
                    name: "Georgia",
                    value: 6.5
                },
                {
                    name: "Brunei Darussalam",
                    value: 7.4
                },
                {
                    name: "Kyrgyzstan",
                    value: 7.4
                },
                {
                    name: "Afghanistan",
                    value: 7.9
                },
                {
                    name: "Myanmar",
                    value: 9.1
                },
                {
                    name: "Mongolia",
                    value: 14.7
                },
                {
                    name: "Sri Lanka",
                    value: 16.6
                },
                {
                    name: "Bahrain",
                    value: 20.5
                },
                {
                    name: "Yemen",
                    value: 22.6
                },
                {
                    name: "Jordan",
                    value: 22.3
                },
                {
                    name: "Lebanon",
                    value: 21.1
                },
                {
                    name: "Azerbaijan",
                    value: 31.7
                },
                {
                    name: "Singapore",
                    value: 47.8
                },
                {
                    name: "Hong Kong",
                    value: 49.9
                },
                {
                    name: "Syria",
                    value: 52.7
                },
                {
                    name: "DPR Korea",
                    value: 59.9
                },
                {
                    name: "Israel",
                    value: 64.8
                },
                {
                    name: "Turkmenistan",
                    value: 70.6
                },
                {
                    name: "Oman",
                    value: 74.3
                },
                {
                    name: "Qatar",
                    value: 88.8
                },
                {
                    name: "Philippines",
                    value: 96.9
                },
                {
                    name: "Kuwait",
                    value: 98.6
                },
                {
                    name: "Uzbekistan",
                    value: 122.6
                },
                {
                    name: "Iraq",
                    value: 139.9
                },
                {
                    name: "Pakistan",
                    value: 158.1
                },
                {
                    name: "Vietnam",
                    value: 190.2
                },
                {
                    name: "United Arab Emirates",
                    value: 201.1
                },
                {
                    name: "Malaysia",
                    value: 227.5
                },
                {
                    name: "Kazakhstan",
                    value: 236.2
                },
                {
                    name: "Thailand",
                    value: 272
                },
                {
                    name: "Taiwan",
                    value: 276.7
                },
                {
                    name: "Indonesia",
                    value: 453
                },
                {
                    name: "Saudi Arabia",
                    value: 494.8
                },
                {
                    name: "Japan",
                    value: 1278.9
                },
                {
                    name: "China",
                    value: 10540.8
                },
                {
                    name: "India",
                    value: 2341.9
                },
                {
                    name: "Russia",
                    value: 1766.4
                },
                {
                    name: "Iran",
                    value: 618.2
                },
                {
                    name: "Korea",
                    value: 610.1
                }]
        }]*/
    })
    bubble();
}

$(function () {
    //dragPanelMove("#mark_goods_table");
    //dragPanelMove("#bubble");

    function dragPanelMove(moveDiv) {
        $(moveDiv).mousedown(function (e) {
            var isMove = true;
            var div_x = e.pageX - $(moveDiv).offset().left;
            var div_y = e.pageY - $(moveDiv).offset().top;
            $(document).mousemove(function (e) {
                if (isMove) {
                    var obj = $(moveDiv);
                    obj.css({"left": e.pageX - div_x, "top": e.pageY - div_y});
                }
            }).mouseup(
                function () {
                    isMove = false;
                });
        });
    }
});
