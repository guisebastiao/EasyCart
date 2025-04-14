import SplashIcon from "../../../assets/splash-icon.png";
import { styles } from "@/components/Splash/style";
import { Image, View } from "react-native";

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image
        source={SplashIcon}
        style={styles.splash}
      />
    </View>
  );
};

export default Splash;
