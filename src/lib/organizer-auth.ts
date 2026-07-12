const STORAGE_KEY = 'gdg-organizer-unlocked';

/**
 * Checks if the organizer mode is unlocked.
 * Safe to call in both SSR and client environments.
 */
export function isUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY) === 'true';
}

/**
 * Attempts to unlock organizer mode with the given code.
 * Returns true if successful, false otherwise.
 */
export function unlock(code: string): boolean {
  if (typeof window === 'undefined') return false;
  if (code.trim().toLowerCase() === 'gdg') {
    localStorage.setItem(STORAGE_KEY, 'true');
    return true;
  }
  return false;
}

/**
 * Locks the organizer mode.
 */
export function lock(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
