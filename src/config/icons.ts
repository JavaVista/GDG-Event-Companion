export type SemanticIconName =
  | 'discord'
  | 'calendar'
  | 'blog'
  | 'codeOfConduct'
  | 'devfest'
  | 'community'
  | 'organizer'
  | 'lock'
  | 'qr'
  | 'speaker'
  | 'venue'
  | 'notes'
  | 'checklist'
  | 'theme'
  | 'offline'
  | 'pwa'
  | 'privacy'
  | 'home'
  | 'more';

/**
 * Standard default SVG icons.
 * Formatted as raw url-encoded strings using stroke='currentColor' for full dynamic styling.
 */
export const DEFAULT_ICONS: Record<SemanticIconName, string> = {
  discord:
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M9 10h.01M15 10h.01M17.5 4.5S16 3 13 3h-2C8 3 6.5 4.5 6.5 4.5A13 13 0 0 0 5 13c0 4 3 6.5 7 6.5l1-.5.5.5c4 0 7-2.5 7-6.5a13 13 0 0 0-1.5-8.5z'/><path d='M8.5 14.5c2 1.5 5 1.5 7 0'/></svg>",

  calendar:
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='4' width='18' height='18' rx='2' ry='2'></rect><line x1='16' y1='2' x2='16' y2='6'></line><line x1='8' y1='2' x2='8' y2='6'></line><line x1='3' y1='10' x2='21' y2='10'></line></svg>",

  blog: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'></path><polyline points='14 2 14 8 20 8'></polyline><line x1='16' y1='13' x2='8' y2='13'></line><line x1='16' y1='17' x2='8' y2='17'></line><polyline points='10 9 9 9 8 9'></polyline></svg>",

  codeOfConduct:
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'></path><path d='M8 11h8M12 8v6'></path></svg>",

  devfest:
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path></svg>",

  community:
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path><circle cx='9' cy='7' r='4'></circle><path d='M23 21v-2a4 4 0 0 0-3-3.87'></path><path d='M16 3.13a4 4 0 0 1 0 7.75'></path></svg>",

  organizer:
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'></path><circle cx='9' cy='7' r='4'></circle><polyline points='16 11 18 13 22 9'></polyline></svg>",

  lock: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='11' width='18' height='11' rx='2' ry='2'></rect><path d='M7 11V7a5 5 0 0 1 10 0v4'></path></svg>",

  qr: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='3' width='6' height='6'></rect><rect x='15' y='3' width='6' height='6'></rect><rect x='3' y='15' width='6' height='6'></rect><line x1='15' y1='15' x2='15' y2='15'></line><line x1='19' y1='19' x2='19' y2='19'></line><line x1='15' y1='19' x2='19' y2='15'></line></svg>",

  speaker:
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z'></path><path d='M19 10v1a7 7 0 0 1-14 0v-1M12 18v4M8 22h8'></path></svg>",

  venue:
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path><circle cx='12' cy='10' r='3'></circle></svg>",

  notes:
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'></path><rect x='8' y='2' width='8' height='4' rx='1' ry='1'></rect></svg>",

  checklist:
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='9 11 12 14 22 4'></polyline><path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'></path></svg>",

  theme:
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 22C17.5228 22 22 17.5228 22 12C22 11.5 21.5 11 21 11H18.5C17.6716 11 17 10.3284 17 9.5C17 9.10217 17.158 8.72064 17.4393 8.43934C17.791 8.0877 18 7.61014 18 7.08579C18 5.9338 17.0662 5 15.9142 5H14C8.47715 5 4 9.47715 4 15C4 18.866 7.13401 22 11 22H12Z'></path><circle cx='7.5' cy='10.5' r='1.5'></circle><circle cx='11.5' cy='7.5' r='1.5'></circle><circle cx='16.5' cy='11.5' r='1.5'></circle></svg>",

  offline:
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><line x1='1' y1='1' x2='23' y2='23'></line><path d='M16.72 11.06A10.94 10.94 0 0 1 19 12.5'></path><path d='M5 12.5a10.94 10.94 0 0 1 5.83-2.84'></path><path d='M12 17.5c.78 0 1.5-.34 2-1'></path><path d='M1.02 7a21 21 0 0 1 8.8-3.4'></path><path d='M14.12 3.6A21 21 0 0 1 23 7'></path></svg>",

  pwa: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='5' y='2' width='14' height='20' rx='2' ry='2'></rect><line x1='12' y1='18' x2='12.01' y2='18'></line><path d='M12 6v6m-3-3l3 3 3-3'></path></svg>",

  privacy:
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'></path><circle cx='12' cy='11' r='3'></circle></svg>",

  home: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path><polyline points='9 22 9 12 15 12 15 22'></polyline></svg>",

  more: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='1' fill='currentColor'></circle><circle cx='19' cy='12' r='1' fill='currentColor'></circle><circle cx='5' cy='12' r='1' fill='currentColor'></circle></svg>",
};

/**
 * Returns the resolved SVG URI for a given semantic icon name and theme overrides
 */
export function getIconUrl(
  name: SemanticIconName,
  themeOverrides?: Partial<Record<SemanticIconName, string>>
): string {
  if (themeOverrides && themeOverrides[name]) {
    return themeOverrides[name]!;
  }
  return DEFAULT_ICONS[name];
}
