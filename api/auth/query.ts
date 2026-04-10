import {
  AdminProfileUpdatePayload,
  LoginResponse,
  UpdateAdminPasswordPayload,
} from "@/typesorinterface/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AdminPasswordChange,
  getAdminProfile,
  getDashboardStats,
  getUsers,
  getUserSummary,
  Login,
  toggleUserStatus,
  updateAdminProfile,
  useLogOut as logOut,
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
};

export const useGetAdminProfileQuery = () => {
  return useQuery({
    queryKey: ["adminProfile"],
    queryFn: () => getAdminProfile(),
  });
};

export const useUpdateAdminProfileMutation = () => {
  return useMutation({
    mutationKey: ["updateAdminProfile"],
    mutationFn: (payload: Partial<AdminProfileUpdatePayload>) =>
      updateAdminProfile(payload),
  });
};

export const useAdminPasswordChangeMutation = () => {
  return useMutation({
    mutationKey: ["adminPasswordChange"],
    mutationFn: (payload: UpdateAdminPasswordPayload) =>
      AdminPasswordChange(payload),
  });
}

export const useAdminLogOutAllDevicesMutation = () => {
  return useMutation({
    mutationKey: ["adminLogOutAllDevices"],
    mutationFn: () => logOut(),
  });
}