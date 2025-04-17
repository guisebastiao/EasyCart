import { RefreshTokenSchema } from "@/schemas/RefreshTokenSchema";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { LoginSchema } from "@/schemas/LoginSchema";
import { ResponseEntity } from "@/types/ResponseEntity";
import { AuthResponse } from "@/types/AuthResponse";
import { axios } from "@/api/axios";
import { AxiosError } from "axios";

export const Login = async (
  data: LoginSchema
): Promise<ResponseEntity<AuthResponse>> => {
  try {
    const response = await axios.post<ResponseEntity<AuthResponse>>(
      "/auth/login",
      data
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { message } = error.response?.data as ResponseEntity;
      throw new Error(message);
    }

    throw new Error("Ocorreu um erro inesperado");
  }
};

export const Register = async (
  data: RegisterSchema
): Promise<ResponseEntity<AuthResponse>> => {
  try {
    const response = await axios.post<ResponseEntity<AuthResponse>>(
      "/auth/register",
      data
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { message } = error.response?.data as ResponseEntity;
      throw new Error(message);
    }

    throw new Error("Ocorreu um erro inesperado");
  }
};

export const RefreshToken = async (
  data: RefreshTokenSchema
): Promise<ResponseEntity<AuthResponse>> => {
  try {
    const response = await axios.post<ResponseEntity<AuthResponse>>(
      "/auth/refresh-token",
      data
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { message } = error.response?.data as ResponseEntity;
      throw new Error(message);
    }

    throw new Error("Ocorreu um erro inesperado");
  }
};
