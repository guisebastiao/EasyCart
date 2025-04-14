import { createStackNavigator } from "@react-navigation/stack";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

const Stack = createStackNavigator();

const PublicRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade_from_right",
      }}
    >
      <Stack.Screen
        name="login"
        component={Login}
      />
      <Stack.Screen
        name="register"
        component={Register}
      />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
