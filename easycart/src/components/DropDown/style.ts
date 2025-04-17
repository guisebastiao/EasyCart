import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const SPACE_DROPDOWN = 40;

export const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 40,
  },
  container: {
    position: "relative",
    flexDirection: "row",
  },
  showUnit: {
    borderColor: colors.purple_light,
    borderLeftWidth: 1,
  },
  unitButton: {
    width: "100%",
    height: 40,
    paddingHorizontal: 12,
    backgroundColor: colors.gray_400,
    borderColor: colors.gray_300,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderStartColor: colors.gray_300,
    borderLeftWidth: 0,
    borderWidth: 1,
    gap: 4,
  },
  unitText: {
    fontFamily: "Inter",
    fontWeight: "500",
    color: colors.gray_200,
  },
  dropdown: {
    position: "absolute",
    left: 0,
    height: 0,
    width: "100%",
    borderRadius: 6,
    backgroundColor: colors.gray_600,
    borderColor: colors.gray_300,
    overflow: "hidden",
    borderWidth: 1,
    zIndex: 10000,
  },
  select: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  selectText: {
    fontFamily: "Inter",
    fontWeight: "500",
    color: colors.gray_200,
  },
});
