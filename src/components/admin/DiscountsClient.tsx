'use client';

import { useState } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Discount } from '@/lib/types';
import { DiscountsForm } from './DiscountsForm';
import { Switch } from '@/components/ui/switch';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface DiscountsClientProps {
  initialDiscounts: Discount[];
}

export function DiscountsClient({ initialDiscounts }: DiscountsClientProps) {
  const [discounts, setDiscounts] = useState<Discount[]>(initialDiscounts);
  const [isFormOpen, setFormOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);

  const handleAddDiscount = () => {
    setEditingDiscount(null);
    setFormOpen(true);
  };
  
  const handleEditDiscount = (discount: Discount) => {
    setEditingDiscount(discount);
    setFormOpen(true);
  };

  const handleDeleteDiscount = (code: string) => {
    // In a real app, you'd make an API call here.
    setDiscounts(discounts.filter(d => d.code !== code));
  };

  const toggleDiscountStatus = (code: string) => {
    // In a real app, you'd make an API call here.
    setDiscounts(discounts.map(d => d.code === code ? { ...d, isActive: !d.isActive } : d));
  };
  
  const handleFormSubmit = (discount: Discount) => {
    // In a real app, you'd make an API call here.
    if (editingDiscount) {
      setDiscounts(discounts.map((d) => (d.code === discount.code ? discount : d)));
    } else {
      // Check if code already exists
      if (discounts.some(d => d.code === discount.code)) {
        alert('Discount code already exists.');
        return;
      }
      setDiscounts([...discounts, discount]);
    }
    setFormOpen(false);
    setEditingDiscount(null);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold font-headline">Discount Codes</h1>
        <Button onClick={handleAddDiscount}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Discount
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Discounts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {discounts.map((discount) => (
                <TableRow key={discount.code}>
                  <TableCell className="font-medium font-mono">{discount.code}</TableCell>
                  <TableCell>{discount.percentage}%</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={discount.isActive}
                            onCheckedChange={() => toggleDiscountStatus(discount.code)}
                            aria-label="Toggle discount status"
                        />
                        <Badge variant={discount.isActive ? "default" : "outline"} className={discount.isActive ? 'bg-green-600' : ''}>
                            {discount.isActive ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEditDiscount(discount)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                         <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                           <Trash2 className="h-4 w-4" />
                         </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the discount code "{discount.code}". This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteDiscount(discount.code)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <DiscountsForm
        isOpen={isFormOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        discount={editingDiscount}
      />
    </>
  );
}
