import type { RouteRecordRaw } from "vue-router";
import type { CategoryList } from "@/api/product/model/categoryModel";

// 用户信息包括权限数据
export interface UserInfoState {
  token: string;
  avatar: string;
  name: string;

  menuRoutes: RouteRecordRaw[]; // 用于生成导航菜单的路由列表
}

export interface CategoryState {
  category1Id: undefined | number;
  category2Id?: number;
  category3Id?: number;
  category1List: CategoryList;
  category2List: CategoryList;
  category3List: CategoryList;
}
