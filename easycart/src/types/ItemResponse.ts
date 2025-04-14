import { Units } from "./Units";

export interface ItemResponse {
  id: string;
  content: string;
  quantity: number;
  measurementUnit: Units;
  complete: boolean;
}
