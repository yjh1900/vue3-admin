export interface SpuImageItem {
  id: number;
  imgName: string;
  isDefault: string;
  imgUrl: string;
  spuId: number;
}
export type SpuImageList = SpuImageItem[];

export interface SpuSaleAttrValueItem {
  baseSaleAttrId: number;
  id: number;
  saleAttrName: string;
  saleAttrValueName: string;
  spuId?: undefined;
}
export type SpuSaleAttrValueList = SpuSaleAttrValueItem[];
export interface SpuSaleAttrList {
  baseSaleAttrId?: number;
  saleAttrName?: string;
  spuId?: number;
  spuSaleAttrValueList: SpuSaleAttrValueList;
}

export interface SpuItem {
  category3Id?: number;
  description?: string;
  spuName?: string;
  id?: number;
  tmId?: number;
  spuImageList?: SpuImageList;
  spuSaleAttrList?: SpuSaleAttrList;
}

export type SpuList = SpuItem[];

export interface GetSpuListResponse {
  records: SpuList;
  total: number;
  size: number;
  current: number;
  searchCount: boolean;
  pages: number;
  hitCount: boolean;
}

export interface SaleAttrItem {
  id: number;
  name: string;
}

export type SaleAttrList = SaleAttrItem[];

export interface GetSaleAttrListResponse {
  records: SpuList;
  total: number;
  size: number;
  current: number;
  searchCount: boolean;
  pages: number;
  hitCount: boolean;
}
