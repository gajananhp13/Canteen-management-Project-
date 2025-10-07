export type Category = 'Main Course' | 'Sides' | 'Beverages' | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  imageUrl: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Discount {
  code: string;
  percentage: number;
  isActive: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  discountApplied: Discount | null;
  date: Date;
  status: 'Pending' | 'Completed' | 'Cancelled';
}
