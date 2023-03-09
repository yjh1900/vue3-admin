import request from "@/utils/request";
import type {
  GetRoleListApiParams,
  GetRoleListApiResponse,
  GetRolePermissionListApiResponse,
} from "./model/roleModel";

const enum Api {
  getRoleList = "/admin/acl/role",
  addRole = "/admin/acl/role/save",
  getRolePermissionList = "/admin/acl/permission/toAssign",
  assignRolePermissionList = "/admin/acl/permission/doAssign",
}

/**
 * 获取用户列表
 * @param GetRoleListApiParams
 * @returns GetRoleListApiResponse
 */
export const getRoleListApi = ({
  page,
  limit,
  roleName,
}: GetRoleListApiParams) => {
  return request.get<any, GetRoleListApiResponse>(
    Api.getRoleList + `/${page}/${limit}`,
    {
      params: {
        roleName,
      },
    }
  );
};

/**
 * 新增角色
 * @param roleName 角色名称
 * @returns null
 */
export const addRoleApi = (roleName: string) => {
  return request.post<any, null>(Api.addRole, { roleName });
};

/**
 * 获取角色的菜单列表
 * @param roleId 角色id
 * @returns GetRolePermissionListApiResponse
 */
export const getRolePermissionListApi = (roleId: string) => {
  return request.get<any, GetRolePermissionListApiResponse>(
    Api.getRolePermissionList + `/${roleId}`
  );
};

/**
 * 给角色分配菜单列表
 * @param roleId 角色id
 * @param permissionId 菜单id列表
 * @returns null
 */
export const assignRolePermissionListApi = (
  roleId: string,
  permissionId: string[]
) => {
  return request.post<any, null>(
    Api.assignRolePermissionList,
    {},
    {
      params: {
        roleId,
        permissionId: permissionId.join(","),
      },
    }
  );
};
