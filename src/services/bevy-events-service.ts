import { BEVY_CONFIG } from '../config/bevy-config';
import type { BevyEvent } from '../models/bevy-event';
import { mapBevyEventToEvent, type Event } from '../models/event';

export const MOCK_BEVY_EVENTS: BevyEvent[] = [
  {
    id: 'current-event',
    status: 'live',
    title: 'Making AI Honesty Machine-Readable',
    description_short: 'A Hands-On Workshop with Muntaser Syed',
    start_date: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30m ago
    end_date: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // in 2h
    audience_type: 'IN_PERSON',
    venue_name: 'Tech Hub Orlando',
    venue_address: 'Tech Hub, Orlando, FL',
    cropped_banner_url:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600',
    cropped_picture_url:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
  },
  {
    id: 'upcoming-gemini',
    status: 'published',
    title: 'Build with AI: Gemini on Firebase',
    description_short: 'Workshop',
    start_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // in 5 days
    end_date: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
    ).toISOString(),
    audience_type: 'IN_PERSON',
    venue_name: 'Tech Hub Orlando',
    venue_address: 'Tech Hub, Orlando, FL',
    cropped_banner_url:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600',
    cropped_picture_url:
      'https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/blob_Zeu2kK0',
  },
  {
    id: 'flutter-web',
    status: 'published',
    title: 'Flutter Web Deep Dive & Material 3',
    description_short: 'Meetup',
    start_date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(), // in 12 days
    end_date: new Date(
      Date.now() + 12 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
    ).toISOString(),
    audience_type: 'IN_PERSON',
    venue_name: 'Downtown Orlando Library',
    venue_address: 'Orlando, FL',
  },
  {
    id: 'cloud-run',
    status: 'published',
    title: 'Google Cloud Run for Beginners',
    description_short: 'Study Jam',
    start_date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), // in 20 days
    end_date: new Date(
      Date.now() + 20 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
    ).toISOString(),
    audience_type: 'VIRTUAL',
    virtual_venue_name: 'Online (Google Meet)',
    virtual_venue_link: 'https://meet.google.com/abc-defg-hij',
  },
  {
    id: 'showcase-2025',
    status: 'published',
    title: 'GDG Central Florida Showcase 2025',
    description_short: 'Showcase',
    start_date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(), // in 35 days
    end_date: new Date(
      Date.now() + 35 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
    ).toISOString(),
    audience_type: 'IN_PERSON',
    venue_name: 'Rollins College, Winter Park',
    venue_address: 'Winter Park, FL',
  },
];

interface BevyApiListResult {
  id: number;
  title?: string;
  start_date?: string;
  end_date?: string;
  status?: string;
  is_virtual_event?: boolean;
  description_short?: string;
  audience_type?: 'IN_PERSON' | 'VIRTUAL' | 'HYBRID';
  venue_name?: string;
  venue_address?: string;
  virtual_venue_name?: string;
  virtual_venue_link?: string;
  cropped_banner_url?: string;
  cropped_picture_url?: string;
}

