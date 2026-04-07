import { axios } from "@/lib/axios";
import { LoginResponse } from "@/typesorinterface/auth";

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
