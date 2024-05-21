var parent_nav = document.getElementById('parent-nav');
var side_nav = document.getElementById('side-nav');
var parent_nav_bot = document.getElementById('parent-nav-bot');
var bottom_nav = document.getElementById('bottom-nav');
var parent_nav_right = document.getElementById('parent-nav-right');
var right_nav = document.getElementById('right-nav');
var settings = document.getElementById('settingspage');
var l = document.getElementById('left')
var r = document.getElementById('right')
var b = document.getElementById('bottom')
var animated_btn= document.getElementById('crazy-btn')
var fixed_btn= document.getElementById('fixed-btn')

parent_nav.addEventListener('mouseover', navin);
parent_nav.addEventListener('mouseout', navout);

parent_nav_bot.addEventListener('mouseover', navin);
parent_nav_bot.addEventListener('mouseout', navout);

parent_nav_right.addEventListener('mouseover', navin);
parent_nav_right.addEventListener('mouseout', navout);

function fixed(e) {
    side_nav.style.transform = 'translateX(0px)';
    bottom_nav.style.transform = 'translateY(0px)';
    right_nav.style.transform = 'translateX(0px)';
    parent_nav.removeEventListener("mouseover", navin);
    parent_nav.removeEventListener("mouseout", navout);
    parent_nav_bot.removeEventListener("mouseover", navin);
    parent_nav_bot.removeEventListener("mouseout", navout);
    parent_nav_right.removeEventListener("mouseover", navin);
    parent_nav_right.removeEventListener("mouseout", navout);
    animated_btn.classList.remove('hidden');
    e.classList.add('hidden');

}
function notfixed(e) {
    parent_nav.addEventListener("mouseover", navin);
    parent_nav.addEventListener("mouseout", navout);
    parent_nav_bot.addEventListener("mouseover", navin);
    parent_nav_bot.addEventListener("mouseout", navout);
    parent_nav_right.addEventListener("mouseover", navin);
    parent_nav_right.addEventListener("mouseout", navout);
    fixed_btn.classList.remove('hidden');
    e.classList.add('hidden');
}
function navin() {
    side_nav.style.transform = 'translateX(0px)';
    bottom_nav.style.transform = 'translateY(0px)';
    right_nav.style.transform = 'translateX(0px)';
}
function navout() {
    side_nav.style.transform = 'translateX(-77px)';
    bottom_nav.style.transform = 'translateY(77px)';
    right_nav.style.transform = 'translateX(77px)';
}
function setnav(e) {
    switch (e) {
        case 'left':
            parent_nav.classList.remove('hidden');
            parent_nav_bot.classList.add('hidden');
            parent_nav_right.classList.add('hidden');
            l.classList.add('bg-yellow-500' ,'text-white');
            r.classList.remove('bg-yellow-500' ,'text-white' );
            b.classList.remove('bg-yellow-500' ,'text-white' );
            break;
        case 'bottom':
            parent_nav.classList.add('hidden');
            parent_nav_bot.classList.remove('hidden');
            parent_nav_right.classList.add('hidden');
            l.classList.remove('bg-yellow-500' ,'text-white' );
            r.classList.remove('bg-yellow-500' ,'text-white' );
            b.classList.add('bg-yellow-500' ,'text-white' );
            break;
        case 'right':
            parent_nav.classList.add('hidden');
            parent_nav_bot.classList.add('hidden');
            parent_nav_right.classList.remove('hidden');
            l.classList.remove('bg-yellow-500' ,'text-white' );
            r.classList.add('bg-yellow-500' ,'text-white' );
            b.classList.remove('bg-yellow-500' ,'text-white' );
            break;

        default:
            break;
    }
}

function togglesettings() {
    settings.classList.toggle("hidden");
}
function logout(){
    window.location = "index.html";
}


const options = {
    title: {
        text: 'Gin Stock'
    },

    xAxis: {
        overscroll: 500000,
        range: 4 * 200000,
        gridLineWidth: 1
    },

    rangeSelector: {
        buttons: [{
            type: 'minute',
            count: 15,
            text: '15m'
        }, {
            type: 'hour',
            count: 1,
            text: '1h'
        }, {
            type: 'all',
            count: 1,
            text: 'All'
        }],
        selected: 1,
        inputEnabled: false
    },

    navigator: {
        series: {
            color: '#000000'
        }
    },

    series: [{
        type: 'candlestick',
        color: '#6DC5D1',
        upColor: '#FEB941',

        lastPrice: {
            enabled: true,
            label: {
                enabled: true,
                backgroundColor: '#FF7F7F'
            }
        }
    }]
};

