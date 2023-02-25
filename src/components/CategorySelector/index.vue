<template>
  <div>
    <el-card class="category" shadow="hover">
      <el-form
        :inline="true"
        class="demo-form-inline"
        :disabled="!isShowAttrList"
      >
        <el-form-item label="一级分类">
          <el-select
            v-model="category1Id"
            class="m-2"
            placeholder="请选择一级分类"
          >
            <el-option
              v-for="c1 in categoryStore.category1List"
              :key="c1.id"
              :label="c1.name"
              :value="c1.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select
            v-model="category2Id"
            class="m-2"
            placeholder="请选择二级分类"
          >
            <el-option
              v-for="c2 in categoryStore.category2List"
              :key="c2.id"
              :label="c2.name"
              :value="c2.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select
            v-model="category3Id"
            class="m-2"
            placeholder="请选择三级分类"
          >
            <el-option
              v-for="c3 in categoryStore.category3List"
              :key="c3.id"
              :label="c3.name"
              :value="c3.id"
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
import { ref, onMounted, computed } from "vue";
import { useCategoryStore } from "@/stores/category";

const value = ref("");
const categoryStore = useCategoryStore();

onMounted(async () => {
  await categoryStore.getCategory1List();
});

const category1Id = computed({
  get() {
    return categoryStore.category1Id;
  },
  set(val) {
    categoryStore.getCategory2List(val as number);
  },
});

const category2Id = computed({
  get() {
    return categoryStore.category2Id;
  },
  set(val) {
    categoryStore.getCategory3List(val as number);
  },
});
const category3Id = computed({
  get() {
    return categoryStore.category3Id;
  },
  set(val) {
    categoryStore.change3Id(val as number);
  },
});

const props = defineProps(["isShowAttrList"]);

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
