import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  image: {
    position: "absolute",
    width: "100%",
    top: -50,
    left: 0,
  },
  header: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: {
    fontFamily: "Inter",
    fontWeight: "700",
    color: colors.gray_100,
    fontSize: 32,
  },
});
