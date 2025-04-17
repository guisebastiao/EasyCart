import { ItemCreateSchema, ItemEditSchema } from "@/schemas/ItemSchema";
import { ItemQueryResponse } from "@/types/ItemQueryResponse";
import { ResponseEntity } from "@/types/ResponseEntity";
import { ItemResponse } from "@/types/ItemResponse";
import { axios } from "@/api/axios";
import { AxiosError } from "axios";

export const Create = async (
  data: ItemCreateSchema
): Promise<ResponseEntity> => {
  try {
    const response = await axios.post<ResponseEntity>("/items", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { message } = error.response?.data as ResponseEntity;
      throw new Error(message);
    }

    throw new Error("Ocorreu um erro inesperado");
  }
};

export const FindAll = async (
  query: ItemQueryResponse
): Promise<ResponseEntity<ItemResponse>> => {
  try {
    const response = await axios.get<ResponseEntity<ItemResponse>>("/items", {
      params: query,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { message } = error.response?.data as ResponseEntity;
      throw new Error(message);
    }

    throw new Error("Ocorreu um erro inesperado");
  }
};

export const Update = async (
  data: ItemEditSchema,
  itemId: string
): Promise<ResponseEntity> => {
  try {
    const response = await axios.put<ResponseEntity>("/items/" + itemId, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { message } = error.response?.data as ResponseEntity;
      throw new Error(message);
    }

    throw new Error("Ocorreu um erro inesperado");
  }
};

export const Delete = async (itemId: string): Promise<ResponseEntity> => {
  try {
    const response = await axios.delete<ResponseEntity>("/items/" + itemId);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { message } = error.response?.data as ResponseEntity;
      throw new Error(message);
    }

    throw new Error("Ocorreu um erro inesperado");
  }
};
