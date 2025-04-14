import { View, TextInput, Text, Pressable } from "react-native";
import { styles } from "@/components/Input/style";
import { InputProps } from "@/types/InputProps";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { useState } from "react";

const Input = ({ type, name, msgError, ...rest }: InputProps) => {
  const [isVisible, setVisible] = useState(type === "password" ? true : false);
  const [isFocused, setFocused] = useState(false);

  const handleVisible = () => {
    setVisible(!isVisible);
  };

  return (
    <View style={styles.content}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.contentInput}>
        <TextInput
          style={[
            styles.input,
            msgError && { borderColor: colors.errorColor },
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
      {msgError && <Text style={styles.error}>{msgError.message}</Text>}
    </View>
  );
};

export default Input;
