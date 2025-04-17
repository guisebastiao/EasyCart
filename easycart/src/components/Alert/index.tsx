import { View, Animated, Text } from "react-native";
import { styles } from "@/components/Alert/style";
import { Portal } from "react-native-paper";
import { useEffect, useRef } from "react";
import Button from "@/components/Button";

interface AlertProps {
  isVisible: boolean;
  onSave: () => void;
  onCancel: () => void;
  title: string;
  description: string;
  isLoading: boolean;
}

const Alert = ({
  isVisible,
  onCancel,
  onSave,
  title,
  description,
  isLoading,
}: AlertProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible, fadeAnim]);

  return (
    <Portal>
      <Animated.View
        style={[
          styles.container,
          !isVisible && { pointerEvents: "none" },
          { opacity: fadeAnim },
        ]}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.buttons}>
            <Button
              type="secondary"
              name="Cancelar"
              disabled={isLoading}
              onPress={onCancel}
              style={styles.buttonCancel}
            />
            <Button
              type="default"
              name="Aceitar"
              isLoading={isLoading}
              onPress={onSave}
            />
          </View>
        </View>
      </Animated.View>
    </Portal>
  );
};

export default Alert;
