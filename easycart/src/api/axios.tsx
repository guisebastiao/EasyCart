import { PropsWithChildren, useEffect } from "react";
import axiosInstance, { AxiosError, AxiosResponse } from "axios";
import { refreshToken } from "@/hooks/useAuth";

import { useAuthContext } from "@/context/AuthContext";

export const axios = axiosInstance.create({
  baseURL: "http://192.168.6.101:8080",
});

export const AxiosInteceptor = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, authenticate, logout, token } = useAuthContext();

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

        console.log(data, isAuthenticated, token);

        if (!data.isAuthenticated && isAuthenticated && token) {
          try {
            const { mutateAsync } = refreshToken();
            const refreshed = await mutateAsync({ token });
            console.log(refreshed);
            authenticate(refreshed.data.token);
          } catch (err) {
            logout();
            return Promise.reject(err);
          }
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
