<template>
  <el-card shadow="hover" class="mt-20">
    <el-form
      label-width="100px"
      ref="skuFormRef"
      :model="skuFormData"
      :rules="skuFormRules"
    >
      <el-form-item label="SPU名称">
        {{ curSpuItem.spuName }}
      </el-form-item>
      <el-form-item label="SKU名称" prop="skuName">
        <el-input placeholder="SKU名称" v-model="skuFormData.skuName" />
      </el-form-item>
      <el-form-item label="价格(元)" prop="price">
        <el-input-number
          class="sku__input-number"
          placeholder="价格(元)"
          controls-position="right"
          :min="0"
          v-model="skuFormData.price"
        />
      </el-form-item>
      <el-form-item label="重量(千克)" prop="weight">
        <el-input-number
          class="sku__input-number"
          placeholder="重量(千克)"
          controls-position="right"
          :min="0"
          v-model="skuFormData.weight"
        />
      </el-form-item>
      <el-form-item label="规格描述" prop="skuDesc">
        <el-input
          placeholder="规格描述"
          type="textarea"
          :rows="3"
          v-model="skuFormData.skuDesc"
        />
      </el-form-item>
      <el-form-item label="平台属性" prop="skuAttrValueList">
        <!-- 
          响应式布局/栅格布局
          一行分为24等份
            :gutter="10" 列的间隙
        -->
        <el-row :gutter="10" class="sku__row">
          <el-col
            v-for="(attr, index) in attrList"
            :key="attr.id"
            :xs="24"
            :sm="12"
            :lg="8"
            :xl="4"
          >
            <div class="sku__col-wrap">
              <span class="sku__col-title">{{ attr.attrName }}</span>
              <el-select v-model="skuFormData.skuAttrValueList[index]">
                <!-- 
                  如果只要收集一个数据，直接写，
                  收集多个数据，可以字符串拼接起来 
                -->
                <el-option
                  v-for="attrValue in attr.attrValueList"
                  :key="attrValue.id"
                  :value="`${attr.id}:${attr.attrName}:${attrValue.id}:${attrValue.valueName}`"
                  :label="attrValue.valueName"
                />
              </el-select>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="销售属性" prop="skuSaleAttrValueList">
        <el-row :gutter="10" class="sku__row">
          <el-col
            v-for="(saleAttr, index) in spuSaleAttrList"
            :key="saleAttr.id"
            :xs="24"
            :sm="12"
            :lg="8"
            :xl="4"
          >
            <div class="sku__col-wrap">
              <span class="sku__col-title">{{ saleAttr.saleAttrName }}</span>
              <el-select v-model="skuFormData.skuSaleAttrValueList[index]">
                <el-option
                  v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
                  :key="saleAttrValue.id"
                  :value="`${saleAttr.id}:${saleAttr.saleAttrName}:${saleAttrValue.id}:${saleAttrValue.saleAttrValueName}`"
                  :label="saleAttrValue.saleAttrValueName"
                />
              </el-select>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="图片列表" prop="skuImageList">
        <el-table
          :data="spuImageList"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="60" align="center" />
          <el-table-column label="图片">
            <template v-slot="{ row }">
              <img :src="row.imgUrl" :alt="row.imgName" class="sku__img" />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName" />
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <!-- 
                默认图片 isDefault
                  '0' 不是默认图片
                  '1' 是默认图片
               -->
              <el-tag type="success" v-if="row.isDefault === '1'">
                默认图片
              </el-tag>
              <el-button
                type="primary"
                size="small"
                v-else
                @click="setSkuDefaultImg(row)"
              >
                设置默认图片
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button @click="cancel(skuFormRef)">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
export default {
  name: "AddSku",
};
</script>

<script lang="ts" setup>
import type { Ref } from "vue";
import { onMounted, ref, reactive, inject } from "vue";
import { useCategoryStore } from "@/stores/category";
import { getAttrListApi } from "@/api/product/attr";
import { getSpuSaleAttrListApi, getSpuImageListApi } from "@/api/product/spu";
import { addSkuApi } from "@/api/product/sku";
import type { AttrList } from "@/api/product/model/attrModel";
import type {
  SpuSaleAttrList,
  SpuImageList,
  SpuItem,
} from "@/api/product/model/spuModel";
import type {
  SkuFormData,
  SkuImageList,
  SkuImageItem,
} from "@/api/product/model/skuModel";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
const isComponentShow = inject("isComponentShow") as Ref<number>;
const curSpuItem = inject("curSpuItem") as Ref<SpuItem>;
const categoryStore = useCategoryStore();

const attrList = ref<AttrList>([]);
const spuSaleAttrList = ref<SpuSaleAttrList>([]);
const spuImageList = ref<SpuImageList>([]);

onMounted(async () => {
  attrList.value = await getAttrListApi();
});
onMounted(async () => {
  spuSaleAttrList.value = await getSpuSaleAttrListApi(
    curSpuItem.value.id as number
  );
});
onMounted(async () => {
  spuImageList.value = await getSpuImageListApi(curSpuItem.value.id as number);
});

