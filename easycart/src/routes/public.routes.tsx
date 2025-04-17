import { createStackNavigator } from "@react-navigation/stack";
import ResetPassword from "@/pages/ResetPassword";
import Register from "@/pages/Register";
import Forgot from "@/pages/Forgot";
import Login from "@/pages/Login";

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
      <Stack.Screen
        name="forgot"
        component={Forgot}
      />
      <Stack.Screen
        name="resetPassword"
        component={ResetPassword}
      />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
