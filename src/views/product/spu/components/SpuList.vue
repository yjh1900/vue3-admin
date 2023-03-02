<template>
  <div>
    <el-card class="mt-20" shadow="hover">
      <el-button
        type="primary"
        :icon="Plus"
        @click="addHandle()"
        :disabled="!categoryStore.category3Id"
        >添加SPU</el-button
      >
      <el-table v-loading="loading" :data="spuList" class="mt-20" border>
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="spuName" label="SPU名称" width="150" />
        <el-table-column prop="description" label="SPU描述" />
        <el-table-column label="操作" width="300">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              :icon="Plus"
              @click="addSkuHandle(row)"
              size="small"
            />
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
              <template #reference>
                <el-button type="info" :icon="InfoFilled" size="small" />
              </template>
            </el-popconfirm>

            <!-- 气泡确认框和tooltip一起使用的方法，在tooltip外面再套一层div -->
            <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              :title="`确认删除${row.spuName}吗`"
              @confirm="deleteHandle(row)"
            >
              <template #reference>
                <div style="display: inline; margin-left: 10px">
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="删除"
                    placement="bottom-start"
                  >
                    <el-button type="danger" :icon="Delete" size="small" />
                  </el-tooltip>
                </div>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="mt-20"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 10, 15]"
        :disabled="disabled"
        :background="background"
        layout=" prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script lang="ts">
export default {
  name: "SpuList",
};
</script>

<script lang="ts" setup>
import { watch, ref, inject } from "vue";
import type { Ref } from "vue";
import { inputEmits, type FormInstance, type FormRules } from "element-plus";
import { useCategoryStore } from "@/stores/category";
import { Plus, Edit, Delete, InfoFilled } from "@element-plus/icons-vue";
import { getSpuListApi } from "@/api/product/spu";
import type { SpuList, SpuItem } from "@/api/product/model/spuModel";

const total = ref(0); // 数据总条数
const currentPage = ref(1); // 当前界面索引
const pageSize = ref(5); // 每页数据条数
const background = ref(false); // 是否为分页按钮添加背景色
const disabled = ref(false); // 是否禁用分页

// 切换每页数据条数
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  currentPage.value = 1;
  getSpuList();
};
// 跳转页面
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getSpuList();
};

// 依赖注入
const spuList = inject("spuList") as Ref<SpuList>;
const isComponentShow = inject("isComponentShow") as Ref<number>;
const isSpuListShow = inject("isSpuListShow") as Ref<boolean>;
const curSpuItem = inject("curSpuItem") as Ref<SpuItem>;

const addSkuHandle = (row) => {
  curSpuItem.value = row;
  isComponentShow.value = 2;
  isSpuListShow.value = false;
};

const addHandle = () => {
  isComponentShow.value = 1;
  isSpuListShow.value = false;
};
const editHandle = (row: SpuItem) => {
  curSpuItem.value = row;
  isComponentShow.value = 1;
};
const deleteHandle = (row) => {};

const curList = ref([]);

const categoryStore = useCategoryStore();
const loading = ref(false);
const getSpuList = async () => {
  loading.value = true;
  const res = await getSpuListApi({
    limit: pageSize.value,
    page: currentPage.value,
    category3Id: categoryStore.category3Id as number,
  });
  //   spuList.value = a;
  spuList.value = res.records;
  total.value = res.total;
  loading.value = false;
  console.log(spuList.value);
};

watch(
  () => categoryStore.category3Id,
  (id) => {
    if (!id) return;
    getSpuList();
  },
  { immediate: true, deep: true }
);
</script>

<style scoped></style>
