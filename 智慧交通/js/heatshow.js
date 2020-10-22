/*
 * @Author: your name
 * @Date: 2020-08-26 16:29:04
 * @LastEditTime: 2020-08-26 16:37:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \智慧交通\js\heatshow.js
 */

    // =============== 创建底图 ===============
    const map = new AMap.Map('heatmap',{
        mapStyle: 'amap://styles/grey',
        zoom: 8,
        center: [116.366794, 39.915309]
    });

    // =============== 创建图层 ===============
    // 从 v1.3.0 版起，每个图层只描述一种展现形式的可视化类型，并且所有图层的都在 Loca 这个命名空间下。
    const layer = new Loca.HeatmapLayer({
        map: map,
        // 设置缩放和中心自适应
        fitView: false
    });

    // =============== 设置数据 ===============
    const data = [
        { "lnglat": [116.366794, 39.915309], 'count': 10 }, 
        { "lnglat": [116.486409, 39.921489], 'count': 15 }, 
        { "lnglat": [116.286968, 39.863642], 'count': 30 },
        { "lnglat": [116.386794, 39.915809], 'count': 10 }, 
        { "lnglat": [116.486409, 39.928489], 'count': 15 }, 
        { "lnglat": [116.283968, 39.883642], 'count': 10 },
        { "lnglat": [116.306794, 39.915389], 'count': 10 }, 
        { "lnglat": [116.486409, 39.951409], 'count': 05 }, 
        { "lnglat": [116.289968, 39.963642], 'count': 20 }
    ]

    layer.setData(data, {
        type: 'json',
        lnglat: 'lnglat',
        value: 'count'
    });

    // =============== 样式配置 ===============
    layer.setOptions({
        style: {
            // 热力半径，单位：像素
            radius: 30,
            opacity: [0.1, 0.8],
            // 颜色范围
            color: {
                0.5: '#2c7bb6',
                0.65: '#abd9e9',
                0.7: '#ffffbf',
                0.9: '#fde468',
                1.0: '#d7191c'
            }
        }
    });

    // =============== 渲染 ===============
    setTimeout(() => {
      layer.render();
    }, 1000);

    var district, polygons = [], citycode;
    var citySelect = document.getElementById('city');
    var districtSelect = document.getElementById('district');
    var areaSelect = document.getElementById('street');

    //行政区划查询
    var opts = {
        subdistrict: 1,   //返回下一级行政区
        showbiz:false  //最后一级返回街道信息
    };
    district = new AMap.DistrictSearch(opts);//注意：需要使用插件同步下发功能才能这样直接使用
    district.search('中国', function(status, result) {
        if(status=='complete'){
            getData(result.districtList[0]);
        }
    });
    function getData(data,level) {
        var bounds = data.boundaries;
        if (bounds) {
            for (var i = 0, l = bounds.length; i < l; i++) {
                var polygon = new AMap.Polygon({
                    map: map,
                    strokeWeight: 0,
                    strokeColor: '#0091ea',
                    fillColor: '#80d8ff',
                    fillOpacity: 0,
                    path: bounds[i]
                });
                polygons.push(polygon);
            }
            map.setFitView();//地图自适应
        }
       
        //清空下一级别的下拉列表
        if (level === 'province') {
            citySelect.innerHTML = '';
            districtSelect.innerHTML = '';
            areaSelect.innerHTML = '';
        } else if (level === 'city') {
            districtSelect.innerHTML = '';
            areaSelect.innerHTML = '';
        } else if (level === 'district') {
            areaSelect.innerHTML = '';
        }

        var subList = data.districtList;
        if (subList) {
            var contentSub = new Option('--请选择--');
            var curlevel = subList[0].level;
            var curList =  document.querySelector('#' + curlevel);
            curList.add(contentSub);
            for (var i = 0, l = subList.length; i < l; i++) {
                var name = subList[i].name;
                var levelSub = subList[i].level;
                var cityCode = subList[i].citycode;
                contentSub = new Option(name);
                contentSub.setAttribute("value", levelSub);
                contentSub.center = subList[i].center;
                contentSub.adcode = subList[i].adcode;
                curList.add(contentSub);
            }
        }
        
    }
    function search(obj) {
        console.log(obj)
        //清除地图上所有覆盖物
        for (var i = 0, l = polygons.length; i < l; i++) {
            polygons[i].setMap(null);
        }
        var option = obj[obj.options.selectedIndex];
        var keyword = option.text; //关键字
        var adcode = option.adcode;
        district.setLevel(option.value); //行政区级别
        district.setExtensions('all');
        //行政区查询
        //按照adcode进行查询可以保证数据返回的唯一性
        district.search(adcode, function(status, result) {
            if(status === 'complete'){
                getData(result.districtList[0],obj.id);
            }
        });
    }
    function setCenter(obj){
        map.setCenter(obj[obj.options.selectedIndex].center)
    }