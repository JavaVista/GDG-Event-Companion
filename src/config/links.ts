import type { SemanticIconName } from './icons';

export interface PublicLink {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: SemanticIconName;
  colorToken:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'error'
    | 'success'
    | 'purple';
  isExternal: boolean;
}

export const PUBLIC_LINKS: PublicLink[] = [
  {
    id: 'discord',
    title: 'Join Discord',
    description: 'Join our community Discord channel',
    url: 'https://discord.com/invite/mMgkFY2nQ5',
    icon: 'discord',
    colorToken: 'primary',
    isExternal: true,
  },
  {
    id: 'gdg-cf',
    title: 'GDG Central Florida',
    description: 'Our community page',
    url: 'https://gdg.community.dev/gdg-central-florida/',
    icon: 'calendar',
    colorToken: 'error',
    isExternal: true,
  },
  {
    id: 'blog',
    title: 'Our Blog',
    description: 'Google Devs Central Florida Blog',
    url: 'https://googledevscentralflorida.com/',
    icon: 'blog',
    colorToken: 'accent',
    isExternal: true,
  },
  {
    id: 'devfest',
    title: 'DevFest Florida',
    description: 'DevFest event page',
    url: 'https://devfestflorida.com/',
    icon: 'devfest',
    colorToken: 'primary',
    isExternal: true,
  },
  {
    id: 'coc',
    title: 'Code of Conduct',
    description: 'Our community guidelines',
    url: 'https://goo.gle/codeofconduct',
    icon: 'codeOfConduct',
    colorToken: 'success',
    isExternal: true,
  },
  {
    id: 'community-links',
    title: 'Community Links',
    description: 'Important community links',
    url: 'https://gdg.community.dev/',
    icon: 'community',
    colorToken: 'purple',
    isExternal: true,
  },
];
