import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { itemSchema, ItemSchemaType } from "@/schemas/itemSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuantityInput } from "../QuantityInput";
import { SheetProps } from "@/types/SheetProps";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { colors } from "@/styles/colors";
import { useEffect } from "react";
import Button from "../Button";
import Input from "../Input";
import {
  styles,
  SHEET_HEIGHT,
  SHEET_OVER_DRAG,
} from "@/components/Sheet/style";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  useAnimatedStyle,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";

const Sheet = ({
  id,
  content,
  quantity,
  measurementUnit,
  complete,
  onClose,
}: SheetProps) => {
  const form = useForm<ItemSchemaType>({
    resolver: zodResolver(itemSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (id) {
      form.reset({
        id,
        content,
        quantity,
        measurementUnit,
        complete,
      });
    }
  }, [id]);

  const offset = useSharedValue(0);

  const close = () => {
    offset.value = 0;
    onClose(false);
  };

  const pan = Gesture.Pan()
    .onChange((e) => {
      const offsetDelta = e.changeY + offset.value;
      const clamp = Math.max(-SHEET_OVER_DRAG, offsetDelta);

      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < SHEET_HEIGHT / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(SHEET_HEIGHT, {}, () => {
          runOnJS(close)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        entering={SlideInDown.springify().damping(15)}
        exiting={SlideOutDown}
        style={[styles.container, translateY]}
      >
        <View style={styles.header}>
          <View style={styles.close} />
          <Text style={styles.title}>Edit Item</Text>
          <Button
            type="secondary"
            icon={
              <Ionicons
                name="trash-outline"
                size={16}
                color={colors.gray_100}
              />
            }
            style={styles.button}
          />
        </View>
        <View style={styles.inputs}>
          <Controller
            control={form.control}
            name="content"
            render={({ field, fieldState }) => (
              <Input
                type="text"
                name="Item"
                value={field.value}
                onChangeText={field.onChange}
                msgError={fieldState.error}
                placeholder="Edit your item"
              />
            )}
          />
          <Controller
            control={form.control}
            name="quantity"
            render={({ field, fieldState }) => (
              <QuantityInput
                quantity={field.value}
                onChangeQuantity={field.onChange}
                unit={form.watch("measurementUnit")}
                onChangeUnit={(e) => form.setValue("measurementUnit", e)}
                msgError={fieldState.error}
                dropDownUp={true}
              />
            )}
          />
        </View>
        <View style={styles.buttons}>
          <Button
            type="secondary"
            name="Cancel"
          />
          <Button
            type="default"
            name="Save"
          />
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default Sheet;
