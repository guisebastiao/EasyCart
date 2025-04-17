import { colors } from "@/styles/colors";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: colors.gray_600_transparent,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.gray_300,
    backgroundColor: colors.gray_600,
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter",
    fontWeight: "bold",
    color: colors.gray_100,
  },
  description: {
    fontSize: 18,
    fontFamily: "Inter",
    fontWeight: "regular",
    color: colors.gray_200,
  },
  buttons: {
    flexDirection: "row",
    paddingTop: 10,
    gap: 15,
  },
  buttonCancel: {
    backgroundColor: colors.gray_600,
  },
});
