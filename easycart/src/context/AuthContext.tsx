import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContextProps } from "@/types/AuthContextProps";
import {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const checkAuthStatus = async () => {
    const token = await AsyncStorage.getItem("@auth_token");
    token ? setAuthenticated(true) : setAuthenticated(false);
    setToken(token);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("@auth_token");
    setAuthenticated(false);
  };

  const authenticate = async (token: string) => {
    await AsyncStorage.setItem("@auth_token", token);
    setAuthenticated(true);
    setToken(token);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, authenticate, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro de um AuthProvider");
  }
  return context;
};
