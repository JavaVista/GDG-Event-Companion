import type { BevyEvent } from './bevy-event';

export interface Event {
  id: string;
  title: string;
  descriptionShort: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: string;
  audienceType: 'IN_PERSON' | 'VIRTUAL' | 'HYBRID';
  venueName?: string;
  venueAddress?: string;
  venueCity?: string;
  venueState?: string;
  venueZipCode?: string;
  virtualVenueName?: string;
  virtualVenueLink?: string;
  croppedBannerUrl?: string;
  croppedPictureUrl?: string;
  displayLocation: string;
  displayDate: string;
  displayTime: string;
  cardLabel: 'Current Event' | 'Upcoming Event';
  statusLabel: 'Live' | 'Upcoming' | 'Ended';
  totalAttendees?: number;
  mapsLink?: string;
  timezoneAbbreviation?: string;
}

export function mapBevyEventToEvent(bevyEvent: BevyEvent): Event {
  const start = new Date(bevyEvent.start_date);
  const end = new Date(bevyEvent.end_date);
  const now = new Date();

  // Format Display Date: e.g., "May 31, 2025"
  const displayDate = start.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Format Display Time: e.g., "9:30 AM - 12:00 PM"
  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  const displayTime = `${formatTime(start)} - ${formatTime(end)}`;

  // Determine Display Location based on Audience Type
  let displayLocation: string;
  if (bevyEvent.audience_type === 'VIRTUAL') {
    displayLocation = bevyEvent.virtual_venue_name || 'Online (Virtual)';
  } else if (bevyEvent.audience_type === 'HYBRID') {
    displayLocation = bevyEvent.venue_name
      ? `${bevyEvent.venue_name} & Online`
      : 'Hybrid Event';
  } else {
    displayLocation =
      bevyEvent.venue_name || bevyEvent.venue_address || 'In-Person Event';
  }

  // Determine Status and Card Labels
  let statusLabel: 'Live' | 'Upcoming' | 'Ended';
  const rawStatus = bevyEvent.status?.toLowerCase();

  if (rawStatus === 'completed' || rawStatus === 'past' || now > end) {
    statusLabel = 'Ended';
  } else if (
    rawStatus === 'live' ||
    rawStatus === 'active' ||
    (now >= start && now <= end)
  ) {
    statusLabel = 'Live';
  } else {
    statusLabel = 'Upcoming';
  }

  const cardLabel = statusLabel === 'Live' ? 'Current Event' : 'Upcoming Event';

  const addressParts = [
    bevyEvent.venue_address,
    bevyEvent.venue_city,
    bevyEvent.venue_state,
    bevyEvent.venue_zip_code,
  ].filter(Boolean);
  const fallbackAddress = addressParts.join(', ');
  const mapsLink =
    bevyEvent.Maps_link ||
    (fallbackAddress.trim()
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fallbackAddress)}`
      : undefined);

  return {
    id: bevyEvent.id,
    title: bevyEvent.title,
    descriptionShort: bevyEvent.description_short,
    description: bevyEvent.description,
    startDate: bevyEvent.start_date,
    endDate: bevyEvent.end_date,
    status: bevyEvent.status,
    audienceType: bevyEvent.audience_type,
    venueName: bevyEvent.venue_name,
    venueAddress: bevyEvent.venue_address,
    venueCity: bevyEvent.venue_city,
    venueState: bevyEvent.venue_state,
    venueZipCode: bevyEvent.venue_zip_code,
    virtualVenueName: bevyEvent.virtual_venue_name,
    virtualVenueLink: bevyEvent.virtual_venue_link,
    croppedBannerUrl: bevyEvent.cropped_banner_url,
    croppedPictureUrl: bevyEvent.cropped_picture_url,
    displayLocation,
    displayDate,
    displayTime,
    cardLabel,
    statusLabel,
    totalAttendees: bevyEvent.total_attendees,
    mapsLink,
    timezoneAbbreviation: bevyEvent.timezone_abbreviation,
  };
}
