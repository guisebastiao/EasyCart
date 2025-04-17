import { ResetPasswordSchema } from "@/schemas/ResetPasswordSchema";
import { ForgotPasswordSchema } from "@/schemas/ForgotPassword";
import { ResponseEntity } from "@/types/ResponseEntity";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import {
  GenerateResetPassword,
  UpdatePassword,
} from "@/services/ForgotPassword";

export const useGenerateResetPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordSchema) => {
      return GenerateResetPassword(data);
    },
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: "Algo deu errado",
        text2: error.message,
      });
    },
    onSuccess: (data: ResponseEntity) => {
      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: data.message,
      });
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({
      data,
      token,
    }: {
      data: ResetPasswordSchema;
      token: string;
    }) => {
      return UpdatePassword(data, token);
    },
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: "Algo deu errado",
        text2: error.message,
      });
    },
    onSuccess: (data: ResponseEntity) => {
      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: data.message,
      });
    },
  });
};
