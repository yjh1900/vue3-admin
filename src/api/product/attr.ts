import request from "@/utils/request";
import type {
  AttrListDataList,
  AttrListData,
  AttrList,
} from "./model/attrModel";
import { useCategoryStore } from "@/stores/category";

const enum Api {
  getAttrList = "/admin/product/attrInfoList",
  deleteAttr = "/admin/product/deleteAttr",
  getAttrValueList = "/admin/product/getAttrValueList",
  addAttrValueList = "/admin/product/saveAttrInfo",
}
export const getAttrListApi = () => {
  return request.get<Api, AttrListDataList>(
    Api.getAttrList +
      `/${useCategoryStore().category1Id}/${useCategoryStore().category2Id}/${
        useCategoryStore().category3Id
      }`
  );
};

/**
 * @description:
 * @param {number} attrId
 * @return {*}
 */
export const deleteAttrApi = (attrId: number) => {
  return request.delete<Api, null>(Api.deleteAttr + `/${attrId}`);
};

// export const getAttrValueListApi = (attrId: number) => {
//     return request.get<Api, AttrListData>(Api.deleteAttr + `/${attrId}`);
//   };

/**
 * @description:
 * @param {AttrListData} data
 * @return {*}
 */
export const addAttrValueListApi = (data: AttrListData) => {
  return request.post<Api, null>(Api.addAttrValueList, data);
};
