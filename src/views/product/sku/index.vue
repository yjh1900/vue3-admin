<template>
  <el-card>
    <el-table :data="skuList" border v-loading="loading">
      <el-table-column type="index" align="center" label="序号" width="60" />
      <el-table-column label="名称" prop="skuName" />
      <el-table-column label="描述" prop="skuDesc" />
      <el-table-column label="默认图片">
        <template v-slot="{ row }">
          <img :src="row.skuDefaultImg" :alt="row.skuName" class="sku__img" />
        </template>
      </el-table-column>
      <el-table-column label="重量(KG)" prop="weight" />
      <el-table-column label="价格(元)" prop="price" />
      <el-table-column label="操作" width="230">
        <template v-slot="{ row }">
          <!-- 
            isSale 
              1 代表上架，显示下架按钮
              0 代表下架，显示上架按钮
           -->
          <el-button
            type="primary"
            :icon="Top"
            size="small"
            title="上架"
            v-if="row.isSale === 0"
            @click="onSale(row.id)"
          />
          <el-button
            type="info"
            :icon="Bottom"
            size="small"
            title="下架"
            v-else
            @click="cancelSale(row.id)"
          />
          <el-button type="warning" :icon="Edit" size="small" title="修改SKU" />
          <el-button
            type="info"
            :icon="InfoFilled"
            size="small"
            title="查看SKU详情"
            @click="showDrawer(row.id)"
          />
          <el-button
            type="danger"
            :icon="Delete"
            size="small"
            title="删除SKU"
          />
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="mt-20"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="total"
      :page-sizes="[10, 20, 30, 40]"
      layout="prev, pager, next, jump, ->, sizes, total"
      @current-change="getSkuList"
      @size-change="getSkuList"
    />

    <el-drawer v-model="drawerVisible" :show-close="false">
      <el-descriptions :column="1">
        <el-descriptions-item label="名称">
          {{ sku.skuName }}
        </el-descriptions-item>
        <el-descriptions-item label="描述">
          {{ sku.skuDesc }}
        </el-descriptions-item>
        <el-descriptions-item label="价格">
          {{ sku.price }}
        </el-descriptions-item>
        <el-descriptions-item label="平台属性">
          <el-tag
            type="success"
            v-for="attr in sku.skuAttrValueList"
            :key="attr.id"
          >
            {{ attr.attrName }} - {{ attr.valueName }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="销售属性">
          <el-tag
            type="success"
            v-for="saleAttr in sku.skuSaleAttrValueList"
            :key="saleAttr.id"
          >
            {{ saleAttr.saleAttrName }} - {{ saleAttr.saleAttrValueName }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="商品图片">
          <el-carousel height="200px" indicator-position="none">
            <el-carousel-item v-for="img in sku.skuImageList" :key="img.id">
              <img
                :src="img.imgUrl"
                :alt="img.imgName"
                class="sku__img--full"
              />
            </el-carousel-item>
          </el-carousel>
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </el-card>
</template>

<script lang="ts">
export default {
  name: "Sku",
};
</script>

<script lang="ts" setup>
import { Top, Bottom, Edit, InfoFilled, Delete } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import type {
  SkuList,
  AddOrUpdateSkuParams,
} from "@/api/product/model/skuModel";
import {
  getSkuListApi,
  onSaleApi,
  cancelSaleApi,
  getSkuById,
} from "@/api/product/sku";

const skuList = ref<SkuList>([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

const getSkuList = async () => {
  loading.value = true;
  const res = await getSkuListApi(currentPage.value, pageSize.value);
  skuList.value = res.records;
  total.value = res.total;
  loading.value = false;
};

onMounted(getSkuList);

// 上架和下架
const onSale = async (id: number) => {
  await onSaleApi(id);
  ElMessage.success("上架商品成功");
  getSkuList();
};
const cancelSale = async (id: number) => {
  await cancelSaleApi(id);
  ElMessage.success("下架商品成功");
  getSkuList();
};

const drawerVisible = ref(false);
const sku = ref<AddOrUpdateSkuParams>({
  skuName: "",
  price: undefined,
  weight: undefined,
  skuDesc: "",
  skuImageList: [],
  skuDefaultImg: "",
  spuId: 0,
  category3Id: 0,
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
});

const showDrawer = async (id: number) => {
  drawerVisible.value = true;
  sku.value = await getSkuById(id);
};
</script>

<style scoped>
.sku__img {
  width: 100px;
  height: 100px;
}
.sku__img--full {
  width: 100%;
  height: 100%;
}
</style>
