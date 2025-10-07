'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Minus, Plus, Trash2, X, TicketPercent, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { PaymentDialog } from './PaymentDialog';

export function CartSidebar() {
  const {
    items,
    updateQuantity,
    removeItem,
    totalItems,
    subtotal,
    total,
    appliedDiscount,
    applyDiscount,
    removeDiscount,
  } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const { toast } = useToast();
  const router = useRouter();
  const [isPaymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const handleApplyDiscount = () => {
    const result = applyDiscount(discountCode);
    toast({
      title: result.success ? 'Success' : 'Error',
      description: result.message,
      variant: result.success ? 'default' : 'destructive',
    });
    if (result.success) {
      setDiscountCode('');
    }
  };

  const handleCheckout = () => {
    setPaymentDialogOpen(true);
  }

  const handlePaymentSuccess = (orderId: string) => {
    setPaymentDialogOpen(false);
    // The cart is cleared in the payment dialog upon success
    router.push(`/order/${orderId}/success`);
  }

  return (
    <>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Cart ({totalItems})</SheetTitle>
        </SheetHeader>
        <Separator />
        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="flex flex-col gap-4 py-4">
                {items.map((item) => {
                  const placeholder = PlaceHolderImages.find((p) => p.id === item.imageId);
                  return (
                    <div key={item.id} className="flex items-start gap-4">
                      <div className="relative h-20 w-20 rounded-md overflow-hidden">
                        {placeholder && (
                          <Image src={placeholder.imageUrl} alt={item.name} fill className="object-cover" data-ai-hint={placeholder.imageHint} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between h-full">
                        <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={() => removeItem(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="px-6 py-4 flex flex-col gap-4 bg-secondary/50">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-primary">
                    <span>Discount ({appliedDiscount.percentage}%)</span>
                    <span>- ₹{(subtotal - total).toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              {!appliedDiscount ? (
                <div className="flex items-center space-x-2">
                  <Input 
                    type="text" 
                    placeholder="Discount code" 
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="bg-background"
                  />
                  <Button onClick={handleApplyDiscount} disabled={!discountCode}>Apply</Button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-2 rounded-md bg-primary/10 text-primary">
                    <div className="flex items-center gap-2">
                        <TicketPercent className="h-4 w-4"/>
                        <span className="font-medium text-sm">Code "{appliedDiscount.code}" applied</span>
                    </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={removeDiscount}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <Button size="lg" className="w-full" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-24 w-24 text-muted-foreground/30" strokeWidth={1} />
            <h3 className="font-semibold text-xl">Your cart is empty</h3>
            <p className="text-muted-foreground">Add items to your cart to get started.</p>
            <SheetClose asChild>
                <Button>Start Ordering</Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
      {isPaymentDialogOpen && (
        <PaymentDialog 
            isOpen={isPaymentDialogOpen} 
            onClose={() => setPaymentDialogOpen(false)}
            onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
}
