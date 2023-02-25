<template>
  <div>
    <el-card class="mt-20">
      <el-form>
        <el-form-item label="属性名">
          <el-input
            v-model="attrFormData.attrName"
            style="width: 250px"
            placeholder="请输入属性名"
          ></el-input>
        </el-form-item>
        <el-button
          type="primary"
          :icon="Plus"
          @click="addAttrValue"
          :disabled="!attrFormData.attrName"
          >添加属性值</el-button
        >
        <el-table
          border
          class="mt-20"
          :data="attrFormData.attrValueList"
          :loading="loading"
        >
          <el-table-column
            label="序号"
            type="index"
            width="60"
            align="center"
          />
          <el-table-column label="属性值名称" prop="valueName">
            <template v-slot="{ row, $index }">
              <el-input
                ref="inputRef"
                size="small"
                v-model="row.valueName"
                v-if="row.isEdit"
                @blur="editDone(row, $index)"
              ></el-input>
              <div v-else @click="editName(row)">
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-popconfirm
                confirm-button-text="确认"
                cancel-button-text="取消"
                :title="`确认删除${scope.row.valueName}吗`"
                @confirm="deleteFormList(scope.row, scope.index)"
              >
                <template #reference>
                  <el-button
                    :icon="Delete"
                    type="danger"
                    size="small"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item class="mt-20">
          <el-button
            type="primary"
            @click="saveHandle"
            :disabled="!attrFormData.attrName"
            >保存</el-button
          >
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
export default {
  name: "AddOrUpdateAttr",
};
</script>

<script lang="ts" setup>
import { defineEmits, reactive, ref, watch, nextTick } from "vue";
import { Delete, Plus } from "@element-plus/icons-vue";
import type { AttrListData, AttrItem } from "@/api/product/model/attrModel";
import { addAttrValueListApi } from "@/api/product/attr";
import { useCategoryStore } from "@/stores/category";
// const isEdit = ref(false);
const edit = reactive({
  isEdit: false,
});
const inputRef = ref();
const attrFormData = reactive<AttrListData>({
  attrName: "",
  attrValueList: [],
});
const loading = ref(false);

const saveHandle = async () => {
  const { attrName, attrValueList } = attrFormData;
  console.log(attrName, attrValueList);
  await addAttrValueListApi({
    attrName,
    attrValueList,
    categoryId: useCategoryStore().category3Id,
    categoryLevel: 3,
  });
  emit("setShowAttrList", true);
};
const addAttrValue = async () => {
  attrFormData.attrValueList.push({
    isEdit: true, // 编辑模式和显示模式
    valueName: "", // 属性值名称
  });
  await nextTick();
  inputRef.value.focus();
  //   isEdit.value = true;
};
const deleteFormList = (row: AttrItem, index: number) => {
  attrFormData.attrValueList.splice(index, 1);
};
const editDone = (row: AttrItem, index: number) => {
  if (!row.valueName.trim()) {
    attrFormData.attrValueList.splice(index, 1);
    return;
  }
  row.isEdit = false;
};
const editName = async (row: AttrItem) => {
  console.log(888);
  row.isEdit = true;

  await nextTick();
  inputRef.value.focus();
};

const emit = defineEmits(["setShowAttrList"]);

const cancel = () => {
  emit("setShowAttrList", true);
};
// watch(isEdit, async (isEdit) => {
//   console.log(inputRef, 111);
//   if (isEdit) {
//  await nextTick();
//  console.log(inputRef.value, 123);
//  inputRef.value.focus();
//   }
// });
</script>

<style scoped></style>
