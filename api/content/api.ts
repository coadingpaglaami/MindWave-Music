import { axios } from "@/lib/axios";
import { CreateAudioPayload } from "@/typesorinterface/content";

const path = 'admin-panel/';

export const createAudioMeditation = async (
  payload: CreateAudioPayload
)=> {
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