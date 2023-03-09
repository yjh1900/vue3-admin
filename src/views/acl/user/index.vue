<template>
  <el-card>
    <el-form inline>
      <el-form-item>
        <el-input placeholder="用户名" v-model="username" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="getUserList">
          查询
        </el-button>
        <el-button @click="reset">清空</el-button>
      </el-form-item>
    </el-form>

    <el-button
      type="primary"
      @click="showAddUser"
      v-if="userInfoStore.buttons.includes('btn.User.add')"
    >
      添加
    </el-button>
    <el-button
      type="danger"
      disabled
      v-if="userInfoStore.buttons.includes('btn.User.remove')"
    >
      批量删除
    </el-button>

    <el-table :data="userList" border class="mt-20" v-loading="loading">
      <el-table-column type="selection" width="60" align="center" />
      <el-table-column type="index" width="60" align="center" label="序号" />
      <el-table-column label="用户名" prop="username" width="200" />
      <el-table-column label="用户昵称" prop="nickName" width="200" />
      <el-table-column label="角色列表" prop="roleName" width="200" />
      <el-table-column label="创建时间" prop="gmtCreate" width="200" />
      <el-table-column label="更新时间" prop="gmtModified" width="200" />
      <el-table-column label="操作" width="200" fixed="right">
        <template v-slot="{ row }">
          <el-button
            type="info"
            :icon="User"
            size="small"
            @click="showAssignRole(row)"
            v-if="userInfoStore.buttons.includes('btn.User.assgin')"
          />
          <el-button
            type="warning"
            :icon="Edit"
            size="small"
            @click="showUpdateUser(row)"
            v-if="userInfoStore.buttons.includes('btn.User.update')"
          />
          <el-button
            type="danger"
            :icon="Delete"
            size="small"
            @click="removeUser(row.id)"
            v-if="userInfoStore.buttons.includes('btn.User.remove')"
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
      @current-change="getUserList"
      @size-change="getUserList"
    />

    <el-dialog
      :title="`${addOrUpdateUserFormData.id ? '更新' : '添加'}用户`"
      v-model="addOrUpdateUserVisible"
    >
      <el-form
        label-width="100px"
        ref="addOrUpdateUserFormRef"
        :model="addOrUpdateUserFormData"
        :rules="addOrUpdateUserFormRules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            placeholder="用户名"
            v-model="addOrUpdateUserFormData.username"
          />
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input
            placeholder="用户昵称"
            v-model="addOrUpdateUserFormData.nickName"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            placeholder="密码"
            type="password"
            v-model="addOrUpdateUserFormData.password"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="addOrUpdateUser">保存</el-button>
          <el-button @click="addOrUpdateUserVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog title="分配用户角色" v-model="assignRoleVisible">
      <el-form
        label-width="100px"
        ref="assignRoleFormRef"
        :model="assignRoleFormData"
        :rules="assignRoleFormRules"
      >
        <el-form-item label="用户名">
          <el-input
            placeholder="用户名"
            disabled
            v-model="assignRoleFormData.username"
          />
        </el-form-item>
        <el-form-item label="角色列表" prop="roleId">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <el-checkbox-group
            v-model="assignRoleFormData.roleId"
            @change="handleCheckedRolesChange"
          >
            <el-checkbox
              v-for="role in allRolesList"
              :key="role.id"
              :label="role.id"
            >
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="assignRole">保存</el-button>
          <el-button @click="assignRoleVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
export default {
  name: "XUser",
};
</script>

<script lang="ts" setup>
import { Search, User, Edit, Delete } from "@element-plus/icons-vue";
import { ref, onMounted, reactive } from "vue";
import {
  getUserListApi,
  addUserApi,
  updateUserApi,
  removeUserApi,
  getUserRoleListApi,
  assignUserRoleListApi,
} from "@/api/acl/user";
import type {
  UserList,
  UserItem,
  AddOrUpdateUserFormData,
  RoleList,
} from "@/api/acl/model/userModel";
import { ElMessage } from "element-plus";
import type { CheckboxValueType } from "element-plus";
import { useUserInfoStore } from "@/stores/userInfo";

const userInfoStore = useUserInfoStore();

const reset = () => {
  username.value = "";
  getUserList();
};

/************************ 分配用户角色列表 ************************/

