'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { placeOrder } from '@/lib/actions';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (orderId: string) => void;
}

export function PaymentDialog({ isOpen, onClose, onPaymentSuccess }: PaymentDialogProps) {
  const { total, items, appliedDiscount, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSimulatePayment = async () => {
    setIsLoading(true);
    try {
      // In a real app, you'd integrate with a payment gateway here.
      // We simulate a delay and then call our server action.
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const { orderId } = await placeOrder(items, total, appliedDiscount);
      
      toast({
        title: "Payment Successful!",
        description: `Your order #${orderId} has been placed.`,
      });
      
      clearCart();
      onPaymentSuccess(orderId);
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-center">Scan to Pay</DialogTitle>
          <DialogDescription className="text-center">
            Use your favorite UPI app to complete the payment.
          </DialogDescription>
        </DialogHeader>
        <div className="py-8 flex flex-col items-center gap-4">
            <div className="relative w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <Image 
                    src="https://picsum.photos/seed/qrcode/256/256" 
                    alt="UPI QR Code" 
                    width={256} 
                    height={256}
                    data-ai-hint="qr code"
                    className="rounded-md"
                />
            </div>
            <div className="text-center">
                <p className="text-muted-foreground">Total Amount</p>
                <p className="text-4xl font-bold font-headline">${total.toFixed(2)}</p>
            </div>
        </div>
        <DialogFooter>
          <Button 
            type="button" 
            className="w-full" 
            size="lg" 
            onClick={handleSimulatePayment}
            disabled={isLoading}
          >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                </>
            ) : "Simulate Successful Payment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
