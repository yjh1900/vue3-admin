<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script lang="ts">
export default {
  name: "PieChart",
};
</script>

<script lang="ts" setup>
import * as echarts from "echarts";
import { ref, watch } from "vue";
const props = defineProps<{ data: string[]; title: string }>();

const chartRef = ref();
watch(props, () => {
  const data = (props.data.data1 as number[]).map((value, index) => {
    return {
      name: props.data.axisX[index] as string,
      value,
    };
  });

  const total = data.reduce((p, c) => p + c.value, 0);
  const option = {
    title: [
      { text: props.title },
      {
        text: "累计订单量",
        // 副标题
        subtext: total,
        textStyle: {
          fontSize: 16,
        },
        subtextStyle: {
          fontSize: 28,
        },
        left: "center",
        top: "42%",
      },
    ],
    toolTip: {},
    legend: {
      right: "10%",
      top: "middle",
      orient: "vertical",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        // 半径（内半径，外半径）
        radius: [85, 120],
        avoidLabelOverlap: false,
        // 每一个item边框
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 2,
        },
        // label: {
        //   show: true,
        //   position: "center",
        // },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 40,
        //     fontWeight: "bold",
        //   },
        // },
        // labelLine: {
        //   show: true,
        // },
        data,
      },
    ],
  };

  const myChart = echarts.init(chartRef.value);
  myChart.setOption(option);
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 300px;
}
</style>
