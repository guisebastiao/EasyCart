import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  header: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 20,
  },
  title: {
    fontFamily: "Inter",
    fontWeight: "bold",
    color: colors.gray_100,
    fontSize: 20,
  },
  close: {
    position: "absolute",
    width: 100,
    top: 0,
    left: "50%",
    transform: [{ translateX: "-50%" }],
    backgroundColor: colors.gray_100,
    borderRadius: 5,
    height: 5,
  },
  button: {
    width: 35,
    height: 35,
    paddingHorizontal: 0,
    zIndex: 1000,
  },
  inputs: {
    justifyContent: "center",
    gap: 10,
  },
  input: {
    width: "75%",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  contentRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputWrapper: {
    flex: 1,
  },
  dropdownWrapper: {
    position: "relative",
    top: 27,
    width: 72,
  },
  quantityInput: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});
