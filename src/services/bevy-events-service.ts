import { BEVY_CONFIG } from '../config/bevy-config';
import type { BevyEvent } from '../models/bevy-event';
import { mapBevyEventToEvent, type Event } from '../models/event';
import { getActiveChapter } from '../lib/active-chapter-storage';
import { DEFAULT_CHAPTER } from '../config/default-chapter';

export const DEFAULT_EVENT_BANNER =
  'https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/GDG_Bevy_DefaultEventBanner_x7tGQf5.png';

export const MOCK_BEVY_EVENTS: BevyEvent[] = [
  {
    id: '123457',
    status: 'published',
    title: 'Virtual "Show and Tell" of Projects by the Community',
    description_short:
      'Ready to showcase your creativity and ingenuity? Want to see what fun, cool, and innovative projects community members a...',
    description:
      '<p>Ready to showcase your creativity and ingenuity? Want to see what fun, cool, and innovative projects community members are working on? Then get ready for our Monthly <strong>Creative Exchange</strong>!</p><p>This is your chance to:</p><ul><li><strong>Showcase Your Craft</strong>: Experimenting with AI or trying to kickstart a new app? This is your stage! Demo your latest creations, share your process, and spark inspiration in others.</li><li><strong>The Creative Exchange</strong>: Need a second pair of eyes on an app you’re building? Or maybe you’re looking for a collaborator? Tap into our collective to get the feedback or partnership you need to level up.</li></ul>',
    start_date: '2026-09-22T19:00:00-04:00',
    end_date: '2026-09-22T20:00:00-04:00',
    audience_type: 'VIRTUAL',
    virtual_venue_name: 'Online (Virtual)',
    cropped_banner_url:
      'https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_AZGpvjQ',
    cropped_picture_url:
      'https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/blob_Zeu2kK0',
    total_attendees: 45,
    timezone_abbreviation: 'EDT',
  },
  {
    id: '123459',
    status: 'published',
    title: 'Virtual "Show and Tell" of Projects by the Community',
    description_short:
      'Monthly Creative Exchange and lightning demo talks from our local tech community.',
    description:
      '<p>Demo your latest creations, share your process, and spark inspiration in others. Projects do not have to be perfect or completely refined to help inspire others.</p>',
    start_date: '2026-10-27T19:00:00-04:00',
    end_date: '2026-10-27T20:00:00-04:00',
    audience_type: 'VIRTUAL',
    virtual_venue_name: 'Online (Virtual)',
    cropped_banner_url:
      'https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_AZGpvjQ',
    cropped_picture_url:
      'https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/blob_Zeu2kK0',
    total_attendees: 38,
    timezone_abbreviation: 'EDT',
  },
  {
    id: '128251',
    status: 'published',
    title: 'DevFest Hackathon 2026: Build, Innovate & Connect',
    description_short:
      'Our flagship annual DevFest hackathon featuring Google Developer Experts, hands-on workshops, and community demos.',
    description:
      '<p>Join us for DevFest Hackathon 2026! Build innovative projects using Google Cloud, Gemini, and web technologies with mentorship from industry experts.</p>',
    start_date: '2026-11-06T18:00:00-05:00',
    end_date: '2026-11-08T16:00:00-05:00',
    audience_type: 'IN_PERSON',
    venue_name: 'Tech Hub Orlando',
    venue_address: '36 West Pine Street',
    venue_city: 'Orlando',
    venue_state: 'FL',
    venue_zip_code: '32801',
    cropped_banner_url: DEFAULT_EVENT_BANNER,
    total_attendees: 120,
    timezone_abbreviation: 'EST',
    google_maps_link:
      'https://www.google.com/maps/search/?api=1&query=36+West+Pine+Street,+Orlando,+FL,+32801',
  },
  {
    id: '123456',
    status: 'published',
    title: 'Virtual "Show and Tell" of Projects by the Community',
    description_short:
      'Monthly Creative Exchange and community lightning talks.',
    description:
      '<p>Monthly showcase for builders, designers, and engineers across Central Florida.</p>',
    start_date: '2026-11-24T19:00:00-05:00',
    end_date: '2026-11-24T20:00:00-05:00',
    audience_type: 'VIRTUAL',
    virtual_venue_name: 'Online (Virtual)',
    cropped_banner_url:
      'https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_AZGpvjQ',
    cropped_picture_url:
      'https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/blob_Zeu2kK0',
    total_attendees: 52,
    timezone_abbreviation: 'EST',
  },
];

