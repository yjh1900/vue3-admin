<template>
  <div>
    <!-- <div class="home">Hello, {{ userInfoStore.name }}</div>
    <div class="chart" ref="chartRef" style="width: 600px; height: 400px"></div> -->
    <el-row :gutter="10">
      <el-col :xs="12" :sm="6" :xl="6">
        <CommonCard>
          <div>
            日同比{{ homeStore.reportData.salesGrowthLastDay }}%
            <el-icon color="red">
              <CaretBottom />
            </el-icon>
          </div>
          <div>
            月同比{{ homeStore.reportData.salesGrowthLastMonth }}%
            <el-icon color="green">
              <CaretTop />
            </el-icon>
          </div>
          <template v-slot:footer>昨日销售额￥99999999999999 </template>
        </CommonCard>
      </el-col>
      <el-col :xs="12" :sm="6" :xl="6"><LineChart /> </el-col>
      <el-col :xs="12" :sm="6" :xl="6">
        <BarChart />
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
        <CommonCard>
          <ProgressChart />
          <template v-slot:footer> 123 </template>
        </CommonCard>
      </el-col>
    </el-row>
    <SalesVisited class="mt-10" />
    <CategoryRank class="mt-10" />
  </div>
</template>

<script lang="ts">
export default {
  name: "Home",
};
</script>
<script lang="ts" setup>
import { CaretBottom, CaretTop } from "@element-plus/icons-vue";
import CommonCard from "./components/CommonCard.vue";
import LineChart from "./components/LineChart.vue";
import BarChart from "./components/BarChart.vue";
import ProgressChart from "./components/ProgressChart.vue";
import SalesVisited from "./components/SalesVisited.vue";
import CategoryRank from "./components/CategoryRank.vue";

import { ref, onMounted, computed } from "vue";
import { useUserInfoStore } from "@/stores/userInfo";
import { useHomeStore } from "@/stores/homeData";
const homeStore = useHomeStore();

// const salesToday = computed(() => {

// });
onMounted(() => {
  homeStore.getHomeData();
  // console.log(import.meta.env.VITE_MOCK_API_URL, "MOCK", homeStore.reportData);
});
// onMounted(() => {
//   var myChart = echarts.init(chartRef.value);
//   // 绘制图表
//   myChart.setOption({
//     title: {
//       text: "ECharts 入门示例",
//     },
//     tooltip: {},
//     xAxis: {
//       data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
//     },
//     yAxis: {},
//     series: [
//       {
//         name: "销量",
//         type: "bar",
//       },
//       {
//         name: "销量",
//         type: "line",
//       },
//     ],
//     dataset: {
//       source: [
//         ["衬衫", 5, 16],
//         ["羊毛衫", 20, 50],
//         ["雪纺衫", 36, 36],
//         ["裤子", 50, 73],
//         ["高跟鞋", 10, 53],
//         ["袜子", 20, 66],
//       ],
//     },
//   });
// });
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  padding: 20px;
  font-size: 30px;
}
</style>
