<template>
  <div>
    <CategorySelector />
    <AttrList />
  </div>
</template>

<script lang="ts">
export default {
  name: "Attr",
};
</script>

<script lang="ts" setup>
import CategorySelector from "@/components/CategorySelector/index.vue";
import AttrList from "./components/AttrList.vue";
</script>

<style scoped></style>
