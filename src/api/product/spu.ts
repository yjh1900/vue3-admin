import request from "@/utils/request";
import type {
  GetSpuListResponse,
  GetSaleAttrListResponse,
} from "./model/spuModel";

enum Api {
  getSpuList = "/admin/product",
  getBaseSaleAttrList = "/admin/product/baseSaleAttrList",
  saveSpuInfo = "/admin/product/saveSpuInfo",
  getSpuInfo = "/admin/product/getSpuInfo",
  getSpuImageList = "/admin/product/spuImageList",
  getSpuSaleAttrList = "/admin/product/spuSaleAttrList",
  postSpuInfo = "/admin/product/updateSpuInfo",
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
  return request.get<any, GetSaleAttrListResponse>(Api.getBaseSaleAttrList);
};

export const saveSpuInfoApi = (data: any) => {
  return request.post(Api.saveSpuInfo, data);
};

export const getSpuInfoApi = (spuId: number) => {
  return request.get(Api.getSpuInfo + `/${spuId}`);
};

export const getSpuImageListApi = (spuId: number) => {
  return request.get(Api.getSpuImageList + `/${spuId}`);
};

export const getSpuSaleAttrListApi = (spuId: number) => {
  return request.get(Api.getSpuSaleAttrList + `/${spuId}`);
};

export const postSpuInfoApi = (data: any) => {
  return request.post(Api.postSpuInfo, data);
};
