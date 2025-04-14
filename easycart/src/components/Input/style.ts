import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
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
