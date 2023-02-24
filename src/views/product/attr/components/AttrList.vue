<template>
  <el-card shadow="hover" class="mt-20">
    <el-button type="primary" :icon="Plus" @click="addHandle(0)"
      >添加品牌</el-button
    >
    <el-table v-loading="loading" :data="trademarkList" class="mt-20" border>
      <!--  
        el-table-column 列
          prop="xxx" 要渲染data中哪个数据
          label="序号" 列的标题
          type="index" 渲染从1开始的序号
          width="60" 列的宽度
          align="center" 居中对齐
      -->
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column label="品牌logo">
        <template v-slot="{ row }">
          <img :src="row.logoUrl" class="trademark-logo" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <!-- <el-button size="small" type="warning" :icon="Edit" />
        <el-button size="small" type="danger" :icon="Edit" /> -->
        <template v-slot="{ row }">
          <el-button
            type="warning"
            :icon="Edit"
            size="small"
            @click="editHandle(row)"
          />
          <el-button
            type="danger"
            :icon="Delete"
            size="small"
            @click="deleteHandle(row)"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
export default {
  name: "AttrList",
};
</script>

<script lang="ts" setup>
import { reactive } from "vue";
import { Plus, Edit, Delete } from "@element-plus/icons-vue";
import { getAttrListApi } from "@/api/product/attr";

const addHandle = () => {};

const editHandle = (row) => {};

const deleteHandle = (row) => {};

const attrList = reactive([]);

// const getAttrList = async () => {
//   attrList = await getAttrListApi();
// };
</script>

<style scoped></style>
