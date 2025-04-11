export interface AuthContextProps {
  isAuthenticated: boolean | null;
  authenticate: (token: string) => void;
  token: string | null;
  logout: () => Promise<void>;
}
