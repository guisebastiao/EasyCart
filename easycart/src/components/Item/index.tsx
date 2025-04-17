import Animated, { FadeInDown, Layout } from "react-native-reanimated";
import { View, Text, TouchableOpacity } from "react-native";
import { useFormatUnit } from "@/hooks/useFormatUnit";
import CheckButton from "@/components/CheckButton";
import { styles } from "@/components/Item/style";
import { useUpdateItem } from "@/hooks/useItem";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

import { ItemResponse } from "@/types/ItemResponse";

export interface ItemProps extends ItemResponse {
  onEdit: () => void;
}

const Item = (item: ItemProps) => {
  const { mutate } = useUpdateItem();

  const handleComplete = () => {
    const data: ItemResponse = {
      id: item.id,
      content: item.content,
      quantity: item.quantity,
      measurementUnit: item.measurementUnit,
      complete: !item.complete,
    };

    mutate({ data, itemId: item.id });
  };

  return (
    <Animated.View
      layout={Layout.duration(300)}
      entering={FadeInDown.duration(300)}
      style={[styles.contentItem, item.complete && styles.contentItemComplete]}
    >
      <CheckButton
        active={item.complete}
        onPress={handleComplete}
      />
      <View style={styles.contentName}>
        <Text
          style={[
            styles.contentText,
            item.complete && styles.contentTextComplete,
          ]}
        >
          {item.content}
        </Text>
        <View style={styles.measurement}>
          <Text style={styles.measurementText}>{item.quantity}</Text>
          <Text style={styles.measurementText}>
            {useFormatUnit(item.measurementUnit)}
            {Number(item.quantity) > 1 && "s"}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.5}
        onPress={item.onEdit}
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
