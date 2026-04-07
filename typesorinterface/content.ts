export interface CreateAudioPayload {
  title: string;
  category: number;
  duration_minutes?: number;
  description?: string;
  media_file?: File;
  status: "DRAFT" | "PUBLISHED";
}