const assignRoleVisible = ref(false);
const checkAll = ref(false); // 全选&全不选
const isIndeterminate = ref(false); // 半选
const allRolesList = ref<RoleList>([]);

// 全选&全不选触发回调
const handleCheckAllChange = (val: CheckboxValueType) => {
  if (val) {
    // 全选
    assignRoleFormData.roleId = allRolesList.value.map((item) => item.id);
  } else {
    // 全不选
    assignRoleFormData.roleId = [];
  }
  isIndeterminate.value = false;
};

const handleCheckedRolesChange = () => {
  if (assignRoleFormData.roleId.length === 0) {
    // 全不选
    isIndeterminate.value = false;
    checkAll.value = false;
  } else if (assignRoleFormData.roleId.length === allRolesList.value.length) {
    // 全选
    isIndeterminate.value = false;
    checkAll.value = true;
  } else {
    isIndeterminate.value = true;
  }
};

const showAssignRole = async (row: UserItem) => {
  assignRoleVisible.value = true;
  assignRoleFormData.userId = row.id;
  assignRoleFormData.username = row.username;
  assignRoleFormData.roleId = [];
  assignRoleFormRef.value?.clearValidate();

  const res = await getUserRoleListApi(row.id);
  allRolesList.value = res.allRolesList;
  assignRoleFormData.roleId = res.assignRoles.map((item) => item.id); // 将来发送请求只需要id

  handleCheckedRolesChange();
};

const assignRoleFormRef = ref();
const assignRoleFormData = reactive<{
  userId: string;
  roleId: string[];
  username: string;
}>({
  userId: "",
  roleId: [],
  username: "",
});
const assignRoleFormRules = reactive({
  roleId: [{ required: true, message: "请选择至少一个角色" }],
});

const assignRole = async () => {
  await assignRoleFormRef.value.validate();
  await assignUserRoleListApi(
    assignRoleFormData.userId,
    assignRoleFormData.roleId
  );
  ElMessage.success("分配角色成功");
  getUserList();
  assignRoleVisible.value = false;
};

/************************ 删除用户 ************************/
const removeUser = async (id: string) => {
  await removeUserApi(id);
  ElMessage.success("删除用户成功");
  getUserList();
};

/************************ 修改用户 ************************/
const showUpdateUser = (row: UserItem) => {
  addOrUpdateUserVisible.value = true;
  addOrUpdateUserFormData.id = row.id;
  addOrUpdateUserFormData.username = row.username;
  addOrUpdateUserFormData.nickName = row.nickName;
  addOrUpdateUserFormData.password = "";
  addOrUpdateUserFormRef.value?.clearValidate();
};

/************************ 添加用户 ************************/

const addOrUpdateUserVisible = ref(false);

const showAddUser = () => {
  addOrUpdateUserVisible.value = true;
  addOrUpdateUserFormData.username = "";
  addOrUpdateUserFormData.nickName = "";
  addOrUpdateUserFormData.password = "";
  addOrUpdateUserFormRef.value?.clearValidate();
};

const addOrUpdateUserFormRef = ref();
const addOrUpdateUserFormData = reactive<AddOrUpdateUserFormData>({
  id: undefined,
  username: "",
  nickName: "",
  password: "",
});
const addOrUpdateUserFormRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  nickName: [{ required: true, message: "请输入用户昵称", trigger: "blur" }],
  password: [{ required: true, message: "请输入用户密码", trigger: "blur" }],
});

const addOrUpdateUser = async () => {
  await addOrUpdateUserFormRef.value.validate();
  const id = addOrUpdateUserFormData.id;
  if (id) {
    await updateUserApi({
      ...addOrUpdateUserFormData,
      id,
    });
  } else {
    await addUserApi(addOrUpdateUserFormData);
  }
  getUserList();
  addOrUpdateUserVisible.value = false;
  ElMessage.success(`${id ? "修改" : "添加"}用户成功`);
};

/************************ 用户列表数据展示 ************************/
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);
const username = ref("");
const loading = ref(false);
const userList = ref<UserList>([]);

const getUserList = async () => {
  loading.value = true;
  const res = await getUserListApi({
    page: currentPage.value,
    limit: pageSize.value,
    username: username.value,
  });
  total.value = res.total;
  userList.value = res.items;
  loading.value = false;
};

onMounted(getUserList);
</script>

<style scoped></style>
