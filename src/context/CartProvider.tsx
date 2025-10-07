'use client';

import React, { createContext, useState, useMemo, useEffect } from 'react';
import type { CartItem, MenuItem, Discount } from '@/lib/types';
import { discounts as initialDiscounts } from '@/lib/data';

export interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  total: number;
  appliedDiscount: Discount | null;
  applyDiscount: (code: string) => { success: boolean; message: string };
  removeDiscount: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

// In a real app, you'd fetch this from a server, but for now we manage it in context.
// This allows the discount list to be updated by the admin panel in the demo.
const useManageableDiscounts = () => {
    const [discounts, setDiscounts] = useState(initialDiscounts);

    // We can expose functions to update discounts if needed, e.g., for real-time updates
    // For now, it just holds the state.

    return { discounts };
}


export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null);
  const { discounts } = useManageableDiscounts();

  const addItem = (item: MenuItem, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prevItems, { ...item, quantity }];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
    } else {
      setItems((prevItems) =>
        prevItems.map((i) => (i.id === itemId ? { ...i, quantity } : i))
      );
    }
  };

  const clearCart = () => {
    setItems([]);
    setAppliedDiscount(null);
  };

  const applyDiscount = (code: string) => {
    const discount = discounts.find((d) => d.code.toUpperCase() === code.toUpperCase());
    if (!discount) {
      return { success: false, message: 'Invalid discount code.' };
    }
    if (!discount.isActive) {
      return { success: false, message: 'This discount code is not active.' };
    }
    setAppliedDiscount(discount);
    return { success: true, message: `Discount "${discount.code}" applied!` };
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
  };
  
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  
  const total = useMemo(() => {
    if (appliedDiscount && appliedDiscount.isActive) {
      return subtotal * (1 - appliedDiscount.percentage / 100);
    }
    return subtotal;
  }, [subtotal, appliedDiscount]);

  // If an applied discount is made inactive from the admin panel, remove it from the cart
  useEffect(() => {
    if (appliedDiscount && !appliedDiscount.isActive) {
      removeDiscount();
    }
  }, [appliedDiscount, discounts]);


  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    total,
    appliedDiscount,
    applyDiscount,
    removeDiscount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
