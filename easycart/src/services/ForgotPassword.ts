import { ResetPasswordSchema } from "@/schemas/ResetPasswordSchema";
import { ForgotPasswordSchema } from "@/schemas/ForgotPassword";
import { ResponseEntity } from "@/types/ResponseEntity";
import { axios } from "@/api/axios";
import { AxiosError } from "axios";

export const GenerateResetPassword = async (
  data: ForgotPasswordSchema
): Promise<ResponseEntity> => {
  try {
    const response = await axios.post<ResponseEntity>("/reset-password", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { message } = error.response?.data as ResponseEntity;
      throw new Error(message);
    }

    throw new Error("Ocorreu um erro inesperado");
  }
};

export const UpdatePassword = async (
  data: ResetPasswordSchema,
  token: string
): Promise<ResponseEntity> => {
  try {
    const response = await axios.put<ResponseEntity>("/reset-password", data, {
      params: {
        token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);

    if (error instanceof AxiosError) {
      const { message } = error.response?.data as ResponseEntity;
      throw new Error(message);
    }

    throw new Error("Ocorreu um erro inesperado");
  }
};
