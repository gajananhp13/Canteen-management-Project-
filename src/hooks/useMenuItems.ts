
'use client';

import { useState, useEffect } from 'react';
import type { MenuItem } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const mockMenuItems: MenuItem[] = PlaceHolderImages.map((p, index) => ({
    id: p.id,
    name: p.description.split(' with ')[0].split(' and ')[0].replace('A ', '').replace('a ', ''),
    description: p.description,
    price: Math.floor(Math.random() * 200) + 50,
    imageUrl: p.imageUrl,
    category: index < 4 ? 'Main Course' : index < 8 ? 'Sides' : index < 12 ? 'Beverages' : 'Desserts',
}));


export function useMenuItems() {
  const [items, setItems] = useState<MenuItem[]>(mockMenuItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We are returning mock data for now.
    // To switch to firestore, replace the initial state of items with []
    // and uncomment the following useEffect block.
    setLoading(false);
    /*
    if (!db) {
        setLoading(false);
        return;
    }
    const q = query(collection(db, 'menuItems'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const menuItems: MenuItem[] = [];
      if (querySnapshot.empty) {
        setItems(mockMenuItems); // Show mock data if firestore is empty
      } else {
        querySnapshot.forEach((doc) => {
            menuItems.push({ id: doc.id, ...doc.data() } as MenuItem);
        });
        setItems(menuItems);
      }
      setLoading(false);
    }, (error) => {
        console.error("Error fetching menu items:", error);
        setItems(mockMenuItems); // Fallback to mock data on error
        setLoading(false);
    });

    return () => unsubscribe();
    */
  }, []);

  return { items, loading };
}
