import { menuItems } from '@/lib/data';
import type { Category } from '@/lib/types';
import { MenuItemCard } from '@/components/user/MenuItemCard';

export default function MenuPage() {
  const categories: Category[] = ['Main Course', 'Sides', 'Beverages', 'Desserts'];

  return (
    <div className="container py-12">
      <div className="text-center mb-16 relative">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
        <div className="relative">
          <h1 className="text-5xl font-extrabold tracking-tighter font-headline sm:text-6xl lg:text-7xl">Our Menu</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            Fresh, delicious, and made-to-order just for you.
          </p>
        </div>
      </div>

      <div className="space-y-16">
        {categories.map((category) => {
          const items = menuItems.filter((item) => item.category === category);
          if (items.length === 0) return null;

          return (
            <section key={category}>
              <h2 className="text-4xl font-bold font-headline mb-8 tracking-tight">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {items.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
