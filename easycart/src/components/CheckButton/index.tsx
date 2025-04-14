import { CheckButtonProps } from "@/types/CheckButtonProps";
import { styles } from "@/components/CheckButton/style";
import { Animated, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { colors } from "@/styles/colors";

const CheckButton = ({ active, ...rest }: CheckButtonProps) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const colorAnim = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: active ? 1 : 0,
        useNativeDriver: true,
        friction: 5,
      }),
      Animated.timing(opacityAnim, {
        toValue: active ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(colorAnim, {
        toValue: active ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [active]);

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", colors.purple],
  });

  const borderColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.gray_200, colors.purple],
  });

  return (
    <Animated.View style={[styles.button, { backgroundColor, borderColor }]}>
      <Pressable
        style={styles.pressable}
        {...rest}
      >
        <Animated.View
          style={{
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <Ionicons
            name="checkmark"
            size={18}
            color={colors.gray_100}
          />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export default CheckButton;
