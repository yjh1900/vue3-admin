<template>
  <div>
    <el-card class="mt-20" shadow="hover">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="SPU名称" prop="name">
          <el-input v-model="ruleForm.spuName" placeholder="请输入SPU名称" />
        </el-form-item>

        <el-form-item label="品牌" prop="region">
          <el-select v-model="ruleForm.tmId" placeholder="请选择">
            <el-option
              v-for="item in trademarkList"
              :key="item.id"
              :label="item.tmName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="SPU描述" prop="desc">
          <el-input v-model="ruleForm.description" type="textarea" />
        </el-form-item>

        <el-form-item label="SPU图片" prop="count">
          <el-upload
            v-model:file-list="ruleForm.spuImageList"
            :action="`${BASE_URL}/admin/product/fileUpload`"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-exceed="handleUploadExceed"
            :on-success="handleUploadSuccess"
            :before-upload="beforeImageUpload"
            :limit="10"
          >
            <el-icon><Plus /></el-icon> </el-upload
          ><el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>

        <el-form-item label="销售属性">
          <el-select placeholder="请选择" class="mr-10" v-model="saleAttr">
            <el-option
              v-for="item in saleAttrList"
              :key="item.id"
              :label="item.name"
              :value="`${item.name}:${item.id}`"
            />
          </el-select>
          <el-button
            type="primary"
            :icon="Plus"
            @click="addSaleAttr"
            :disabled="!saleAttr"
            >添加销售属性</el-button
          >

          <el-table
            v-loading="loading"
            :data="ruleForm.spuSaleAttrList"
            class="mt-20"
            border
          >
            <el-table-column
              type="index"
              label="序号"
              width="60"
              align="center"
            />
            <el-table-column prop="saleAttrName" label="属性名" width="150" />
            <el-table-column label="属性值名称列表">
              <!-- v-for="item in ruleForm.spuSaleAttrList.spuSaleAttrValueList" -->
              <template #default="scope">
                <!-- <el-tag
                  class="mr-10"
                  type="success"
                  :key="item.baseSaleAttrId"
                  v-for="item in saleAttrListTable"
                  >{{ item.saleAttrValueName }}</el-tag
                > -->
                <el-tag
                  v-for="tag in scope.row.spuSaleAttrValueList"
                  :key="tag.id"
                  class="mx-1 mr-10"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag, scope.row)"
                >
                  {{ tag.saleAttrValueName }}
                </el-tag>
                <el-input
                  v-if="scope.row.inputVisible"
                  ref="InputRef"
                  v-model="inputValue"
                  class="ml-1 w-20"
                  size="small"
                  @keyup.enter="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                />
                <el-button
                  v-else
                  class="button-new-tag ml-1"
                  size="small"
                  @click="showInput(scope.row)"
                >
                  + 添加
                </el-button>
              </template></el-table-column
            >
            <el-table-column label="操作" width="150">
              <template v-slot="{ row }">
                <el-popconfirm
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  :title="`确认删除属性${row.saleAttrName}吗`"
                  @confirm="deleteHandle(row)"
                >
                  <template #reference>
                    <el-button type="danger" :icon="Delete" size="small" />
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            保存
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
export default {
  name: "AddOrUpdateSpu",
};
</script>

<script lang="ts" setup>
import { reactive, nextTick, ref, inject, onMounted } from "vue";
import type {
  FormInstance,
  FormRules,
  UploadProps,
  UploadUserFile,
} from "element-plus";
import { Plus, Delete } from "@element-plus/icons-vue";
import { getAllTrademarkListApi } from "@/api/product/trademark";
import { getBaseSaleAttrListApi, saveSpuInfoApi } from "@/api/product/spu";
import { ElMessage, ElInput } from "element-plus";
import { useCategoryStore } from "@/stores/category";
import { beforeLOGOUpload as beforeImageUpload } from "@/utils/tools";
import type {
  SpuList,
  SpuItem,
  SpuSaleAttrList,
} from "@/api/product/model/spuModel";
const categoryStore = useCategoryStore();

const inputValue = ref("");
const InputRef = ref<InstanceType<typeof ElInput>>();

const handleClose = (tag: string, row: any) => {
  row.spuSaleAttrValueList.splice(row.spuSaleAttrValueList.indexOf(tag), 1);
};

