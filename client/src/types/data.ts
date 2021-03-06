export interface CustomLocationState {
  from?: Location;
  customFrom?: string;
}

export interface User {
  email: string;
  nickname: string;
}
export interface UserJoin extends User {
  name: string;
  password: string;
  passwordConfirm: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Order {
  id: number;
  totalPrice: number;
  totalDiscountedPrice: number;
  createdAt: string;
  updatedAt: string;
  products: Product[];
}

export interface Menu {
  name: string;
  path: string;
}

export type Searches = { [key: string]: string };

export interface Subcategory extends Category {
  categoryId: number;
}

export interface Product {
  id: number;
  subcategoryId: number;
  title: string;
  price: number;
  discountedPrice: number;
  discountedRate: number;
  quantity: number;
  imageUrl?: string;
  isDiscounted: boolean;
  isSold: boolean;
  isLiked: boolean;
}

export interface ProductInCart extends Product {
  count: number; // 수량
  isActive?: boolean; // 선택 여부
}

export interface ProductFilter {
  limit?: number;
  offset?: number;
  title?: string;
  categoryId?: number;
  subcategoryId?: number;
  id?: number;
  sortBy?: string;
  isLiked?: boolean;
  type?: string;
}

export type ProductGridColumns = 2 | 2.5 | 3;
export type ProductViewType = 'grid' | 'listview';

export interface Banner {
  id: number;
  redirectUrl: string;
  imageUrl: string;
}

export interface Header {
  title?: string;
  description?: string | React.ReactElement;
  trailing?: React.ReactElement;
  isCategoryProductHeader?: boolean;
}

export interface CategoryProducts {
  category: Category;
  products: Product[];
}

export interface IData {
  emoji: string;
  text: string;
}
