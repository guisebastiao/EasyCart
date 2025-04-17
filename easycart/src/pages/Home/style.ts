import { Dimensions, StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

const DIMENSIONS = Dimensions.get("window");
const HEIGHT_CONTENT = DIMENSIONS.height - 273;

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.gray_600,
  },
  container: {
    position: "relative",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    flex: 1,
    gap: 10,
  },
  content: {
    width: "100%",
    height: HEIGHT_CONTENT,
    paddingBottom: 5,
  },
});
