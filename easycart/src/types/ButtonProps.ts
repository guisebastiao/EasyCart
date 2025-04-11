import { TouchableOpacityProps, StyleProp, ViewStyle } from "react-native";
import { ReactNode } from "react";

export interface ButtonProps extends TouchableOpacityProps {
  type: "default" | "secondary";
  name?: string;
  icon?: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
}
