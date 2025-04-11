import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryProvider } from "@/context/QueryContext";
import { AuthProvider } from "@/context/AuthContext";
import { AxiosInteceptor } from "@/api/axios";
import { colors } from "@/styles/colors";
import Toast from "@/components/Toast";
import Routes from "@/routes";

export default function App() {
  return (
    <SafeAreaProvider style={{ backgroundColor: colors.gray_600 }}>
      <AuthProvider>
        <QueryProvider>
          <AxiosInteceptor>
            <Routes />
            <Toast />
          </AxiosInteceptor>
        </QueryProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
