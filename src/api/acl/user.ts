import request from "@/utils/request";
import type {
  GetUserListApiParams,
  GetUserListApiResponse,
  AddUserApiParams,
  UpdateUserApiParams,
  GetUserRoleListApiResponse,
} from "./model/userModel";

const enum Api {
  getUserList = "/admin/acl/user",
  addUser = "/admin/acl/user/save",
  updateUser = "/admin/acl/user/update",
  removeUser = "/admin/acl/user/remove",
  getUserRoleList = "/admin/acl/user/toAssign",
  assignUserRoleList = "/admin/acl/user/doAssign",
}

/**
 * 获取用户列表
 * @param GetUserListApiParams
 * @returns GetUserListApiResponse
 */
export const getUserListApi = ({
  page,
  limit,
  username,
}: GetUserListApiParams) => {
  return request.get<any, GetUserListApiResponse>(
    Api.getUserList + `/${page}/${limit}`,
    {
      params: {
        username,
      },
    }
  );
};

/**
 * 添加用户
 * @param data AddUserApiParams
 * @returns null
 */
export const addUserApi = (data: AddUserApiParams) => {
  return request.post<any, null>(Api.addUser, data);
};

/**
 * 修改用户
 * @param data UpdateUserApiParams
 * @returns null
 */
export const updateUserApi = (data: UpdateUserApiParams) => {
  return request.put<any, null>(Api.updateUser, data);
};

/**
 * 删除用户
 * @param id 用户id
 * @returns null
 */
export const removeUserApi = (id: string) => {
  return request.delete<any, null>(Api.removeUser + `/${id}`);
};

/**
 * 获取用户的角色列表
 * @param userId 用户id
 * @returns GetUserRoleListApiResponse
 */
export const getUserRoleListApi = (userId: string) => {
  return request.get<any, GetUserRoleListApiResponse>(
    Api.getUserRoleList + `/${userId}`
  );
};

/**
 * 分配用户角色列表
 * @param userId 用户id
 * @param roleId 角色id列表
 * @returns null
 */
export const assignUserRoleListApi = (userId: string, roleId: string[]) => {
  return request.post<any, null>(
    Api.assignUserRoleList,
    {}, // body参数（data参数）
    {
      // query参数
      params: {
        userId,
        roleId: roleId.join(","),
      },
    }
  );
};
