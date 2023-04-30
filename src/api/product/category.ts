import request from "@/utils/request";
import type { CategoryList } from "./model/categoryModel";

const enum Api {
  getCategory1 = "/admin/product/getCategory1",
  getCategory2 = "/admin/product/getCategory2",
  getCategory3 = "/admin/product/getCategory3",
}

export const getCategory1Api = () => {
  return request.get<any, CategoryList>(Api.getCategory1);
};
/**
 * @description:
 * @param {number} id
 * @return {*}
 */
export const getCategory2Api = (id: number) => {
  return request.get<any, CategoryList>(Api.getCategory2 + `/${id}`);
};

export const getCategory3Api = (id: number) => {
  return request.get<any, CategoryList>(Api.getCategory3 + `/${id}`);
};
