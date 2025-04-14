import { ItemResponse } from "./ItemResponse";

export interface SheetProps extends Partial<ItemResponse> {
  onClose: (value: boolean) => void;
}
