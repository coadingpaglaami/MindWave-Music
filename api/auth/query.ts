import { LoginResponse } from "@/typesorinterface/auth";
import { useMutation } from "@tanstack/react-query";
import { Login } from "./api";

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

