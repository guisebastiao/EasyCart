import ToastDefault, { BaseToast } from "react-native-toast-message";
import { colors } from "@/styles/colors";

const Toast = () => {
  return (
    <ToastDefault
      config={{
        success: ({ text1, text2, ...rest }) => (
          <BaseToast
            {...rest}
            style={{
              backgroundColor: colors.gray_500,
              borderLeftColor: colors.successColor,
            }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
              fontFamily: "Inter_400Regular",
              color: colors.gray_100,
              fontSize: 15,
              fontWeight: "bold",
            }}
            text2Style={{ color: colors.gray_200, fontSize: 13 }}
            text1={text1}
            text2={text2}
          />
        ),
        error: ({ text1, text2, ...rest }) => (
          <BaseToast
            {...rest}
            style={{
              backgroundColor: "#1F1F1F",
              borderLeftColor: colors.errorColor,
            }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
              fontFamily: "Inter_600SemiBold",
              color: colors.gray_100,
              fontSize: 15,
            }}
            text2Style={{ color: colors.gray_200, fontSize: 13 }}
            text1={text1}
            text2={text2}
          />
        ),
      }}
    />
  );
};

export default Toast;
