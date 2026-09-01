/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    // Legacy aliases (kept for backward compatibility)
    text: '#8a0f4a',
    tint: '#ff4794',

    // Core surfaces
    background: '#fffedb',
    foreground: '#8a0f4a',

    // Cards / elevated surfaces
    card: '#fffdeb',
    cardForeground: '#8a0f4a',

    // Primary action color (buttons, links, active states)
    primary: '#ff4794',
    primaryForeground: '#ffffff',

    // Secondary / less-emphasis interactive surfaces
    secondary: '#54e600',
    secondaryForeground: '#ffffff',

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: '#ebebc7',
    mutedForeground: '#a04f75',

    // Accent highlights (badges, selected items, focus rings)
    accent: '#ebf7e2',
    accentForeground: '#2f8013',

    // Destructive actions (delete, error states)
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',

    // Borders and input outlines
    border: '#d9d49e',
    input: '#d9d49e',
  },

  // Border radius (in px). Sync from the sibling web artifact's --radius
  // CSS variable. This value applies to cards, buttons, inputs, and modals.
  radius: 8,
};

export default colors;