interface BevyApiListResult {
  id: number;
  title?: string;
  start_date?: string;
  end_date?: string;
  status?: string;
  url?: string;
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

interface BevyApiDetailResult {
  id: number;
  title?: string;
  audience_type?: 'IN_PERSON' | 'VIRTUAL' | 'HYBRID';
  description_short?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  status?: string;
  picture?: {
    url?: string;
    thumbnail_url?: string;
  };
  cropped_picture_url?: string;
  banner?: {
    url?: string;
    thumbnail_url?: string;
  };
  cropped_banner_url?: string;
  venue?: {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
  };
  virtual_venue_name?: string;
  virtual_venue_url?: string;
  attendee_virtual_venue_link?: string;
  total_attendees?: number;
  timezone_abbreviation?: string;
}

const eventsMemoryCache = new Map<
  number,
  { data: Event[]; timestamp: number }
>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function fetchBevyEvents(chapterId?: number): Promise<Event[]> {
  const targetChapterId =
    chapterId ??
    (typeof window !== 'undefined'
      ? getActiveChapter().id
      : DEFAULT_CHAPTER.id);

  // 1. Check in-memory cache
  const cached = eventsMemoryCache.get(targetChapterId);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  // 2. Check browser sessionStorage cache
  if (typeof window !== 'undefined') {
    try {
      const raw = sessionStorage.getItem(`bevy-events-${targetChapterId}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          eventsMemoryCache.set(targetChapterId, {
            data: parsed,
            timestamp: Date.now(),
          });
          return parsed;
        }
      }
    } catch {
      // Ignore sessionStorage read errors
    }
  }

  try {
    const eventsPath = `/chapter/${targetChapterId}/event/`;
    const listUrl = `${BEVY_CONFIG.apiBaseUrl}${eventsPath}`;
    const listRes = await fetch(listUrl);
    if (!listRes.ok) {
      throw new Error(`Bevy list fetch failed with status: ${listRes.status}`);
    }

    const listData = await listRes.json();
    const basicEvents: BevyApiListResult[] = listData.results || [];

    // Prioritize upcoming & recent events for detail fetching
    const nowMs = Date.now();
    const sortedBasic = [...basicEvents].sort(
      (a, b) =>
        new Date(a.start_date || '').getTime() -
        new Date(b.start_date || '').getTime()
    );

    // Find upcoming events (ended within last 7 days or in future)
    const upcomingEvents = sortedBasic.filter((e) => {
      const endTime = e.end_date ? new Date(e.end_date).getTime() : 0;
      return endTime >= nowMs - 7 * 24 * 60 * 60 * 1000;
    });

    // If fewer than 8 upcoming, take the most recent ended events to make up to 10
    const pastEvents = sortedBasic
      .filter((e) => {
        const endTime = e.end_date ? new Date(e.end_date).getTime() : 0;
        return endTime < nowMs - 7 * 24 * 60 * 60 * 1000;
      })
      .reverse();

    const candidatesToEnrich = [
      ...upcomingEvents.slice(0, 4),
      ...pastEvents.slice(0, Math.max(0, 4 - upcomingEvents.length)),
    ];

    // Fetch details in parallel for prioritized events (with timeout safeguard)
    const detailedMap = new Map<number, BevyApiDetailResult>();
    await Promise.allSettled(
      candidatesToEnrich.map(async (candidate) => {
        try {
          const detailUrl = `${BEVY_CONFIG.apiBaseUrl}/event/${candidate.id}/`;
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 1800);
          const res = await fetch(detailUrl, { signal: controller.signal });
          clearTimeout(timeout);
          if (res.ok) {
            const data: BevyApiDetailResult = await res.json();
            detailedMap.set(candidate.id, data);
          }
        } catch {
          // Fall back gracefully to basic info
        }
      })
    );

    // Map merged events directly with enriched details
    const normalizedEvents: Event[] = basicEvents.map((basic) => {
      const detailed = detailedMap.get(basic.id);

      const title = detailed?.title || basic.title || '';
      const descShort =
        detailed?.description_short || basic.description_short || '';
      const descFull =
        detailed?.description ||
        detailed?.description_short ||
        basic.description_short ||
        '';

      // Extract picture / avatar URL (supporting picture.url, picture.thumbnail_url, cropped_picture_url)
      const pictureUrl =
        detailed?.picture?.url ||
        detailed?.picture?.thumbnail_url ||
        detailed?.cropped_picture_url ||
        basic.cropped_picture_url ||
        '';

      // Extract banner URL (preferring event banner or default GDG banner)
      const bannerUrl =
        detailed?.banner?.url ||
        detailed?.cropped_banner_url ||
        detailed?.banner?.thumbnail_url ||
        basic.cropped_banner_url ||
        DEFAULT_EVENT_BANNER;

      // Infer audience type
      let audienceType: 'IN_PERSON' | 'VIRTUAL' | 'HYBRID' =
        detailed?.audience_type || basic.audience_type || 'IN_PERSON';
      const titleLower = title.toLowerCase();
      const descLower = (descShort + ' ' + descFull).toLowerCase();
      if (
        titleLower.includes('virtual') ||
        titleLower.includes('online') ||
        titleLower.includes('[online') ||
        descLower.includes('virtual') ||
        descLower.includes('online meeting') ||
        descLower.includes('google meet') ||
        descLower.includes('zoom')
      ) {
        audienceType = 'VIRTUAL';
      } else if (
        titleLower.includes('hybrid') ||
        descLower.includes('hybrid')
      ) {
        audienceType = 'HYBRID';
      }

      const merged: BevyEvent = {
        id: String(basic.id || ''),
        title,
        start_date: detailed?.start_date || basic.start_date || '',
        end_date: detailed?.end_date || basic.end_date || '',
        status: detailed?.status || basic.status || '',
        description_short: descShort,
        description: descFull,
        audience_type: audienceType,
        venue_name: detailed?.venue?.name || basic.venue_name || '',
        venue_address: detailed?.venue?.address || basic.venue_address || '',
        venue_city: detailed?.venue?.city || '',
        venue_state: detailed?.venue?.state || '',
        venue_zip_code: detailed?.venue?.zip_code || '',
        virtual_venue_name:
          detailed?.virtual_venue_name ||
          basic.virtual_venue_name ||
          (audienceType === 'VIRTUAL' ? 'Online (Virtual)' : ''),
        virtual_venue_link:
          detailed?.virtual_venue_url ||
          detailed?.attendee_virtual_venue_link ||
          basic.virtual_venue_link ||
          '',
        cropped_banner_url: bannerUrl,
        cropped_picture_url: pictureUrl,
        total_attendees: detailed?.total_attendees,
        timezone_abbreviation: detailed?.timezone_abbreviation || 'EDT',
      };

      return mapBevyEventToEvent(merged);
    });

    const sorted = normalizedEvents.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    // Save to caches
    eventsMemoryCache.set(targetChapterId, {
      data: sorted,
      timestamp: Date.now(),
    });
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(
          `bevy-events-${targetChapterId}`,
          JSON.stringify(sorted)
        );
      } catch {
        // Ignore sessionStorage write errors
      }
    }

    return sorted;
  } catch (error) {
    console.error(
      `Failed to fetch events from Bevy API for chapter ${targetChapterId}:`,
      error
    );

    // For non-default chapters, do not fall back to Central Florida mock events
    if (targetChapterId !== DEFAULT_CHAPTER.id) {
      return [];
    }

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
