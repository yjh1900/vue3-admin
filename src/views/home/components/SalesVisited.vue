<template>
  <div>
    <el-card>
      <div class="sales__header">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="销售额" name="sales"></el-tab-pane>
          <el-tab-pane label="访问量" name="visited"></el-tab-pane>
        </el-tabs>

        <div style="margin-top: 20px" class="sales__header-date">
          <el-radio-group v-model="curSelect" class="mr-10">
            <el-radio-button label="day">今日</el-radio-button>
            <el-radio-button label="week">本周</el-radio-button>
            <el-radio-button label="month">本月</el-radio-button>
            <el-radio-button label="year">今年</el-radio-button>
          </el-radio-group>

          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            format="YYYY-MM-DD"
            end-placeholder="结束日期"
          />
        </div>
      </div>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="17">
          <SalesChart
            :data="
              activeTab === 'sales'
                ? homeStore.reportData.orderFullYear
                : homeStore.reportData.userFullYear
            "
            :axis="
              activeTab === 'sales'
                ? homeStore.reportData.orderFullYearAxis
                : homeStore.reportData.userFullYearAxis
            "
            :title="activeTab === 'sales' ? '销售趋势' : '访问量趋势'"
        /></el-col>
        <el-col :xs="24" :sm="7">xxx</el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts">
export default {
  name: "SalesVisited",
};
</script>

<script lang="ts" setup>
// dayjs，可以很方便的操作和当前日期有关的时间
import { dayjs } from "element-plus";
import { ref, watch } from "vue";
import type { TabsPaneContext } from "element-plus";
import SalesChart from "./SalesChart.vue";
import { useHomeStore } from "@/stores/homeData";

const value = ref();
const curSelect = ref("day");
const activeTab = ref("sales");
const homeStore = useHomeStore();

const handleClick = (tab: TabsPaneContext, event: Event) => {};

const daySelect = () => {
  let start, end;
  start = dayjs().format("YYYY-MM-DD");
  end = start;
  return [start, end];
};
const weekSelect = () => {
  let start, end;
  start = dayjs().startOf("week").add(1, "day").format("YYYY-MM-DD");
  end = dayjs().endOf("week").add(1, "day").format("YYYY-MM-DD");
  return [start, end];
};
const monthSelect = () => {
  let start, end;
  start = dayjs().startOf("month").format("YYYY-MM-DD");
  end = dayjs().endOf("month").format("YYYY-MM-DD");
  return [start, end];
};
const yearSelect = () => {
  let start, end;
  start = dayjs().startOf("year").format("YYYY-MM-DD");
  end = dayjs().endOf("year").format("YYYY-MM-DD");
  return [start, end];
};
const stats = {
  ["day"]: daySelect,
  ["week"]: weekSelect,
  ["month"]: monthSelect,
  ["year"]: yearSelect,
};
watch(
  curSelect,
  (val: string) => {
    // 策略模式
    value.value = stats[val]();
  },
  { immediate: true }
);
</script>

<style scoped>
.sales__header {
  position: relative;
}
.sales__header-date {
  position: absolute;
  margin-top: 0px !important;
  right: 0px;
  top: -10px;
  height: 40px;
  display: flex;
  align-items: center;
}
/* tab-item */
:deep(.el-tabs__item) {
  height: 40px;
  line-height: inherit;
  padding: 0 20px !important;
}
/* tab高亮小横线 */
:deep(.el-tabs__active-bar) {
  width: 80px !important;
  left: -20px;
}
@media only screen and (max-width: 900px) {
  .sales__header-date {
    display: none;
  }
}
</style>
