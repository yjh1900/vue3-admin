import { getHomeDataApi } from "@/api/home";
import { defineStore } from "pinia";

export const useHomeStore = defineStore("home", {
  state: () => ({
    reportData: {
      // "//1": "今日销售额",
      salesToday: 0,
      salesLastDay: 0,
      salesGrowthLastDay: 0,
      salesGrowthLastMonth: 0,

      // "//2": "今日订单量",
      orderToday: 0,
      orderLastDay: 0,
      orderTrend: [],
      orderTrendAxis: [],

      // "//3": "今日交易用户数",
      orderUser: 0,
      returnRate: 0,
      orderUserTrend: [],
      orderUserTrendAxis: [],

      // "//4": "累计用户数",
      usersTotal: 0,
      usersLastMonth: 0,
      userGrowthLastDay: 0,
      userGrowthLastMonth: 0,

      // "//5": "销售额与访问量",
      orderFullYearAxis: [],
      orderFullYear: [],
      userFullYearAxis: [],
      userFullYear: [],

      // "//8": "分类销售排行",
      saleRank: {
        category: {
          axisX: [],
          data1: [],
        },
        goods: {
          axisX: [],
          data1: [],
        },
      },
    },
  }),
  actions: {
    async getHomeData() {
      this.reportData = await getHomeDataApi();
    },
  },
});
