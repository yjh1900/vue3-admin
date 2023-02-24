<template>
  <div>
    <el-card class="category" shadow="never">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="一级分类">
          <el-select
            v-model="categoryStore.category1Id"
            class="m-2"
            placeholder="请选择一级分类"
            :change="category1Change()"
          >
            <el-option
              v-for="c1 in categoryStore.category1List"
              :key="c1.id"
              :label="c1.name"
              :value="c1.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="value" class="m-2" placeholder="请选择二级分类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select v-model="value" class="m-2" placeholder="请选择三级分类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
export default {
  name: "CategorySelector",
};
</script>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useCategoryStore } from "@/stores/category";

const value = ref("");
const categoryStore = useCategoryStore();

onMounted(async () => {
  await categoryStore.getCategory1List();
});

const category1Change = () => {};

const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
</script>

<style lang="less" scoped>
.category {
  .el-card__body {
    .el-form-item {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>
