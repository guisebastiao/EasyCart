import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

const CLOSE_ICON_WIDTH = 100;
export const SHEET_HEIGHT = 350;
export const SHEET_OVER_DRAG = 20;

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: -30,
    width: "100%",
    height: SHEET_HEIGHT,
    backgroundColor: colors.gray_600,
    borderTopLeftRadius: 10,
    borderTopColor: colors.gray_300,
    justifyContent: "flex-start",
    borderTopRightRadius: 10,
    borderWidth: 1,
    padding: 20,
  },
  header: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 20,
  },
  title: {
    fontFamily: "Inter",
    fontWeight: "bold",
    color: colors.gray_100,
    fontSize: 20,
  },
  close: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: [{ translateX: -CLOSE_ICON_WIDTH / 2 }],
    width: CLOSE_ICON_WIDTH,
    backgroundColor: colors.gray_100,
    borderRadius: 5,
    height: 5,
  },
  button: {
    width: 34,
    height: 34,
    paddingHorizontal: 0,
    backgroundColor: colors.buttonDeleteColor,
    borderColor: colors.errorColor,
  },
  inputs: {
    justifyContent: "center",
    height: 143,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
    gap: 15,
  },
});
