<template>
  <el-card>
    <el-form inline>
      <el-form-item>
        <el-input placeholder="角色名称" v-model="roleName" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="getRoleList">
          查询
        </el-button>
        <el-button @click="reset">清空</el-button>
      </el-form-item>
    </el-form>

    <el-button
      type="primary"
      @click="showAddRole"
      v-permission="'btn.Role.add'"
    >
      添加
    </el-button>
    <el-button type="danger" disabled v-permission="'btn.Role.remove'">
      批量删除
    </el-button>

    <el-table :data="roleList" border class="mt-20" v-loading="loading">
      <el-table-column type="selection" width="60" align="center" />
      <el-table-column type="index" width="60" align="center" label="序号" />
      <el-table-column label="角色名称" prop="roleName" />
      <el-table-column label="操作" width="200" fixed="right">
        <template v-slot="{ row }">
          <el-button
            type="info"
            :icon="User"
            size="small"
            @click="showRoleAuth(row)"
            v-permission="'btn.Role.assgin'"
          />
          <el-button
            type="warning"
            :icon="Edit"
            size="small"
            v-permission="'btn.Role.update'"
          />
          <el-button
            type="danger"
            :icon="Delete"
            size="small"
            v-permission="'btn.Role.remove'"
          />
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="mt-20"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="total"
      :page-sizes="[5, 10, 15, 20]"
      layout="prev, pager, next, jumper, ->, sizes, total"
      @current-change="getRoleList"
      @size-change="getRoleList"
    />

    <el-dialog :title="`添加角色`" v-model="visible">
      <el-form label-width="100px">
        <el-form-item label="角色名称">
          <el-input placeholder="用户名" v-model="roleFormData.roleName" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="addRole">保存</el-button>
          <el-button @click="visible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
export default {
  name: "XRole",
};
</script>

<script lang="ts" setup>
import { Search, User, Edit, Delete } from "@element-plus/icons-vue";
import { ref, onMounted, reactive } from "vue";
import { getRoleListApi, addRoleApi } from "@/api/acl/role";
import type { RoleList, RoleItem } from "@/api/acl/model/userModel";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

const showRoleAuth = (row: RoleItem) => {
  router.push({
    name: "RoleAuth",
    query: {
      id: row.id,
      roleName: row.roleName,
    },
  });
};

/************************ 添加角色 ********************/

const visible = ref(false);

const roleFormData = reactive({
  roleName: "",
});

const addRole = async () => {
  await addRoleApi(roleFormData.roleName);
  getRoleList();
  ElMessage.success("添加角色成功");
  visible.value = false;
};

const showAddRole = () => {
  visible.value = true;
  roleFormData.roleName = "";
};

/************************ 角色列表分页展示 ********************/

const roleName = ref("");
const roleList = ref<RoleList>([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);

const getRoleList = async () => {
  loading.value = true;
  const res = await getRoleListApi({
    page: currentPage.value,
    limit: pageSize.value,
    roleName: roleName.value,
  });
  total.value = res.total;
  roleList.value = res.items;
  loading.value = false;
};

const reset = () => {
  roleName.value = "";
  getRoleList();
};

onMounted(getRoleList);
</script>

<style scoped></style>
