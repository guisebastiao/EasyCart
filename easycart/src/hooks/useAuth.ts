import { Login, Register, RefreshToken } from "@/services/AuthService";
import { RefreshTokenSchemaType } from "@/schemas/refreshTokenSchema";
import { RegisterSchemaType } from "@/schemas/RegisterSchema";
import { LoginSchemaType } from "@/schemas/loginSchema";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginSchemaType) => Login(data),
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        text2: error.message,
      });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterSchemaType) => Register(data),
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        text2: error.message,
      });
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: (data: RefreshTokenSchemaType) => RefreshToken(data),
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        text2: error.message,
      });
    },
  });
};
