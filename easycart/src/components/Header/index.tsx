import { useAuthContext } from "@/context/AuthContext";
import imgHeader from "../../../assets/img-header.png";
import { styles } from "@/components/Header/style";
import { Image, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";
import { colors } from "@/styles/colors";

const Header = () => {
  const { logout } = useAuthContext();

  return (
    <>
      <Image
        style={styles.image}
        source={imgHeader}
        resizeMode="contain"
      />
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Compras</Text>
        <Button
          type="secondary"
          icon={
            <Ionicons
              name="log-out-outline"
              size={18}
              color={colors.errorColor}
            />
          }
          style={styles.button}
          onPress={() => logout()}
        />
      </View>
    </>
  );
};

export default Header;
