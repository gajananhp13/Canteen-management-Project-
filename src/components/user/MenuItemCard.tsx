'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';

import type { MenuItem } from '@/lib/types';
import { useCart } from '@/hooks/use-cart';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const placeholder = PlaceHolderImages.find(p => p.id === item.imageId);

  const handleAddToCart = () => {
    addItem(item);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="group flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="aspect-[3/2] relative w-full overflow-hidden">
            {placeholder && (
                 <Image
                    src={placeholder.imageUrl}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={placeholder.imageHint}
                 />
            )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline">{item.name}</CardTitle>
        <CardDescription className="mt-1 text-sm line-clamp-2">{item.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-lg font-bold text-primary">₹{item.price.toFixed(2)}</p>
        <Button onClick={handleAddToCart} size="icon">
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add to cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