// Imitate getting point from backend
function getNewPoint(i, data) {
    const lastPoint = data[data.length - 1];

    // Add new point
    if (i === 0 || i % 10 === 0) {
        return [
            lastPoint[0] + 60000,
            lastPoint[4],
            lastPoint[4],
            lastPoint[4],
            lastPoint[4]
        ];
    }
    const updatedLastPoint = data[data.length - 1],
        newClose = Highcharts.correctFloat(
            lastPoint[4] + Highcharts.correctFloat(Math.random() - 0.5, 2),
            4
        );

    // Modify last data point
    return [
        updatedLastPoint[0],
        data[data.length - 2][4],
        newClose >= updatedLastPoint[2] ? newClose : updatedLastPoint[2],
        newClose <= updatedLastPoint[3] ? newClose : updatedLastPoint[3],
        newClose
    ];
}

// On load, start the interval that adds points
options.chart = {
    events: {
        load() {
            const chart = this,
                series = chart.series[0];

            let i = 0;

            setInterval(() => {
                const data = series.options.data,
                    newPoint = getNewPoint(i, data),
                    lastPoint = data[data.length - 1];

                // Different x-value, we need to add a new point
                if (lastPoint[0] !== newPoint[0]) {
                    series.addPoint(newPoint);
                } else {
                // Existing point, update it
                    series.options.data[data.length - 1] = newPoint;

                    series.setData(data);
                }
                i++;
            }, 100);
        }
    }
};

