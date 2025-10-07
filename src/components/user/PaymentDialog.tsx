'use client';

import React, { useState } from 'react';
import QRCode from 'react-qr-code';
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

  // This is a sample UPI string. In a real app, your backend would get this from Razorpay.
  const upiQrString = `upi://pay?pa=yourservicename@okhdfcbank&pn=ServeSmart&am=${total.toFixed(2)}&cu=INR&tn=Order at ServeSmart`;

  const handleSimulatePayment = async () => {
    setIsLoading(true);
    try {
      // We simulate a delay for payment processing.
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
            <div className="p-4 bg-white rounded-lg" style={{ height: "auto", margin: "0 auto", maxWidth: 256, width: "100%" }}>
                <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={upiQrString}
                    viewBox={`0 0 256 256`}
                    />
            </div>
            <div className="text-center">
                <p className="text-muted-foreground">Total Amount</p>
                <p className="text-4xl font-bold font-headline">₹{total.toFixed(2)}</p>
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
