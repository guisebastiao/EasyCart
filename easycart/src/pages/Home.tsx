import { QuantityInput } from "@/components/QuantityInput";
import { useAuthContext } from "@/context/AuthContext";
import imgHeader from "../../assets/img-header.png";
import { ItemResponse } from "@/types/ItemResponse";
import { findAllItems } from "@/hooks/useItem";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Units } from "@/types/Units";
import Item from "@/components/Item";
import { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";

const Home = () => {
  const { logout } = useAuthContext();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    findAllItems();

  const [quantity, setQuantity] = useState<string>("");
  const [unit, setUnit] = useState<Units>(Units.UN);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={imgHeader}
        resizeMode="contain"
      />
      <View style={styles.header}>
        <Text style={styles.title}>EasyCart</Text>
        <Button
          type="secondary"
          icon={
            <Ionicons
              name="log-out-outline"
              size={24}
              color={colors.errorColor}
            />
          }
          style={{ paddingHorizontal: 0, width: 40 }}
          onPress={() => logout()}
        />
      </View>
      <View style={styles.form}>
        <Input
          name="item"
          type="text"
          placeholder="Add your purchase item"
          msg={null}
        />
        <View style={styles.content}>
          <QuantityInput
            value={quantity}
            unit={unit}
            onChangeValue={(e) => setQuantity(e)}
            onChangeUnit={(e) => setUnit(e)}
          />
          <Button
            type={"default"}
            icon={
              <Ionicons
                name="add-outline"
                color={colors.gray_100}
                size={24}
              />
            }
            style={{
              position: "relative",
              top: 2.5,
              width: 45,
              height: 45,
              borderRadius: "50%",
              paddingHorizontal: 0,
            }}
          />
        </View>
      </View>
      <View style={styles.contentItems}>
        <FlatList
          data={data?.pages.flatMap((page) => page.data) ?? []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }: { item: ItemResponse }) => (
            <Item
              id={item.id}
              content={item.content}
              quantity={item.quantity}
              measurementUnit={item.measurementUnit}
              complete={item.complete}
            />
          )}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (hasNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator
                size={20}
                color={colors.gray_100}
              />
            ) : null
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: colors.gray_600,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    flex: 1,
    gap: 10,
  },
  image: {
    position: "absolute",
    width: "100%",
    top: -50,
    left: 0,
  },
  header: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: {
    fontFamily: "Inter",
    fontWeight: "700",
    color: colors.gray_100,
    fontSize: 32,
  },
  form: {
    width: "100%",
    paddingVertical: 20,
    gap: 12,
  },
  content: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 15,
  },
  contentItems: {
    width: "100%",
    height: "100%",
  },
});

export default Home;
