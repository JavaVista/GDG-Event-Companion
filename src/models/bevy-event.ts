export interface BevyEvent {
  id: string;
  status: string;
  title: string;
  description_short: string;
  start_date: string; // ISO date-time string
  end_date: string; // ISO date-time string
  audience_type: 'IN_PERSON' | 'VIRTUAL' | 'HYBRID';
  venue_name?: string;
  venue_address?: string;
  virtual_venue_name?: string;
  virtual_venue_link?: string;
}
