/*
{
  "routes": [
    "ActivityEdit",
  ],
  "buttons": [
    "cuser.detail",
  ],
  "roles": [
    "平台管理员"
  ],
  "name": "admin",
  "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
}
*/

export interface GetUserInfoApiResponse {
  routes: string[]; // 路由权限列表：哪些路由可以访问
  buttons: string[]; // 按钮权限列表：哪些按钮可以访问
  roles: string[]; // 拥有角色
  name: string; // 用户名
  avatar: string; // 用户头像
}