// Apply the data to the options
options.series[0].data = [
    [
        1317888000000,
        372.5101,
        375,
        372.2,
        372.52
    ],
    [
        1317888060000,
        372.4,
        373,
        372.01,
        372.16
    ],
    [
        1317888120000,
        372.16,
        372.4,
        371.39,
        371.62
    ],
    [
        1317888180000,
        371.62,
        372.16,
        371.55,
        371.75
    ],
    [
        1317888240000,
        371.75,
        372.4,
        371.57,
        372
    ],
    [
        1317888300000,
        372,
        372.3,
        371.8,
        372.24
    ],
    [
        1317888360000,
        372.22,
        372.45,
        372.22,
        372.3
    ],
    [
        1317888420000,
        372.3,
        373.25,
        372.3,
        373.15
    ],
    [
        1317888480000,
        373.01,
        373.5,
        373,
        373.24
    ],
    [
        1317888540000,
        373.36,
        373.88,
        373.19,
        373.88
    ],
    [
        1317888600000,
        373.8,
        374.34,
        373.75,
        374.29
    ],
    [
        1317888660000,
        374.29,
        374.43,
        374,
        374.01
    ],
    [
        1317888720000,
        374.05,
        374.35,
        373.76,
        374.35
    ],
    [
        1317888780000,
        374.41,
        375.24,
        374.37,
        374.9
    ],
    [
        1317888840000,
        374.83,
        375.73,
        374.81,
        374.96
    ],
    [
        1317888900000,
        374.81,
        375.4,
        374.81,
        375.25
    ],
    [
        1317888960000,
        375.2,
        375.7,
        375.14,
        375.19
    ],
    [
        1317889020000,
        375.43,
        375.43,
        374.75,
        374.76
    ],
    [
        1317889080000,
        374.94,
        375.5,
        374.81,
        375.13
    ],
    [
        1317889140000,
        375.12,
        375.48,
        375,
        375.04
    ],
    [
        1317889200000,
        375.24,
        375.24,
        375,
        375.08
    ],
    [
        1317889260000,
        375.16,
        375.16,
        374.51,
        374.51
    ],
    [
        1317889320000,
        374.51,
        374.75,
        374.2,
        374.27
    ],
    [
        1317889380000,
        374.22,
        374.55,
        373.83,
        374.55
    ],
    [
        1317889440000,
        374.69,
        374.86,
        374.01,
        374.2
    ],
    [
        1317889500000,
        374.32,
        374.65,
        374.31,
        374.51
    ],
    [
        1317889560000,
        374.65,
        375.12,
        374.51,
        375.12
    ],
    [
        1317889620000,
        375.13,
        375.25,
        374.83,
        375.22
    ],
    [
        1317889680000,
        375.16,
        375.22,
        375,
        375
    ],
    [
        1317889740000,
        375,
        375,
        374.66,
        374.8
    ],
    [
        1317889800000,
        374.88,
        375,
        374.5,
        374.85
    ],
    [
        1317889860000,
        374.41,
        374.67,
        374.25,
        374.67
    ],
    [
        1317889920000,
        374.5,
        374.75,
        374.27,
        374.42
    ],
    [
        1317889980000,
        374.4,
        374.93,
        374.38,
        374.85
    ],
    [
        1317890040000,
        374.86,
        375.3,
        374.8,
        375.09
    ],
    [
        1317890100000,
        375,
        375.18,
        374.9,
        375.02
    ],
    [
        1317890160000,
        375.02,
        375.08,
        374.86,
        374.87
    ],
    [
        1317890220000,
        374.93,
        375.75,
        374.93,
        375.75
    ],
    [
        1317890280000,
        375.75,
        376.5,
        375.75,
        376.31
    ],
    [
        1317890340000,
        376.31,
        377.2,
        376.19,
        377.04
    ],
    [
        1317890400000,
        377.2,
        377.33,
        376.45,
        376.47
    ],
    [
        1317890460000,
        376.75,
        376.99,
        376.53,
        376.54
    ],
    [
        1317890520000,
        376.54,
        376.67,
        376.08,
        376.35
    ],
    [
        1317890580000,
        376.41,
        376.94,
        376.2,
        376.5
    ],
    [
        1317890640000,
        376.46,
        376.51,
        376.06,
        376.09
    ],
    [
        1317890700000,
        376.38,
        376.84,
        376.09,
        376.78
    ],
    [
        1317890760000,
        376.55,
        376.6,
        376.41,
        376.44
    ],
    [
        1317890820000,
        376.45,
        376.87,
        376.31,
        376.87
    ],
    [
        1317890880000,
        376.83,
        377,
        376.63,
        376.95
    ],
    [
        1317890940000,
        376.95,
        377,
        376.1,
        376.1
    ],
    [
        1317891000000,
        376.1,
        376.17,
        375.64,
        375.65
    ],
    [
        1317891060000,
        375.68,
        376.05,
        375.32,
        376.05
    ],
    [
        1317891120000,
        376.03,
        376.04,
        375.5,
        375.72
    ],
    [
        1317891180000,
        375.83,
        376.195,
        375.7,
        376
    ],
    [
        1317891240000,
        376.01,
        376.6,
        376,
        376.5
    ],
    [
        1317891300000,
        376.5,
        376.53,
        376.11,
        376.21
    ],
    [
        1317891360000,
        376.17,
        376.3,
        376.1,
        376.25
    ],
    [
        1317891420000,
        376.4,
        376.4,
        376.13,
        376.29
    ],
    [
        1317891480000,
        376.15,
        376.39,
        376.1,
        376.39
    ],
    [
        1317891540000,
        376.4,
        377.11,
        376.4,
        377
    ],
    [
        1317891600000,
        377.01,
        377.15,
        376.79,
        377.15
    ],
    [
        1317891660000,
        377.02,
        377.15,
        376.55,
        376.88
    ],
    [
        1317891720000,
        376.67,
        376.76,
        376.52,
        376.53
    ],
    [
        1317891780000,
        376.78,
        376.91,
        376.53,
        376.82
    ],
    [
        1317891840000,
        376.73,
        376.86,
        376.7,
        376.75
    ],
    [
        1317891900000,
        376.7,
        376.71,
        376.5,
        376.57
    ],
    [
        1317891960000,
        376.53,
        376.74,
        376.2,
        376.2
    ],
    [
        1317892020000,
        376.17,
        376.17,
        375.91,
        376
    ],
    [
        1317892080000,
        376,
        376,
        375.77,
        375.77
    ],
    [
        1317892140000,
        375.78,
        375.88,
        375.51,
        375.57
    ],
    [
        1317892200000,
        375.57,
        375.79,
        375.34,
        375.63
    ],
    [
        1317892260000,
        375.63,
        375.78,
        375.35,
        375.41
    ],
    [
        1317892320000,
        375.38,
        375.61,
        375.35,
        375.58
    ],
    [
        1317892380000,
        375.55,
        375.57,
        375.34,
        375.48
    ],
    [
        1317892440000,
        375.43,
        375.57,
        375.12,
        375.13
    ],
    [
        1317892500000,
        375.15,
        375.3,
        374.86,
        375
    ],
    [
        1317892560000,
        374.9,
        375.31,
        374.72,
        375.14
    ],
    [
        1317892620000,
        375,
        375.2,
        374.9,
        375.06
    ],
    [
        1317892680000,
        375.18,
        375.6,
        375.12,
        375.6
    ],
    [
        1317892740000,
        375.6,
        375.87,
        375.5,
        375.5
    ],
    [
        1317892800000,
        375.49,
        375.49,
        375.04,
        375.25
    ],
    [
        1317892860000,
        375.25,
        375.46,
        375,
        375.24
    ],
    [
        1317892920000,
        375.38,
        375.45,
        375,
        375.1
    ],
    [
        1317892980000,
        375.09,
        375.24,
        374.83,
        374.97
    ],
    [
        1317893040000,
        375.01,
        375.01,
        374.8,
        374.87
    ],
    [
        1317893100000,
        374.98,
        375.12,
        374.98,
        375
    ],
    [
        1317893160000,
        374.9,
        374.95,
        374.75,
        374.87
    ],
    [
        1317893220000,
        374.89,
        375.44,
        374.87,
        375.12
    ],
    [
        1317893280000,
        375.06,
        375.12,
        373.56,
        374.05
    ],
    [
        1317893340000,
        374.1,
        374.3,
        373.16,
        373.21
    ],
    [
        1317893400000,
        373.39,
        375,
        372.58,
        374.8
    ],
    [
        1317893460000,
        374.899,
        375.23,
        374.33,
        374.75
    ],
    [
        1317893520000,
        374.79,
        376.71,
        374.69,
        376.31
    ],
    [
        1317893580000,
        376.32,
        376.37,
        375.27,
        375.331
    ],
    [
        1317893640000,
        375.3301,
        377.44,
        375.33,
        377.43
    ],
    [
        1317893700000,
        377.43,
        378.14,
        376.83,
        377.08
    ],
    [
        1317893760000,
        377.18,
        378,
        376.5,
        376.7
    ],
    [
        1317893820000,
        376.83,
        377,
        375.51,
        375.79
    ],
    [
        1317893880000,
        375.6501,
        376.74,
        375.23,
        376.39
    ],
    [
        1317893940000,
        376.38,
        378.75,
        376.25,
        378.5
    ],
    [
        1317894000000,
        378.54,
        378.63,
        376.75,
        376.87
    ],
    [
        1317894060000,
        376.8664,
        377.62,
        376.64,
        376.908
    ],
    [
        1317894120000,
        376.8336,
        377.88,
        376.8289,
        377.55
    ],
    [
        1317894180000,
        377.36,
        377.9,
        376.52,
        376.75
    ],
    [
        1317894240000,
        376.83,
        377.73,
        376.71,
        376.98
    ],
    [
        1317894300000,
        377,
        377.69,
        376.87,
        377.1212
    ],
    [
        1317894360000,
        377.225,
        377.33,
        376.01,
        376.26
    ],
    [
        1317894420000,
        376.42,
        376.64,
        375.55,
        375.5534
    ],
    [
        1317894480000,
        375.74,
        375.94,
        374.77,
        375.3
    ],
    [
        1317894540000,
        375.3313,
        376,
        374.92,
        375.06
    ],
    [
        1317894600000,
        375.11,
        375.46,
        374.82,
        374.92
    ],
    [
        1317894660000,
        374.82,
        375.68,
        374.64,
        375.668
    ],
    [
        1317894720000,
        375.62,
        376.13,
        375.46,
        376.13
    ],
    [
        1317894780000,
        376.14,
        376.6,
        375.89,
        376.34
    ],
    [
        1317894840000,
        376.39,
        376.39,
        375.55,
        375.99
    ],
    [
        1317894900000,
        376,
        376.28,
        375.42,
        376.21
    ],
    [
        1317894960000,
        376,
        377.38,
        375.7,
        376.591
    ],
    [
        1317895020000,
        376.59,
        377.46,
        376.57,
        376.9348
    ],
    [
        1317895080000,
        376.9481,
        377.749,
        376.84,
        377.563
    ],
    [
        1317895140000,
        377.452,
        377.65,
        376.43,
        376.78
    ],
    [
        1317895200000,
        376.94,
        377.01,
        375.75,
        375.98
    ],
    [
        1317895260000,
        376.27,
        377.29,
        375.95,
        376.98
    ],
    [
        1317895320000,
        376.9962,
        377.3,
        376.69,
        376.71
    ],
    [
        1317895380000,
        376.75,
        377.5,
        376.75,
        377.41
    ],
    [
        1317895440000,
        377.26,
        377.49,
        376.89,
        377.368
    ],
    [
        1317895500000,
        377.345,
        378,
        377.17,
        378
    ],
    [
        1317895560000,
        377.97,
        378.3199,
        377.68,
        377.97
    ],
    [
        1317895620000,
        378.01,
        378.07,
        377.25,
        377.37
    ],
    [
        1317895680000,
        377.37,
        377.75,
        377.05,
        377.12
    ],
    [
        1317895740000,
        377.16,
        377.79,
        377.01,
        377.4512
    ]
];

