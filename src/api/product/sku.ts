/*
 * @Author: round1900 954770705@qq.com
 * @Date: 2023-02-21 20:03:05
 * @LastEditors: round1900 954770705@qq.com
 * @LastEditTime: 2023-03-10 10:50:48
 * @FilePath: \vue3-admin\src\api\product\sku.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${round1900}, All Rights Reserved.
 */
import request from "@/utils/request";
import type {
  AddOrUpdateSkuParams,
  SkuList,
  GetSkuListApiResponse,
} from "./model/skuModel";

const enum Api {
  addSku = "/admin/product/saveSkuInfo",
  getSkuListBySpuId = "/admin/product/findBySpuId",
  getSkuList = "/admin/product/list",
  cancelSale = "/admin/product/cancelSale",
  onSale = "/admin/product/onSale",
  getSkuById = "/admin/product/getSkuById",
}

/**
 * 添加SKU
 * @param data AddOrUpdateSkuParams
 * @returns null
 */
export const addSkuApi = (data: AddOrUpdateSkuParams) => {
  return request.post<any, null>(Api.addSku, data);
};

/**
 * 通过SpuId获取Sku列表
 * @param spuId
 * @returns SkuList
 */
export const getSkuListBySpuIdApi = (spuId: number) => {
  return request.get<any, SkuList>(Api.getSkuListBySpuId + `/${spuId}`);
};

/**
 * 获取SKU列表
 * @param page 当前页码
 * @param limit 每页条数
 * @returns GetSkuListApiResponse
 */
export const getSkuListApi = (page: number, limit: number) => {
  return request.get<any, GetSkuListApiResponse>(
    Api.getSkuList + `/${page}/${limit}`
  );
};

/**
 * 下架
 * @param skuId
 * @returns null
 */
export const cancelSaleApi = (skuId: number) => {
  return request.get<any, null>(Api.cancelSale + `/${skuId}`);
};

/**
 * 上架
 * @param skuId
 * @returns null
 */
export const onSaleApi = (skuId: number) => {
  return request.get<any, null>(Api.onSale + `/${skuId}`);
};

/**
 * 根据SkuId获取Sku详情
 * @param skuId
 * @returns AddOrUpdateSkuParams
 */
export const getSkuById = (skuId: number) => {
  return request.get<any, AddOrUpdateSkuParams>(Api.getSkuById + `/${skuId}`);
};
