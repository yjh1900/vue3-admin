import request from "@/utils/request";
import type {
  GetTrademarkListResponse,
  TrademarkItem,
} from "@/api/product/model/trademarkModel";

const enum Api {
  getTrademarkList = "/admin/product/baseTrademark",
  uploadTrademark = "/admin/product/baseTrademark/save",
  deleteTrademark = "/admin/product/baseTrademark/remove",
  updateTrademark = "/admin/product/baseTrademark/update",
  getAllTrademarkList = "/admin/product/baseTrademark/getTrademarkList",
}

/**
 * 获取品牌分页列表
 * @param page 当前页码
 * @param limit 每页条数
 * @returns GetTrademarkListResponse
 */
export const getTrademarkListApi = (page: number, limit: number) => {
  return request.get<any, GetTrademarkListResponse>(
    Api.getTrademarkList + `/${page}/${limit}`
  );
};

/**
 * 新增品牌信息
 * @param tmName 品牌名字
 * @param logoUrl 品牌logo
 * @returns void
 */
export const uploadTrademarkApi = (tmName: string, logoUrl: string) => {
  return request.post<any, null>(Api.uploadTrademark, {
    tmName,
    logoUrl,
  });
};

export const deleteTrademarkApi = (id: number) => {
  return request.delete<any, null>(Api.deleteTrademark + `/${id}`);
};

export const updateTrademarkApi = (data: TrademarkItem) => {
  return request.put<any, null>(Api.updateTrademark, data);
};

export const getAllTrademarkListApi = () => {
  return request.get(Api.getAllTrademarkList);
};
