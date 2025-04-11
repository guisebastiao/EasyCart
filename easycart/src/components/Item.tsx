import { colors } from "@/styles/colors";
import { ItemResponse } from "@/types/ItemResponse";
import { View, StyleSheet, Text, Pressable } from "react-native";
import CheckButton from "./CheckButton";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const Item = ({
  id,
  content,
  quantity,
  measurementUnit,
  complete,
}: ItemResponse) => {
  const handleComplete = () => {};

  return (
    <View style={styles.contentItem}>
      <View style={styles.contentCheck}>
        <CheckButton
          active={complete}
          onPress={handleComplete}
        />
        <View style={styles.contentName}>
          <Text style={styles.contentText}>{content}</Text>
          <View style={styles.measurement}>
            <Text style={styles.measurementText}>{quantity}</Text>
            <Text style={styles.measurementText}>{measurementUnit}</Text>
          </View>
        </View>
      </View>
      <Pressable>
        <Ionicons
          icon="ellipsis-vertical"
          color={colors.purple}
          size={24}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contentItem: {
    width: "100%",
    height: 68,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: colors.gray_500,
    borderColor: colors.gray_300,
    marginBottom: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
  contentCheck: {
    flexDirection: "row",
    gap: 8,
  },
  contentName: {
    flex: 1,
    gap: 5,
  },
  contentText: {
    color: colors.gray_100,
    fontSize: 15,
    fontWeight: "bold",
  },
  measurement: {
    flexDirection: "row",
    gap: 2,
  },
  measurementText: {
    fontFamily: "Inter",
    fontWeight: "600",
    color: colors.gray_200,
    fontSize: 12,
  },
});

export default Item;
