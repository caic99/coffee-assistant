/**
 * Vercel Speed Insights initialization for vanilla JavaScript projects
 * 
 * This script initializes Vercel Speed Insights tracking.
 * When deployed on Vercel with Speed Insights enabled in the dashboard,
 * the tracking will automatically start collecting Web Vitals and performance metrics.
 * 
 * For local development, Speed Insights does not track data.
 */

// The queue initialization is already in the HTML <head>
// This script provides additional configuration if needed

// You can configure Speed Insights by calling window.si() with options
// For example:
// window.si('beforeSend', (event) => {
//   // Modify or filter events before sending
//   return event;
// });

// No additional initialization is required for basic Speed Insights tracking.
// The metrics will be automatically collected once the Speed Insights script
// is injected by Vercel (this happens automatically when you enable Speed Insights
// in your Vercel project dashboard).
