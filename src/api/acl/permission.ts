import request from "@/utils/request";

const enum Api {
  getPermissionList = "/admin/acl/permission",
}

/**
 * 获取菜单列表
 * @returns GetRolePermissionListApiResponse
 */
export const getPermissionList = () => {
  return request.get(Api.getPermissionList);
};
