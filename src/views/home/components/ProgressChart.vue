<template>
  <div class="chart" ref="chartRef"></div>
</template>

<script lang="ts">
export default {
  name: "ProgressChart",
};
</script>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
const chartRef = ref();

onMounted(() => {
  const myEcharts = echarts.init(chartRef.value);
  const option = {
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      data: ["百分比"],
      show: false,
    },
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    tooltip: {
      trigger: "axis",
    },
    series: {
      name: "用户增长量",
      type: "bar",
      data: [25],
      barWidth: 10,
      // 是否显示柱条的背景色
      showBackground: true,
      itemStyle: {
        color: "#9acd32",
      },
      label: {
        show: true,
        position: "right",
        formatter: "|",
        color: "#9acd32",
      },
    },
  };
  myEcharts.setOption(option);
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
