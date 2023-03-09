export interface GetUserListApiParams {
  page: number;
  limit: number;
  username: string;
}

/*
   {
    "total": 21,
    "items": [
      {
        "id": "string",
        "gmtCreate": "2022-11-30 20:58:42",
        "gmtModified": "2022-11-30 20:58:42",
        "deleted": false,
        "username": "8585",
        "password": "ed556265816011ba76a53e5cf54450cf",
        "nickName": "888",
        "salt": "string",
        "token": "string",
        "roleName": "平台管理员,品牌管理员"
      }
    ]
  }
*/
export interface UserItem {
  id: string;
  gmtCreate: string; // 创建时间
  gmtModified: string; // 修改时间
  username: string; // 用户名
  // deleted: false;
  // password: "ed556265816011ba76a53e5cf54450cf";
  // salt: "string";
  // token: "string";
  nickName: string; // 用户昵称
  roleName: string; // 角色列表
}

export type UserList = UserItem[];

export interface GetUserListApiResponse {
  total: number;
  items: UserList;
}

export interface AddUserApiParams
  // 从UserItem类型中挑选一些属性组成一个新类型
  extends Pick<UserItem, "username" | "nickName"> {
  password: string;
}

export interface UpdateUserApiParams extends AddUserApiParams {
  id: string;
}

export interface AddOrUpdateUserFormData extends AddUserApiParams {
  id?: string;
}

export interface RoleItem {
  id: string;
  gmtCreate: string;
  gmtModified: string;
  roleName: string;
  // remark: null;
  // deleted: false;
}

export type RoleList = RoleItem[];

export interface GetUserRoleListApiResponse {
  allRolesList: RoleList;
  assignRoles: RoleList;
}
