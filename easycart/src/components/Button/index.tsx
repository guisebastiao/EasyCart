import { TouchableOpacity, Text } from "react-native";
import { styles } from "@/components/Button/style";
import { ButtonProps } from "@/types/ButtonProps";
import Loading from "@/components/Loading";

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
