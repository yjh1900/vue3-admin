import request from "@/utils/request-mock";

const enum Api {
  getHomeData = "/home/data",
  getUserData = "/user/data",
}

/**
 * 获取首页数据
 * @returns any
 */
export const getHomeDataApi = () => {
  return request.get<any, any>(Api.getHomeData);
};

/**
 * 获取动态路由表
 * @returns any
 */
export const getUserDataApi = () => {
  return request.get<any, any>(Api.getUserData);
};
