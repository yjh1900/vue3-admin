<template>
  <el-card class="box-card" shadow="hover">
    <el-button type="primary" :icon="Plus" @click="addHandle(0)"
      >添加品牌</el-button
    >
    <!-- 
      data 要渲染的数据
      border 带边框
      row-key="id" 指定table每行key属性的值
      v-loading 为true时显示加载中的效果 -->
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

    <!-- 
      v-model:current-page 当前页码
      v-model:page-size    每页条数
      :page-sizes          每页条数的选项
      layout    分页器需要加载的组件
      total     总数
      @size-change  当page-size发生变化触发的事件
      @current-change  当current-page发生变化触发的事件
     -->
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

    <!-- Form -->
    <el-dialog
      v-model="dialogAddOrUpdateVisible"
      :title="!formData.id ? '添加品牌' : '修改品牌数据'"
    >
      <!-- ref不需要v-bind -->
      <el-form ref="formRef" :model="formData" :rules="formRules">
        <el-form-item
          label="品牌名称"
          prop="tmName"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="formData.tmName"
            autocomplete="off"
            placeholder="请输入品牌名称"
          />
        </el-form-item>
        <el-form-item
          label="品牌LOGO"
          prop="logoUrl"
          :label-width="formLabelWidth"
        >
          <el-upload
            class="LOGO-uploader"
            :action="`${BASE_URL}/admin/product/fileUpload`"
            :show-file-list="false"
            :on-success="handleLOGOSuccess"
            :before-upload="beforeLOGOUpload"
          >
            <img v-if="formData.logoUrl" :src="formData.logoUrl" class="LOGO" />
            <el-icon v-else class="LOGO-uploader-icon"><Plus /></el-icon>
            <template #tip>
              <div>只能上传jpg/png文件，且不超过2MB</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addOrUpdateCancel">取消</el-button>
          <el-button type="primary" @click="addOrUpdateSubmit">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogDelVisible" title="删除数据">
      确认删除{{ trademark.name }}品牌的数据？
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="delCancel">取消</el-button>
          <el-button type="primary" @click="delSubmit"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
export default {
  name: "Trademark",
};
</script>

<script lang="ts" setup>
import { ElMessage, type FormRules } from "element-plus";
import { Plus, Edit, Delete } from "@element-plus/icons-vue";
import { ref, onMounted, reactive } from "vue";
import {
  getTrademarkListApi,
  uploadTrademarkApi,
  deleteTrademarkApi,
  updateTrademarkApi,
} from "@/api/product/trademark";
import type {
  TrademarkList,
  TrademarkItem,
} from "@/api/product/model/trademarkModel";

import type { UploadProps } from "element-plus";

const dialogDelVisible = ref(false); // 删除数据模态框显示布尔值

const trademarkInit = () => ({ name: "", id: 0 });
const trademark = reactive(trademarkInit());

// 删除提交，发请求
const delSubmit = async () => {
  console.log();
  await deleteTrademarkApi(trademark.id);
  getTrademarkList();
  ElMessage.success("删除成功");
  dialogDelVisible.value = false;
};
// 删除取消
const delCancel = () => {
  dialogDelVisible.value = true;
  ElMessage.info("取消删除");
};
// 删除操作，弹出模态框
const deleteHandle = (val: TrademarkItem) => {
  trademark.id = val.id;
  trademark.name = val.tmName;
  dialogDelVisible.value = true;
};
// 编辑操作
const editHandle = (val: TrademarkItem) => {
  formData.id = val.id;
  formData.tmName = val.tmName;
  formData.logoUrl = val.logoUrl;
  dialogAddOrUpdateVisible.value = true;
  // 清除校验规则
  formRef.value.clearValidate();
};
const addHandle = (id: number) => {
  clearFormData();
  dialogAddOrUpdateVisible.value = true;
  formData.id = id;
  // 清除校验规则
  formRef.value.clearValidate();
};
const clearFormData = () => {
  (formData.logoUrl = ""), (formData.tmName = ""), (formData.id = 0);
};
// 提交表单数据
const addOrUpdateSubmit = async () => {
  await formRef.value.validate();
  if (!formData.id) {
    // 新增数据
    await uploadTrademarkApi(formData.tmName, formData.logoUrl);
  } else {
    // 更新数据
    await updateTrademarkApi(formData);
  }
  ElMessage.success(!formData.id ? "修改成功" : "数据上传成功");
  dialogAddOrUpdateVisible.value = false;
  clearFormData();
  getTrademarkList();
};

