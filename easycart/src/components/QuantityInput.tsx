import { QuantityInputProps } from "@/types/QuantityInputProps";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { colors } from "@/styles/colors";
import { Units } from "@/types/Units";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";

const units = Object.keys(Units);

export const QuantityInput = ({
  value,
  unit,
  onChangeValue,
  onChangeUnit,
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

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
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
          keyboardType="numeric"
          value={String(value)}
          cursorColor={colors.gray_100}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChangeText={(e) => onChangeValue(e)}
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
      <Animated.View
        style={[
          styles.dropdown,
          { height: animatedHeight },
          showUnits && { borderWidth: 1 },
        ]}
      >
        {units.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.select,
              unit === item && { backgroundColor: colors.gray_300 },
            ]}
            onPress={() => {
              onChangeUnit(item as Units);

              Animated.timing(animatedHeight, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
              }).start(() => {
                setShowUnits(false);
              });
            }}
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  label: {
    color: colors.gray_200,
    marginBottom: 8,
  },
  container: {
    position: "relative",
    flexDirection: "row",
  },
  input: {
    width: "80%",
    fontFamily: "Inter_400Regular",
    color: colors.gray_100,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.gray_500,
    borderColor: colors.gray_300,
    borderWidth: 1,
  },
  unitButton: {
    width: "20%",
    paddingHorizontal: 12,
    backgroundColor: colors.gray_500,
    borderColor: colors.gray_300,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 0,
    borderWidth: 1,
    gap: 4,
  },
  unitText: {
    fontFamily: "Inter",
    fontWeight: "500",
    color: colors.gray_200,
  },
  dropdown: {
    position: "absolute",
    top: 70,
    right: 0,
    height: 0,
    width: "20%",
    borderRadius: 6,
    elevation: 10,
    backgroundColor: colors.gray_600,
    borderColor: colors.gray_300,
    overflow: "hidden",
    zIndex: 10000,
  },
  select: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  selectText: {
    fontFamily: "Inter",
    fontWeight: "500",
    color: colors.gray_200,
  },
});
