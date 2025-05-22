import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-accessible-routes.ts';
import '@/ai/flows/summarize-driver-accessibility-reviews.ts';
import '@/ai/flows/get-location-accessibility-insights.ts';
