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
    description: 'Our events page',
    url: 'https://gdg.community.dev/gdg-central-florida',
    icon: 'calendar',
    colorToken: 'error',
    isExternal: true,
  },
  {
    id: 'blog',
    title: 'Our Website',
    description: 'GDG CF website and blog',
    url: 'https://googledevscentralflorida.com',
    icon: 'home',
    colorToken: 'accent',
    isExternal: true,
  },
  {
    id: 'devfest',
    title: 'DevFest Florida',
    description: 'DevFest event page',
    url: 'https://devfestflorida.com',
    icon: 'devfest',
    colorToken: 'success',
    isExternal: true,
  },
  {
    id: 'coc',
    title: 'Code of Conduct',
    description: 'Our community guidelines',
    url: 'https://googledevscentralflorida.com/codeOfConduct',
    icon: 'codeOfConduct',
    colorToken: 'purple',
    isExternal: true,
  },
  {
    id: 'community-links',
    title: 'Organizer LinkedIn',
    description: 'Connect with me',
    url: 'https://www.linkedin.com/in/technologic',
    icon: 'linkedin',
    colorToken: 'primary',
    isExternal: true,
  },
];
