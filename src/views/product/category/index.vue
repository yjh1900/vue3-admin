<template>
  <div>
    <el-table
      :data="categoryList"
      style="width: 100%"
      row-key="id"
      lazy
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :load="load"
      border
      default-expand-all
    >
      <!-- sortable，排序属性 -->
      <el-table-column prop="id" label="分类id" />
      <el-table-column prop="name" label="分类名称" />
      <el-table-column label="操作">
        <template v-slot="rowSlot">
          <el-button
            size="small"
            :icon="Plus"
            @click="addEdit(rowSlot.$index, rowSlot.row)"
            type="primary"
          ></el-button>
          <el-button
            size="small"
            :icon="Edit"
            @click="editEdit(rowSlot.$index, rowSlot.row)"
            type="warning"
          ></el-button>
          <el-button
            size="small"
            :icon="Delete"
            @click="delEdit(rowSlot.$index, rowSlot.row)"
            type="danger"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
export default {
  name: "Category",
};
</script>

<script lang="ts" setup>
import { Plus, Edit, Delete } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
import type {
  CategoryList,
  CategoryItem,
} from "@/api/product/model/categoryModel";
import {
  getCategory1Api,
  getCategory2Api,
  getCategory3Api,
} from "@/api/product/category";

const addEdit = (a: any, b: number) => {
  console.log(a, b);
};
const editEdit = (a: any, b: number) => {
  console.log(a, b);
};
const delEdit = (a: any, b: number) => {
  console.log(a, b);
};

const load = (
  row: CategoryItem,
  treeNode: unknown,
  resolve: (date: CategoryItem[]) => void
) => {
  setTimeout(() => {
    resolve([
      //   {
      //     id: 31,
      //     date: "2016-05-01",
      //     name: "wangxiaohu",
      //     address: "No. 189, Grove St, Los Angeles",
      //   },
      //   {
      //     id: 32,
      //     date: "2016-05-01",
      //     name: "wangxiaohu",
      //     address: "No. 189, Grove St, Los Angeles",
      //   },
    ]);
  }, 1000);
};
let categoryList = ref<CategoryList>([]);
onMounted(async () => {
  const res = await getCategory1Api();
  res.forEach(async (item, index) => {
    const res2 = await getCategory2Api(item.id);
    // res[index].children = res2;
  });
  categoryList.value = res;
  console.log(res);
});
</script>

<style scoped></style>
