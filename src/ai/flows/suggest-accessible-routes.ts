
// src/ai/flows/suggest-accessible-routes.ts
'use server';
/**
 * @fileOverview An AI agent that suggests accessible routes for users with mobility issues.
 *
 * - suggestAccessibleRoutes - A function that suggests accessible routes.
 * - SuggestAccessibleRoutesInput - The input type for the suggestAccessibleRoutes function.
 * - SuggestAccessibleRoutesOutput - The return type for the suggestAccessibleRoutes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAccessibleRoutesInputSchema = z.object({
  startLocation: z
    .string()
    .describe('The starting location for the route, as a string.'),
  endLocation: z.string().describe('The destination location for the route, as a string.'),
  currentConditions: z
    .string()
    .optional()
    .describe(
      'Optional: Real-time data about current conditions such as traffic, construction, and reported obstacles.'
    ),
});
export type SuggestAccessibleRoutesInput = z.infer<typeof SuggestAccessibleRoutesInputSchema>;

const SuggestAccessibleRoutesOutputSchema = z.object({
  routeDescription: z
    .string()
    .describe('A detailed description of the suggested accessible route.'),
  estimatedTime: z.string().describe('The estimated travel time for the suggested route.'),
  distance: z.string().describe('The distance of the suggested route.'),
  accessibilityScore: z
    .number()
    .describe(
      'A score indicating the accessibility of the route, with higher scores indicating better accessibility.'
    ),
  obstacles: z
    .array(z.string())
    .optional()
    .describe('Any obstacles present on the route, if any.'),
});
export type SuggestAccessibleRoutesOutput = z.infer<typeof SuggestAccessibleRoutesOutputSchema>;

// Mock data generation function
function generateMockRouteOutput(input: SuggestAccessibleRoutesInput): SuggestAccessibleRoutesOutput {
  const randomScore = Math.floor(Math.random() * 31) + 70; // Score between 70 and 100
  const randomTimeMinutes = Math.floor(Math.random() * 20) + 10; // 10 to 29 minutes
  const randomDistanceKm = (Math.random() * 5 + 1.5).toFixed(1); // 1.5 to 6.5 km

  const mockObstacles = [
    "Posible congestión vehicular en Av. Ferrocarril cerca del mediodía.",
    "Tramo de vereda con algunas irregularidades en Calle Real entre Giráldez y Arequipa. Se recomienda precaución.",
    "Semáforo peatonal en cruce de Av. Huancavelica con Jr. Ayacucho podría tener tiempo de cruce corto.",
  ];
  const numObstacles = Math.floor(Math.random() * 2); // 0 or 1 obstacle

  return {
    routeDescription: `Ruta simulada desde "${input.startLocation}" hasta "${input.endLocation}":
1. Dirígete al este por la calle principal desde tu punto de partida.
2. Gira a la derecha en la Av. Ejemplo con rampa en la esquina.
3. Continúa por 3 cuadras, cruza el semáforo peatonal accesible.
4. Gira a la izquierda en el Jr. Prueba, la vereda es ancha y está en buen estado.
5. Sigue recto por 500 metros.
6. Tu destino estará a la derecha, con una entrada accesible claramente marcada.
Considera las condiciones actuales: ${input.currentConditions || "No se especificaron condiciones particulares, se asume normalidad."}`,
    estimatedTime: `${randomTimeMinutes} minutos`,
    distance: `${randomDistanceKm} km`,
    accessibilityScore: randomScore,
    obstacles: input.currentConditions && input.currentConditions.toLowerCase().includes("obras") 
               ? ["Obras detectadas en ruta. Considerar ruta alternativa o mayor tiempo de viaje.", ...mockObstacles.slice(0, numObstacles)] 
               : mockObstacles.slice(0, numObstacles),
  };
}


export async function suggestAccessibleRoutes(
  input: SuggestAccessibleRoutesInput
): Promise<SuggestAccessibleRoutesOutput> {
  try {
    // Attempt to call the actual AI flow
    const result = await suggestAccessibleRoutesFlowInternal(input);
    return result;
  } catch (e: any) {
     // Check if the error is due to missing API key or precondition
    if (e.message && (e.message.includes('API key') || e.message.includes('FAILED_PRECONDITION') || e.message.includes('AI failed to suggest accessible routes'))) {
      console.warn(`Genkit API key/precondition error or AI failure for route suggestion: ${e.message}. Returning mock data for route from ${input.startLocation} to ${input.endLocation}.`);
      return generateMockRouteOutput(input);
    }
    // For other types of errors, rethrow them
    console.error("An unexpected error occurred calling suggestAccessibleRoutesFlowInternal:", e);
    throw e;
  }
}

const prompt = ai.definePrompt({
  name: 'suggestAccessibleRoutesPrompt',
  input: {schema: SuggestAccessibleRoutesInputSchema},
  output: {schema: SuggestAccessibleRoutesOutputSchema},
  prompt: `You are an AI assistant designed to suggest accessible routes for users with mobility issues in Huancayo, Peru. Given the start and end locations, as well as current conditions, provide a detailed route description, estimated travel time, distance, accessibility score (out of 100, higher is better), and any potential obstacles on the route. 

Start Location: {{{startLocation}}}
End Location: {{{endLocation}}}
Current Conditions: {{{currentConditions}}}

Consider factors such as ramps, elevators, sidewalk conditions, and traffic to determine the best route. The user is using a wheelchair so avoid stairs. The current conditions can include traffic, construction, and reported obstacles. Please take these into account.

Format the routeDescription as a list of turn-by-turn directions. Each step should be a new line.

Accessibility Score is out of 100, higher is better. The score should reflect how safe the route is for a user with mobility issues.

If there are no obstacles, then the obstacles output should be an empty list.
Output ONLY the JSON object adhering to the output schema.
`,
});

const suggestAccessibleRoutesFlowInternal = ai.defineFlow(
  {
    name: 'suggestAccessibleRoutesFlowInternal', // Renamed flow
    inputSchema: SuggestAccessibleRoutesInputSchema,
    outputSchema: SuggestAccessibleRoutesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      // This specific error will be caught by the wrapper and lead to mock data.
      throw new Error("AI failed to suggest accessible routes.");
    }
    return output;
  }
);

