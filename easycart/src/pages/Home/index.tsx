import CreateItemForm from "@/components/CreateItemForm";
import { ItemResponse } from "@/types/ItemResponse";
import { useFindAllItems } from "@/hooks/useItem";
import { View, FlatList } from "react-native";
import { styles } from "@/pages/Home/style";
import Loading from "@/components/Loading";
import Header from "@/components/Header";
import Item from "@/components/Item";
import Sheet from "@/components/Sheet";
import { useEffect, useState } from "react";

const Home = () => {
  const [editItem, setEditItem] = useState<ItemResponse | null>(null);
  const [sheetIsOpen, setSheetIsOpen] = useState<boolean>(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFindAllItems();

  useEffect(() => {
    if (editItem !== null) {
      setSheetIsOpen(true);
    } else {
      setSheetIsOpen(false);
    }
  }, [editItem]);

  console.log(sheetIsOpen);

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
              renderItem={({ item }: { item: ItemResponse }) => (
                <Item
                  id={item.id}
                  content={item.content}
                  quantity={item.quantity}
                  measurementUnit={item.measurementUnit}
                  complete={item.complete}
                  editItem={editItem}
                  setEditItem={setEditItem}
                />
              )}
              onEndReached={() => {
                if (hasNextPage) {
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
      {sheetIsOpen && (
        <Sheet
          id={editItem?.id}
          content={editItem?.content}
          quantity={editItem?.quantity}
          measurementUnit={editItem?.measurementUnit}
          complete={editItem?.complete}
          onClose={setSheetIsOpen}
        />
      )}
    </View>
  );
};

export default Home;
