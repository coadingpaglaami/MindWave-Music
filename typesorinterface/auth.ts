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