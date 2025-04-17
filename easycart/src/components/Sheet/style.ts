import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const SHEET_HEIGHT = 380;
export const SHEET_OVER_DRAG = 20;

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: -30,
    width: "100%",
    height: SHEET_HEIGHT,
    backgroundColor: colors.gray_500,
    justifyContent: "flex-start",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
});
