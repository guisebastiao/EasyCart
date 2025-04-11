import { View, TextInput, StyleSheet, Text, Pressable } from "react-native";
import { InputProps } from "@/types/InputProps";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { useState } from "react";

const Input = ({ type, name, msg, ...rest }: InputProps) => {
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
            msg && { borderColor: colors.errorColor },
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
      {msg && <Text style={styles.error}>{msg.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    width: "100%",
  },
  contentInput: {
    position: "relative",
  },
  buttonVisibility: {
    position: "absolute",
    justifyContent: "center",
    height: "100%",
    right: 15,
  },
  name: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 15,
    color: colors.gray_200,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 40,
    fontFamily: "Inter",
    fontWeight: "400",
    backgroundColor: colors.gray_500,
    borderColor: colors.gray_300,
    color: colors.gray_100,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  error: {
    color: colors.errorColor,
    marginTop: 5,
    fontSize: 15,
    paddingLeft: 5,
  },
});

export default Input;
