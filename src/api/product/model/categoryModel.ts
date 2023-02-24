export interface CategoryItem {
  id: number;
  name: string;
  level?: number;
  hasChildren?: boolean;
}
export type CategoryList = CategoryItem[];
