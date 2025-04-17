import { Units } from "@/types/Units";

export class ItemResponse {
  id: string;
  content: string;
  quantity: number;
  measurementUnit: Units;
  complete: boolean;
}
