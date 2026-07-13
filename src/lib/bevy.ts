import type { BevyEvent } from '../models/bevy-event';
import { mapBevyEventToEvent, type Event } from '../models/event';

export const MOCK_BEVY_EVENTS: BevyEvent[] = [
  {
    id: 'current-event',
    status: 'live',
    title: 'Making AI Honesty Machine-Readable',
    description_short: 'A Hands-On Workshop with Muntaser Syed',
    start_date: '2025-05-31T09:30:00Z',
    end_date: '2025-05-31T12:00:00Z',
    audience_type: 'IN_PERSON',
    venue_name: 'Tech Hub Orlando',
    venue_address: 'Tech Hub, Orlando, FL',
  },
  {
    id: 'upcoming-gemini',
    status: 'published',
    title: 'Build with AI: Gemini on Firebase',
    description_short: 'Workshop',
    start_date: '2025-06-27T18:30:00Z',
    end_date: '2025-06-27T21:30:00Z',
    audience_type: 'IN_PERSON',
    venue_name: 'Tech Hub Orlando',
    venue_address: 'Tech Hub, Orlando, FL',
  },
  {
    id: 'flutter-web',
    status: 'published',
    title: 'Flutter Web Deep Dive & Material 3',
    description_short: 'Meetup',
    start_date: '2025-07-18T18:30:00Z',
    end_date: '2025-07-18T21:30:00Z',
    audience_type: 'IN_PERSON',
    venue_name: 'Downtown Orlando Library',
    venue_address: 'Orlando, FL',
  },
  {
    id: 'cloud-run',
    status: 'published',
    title: 'Google Cloud Run for Beginners',
    description_short: 'Study Jam',
    start_date: '2025-08-22T18:00:00Z',
    end_date: '2025-08-22T21:00:00Z',
    audience_type: 'VIRTUAL',
    virtual_venue_name: 'Online (Google Meet)',
    virtual_venue_link: 'https://meet.google.com/abc-defg-hij',
  },
  {
    id: 'showcase-2025',
    status: 'published',
    title: 'GDG Central Florida Showcase 2025',
    description_short: 'Showcase',
    start_date: '2025-09-19T19:00:00Z',
    end_date: '2025-09-19T22:00:00Z',
    audience_type: 'IN_PERSON',
    venue_name: 'Rollins College, Winter Park',
    venue_address: 'Winter Park, FL',
  },
];

/**
 * Fetches and maps events for a specific Bevy Chapter ID.
 * Falls back to mock data if the endpoint is not set up or returns errors.
 */
export async function fetchChapterEvents(
  chapterId: number = 920
): Promise<Event[]> {
  try {
    // In production, Bevy organization integrations would query their instance:
    // const response = await fetch(`https://api.bevy.com/api/v1/chapters/${chapterId}/events`);
    // if (!response.ok) throw new Error('Bevy network response failed');
    // const data = await response.json();
    // return data.results.map(mapBevyEventToEvent);

    return MOCK_BEVY_EVENTS.map(mapBevyEventToEvent);
  } catch (error) {
    console.error(
      `Failed to fetch events for chapter ${chapterId}, using offline mocks:`,
      error
    );
    return MOCK_BEVY_EVENTS.map(mapBevyEventToEvent);
  }
}

/**
 * Utility to extract the active Live event or the next closest upcoming event.
 */
export function getLiveOrNextEvent(events: Event[]): Event | undefined {
  const live = events.find((e) => e.statusLabel === 'Live');
  if (live) return live;

  const upcoming = events
    .filter((e) => e.statusLabel === 'Upcoming')
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  return upcoming[0];
}

/**
 * Utility to extract all upcoming events.
 */
export function getUpcomingEvents(events: Event[]): Event[] {
  return events
    .filter((e) => e.statusLabel === 'Upcoming')
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
}
