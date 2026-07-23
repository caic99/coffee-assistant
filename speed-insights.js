// Vercel Speed Insights initialization
import { injectSpeedInsights } from 'https://cdn.jsdelivr.net/npm/@vercel/speed-insights@2.0.0/dist/index.mjs';

// Initialize Speed Insights with optional configuration
injectSpeedInsights({
  debug: false // Set to true for development debugging
});
