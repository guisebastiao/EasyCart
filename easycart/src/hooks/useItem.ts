import { Create, FindAll, Update, Delete } from "@/services/ItemService";
import { useMutation, useInfiniteQuery } from "@tanstack/react-query";
import { ResponseEntity } from "@/types/ResponseEntity";
import { ItemCreateSchema, ItemEditSchema } from "@/schemas/ItemSchema";
import { ItemResponse } from "@/types/ItemResponse";
import { queryClient } from "@/api/queryClient";
import Toast from "react-native-toast-message";

export const useCreateItem = () => {
  return useMutation({
    mutationFn: (data: ItemCreateSchema) => {
      return Create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: "Algo deu errado",
        text2: error.message,
      });
    },
  });
};

export const useFindAllItems = () => {
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
        text1: "Algo deu errado",
        text2: error.message,
      });

      return false;
    },
    queryKey: ["items"],
    initialPageParam: 0,
  });
};

export const useUpdateItem = () => {
  return useMutation({
    mutationFn: ({
      data,
      itemId,
    }: {
      data: ItemEditSchema;
      itemId: string;
    }) => {
      return Update(data, itemId);
    },
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: "Algo deu errado",
        text2: error.message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export const useDeleteItem = () => {
  return useMutation({
    mutationFn: (itemId: string) => {
      return Delete(itemId);
    },
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: "Algo deu errado",
        text2: error.message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};
