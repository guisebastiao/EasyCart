import { ItemSchemaType } from "@/schemas/itemSchema";
import { ItemResponse } from "@/types/ItemResponse";
import { ItemQuery } from "@/types/ItemQuery";
import { axios } from "@/api/axios";
import { AxiosError } from "axios";

export const Create = async (data: ItemSchemaType): Promise<ResponseEntity> => {
  try {
    const response = await axios.post<ResponseEntity>("/items", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { message } = error.response?.data as ResponseEntity;
      throw new Error(message);
    }

    throw new Error("An unexpected error occurred");
  }
};

export const FindAll = async (query: ItemQuery): Promise<ResponseEntity> => {
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

    throw new Error("An unexpected error occurred");
  }
};

export const Update = async (
  data: ItemSchemaType,
  itemId: string
): Promise<ResponseEntity> => {
  try {
    const response = await axios.put<ResponseEntity>("/items" + itemId, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { message } = error.response?.data as ResponseEntity;
      throw new Error(message);
    }

    throw new Error("An unexpected error occurred");
  }
};

export const Delete = async (itemId: string): Promise<ResponseEntity> => {
  try {
    const response = await axios.delete<ResponseEntity>("/items" + itemId);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { message } = error.response?.data as ResponseEntity;
      throw new Error(message);
    }

    throw new Error("An unexpected error occurred");
  }
};
