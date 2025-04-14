import ToastDefault, { BaseToast } from "react-native-toast-message";
import { styles } from "@/components/Toast/style";

const Toast = () => {
  return (
    <ToastDefault
      visibilityTime={3000}
      position="bottom"
      bottomOffset={10}
      config={{
        success: ({ text1, text2, ...rest }) => (
          <BaseToast
            {...rest}
            style={[styles.success, styles.toast]}
            text1Style={styles.text1}
            text2Style={styles.text2}
            text1={text1}
            text2={text2}
          />
        ),
        error: ({ text1, text2, ...rest }) => (
          <BaseToast
            {...rest}
            style={[styles.error, styles.toast]}
            text1Style={styles.text1}
            text2Style={styles.text2}
            text1={text1}
            text2={text2}
          />
        ),
      }}
    />
  );
};

export default Toast;
