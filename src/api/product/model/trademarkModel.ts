export interface TrademarkItem {
  id: number;
  tmName: string;
  logoUrl: string;
}
export type TrademarkList = TrademarkItem[];

export interface GetTrademarkListResponse {
  records: TrademarkList;
  total: number;
  size: number;
  current: number;
  searchCount: boolean;
  pages: number;
}