export async function fetchBevyEvents(chapterId?: number): Promise<Event[]> {
  try {
    const targetChapterId = chapterId ?? BEVY_CONFIG.chapterId;
    const eventsPath = `/chapter/${targetChapterId}/event/`;
    const listUrl = `${BEVY_CONFIG.apiBaseUrl}${eventsPath}`;
    const listRes = await fetch(listUrl);
    if (!listRes.ok) {
      throw new Error(`Bevy list fetch failed with status: ${listRes.status}`);
    }

    const listData = await listRes.json();
    const basicEvents: BevyApiListResult[] = listData.results || [];
    const now = new Date();

    // 1. Identify which events are upcoming/live or completed.
    const upcomingOrLive = basicEvents.filter((e) => {
      const endDate = new Date(e.end_date || e.start_date || '');
      return endDate >= now;
    });

    // 2. Determine target list for details fetching (limit to prevent hitting API limits)
    let targets = upcomingOrLive;
    if (targets.length === 0) {
      // Fallback: If no upcoming/live events, get details for the top 5 most recent past events.
      const pastEvents = basicEvents
        .filter((e) => {
          const endDate = new Date(e.end_date || e.start_date || '');
          return endDate < now;
        })
        .sort(
          (a, b) =>
            new Date(b.start_date || '').getTime() -
            new Date(a.start_date || '').getTime()
        );
      targets = pastEvents.slice(0, 5);
    }

    // 3. Fetch details for targets in parallel.
    const targetMap = new Map<string | number, BevyEvent>();
    await Promise.all(
      targets.map(async (e) => {
        if (!e.id) return;
        try {
          const detailFields = [
            'id',
            'title',
            'description_short',
            'start_date',
            'end_date',
            'status',
            'audience_type',
            'venue_name',
            'venue_address',
            'virtual_venue_name',
            'virtual_venue_link',
            'attendee_virtual_venue_link',
            'cropped_banner_url',
            'cropped_picture_url',
          ].join(',');
          const detailUrl = `${BEVY_CONFIG.apiBaseUrl}${BEVY_CONFIG.eventDetailPath}${e.id}/?fields=${detailFields}`;
          const detailRes = await fetch(detailUrl);
          if (detailRes.ok) {
            const detailData = await detailRes.json();
            targetMap.set(e.id, detailData);
          }
        } catch (err) {
          console.warn(`Failed to fetch details for event ID ${e.id}:`, err);
        }
      })
    );

    // 4. Merge details back to the list and normalize all events.
    const normalizedEvents: Event[] = basicEvents.map((basic) => {
      const detailed = basic.id ? targetMap.get(basic.id) : undefined;
      const detailedRecord = detailed as unknown as
        | Record<string, unknown>
        | undefined;
      const pictureObj = detailedRecord?.picture as
        | Record<string, unknown>
        | undefined;
      const thumbnailUrl = pictureObj?.thumbnail_url as string | undefined;
      const pictureUrl = pictureObj?.url as string | undefined;

      const merged: BevyEvent = {
        id: String(basic.id || ''),
        title: basic.title || '',
        start_date: basic.start_date || '',
        end_date: basic.end_date || '',
        status: basic.status || '',
        description_short:
          detailed?.description_short || basic.description_short || '',
        audience_type:
          detailed?.audience_type ||
          (basic.is_virtual_event ? 'VIRTUAL' : 'IN_PERSON'),
        venue_name: detailed?.venue_name || basic.venue_name || '',
        venue_address: detailed?.venue_address || basic.venue_address || '',
        virtual_venue_name:
          detailed?.virtual_venue_name || basic.virtual_venue_name || '',
        virtual_venue_link:
          detailed?.virtual_venue_link ||
          detailed?.attendee_virtual_venue_link ||
          basic.virtual_venue_link ||
          '',
        cropped_banner_url:
          detailed?.cropped_banner_url || basic.cropped_banner_url || '',
        cropped_picture_url:
          detailed?.cropped_picture_url ||
          basic.cropped_picture_url ||
          thumbnailUrl ||
          pictureUrl ||
          '',
      };

      return mapBevyEventToEvent(merged);
    });

    // 5. Sort by startDate ascending.
    return normalizedEvents.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  } catch (error) {
    console.error(
      'Failed to fetch events from Bevy API, falling back to local defaults:',
      error
    );
    return MOCK_BEVY_EVENTS.map(mapBevyEventToEvent).sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  }
}

/**
 * Excludes past events from the home page event carousel unless no upcoming events are available.
 * If a Live event is active, filters it out of the carousel.
 * If no Live event is active, keeps the next Upcoming event in the carousel.
 */
export function getCarouselEvents(events: Event[]): Event[] {
  const hasLive = events.some((e) => e.statusLabel === 'Live');
  const upcoming = events.filter((e) => e.statusLabel === 'Upcoming');

  if (upcoming.length > 0) {
    if (hasLive) {
      // Filter out any Live events from the carousel (only display remaining Upcoming events)
      return upcoming.filter((e) => e.statusLabel !== 'Live');
    }
    // No live event active: keep the next upcoming event in the carousel
    return upcoming;
  }

  // Fallback to past events if no upcoming events are available
  return events.filter((e) => e.statusLabel === 'Ended');
}
