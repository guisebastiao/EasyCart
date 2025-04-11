import { ButtonProps } from "@/types/ButtonProps";
import { colors } from "@/styles/colors";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

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
      {isLoading && (
        <ActivityIndicator
          size={24}
          color={colors.gray_100}
        />
      )}
      {icon && !isLoading && icon}
      {name && <Text style={styles.buttonName}>{name}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    paddingHorizontal: 15,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 6,
    borderWidth: 1,
    height: 40,
    gap: 8,
  },
  buttonDefault: {
    backgroundColor: colors.purple,
  },
  buttonSecondary: {
    borderColor: colors.gray_300,
  },
  buttonName: {
    fontFamily: "Inter",
    color: colors.gray_100,
    fontWeight: "600",
    fontSize: 18,
  },
});

export default Button;
