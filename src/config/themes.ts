export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  mutedText: string;
  success: string;
  warning: string;
  danger: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
  iconSet: {
    event: string;
    speaker: string;
    location: string;
    badge: string;
  };
  heroStyle: {
    gradientStart: string;
    gradientEnd: string;
    pattern?: string;
  };
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'gdg-default',
    name: 'Google Developer Groups (Default)',
    description:
      'Clean light-mode theme based on Google Developer Groups brand guidelines.',
    colors: {
      primary: '#4285f4', // Google Blue
      secondary: '#34a853', // Google Green
      accent: '#f9ab00', // Google Yellow
      background: '#ffffff',
      surface: '#ffffff',
      text: '#1e1e1e',
      mutedText: '#5f6368',
      success: '#34a853',
      warning: '#f9ab00',
      danger: '#ea4335',
    },
    iconSet: {
      event:
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='4' width='18' height='18' rx='2' ry='2'></rect><line x1='16' y1='2' x2='16' y2='6'></line><line x1='8' y1='2' x2='8' y2='6'></line><line x1='3' y1='10' x2='21' y2='10'></line></svg>",
      speaker:
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path><circle cx='12' cy='7' r='4'></circle></svg>",
      location:
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path><circle cx='12' cy='10' r='3'></circle></svg>",
      badge:
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'></circle><path d='M8 14s1.5 2 4 2 4-2 4-2'></path><line x1='9' y1='9' x2='9.01' y2='9'></line><line x1='15' y1='9' x2='15.01' y2='9'></line></svg>",
    },
    heroStyle: {
      gradientStart: 'rgba(66, 133, 244, 0.1)',
      gradientEnd: 'rgba(188, 82, 238, 0.05)',
      pattern:
        'radial-gradient(circle at 10% 20%, rgba(66, 133, 244, 0.05) 0%, transparent 40%)',
    },
  },
  {
    id: 'gdg-devfest',
    name: 'GDG DevFest 2026',
    description:
      'Vibrant dark-mode theme inspired by the retro-futuristic DevFest community events.',
    colors: {
      primary: '#ea4335', // Google Red / Vibrant Orange
      secondary: '#4285f4', // Google Blue
      accent: '#f9ab00', // Google Yellow
      background: '#0f172a', // Dark slate background
      surface: '#1e293b', // Elevated container surface
      text: '#f8fafc', // Off white text
      mutedText: '#94a3b8',
      success: '#10b981',
      warning: '#fbbf24',
      danger: '#ef4444',
    },
    iconSet: {
      event:
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='3' width='18' height='18' rx='1'></rect><line x1='9' y1='9' x2='15' y2='9'></line><line x1='9' y1='13' x2='15' y2='13'></line><line x1='9' y1='17' x2='13' y2='17'></line></svg>",
      speaker:
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='16 18 22 12 16 6'></polyline><polyline points='8 6 2 12 8 18'></polyline></svg>",
      location:
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'></circle><circle cx='12' cy='12' r='3'></circle><line x1='12' y1='2' x2='12' y2='22'></line><line x1='2' y1='12' x2='22' y2='12'></line></svg>",
      badge:
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'></path></svg>",
    },
    heroStyle: {
      gradientStart: 'rgba(234, 67, 53, 0.15)',
      gradientEnd: 'rgba(249, 171, 0, 0.05)',
      pattern:
        'linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), radial-gradient(circle at 80% 20%, rgba(249, 171, 0, 0.15) 0%, transparent 50%)',
    },
  },
  {
    id: 'holiday-generic',
    name: 'Holiday Celebration',
    description:
      'Festive warm theme themed for holidays with tree and gift icons.',
    colors: {
      primary: '#b3261e', // Christmas Crimson
      secondary: '#137333', // Pine Green
      accent: '#e0b034', // Gold
      background: '#faf8f5', // Warm light background
      surface: '#ffffff', // Snow White
      text: '#1c1b1f', // Dark charcoal
      mutedText: '#6b6357',
      success: '#137333',
      warning: '#e0b034',
      danger: '#b3261e',
    },
    iconSet: {
      event:
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 2L3 17h18L12 2z'></path><path d='M9 17v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4'></path><path d='M12 7l-4 6h8l-4-6z'></path></svg>",
      speaker:
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path></svg>",
      location:
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 2v20M2 12h20M5 5l14 14M19 5L5 19'></path></svg>",
      badge:
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='8' width='18' height='12' rx='2'></rect><path d='M12 8V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v3M12 8V5a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v3'></path><line x1='12' y1='8' x2='12' y2='20'></line><line x1='3' y1='14' x2='21' y2='14'></line></svg>",
    },
    heroStyle: {
      gradientStart: 'rgba(179, 38, 30, 0.08)',
      gradientEnd: 'rgba(19, 115, 51, 0.05)',
      pattern:
        'radial-gradient(circle at 90% 10%, rgba(224, 176, 52, 0.1) 0%, transparent 35%)',
    },
  },
];

export const STORAGE_KEY = 'gdg-active-theme-config-id';

/**
 * Apply the theme config variables to the document element
 */
export function applyTheme(theme: ThemeConfig) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  // Colors
  root.style.setProperty('--md-sys-color-primary', theme.colors.primary);
  root.style.setProperty('--md-sys-color-secondary', theme.colors.secondary);
  root.style.setProperty('--md-sys-color-accent', theme.colors.accent);
  root.style.setProperty('--md-sys-color-background', theme.colors.background);
  root.style.setProperty('--md-sys-color-surface', theme.colors.surface);
  root.style.setProperty('--md-sys-color-text', theme.colors.text);
  root.style.setProperty('--md-sys-color-muted', theme.colors.mutedText);
  root.style.setProperty('--md-sys-color-success', theme.colors.success);
  root.style.setProperty('--md-sys-color-warning', theme.colors.warning);
  root.style.setProperty('--md-sys-color-danger', theme.colors.danger);

  // Dynamic Mask Icons
  root.style.setProperty('--icon-event', `url("${theme.iconSet.event}")`);
  root.style.setProperty('--icon-speaker', `url("${theme.iconSet.speaker}")`);
  root.style.setProperty('--icon-location', `url("${theme.iconSet.location}")`);
  root.style.setProperty('--icon-badge', `url("${theme.iconSet.badge}")`);

  // Hero custom styling
  root.style.setProperty(
    '--hero-gradient-start',
    theme.heroStyle.gradientStart
  );
  root.style.setProperty('--hero-gradient-end', theme.heroStyle.gradientEnd);
  root.style.setProperty('--hero-pattern', theme.heroStyle.pattern || 'none');

  // Attribute selector for any CSS target overrides
  root.setAttribute('data-theme', theme.id);
}

/**
 * Get active theme from localStorage or fallback to default
 */
export function getActiveTheme(): ThemeConfig {
  if (typeof localStorage === 'undefined') {
    return THEMES[0];
  }
  const id = localStorage.getItem(STORAGE_KEY);
  const found = THEMES.find((t) => t.id === id);
  return found || THEMES[0];
}

/**
 * Set active theme and persist in localStorage
 */
export function setActiveThemeId(themeId: string): ThemeConfig {
  const found = THEMES.find((t) => t.id === themeId) || THEMES[0];
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, found.id);
  }
  applyTheme(found);
  return found;
}
