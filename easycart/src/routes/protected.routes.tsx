import { createStackNavigator } from "@react-navigation/stack";
import Home from "@/pages/Home";

const Stack = createStackNavigator();

const ProtectedRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="home"
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default ProtectedRoutes;
