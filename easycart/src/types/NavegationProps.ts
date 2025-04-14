import { StackNavigationProp } from "@react-navigation/stack";

type ParamList = {
  login: undefined;
  register: undefined;
  home: undefined;
};

export type AppStackParamList = StackNavigationProp<ParamList>;
