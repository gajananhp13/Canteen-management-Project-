
'use client';

import { useState, useEffect } from 'react';
import type { MenuItem } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

export function useMenuItems() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
        setLoading(false);
        return;
    }
    const q = query(collection(db, 'menuItems'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const menuItems: MenuItem[] = [];
      querySnapshot.forEach((doc) => {
        menuItems.push({ id: doc.id, ...doc.data() } as MenuItem);
      });
      setItems(menuItems);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching menu items:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { items, loading };
}
