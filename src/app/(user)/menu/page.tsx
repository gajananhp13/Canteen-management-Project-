import { menuItems } from '@/lib/data';
import type { Category } from '@/lib/types';
import { MenuItemCard } from '@/components/user/MenuItemCard';

export default function MenuPage() {
  const categories: Category[] = ['Main Course', 'Sides', 'Beverages', 'Desserts'];

  return (
    <div className="container py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight font-headline sm:text-5xl">Our Menu</h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Freshly prepared and delicious meals, just for you.
        </p>
      </div>

      <div className="space-y-12">
        {categories.map((category) => {
          const items = menuItems.filter((item) => item.category === category);
          if (items.length === 0) return null;

          return (
            <section key={category}>
              <h2 className="text-3xl font-bold font-headline mb-6 border-b-2 border-primary pb-2">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
