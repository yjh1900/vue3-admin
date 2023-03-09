import type { RoleList } from "./userModel";

export interface GetRoleListApiParams {
  page: number;
  limit: number;
  roleName: string;
}

export interface GetRoleListApiResponse {
  total: number;
  items: RoleList;
}

export interface PermissionItem {
  id: string;
  gmtCreate: string;
  gmtModified: string;
  // deleted: false;
  pid: string;
  name: string;
  code: string;
  // toCode: null;
  type: 1 | 2;
  // status: null;
  level: 1 | 2 | 3 | 4;
  children: PermissionList;
  select: boolean;
}

export type PermissionList = PermissionItem[];

export interface GetRolePermissionListApiResponse {
  children: PermissionList;
}
