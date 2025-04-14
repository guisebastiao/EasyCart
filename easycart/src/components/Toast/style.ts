import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  toast: {
    width: "95%",
    backgroundColor: colors.gray_500,
    borderWidth: 1,
  },
  text1: {
    fontFamily: "Inter",
    fontWeight: "bold",
    color: colors.gray_100,
    fontSize: 15,
  },
  text2: {
    fontFamily: "Inter",
    fontWeight: "regular",
    color: colors.gray_200,
    fontSize: 13,
  },
  success: {
    borderTopColor: colors.gray_300,
    borderBottomColor: colors.gray_300,
    borderRightColor: colors.gray_300,
    borderLeftColor: colors.successColor,
  },
  error: {
    borderTopColor: colors.gray_300,
    borderBottomColor: colors.gray_300,
    borderRightColor: colors.gray_300,
    borderLeftColor: colors.errorColor,
  },
});
