import { CreateAudioPayload } from "@/typesorinterface/content";
import { useMutation } from "@tanstack/react-query";
import { createAudioMeditation } from "./api";

export const useCreateAudioMeditationMutation = () => {
  return useMutation({
    mutationFn: (payload: CreateAudioPayload) => createAudioMeditation(payload),
  });
};
