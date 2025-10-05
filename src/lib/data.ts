import type { MenuItem, Discount, Order, CartItem } from './types';

export const menuItems: MenuItem[] = [
  { id: '1', name: 'Classic Burger', category: 'Main Course', price: 9.99, description: 'A juicy beef patty with fresh lettuce, tomato, and our special sauce.', imageId: '1' },
  { id: '3', name: 'Margherita Pizza', category: 'Main Course', price: 12.99, description: 'Classic pizza with fresh mozzarella, tomatoes, and basil.', imageId: '3' },
  { id: '7', name: 'Veggie Sandwich', category: 'Main Course', price: 7.99, description: 'Loaded with fresh vegetables and a tangy spread.', imageId: '7' },
  { id: '8', name: 'Tomato Soup', category: 'Main Course', price: 5.49, description: 'A warm and comforting bowl of creamy tomato soup.', imageId: '8' },
  { id: '2', name: 'French Fries', category: 'Sides', price: 3.99, description: 'Crispy, golden, and perfectly salted.', imageId: '2' },
  { id: '4', name: 'Garden Salad', category: 'Sides', price: 6.99, description: 'A mix of fresh greens, cherry tomatoes, and cucumbers.', imageId: '4' },
  { id: '5', name: 'Cola', category: 'Beverages', price: 1.99, description: 'A refreshing can of your favorite cola.', imageId: '5' },
  { id: '6', name: 'Chocolate Milkshake', category: 'Desserts', price: 4.99, description: 'Rich and creamy chocolate milkshake topped with whipped cream.', imageId: '6' },
];

export const discounts: Discount[] = [
  { code: 'SAVE10', percentage: 10, isActive: true },
  { code: 'SERVE20', percentage: 20, isActive: true },
  { code: 'EXPIRED', percentage: 50, isActive: false },
];

const sampleCartItems: CartItem[] = [
  { ...menuItems[0], quantity: 1 },
  { ...menuItems[2], quantity: 2 },
];

export const orders: Order[] = [
    { 
        id: 'ORD-123-TS-XYZ', 
        items: sampleCartItems,
        total: (sampleCartItems[0].price * sampleCartItems[0].quantity) + (sampleCartItems[1].price * sampleCartItems[1].quantity),
        discountApplied: null,
        date: new Date(new Date().setDate(new Date().getDate() - 2)),
        status: 'Completed'
    },
    { 
        id: 'ORD-456-TS-ABC', 
        items: [{...menuItems[4], quantity: 2}],
        total: menuItems[4].price * 2 * 0.9, // 10% discount
        discountApplied: discounts[0],
        date: new Date(new Date().setDate(new Date().getDate() - 1)),
        status: 'Completed'
    },
    { 
        id: 'ORD-789-TS-PQR', 
        items: [{...menuItems[6], quantity: 1}],
        total: menuItems[6].price,
        discountApplied: null,
        date: new Date(),
        status: 'Pending'
    },
];