// 新增取消
const addOrUpdateCancel = () => {
  dialogAddOrUpdateVisible.value = false;
};

// 请求前缀
/*
    import.meta
        Vite 在一个特殊的 import.meta.env 对象上暴露环境变量。这里有一些在所有情况下都可以使用的内建变量：
        import.meta.env.MODE: {string} 应用运行的模式。
        import.meta.env.BASE_URL: {string} 部署应用时的基本 URL。他由base配置项决定。
        import.meta.env.PROD: {boolean} 应用是否运行在生产环境。
        import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与import.meta.env.PROD相反)。
        import.meta.env.SSR: {boolean} 应用是否运行在server上。
 */

const BASE_URL = import.meta.env.VITE_API_URL;

// 图片上传好的回调
const handleLOGOSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  //   formData.logoUrl = URL.createObjectURL(uploadFile.raw!);
  //   上面拿到的会是localhost数据
  formData.logoUrl = response.data;
  //   清除图片的验证信息
  formRef.value.clearValidate(["logoUrl"]);
  //   imageUrl.value = uploadFile.url as string;
};

// 图片上传前的处理
const beforeLOGOUpload: UploadProps["beforeUpload"] = (rawFile) => {
  // 判断文件类型，MIME 类型
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    ElMessage.error("图片必须为png或jpg格式！");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("图片大小超过2MB");
    return false;
  }
  return true;
};

// 表单模拟数据
const dialogAddOrUpdateVisible = ref(false);
const formLabelWidth = "140px";
const loading = ref(false);

// 获取表单组件实例对象，将来调用表单组件的方法
const formRef = ref();
// 表单数据
const formData = reactive({
  id: 0,
  tmName: "",
  logoUrl: "",
});
/* 
  表单校验规则
    1.先从elementplus中引入FormRules
    2.定义规则对象，类型是FormRules
    3.将from组件的rules属性绑定该对象，并且每个item的prop属性值要和rules对象属性对应
    4.使用的时候调用formRef.value.validate()
*/
const formRules = reactive<FormRules>({
  // https://github.com/yiminghe/async-validator
  tmName: [
    {
      required: true,
      message: "请输入品牌名称",
      trigger: "blur",
    },
    {
      min: 2,
      max: 10,
      message: "请输入2-10个字符",
      trigger: "blur",
    },
  ],
  logoUrl: [
    {
      required: true,
      message: "请上传文件",
    },
  ],
});

const total = ref(0); // 数据总条数
const currentPage = ref(1); // 当前界面索引
const pageSize = ref(5); // 每页数据条数
const background = ref(false); // 是否为分页按钮添加背景色
const disabled = ref(false); // 是否禁用分页
const trademarkList = ref<TrademarkList>([]); // 表单数据源

// 公共请求函数
const getTrademarkList = async () => {
  loading.value = true;
  const res = await getTrademarkListApi(currentPage.value, pageSize.value);
  //   trademarkList.value = res.data.records;
  total.value = res.total;
  trademarkList.value = res.records;
  loading.value = false;
};
// 切换每页数据条数
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  currentPage.value = 1;
  getTrademarkList();
};
// 跳转页面
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getTrademarkList();
};

// onMounted(() => {
//   getTrademarkList();
// });

onMounted(getTrademarkList);
</script>

<style scoped>
.trademark-logo {
  width: 150px;
  height: 100px;
}
.trademark-table {
  width: 100%;
  margin-bottom: 20px;
}
/* .el-button--text {
  margin-right: 15px;
}*/
.el-input {
  width: 400px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.LOGO-uploader .LOGO {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.LOGO-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.LOGO-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.LOGO-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
