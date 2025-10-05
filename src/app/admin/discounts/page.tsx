import { discounts } from '@/lib/data';
import { DiscountsClient } from '@/components/admin/DiscountsClient';

export default function AdminDiscountsPage() {
  const allDiscounts = discounts;

  return (
    <div className="container mx-auto py-2">
      <DiscountsClient initialDiscounts={allDiscounts} />
    </div>
  );
}
