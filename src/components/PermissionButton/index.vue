<template>
  <el-button v-bind="$attrs" v-if="userInfoStore.buttons.includes(permission)">
    <slot />
  </el-button>
</template>

<script lang="ts">
export default {
  name: "PermissionButton",
};
</script>

<script lang="ts" setup>
import { useUserInfoStore } from "@/stores/userInfo";

const userInfoStore = useUserInfoStore();

defineProps<{
  permission: string;
}>();
</script>

<style scoped></style>
