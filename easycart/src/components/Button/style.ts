import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
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
    fontSize: 16,
  },
});
