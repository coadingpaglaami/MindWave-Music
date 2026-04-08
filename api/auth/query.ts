import { LoginResponse } from "@/typesorinterface/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getDashboardStats,
  getUsers,
  getUserSummary,
  Login,
  toggleUserStatus,
  UserParams,
} from "./api";

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<LoginResponse> => Login(email, password),
  });
};

export const useGetUsersQuery = (params: UserParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  });
};

export const useGetUserSummaryQuery = () => {
  return useQuery({
    queryKey: ["userSummary"],
    queryFn: () => getUserSummary(),
  });
};

export const useToggleUserStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["toggleUserStatus"],
    mutationFn: (userId: number) => toggleUserStatus(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useGetDashboardStatsQuery = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: () => getDashboardStats(),
  });
}