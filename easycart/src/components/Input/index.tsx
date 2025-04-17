import { styles } from "@/components/Input/style";
import { Ionicons } from "@expo/vector-icons";
import { FieldError } from "react-hook-form";
import { colors } from "@/styles/colors";
import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from "react-native";

interface InputProps extends TextInputProps {
  type: "text" | "password";
  fieldError?: FieldError;
  label: string;
  style?: StyleProp<ViewStyle>;
}

const Input = ({ type, label, fieldError, style, ...rest }: InputProps) => {
  const [isVisible, setVisible] = useState(type === "password" ? true : false);
  const [isFocused, setFocused] = useState(false);

  const handleVisible = () => {
    setVisible(!isVisible);
  };

  return (
    <View style={styles.content}>
      <Text style={styles.name}>{label}</Text>
      <View style={styles.contentInput}>
        <TextInput
          style={[
            styles.input,
            style,
            fieldError && { borderColor: colors.errorColor },
            isFocused && { borderColor: colors.purple_light },
          ]}
          secureTextEntry={isVisible}
          placeholderTextColor={colors.placeholderColor}
          cursorColor={colors.gray_200}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoCapitalize="none"
          {...rest}
        />
        {type === "password" && (
          <Pressable
            style={styles.buttonVisibility}
            onPress={handleVisible}
          >
            {isVisible ? (
              <Ionicons
                name="eye-outline"
                size={20}
                color={colors.gray_200}
              />
            ) : (
              <Ionicons
                name="eye-off-outline"
                size={20}
                color={colors.gray_200}
              />
            )}
          </Pressable>
        )}
      </View>
      {fieldError && <Text style={styles.error}>{fieldError.message}</Text>}
    </View>
  );
};

export default Input;
