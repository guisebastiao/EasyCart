import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 20,
  },
  title: {
    fontFamily: "Inter",
    fontSize: 24,
    color: colors.gray_100,
    fontWeight: "bold",
  },
  form: {
    width: "100%",
    gap: 10,
  },
  button: {
    width: "100%",
  },
});
