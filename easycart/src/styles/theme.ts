import { colors } from "./colors";
import { DarkTheme } from "@react-navigation/native";

export const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme,
    background: colors.gray_600,
    card: colors.gray_200,
    text: colors.gray_100,
    border: colors.gray_300,
    primary: colors.purple,
    notification: colors.errorColor,
  },
};
