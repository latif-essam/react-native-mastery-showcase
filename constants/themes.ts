export type ThemePallet = {
  primary: string;
  secondary: string;
  [key: string]: string;
};

export const light: ThemePallet = {
  primary: '#E88D67', // Primary color for app elements
  secondary: '#006989', // Secondary color for headers, buttons, etc.
  accent: '#005C78', // Accent color for highlights
  light: '#ffffff', // light color
  bg: '#FAFAFA', // Background color for screens
  bg_surface: '#fff', // Background color for screens
  textPrimary: '#333333', // Primary text color
  textSubtitle: '#7D848D', // Primary text color
  textSecondary: '#777777', // Secondary text color
  error: '#ff4d4d', // Error color
  success: '#4caf50', // Success color
  warning: '#ff9800', // Warning color
  priceTag: '#FBA834', // Color for price tags
  calendarSelected: '#CAF4FF', // Calendar selected date color
  opacity: 'rgba(255, 255, 255, 0.7)',
  link: '#0D6EFD',
};

export const dark: ThemePallet = {
  primary: '#8e44ad',
  secondary: '#e74c3c',
  background: '#333333',
  text: '#ecf0f1',
};
