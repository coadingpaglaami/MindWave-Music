export interface CreateAudioPayload {
  title: string;
  category: number;
  duration_minutes?: number;
  description?: string;
  subtitle?: string;
  affirmation_text?: string;
  media_file?: File;
  status: "DRAFT" | "PUBLISHED";
}

export interface CategoryItem {
  id: number;
  name: string;
  slug: string;
}

export interface CategoryListData {
  count: number;
  next: string | null;
  previous: string | null;
  results: CategoryItem[];
}

export interface MeditationItem {
  id: number;
  title: string;
  category: CategoryItem;
  duration_minutes: number;
  description: string;
  subtitle?: string;
  media_file: string;
  audio_file?: string;
  author_or_source?: string;
  favourites_count?: number;
  text?: string;
  status: "PUBLISHED" | "DRAFT" | string;
  plays_count: number;
}

export interface MeditationListData {
  count: number;
  next: string | null;
  previous: string | null;
  results: MeditationItem[];
}

export interface MeditationSummary {
  total_items: number;
  published_items: number;
  total_plays: number;
  avg_plays_per_item: number;
  total_favorites?: number;
  most_favorite_affirmation?: string;
}

export interface MeditationSummaryResponse {
  success: boolean;
  message: string;
  data: MeditationSummary;
  errors: null;
}