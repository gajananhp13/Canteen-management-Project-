'use client';

import { useEffect } from 'react';
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

const formSchema = z.object({
  code: z.string().min(4, 'Code must be at least 4 characters.').transform(v => v.toUpperCase()),
  percentage: z.coerce.number().min(1, 'Percentage must be between 1 and 100.').max(100),
  isActive: z.boolean(),
});

type DiscountFormValues = z.infer<typeof formSchema>;

interface DiscountsFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: Discount) => void;
  discount: Discount | null;
}

export function DiscountsForm({ isOpen, onOpenChange, onSubmit, discount }: DiscountsFormProps) {
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
  }, [discount, form]);

  const handleSubmit = (data: DiscountFormValues) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{discount ? 'Edit' : 'Create'} Discount</DialogTitle>
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
                    <Input placeholder="SAVE10" {...field} disabled={!!discount} />
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
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
