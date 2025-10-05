'use server';

/**
 * @fileOverview Generates a unique, human-readable order ID.
 *
 * - generateUniqueOrderId - A function that generates a unique order ID.
 * - GenerateUniqueOrderIdInput - The input type for the generateUniqueOrderId function.
 * - GenerateUniqueOrderIdOutput - The return type for the generateUniqueOrderId function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateUniqueOrderIdInputSchema = z.object({
  timestamp: z.number().describe('The timestamp when the order was placed.'),
  userId: z.string().describe('The ID of the user placing the order.'),
});
export type GenerateUniqueOrderIdInput = z.infer<typeof GenerateUniqueOrderIdInputSchema>;

const GenerateUniqueOrderIdOutputSchema = z.object({
  orderId: z.string().describe('The unique, human-readable order ID.'),
});
export type GenerateUniqueOrderIdOutput = z.infer<typeof GenerateUniqueOrderIdOutputSchema>;

export async function generateUniqueOrderId(input: GenerateUniqueOrderIdInput): Promise<GenerateUniqueOrderIdOutput> {
  return generateUniqueOrderIdFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateUniqueOrderIdPrompt',
  input: {schema: GenerateUniqueOrderIdInputSchema},
  output: {schema: GenerateUniqueOrderIdOutputSchema},
  prompt: `You are an order ID generator. Generate a unique, human-readable order ID based on the timestamp and user ID.

Timestamp: {{{timestamp}}}
User ID: {{{userId}}}

The order ID should be easy to reference for customer support and order tracking. The ID should be a combination of the userId, current timestamp, and a randomly generated string, separated by hyphens.
`,
});

const generateUniqueOrderIdFlow = ai.defineFlow(
  {
    name: 'generateUniqueOrderIdFlow',
    inputSchema: GenerateUniqueOrderIdInputSchema,
    outputSchema: GenerateUniqueOrderIdOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
