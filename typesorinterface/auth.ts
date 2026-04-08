export interface LoginUser {
  email: string;
  name: string;
  role: string;
}

export interface LoginData {
  refresh: string;
  access: string;
  user: LoginUser;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginData;
//   errors: any | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  created_at: string;
  account_type: string;
  streak: number;
  sessions: number;
}

export interface UsersListData {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
}

export interface UserStats {
  total_users: number;
  active_users: number;
  premium_users: number;
  new_this_month: number;
}

export interface UserStatsResponse {
  success: boolean;
  message: string;
  data: UserStats;
  errors: null;
}