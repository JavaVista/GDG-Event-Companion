export interface ActiveChapter {
  id: number;
  name: string;
  slug?: string;
  url?: string;
  city?: string;
  country?: string;
}

export interface BevyApiChapterResult {
  id?: number;
  objectID?: string;
  title?: string;
  city?: string;
  state?: string;
  country?: string;
  country_code?: string;
  chapter_location?: string;
  url?: string;
  logo?: string;
  picture?: {
    url?: string;
  };
  member_count?: number;
}

export interface BevyApiChapterSearchResponse {
  count: number;
  results: BevyApiChapterResult[];
  links?: {
    next: string | null;
    previous: string | null;
  };
}
