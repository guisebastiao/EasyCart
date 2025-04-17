import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  form: {
    width: "100%",
    paddingVertical: 20,
    gap: 12,
  },
  button: {
    position: "relative",
    top: 24.5,
    width: 45,
    height: 45,
    borderRadius: "50%",
    paddingHorizontal: 0,
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
    marginRight: 12,
  },
  quantityInput: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});
