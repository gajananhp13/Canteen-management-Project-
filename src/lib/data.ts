import type { MenuItem, Discount, Order, CartItem } from './types';

export const menuItems: MenuItem[] = [
  { id: '1', name: 'Classic Burger', category: 'Main Course', price: 9.99, description: 'A juicy beef patty with fresh lettuce, tomato, and our special sauce.', imageUrl: 'https://images.unsplash.com/photo-1601391555692-d6c499730eee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxidXJnZXIlMjBiZWVmfGVufDB8fHx8MTc1OTY1MTc4OHww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: '3', name: 'Margherita Pizza', category: 'Main Course', price: 12.99, description: 'Classic pizza with fresh mozzarella, tomatoes, and basil.', imageUrl: 'https://images.unsplash.com/photo-1692737580558-b9dfdac5599c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxwaXp6YSUyMGNoZWVzZXxlbnwwfHx8fDE3NTk1NzkwNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: '7', name: 'Veggie Sandwich', category: 'Main Course', price: 7.99, description: 'Loaded with fresh vegetables and a tangy spread.', imageUrl: 'https://images.unsplash.com/photo-1581339742930-ce01dd18da5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHx2ZWdldGFibGUlMjBzYW5kd2ljaHxlbnwwfHx8fDE3NTk2MDY3OTR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: '8', name: 'Tomato Soup', category: 'Main Course', price: 5.49, description: 'A warm and comforting bowl of creamy tomato soup.', imageUrl: 'https://images.unsplash.com/photo-1693762894461-8305cd26ba9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx0b21hdG8lMjBzb3VwfGVufDB8fHx8MTc1OTU5MzEwNnww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: '9', name: 'Chicken Biryani', category: 'Main Course', price: 14.99, description: 'Aromatic basmati rice cooked with succulent chicken and exotic spices.', imageUrl: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=2070&auto=format&fit=crop' },
  { id: '10', name: 'Paneer Butter Masala', category: 'Main Course', price: 11.99, description: 'Soft paneer cubes in a rich and creamy tomato-based gravy.', imageUrl: 'https://images.unsplash.com/photo-1668665789318-c689c8b36a43?q=80&w=1935&auto=format&fit=crop' },
  { id: '2', name: 'French Fries', category: 'Sides', price: 3.99, description: 'Crispy, golden, and perfectly salted.', imageUrl: 'https://images.unsplash.com/photo-1606755456206-b25206cde27e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxmcmVuY2glMjBmcmllc3xlbnwwfHx8fDE3NTk2MTQ3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: '4', name: 'Garden Salad', category: 'Sides', price: 6.99, description: 'A mix of fresh greens, cherry tomatoes, and cucumbers.', imageUrl: 'https://images.unsplash.com/photo-1620745799892-2132a65f4295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8c2FsYWQlMjBncmVlbnN8ZW58MHx8fHwxNzU5NTk1MTY5fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: '11', name: 'Onion Rings', category: 'Sides', price: 4.99, description: 'Crispy battered onion rings served with a tangy dipping sauce.', imageUrl: 'https://images.unsplash.com/photo-1639586551131-29a43af56c32?q=80&w=1974&auto=format&fit=crop' },
  { id: '12', name: 'Garlic Bread', category: 'Sides', price: 4.49, description: 'Toasted bread with a buttery garlic spread and herbs.', imageUrl: 'https://images.unsplash.com/photo-1622327595628-a4d15c544d65?q=80&w=1964&auto=format&fit=crop' },
  { id: '5', name: 'Cola', category: 'Beverages', price: 1.99, description: 'A refreshing can of your favorite cola.', imageUrl: 'https://images.unsplash.com/photo-1610873167013-2dd675d30ef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxzb2RhJTIwZHJpbmt8ZW58MHx8fHwxNzU5NTk1MDQxfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: '13', name: 'Fresh Lime Soda', category: 'Beverages', price: 2.49, description: 'A zesty and refreshing drink made with fresh lime juice and soda.', imageUrl: 'https://images.unsplash.com/photo-1543634112-9a6a438da894?q=80&w=1949&auto=format&fit=crop' },
  { id: '14', name: 'Iced Tea', category: 'Beverages', price: 2.99, description: 'Chilled black tea infused with lemon, perfect for a hot day.', imageUrl: 'https://images.unsplash.com/photo-1556679343-cde3201aa32a?q=80&w=1974&auto=format&fit=crop' },
  { id: '6', name: 'Chocolate Milkshake', category: 'Desserts', price: 4.99, description: 'Rich and creamy chocolate milkshake topped with whipped cream.', imageUrl: 'https://images.unsplash.com/photo-1591864384134-8a21ffb51cb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxjaG9jb2xhdGUlMjBtaWxrc2hha2V8ZW58MHx8fHwxNzU5NjAyNTU1fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: '15', name: 'Brownie with Ice Cream', category: 'Desserts', price: 6.49, description: 'A warm, fudgy brownie topped with a scoop of vanilla ice cream.', imageUrl: 'https://images.unsplash.com/photo-1610396434317-5a6b01b67f18?q=80&w=1974&auto=format&fit=crop' },
  { id: '16', name: 'Gulab Jamun', category: 'Desserts', price: 3.99, description: 'Soft, spongy balls made of milk solids, soaked in a fragrant sugar syrup.', imageUrl: 'https://images.unsplash.com/photo-1670461516014-93c66f9175a0?q=80&w=2070&auto=format&fit=crop' },
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