// 表单校验和收集数据
const skuFormRef = ref();
const skuFormData = reactive<SkuFormData>({
  // category3Id: 0, // 通过categoryStore获取
  // createTime: "2022-12-24T02:23:55.257Z", // 由服务器生成
  // id: 0, // 添加不需要id
  // isSale: 0, // 由服务器生成（代表商品上架或下架）
  // spuId: 0, // 通过spuStore获取
  // tmId: 0, // 从属与spu的tmId
  skuName: "",
  price: undefined,
  weight: undefined,
  skuDesc: "",
  skuAttrValueList: [
    // {
    //   attrId: 0,
    //   attrName: "string",
    //   valueId: 0,
    //   valueName: "string",
    // },
  ],
  skuSaleAttrValueList: [
    // {
    //   id: 0,
    //   saleAttrId: 0,
    //   saleAttrName: "string",
    //   saleAttrValueId: 0,
    //   saleAttrValueName: "string",
    //   skuId: 0,
    //   spuId: 0,
    // },
  ],
  skuDefaultImg: "",
  skuImageList: [
    // {
    //   id: 0,
    //   imgName: "string",
    //   imgUrl: "string",
    //   isDefault: "string",
    //   skuId: 0,
    //   spuImgId: 0,
    // },
  ],
});

const skuImageListValidator = (
  rule: any,
  value: SkuImageList,
  callback: any
) => {
  //   // 1. 至少选中一张图片
  //   if (!value.length) {
  //     callback(new Error("请至少选中一张图片"));
  //     return;
  //   }
  //   // 2. 选中的图片必须有默认图片
  //   if (!value.some((img) => img.isDefault === "1")) {
  //     callback(new Error("选中的图片必须有默认图片"));
  //     return;
  //   }
  //   callback();
};

const skuFormRules = reactive({
  skuName: [{ required: true, message: "请输入SKU名称", trigger: "blur" }],
  price: [{ required: true, message: "请输入SKU价格", trigger: "blur" }],
  weight: [{ required: true, message: "请输入SKU重量", trigger: "blur" }],
  skuDesc: [{ required: true, message: "请输入SKU规格描述", trigger: "blur" }],
  skuAttrValueList: [
    { required: true, message: "请选择SKU平台属性", trigger: "change" },
  ],
  skuSaleAttrValueList: [
    { required: true, message: "请选择SKU销售属性", trigger: "change" },
  ],
  skuImageList: [{ required: true, validator: skuImageListValidator }],
});

const handleSelectionChange = (val: SkuImageList) => {
  //   skuFormData.skuImageList = val;
};

// 设置默认图片
const setSkuDefaultImg = (row: SkuImageItem) => {
  // 排他
  // 遍历将所有改为0
  spuImageList.value.forEach((img) => (img.isDefault = "0"));
  // 将点击改为1
  row.isDefault = "1";
  // 更新默认图片地址
  skuFormData.skuDefaultImg = row.imgUrl;
  // 判断点击图片是否选中，选中了就要清空表单校验错误信息
  if (skuFormData.skuImageList.some((img) => img === row)) {
    skuFormRef.value.clearValidate(["skuImageList"]);
  }
};

const cancel = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  curSpuItem.value = null;
  isComponentShow.value = 0;
};

const submit = async () => {
  console.log(123);

  // await skuFormRef.value.validate();

  await addSkuApi({
    ...skuFormData,
    category3Id: categoryStore.category3Id as number,
    spuId: curSpuItem.value.id as number,
    // 组件收集到的数据 [undefined, string]
    // 发送请求需要的数据是对象，所以先将undefined过滤掉，再格式化成对象
    skuAttrValueList: skuFormData.skuAttrValueList
      .filter(Boolean)
      .map((attr) => {
        const [attrId, attrName, valueId, valueName] = (attr as string).split(
          ":"
        );
        return {
          attrId: +attrId,
          attrName,
          valueId: +valueId,
          valueName,
        };
      }),
    skuSaleAttrValueList: skuFormData.skuSaleAttrValueList
      .filter(Boolean)
      .map((attr) => {
        const [saleAttrId, saleAttrName, saleAttrValueId, saleAttrValueName] = (
          attr as string
        ).split(":");
        return {
          saleAttrId: +saleAttrId,
          saleAttrName,
          saleAttrValueId: +saleAttrValueId,
          saleAttrValueName,
        };
      }),
  });

  ElMessage.success("添加SKU成功");
  curSpuItem.value = null;
  isComponentShow.value = 0;
};
</script>

<style scoped>
.sku__input-number {
  width: 100%;
}

:deep(.el-input__inner) {
  text-align: left;
}

.sku__img {
  width: 100px;
  height: 100px;
}

.sku__col-wrap {
  display: flex;
  margin-bottom: 10px;
}
.sku__col-title {
  flex-grow: 1;
  margin-right: 10px;
  text-align: right;
}

.sku__row {
  width: 100%;
}
</style>
