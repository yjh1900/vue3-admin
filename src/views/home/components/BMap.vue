<template>
  <el-card class="mt-10">
    <div id="BMapContainer"></div>
  </el-card>
</template>

<script lang="ts">
export default {
  name: "BMap",
};
</script>

<script lang="ts" setup>
/*
    1. 引入百度地图js文件
      - 在index.html页面引入，问题：一上来就加载
      - 异步加载

    2. 准备一个具备宽高的DOM容器，需要id属性
  */
import { onMounted, getCurrentInstance } from "vue";
const that = getCurrentInstance();

onMounted(() => {
  const script = document.createElement("script");
  // 百度地图js一旦加载成功，会调用回调函数initBMap（必须是全局作用域下的函数才能找到并调用）
  script.src =
    "https://api.map.baidu.com/api?v=1.0&type=webgl&ak=aRrlX399egb8xEK0zb2ranaOMwuwx1Ln&callback=initBMap";

  document.body.append(script);
});

// 给window添加全局函数
window.initBMap = () => {
  // 创建地图实例
  const map = new BMapGL.Map("BMapContainer");
  // 设置中心点坐标
  const point = new BMapGL.Point(114.1, 22.5);
  // 地图初始化，同时设置地图展示级别
  map.centerAndZoom(point, 12);
  // 获取当前位置
  var geolocation = new BMapGL.Geolocation();
  geolocation.getCurrentPosition(function (r: any) {
    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
      var mk = new BMapGL.Marker(r.point);
      map.addOverlay(mk);
      map.panTo(r.point);
      alert("您的位置：" + r.point.lng + "," + r.point.lat);
    } else {
      alert("failed" + this.getStatus());
    }
  });

  map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放

  // map.setMapType(BMAP_SATELLITE_MAP); // 设置地图类型为地球模式

  const scaleCtrl = new BMapGL.ScaleControl(); // 添加比例尺控件
  map.addControl(scaleCtrl);
  const zoomCtrl = new BMapGL.ZoomControl(); // 添加缩放控件
  map.addControl(zoomCtrl);
  const cityCtrl = new BMapGL.CityListControl(); // 添加城市列表控件
  map.addControl(cityCtrl);
};
</script>

<style scoped>
.mt-10 {
  margin-top: 10px;
}

#BMapContainer {
  height: 600px;
}
</style>
