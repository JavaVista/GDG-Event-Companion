export interface BevyEvent {
  id: string;
  status: string;
  title: string;
  description_short: string;
  description?: string;
  start_date: string; // ISO date-time string
  end_date: string; // ISO date-time string
  audience_type: 'IN_PERSON' | 'VIRTUAL' | 'HYBRID';
  venue_name?: string;
  venue_address?: string;
  venue_city?: string;
  venue_state?: string;
  venue_zip_code?: string;
  virtual_venue_name?: string;
  virtual_venue_link?: string;
  attendee_virtual_venue_link?: string;
  cropped_banner_url?: string;
  cropped_picture_url?: string;
  total_attendees?: number;
  Maps_link?: string;
  timezone_abbreviation?: string;
}
