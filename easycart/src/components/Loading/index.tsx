import { ActivityIndicator } from "react-native";
import { colors } from "@/styles/colors";

const Loading = () => {
  return (
    <ActivityIndicator
      size={20}
      color={colors.gray_100}
    />
  );
};

export default Loading;
