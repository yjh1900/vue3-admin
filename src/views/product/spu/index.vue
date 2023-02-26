<template>
  <div>
    <CategorySelector :disabled="!isSpuListShow" />
    <SpuList v-if="isComponentShow === curComponents.SpuList" />
    <AddSku v-if="isComponentShow === curComponents.AddSku" />
    <AddOrUpdateSpu v-if="isComponentShow === curComponents.AddOrUpdateSpu" />
  </div>
</template>

<script lang="ts">
export default {
  name: "Spu",
};
</script>

<script lang="ts" setup>
import CategorySelector from "@/components/CategorySelector/index.vue";
import AddSku from "./components/AddSku.vue";
import AddOrUpdateSpu from "./components/AddOrUpdateSpu.vue";
import SpuList from "./components/SpuList.vue";

import { ref } from "vue";
const isSpuListShow = ref(true);
const isComponentShow = ref(0);
enum curComponents {
  SpuList,
  AddSku,
  AddOrUpdateSpu,
}
</script>

<style scoped></style>
