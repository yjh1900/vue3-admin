import {
  getCategory1Api,
  getCategory2Api,
  getCategory3Api,
} from "@/api/product/category";
import { defineStore } from "pinia";
import type { CategoryState } from "./interface";

export const useCategoryStore = defineStore("category", {
  state: (): CategoryState => ({
    category1Id: undefined,
    category2Id: undefined,
    category3Id: undefined,
    category1List: [],
    category2List: [],
    category3List: [],
  }),
  getters: {},
  actions: {
    async getCategory1List() {
      this.category1List = await getCategory1Api();
    },

    async getCategory2List(c1Id: number) {
      this.category1Id = c1Id;
      this.category2List = await getCategory2Api(this.category1Id as number);
      this.category2Id = undefined;
      this.category3Id = undefined;
      this.category3List = [];
    },

    async getCategory3List(c2Id: number) {
      this.category2Id = c2Id;
      this.category3List = await getCategory3Api(this.category2Id as number);
      this.category3Id = undefined;
    },
    change3Id(c3Id: number) {
      this.category3Id = c3Id;
      console.log(c3Id);
    },
  },
});
