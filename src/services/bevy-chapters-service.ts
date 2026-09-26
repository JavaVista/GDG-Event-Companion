import type {
  ActiveChapter,
  BevyApiChapterResult,
  BevyApiChapterSearchResponse,
} from '../models/chapter';
import { BEVY_CONFIG } from '../config/bevy-config';

/**
 * Normalizes a raw Bevy chapter search result into an internal ActiveChapter model.
 */
export function mapBevyChapterToActiveChapter(
  raw: BevyApiChapterResult
): ActiveChapter {
  const id = raw.id ?? (raw.objectID ? Number(raw.objectID) : 0);
  const name = raw.title || `GDG Chapter #${id}`;
  const slug = raw.url ? raw.url.split('/').filter(Boolean).pop() : undefined;

  return {
    id,
    name,
    slug,
    url: raw.url || (slug ? `https://gdg.community.dev/${slug}/` : undefined),
    city: raw.city || undefined,
    country: raw.country || undefined,
  };
}

/**
 * Searches public GDG chapters using the public Bevy chapter search API.
 * No authentication or API keys required.
 */
export async function searchBevyChapters(
  query: string
): Promise<ActiveChapter[]> {
  const trimmed = query.trim();
  if (!trimmed) {
    return [];
  }

  const endpoint = `${BEVY_CONFIG.apiBaseUrl}/search/chapter/?q=${encodeURIComponent(trimmed)}`;

  try {
    const res = await fetch(endpoint);

    if (res.status === 429) {
      throw new Error(
        'The Bevy public API is temporarily rate-limited. Please wait a moment and try again.'
      );
    }

    if (!res.ok) {
      throw new Error(
        `Failed to search chapters (Status ${res.status}). Please try again later.`
      );
    }

    const data: BevyApiChapterSearchResponse = await res.json();
    const results = data.results || [];

    return results
      .filter((r) => r.id || r.objectID)
      .map(mapBevyChapterToActiveChapter);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      'A network error occurred while searching for GDG chapters.',
      { cause: error }
    );
  }
}

/**
 * Validates and retrieves a chapter by its numeric ID using public Bevy endpoints.
 * Validates existence via the public chapter event feed and search index.
 */
export async function fetchChapterById(
  chapterId: number
): Promise<ActiveChapter> {
  if (
    !chapterId ||
    isNaN(chapterId) ||
    !Number.isInteger(chapterId) ||
    chapterId <= 0
  ) {
    throw new Error('Please enter a valid positive numeric Chapter ID.');
  }

  // 1. Verify chapter existence and retrieve events
  const eventEndpoint = `${BEVY_CONFIG.apiBaseUrl}/chapter/${chapterId}/event/`;
  let eventRes: Response;
  try {
    eventRes = await fetch(eventEndpoint);
  } catch (error) {
    throw new Error(
      'Network error verifying chapter. Please check your internet connection.',
      { cause: error }
    );
  }

  if (eventRes.status === 429) {
    throw new Error(
      'Bevy API rate-limited. Please wait a few moments before validating again.'
    );
  }

  if (eventRes.status === 404 || eventRes.status === 403) {
    throw new Error(
      `Chapter ID ${chapterId} could not be found or is not publicly accessible.`
    );
  }

  if (!eventRes.ok) {
    throw new Error(
      `Unable to resolve Chapter ID ${chapterId} (Status ${eventRes.status}).`
    );
  }

  const eventData = await eventRes.json().catch(() => ({}));
  const events = Array.isArray(eventData?.results) ? eventData.results : [];

  // 2. Extract potential slug and URL from public event links
  let extractedSlug = '';
  if (events.length > 0) {
    const sampleUrl =
      events[0]?.url || events[0]?.cohost_registration_url || '';
    const match = sampleUrl.match(
      /\/events\/details\/google-([a-z0-9-]+)-presents-/i
    );
    if (match && match[1]) {
      extractedSlug = match[1];
    }
  }

  // 3. Search public search index for full metadata
  const searchQuery = extractedSlug
    ? extractedSlug.replace(/-/g, ' ')
    : String(chapterId);

  try {
    const searchRes = await fetch(
      `${BEVY_CONFIG.apiBaseUrl}/search/chapter/?q=${encodeURIComponent(searchQuery)}`
    );

    if (searchRes.ok) {
      const searchData = await searchRes.json();
      const matched = (searchData.results || []).find(
        (r: BevyApiChapterResult) =>
          Number(r.id) === chapterId || r.objectID === String(chapterId)
      );

      if (matched) {
        return mapBevyChapterToActiveChapter(matched);
      }
    }
  } catch (err) {
    console.warn('Metadata lookup in search index was non-critical:', err);
  }

  // 4. Fallback: derive title from slug if found
  if (extractedSlug) {
    const formattedName = extractedSlug
      .split('-')
      .map((w) =>
        w.length <= 3 ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)
      )
      .join(' ');

    return {
      id: chapterId,
      name: formattedName,
      slug: extractedSlug,
      url: `https://gdg.community.dev/${extractedSlug}/`,
    };
  }

  // 5. Minimal verified chapter representation
  return {
    id: chapterId,
    name: `GDG Chapter #${chapterId}`,
    url: `https://gdg.community.dev/chapter/${chapterId}/`,
  };
}
