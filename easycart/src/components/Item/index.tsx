import Animated, { FadeInDown, Layout } from "react-native-reanimated";
import { View, Text, TouchableOpacity } from "react-native";
import { useFormatUnit } from "@/hooks/useFormatUnit";
import { ItemResponse } from "@/types/ItemResponse";
import CheckButton from "@/components/CheckButton";
import { styles } from "@/components/Item/style";
import { useUpdateItem } from "@/hooks/useItem";
import { ItemProps } from "@/types/ItemProps";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

const Item = ({
  id,
  content,
  quantity,
  measurementUnit,
  complete,
  setEditItem,
}: ItemProps) => {
  const { mutate } = useUpdateItem();

  const handleComplete = () => {
    const data: ItemResponse = {
      id,
      content,
      quantity: quantity,
      measurementUnit: measurementUnit,
      complete: !complete,
    };

    mutate({ data, itemId: id });
  };

  const handleEdit = () => {
    setEditItem({ id, content, quantity, measurementUnit, complete });
  };

  return (
    <Animated.View
      layout={Layout.duration(300)}
      entering={FadeInDown.duration(300)}
      style={[styles.contentItem, complete && styles.contentItemComplete]}
    >
      <CheckButton
        active={complete}
        onPress={handleComplete}
      />
      <View style={styles.contentName}>
        <Text
          style={[styles.contentText, complete && styles.contentTextComplete]}
        >
          {content}
        </Text>
        <View style={styles.measurement}>
          <Text style={styles.measurementText}>{quantity}</Text>
          <Text style={styles.measurementText}>
            {useFormatUnit(measurementUnit)}
            {quantity > 1 && "s"}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.5}
        onPress={handleEdit}
      >
        <Ionicons
          name="ellipsis-vertical"
          color={colors.purple}
          size={20}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Item;
