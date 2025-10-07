'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import type { Discount } from '@/lib/types';
import { useDiscounts } from '@/hooks/useDiscounts';
import { saveDiscount } from '@/lib/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  code: z.string().min(4, 'Code must be at least 4 characters.').max(20, 'Code cannot be more than 20 characters.').transform(v => v.toUpperCase()),
  percentage: z.coerce.number().min(1, 'Percentage must be between 1 and 100.').max(100, 'Percentage must be between 1 and 100.'),
  isActive: z.boolean(),
});

type DiscountFormValues = z.infer<typeof formSchema>;

interface DiscountsFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: () => void;
  discount: Discount | null;
}

export function DiscountsForm({ isOpen, onOpenChange, onSubmit, discount }: DiscountsFormProps) {
  const { discounts } = useDiscounts();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<DiscountFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: discount || {
      code: '',
      percentage: 10,
      isActive: true,
    },
  });

  useEffect(() => {
    form.reset(discount || { code: '', percentage: 10, isActive: true });
  }, [discount, form, isOpen]);

  const handleSubmit = async (data: DiscountFormValues) => {
    setIsLoading(true);
    // Check if code already exists for new discounts
    if (!discount && discounts.some(d => d.code === data.code)) {
      form.setError('code', { message: 'This discount code already exists.' });
      setIsLoading(false);
      return;
    }

    try {
      const discountData: Omit<Discount, 'id'> = data;
      await saveDiscount(discountData, discount?.id);
      toast({
        title: `Discount ${discount ? 'updated' : 'created'}`,
        description: `Code "${data.code}" has been successfully saved.`,
      });
      onSubmit();
    } catch (error) {
      console.error("Failed to save discount:", error);
      toast({
        title: "Save Failed",
        description: "Could not save the discount code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{discount ? 'Edit' : 'Create'} Discount</DialogTitle>
          <DialogDescription>
            {discount ? 'Edit the details of your existing discount code.' : 'Create a new discount code for your customers.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Code</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., SAVE10" {...field} disabled={!!discount} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Percentage</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Active Status</FormLabel>
                    <p className="text-sm text-muted-foreground">
                        Inactive codes cannot be used by customers.
                    </p>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isLoading}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {discount ? 'Save Changes' : 'Create Discount'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
