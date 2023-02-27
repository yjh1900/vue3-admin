<template>
  <div>
    <el-card shadow="hover" class="mt-20">
      <el-button
        type="primary"
        :icon="Plus"
        @click="addHandle()"
        :disabled="!categoryStore.category3Id"
        >添加属性</el-button
      >
      <el-table v-loading="loading" :data="attrList" class="mt-20" border>
        <!--  
        el-table-column 列
          prop="xxx" 要渲染data中哪个数据
          label="序号" 列的标题
          type="index" 渲染从1开始的序号
          width="60" 列的宽度
          align="center" 居中对齐
      -->
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="attrName" label="属性名称" width="150" />
        <el-table-column label="属性值列表">
          <template #default="scope">
            <!-- <el-popover
            effect="light"
            trigger="hover"
            placement="top"
            width="auto"
          >  <template #default>
              <div>数据信息：{{ scope.row }}</div>
            </template> 
          <template #reference>-->
            <el-tag
              class="mr-10"
              type="success"
              :key="item.id"
              v-for="item in scope.row.attrValueList"
              >{{ item.valueName }}</el-tag
            >
            <!-- </template> -->
            <!-- </el-popover> -->
          </template></el-table-column
        >
        <el-table-column label="操作" width="150">
          <template v-slot="{ row }">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="编辑"
              placement="bottom-start"
            >
              <el-button
                type="warning"
                :icon="Edit"
                size="small"
                @click="editHandle(row)"
              />
            </el-tooltip>

            <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              :title="`确认删除${row.attrName}吗`"
              @confirm="deleteHandle(row)"
            >
              <!-- <el-tooltip
                class="box-item"
                effect="dark"
                content="删除"
                placement="bottom-start"
              > -->
              <template #reference>
                <el-button type="danger" :icon="Delete" size="small" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
export default {
  name: "AttrList",
};
</script>

<script lang="ts" setup>
import { ref, watch, defineEmits } from "vue";
import type {
  AttrListDataList,
  AttrListData,
} from "@/api/product/model/attrModel";
import { Plus, Edit, Delete } from "@element-plus/icons-vue";
import { getAttrListApi, deleteAttrApi } from "@/api/product/attr";
import { useCategoryStore } from "@/stores/category";

const categoryStore = useCategoryStore();
const loading = ref(false);

// 点击编辑属性
const editHandle = (row: AttrListData) => {
  emit("setShowAttrList", false, row);
};

const deleteHandle = async (row: AttrListData) => {
  await deleteAttrApi(row.id as number);
  getAttrList();
  console.log("删除");
};
const attrList = ref<AttrListDataList>([]);

const getAttrList = async () => {
  loading.value = true;
  attrList.value = await getAttrListApi();
  loading.value = false;
  console.log(attrList);
};

watch(
  () => categoryStore.category3Id,
  (category3Id) => {
    if (!category3Id) return (attrList.value = []);
    getAttrList();
  },
  { immediate: true, deep: true }
);

const emit = defineEmits(["setShowAttrList"]);
const addHandle = () => {
  emit("setShowAttrList", false);
};
</script>

<style scoped></style>
