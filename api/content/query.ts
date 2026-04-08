import { CreateAudioPayload } from "@/typesorinterface/content";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAffirmation,
  createAudioMeditation,
  createCategory,
  createMusic,
  deleteAffirmation,
  deleteAudioMeditation,
  deleteMusic,
  editAffirmation,
  editAudioMeditation,
  editMusic,
  getAffirmations,
  getAffirmationSummary,
  getCategories,
  getMeditation,
  getMeditationSummary,
  getMusic,
  getMusicSummary,
  MusicParam,
} from "./api";

export const useCreateAudioMeditationMutation = () => {
  return useMutation({
    mutationFn: (payload: CreateAudioPayload) => createAudioMeditation(payload),
  });
};

export const useGetMeditationQuery = (params: MusicParam) => {
  return useQuery({
    queryKey: ["meditations", params],
    queryFn: () => getMeditation(params),
  });
};

export const useEditMeditationMutation = () => {
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: CreateAudioPayload;
    }) => editAudioMeditation(id, payload),
  });
};

export const useDeleteMeditationMutation = () => {
  return useMutation({
    mutationFn: (id: number) => deleteAudioMeditation(id),
  });
}

export const useGetMeditationSummaryQuery = () => {
  return useQuery({
    queryKey: ["meditationSummary"],
    queryFn: () => getMeditationSummary(),
  });
};
// MUSIC//
export const useMusicMutation = () => {
  return useMutation({
    mutationFn: (payload: CreateAudioPayload) => createMusic(payload),
  });
};

export const useGetMusicQuery = (params: MusicParam) => {
  return useQuery({
    queryKey: ["music", params],
    queryFn: () => getMusic(params),
  });
};

export const useEditMusicMutation = () => {
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: CreateAudioPayload;
    }) => editMusic(id, payload),
  });
};

export const useDeleteMusicMutation = () => {
  return useMutation({
    mutationFn: (id: number) => deleteMusic(id),
  });
}

export const useGetMusicSummaryQuery = () => {
  return useQuery({
    queryKey: ["musicSummary"],
    queryFn: () => getMusicSummary(),
  });
};

export const useCreateCategoryMutation = () => {
  return useMutation({
    mutationFn: (name: string) => createCategory(name),
  });
};

// AFFIRMATIONS //
export const useCreateAffirmationMutation = () => {
  const { invalidateQueries } = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateAudioPayload) => createAffirmation(payload),
    onSuccess: () => {
      invalidateQueries({ queryKey: ["affirmations"] });
    }
  });
}

export const useGetAffirmationQuery = (params: MusicParam) => {
  return useQuery({
    queryKey: ["affirmations", params],
    queryFn: () => getAffirmations(params),
  });
}

export const useEditAffirmationMutation = () => {
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: CreateAudioPayload;
    }) => editAffirmation(id, payload),
  });
}

export const useDeleteAffirmationMutation = () => {
  return useMutation({
    mutationFn: (id: number) => deleteAffirmation(id),
  });
}

export const useGetAffirmationSummaryQuery = () => {
  return useQuery({
    queryKey: ["affirmationSummary"],
    queryFn: () => getAffirmationSummary(),
  });
}

// CATEGORIES //

export const useGetCategoriesQuery = () => {
  const query = useInfiniteQuery({
    queryKey: ["categories"],
    queryFn: ({ pageParam = 1 }) => getCategories(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination.next) return undefined;

      const url = new URL(lastPage.pagination.next);
      return Number(url.searchParams.get("page"));
    },
  });

  const categegories = query.data?.pages.flatMap((p) => p.data.results) ?? [];
  return { ...query, categegories };
};
