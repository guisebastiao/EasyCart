import { PropsWithChildren, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { ResponseEntity } from "@/types/ResponseEntity";
import axiosInstance, { AxiosError } from "axios";
import { useRefreshToken } from "@/hooks/useAuth";

export const axios = axiosInstance.create({
  baseURL: "http://192.168.6.101:8080",
});

export const AxiosInteceptor = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, authenticate, logout, token } = useAuthContext();
  const { mutateAsync } = useRefreshToken();

  const attemptTokenRefresh = async () => {
    try {
      const refreshed = await mutateAsync({ token: token! });
      authenticate(refreshed.data.token);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ResponseEntity>) => {
        const data = error.response?.data;

        if (!data) {
          logout();
          return Promise.reject(error);
        }

        if (!data.isAuthenticated && isAuthenticated && token) {
          await attemptTokenRefresh();
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [isAuthenticated, token]);

  return <>{children}</>;
};
