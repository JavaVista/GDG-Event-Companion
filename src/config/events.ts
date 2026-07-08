export interface EventData {
  title: string;
  subtitle?: string;
  date: string;
  time: string;
  location: string;
  tag: string;
  tagColor?: string;
  speakerName?: string;
  speakerAvatar?: string;
  bannerImage?: string;
  daysRemaining?: number;
}

export const CURRENT_EVENT: EventData = {
  title: 'Making AI Honesty Machine-Readable',
  subtitle: 'A Hands-On Workshop with Muntaser Syed',
  date: 'May 31, 2025',
  time: '9:30 AM - 12:00 PM',
  location: 'Tech Hub Orlando',
  tag: 'Live',
  speakerName: 'Muntaser Syed',
  speakerAvatar:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
  bannerImage: '/images/orlando-skyline.png',
};

export const UPCOMING_EVENTS: EventData[] = [
  {
    title: 'Build with AI: Gemini on Firebase',
    subtitle: 'Workshop',
    date: 'Jun 27',
    time: '10:00 AM',
    location: 'Tech Hub Orlando',
    tag: 'Workshop',
    daysRemaining: 12,
  },
];

export const SCHEDULE_EVENTS = [
  {
    time: 'Jun 27, 2025 • 6:30 PM',
    title: 'Build with AI: Gemini on Firebase',
    room: 'Tech Hub Orlando',
    tag: 'Workshop',
    tagColor: 'bg-primary/10 text-primary border-primary/20',
  },
  {
    time: 'Jul 18, 2025 • 6:30 PM',
    title: 'Flutter Web Deep Dive & Material 3',
    room: 'Downtown Orlando Library',
    tag: 'Meetup',
    tagColor: 'bg-secondary/10 text-secondary border-secondary/20',
  },
  {
    time: 'Aug 22, 2025 • 6:00 PM',
    title: 'Google Cloud Run for Beginners',
    room: 'Online (Google Meet)',
    tag: 'Study Jam',
    tagColor: 'bg-tertiary/10 text-tertiary border-tertiary/20',
  },
  {
    time: 'Sep 19, 2025 • 7:00 PM',
    title: 'GDG Central Florida Showcase 2025',
    room: 'Rollins College, Winter Park',
    tag: 'Showcase',
    tagColor: 'bg-error/10 text-error border-error/20',
  },
];
