import { ItemResponse } from "./ItemResponse";

export interface ItemProps extends ItemResponse {
  editItem: ItemResponse | null;
  setEditItem?: ({
    id,
    content,
    quantity,
    measurementUnit,
    complete,
  }: ItemResponse) => void;
}
