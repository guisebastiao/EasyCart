import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  label: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 15,
    color: colors.gray_200,
    marginBottom: 8,
  },
  container: {
    position: "relative",
    flexDirection: "row",
  },
  input: {
    width: "80%",
    fontFamily: "Inter_400Regular",
    color: colors.gray_100,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.gray_500,
    borderColor: colors.gray_300,
    borderWidth: 1,
  },
  unitButton: {
    width: "20%",
    paddingHorizontal: 12,
    backgroundColor: colors.gray_500,
    borderColor: colors.gray_300,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    // top: 72,
    right: 0,
    height: 0,
    width: "20%",
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
  error: {
    color: colors.errorColor,
    marginTop: 5,
    fontSize: 15,
    paddingLeft: 5,
  },
});
