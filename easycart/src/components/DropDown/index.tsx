import { styles, SPACE_DROPDOWN } from "@/components/DropDown/style";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { colors } from "@/styles/colors";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";

interface DropDownProps {
  dropDownUp?: boolean;
  values: string[];
  value: string;
  setValue: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

const DropDown = ({
  dropDownUp = false,
  values,
  value,
  setValue,
}: DropDownProps) => {
  const [showUnits, setShowUnits] = useState(false);

  const animatedHeight = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleHeight = () => {
    const toHeight = showUnits ? 0 : values.length * 40;
    const toRotation = showUnits ? 0 : 1;

    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: toHeight,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(rotateAnim, {
        toValue: toRotation,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();

    setShowUnits(!showUnits);
  };

  const handleSelectUnit = (item: string) => {
    setValue(item);

    Animated.timing(animatedHeight, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      setShowUnits(false);
    });
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: dropDownUp ? ["180deg", "0deg"] : ["0deg", "180deg"],
  });

  const dropdownOpacity = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={toggleHeight}
        style={[styles.unitButton, showUnits && styles.showUnit]}
      >
        <Text style={styles.unitText}>{value}</Text>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <Ionicons
            name="chevron-down"
            size={16}
            color={colors.gray_200}
          />
        </Animated.View>
      </Pressable>
      <Animated.View
        style={[
          styles.dropdown,
          {
            height: animatedHeight,
            opacity: dropdownOpacity,
            ...(dropDownUp
              ? { bottom: SPACE_DROPDOWN }
              : { top: SPACE_DROPDOWN }),
          },
        ]}
      >
        {values.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.select,
              value === item && { backgroundColor: colors.gray_300 },
            ]}
            onPress={() => handleSelectUnit(item)}
          >
            <Text style={styles.selectText}>{item}</Text>
            {item === value && (
              <Ionicons
                name="checkmark-outline"
                size={16}
                color={colors.purple_light}
              />
            )}
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};

export default DropDown;
