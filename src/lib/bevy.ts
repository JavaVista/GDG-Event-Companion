import type { BevyEvent } from '../models/bevy-event';
import type { Event } from '../models/event';
import {
  fetchBevyEvents,
  getCarouselEvents,
  MOCK_BEVY_EVENTS as SERVICE_MOCK,
} from '../services/bevy-events-service';

export const MOCK_BEVY_EVENTS: BevyEvent[] = SERVICE_MOCK;
export { getCarouselEvents };

/**
 * Fetches and maps events for a specific Bevy Chapter ID.
 * Falls back to mock data if the endpoint is not set up or returns errors.
 */
export async function fetchChapterEvents(chapterId?: number): Promise<Event[]> {
  return fetchBevyEvents(chapterId);
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
