<template>
  <el-card>
    <el-form>
      <el-form-item label="角色名称">
        <el-input disabled :value="$route.query.roleName" />
      </el-form-item>
      <el-form-item label="权限列表">
        <el-tree
          :data="permissionList"
          :props="{
            label: 'name',
            children: 'children',
          }"
          show-checkbox
          class="role-auth__tree"
          default-expand-all
          ref="treeRef"
          node-key="id"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="assignRolePermissionList">
          保存
        </el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
export default {
  name: "RoleAuth",
};
</script>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import {
  getRolePermissionListApi,
  assignRolePermissionListApi,
} from "@/api/acl/role";
import type { PermissionList } from "@/api/acl/model/roleModel";
import { useRoute, useRouter } from "vue-router";

const permissionList = ref<PermissionList>([]);

const treeRef = ref();

const route = useRoute();

onMounted(async () => {
  const res = await getRolePermissionListApi(route.query.id as string);
  permissionList.value = res.children;
  // 设置选中的元素
  const checkedKeys = getCheckedKeys(res.children);
  treeRef.value.setCheckedKeys(checkedKeys);
});

// 获取选中的id（只要最后一层菜单的id）
const getCheckedKeys = (permissionList: PermissionList) => {
  let checkedKeys: string[] = [];

  permissionList.forEach((permission) => {
    if (permission.children.length) {
      const newCheckedKeys = getCheckedKeys(permission.children);
      checkedKeys = [...checkedKeys, ...newCheckedKeys];
    } else if (permission.select) {
      checkedKeys.push(permission.id);
    }
  });

  return checkedKeys;
};

const assignRolePermissionList = async () => {
  const permissionList = [
    ...treeRef.value.getCheckedKeys(), // 选中的
    ...treeRef.value.getHalfCheckedKeys(), // 半选的
  ];
  await assignRolePermissionListApi(route.query.id as string, permissionList);
  cancel();
};

const router = useRouter();

const cancel = () => {
  router.push({
    name: "Role",
  });
};
</script>

<style scoped>
.role-auth__tree {
  width: 100%;
  text-align: left;
}
</style>
