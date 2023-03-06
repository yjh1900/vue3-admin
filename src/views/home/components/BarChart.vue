<template>
  <div>
    <CommonCard>
      <div style="width: 100%; height: 100%" ref="chartRef"></div>

      <template v-slot:footer>退货率5.91% </template>
    </CommonCard>
  </div>
</template>

<script lang="ts">
export default {
  name: "BarChart",
};
</script>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import CommonCard from "./CommonCard.vue";
import * as echarts from "echarts";
const chartRef = ref();
onMounted(() => {
  var myChart = echarts.init(chartRef.value);
  // 绘制图表
  myChart.setOption({
    title: {},
    xAxis: {
      type: "category",
      data: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
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
        name: "销量",
        type: "bar",
        smooth: true,
        data: [25, 12, 20, 5, 26, 10, 25, 12, 20, 5, 26, 10],
      },
    ],
    tooltip: {
      trigger: "axis",
      confine: true,
    },
  });
});
</script>

<style scoped></style>
