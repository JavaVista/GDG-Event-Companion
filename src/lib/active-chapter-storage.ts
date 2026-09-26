import type { ActiveChapter } from '../models/chapter';
import { DEFAULT_CHAPTER } from '../config/default-chapter';

export const ACTIVE_CHAPTER_STORAGE_KEY = 'gdg-event-companion.active-chapter';
export const ACTIVE_CHAPTER_CHANGED_EVENT = 'active-chapter-changed';

/**
 * Retrieves the currently active chapter from localStorage.
 * Falls back safely to DEFAULT_CHAPTER (GDG Central Florida / 920) if empty or invalid.
 */
export function getActiveChapter(): ActiveChapter {
  if (typeof window === 'undefined' || !window.localStorage) {
    return DEFAULT_CHAPTER;
  }

  try {
    const raw = window.localStorage.getItem(ACTIVE_CHAPTER_STORAGE_KEY);
    if (!raw) {
      return DEFAULT_CHAPTER;
    }

    const parsed = JSON.parse(raw);
    const parsedId = Number(parsed?.id);
    if (parsed && !isNaN(parsedId) && parsedId > 0 && parsed.name) {
      return {
        id: parsedId,
        name: String(parsed.name),
        slug: parsed.slug ? String(parsed.slug) : undefined,
        url: parsed.url ? String(parsed.url) : undefined,
        city: parsed.city ? String(parsed.city) : undefined,
        country: parsed.country ? String(parsed.country) : undefined,
      };
    }
  } catch (error) {
    console.warn(
      'Failed to parse active chapter from localStorage, falling back to default:',
      error
    );
  }

  return DEFAULT_CHAPTER;
}

/**
 * Persists the selected active chapter to localStorage and dispatches a notification event.
 */
export function setActiveChapter(chapter: ActiveChapter): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  const normalized: ActiveChapter = {
    ...chapter,
    id: Number(chapter.id),
  };

  try {
    window.localStorage.setItem(
      ACTIVE_CHAPTER_STORAGE_KEY,
      JSON.stringify(normalized)
    );

    // Notify all app components of the change
    window.dispatchEvent(
      new CustomEvent<ActiveChapter>(ACTIVE_CHAPTER_CHANGED_EVENT, {
        detail: normalized,
      })
    );
  } catch (error) {
    console.error('Failed to save active chapter to localStorage:', error);
  }
}

/**
 * Resets the active chapter back to DEFAULT_CHAPTER (GDG Central Florida)
 * and clears/overwrites localStorage.
 */
export function resetActiveChapter(): ActiveChapter {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.removeItem(ACTIVE_CHAPTER_STORAGE_KEY);
      window.dispatchEvent(
        new CustomEvent<ActiveChapter>(ACTIVE_CHAPTER_CHANGED_EVENT, {
          detail: DEFAULT_CHAPTER,
        })
      );
    } catch (error) {
      console.error('Failed to reset active chapter in localStorage:', error);
    }
  }
  return DEFAULT_CHAPTER;
}
