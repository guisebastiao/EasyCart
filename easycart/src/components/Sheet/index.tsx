import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { ReactNode } from "react";
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
} from "react-native-reanimated";

interface SheetProps {
  onClose: () => void;
  children: ReactNode;
}

const Sheet = ({ onClose, children }: SheetProps) => {
  const offset = useSharedValue(0);

  const close = () => {
    onClose();
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
        style={[styles.container, translateY]}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

export default Sheet;
