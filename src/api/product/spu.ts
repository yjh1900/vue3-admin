import request from "@/utils/request";
import type { GetSpuListResponse } from "./model/spuModel";

enum Api {
  getSpuList = "/admin/product",
  getBaseSaleAttrList = "/admin/product/baseSaleAttrList",
  saveSpuInfo = "/admin/product/saveSpuInfo",
}
// getSpuList:

// export const getSpuListApi = ({ page, limit, category3Id }) => {
//   return request.get(Api.getSpuList + `/${page}/${limit}`, {
//     param: { category3Id },
//   });
// };

export const getSpuListApi = ({
  page,
  limit,
  category3Id,
}: {
  page: number;
  limit: number;
  category3Id: number;
}) => {
  return request.get<any, GetSpuListResponse>(
    Api.getSpuList + `/${page}/${limit}?category3Id=${category3Id}`
  );
};

export const getBaseSaleAttrListApi = () => {
  return request.get(Api.getBaseSaleAttrList);
};

export const saveSpuInfoApi = (data: any) => {
  return request.post(Api.saveSpuInfo, data);
};
