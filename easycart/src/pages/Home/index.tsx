import CreateItemForm from "@/components/CreateItem";
import { ItemResponse } from "@/types/ItemResponse";
import { useFindAllItems } from "@/hooks/useItem";
import { View, FlatList } from "react-native";
import EditItem from "@/components/EditItem";
import { styles } from "@/pages/Home/style";
import Loading from "@/components/Loading";
import Header from "@/components/Header";
import Sheet from "@/components/Sheet";
import Item from "@/components/Item";
import { useState } from "react";

const Home = () => {
  const [item, setItem] = useState<ItemResponse | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFindAllItems();

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Header />
        <CreateItemForm />
        <View style={styles.content}>
          {isLoading ? (
            <Loading />
          ) : (
            <FlatList
              data={data?.pages.flatMap((page) => page.data) ?? []}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Item
                  {...item}
                  onEdit={() => setItem(item)}
                />
              )}
              onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }}
              ListFooterComponent={() =>
                isFetchingNextPage ? <Loading /> : null
              }
            />
          )}
        </View>
      </View>
      {item && (
        <Sheet onClose={() => setItem(null)}>
          <EditItem
            id={item.id}
            content={item.content}
            quantity={item.quantity}
            measurementUnit={item.measurementUnit}
            complete={item.complete}
            onClose={() => setItem(null)}
          />
        </Sheet>
      )}
    </View>
  );
};

export default Home;
