import { axios } from "@/lib/axios";
import {
  CategoryListData,
  CreateAudioPayload,
  MeditationListData,
  MeditationSummaryResponse,
} from "@/typesorinterface/content";
import { PaginatedApiResponse } from "@/typesorinterface/pagination";

export interface MusicParam {
  page?: number;
  search?: string;
}

const path = "admin-panel/";

export const createAudioMeditation = async (payload: CreateAudioPayload) => {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("category", String(payload.category));

  if (payload.duration_minutes) {
    formData.append("duration_minutes", String(payload.duration_minutes));
  }

  if (payload.description) {
    formData.append("description", payload.description);
  }

  if (payload.media_file) {
    formData.append("media_file", payload.media_file);
  }

  formData.append("status", payload.status);

  const { data } = await axios.post(`${path}meditations/`, formData);

  return data;
};

export const getMeditation = async (
  params: MusicParam,
): Promise<PaginatedApiResponse<MeditationListData>> => {
  const { data } = await axios.get(`${path}meditations/`, { params });
  return data;
};

export const editAudioMeditation = async (
  id: number,
  payload: CreateAudioPayload,
) => {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("category", String(payload.category));
  formData.append("duration_minutes", String(payload.duration_minutes));
  if (payload.description) {
    formData.append("description", payload.description);
  }
  if (payload.media_file) {
    formData.append("media_file", payload.media_file);
  }
  formData.append("status", payload.status);

  const { data } = await axios.patch(`${path}meditations/${id}/`, formData);
  return data;
};

export const getMeditationSummary =
  async (): Promise<MeditationSummaryResponse> => {
    const { data } = await axios.get(`${path}meditations/summary_stats/`);
    return data;
  };
// Music //

export const createMusic = async (payload: CreateAudioPayload) => {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("category", String(payload.category));
  if (payload.duration_minutes) {
    formData.append("duration_minutes", String(payload.duration_minutes));
  }
  if (payload.subtitle) {
    formData.append("subtitle", payload.subtitle);
  }
  if (payload.media_file) {
    formData.append("media_file", payload.media_file);
  }
  formData.append("status", payload.status);

  const { data } = await axios.post(`${path}music/`, formData);
  return data;
};
export const createCategory = async (name: string) => {
  const { data } = await axios.post(`${path}categories/`, { name });
  return data;
};

export const getMusic = async (
  params: MusicParam,
): Promise<PaginatedApiResponse<MeditationListData>> => {
  const { data } = await axios.get(`${path}music/`, { params });
  return data;
};

export const editMusic = async (id: number, payload: CreateAudioPayload) => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("category", String(payload.category));
  formData.append("duration_minutes", String(payload.duration_minutes));
  if (payload.subtitle) {
    formData.append("subtitle", payload.subtitle);
  }
  if (payload.media_file) {
    formData.append("media_file", payload.media_file);
  }
  formData.append("status", payload.status);

  const { data } = await axios.patch(`${path}music/${id}/`, formData);
  return data;
};

export const getMusicSummary = async (): Promise<MeditationSummaryResponse> => {
  const { data } = await axios.get(`${path}music/summary_stats/`);
  return data;
};

// Affirmation //
export const createAffirmation = async (payload: CreateAudioPayload) => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("category", String(payload.category));
  if (payload.media_file) {
    formData.append("media_file", payload.media_file);
  }
  if (payload.affirmation_text) {
    formData.append("text", payload.affirmation_text);
  }
  if (payload.subtitle) {
    formData.append("author_or_source", payload.subtitle);
  }
  formData.append("status", payload.status);

  const { data } = await axios.post(`${path}affirmations/`, formData);
  return data;
};

export const getAffirmations = async (
  params: MusicParam,
): Promise<PaginatedApiResponse<MeditationListData>> => {
  const { data } = await axios.get(`${path}affirmations/`, { params });
  return data;
};

export const editAffirmation = async (
  id: number,
  payload: CreateAudioPayload,
) => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("category", String(payload.category));
  if (payload.media_file) {
    formData.append("media_file", payload.media_file);
  }
  if (payload.affirmation_text) {
    formData.append("text", payload.affirmation_text);
  }
  if (payload.subtitle) {
    formData.append("author_or_source", payload.subtitle);
  }
  formData.append("status", payload.status);

  const { data } = await axios.patch(`${path}affirmations/${id}/`, formData);
  return data;
};

export const getCategories = async (
  pageParam: number = 1,
): Promise<PaginatedApiResponse<CategoryListData>> => {
  const { data } = await axios.get(`${path}categories/?page=${pageParam}`);
  return data;
};
