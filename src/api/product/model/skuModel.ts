/*
  组件使用skuFormData类型
    {
      "skuName": "string",
      "price": 0,
      "weight": "string"
      "skuDesc": "string",
      // 组件收集到数据是string
      "skuAttrValueList": (string | undefined)[],
      "skuSaleAttrValueList": string[],
      "skuImageList": [
        {
          "imgName": "string",
          "imgUrl": "string",
          "isDefault": "string",
        }
      ],
      "skuDefaultImg": "string",
    }

  添加SKU参数类型
    { 
      "skuName": "string",
      "price": 0,
      "weight": "string"
      "skuDesc": "string",
      "skuAttrValueList": [
        {
          "attrId": 0,
          "attrName": "string",
          "valueId": 0,
          "valueName": "string"
        }
      ],
      "skuSaleAttrValueList": [
        {
          "saleAttrId": 0,
          "saleAttrName": "string",
          "saleAttrValueId": 0,
          "saleAttrValueName": "string",
        }
      ],
      "skuImageList": [
        {
          "imgName": "string",
          "imgUrl": "string",
          "isDefault": "string",
        }
      ],
      "skuDefaultImg": "string",
      "category3Id": 0,
      "spuId": 0,
    }

  修改SKU参数类型
    {
      "category3Id": 0,
      "id": 0,
      "price": 0,
      "skuAttrValueList": [
        {
          "attrId": 0,
          "attrName": "string",
          "id": 0,
          "skuId": 0,
          "valueId": 0,
          "valueName": "string"
        }
      ],
      "skuDefaultImg": "string",
      "skuDesc": "string",
      "skuImageList": [
        {
          "id": 0,
          "imgName": "string",
          "imgUrl": "string",
          "isDefault": "string",
          "skuId": 0,
          "spuImgId": 0
        }
      ],
      "skuName": "string",
      "skuSaleAttrValueList": [
        {
          "id": 0,
          "saleAttrId": 0,
          "saleAttrName": "string",
          "saleAttrValueId": 0,
          "saleAttrValueName": "string",
          "skuId": 0,
          "spuId": 0
        }
      ],
      "spuId": 0,
      "tmId": 0,
      "weight": "string"
    }

  SkuList列表展示数据类型
*/

// {
//     "skuName": "string",
//     "price": 0,
//     "weight": "string"
//     "skuDesc": "string",
//     "skuAttrValueList": [
//       {
//         "attrId": 0,
//         "attrName": "string",
//         "valueId": 0,
//         "valueName": "string"
//       }
//     ],
//     "skuSaleAttrValueList": [
//       {
//         "saleAttrId": 0,
//         "saleAttrName": "string",
//         "saleAttrValueId": 0,
//         "saleAttrValueName": "string",
//       }
//     ],
//     "skuImageList": [
//       {
//         "imgName": "string",
//         "imgUrl": "string",
//         "isDefault": "string",
//       }
//     ],
//     "skuDefaultImg": "string",
//     "category3Id": 0,
//     "spuId": 0,
//   }
export interface SkuImageItem {
  id?: number;
  imgName: string;
  imgUrl: string;
  isDefault: "1" | "0";
}
export type SkuImageList = SkuImageItem[];

export interface SkuItem {
  skuName: string;
  price: number | undefined;
  weight: number | undefined;
  skuDesc: string;
  // 组件使用和发送请求使用的类型要求不一致，所以下面分开定义
  // skuAttrValueList: (string | undefined)[];
  // skuSaleAttrValueList: string[];
  skuImageList: SkuImageList;
  skuDefaultImg: string;
}

export interface SkuAttrValueItem {
  attrId: number;
  attrName: string;
  valueId: number;
  valueName: string;
  id?: number;
  skuId?: number;
}
export type SkuAttrValueList = SkuAttrValueItem[];

export interface SkuSaleAttrValueItem {
  saleAttrId: number;
  saleAttrName: string;
  saleAttrValueId: number;
  saleAttrValueName: string;
  id?: number;
  skuId?: number;
  spuId?: number;
}
export type SkuSaleAttrValueList = SkuSaleAttrValueItem[];

export interface AddOrUpdateSkuParams extends SkuItem {
  id?: number;
  spuId: number;
  category3Id: number;
  skuAttrValueList: SkuAttrValueList;
  skuSaleAttrValueList: SkuSaleAttrValueList;
}

// 组件收集到的数据是string
export interface SkuFormData extends SkuItem {
  skuAttrValueList: (string | undefined)[];
  skuSaleAttrValueList: Array<string | undefined>;
}
// string[]
// Array<string> 数组泛型形式

export type SkuList = AddOrUpdateSkuParams[];

export interface GetSkuListApiResponse {
  records: SkuList;
  total: number;
}
