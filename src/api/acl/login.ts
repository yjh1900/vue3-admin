import request from "@/utils/request";

const enum Api {
  login = "/admin/acl/index/login",
  logout = "/admin/acl/index/logout",
  getUserInfo = "/admin/acl/index/info",
}

export const loginApi = (username: string, password: string) => {
  return request.post(Api.login, { username, password });
};
export const logoutApi = () => {
  return request.post(Api.logout);
};
export const getUserInfoApi = () => {
  return request.get(Api.getUserInfo);
};
