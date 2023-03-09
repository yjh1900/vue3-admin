import { defineStore } from "pinia";
import { getToken, removeToken, setToken } from "../utils/token-utils";
import type { UserInfoState } from "./interface";
import { ElMessage } from "element-plus";
import { staticRoutes, anyRoute, allAsyncRoutes } from "@/router/routes";
import { loginApi, logoutApi, getUserInfoApi } from "@/api/acl/login";
import type { RouteRecordRaw } from "vue-router";
import router from "@/router";
import cloneDeep from "lodash/cloneDeep";

/**
 * 过滤保留拥有访问权限路由菜单
 * @param asyncRoutes 所有路由菜单
 * @param routes 路由权限列表
 * @returns 拥有访问权限路由菜单
 */
const filterAsyncRoutes = (
  asyncRoutes: Array<RouteRecordRaw>,
  routes: string[]
) => {
  console.log(asyncRoutes, routes);

  return asyncRoutes.filter((route) => {
    // 判断遍历的单个路由的name在不在routes中
    if (routes.includes(route.name as string)) {
      // 包含，保留
      console.log(route);

      if (route.children && route.children.length) {
        // 还有子菜单，还需要对子菜单进行过滤
        // 问题：一开始a账号，只保留两个子菜单，修改原数据，导致后面用户登录时也只有2个子菜单
        // 解决：不能修改原数据, 使用深度克隆
        route.children = filterAsyncRoutes(route.children, routes);
      }
      return true;
    }
    // 不包含, 过滤
    return false;
  });
};
/**
 * 动态追加路由
 * @param hasPermissionRoutes 拥有访问权限路由菜单
 */
const addRoutes = (hasPermissionRoutes: Array<RouteRecordRaw>) => {
  hasPermissionRoutes.forEach((route) => {
    // 动态添加路由
    router.addRoute(route);
  });
};

// const addComponent = (routes: any) => {
//   routes.forEach((route: any) => {
//     route.component = () => import(route.component);
//     if (route.children && route.children.length) {
//       addComponent(route.children);
//     }
//   });
// };

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfoStore = defineStore("userInfo", {
  state: (): UserInfoState => ({
    token: getToken() as string,
    name: "",
    avatar: "",
    menuRoutes: [],
    buttons: [],
    routes: [],
  }),

  actions: {
    async login(username: string, password: string) {
      // setToken("token-atguigu");
      const { token } = await loginApi(username, password);
      this.token = token; // 存储在pinia中
      setToken(token); // 存储在localStorage中
      // // console.log(res, "res");
      // return new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     if (username a=== "admin" && password === "111111") {
      //       const token = "token-atguigu";
      //       setToken(token);
      //       this.token = token;
      //       resolve(token);
      //     } else {
      //       reject(new Error("用户名或密码错误!"));
      //       ElMessage.error("用户名或密码错误!");
      //     }
      //   }, 1000);
      // });
    },

    async getInfo() {
      // return new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     this.name = "admin";
      //     this.avatar =
      //       "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif";
      //     this.menuRoutes = staticRoutes;
      //     resolve({ name: this.name, avatar: this.avatar, token: this.token });
      //   }, 1000);
      // });
      const res = await getUserInfoApi();

      this.name = res.name;
      this.avatar = res.avatar;
      this.buttons = res.buttons; // 按钮权限列表
      this.routes = res.routes; // 路由权限列表
      // this.routes = routes; // 路由权限列表

      console.log(this.routes, "this.routes");

      const hasPermissionRoutes = filterAsyncRoutes(
        cloneDeep(allAsyncRoutes),
        this.routes
      );
      // addComponent(routes);

      console.log(hasPermissionRoutes, "hasPermissionRoutes");
      addRoutes([...hasPermissionRoutes, anyRoute]); // 动态添加路由
      // addRoutes([...routes, anyRoute]); // 动态添加路由

      this.menuRoutes = [...staticRoutes, ...hasPermissionRoutes]; // 左侧菜单
      // this.menuRoutes = [...staticRoutes, ...routes]; // 左侧菜单
    },

    async reset() {
      await logoutApi();
      // 删除local中保存的token
      removeToken();
      // 提交重置用户信息的mutation
      this.token = "";
      this.name = "";
      this.avatar = "";
    },
  },
});
