import { Create, FindAll, Update, Delete } from "@/services/ItemService";
import { useMutation, useInfiniteQuery } from "@tanstack/react-query";
import { ItemSchemaType } from "@/schemas/itemSchema";
import { ItemResponse } from "@/types/ItemResponse";
import Toast from "react-native-toast-message";

export const createItem = () => {
  return useMutation({
    mutationFn: (data: ItemSchemaType) => {
      return Create(data);
    },
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: error.message,
        text2: "Something went wrong",
      });
    },
  });
};

export const findAllItems = () => {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => {
      return FindAll({ offset: pageParam, limit: 20 });
    },
    getNextPageParam: (lastPage: ResponseEntity<ItemResponse>) => {
      const nextPage = lastPage.paging.currentPage + 1;
      const hasMore = nextPage < lastPage.paging.totalPages;
      return hasMore ? nextPage : undefined;
    },
    throwOnError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: error.message,
        text2: "Something went wrong",
      });

      return false;
    },
    queryKey: ["items"],
    initialPageParam: 0,
  });
};

export const updateItem = () => {
  return useMutation({
    mutationFn: ({
      data,
      itemId,
    }: {
      data: ItemSchemaType;
      itemId: string;
    }) => {
      return Update(data, itemId);
    },
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: error.message,
        text2: "Something went wrong",
      });
    },
  });
};

export const deleteItem = () => {
  return useMutation({
    mutationFn: (itemId: string) => {
      return Delete(itemId);
    },
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: error.message,
        text2: "Something went wrong",
      });
    },
  });
};
