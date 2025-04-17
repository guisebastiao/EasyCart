import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: colors.gray_600,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    flex: 1,
    gap: 10,
  },
  image: {
    position: "absolute",
    top: -50,
    left: 0,
    width: "100%",
  },
  title: {
    fontFamily: "Inter",
    fontWeight: "700",
    color: colors.gray_100,
    fontSize: 32,
    textAlign: "left",
  },
  inputs: {
    width: "100%",
    paddingVertical: 40,
    gap: 10,
  },
  buttons: {
    width: "100%",
    gap: 15,
  },
  forgot: {
    width: "100%",
    paddingVertical: 20,
  },
  forgotText: {
    fontFamily: "Inter",
    fontWeight: "400",
    textDecorationLine: "underline",
    color: colors.gray_200,
    textAlign: "center",
    fontSize: 16,
  },
  button: {
    width: "100%",
  },
});
