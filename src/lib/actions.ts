"use server";

import { generateUniqueOrderId } from "@/ai/flows/generate-unique-order-id";
import type { CartItem, Discount } from "./types";

// In a real app, this would save to a database.
// For the prototype, we just log it and generate an ID.
export async function placeOrder(
    cartItems: CartItem[], 
    total: number, 
    discount: Discount | null
): Promise<{ orderId: string }> {
  console.log("Placing order with:", { cartItems, total, discount });

  try {
    const result = await generateUniqueOrderId({
      timestamp: Date.now(),
      userId: "user-servesmart-01", // Mock user ID
    });
    
    console.log("Generated Order ID:", result.orderId);
    return { orderId: result.orderId };

  } catch (error) {
    console.error("Failed to generate unique order ID:", error);
    // Fallback to a simpler ID generation if AI flow fails
    const fallbackId = `ORD-FALLBACK-${Date.now()}`;
    return { orderId: fallbackId };
  }
}
