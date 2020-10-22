/*
 * @Author: your name
 * @Date: 2020-08-26 16:29:04
 * @LastEditTime: 2020-08-26 16:37:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \智慧交通\js\heatshow.js
 */

// =============== 创建底图 ===============
const map = new AMap.Map("heatmap", {
  mapStyle: "amap://styles/grey",
  zoom: 8,
  center: [116.366794, 39.915309],
});

// =============== 创建图层 ===============
// 从 v1.3.0 版起，每个图层只描述一种展现形式的可视化类型，并且所有图层的都在 Loca 这个命名空间下。
const layer = new Loca.HeatmapLayer({
  map: map,
  // 设置缩放和中心自适应
  fitView: true,
});

// =============== 设置数据 ===============
const data = [
  { lnglat: [116.366794, 39.915309], count: 10 },
  { lnglat: [116.486409, 39.921489], count: 15 },
  { lnglat: [116.286968, 39.863642], count: 30 },
  { lnglat: [116.386794, 39.915809], count: 10 },
  { lnglat: [116.486409, 39.928489], count: 15 },
  { lnglat: [116.283968, 39.883642], count: 10 },
  { lnglat: [116.306794, 39.915389], count: 10 },
  { lnglat: [116.486409, 39.951409], count: 05 },
  { lnglat: [116.289968, 39.963642], count: 20 },
];

layer.setData(data, {
  type: "json",
  lnglat: "lnglat",
  value: "count",
});

// =============== 样式配置 ===============
layer.setOptions({
  style: {
    // 热力半径，单位：像素
    radius: 30,
    opacity: [0.1, 0.8],
    // 颜色范围
    color: {
      0.5: "#2c7bb6",
      0.65: "#abd9e9",
      0.7: "#ffffbf",
      0.9: "#fde468",
      1.0: "#d7191c",
    },
  },
});

// =============== 渲染 ===============
$(".showhis").click(function (e) {
  e.preventDefault();
  layer.render();
});

// =============== 检索配置 ===============
var auto = new AMap.Autocomplete({
  input: "tipinput",
});

var placeSearch = new AMap.PlaceSearch({
  map: map,
}); //构造地点查询类

AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发

function select(e) {
  placeSearch.setCity(e.poi.adcode);
  placeSearch.search(e.poi.name); //关键字查询查询
}

// =============== 时间配置 ===============
$(".form_date").datetimepicker({
  language: "zh-CN",
  weekStart: 1,
  todayBtn: 1,
  autoclose: 1,
  todayHighlight: 1,
  startView: 2,
  minView: 2,
  forceParse: 0,
  showMeridian: 1,
});

$(".time_1").datetimepicker({
  language: "zh-CN",
  todayBtn: 1,
  autoclose: 1,
  startView: 0,
  maxView: 0,
  forceParse: 0,
  showMeridian: 1,
});

$(".time_2").datetimepicker({
  language: "zh-CN",
  todayBtn: 1,
  autoclose: 1,
  startView: 0,
  maxView: 0,
  forceParse: 0,
  showMeridian: 1,
});


