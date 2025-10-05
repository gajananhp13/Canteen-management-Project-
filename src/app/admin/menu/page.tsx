import { menuItems } from '@/lib/data';
import { MenuClient } from '@/components/admin/MenuClient';

export default function AdminMenuPage() {
  // In a real app, you would fetch this from your database.
  const items = menuItems;

  return (
    <div className="container mx-auto py-2">
      <MenuClient initialItems={items} />
    </div>
  );
}
