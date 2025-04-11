import { ActivityIndicator, View, StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

const PageLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={24}
        color={colors.gray_100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_600,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PageLoading;
