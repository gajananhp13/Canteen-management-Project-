'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { MenuItem, Category } from '@/lib/types';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  category: z.enum(['Main Course', 'Sides', 'Beverages', 'Desserts']),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  imageId: z.string(),
});

type MenuFormValues = z.infer<typeof formSchema>;

interface MenuFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: MenuItem) => void;
  item: MenuItem | null;
}

export function MenuForm({ isOpen, onOpenChange, onSubmit, item }: MenuFormProps) {
  const form = useForm<MenuFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: item || {
      name: '',
      category: 'Main Course',
      price: 0,
      description: '',
      imageId: (Math.floor(Math.random() * 8) + 1).toString(), // Random image for new items
    },
  });

  useEffect(() => {
    if (item) {
      form.reset(item);
    } else {
      form.reset({
        name: '',
        category: 'Main Course',
        price: 0,
        description: '',
        imageId: (Math.floor(Math.random() * 8) + 1).toString(),
      });
    }
  }, [item, form]);

  const handleSubmit = (data: MenuFormValues) => {
    onSubmit({ ...data, id: item?.id || '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item ? 'Edit' : 'Add'} Menu Item</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Classic Burger" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Main Course">Main Course</SelectItem>
                        <SelectItem value="Sides">Sides</SelectItem>
                        <SelectItem value="Beverages">Beverages</SelectItem>
                        <SelectItem value="Desserts">Desserts</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="9.99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A juicy beef patty..." {...field} />
                  </FormControl>
                  <FormMessage />
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
