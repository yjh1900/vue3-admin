<template>
  <div>
    <el-card
      ><template #header>
        <div class="category-header">
          <span>分类销售排行</span>
          <el-radio-group v-model="selectValue" size="small">
            <el-radio-button label="category">品类</el-radio-button>
            <el-radio-button label="goods">商品</el-radio-button>
          </el-radio-group>
        </div>
      </template>
      <PieChart
        :data="
          selectValue === 'category'
            ? homeStore.reportData.saleRank.category
            : homeStore.reportData.saleRank.goods
        "
        :title="selectValue === 'category' ? '品类分布' : '商品分布'"
      />
    </el-card>
  </div>
</template>

<script lang="ts">
export default {
  name: "CategoryRank",
};
</script>

<script lang="ts" setup>
import PieChart from "./PieChart.vue";
import { ref } from "vue";
import { useHomeStore } from "@/stores/homeData";

const homeStore = useHomeStore();

const selectValue = ref("category");
</script>

<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
}
</style>
