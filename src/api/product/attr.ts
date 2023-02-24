import request from "@/utils/request";
import { useCategoryStore } from "@/stores/category";

const enum Api {
  getAttrsList = "/admin/product/attrInfoList",
}
export const getAttrListApi = () => {
  return request.get(
    Api.getAttrsList +
      `/${useCategoryStore().category1Id}/${useCategoryStore().category2Id}/${
        useCategoryStore().category3Id
      }`
  );
};
