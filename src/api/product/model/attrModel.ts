//     {
//       "id": 37,
//       "createTime": null,
//       "updateTime": null,
//       "attrName": "分类",
//       "categoryId": 1,
//       "categoryLevel": 3,
//       "attrValueList": [
//         {
//           "id": 32,
//           "createTime": null,
//           "updateTime": null,
//           "valueName": "Java",
//           "attrId": 37
//         },
//         {
//           "id": 34,
//           "createTime": null,
//           "updateTime": null,
//           "valueName": "JavaScript",
//           "attrId": 37
//         },
//         {
//           "id": 33,
//           "createTime": null,
//           "updateTime": null,
//           "valueName": "C#",
//           "attrId": 37
//         }
//       ]
//     },

export interface AttrItem {
  id?: number;
  valueName: string;
  attrId?: number;
  // 添加时绑定的是否为编辑状态
  isEdit?: boolean;
}

export type AttrList = AttrItem[];

export interface AttrListData {
  id?: number;
  attrName: string;
  categoryId?: number;
  categoryLevel?: number;
  attrValueList: AttrList;
}

export type AttrListDataList = AttrListData[];
