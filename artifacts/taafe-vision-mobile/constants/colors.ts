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
    text: '#161411',
    tint: '#F5731A',

    // Core surfaces
    background: '#F5F1E8',
    foreground: '#161411',

    // Cards / elevated surfaces
    card: '#FFFDF8',
    cardForeground: '#161411',

    // Primary action color (buttons, links, active states)
    primary: '#F5731A',
    primaryForeground: '#161411',

    // Secondary / less-emphasis interactive surfaces
    secondary: '#B8E8CB',
    secondaryForeground: '#163523',

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: '#E8E1D5',
    mutedForeground: '#6B655C',

    // Accent highlights (badges, selected items, focus rings)
    accent: '#FBD4B4',
    accentForeground: '#6B2C0B',

    // Destructive actions (delete, error states)
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',

    // Borders and input outlines
    border: '#D7CDBD',
    input: '#D7CDBD',

    // Native mobile chrome, synced with the website navigation palette
    purpleTaafe: '#161411',
    purpleMuted: '#D9CBB6',
    onPurple: '#FFFDF8',
  },

  // Border radius (in px). Sync from the sibling web artifact's --radius
  // CSS variable. This value applies to cards, buttons, inputs, and modals.
  radius: 24,
};

export default colors;
