/*
 * @Author: your name
 * @Date: 2020-08-16 08:54:20
 * @LastEditTime: 2020-09-15 16:22:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \智慧交通\js\数据展示.js
 */

var myChart = echarts.init(document.getElementById('tripmode'));

setTimeout(function () {

    option = {
        legend: {},
        tooltip: {
            trigger: 'axis',
            showContent: false
        },
        dataset: {
            source: [
                ['product', '09.01', '09.02', '09.03', '09.03', '09.04', '09.05'],
                ['步行', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
                ['自行车', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
                ['公交车', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
                ['自驾车', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
            ]
        },
        xAxis: {
            type: 'category',
            name: '日期'
        },
        yAxis: {
            gridIndex: 0,
            name: '数量（个）'
        },
        grid: {top: '55%'},
        series: [
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {
                type: 'pie',
                id: 'pie',
                radius: '30%',
                center: ['50%', '26%'],
                label: {
                    formatter: '{b}: {@09.01} ({d}%)'
                },
                encode: {
                    itemName: 'product',
                    value: '09.01',
                    tooltip: '09.01'
                }
            }
        ]
    };

    myChart.on('updateAxisPointer', function (event) {
        var xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            myChart.setOption({
                series: {
                    id: 'pie',
                    label: {
                        formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                    },
                    encode: {
                        value: dimension,
                        tooltip: dimension
                    }
                }
            });
        }
    });

    myChart.setOption(option);

});

myChart.resize();