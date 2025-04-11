import { RefreshTokenSchemaType } from "@/schemas/refreshTokenSchema";
import { RegisterSchemaType } from "@/schemas/RegisterSchema";
import { LoginSchemaType } from "@/schemas/loginSchema";
import { axios } from "@/api/axios";
import { AxiosError } from "axios";

export const Login = async (
  data: LoginSchemaType
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

    throw new Error("An unexpected error occurred");
  }
};

export const Register = async (
  data: RegisterSchemaType
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

    throw new Error("An unexpected error occurred");
  }
};

export const RefreshToken = async (
  data: RefreshTokenSchemaType
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

    throw new Error("An unexpected error occurred");
  }
};
