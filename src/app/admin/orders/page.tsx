import { orders } from '@/lib/data';
import { OrdersClient } from '@/components/admin/OrdersClient';

export default function AdminOrdersPage() {
  // In a real app, you would fetch this from your database.
  const allOrders = orders;

  return (
    <div className="container mx-auto py-2">
      <OrdersClient initialOrders={allOrders} />
    </div>
  );
}
