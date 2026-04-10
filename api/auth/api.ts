import { axios } from "@/lib/axios";
import {
  AdminProfileResponse,
  AdminProfileUpdatePayload,
  LoginResponse,
  UpdateAdminPasswordPayload,
  UsersListData,
  UserStatsResponse,
} from "@/typesorinterface/auth";
import { DashboardResponse } from "@/typesorinterface/dashboard";
import { PaginatedApiResponse } from "@/typesorinterface/pagination";

export interface UserParams {
  page?: number;
  search?: string;
  isActive?: boolean;
}

const admin_panel = "admin-panel/";
export const Login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const { data } = await axios.post("accounts/admin-auth/login/", {
    email,
    password,
  });
  return data;
};

export const getUsers = async (
  params: UserParams,
): Promise<PaginatedApiResponse<UsersListData>> => {
  const { data } = await axios.get("admin-panel/users/", { params });
  return data;
};

export const getUserSummary = async (): Promise<UserStatsResponse> => {
  const { data } = await axios.get("admin-panel/users/summary_stats/");
  return data;
};

export const toggleUserStatus = async (userId: number) => {
  await axios.post(`${admin_panel}users/${userId}/toggle_status/`);
};

export const getDashboardStats = async (): Promise<DashboardResponse> => {
  const { data } = await axios.get(`${admin_panel}dashboard/`);
  return data;
};

export const getAdminProfile = async (): Promise<AdminProfileResponse> => {
  const { data } = await axios.get(`${admin_panel}profile/`);
  return data;
};

export const updateAdminProfile = async (
  payload: Partial<AdminProfileUpdatePayload>,
) => {
  const { data } = await axios.patch(`${admin_panel}profile/`, payload);
  return data;
};

export const AdminPasswordChange = async (
  payload: UpdateAdminPasswordPayload,
) => {
  const { data } = await axios.post(`accounts/update-password/`, payload);
  return data;
};

export const useLogOut = async () => {
  const { data } = await axios.post(`${admin_panel}profile/logout-all/`);
  return data;
}