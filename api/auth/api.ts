import { axios } from "@/lib/axios";
import {
  LoginResponse,
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
