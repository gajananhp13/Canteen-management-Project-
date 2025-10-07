"use server";

import { generateUniqueOrderId } from "@/ai/flows/generate-unique-order-id";
import type { CartItem, Discount } from "./types";
import { saveOrder } from "./firestore";

export async function placeOrder(
    cartItems: CartItem[], 
    total: number, 
    discount: Discount | null
): Promise<{ orderId: string }> {
  console.log("Placing order with:", { cartItems, total, discount });

  try {
    const { orderId: generatedId } = await generateUniqueOrderId({
      timestamp: Date.now(),
      userId: "user-servesmart-01", // Mock user ID
    });

    const orderToSave = {
      id: generatedId,
      items: cartItems,
      total: total,
      discountApplied: discount,
      date: Date.now(),
      status: 'Pending' as const
    }
    
    await saveOrder(orderToSave, generatedId);
    
    console.log("Saved Order with ID:", generatedId);
    return { orderId: generatedId };

  } catch (error) {
    console.error("Failed to generate unique order ID or save order:", error);
    // Fallback to a simpler ID generation if AI flow fails
    const fallbackId = `ORD-FALLBACK-${Date.now()}`;
    const orderToSave = {
      id: fallbackId,
      items: cartItems,
      total: total,
      discountApplied: discount,
      date: Date.now(),
      status: 'Pending' as const
    }
    await saveOrder(orderToSave, fallbackId);
    return { orderId: fallbackId };
  }
}
