import { ClipboardList, TicketPercent, Utensils } from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';
import { RevenueChart } from '@/components/admin/RevenueChart';
import { OrdersClient } from '@/components/admin/OrdersClient';
import { discounts, menuItems, orders } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboardPage() {
    const totalRevenue = orders.filter(o => o.status === 'Completed').reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Revenue" 
          value={`₹${totalRevenue.toFixed(2)}`}
          description="+20.1% from last month"
          icon={() => <span className="font-bold text-muted-foreground">₹</span>}
        />
        <StatCard 
          title="Total Orders" 
          value={`+${totalOrders}`}
          description="+180.1% from last month"
          icon={ClipboardList}
        />
        <StatCard 
          title="Menu Items" 
          value={`${menuItems.length}`}
          description="Total items available"
          icon={Utensils}
        />
        <StatCard 
          title="Active Discounts" 
          value={`${discounts.filter(d => d.isActive).length}`}
          description={`${discounts.length} total discounts`}
          icon={TicketPercent}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        <RevenueChart />
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 5).map(order => (
                <div key={order.id} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.items.map(i => i.name).join(', ')}</p>
                  </div>
                  <div className="ml-auto font-medium">+₹{order.total.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
