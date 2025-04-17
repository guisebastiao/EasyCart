import { styles } from "@/components/Button/style";
import Loading from "@/components/Loading";
import { ReactNode } from "react";
import {
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Text,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  type: "default" | "secondary";
  name?: string;
  icon?: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Button = ({
  type,
  name,
  icon,
  isDisabled = false,
  isLoading,
  style,
  ...rest
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "default" ? styles.buttonDefault : styles.buttonSecondary,
        style,
      ]}
      disabled={isDisabled || isLoading}
      activeOpacity={0.7}
      {...rest}
    >
      {isLoading && <Loading />}
      {icon && !isLoading && icon}
      {name && <Text style={styles.buttonName}>{name}</Text>}
    </TouchableOpacity>
  );
};

export default Button;
