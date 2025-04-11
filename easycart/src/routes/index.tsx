import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProtectedRoutes from "@/routes/protected.routes";
import { useAuthContext } from "@/context/AuthContext";
import PageLoading from "@/components/PageLoading";
import PublicRoutes from "@/routes/public.routes";
import { useFonts } from "expo-font";

const Stack = createStackNavigator();

const Routes = () => {
  const { isAuthenticated } = useAuthContext();

  const [fontsLoaded] = useFonts({
    Inter: require("../../assets/font/Inter.ttf"),
  });

  if (!fontsLoaded || isAuthenticated === null) {
    return <PageLoading />;
  }

  return (
    <NavigationContainer>
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