// Create the chart
Highcharts.stockChart('container', options);


Highcharts.setOptions({
    colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.5,
                cy: 0.3,
                r: 0.7
            },
            stops: [
                [0, color],
                [1, Highcharts.color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    })
});

// Build the chart
Highcharts.chart('pie', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Alcohol',
        align: 'left'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<span style="font-size: 1.2em"><b>{point.name}</b>' +
                    '</span><br>' +
                    '<span style="opacity: 0.6">{point.percentage:.1f} ' +
                    '%</span>',
                connectorColor: 'rgba(128,128,128,0.5)'
            },
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Share',
        data: [
            { name: 'Beer', y: 938899 },
            { name: 'Wine', y: 1229600 },
            { name: 'Whiskey', y: 325251 },
            { name: 'Brandy', y: 238751 }
        ],
        colors: [
            '#6DC5D1',
            '#FDE49E',
            '#FEB941',
            '#DD761C'
        ]
    }]
});

Highcharts.chart('container1', {

    title: {
        text: 'Fries Employment Growth',
        align: 'left'
    },

    subtitle: {
        text: 'By Job Category. Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>.',
        align: 'left'
    },

    yAxis: {
        title: {
            text: 'Number of Employees'
        }
    },

    xAxis: {
        accessibility: {
            rangeDescription: 'Range: 2010 to 2020'
        }
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },

    series: [{
        name: 'Installation & Developers',
        data: [
            43934, 48656, 65165, 81827, 112143, 142383,
            171533, 165174, 155157, 161454, 154610
        ],
        color: '#DD761C',
    }, {
        name: 'Manufacturing',
        data: [
            24916, 37941, 29742, 29851, 32490, 30282,
            38121, 36885, 33726, 34243, 31050
        ],
        color: '#FEB941',
    }, {
        name: 'Sales & Distribution',
        data: [
            11744, 30000, 16005, 19771, 20185, 24377,
            32147, 30912, 29243, 29213, 25663
        ],
        color: '#FDE49E',
    }, {
        name: 'Operations & Maintenance',
        data: [
            null, null, null, null, null, null, null,
            null, 11164, 11218, 10077
        ]
    }, {
        name: 'Other',
        data: [
            21908, 5548, 8105, 11248, 8989, 11816, 18274,
            17300, 13053, 11906, 10073
        ],
        color: '#6DC5D1',
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});


Highcharts.chart('container2', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Burger Population',
        align: 'left'
    },
    subtitle: {
        text: 'Source: <a ' +
            'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
            'target="_blank">Wikipedia.org</a>',
        align: 'left'
    },
    xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe'],
        title: {
            text: null
        },
        gridLineWidth: 1,
        lineWidth: 0
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        },
        gridLineWidth: 0
    },
    tooltip: {
        valueSuffix: ' millions'
    },
    plotOptions: {
        bar: {
            borderRadius: '50%',
            dataLabels: {
                enabled: true
            },
            groupPadding: 0.1
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Year 1990',
        data: [631, 727, 3202, 721],
        color:'#6DC5D1',
    }, {
        name: 'Year 2000',
        data: [814, 841, 3714, 726],
        color:'#FDE49E',
    }, {
        name: 'Year 2018',
        data: [1276, 1007, 4561, 746],
        color:'#FEB941',
    }]
});
