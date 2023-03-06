<template>
  <div>
    <CommonCard>
      <div style="width: 100%; height: 100%" ref="chartRef"></div>
      <template v-slot:footer
        >昨日订单额￥{{ homeStore.reportData.orderLastDay }}
      </template>
    </CommonCard>
  </div>
</template>

<script lang="ts">
export default {
  name: "LineChart",
};
</script>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import CommonCard from "./CommonCard.vue";
import * as echarts from "echarts";
import { useHomeStore } from "@/stores/homeData";
const homeStore = useHomeStore();
const chartRef = ref();

watch(
  () => homeStore.reportData,
  () => {
    const getOption = () => {
      return {
        title: {},
        xAxis: {
          type: "category",
          // 消除左右留白
          boundaryGap: false,
          data: homeStore.reportData.orderTrendAxis,
        },
        yAxis: { show: false },
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
        },
        series: [
          {
            // 小圆点显示隐藏
            showSymbol: false,
            name: "销量",
            type: "line",
            smooth: true,
            data: homeStore.reportData.orderTrend,
            // 折线拐点标志的样式
            itemStyle: {
              opacity: 0,
            },
            lineStyle: {
              opacity: 0,
            },
            areaStyle: {
              //2.基础面积图。区域填充样式
              color: "purple", //支持RGB、ALPHA通道+RGBA、十六进制、渐变色、纹理填充
            },
          },
        ],
        tooltip: {
          trigger: "axis",
          confine: true,
        },
      };
    };
    const myChart = echarts.init(chartRef.value);
    myChart.setOption(getOption());
  }
);
</script>

<style scoped></style>
