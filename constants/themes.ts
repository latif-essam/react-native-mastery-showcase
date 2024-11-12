// theme.ts

export type ThemePallet = {
  primary: string;
  secondary: string;
  bg: string; // Background color
  surface: string; // Card or surface color
  surface_overlay: string; // Surface overlay, often used in modals
  text: string; // Main text color
  text_primary: string; // Primary text color
  text_secondary: string; // Secondary text color
  accent: string; // Accent color for interactive elements (like buttons)
  border: string; // Border color for input fields, cards, etc.
  link: string; // Color for links
  error: string; // Error text or background
  success: string; // Success message color
  warning: string; // Warning message color
  info: string; // Info message color
  [key: string]: string; // Allow any other custom color
};

// Light theme palette
export const light: ThemePallet = {
  primary: '#ff6b35', // Primary color (used for primary buttons, accents)
  secondary: '#1a659e', // Secondary color (used for secondary buttons, badges)
  bg: '#efefd0', // Background color (light background)
  surface: '#f7c59f', // Card or surface color (peachy background for cards)
  surface_overlay: 'rgba(0, 0, 0, 0.6)', // Dark overlay for modals
  text: '#004e89', // Main text color (dark blue for legibility)
  text_primary: '#004e89', // Main text color (dark blue for legibility)
  text_secondary: '#6b8a9b', // Secondary text color (slightly lighter blue)
  accent: '#004e89', // Accent color (links, key actions)
  border: '#d1cfc4', // Light border color for inputs, cards, etc.
  link: '#1a659e', // Link color (secondary color)
  error: '#e63946', // Red for error messages
  success: '#2a9d8f', // Green for success messages
  warning: '#f4a261', // Orange for warning messages
  info: '#264653', // Dark blue for info messages
};

// Dark theme palette
export const dark: ThemePallet = {
  primary: '#ff6b35', // Same primary color for vibrancy
  secondary: '#1a659e', // Same secondary color for consistency
  bg: '#333333', // Dark background color
  surface: '#444444', // Darker card or surface color for contrast
  surface_overlay: 'rgba(0, 0, 0, 0.8)', // Darker overlay for modals
  text: '#e0e0e0', // Light text for readability against dark backgrounds
  text_primary: '#e0e0e0', // Primary text color (light gray for main text)
  text_secondary: '#a0a0a0', // Secondary text color (lighter gray)
  accent: '#004e89', // Accent color remains the same (blue) for consistency
  textOnSurface: '#ffffff', // Light text on surfaces (for better contrast)
  border: '#555555', // Darker border color to blend with dark theme
  link: '#1a659e', // Link color remains the same
  error: '#e63946', // Red for error messages
  success: '#2a9d8f', // Green for success messages
  warning: '#f4a261', // Orange for warning messages
  info: '#264653', // Dark blue for info messages
};
