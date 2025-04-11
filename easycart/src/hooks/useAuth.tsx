import { Login, Register, RefreshToken } from "@/services/AuthService";
import { RefreshTokenSchemaType } from "@/schemas/refreshTokenSchema";
import { RegisterSchemaType } from "@/schemas/RegisterSchema";
import { LoginSchemaType } from "@/schemas/loginSchema";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const login = () => {
  return useMutation({
    mutationFn: (data: LoginSchemaType) => Login(data),
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: error.message,
        text2: "Something went wrong",
      });
    },
  });
};

export const register = () => {
  return useMutation({
    mutationFn: (data: RegisterSchemaType) => Register(data),
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: error.message,
        text2: "Something went wrong",
      });
    },
  });
};

export const refreshToken = () => {
  return useMutation({
    mutationFn: (data: RefreshTokenSchemaType) => RefreshToken(data),
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: error.message,
        text2: "Something went wrong",
      });
    },
  });
};
