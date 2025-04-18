import "reflect-metadata";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { QueryProvider } from "@/context/QueryContext";
import { AuthProvider } from "@/context/AuthContext";
import { AxiosInteceptor } from "@/api/axios";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/styles/colors";
import Toast from "@/components/Toast";
import Routes from "@/routes";

export default function App() {
  return (
    <SafeAreaProvider style={{ backgroundColor: colors.gray_600 }}>
      <GestureHandlerRootView>
        <PaperProvider>
          <QueryProvider>
            <AuthProvider>
              <AxiosInteceptor>
                <StatusBar translucent={true} />
                <Routes />
                <Toast />
              </AxiosInteceptor>
            </AuthProvider>
          </QueryProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
