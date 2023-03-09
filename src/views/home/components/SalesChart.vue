<template>
  <div class="chart" ref="chartRef"></div>
</template>

<script lang="ts">
export default {
  name: "SalesChart",
};
</script>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, ref, watch } from "vue";
const chartRef = ref();
const myEcharts = ref();
const props = defineProps<{
  data: number[];
  axis: string[];
  title: string;
}>();
onMounted(() => {
  myEcharts.value = echarts.init(chartRef.value);
  console.log(props.axis, props.title, props.data);
});

watch(
  () => props.data,
  () => {
    const option = {
      title: {
        text: props.title,
        textStyle: {
          fontSize: 14,
        },
        top: 20,
      },
      xAxis: {
        data: props.axis,
      },
      yAxis: {},
      tooltip: {},
      grid: {
        left: 40,
        right: 40,
        bottom: 20,
      },
      series: {
        type: "bar",
        data: props.data,
        barWidth: 20,
      },
    };
    myEcharts.value.setOption(option);
  }
);
</script>

<style scoped>
.chart {
  width: 100%;
  height: 300px;
}
</style>
