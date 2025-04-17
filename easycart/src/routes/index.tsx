import {
  LinkingOptions,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigationProp } from "@react-navigation/stack";
import ProtectedRoutes from "@/routes/protected.routes";
import { useAuthContext } from "@/context/AuthContext";
import PublicRoutes from "@/routes/public.routes";
import Splash from "@/components/Splash";
import { theme } from "@/styles/theme";
import { useFonts } from "expo-font";

const Stack = createStackNavigator();

export type PublicStackRoutes = {
  login: undefined;
  register: undefined;
  forgot: undefined;
  resetPassword: { token: string };
};

export type ProtectStackRoutes = {
  home: undefined;
};

export type AppRoutes = {
  Protected: NavigatorScreenParams<ProtectStackRoutes>;
  Public: NavigatorScreenParams<PublicStackRoutes>;
};

export type AppStackParamList = StackNavigationProp<AppRoutes>;

const Routes = () => {
  const { isAuthenticated } = useAuthContext();

  const [fontsLoaded] = useFonts({
    Inter: require("../../assets/font/Inter.ttf"),
  });

  if (!fontsLoaded || isAuthenticated === null) {
    return <Splash />;
  }

  const linking: LinkingOptions<AppRoutes> = {
    prefixes: [
      "com.guisebastiao.easycart://",
      "https://easycart.com",
      "easycart://",
    ],
    config: {
      screens: {
        Public: {
          screens: {
            resetPassword: "reset-password",
          },
        },
      },
    },
  };

  return (
    <NavigationContainer
      linking={linking}
      theme={theme}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "fade_from_right",
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen
            name="Protected"
            component={ProtectedRoutes}
          />
        ) : (
          <Stack.Screen
            name="Public"
            component={PublicRoutes}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
