import { QuantityInputProps } from "@/types/QuantityInputProps";
import { styles } from "@/components/QuantityInput/style";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { colors } from "@/styles/colors";
import { Units } from "@/types/Units";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";

const units = Object.keys(Units);

export const QuantityInput = ({
  quantity,
  unit,
  onChangeQuantity,
  onChangeUnit,
  msgError,
  dropDownUp = false,
  ...rest
}: QuantityInputProps) => {
  const [showUnits, setShowUnits] = useState(false);
  const [isFocused, setFocused] = useState(false);

  const animatedHeight = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleHeight = () => {
    const toHeight = showUnits ? 0 : units.length * 40;
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

  const handleSelectUnit = (item: Units) => {
    onChangeUnit(item);

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
      <Text style={styles.label}>Quantidade</Text>
      <View style={styles.container}>
        <TextInput
          style={[
            styles.input,
            isFocused && { borderColor: colors.purple_light },
          ]}
          keyboardType="decimal-pad"
          value={String(quantity)}
          cursorColor={colors.gray_100}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChangeText={(e) => onChangeQuantity(Number(e))}
          {...rest}
        />
        <Pressable
          onPress={toggleHeight}
          style={[
            styles.unitButton,
            showUnits && {
              borderColor: colors.purple_light,
              borderLeftWidth: 1,
            },
          ]}
        >
          <Text style={styles.unitText}>{Units[unit]}</Text>
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <Ionicons
              name="chevron-down"
              size={16}
              color={colors.gray_200}
            />
          </Animated.View>
        </Pressable>
      </View>
      {msgError && <Text style={styles.error}>{msgError.message}</Text>}
      <Animated.View
        style={[
          styles.dropdown,
          {
            height: animatedHeight,
            opacity: dropdownOpacity,
            ...(dropDownUp ? { bottom: 44 } : { top: 72 }),
          },
        ]}
      >
        {units.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.select,
              unit === item && { backgroundColor: colors.gray_300 },
            ]}
            onPress={() => handleSelectUnit(item as Units)}
          >
            <Text style={styles.selectText}>{item}</Text>
            {item === unit && (
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
