import { Login, Register, RefreshToken } from "@/services/AuthService";
import { RefreshTokenSchema } from "@/schemas/RefreshTokenSchema";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { LoginSchema } from "@/schemas/LoginSchema";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginSchema) => Login(data),
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: "Algo deu errado",
        text2: error.message,
      });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterSchema) => Register(data),
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: "Algo deu errado",
        text2: error.message,
      });
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: (data: RefreshTokenSchema) => RefreshToken(data),
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: "Algo deu errado",
        text2: error.message,
      });
    },
  });
};
