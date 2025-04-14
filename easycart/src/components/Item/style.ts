import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  contentItem: {
    width: "100%",
    height: 68,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: colors.gray_400,
    borderColor: colors.gray_300,
    marginBottom: 5,
    borderRadius: 6,
    borderWidth: 1,
    gap: 10,
  },
  contentItemComplete: {
    backgroundColor: colors.gray_500,
  },
  contentName: {
    flex: 1,
    gap: 5,
  },
  contentText: {
    color: colors.gray_100,
    fontSize: 15,
    fontWeight: "bold",
  },
  contentTextComplete: {
    textDecorationLine: "line-through",
    color: colors.gray_200,
  },
  measurement: {
    flexDirection: "row",
    gap: 2,
  },
  measurementText: {
    fontFamily: "Inter",
    fontWeight: "600",
    color: colors.gray_200,
    fontSize: 12,
  },
  button: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
