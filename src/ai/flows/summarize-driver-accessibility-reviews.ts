// SummarizeDriverAccessibilityReviews.ts
'use server';

/**
 * @fileOverview This file contains a Genkit flow to summarize driver accessibility reviews.
 *
 * - summarizeDriverAccessibilityReviews - A function that summarizes driver accessibility reviews.
 * - SummarizeDriverAccessibilityReviewsInput - The input type for the summarizeDriverAccessibilityReviews function.
 * - SummarizeDriverAccessibilityReviewsOutput - The return type for the summarizeDriverAccessibilityReviews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDriverAccessibilityReviewsInputSchema = z.object({
  driverId: z.string().describe('The ID of the driver.'),
  reviews: z
    .array(z.string())
    .describe('An array of accessibility reviews for the driver.'),
});

export type SummarizeDriverAccessibilityReviewsInput =
  z.infer<typeof SummarizeDriverAccessibilityReviewsInputSchema>;

const SummarizeDriverAccessibilityReviewsOutputSchema = z.object({
  summary: z
    .string() 
    .describe(
      'A concise summary of the driver accessibility reviews, highlighting key aspects such as helpfulness, knowledge of accessible routes, and accommodation of specific needs.'
    ),
});

export type SummarizeDriverAccessibilityReviewsOutput =
  z.infer<typeof SummarizeDriverAccessibilityReviewsOutputSchema>;

export async function summarizeDriverAccessibilityReviews(
  input: SummarizeDriverAccessibilityReviewsInput
): Promise<SummarizeDriverAccessibilityReviewsOutput> {
  return summarizeDriverAccessibilityReviewsFlow(input);
}

const summarizeDriverAccessibilityReviewsPrompt = ai.definePrompt({
  name: 'summarizeDriverAccessibilityReviewsPrompt',
  input: {schema: SummarizeDriverAccessibilityReviewsInputSchema},
  output: {schema: SummarizeDriverAccessibilityReviewsOutputSchema},
  prompt: `You are an AI assistant specializing in summarizing customer reviews, especially those pertaining to driver accessibility for passengers with disabilities.

  Given the following reviews for driver with ID {{{driverId}}}, create a concise summary that highlights key aspects such as their helpfulness, knowledge of accessible routes, and accommodation of specific needs.

  Reviews:
  {{#each reviews}}
  - {{{this}}}
  {{/each}}
  `,
});

const summarizeDriverAccessibilityReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeDriverAccessibilityReviewsFlow',
    inputSchema: SummarizeDriverAccessibilityReviewsInputSchema,
    outputSchema: SummarizeDriverAccessibilityReviewsOutputSchema,
  },
  async input => {
    const {output} = await summarizeDriverAccessibilityReviewsPrompt(input);
    return output!;
  }
);
