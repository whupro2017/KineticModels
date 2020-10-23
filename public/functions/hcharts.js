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

function bubble(show) {
    var x = document.getElementById("bubble");
    if (show) {
        x.style.cssText = "display:block"
    } else if (x.style.display == "block") {
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

function bubbleshow(jsonseries, show) {
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
        series: jsonseries
        /*[{
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
        }]*/
    })
    bubble(show);
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
