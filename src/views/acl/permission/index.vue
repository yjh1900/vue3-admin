<template>
  <el-card>
    <!--  当 row 中包含 children 字段时，被视为树形数据。 渲染嵌套数据需要 prop 的 row-key。 -->
    <el-table
      :data="permissionList"
      border
      row-key="id"
      :expand-row-keys="['1']"
    >
      <el-table-column label="名称" prop="name" />
      <el-table-column label="权限值" prop="code" />
      <el-table-column label="跳转权限值" prop="toCode" />
      <el-table-column label="操作">
        <PermissionButton
          type="primary"
          :icon="Plus"
          size="small"
          permission="btn.Permission.add"
        />
        <PermissionButton
          type="warning"
          :icon="Edit"
          size="small"
          permission="btn.Permission.update"
        />
        <PermissionButton
          type="danger"
          :icon="Delete"
          size="small"
          permission="btn.Permission.remove"
        />
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
export default {
  name: "XPermission",
};
</script>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Plus, Edit, Delete } from "@element-plus/icons-vue";
import { getPermissionList } from "@/api/acl/permission";

const permissionList = ref([]);

onMounted(async () => {
  const res = await getPermissionList();
  permissionList.value = res.children;
});
</script>

<style scoped></style>
