
'use server';
/**
 * @fileOverview An AI agent that provides accessibility insights for a given location.
 *
 * - getLocationAccessibilityInsights - A function that returns accessibility insights for a location.
 * - GetLocationAccessibilityInsightsInput - The input type for the function.
 * - GetLocationAccessibilityInsightsOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetLocationAccessibilityInsightsInputSchema = z.object({
  locationName: z.string().describe('The name of the location (e.g., restaurant, park, museum).'),
  locationAddress: z.string().optional().describe('The optional address of the location.'),
});
export type GetLocationAccessibilityInsightsInput = z.infer<typeof GetLocationAccessibilityInsightsInputSchema>;

const GetLocationAccessibilityInsightsOutputSchema = z.object({
  locationName: z.string().describe('The name of the location for which insights are provided.'),
  accessibilitySummary: z.string().describe('A general summary of the location\'s accessibility.'),
  knownFeatures: z.array(z.string()).describe('A list of known accessibility features (e.g., "Ramps available", "Accessible restrooms", "Braille signage").'),
  potentialChallenges: z.array(z.string()).describe('A list of potential accessibility challenges (e.g., "Narrow doorways", "Limited accessible parking", "Crowded spaces").'),
  overallAccessibilityRating: z.number().min(1).max(5).describe('An estimated overall accessibility rating on a scale of 1 (poor) to 5 (excellent).'),
  aiConfidenceScore: z.number().min(0).max(1).describe('A score from 0 to 1 indicating the AI\'s confidence in the provided insights, based on available information.'),
  tipsForVisitors: z.array(z.string()).optional().describe('Optional tips for visitors with accessibility needs.'),
});
export type GetLocationAccessibilityInsightsOutput = z.infer<typeof GetLocationAccessibilityInsightsOutputSchema>;

// Enhanced mock data generation
function generateMockInsights(input: GetLocationAccessibilityInsightsInput): GetLocationAccessibilityInsightsOutput {
  const randomRating = parseFloat((Math.random() * 2.5 + 2.5).toFixed(1)); // Rating between 2.5 and 5.0
  const randomConfidence = parseFloat((Math.random() * 0.5 + 0.5).toFixed(2)); // Confidence between 0.5 and 1.0

  const mockFeatures = [
    "Rampa de acceso en la entrada principal, cumpliendo con la normativa de inclinación.",
    "Ascensor amplio y señalizado disponible para todos los niveles, con botones en Braille.",
    "Baños adaptados y señalizados en planta baja, con barras de apoyo y espacio de giro.",
    "Señalización clara y con pictogramas internacionales en todas las áreas comunes.",
    "Personal capacitado y dispuesto para asistir a personas con movilidad reducida y otras necesidades.",
    "Mostradores de atención y cajas a altura accesible para usuarios de sillas de ruedas.",
    "Menús en Braille y con fuente grande disponibles bajo petición en el área de restaurante.",
    "Sistemas de bucle de inducción magnética para usuarios de audífonos en el auditorio principal.",
    "Pasillos amplios, bien iluminados y completamente libres de obstáculos temporales o permanentes.",
    "Plazas de estacionamiento reservado para personas con discapacidad claramente señalizadas y cercanas al acceso."
  ];

  const mockChallenges = [
    "Algunas puertas internas pueden ser pesadas de operar manualmente para ciertas personas.",
    "El espacio entre mesas en el área de comedor es reducido durante las horas pico, dificultando la circulación.",
    "La iluminación en ciertas zonas de exposición podría ser considerada tenue para personas con baja visión.",
    "No todas las áreas de exposición cuentan con asientos de descanso intermedios cercanos.",
    "El suelo en el patio exterior es de adoquines, lo que podría ser irregular para sillas de ruedas.",
    "El sistema de megafonía podría no ser completamente inteligible en todas las áreas debido a la acústica.",
    "Rampas de acceso secundarias presentan una pendiente ligeramente más pronunciada de lo ideal.",
    "La información sobre accesibilidad en el sitio web oficial del lugar es limitada y no está actualizada.",
    "Pocos enchufes eléctricos accesibles disponibles para cargar dispositivos de asistencia personal."
  ];

  const mockTips = [
    "Se recomienda encarecidamente llamar con antelación para confirmar necesidades específicas y reservar asistencia si es necesario, especialmente para grupos.",
    "Visitar durante horas de menor afluencia (ej. entre semana por la mañana temprano o a media tarde) puede facilitar considerablemente la movilidad y el acceso a servicios.",
    "Consultar el mapa detallado del lugar en su sitio web oficial o al llegar para ubicar rápidamente los servicios accesibles como baños, ascensores y rampas.",
    "No dude en solicitar ayuda o información al personal; están generalmente bien informados sobre las características de accesibilidad del establecimiento.",
    "Si utiliza una silla de ruedas motorizada de grandes dimensiones, verifique las dimensiones del ascensor y los anchos de puerta con el establecimiento previamente.",
    "Considere llevar consigo cualquier ayuda técnica personal que pueda necesitar, como lupas portátiles o extensores de alcance, por si acaso."
  ];

  const numFeatures = Math.floor(Math.random() * 4) + 2; // 2 to 5 features
  const numChallenges = Math.floor(Math.random() * 3) + 1; // 1 to 3 challenges
  const numTips = Math.floor(Math.random() * 3) + 1; // 1 to 3 tips

  const shuffleArray = (array: string[]) => array.sort(() => 0.5 - Math.random());

  return {
    locationName: input.locationName || "Lugar de Ejemplo en Huancayo",
    accessibilitySummary: `Este es un análisis de accesibilidad simulado y bastante detallado para el lugar "${input.locationName || 'Lugar de Ejemplo'}". Basándonos en el tipo de establecimiento y su posible ubicación general en la vibrante ciudad de Huancayo, se estima preliminarmente que ofrece un nivel de accesibilidad que podría calificarse como ${randomRating > 4 ? 'bastante bueno' : (randomRating > 3 ? 'moderado con aspectos positivos' : 'con ciertas limitaciones a considerar')}. Es fundamental recordar que esta información es generada artificialmente para propósitos de demostración y desarrollo. Siempre se debe verificar la información directamente con el establecimiento o fuentes oficiales, especialmente cuando se trata de necesidades muy específicas o críticas para la visita. Nuestra simulación intenta cubrir diversos aspectos, pero la realidad puede variar.`,
    knownFeatures: shuffleArray([...mockFeatures]).slice(0, numFeatures),
    potentialChallenges: shuffleArray([...mockChallenges]).slice(0, numChallenges),
    overallAccessibilityRating: randomRating,
    aiConfidenceScore: randomConfidence,
    tipsForVisitors: shuffleArray([...mockTips]).slice(0, numTips),
  };
}

export async function getLocationAccessibilityInsights(
  input: GetLocationAccessibilityInsightsInput
): Promise<GetLocationAccessibilityInsightsOutput> {
  try {
    // Attempt to call the actual AI flow
    const result = await getLocationAccessibilityInsightsFlowInternal(input); // Renamed flow call
    return result;
  } catch (e: any) {
    // Check if the error is due to missing API key or precondition
    if (e.message && (e.message.includes('API key') || e.message.includes('FAILED_PRECONDITION') || e.message.includes('AI failed to generate accessibility insights') )) {
      console.warn(`Genkit API key/precondition error or AI failure: ${e.message}. Returning mock data for ${input.locationName}.`);
      return generateMockInsights(input);
    }
    // For other types of errors, rethrow them to be handled by the UI
    console.error("An unexpected error occurred calling getLocationAccessibilityInsightsFlowInternal:", e);
    throw e; // Rethrowing the original error
  }
}

const prompt = ai.definePrompt({
  name: 'getLocationAccessibilityInsightsPrompt',
  input: {schema: GetLocationAccessibilityInsightsInputSchema},
  output: {schema: GetLocationAccessibilityInsightsOutputSchema},
  prompt: `You are an AI assistant specializing in providing accessibility information for public and private locations.
Given the location name: "{{locationName}}"{{#if locationAddress}} and address: "{{locationAddress}}"{{/if}}, provide a comprehensive accessibility report specifically for Huancayo, Peru if contextually appropriate, otherwise globally.

Your response should include:
1.  **locationName**: Confirm the location name.
2.  **accessibilitySummary**: A brief, neutral summary about its general accessibility (3-5 sentences). Mention if it's known to be accessible, has mixed reports, or if information is scarce.
3.  **knownFeatures**: List 3 to 5 specific accessibility features. Examples: "Ramps at main entrance", "Elevator access to all floors", "Accessible restrooms on ground floor", "Audio descriptions for exhibits", "Braille menus". Be specific if possible. If no specific features are known, state that clearly.
4.  **potentialChallenges**: List 2 to 4 potential challenges. Examples: "May have narrow aisles", "Limited accessible parking nearby", "Steps to enter certain areas", "Loud environment during peak hours". If no specific challenges are known, state that clearly.
5.  **overallAccessibilityRating**: Estimate an overall accessibility rating from 1 (Poor) to 5 (Excellent), allowing for decimal values (e.g., 3.5, 4.2). Base this on the likely presence or absence of common accessibility considerations.
6.  **aiConfidenceScore**: Provide a confidence score (0.0 to 1.0) for your assessment. Higher score means more certainty.
7.  **tipsForVisitors**: Optionally, provide 2-3 brief, actionable tips for visitors with accessibility needs.

Consider various types of disabilities: mobility, visual, auditory, cognitive.
Focus on providing practical and actionable information.
Output ONLY the JSON object adhering to the output schema.
`,
});

const getLocationAccessibilityInsightsFlowInternal = ai.defineFlow( // Renamed flow
  {
    name: 'getLocationAccessibilityInsightsFlowInternal', 
    inputSchema: GetLocationAccessibilityInsightsInputSchema,
    outputSchema: GetLocationAccessibilityInsightsOutputSchema,
  },
  async (input: GetLocationAccessibilityInsightsInput): Promise<GetLocationAccessibilityInsightsOutput> => {
    const {output} = await prompt(input);
    if (!output) {
      // This specific error will be caught by the wrapper and lead to mock data.
      throw new Error("AI failed to generate accessibility insights.");
    }
    // Ensure the output includes the locationName from the input if the AI omits it
    return {
      ...output,
      locationName: input.locationName,
    };
  }
);