// 属性值列表修改的输入框聚焦与显示
const showInput = (row) => {
  row.inputVisible = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

// 添加属性值列表
const handleInputConfirm = (row) => {
  if (inputValue.value) {
    console.log(row, "row");
    // 根据接口数据，向属性值tags列表中添加数据对象
    row.spuSaleAttrValueList.push({
      saleAttrValueName: inputValue.value,
      baseSaleAttrId: row.baseSaleAttrId,
      saleAttrName: row.saleAttrName,
    });
  }
  row.inputVisible = false;
  inputValue.value = "";
};

const BASE_URL = import.meta.env.VITE_API_URL;
const trademarkList = ref([]);
const saleAttrList = ref([]);

// 销售属性，字符串拼接了名字和id
const saleAttr = ref();

onMounted(async () => {
  try {
    const [responseTrademarkList, responseBaseSaleAttrList] = await Promise.all(
      [getAllTrademarkListApi(), getBaseSaleAttrListApi()]
    );
    trademarkList.value = responseTrademarkList;
    saleAttrList.value = responseBaseSaleAttrList;
  } catch (err) {
    ElMessage.error("获取属性失败了...");
  }
});

const resetSaleAttr = () => {
  // 重置销售列表的当前选中项，若列表还有值那就选中第一项
  saleAttr.value = saleAttrList.value.length
    ? `${saleAttrList.value[0].name}:${saleAttrList.value[0].id}`
    : undefined;
};

// 修改销售属性选项
const addSaleAttr = () => {
  // 将选中的销售属性删除
  saleAttrList.value = saleAttrList.value.filter(
    (item) => item.id !== parseInt(saleAttr.value.split(":")[1])
  );
  // 将删除的属性添加到表格中
  ruleForm.spuSaleAttrList.push({
    baseSaleAttrId: +saleAttr.value.split(":")[1], // '+'转number类型
    saleAttrName: saleAttr.value.split(":")[0],
    spuSaleAttrValueList: [],
    inputVisible: false,
  });
  resetSaleAttr();
};

// 删除销售属性
const deleteHandle = (val) => {
  console.log(val);
  //  删除销售属性列表数据
  ruleForm.spuSaleAttrList = ruleForm.spuSaleAttrList.filter(
    (item) => item.baseSaleAttrId !== val.baseSaleAttrId
  );
  //  重新添加到select中
  saleAttrList.value.push({
    id: val.baseSaleAttrId,
    name: val.saleAttrName,
  });
  resetSaleAttr();
};

// const fileList = ref<UploadUserFile[]>([
//   {
//     name: "food.jpeg",
//     url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
//   },
// ]);

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;

  dialogVisible.value = true;
};
const handleUploadExceed: UploadProps["onExceed"] = () => {
  ElMessage.error("上传图片总数最多10张");
};

// 上传成功，清空表单校验结果
const handleUploadSuccess: UploadProps["onSuccess"] = (uploadFile) => {
  console.log(ruleForm.spuImageList, "ruleFormRef.spuImageList");
  ruleFormRef.value.clearValidate(["spuImageList"]);
};

const isComponentShow = inject("isComponentShow");

const loading = ref(false);

const ruleFormRef = ref<FormInstance>();

// 定义表单数据
const ruleForm = reactive<SpuItem>({
  category3Id: categoryStore.category3Id as number,
  spuName: "",
  tmId: undefined,
  description: "",
  spuImageList: [],
  spuSaleAttrList: <SpuSaleAttrList>[],
});

// 表单校验规则
const rules = reactive<FormRules>({
  //   name: [
  //     { required: true, message: "Please input Activity name", trigger: "blur" },
  //     { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  //   ],
  //   region: [
  //     {
  //       required: true,
  //       message: "Please select Activity zone",
  //       trigger: "change",
  //     },
  //   ],
  //   count: [
  //     {
  //       required: true,
  //       message: "Please select Activity count",
  //       trigger: "change",
  //     },
  //   ],
  //   date1: [
  //     {
  //       type: "date",
  //       required: true,
  //       message: "Please pick a date",
  //       trigger: "change",
  //     },
  //   ],
  //   date2: [
  //     {
  //       type: "date",
  //       required: true,
  //       message: "Please pick a time",
  //       trigger: "change",
  //     },
  //   ],
  //   type: [
  //     {
  //       type: "array",
  //       required: true,
  //       message: "Please select at least one activity type",
  //       trigger: "change",
  //     },
  //   ],
  //   resource: [
  //     {
  //       required: true,
  //       message: "Please select activity resource",
  //       trigger: "change",
  //     },
  //   ],
  //   desc: [
  //     { required: true, message: "Please input activity form", trigger: "blur" },
  //   ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { spuName, tmId, description, spuImageList, spuSaleAttrList } =
        ruleForm;
      const data = {
        category3Id: categoryStore.category3Id,
        spuName,
        tmId,
        description,
        spuImageList: spuImageList.map((item) => {
          return { imgName: item.name, imgUrl: item.response.data };
        }),
        spuSaleAttrList,
      };
      console.log(data.spuImageList, "imglist");
      await saveSpuInfoApi(data);
      isComponentShow.value = 0;
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  isComponentShow.value = 0;
};
</script>

<style scoped></style>
