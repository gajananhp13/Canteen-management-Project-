
'use client';

import type { Category } from '@/lib/types';
import { MenuItemCard } from '@/components/user/MenuItemCard';
import { motion } from 'framer-motion';
import { useMenuItems } from '@/hooks/useMenuItems';

export default function MenuPage() {
  const { items: menuItems, loading } = useMenuItems();
  const categories: Category[] = ['Main Course', 'Sides', 'Beverages', 'Desserts'];

  return (
    <div className="container py-12">
      <div className="text-center mb-16 relative">
        <div className="absolute inset-0 bg-grid-slate-50 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-extrabold tracking-tighter font-headline sm:text-6xl lg:text-7xl">Our Menu</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            Fresh, delicious, and made-to-order just for you.
          </p>
        </motion.div>
      </div>

      {loading ? (
        <div className="text-center">
            <p>Loading menu...</p>
        </div>
      ) : (
        <div className="space-y-16">
          {categories.map((category) => {
            const items = menuItems.filter((item) => item.category === category);
            if (items.length === 0) return null;

            return (
              <section key={category}>
                <h2 className="text-4xl font-bold font-headline mb-8 tracking-tight">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <MenuItemCard item={item} />
                    </motion.div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
