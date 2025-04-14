import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_600,
    alignItems: "center",
    justifyContent: "center",
  },
  splash: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
