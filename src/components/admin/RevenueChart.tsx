'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Order } from '@/lib/types';
import { useMemo } from 'react';
import { format, getMonth } from 'date-fns';

interface RevenueChartProps {
    orders: Order[];
    loading: boolean;
}

export function RevenueChart({ orders, loading }: RevenueChartProps) {
  const monthlyRevenue = useMemo(() => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const data = monthNames.map(name => ({ name, total: 0 }));

    if (!loading) {
        orders.forEach(order => {
            if (order.status === 'Completed') {
                const month = getMonth(new Date(order.date));
                data[month].total += order.total;
            }
        });
    }

    return data;
  }, [orders, loading]);


  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        {loading ? (
            <div className="flex justify-center items-center h-[350px]">
                <p>Loading chart data...</p>
            </div>
        ) : (
            <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlyRevenue}>
                <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                />
                <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip
                    cursor={{fill: 'hsl(var(--muted))'}}
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))'
                    }}
                />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
