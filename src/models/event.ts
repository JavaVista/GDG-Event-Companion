import type { BevyEvent } from './bevy-event';

export interface Event {
  id: string;
  title: string;
  descriptionShort: string;
  startDate: string;
  endDate: string;
  status: string;
  audienceType: 'IN_PERSON' | 'VIRTUAL' | 'HYBRID';
  venueName?: string;
  venueAddress?: string;
  virtualVenueName?: string;
  virtualVenueLink?: string;
  displayLocation: string;
  displayDate: string;
  displayTime: string;
  cardLabel: 'Current Event' | 'Upcoming Event';
  statusLabel: 'Live' | 'Upcoming' | 'Ended';
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

  return {
    id: bevyEvent.id,
    title: bevyEvent.title,
    descriptionShort: bevyEvent.description_short,
    startDate: bevyEvent.start_date,
    endDate: bevyEvent.end_date,
    status: bevyEvent.status,
    audienceType: bevyEvent.audience_type,
    venueName: bevyEvent.venue_name,
    venueAddress: bevyEvent.venue_address,
    virtualVenueName: bevyEvent.virtual_venue_name,
    virtualVenueLink: bevyEvent.virtual_venue_link,
    displayLocation,
    displayDate,
    displayTime,
    cardLabel,
    statusLabel,
  };
}
